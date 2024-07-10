import axios from 'axios';
import login_mock from '../mock/login_mock';

const backendURL  = 'http://localhost:5000';

describe("API Testing", () => {
    // testing /test endpoint
    it('GET /test | Test Should Work', async () => {
        const response = await axios.get(`${backendURL}/test`);
        expect(response.status).toBe(200)
    });

    // login test
    it('POST /api/user/login | Login Successful', async () => {
        const response = await axios.post(`${backendURL}/api/user/login`, login_mock)
        expect(response.status).toBe(200)
        expect(response.data.success).toBe(true)
        expect(response.data.token).toBeDefined()
        });

    // Get all products, each product name should match to
    // each actual product mock data
    it('GET /api/product/get_products | Should work', async() => {
        const response = await axios.get(`${backendURL}/api/product/get_products`);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe("All products fetched successfully!");
        expect(response.data.products).toBeDefined();
    
        // Iterate through each product in the response
        response.data.products.forEach(product => {
            // Ensure each product has all the expected properties
            expect(product._id).toBeDefined();
            expect(product.createdAt).toBeDefined();
            expect(product.productCategory).toBeDefined();
            expect(product.productDescription).toBeDefined();
            expect(product.productImageUrl).toBeDefined();
            expect(product.productName).toBeDefined();
            expect(product.productPrice).toBeDefined();
    
            // Optionally, you can check the types of each property if needed
            expect(typeof product._id).toBe('string');
            expect(typeof product.createdAt).toBe('string');
            expect(typeof product.productCategory).toBe('string');
            expect(typeof product.productDescription).toBe('string');
            expect(typeof product.productImageUrl).toBe('string');
            expect(typeof product.productName).toBe('string');
            expect(typeof product.productPrice).toBe('number');
        });
    });
    

    it('GET /api/product/get_products | Get All Products', async () => {
        const response = await axios.get(`${backendURL}/api/product/get_products`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("All products fetched successfully!");
        expect(response.data.products).toBeDefined();
    });

    it('GET /api/product/get_product/:id | Get Single Product', async () => {
        // Replace ":id" with a valid product ID
        const productId = '6594488e0d23a0cd9e06f2b2';
        const response = await axios.get(`${backendURL}/api/product/get_product/${productId}`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("Single product fetched successfully!");
        expect(response.data.product).toBeDefined();
    });


    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGQ1YzBlYzZlZTM5MzFkMTdhOTMwMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTQ2NDIwNn0.9tZhVIRFnxmpU501-mN0lFLLHL39boP-4KXk9446jZE';
    it('PUT /api/product/update_product/:id | Update Product', async () => {
        // Replace ":id" with a valid product ID
        const productId = '6594488e0d23a0cd9e06f2b2';
        const config = {
            headers: {
                authorization: `Bearer ${adminToken}`,
            }
        };
        const updatedProductData = {
            productName: 'Updated Test Product',
            productPrice: '19.99',
            productDescription: 'Updated test description',
            productCategory: 'Updated Test Category',
            productImageUrl: 'Updated Test Category'
            // You can also include productImage if needed
        };

        const response = await axios.put(`${backendURL}/api/product/update_product/${productId}`, updatedProductData, config);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("Product updated successfully without Image!");
        expect(response.data.updatedProduct).toBeDefined();
    });

  

    it('DELETE /api/product/delete_product/:id | Delete Product (Admin)', async () => {
        // Replace ":id" with a valid product ID
        const productId = '659448490d23a0cd9e06f2ae';

        const config = {
            headers: {
                authorization: `Bearer ${adminToken}`,
            }
        };

        const response = await axios.delete(`${backendURL}/api/product/delete_product/${productId}`, config);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(false);
        expect(response.data.message).toBe("Product deleted successfully!");
    });


    it('GET /api/product/search_products | Search Products', async () => {
        const query = 'test';
        const response = await axios.get(`${backendURL}/api/product/search_products?query=${query}`);
        expect(response.status).toBe(200);
        expect(response.data.products).toBeDefined();
    });


    it('GET /api/product/get_product_by_category/:category | Get Products by Category', async () => {
        // Replace ":category" with a valid category
        const category = 'test_category';
        const response = await axios.get(`${backendURL}/api/product/get_product_by_category/${category}`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe(`Products in category "${category}" fetched successfully!`);
        expect(response.data.products).toBeDefined();
    });

    // it('GET /api/product/get_counts | Get Counts', async () => {
    //     const response = await axios.get(`${backendURL}/api/product/get_counts`);
    //     expect(response.status).toBe(200);
    //     expect(response.data.productCount).toBeDefined();
    //     expect(response.data.categoryCount).toBeDefined();
    //     expect(response.data.orderCount).toBeDefined();
    //     expect(response.data.userCount).toBeDefined();
    // });

   

    it('POST /api/category/create_category | Create Category (Admin)', async () => {
        const newCategoryData = {
            categoryName: 'Test Category',
            description: 'Test category description'
        };

        const config = {
            headers: {
                'authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(`${backendURL}/api/category/create_category`, newCategoryData, config);
        expect(response.status).toBe(201);
        expect(response.data.success).toBe(true);
        expect(response.data.message).toBe("Category has been created");
    });

    it('GET /api/category/get_category | Get All Categories', async () => {
        const response = await axios.get(`${backendURL}/api/category/get_category`);
        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true); 
        expect(response.data.categories).toBeDefined();
    });

});



