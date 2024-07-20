// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { verifyPaymentApi } from "../apis/Api";
// // import other necessary modules and functions

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { order } = location.state || {};

//   const [cardNumber, setCardNumber] = useState("");
//   const [expirationDate, setExpirationDate] = useState("");
//   const [cvc, setCvc] = useState("");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user._id;
//   // make useState
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!cardNumber || !expirationDate || !cvc) {
//       toast.error("All fields are required.");
//       return;
//     }

//     const paymentData = {
//        user: userId,
//       oid: order._id,
//       cardNumber,
//       expirationDate,
//       cvc,
//       amt: order.totalAmount,
//     };

//     try {
//       const res = await verifyPaymentApi(paymentData);
//       if (res.data.error) {
//         toast.error(res.data.error);
//       } else {
//         toast.success("Payment successful!");
//         navigate("/payment-success", { state: { order: res.data.order } });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed!");
//     }
//   };

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="cardNumber">Card Number:</label>
//           <input
//             type="text"
//             id="cardNumber"
//             value={cardNumber}
//             onChange={(e) => setCardNumber(e.target.value)}
//             pattern="\d{16}"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="expirationDate">Expiration Date:</label>
//           <input
//             type="text"
//             id="expirationDate"
//             value={expirationDate}
//             onChange={(e) => setExpirationDate(e.target.value)}
//             pattern="\d{2}/\d{2}"
//             placeholder="MM/YY"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="cvc">CVC:</label>
//           <input
//             type="text"
//             id="cvc"
//             value={cvc}
//             onChange={(e) => setCvc(e.target.value)}
//             pattern="\d{3}"
//             required
//           />
//         </div>
//         <button type="submit">Pay</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyPaymentApi } from "../apis/Api";
// Import Bootstrap and other necessary modules
import 'bootstrap/dist/css/bootstrap.min.css';
// import paymentIcon from '../../public/images/payment.png'; // Ensure you have the image in the correct path

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || !expirationDate || !cvc) {
      toast.error("All fields are required.");
      return;
    }

    const paymentData = {
      user: userId,
      oid: order._id,
      cardNumber,
      expirationDate,
      cvc,
      amt: order.totalAmount,
    };

    try {
      const res = await verifyPaymentApi(paymentData);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Payment successful!");
        navigate("/payment-success", { state: { order: res.data.payment } });
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className=" mb-4 " style={{fontWeight: "bold", marginLeft: "100px"}}>Payment Page</h2>
      <div className="row justify-content-center align-items-center ">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <div className="form-group  mt-2">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="form-control mb-2"
                pattern="\d{16}"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="text"
                id="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="form-control mb-2"
                pattern="\d{2}/\d{2}"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="cvc">CVC:</label>
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="form-control mb-2"
                pattern="\d{3}"
                required
              />
            </div>
            <button type="submit" className="btn btn-block mt-4"   style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}>
              Pay
            </button>
          </form>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <img
            src= "images/payment.png"
            alt="Payment Icon"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
