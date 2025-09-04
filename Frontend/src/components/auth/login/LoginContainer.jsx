import React, { useState } from 'react';
import UserLoginForm from './UserLoginForm';
import AdminLoginForm from '../Login/AdminLoginForm';

const LoginContainer = () => {
  const [selectedRole, setSelectedRole] = useState('usuario');

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    
    <div className="w-full  max-w-lg mx-auto">
     
      <div className="mt-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Selecciona tu tipo de acceso</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => handleRoleChange('usuario')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                selectedRole === 'usuario'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/40 text-slate-700 hover:bg-white/60 border border-white/50 backdrop-blur-sm'
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
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                selectedRole === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                  : 'bg-white/40 text-slate-700 hover:bg-white/60 border border-white/50 backdrop-blur-sm'
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
      <div className="mt-6">
        {selectedRole === 'usuario' ? <UserLoginForm /> : <AdminLoginForm />}
      </div>


      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm text-slate-800">
          © 2025 DentalCare. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;