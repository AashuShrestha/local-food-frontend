import React from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Grid, Box } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box sx={{  background: "linear-gradient(45deg, #fab96d, #ff650f)", pt: 8, pb: 6, color: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                About Us
              </Typography>
              <Typography variant="body2" component="p">
                Your Local Foood shop description and information can go here.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              <Typography variant="body2" component="p">
                <Link
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  About Us
                </Link>
              </Typography>
              <Typography variant="body2" component="p">
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Contact Us
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Support
              </Typography>
              <Typography variant="body2" component="p">
                <Link
                  to="/faq"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  FAQ
                </Link>
              </Typography>
              <Typography variant="body2" component="p">
                <Link
                  to="/terms"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Terms & Conditions
                </Link>
              </Typography>
              <Typography variant="body2" component="p">
                <Link
                  to="/privacy"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Privacy Policy
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Connect With Us
              </Typography>
              <Typography variant="body2" component="p">
                Address: 123 Local Foood Shop St, City, Country
              </Typography>
              <Typography variant="body2" component="p">
                Phone: +1234567890
              </Typography>
              <Typography variant="body2" component="p">
                Email: info@Local Fooodshop.com
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box style={{background: "linear-gradient(45deg, #fab96d, #ff650f)",}} color="white" p={2} textAlign="center">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Local Foood Shop. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
