// PaymentSuccess.js
import React from 'react';
import { FaBackward } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const navigate = useNavigate();

  if (!order) {
    return <div>No payment details available.</div>;
  }

  return (
    <div className=' text-center d-flex flex-column justify-content-center border border-1 p-2 shadow-sm' style={{marginInline: "auto" , marginTop:"200px", width:"400px"}}>
      <h1>Payment Successful!</h1>
      <div>
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.oid}</p>
        <p><strong>User ID:</strong> {order.user}</p>
        <p><strong>Total Amount:</strong> Rs{order.amt}</p>
      </div>
      <Link to='/'>
      <FaBackward/> <p> Back to home</p>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
