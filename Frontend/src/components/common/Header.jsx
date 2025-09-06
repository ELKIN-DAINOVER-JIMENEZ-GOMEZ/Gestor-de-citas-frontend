import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useScroll } from '../hooks/UseScroll';
const Header = () => {
  const {user, logout} = useAuth() // Simulación de usuario
  const {users, setUser} = useState(); // Estado del usuario
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {scrollToServicios} = useScroll();
  
  const handleLogout = () => {
    logout();
    alert('Sesión cerrada exitosamente');
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  const handleLogin = () => {
    setUser();
    alert('Sesión iniciada exitosamente');
    navigate('/pacientes/mis-citas'); // Redirige al dashboard después de iniciar sesión
  };

  const handleServicesClick = () => {
    // Aquí puedes usar el hook useScroll para hacer scroll a la sección de servicios
    scrollToServicios('servicios', '/'); 
  }
   const handleContactClick = () => {
    scrollToServicios('contacto', '/');
   }
   const handleInicioClick = () => {
    scrollToServicios('inicio', '/'); 
   }

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo y marca */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2 shadow-lg transform hover:scale-105 transition-transform duration-200">
              <svg className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight cursor-pointer hover:text-cyan-100 transition-colors">
                DentalCare
              </h1>
              <p className="text-xs text-blue-100 hidden sm:block">Sistema de Gestión Odontológica</p>
            </div>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={handleInicioClick} className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
              Inicio
            </button>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
                  Dashboard
                </Link>
               
                
                <Link to="/profile" className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
                  Perfil
                </Link>
              </>
            ) : (
              <>
               <button onClick={handleServicesClick} className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
                  Servicios
                </button>
                <button onClick={handleContactClick} className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
                  Contacto
                </button>
              </>
            )}
          </nav>

          {/* Sección usuario/autenticación */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-white/20 rounded-full p-2">
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-medium">Bienvenido</p>
                    <p className="text-xs text-blue-100">{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                 <Link to="/login" className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
                  iniciar Sesión
                </Link>
                <Link to="/register" className=" bg-white text-blue-600 hover:text-cyan-300 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white">
                  Registate
                </Link>
              </div>
            )}

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-cyan-100 p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700/95 backdrop-blur-sm rounded-lg mt-2 mb-4 shadow-xl border border-blue-500/20">
            <nav className="px-4 py-3 space-y-2">
              <button onClick={handleInicioClick} className="block text-white hover:text-cyan-100 font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors">
                Inicio
              </button>
              {user ? (
                <>
                  <Link to="/dashboard" className="block text-white hover:text-cyan-100 font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors">
                    Dashboard
                  </Link>
                  
                  <Link to="#" className="block text-white hover:text-cyan-100 font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors">
                    Perfil
                  </Link>
                  <div className="border-t border-blue-500/30 pt-3 mt-3">
                    <div className="flex items-center space-x-3 px-3 py-2 text-white">
                      <div className="bg-white/20 rounded-full p-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Conectado como</p>
                        <p className="text-xs text-blue-100">{user.username}</p>
                      </div>
                    </div>
                    <Link to="/register" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
                  Registate
                </Link>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={handleServicesClick} className="block text-white hover:text-cyan-100 font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors">
                    Servicios
                  </button>
                  <button onClick={handleContactClick} className="block text-white hover:text-cyan-100 font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors">
                    Contacto
                  </button>
                  <div className="border-t border-blue-500/30 pt-3 mt-3 space-y-2">
                     <Link to="/login" className="text-white hover:text-cyan-100 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-white/10">
                  iniciar Sesión
                </Link>
                    <Link to="/register" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200">
                      Registrarse
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;