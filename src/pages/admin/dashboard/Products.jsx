import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
} from "../../../apis/Api";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [products, setProducts] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productCategory", productCategory);
    formData.append("productImage", productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) {
      return;
    } else {
      deleteProductApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset form fields and image preview on modal close
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductCategory("");
    setProductImage(null);
    setPreviewImage(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box width="10%">{/* Content for the first box (30% width) */}</Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div>
            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
              className="mb-2"
            >
              <Button variant="contained" color="success" onClick={handleOpen}>
                Add Product
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Product Image
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Product Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Product Price
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Product Category
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Product Description
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" fontWeight="bold">
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <img
                          src={item.productImageUrl}
                          height={40}
                          width={40}
                          alt="Product"
                        />
                      </TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>NPR.{item.productPrice}</TableCell>
                      <TableCell>{item.productCategory}</TableCell>
                      <TableCell>
                        {item.productDescription.slice(0, 10)}
                      </TableCell>
                      <TableCell>
                        <ButtonGroup
                          variant="outlined"
                          aria-label="outlined button group"
                        >
                          <Button>
                            <Link
                              className="text-decoration-none"
                              to={`/admin/edit/${item._id}`}
                            >
                              Edit
                            </Link>
                          </Button>
                          <Button onClick={() => handleDelete(item._id)}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Box>

      {/* Add Product Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            minWidth: 300,
            maxWidth: 500,
            maxHeight: "80vh", // Set max height to 80% of the viewport height
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create a new product!
          </Typography>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextareaAutosize
            aria-label="Product Description"
            placeholder="Product Description"
            rowsMin={4}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            style={{
              width: "100%",
              marginTop: 3,
              padding: 4,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select category</InputLabel>
            <Select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              label="Select category"
            >
              <MenuItem value="Beef">Beef</MenuItem>
              <MenuItem value="Pork">Pork</MenuItem>
              <MenuItem value="Chicken">Chicken</MenuItem>
              <MenuItem value="Lamb">Lamb</MenuItem>
            </Select>
          </FormControl>
          <label>Product Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ width: "100%", marginTop: 8 }}
          />

          {previewImage && (
            <img
              src={previewImage}
              alt=""
              style={{ width: "100%", marginTop: 8, borderRadius: 4 }}
            />
          )}

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              style={{ marginRight: 8 }}
            >
              Close
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Save changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminProducts;
