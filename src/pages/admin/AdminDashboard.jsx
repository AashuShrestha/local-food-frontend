import React, { memo, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import { FaFilter, FaStore, FaTruck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SideNavItem } from "./dashboard/SideNavItem";
import { getCounts } from "../../apis/Api";

const DashboardCard = memo(({ icon, title, iconColor, value }) => {
  
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={6}>
        <Card>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  {title}
                </Typography>
                <Typography variant="h4">{value || 0}</Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: iconColor,
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>{icon}</SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
});

const AdminDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    //call api to get all counts
    getCounts().then((res)=>{
      setProductCount(res.data.productCount);
      setCategoryCount(res.data.categoryCount); // Corrected to set category count
      setOrderCount(res.data.orderCount); // Corrected to set order count
      setUserCount(res.data.userCount); // Corrected to set user count
    });
  }, []);
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box width="10%">{/* Content for the first box (30% width) */}</Box>
        <Box
          sx={{
            flexGrow: 1,
            mt: 7,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <DashboardCard
                icon={<FaStore />}
                title="Total Products"
                iconColor="primary.main"
                value={productCount}
                // value={10}
              />

              <DashboardCard
                icon={<FiShoppingBag />}
                title="Total Orders"
                iconColor="error.main"
                value={orderCount}
              />

              <DashboardCard
                icon={<FiUsers />}
                title="Total Users"
                iconColor="blue"
                value={userCount}
              />

              <DashboardCard
                icon={<FaFilter />}
                title="Total Categories"
                iconColor="success.main"
                value={categoryCount}
              />
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
