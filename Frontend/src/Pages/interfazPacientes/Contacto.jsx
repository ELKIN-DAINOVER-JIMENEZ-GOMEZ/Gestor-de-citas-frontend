import React, { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import {MensajeApiService} from "../../services/MensajeApiService";
import GestionMensajesPacientes from "./GestionMensajesPacientes";

  const Contacto = () => {
  const [message, setMessage] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleQuickMessage = (msg) => {
    const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(
      msg
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      // Aquí puedes agregar la lógica para enviar el formulario
      console.log("Formulario enviado:", contactForm);
      alert("Mensaje enviado correctamente. Te contactaremos pronto.");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  const quickMessages = [
    "Hola, necesito reagendar mi cita",
    "Tengo una emergencia dental",
    "Quiero información sobre precios",
    "Necesito cancelar mi cita",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Contactar Administrador
          </h2>
          <p className="text-gray-600">
            Estamos aquí para ayudarte con cualquier consulta o emergencia
          </p>
        </div>

         {/* Formulario de contacto */}
         <GestionMensajesPacientes />

        {/* Opciones de contacto rápido */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              
              <div className="bg-blue-600 p-2 rounded-full">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Llamada Directa
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Para consultas urgentes y emergencias dentales
            </p>
            <a
              href="tel:+573001234567"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-blue-700 transition-colors w-full justify-center"
            >
              <Phone className="w-4 h-4" />
              <span>+57 300 123 4567</span>
            </a>
          </div>

          <div className="bg-green-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-600 p-2 rounded-full">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">WhatsApp</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Chat directo para consultas y citas
            </p>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 hover:bg-green-700 transition-colors w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Mensaje</span>
            </a>
          </div>
        </div>

        {/* Mensajes rápidos de WhatsApp */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Mensajes Rápidos
          </h3>
          <p className="text-gray-600 mb-4">
            Haz clic en cualquiera de estos mensajes para enviarlo directamente
            por WhatsApp:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleQuickMessage(msg)}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{msg}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Información de contacto */}
<div className="grid md:grid-cols-2 gap-8">
  {/* Horarios e información */}
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6 text-center max-w-md mx-auto">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900">Horarios de Atención</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Lunes - Viernes:</span>
          <span className="font-medium text-gray-900">8:00 AM - 6:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Sábados:</span>
          <span className="font-medium text-gray-900">8:00 AM - 2:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Domingos:</span>
          <span className="font-medium text-red-600">Cerrado</span>
        </div>
        <hr className="my-3" />
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Emergencias 24/7:</strong> Para emergencias dentales fuera del horario, llama al número principal.
          </p>
        </div>
      </div>
    </div>

    {/* Ubicación */}
    <div className="space-y-2 text-center max-w-md mx-auto">
      <p className="text-gray-600">Calle 123 #45-67, Barrio Centro, Ciudad</p>
      <a
        href="https://www.google.com/maps?q=-74.08175,4.60971"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline flex items-center justify-center gap-1"
      >
        Ver en Google Maps
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
      <p className="text-gray-500 text-sm">Referencia: Frente al parque principal</p>
    </div>
  </div>

 
  
</div>
      </div>
    </div>
  );
};
export default Contacto;
