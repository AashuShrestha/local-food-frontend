import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../apis/Api";
import { FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const SendPasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    forgotPasswordApi({ email })
      .then((res) => {
        toast.success("Check your email for password reset link");
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again later.");
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box
      sx={{
        // backgroundImage: `url("/images/homepage.jpg")`, // Assuming the image is located in the public/images directory
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ mt: 8 }} style={{width:"300px"}}>
        <FaUserLock  size="230" color="blue"/>
        <Typography variant="h4" align="center">
            Reset Password
          </Typography>
      </Container>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center">
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: 50 }}
              style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}}
            >
              Send password reset
            </Button>
          </form>
             {/* Login buttons */}
             <div className="text-center d-flex mt-2">
                      <p>Back to login</p>
                      <Link to='/login'>
                        <label className="form-check-label mx-2 text-primary" htmlFor="form2Example33">
                          Login
                        </label>
                      </Link>
                    </div>
        </Paper>
      </Container>
    </Box>
  );
};

export default SendPasswordReset;
