import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllOrdersApi } from "../../../apis/Api";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrdersApi()
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box width="10%"></Box>
        <Box  component="main" sx={{ flexGrow: 1, p: 3 }} >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="p" fontWeight="bold">Order ID</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">User Name</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">User Email</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Product Name</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Product Price</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Quantity</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Total Amount</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Status</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Created At</Typography></TableCell>
                  <TableCell><Typography variant="p" fontWeight="bold">Updated At</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId.firstName}</TableCell>
                    <TableCell>{order.userId.email}</TableCell>
                    <TableCell>
                      {order.products[0].product.productName}
                    </TableCell>
                    <TableCell>
                      {order.products[0].product.productPrice}
                    </TableCell>
                    <TableCell>{order.products[0].quantity}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell>{order.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default AllOrders;
