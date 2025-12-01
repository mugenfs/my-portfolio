import { useState, useEffect } from "react";

import proyecto1 from "../assets/proyecto1.JPG";
import proyecto2 from "../assets/proyecto2.JPG";
import proyecto3 from "../assets/proyecto3.JPG";
import proyecto4 from "../assets/proyecto4.JPG";
import proyecto5 from "../assets/proyecto5.JPG";
import proyecto6 from "../assets/proyecto6.JPG";
import proyecto7 from "../assets/proyecto7.JPG";
import proyecto8 from "../assets/proyecto8.JPG";
import proyecto9 from "../assets/proyecto9.JPG";
import proyecto10 from "../assets/proyecto10.JPG";
import proyecto11 from "../assets/proyecto11.JPG";
import proyecto12 from "../assets/proyecto12.JPG";
import proyecto13 from "../assets/proyecto13.JPG";
import proyecto14 from "../assets/proyecto14.JPG";
import proyecto15 from "../assets/proyecto15.JPG";
import proyecto16 from "../assets/proyecto16.JPG";
import proyecto17 from "../assets/proyecto17.JPG";
import proyecto18 from "../assets/proyecto18.JPG";
import proyecto19 from "../assets/proyecto19.JPG";
import proyecto20 from "../assets/proyecto20.JPG";
import proyecto21 from "../assets/proyecto21.JPG";


export default function ProjectsCarousel() {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      img: proyecto1,
      title: "Propuesta Tottus Quilicura",
      desc: "Imágenes  Render."
    },
    {
      img: proyecto2,
      title: "Propuesta Comas Collique",
      desc: "Modelos  3d  BIM"
    },
    {
      img: proyecto3,
      title: "Propuesta Comas Collique",
      desc: "Detalles  de arquitectura en Retail"
    },
    {
      img: proyecto4,
      title: "Propuesta Mall Colombia",
      desc: "Propuestas Cabidas-Retail"
      
    },
     {
      img: proyecto5,
      title: "Propuesta Fachada Mall La Serena",
      desc: "Detalles Constructivos-Fachadas"
      
    },
         {
      img: proyecto6,
      title: "Tottus Walker Martinez - Frutas y Verduras",
      desc: "Supermercados-Organización  de  Proyectos"
      
    },
             {
      img: proyecto7,
      title: "Tottus Walker Martinez - Venta Asistida",
      desc: "Supermercados-Especiﬁcaciones  técnicas"
      
    },
             {
      img: proyecto8,
      title: "Tottus Walker Martinez - Isometrica",
      desc: "Isometricas"
      
    },
                 {
      img: proyecto9,
      title: "Fachada Acceso Alameda Mall Asia Pacifico",
      desc: "Modificación de Proyectos"
      
    },
                 {
      img: proyecto10,
      title: "Metro de Santiago",
      desc: "Desarrollo de arquitectura"
      
    },
                 {
      img: proyecto11,
      title: "Tuneles",
      desc: "Ingenieria Inversa"
      
    },
                 {
      img: proyecto12,
      title: "Planta Electro Winning y Acopio-Planta Sustrato-Planta Extraccion Por Solventes",
      desc: "Scan To BIM"
      
    },
                     {
      img: proyecto13,
      title: "Espesadores",
      desc: "Modelos 3d-Nube de Puntos"
      
    },
                      {
      img: proyecto14,
      title: "Espesadores",
      desc: "Ingeniería de proyectos / Gestión BIM / Optimización."
      
    },
                      {
      img: proyecto15,
      title: "Aeropuerto Artureo Merino Benites/Red de Incendios",
      desc: "Modelos 3d-Manifold-Documentación"
      
    },
                      {
      img: proyecto16,
      title: "Proyectos Inmobiliarios",
      desc: "Estructura"
      
    },
                      {
      img: proyecto17,
      title: "Aeropuerto Nuevo Pudahuel/Espigon C",
      desc: "Coordinación de Cielos y soportación secundaria"
      
    },
                      {
      img: proyecto18,
      title: "Cafetal F/Costa Rica",
      desc: "Revisión de modelos 3d-Documentación y Coordinación- As-built"
      
    },
                      {
      img: proyecto19,
      title: "HBLI/Hospital Base de Linares",
      desc: "Revisión Climatización y Coordinación"
      
    },
                      {
      img: proyecto20,
      title: "Clinica Alemana Chicureo",
      desc: "Modelo de Estructuras"
      
    },
                      {
      img: proyecto21,
      title: "Proyecto Habilitabilidad/Nodo Hilton-Hyatt",
      desc: "Revisión de Proyectos,Ingenieria,Coordinación BIM"
      
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <>
      {/* TÍTULO */}
<div className="w-full py-20 flex justify-end">
  <div className="relative w-full max-w-2xl mr-50 ml-50">
    {/* ...carrusel... */}
    {/* El resto del código permanece igual */}
  </div>
  <h2 className="text-2xl font-bold mb-0 text-left">Proyectos Destacados</h2>
        {/* CARRUSEL */}
         <div className="relative w-full">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="
                    min-w-full h-32 bg-white/10 rounded-xl shadow-lg
                    overflow-hidden relative group cursor-pointer
                    flex-shrink-0
                  "
                  onClick={() => setModalImage(p.img)}
                >
                  {/* Imagen */}
                  <img
                    src={p.img}
                    alt={p.title}
                    className="
                      w-full h-full object-contain
                      transition-transform duration-500
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay con info */}
                  <div
                    className="
                      absolute inset-0 bg-black/50
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      flex flex-col justify-end p-4
                    "
                  >
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="text-sm opacity-90">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-4 space-x-2">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>

          {/* Botones de navegación */}
          <button
            className="absolute left-8 top-1/4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            onClick={() => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-8 top-1/4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            onClick={() => setCurrentIndex((currentIndex + 1) % projects.length)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* MODAL FULLSCREEN */}
      {modalImage && (
        <div
          className="
            fixed inset-0 bg-black/80 z-50 
            flex items-center justify-center
            backdrop-blur-sm
          "
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            className="max-w-[90%] max-h-[85%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
