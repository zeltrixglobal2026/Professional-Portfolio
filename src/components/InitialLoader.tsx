"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [show, setShow] = useState<boolean | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("zeltrix_visited");

    if (hasVisited) {
      setShow(false);
      return;
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);

    const removeTimer = setTimeout(() => {
      setShow(false);
      setFadeOut(false);
      document.body.style.overflow = "";
      localStorage.setItem("zeltrix_visited", "true");
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (show === null || !show) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center
        transition-opacity duration-700 ease-out
        ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >

      {/* ============ BACKGROUND IMAGE (clean) ============ */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* ============ CENTER CONTENT ============ */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">

        {/* ============ BIG WELCOME ============ */}
        <h1
          className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px]
            font-black tracking-tighter leading-none
            font-[var(--font-display)]
            text-white
            animate-[welcomePop_1s_ease-out_both]"
          style={{
            textShadow:
              "0 0 40px rgba(124,58,237,0.8), 0 4px 30px rgba(0,0,0,0.9), 0 0 80px rgba(236,72,153,0.4)",
          }}
        >
          Welcome
        </h1>

        {/* ============ PROFESSIONAL PORTFOLIO ============ */}
        <h2
          className="text-[20px] sm:text-[26px] md:text-[32px]
            font-black tracking-[0.25em] uppercase
            text-white
            animate-[subtitleFade_1s_ease-out_both_0.5s]"
          style={{
            textShadow:
              "0 4px 25px rgba(0,0,0,0.95), 0 0 40px rgba(124,58,237,0.6)",
          }}
        >
          Professional Portfolio
        </h2>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes welcomePop {
          0%   { opacity: 0; transform: scale(0.7) translateY(30px); }
          60%  { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes subtitleFade {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}