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

  const register = async (username, email, password) => {
    await AuthService.register(username, email, password);
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Crear un Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
