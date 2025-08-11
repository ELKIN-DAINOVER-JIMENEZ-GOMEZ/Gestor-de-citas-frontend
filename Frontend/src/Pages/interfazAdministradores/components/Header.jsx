import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// Import icons from lucide-react
import { Calendar, MessageSquare, Bell, Clock, UserPlus } from 'lucide-react';

// Componente Header
const Header = ({ activeSection, setActiveSection, adminName }) => {
  const navigate = useNavigate();
  const {admin, logout} = useAuth(); //se usan llaves en vez de corchetes porque AuthContext devuelve un objeto con propiedades y funciones
  
  const handleLogout = () => {
    logout();
    alert('Sesión cerrada exitosamente');
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-700 font-bold text-lg">DC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">DentalCare</h1>
              <p className="text-sm opacity-90">Panel Administrativo</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {[
              { id: 'citas', label: 'Citas', icon: Calendar, route: '/administracion/citas' },
              { id: 'mensajes', label: 'Mensajes', icon: MessageSquare, route:'/administracion/mensajes'},
              { id: 'horarios', label: 'Horarios', icon: Clock, route: '/administracion/horarios' }
            ].map(({ id, label, icon: Icon, route }) => (
              <button
                key={id}
                onClick={() => navigate(route)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === id 
                    ? 'bg-white bg-opacity-20 text-purple-800'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
            
            {/* Enlace para registrar administrador */}
            <Link
              to="/administracion/register-admin"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-white hover:bg-opacity-10"
            >
              <UserPlus size={18} />
              <span>Registrar Admin</span>
            </Link>
          </nav>

          <div className="flex items-center justify-end space-x-10 pr-4">
            <Bell className="w-6 h-6 cursor-pointer hover:opacity-80" />
            <div className="flex items-center space-x-6">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-medium">Admin</span>
              </div>
              <span className="hidden md:block text-sm">Dr. {adminName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-purple-800  px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;