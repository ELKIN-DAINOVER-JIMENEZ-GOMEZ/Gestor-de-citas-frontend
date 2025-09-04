import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GestionCitas from './Gestor/GestionDeCitas';
import GestionHorarios from './Gestor/GestionDeHorarios';
import ModalEditarCita from './modals/ModalEditarCita';
import ModalMensaje from './modals/ModalMensaje';
import citaApiService from '../../services/CitaApi'; // Importar el servicio
import AuthService from '../../services/AuthService';

const DashboardAdmin = () => {
  const [activeSection, setActiveSection] = useState('citas');
  
  // Estado para citas reales de la API
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [filtros, setFiltros] = useState({
    fecha: '',
    tipo: '',
    estado: '',
    busqueda: ''
  });

  const [modalEditarCita, setModalEditarCita] = useState({ isOpen: false, cita: null });
  const [modalMensaje, setModalMensaje] = useState({ isOpen: false, paciente: null });


   const user = AuthService.getCurrentUser(); // Obtener usuario actual desde el servicio de autenticación
   const adminName = user?.username || 'Admin'; // Nombre del administrador
  // ============================================
  // INTEGRACIÓN CON API REAL
  // ============================================

  // Cargar citas al montar el componente
  useEffect(() => {
    cargarCitasIniciales();
  }, []);

  // Suscribirse a actualizaciones automáticas
  useEffect(() => {
    console.log(' Dashboard suscribiéndose a actualizaciones automáticas');
    
    const unsubscribe = citaApiService.subscribe((citasActualizadas) => {
      console.log(' Dashboard: Recibidas citas actualizadas:', citasActualizadas.length);
      
      // Transformar citas del backend al formato del frontend
      const citasTransformadas = transformarCitasParaFrontend(citasActualizadas);
      setCitas(citasTransformadas);
      setLastUpdate(new Date());
      
      console.log('Dashboard: Estado actualizado');
    });

    // Iniciar polling para actualizaciones automáticas
    citaApiService.startPolling(30000); // Cada 30 segundos

    return () => {
      console.log(' Dashboard: Limpiando suscripciones');
      unsubscribe();
      citaApiService.stopPolling();
    };
  }, []);

  // Función para cargar citas iniciales
  const cargarCitasIniciales = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('📊 Cargando citas iniciales...');
      const citasData = await citaApiService.obtenerTodasLasCitas();
      
      // Transformar datos del backend al formato esperado por el frontend
      const citasTransformadas = transformarCitasParaFrontend(citasData);
      setCitas(citasTransformadas);
      setLastUpdate(new Date());
      
      console.log(' Citas cargadas exitosamente:', citasTransformadas.length);
      
    } catch (error) {
      console.error('Error al cargar citas:', error);
      setError('Error al cargar las citas. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Transformar datos del backend al formato del frontend
  const transformarCitasParaFrontend = (citasBackend) => {
    return citasBackend.map(cita => ({
      id: cita.id,
      paciente: `Paciente ${cita.id}`, // Temporal hasta tener datos reales de pacientes
      telefono: `+57 300 000 ${String(cita.id).padStart(4, '0')}`, // Temporal
      fecha: cita.fecha,
      hora: cita.hora,
      tipo: mapearServicioATipo(cita.servicio),
      servicio: cita.servicio, // Mantener servicio original
      estado: cita.estado.toLowerCase(),
      notas: cita.notas || 'Sin notas adicionales',
      fechaCreacion: cita.fechaCreacion
    }));
  };

  // Mapear servicios a tipos para la UI
  const mapearServicioATipo = (servicio) => {
    const mapeo = {
      'Limpieza Dental': 'limpieza',
      'Blanqueamiento': 'limpieza',
      'Consulta General': 'medicina',
      'Ortodoncia': 'medicina',
      'Endodoncia': 'medicina',
      'Implantes': 'medicina',
      'Periodoncia': 'medicina',
      'Cirugía Oral': 'extraccion'
    };
    return mapeo[servicio] || 'otro';
  };

  // ============================================
  // MANEJADORES DE EVENTOS ACTUALIZADOS
  // ============================================

  const handleEditarCita = (cita) => {
    console.log(' Editando cita:', cita);
    setModalEditarCita({ isOpen: true, cita });
  };

  const handleGuardarCita = async (citaEditada) => {
    try {
      console.log('Guardando cambios en cita:', citaEditada);
      
      // Aquí puedes agregar lógica para actualizar en el backend
      // Por ejemplo: await citaApiService.actualizarCita(citaEditada.id, citaEditada);
      
      // Por ahora, actualizar localmente
      setCitas(citas.map(c => c.id === citaEditada.id ? citaEditada : c));
      setModalEditarCita({ isOpen: false, cita: null });
      
      console.log(' Cita actualizada exitosamente');
      
    } catch (error) {
      console.error(' Error al guardar cita:', error);
      setError('Error al guardar los cambios de la cita.');
    }
  };

  const handleEnviarMensaje = (paciente) => {
    console.log(' Preparando mensaje para:', paciente.paciente);
    setModalMensaje({ isOpen: true, paciente });
  };

  const handleEnviarMensajeFinal = (paciente, mensaje) => {
    console.log(' Enviando mensaje a:', paciente.paciente, 'Mensaje:', mensaje);
    setModalMensaje({ isOpen: false, paciente: null });
    // Aquí integrarías con tu servicio de mensajería
  };

  const handleEnviarRecordatorio = (cita) => {
    console.log(' Enviando recordatorio a:', cita.paciente);
    // Aquí integrarías con tu servicio de recordatorios
  };

  const handleActualizarEstadoCita = async (citaId, nuevoEstado) => {
    try {
      console.log(' Actualizando estado de cita:', citaId, 'a', nuevoEstado);
      
      await citaApiService.actualizarEstadoCita(citaId, nuevoEstado.toUpperCase());
      
      // El estado se actualizará automáticamente a través de la suscripción
      console.log('Estado actualizado exitosamente');
      
    } catch (error) {
      console.error(' Error al actualizar estado:', error);
      setError('Error al actualizar el estado de la cita.');
    }
  };

  const handleRefreshManual = async () => {
    console.log('🔄 Actualizando citas manualmente...');
    await cargarCitasIniciales();
  };

  // ============================================
  // RENDERIZADO DE CONTENIDO
  // ============================================

  const renderContent = () => {
    switch (activeSection) {
      case 'citas':
        return (
          <div className="space-y-4">
            {/* Información de estado */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Estado de Citas
                  </h3>
                  <p className="text-sm text-gray-600">
                    Total: {citas.length} citas | 
                    Última actualización: {lastUpdate.toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={handleRefreshManual}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 transition-colors"
                >
                  <span className={isLoading ? 'animate-spin' : ''}>🔄</span>
                  <span>{isLoading ? 'Actualizando...' : 'Actualizar'}</span>
                </button>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => setError(null)}
                        className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Componente de gestión de citas */}
            {isLoading && citas.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando citas...</p>
              </div>
            ) : (
              <GestionCitas
                citas={citas}
                filtros={filtros}
                setFiltros={setFiltros}
                onEdit={handleEditarCita}
                onSendReminder={handleEnviarRecordatorio}
                onMessage={handleEnviarMensaje}
                onEstadoChange={handleActualizarEstadoCita}
                isLoading={isLoading}
                lastUpdate={lastUpdate}
              />
            )}
          </div>
        );
        
      case 'mensajes':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Centro de Mensajes</h2>
            <p className="text-gray-600">Funcionalidad de mensajes en desarrollo...</p>
          </div>
        );
        
      case 'horarios':
        return <GestionHorarios />;
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        adminName={adminName}
      />

      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <ModalEditarCita
        cita={modalEditarCita.cita}
        isOpen={modalEditarCita.isOpen}
        onClose={() => setModalEditarCita({ isOpen: false, cita: null })}
        onSave={handleGuardarCita}
      />

      <ModalMensaje
        paciente={modalMensaje.paciente}
        isOpen={modalMensaje.isOpen}
        onClose={() => setModalMensaje({ isOpen: false, paciente: null })}
        onSend={handleEnviarMensajeFinal}
      />
    </div>
  );
};

export default DashboardAdmin;