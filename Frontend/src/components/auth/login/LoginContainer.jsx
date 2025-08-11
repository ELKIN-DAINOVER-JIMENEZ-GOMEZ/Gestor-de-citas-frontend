import React, { useState } from 'react';
import UserLoginForm from './UserLoginForm';
import AdminLoginForm from './AdminLoginForm';

const LoginContainer = () => {
  const [selectedRole, setSelectedRole] = useState('usuario');//el estado es usuario ya que es el rol por defecto y el que se muestra al cargar la página

  const handleRoleChange = (role) => {//funcion para cambiar el rol seleccionado
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Header Section */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">DentalCare</h2>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestión Odontológica</p>
        </div>

        {/* Role Selection Buttons */}
        <div className="bg-white py-6 px-6 shadow-xl rounded-2xl border border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Selecciona tu tipo de acceso</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => handleRoleChange('usuario')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] ${
                  selectedRole === 'usuario'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Usuario</span>
                </div>
              </button>
              
              <button
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Admin</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Render Selected Form */}
        {selectedRole === 'usuario' ? <UserLoginForm /> : <AdminLoginForm />}//si el rol seleccionado es usuario, renderiza el formulario de usuario, si no, el de admin

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © 2024 DentalCare. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;