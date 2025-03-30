
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from "lucide-react";

const FooterEs = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid gap-12 md:grid-cols-4 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="/lovable-uploads/e4c386bd-ed04-430c-a72e-a585e0ffdb2b.png"
                alt="ProTalker Logo"
                className="h-10 w-10 mr-2 rounded-lg"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ProTalker AI
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Transforma tu comunicación con inteligencia artificial. Nunca más te quedes sin palabras.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="#como-funciona"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link
                  to="#beneficios"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Beneficios
                </Link>
              </li>
              <li>
                <Link
                  to="#precios"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Precios
                </Link>
              </li>
              <li>
                <Link
                  to="#faq"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Prensa
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ProTalker AI. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-gray-500 hover:text-primary transition-colors text-sm"
              >
                Términos
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-primary transition-colors text-sm"
              >
                Privacidad
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-primary transition-colors text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterEs;
