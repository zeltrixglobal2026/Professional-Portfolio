"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceNavbar from "@/components/ServiceNavbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContactSidebar from "@/components/ContactSidebar";

const SERVICE = {
  badge: "Service",
  title: "API Development",
  tagline: "Secure & Scalable Backends",
  description:
    "Well-documented REST APIs with Node.js, Express, and MongoDB. JWT authentication, rate limiting, validation, and clean architecture — ready for production from day one.",
  accent: "from-amber-500 to-orange-400",
  glow: "245, 158, 11",
};

const FEATURES = [
  {
    title: "RESTful Design",
    desc: "Clean, predictable endpoints following REST conventions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "JWT Auth",
    desc: "Token-based authentication with refresh tokens and roles.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Rate Limiting",
    desc: "Protect your APIs from abuse with smart throttling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Data Validation",
    desc: "Input validation with Zod or Joi to prevent bad data.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "API Documentation",
    desc: "Auto-generated docs with Swagger or Postman collections.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Testing & CI/CD",
    desc: "Unit tests and automated deployments on every push.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const TECH = [
  { name: "Node.js",    color: "from-green-500 to-emerald-700" },
  { name: "Express.js", color: "from-gray-600 to-gray-800" },
  { name: "MongoDB",    color: "from-green-500 to-green-700" },
  { name: "PostgreSQL", color: "from-blue-600 to-blue-800" },
  { name: "Postman",    color: "from-orange-500 to-orange-700" },
  { name: "Swagger",    color: "from-emerald-500 to-teal-600" },
];

const PROCESS = [
  { step: "01", title: "Discovery",   desc: "Understanding your goals, audience, and requirements." },
  { step: "02", title: "Design",      desc: "Wireframes and UI mockups tailored to your brand." },
  { step: "03", title: "Development", desc: "Clean code, tested features, and daily updates." },
  { step: "04", title: "Launch",      desc: "Deployment, handover, and ongoing support." },
];

export default function ApiDevelopmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ServiceNavbar pageName="API Development" />

      <main className="relative min-h-screen w-full overflow-hidden bg-[#0f0a1e] pt-24 pb-24">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/15 blur-[140px] animate-[pulseGlow_10s_ease-in-out_infinite_reverse] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-[12px] font-semibold mb-8">
            <Link href="/" className="text-purple-100/50 hover:text-purple-light transition-colors">Home</Link>
            <span className="text-purple-100/30">/</span>
            <Link href="/#services" className="text-purple-100/50 hover:text-purple-light transition-colors">Services</Link>
            <span className="text-purple-100/30">/</span>
            <span className="text-purple-light">{SERVICE.title}</span>
          </div>

          {/* HERO */}
          <div className="mb-20">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-purple-main/25 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-100/80">{SERVICE.badge}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight font-[var(--font-display)] leading-[1.05] mb-6">
              <span className="text-white">{SERVICE.title.split(" ")[0]} </span>
              <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main bg-clip-text text-transparent">
                {SERVICE.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-[16px] md:text-lg leading-relaxed font-medium text-purple-100/70 max-w-3xl mb-10">
              {SERVICE.description}
            </p>
            <div className="flex flex-wrap gap-3">

              {/* START A PROJECT → Sidebar */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight text-white bg-gradient-to-br from-purple-main via-purple-light to-pink-500 shadow-[0_10px_35px_rgba(124,58,237,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute -inset-y-3 -left-1/3 w-1/3 bg-white/50 blur-lg -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700 rotate-12" />
                </span>
                <span className="relative">Start a Project</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 relative transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* CONTACT ME → /contact page */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight text-white bg-white/[0.05] backdrop-blur-xl border border-purple-light/25 hover:border-purple-light/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* FEATURES */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-[var(--font-display)] text-white mb-3">What&apos;s Included</h2>
              <p className="text-purple-100/60 text-[15px] max-w-2xl mx-auto">
                Everything you need for a secure, scalable backend — built with modern tools.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <div key={f.title} style={{ animationDelay: `${i * 60}ms` }}
                  className="group relative rounded-2xl p-6 bg-white/[0.04] backdrop-blur-xl border border-purple-main/20 hover:border-purple-light/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(124,58,237,0.35)] animate-[fadeUp_0.5s_ease-out_both]">
                  <div className={`w-12 h-12 grid place-items-center rounded-xl bg-gradient-to-br ${SERVICE.accent} text-white mb-4 shadow-[0_8px_25px_rgba(${SERVICE.glow},0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                    {f.icon}
                  </div>
                  <h3 className="text-[16px] font-black tracking-tight text-white mb-2">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed font-medium text-purple-100/60">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TECH */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-[var(--font-display)] text-white mb-3">Tech Stack</h2>
              <p className="text-purple-100/60 text-[15px]">Modern tools I use for API development.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH.map((t) => (
                <div key={t.name} className={`px-5 py-3 rounded-full bg-gradient-to-br ${t.color} text-white text-[13px] font-extrabold tracking-tight shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105`}>
                  {t.name}
                </div>
              ))}
            </div>
          </div>

          {/* PROCESS */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-[var(--font-display)] text-white mb-3">How We Work</h2>
              <p className="text-purple-100/60 text-[15px] max-w-2xl mx-auto">A simple 4-step process that keeps you in the loop from start to finish.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {PROCESS.map((p, i) => (
                <div key={p.step} style={{ animationDelay: `${i * 100}ms` }}
                  className="group relative rounded-2xl p-6 text-center bg-white/[0.04] backdrop-blur-xl border border-purple-main/20 hover:border-purple-light/40 transition-all duration-500 hover:-translate-y-1.5 animate-[fadeUp_0.5s_ease-out_both]">
                  <div className={`w-14 h-14 grid place-items-center rounded-full mx-auto mb-4 bg-gradient-to-br ${SERVICE.accent} text-white shadow-[0_10px_30px_rgba(${SERVICE.glow},0.5)] transition-transform duration-500 group-hover:scale-110`}>
                    <span className="text-[16px] font-black">{p.step}</span>
                  </div>
                  <h3 className="text-[15px] font-black tracking-tight text-white mb-2">{p.title}</h3>
                  <p className="text-[12.5px] leading-relaxed font-medium text-purple-100/60">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center bg-gradient-to-br from-purple-main/25 via-pink-500/15 to-purple-light/25 border border-purple-main/30 backdrop-blur-2xl">
            <span className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-purple-main/40 blur-3xl" />
            <span className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-pink-500/30 blur-3xl" />
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-[var(--font-display)] text-white mb-4">Ready to start?</h3>
              <p className="text-purple-100/75 text-[15px] max-w-xl mx-auto mb-8">
                Let&apos;s discuss your project — I usually reply within a few hours.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">

                {/* START A PROJECT → Sidebar */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[14px] font-extrabold text-white bg-gradient-to-br from-purple-main to-pink-500 shadow-[0_10px_35px_rgba(124,58,237,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                >
                  Start a Project
                </button>

                {/* CONTACT ME → /contact page */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[14px] font-extrabold text-white bg-white/[0.08] backdrop-blur-xl border border-white/25 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.15]"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SectionDivider />
      <Footer />

      {/* SIDEBAR */}
      <ContactSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </>
  );
}