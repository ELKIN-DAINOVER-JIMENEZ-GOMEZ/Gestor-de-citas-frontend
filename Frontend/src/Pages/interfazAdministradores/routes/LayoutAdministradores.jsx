import React from 'react'
import { Routes,Route } from 'react-router-dom'
import RutaAdministracion from './RutaAdministracion'
import RegisterAdminForm from '../components/RegisterAdminForm'

import DashboardAdmin from '../DashboardAdmin'
import GestionDeHorarios from '../Gestor/GestionDeHorarios'
import MensajesAdmin from '../Gestor/GestorMensajesAdmin'

import MensajesRecibidosAdmin from '../Gestor/MensajesRecibidosAdmin'
function LayoutAdministradores() {
  return (
     <Routes>
      
      <Route path="/" element={<RutaAdministracion />}>
        {/* The index route defaults to the citas dashboard */}
        <Route index element={<DashboardAdmin />} /> 
        <Route path="citas" element={<DashboardAdmin />} />
        <Route path="horarios" element={<GestionDeHorarios />} />
        <Route path="mensajes" element={<MensajesAdmin />} />
        <Route path="register-admin" element={<RegisterAdminForm />} />
        <Route path="mensajes-admin" element={<MensajesRecibidosAdmin />} />
      </Route>
    </Routes>
  )
}

export default LayoutAdministradores
