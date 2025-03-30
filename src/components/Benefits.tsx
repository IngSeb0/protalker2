
import React, { useEffect, useRef } from 'react';
import { 
  Clock, 
  Check, 
  Zap, 
  MessagesSquare, 
  PenTool, 
  UserCheck 
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const features: Feature[] = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Ahorra tiempo",
      description: "Obtén respuestas de calidad en segundos, sin pasar horas pensando en qué decir."
    },
    {
      icon: <Check className="h-6 w-6 text-secondary" />,
      title: "Mayor claridad",
      description: "Comunica tus ideas de forma clara y efectiva con sugerencias optimizadas."
    },
    {
      icon: <Zap className="h-6 w-6 text-accent" />,
      title: "Respuestas rápidas",
      description: "Mejora tu tiempo de respuesta en conversaciones importantes y profesionales."
    },
    {
      icon: <MessagesSquare className="h-6 w-6 text-primary" />,
      title: "Mejora relaciones",
      description: "Fortalece tus relaciones personales y profesionales con comunicación efectiva."
    },
    {
      icon: <PenTool className="h-6 w-6 text-secondary" />,
      title: "Personalización",
      description: "Adapta las sugerencias a tu estilo personal y contexto específico."
    },
    {
      icon: <UserCheck className="h-6 w-6 text-accent" />,
      title: "Fácil de usar",
      description: "Interfaz intuitiva diseñada para ser utilizada por cualquier persona."
    }
  ];
  
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
    
    if (featureRefs.current) {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }
    
    return () => {
      if (featureRefs.current) {
        featureRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 px-6 md:px-12" 
      id="beneficios"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Beneficios de{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ProTalker
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma puede transformar tu comunicación y hacerte destacar en cada conversación.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow opacity-0 flex flex-col items-center"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
