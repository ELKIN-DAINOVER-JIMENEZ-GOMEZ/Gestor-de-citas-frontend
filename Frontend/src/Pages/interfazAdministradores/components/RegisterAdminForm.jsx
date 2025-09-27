import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../../Services/AuthService'; // Asegúrate de que la ruta sea correcta

const RegisterAdminForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      // Llamada a AuthService.register con rol 'admin' por defecto
      const response = await AuthService.register(username, email, password, 'admin');
      setMessage('¡Administrador registrado exitosamente!');
      
      // Limpiar formulario después del éxito
      setTimeout(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setMessage('');
      }, 3000);
      
    } catch (err) {
      setError('Error al registrar el administrador. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md relative z-10 animate-slideInUp">
        {/* Logo and Title */}
        <div className="text-center mb-8 animate-fadeInDown">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce-slow">
            <span className="text-white font-bold text-2xl">DC</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            DentalCare
          </h1>
          <p className="text-purple-200 text-lg font-medium animate-pulse">
            Panel Administrativo
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border border-white/20 transform hover:scale-[1.01] transition-all duration-300 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          
          {/* Back Button Inside Form */}
          <div className="mb-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <Link 
              to="/administracion"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-all duration-200 text-sm font-medium group transform hover:scale-105"
            >
              <svg className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Regresar al Dashboard
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-xl transform hover:rotate-12 hover:scale-110 transition-all duration-300">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Registrar Nuevo Administrador
              </h3>
              <p className="text-purple-600 font-medium text-sm">
                Crear cuenta administrativa
              </p>
            </div>

            {/* Success Message */}
            {message && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 transform animate-slideInRight shadow-lg">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-green-800">{message}</p>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 transform animate-slideInRight shadow-lg">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Username Field */}
              <div className="animate-fadeInLeft" style={{ animationDelay: '0.8s' }}>
                <label htmlFor="admin-username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre de Usuario
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 bg-gray-50 hover:bg-white hover:border-purple-300 disabled:bg-gray-100 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                    placeholder="Ingresa el nombre de usuario"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="animate-fadeInLeft" style={{ animationDelay: '1s' }}>
                <label htmlFor="admin-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Administrativo
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 bg-gray-50 hover:bg-white hover:border-purple-300 disabled:bg-gray-100 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                    placeholder="Ingresa el email del administrador"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="animate-fadeInLeft" style={{ animationDelay: '1.2s' }}>
                <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña Administrativa
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 bg-gray-50 hover:bg-white hover:border-purple-300 disabled:bg-gray-100 disabled:cursor-not-allowed transform hover:scale-[1.01]"
                    placeholder="Ingresa la contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center disabled:cursor-not-allowed group transform hover:scale-110 transition-all duration-200"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-purple-400 hover:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-purple-400 hover:text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Info */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 animate-fadeIn" style={{ animationDelay: '1.4s' }}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-purple-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-800 mb-1">
                    Permisos Administrativos
                  </p>
                  <p className="text-xs text-purple-700">
                    Este usuario será registrado con permisos completos de administrador del sistema.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="animate-fadeInUp" style={{ animationDelay: '1.6s' }}>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  {isLoading ? (
                    <svg className="animate-spin h-6 w-6 text-purple-200" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-purple-200 group-hover:text-white transition-colors duration-200 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </span>
                <span className="relative">
                  {isLoading ? 'Registrando administrador...' : 'Registrar Administrador'}
                </span>
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-8 text-center opacity-0 animate-fade-in" style={{ animationDelay: '1.8s' }}>
            <p className="text-xs text-gray-500 font-medium">
              🔒 Solo los administradores pueden crear nuevas cuentas de administrador
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        /* Responsive improvements */
        @media (max-width: 640px) {
          .animate-slideInUp,
          .animate-fadeInDown,
          .animate-fadeInLeft,
          .animate-fadeInUp,
          .animate-fadeIn {
            animation-duration: 0.4s;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterAdminForm;