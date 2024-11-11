import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ roles }) => {
    const { user, loading } = useContext(AuthContext);

    //console.log('User in PrivateRoute:', user);  // Verifica los datos del usuario

    if (loading) {
      return <div>Loading...</div>;  // O cualquier componente de carga que prefieras
    }

    if (!user) {
        // Usuario no autenticado
        return <Navigate to="/login" />;
    }

    if (roles && (!user.roles || !roles.some(role => user.roles.includes(role)))) {
        // Usuario autenticado pero no tiene el rol adecuado
        console.log('Unauthorized - Roles required:', roles, 'User roles:', user.roles);  // Verifica los roles requeridos y los roles del usuario
        return <Navigate to="/unauthorized" />;
    }

    // Usuario autenticado y tiene el rol adecuado
    return <Outlet />;
};

export default PrivateRoute;