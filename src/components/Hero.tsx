"use client";

import { useState } from "react";
import ContactSidebar from "./ContactSidebar";

export default function Hero() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen w-full overflow-hidden flex items-center"
      >
        {/* ===== BACKGROUND IMAGE (no blur, no shade) ===== */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* ===== CONTENT GRID ===== */}
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-24
          grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ============ LEFT — Text ============ */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
              bg-white/20 dark:bg-black/30 backdrop-blur-md
              border border-white/30 dark:border-purple-light/25
              shadow-[0_4px_20px_rgba(124,58,237,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-black text-white">
                Available for work
              </span>
            </div>

            {/* Name */}
            <h1
              className="mt-6 text-[40px] sm:text-5xl md:text-6xl xl:text-[68px]
                font-black leading-[1.05] tracking-tight font-[var(--font-display)]
                text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              Muhammad
              <br />
              <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
                bg-clip-text text-transparent
                drop-shadow-none">
                Khizar Mughal
              </span>
            </h1>

            {/* Title */}
            <div className="mt-4 flex items-center gap-3 justify-center lg:justify-start">
              <span className="hidden sm:block h-px w-10 bg-white/50" />
              <p className="text-[15px] md:text-lg font-bold tracking-[0.18em] uppercase
                text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                Full Stack Developer
              </p>
              <span className="hidden sm:block h-px w-10 bg-white/50" />
            </div>

            {/* Description */}
            <p className="mt-6 max-w-[560px] mx-auto lg:mx-0 text-[14.5px] md:text-[15.5px]
              leading-relaxed font-medium text-white/85
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              Building fast, modern aur scalable web experiences from pixel-perfect frontend
              to rock-solid backend. Har project me clean code, sharp design aur
              performance-first thinking — yehi mera signature hai.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-3.5 justify-center lg:justify-start">

              {/* Contact — opens sidebar */}
              <button
                onClick={() => setSidebarOpen(true)}
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 relative">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.1 9.9a16 16 0 006 6l1.26-1.26a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="relative">Contact Me</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="w-4 h-4 relative transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Resume — download */}
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2.5
                  px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight text-white
                  bg-white/15 dark:bg-white/10 backdrop-blur-xl
                  border-2 border-white/40 dark:border-purple-light/40
                  transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
                  hover:bg-white/25 hover:border-white/70"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Resume</span>
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { num: "1+", label: "Years Exp" },
                { num: "3+", label: "Projects" },
                { num: "100%", label: "Client Love" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-black tracking-tight
                    text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                    {s.num}
                  </div>
                  <div className="text-[10.5px] uppercase tracking-[0.2em] font-bold
                    text-white/70 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============ RIGHT — Profile Image ============ */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">

              {/* Decorative glow behind image */}
              <div className="absolute -inset-6 rounded-full
                bg-gradient-to-br from-purple-main/40 via-pink-500/30 to-purple-light/40
                blur-3xl opacity-70 -z-10 animate-[pulseGlow_4s_ease-in-out_infinite]" />

              {/* Image with 2 sharp + 2 rounded corners */}
              <div
                className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[440px]
                  md:w-[380px] md:h-[490px] overflow-hidden
                  rounded-tl-[100px] rounded-br-[100px]
                  rounded-tr-none rounded-bl-none
                  border-[3px] border-white/70
                  shadow-[0_25px_80px_rgba(124,58,237,0.5)]
                  transition-all duration-500
                  hover:scale-[1.02] hover:shadow-[0_30px_100px_rgba(236,72,153,0.55)]"
              >
                <img
                  src="/me.png"
                  alt="Muhammad Khizar Mughal"
                  className="w-full h-full object-cover select-none"
                />

                {/* Subtle gradient edge — just for polish, not a shade overlay */}
                <div className="absolute inset-0 pointer-events-none
                  bg-gradient-to-br from-transparent via-transparent to-purple-main/15" />
              </div>

              {/* Floating badge — Full Stack */}
              <div className="absolute -bottom-4 -left-6 sm:-left-8
                flex items-center gap-2 px-4 py-2.5 rounded-2xl
                bg-white dark:bg-[#140c28]
                border border-purple-main/25 dark:border-purple-light/25
                shadow-[0_12px_35px_rgba(124,58,237,0.4)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11.5px] font-black tracking-tight text-slate-800 dark:text-purple-50">
                  MERN Stack
                </span>
              </div>

              {/* Floating badge — Next.js */}
              <div className="absolute -top-3 -right-3 sm:-right-5
                flex items-center gap-2 px-4 py-2.5 rounded-2xl
                bg-gradient-to-br from-purple-main to-pink-500 text-white
                shadow-[0_12px_35px_rgba(236,72,153,0.5)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10" fill="white" />
                  <path d="M18 17.5l-5.5-7H11v7h1V12l4.5 6h1.5z" fill="#7c3aed" />
                </svg>
                <span className="text-[11.5px] font-black tracking-tight">
                  Next.js
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex
          flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent
            animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
      </section>

      {/* ===== CONTACT SIDEBAR ===== */}
      <ContactSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}