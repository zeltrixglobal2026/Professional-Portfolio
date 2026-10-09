export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center
      bg-[#0f0a1e]/50 backdrop-blur-2xl">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              style={{
                animation: `dotBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-white/70">
          Loading
        </p>
      </div>
      <style>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%      { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}