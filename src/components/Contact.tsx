"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  WhatsAppLogo,
  GmailLogo,
  InstagramLogo,
  LinkedInLogo,
  YouTubeLogo,
  FacebookLogo,
  GitHubLogo,
} from "./BrandIcons";

/* ================= TYPES ================= */
type ContactApp = {
  id: string;
  name: string;
  sub: string;
  href: string;
  qr: string;
  icon: ReactNode;
  accent: string;
  glow: string;
  available?: boolean;      // ← NEW: default true, false hoga toh not-available
  notAvailableNote?: string; // ← NEW: custom message
};

/* ================= DATA ================= */
const APPS: ContactApp[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    sub: "+92 336 053 4777",
    href: "https://wa.me/923360534777",
    qr: "https://wa.me/923360534777",
    icon: <WhatsAppLogo />,
    accent: "from-[#25D366] to-[#128C7E]",
    glow: "37, 211, 102",
  },
  {
    id: "gmail",
    name: "Gmail",
    sub: "zeltrixglobal2026@gmail.com",
    href: "mailto:zeltrixglobal2026@gmail.com",
    qr: "mailto:zeltrixglobal2026@gmail.com",
    icon: <GmailLogo />,
    accent: "from-[#EA4335] to-[#C5221F]",
    glow: "234, 67, 53",
  },
  {
    id: "instagram",
    name: "Instagram",
    sub: "@zeltrixglobal2026",
    href: "https://instagram.com/zeltrixglobal2026",
    qr: "https://instagram.com/zeltrixglobal2026",
    icon: <InstagramLogo />,
    accent: "from-[#f09433] via-[#dc2743] to-[#bc1888]",
    glow: "220, 39, 67",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    sub: "in/zeltrixglobal2026",
    href: "https://linkedin.com/in/zeltrixglobal2026",
    qr: "https://linkedin.com/in/zeltrixglobal2026",
    icon: <LinkedInLogo />,
    accent: "from-[#0077b5] to-[#00a0dc]",
    glow: "0, 119, 181",
  },
  {
    id: "github",
    name: "GitHub",
    sub: "github.com/zeltrixglobal2026",
    href: "https://github.com/zeltrixglobal2026",
    qr: "https://github.com/zeltrixglobal2026",
    icon: <GitHubLogo />,
    accent: "from-[#333333] to-[#0d1117]",
    glow: "110, 118, 129",
  },
  {
    id: "youtube",
    name: "YouTube",
    sub: "@zeltrixglobal2026",
    href: "https://youtube.com/@zeltrixglobal2026",
    qr: "https://youtube.com/@zeltrixglobal2026",
    icon: <YouTubeLogo />,
    accent: "from-[#ff0000] to-[#cc0000]",
    glow: "255, 0, 0",
  },
  {
    id: "facebook",
    name: "Facebook",
    sub: "Not Available",
    href: "#",
    qr: "",
    icon: <FacebookLogo />,
    accent: "from-[#1877f2] to-[#0d5fce]",
    glow: "24, 119, 242",
    available: false,
    notAvailableNote: "Facebook page is not available right now.",
  },
];

/* ================= APP CARD ================= */
function AppCard({ app, index }: { app: ContactApp; index: number }) {
  const [copied, setCopied] = useState(false);
  const isAvailable = app.available !== false;
  const isExternal = app.href.startsWith("http");

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    try {
      await navigator.clipboard.writeText(app.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div
      style={{
        animationDelay: `${index * 80}ms`,
        ["--glow" as string]: app.glow,
      }}
      className={`group relative rounded-3xl p-5 overflow-hidden
        bg-white/[0.04] backdrop-blur-2xl
        border transition-all duration-500
        ${isAvailable
          ? "border-purple-main/20 hover:border-transparent hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(var(--glow),0.4)]"
          : "border-purple-main/10 hover:-translate-y-1"}
        animate-[fadeUp_0.6s_ease-out_both]`}
    >
      {/* Hover brand gradient border — only when available */}
      {isAvailable && (
        <span
          className={`absolute inset-0 rounded-3xl p-[1.5px] opacity-0
            group-hover:opacity-100 transition-opacity duration-500
            bg-gradient-to-br ${app.accent}
            pointer-events-none`}
          style={{
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Corner glow */}
      <span
        className={`absolute -top-20 -right-20 w-44 h-44 rounded-full
          bg-gradient-to-br ${app.accent}
          transition-all duration-700
          ${isAvailable
            ? "opacity-[0.12] group-hover:opacity-40 group-hover:scale-125"
            : "opacity-[0.06]"}`}
      />

      {/* ===== HEADER: Icon + Name ===== */}
      <div className="relative flex items-center gap-3 mb-4">
        <span
          className={`w-11 h-11 shrink-0 grid place-items-center rounded-2xl
            bg-white dark:bg-white p-2.5
            [&>svg]:w-full [&>svg]:h-full
            border border-purple-main/15
            shadow-[0_6px_20px_rgba(var(--glow),0.25)]
            transition-transform duration-500
            ${isAvailable
              ? "group-hover:scale-110 group-hover:-rotate-6"
              : "opacity-50 grayscale"}`}
        >
          {app.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-black tracking-tight text-white leading-tight">
            {app.name}
          </h3>
          <p
            className={`text-[11px] font-medium truncate
              ${isAvailable
                ? "text-purple-100/55"
                : "text-red-300/70"}`}
          >
            {app.sub}
          </p>
        </div>
      </div>

      {/* ===== QR CODE / NOT AVAILABLE ===== */}
      {isAvailable ? (
        <div className="relative rounded-2xl p-3 mb-4
          bg-white overflow-hidden
          border-2 border-purple-main/15">

          {/* Scan line */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
            <span className="absolute left-0 right-0 h-8
              bg-gradient-to-b from-transparent via-purple-main/35 to-transparent
              animate-[scan_2.8s_ease-in-out_infinite]" />
          </span>

          <QRCodeSVG
            value={app.qr}
            size={180}
            level="H"
            bgColor="#ffffff"
            fgColor="#1e1b2e"
            marginSize={0}
            className="relative z-10 w-full h-auto rounded-lg"
          />

          {/* Corner brackets */}
          <span className="absolute top-1 left-1 w-4 h-4 border-t-[3px] border-l-[3px] border-purple-main/50 rounded-tl-md" />
          <span className="absolute top-1 right-1 w-4 h-4 border-t-[3px] border-r-[3px] border-purple-main/50 rounded-tr-md" />
          <span className="absolute bottom-1 left-1 w-4 h-4 border-b-[3px] border-l-[3px] border-purple-main/50 rounded-bl-md" />
          <span className="absolute bottom-1 right-1 w-4 h-4 border-b-[3px] border-r-[3px] border-purple-main/50 rounded-br-md" />
        </div>
      ) : (
        /* ===== NOT AVAILABLE STATE ===== */
        <div className="relative rounded-2xl py-8 px-4 mb-4
          bg-gradient-to-br from-red-500/[0.06] to-red-500/[0.02]
          border-2 border-dashed border-red-400/25
          flex flex-col items-center justify-center gap-3">

          {/* Broken icon */}
          <div className="relative w-14 h-14 grid place-items-center rounded-full
            bg-red-500/10 border border-red-400/25">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              className="w-6 h-6 text-red-400/80">
              <circle cx="12" cy="12" r="10" />
              <path d="M4.93 4.93l14.14 14.14" strokeLinecap="round" />
            </svg>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 grid place-items-center
              rounded-full bg-red-500 border-2 border-[#150c28]">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-2.5 h-2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-[12.5px] font-black tracking-tight text-red-300/90 uppercase">
              Not Available
            </p>
            <p className="mt-1 text-[10.5px] font-medium text-purple-100/45 max-w-[180px] leading-relaxed">
              {app.notAvailableNote}
            </p>
          </div>
        </div>
      )}

      {/* ===== BOTTOM: Open button + Copy ===== */}
      <div className="relative flex items-center gap-2">
        {isAvailable ? (
          <>
            {/* Main button — icon + name */}
            <a
              href={app.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className={`group/btn relative flex-1 inline-flex items-center justify-center gap-2
                px-4 py-3 rounded-xl
                bg-gradient-to-br ${app.accent} text-white
                text-[13px] font-extrabold tracking-tight
                shadow-[0_6px_20px_rgba(var(--glow),0.4)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:scale-[1.02]
                hover:shadow-[0_10px_30px_rgba(var(--glow),0.6)]
                overflow-hidden`}
            >
              <span className="absolute inset-0 rounded-xl overflow-hidden">
                <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-white/50 blur-md
                  -translate-x-full group-hover/btn:translate-x-[500%]
                  transition-transform duration-700 rotate-12" />
              </span>

              <span className="relative w-4 h-4 [&>svg]:w-4 [&>svg]:h-4 brightness-0 invert">
                {app.icon}
              </span>
              <span className="relative">{app.name}</span>
            </a>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              aria-label="Copy link"
              className="shrink-0 w-11 h-11 grid place-items-center rounded-xl
                bg-white/[0.06] backdrop-blur-xl
                border border-purple-main/20
                text-purple-100/70 hover:text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-purple-main/20 hover:border-purple-light/50
                hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)]"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="w-4 h-4 text-emerald-400">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </>
        ) : (
          /* Disabled state button */
          <button
            disabled
            className="relative flex-1 inline-flex items-center justify-center gap-2
              px-4 py-3 rounded-xl
              bg-white/[0.03] text-purple-100/30
              text-[13px] font-extrabold tracking-tight
              border border-dashed border-red-400/20
              cursor-not-allowed select-none"
          >
            <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4 opacity-40 brightness-0 invert">
              {app.icon}
            </span>
            <span>Not Available</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6
        bg-gradient-to-br from-[#0f0a1e] via-[#150c28] to-[#0f0a1e]"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
        bg-purple-main/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full
        bg-pink-500/15 blur-[140px] animate-[pulseGlow_10s_ease-in-out_infinite_reverse] pointer-events-none" />

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
              Contact
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight
            font-[var(--font-display)] leading-[1.05]">
            <span className="text-white">Let&apos;s </span>
            <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
              bg-clip-text text-transparent">
              connect
            </span>
          </h2>

          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
          </div>

          <p className="mt-6 text-[14.5px] md:text-[16px] leading-relaxed font-medium
            text-purple-100/70 max-w-2xl mx-auto">
            Pick any platform below — scan the QR code with your phone, or tap the button
            to open directly. Every link is one tap away.
          </p>
        </div>

        {/* ===== CARDS GRID ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {APPS.map((app, i) => (
            <AppCard key={app.id} app={app} index={i} />
          ))}
        </div>

        {/* ===== BOTTOM NOTE ===== */}
        <div className="mt-14 text-center">
          <p className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full
            bg-white/[0.04] backdrop-blur-xl border border-purple-main/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12.5px] font-bold tracking-tight text-purple-100/70">
              Available for freelance &amp; full-time opportunities
            </span>
          </p>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}