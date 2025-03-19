
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: "01",
    title: "Sign Up For Your Free Trial",
    description: "Create your account in seconds and get immediate access to all premium features for a full 14-day period. No credit card required to get started.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=2000"
  },
  {
    number: "02",
    title: "Connect Your Communication Channels",
    description: "Easily integrate ProTalker with your email, messaging apps, and social media platforms with our one-click secure connection process.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
  },
  {
    number: "03",
    title: "Experience AI-Powered Communication",
    description: "Start receiving intelligent response suggestions instantly as you communicate, saving time and improving your conversation quality right away.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000"
  }
];

const HowItWorks = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    if (stepRefs.current) {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }
    
    return () => {
      if (stepRefs.current) {
        stepRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="how-it-works" className="bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="chip mb-6">Simple Process</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How ProTalker Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with ProTalker in just three simple steps and transform your communication immediately.
          </p>
        </div>
        
        <div ref={stepsRef} className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepRefs.current[index] = el}
              className={cn(
                "flex flex-col md:flex-row items-center gap-8 opacity-0",
                index % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              <div className="flex-1 md:max-w-md">
                <div className="text-xs font-mono text-primary mb-2">{step.number}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground mb-6">{step.description}</p>
              </div>
              
              <div className="flex-1 w-full">
                <div className="relative rounded-xl overflow-hidden shadow-soft">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10"></div>
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full aspect-video object-cover object-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
