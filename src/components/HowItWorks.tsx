
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: "01",
    title: "Visit the ProTalker Website",
    description: "Go to our official page and sign up to access your AI-powered communication assistant.",
    image: "/lovable-uploads/31c9565c-40c1-40ab-9b69-94c1619c035c.png"
  },
  {
    number: "02",
    title: "Answer a Few Quick Questions",
    description: "Provide some basic details about your communication style and goals to personalize your experience.",
    image: "/lovable-uploads/f23dc641-18d1-4c03-995d-a3c9dbd36e16.png"
  },
  {
    number: "03",
    title: "Practice Your Conversations",
    description: "Engage with real-life scenarios and get AI-driven response suggestions to improve your messaging.",
    image: "/lovable-uploads/5600b678-b324-4463-9536-690d09c7bef8.png"
  },
  {
    number: "04",
    title: "Get Feedback & Improve",
    description: "Receive insightful feedback and recommendations to refine your tone, clarity, and effectiveness.",
    image: "/lovable-uploads/f3f107a3-6ac3-47d2-a880-f5bd9d1d3893.png"
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
            Get started with ProTalker in just four simple steps and transform your communication immediately.
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
                <div className="relative rounded-xl overflow-hidden shadow-soft bg-white p-4">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-auto rounded-lg"
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
