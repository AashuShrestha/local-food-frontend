import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoriesApi,
} from "../../../apis/Api";
import ButtonGroup from '@mui/material/ButtonGroup';

const AdminCategories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllCategoriesApi().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset form fields on modal close
    setCategoryName("");
    setCategoryDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("description", categoryDescription);

    createCategoryApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Reload categories after successful creation
          getAllCategoriesApi().then((res) => {
            setCategories(res.data.categories);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCategoryApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // Reload categories after successful deletion
          getAllCategoriesApi().then((res) => {
            setCategories(res.data.categories);
          });
        }
      });
    }
  };

  return (
    <>
    <Box sx={{
      display: 'flex',
    }}>
    <Box width="10%">
        {/* Content for the first box (30% width) */}
      </Box>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }} className="mb-2">
              <Button variant="contained" color="error" onClick={handleOpen}>
                Add Category
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> <Typography variant="p" fontWeight="bold">
                    Category Name
                      </Typography></TableCell>
                    <TableCell> <Typography variant="p" fontWeight="bold">
                    Category Name
                      </Typography></TableCell>
                    <TableCell> <Typography variant="p" fontWeight="bold">
                    Actions
                      </Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.categoryName}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                          {/* Assuming there's an edit route for categories as well */}
                          <Button><Link className='text-decoration-none' to={`/admin/edit-category/${item._id}`}>Edit</Link></Button>
                          <Button onClick={() => handleDelete(item._id)}>Delete</Button>
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
        
  

      {/* Add Category Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            minWidth: 300,
            maxWidth: 500,
            backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create a new category!
          </Typography>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <TextField
            label="Category Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />

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

export default AdminCategories;
