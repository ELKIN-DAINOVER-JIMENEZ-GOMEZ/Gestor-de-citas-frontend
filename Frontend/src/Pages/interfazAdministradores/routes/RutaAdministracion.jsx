import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './../components/Header';
import AuthService from '../../../services/AuthService'; 

function RutaAdministracion() {
  const [activeSection, setActiveSection] = useState('citas');
  const location = useLocation();
  const user = AuthService.getCurrentUser();
  const adminName = user?.username || 'Admin';

  // Detectar automáticamente la sección activa basada en la URL
  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('/register-admin')) {
      setActiveSection('register-admin');
    } else if (path.includes('/mensajes-admin')) {
      setActiveSection('mensajesadmin');
    } else if (path.includes('/mensajes')) {
      setActiveSection('mensajes');
    } else if (path.includes('/horarios')) {
      setActiveSection('horarios');
    } else if (path.includes('/citas') || path === '/administracion' || path === '/administracion/') {
      setActiveSection('citas');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        adminName={adminName}
      />
      
      {/* The Outlet will render the specific page component (Dashboard, Horarios, etc.) */}
      <main className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default RutaAdministracion;