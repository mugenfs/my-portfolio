import { useEffect, useRef, useState } from "react";
import ProjectsCarousel from "./ProjectsCarousel";
import CalendarSection from "./CalendarSection";


export default function BackgroundPreview() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [openSections, setOpenSections] = useState({
    about: true,
    skills: true,
    projects: true,
    experience: true,
    blogs: true,
    contact: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const POINTS = Math.max(15, Math.floor((w * h) / 10000));
    const MAX_DIST = 180;
    const SPEED = 0.8;

    const points = Array.from({ length: POINTS }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      size: Math.random() * 2 + 1,
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

      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);

      for (const p of points) {
        p.x += p.vx + (mouse.current.x - w / 2) * 0.00005;
        p.y += p.vy + (mouse.current.y - h / 2) * 0.00005;

        if (p.x < 0) { p.vx *= -1; p.x = 0; }
        if (p.x > w) { p.vx *= -1; p.x = w; }
        if (p.y < 0) { p.vy *= -1; p.y = 0; }
        if (p.y > h) { p.vy *= -1; p.y = h; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            ctx.strokeStyle = `rgba(100, 150, 255, ${Math.max(0, (1 - d / MAX_DIST) * 0.5)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, (1 - d / 120) * 0.6)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.stroke();
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

      <div className="relative z-10 h-screen overflow-y-auto px-4 sm:px-8 lg:px-12 pt-24 pb-8">
        <nav className="fixed top-0 left-0 right-0 z-20 bg-[#0b1220]/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-xl">
            <a href="#about-professional" className="hover:text-blue-300 transition-colors">Sobre Mí</a>
            <a href="#skills" className="hover:text-blue-300 transition-colors">Habilidades</a>
            <a href="#Proyectos Destacados" className="hover:text-blue-300 transition-colors">Proyectos Destacados</a>
            <a href="#work-experiences" className="hover:text-blue-300 transition-colors">Experiencia</a>
            <a href="#blogs" className="hover:text-blue-300 transition-colors">Blogs</a>
            <a href="#contact-end" className="px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors">Datos de Contacto</a>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto space-y-8">
          <section id="about-professional" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg" style={{ scrollMarginTop: '80px' }}>
            <button onClick={() => toggleSection('about')} className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors">
              <h1 className="text-3xl font-bold">Felipe Andrés Saavedra Garrido</h1>
              <svg className={`w-6 h-6 transition-transform ${openSections.about ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.about ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border border-white/30 shadow-md flex-shrink-0">
                  <img src="/assets/unnamed (1).jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left flex items-center">
                  <div>
                    <p className="mb-2">
                      Ingeniero En Proyectos Industriales | Coordinador BIM | Dibujante Técnico Industrial
                    </p>
                    <p className="mb-2 text-sm leading-relaxed text-white/90 max-w-4xl">
                      Ingeniero en Proyectos Industriales titulado el año 2015, con aptitudes para trabajar en equipos de trabajo, persona responsable, perseverante y con buena disposición al aprendizaje, comprometido con dar soluciones rápidas y concisas para el buen desarrollo de los proyectos. Disposición inmediata, gran manejo de software de diseño.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-left" style={{ scrollMarginTop: '80px' }}>
            <button onClick={() => toggleSection('skills')} className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors">
              <h2 className="text-2xl font-bold">Habilidades</h2>
              <svg className={`w-6 h-6 transition-transform ${openSections.skills ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
<div className={`overflow-hidden transition-all duration-300 ${openSections.skills ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-3 text-sm">
                <div className="flex items-center gap-2"><img src="/assets/autocad.png" alt="AutoCAD" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> AUTODESK AUTOCAD ⭐⭐⭐⭐⭐</div>
              <div className="flex items-center gap-2"><img src="/assets/Revit.png" alt="Revit" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> AUTODESK REVIT (MEP, STRUCTURE, ARQ) ⭐⭐⭐⭐⭐</div>
              <div className="flex items-center gap-2"><img src="/assets/Project.png" alt="Project" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> PROJECT ⭐⭐⭐☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/navisworks.png" alt="Navisworks" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> NAVISWORKS ⭐⭐⭐⭐☆</div>
              <div className="flex items-center gap-2"><img src="/assets/dynamo.png" alt="Dynamo" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> DYNAMO ⭐⭐⭐⭐☆</div>
              <div className="flex items-center gap-2"><img src="/assets/grasshopper.png" alt="Grasshopper" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> GRASSHOPPER ⭐⭐⭐☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Sketchup.png" alt="SketchUp" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> SKETCHUP ⭐⭐⭐☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Office.png" alt="Office" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> OFFICE ⭐⭐⭐⭐⭐</div>
              <div className="flex items-center gap-2"><img src="/assets/FARO_Logo.png" alt="FARO_Logo" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> SCENE ⭐⭐☆☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Realworks.jpeg" alt="Realworks" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> TRIMBLE REALWORKS ⭐⭐☆☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/lumion.png" alt="Lumion" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> LUMION ⭐⭐⭐☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Potoshop.png" alt="Photoshop" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> PHOTOSHOP ⭐⭐⭐☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Visio.png" alt="Visio" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> VISIO ⭐⭐☆☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Ilustrator.png" alt="Illustrator" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> ADOBE ILLUSTRATOR ⭐⭐☆☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/unreal engine.png" alt="Unreal Engine" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> UNREAL ENGINE ⭐⭐☆☆☆</div>
              <div className="flex items-center gap-2"><img src="/assets/Inventor.png" alt="Inventor" className="w-7 h-7 rounded object-contain bg-white p-0.5" /> AUTODESK INVENTOR ⭐⭐⭐☆☆</div>
              </div>
            </div>
          </section>

          <ProjectsCarousel isOpen={openSections.projects} onToggle={() => toggleSection('projects')} />

          <section id="work-experiences" className="w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-left leading-tight" style={{ scrollMarginTop: '80px' }}>
            <button onClick={() => toggleSection('experience')} className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors">
              <h2 className="text-2xl font-bold">Experiencia</h2>
              <svg className={`w-6 h-6 transition-transform ${openSections.experience ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.experience ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="w-full max-w-[980px] mx-auto text-left overflow-hidden relative h-[360px]" id="expCarousel">
              <div className="transition-transform duration-700 ease-in-out h-full" id="expInner">
                <div id="expScroll" className="h-full overflow-y-auto p-5 scroll-pr-00">
              {/* Alinea‑HPC 2025 */}
              <details className="mb-4 bg-white/40 backdrop-blur-md rounded-xl p-4 shadow cursor-pointer text-white">
                <summary className="font-semibold text-lg">
                  Analista Oficina Técnica — Sacyr (05/2025 - 04/2026)
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm leading-snug">
                  <li>
                    <strong>Hospital Provincia Cordillera</strong>
                  </li>
                  <li>Modelación HVAC (ductos, condensados).</li>
                  <li>Reconexión sistemas HVAC.</li>
                  <li>Redimensionamiento de ductos a ductos de fabricación (Dynamo).</li>
                  <li>Reconexionado a terminales de aire (Dynamo), entre otras.</li>
                  <li>
                    <strong>Edificios Prefabricados</strong>
                  </li>
                  <li>Prefabricación modular|Area de servicio general y Atención de Emergencias</li>
                  <li>Coordinación LOD 400–500</li>
                  <li>Modelos para fabricación</li>
                  <li>Automatización de producción (Dynamo)</li>
                  <li>Integración diseño–obra</li>
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
          </section>

      <section id="blogs" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg" style={{ scrollMarginTop: '80px' }}>
            <button onClick={() => toggleSection('blogs')} className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors">
              <h2 className="text-2xl font-bold">Blogs</h2>
              <svg className={`w-6 h-6 transition-transform ${openSections.blogs ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.blogs ? 'max-h-[5000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <CalendarSection />
            </div>
          </section>

          <section id="contact-end" className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-center" style={{ scrollMarginTop: '80px' }}>
            <button onClick={() => toggleSection('contact')} className="w-full flex items-center justify-between hover:bg-white/10 rounded-lg p-2 -ml-2 transition-colors mb-3">
              <h2 className="text-2xl font-bold">Datos de Contacto</h2>
              <svg className={`w-6 h-6 transition-transform ${openSections.contact ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openSections.contact ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <a href="https://www.google.com/maps/search/Pudeto+6631,+La+Florida,+Santiago" target="_blank" rel="noopener noreferrer" className="mb-1 block hover:text-yellow-300 transition-colors">📍 Pudeto 6631, La Florida, Santiago</a>
              <a href="https://wa.me/56981849159" target="_blank" rel="noopener noreferrer" className="mb-1 block hover:text-yellow-300 transition-colors">📱 +56 9 8184 9159 (WhatsApp)</a>
              <a href="mailto:saavedra.felipe92.fs@gmail.com" className="block hover:text-yellow-300 transition-colors">📧 saavedra.felipe92.fs@gmail.com</a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
