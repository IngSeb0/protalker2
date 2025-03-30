
import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    content: "Gracias a ProTalker conseguí el trabajo de mis sueños. Practiqué mis entrevistas durante una semana y noté cómo mi confianza aumentaba con cada sesión. La retroalimentación personalizada fue clave para mi éxito.",
    author: "Sara Martínez",
    position: "Analista de Marketing",
    company: "Global Media",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "Como estudiante universitario, tenía mucha ansiedad por mis presentaciones orales. ProTalker me ayudó a estructurar mis ideas y a practicar en entornos realistas. Mi última exposición recibió la mejor nota del curso.",
    author: "Miguel Chen",
    position: "Estudiante de Ingeniería",
    company: "Universidad Nacional",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "La capacidad de adaptarse a diferentes contextos es lo que hace especial a ProTalker. Lo he usado tanto para entrevistas de trabajo como para preparar conferencias profesionales, con excelentes resultados en ambos casos.",
    author: "Elena Thompson",
    position: "Directora de Recursos Humanos",
    company: "Tech Solutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: 4,
    content: "Era escéptico sobre herramientas de IA, pero ProTalker superó mis expectativas. El análisis de mis patrones de comunicación y las sugerencias personalizadas realmente mejoraron mi forma de expresarme.",
    author: "David Rodríguez",
    position: "Consultor Independiente",
    company: "Autónomo",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4
  },
  {
    id: 5,
    content: "Mi equipo de ventas mejoró un 28% después de implementar ProTalker como herramienta de entrenamiento. Las simulaciones realistas de clientes difíciles nos prepararon para cualquier situación.",
    author: "Jennifer Liu",
    position: "Directora de Ventas",
    company: "NextGen Solutions",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - visibleCount : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - visibleCount ? 0 : prev + 1));
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
      
      // Reset active index if necessary
      if (activeIndex > testimonials.length - visibleCount) {
        setActiveIndex(testimonials.length - visibleCount);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }
    
    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="bg-gradient-to-b from-secondary/30 to-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="chip mb-6">Historias de Éxito</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Lo que dicen nuestros usuarios</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo profesionales y estudiantes están transformando su comunicación con ProTalker AI.
          </p>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="opacity-0 relative"
        >
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className={cn(
                    "w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-4",
                  )}
                >
                  <div className="testimonial-card h-full flex flex-col">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={cn(
                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-foreground/90 mb-6 flex-grow">{testimonial.content}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
