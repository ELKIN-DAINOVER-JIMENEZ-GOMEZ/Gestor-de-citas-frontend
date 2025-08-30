import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Clock, Eye, EyeOff } from 'lucide-react';
import horarioApiService from '../../../services/HorarioApiService'; // Asegúrate de que la ruta sea correcta

// Componente para gestionar horarios
// Este componente permite a los administradores agregar, editar y eliminar horarios
// También muestra una lista de horarios existentes con su estado de disponibilidad

const GestionHorarios = () => {

  const [horarios, setHorarios] = useState([]);// Estado para almacenar los horarios
  const [isloading, setIsLoading] = useState(true);// Estado para manejar la carga de datos
   const [error, setError] = useState(null);// Estado para manejar errores 
  const [nuevoHorario, setNuevoHorario] = useState({ 
     fecha: '',
     hora: '',
     disponible: true });// Estado para manejar el nuevo horario que se va a agregar
  
    // Cargar horarios al montar el componente
   useEffect(() => {
    cargarHorarios();
   }, []);

    const cargarHorarios = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const horariosData = await horarioApiService.obtenerTodosLosHorarios();
      setHorarios(horariosData);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
      setError('Error al cargar los horarios. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const agregarHorario = async () => {
    if (!nuevoHorario.fecha || !nuevoHorario.hora) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const horarioData = {
        fecha: nuevoHorario.fecha,
        hora: nuevoHorario.hora,
        disponible: nuevoHorario.disponible
      };

      await horarioApiService.crearHorario(horarioData);// se llama al servicio para crear un nuevo horario
      
      // Recargar horarios
      await cargarHorarios();
      
      // Limpiar formulario
      setNuevoHorario({ fecha: '', hora: '', disponible: true });
      
    } catch (error) {
      console.error('Error al agregar horario:', error);
      setError(error.message || 'Error al agregar el horario.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleDisponibilidad = async (id, disponibleActual) => {// Cambia el estado de disponibilidad de un horario
    try {
      setError(null);//tiene que ser null para que no se muestre un error anterior
      await horarioApiService.actualizarDisponibilidad(id, !disponibleActual);//!disponibleActual es el estado actual de disponibilidad del horario y lo que se hace es cambiarlo a su opuesto
      
      // Actualizar estado local
      setHorarios(horarios.map(h => 
        //h.id es el id del horario que se está actualizando y se usa para encontrar el horario específico en la lista de horarios
        //  h.id === id es la condición que verifica si el id del horario actual coincide con el id del horario que se está actualizando
        // se usa el operador ternario para actualizar el estado del horario específico
        h.id === id ? { ...h, disponible: !disponibleActual } : h// se actualiza el estado del horario específico
      ));
      
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error);
      setError('Error al actualizar la disponibilidad del horario.');
    }
  };

   const eliminarHorario = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      return;
    }

    try {
      setError(null);
      await horarioApiService.eliminarHorario(id);
      
      // Actualizar estado local
      //(horarios.filter(h => h.id !== id)) // filtra los horarios para eliminar el que coincide con el id proporcionado
      setHorarios(horarios.filter(h => h.id !== id));
      
    } catch (error) {
      console.error('Error al eliminar horario:', error);
      setError('Error al eliminar el horario.');
    }
   };

  // Agrupar horarios por fecha
  //acc es un acumulador que se usa para agrupar los horarios por fecha
  //horario.fecha es la fecha del horario actual que se está iterando
  //acc[horario.fecha] es el array de horarios para esa fecha específica
  //horarios.reduce() recorre todos los horarios y los agrupa por fecha
  const horariosPorFecha = horarios.reduce((acc, horario) => {
    if (!acc[horario.fecha]) {
      acc[horario.fecha] = [];
    }
    acc[horario.fecha].push(horario);
    return acc;
  }, {});

  // Ordenar fechas
  //Object.keys(horariosPorFecha) obtiene las fechas únicas de los horarios
  //sort() ordena las fechas de forma ascendente
  const fechasOrdenadas = Object.keys(horariosPorFecha).sort();

   // Función para formatear fecha
  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha + 'T00:00:00');
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
 return (
    <div className="space-y-6">
      {/* Formulario para agregar nuevo horario */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="mr-2" size={20} />
          Gestión de Horarios
        </h2>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Cerrar
            </button>
          </div>
        )}
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={nuevoHorario.fecha}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setNuevoHorario(prev => ({ ...prev, fecha: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={nuevoHorario.hora}
              onChange={(e) => setNuevoHorario(prev => ({ ...prev, hora: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Inicial</label>
            <select
              value={nuevoHorario.disponible}
              onChange={(e) => setNuevoHorario(prev => ({ ...prev, disponible: e.target.value === 'true' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">Disponible</option>
              <option value="false">No Disponible</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={agregarHorario}
              disabled={isloading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={16} />
              <span>{isloading ? 'Agregando...' : 'Agregar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de horarios agrupados por fecha */}
      <div className="space-y-4">
        {fechasOrdenadas.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay horarios creados</h3>
            <p className="text-gray-500">Comienza agregando tu primer horario disponible.</p>
          </div>
        ) : (
          fechasOrdenadas.map(fecha => (
            <div key={fecha} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 capitalize">
                {formatearFecha(fecha)}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {horariosPorFecha[fecha]
                  .sort((a, b) => a.hora.localeCompare(b.hora))
                  .map((horario) => (
                    <div 
                      key={horario.id} 
                      className={`border rounded-lg p-4 transition-all ${
                        horario.disponible 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-500" />
                          <span className="font-medium text-gray-900">{horario.hora}</span>
                        </div>
                        <button
                          onClick={() => eliminarHorario(horario.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Eliminar horario"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          horario.disponible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {horario.disponible ? 'Disponible' : 'Ocupado'}
                        </span>
                        
                        <button
                          onClick={() => toggleDisponibilidad(horario.id, horario.disponible)}
                          className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            horario.disponible
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                          title={horario.disponible ? 'Marcar como ocupado' : 'Marcar como disponible'}
                        >
                          {horario.disponible ? (
                            <>
                              <EyeOff size={14} />
                              <span>Ocultar</span>
                            </>
                          ) : (
                            <>
                              <Eye size={14} />
                              <span>Mostrar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GestionHorarios;