"use client";
import React from "react";
import { motion } from "framer-motion";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl border border-gray-100 shadow-md shadow-black/5 max-w-xs w-full bg-white overflow-hidden"
              >
                {/* Red accent bar */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-lad-red/30" />
                {/* Quote mark */}
                <span className="block font-display text-5xl font-black text-lad-red/15 leading-none mb-1 select-none">&ldquo;</span>
                <p className="text-sm leading-relaxed text-gray-800">{text}</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-50">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-lad-red/10"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-tight text-lad-black leading-5">{name}</span>
                    <span className="text-xs leading-5 text-lad-red tracking-tight">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    text: "Mis resultados del perfil preventivo llegaron el mismo día, claros y bien organizados. Ya no tengo que esperar días para saber si algo está fuera de rango.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "María González",
    role: "Paciente",
  },
  {
    text: "Llevo años mandando a mis pacientes con LAD. Jamás he tenido un problema con la calidad ni con los tiempos de entrega.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Dr. Ramón Herrera",
    role: "Médico General",
  },
  {
    text: "Contratamos el perfil corporativo para todo el equipo. Rápido, precio justo y los resultados llegaron digitales al momento. Sin papeleo.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Carlos Reyes",
    role: "Director de Recursos Humanos",
  },
  {
    text: "Necesitaba un estudio urgente y me atendieron el mismo día. Sin burocracia, sin esperas largas. Eso vale mucho cuando uno está preocupado.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Ana Lucía Martínez",
    role: "Paciente",
  },
  {
    text: "Los chicos de LAD siempre me explican qué significa cada resultado. Para alguien que no es médico, eso hace toda la diferencia.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Roberto Sánchez",
    role: "Paciente",
  },
  {
    text: "Pedí mis estudios prenatales y la atención fue muy profesional y delicada. Me sentí en buenas manos desde que entré.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Daniela Morales",
    role: "Paciente",
  },
  {
    text: "Mando a mis pacientes diabéticos mensualmente. LAD siempre entrega a tiempo con resultados confiables. Es parte de mi protocolo de seguimiento.",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
    name: "Dra. Patricia López",
    role: "Endocrinóloga",
  },
  {
    text: "La plataforma digital para ver resultados es excelente. No tengo que ir al laboratorio a recoger nada, todo llega directo a mi teléfono.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Fernando Jiménez",
    role: "Paciente",
  },
  {
    text: "El servicio a empresas es muy completo. Checamos a todo el personal cada semestre y LAD lo maneja sin complicaciones.",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
    name: "Sofía Vargas",
    role: "Gerente de RRHH",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-lad-gray-light overflow-hidden">
      <div className="container-lad">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Testimonios</p>
          <h2 className="heading-lg">Lo que dicen <span className="text-lad-red">nuestros pacientes</span></h2>
          <p className="mt-4 text-gray-500">Pacientes, médicos y empresas que confían en LAD cada día.</p>
        </motion.div>

        <div
          className="flex justify-center gap-5 overflow-hidden max-h-[700px]"
          style={{ maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)" }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={16} />
        </div>
      </div>
    </section>
  );
}
