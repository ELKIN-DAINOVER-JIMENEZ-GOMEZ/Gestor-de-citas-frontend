// services/HorarioApiService.js
class HorarioApiService {
  constructor() {
    this.baseURL = 'https://gestor-de-citas-backend-24.onrender.com/api/horarios';
  }

  // Crear nuevo horario
  async crearHorario(horarioData) {
    const token = localStorage.getItem('token');//token del administrador almacenado en el localStorage
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {//este header incluye el tipo de contenido que va a tener la solicitud y el token de autorización
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(horarioData)
      });

      const text = await response.text();
    const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.message || 'Error al crear el horario');
      }

      return result.data;
    } catch (error) {
      console.error('Error al crear horario:', error);
      throw error;
    }
  }

  // Obtener horarios disponibles por fecha (para pacientes)
  async obtenerHorariosDisponibles(fecha) {
    const token = localStorage.getItem('token');//token del usuario almacenado en el localStorage
    try {
      const response = await fetch(`${this.baseURL}/disponibles/${fecha}`,{
        
        headers: {
        'Authorization': `Bearer ${token}`
      }

      });//se hace una solicitud GET a la API para obtener los horarios disponibles en una fecha específica
      
     
      const text = await response.text();
     const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener horarios disponibles');
      }

      return result.data;
    } catch (error) {
      console.error('Error al obtener horarios disponibles:', error);
      throw error;
    }
  }

  // Obtener todos los horarios por fecha (para administradores)
  async obtenerHorariosPorFecha(fecha) {
    const token = localStorage.getItem('token');//token del administrador almacenado en el localStorage
    
    try {
      const response = await fetch(`${this.baseURL}/fecha/${fecha}`, {
        //trae header por que requiere autenticación para administradores ya que solo ellos pueden ver todos los horarios
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
     const text = await response.text();
    const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener horarios');
      }

      return result.data;
    } catch (error) {
      console.error('Error al obtener horarios por fecha:', error);
      throw error;
    }
  }

  // Obtener todos los horarios
  async obtenerTodosLosHorarios() {
    const token = localStorage.getItem('token');//token del administrador almacenado en el localStorage
    
    try {
      const response = await fetch(this.baseURL, {
        //trae header por que requiere autenticación para administradores ya que solo ellos pueden ver todos los horarios
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.message || 'Error al obtener horarios');
      }

      return result.data;
    } catch (error) {
      console.error('Error al obtener todos los horarios:', error);
      throw error;
    }
  }

  // Actualizar disponibilidad de horario
  async actualizarDisponibilidad(id, disponible) {//se trae el id del horario y el nuevo estado de disponibilidad
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${this.baseURL}/${id}/disponibilidad`, {
        
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ disponible })
      });

      const text = await response.text();
    const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar disponibilidad');
      }

      return result.data;
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error);
      throw error;
    }
  }

  // Eliminar horario
  async eliminarHorario(id) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result.message || 'Error al eliminar horario');
      }

      return result;
    } catch (error) {
      console.error('Error al eliminar horario:', error);
      throw error;
    }
  }
}

// Exportar instancia singleton
const horarioApiService = new HorarioApiService();
export default horarioApiService;