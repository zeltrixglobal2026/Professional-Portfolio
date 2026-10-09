"use client";

export default function SectionDivider({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-px z-50 ${className}`}
      aria-hidden="true"
    >
      {/* ===== LINES + LIGHTS (clipped to screen) ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Base faint line */}
        <div className="absolute inset-0
          bg-gradient-to-r from-transparent via-purple-main/40 to-transparent" />

        {/* Bright line */}
        <div className="absolute inset-0
          bg-gradient-to-r from-transparent via-purple-light/70 to-transparent" />

        {/* ===== Light 1 — enters from LEFT edge ===== */}
        <div
          className="absolute top-0 h-px w-32
            bg-gradient-to-r from-transparent via-white to-transparent
            shadow-[0_0_10px_#a78bfa,0_0_20px_#7c3aed]"
          style={{
            animation: "shineLTR 5s ease-in-out infinite",
          }}
        />

        {/* ===== Light 2 — enters from RIGHT edge ===== */}
        <div
          className="absolute top-0 h-px w-24
            bg-gradient-to-l from-transparent via-white to-transparent
            shadow-[0_0_10px_#ec4899,0_0_20px_#ec4899]"
          style={{
            animation: "shineRTL 5s ease-in-out infinite",
          }}
        />
      </div>

      {/* ===== STAR (not clipped — full glow visible) ===== */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-[60] flex items-center justify-center">

        {/* Glow */}
        <span className="absolute w-10 h-10 rounded-full
          bg-purple-light/50 blur-lg
          animate-[starGlow_2.5s_ease-in-out_infinite]" />

        {/* 4-point star */}
        <svg
          viewBox="0 0 24 24"
          className="relative w-5 h-5 z-[61]
            animate-[starSpin_8s_linear_infinite]
            drop-shadow-[0_0_8px_#a78bfa]"
          fill="none"
        >
          <defs>
            <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#a78bfa" />
              <stop offset="50%"  stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path
            d="M12 0 L13.8 10.2 L24 12 L13.8 13.8 L12 24 L10.2 13.8 L0 12 L10.2 10.2 Z"
            fill="url(#starGrad)"
          />
        </svg>
      </div>

      {/* Keyframes */}
      <style>{`
        /* Left → Right: starts completely OFF-SCREEN left */
        @keyframes shineLTR {
          0%   { left: -25%; opacity: 0; }
          4%   { opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          96%  { opacity: 0; }
          100% { left: 100%; opacity: 0; }
        }

        /* Right → Left: starts completely OFF-SCREEN right */
        @keyframes shineRTL {
          0%   { left: 100%; opacity: 0; }
          4%   { opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          96%  { opacity: 0; }
          100% { left: -25%; opacity: 0; }
        }

        @keyframes starSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes starGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}