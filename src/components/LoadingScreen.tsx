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
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-[spin_1.5s_linear_infinite]" />
          <div className="absolute inset-2 border-4 border-transparent border-r-blue-500 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-[pulse_1s_infinite]" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white text-4xl font-semibold tracking-wide">
            Cargando<span className="animate-[dots_1.5s_infinite]">...</span>
          </span>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-[dotPulse_1s_infinite]" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-[dotPulse_1s_infinite]" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-[dotPulse_1s_infinite]" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dots {
          0%, 20% { content: ''; }
          40% { content: '.'; }
          60% { content: '..'; }
          80%, 100% { content: '...'; }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}