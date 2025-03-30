
import { Lightbulb, MessageSquare, LineChart } from "lucide-react";

const HowItWorksEs = () => {
  const steps = [
    {
      id: "01",
      title: "Formula tu pregunta",
      description: "Escribe tu duda o problema de comunicación de forma clara.",
      icon: <Lightbulb size={24} className="text-secondary" />,
      image: "/lovable-uploads/35305656-ed00-4cde-893e-6db3ff4b7aaf.png"
    },
    {
      id: "02",
      title: "Recibe sugerencias",
      description: "ProTalker AI analiza tu mensaje y genera respuestas inteligentes.",
      icon: <MessageSquare size={24} className="text-primary" />,
      image: "/lovable-uploads/35083f51-4ac3-41bf-bc50-5ea287abbf42.png"
    },
    {
      id: "03",
      title: "Comunica efectivamente",
      description: "Selecciona la mejor respuesta y comunícate con confianza.",
      icon: <LineChart size={24} className="text-accent" />,
      image: "/lovable-uploads/e4c386bd-ed04-430c-a72e-a585e0ffdb2b.png"
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cómo Funciona{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ProTalker AI
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra plataforma de inteligencia artificial está diseñada para ayudarte a comunicarte mejor en solo tres simples pasos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col md:flex-row gap-8 mb-16 items-center">
              <div className="w-full md:w-1/3">
                <div className="bg-white p-2 rounded-2xl shadow-md border border-gray-100">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md border border-gray-100">
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      {step.id}
                    </span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 ml-16">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksEs;
