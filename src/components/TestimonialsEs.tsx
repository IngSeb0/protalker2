
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const TestimonialsEs = () => {
  const testimonials = [
    {
      name: "Ana García",
      position: "Gerente de Marketing",
      company: "TechSolutions",
      image: "/placeholder.svg",
      rating: 5,
      content:
        "ProTalker ha transformado completamente mi comunicación con clientes. Ahora puedo responder consultas de manera eficiente y profesional, lo que ha mejorado significativamente nuestras relaciones comerciales.",
    },
    {
      name: "Carlos Rodríguez",
      position: "Emprendedor",
      company: "StartupNow",
      image: "/placeholder.svg",
      rating: 5,
      content:
        "Como fundador de una startup, necesito comunicarme claramente con inversores y colaboradores. ProTalker me ayuda a estructurar mis ideas y presentarlas de manera convincente. ¡Una herramienta indispensable!",
    },
    {
      name: "Lucía Martínez",
      position: "Profesora Universitaria",
      company: "Universidad Central",
      image: "/placeholder.svg",
      rating: 4,
      content:
        "Utilizo ProTalker para mejorar mis comunicaciones académicas. Me ha ayudado a escribir emails más concisos y hacer comentarios más claros en los trabajos de mis estudiantes. Excelente herramienta educativa.",
    },
    {
      name: "Miguel Fernández",
      position: "Especialista en Ventas",
      company: "GlobalRetail",
      image: "/placeholder.svg",
      rating: 5,
      content:
        "Las plantillas personalizadas de ProTalker me han ayudado a cerrar más ventas. La capacidad de adaptar rápidamente mis mensajes según el cliente ha aumentado mi eficacia y mis resultados.",
    },
    {
      name: "Sofía López",
      position: "Profesional de RR.HH.",
      company: "TalentHub",
      image: "/placeholder.svg",
      rating: 5,
      content:
        "En recursos humanos, la comunicación clara es esencial. ProTalker me ayuda a redactar ofertas de trabajo, dar feedback constructivo y mantener una comunicación efectiva con todos los empleados.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonios" className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Dicen Nuestros Clientes
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo ProTalker ha transformado la comunicación para profesionales y empresas de diversos sectores.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto">
          <div className="overflow-hidden py-10">
            <div className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentTestimonial * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-4 items-center">
                          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                            {testimonial.name.substring(0, 1)}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-yellow-400 fill-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 h-12 w-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 h-12 w-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  currentTestimonial === index
                    ? "w-10 bg-primary"
                    : "w-3 bg-gray-300"
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Ver testimonio ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsEs;
