import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <Container maxWidth="sm">
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h1" component="div" gutterBottom>
                    Acceso no autorizado
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                    No tienes permiso para acceder a esta página.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/login"
                    sx={{ mt: 3 }}
                >
                    Volver al Inicio de Sesión
                </Button>
            </Box>
        </Container>
    );
};

export default Unauthorized;