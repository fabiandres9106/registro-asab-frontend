// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Toolbar, IconButton } from '@mui/material';
import { Event, People, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ open, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component={Link} to="/admin/events">
          <ListItemIcon><Event /></ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem button component={Link} to="/admin/person">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Person" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          transition: (theme) => theme.transitions.create(['width', 'transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
