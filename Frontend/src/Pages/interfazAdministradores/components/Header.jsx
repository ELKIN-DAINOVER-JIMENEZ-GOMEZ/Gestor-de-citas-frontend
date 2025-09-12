import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// Import icons from lucide-react
import { Calendar, MessageSquare, Bell, Clock, UserPlus, Menu, X, ChevronDown, User } from 'lucide-react';

// Componente Header
const Header = ({ activeSection, setActiveSection, adminName }) => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Referencias para detectar clics fuera de los menús
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigationItems = [
    { id: 'citas', label: 'Citas', icon: Calendar, route: '/administracion/citas' },
    { id: 'mensajes', label: 'Mensajes', icon: MessageSquare, route: '/administracion/mensajes' },
    { id: 'horarios', label: 'Horarios', icon: Clock, route: '/administracion/horarios' },
    { id: 'mensajesadmin', label: 'Mensajes Admin', icon: MessageSquare, route: '/administracion/mensajes-admin' }
  ];

  const handleLogout = () => {
    logout();
    alert('Sesión cerrada exitosamente');
    navigate('/login');
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleNavigation = (route, sectionId) => {
    navigate(route);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Efecto para cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar menús al cambiar de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo y título */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 font-bold text-sm sm:text-lg">DC</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-bold truncate">DentalCare</h1>
                <p className="text-xs sm:text-sm opacity-90 hidden sm:block">Panel Administrativo</p>
              </div>
            </div>

            {/* Navegación desktop - oculta en móvil y tablet */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navigationItems.map(({ id, label, icon: Icon, route }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(route, id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                    activeSection === id
                      ? 'bg-white bg-opacity-20 text-white shadow-md'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
              
              {/* Enlace para registrar administrador */}
              <Link
                to="/administracion/register-admin"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10 text-sm font-medium"
              >
                <UserPlus size={16} />
                <span>Registrar Admin</span>
              </Link>
            </nav>

            {/* Navegación tablet - solo iconos */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              {navigationItems.map(({ id, label, icon: Icon, route }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(route, id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    activeSection === id
                      ? 'bg-white bg-opacity-20 text-white shadow-md'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                  title={label}
                >
                  <Icon size={18} />
                </button>
              ))}
              
              <Link
                to="/administracion/register-admin"
                className="p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                title="Registrar Admin"
              >
                <UserPlus size={18} />
              </Link>
            </nav>

            {/* Sección derecha */}
            <div className="flex items-center space-x-2">
              {/* Notificaciones - siempre visible */}
              <button 
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                title="Notificaciones"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Menú de usuario - desktop y tablet */}
              <div className="hidden sm:block relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-sm font-medium hidden md:block max-w-24 truncate">
                    Dr. {adminName}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown del usuario */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900 truncate">Dr. {adminName}</p>
                      <p className="text-xs text-gray-500">Administrador</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>

              {/* Botón menú hamburguesa - móvil y tablet */}
              <button
                onClick={toggleMobileMenu}
                className="lg:flex xl:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil/tablet como overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden xl:hidden fixed inset-0 z-[60]">
          {/* Overlay de fondo */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Panel del menú */}
          <div 
            ref={mobileMenuRef}
            className="absolute top-14 sm:top-16 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl transform transition-all duration-300 ease-out"
          >
            <div className="h-full overflow-y-auto">
              <div className="p-4 space-y-2">
                {/* Información del usuario en mobile */}
                <div className="flex items-center space-x-3 p-4 bg-white bg-opacity-10 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">Dr. {adminName}</p>
                    <p className="text-xs opacity-80">Administrador</p>
                  </div>
                </div>

                {/* Enlaces de navegación */}
                <div className="space-y-1">
                  {navigationItems.map(({ id, label, icon: Icon, route }) => (
                    <button
                      key={id}
                      onClick={() => handleNavigation(route, id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 rounded-lg ${
                        activeSection === id
                          ? 'bg-white bg-opacity-20 font-medium shadow-md border-l-4 border-white'
                          : 'hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}

                  {/* Registrar Admin */}
                  <Link
                    to="/administracion/register-admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white hover:bg-opacity-10 transition-all duration-200 rounded-lg"
                  >
                    <UserPlus size={20} />
                    <span className="font-medium">Registrar Admin</span>
                  </Link>
                </div>

                {/* Botón cerrar sesión */}
                <div className="pt-6 mt-6 border-t border-white border-opacity-20">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-white text-purple-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 shadow-md"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;