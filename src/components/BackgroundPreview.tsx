declare module "*.JPG";

import { useEffect, useRef, useState } from "react";
import ProjectsCarousel from "./ProjectsCarousel";

// Agrega aquí las rutas de tus nuevas imágenes
const projectImages = [
  "C:/Users/Felipe Saavedra/Downloads/my-portfolio/src/assets/project1.jpg",
  "/images/project2.jpg",
  "/images/project3.jpg",
  "/images/project4.jpg",
];

export default function BackgroundPreview() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const POINTS = Math.max(6, Math.floor((w * h) / 14000));
    const MAX_DIST = 150;
    const SPEED = 0.3;

    const points = Array.from({ length: POINTS }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function mouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", resize);

    let rafId = 0;

    function tick() {
      rafId = requestAnimationFrame(tick);

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      for (const p of points) {
        p.x += p.vx + (mouse.current.x - w / 2) * 0.00002;
        p.y += p.vy + (mouse.current.y - h / 2) * 0.00002;

        if (p.x < 0) {
          p.vx *= -1;
          p.x = 0;
        }
        if (p.x > w) {
          p.vx *= -1;
          p.x = w;
        }
        if (p.y < 0) {
          p.vy *= -1;
          p.y = 0;
        }
        if (p.y > h) {
          p.vy *= -1;
          p.y = h;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.lineWidth = 1.1;

      for (const p of points) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d = Math.hypot(dx, dy);
        if (d < MAX_DIST) {
          ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, (1 - d / MAX_DIST) * 1.4)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, (1 - d / MAX_DIST) * 1.4)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full backdrop-blur-xl bg-[#000000] text-white">
      <style>{`
  #expScroll::-webkit-scrollbar { width: 16px; }
  #expScroll::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 20px; }
  #expScroll::-webkit-scrollbar-thumb { background: #2196f3 !important; border-radius: 20px; border: 3px solid #ffffff; }
  #expScroll::-webkit-scrollbar-thumb:hover { background: #1a6cd6; }
`}</style>

      <canvas ref={ref} className="absolute inset-0 w-full h-full" />

      {/* CABECERA + EXPERIENCIA */}
      <div className="absolute top-10 w-full text-center leading-tight left-24">
        <h1 className="text-3xl font-bold mb-3">Felipe Andrés Saavedra Garrido</h1>
        <p className="mb-2">
          Ingeniero En Proyectos Industriales / Coordinador BIM / Dibujante Técnico Industrial
        </p>
        <p className="mb-4">
          📱 +56 9 8184 9159 (WhatsApp) · 📧 saavedra.felipe92.fs@gmail.com
        </p>
      </div>

      {/* HABILIDADES - LADO IZQUIERDO */}
      <div className="absolute left-10 top-[145px] text-left w-1/3">
        <h2 className="text-xl font-semibold mb-3">Habilidades</h2>
        <div className="flex flex-col gap-1 text-xs sm:text-sm items-start w-fit">
        <div className="flex items-center gap-2">
        <img src="/assets/autocad.png" alt="AutoCAD"  className="w-7 h-7 rounded object-contain bg-white p-0.025" />
        AUTODESK AUTOCAD ⭐⭐⭐⭐⭐
          </div>
        <div className="flex items-center gap-2">
        <img src="/assets/Revit.png" alt="Revit"  className="w-7 h-7 rounded object-contain bg-white p-0.025" />
        AUTODESK REVIT (MEP, STRUCTURE, ARQ) ⭐⭐⭐⭐⭐
          </div>
        <div className="flex items-center gap-2">
        <img src="/assets/Project.png" alt="Project"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> PROJECT ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/navisworks.png" alt="navisworks"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> NAVISWORKS ⭐⭐⭐⭐⭐
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/dynamo.png" alt="dynamo"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> DYNAMO ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/grasshopper.png" alt="grasshopper"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> GRASSHOPPER ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Sketchup.png" alt="Sketchup"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> SKETCHUP ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Office.png" alt="Office"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> OFFICE ⭐⭐⭐⭐⭐
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/FARO_Logo.png" alt="FARO_Logo"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> SCENE ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Realworks.jpeg" alt="Realworks"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> TRIMBLE REALWORKS ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/lumion.png" alt="lumion"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> LUMION ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Potoshop.png" alt="Potoshop"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> PHOTOSHOP ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Visio.png" alt="Visio"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> VISIO ⭐⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Ilustrator.png" alt="Ilustrator"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> ADOBE ILLUSTRATOR ⭐⭐⭐☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/unreal engine.png" alt="unreal engine"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> UNREAL ENGINE ⭐⭐☆☆☆
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/Inventor.png" alt="Inventor"  className="w-7 h-7 rounded object-contain bg-white p-0.025" /> AUTODESK INVENTOR ⭐⭐⭐⭐☆
          </div>
        </div>
      </div>

      {/* EXPERIENCIA RECIENTE - LADO DERECHO */}
      <div className="absolute top-[145px] left-[45%] w-[62%] text-left leading-tight">
        <h2 className="text-xl font-semibold mb-2">Experiencia Reciente</h2>
        <div
          className="w-full max-w-3xl text-left overflow-hidden relative h-96"
          id="expCarousel"
        >
          <div className="transition-transform duration-700 ease-in-out h-full" id="expInner">
            <div id="expScroll" className="h-full overflow-y-auto p-4">
              {/* Alinea‑HPC 2025 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Modelador BIM — Alinea‑HPC, Freelance (05/2025 - 07/2025)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Hospital Provincia Cordillera</strong>
                  </li>
                  <li>Modelación HVAC (ductos, condensados).</li>
                  <li>Reconexión sistemas HVAC.</li>
                  <li>Redimensionamiento de ductos a ductos de fabricación (Dynamo).</li>
                  <li>Reconexionado a terminales de aire (Dynamo), entre otras.</li>
                </ul>
              </details>

              {/* Ingeniero de Aplicaciones */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Ingeniero de Aplicaciones — Microgeo/Soporte Autodesk (10/2024 - 04/2025)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    Implementación ACC (Módulo Docs, Design Collaboration, Model Coordination, Take-Off,
                    Build).
                  </li>
                  <li>Soporte de licenciamiento — Consola Autodesk.</li>
                  <li>
                    Flujos de trabajo Autodesk, webinars, presentaciones, visitas a clientes, entre otras.
                  </li>
                </ul>
              </details>

              {/* Alinea‑HPC 2024 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Modelador BIM — Alinea‑HPC, Freelance (08/2024 - 09/2024)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Hospital Provincia Cordillera</strong>
                  </li>
                  <li>Modelación HVAC (cañerías, ductos, condensados).</li>
                  <li>
                    Revisión de velocidades, worksets, planimetrías (tags), cambio de tipo de tuberías,
                    revisión de parámetros de instancia, entre otras.
                  </li>
                </ul>
              </details>

              {/* FLESAN ScanToBim */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Proyectista Senior — FLESAN (ScanToBim) (02/2024 - 06/2024)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Modelación nube de puntos.</li>
                  <li>Creación de familias (perfiles) (Dynamo).</li>
                  <li>Creación de láminas topografías (estanques).</li>
                  <li>Estandarización de planos.</li>
                </ul>
              </details>

              {/* Alinea‑Tega */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Modelador BIM — Alinea‑Tega, Freelance (11/2023 - 01/2024)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Modelación de especialidades MEP.</li>
                  <li>PCI – Aguas lluvias – Agua potable – Agua caliente – Alcantarillado.</li>
                </ul>
              </details>

              {/* Japp‑Ingenieros */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Proyectista — Japp-Ingenieros (02/2023 - 08/2023)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Proyectista líneas de transmisión media–alta tensión. Planimetrías.</li>
                  <li>Ubicación de estructuras, siluetas, fundaciones, conjunto y ortho-imágenes.</li>
                </ul>
              </details>

              {/* JEJ Ingeniería */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Coordinador BIM — JEJ Ingeniería (01/2022 - 08/2022)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Proyecto Ampliación Habitabilidad Nodo Hilton Hyatt.</li>
                  <li>Simulación 3D, revisión SGDOC y modificaciones de modelos.</li>
                  <li>Administración y coordinación de modelos 3D.</li>
                  <li>Extracción de cubicaciones y correcciones a planos.</li>
                  <li>Dynamo.</li>
                </ul>
              </details>

              {/* Vibrastudio Coordinación */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Coordinador BIM — Vibrastudio, Freelance (11/2021 - 12/2021)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Coordinación BIM para proyectos de especialidades.</li>
                  <li>Revisión de interferencias y gestión de modelos.</li>
                  <li>Actualización de planos y documentación.</li>
                  <li>Apoyo en modelación y control de calidad BIM.</li>
                </ul>
              </details>

              {/* Astaldi */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">Coordinador BIM — Astaldi (01/2021 - 09/2021)</summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Proyecto Hospital Base de Linares.</li>
                  <li>Modificaciones todas las especialidades.</li>
                  <li>Cubicación.</li>
                  <li>Creación de láminas de coordinación.</li>
                  <li>Extracción de láminas.</li>
                  <li>Dynamo (edición de parámetros).</li>
                </ul>
              </details>

              {/* Ingeniería DSS */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Modelador BIM — Ingeniería DSS (01/2021 - 09/2021)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Proyecto Catastro Ferroviario — confección de planos para red ferroviaria.</li>
                  <li>
                    Tramos: San Rosendo–Temuco, Mariquina–Osorno, Osorno–La Paloma, Paine–Talagante,
                    Chillán–San Rosendo, Alameda–Barrancas, Antilhue–Valdivia.
                  </li>
                </ul>
              </details>

              {/* Blue AEC Studio */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Coordinador BIM — Blue AEC Studio (11/2019 - 04/2020)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Proyecto Cafetal Edificio F</strong>
                  </li>
                  <li>Solución de interferencias.</li>
                  <li>
                    Corrección de modelación de proyectos (arquitectura, estructura, eléctrico, plomería,
                    incendio).
                  </li>
                  <li>Coordinación de especialidades.</li>
                  <li>Extracción de planos.</li>
                  <li>Solución de issues en BIMTRACK.</li>
                  <li>Corrección de circuitos eléctricos en Revit.</li>
                </ul>
              </details>

              {/* UNE Arquitectos */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Ingeniero en Proyectos Industriales — UNE Arquitectos (05/2019 - 05/2019)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Procesar información CAD.</li>
                  <li>Interpretar documentación y colaborar en diseño de arquitectura y construcción.</li>
                  <li>Participación en reuniones con clientes y especialistas.</li>
                  <li>Modelación BIM de arquitectura.</li>
                  <li>Programación en Revit orientada a cubicación de elementos.</li>
                  <li>Uso de BIM 360.</li>
                </ul>
              </details>

              {/* BIMStudio 2019 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Ingeniero en Proyectos Industriales — BIMStudio (03/2019 - 04/2019)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Coordinación BIM, Mall Plaza Norte</strong>
                  </li>
                  <li>Interferencias con Navisworks; soluciones constructivas.</li>
                  <li>Modificación de alcantarillado, agua potable, electricidad, PCI, entre otras.</li>
                  <li className="mt-3">
                    <strong>Coordinación BIM en obra — Proyecto Edificio Terralta</strong>
                  </li>
                  <li>
                    Instalación, realización de láminas, plantas de pasadas, actualización de proyecto, entre
                    otras.
                  </li>
                  <li className="mt-3">
                    <strong>Proyecto Edificio Zañartu</strong>
                  </li>
                  <li>
                    Instalación, realización de láminas, plantas de pasadas, actualización de proyecto, entre
                    otras.
                  </li>
                </ul>
              </details>

              {/* Revit Design Chile */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Modelador BIM / Freelance — Revit Design Chile (02/2019 - 03/2019)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Coordinación BIM Mall Plaza Norte</strong>
                  </li>
                  <li>Revisión de interferencias con Navisworks.</li>
                  <li>Soluciones constructivas.</li>
                  <li>Modificación de alcantarillado, agua potable, electricidad, PCI, entre otras.</li>
                </ul>
              </details>

              {/* DiFai Chile */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">Coordinador BIM — DiFai Chile (10/2018 - 01/2019)</summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Edificio Alto Alemania</strong>
                  </li>
                  <li>Desarrollo de especialidades (agua potable, alcantarillado, arquitectura, estructura).</li>
                  <li className="mt-3">
                    <strong>Mall Plaza Oeste (Ampliación cine)</strong>
                  </li>
                  <li>
                    Desarrollo de coordinación en obra, cubicaciones y seguimiento de avance en obra.
                  </li>
                </ul>
              </details>

              {/* BIMStudio 2018 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">Modelador BIM — BIMStudio (06/2018 - 09/2018)</summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Coordinación BIM (Mall Plaza Norte)</strong>
                  </li>
                  <li>Interferencias con Navisworks.</li>
                  <li>Soluciones constructivas.</li>
                  <li>Modificación de alcantarillado, agua potable, electricidad, PCI, entre otras.</li>
                </ul>
              </details>

              {/* Hunter Douglass */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">Proyectista — Hunter Douglass (02/2018 - 05/2018)</summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Coordinación BIM (Aeropuerto Nuevo Pudahuel)</strong>
                  </li>
                  <li>Desarrollo de cielos, revisión de interferencias con Navisworks.</li>
                  <li>Creación de familias paramétricas, fichas, láminas y edición de curtain system.</li>
                  <li>Revisión y modificaciones de proyectos.</li>
                </ul>
              </details>

              {/* BIM ARQZ */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Coordinador BIM / Modelador BIM — BIM ARQZ (07/2017 - 02/2018)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Proyecto Edificio Osorno:</strong> pavimentos, electricidad, especialidades.
                  </li>
                  <li>
                    <strong>Proyecto Estadio San Felipe:</strong> electricidad, láminas de interferencias,
                    Coordinador BIM.
                  </li>
                  <li>
                    <strong>Aeropuerto Arturo Merino Benítez:</strong> modificación red de incendios,
                    desarrollo de manifold, detección de interferencias en Navisworks.
                  </li>
                </ul>
              </details>

              {/* TEFRA */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Freelance / Modelador BIM — TEFRA (12/2016 - 03/2017)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Desarrollo de especialidades de proyectos inmobiliarios.</li>
                  <li>Modelos 3D de arquitectura y estructura.</li>
                </ul>
              </details>

              {/* POINTCLOUD */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Coordinador BIM / Modelador BIM — POINTCLOUD (05/2016 - 06/2016)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Plantas Mineras</strong>
                  </li>
                  <li>Chancador Pebbles, túneles, espesadores.</li>
                  <li>Planta Electro Winning y de acopio.</li>
                  <li>Planta de sustratos y piscinas de extracción por solventes.</li>
                </ul>
              </details>

              {/* RESTUDIO */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Coordinador BIM / Modelador BIM — RESTUDIO (04/2015 - 12/2015)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    Desarrollo de levantamientos 4D con nube de puntos. Modelos MEP, Structure y Architecture.
                  </li>
                  <li>Proyectos desarrollados en plataforma Autodesk Revit (BIM):</li>
                  <li>
                    <strong>Levantamiento Aeropuerto Arturo Merino Benítez:</strong> muros, estructuras,
                    equipamiento mecánico, redes eléctricas, entre otras.
                  </li>
                  <li>
                    <strong>Plantas Mineras:</strong> piping, estructuras, equipamiento mecánico, redes
                    eléctricas, entre otras.
                  </li>
                  <li>
                    Planta de secado flusolido, precipitador electroestático Planta Sewell, Planta Chagres
                    Gasómetro.
                  </li>
                </ul>
              </details>

              {/* HSS 2013–2015 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Dibujante Técnico Arquitectónico — HSS Arquitectos (11/2013 - 02/2015)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Desarrollo de modelos 3D BIM con Autodesk Revit, Autocad y Lumion.</li>
                  <li>Desarrollo de detalles de arquitectura en el área retail.</li>
                  <li>Organización de proyectos (carpeta de proyectos).
                  </li>
                  <li>Imágenes render y especificaciones técnicas.</li>
                  <li>Detalles de tabiquería y especificaciones de revestimientos (piso, muro y cielo).</li>
                  <li>Modificaciones de proyectos y propuestas.</li>
                </ul>
              </details>

              {/* Rheem */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Dibujante Mecánico — Rheem Chilena Ltda. (02/2013 - 05/2013)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Dibujos mecánicos.</li>
                  <li>Desarrollo de planos de estructuras.</li>
                  <li>Modelos 3D con Autodesk Inventor y AutoCAD Mecánica.</li>
                  <li>Diseño de elementos mecánicos.</li>
                  <li>Modificación de planos eléctricos (canalización).</li>
                </ul>
              </details>

              {/* HSS 2009–2013 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Dibujante Técnico Arquitectónico — HSS Arquitectos (03/2009 - 01/2013)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>Práctica profesional.</li>
                  <li>Desarrollo de modelos 3D con Autodesk Revit, Autocad, SketchUp y Lumion.</li>
                  <li>Isométricas.</li>
                  <li>Organización de proyectos (carpeta de proyectos).</li>
                  <li>Imágenes render.</li>
                  <li>Especificaciones técnicas.</li>
                  <li>Detalles de tabiquería y revestimientos (pisos, muros y cielo).</li>
                  <li>
                    <strong>Mall Plaza Egaña:</strong> 80.000 m² arrendables, 3 pisos en superficie y 4
                    subterráneos.
                  </li>
                  <li>
                    <strong>Mall Plaza Copiapó:</strong> 46.000 m².
                  </li>
                  <li>
                    <strong>Mall Aventura Plaza Cuzco:</strong> 39.000 m².
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* PROYECTOS DESTACADOS */}
      <div className="absolute top-[525px] left-10 right-10">
        <ProjectsCarousel />
      </div>


    </div>
  );
}
