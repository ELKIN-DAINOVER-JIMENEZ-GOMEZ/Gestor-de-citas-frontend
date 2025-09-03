import React, { useState, useEffect } from 'react';
import { Send, User, Mail, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import {MensajeApiService} from '../../services/MensajeApiService';
import userService from '../../services/UserService';// Importa el servicio de autenticación para obtener los admins en la base de datos

const GestorMensajesPaciente = () => {
  const [formData, setFormData] = useState({
    asunto: '',
    contenido: '',
    destinatarioId: '',
    destinatarioNombre: '',
    destinatarioEmail: '',
    tipoMensaje: 'GENERAL',
    prioridad: 'NORMAL'
  });
  
  const [tiposMensaje, setTiposMensaje] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const prioridades = ['BAJA', 'NORMAL', 'ALTA', 'URGENTE'];

  
  useEffect(() => {
    cargarTiposMensaje ();
    cargarAdmins();
  }, []);


  
  const cargarTiposMensaje = async () => {
    try {
      const response = await MensajeApiService.obtenerTiposMensaje();
      // Si la respuesta es un array directamente
      if (Array.isArray(response)) {
        setTiposMensaje(response);
      } else if (response.data && Array.isArray(response.data)) {
        // Si viene dentro de una propiedad data
        setTiposMensaje(response.data);
      } else {
        // Si no hay tipos, usar valores por defecto
        setTiposMensaje(['GENERAL', 'CITA', 'EMERGENCIA', 'CONSULTA', 'RECLAMO']);
      }
    } catch (error) {
      console.error('Error al cargar tipos de mensaje:', error);
      // Usar tipos por defecto si hay error
      setTiposMensaje(['GENERAL', 'CITA', 'EMERGENCIA', 'CONSULTA', 'RECLAMO']);
      setNotification({ 
        type: 'error', 
        message: 'Error al cargar tipos de mensaje. Usando valores por defecto.' 
      });
      // Limpiar notificación después de 3 segundos
      setTimeout(() => setNotification(null), 3000);
    }
  };
  

  const cargarAdmins = async () => {
  try {
    // Cambio: ya no necesitas .data porque el servicio lo retorna directamente
    const admins = await userService.getAdmins();
    setUsuarios(admins);
  } catch (error) {
    console.error('Error al cargar administradores:', error);
    setNotification({
      type: 'error',
      message: 'Error al cargar administradores. Intenta nuevamente más tarde.'
    });
    setTimeout(() => setNotification(null), 3000);
  }
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDestinatarioChange = (e) => {
    const selectedUserId = parseInt(e.target.value, 10);
    const selectedUser = usuarios.find(user => user.id === selectedUserId);
    
    setFormData(prev => ({
      ...prev,
      destinatarioId: selectedUser ? selectedUser.id.toString() : '',
      destinatarioNombre: selectedUser ? selectedUser.username : '',
      destinatarioEmail: selectedUser ? selectedUser.email : ''
    }));
    
    // Limpiar error de destinatario
    if (errors.destinatario) {
      setErrors(prev => ({ ...prev, destinatario: null }));
    }
  };

  const validarFormulario = () => {
    const newErrors = {};
    
    // Validar asunto
    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es obligatorio';
    } else if (formData.asunto.length > 255) {
      newErrors.asunto = 'El asunto no puede exceder 255 caracteres';
    }
    
    // Validar contenido
    if (!formData.contenido.trim()) {
      newErrors.contenido = 'El contenido es obligatorio';
    } else if (formData.contenido.length > 5000) {
      newErrors.contenido = 'El contenido no puede exceder 5000 caracteres';
    }
    
    // Validar destinatario
    if (!formData.destinatarioId) {
      newErrors.destinatario = 'Debe seleccionar un destinatario';
    }
    
    // Validar tipo de mensaje
    if (!formData.tipoMensaje) {
      newErrors.tipoMensaje = 'El tipo de mensaje es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      setNotification({
        type: 'error',
        message: 'Por favor corrige los errores en el formulario'
      });
      return;
    }

    setLoading(true);
    setNotification(null);
    
    try {
      // Preparar los datos para enviar
      const mensajeData = {
        asunto: formData.asunto.trim(),
        contenido: formData.contenido.trim(),
        destinatarioId: parseInt(formData.destinatarioId, 10),
        tipoMensaje: formData.tipoMensaje,
        prioridad: formData.prioridad
      };

      console.log('Enviando mensaje:', mensajeData);
      
      const response = await MensajeApiService.crearMensaje(mensajeData);
      
      console.log('Respuesta del servidor:', response);
      
      setNotification({ 
        type: 'success', 
        message: 'Mensaje enviado exitosamente' 
      });
      
      // Limpiar el formulario después de un envío exitoso
      setTimeout(() => {
        setFormData({
          asunto: '',
          contenido: '',
          destinatarioId: '',
          destinatarioNombre: '',
          destinatarioEmail: '',
          tipoMensaje: 'GENERAL',
          prioridad: 'NORMAL'
        });
        setErrors({});
        setNotification(null);
      }, 2000);

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      let errorMessage = 'Error al enviar el mensaje';
      
      if (error.response) {
        // El servidor respondió con un error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          errorMessage = 'No estás autorizado. Por favor, inicia sesión nuevamente.';
        } else if (status === 403) {
          errorMessage = 'No tienes permisos para realizar esta acción.';
        } else if (status === 400) {
          errorMessage = data.message || 'Datos inválidos. Revisa la información ingresada.';
        } else if (status === 500) {
          errorMessage = 'Error interno del servidor. Intenta nuevamente más tarde.';
        } else if (data && data.message) {
          errorMessage = data.message;
        }
      } else if (error.request) {
        // La petición se hizo pero no se recibió respuesta
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else {
        // Error en la configuración de la petición
        errorMessage = 'Error inesperado. Intenta nuevamente.';
      }
      
      setNotification({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      asunto: '',
      contenido: '',
      destinatarioId: '',
      destinatarioNombre: '',
      destinatarioEmail: '',
      tipoMensaje: 'GENERAL',
      prioridad: 'NORMAL'
    });
    setErrors({});
    setNotification(null);
  };

  // Auto-limpiar notificaciones después de 5 segundos
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Enviar Nuevo Mensaje</h2>
          </div>
        </div>

        <div className="p-6">
          {/* Notification */}
          {notification && (
            <div className={`mb-4 p-4 rounded-lg flex items-center space-x-3 ${
              notification.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {notification.type === 'success' ? 
                <CheckCircle className="h-5 w-5 text-green-600" /> : 
                <AlertCircle className="h-5 w-5 text-red-600" />
              }
              <span>{notification.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destinatario */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <User className="inline h-4 w-4 mr-2" />
                Destinatario
              </label>
              <select 
                name="destinatario" 
                value={formData.destinatarioId} 
                onChange={handleDestinatarioChange} 
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                  errors.destinatario ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              >
                <option value="">Seleccionar destinatario...</option>
                {usuarios.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>
                    ({usuario.username}) ({usuario.email})
                  </option>
                ))}
              </select>
              {errors.destinatario && (
                <p className="text-red-600 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.destinatario}
                </p>
              )}
            </div>

            {/* Tipo de Mensaje y Prioridad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <FileText className="inline h-4 w-4 mr-2" />
                  Tipo de Mensaje
                </label>
                <select 
                  name="tipoMensaje"
                  value={formData.tipoMensaje} 
                  onChange={handleInputChange} 
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                    errors.tipoMensaje ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  {tiposMensaje.map(tipo => (
                    <option key={tipo} value={tipo}>
                      {tipo.charAt(0) + tipo.slice(1).toLowerCase().replace('_', ' ')}
                    </option>
                  ))}
                </select>
                {errors.tipoMensaje && (
                  <p className="text-red-600 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.tipoMensaje}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <AlertCircle className="inline h-4 w-4 mr-2" />
                  Prioridad
                </label>
                <select 
                  name="prioridad" 
                  value={formData.prioridad} 
                  onChange={handleInputChange} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                >
                  {prioridades.map(prioridad => (
                    <option key={prioridad} value={prioridad}>
                      {prioridad.charAt(0) + prioridad.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Asunto */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Asunto</label>
              <input 
                type="text" 
                name="asunto" 
                value={formData.asunto} 
                onChange={handleInputChange} 
                placeholder="Escriba el asunto del mensaje..." 
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                  errors.asunto ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                maxLength={255} 
              />
              <div className="flex justify-between items-center">
                {errors.asunto && (
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.asunto}
                  </p>
                )}
                <span className="text-sm text-gray-500 ml-auto">
                  {formData.asunto.length}/255
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Mensaje</label>
              <textarea 
                name="contenido" 
                value={formData.contenido} 
                onChange={handleInputChange} 
                placeholder="Escriba su mensaje aquí..." 
                rows={6} 
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none ${
                  errors.contenido ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                maxLength={5000} 
              />
              <div className="flex justify-between items-center">
                {errors.contenido && (
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.contenido}
                  </p>
                )}
                <span className="text-sm text-gray-500 ml-auto">
                  {formData.contenido.length}/5000
                </span>
              </div>
            </div>

            {/* Resumen del destinatario */}
            {formData.destinatarioNombre && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                <h4 className="font-semibold text-teal-800 mb-2">Destinatario seleccionado:</h4>
                <div className="flex items-center space-x-4 text-sm text-teal-700">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {formData.destinatarioNombre}
                  </span>
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {formData.destinatarioEmail}
                  </span>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button 
                type="button" 
                onClick={handleCancel} 
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors" 
                disabled={loading}
              >
                Limpiar Formulario
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GestorMensajesPaciente;