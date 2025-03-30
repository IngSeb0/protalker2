
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      title: "Gerente de Marketing",
      company: "TechCorp",
      avatar: "/lovable-uploads/5600b678-b324-4463-9536-690d09c7bef8.png",
      testimonial:
        "ProTalker ha transformado mi forma de comunicarme en reuniones importantes. Ahora puedo responder con confianza y claridad a preguntas difíciles.",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Hernández",
      title: "Consultor de Negocios",
      company: "Estrategias Globales",
      avatar: "/lovable-uploads/35083f51-4ac3-41bf-bc50-5ea287abbf42.png",
      testimonial:
        "Solía pasar horas preparando comunicaciones importantes. Con ProTalker, el proceso es rápido y los resultados son incluso mejores que antes.",
      rating: 5,
    },
    {
      id: 3,
      name: "Laura González",
      title: "Profesora Universitaria",
      company: "Universidad Nacional",
      avatar: "/lovable-uploads/a463166e-145d-41ca-a626-c5dbeacf0140.png",
      testimonial:
        "Como educadora, valoro herramientas que mejoran la comunicación. ProTalker no solo me ayuda con mis clases sino también con mis investigaciones.",
      rating: 4,
    },
  ];

  return (
    <section id="testimonios" className="py-16 md:py-24 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Usuarios
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Miles de profesionales confían en ProTalker para mejorar su comunicación diaria. Esto es lo que algunos de ellos dicen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.title}, {testimonial.company}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 flex-grow">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
