import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem('authTokens');
        return tokens ? JSON.parse(tokens) : null;
    });

    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        if (authTokens) {
            const decodedToken = jwtDecode(authTokens.access);
            console.log('Decoded token:', decodedToken);
            setUser({
                username: decodedToken.username,
                roles: decodedToken.roles || []  // Asegúrate de que roles esté definido
            });
        }
        setLoading(false)
    }, [authTokens]);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            const data = response.data;
            console.log('Received tokens:', data);
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
            const decodedToken = jwtDecode(data.access);
            console.log('Decoded token after login:', decodedToken);
            setUser({
                username: decodedToken.username,
                roles: decodedToken.roles || []  // Asegúrate de que roles esté definido
            });
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
