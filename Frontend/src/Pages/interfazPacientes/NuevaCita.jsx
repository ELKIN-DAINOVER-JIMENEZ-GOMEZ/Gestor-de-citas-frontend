import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock } from 'lucide-react';
import citaApiService from '../../services/CitaApi';
import horarioApiService from '../../services/HorarioApiService';

const NuevaCita = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHorarios, setIsLoadingHorarios] = useState(false);
  const [showError, setShowError] = useState(false);  
  const [errorMessage, setErrorMessage] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    service: '',
    notes: ''
  });

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

  // Cargar fechas disponibles al montar el componente
  useEffect(() => {
    cargarFechasDisponibles();
  }, []);

  // Cargar horarios cuando se selecciona una fecha
  useEffect(() => {
    if (newAppointment.date) {
      cargarHorariosDisponibles(newAppointment.date);
    } else {
      setHorariosDisponibles([]);
      // Limpiar la hora seleccionada si se cambia la fecha
      setNewAppointment(prev => ({ ...prev, time: '' }));
    }
  }, [newAppointment.date]);

  const cargarFechasDisponibles = async () => {
    try {
      setIsLoadingHorarios(true);
      // Obtener todos los horarios disponibles
      const todosLosHorarios = await horarioApiService.obtenerTodosLosHorarios();
      
      // Filtrar solo horarios disponibles y obtener fechas únicas
      const fechasUnicas = [...new Set(
        todosLosHorarios
          .filter(horario => horario.disponible)
          .map(horario => horario.fecha)
      )].sort();
      
      setFechasDisponibles(fechasUnicas);
    } catch (error) {
      console.error('Error al cargar fechas disponibles:', error);
      setErrorMessage('Error al cargar las fechas disponibles.');
      setShowError(true);
    } finally {
      setIsLoadingHorarios(false);
    }
  };

  const cargarHorariosDisponibles = async (fecha) => {
    try {
      setIsLoadingHorarios(true);
      const horarios = await horarioApiService.obtenerHorariosDisponibles(fecha);
      
      // Ordenar horarios por hora
      const horariosOrdenados = horarios
        .filter(horario => horario.disponible)
        .sort((a, b) => a.hora.localeCompare(b.hora));
      
      setHorariosDisponibles(horariosOrdenados);
    } catch (error) {
      console.error('Error al cargar horarios disponibles:', error);
      setHorariosDisponibles([]);
      setErrorMessage('Error al cargar los horarios disponibles para esta fecha.');
      setShowError(true);
    } finally {
      setIsLoadingHorarios(false);
    }
  };

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha + 'T00:00:00');
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async () => {
    if (newAppointment.date && newAppointment.time && newAppointment.service) {
      setIsLoading(true);
      setShowError(false);
      
      try {
        // Preparar los datos para enviar a la API
        const citaData = {
          fecha: newAppointment.date,
          hora: newAppointment.time,
          servicio: newAppointment.service,
          notas: newAppointment.notes || null
        };

        console.log('Enviando cita:', citaData);
        
        // Enviar a la API usando el servicio
        const resultado = await citaApiService.crearCita(citaData);
        
        console.log('Cita creada exitosamente:', resultado);
        
        // Mostrar mensaje de éxito
        setShowSuccess(true);
        
        // Limpiar formulario
        setNewAppointment({ date: '', time: '', service: '', notes: '' });
        
        // Recargar fechas disponibles para actualizar la lista
        await cargarFechasDisponibles();
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/mis-citas');
        }, 2000);
        
      } catch (error) {
        console.error('Error al agendar cita:', error);
        
        // Manejar diferentes tipos de errores
        if (error.message.includes('HORARIO_NO_DISPONIBLE')) {
          setErrorMessage('Este horario ya está ocupado. Por favor, selecciona otro horario.');
        } else if (error.message.includes('fechas pasadas')) {
          setErrorMessage('No puedes agendar citas en fechas pasadas.');
        } else {
          setErrorMessage(error.message || 'Error al agendar la cita. Por favor, intenta nuevamente.');
        }
        
        setShowError(true);
        
        // Recargar horarios para la fecha actual para mostrar disponibilidad actualizada
        if (newAppointment.date) {
          await cargarHorariosDisponibles(newAppointment.date);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setNewAppointment({ date: '', time: '', service: '', notes: '' });
    setShowError(false);
    setHorariosDisponibles([]);
  };

  const handleDateChange = (fecha) => {
    setNewAppointment(prev => ({ ...prev, date: fecha, time: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Agendar Nueva Cita</h2>
          
          {/* Mensaje de Error */}
          {showError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error al agendar la cita
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{errorMessage}</p>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => setShowError(false)}
                      className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha <span className="text-red-500">*</span>
                </label>
                {isLoadingHorarios && !newAppointment.date ? (
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-gray-500 text-sm">Cargando fechas...</span>
                  </div>
                ) : (
                  <select
                    value={newAppointment.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Seleccionar fecha</option>
                    {fechasDisponibles.map(fecha => (
                      <option key={fecha} value={fecha}>
                        {formatearFecha(fecha)}
                      </option>
                    ))}
                  </select>
                )}
                
                {fechasDisponibles.length === 0 && !isLoadingHorarios && (
                  <p className="text-sm text-amber-600 mt-1 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    No hay fechas disponibles en este momento
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora <span className="text-red-500">*</span>
                </label>
                {isLoadingHorarios && newAppointment.date ? (
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-gray-500 text-sm">Cargando horarios...</span>
                  </div>
                ) : (
                  <select
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={!newAppointment.date}
                  >
                    <option value="">
                      {!newAppointment.date ? 'Primero selecciona una fecha' : 'Seleccionar hora'}
                    </option>
                    {horariosDisponibles.map(horario => (
                      <option key={horario.id} value={horario.hora}>
                        {horario.hora}
                      </option>
                    ))}
                  </select>
                )}
                
                {newAppointment.date && horariosDisponibles.length === 0 && !isLoadingHorarios && (
                  <p className="text-sm text-amber-600 mt-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    No hay horarios disponibles para esta fecha
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Servicio <span className="text-red-500">*</span>
              </label>
              <select
                value={newAppointment.service}
                onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Seleccionar servicio</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas adicionales
              </label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Describe cualquier síntoma, dolor o información adicional que consideres importante..."
              />
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Información importante:</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Las citas deben confirmarse con al menos 24 horas de anticipación</li>
                <li>• En caso de cancelación, notificar con 2 horas de antelación mínimo</li>
                <li>• Llegar 10 minutos antes de la cita programada</li>
                <li>• Solo se muestran las fechas y horarios disponibles</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Limpiar Formulario
              </button>
              <button
                onClick={handleSubmit}
                disabled={!newAppointment.date || !newAppointment.time || !newAppointment.service || isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Agendando...
                  </>
                ) : (
                  'Agendar Cita'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">¡Cita Agendada!</h3>
              <p className="text-gray-600 mb-4">Tu cita ha sido registrada exitosamente.</p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevaCita;