
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const titleElement = titleRef.current;
        const contentElement = contentRef.current;
        
        if (scrollY <= heroHeight) {
          const opacity = 1 - scrollY / (heroHeight * 0.7);
          const scale = 1 - (scrollY / heroHeight) * 0.1;
          
          if (titleElement) {
            titleElement.style.transform = `translateY(${scrollY * 0.3}px) scale(${scale})`;
            titleElement.style.opacity = Math.max(0, opacity).toString();
          }
          
          if (contentElement) {
            contentElement.style.transform = `translateY(${scrollY * 0.1}px) scale(${scale})`;
            contentElement.style.opacity = Math.max(0, opacity).toString();
          }
        }
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background to-background/0"></div>
      <div className="section-container relative z-20 flex flex-col items-center justify-center pt-20">
        <div className="chip mb-6 opacity-0 animate-fade-in">Revolutionary AI Communication Tool</div>
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-center mb-6 max-w-4xl opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Elevate Your Conversations With <span className="text-primary">ProTalker AI</span>
        </h1>
        
        <div 
          ref={contentRef}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-xl text-center text-muted-foreground max-w-2xl mb-8">
            Transform the way you communicate with cutting-edge AI that understands context, tone, and intent, helping you craft perfect responses every time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="px-8 py-6 rounded-full btn-hover-effect text-base">
              Start Free Trial
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 rounded-full btn-hover-effect text-base">
              See Demo
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle size={16} className="text-primary mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="text-primary mr-2" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="text-primary mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
        
        <div 
          className="max-w-5xl mt-16 relative w-full rounded-xl overflow-hidden shadow-glass border border-white/20 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 backdrop-blur-sm z-10"></div>
          <div className="relative w-full aspect-[16/9]">
            <img 
              src="/lovable-uploads/2671a94f-6a2d-4e21-9a7c-da22bb6df3c3.png" 
              alt="ProTalker AI Interface" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a 
          href="#features" 
          className="text-foreground/60 hover:text-primary transition-colors duration-300 animate-float"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
