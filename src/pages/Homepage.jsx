import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductsApi } from "../apis/Api";
import Navbar from "../components/Hearder";
import HomeHeader from "../components/HomepageComponet";
import Footer from "./footer";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsApi();
        setProducts(res.data.products.slice(0, 4));
        const uniqueCategories = [
          ...new Set(
            res.data.products.map((product) => product.productCategory)
          ),
        ];
        setCategories([...uniqueCategories]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryIcons = ["images/c1.png", "images/c2.png", "images/c3.png"];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Navbar />
      <HomeHeader
        title="Welcome To Our Authentic
Food Store "
        subtitle="IT'S NICE TO MEET YOU"
        buttonText="SHOP NOW"
        Link="/product"
        showButton={true}
        image="images/hero_image.png"
      />
       <div className="container mt-3 text-center">
        <h2>
          <b>OURS CATEGORIES</b>
        </h2>
        <p>Here are the special products available</p>
        {/* Gallery */}
        <div className="row container-fluid mt-0 p-0 d-flex justify-content-around">
          {categories.map((category, index) => (
            <div
              key={category._id}
              className=" col-lg-3 col-md-12 mb-lg-0 border-1 d-flex flex-column  justify-content-center align-items-center"
            >
              <div className="card border-0">
                <img
                  src={categoryIcons[index]} // Assuming the product object has an 'productImageUrl' property
                  className="w-100 h-50 shadow-1-strong rounded m-0 mx-0"
                  alt="category" // Assuming the product object has a 'name' property
                />
                <div className="card-body pb-0">
                  <p className="card-title">
                    <b>{category}</b>
                  </p>
                  <Link to="/product" className="text-decoration-none">
                    <button
                      className="border-1 px-4 py-2 rounded-5"
                      style={{ background: "transparent", color: "green" }}
                    >
                      <i>Browse collection</i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End Gallery */}
      </div>
      <div className="container mt-3 text-center">
        <h2>
          <b>Our Products</b>
        </h2>
        <p>Here are the special products available</p>
        {/* Gallery */}
        <div className="row container-fluid mt-0 p-0 ">
          {products.map((product, index) => (
            <div
              key={product._id}
              className=" col-lg-3 col-md-12 mb-lg-0 border-1 d-flex flex-column  justify-content-center align-items-center"
            >
              <div className="card">
                <img
                  src={product.productImageUrl} // Assuming the product object has an 'productImageUrl' property
                  className="w-100 h-50 shadow-1-strong rounded mb-4 m-0 mx-0"
                  alt={product?.productName} // Assuming the product object has a 'name' property
                />
                <div className="card-body pb-0">
                  <p className="card-title">
                    <b>{product.productName}</b>
                  </p>
                  <p className=" card-text">
                    <i className="text-center">{product.productDescription}</i>
                  </p>
                  <Link to="/product" className="text-decoration-none">
                    <button
                      className="border-1 px-4 py-2 rounded-5"
                      style={{ background: "transparent", color: "green" }}
                    >
                      <i>Browse collection</i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End Gallery */}
      </div>
     
      <Footer />
    </div>
  );
};

export default Homepage;
