// src/components/Content.js
import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <Container sx={{ m: 0, p: 0, width: "100%", maxWidth: "100%" }}>
      <Grid container sx={{ m: 0, p: 0, width:"100%" }}>
        <Grid item xs={12}  sx={{ m: 0, p: 0, width:"100%" }}>
          
            <Outlet />
          
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;
