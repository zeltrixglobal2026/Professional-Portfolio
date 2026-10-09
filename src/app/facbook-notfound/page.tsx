"use client";

import Link from "next/link";

/* Fixed particle positions — no Math.random to avoid hydration issues */
const PARTICLES = [
  { left: 8,  delay: 0,   duration: 12, size: 3, opacity: 0.35 },
  { left: 16, delay: 2.5, duration: 14, size: 2, opacity: 0.25 },
  { left: 24, delay: 1.2, duration: 10, size: 4, opacity: 0.4  },
  { left: 32, delay: 3.8, duration: 15, size: 2, opacity: 0.3  },
  { left: 40, delay: 0.6, duration: 11, size: 3, opacity: 0.35 },
  { left: 48, delay: 4.2, duration: 13, size: 2, opacity: 0.25 },
  { left: 56, delay: 1.8, duration: 16, size: 4, opacity: 0.4  },
  { left: 64, delay: 5.1, duration: 12, size: 3, opacity: 0.3  },
  { left: 72, delay: 2.2, duration: 14, size: 2, opacity: 0.35 },
  { left: 80, delay: 0.9, duration: 11, size: 3, opacity: 0.25 },
  { left: 88, delay: 3.3, duration: 15, size: 4, opacity: 0.4  },
  { left: 94, delay: 6.0, duration: 13, size: 2, opacity: 0.3  },
];

export default function FacebookNotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden
      bg-gradient-to-br from-[#0f0a1e] via-[#1a0f30] to-[#0f0a1e]
      flex items-center justify-center px-6 py-24">

      {/* ===== Back to Home — Top Left ===== */}
      <Link
        href="/"
        aria-label="Back to Home"
        className="group absolute top-6 left-6 z-20
          inline-flex items-center gap-2.5
          pl-3 pr-5 py-2.5 rounded-full
          bg-white/10 backdrop-blur-xl
          border border-white/25 hover:border-white/50
          text-white text-[13px] font-extrabold tracking-tight
          shadow-[0_4px_20px_rgba(124,58,237,0.25)]
          transition-all duration-300 hover:-translate-x-1 hover:bg-white/20
          hover:shadow-[0_8px_30px_rgba(124,58,237,0.5)]"
      >
        {/* Icon circle */}
        <span className="relative w-8 h-8 grid place-items-center rounded-full
          bg-gradient-to-br from-purple-main to-pink-500
          shadow-[0_0_15px_rgba(124,58,237,0.6)]
          transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {/* Text */}
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* Ambient gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
        bg-purple-main/25 blur-[140px] animate-[pulseGlow_6s_ease-in-out_infinite]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full
        bg-pink-500/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full
        bg-blue-500/15 blur-[120px] animate-[pulseGlow_10s_ease-in-out_infinite]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-purple-light"
            style={{
              left: `${p.left}%`,
              bottom: "-20px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 max-w-2xl w-full text-center">

        {/* Broken Facebook icon */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <span className="absolute inset-0 rounded-full
            border-2 border-dashed border-purple-main/40
            animate-[spin_12s_linear_infinite]" />
          <span className="absolute inset-3 rounded-full
            border border-pink-500/30
            animate-[spin_8s_linear_infinite_reverse]" />
          <span className="absolute inset-6 rounded-full bg-blue-500/25 blur-2xl
            animate-[pulseGlow_3s_ease-in-out_infinite]" />

          <div className="absolute inset-6 grid place-items-center rounded-full
            bg-gradient-to-br from-[#1877f2] to-[#0d5fce]
            shadow-[0_0_50px_rgba(24,119,242,0.6)]
            animate-[float_4s_ease-in-out_infinite]">
            <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>

            <span className="absolute -bottom-1 -right-1 w-8 h-8 grid place-items-center rounded-full
              bg-red-500 border-2 border-[#0f0a1e]
              shadow-[0_0_20px_rgba(239,68,68,0.7)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* 404 glitch */}
        <h1 className="relative text-[110px] sm:text-[140px] md:text-[180px]
          font-black leading-none tracking-tighter
          font-[var(--font-display)] select-none">
          <span className="absolute inset-0 text-red-500/70 blur-[2px]
            animate-[glitch1_3s_infinite_ease-in-out]">
            404
          </span>
          <span className="absolute inset-0 text-cyan-400/70 blur-[2px]
            animate-[glitch2_3s_infinite_ease-in-out]">
            404
          </span>
          <span className="relative bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
            bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]">
            404
          </span>
        </h1>

        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight
          font-[var(--font-display)] text-white">
          Facebook Page Not Found
        </h2>

        <div className="mt-5 mx-auto flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
          <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
        </div>

        <p className="mt-5 text-[14.5px] md:text-base leading-relaxed font-medium
          text-purple-100/70 max-w-md mx-auto">
          Lagta hai jis Facebook page ko aap dhundh rahe ho woh
          <span className="text-white font-bold"> abhi available nahi hai</span>.
          Ho sakta hai link galat ho, page delete ho gaya ho, ya pehle se hi private
          ho chuka ho.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap gap-3 justify-center">

          {/* Back to Home — Big */}
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2.5
              px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight text-white
              bg-gradient-to-br from-purple-main via-purple-light to-pink-500
              shadow-[0_10px_35px_rgba(124,58,237,0.55)]
              transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
              hover:shadow-[0_15px_45px_rgba(236,72,153,0.55)] overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute -inset-y-3 -left-1/3 w-1/3 bg-white/50 blur-lg
                -translate-x-full group-hover:translate-x-[500%]
                transition-transform duration-700 rotate-12" />
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="w-4 h-4 relative transition-transform group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="relative">Back to Home</span>
          </Link>

          {/* Contact */}
          <a
            href="https://wa.me/923360534777"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5
              px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight
              text-white bg-white/10 backdrop-blur-xl
              border-2 border-white/25 hover:border-white/50
              transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
              hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.1 1.6 5.88L0 24l6.44-1.68a11.85 11.85 0 0 0 5.6 1.42h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.14-3.37-8.42zM12.05 21.5h-.01a9.6 9.6 0 0 1-4.9-1.35l-.35-.2-3.82 1 1.02-3.72-.23-.38a9.6 9.6 0 0 1-1.47-5.11c0-5.3 4.3-9.6 9.6-9.6 2.56 0 4.97 1 6.78 2.82a9.53 9.53 0 0 1 2.81 6.79c0 5.3-4.3 9.6-9.6 9.6z" />
            </svg>
            <span>Contact Me</span>
          </a>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.25em] font-bold
          text-purple-100/40">
          Error code · FB_404_NOT_FOUND
        </p>
      </div>
    </main>
  );
}