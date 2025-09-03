import img1 from "../../assets/Img1.jpg"; // Asegúrate de tener esta imagen en la ruta correcta
import tooth from "../../assets/tooh.png"; // Asegúrate de tener esta imagen en la ruta correcta
import ortodoncia from "../../assets/ortodoncia.png"; // Asegúrate de tener esta imagen en la ruta correcta
import { ServiciosData } from "./Data/ServiciosData";
import {
  Calendar,
  Users,
  Heart,
  Shield,
  Star,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";


const Inicio = () => {


  const ScrollToServicios = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth",// Asegura un desplazamiento suave
      block: "start"// Alinea la sección al inicio de la vista
       });
    }
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-cyan-800/90 to-blue-700/90">
          {/* Espacio para tu imagen de fondo */}
          <div className="absolute inset-0 bg-gray-400 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-8xl mb-4">🏥</div>
              <p className="text-2xl font-semibold">
                <div className="absolute inset-0 bg-gray-400 flex items-center justify-center">
                  <img
                    src={img1}
                    alt="Consultorio Dental"
                    className="w-full h-full object-cover"
                  />
                </div>
              </p>
              <p className="text-lg text-gray-200 mt-2">
                Consultorio / Instalaciones / Equipo
              </p>
            </div>
          </div>
          {/* Overlay para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-cyan-700/80"></div>
        </div>

        <div  className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  <span className="text-cyan-300">Consultorio</span>
                  <br />
                  <span className="text-white">DentalCare</span>
                </h1>
                <p className="text-2xl text-gray-100 mt-6 leading-relaxed drop-shadow-md">
                  Cuidado dental especializado con atención centrada en el
                  paciente. En nuestro consultorio encuentras más razones para
                  sonreír.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to='/login' className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <Calendar className="w-5 h-5" />
                  Agendar Cita
                </Link>
                <button 
                  onClick={() => ScrollToServicios("servicios")}
                 className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Conocer Servicios
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-cyan-300">15+</div>
                  <div className="text-sm text-gray-200">
                    Años de Experiencia
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-cyan-300">500+</div>
                  <div className="text-sm text-gray-200">
                    Pacientes Satisfechos
                  </div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-cyan-300">98%</div>
                  <div className="text-sm text-gray-200">Tasa de Éxito</div>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              {/* Elemento decorativo flotante */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 h-96 flex items-center justify-center border border-white/30 shadow-2xl">
                <img
                  src={tooth}
                  alt="Consultorio Dental"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-300/30 rounded-full backdrop-blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/30 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos una gama completa de tratamientos odontológicos con
              tecnología de vanguardia y un enfoque personalizado para cada
              paciente.
            </p>
          </div>
        </div>

        {/*Card de servicios que se ofrecen  */}
        <div className="w-full flex justify-center items-center py-16 px-4">
          <div className="relative w-full max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative z-20">
              {ServiciosData.map((servicio) => {
                return (
                  <div key={servicio.id} className="relative group">
                    <div className="relative rounded-xl cursor-pointer overflow-hidden transition-all duration-500 bg-white shadow-lg shadow-[#0092B2]/30 hover:shadow-2xl hover:shadow-[#0092B2]/50 hover:-translate-y-2 h-full">
                      {/* Imagen del servicio */}
                      <div className="relative h-48 overflow-hidden">
                        {servicio.imagen ? (
                          <img
                            src={servicio.imagen}
                            alt={servicio.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
                            <div className="text-6xl text-blue-400">
                              {servicio.id === 1 && "🦷"}
                              {servicio.id === 2 && "✨"}
                              {servicio.id === 3 && "🔧"}
                              {servicio.id === 4 && "⚕️"}
                              {servicio.id === 5 && "👶"}
                              {servicio.id === 6 && "🩺"}
                            </div>
                          </div>
                        )}

                        {/* Overlay con gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Contenido de la card */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0092B2] transition-colors duration-300">
                          {servicio.title}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {servicio.description}
                        </p>

                        {/* Botón de acción */}
                        <div className="pt-4">
                          <button className="w-full bg-gradient-to-r from-[#0092B2] to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform group-hover:from-cyan-500 group-hover:to-[#0092B2] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#0092B2] focus:ring-opacity-50">
                            Conocer Más
                          </button>
                        </div>
                      </div>

                      {/* Efecto decorativo en hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0092B2]/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
                    </div>

                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-700"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                ¿Por qué elegir{" "}
                <span className="text-blue-600">Dental Care</span>?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <Heart className="w-6 h-6 text-red-500" />,
                    title: "Atención Personalizada",
                    description:
                      "Cada paciente recibe un plan de tratamiento único adaptado a sus necesidades específicas.",
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-green-500" />,
                    title: "Tecnología Avanzada",
                    description:
                      "Equipos de última generación para diagnósticos precisos y tratamientos efectivos.",
                  },
                  {
                    icon: <Users className="w-6 h-6 text-blue-500" />,
                    title: "Equipo Especializado",
                    description:
                      "Profesionales certificados con años de experiencia y educación continua.",
                  },
                  {
                    icon: <Star className="w-6 h-6 text-yellow-500" />,
                    title: "Excelencia en Resultados",
                    description:
                      "Comprometidos con la calidad y la satisfacción completa de nuestros pacientes.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-0 h-0 flex items-center justify-center border border-gray-200">
                <div>
                  <img
                    src={ortodoncia}
                    alt="ortodoncia"
                    className=" w-full h-full object-contain rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-xl text-gray-600">
              La satisfacción de nuestros pacientes es nuestro mayor logro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Paciente desde 2020",
                content:
                  "Excelente atención, profesionales muy capacitados y siempre me siento cómoda durante los tratamientos.",
              },
              {
                name: "Carlos Rodríguez",
                role: "Tratamiento de Ortodoncia",
                content:
                  "Resultados increíbles con mi ortodoncia. El equipo siempre fue muy atento y profesional.",
              },
              {
                name: "Ana Martínez",
                role: "Blanqueamiento Dental",
                content:
                  "Mi sonrisa cambió completamente. Súper recomendado, tecnología moderna y trato excepcional.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section  id={'contacto'} className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              ¿Listo para tu próxima cita?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contáctanos hoy y da el primer paso hacia una sonrisa saludable
            </p>
            <Link to='/login' className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 text-lg">
              Agendar Cita Ahora
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Teléfono</h3>
              <p className="text-gray-300">
                +57 (1) 123-4567
                <br />
                +57 312-345-6789
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Ubicación</h3>
              <p className="text-gray-300">
                Calle 123 #45-67
                <br />
                Bogotá, Colombia
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Horarios</h3>
              <p className="text-gray-300">
                Lun-Vie: 8:00 AM - 6:00 PM
                <br />
                Sáb: 8:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                Consultorio Dientitos
              </h3>
              <p className="text-gray-300 mb-4">
                Comprometidos con tu salud bucal y bienestar. Ofrecemos
                servicios odontológicos de calidad con un enfoque personalizado
                y tecnología de vanguardia.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Odontología General</li>
                <li>Estética Dental</li>
                <li>Ortodoncia</li>
                <li>Implantes</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-300">
                <li>consultorio@dientitos.com</li>
                <li>+57 (1) 123-4567</li>
                <li>Bogotá, Colombia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Consultorio Dientitos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
