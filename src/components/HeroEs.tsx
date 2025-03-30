
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HeroEs = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white to-primary/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Eleva tus conversaciones con{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              ProTalker utiliza tecnología avanzada para ayudarte a comunicarte mejor. Nunca más te quedes sin palabras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/demo">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg">
                  Probar Gratis
                </Button>
              </Link>
              <Link to="#como-funciona">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 text-lg"
                >
                  Cómo Funciona
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-4 w-36 h-36 bg-primary/30 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 right-10 w-20 h-20 bg-accent/30 rounded-full blur-xl"></div>
              <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-gray-100">
                <img
                  src="/lovable-uploads/e4c386bd-ed04-430c-a72e-a585e0ffdb2b.png"
                  alt="ProTalker Demo"
                  className="rounded-xl w-full h-auto"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-md border border-gray-100">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="text-sm font-medium text-gray-700">
                      IA Activa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroEs;
