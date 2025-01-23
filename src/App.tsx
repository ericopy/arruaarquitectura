import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Building2, Users, Globe, Mail } from 'lucide-react';
import Briefing from './Briefing';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import FloatingContact from './components/FloatingContact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Refs for parallax elements
  const heroImageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Parallax effect
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);

      if (heroImageRef.current) {
        const scrolled = window.scrollY;
        heroImageRef.current.style.setProperty('--parallax-y', `${scrolled * 0.5}px`);
      }

      // Animate stats when in viewport
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          statsRef.current.classList.add('animate-fade-up');
        }
      }

      // Add animation classes to elements in viewport
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.85;
        
        if (isInViewport) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    {
      title: "Urban Heights Complex",
      location: "New York City",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=2070",
      description: "A 40-story mixed-use development combining luxury residences and retail spaces"
    },
    {
      title: "Eco Garden Office",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?auto=format&fit=crop&q=80&w=2070",
      description: "Sustainable office complex with integrated vertical gardens"
    },
    {
      title: "Crystal Museum",
      location: "Copenhagen",
      image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=2071",
      description: "Contemporary art museum with dynamic geometric architecture"
    }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'briefing':
        return <Briefing />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="relative h-[90vh] sm:h-screen">
              <div className="absolute inset-0" ref={heroImageRef}>
                <img
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070"
                  alt="Modern architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="text-white">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">Diseñando el<br />Futuro Hoy</h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl">Creamos arquitectura sostenible que transforma comunidades y enriquece vidas.</p>
                  <div className="space-x-4">
                    <a href="#projects" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-arrua-gold text-arrua-gold text-base sm:text-lg hover:bg-arrua-gold hover:text-black transition duration-300">
                      Ver Proyectos
                      <ChevronDown className="ml-2" />
                    </a>
                    <button
                      onClick={() => setCurrentPage('briefing')}
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-arrua-gold text-black text-base sm:text-lg hover:bg-yellow-400 transition duration-300"
                    >
                      Iniciar Proyecto
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-16 sm:py-24 bg-black">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center text-arrua-gold">Proyectos Destacados</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {projects.map((project, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg">
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-[250px] sm:h-[300px] object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <div className="text-white text-center p-4 sm:p-6">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                          <p className="text-sm mb-3 sm:mb-4 text-arrua-gold">{project.location}</p>
                          <p className="text-sm">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 sm:py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-arrua-black">Nuestro Enfoque</h2>
                    <p className="text-base sm:text-lg text-arrua-gray mb-6">
                      Creemos que la arquitectura tiene el poder de mejorar la experiencia humana y transformar comunidades. Nuestros diseños combinan innovación con sostenibilidad, creando espacios que perduran en el tiempo.
                    </p>
                    <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12" ref={statsRef}>
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <Building2 size={28} className="text-arrua-gold" />
                        <div>
                          <h3 className="font-bold text-arrua-black">150+</h3>
                          <p className="text-xs sm:text-sm text-arrua-gray">Proyectos Completados</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <Users size={28} className="text-arrua-gold" />
                        <div>
                          <h3 className="font-bold text-arrua-black">45+</h3>
                          <p className="text-xs sm:text-sm text-arrua-gray">Miembros del Equipo</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <Globe size={28} className="text-arrua-gold" />
                        <div>
                          <h3 className="font-bold text-arrua-black">25+</h3>
                          <p className="text-xs sm:text-sm text-arrua-gray">Países</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <Mail size={28} className="text-arrua-gold" />
                        <div>
                          <h3 className="font-bold text-arrua-black">200+</h3>
                          <p className="text-xs sm:text-sm text-arrua-gray">Clientes Satisfechos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-8 md:mt-0">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"
                      alt="Team meeting"
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 sm:py-24 bg-black text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-arrua-gold">Creemos Juntos</h2>
                  <p className="text-lg sm:text-xl text-arrua-gray">Contáctanos para discutir tu próximo proyecto</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
                  <div>
                    <form className="space-y-4 sm:space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-arrua-gold text-white"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-arrua-gold text-white"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-arrua-gold text-white"
                          placeholder="Cuéntanos sobre tu proyecto"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-arrua-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition duration-300"
                      >
                        Enviar Mensaje
                      </button>
                    </form>
                  </div>
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-arrua-gold">Visítanos</h3>
                      <p className="text-arrua-gray">
                        123 Calle Principal<br />
                        Ciudad, CP 12345<br />
                        Paraguay
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-arrua-gold">Contacto</h3>
                      <p className="text-arrua-gray">
                        Email: info@arrua.com<br />
                        Teléfono: +595 (21) 123-4567
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-arrua-gold">Síguenos</h3>
                      <div className="flex space-x-4">
                        <a href="#" className="text-arrua-gray hover:text-arrua-gold transition">Instagram</a>
                        <a href="#" className="text-arrua-gray hover:text-arrua-gold transition">LinkedIn</a>
                        <a href="#" className="text-arrua-gray hover:text-arrua-gold transition">Twitter</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 py-6 sm:py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center text-arrua-gray text-xs sm:text-sm">
                  © {new Date().getFullYear()} Arrúa Arquitectura. Todos los derechos reservados.
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      <ScrollProgress />
      <FloatingContact />
      
      <div className={`min-h-screen bg-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <nav className={`fixed w-full bg-black/90 backdrop-blur-sm z-40 border-b border-arrua-gold transition-all duration-300 ${hasScrolled ? 'py-2' : 'py-4'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div 
                className="flex-shrink-0 font-bold text-xl sm:text-2xl cursor-pointer text-arrua-gold" 
                onClick={() => setCurrentPage('home')}
              >
                ARRÚA
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4 lg:space-x-8">
                <a href="#projects" className="text-white hover:text-arrua-gold transition">Proyectos</a>
                <a href="#about" className="text-white hover:text-arrua-gold transition">Nosotros</a>
                <a href="#contact" className="text-white hover:text-arrua-gold transition">Contacto</a>
                <button
                  onClick={() => setCurrentPage('briefing')}
                  className="text-white hover:text-arrua-gold transition"
                >
                  Iniciar Proyecto
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-arrua-gold transition p-2"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute w-full bg-black">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-arrua-gold">
                <a href="#projects" className="block px-3 py-2 text-white hover:text-arrua-gold" onClick={() => setIsMenuOpen(false)}>Proyectos</a>
                <a href="#about" className="block px-3 py-2 text-white hover:text-arrua-gold" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
                <a href="#contact" className="block px-3 py-2 text-white hover:text-arrua-gold" onClick={() => setIsMenuOpen(false)}>Contacto</a>
                <button
                  onClick={() => {
                    setCurrentPage('briefing');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:text-arrua-gold"
                >
                  Iniciar Proyecto
                </button>
              </div>
            </div>
          )}
        </nav>

        {renderPage()}
      </div>
    </>
  );
}

export default App;