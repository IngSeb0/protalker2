
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: "01",
    title: "Visit the ProTalker Website",
    description: "Go to our official page and sign up to access your AI-powered communication assistant.",
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
    title: "Answer a Few Quick Questions",
    description: "Provide some basic details about your communication style and goals to personalize your experience.",
    illustration: (
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="#f8f9fa" />
        <rect x="100" y="40" width="200" height="150" rx="10" fill="#f0f0f0" stroke="#6d28d9" strokeWidth="2" />
        <rect x="130" y="70" width="140" height="20" rx="5" fill="#e0e0e0" />
        <rect x="130" y="100" width="140" height="20" rx="5" fill="#e0e0e0" />
        <rect x="130" y="130" width="140" height="20" rx="5" fill="#e0e0e0" />
        <circle cx="120" cy="80" r="5" fill="#6d28d9" />
        <circle cx="120" cy="110" r="5" fill="#6d28d9" />
        <circle cx="120" cy="140" r="5" fill="#6d28d9" />
      </svg>
    )
  },
  {
    number: "03",
    title: "Practice Your Conversations",
    description: "Engage with real-life scenarios and get AI-driven response suggestions to improve your messaging.",
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
      </svg>
    )
  },
  {
    number: "04",
    title: "Get Feedback & Improve",
    description: "Receive insightful feedback and recommendations to refine your tone, clarity, and effectiveness.",
    illustration: (
      <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="225" fill="#f8f9fa" />
        <rect x="80" y="60" width="240" height="120" rx="10" fill="#f0f0f0" stroke="#6d28d9" strokeWidth="2" />
        <path d="M110,100 L130,120 L150,80" stroke="#6d28d9" strokeWidth="3" fill="none" />
        <line x1="170" y1="100" x2="270" y2="100" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="170" y1="120" x2="250" y2="120" stroke="#e0e0e0" strokeWidth="2" />
        <line x1="170" y1="140" x2="260" y2="140" stroke="#e0e0e0" strokeWidth="2" />
        <circle cx="200" cy="40" r="20" fill="#6d28d9" opacity="0.2" />
        <path d="M190,40 L200,50 L215,35" stroke="#6d28d9" strokeWidth="2" fill="none" />
        <path d="M200,185 L200,165 M185,175 L215,175" stroke="#6d28d9" strokeWidth="2" />
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
