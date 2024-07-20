import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderApi } from "../apis/Api";
import { toast } from "react-toastify";
import "../styles/delivery.css";
import Navbar from "../components/Hearder";

const Delivery = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "postcode":
        setPostcode(value);
        break;
      default:
        break;
    }
  };

  const calculateTotalPrice = (cart) => {
    const totalPrice = cart.reduce((total, item) => {
      if (selectedProducts.includes(item.product._id)) {
        return total + item.product.productPrice * item.quantity;
      }
      return total;
    }, 0);
    return totalPrice.toFixed(2);
  };

  const calculateDiscountPrice = (totalPrice) => {
    const discount = totalPrice * 0.2; // 20% discount
    return (totalPrice - discount).toFixed(2);
  };

  const calculateTotalAmount = (cart) => {
    const totalPrice = parseFloat(calculateTotalPrice(cart));
    return calculateDiscountPrice(totalPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    const selectedCartItems = cartItems.filter((item) =>
      selectedProducts.includes(item.product._id)
    );

    const order = {
      userId: userId,
      products: selectedCartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
      totalAmount: calculateTotalAmount(selectedCartItems),
      deliveryDetails: {
        name,
        email,
        phone,
        address,
        postcode,
      },
    };

    console.log(order);

    try {
      const res = await createOrderApi(order);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        console.log("Response.order :", res.data.order)
        // Clear local storage and redirect to a success page or home page
        localStorage.removeItem("selectedProducts");
        localStorage.removeItem("cartItems");
        navigate('/payment', { state: { order: res.data.order } });
      }
    } catch (err) {
      console.log(err);
      toast.error("Internal Server Error!");
    }
  };

  const totalItems = selectedProducts.length;
  const subtotal = calculateTotalPrice(cartItems);
  const totalAmount = calculateTotalAmount(cartItems);

  return (
   <div>
    <Navbar/>
      <section>
        <div className="containers mx-auto mt-2 p-4">
          <h2 className=" my-2" style={{fontWeight:"bold", marginLeft:"70px"
          }}>Delivery Information</h2>
          <div className="d-flex gap-2 ">
            <div className="flex-grow-1 p-5 ">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="phone"
                    className="form-control"
                    value={phone}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="address"
                    className="form-control"
                    value={address}
                  />
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="postcode">Postcode</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="postcode"
                    className="form-control"
                    value={postcode}
                  />
                </div>
                <button
                  type="submit"
                  className="btn  btn-block" style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}
                >
                  Proceed to Checkout
                </button>
              </form>
            </div>
            <div className=" bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
              <div className="mb-2">
                <p className="text-gray-700">Total Items: <span className="font-semibold">{totalItems}</span></p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700">Subtotal: <span className="font-semibold">${subtotal}</span></p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700">Discount (20%): <span className="font-semibold">${(subtotal * 0.2).toFixed(2)}</span></p>
              </div>
              <div>
                <p className="text-gray-900 font-bold">Total Amount: <span className="text-green-600">${totalAmount}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
   </div>
  );
};

export default Delivery;
