import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaShoppingCart, FaBox, FaUsers, FaListAlt } from 'react-icons/fa';
import { Box, Divider, Drawer, Stack, useMediaQuery, SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation , useNavigate} from 'react-router-dom';
import { SideNavItem } from './SideNavItem';
import SimpleBar from 'simplebar-react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';


const Scrollbar = styled(SimpleBar)``;

export const items = [
  {
    title: 'Overview',
    path: '/admin/dashboard',
    icon: (
      <SvgIcon fontSize="small">
        <FaBox />
      </SvgIcon>
    )
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: (
      <SvgIcon fontSize="small">
        <FaBox />
      </SvgIcon>
    ),
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: (
      <SvgIcon fontSize="small">
        <FaListAlt />
      </SvgIcon>
    ),
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: (
      <SvgIcon fontSize="small">
        <FaUsers />
      </SvgIcon>
    ),
  },
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: (
      <SvgIcon fontSize="small">
        <FaShoppingCart />
      </SvgIcon>
    ),
  },
 
];

export const AdminSidebar = (props) => {
  const { open, onClose } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const lgUp = useMediaQuery('(min-width: 960px)');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onClose(); // Close the sidebar
    navigate('/login',{ replace: true });
    window.location.reload();
  };


 
  

  const content = (
    <Scrollbar
     sx={{
        height: "100vh",
        "& .simplebar-content": {
          height: "100vh",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: "#0a1c07"
        }}
      >
        <Divider />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
        <img src='/images/logo.png' width={250} height={80} alt=''></img>
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              mt: 4,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  key={item.title}
                  path={item.path}
                  icon={item.icon}
                  title={item.title}
                />
              );
            })}
            
          </Stack>
          
        </Box>
        <Divider />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Button
            onClick={handleLogout}
            variant="dark"
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
       
      </Box>
    </Scrollbar>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'var(--sidenav-color)',
          color: 'common.white',
          width: 280,
          maxHeight: '100vh',
          overflow: 'hidden',
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={lgUp ? 'permanent' : 'temporary'}
    >
      {content}
    </Drawer>
  );
};

AdminSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
