
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {useNavigate } from 'react-router-dom';



const Header = () => {
  const location = useLocation();// Obtiene la ubicación actual 
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert('Sesión cerrada exitosamente');
    navigate('/login'); // Redirige al login después de cerrar sesión
    
  };
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/rutaPaciente" className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                  m
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">DentalCare</h1>
                <p className="text-blue-100 text-sm">Sistema de Gestión Odontológica</p>
              </div>
            </Link>
             <Link
              to="/paciente/mis-citas"
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive('paciente/mis-citas')
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-white hover:text-gray-700'
              }`}
            >
              Mis Citas
            </Link>
            <Link
              to="/paciente/nueva-cita"
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive('paciente/nueva-cita')
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-white hover:text-gray-700'
              }`}
            >
              Nueva Cita
            </Link>
            <Link
              to="/paciente/contacto"
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive('paciente/contacto')
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-white hover:text-gray-700'
              }`}
            >
              Contacto
            </Link>
            <Link
                to="/paciente/mis-mensajes"
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  isActive('/paciente/mis-mensajes')
                    ? 'border-blue-500 text-blue-600'
                    :'border-transparent text-white hover:text-gray-700'
                }`}
              >
                Mis Mensajes
              </Link>
           
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-sm">Bienvenido</span>
              </div>
              <button
                onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      
    </>
  );
};

export default Header;