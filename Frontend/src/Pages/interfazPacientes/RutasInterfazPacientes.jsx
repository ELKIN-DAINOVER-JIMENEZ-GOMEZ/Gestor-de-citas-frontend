import CitasAgendadas from "./CitasAgendadas"
import Contacto from "./Contacto"
import PacienteLayout from "./PacienteLayout"
import NuevaCita from "./NuevaCita"
import MensajesRecibidosUser from "./MensajesRecibidosUser"
import {Routes, Route} from "react-router-dom"
function RutasInterfazPaciente() {
  return (
    <Routes>
        <Route path="/" element={<PacienteLayout />}>
            <Route index element={<CitasAgendadas />} />
            <Route path="mis-citas" element={<CitasAgendadas />} />
            <Route path="nueva-cita" element={<NuevaCita />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="mis-mensajes" element={<MensajesRecibidosUser />} />
        </Route>
    </Routes>
  )
}

export default RutasInterfazPaciente
