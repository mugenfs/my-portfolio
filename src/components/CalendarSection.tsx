import { useState } from "react";

interface LinkedInPost {
  date: number;
  month: number;
  year: number;
  title: string;
  url: string;
  color?: string;
  description: string;
}

const LINKEDIN_PROFILE = "https://www.linkedin.com/in/felipe-saavedra-coordinadorbim-ingenieroproyectosindustriales/";

const linkedinPosts: LinkedInPost[] = [
  { date: 15, month: 11, year: 2025, title: "Place Diffusors - Dynamo", url: "https://www.linkedin.com/posts/activity-7396646840537919488-tT3g", color: "bg-blue-500", description: "Automatización de placement de difusores en modelos Revit usando scripts de Dynamo para proyectos HVAC." },
  { date: 20, month: 11, year: 2025, title: "Rutinas MEP - Conduit", url: "https://www.linkedin.com/posts/activity-7396248846084898817-V6Jm", color: "bg-green-500", description: "Desarrollo de rutinas para creación automática de conductos y sistemas MEP en proyectos de infraestructura." },
  { date: 18, month: 8, year: 2025, title: "Phasing 4D - Platform Service", url: "https://www.linkedin.com/posts/activity-7363377179629420545-s7vA", color: "bg-purple-500", description: "Implementación de fases 4D para simulación de construcción usando Autodesk Platform Service y ACC." },
  { date: 15, month: 8, year: 2025, title: "Grasshopper - FireFly - Sound", url: "https://www.linkedin.com/posts/activity-7363013583342903296-mTGG", color: "bg-pink-500", description: "Exploración de Grasshopper con FireFly para integración de sensores de sonido en proyectos de diseño paramétrico." },
  { date: 5, month: 7, year: 2025, title: "Create Rail Dynamo - Revit", url: "https://www.linkedin.com/posts/activity-7361481070191517697-T6FJ", color: "bg-yellow-500", description: "Script de Dynamo para generación automática de rieles en modelos de infraestructura ferroviaria." },
  { date: 28, month: 6, year: 2025, title: "Test PowerBI - PowerTools - Speckle", url: "https://www.linkedin.com/posts/activity-7356806868205223936-75YE", color: "bg-red-500", description: "Integración de PowerBI con Speckle para visualización de datos BIM y análisis de métricas de proyectos." },
  { date: 20, month: 6, year: 2025, title: "Automate Wall Openings Wood Framing", url: "https://www.linkedin.com/posts/activity-7355683609426423808--gEI", color: "bg-indigo-500", description: "Automatización de muros con estructura de madera y creación de vanos para proyectos residenciales." },
  { date: 12, month: 4, year: 2025, title: "IA Revit Training Advanced", url: "https://www.linkedin.com/posts/ugcPost-7328254639802400769-xKeM", color: "bg-cyan-500", description: "Capacitación avanzada en Revit con integración de inteligencia artificial para flujos de trabajo BIM." },
  { date: 25, month: 9, year: 2024, title: "Autodesk Platform Service - ACC", url: "https://www.linkedin.com/posts/activity-7264092886504194048-J745", color: "bg-orange-500", description: "Implementación de Autodesk Construction Cloud para gestión de datos y colaboración en proyectos." },
  { date: 10, month: 9, year: 2024, title: "Collision - Dynamo", url: "https://www.linkedin.com/posts/activity-7261847592697839616-N5vd", color: "bg-amber-500", description: "Script de detección de conflictos y colisiones usando Dynamo para coordinación BIM." },
  { date: 1, month: 8, year: 2024, title: "Analize Furniture Room - Generative Design", url: "https://www.linkedin.com/posts/activity-7254499262732898307-fAKD", color: "bg-lime-500", description: "Análisis de mobiliario y optimización de espacios usando generative design en Revit." },
  { date: 22, month: 7, year: 2024, title: "Dynanimator - Dynamo", url: "https://www.linkedin.com/posts/activity-7253214687394197504-O9n1", color: "bg-emerald-500", description: "Animación de modelos BIM usando Dynanimator para presentaciones y validación de diseño." },
  { date: 18, month: 7, year: 2024, title: "Steni - AddIns - Facade", url: "https://www.linkedin.com/posts/activity-7252693252649185282-sNj6", color: "bg-rose-500", description: "Desarrollo de AddIns para fachadas arquitectónicas con sistemas de paneles Steni." },
  { date: 8, month: 7, year: 2024, title: "Create Structural Framing From PointCloud", url: "https://www.linkedin.com/posts/activity-7250182340545511424-H8t0", color: "bg-fuchsia-500", description: "Generación de estructura metálica a partir de nubes de puntos/ScanToBIM." },
  { date: 1, month: 7, year: 2024, title: "#CreatePipeFromPointCloud #NewTools", url: "https://www.linkedin.com/posts/activity-7250166618658385921-hvC6", color: "bg-violet-500", description: "Creación de tuberías a partir de nubes de puntos y nuevas herramientas en Revit 2025." },
  { date: 22, month: 6, year: 2024, title: "#DesbloqueandoHerramientas", url: "https://www.linkedin.com/posts/activity-7249414621663563776-UICT", color: "bg-blue-600", description: "Sesión de formación continua sobre técnicas avanzadas de modelado en Revit." },
  { date: 12, month: 6, year: 2024, title: "#SeguimosAprendiendo", url: "https://www.linkedin.com/posts/activity-7246909833310781441-Q1jc", color: "bg-sky-500", description: "Sesión de formación continua sobre técnicas avanzadas de modelado en Revit." },
  { date: 8, month: 6, year: 2024, title: "#Ring #Grasshopper #Practice", url: "https://www.linkedin.com/posts/activity-7246330379157012480-5L9X", color: "bg-gray-500", description: "Práctica de diseño paramétrico con Grasshopper para creación de anillos y geometrías complejas." },
  { date: 22, month: 5, year: 2024, title: "#Automate #MechanicalEquipment #Dynamo", url: "https://www.linkedin.com/posts/activity-7240006265920204800-WnqT", color: "bg-slate-500", description: "Automatización de equipamiento mecánico usando scripts de Dynamo en proyectos Revit." },
  { date: 4, month: 2, year: 2024, title: "#RandomPanel #Facade #Practice", url: "https://www.linkedin.com/posts/activity-7225253712837967872-a4O2", color: "bg-stone-500", description: "Práctica de generación de paneles aleatorios para fachadas paramétricas con patrones personalizados." },
  { date: 2, month: 2, year: 2024, title: "#Random #Facade #Revit", url: "https://www.linkedin.com/posts/activity-7225239998684430337-a3Cl", color: "bg-neutral-500", description: "Generación de paneles aleatorios para fachadas paramétricas con patrones personalizados en Revit." },
  { date: 18, month: 6, year: 2023, title: "#AutomateFormworkPractice", url: "https://www.linkedin.com/posts/activity-7198084060605206528-7uqb", color: "bg-zinc-500", description: "Práctica de modelado de puentes usando Dynamo para automatización de geometrías." },
  { date: 5, month: 6, year: 2023, title: "#Dynamo #Formwork", url: "https://www.linkedin.com/posts/activity-7193794861601308674-NULu", color: "bg-sky-400", description: "Script de Dynamo para modelado de encofrados en estructuras de concreto." },
  { date: 14, month: 1, year: 2024, title: "Dynamo - Draw Pipe from AutoCAD", url: "https://www.linkedin.com/posts/activity-7133087466361643010-mmKU", color: "bg-blue-400", description: "Conversión de líneas de AutoCAD a tuberías en Revit usando scripts de Dynamo." },
  { date: 10, month: 1, year: 2024, title: "#Dynamo #Bridge", url: "https://www.linkedin.com/posts/activity-7132476431791439873-u_Hh", color: "bg-green-400", description: "Script de Dynamo para modelado de puentes en proyectos de infraestructura." },
  { date: 7, month: 1, year: 2024, title: "#VBA #InsertBlockForCoordinates #AutoCAD #MacrosExcel", url: "https://www.linkedin.com/posts/activity-7120118574437871616-2_on", color: "bg-purple-400", description: "Macro en VBA para inserción automática de bloques según coordenadas geográficas en AutoCAD." },
  { date: 28, month: 12, year: 2023, title: "#Blender #City #GIS", url: "https://www.linkedin.com/posts/activity-7119781484449656833-4r23", color: "bg-pink-400", description: "Desarrollo de cities y visualización GIS usando Blender para proyectos de infraestructura." },
  { date: 14, month: 12, year: 2023, title: "#PracticeDynamo #Routine #CADWalls #DWGTORVT", url: "https://www.linkedin.com/posts/activity-7118292510270976002-DlDn", color: "bg-red-400", description: "Colocación de familias basadas en muros host para elementos empotrados." },
  { date: 27, month: 11, year: 2023, title: "#Cubes #Rhyno", url: "https://www.linkedin.com/posts/activity-7116393723730481152-tUec", color: "bg-yellow-400", description: "Programación en Python para Grasshopper en entornos BIM." },
  { date: 12, month: 11, year: 2023, title: "Structural Framing", url: "https://www.linkedin.com/posts/activity-7112884902471053312-BOcg", color: "bg-indigo-400", description: "Exploración de modelado estructural en Rhino para proyectos de diseño complejo." },
  { date: 12, month: 10, year: 2023, title: "#Blender #City #GIS", url: "https://www.linkedin.com/posts/activity-7100928244517920769-tfy9", color: "bg-cyan-400", description: "Desarrollo de families personalizadas para elementos arquitectónicos y estructurales." },
  { date: 3, month: 10, year: 2023, title: "#PracticeDynamo #Routine #CADWalls #DWGTORVT", url: "https://www.linkedin.com/posts/activity-7099579550375784448-7OwB", color: "bg-teal-400", description: "Automatización de sistemas contra incendios y rociadores usando Dynamo." },
  { date: 1, month: 10, year: 2023, title: "#PracticeDynamo #Routine #CADWalls #DWGTORVT", url: "https://www.linkedin.com/posts/activity-7099495388633550848-PRMM", color: "bg-orange-400", description: "Colocación de familias basadas en muros host para elementos empotrados." },
  { date: 10, month: 9, year: 2023, title: "#phyton #dynamo #designscript", url: "https://www.linkedin.com/posts/activity-7096256377202823168-nUA2", color: "bg-amber-400", description: "Procesamiento y limpieza de nubes de puntos para modelado de condiciones existentes." },
  { date: 15, month: 5, year: 2023, title: "#phyton #dynamo #designscript", url: "https://www.linkedin.com/posts/activity-7071618154216448000-mzqd", color: "bg-lime-400", description: "Procesamiento y limpieza de nubes de puntos para modelado de condiciones existentes." },
  { date: 20, month: 11, year: 2022, title: "#Practices #Automate #Dynamo #TimeLiner #Naviswork", url: "https://www.linkedin.com/posts/activity-7039704787164000256-6jst", color: "bg-emerald-400", description: "Coordinación BIM multidisciplinary para proyectos de construcción industrial." },
  { date: 5, month: 6, year: 2022, title: "#Design #BridgeParametric #Helix", url: "https://www.linkedin.com/posts/activity-7003808946591277056-7-TP", color: "bg-rose-400", description: "Automatización de sistemas MEP en Revit para proyectos de gran escala." },
  { date: 18, month: 3, year: 2022, title: "#practice #monoceros", url: "https://www.linkedin.com/posts/activity-6993586142004592640-jXJc", color: "bg-fuchsia-400", description: "Colección de scripts de Dynamo para diferentes aplicaciones en proyectos BIM." },
];

export default function CalendarSection() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [view, setView] = useState<"month" | "year">("month");
  const [calendarMinimized, setCalendarMinimized] = useState(false);
  
  const posts = linkedinPosts;
  const [selectedPost, setSelectedPost] = useState<LinkedInPost | null>(posts.length > 0 ? posts[0] : null);

  const currentDay = today.getDate();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const minDate = new Date(2022, 0, 1);
  const maxDate = new Date();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getPostsForDay = (day: number) => {
    return posts.filter(post => 
      post.date === day && 
      post.month - 1 === currentMonth && 
      post.year === currentYear
    );
  };

  const getPostsForMonth = (month: number, year: number) => {
    return posts.filter(post => 
      post.month - 1 === month && 
      post.year === year
    );
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const goToNextYear = () => {
    if (currentYear < maxDate.getFullYear()) {
      setCurrentYear(currentYear + 1);
    }
  };

  const selectMonth = (month: number) => {
    setCurrentMonth(month);
    setView("month");
  };

  const getMonthGrid = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonthCount = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);
    const empty = Array.from({ length: firstDay }, (_, i) => 0);
    return [...empty, ...days];
  };

  const shortMonthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const canGoPrevious = new Date(currentYear, currentMonth - 1, 1) >= minDate;
  const canGoNext = new Date(currentYear, currentMonth + 1, 1) <= maxDate;

  const getMonthIntensityColor = (count: number) => {
    if (count === 0) return "bg-white/5 hover:bg-white/20";
    if (count <= 2) return "bg-blue-900/60 hover:bg-blue-800/60";
    if (count <= 4) return "bg-blue-700/70 hover:bg-blue-600/70";
    if (count <= 6) return "bg-blue-500/80 hover:bg-blue-400/80";
    return "bg-blue-400 hover:bg-blue-300";
  };

  const getDayIntensityColor = (count: number) => {
    if (count === 0) return "bg-white/5 hover:bg-white/20";
    if (count === 1) return "bg-emerald-600/70 ring-2 ring-emerald-400 cursor-pointer hover:bg-emerald-500/70";
    if (count === 2) return "bg-amber-600/70 ring-2 ring-amber-400 cursor-pointer hover:bg-amber-500/70";
    if (count === 3) return "bg-orange-600/70 ring-2 ring-orange-400 cursor-pointer hover:bg-orange-500/70";
    return "bg-red-600/70 ring-2 ring-red-400 cursor-pointer hover:bg-red-500/70";
  };

  return (
    <div className="flex gap-6 w-full">
      <div className="w-[420px] bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCalendarMinimized(!calendarMinimized)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            title={calendarMinimized ? "Maximizar calendario" : "Minimizar calendario"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {calendarMinimized ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              )}
            </svg>
          </button>
          {!calendarMinimized && (
            <button
              onClick={() => setView(view === "month" ? "year" : "month")}
              className="text-sm hover:bg-white/20 px-3 py-1 rounded transition-colors cursor-pointer"
            >
              {view === "month" ? "Ver año" : "Ver mes"}
            </button>
          )}
        </div>

        {calendarMinimized ? (
          <div className="grid grid-cols-4 gap-2">
            {monthNames.map((month, index) => {
              const monthPosts = getPostsForMonth(index, currentYear);
              const isCurrent = isCurrentMonth && index === currentMonth;
              return (
                <button
                  key={month}
                  onClick={() => { setCurrentMonth(index); setView("month"); setCalendarMinimized(false); }}
                  className={`p-3 rounded-lg transition-all duration-200 cursor-pointer ${getMonthIntensityColor(monthPosts.length)} ${
                    isCurrentMonth && index === currentMonth ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  <div className="font-semibold">{shortMonthNames[index]}</div>
                  <div className="text-xs font-bold mt-1">{monthPosts.length}</div>
                </button>
              );
            })}
          </div>
        ) : view === "month" ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                disabled={!canGoPrevious}
                className={`p-2 rounded-lg transition-colors ${
                  canGoPrevious
                    ? "hover:bg-white/20 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
                title="Mes anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("year")}
                  className="text-xl font-bold hover:bg-white/20 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  {monthNames[currentMonth]}
                </button>
                <button
                  onClick={() => setView("year")}
                  className="text-xl font-bold hover:bg-white/20 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  {currentYear}
                </button>
              </div>

              <button
                onClick={goToNextMonth}
                disabled={!canGoNext}
                className={`p-2 rounded-lg transition-colors ${
                  canGoNext
                    ? "hover:bg-white/20 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
                title="Mes siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between mb-2 text-sm">
              <button
                onClick={goToPreviousYear}
                className="px-2 py-1 rounded hover:bg-white/20 cursor-pointer"
              >
                &lt; {currentYear - 1}
              </button>
              <span className="font-semibold">{currentYear}</span>
              <button
                onClick={goToNextYear}
                disabled={currentYear >= maxDate.getFullYear()}
                className={`px-2 py-1 rounded hover:bg-white/20 cursor-pointer ${
                  currentYear >= maxDate.getFullYear() ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                {currentYear + 1} &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-white/70"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {daysArray.map((day) => {
                const dayPosts = getPostsForDay(day);
                const isToday = isCurrentMonth && day === currentDay;
                const intensityClass = getDayIntensityColor(dayPosts.length);

                return (
                  <div
                    key={day}
                    onClick={() => {
                      if (dayPosts.length > 0) {
                        setSelectedPost(dayPosts[0]);
                        setCurrentMonth(dayPosts[0].month - 1);
                        setCurrentYear(dayPosts[0].year);
                      }
                    }}
                    className={`
                      aspect-square flex flex-col items-center justify-center
                      rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${
                        selectedPost && day === selectedPost.date && currentMonth === selectedPost.month - 1 && currentYear === selectedPost.year
                          ? "bg-yellow-500 text-white shadow-lg scale-110 ring-4 ring-yellow-300"
                          : isToday 
                          ? "bg-blue-500 text-white shadow-lg scale-110" 
                          : intensityClass
                      }
                      relative group
                    `}
                  >
                    <span className="z-10">{day}</span>
                    {dayPosts.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {dayPosts.slice(0, 3).map((post, idx) => (
                          <div key={idx} className={`w-1.5 h-1.5 rounded-full ${post.color}`} />
                        ))}
                      </div>
                    )}
                    {dayPosts.length > 1 && (
                      <span className="absolute bottom-0.5 text-[10px] text-white/70">{dayPosts.length}</span>
                    )}
                    {dayPosts.length > 0 && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 max-w-48 text-center">
                        {dayPosts[0].title}
                        {dayPosts.length > 1 && ` (+${dayPosts.length - 1} más)`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 bg-blue-600/30 rounded-lg p-3 text-center">
              <span className="text-white font-semibold">
                Publicaciones en {monthNames[currentMonth]}: {getPostsForMonth(currentMonth, currentYear).length}
              </span>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {monthNames.map((month, index) => {
              const monthPosts = getPostsForMonth(index, currentYear);
              const isCurrent = isCurrentMonth && index === currentMonth;

              return (
                <button
                  key={month}
                  onClick={() => selectMonth(index)}
                  className={`
                    rounded-lg p-4 transition-all duration-200 cursor-pointer ${getMonthIntensityColor(monthPosts.length)}
                    ${isCurrentMonth && index === currentMonth ? "ring-2 ring-blue-400" : ""}
                  `}
                >
                  <div className="text-base font-semibold mb-1">{shortMonthNames[index]}</div>
                  <span className="text-sm font-bold">{monthPosts.length}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/20">
          <h3 className="text-sm font-semibold mb-3 text-white/80">
            Todas las publicaciones ({posts.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {posts.map((post, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedPost(post);
                  setCurrentMonth(post.month - 1);
                  setCurrentYear(post.year);
                }}
                className={`flex items-center gap-3 text-sm rounded-lg p-2 cursor-pointer transition-all duration-200 ${
                  selectedPost?.url === post.url 
                    ? "bg-blue-500/50 ring-2 ring-blue-300 shadow-lg scale-[1.02]" 
                    : "bg-white/5 hover:bg-white/15 hover:scale-[1.01]"
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${post.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white/90 truncate">{post.title}</div>
                  <div className="text-white/50 text-xs">
                    {post.date}/{post.month}/{post.year}
                  </div>
                </div>
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white flex flex-col min-w-0 border-2 border-blue-400/50">
        {selectedPost && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full ${selectedPost.color} ring-2 ring-white/50`} />
                <div>
                  <h3 className="font-bold text-xl leading-tight">{selectedPost.title}</h3>
                  <p className="text-white/60">
                    {selectedPost.date}/{selectedPost.month}/{selectedPost.year}
                  </p>
                </div>
              </div>
              <a
                href={selectedPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play Video
              </a>
            </div>
            
            <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden min-h-[450px] flex items-center justify-center">
              <a
                href={selectedPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-16 h-16 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-white/70 text-lg">Click para ver el video en LinkedIn</p>
              </a>
            </div>
            
            <div className="mt-4 bg-white/5 rounded-lg p-2">
              <h4 className="text-sm font-semibold text-white/70 mb-2">Descripción</h4>
              <p className="text-white/90 text-sm leading-relaxed">
                {selectedPost.description}
              </p>
            </div>
            
            <div className="mt-4 space-y-2">
              <a
                href={selectedPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Ver Video en LinkedIn
              </a>
              <a
                href={LINKEDIN_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Ver Perfil LinkedIn
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
