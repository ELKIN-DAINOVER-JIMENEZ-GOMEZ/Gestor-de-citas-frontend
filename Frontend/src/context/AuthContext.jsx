import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/AuthService';
import LoadingSpinner from '../components/common/LoadingSpinner';

// 1. Crear el Contexto
const AuthContext = createContext(null);

// 2. Crear el Proveedor del Contexto
export const AuthProvider = ({ children }) => { //el proveedor es un componente que envuelve toda la aplicación y proporciona el contexto de autenticación
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar el usuario desde el localStorage al iniciar la app
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();// Obtiene el usuario actual desde el servicio de autenticación
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const userData = await AuthService.login(username, password);
    setUser(userData);
  };



    // Función específica para login de administradores
  const loginAdmin = async (username, password) => {
    try {
      const userData = await AuthService.login(username, password);
      
      // Verificar si el usuario tiene rol de admin (puedes ajustar esta validación según tu backend)
      if (!userData.roles || !userData.roles.includes('ROLE_ADMIN')) {
        throw new Error('No tienes permisos de administrador');
      }
      
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error en loginAdmin:', error);
      throw error;
    }
  };




   const register = async (username, email, password, role = 'user') => {
    return await AuthService.register(username, email, password, role);
  };

  const registerAdmin = async (username, email, password) => {
    return await AuthService.register(username, email, password, 'admin');
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };
  
  // Muestra un spinner mientras se verifica el estado de autenticación inicial
  if (loading) {
    return <LoadingSpinner />;
  }

   return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      loginAdmin, // Agregamos la función loginAdmin
      register, 
      registerAdmin,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Crear un Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
