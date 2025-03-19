
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: "Starter",
    price: {
      monthly: "$9",
      annually: "$7"
    },
    description: "Perfect for individuals and small teams just getting started with AI communication.",
    features: [
      "Up to 100 AI responses per month",
      "Basic tone customization",
      "Email integration",
      "Mobile app access",
      "24/7 customer support"
    ],
    popular: false,
    cta: "Start Free Trial",
    ctaVariant: "outline" as const
  },
  {
    name: "Professional",
    price: {
      monthly: "$29",
      annually: "$24"
    },
    description: "Advanced features for professionals who communicate extensively with clients and teams.",
    features: [
      "Unlimited AI responses",
      "Advanced tone customization",
      "All platform integrations",
      "Analytics dashboard",
      "Priority support",
      "Custom templates"
    ],
    popular: true,
    cta: "Start Free Trial",
    ctaVariant: "default" as const
  },
  {
    name: "Enterprise",
    price: {
      monthly: "$99",
      annually: "$84"
    },
    description: "Complete solution for large teams and organizations with comprehensive needs.",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom AI training",
      "Admin dashboard",
      "Advanced security features",
      "SSO and SAML",
      "API access"
    ],
    popular: false,
    cta: "Contact Sales",
    ctaVariant: "outline" as const
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
  const sectionRef = useRef<HTMLDivElement>(null);
  const pricingRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    if (pricingRefs.current) {
      pricingRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }
    
    return () => {
      if (pricingRefs.current) {
        pricingRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="pricing" className="bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="chip mb-6">Simple Pricing</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Select the perfect plan for your needs. All plans include a 14-day free trial with no credit card required.
          </p>
          
          <div className="flex items-center justify-center mb-12">
            <div className="bg-secondary rounded-full p-1 inline-flex">
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingCycle === 'monthly' 
                    ? 'bg-white shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all relative",
                  billingCycle === 'annually' 
                    ? 'bg-white shadow-sm text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
                onClick={() => setBillingCycle('annually')}
              >
                Annually
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">
                  Save 16%
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              ref={el => pricingRefs.current[index] = el}
              className={cn(
                "rounded-xl border p-6 opacity-0 transition-all",
                plan.popular 
                  ? 'border-primary shadow-highlight scale-105 relative z-10 bg-white' 
                  : 'border-border bg-white/50'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price[billingCycle]}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <Button 
                variant={plan.ctaVariant} 
                className={cn(
                  "w-full mb-6",
                  plan.popular && plan.ctaVariant === 'default' && 'bg-primary hover:bg-primary/90'
                )}
              >
                {plan.cta}
              </Button>
              
              <div className="space-y-3">
                <p className="text-sm font-medium">Plan includes:</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-xl mx-auto">
          <div className="flex items-start justify-center gap-2 text-sm text-muted-foreground mb-6">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <p>
              All plans come with a 14-day free trial. No credit card required. Cancel anytime. 
              Need a custom solution? <a href="#" className="text-primary hover:underline">Contact our sales team</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
