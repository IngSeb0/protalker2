
import React, { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does ProTalker AI learn my communication style?",
    answer: "ProTalker analyzes your previous communications to understand your tone, vocabulary, and response patterns. The more you use it, the better it becomes at matching your unique style and preferences. All learning happens securely and privately."
  },
  {
    question: "Is my data secure with ProTalker?",
    answer: "Yes, we take data security extremely seriously. All communications are encrypted end-to-end, and we follow strict data protection standards. Your data is never sold or shared with third parties, and you maintain complete ownership over your information."
  },
  {
    question: "Which platforms and applications does ProTalker integrate with?",
    answer: "ProTalker seamlessly integrates with popular communication platforms including Gmail, Outlook, Slack, Microsoft Teams, WhatsApp Business, LinkedIn, Twitter, and more. We're constantly adding new integrations based on user feedback."
  },
  {
    question: "Can I use ProTalker in multiple languages?",
    answer: "Yes, ProTalker currently supports over 30 languages including English, Spanish, French, German, Japanese, Chinese, and Arabic. Our AI maintains context and nuance across languages for accurate, natural-sounding responses."
  },
  {
    question: "What happens after my 14-day free trial ends?",
    answer: "After your trial ends, you'll be prompted to select a pricing plan to continue using ProTalker. We'll send reminders before your trial expires, and there's no automatic charging - you'll need to actively choose a plan to continue. If you decide not to continue, you can export your data within 30 days."
  },
  {
    question: "Do you offer refunds if I'm not satisfied?",
    answer: "Yes, we offer a 30-day money-back guarantee for all new customers. If you're not completely satisfied with ProTalker within your first month of paid service, contact our support team for a full refund, no questions asked."
  }
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="faq" className="bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="chip mb-6">Common Questions</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about ProTalker AI. If you don't see what you're looking for, reach out to our support team.
          </p>
        </div>
        
        <div 
          ref={sectionRef}
          className="max-w-3xl mx-auto opacity-0"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg mb-4 px-4 py-2 bg-white shadow-subtle">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">Our support team is here to help you with any questions you may have.</p>
            <a href="#" className="text-primary hover:underline font-medium">Contact Support →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
