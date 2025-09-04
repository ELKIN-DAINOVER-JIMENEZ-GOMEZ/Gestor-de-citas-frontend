import React from 'react'

const CitaApi = async (citaData) => {
 
    
      try {
      const response = await fetch('/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si usas autenticación JWT, agregar:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(citaData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al enviar cita:', error);
      throw error;
    }
   
  
}
export default CitaApi