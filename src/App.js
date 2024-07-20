import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Hearder";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import AdminRoutes from "./protected_routes/AdminRoutes";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import AdminProducts from "./pages/admin/dashboard/Products";
import AdminCategory from "./pages/admin/dashboard/Category";
import AdminNavLayout from "./pages/admin/dashboard/AdminNavBarLayout";
import Collections from "./pages/Collection";
import AdminEditCategory from "./pages/admin/AdminCategoryEdit";
import ProductDetail from "./components/ProductDetailCard";
import SendPasswordReset from "./pages/SendPasswordReset";
import CartProvider from "./context/cart/CartProvider";
import UserRoutes from "./protected_routes/UserRoutes";
import Cart from "./pages/CartPage";
import UserListing from "./pages/admin/dashboard/Users";
import MyOrders from "./pages/MyOrders";
import AllOrders from "./pages/admin/dashboard/Orders";
import FavoritePage from "./pages/FavoritePage";
import Delivery from "./pages/DeliveryDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(user?.isAdmin || false);
  }, []);

  // const renderNavbar = isAdmin ? <AdminNavLayout /> : <Navbar />;

  return (
      <Router>
      <CartProvider>

 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/forgot_password" element={<SendPasswordReset />} />
          <Route element={<UserRoutes/>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/delivery" element={<Delivery/>} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/payment-success" element={<PaymentSuccess/>} />
          <Route path="/favorites" element={<FavoritePage/>} />
          <Route path="/myOrders" element={<MyOrders/>} />

          </Route>

      
          <Route   path="/admin/*"  element={<AdminNavLayout/>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="edit-category/:id" element={<AdminEditCategory />} />
            <Route path="users" element={<UserListing />} />
            <Route path="orders" element={<AllOrders/>} />
            <Route path="edit/:id" element={<AdminEditProduct />} />
            </Route>
          
       
        </Routes>
        </CartProvider>
        <ToastContainer />
      </Router>
    
  );
}

export default App;


// <Route path="/admin/*" element={<AdminRoutes />}>
// <Route index element={<AdminNavLayout/>}/>
//   <Route path="dashboard" element={<AdminDashboard />} />
//   <Route path="products" element={<AdminProducts />} />
//   <Route path="categories" element={<AdminCategory />} />
//   <Route path="edit-category/:id" element={<AdminEditCategory />} />
//   <Route path="edit/:id" element={<AdminEditProduct />} />
// </Route>