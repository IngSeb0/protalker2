
import React, { useEffect, useRef } from 'react';
import { MessageSquare, Zap, Shield, Award, RefreshCw, Clock } from 'lucide-react';

const features = [
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
    title: "Context-Aware Responses",
    description: "ProTalker analyzes conversation context to provide relevant suggestions tailored to your specific situation."
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
];

const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    <section ref={sectionRef} className="bg-secondary/30" id="features">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="chip mb-6">Key Features</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose ProTalker?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl mb-8">
            Don't settle for slow or generic responses in your professional conversations. Upgrade to ProTalker and communicate with speed, precision, and confidence.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="feature-card opacity-0"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-5">
                {feature.customIcon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
