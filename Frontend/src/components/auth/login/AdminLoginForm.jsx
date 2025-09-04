import React, { useState } from 'react';
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginAdmin } = useAuth(); // Hook específico para login de admin
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('Intentando login con:', { username, password: '***' }); // Para debugging
    
    try {
     const userData = await loginAdmin(username, password); // Función específica para admin
      
       console.log('Login exitoso:', userData); // Para debugging

     navigate('/administracion'); // Redirige al dashboard de admin
    } catch (err) {
      setError('Credenciales de administrador incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-pink-200/60 py-5 px-7 shadow-xl rounded-2xl border border-gray-100 w-full  mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-5">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Acceso Administrativo</h3>
          <p className="mt-2 text-sm text-purple-600 font-medium">Panel de Control Avanzado</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="admin-username" className="block text-sm font-medium text-gray-700 mb-2">
              Usuario Administrador
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-gray-900 placeholder-gray-600"
                placeholder="Ingresa tu usuario de administrador"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña Administrativa
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-gray-900 placeholder-gray-600"
                placeholder="Ingresa tu contraseña administrativa"
              />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-purple-50/20 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <svg className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-purple-800 font-medium">Acceso Seguro</p>
              <p className="text-xs text-purple-700 mt-1">
                Este es un área restringida. Todas las actividades son monitoreadas y registradas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="admin-remember"
              name="admin-remember"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="admin-remember" className="ml-2 block text-sm text-gray-700">
              Mantener sesión activa
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200">
              Soporte técnico
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5 text-purple-300 group-hover:text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
            </span>
            {isLoading ? 'Verificando acceso...' : 'Acceder como Administrador'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Sistema administrativo seguro con autenticación de dos factores
        </p>
      </div>
    </div>
  );
};

export default AdminLoginForm;