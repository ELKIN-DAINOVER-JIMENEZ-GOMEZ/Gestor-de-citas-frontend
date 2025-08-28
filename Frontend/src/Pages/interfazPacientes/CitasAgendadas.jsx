import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Edit, Plus, AlertCircle, X } from 'lucide-react';

const CitasAgendadas = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-07-25',
      time: '10:00',
      service: 'Limpieza Dental',
      doctor: 'Dra. María García',
      status: 'confirmada'
    },
    {
      id: 2,
      date: '2025-08-02',
      time: '14:30',
      service: 'Consulta General',
      doctor: 'Dr. Carlos Rodríguez',
      status: 'pendiente'
    },
    {
      id: 3,
      date: '2025-08-10',
      time: '09:15',
      service: 'Ortodoncia',
      doctor: 'Dra. Ana López',
      status: 'confirmada'
    }
  ]);

  const services = [
    'Limpieza Dental',
    'Consulta General',
    'Ortodoncia',
    'Endodoncia',
    'Cirugía Oral',
    'Implantes',
    'Blanqueamiento',
    'Periodoncia'
  ];

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const updateAppointment = () => {
    setAppointments(appointments.map(apt => 
      apt.id === selectedAppointment.id ? selectedAppointment : apt
    ));
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmada': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Mis Citas Agendadas</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"  >
            <Plus className="w-4 h-4" />
            <Link to='/paciente/nueva-cita' className="hidden sm:inline">Nueva Cita</Link>
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes citas agendadas</h3>
            <p className="text-gray-600">Agenda tu primera cita para comenzar</p>
            <Link
              to="/nueva-cita"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar Cita
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    <button
                      onClick={() => handleEditAppointment(appointment)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {new Date(appointment.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{appointment.time}</span>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{appointment.service}</p>
                        <p className="text-xs text-gray-600">{appointment.doctor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Editar Cita</h3>
                <button
                  onClick={() => {setShowEditModal(false); setSelectedAppointment(null);}}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={selectedAppointment.date}
                    onChange={(e) => setSelectedAppointment({...selectedAppointment, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    value={selectedAppointment.time}
                    onChange={(e) => setSelectedAppointment({...selectedAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                  <select
                    value={selectedAppointment.service}
                    onChange={(e) => setSelectedAppointment({...selectedAppointment, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-between space-x-3 pt-4">
                  <button
                    onClick={() => deleteAppointment(selectedAppointment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {setShowEditModal(false); setSelectedAppointment(null);}}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={updateAppointment}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitasAgendadas;