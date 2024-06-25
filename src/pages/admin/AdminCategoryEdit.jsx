import { Box, Button, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleCategoryApi, updateCategoryApi } from "../../apis/Api"; // Assuming you have a corresponding API for category

const AdminEditCategory = () => {
  // receive category id from url
  const { id } = useParams();

  // load category data
  useEffect(() => {
    getSingleCategoryApi(id).then((res) => {
      setCategoryName(res.data.data.categoryName);
      setCategoryDescription(res.data.data.description);
    });
  }, [id]);

  // Make useState
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  // handle submit function
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      categoryName,
      categoryDescription,
    };

    // make an API call
    updateCategoryApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin/categories"); // assuming the route for listing all categories
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box width="40%"></Box>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <h3>
              Editing category - <span className="text-danger">{categoryName}</span>
            </h3>
            <form>
              <TextField
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                label="Category Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextareaAutosize
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder="Enter description"
                rowsMin={4}
                style={{ width: "100%", marginTop: 16, padding: 4, borderRadius: 4, border: "1px solid #ccc" }}
              />

              <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: 16, width: "100%" }}>
                Update category
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminEditCategory;
