import logo from "../assets/logo.png";

interface LoadingScreenProps {
  fadeOut?: boolean;
}

export default function LoadingScreen({ fadeOut = false }: LoadingScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-[9999] text-white transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0b1220] to-[#0b1220]" />

      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 object-contain drop-shadow-[0_0_22px_rgba(255,255,255,0.3)] animate-[logoPulse_1.6s_ease-in-out_infinite]"
        />

        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5">
          <span className="text-white/35 text-5xl sm:text-7xl leading-none animate-[blink_1s_infinite]">{`<`}</span>
          <span className="text-white text-5xl sm:text-7xl italic font-semibold tracking-wide [text-shadow:0_4px_18px_rgba(255,255,255,0.18)]">
            Cargando
            <span className="animate-[dots_1.5s_infinite]">...</span>
          </span>
          <span className="text-white/35 text-5xl sm:text-7xl leading-none animate-[blink_1s_infinite]">{`/>`}</span>
        </div>

        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white/70 rounded-full animate-[bounce_1s_infinite]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-140%); }
          100% { transform: translateX(360%); }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.7; }
          40% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
