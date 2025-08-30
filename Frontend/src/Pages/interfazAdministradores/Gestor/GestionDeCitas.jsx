import { Search, Users } from 'lucide-react';
import CitaCard from '../components/CitaCard';
import FiltrosCitas from '../components/FiltrosCitas';

const GestionCitas = ({ 
  citas, 
  filtros, 
  setFiltros, 
  onEdit, 
  onSendReminder, 
  onMessage 
}) => {
  // Filtrar citas
  const citasFiltradas = citas.filter(cita => {// verifica si la cita cumple con los filtros
    return (
      (filtros.fecha === '' || cita.fecha === filtros.fecha) &&
      (filtros.tipo === '' || cita.tipo === filtros.tipo) &&
      (filtros.estado === '' || cita.estado === filtros.estado) &&
      (filtros.busqueda === '' || 
       cita.paciente.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
       cita.telefono.includes(filtros.busqueda))
    );
  });

  // Agrupar citas por tipo
  const citasPorTipo = {
    limpieza: citasFiltradas.filter(c => c.tipo === 'limpieza'),
    extraccion: citasFiltradas.filter(c => c.tipo === 'extraccion'),
    medicina: citasFiltradas.filter(c => c.tipo === 'medicina'),
    otro: citasFiltradas.filter(c => c.tipo === 'otro')
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <FiltrosCitas filtros={filtros} setFiltros={setFiltros} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(citasPorTipo).map(([tipo, citasTipo]) => (
          <div key={tipo} className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              <span className="ml-2 text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {citasTipo.length}
              </span>
            </h3>
            <div className="space-y-3">
              {citasTipo.map(cita => (
                <CitaCard
                  key={cita.id}
                  cita={cita}
                  onEdit={onEdit}
                  onSendReminder={onSendReminder}
                  onMessage={onMessage}
                />
              ))}
              {citasTipo.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No hay citas de este tipo</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionCitas;