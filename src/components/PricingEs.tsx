
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const PricingEs = () => {
  const [annual, setAnnual] = useState(false);

  const pricingOptions = [
    {
      title: "Gratuito",
      description: "Perfecto para principiantes",
      price: 0,
      features: [
        "5 respuestas generadas por día",
        "Acceso a plantillas básicas",
        "Editor de texto simple",
        "Soporte por email",
      ],
      btnText: "Comenzar Gratis",
      btnVariant: "outline" as const,
      popular: false,
    },
    {
      title: "Pro",
      description: "Para usuarios frecuentes",
      price: annual ? 9.99 : 14.99,
      features: [
        "Respuestas ilimitadas",
        "Todas las plantillas premium",
        "Editor avanzado con sugerencias",
        "Soporte prioritario",
        "Sin marca de agua",
      ],
      btnText: "Obtener Pro",
      btnVariant: "default" as const,
      popular: true,
    },
    {
      title: "Empresa",
      description: "Para equipos y negocios",
      price: annual ? 49.99 : 79.99,
      features: [
        "Todo lo incluido en Pro",
        "Usuario ilimitados",
        "Integraciones con herramientas empresariales",
        "Análisis avanzados",
        "Gerente de cuenta dedicado",
        "Soporte 24/7",
      ],
      btnText: "Contacta con Ventas",
      btnVariant: "outline" as const,
      popular: false,
    },
  ];

  return (
    <section id="precios" className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes y{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Precios
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Elige el plan perfecto para tus necesidades de comunicación. Todos los planes incluyen actualizaciones regulares.
          </p>

          <div className="flex items-center justify-center gap-3 mb-12">
            <span
              className={`text-sm font-medium ${
                !annual
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Mensual
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                annual ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  annual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                annual
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Anual <span className="text-green-500 font-bold">(-33%)</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm border ${
                option.popular
                  ? "border-primary ring-2 ring-primary/20 relative"
                  : "border-gray-100"
              }`}
            >
              {option.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Más Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{option.title}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {option.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {option.price === 0 ? "Gratis" : `$${option.price}`}
                  </span>
                  {option.price > 0 && (
                    <span className="text-gray-500 ml-1">
                      /{annual ? "año" : "mes"}
                    </span>
                  )}
                </div>
                <Button
                  className={`w-full mb-6 ${
                    option.btnVariant === "default"
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                  variant={option.btnVariant}
                >
                  {option.btnText}
                </Button>
                <ul className="space-y-3">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mr-2 mt-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingEs;
