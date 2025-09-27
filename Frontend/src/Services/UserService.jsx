import axios from 'axios';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: 'https://gestor-de-citas-backend-24.onrender.com/api/users',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token dinámicamente en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o es inválido, redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Opcional: redirigir al login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones del servicio
const getAdmins = async () => {
  try {
    const response = await api.get('/admins');
    return response.data; // Retornar directamente los datos
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error; // Re-lanzar el error para que el componente lo maneje
  }
};

const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data; // Retornar directamente los datos
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-lanzar el error para que el componente lo maneje
  }
};

// Función adicional para obtener un usuario por ID (por si la necesitas)
const getUserById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

// Exportar el servicio
const userService = {
  getAdmins,
  getUsers,
  getUserById,
  // Exportar la instancia de api por si necesitas hacer otras peticiones
  api
};

export default userService;