import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LocalGroceryStoreTwoTone from "@mui/icons-material/LocalGroceryStoreTwoTone";
import { FavoriteBorderOutlined } from "@mui/icons-material";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleFavoriteClick = () => {
    navigate("/favorites");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
       background: "linear-gradient(45deg, #fab96d, #ff650f)",
        color: "#000",
        display: { xs: "none", sm: "block" },
      }}
    >
      <Toolbar>
        <Typography
          variant="p"
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          <img
            src="images/logo.png"
            alt="Local Food shop Logo"
            width="70"
            height="55"
            style={{ marginRight: "10px" }}
          />
        </Typography>

        <Button color="inherit" component={RouterLink} to="/"  sx={{ mx: 2 }}>
          <Typography variant="body1" fontWeight="bold" color='white'>
            Home
          </Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/product"  sx={{ mx: 2}}>
          <Typography variant="body1" fontWeight="bold" color='white'>
            Products
          </Typography>
        </Button>
        <Button color="inherit" component={RouterLink} to="/myOrders"  sx={{ mx: 2}}>
          <Typography variant="body1" fontWeight="bold" color='white'>
            My Orders
          </Typography>
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {user && isAdmin === false ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalGroceryStoreTwoTone
              sx={{ color: "white", marginRight: "25px", cursor: "pointer" }}
              onClick={handleCartClick}
            />
            <FavoriteBorderOutlined
              sx={{ color: "white", marginRight: "25px", cursor: "pointer" }}
              onClick={handleFavoriteClick}
            />
            <Avatar
              alt={user?.firstName}
              src="images/profile.png"
              sx={{ width: 25, height: 25, marginRight: 1 }}
            />
            <Button color="inherit" onClick={handleMenu}>
              {user.firstName}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={RouterLink} to="/profile">
                My profile
              </MenuItem>
              <MenuItem component={RouterLink} to="/changePassword">
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ mx: 1 }}
            >
              <Typography variant="body1" fontWeight="normal">
                Login
              </Typography>
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/register"
              sx={{ mx: 1 }}
            >
              <Typography variant="body1" fontWeight="normal">
                Register
              </Typography>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

// import AppBar from "@mui/material/AppBar";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import React from "react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import LocalGroceryStoreTwoTone from "@mui/icons-material/LocalGroceryStoreTwoTone";

// const Navbar = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isAdmin = user?.isAdmin;

//   const navigate = useNavigate();

//   const handleCartClick = () => {
//     navigate("/cart");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         background: "#fff",
//         color: "#000",
//         display: { xs: "none", sm: "block" },
//       }}
//     >
//       <Toolbar>
//         <Typography
//           variant="p"
//           component={RouterLink}
//           to="/"
//           color="inherit"
//           sx={{ flexGrow: 1 }}
//         >
//           <img
//             src="images/logo.png"
//             alt="Local Food shop Logo"
//             width="70"
//             height="55"
//             style={{ marginRight: "10px" }}
//           />
//         </Typography>

//         <Button color="inherit" component={RouterLink} to="/">
//           Home
//         </Button>
//         <Button color="inherit" component={RouterLink} to="/product">
//           Collections
//         </Button>
//         <Button color="inherit" component={RouterLink} to="/myOrders">
//           My Orders
//         </Button>

//         <Box sx={{ flexGrow: 1 }} />

//         {user && isAdmin === false ? (
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <LocalGroceryStoreTwoTone
//               sx={{ color: "green", marginRight: "25px", cursor: "pointer" }}
//               onClick={handleCartClick}
//             />
//             <Avatar
//               alt={user?.firstName}
//               src="images/profile.png"
//               sx={{ width: 25, height: 25, marginRight: 1 }}
//             />
//             <Button color="inherit" onClick={handleMenu}>
//               {user.firstName}
//             </Button>
//             <Menu
//               id="user-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//             >
//               <MenuItem component={RouterLink} to="/profile">
//                 My profile
//               </MenuItem>
//               <MenuItem component={RouterLink} to="/changePassword">
//                 Change Password
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <>
//             <Button
//               color="inherit"
//               component={RouterLink}
//               to="/login"
//               sx={{ mx: 1 }}
//             >
//               Login
//             </Button>
//             <Button
//               color="inherit"
//               component={RouterLink}
//               to="/register"
//               sx={{ mx: 1 }}
//             >
//               Register
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
