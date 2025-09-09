// services/CitaApiService.js
class CitaApi{
  constructor() {
    this.baseURL = 'http://localhost:8080/api/citas';
    this.subscribers = new Set();//conjunto de funciones callback que se llamarán cuando haya cambios en las citas
  }

  // Método para suscribirse a cambios
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notificar a todos los suscriptores
  notifySubscribers(citas) {
    this.subscribers.forEach(callback => callback(citas));
  }

  // Crear nueva cita
  async crearCita(citaData) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`//se agrega el token de autorización para poder crear la cita
        },
        body: JSON.stringify(citaData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al crear la cita');
      }

      // Después de crear la cita, actualizar la lista
      await this.refreshCitas();
      
      return result.data;
    } catch (error) {
      console.error('Error al crear cita:', error);
      throw error;
    }
  }

  // Obtener todas las citas
async obtenerTodasLasCitas() {
  //se obtiene el token de autorización del almacenamiento local
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(this.baseURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const text = await response.text();
    if (!text) throw new Error('Respuesta vacía del servidor');
    const result = JSON.parse(text);

    if (!response.ok) {
      throw new Error(result.message || 'Error al obtener las citas');
    }

    return result.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  }
}

  // Actualizar estado de cita
  async actualizarEstadoCita(id, estado) {
    try {
      const response = await fetch(`${this.baseURL}/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar el estado');
      }

      // Actualizar la lista después del cambio
      await this.refreshCitas();
      
      return result.data;
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      throw error;
    }
  }

  // Cancelar cita
  async cancelarCita(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}/cancelar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al cancelar la cita');
      }

      // Actualizar la lista después del cambio
      await this.refreshCitas();
      
      return result.data;
    } catch (error) {
      console.error('Error al cancelar cita:', error);
      throw error;
    }
  }

  
  // Eliminar cita permanentemente
async eliminarCita(id) {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al eliminar la cita');
    }

    // Actualizar la lista después del cambio
    await this.refreshCitas();
    
    return result;
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
}

  // Refrescar y notificar cambios
  async refreshCitas() {
    try {
      const citas = await this.obtenerTodasLasCitas();
      this.notifySubscribers(citas);
      return citas;
    } catch (error) {
      console.error('Error al refrescar citas:', error);
      throw error;
    }
  }

  // Iniciar polling para actualizaciones automáticas
  startPolling(intervalMs = 30000) { // 30 segundos por defecto
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }

    this.pollingInterval = setInterval(async () => {
      try {
        await this.refreshCitas();
      } catch (error) {
        console.error('Error en polling:', error);
      }
    }, intervalMs);
  }

  // Detener polling
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

// Exportar instancia singleton
const citaApi = new CitaApi();
export default citaApi;