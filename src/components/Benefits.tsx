
import React, { useEffect, useRef } from 'react';
import { MessageSquare, Zap, Shield, Award, RefreshCw, Clock } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Context-Aware Responses",
    description: "ProTalker analyzes conversation context to provide relevant suggestions tailored to your specific situation."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Lightning-Fast Generation",
    description: "Get instant response suggestions without the delay, helping you maintain natural conversation flow."
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Privacy Focused",
    description: "Your conversations remain yours, with end-to-end encryption and strict data protection standards."
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Professional Tone Matching",
    description: "Customize responses to match your professional tone, ensuring consistent communication style."
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-primary" />,
    title: "Continuous Learning",
    description: "ProTalker adapts to your communication patterns over time, becoming more personalized with use."
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI communication tool offers unique benefits that transform everyday conversations into powerful, effective exchanges.
          </p>
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
                {feature.icon}
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
