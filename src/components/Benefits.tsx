
import React, { useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  Award, 
  RefreshCw, 
  Clock,
  Check,
  MessagesSquare,
  PenTool,
  UserCheck
} from 'lucide-react';

type BenefitsProps = {
  language?: 'en' | 'es';
};

const Benefits = ({ language = 'en' }: BenefitsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Define content for both languages
  const content = {
    en: {
      sectionId: 'features',
      title: 'Why Choose ProTalker?',
      subtitle: 'Key Features',
      description: "Don't settle for slow or generic responses in your professional conversations. Upgrade to ProTalker and communicate with speed, precision, and confidence.",
      features: [
        {
          icon: <MessageSquare className="h-6 w-6 text-primary" />,
          customIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 9h8M8 13h6" 
                stroke="#6d28d9" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ),
          title: "Easy and Customizable",
          description: "ProTalker is easy to use and adapts to your communication style, offering a seamless and personalized experience without the need for complicated configurations."
        },
        {
          icon: <Zap className="h-6 w-6 text-primary" />,
          customIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          title: "Lightning-Fast Generation",
          description: "Get instant response suggestions without the delay, helping you maintain natural conversation flow."
        },
        {
          icon: <Shield className="h-6 w-6 text-primary" />,
          customIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" 
                stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          title: "Privacy Focused",
          description: "Your conversations remain yours, with end-to-end encryption and strict data protection standards."
        },
        {
          icon: <Award className="h-6 w-6 text-primary" />,
          customIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="6" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15.477 12.89L16.922 22l-4.922-2-4.922 2 1.445-9.11" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          title: "Professional Tone Matching",
          description: "Customize responses to match your professional tone, ensuring consistent communication style."
        },
        {
          icon: <RefreshCw className="h-6 w-6 text-primary" />,
          customIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4v6h-6M1 20v-6h6" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          title: "Continuous Learning",
          description: "ProTalker adapts to your communication patterns over time, becoming more personalized with use."
        },
        {
          icon: <Clock className="h-6 w-6 text-primary" />,
          customIcon: (
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 6v6l4 2" 
                fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          title: "Time-Saving Automation",
          description: "Save hours weekly with automated suggestions for frequently asked questions and common responses."
        }
      ]
    },
    es: {
      sectionId: 'beneficios',
      title: 'Beneficios de ProTalker',
      subtitle: '',
      description: 'Descubre cómo nuestra plataforma puede transformar tu comunicación y hacerte destacar en cada conversación.',
      features: [
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
      ]
    }
  };

  // Select the appropriate content based on language
  const currentContent = language === 'en' ? content.en : content.es;
  
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
      className={language === 'en' ? "bg-secondary/30" : "py-16 md:py-24 px-6 md:px-12"} 
      id={currentContent.sectionId}
    >
      <div className={language === 'en' ? "section-container" : "container mx-auto"}>
        <div className="text-center mb-16">
          {currentContent.subtitle && (
            <div className="chip mb-6">{currentContent.subtitle}</div>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'es' && (
              <>
                {currentContent.title.split('ProTalker')[0]}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  ProTalker
                </span>
              </>
            )}
            {language === 'en' && currentContent.title}
          </h2>
          <p className={`text-${language === 'en' ? 'muted-foreground' : 'gray-600'} max-w-${language === 'en' ? '3xl' : '2xl'} mx-auto ${language === 'en' ? 'text-lg md:text-xl mb-8' : ''}`}>
            {currentContent.description}
          </p>
          {language === 'en' && <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>}
        </div>
        
        <div className={`grid gap-8 ${language === 'en' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {currentContent.features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className={language === 'en' ? "feature-card opacity-0" : "bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow opacity-0"}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {language === 'en' ? (
                <div className="rounded-full bg-primary/10 p-3 w-fit mb-5">
                  {feature.customIcon}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
              )}
              <h3 className={`${language === 'en' ? 'text-lg font-semibold mb-3' : 'text-xl font-bold mb-2 text-center'}`}>
                {feature.title}
              </h3>
              <p className={`${language === 'en' ? 'text-muted-foreground' : 'text-gray-600 text-center'}`}>
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
