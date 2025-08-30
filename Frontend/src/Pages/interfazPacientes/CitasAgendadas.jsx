import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Edit, Plus, AlertCircle, X } from 'lucide-react';
import citaApiService from '../../services/CitaApiService';

const CitasAgendadas = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔧 Función para transformar los datos de la API al formato esperado
  const transformarDatosAPI = (citasAPI) => {
    if (!Array.isArray(citasAPI)) {
      console.warn('Los datos recibidos no son un array:', citasAPI);
      return [];
    }

    return citasAPI.map(cita => {
      // Mapear los nombres de propiedades de la API a los nombres esperados
      const citaTransformada = {
        id: cita.id,
        status: cita.estado || cita.status || 'pendiente',
        date: cita.fecha || cita.date || cita.fechaCita || '',
        time: cita.hora || cita.time || cita.horaCita || '',
        service: cita.servicio || cita.service || cita.tipoServicio || 'No especificado',
        doctor: cita.medico || cita.doctor || cita.nombreMedico || 'Sin asignar'
      };

      // 🔍 Log para debugging (puedes remover esto después)
      console.log('Cita original:', cita);
      console.log('Cita transformada:', citaTransformada);

      return citaTransformada;
    });
  };

  useEffect(() => {
    // Función para manejar la actualización de citas desde el servicio
    const handleCitasUpdate = (updatedCitas) => {
      console.log('Datos crudos recibidos de la API:', updatedCitas);
      
      // Transformar los datos antes de establecerlos en el estado
      const citasTransformadas = transformarDatosAPI(updatedCitas);
      console.log('Datos transformados:', citasTransformadas);
      
      setAppointments(citasTransformadas);
      setLoading(false);
      setError(null);
    };

    // Suscribirse a los cambios en el servicio
    const unsubscribe = citaApiService.subscribe(handleCitasUpdate);
    
    // Cargar las citas por primera vez
    setLoading(true);
    citaApiService.refreshCitas().catch(err => {
        setError('No se pudieron cargar las citas. Verifique que el servidor esté corriendo.');
        setLoading(false);
        console.error('Error al cargar citas:', err);
    });

    // Función de limpieza: desuscribirse cuando el componente se desmonte
    return () => {
      unsubscribe();
    };
  }, []);

  const services = [
    'Limpieza Dental',
    'Consulta General',
    'Ortodoncia',
    'Endodoncia',
    'Cirugía Oral',
    'Implantes',
    'Blanqueamiento',
    'Periodoncia'
  ];

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const updateAppointment = () => {
    setAppointments(appointments.map(apt => 
      apt.id === selectedAppointment.id ? selectedAppointment : apt
    ));
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    // Normalizar el status a minúsculas para comparación
    const normalizedStatus = status.toLowerCase();
    
    switch(normalizedStatus) {
      case 'confirmada':
      case 'confirmado': 
        return 'bg-green-100 text-green-800';
      case 'pendiente': 
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelada':
      case 'cancelado': 
        return 'bg-red-100 text-red-800';
      case 'completada':
      case 'completado':
        return 'bg-blue-100 text-blue-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    
    try {
      // Intentar diferentes formatos de fecha
      let dateObj;
      
      if (fecha.includes('T')) {
        // Formato ISO con tiempo
        dateObj = new Date(fecha);
      } else if (fecha.includes('-')) {
        // Formato YYYY-MM-DD
        dateObj = new Date(fecha + 'T00:00:00');
      } else {
        // Otros formatos
        dateObj = new Date(fecha);
      }
      
      // Verificar si la fecha es válida
      if (isNaN(dateObj.getTime())) {
        return `Fecha inválida: ${fecha}`;
      }
      
      return dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', fecha, error);
      return `Error en fecha: ${fecha}`;
    }
  };

  // Mostrar estado de loading
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando citas...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar errores de conexión
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error de conexión</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                <p className="mt-2">Posibles soluciones:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Asegúrese de que el servidor backend esté corriendo en el puerto 8080</li>
                  <li>Verifique su conexión a internet</li>
                  <li>Revise que la URL del API sea correcta</li>
                </ul>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setError(null);
                    setLoading(true);
                    citaApiService.refreshCitas().catch(err => {
                      setError('No se pudieron cargar las citas. Verifique que el servidor esté corriendo.');
                      setLoading(false);
                    });
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Mis Citas Agendadas</h2>
          <Link 
            to='/paciente/nueva-cita'
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva Cita</span>
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes citas agendadas</h3>
            <p className="text-gray-600">Agenda tu primera cita para comenzar</p>
            <Link
              to="/paciente/nueva-cita"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar Cita
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {(appointment.status && typeof appointment.status === 'string') ? 
                        appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1).toLowerCase() : 
                        'Sin estado'
                      }
                    </span>
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {formatearFecha(appointment.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {appointment.time || 'Hora no disponible'}
                      </span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.service || 'Servicio no especificado'}
                        </p>
                        <p className="text-xs text-gray-600">
                          {appointment.doctor || 'Doctor no asignado'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Editar Cita</h3>
                <button
                  onClick={() => {setShowEditModal(false); setSelectedAppointment(null);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={selectedAppointment.date || ''}
                    onChange={(e) => setSelectedAppointment({...selectedAppointment, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    value={selectedAppointment.time || ''}
                    onChange={(e) => setSelectedAppointment({...selectedAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                  <select
                    value={selectedAppointment.service || ''}
                    onChange={(e) => setSelectedAppointment({...selectedAppointment, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar servicio</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-between space-x-3 pt-4">
                  <button
                    onClick={() => deleteAppointment(selectedAppointment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {setShowEditModal(false); setSelectedAppointment(null);}}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={updateAppointment}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitasAgendadas;