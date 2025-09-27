import React, { useState, useEffect } from 'react';
import { MessageCircle, Clock, CheckCircle, AlertCircle, Search, Plus, Eye, Calendar, Trash2, RefreshCw } from 'lucide-react';
import { MensajeApiService } from '../../Services/MensajeApiService';
import { useNavigate } from 'react-router-dom';

const MensajesRecibidosUser = () => {
  const navigate = useNavigate();
  const [mensajes, setMensajes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mensajeAEliminar, setMensajeAEliminar] = useState(null);
  const [eliminandoMensaje, setEliminandoMensaje] = useState(false);

  const tiposMensajeLabels = {
    'CONSULTA': 'Consulta General',
    'QUEJA': 'Queja o Reclamo',
    'SUGERENCIA': 'Sugerencia',
    'CANCELACION': 'Cancelación de Cita',
    'REAGENDAMIENTO': 'Reagendamiento de Cita',
    'GENERAL': 'General',
    'CITA': 'Cita',
    'EMERGENCIA': 'Emergencia',
    'RECLAMO': 'Reclamo',
    'OTRO': 'Otro'
  };

  const prioridadColors = {
    'BAJA': 'bg-green-100 text-green-800',
    'NORMAL': 'bg-blue-100 text-blue-800',
    'ALTA': 'bg-orange-100 text-orange-800',
    'URGENTE': 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    cargarMensajes();
  }, [paginaActual]);

  useEffect(() => {
    // Reiniciar a la primera página cuando cambian los filtros
    if (paginaActual !== 0) {
      setPaginaActual(0);
    } else {
      cargarMensajes();
    }
  }, [filtroTipo, busqueda]);

 const cargarMensajes = async () => {
  try {
    setIsLoading(true);
    setError(null);
    
    console.log('Cargando mensajes...', { filtroTipo, busqueda, paginaActual });
    
    // Usar siempre el método principal con parámetros
    const response = await MensajeApiService.obtenerMensajesRecibidos(
      paginaActual, 
      10, 
      filtroTipo || null, 
      busqueda.trim() || null
    );
    
    console.log('Respuesta del servidor:', response);
    
    // Verificar si la respuesta es un objeto Page de Spring Boot
    if (response && typeof response === 'object') {
      // Estructura de Spring Boot Page
      const mensajesData = response.content || [];
      const totalPags = response.totalPages || 0;
      const totalElems = response.totalElements || 0;
      
      console.log('Datos procesados:', { 
        mensajes: mensajesData.length, 
        totalPaginas: totalPags, 
        totalElementos: totalElems 
      });
      
      setMensajes(mensajesData);
      setTotalPaginas(totalPags);
      setTotalElementos(totalElems);
      
    } else {
      console.error('Formato de respuesta inesperado:', response);
      throw new Error('Formato de respuesta inválido del servidor');
    }
    
  } catch (error) {
    console.error('Error al cargar mensajes:', error);
    
    let errorMessage = 'Error al cargar los mensajes.';
    
    if (error.response?.status === 401) {
      errorMessage = 'No estás autorizado. Por favor, inicia sesión nuevamente.';
    } else if (error.response?.status === 403) {
      errorMessage = 'No tienes permisos para ver estos mensajes.';
    } else if (error.response?.status === 404) {
      errorMessage = 'No se encontraron mensajes.';
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    setError(errorMessage);
    setMensajes([]);
    setTotalPaginas(0);
    setTotalElementos(0);
  } finally {
    setIsLoading(false);
  }
};

  const formatearFecha = (fecha) => {
    try {
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', fecha, error);
      return 'Fecha inválida';
    }
  };

  const truncarTexto = (texto, limite = 100) => {
    if (!texto) return '';
    return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
  };

  const marcarComoVisto = async (mensajeId) => {
    try {
      console.log('Marcando mensaje como visto:', mensajeId);
      await MensajeApiService.marcarComoLeido(mensajeId);
      // Actualizar el mensaje en el estado local
      setMensajes(prevMensajes => 
        prevMensajes.map(msg => 
          msg.id === mensajeId ? { ...msg, leido: true } : msg
        )
      );
    } catch (error) {
      console.error('Error al marcar mensaje como visto:', error);
      // No mostrar error al usuario ya que es una acción secundaria
    }
  };

  const abrirModal = async (mensaje) => {
    setMensajeSeleccionado(mensaje);
    setMostrarModal(true);
    
    // Si el mensaje no está leído, marcarlo como visto
    if (!mensaje.leido) {
      await marcarComoVisto(mensaje.id);
    }
  };

  const cerrarModal = () => {
    setMensajeSeleccionado(null);
    setMostrarModal(false);
  };

  const abrirModalEliminar = (mensaje) => {
    setMensajeAEliminar(mensaje);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMensajeAEliminar(null);
    setMostrarModalEliminar(false);
  };

  const confirmarEliminar = async () => {
    if (!mensajeAEliminar) return;
    
    try {
      setEliminandoMensaje(true);
      console.log('Eliminando mensaje:', mensajeAEliminar.id);
      await MensajeApiService.eliminarMensaje(mensajeAEliminar.id);
      
      // Remover el mensaje del estado local
      setMensajes(prevMensajes => 
        prevMensajes.filter(msg => msg.id !== mensajeAEliminar.id)
      );
      
      // Actualizar el total de elementos
      setTotalElementos(prev => prev - 1);
      
      // Si no quedan mensajes en esta página, ir a la anterior
      if (mensajes.length === 1 && paginaActual > 0) {
        setPaginaActual(prev => prev - 1);
      }
      
      cerrarModalEliminar();
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      setError('Error al eliminar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setEliminandoMensaje(false);
    }
  };

  const getEstadoMensaje = (mensaje) => {
    if (mensaje.respondido) {
      return { texto: 'Respondido', icono: CheckCircle, color: 'text-green-600' };
    } else if (mensaje.leido) {
      return { texto: 'Leído', icono: Eye, color: 'text-blue-600' };
    } else {
      return { texto: 'No leído', icono: Clock, color: 'text-orange-600' };
    }
  };

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 0 && nuevaPagina < totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const manejarBusqueda = (e) => {
    if (e.key === 'Enter') {
      cargarMensajes();
    }
  };

  // Mostrar información de debugging en desarrollo
  const mostrarDebugInfo = () => {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
          <div className="text-sm text-yellow-700">
            <p>Mensajes cargados: {mensajes.length}</p>
            <p>Total elementos: {totalElementos}</p>
            <p>Total páginas: {totalPaginas}</p>
            <p>Página actual: {paginaActual + 1}</p>
            <p>Filtro tipo: {filtroTipo || 'Ninguno'}</p>
            <p>Búsqueda: {busqueda || 'Ninguna'}</p>
            <p>Token existe: {localStorage.getItem('token') ? 'Sí' : 'No'}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando mensajes...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Debug Info */}
        {mostrarDebugInfo()}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mis Mensajes</h2>
                <p className="text-sm text-gray-500">
                  {totalElementos} mensaje{totalElementos !== 1 ? 's' : ''} en total
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={cargarMensajes}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className="mr-2" />
                Actualizar
              </button>
              <button
                onClick={() => navigate('/paciente/contacto')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Nuevo Mensaje
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar mensajes
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  onKeyDown={manejarBusqueda}
                  placeholder="Buscar por asunto o contenido... (Presiona Enter)"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por tipo
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos los tipos</option>
                {Object.entries(tiposMensajeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={cargarMensajes}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Aplicar Filtros'}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Lista de Mensajes */}
        <div className="space-y-4">
          {mensajes.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay mensajes</h3>
              <p className="text-gray-500">
                {filtroTipo || busqueda ? 'No se encontraron mensajes con los filtros aplicados.' : 'Aún no has recibido ningún mensaje.'}
              </p>
              <button
                onClick={cargarMensajes}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Recargar
              </button>
            </div>
          ) : (
            mensajes.map((mensaje) => {
              const estado = getEstadoMensaje(mensaje);
              const EstadoIcono = estado.icono;
              
              return (
                <div 
                  key={mensaje.id} 
                  className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow ${
                    !mensaje.leido ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-medium ${!mensaje.leido ? 'text-blue-900' : 'text-gray-900'}`}>
                          {mensaje.asunto}
                          {!mensaje.leido && (
                            <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadColors[mensaje.prioridad] || 'bg-gray-100 text-gray-800'}`}>
                          {mensaje.prioridad}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {tiposMensajeLabels[mensaje.tipoMensaje] || mensaje.tipoMensaje}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {truncarTexto(mensaje.contenido)}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatearFecha(mensaje.fechaEnvio)}
                        </div>
                        <div className={`flex items-center ${estado.color}`}>
                          <EstadoIcono size={14} className="mr-1" />
                          {estado.texto}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex items-center gap-2">
                      <button
                        onClick={() => abrirModal(mensaje)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
                      >
                        <Eye size={14} className="mr-1" />
                        Ver
                      </button>
                      <button
                        onClick={() => abrirModalEliminar(mensaje)}
                        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="mt-8 flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-3">
            <div className="flex items-center text-sm text-gray-500">
              Página {paginaActual + 1} de {totalPaginas} ({totalElementos} mensajes)
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 0}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {/* Números de página */}
              {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                let pageNumber;
                if (totalPaginas <= 5) {
                  pageNumber = i;
                } else if (paginaActual <= 2) {
                  pageNumber = i;
                } else if (paginaActual >= totalPaginas - 3) {
                  pageNumber = totalPaginas - 5 + i;
                } else {
                  pageNumber = paginaActual - 2 + i;
                }
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => cambiarPagina(pageNumber)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      paginaActual === pageNumber
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}
              
              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual >= totalPaginas - 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Modal para ver mensaje completo */}
        {mostrarModal && mensajeSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{mensajeSeleccionado.asunto}</h3>
                <button
                  onClick={cerrarModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadColors[mensajeSeleccionado.prioridad] || 'bg-gray-100 text-gray-800'}`}>
                    {mensajeSeleccionado.prioridad}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                    {tiposMensajeLabels[mensajeSeleccionado.tipoMensaje] || mensajeSeleccionado.tipoMensaje}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatearFecha(mensajeSeleccionado.fechaEnvio)}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{mensajeSeleccionado.contenido}</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${getEstadoMensaje(mensajeSeleccionado).color}`}>
                      {React.createElement(getEstadoMensaje(mensajeSeleccionado).icono, { size: 16, className: "mr-2" })}
                      Estado: {getEstadoMensaje(mensajeSeleccionado).texto}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          cerrarModal();
                          abrirModalEliminar(mensajeSeleccionado);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={cerrarModal}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación para eliminar */}
        {mostrarModalEliminar && mensajeAEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar el mensaje "<strong>{mensajeAEliminar.asunto}</strong>"? 
                Esta acción no se puede deshacer.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={cerrarModalEliminar}
                  disabled={eliminandoMensaje}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarEliminar}
                  disabled={eliminandoMensaje}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
                >
                  {eliminandoMensaje && <RefreshCw size={16} className="animate-spin mr-2" />}
                  {eliminandoMensaje ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MensajesRecibidosUser;