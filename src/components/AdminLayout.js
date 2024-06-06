// src/components/AdminLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import Content from './Content'; // Importar el componente Content

const drawerWidth = 240;

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sistema de Caracterización de Públicos para las Artes Escénicas
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
          transition: (theme) =>
            theme.transitions.create(['margin-left', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: `-${drawerWidth}px`,
          width: '100%',
        }}
      >
        <Toolbar />
        <Content />
      </Box>
    </Box>
  );
};

export default AdminLayout;
