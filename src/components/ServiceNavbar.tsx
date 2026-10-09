"use client";

import Link from "next/link";

export default function ServiceNavbar({
  pageName,
}: {
  pageName: string;
}) {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] w-full px-0">
      <div className="relative mx-auto w-full max-w-[1280px]">

        {/* ===== ANIMATED BORDER (only bottom + sides visible) ===== */}
        <span className="absolute -inset-x-[1.5px] -bottom-[1.5px] -top-0 rounded-b-2xl overflow-hidden pointer-events-none">
          {/* Base gradient border */}
          <span className="absolute inset-0 rounded-b-2xl
            bg-gradient-to-r from-purple-main/50 via-purple-light/40 to-pink-500/50" />

          {/* Traveling light 1 (left → right) */}
          <span className="absolute top-0 bottom-0 w-24
            bg-gradient-to-r from-transparent via-white to-transparent
            blur-[2px] opacity-90
            animate-[navTravel_4s_ease-in-out_infinite]" />

          {/* Traveling light 2 (right → left, delayed) */}
          <span className="absolute top-0 bottom-0 w-20
            bg-gradient-to-l from-transparent via-purple-light to-transparent
            blur-[2px] opacity-80
            animate-[navTravelReverse_4s_ease-in-out_infinite_2s]" />
        </span>

        {/* ===== INNER BG ===== */}
        <div className="relative rounded-b-2xl
          bg-[#0d0620]/95 backdrop-blur-2xl
          shadow-[0_8px_35px_rgba(124,58,237,0.35)]
          px-5 md:px-6 py-2.5">

          <div className="flex items-center justify-between gap-3">

            {/* ===== LEFT: Logo + Page Name ===== */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Logo */}
              <Link href="/" className="shrink-0">
                <div className="relative w-9 h-9 grid place-items-center rounded-full
                  bg-gradient-to-br from-purple-main via-purple-light to-pink-500 text-white
                  shadow-[0_0_12px_#7c3aed] animate-[pulseGlow_3s_ease-in-out_infinite]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M5 16L3 5l5.5 4L12 4l3.5 5L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                </div>
              </Link>

              {/* Divider */}
              <span className="w-px h-5 bg-purple-light/25" />

              {/* Page name */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[9.5px] uppercase tracking-[0.22em] font-black text-purple-100/50 leading-none hidden sm:inline">
                  Service
                </span>
                <span className="hidden sm:block text-purple-100/30 text-[11px]">·</span>
                <h1 className="text-[14px] md:text-[15px] font-black tracking-tight truncate
                  bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
                  bg-clip-text text-transparent leading-none">
                  {pageName}
                </h1>
              </div>
            </div>

            {/* ===== RIGHT: Back Button ===== */}
            <Link
              href="/"
              className="group relative inline-flex items-center gap-1.5
                px-3.5 md:px-4 py-1.5 rounded-full
                text-[12px] md:text-[12.5px] font-extrabold tracking-tight text-white
                bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                shadow-[0_3px_12px_rgba(124,58,237,0.4)]
                transition-all duration-300 hover:-translate-y-0.5 hover:scale-105
                hover:shadow-[0_6px_20px_#7c3aed]
                overflow-hidden shrink-0"
            >
              {/* Shine */}
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-white/50 blur-md
                  -translate-x-full group-hover:translate-x-[500%]
                  transition-transform duration-700 rotate-12" />
              </span>

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="w-3.5 h-3.5 relative transition-transform group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span className="relative hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes navTravel {
            0%   { left: -25%; opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          @keyframes navTravelReverse {
            0%   { left: 100%; opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 1; }
            100% { left: -25%; opacity: 0; }
          }
        `}</style>
      </div>
    </nav>
  );
}