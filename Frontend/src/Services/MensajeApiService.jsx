// services/mensajeService.js
import axios from "axios";

const BASE_URL = "https://gestor-de-citas-backend-24.onrender.com/api/mensajes";

// Configurar interceptor para agregar token automáticamente
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token de autorización
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
apiClient.interceptors.response.use( 
  (response) => {
    
    return response; // Retornar la respuesta completa
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";// Redirigir al login si el token es inválido
    }
    return Promise.reject(error);
  }
);
export const MensajeApiService = {
  // Crear nuevo mensaje
  crearMensaje: async (mensajeData) => {//
    try {
      const response = await apiClient.post("", mensajeData);
      return response.data; // Retornar solo los datos del mensaje creado
    } catch (error) {
      throw error;
    }
  },

  // Obtener mensajes recibidos del usuario autenticado
  obtenerMensajesRecibidos: async (page = 0, size = 10, tipo = null, busqueda= null) => {
    try {
      const  params = { page, size };
      if (tipo) params.tipo = tipo; // Agregar tipo si se especifica
      if (busqueda) params.busqueda = busqueda; // Agregar búsqueda si se especifica
      const response = await apiClient.get("/mis-recibidos", {params});
      
      if (response.data.success) {
        const pageData = response.data.data;
        console.log('Datos de la página:', pageData);
        return pageData; // Retornar el objeto Page completo
      } else {
        throw new Error(response.data.message || 'Error al obtener mensajes');
      }
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los mensajes (solo admin)
  obtenerTodosLosMensajes: async (page = 0, size = 10) => {
    try {
      const response = await apiClient.get("/admin/todos", {
        params: { page, size },
      });
       if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener mensajes');
      }
    } catch (error) {
      throw error;
    }
  },

  // Obtener mensajes no leídos (solo admin)
  obtenerMensajesNoLeidos: async (page = 0, size = 10) => {
    try {
      const response = await apiClient.get("/admin/no-leidos", {
        params: { page, size },
      });
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener mensajes no leídos');
      }
    } catch (error) {
      console.error('Error al obtener mensajes no leídos:', error);
      throw error;
    }
  },

  // Obtener mensajes por tipo (CORREGIDO - usar endpoint de admin)
  obtenerMensajesPorTipo: async (tipo, page = 0, size = 10) => {
    try {
      const response = await apiClient.get(`/admin/tipo/${tipo}`, {
        params: { page, size },
      });
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener mensajes por tipo');
      }
    } catch (error) {
      console.error('Error al obtener mensajes por tipo:', error);
      throw error;
    }
  },

  // Buscar mensajes (CORREGIDO - usar endpoint de admin)
  buscarMensajes: async (busqueda, page = 0, size = 10) => {
    try {
      const response = await apiClient.get("/admin/buscar", {
        params: { busqueda, page, size },
      });
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al buscar mensajes');
      }
    } catch (error) {
      console.error('Error al buscar mensajes:', error);
      throw error;
    }
  },

  // Obtener mensaje por ID (solo admin)
  obtenerMensajePorId: async (id) => {
    try {
      const response = await apiClient.get(`/admin/${id}`);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Mensaje no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener mensaje por ID:', error);
      throw error;
    }
  },

  // Marcar mensaje como leído
  marcarComoLeido: async (id) => {
    try {
      const response = await apiClient.patch(`/${id}/marcar-leido`);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al marcar como leído');
      }
    } catch (error) {
      console.error('Error al marcar como leído:', error);
      throw error;
    }
  },

  // Marcar mensaje como respondido (solo admin)
  marcarComoRespondido: async (id) => {
    try {
      const response = await apiClient.patch(`/admin/${id}/marcar-respondido`);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al marcar como respondido');
      }
    } catch (error) {
      console.error('Error al marcar como respondido:', error);
      throw error;
    }
  },

  // Eliminar mensaje
  eliminarMensaje: async (id) => {
    try {
      const response = await apiClient.delete(`/${id}`);
      
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al eliminar mensaje');
      }
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      throw error;
    }
  },

  // Obtener estadísticas (solo admin)
  obtenerEstadisticas: async () => {
    try {
      const response = await apiClient.get("/admin/estadisticas");
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener estadísticas');
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  // Obtener tipos de mensaje disponibles
  obtenerTiposMensaje: async () => {
    try {
      const response = await apiClient.get("/tipos");
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener tipos de mensaje');
      }
    } catch (error) {
      console.error('Error al obtener tipos de mensaje:', error);
      throw error;
    }
  },
};


