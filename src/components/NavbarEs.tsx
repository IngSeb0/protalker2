
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const NavbarEs = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ProTalker AI
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="#" className="text-gray-700 hover:text-primary font-medium">
            Inicio
          </Link>
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

        <div className="hidden md:flex items-center space-x-2">
          <Link to="/sign-in">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Iniciar Sesión
            </Button>
          </Link>
          <Link to="/demo">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Probar Demo
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleNav}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isNavOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isNavOpen && (
        <div className="md:hidden mt-2 py-2 bg-white shadow-md rounded-lg absolute top-16 left-4 right-4">
          <div className="flex flex-col space-y-3 px-4 py-2">
            <Link
              to="#"
              className="text-gray-700 hover:text-primary font-medium py-1"
              onClick={() => setIsNavOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="#como-funciona"
              className="text-gray-700 hover:text-primary font-medium py-1"
              onClick={() => setIsNavOpen(false)}
            >
              Cómo Funciona
            </Link>
            <Link
              to="#beneficios"
              className="text-gray-700 hover:text-primary font-medium py-1"
              onClick={() => setIsNavOpen(false)}
            >
              Beneficios
            </Link>
            <Link
              to="#precios"
              className="text-gray-700 hover:text-primary font-medium py-1"
              onClick={() => setIsNavOpen(false)}
            >
              Precios
            </Link>
            <Link
              to="#testimonios"
              className="text-gray-700 hover:text-primary font-medium py-1"
              onClick={() => setIsNavOpen(false)}
            >
              Testimonios
            </Link>
            <Link
              to="#faq"
              className="text-gray-700 hover:text-primary font-medium py-1"
              onClick={() => setIsNavOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/sign-in" onClick={() => setIsNavOpen(false)}>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white w-full"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/demo" onClick={() => setIsNavOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                  Probar Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarEs;
