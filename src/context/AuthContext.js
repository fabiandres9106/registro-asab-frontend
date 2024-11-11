import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Importación como named import

import publicApiClient from "../components/axiosPublicConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem('authTokens');
        return tokens ? JSON.parse(tokens) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authTokens) {
            try {
                const decodedToken = jwtDecode(authTokens.access_token);
                //console.log('Decoded token:', decodedToken);
                setUser({
                    user_id: decodedToken.user_id,
                    email: decodedToken.email,
                    roles: decodedToken.roles || []  // Asegúrate de que roles esté definido
                });
                //console.log("Usuario seteado", user);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                logoutUser();  // Opcional: Cierra sesión si el token es inválido
            }
        }
        setLoading(false);
    }, [authTokens]);

    const loginUser = async (email, password) => {
        try {
            const response = await publicApiClient.post('/auth/login', { email, password });
            const data = response.data;
            //console.log('Received tokens:', data);

            setAuthTokens(data);  // Asegúrate de establecer el objeto completo en el estado
            localStorage.setItem('authTokens', JSON.stringify(data));

            const decodedToken = jwtDecode(data.access_token);  // Decodifica correctamente usando el token recibido
            //console.log('Decoded token after login:', decodedToken);
            setUser({
                user_id: decodedToken.user_id,
                email: decodedToken.email,
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
