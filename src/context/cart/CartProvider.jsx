import { useState } from "react";
import { CartContext } from "./CartContext";
import { addToCartApi } from "../../apis/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const addToCart = (product) => {
    console.log(product);
    addToCartApi(product)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          // Update local state with the updated cart data
          setCart(res.data.cart);
          toast.success(res.data.message);
          navigate('/cart')
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };
  


  // Provide the updated values to the context
  const uploadContextValue = {
    cart,
    addToCart,
  
  };

  return (
    <CartContext.Provider value={uploadContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider