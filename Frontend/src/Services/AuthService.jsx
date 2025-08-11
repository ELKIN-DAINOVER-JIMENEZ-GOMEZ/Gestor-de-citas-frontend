import api from './Api';

const register = (username, email, password, role) => {
  return api.post('/auth/signup', {
    username,
    email,
    password,
    role
  });
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

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;