import { useEffect, useState } from "react";
import { getFavoritesByUserIdApi, deleteFavoriteByIdApi, removeFromFavoritesApi } from "../apis/Api";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Hearder";
import { FaTrash } from "react-icons/fa";

const FavoritePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFavoritesByUserIdApi(userId)
      .then((response) => {
        setFavorites(response.data.favorites.products);
      })
      .catch((error) => {
        console.error("Failed to fetch favorites:", error);
      });
  }, [userId]);

  const deleteFavorite = (productId) => {
    removeFromFavoritesApi(userId, productId)
      .then(() => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.product._id !== productId)
        );
      })
      .catch((error) => {
        console.error("Failed to delete favorite:", error);
      });
  };

  return (
    <div className="container mt-3">
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Your Favorites
      </Typography>
      <Box className="row">
        {favorites.map((item) => (
          <Card className="col-lg-3 col-md-4 col-sm-6 mb-3" key={item.product._id}>
            <CardContent>
              <img src={item.product.productImageUrl} alt={item.product.productName} width="100%" />
              <Typography variant="h6">{item.product.productName}</Typography>
              <Typography variant="body2">{item.product.productDescription}</Typography>
              <Typography variant="h5">Rs. {item.product.productPrice}</Typography>
             <Box className='d-flex justify-content-between'>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/product/${item.product._id}`)}
                    style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}
                  >
                    View Product
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => deleteFavorite(item.product._id)}
                    style={{background: "linear-gradient(45deg, #E90335, #FF0F0F)",}}
                  >
                    <FaTrash/>
                  </Button>
             </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default FavoritePage;
