import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Configuration for axios
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

// Creating test API
export const testApi = () => Api.get("/test");

// Creating register API
export const registerApi = (data) => Api.post("/api/user/create", data);

// Creating login API
export const loginApi = (data) => Api.post("/api/user/login", data);

// Change password API
export const changePasswordApi = (data) =>
  Api.post("/api/user/change_password", data);

// Forgot password API
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot_password", data);

// Update user profile API
export const updateUserApi = (userId, formData) =>
  Api.put(`/api/user/update_profile/${userId}`, formData);

export const getAllUsersApi = () => Api.get("/api/user/get_all_users");

// Create product API
export const createProductApi = (formData) =>
  Api.post("/api/product/create_product", formData);

// Get products API
export const getAllProductsApi = () => Api.get("/api/product/get_products");

// Get single product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);

// Get product counts API
export const getCounts = () =>
  Api.get("/api/product/get_counts");

// Search product API
export const searchProductsApi = (query) =>
  Api.get(`/api/product/search_products?query=${query}`);

// Update product API
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config);

// Get products by category API
export const getProductsByCategoryApi = (category) =>
  Api.get(`/api/product/get_product_by_category/${category}`);

// Delete product API
export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config);

// Create category API
export const createCategoryApi = (formData) =>
  Api.post("/api/category/create_category", formData, config);

// Update category API
export const updateCategoryApi = (id, formData) =>
  Api.put(`/api/category/update_category/${id}`, formData, config);

// Get single category API
export const getSingleCategoryApi = (id) =>
  Api.get(`/api/category/get_category/${id}`);

// Get all categories API
export const getAllCategoriesApi = () => Api.get("/api/category/get_category");

// Delete category API
export const deleteCategoryApi = (id) =>
  Api.delete(`/api/category/delete_category/${id}`, config);

// Get cart by ID API
export const getCartByIdApi = (id) =>
  Api.get(`/api/cart/get_cart/${id}`, config);

// Add to cart API
export const addToCartApi = (data) =>
  Api.post("/api/cart/addToCart", data, config);

// Delete product from cart API
export const deleteProductFromCartApi = (userId, productId) =>
  Api.delete(`/api/cart/deleteFromCart/${userId}/${productId}`, config);

// Order API
// Create order API
export const createOrderApi = (data) =>
  Api.post("/api/order/create_order", data);
  
// Get all orders API
export const getAllOrdersApi = () =>
  Api.get("/api/order/get_all_orders", config);
  
// Get single order by ID API
export const getSingleOrderApi = (userId) => Api.get(`/api/order/get_order_by_id/${userId}`);

// Favorite API
// Get favorites by user ID
export const getFavoritesByUserIdApi = (userId) =>
  Api.get(`/api/favorites/get_favorites/${userId}`, config);

// Add to favorites
export const addToFavoritesApi = (data) =>
  Api.post("/api/favorites/add_to_favorites", data, config);

// Remove from favorites
export const removeFromFavoritesApi = (userId, productId) =>
  Api.delete(`/api/favorites/remove_from_favorites/${userId}/${productId}`, config);


export const verifyPaymentApi = (data) => Api.post('/api/payment/verify-payment', data)


