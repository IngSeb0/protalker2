
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: "01",
    title: "Sign Up For Your Free Trial",
    description: "Create your account in seconds and get immediate access to all premium features for a full 14-day period. No credit card required to get started.",
    illustration: (
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="#f8f9fa" />
        <rect x="100" y="40" width="200" height="150" rx="10" fill="#f0f0f0" stroke="#6d28d9" strokeWidth="2" />
        <rect x="130" y="70" width="140" height="25" rx="5" fill="#e0e0e0" />
        <rect x="130" y="110" width="140" height="25" rx="5" fill="#e0e0e0" />
        <rect x="150" y="150" width="100" height="30" rx="15" fill="#6d28d9" />
        <text x="200" y="170" fontSize="14" fill="white" textAnchor="middle" dominantBaseline="middle">SIGN UP</text>
        <circle cx="200" cy="25" r="15" fill="#6d28d9" />
        <path d="M195,25 L200,30 L210,20" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    number: "02",
    title: "Connect Your Communication Channels",
    description: "Easily integrate ProTalker with your email, messaging apps, and social media platforms with our one-click secure connection process.",
    illustration: (
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="#f8f9fa" />
        <circle cx="100" cy="112" r="50" fill="#f0f0f0" stroke="#6d28d9" strokeWidth="2" />
        <circle cx="300" cy="112" r="50" fill="#f0f0f0" stroke="#6d28d9" strokeWidth="2" />
        <path d="M150,112 L250,112" stroke="#6d28d9" strokeWidth="3" strokeDasharray="10 5" />
        <rect x="80" y="97" width="40" height="30" rx="5" fill="white" />
        <rect x="280" y="97" width="40" height="30" rx="5" fill="white" />
        <text x="100" y="115" fontSize="14" fill="#6d28d9" textAnchor="middle" dominantBaseline="middle">@</text>
        <text x="300" y="115" fontSize="20" fill="#6d28d9" textAnchor="middle" dominantBaseline="middle">P</text>
        <circle cx="200" cy="80" r="15" fill="#6d28d9" />
        <path d="M200,70 L200,90 M190,80 L210,80" stroke="white" strokeWidth="2" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Experience AI-Powered Communication",
    description: "Start receiving intelligent response suggestions instantly as you communicate, saving time and improving your conversation quality right away.",
    illustration: (
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="#f8f9fa" />
        <rect x="50" y="50" width="300" height="150" rx="10" fill="#f0f0f0" stroke="#6d28d9" strokeWidth="2" />
        <rect x="70" y="80" width="120" height="30" rx="15" fill="white" stroke="#e0e0e0" />
        <rect x="70" y="120" width="260" height="30" rx="15" fill="#6d28d9" opacity="0.2" />
        <rect x="70" y="160" width="180" height="30" rx="15" fill="#6d28d9" />
        <text x="160" y="175" fontSize="12" fill="white" textAnchor="middle" dominantBaseline="middle">AI SUGGESTION</text>
        <path d="M350,140 C370,140 370,110 350,110" stroke="#6d28d9" strokeWidth="2" fill="none" />
        <circle cx="350" cy="110" r="3" fill="#6d28d9" />
        <circle cx="350" cy="140" r="3" fill="#6d28d9" />
        <path d="M350,85 C380,85 380,45 350,45" stroke="#6d28d9" strokeWidth="2" fill="none" />
        <circle cx="350" cy="45" r="3" fill="#6d28d9" />
        <circle cx="350" cy="85" r="3" fill="#6d28d9" />
      </svg>
    )
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
                <div className="relative rounded-xl overflow-hidden shadow-soft bg-white p-4">
                  {step.illustration}
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
