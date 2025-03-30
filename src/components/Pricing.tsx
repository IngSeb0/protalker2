
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "Gratis",
      description: "Para uso personal ocasional",
      features: [
        "5 asistencias diarias",
        "Sugerencias básicas",
        "Integración con Gmail",
        "Interfaz web básica",
      ],
      cta: "Comenzar Gratis",
      popular: false,
    },
    {
      id: "pro",
      name: "Profesional",
      price: "€14.99",
      period: "/mes",
      description: "Para profesionales y equipos pequeños",
      features: [
        "Asistencias ilimitadas",
        "Sugerencias avanzadas",
        "Integración con todas las plataformas",
        "Análisis de tono y emociones",
        "Personalización avanzada",
        "Soporte prioritario",
      ],
      cta: "Obtener Pro",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "Personalizado",
      description: "Para grandes organizaciones",
      features: [
        "Todo en el plan Profesional",
        "Implementación personalizada",
        "Administración de equipo",
        "Seguridad empresarial avanzada",
        "API personalizada",
        "Soporte dedicado 24/7",
      ],
      cta: "Contactar Ventas",
      popular: false,
    },
  ];

  return (
    <section id="precios" className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planes y{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Precios
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen actualizaciones gratuitas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                plan.popular ? "border-primary" : "border-gray-100"
              } transform transition-transform hover:scale-105 duration-300 flex flex-col relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium uppercase tracking-wider">
                  Popular
                </div>
              )}
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Button
                  className={`w-full py-6 ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
