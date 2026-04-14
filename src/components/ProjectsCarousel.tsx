import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface ProjectsCarouselProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

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
import proyecto22 from "../assets/proyecto22.jpeg";
import proyecto23 from "../assets/proyecto23.jpeg";
import proyecto24 from "../assets/proyecto24.jpeg";
import proyecto25 from "../assets/proyecto25.jpeg";
import proyecto26 from "../assets/proyecto26.jpeg";
import proyecto27 from "../assets/proyecto27.jpeg";
import proyecto28 from "../assets/proyecto28.jpeg";
import proyecto29 from "../assets/proyecto29.jpeg";
import proyecto30 from "../assets/proyecto30.png";
import PointCloud from "../assets/PointCloud.jpg";


export default function ProjectsCarousel({ isOpen = true, onToggle }: ProjectsCarouselProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
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
      desc: "ScanToBIM"
      
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
                      {
      img: proyecto30,
      title: "Hospital Cordillera",
      desc: "Climatización, Diseño y modificación de ductos rectangulares/circulares"
    },
    {
      img: PointCloud,
      title: "Ingeniería Inversa",
      desc: "ScanToBIM - Nube de Puntos"
    },
    {
      img: proyecto22,
      title: "Edificios Prefabricados",
      desc: "Prefabricación modular"
    },
    {
      img: proyecto23,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 1"
    },
    {
      img: proyecto24,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 2"
    },
    {
      img: proyecto25,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 3"
    },
    {
      img: proyecto26,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 4"
    },
    {      
      img: proyecto28,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 5"

    },
    {      
      img: proyecto27,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 6"

    },
    {
      img: proyecto29,
      title: "Edificios Prefabricados",
      desc: "Area de servicio general y Atención de Emergencias 1_Modulo 7"
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
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white">
        <button onClick={onToggle} className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors">
          <h2 id="Proyectos Destacados" className="text-2xl font-bold text-left" style={{ scrollMarginTop: '80px' }}>Proyectos Destacados</h2>
          <svg className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="min-w-full h-56 bg-white/10 rounded-xl shadow-lg overflow-hidden relative group cursor-pointer flex-shrink-0"
                  onClick={() => {
                    setModalImage(p.img);
                    setModalIndex(i);
                    setZoom(1);
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="text-sm opacity-90">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            onClick={() => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            onClick={() => setCurrentIndex((currentIndex + 1) % projects.length)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${i === currentIndex ? "bg-white" : "bg-white/30"}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {modalImage && modalIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm px-4"
          onClick={() => {
            setModalImage(null);
            setModalIndex(null);
            setZoom(1);
          }}
        >
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/35 rounded-full p-3 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              const prev = (modalIndex - 1 + projects.length) % projects.length;
              setModalIndex(prev);
              setModalImage(projects[prev].img);
              setZoom(1);
            }}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="max-w-[92%] max-h-[90%] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.preventDefault();
              const delta = e.deltaY > 0 ? -0.1 : 0.1;
              setZoom((prev) => Math.min(3, Math.max(1, Number((prev + delta).toFixed(2)))));
            }}
          >
            <div className="flex items-center gap-2 bg-black/45 rounded-xl px-3 py-2">
              <button
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                onClick={() => setZoom((prev) => Math.min(3, Number((prev + 0.2).toFixed(2))))}
              >
                +
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                onClick={() => setZoom((prev) => Math.max(1, Number((prev - 0.2).toFixed(2))))}
              >
                -
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm"
                onClick={() => setZoom(1)}
              >
                Reset
              </button>
              <span className="text-sm text-white/90">{Math.round(zoom * 100)}%</span>
            </div>

            <div className="overflow-auto max-h-[70vh] max-w-[85vw] rounded-xl flex items-center justify-center">
              <img
                src={modalImage}
                alt={projects[modalIndex].title}
                className="max-w-[85vw] max-h-[70vh] w-auto h-auto object-contain transition-transform duration-200 origin-center"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>

            <div className="bg-black/45 rounded-xl px-4 py-3 text-center">
              <h3 className="text-lg font-bold">{projects[modalIndex].title}</h3>
              <p className="text-sm text-white/85">{projects[modalIndex].desc}</p>
            </div>
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/35 rounded-full p-3 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              const next = (modalIndex + 1) % projects.length;
              setModalIndex(next);
              setModalImage(projects[next].img);
              setZoom(1);
            }}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
