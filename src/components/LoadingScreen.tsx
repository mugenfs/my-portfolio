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
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-[spin_1.5s_linear_infinite]" />
          <div className="absolute inset-2 border-4 border-transparent border-r-blue-500 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
          <div className="absolute inset-4 border-4 border-transparent border-t-cyan-300 rounded-full animate-[spin_1s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-[pulse_1s_infinite] shadow-[0_0_15px_cyan]" />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-medium">Building Your Experience</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>

        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-8 bg-cyan-400/30 rounded-sm animate-[loadingBar_1.4s_ease-in-out_infinite]"
              style={{
                animationDelay: `${i * 0.2}s`,
                height: `${20 + Math.random() * 20}px`
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-white/40 text-sm font-mono">BIM</span>
          <span className="text-white/60 text-sm font-mono animate-[blink_1s_infinite]">_</span>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-[dotPulse_1s_infinite]" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-[dotPulse_1s_infinite]" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-[dotPulse_1s_infinite]" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loadingBar {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}