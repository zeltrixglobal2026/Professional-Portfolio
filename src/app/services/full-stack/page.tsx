"use client";

import { useState } from "react";
import Link from "next/link";
import ServiceNavbar from "@/components/ServiceNavbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContactSidebar from "@/components/ContactSidebar";

const SERVICE = {
  badge: "Service",
  title: "Full Stack Apps",
  tagline: "End-to-End Web Applications",
  description:
    "Complete MERN stack solutions — from database design and secure REST APIs to a polished frontend. Everything integrated, tested, and deployed with a focus on performance and scalability.",
  accent: "from-blue-500 to-cyan-400",
  glow: "59, 130, 246",
};

const FEATURES = [
  {
    title: "Complete MERN Stack",
    desc: "MongoDB, Express, React, and Node.js — a modern, proven technology stack.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Secure Authentication",
    desc: "JWT-based auth, password hashing, and role-based access control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "RESTful APIs",
    desc: "Clean, well-documented APIs with validation and error handling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Database Design",
    desc: "Optimized schema, indexing, and queries for fast data access.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeLinecap="round" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Real-time Features",
    desc: "Live chat, notifications, and updates with WebSockets.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Cloud Deployment",
    desc: "Deployed on Vercel, AWS, or your preferred cloud platform.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const TECH = [
  { name: "MongoDB",    color: "from-green-500 to-green-700" },
  { name: "Express.js", color: "from-gray-600 to-gray-800" },
  { name: "React",      color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js",    color: "from-green-500 to-emerald-700" },
  { name: "JWT Auth",   color: "from-purple-500 to-pink-500" },
  { name: "Prisma",     color: "from-indigo-500 to-purple-600" },
];

const PROCESS = [
  { step: "01", title: "Discovery",   desc: "Understanding your goals, audience, and requirements." },
  { step: "02", title: "Design",      desc: "Wireframes and UI mockups tailored to your brand." },
  { step: "03", title: "Development", desc: "Clean code, tested features, and daily updates." },
  { step: "04", title: "Launch",      desc: "Deployment, handover, and ongoing support." },
];

export default function FullStackPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ServiceNavbar pageName="Full Stack Apps" />

      <main className="relative min-h-screen w-full overflow-hidden bg-[#0f0a1e] pt-24 pb-24">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[140px] animate-[pulseGlow_10s_ease-in-out_infinite_reverse] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          <div className="flex items-center gap-2 text-[12px] font-semibold mb-8">
            <Link href="/" className="text-purple-100/50 hover:text-purple-light transition-colors">Home</Link>
            <span className="text-purple-100/30">/</span>
            <Link href="/#services" className="text-purple-100/50 hover:text-purple-light transition-colors">Services</Link>
            <span className="text-purple-100/30">/</span>
            <span className="text-purple-light">{SERVICE.title}</span>
          </div>

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
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[14px] font-extrabold tracking-tight text-white bg-white/[0.05] backdrop-blur-xl border border-purple-light/25 hover:border-purple-light/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1]"
              >
                Contact Me
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-[var(--font-display)] text-white mb-3">What&apos;s Included</h2>
              <p className="text-purple-100/60 text-[15px] max-w-2xl mx-auto">Everything you need for a successful web presence — built with modern tools and best practices.</p>
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

          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-[var(--font-display)] text-white mb-3">Tech Stack</h2>
              <p className="text-purple-100/60 text-[15px]">Modern tools I use to build fast, reliable websites.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH.map((t) => (
                <div key={t.name} className={`px-5 py-3 rounded-full bg-gradient-to-br ${t.color} text-white text-[13px] font-extrabold tracking-tight shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105`}>
                  {t.name}
                </div>
              ))}
            </div>
          </div>

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

          <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center bg-gradient-to-br from-purple-main/25 via-pink-500/15 to-purple-light/25 border border-purple-main/30 backdrop-blur-2xl">
            <span className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-purple-main/40 blur-3xl" />
            <span className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-pink-500/30 blur-3xl" />
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-[var(--font-display)] text-white mb-4">Ready to start?</h3>
              <p className="text-purple-100/75 text-[15px] max-w-xl mx-auto mb-8">Let&apos;s discuss your project — I usually reply within a few hours.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[14px] font-extrabold text-white bg-gradient-to-br from-purple-main to-pink-500 shadow-[0_10px_35px_rgba(124,58,237,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
                >
                  Start a Project
                </button>
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

      <ContactSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </>
  );
}