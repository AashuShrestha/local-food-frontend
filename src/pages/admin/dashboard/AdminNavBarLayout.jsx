


import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AdminSidebar } from "./SideNav";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const AdminNavLayout = () => {
  const [openNav, setOpenNav] = React.useState(true);
  return (
    <div>
      <AdminSidebar onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </div>
  );
};

export default AdminNavLayout;
