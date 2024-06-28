import {
  DeliveryDining,
  FavoriteOutlined,
  MonetizationOnSharp,
  Share,
  ShoppingBagOutlined,
} from "@mui/icons-material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoopIcon from "@mui/icons-material/Loop";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Box, Button, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToFavoritesApi, getSingleProductApi } from "../apis/Api";
import { CartContext } from "../context/cart/CartContext";
import Navbar from "./Hearder";

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  // make useState

  // State variables
  const [products, setProduct] = useState({});

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]); // Added state for categories

  useEffect(() => {
    // Fetch product data
    getSingleProductApi(id).then((res) => {
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setProductCategory(res.data.product.productCategory);
      setProductImage(res.data.product.productImageUrl);
      setProduct(res.data.product);
    });
  }, [id]);

  // State to track the quantity
  const [quantity, setQuantity] = useState(1);
  // const [value, setValue] = useState(dayjs("2022-04-17"));

  const handleAddToCart = () => {
    const cart = {
      user: userId, // Replace with actual user ID
      products: [
        {
          product: id,
          quantity: quantity,
        },
      ],
    };
    addToCart(cart);
  };
  // Function to handle quantity increase
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const toggleBookmark = () => {
    // Your logic to handle bookmarks
  };

  const handleAddToFavorites = () => {
    const favorite = {
      user: userId,
      products: [
        {
          product: id,
        },
      ],
    };

    addToFavoritesApi(favorite)
      .then((response) => {
        toast.success("Product added to favorites!");
      })
      .catch((error) => {
        toast.error("Failed to add product to favorites.");
      });
  };

  const handleShare = () => {
    // Your logic for sharing
    toast.success("Product link copied to clipboard!");
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <Navbar />
        <div className="row d-flex ">
          <section className="col-lg-5">
            <div className="product-image ">
              <img
                src={`${productImage}`}
                alt="product thumbnail"
                className="object-cover "
                width="100%"
              />
            </div>

            {/* Add more product details like delivery time, delivery information, cash on delivery, etc. */}
          </section>

          <section className="col-lg-4 bg-white ">
            <Box
              className="d-none d-lg-block h-maxcontent "
              sx={{ top: "10%" }}
            >
              <div className="">
                <div className="share-section mt-3 d-flex justify-content-between">
                  <span className="fs-2 fw-bold">{productName}</span>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Share />}
                    onClick={handleShare}
                    style={{
                      height: "40px", // Set your desired height
                      width: "30%", // Set your desired width as a percentage
                      maxWidth: "250px", // Optional: Set a maximum width if needed
                    }}
                  >
                    Share
                  </Button>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {/* Add chips for similar products */}
                  <Rating></Rating>
                  <p className="fs-9">1K (4.5 rating)</p>
                  <Button
                    variant="outlined"
                    startIcon={<FavoriteOutlined />}
                    onClick={handleAddToFavorites}
                    style={{
                      backgroundColor: "#0b2912",
                      color: "white",
                    }}
                  >
                    Add to Favorites
                  </Button>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-between flex-column">
                <span className="fs-5 mb-2">{productDescription}</span>
                <b className="fs-4 "> Rs. {productPrice}</b>
              </div>

              <div className="mt-4">
                <h6 className="fs-4">Quantity:</h6>
                <div className="d-flex align-items-center">
                  {/* Decrease button */}
                  <Button
                    variant="outline-secondary"
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>

                  {/* Quantity display */}
                  <div className="mx-2">{quantity}</div>

                  {/* Increase button */}
                  <Button
                    variant="outline-secondary"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </div>

                <div className="className d-flex justify-content-evenly flex mt-5">
                  <Button
                    variant="outline"
                    startIcon={<ShoppingBagOutlined />}
                    onClick={handleShare}
                    style={{
                      backgroundColor: "#0b2912",
                      color: "white",
                    }}
                  >
                    Buy Now
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<FaShoppingCart />}
                    onClick={handleAddToCart}
                    style={{
                      backgroundColor: "#0b2912",
                      color: "white",
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Box>
          </section>
          <section
            className="col-lg-3 flex rounded-3 "
            style={{
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              className=" h-maxcontent d-flex flex-column justify-content-evenly"
              sx={{ top: "10%" }}
            >
              <div className="">
                <span className="fs-4 fw-bold mt-2">Delivery Information</span>
              </div>
              <div className="mt-3 mb-2">
                <DeliveryDining />
                <span className=""> Mitranagar, Gongabu</span>
              </div>
              <Button
                variant="outlined"
                onClick={() => addToCart(products)}
                style={{
                  height: "40px", // Set your desired height
                  width: "30%", // Set your desired width as a percentage
                  maxWidth: "250px", // Optional: Set a maximum width if needed
                  backgroundColor: "#0b2912",
                  color: "white",
                }}
              >
                Change
              </Button>
              <div className="mt-3 mb-3">
                <MonetizationOnSharp />
                <span className=""> Cash on Delivery</span>
              </div>
              <hr />
              {/* <div className="mt-3">
                <DateRange />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Delivery Date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </LocalizationProvider>
              </div> */}
              <Card className="bg-light shadow-none mt-3">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Service
                  </Typography>

                  {/* Authenticity */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <CheckCircleIcon
                      style={{ marginRight: "10px", color: "green" }}
                    />
                    <Typography variant="body1">
                      100% Authentic from Trusted Brand
                      <br />
                      or Get 2x Your Money Back
                    </Typography>
                  </div>

                  {/* Return Policy */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <LoopIcon style={{ marginRight: "10px", color: "blue" }} />
                    <Typography variant="body1">
                      14 days free & easy return
                      <br />
                      Change of mind is not applicable
                    </Typography>
                  </div>

                  {/* Warranty */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MoneyOffIcon
                      style={{ marginRight: "10px", color: "orange" }}
                    />
                    <Typography variant="body1">
                      1 Year Brand Warranty
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
