"use client";

import { useState } from "react";

/* ================= TYPES ================= */
type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  accent: string;
  glow: string;
  popular?: boolean;
};

/* ================= DATA ================= */
const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    tagline: "Modern & Responsive Websites",
    description:
      "Custom-built websites using the latest stack — Next.js, React, and Tailwind. Fast, SEO-friendly, and pixel-perfect on every screen.",
    features: ["Next.js / React", "Tailwind CSS v4", "SEO Optimized", "100% Responsive"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-purple-main to-pink-500",
    glow: "124, 58, 237",
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    tagline: "End-to-End Web Applications",
    description:
      "Complete MERN stack solutions — from database design and secure REST APIs to a polished frontend. Everything integrated, tested, and deployed.",
    features: ["MERN Stack", "REST APIs", "Authentication", "Database Design"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-blue-500 to-cyan-400",
    glow: "59, 130, 246",
    popular: true,
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    tagline: "Cross-Platform Apps",
    description:
      "Native-feel iOS & Android apps with React Native and Expo. One codebase, two platforms — smooth animations and real device performance.",
    features: ["React Native", "Expo", "iOS & Android", "App Store Ready"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-emerald-500 to-teal-400",
    glow: "16, 185, 129",
  },
  {
    id: "ui",
    title: "UI/UX Design",
    tagline: "Design That Converts",
    description:
      "Wireframes to high-fidelity prototypes in Figma. Design systems, component libraries, and interfaces that feel right and convert well.",
    features: ["Figma Design", "Prototyping", "Design Systems", "User Research"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2l7.586 7.586" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    accent: "from-pink-500 to-rose-400",
    glow: "236, 72, 153",
  },
  {
    id: "api",
    title: "API Development",
    tagline: "Secure & Scalable Backends",
    description:
      "Well-documented REST APIs with Node.js, Express, and MongoDB. JWT auth, rate limiting, validation, and clean architecture out of the box.",
    features: ["Node.js / Express", "JWT Auth", "MongoDB", "API Docs"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-amber-500 to-orange-400",
    glow: "245, 158, 11",
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    tagline: "Keep It Running Smooth",
    description:
      "Bug fixes, performance tuning, security patches, and feature additions. Long-term support for your existing websites and apps.",
    features: ["Bug Fixes", "Speed Optimization", "Security Updates", "24/7 Support"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M14.7 6.3a4 4 0 105.4 5.4l-1.8-1.8 1.4-1.4-3.6-3.6-1.4 1.4-1.8-1.8a4 4 0 005.4 5.4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12l-8.5 8.5a1.5 1.5 0 002 2L14 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-indigo-500 to-purple-500",
    glow: "99, 102, 241",
  },
];

/* ================= PROCESS STEPS ================= */
const PROCESS = [
  {
    step: "01",
    title: "Discover",
    desc: "We discuss your goals, audience, and requirements in detail.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Design",
    desc: "Wireframes and UI mockups that match your brand vision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Develop",
    desc: "Clean code, tested features, and daily progress updates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Launch, handover, and ongoing support whenever you need it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ================= SERVICE CARD ================= */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div
      style={{
        animationDelay: `${index * 80}ms`,
        ["--glow" as string]: service.glow,
      }}
      className="group relative rounded-3xl p-6 overflow-hidden
        bg-white/[0.04] backdrop-blur-2xl
        border border-purple-main/20 hover:border-transparent
        transition-all duration-500 hover:-translate-y-2
        hover:shadow-[0_25px_70px_rgba(var(--glow),0.35)]
        animate-[fadeUp_0.6s_ease-out_both]"
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5
          px-3 py-1.5 rounded-full
          bg-gradient-to-r from-amber-400 to-orange-500
          text-white text-[10px] font-black uppercase tracking-widest
          shadow-[0_8px_25px_rgba(251,191,36,0.5)]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Popular
        </div>
      )}

      {/* Hover glow bg */}
      <span
        className={`absolute inset-0 opacity-0 group-hover:opacity-[0.08]
          bg-gradient-to-br ${service.accent} transition-opacity duration-500`}
      />

      {/* Corner glow */}
      <span
        className={`absolute -top-20 -right-20 w-52 h-52 rounded-full
          bg-gradient-to-br ${service.accent}
          opacity-[0.15] blur-3xl
          transition-all duration-700
          group-hover:opacity-40 group-hover:scale-125`}
      />

      <div className="relative">
        {/* Icon */}
        <div className="relative mb-5">
          <span
            className={`absolute inset-0 w-14 h-14 rounded-2xl
              bg-gradient-to-br ${service.accent}
              opacity-40 blur-lg
              transition-all duration-500
              group-hover:opacity-80`}
          />
          <span
            className={`relative w-14 h-14 grid place-items-center rounded-2xl
              bg-gradient-to-br ${service.accent} text-white
              shadow-[0_8px_25px_rgba(var(--glow),0.5)]
              transition-transform duration-500
              group-hover:scale-110 group-hover:-rotate-6`}
          >
            {service.icon}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-[10.5px] uppercase tracking-[0.22em] font-black
          text-purple-light/80 mb-1.5">
          {service.tagline}
        </p>

        {/* Title */}
        <h3 className="text-xl font-black tracking-tight text-white
          font-[var(--font-display)]">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[13px] leading-relaxed font-medium text-purple-100/65">
          {service.description}
        </p>

        {/* Features */}
        <ul className="mt-5 grid grid-cols-2 gap-y-2 gap-x-3">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-[12px] font-semibold text-purple-100/75"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.accent}`} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://wa.me/923360534777"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-extrabold tracking-tight
            text-purple-light hover:text-white transition-colors duration-300
            group/cta"
        >
          <span>Discuss this service</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
            className="w-3.5 h-3.5 transition-transform duration-300
            group-hover/cta:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function Services() {
  return (
    <section
      id="services"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6
        bg-gradient-to-br from-[#0f0a1e] via-[#150c28] to-[#0f0a1e]"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
        bg-purple-main/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full
        bg-pink-500/15 blur-[140px] animate-[pulseGlow_10s_ease-in-out_infinite_reverse] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[160px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
            bg-white/5 backdrop-blur-md border border-purple-main/25
            shadow-[0_4px_20px_rgba(124,58,237,0.2)] mb-5">
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-100/80">
              Services
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight
            font-[var(--font-display)] leading-[1.05]">
            <span className="text-white">What I can </span>
            <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
              bg-clip-text text-transparent">
              build for you
            </span>
          </h2>

          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
          </div>

          <p className="mt-6 text-[14.5px] md:text-[16px] leading-relaxed font-medium
            text-purple-100/70 max-w-2xl mx-auto">
            From a single landing page to a full-scale platform — I offer end-to-end
            services that take your idea from concept to launch.
          </p>
        </div>

        {/* ===== SERVICE CARDS ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* ===== PROCESS SECTION ===== */}
        <div className="mt-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
              bg-white/5 backdrop-blur-md border border-purple-main/25 mb-5">
              <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-100/80">
                My Process
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
              font-[var(--font-display)]">
              <span className="text-white">How we&apos;ll work </span>
              <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
                bg-clip-text text-transparent">
                together
              </span>
            </h3>
          </div>

          {/* Timeline grid */}
          <div className="relative grid md:grid-cols-4 gap-6">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5
              bg-gradient-to-r from-purple-main via-pink-500 to-purple-main
              opacity-30 pointer-events-none" />

            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                style={{ animationDelay: `${i * 100}ms` }}
                className="group relative rounded-2xl p-6 text-center
                  bg-white/[0.04] backdrop-blur-2xl
                  border border-purple-main/20 hover:border-purple-light/40
                  transition-all duration-500 hover:-translate-y-1.5
                  hover:shadow-[0_20px_50px_rgba(124,58,237,0.35)]
                  animate-[fadeUp_0.6s_ease-out_both]"
              >
                {/* Step number */}
                <div className="relative mx-auto w-14 h-14 grid place-items-center rounded-full
                  bg-gradient-to-br from-purple-main to-pink-500 text-white
                  shadow-[0_10px_30px_rgba(124,58,237,0.5)]
                  mb-4 transition-transform duration-500
                  group-hover:scale-110">
                  <span className="text-[15px] font-black tracking-tight">
                    {p.step}
                  </span>
                  {/* Ring pulse */}
                  <span className="absolute inset-0 rounded-full
                    bg-purple-main/40
                    animate-ping opacity-30" />
                </div>

                {/* Icon mini */}
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg
                  bg-purple-main/15 text-purple-light mb-3">
                  {p.icon}
                </div>

                <h4 className="text-[16px] font-black tracking-tight text-white
                  font-[var(--font-display)] mb-2">
                  {p.title}
                </h4>
                <p className="text-[12.5px] leading-relaxed font-medium text-purple-100/65">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CTA BANNER ===== */}
        <div className="mt-24">
          <div className="relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-purple-main/20 via-pink-500/10 to-purple-light/20
            border border-purple-main/30
            backdrop-blur-2xl
            p-8 md:p-12 text-center">

            {/* Corner glows */}
            <span className="absolute -top-24 -left-24 w-64 h-64 rounded-full
              bg-purple-main/40 blur-3xl" />
            <span className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full
              bg-pink-500/30 blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.22em] font-black text-white/80">
                  Available for work
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                font-[var(--font-display)] text-white leading-[1.1]">
                Have a project in mind?
              </h3>

              <p className="mt-4 text-[14.5px] md:text-base leading-relaxed font-medium
                text-purple-100/75 max-w-xl mx-auto">
                Let&apos;s turn your idea into a fast, beautiful, and scalable product.
                Drop me a message — I usually reply within a few hours.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <a
                  href="https://wa.me/923360534777"
                  target="_blank"
                  rel="noreferrer"
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
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 relative">
                    <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.1 1.6 5.88L0 24l6.44-1.68a11.85 11.85 0 0 0 5.6 1.42h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.14-3.37-8.42zM12.05 21.5h-.01a9.6 9.6 0 0 1-4.9-1.35l-.35-.2-3.82 1 1.02-3.72-.23-.38a9.6 9.6 0 0 1-1.47-5.11c0-5.3 4.3-9.6 9.6-9.6 2.56 0 4.97 1 6.78 2.82a9.53 9.53 0 0 1 2.81 6.79c0 5.3-4.3 9.6-9.6 9.6z" />
                  </svg>
                  <span className="relative">Start a Conversation</span>
                </a>

                <a
                  href="mailto:zeltrixglobal2026@gmail.com"
                  className="group inline-flex items-center gap-2.5
                    px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight
                    text-white bg-white/10 backdrop-blur-xl
                    border-2 border-white/25 hover:border-white/50
                    transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
                    hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                    className="w-4 h-4">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}