import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate('/admin/events/1/event_dates_list');
        }
    }, [auth, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginUser(email, password);
        if (success) {
            navigate('/admin/events/1/event_dates_list');
        } else {
            setError('Error en usuario o contraseña');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p:1
                }}
            >
                <Typography component="h1" variant="h5"
                    sx={{
                        textAlign:"center",
                        fontSize:"1.3rem",
                        my:5
                    }}
                >
                    Sistema de Caracterización de Públicos para las Artes Escéncias
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Box>
        </Container>
    );
};

export default Login;