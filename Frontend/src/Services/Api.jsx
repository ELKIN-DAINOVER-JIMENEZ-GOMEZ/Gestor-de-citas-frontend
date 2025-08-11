// services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8080/api';//Se obtiene la URL base de la API desde las variables de entorno, o se usa un valor por defecto

const api = axios.create({// Crea una instancia de axios con la configuración base
 baseURL: API_BASE_URL,// Define la URL base para todas las solicitudes
  headers: {
    'Content-Type': 'application/json',// Establece el tipo de contenido por defecto a JSON
  },
});

// Interceptor para agregar token a requests
api.interceptors.request.use(// Función que se ejecuta antes de enviar una solicitud
  (config) => {// Agrega el token de acceso al encabezado de autorización si está disponible
    // Verifica si hay un token de acceso en localStorage
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas
api.interceptors.response.use(// Función que se ejecuta cuando se recibe una respuesta
  (response) => response,
  async (error) => {// Maneja errores de respuesta, especialmente el caso de token expirado
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {// Verifica si el error es de autorización y si no se ha reintentado la solicitud
      // Si el token ha expirado, intenta refrescarlo
      originalRequest._retry = true;
      
      try {// Intenta obtener un nuevo token usando el refresh token
        // Obtiene el refresh token del localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken
        });
        
        const { token } = response.data;
        localStorage.setItem('accessToken', token);
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api
