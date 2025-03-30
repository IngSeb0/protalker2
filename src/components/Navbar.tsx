import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Cambia esto por tu lógica de autenticación real
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 md:px-12 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/e4c386bd-ed04-430c-a72e-a585e0ffdb2b.png"
            alt="ProTalker Logo"
            className="h-10 w-10 mr-2 rounded-lg"
          />
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            ProTalker AI
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="#como-funciona" className="text-gray-700 hover:text-primary font-medium">
            Cómo Funciona
          </Link>
          <Link to="#beneficios" className="text-gray-700 hover:text-primary font-medium">
            Beneficios
          </Link>
          <Link to="#precios" className="text-gray-700 hover:text-primary font-medium">
            Precios
          </Link>
          <Link to="#testimonios" className="text-gray-700 hover:text-primary font-medium">
            Testimonios
          </Link>
          <Link to="#faq" className="text-gray-700 hover:text-primary font-medium">
            FAQ
          </Link>
        </div>

        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/signin">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="-mr-2 flex items-center sm:hidden">
          <Button
            variant="ghost"
            onClick={toggleNav}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Abrir menú principal</span>
            {isNavOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isNavOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="#como-funciona"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsNavOpen(false)}
            >
              Cómo Funciona
            </Link>
            <Link
              to="#beneficios"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsNavOpen(false)}
            >
              Beneficios
            </Link>
            <Link
              to="#precios"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsNavOpen(false)}
            >
              Precios
            </Link>
            <Link
              to="#testimonios"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsNavOpen(false)}
            >
              Testimonios
            </Link>
            <Link
              to="#faq"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsNavOpen(false)}
            >
              FAQ
            </Link>
            {isLoggedIn && (
              <div className="pl-3 pr-4 py-2">
                <UserMenu />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;