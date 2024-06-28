import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = React.memo(({ item }) => {
  const { product, viewCount } = item;

  return (
    <Box
      className="position-relative custom-card"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        height: "80%", // Set a fixed height for the card
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        to={`/products/${product?._id}`}
        className="position-absolute top-0 start-0 hover-link"
      ></Link>

      <Box
        sx={{
          position: "relative",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          flex: 1, // Allow the image to take the remaining height
        }}
      >
        <img
          alt=""
          src={product?.productImageUrl}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          className="position-absolute top-2 end-2"
          sx={{
            zIndex: 2,
            "&:hover .hover-link": {
              display: "none !important",
            },
          }}
        >
          <FavoriteIcon
            className="cIcon"
            sx={{
              color: "#C1C1C1",
            }}
          />
        </Box>
      </Box>

      <Box
        p={2}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.2em", sm: "1.5em" },
            marginBottom: "10px",
            textDecoration: "none", // Remove underline
            display: "flex",
            alignItems: "center",
            color: "black",
            fontWeight: "bold",
            textAlign: "center", // Vertically align
          }}
        >
          <h5>
            <b>{product?.productName}</b>
          </h5>
        </Typography>

        <Typography
          variant="p"
          sx={{
            fontSize: { xs: "0.8em", sm: "1em" },
            lineHeight: "1.5",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "wrap",
            marginBottom: "10px",
            textDecoration: "none", // Remove underline
            display: "flex",
            alignItems: "center",
            color: "black",
            textAlign: "center", // Vertically align
          }}
        >
          {product?.productDescription.slice(0, 60)}
        </Typography>

       

        <Divider />

        <Box
          sx={{
            fontSize: { xs: "0.8em", sm: "1em" },
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
           <Typography
          variant="p"
          sx={{
            fontSize: { xs: "0.8em", sm: "1em" },
            marginBottom: "10px",
            textDecoration: "none", // Remove underline
            borderRadius: "20px",
            width: "auto",
            paddingX: "10px",
            // Vertically align
          }}
        >
          Rs. {product?.productPrice}
        </Typography>
          <Box className="d-flex gap-2 align-items-center ">
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{ borderRadius: "20px" }}
             style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}
            >
              Add to Cart
            </Button>

            <Box className="d-flex text-black align-items-center">
              <Typography
                variant="span"
                sx={{
                  fontSize: { xs: "1.7em", sm: "1.8em" },
                }}
                className="text-black"
              >
                {viewCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default ProductCard;
