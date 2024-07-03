import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllProductsApi,
  getProductsByCategoryApi,
  searchProductsApi,
} from "../apis/Api";
import Navbar from "../components/Hearder";
import ProductCard from "../components/ProductCard";
import Searchbar from "../components/Searchbar";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsApi();
        setProducts(res.data.products);
        const uniqueCategories = [
          ...new Set(
            res.data.products.map((product) => product.productCategory)
          ),
        ];
        setCategories(["All", ...uniqueCategories]); // Add 'All' category
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      if (category === "All") {
        const res = await getAllProductsApi();
        setProducts(res.data.products);
      } else {
        const res = await getProductsByCategoryApi(category);
        setProducts(res.data.products);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleSearch = async (query) => {
    try {
      if (query.trim() === "") {
        // If search query is empty, fetch all products
        const res = await getAllProductsApi();
        setProducts(res.data.products);
      } else {
        // Otherwise, search products by name
        const res = await searchProductsApi(query);
        setProducts(res.data.products);
      }
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  const popularProducts = products.slice(0, 4); // Assuming the first 5 are popular
  const allProducts = products.slice(4); //

  return (
    <>
      <Navbar />
      {/* Pass the handleSearch function as the handleChange prop */}

      <Box
        sx={{
          margin: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 4,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
              Categories
            </Typography>
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginLeft: "10px",
              }}
            >
              {categories &&
                categories.map((category) => (
                  <ListItem
                    button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      border: "1px solid #ccc", // Add border
                      paddingY: 1, // Add vertical padding
                      paddingX: 2,
                      borderRadius: 8, // Add border radius
                      marginRight: 2, // Add left padding
                      width: "auto",
                    }}
                  >
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
            </List>
          </Box>
          <Box
          sx={{ flex:1}}
          >
            <Searchbar
              placeholder={"Enter your search product name"}
              handleChange={handleSearch}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Box mt={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              Popular Products
            </Typography>
            <Grid container spacing={2}>
              {popularProducts.length > 0 ? (
                popularProducts.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <Link
                      className="text-decoration-none"
                      to={`/product/${product._id}`}
                    >
                      <ProductCard item={{ product }} />
                    </Link>
                  </Grid>
                ))
              ) : (
                <Typography>No Popular Products available</Typography>
              )}
            </Grid>
          </Box>
          <hr></hr>
          <Box mt={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              All Featured Products
            </Typography>
            <Grid container spacing={2}>
              {allProducts.length > 0 ? (
                allProducts.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                    <Link
                      className="text-decoration-none"
                      to={`/product/${product._id}`}
                    >
                      <ProductCard item={{ product }} />
                    </Link>
                  </Grid>
                ))
              ) : (
                <Typography>No products available</Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Collections;
