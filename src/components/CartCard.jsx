

import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox"; // Import Checkbox component
import { FaTrash } from "react-icons/fa";

const CartCard = ({
  product,
  quantity,
  changeQuantity,
  index,
  removeItem,
  handleCheckboxChange
}) => {
  const add_sub_quantity = (newQuantity) => {
    if (newQuantity > 0) {
      changeQuantity(newQuantity, index);
    }
  };

  console.log("Product prop:", product);
  return (
    <Box
      mb={2}
      pl={2}
      pt={1}
      pb={1}
      display="flex"
      alignItems="center"
      sx={{ background: "white", borderRadius: "5px" }}
    >
      <Checkbox // Add Checkbox component
        checked={product.selected} // Assuming each product object has a 'selected' property
        onChange={() => handleCheckboxChange(product.product._id)}
      />
      <Avatar
        src={
          product.product.productImageUrl ?? "https://via.placeholder.com/150"
        }
        variant="rounded"
        sx={{ width: 100, height: 100 }}
      />
      <Box ml={2}>
        <Typography variant="p" style={{ fontWeight: 'bold' }}>{product.product.productName}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.color}
        </Typography>
        {product.size && (
          <Typography variant="body2" color="textSecondary">
            {product.size}
          </Typography>
        )}
        <Box mt={1} display="flex" alignItems="center">
          <Typography variant="body2" component="span" color="textSecondary">
            <s>{product.product.productPrice}</s>
          </Typography>
          <Typography
            variant="body2"
            component="span"
            color="textPrimary"
            ml={1}
          >
            {product.product.productPrice - 100}
          </Typography>
          <Typography variant="body2" component="span" color="primary" ml={1}>
            {product.discount}
          </Typography>
        </Box>
      </Box>
      <Box ml="auto" display="flex" alignItems="center" sx={{ width: '30%' }}>
        <IconButton onClick={() => add_sub_quantity(quantity - 1)} size="small">
          -
        </IconButton>
        <Input
          type="number"
          value={product.quantity}
          inputProps={{ min: 0 }}
          onChange={(e) => add_sub_quantity(e.target.value)}
        />
        <IconButton onClick={() => add_sub_quantity(quantity + 1)} size="small">
          +
        </IconButton>
        <IconButton onClick={removeItem} size="small">
          <FaTrash color="red" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartCard;