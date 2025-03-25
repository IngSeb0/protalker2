
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300', 
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-subtle py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/5ca03822-e2b4-4bd7-a6b6-81224f3fc870.png" 
                alt="ProTalker Logo" 
                className="h-10 w-10"
              />
              <span className="font-display font-semibold text-lg text-foreground">ProTalker</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-sm font-medium text-foreground/80 hover:text-primary subtle-underline py-1"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-sm">Sign In</Button>
            <Button className="text-sm btn-hover-effect">Start Free Trial</Button>
          </div>
          
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 animate-slide-up p-4">
          <nav className="flex flex-col space-y-4 py-4">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-foreground/80 hover:text-primary py-2 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="border-t border-border pt-4 mt-2 flex flex-col space-y-3 px-4">
              <Button variant="outline" className="w-full justify-center">Sign In</Button>
              <Button className="w-full justify-center">Start Free Trial</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
