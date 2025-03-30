
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";

export const NavbarCustom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white py-4 px-6 md:px-12 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/e4c386bd-ed04-430c-a72e-a585e0ffdb2b.png"
            alt="ProTalker Logo"
            className="h-10 w-10 mr-2 rounded-lg"
          />
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ProTalker AI
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          <Link
            to="/"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/demo"
            className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Probar Demo
            </Button>
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <UserMenu />
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Abrir menú principal</span>
            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/demo"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Probar Demo
              </Button>
            </Link>
            <div className="pl-3 pr-4 py-2">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
