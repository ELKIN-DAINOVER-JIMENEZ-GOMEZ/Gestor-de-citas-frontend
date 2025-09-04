// hooks/useScrollTo.js
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useScroll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToServicios = useCallback((sectionId, routePath = '/') => {
    const scrollToElement = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    // Si ya estamos en la página correcta, hacer scroll directamente
    if (location.pathname === routePath) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(scrollToElement, 100);
    } else {
      // Navegar a la página y luego hacer scroll
      navigate(routePath);
      // Usar un timeout más largo para permitir que la página se cargue
      setTimeout(scrollToElement, 500);
    }
  }, [navigate, location.pathname]);

  return { scrollToServicios };
};