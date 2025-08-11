
//Este componente especial protege rutas. Si el usuario no está autenticado, lo redirige a la página de inicio de sesión.
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo (la página protegida)
  return <Outlet />;
};

export default ProtectedRoute;
