"use client";

import { useState } from "react";
import Image from "next/image";

/* ================= TYPES ================= */
type Project = {
  id: string;
  title: string;
  category: "Personal" | "Client";
  type: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured?: boolean;
  accent: string;
};

/* ================= DATA ================= */
const PROJECTS: Project[] = [
  /* ============ PERSONAL PROJECTS ============ */
  {
    id: "p1",
    title: "Zeltrix Portfolio",
    category: "Personal",
    type: "Personal Website",
    description:
      "A modern, animated personal portfolio built with Next.js 15, Tailwind CSS v4, and Framer Motion. Features dark/light mode, scroll-spy navigation, animated sections, and a full contact sidebar with QR code sharing.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://zeltrix.vercel.app",
    codeUrl: "https://github.com/zeltrixglobal2026/portfolio",
    featured: true,
    accent: "from-purple-main to-pink-500",
  },
  {
    id: "p2",
    title: "TaskFlow — Task Manager",
    category: "Personal",
    type: "Full Stack App",
    description:
      "A sleek task management app with drag-and-drop boards, real-time sync, priority tags, and dark mode. Built with Next.js App Router, MongoDB, and NextAuth for authentication.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80",
    tech: ["Next.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    liveUrl: "https://taskflow-demo.vercel.app",
    codeUrl: "https://github.com/zeltrixglobal2026/taskflow",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    id: "p3",
    title: "Weather Now — Live Weather",
    category: "Personal",
    type: "React Web App",
    description:
      "A beautiful real-time weather app with 7-day forecast, animated weather icons, geolocation support, and city search. Uses OpenWeatherMap API and React Query for caching.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200&q=80",
    tech: ["React", "TypeScript", "React Query", "OpenWeather API"],
    liveUrl: "https://weather-now-demo.vercel.app",
    codeUrl: "https://github.com/zeltrixglobal2026/weather-now",
    accent: "from-amber-500 to-orange-400",
  },

  /* ============ CLIENT PROJECTS ============ */
  {
    id: "c1",
    title: "Bloom Boutique — E-Commerce",
    category: "Client",
    type: "E-Commerce Store",
    description:
      "A complete e-commerce platform for a fashion boutique. Includes product catalog, cart, Stripe payments, order tracking, and a custom admin dashboard for inventory management.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    tech: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://bloomboutique.com",
    featured: true,
    accent: "from-pink-500 to-rose-400",
  },
  {
    id: "c2",
    title: "MediCare Clinic — Hospital Website",
    category: "Client",
    type: "Business Website",
    description:
      "A modern website for a private medical clinic featuring online appointment booking, doctor profiles, service pages, and a patient testimonial system. SEO-optimized and fully responsive.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    tech: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS"],
    liveUrl: "https://medicareclinic.pk",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    id: "c3",
    title: "FitPro Gym — Fitness Platform",
    category: "Client",
    type: "Membership Platform",
    description:
      "A full-featured gym management platform with membership plans, class scheduling, trainer profiles, and integrated payment processing. Includes admin panel for managing bookings and members.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://fitprogym.pk",
    accent: "from-indigo-500 to-purple-500",
  },
];

const TABS = [
  { id: "all",      label: "All Projects" },
  { id: "Personal", label: "Personal" },
  { id: "Client",   label: "Client Work" },
];

/* ================= CARD ================= */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{ animationDelay: `${index * 100}ms` }}
      className="group relative rounded-3xl overflow-hidden
        bg-white/[0.04] backdrop-blur-2xl
        border border-purple-main/20 hover:border-purple-light/40
        transition-all duration-500 hover:-translate-y-2
        hover:shadow-[0_25px_70px_rgba(124,58,237,0.4)]
        animate-[fadeUp_0.6s_ease-out_both]"
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5
          px-3 py-1.5 rounded-full
          bg-gradient-to-r from-amber-400 to-orange-500
          text-white text-[10px] font-black uppercase tracking-widest
          shadow-[0_8px_25px_rgba(251,191,36,0.5)]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Featured
        </div>
      )}

      {/* Category chip */}
      <div className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full
        text-[10px] font-black uppercase tracking-widest
        backdrop-blur-xl border
        ${project.category === "Client"
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
          : "bg-purple-500/20 text-purple-200 border-purple-400/40"}`}>
        {project.category}
      </div>

      {/* ===== IMAGE ===== */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-purple-main/20 to-pink-500/10">
        {!imgError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-out
              group-hover:scale-110"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className={`w-full h-full grid place-items-center
            bg-gradient-to-br ${project.accent}`}>
            <span className="text-white/90 font-black text-4xl tracking-tight">
              {project.title.split(" ")[0]}
            </span>
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-[#0f0a1e] via-[#0f0a1e]/40 to-transparent opacity-80" />

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute -inset-y-8 -left-1/3 w-1/3 bg-white/25 blur-2xl
            -translate-x-full group-hover:translate-x-[500%]
            transition-transform duration-[1.4s] rotate-12" />
        </div>

        {/* Type label */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <p className="text-[10.5px] uppercase tracking-[0.25em] font-black text-purple-light/90">
            {project.type}
          </p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-black tracking-tight text-white
          font-[var(--font-display)] group-hover:text-transparent
          group-hover:bg-gradient-to-r group-hover:from-purple-light group-hover:to-pink-400
          group-hover:bg-clip-text transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[13px] leading-relaxed font-medium text-purple-100/65
          line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10.5px] font-bold tracking-wide
                px-2.5 py-1 rounded-full
                bg-purple-main/12 text-purple-light
                border border-purple-main/25
                transition-all duration-300
                hover:bg-purple-main hover:text-white"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10.5px] font-bold tracking-wide
              px-2.5 py-1 rounded-full
              bg-white/[0.06] text-purple-100/60
              border border-purple-main/20">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn flex-1 inline-flex items-center justify-center gap-2
                px-4 py-2.5 rounded-full text-[12.5px] font-extrabold tracking-tight
                text-white bg-gradient-to-br from-purple-main to-purple-dark
                shadow-[0_4px_15px_rgba(124,58,237,0.35)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-[0_8px_25px_#7c3aed]
                relative overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-white/40 blur-md
                  -translate-x-full group-hover/btn:translate-x-[400%]
                  transition-transform duration-700 rotate-12" />
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                className="w-3.5 h-3.5 relative">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="relative">Live Demo</span>
            </a>
          )}

          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2
                px-4 py-2.5 rounded-full text-[12.5px] font-extrabold tracking-tight
                text-white bg-white/[0.06] backdrop-blur-xl
                border border-purple-main/25 hover:border-purple-light/50
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-white/[0.12]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");

  const visible =
    activeTab === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6
        bg-gradient-to-br from-[#0f0a1e] via-[#150c28] to-[#0f0a1e]"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
        bg-purple-main/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full
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
              My Work
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight
            font-[var(--font-display)] leading-[1.05]">
            <span className="text-white">Projects I&apos;ve </span>
            <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
              bg-clip-text text-transparent">
              built
            </span>
          </h2>

          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
          </div>

          <p className="mt-6 text-[14.5px] md:text-[16px] leading-relaxed font-medium
            text-purple-100/70 max-w-2xl mx-auto">
            A mix of personal experiments and real client work — from full-stack web apps
            to complete business platforms. Each one built with attention to detail.
          </p>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((t) => {
            const isActive = activeTab === t.id;
            const count =
              t.id === "all"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === t.id).length;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative px-5 py-2.5 rounded-full text-[13px] font-bold tracking-tight
                  transition-all duration-300 overflow-hidden
                  ${isActive ? "text-white" : "text-purple-100/70 hover:text-white"}`}
              >
                {isActive ? (
                  <span className="absolute inset-0 rounded-full
                    bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                    shadow-[0_8px_25px_rgba(124,58,237,0.5)]" />
                ) : (
                  <span className="absolute inset-0 rounded-full
                    bg-white/[0.05] border border-purple-main/20
                    transition-all duration-300 hover:bg-white/[0.1]" />
                )}
                <span className="relative flex items-center gap-2">
                  {t.label}
                  <span className={`text-[10.5px] px-1.5 py-0.5 rounded-full font-black
                    ${isActive
                      ? "bg-white/25 text-white"
                      : "bg-purple-main/20 text-purple-light"}`}>
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <div className="mt-16 text-center">
          <p className="text-[14px] font-semibold text-purple-100/60 mb-5">
            Want to see more or discuss a project?
          </p>
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
            <span className="relative">Start a Project</span>
          </a>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}