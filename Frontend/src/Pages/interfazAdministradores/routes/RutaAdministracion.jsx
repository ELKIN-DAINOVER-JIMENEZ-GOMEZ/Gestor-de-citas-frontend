import React from 'react'
import { Outlet } from 'react-router-dom'

import DashboardAdmin from '../DashboardAdmin'
function RutaAdministracion() {
  return (
    <div>
      
      <main>
        <Outlet />
      </main>
      <DashboardAdmin />
    </div>
  )
}

export default RutaAdministracion
