import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getSingleOrderApi } from "../apis/Api";
import Navbar from "../components/Hearder"; // Corrected the import

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    getSingleOrderApi(userId)
      .then((res) => {
        setOrders(res.data.orders);
        console.log(res.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1 className="mt-4 mx-5">My Orders</h1>
        {orders.length === 0 ? (
          <Typography>No orders available</Typography>
        ) : (
          <TableContainer  className="container">
            <Table className="table-bordered table-responsive">
              <TableHead style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}>
                <TableRow >
                  <TableCell className="text-white font-weight-bold" >Order ID</TableCell>
                  <TableCell className="text-white font-weight-bold" >User</TableCell>
                  <TableCell className="text-white font-weight-bold" >Product</TableCell>
                  <TableCell className="text-white font-weight-bold" >Quantity</TableCell>
                  <TableCell className="text-white font-weight-bold" >Total Amount</TableCell>
                  <TableCell className="text-white font-weight-bold" >Status</TableCell>
                  <TableCell className="text-white font-weight-bold" >Created At</TableCell>
                  <TableCell className="text-white font-weight-bold" >Updated At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {order.userId.firstName} {order.userId.lastName}
                    </TableCell>
                    <TableCell>
                      {order.products[0].product.productName}
                    </TableCell>
                    <TableCell>{order.products[0].quantity}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(order.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default MyOrders;
