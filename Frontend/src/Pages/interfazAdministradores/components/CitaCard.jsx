import{ Calendar, MessageSquare, Bell, Edit3} from 'lucide-react';

// Componente de Tarjeta de Cita
const CitaCard = ({ cita, onEdit, onSendReminder, onMessage }) => {
  const getTypeColor = (tipo) => {
    const colors = {
      'limpieza': 'bg-green-100 text-green-800 border-green-200',
      'extraccion': 'bg-red-100 text-red-800 border-red-200',
      'medicina': 'bg-blue-100 text-blue-800 border-blue-200',
      'otro': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[tipo] || colors.otro;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{cita.paciente}</h3>
          <p className="text-sm text-gray-600">{cita.email}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(cita.tipo)}`}>
          {cita.tipo.charAt(0).toUpperCase() + cita.tipo.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>{cita.fecha} - {cita.hora}</span>
        </div>
        {cita.notas && (
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{cita.notas}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(cita)}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
        >
          <Edit3 size={14} />
          <span>Editar</span>
        </button>
        <button
          onClick={() => onSendReminder(cita)}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
        >
          <Bell size={14} />
          <span>Recordatorio</span>
        </button>
        <button
          onClick={() => onMessage(cita)}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
        >
          <MessageSquare size={14} />
          <span>Mensaje</span>
        </button>
      </div>
    </div>
  );
};
export default CitaCard;