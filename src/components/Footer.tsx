"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  WhatsAppLogo,
  GmailLogo,
  InstagramLogo,
  LinkedInLogo,
  YouTubeLogo,
  FacebookLogo,
  GitHubLogo,
} from "./BrandIcons";

/* ================= DATA ================= */
const NAV_LINKS = [
  { label: "Hero",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

const SERVICES_LINKS = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Full Stack Apps", href: "/services/full-stack" },
  { label: "Mobile Apps",     href: "/services/mobile-apps" },
  { label: "UI/UX Design",    href: "/services/ui-ux-design" },
  { label: "API Development", href: "/services/api-development" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/zeltrixglobal2026",   icon: <InstagramLogo />, glow: "220, 39, 67",   whiteBg: false, disabled: false },
  { name: "LinkedIn",  href: "https://linkedin.com/in/zeltrixglobal2026", icon: <LinkedInLogo />,  glow: "10, 102, 194", whiteBg: false, disabled: false },
  { name: "GitHub",    href: "https://github.com/zeltrixglobal2026",      icon: <GitHubLogo />,    glow: "110, 118, 129", whiteBg: true,  disabled: false },
  { name: "YouTube",   href: "https://youtube.com/@zeltrixglobal2026",    icon: <YouTubeLogo />,   glow: "255, 0, 0",    whiteBg: false, disabled: false },
  { name: "Facebook",  href: "#",                                         icon: <FacebookLogo />,  glow: "24, 119, 242", whiteBg: false, disabled: true  },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  /* Back to top visibility */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Year — client-side only */
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden
      bg-gradient-to-br from-[#0a0518] via-[#0f0a1e] to-[#0a0518]">

      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full
        bg-purple-main/15 blur-[120px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full
        bg-pink-500/10 blur-[120px] animate-[pulseGlow_10s_ease-in-out_infinite_reverse] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at top, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* ===== TOP: Brand + Quick Links + Services ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* ===== Column 1: Brand ===== */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit">
              <div className="relative w-11 h-11 grid place-items-center rounded-full
                bg-gradient-to-br from-purple-main via-purple-light to-pink-500 text-white
                shadow-[0_0_20px_#7c3aed] animate-[pulseGlow_3s_ease-in-out_infinite]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M5 16L3 5l5.5 4L12 4l3.5 5L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
              </div>
              <span className="text-[22px] font-black tracking-tight font-[var(--font-display)]
                bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                bg-clip-text text-transparent bg-[length:200%_auto]
                animate-[shimmer_4s_linear_infinite]">
                Khizar Mughal
              </span>
            </Link>

            <p className="text-[14px] leading-relaxed font-medium text-purple-100/65 max-w-md mb-6">
              Full Stack Developer passionate about building modern, scalable web and
              mobile applications. From concept to launch — clean code, sharp design,
              and performance-first thinking.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIALS.map((s) => {
                const isDisabled = s.disabled === true;
                return isDisabled ? (
                  <span
                    key={s.name}
                    title={`${s.name} — Not available`}
                    className="relative w-10 h-10 grid place-items-center rounded-full
                      bg-red-500/[0.06] border border-dashed border-red-400/25
                      cursor-not-allowed opacity-60 select-none"
                  >
                    <span className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 grayscale opacity-50">
                      {s.icon}
                    </span>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 grid place-items-center
                      rounded-full bg-red-500 border-2 border-[#0a0518]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-1.5 h-1.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                      </svg>
                    </span>
                  </span>
                ) : (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.name}
                    style={{ ["--glow" as string]: s.glow }}
                    className="group relative w-10 h-10 grid place-items-center rounded-full
                      bg-white/[0.05] border border-purple-main/20
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-transparent
                      hover:bg-white/[0.1]
                      hover:shadow-[0_0_25px_rgba(var(--glow),0.5)]"
                  >
                    <span className={`w-5 h-5 grid place-items-center
                      [&>svg]:w-5 [&>svg]:h-5 transition-transform duration-300
                      ${s.whiteBg ? "bg-white rounded-full p-0.5" : ""}
                      group-hover:scale-110 group-hover:-rotate-6`}>
                      {s.icon}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ===== Column 2: Quick Links ===== */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-light mb-5
              flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-main" />
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2
                      text-[13.5px] font-semibold text-purple-100/65
                      hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-main/40
                      transition-all duration-300
                      group-hover:w-3 group-hover:bg-purple-light" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Column 3: Services ===== */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-light mb-5
              flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2
                      text-[13.5px] font-semibold text-purple-100/65
                      hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1 h-1 rounded-full bg-pink-500/40
                      transition-all duration-300
                      group-hover:w-3 group-hover:bg-pink-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== MIDDLE: Contact strip ===== */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12
          rounded-2xl p-5
          bg-white/[0.03] backdrop-blur-xl
          border border-purple-main/15">

          <a
            href="https://wa.me/923360534777"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 p-3 rounded-xl
              hover:bg-white/[0.04] transition-all duration-300"
          >
            <span className="w-10 h-10 shrink-0 grid place-items-center rounded-xl
              bg-white [&>svg]:w-6 [&>svg]:h-6 transition-transform duration-300
              group-hover:scale-110 group-hover:-rotate-6">
              <WhatsAppLogo />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-purple-100/50">
                WhatsApp
              </span>
              <span className="text-[13.5px] font-bold text-white truncate">
                +92 336 053 4777
              </span>
            </span>
          </a>

          <a
            href="mailto:zeltrixglobal2026@gmail.com"
            className="group flex items-center gap-3 p-3 rounded-xl
              hover:bg-white/[0.04] transition-all duration-300"
          >
            <span className="w-10 h-10 shrink-0 grid place-items-center rounded-xl
              bg-white [&>svg]:w-6 [&>svg]:h-6 transition-transform duration-300
              group-hover:scale-110 group-hover:-rotate-6">
              <GmailLogo />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-purple-100/50">
                Email
              </span>
              <span className="text-[13.5px] font-bold text-white truncate">
                zeltrixglobal2026@gmail.com
              </span>
            </span>
          </a>
        </div>

        {/* ===== BOTTOM: Copyright + Credits ===== */}
        <div className="pt-8 border-t border-purple-main/15
          flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-[12px] font-semibold text-purple-100/50 text-center sm:text-left">
            © {year ?? 2026}{" "}
            <span className="text-purple-light font-bold">Muhammad Khizar Mughal</span>
            {" · "}All rights reserved.
          </p>

          <p className="text-[11px] font-medium text-purple-100/40 text-center flex items-center gap-1.5 flex-wrap justify-center">
            Built with
            <span className="text-purple-light font-black">Next.js</span>
            <span className="text-purple-100/30">·</span>
            <span className="text-cyan-300 font-black">TypeScript</span>
            <span className="text-purple-100/30">·</span>
            <span className="text-pink-400 font-black">Tailwind CSS</span>
          </p>
        </div>
      </div>

      {/* ===== Floating Back-to-Top button ===== */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-[9998]
          w-12 h-12 grid place-items-center rounded-full
          bg-gradient-to-br from-purple-main to-pink-500 text-white
          shadow-[0_10px_30px_rgba(124,58,237,0.6)]
          border border-white/20
          transition-all duration-500
          hover:-translate-y-1 hover:scale-110
          hover:shadow-[0_15px_40px_rgba(236,72,153,0.7)]
          ${showTop
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-4 pointer-events-none"}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className="w-5 h-5">
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full
          bg-purple-main/40 animate-ping opacity-30 pointer-events-none" />
      </button>
    </footer>
  );
}