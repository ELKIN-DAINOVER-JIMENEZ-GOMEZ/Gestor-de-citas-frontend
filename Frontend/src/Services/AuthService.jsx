import api from './Api';

const register = (username, email, password, role) => {
  return api.post('/auth/signup', {
    username,
    email,
    password,
    role
    
  });
};

const registerUser = (username, email, password) => {
  return register(username, email, password, 'user');
}

// Función específica para registrar administradores
const registerAdmin = (username, email, password) => {
  return register(username, email, password, 'admin');
};

const login = async (username, password) => {
  const response = await api.post('/auth/signin', {
    username,
    password,
  });

  
  // Si el login es exitoso, almacena el token en localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);// Almacena el token
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  // Simplemente remueve el token y la información del usuario del almacenamiento
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};


// Función para obtener el token
const getToken = () => {
  return localStorage.getItem('token');
};

// Función para verificar si el usuario es admin
const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.roles && user.roles.includes('ROLE_ADMIN');
};



const AuthService = {
  register,
  registerUser,
  registerAdmin,
  login,
  logout,
  getCurrentUser,
  getToken,
  isAdmin,
};

export default AuthService;