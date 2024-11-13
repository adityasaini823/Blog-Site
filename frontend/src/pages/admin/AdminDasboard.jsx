import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  AppBar,
  IconButton,
  useTheme,
} from '@mui/material';
import { MenuBook, LibraryBooks, Menu } from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme(); // Access the theme for custom styles
  const navigate = useNavigate(); // React Router's navigate function
  const location = useLocation(); // Current location to sync active state

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = [
    { label: 'Stories', path: '/admins/stories', icon: <MenuBook /> },
    { label: 'Categories', path: '/admins/categories', icon: <LibraryBooks /> },
    { label: 'AddStory', path: '/admins/add-story', icon: <MenuBook /> },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {drawerItems.map((item) => (
          <ListItem
            key={item.label}
            button
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false); // Close drawer on mobile after navigation
            }}
            sx={{
              backgroundColor: location.pathname === item.path ? theme.palette.primary.main : 'transparent',
              color: location.pathname === item.path ? '#fff' : 'inherit',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: '#fff',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? '#fff' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', width: '100vw' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="admin options"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet /> {/* Placeholder for nested routes */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
