import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './components/common/Header';
import ProtectedRoute from './components/auth/ProtectedRouter.jsx';

import LoginPage from './Pages/paginasPublicas/LoginPage.jsx';
import RegisterPage from './Pages/paginasPublicas/RegisterPage.jsx';
import DashboardPage from './Pages/paginasPublicas/Dashboard.jsx';
import ProfilePage from './Pages/paginasPublicas/ProfilePage.jsx';
import Inicio from './Pages/paginasPublicas/Inicio.jsx'; // Asegúrate de que este componente esté exportado correctamente



function App() {

  return (
    <AuthProvider>
      <Router>
        
        <main>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<><Header /> <LoginPage /></>} />
            <Route path="/register" element={<> <Header/> <RegisterPage /></>} />

            <Route path="/" element={ <><Header/> <Inicio/></>}/>
            
           
            
            {/* Rutas Protegidas */}
            <Route element={<ProtectedRoute />}>
            <Route path="/administracion/*" element={<LayoutAdministradores />} />
            <Route path="/Paciente/*" element={<RutasInterfazPaciente />} />
              <Route path="/dashboard" element={<> <Header/> <DashboardPage /></>} />
              <Route path="/profile" element={<><Header/><ProfilePage /> </>} />
            </Route>
            
            {/* Ruta para cualquier otra URL no definida */}
            <Route path="*" element={<h2>404: Página no encontrada</h2>} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  )
}

export default App
