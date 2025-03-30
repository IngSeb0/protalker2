
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué es ProTalker AI?",
      answer:
        "ProTalker AI es una plataforma de asistencia de comunicación impulsada por inteligencia artificial que te ayuda a mejorar tus conversaciones, emails y mensajes profesionales a través de sugerencias inteligentes y contextuales.",
    },
    {
      question: "¿Cómo funciona ProTalker AI?",
      answer:
        "Simplemente escribes tu mensaje inicial o consulta, y ProTalker AI analiza el contenido para generar sugerencias inteligentes, mejorar la claridad, el tono y la efectividad de tu comunicación.",
    },
    {
      question: "¿ProTalker AI puede integrarse con otras herramientas?",
      answer:
        "Sí, ProTalker AI ofrece integraciones con aplicaciones populares como Gmail, Outlook, Slack, Microsoft Teams y otras plataformas de comunicación empresarial.",
    },
    {
      question: "¿Qué idiomas soporta ProTalker AI?",
      answer:
        "Actualmente, ProTalker AI soporta español, inglés, francés, alemán, italiano, portugués y estamos trabajando continuamente para añadir más idiomas.",
    },
    {
      question: "¿Mis datos están seguros con ProTalker AI?",
      answer:
        "Absolutamente. En ProTalker AI, la privacidad y seguridad son nuestra prioridad. No almacenamos permanentemente ningún contenido de tus conversaciones y empleamos cifrado de extremo a extremo para proteger tus datos.",
    },
    {
      question: "¿Puedo usar ProTalker AI en mi dispositivo móvil?",
      answer:
        "Sí, ProTalker AI está disponible como aplicación móvil para dispositivos iOS y Android, así como extensión para navegadores web y aplicación de escritorio.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre ProTalker AI y cómo puede ayudarte.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium text-lg">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-40 py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
