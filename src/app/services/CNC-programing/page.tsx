"use client";

/**
 * CNC Programming — poora page ek hi file mein
 *  • ServiceNavbar (aap ka navbar, Contact button ke sath)
 *  • ContactSidebar (inline brand icons)
 *  • Realistic textured 3D VMC + scroll animation + machine sounds (Web Audio)
 * Zaroori: npm i three && npm i -D @types/three   (Tailwind v4 pehle se hai)
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/* ═══════════════════════════ CSS ═══════════════════════════ */
const CSS = `
.cnc-root { --text:#f3eeff; --muted:#a79bc4; --glass:rgba(20,12,40,.62); --card:rgba(30,18,58,.92); --bd:rgba(168,85,247,.25); --p:#a855f7; --p2:#7c3aed; --glow:rgba(168,85,247,.55); position: relative; min-height: 100vh; background: #07040f; color: var(--text); }
@keyframes pulseGlow { 0%,100% { box-shadow: 0 0 10px #7c3aed; } 50% { box-shadow: 0 0 22px #a855f7, 0 0 6px #fff4; } }

.cnc-reveal { opacity: 0; transform: translateY(-80px) scale(.96); filter: blur(8px); transition: opacity .9s cubic-bezier(.2,.9,.2,1), transform .9s cubic-bezier(.2,.9,.2,1), filter .9s; will-change: transform, opacity; }
.cnc-reveal[data-in="true"] { opacity: 1; transform: none; filter: none; }
@media (prefers-reduced-motion: reduce) { .cnc-reveal { transition-duration: .01s; transform: none; filter: none; } }

.cnc-stage { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.cnc-stage canvas { display: block; width: 100%; height: 100%; }
.cnc-glow { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(60% 55% at 68% 52%, rgba(168,85,247,.22), transparent 70%); }

.cnc-hud { position: fixed; right: 22px; bottom: 22px; z-index: 6; display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 14px; background: var(--glass); backdrop-filter: blur(14px); box-shadow: 0 8px 30px -8px var(--glow), inset 0 0 0 1px var(--bd); font-size: 12px; letter-spacing: .08em; color: var(--text); }
.cnc-hud b { font-weight: 600; white-space: nowrap; }
.cnc-hud small { color: var(--muted); font-size: 11px; white-space: nowrap; }
.cnc-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--p); box-shadow: 0 0 12px var(--p); animation: cnc-blink 1.4s ease-in-out infinite; }
@keyframes cnc-blink { 50% { opacity: .3; } }
.cnc-bar { width: 70px; height: 4px; border-radius: 4px; background: var(--bd); overflow: hidden; }
.cnc-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--p2), var(--p)); box-shadow: 0 0 10px var(--p); transition: width .15s; }
.cnc-rail { position: fixed; right: 8px; top: 120px; bottom: 90px; width: 3px; z-index: 6; border-radius: 3px; background: var(--bd); overflow: hidden; }
.cnc-rail i { display: block; width: 100%; height: 100%; transform-origin: top; background: linear-gradient(180deg, var(--p2), var(--p)); box-shadow: 0 0 12px var(--p); }

.cnc-snd { position: fixed; left: 22px; bottom: 22px; z-index: 6; display: flex; align-items: center; gap: 10px; padding: 11px 18px; border: 0; cursor: pointer; border-radius: 999px; font: 600 12.5px inherit; letter-spacing: .06em; color: #fff; background: linear-gradient(135deg, #7c3aed, #a855f7); box-shadow: 0 8px 26px -6px rgba(168,85,247,.7); transition: transform .3s, box-shadow .3s; }
.cnc-snd:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 12px 34px -4px #a855f7; }
.cnc-snd svg { width: 18px; height: 18px; }
.cnc-snd[data-on="false"] { animation: cnc-ping 2s ease-in-out infinite; }
.cnc-snd[data-on="true"] { background: rgba(20,12,40,.75); box-shadow: inset 0 0 0 1.5px #a855f7; }
@keyframes cnc-ping { 0%,100% { box-shadow: 0 8px 26px -6px rgba(168,85,247,.7), 0 0 0 0 rgba(168,85,247,.55); } 60% { box-shadow: 0 8px 26px -6px rgba(168,85,247,.7), 0 0 0 14px rgba(168,85,247,0); } }

.cnc-content { position: relative; z-index: 2; }
.cnc-sec { min-height: 100vh; display: flex; align-items: center; padding: 110px clamp(20px, 6vw, 90px) 60px; }
.cnc-wrap { width: min(560px, 100%); }

.cnc-tag { display: inline-block; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; letter-spacing: .18em; color: var(--p); background: var(--bd); box-shadow: 0 0 20px var(--glow); margin-bottom: 18px; }
.cnc-title { font-size: clamp(38px, 6.4vw, 76px); line-height: 1.05; color: var(--text); font-weight: 800; }
.cnc-title em { font-style: normal; background: linear-gradient(90deg, var(--p), #e9d5ff, var(--p)); background-size: 200%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: cnc-flow 3s linear infinite; }
@keyframes cnc-flow { to { background-position: 200%; } }
.cnc-h2 { font-size: clamp(30px, 4.6vw, 52px); line-height: 1.1; color: var(--text); font-weight: 800; }
.cnc-h2::after { content: ""; display: block; width: 70px; height: 4px; margin-top: 14px; border-radius: 4px; background: linear-gradient(90deg, var(--p2), var(--p)); box-shadow: 0 0 16px var(--p); }
.cnc-lead { margin-top: 16px; color: var(--muted); line-height: 1.75; font-size: 15.5px; }

.cnc-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 28px; }
.cnc-btn { position: relative; overflow: hidden; display: inline-block; padding: 13px 26px; border: 0; cursor: pointer; border-radius: 14px; font: 600 14.5px inherit; color: #fff; text-decoration: none; background: linear-gradient(135deg, var(--p), var(--p2)); box-shadow: 0 8px 26px -6px var(--glow); transition: transform .3s, box-shadow .3s; }
.cnc-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 12px 34px -4px var(--p); }
.cnc-btn::after { content: ""; position: absolute; top: 0; left: -80%; width: 50%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.4), transparent); transform: skewX(-20deg); transition: left .7s; }
.cnc-btn:hover::after { left: 140%; }
.cnc-ghost { background: transparent; color: var(--text); box-shadow: inset 0 0 0 1.5px var(--p); }

.cnc-hint { display: flex; align-items: center; gap: 12px; margin-top: 40px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.cnc-hint span { width: 22px; height: 36px; border-radius: 12px; box-shadow: inset 0 0 0 2px var(--p); position: relative; }
.cnc-hint span::after { content: ""; position: absolute; left: 50%; top: 7px; width: 4px; height: 8px; margin-left: -2px; border-radius: 3px; background: var(--p); animation: cnc-wheel 1.6s ease-in-out infinite; }
@keyframes cnc-wheel { 0% { opacity: 0; transform: translateY(0); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(14px); } }

.cnc-steps, .cnc-cards { display: grid; gap: 14px; margin-top: 26px; }
.cnc-step, .cnc-card, .cnc-code { padding: 16px 18px; border-radius: 18px; background: var(--glass); backdrop-filter: blur(14px); box-shadow: inset 0 0 0 1px var(--bd); transition: transform .35s, box-shadow .35s; }
.cnc-step:hover, .cnc-card:hover { transform: translateX(8px); box-shadow: 0 14px 34px -12px var(--glow), inset 0 0 0 1px var(--p); }
.cnc-step { display: flex; gap: 16px; align-items: flex-start; }
.cnc-step b { font-size: 26px; font-weight: 700; color: var(--p); text-shadow: 0 0 16px var(--glow); }
.cnc-step h3, .cnc-card h3 { font-size: 16.5px; color: var(--text); font-weight: 700; }
.cnc-step p, .cnc-card p { margin-top: 4px; font-size: 13.5px; color: var(--muted); line-height: 1.6; }
.cnc-card em { display: inline-block; margin-top: 10px; padding: 4px 10px; border-radius: 999px; font-style: normal; font-size: 12px; font-family: monospace; color: var(--p); background: var(--bd); }

.cnc-codes { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 26px; }
.cnc-code { padding: 14px 16px; transition: transform .3s, box-shadow .3s; }
.cnc-code:hover { transform: translateY(-5px); box-shadow: 0 12px 30px -10px var(--glow), inset 0 0 0 1px var(--p); }
.cnc-code b { display: block; font-family: monospace; font-size: 20px; color: var(--p); text-shadow: 0 0 14px var(--glow); }
.cnc-code span { display: block; margin-top: 4px; font-size: 12.5px; color: var(--muted); line-height: 1.5; }
.cnc-sub { margin-top: 26px; font-size: 13px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--text); }
.cnc-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.cnc-chip { padding: 8px 14px; border-radius: 999px; font-size: 13px; color: var(--text); box-shadow: inset 0 0 0 1px var(--bd); background: var(--glass); backdrop-filter: blur(10px); }

@media (max-width: 820px) {
  .cnc-hud { right: 10px; bottom: 10px; padding: 8px 12px; font-size: 10px; }
  .cnc-snd { left: 10px; bottom: 56px; padding: 9px 14px; font-size: 11px; }
  .cnc-bar { width: 44px; }
  .cnc-sec { align-items: flex-end; padding-top: 100px; padding-bottom: 90px; }
  .cnc-wrap { padding: 20px; border-radius: 22px; background: var(--glass); backdrop-filter: blur(16px); box-shadow: inset 0 0 0 1px var(--bd); }
  .cnc-step, .cnc-card, .cnc-code { background: transparent; box-shadow: inset 0 0 0 1px var(--bd); }
}
`;

/* ═══════════════════════════ BRAND ICONS ═══════════════════════════ */
const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#25D366" /><path fill="#fff" d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.25-.1-.45-.15-.65.15-.2.3-.75.95-.9 1.15-.17.2-.33.22-.62.07-.3-.15-1.25-.46-2.37-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3 0-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49h-.55c-.2 0-.5.07-.77.37-.26.3-1 1-1 2.43 0 1.43 1.03 2.82 1.18 3.02.15.2 2.05 3.13 4.97 4.39.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.57-.35z" /></svg>
);
const GmailLogo = () => (
  <svg viewBox="0 0 24 24"><path fill="#EA4335" d="M2 6.5v11A1.5 1.5 0 003.5 19H6V9.8l6 4.4 6-4.4V19h2.5a1.5 1.5 0 001.5-1.5v-11c0-1.4-1.6-2.2-2.7-1.4L12 10.4 4.7 5.1C3.6 4.3 2 5.1 2 6.5z" /></svg>
);
const InstagramLogo = () => (
  <svg viewBox="0 0 24 24">
    <defs><linearGradient id="cncIg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#feda75" /><stop offset=".35" stopColor="#fa7e1e" /><stop offset=".6" stopColor="#d62976" /><stop offset="1" stopColor="#4f5bd5" /></linearGradient></defs>
    <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#cncIg)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="16.2" cy="7.8" r="1" fill="#fff" />
  </svg>
);
const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="4" fill="#0A66C2" /><path fill="#fff" d="M6.4 9.6h2.5V18H6.4V9.6zM7.65 5.7a1.45 1.45 0 110 2.9 1.45 1.45 0 010-2.9zM10.6 9.6H13v1.15c.4-.7 1.3-1.35 2.6-1.35 2.6 0 3.1 1.7 3.1 3.9V18h-2.5v-4.2c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V18h-2.5V9.6z" /></svg>
);
const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24"><rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#FF0000" /><path fill="#fff" d="M10 8.9v6.2l5.3-3.1z" /></svg>
);
const FacebookLogo = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1877F2" /><path fill="#fff" d="M13.2 19v-6.2h2.1l.4-2.5h-2.5V8.9c0-.7.3-1.3 1.4-1.3h1.2V5.4c-.2 0-1-.1-1.8-.1-2 0-3.3 1.2-3.3 3.4v1.6H8.6v2.5h2.1V19h2.5z" /></svg>
);
const GitHubLogo = () => (
  <svg viewBox="0 0 24 24"><path fill="#181717" d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.700 18.300 5 18.300 5c.7 1.700.3 2.900.1 3.200.8.800 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0012 .3" /></svg>
);

/* ═══════════════════════════ SERVICE NAVBAR ═══════════════════════════ */
function ServiceNavbar({ pageName, onContact }: { pageName: string; onContact: () => void }) {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] w-full px-0">
      <div className="relative mx-auto w-full max-w-[1280px]">
        {/* animated border */}
        <span className="absolute -inset-x-[1.5px] -bottom-[1.5px] -top-0 rounded-b-2xl overflow-hidden pointer-events-none">
          <span className="absolute inset-0 rounded-b-2xl bg-gradient-to-r from-[#7c3aed]/50 via-[#a855f7]/40 to-pink-500/50" />
          <span className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent blur-[2px] opacity-90 animate-[navTravel_4s_ease-in-out_infinite]" />
          <span className="absolute top-0 bottom-0 w-20 bg-gradient-to-l from-transparent via-[#a855f7] to-transparent blur-[2px] opacity-80 animate-[navTravelReverse_4s_ease-in-out_infinite_2s]" />
        </span>

        {/* inner bg */}
        <div className="relative rounded-b-2xl bg-[#0d0620]/95 backdrop-blur-2xl shadow-[0_8px_35px_rgba(124,58,237,0.35)] px-5 md:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3">
            {/* left: logo + page name */}
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/" className="shrink-0">
                <div className="relative w-9 h-9 grid place-items-center rounded-full bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-pink-500 text-white shadow-[0_0_12px_#7c3aed] animate-[pulseGlow_3s_ease-in-out_infinite]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M5 16L3 5l5.5 4L12 4l3.5 5L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                </div>
              </Link>
              <span className="w-px h-5 bg-[#a855f7]/25" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[9.5px] uppercase tracking-[0.22em] font-black text-purple-100/50 leading-none hidden sm:inline">Service</span>
                <span className="hidden sm:block text-purple-100/30 text-[11px]">·</span>
                <h1 className="text-[14px] md:text-[15px] font-black tracking-tight truncate bg-gradient-to-br from-[#a855f7] via-pink-400 to-[#7c3aed] bg-clip-text text-transparent leading-none">
                  {pageName}
                </h1>
              </div>
            </div>

            {/* right: contact + back */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onContact}
                className="group relative inline-flex items-center gap-1.5 px-3.5 md:px-4 py-1.5 rounded-full text-[12px] md:text-[12.5px] font-extrabold tracking-tight text-white border border-[#a855f7]/50 bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#7c3aed] hover:shadow-[0_6px_20px_#7c3aed] shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="w-3.5 h-3.5">
                  <path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Contact</span>
              </button>

              <Link
                href="/"
                className="group relative inline-flex items-center gap-1.5 px-3.5 md:px-4 py-1.5 rounded-full text-[12px] md:text-[12.5px] font-extrabold tracking-tight text-white bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-pink-500 shadow-[0_3px_12px_rgba(124,58,237,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_6px_20px_#7c3aed] overflow-hidden shrink-0"
              >
                <span className="absolute inset-0 rounded-full overflow-hidden">
                  <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-white/50 blur-md -translate-x-full group-hover:translate-x-[500%] transition-transform duration-700 rotate-12" />
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 relative transition-transform group-hover:-translate-x-0.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="relative hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes navTravel { 0% { left: -25%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
          @keyframes navTravelReverse { 0% { left: 100%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: -25%; opacity: 0; } }
        `}</style>
      </div>
    </nav>
  );
}

/* ═══════════════════════════ CONTACT SIDEBAR ═══════════════════════════ */
type Item = { id: string; name: string; href: string; sub: string; icon: ReactNode; glow: string; available?: boolean; whiteBg?: boolean };

const FOLLOW: Item[] = [
  { id: "instagram", name: "Instagram", href: "https://instagram.com/zeltrixglobal2026", sub: "@zeltrixglobal2026", icon: <InstagramLogo />, glow: "220, 39, 67" },
  { id: "linkedin", name: "LinkedIn", href: "https://linkedin.com/in/zeltrixglobal2026", sub: "in/zeltrixglobal2026", icon: <LinkedInLogo />, glow: "10, 102, 194" },
  { id: "github", name: "GitHub", href: "https://github.com/zeltrixglobal2026", sub: "github.com/zeltrixglobal2026", icon: <GitHubLogo />, glow: "110, 118, 129", whiteBg: true },
  { id: "youtube", name: "YouTube", href: "https://youtube.com/@zeltrixglobal2026", sub: "@zeltrixglobal2026", icon: <YouTubeLogo />, glow: "255, 0, 0" },
  { id: "facebook", name: "Facebook", href: "#", sub: "Not available", icon: <FacebookLogo />, glow: "24, 119, 242", available: false },
];
const CONNECT: Item[] = [
  { id: "whatsapp", name: "WhatsApp", href: "https://wa.me/923360534777", sub: "+92 336 053 4777", icon: <WhatsAppLogo />, glow: "37, 211, 102" },
  { id: "gmail", name: "Gmail", href: "mailto:zeltrixglobal2026@gmail.com", sub: "zeltrixglobal2026@gmail.com", icon: <GmailLogo />, glow: "234, 67, 53" },
];

function ContactSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const copy = async (item: Item) => {
    if (item.available === false) return;
    try {
      await navigator.clipboard.writeText(item.href);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {}
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{ backdropFilter: "blur(8px)", background: "rgba(10,4,25,0.55)" }}
        className={`fixed inset-0 z-[10000] transition-all duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-[10001] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative h-full flex flex-col bg-[#140c28]/95 backdrop-blur-2xl border-l border-[#a855f7]/25 shadow-[-20px_0_80px_rgba(124,58,237,0.4)]">
          <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7c3aed] via-pink-500 to-[#7c3aed] animate-pulse" />

          <div className="relative px-6 pt-6 pb-4 border-b border-[#a855f7]/20">
            <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 w-9 h-9 grid place-items-center rounded-full text-purple-100 hover:bg-red-500 hover:text-white transition-all duration-300 hover:rotate-90">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
            </button>
            <p className="text-[10px] uppercase tracking-[0.28em] font-black text-[#a855f7] mb-1">Get in touch</p>
            <h2 className="text-2xl font-black tracking-tight bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-pink-500 bg-clip-text text-transparent">Let&apos;s Connect</h2>
            <p className="mt-2 text-[12.5px] font-medium text-purple-100/60 leading-relaxed">WhatsApp, email or social platforms — pick whatever works best for you.</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60">Connect</span>
              </div>
              <ul className="flex flex-col gap-2">
                {CONNECT.map((c) => (
                  <li key={c.id}>
                    <div style={{ "--glow": c.glow } as CSSProperties} className="group relative flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-[#a855f7]/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_0_30px_rgba(var(--glow),0.35)]">
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="w-11 h-11 shrink-0 grid place-items-center rounded-full [&>svg]:w-6 [&>svg]:h-6 transition-transform duration-300 bg-white p-1.5 group-hover:scale-110 group-hover:-rotate-6">{c.icon}</span>
                        <span className="flex flex-col min-w-0">
                          <span className="text-[14px] font-bold text-purple-50">{c.name}</span>
                          <span className="text-[11.5px] text-purple-100/60 font-medium truncate">{c.sub}</span>
                        </span>
                      </a>
                      <button onClick={() => copy(c)} aria-label="Copy" className="w-8 h-8 shrink-0 grid place-items-center rounded-full text-purple-200 hover:bg-[#7c3aed] hover:text-white transition-all duration-300">
                        {copiedId === c.id ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-500"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" /></svg>
                        )}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60">Follow</span>
              </div>
              <ul className="grid grid-cols-2 gap-2.5">
                {FOLLOW.map((s) => {
                  const disabled = s.available === false;
                  return (
                    <li key={s.id}>
                      {disabled ? (
                        <div className="relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-red-500/[0.06] border border-dashed border-red-400/25 cursor-not-allowed select-none opacity-90">
                          <span className="absolute top-2 right-2 w-5 h-5 grid place-items-center rounded-full bg-red-500/15 border border-red-400/30">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-3 h-3 text-red-400"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" /></svg>
                          </span>
                          <span className="w-10 h-10 grid place-items-center [&>svg]:w-10 [&>svg]:h-10 grayscale opacity-50">{s.icon}</span>
                          <span className="text-[12.5px] font-bold text-red-300/80">{s.name}</span>
                          <span className="text-[10px] font-semibold text-red-300/60 text-center truncate w-full uppercase tracking-wider">Not available</span>
                        </div>
                      ) : (
                        <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ "--glow": s.glow } as CSSProperties} className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.04] border border-[#a855f7]/20 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_0_30px_rgba(var(--glow),0.4)]">
                          <span className={`w-10 h-10 grid place-items-center rounded-full [&>svg]:w-10 [&>svg]:h-10 transition-transform duration-300 ${s.whiteBg ? "bg-white p-1 shadow-[0_2px_10px_rgba(0,0,0,0.2)]" : ""} group-hover:scale-110 group-hover:-rotate-6`}>{s.icon}</span>
                          <span className="text-[12.5px] font-bold text-purple-50">{s.name}</span>
                          <span className="text-[10px] text-purple-100/55 font-medium text-center truncate w-full">{s.sub}</span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-[#a855f7]/20">
            <p className="text-center text-[11px] font-semibold tracking-wider text-purple-100/55">© Muhammad Khizar Mughal · Portfolio</p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ═══════════════════════════ HELPERS ═══════════════════════════ */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const TOP_Y = 1.46;
const DEPTH = 0.1;
const TOOL_LEN = 1.45;
const SAFE_HEAD = TOP_Y + 0.45 + TOOL_LEN;
const CUT_HEAD = TOP_Y - DEPTH + TOOL_LEN;
const TOOL_R = 0.07;

const CAMS: { p: number; pos: number[]; tgt: number[] }[] = [
  { p: 0.0, pos: [6.8, 3.8, 9.2], tgt: [0, 2.0, 0] },
  { p: 0.1, pos: [4.6, 3.1, 7.6], tgt: [0, 1.9, 0.3] },
  { p: 0.26, pos: [1.0, 2.6, 4.6], tgt: [0, 1.8, 0.3] },
  { p: 0.38, pos: [1.6, 2.35, 2.9], tgt: [0, 1.5, 0] },
  { p: 0.62, pos: [-1.5, 2.2, 2.6], tgt: [0, 1.45, 0] },
  { p: 0.84, pos: [1.7, 2.5, 3.2], tgt: [0, 1.5, 0] },
  { p: 0.93, pos: [4.0, 3.3, 7.2], tgt: [0, 2.0, 0] },
  { p: 1.0, pos: [-3.8, 3.5, 8.4], tgt: [0, 2.0, 0] },
];

const GCODE = [
  "%", "O0001 (SQUARE POCKET)", "G21 G90 G17", "T01 M06", "S1200 M03",
  "G00 X-80. Y-45.", "G00 Z5.", "G01 Z-10. F100", "G01 X80. F300",
  "G01 Y-34.", "G01 X-80.", "G01 Y-23.", "G01 X80.", "G01 Y-11.", "G01 X-80.",
  "(REPEAT ROWS...)", "G00 Z50.", "M05", "M30", "%",
];

const PATH_N = 900;
function buildPath() {
  const X0 = -0.8, X1 = 0.8, Z0 = -0.45, Z1 = 0.45, rows = 9;
  const pts: [number, number][] = [];
  for (let i = 0; i < rows; i++) {
    const z = Z0 + ((Z1 - Z0) * i) / (rows - 1);
    const [a, b] = i % 2 === 0 ? [X0, X1] : [X1, X0];
    pts.push([a, z], [b, z]);
  }
  const seg: number[] = [0];
  for (let i = 1; i < pts.length; i++)
    seg.push(seg[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = seg[seg.length - 1];
  const out = new Float32Array(PATH_N * 2);
  let j = 1;
  for (let k = 0; k < PATH_N; k++) {
    const d = (total * k) / (PATH_N - 1);
    while (j < seg.length - 1 && seg[j] < d) j++;
    const t = (d - seg[j - 1]) / Math.max(1e-6, seg[j] - seg[j - 1]);
    out[k * 2] = lerp(pts[j - 1][0], pts[j][0], t);
    out[k * 2 + 1] = lerp(pts[j - 1][1], pts[j][1], t);
  }
  return out;
}

type Dro = { line: number; x: number; y: number; z: number; rpm: number; pct: number };

function drawScreen(ctx: CanvasRenderingContext2D, W: number, H: number, st: Dro) {
  ctx.fillStyle = "#07030f";
  ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, "#7c3aed");
  g.addColorStop(1, "#c084fc");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, 34);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 18px monospace";
  ctx.fillText("CNC CONTROL    AUTO    O0001", 12, 23);
  ctx.fillStyle = "#120a24";
  ctx.fillRect(10, 44, 300, H - 54);
  ctx.font = "16px monospace";
  const start = Math.max(0, Math.min(GCODE.length - 11, st.line - 4));
  for (let i = 0; i < 11; i++) {
    const idx = start + i;
    const y = 68 + i * 24;
    if (idx === st.line) {
      ctx.fillStyle = "rgba(168,85,247,.5)";
      ctx.fillRect(14, y - 17, 292, 24);
    }
    ctx.fillStyle = idx === st.line ? "#fff" : "#b9a7e0";
    ctx.fillText(GCODE[idx] ?? "", 22, y);
  }
  ctx.fillStyle = "#120a24";
  ctx.fillRect(320, 44, 182, H - 54);
  ctx.font = "bold 20px monospace";
  const rows: [string, string, string][] = [
    ["X", st.x.toFixed(2), "#c084fc"],
    ["Y", st.y.toFixed(2), "#67e8f9"],
    ["Z", st.z.toFixed(2), "#86efac"],
  ];
  rows.forEach(([a, v, c], i) => {
    ctx.fillStyle = c;
    ctx.fillText(a, 332, 84 + i * 40);
    ctx.fillStyle = "#fff";
    ctx.fillText(v.padStart(9, " "), 360, 84 + i * 40);
  });
  ctx.font = "15px monospace";
  ctx.fillStyle = "#b9a7e0";
  ctx.fillText("S " + Math.round(st.rpm), 332, 218);
  ctx.fillText("F 300", 332, 242);
  ctx.fillStyle = "#2a1650";
  ctx.fillRect(332, 268, 158, 14);
  ctx.fillStyle = "#a855f7";
  ctx.fillRect(332, 268, 1.58 * st.pct, 14);
  ctx.fillStyle = "#fff";
  ctx.fillText(st.pct + "%", 332, 304);
}

/* ═══════════════════════════ PROCEDURAL TEXTURES ═══════════════════════════ */
const rnd = Math.random;
const mkCanvas = (w: number, h: number) => {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return c;
};
const shade = (a: number) => {
  const v = rnd() < 0.5 ? 255 : 0;
  return `rgba(${v},${v},${v},${a})`;
};

/** brushed metal — lambe streaks */
function brushedCanvas(base: string, streak: number) {
  const c = mkCanvas(512, 512), x = c.getContext("2d")!;
  x.fillStyle = base; x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2800; i++) {
    const y = rnd() * 512, xx = rnd() * 512, len = 40 + rnd() * 320;
    x.strokeStyle = shade(rnd() * streak);
    x.lineWidth = 0.5 + rnd() * 1.2;
    x.beginPath(); x.moveTo(xx, y); x.lineTo(xx + len, y + (rnd() - 0.5) * 1.5); x.stroke();
  }
  return c;
}
/** fine per-pixel grain (gray) */
function grainCanvas(n: number, amp: number) {
  const c = mkCanvas(n, n), x = c.getContext("2d")!;
  const id = x.createImageData(n, n);
  for (let i = 0; i < n * n; i++) {
    const v = 128 + (rnd() - 0.5) * amp;
    id.data[i * 4] = id.data[i * 4 + 1] = id.data[i * 4 + 2] = v;
    id.data[i * 4 + 3] = 255;
  }
  x.putImageData(id, 0, 0);
  return c;
}
/** soft blobs — paint ki "orange peel" */
function peelCanvas() {
  const small = grainCanvas(48, 90);
  const c = mkCanvas(256, 256), x = c.getContext("2d")!;
  x.imageSmoothingEnabled = true;
  x.drawImage(small, 0, 0, 256, 256);
  return c;
}
/** cast iron — grinding arcs + speckle */
function castCanvas() {
  const c = mkCanvas(512, 512), x = c.getContext("2d")!;
  x.fillStyle = "#555963"; x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 9000; i++) { x.fillStyle = shade(rnd() * 0.09); x.fillRect(rnd() * 512, rnd() * 512, 1 + rnd() * 2, 1 + rnd() * 2); }
  for (let i = 0; i < 70; i++) {
    x.strokeStyle = shade(0.03 + rnd() * 0.05);
    x.lineWidth = 0.6 + rnd() * 1.2;
    x.beginPath(); x.arc(rnd() * 512, rnd() * 512, 80 + rnd() * 300, rnd() * 6.28, rnd() * 6.28 + 1.2); x.stroke();
  }
  return c;
}
/** epoxy shop floor — speckle + scratches + slab seams */
function floorCanvas() {
  const c = mkCanvas(512, 512), x = c.getContext("2d")!;
  x.fillStyle = "#1a1424"; x.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 14000; i++) { x.fillStyle = shade(rnd() * 0.07); x.fillRect(rnd() * 512, rnd() * 512, 1 + rnd() * 2, 1 + rnd() * 2); }
  for (let i = 0; i < 90; i++) {
    x.strokeStyle = `rgba(255,255,255,${0.02 + rnd() * 0.05})`;
    x.lineWidth = 0.5 + rnd();
    const sx = rnd() * 512, sy = rnd() * 512;
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + (rnd() - 0.5) * 90, sy + (rnd() - 0.5) * 90); x.stroke();
  }
  x.strokeStyle = "rgba(0,0,0,.65)"; x.lineWidth = 3;
  x.strokeRect(0, 0, 512, 512);
  return c;
}
/** diamond tread plate */
function diamondCanvas() {
  const c = mkCanvas(256, 256), x = c.getContext("2d")!;
  x.fillStyle = "#454955"; x.fillRect(0, 0, 256, 256);
  const s = 32;
  for (let j = 0; j < 8; j++)
    for (let i = 0; i < 8; i++) {
      const cx = i * s + s / 2, cy = j * s + s / 2;
      ([[-8, -8, Math.PI / 4], [8, 8, -Math.PI / 4]] as const).forEach(([dx, dy, r]) => {
        x.save(); x.translate(cx + dx, cy + dy); x.rotate(r);
        const g = x.createLinearGradient(0, -4, 0, 4);
        g.addColorStop(0, "#c2c7d2"); g.addColorStop(1, "#6d7380");
        x.fillStyle = g; x.beginPath(); x.ellipse(0, 0, 10, 3.6, 0, 0, Math.PI * 2); x.fill();
        x.restore();
      });
    }
  return c;
}
/** warning / spec decals */
function decalCanvas(kind: "danger" | "caution" | "spec") {
  const c = mkCanvas(512, 256), x = c.getContext("2d")!;
  x.textBaseline = "middle";
  if (kind === "spec") {
    x.fillStyle = "#b8bcc7"; x.fillRect(0, 0, 512, 256);
    x.strokeStyle = "#555"; x.lineWidth = 6; x.strokeRect(6, 6, 500, 244);
    x.fillStyle = "#1b1d24"; x.font = "bold 34px monospace";
    ["MODEL   X-MILL 5000", "SPINDLE 12000 RPM", "POWER   7.5 kW", "TRAVEL  X800 Y450 Z500", "S/N     CNC-2026-001"].forEach((t, i) => x.fillText(t, 22, 42 + i * 46));
  } else {
    x.fillStyle = kind === "danger" ? "#facc15" : "#fb923c"; x.fillRect(0, 0, 512, 256);
    x.fillStyle = "#111"; x.fillRect(0, 0, 512, 22); x.fillRect(0, 234, 512, 22);
    x.beginPath(); x.moveTo(90, 40); x.lineTo(170, 190); x.lineTo(10, 190); x.closePath(); x.fill();
    x.fillStyle = kind === "danger" ? "#facc15" : "#fb923c"; x.font = "bold 90px sans-serif"; x.textAlign = "center"; x.fillText("!", 90, 140);
    x.fillStyle = "#111"; x.textAlign = "left";
    x.font = "bold 46px sans-serif"; x.fillText(kind === "danger" ? "DANGER" : "CAUTION", 195, 78);
    x.font = "bold 25px sans-serif";
    (kind === "danger" ? ["ROTATING SPINDLE", "KEEP DOOR CLOSED", "DURING OPERATION"] : ["HOT CHIPS", "WEAR EYE PROTECTION", "STOP BEFORE OPENING"]).forEach((t, i) => x.fillText(t, 195, 125 + i * 32));
  }
  return c;
}

/* ═══════════════════════════ MACHINE SOUND (Web Audio, koi file nahi) ═══════════════════════════ */
class MachineAudio {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sp1!: OscillatorNode; private sp2!: OscillatorNode;
  private spGain!: GainNode; private spFilter!: BiquadFilterNode;
  private cutFilter!: BiquadFilterNode; private cutGain!: GainNode; private lfo!: OscillatorNode;
  private squeal!: OscillatorNode; private sqGain!: GainNode;
  private doorGain!: GainNode; private rumble!: OscillatorNode; private rumbleGain!: GainNode;
  private noise!: AudioBuffer;
  on = false;

  private build() {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;
    const comp = ctx.createDynamicsCompressor();
    comp.connect(ctx.destination);
    this.master = ctx.createGain(); this.master.gain.value = 0; this.master.connect(comp);

    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const loopNoise = () => { const s = ctx.createBufferSource(); s.buffer = this.noise; s.loop = true; s.start(); return s; };

    // spindle motor whine
    this.sp1 = ctx.createOscillator(); this.sp1.type = "sawtooth";
    this.sp2 = ctx.createOscillator(); this.sp2.type = "triangle";
    this.spFilter = ctx.createBiquadFilter(); this.spFilter.type = "lowpass"; this.spFilter.frequency.value = 900;
    this.spGain = ctx.createGain(); this.spGain.gain.value = 0;
    this.sp1.connect(this.spFilter); this.sp2.connect(this.spFilter);
    this.spFilter.connect(this.spGain); this.spGain.connect(this.master);
    this.sp1.start(); this.sp2.start();

    // cutting: filtered noise chopped at tooth-pass frequency
    this.cutFilter = ctx.createBiquadFilter(); this.cutFilter.type = "bandpass"; this.cutFilter.frequency.value = 1800; this.cutFilter.Q.value = 1.4;
    const chatter = ctx.createGain(); chatter.gain.value = 0.5;
    this.lfo = ctx.createOscillator(); this.lfo.frequency.value = 40;
    const lfoDepth = ctx.createGain(); lfoDepth.gain.value = 0.5;
    this.lfo.connect(lfoDepth); lfoDepth.connect(chatter.gain); this.lfo.start();
    this.cutGain = ctx.createGain(); this.cutGain.gain.value = 0;
    loopNoise().connect(this.cutFilter); this.cutFilter.connect(chatter); chatter.connect(this.cutGain); this.cutGain.connect(this.master);
    this.squeal = ctx.createOscillator(); this.squeal.frequency.value = 3100;
    this.sqGain = ctx.createGain(); this.sqGain.gain.value = 0;
    this.squeal.connect(this.sqGain); this.sqGain.connect(this.master); this.squeal.start();

    // door sliding
    const doorF = ctx.createBiquadFilter(); doorF.type = "bandpass"; doorF.frequency.value = 650; doorF.Q.value = 0.7;
    this.doorGain = ctx.createGain(); this.doorGain.gain.value = 0;
    loopNoise().connect(doorF); doorF.connect(this.doorGain); this.doorGain.connect(this.master);
    this.rumble = ctx.createOscillator(); this.rumble.frequency.value = 62;
    this.rumbleGain = ctx.createGain(); this.rumbleGain.gain.value = 0;
    this.rumble.connect(this.rumbleGain); this.rumbleGain.connect(this.master); this.rumble.start();
  }

  async toggle() {
    if (!this.ctx) this.build();
    const ctx = this.ctx!;
    if (!this.on) {
      await ctx.resume();
      this.on = true;
      this.master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.1);
    } else {
      this.on = false;
      this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
    }
    return this.on;
  }

  update(spin: number, cut: number, door: number) {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime;
    const f = 70 + spin * 230;
    this.sp1.frequency.setTargetAtTime(f, t, 0.08);
    this.sp2.frequency.setTargetAtTime(f * 2.01, t, 0.08);
    this.spFilter.frequency.setTargetAtTime(500 + spin * 1800, t, 0.1);
    this.spGain.gain.setTargetAtTime(spin > 0.02 ? spin * 0.11 : 0, t, 0.1);
    this.lfo.frequency.setTargetAtTime(20 + spin * 70, t, 0.1);
    this.cutFilter.frequency.setTargetAtTime(1400 + spin * 1400, t, 0.1);
    this.cutGain.gain.setTargetAtTime(cut * 0.35, t, 0.08);
    this.squeal.frequency.setTargetAtTime(2800 + spin * 600, t, 0.1);
    this.sqGain.gain.setTargetAtTime(cut * 0.012, t, 0.1);
    this.doorGain.gain.setTargetAtTime(door * 0.25, t, 0.05);
    this.rumbleGain.gain.setTargetAtTime(door * 0.16, t, 0.05);
    this.rumble.frequency.setTargetAtTime(55 + door * 25, t, 0.1);
  }

  clunk() {
    if (!this.ctx || !this.on) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const s = ctx.createBufferSource(); s.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.3);
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.2);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.6, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.connect(og); og.connect(this.master); o.start(t); o.stop(t + 0.3);
  }

  dispose() {
    this.on = false;
    this.ctx?.close();
    this.ctx = null;
  }
}

/* ═══════════════════════════ 3D SCENE ═══════════════════════════ */
function CncScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<MachineAudio | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [hud, setHud] = useState({ label: "MACHINE READY", pct: 0, p: 0 });

  const toggleSound = async () => {
    if (!audioRef.current) audioRef.current = new MachineAudio();
    setSoundOn(await audioRef.current.toggle());
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = new RoomEnvironment();
    scene.environment = pmrem.fromScene(env, 0.04).texture;
    (scene as unknown as { environmentIntensity: number }).environmentIntensity = 0.6;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    /* ───────── textures ───────── */
    const aniso = renderer.capabilities.getMaxAnisotropy();
    const texes: THREE.Texture[] = [];
    const mk = (c: HTMLCanvasElement, rx = 1, ry = 1, srgb = true) => {
      const t = new THREE.CanvasTexture(c);
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(rx, ry);
      t.anisotropy = aniso;
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
      texes.push(t);
      return t;
    };
    const cLight = brushedCanvas("#b4bac6", 0.16);
    const cDark = brushedCanvas("#4d525e", 0.12);
    const cAlu = brushedCanvas("#c3c7d0", 0.2);
    const cPeel = peelCanvas();
    const cGrain = grainCanvas(256, 60);
    const cCast = castCanvas();
    const cDiamond = diamondCanvas();

    /* ───────── materials ───────── */
    const M = {
      paint: new THREE.MeshPhysicalMaterial({ color: 0xe6e8ef, roughness: 0.42, metalness: 0.1, clearcoat: 0.7, clearcoatRoughness: 0.25, bumpMap: mk(cPeel, 3, 3, false), bumpScale: 0.25 }),
      char: new THREE.MeshPhysicalMaterial({ color: 0x2a2d37, roughness: 0.5, metalness: 0.35, clearcoat: 0.4, clearcoatRoughness: 0.35, bumpMap: mk(cGrain, 4, 4, false), bumpScale: 0.4 }),
      accent: new THREE.MeshPhysicalMaterial({ color: 0x7c3aed, roughness: 0.35, metalness: 0.2, clearcoat: 0.9, emissive: 0x3b0f8f, emissiveIntensity: 0.4, bumpMap: mk(cPeel, 3, 3, false), bumpScale: 0.2 }),
      steel: new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(cLight), bumpMap: mk(cLight, 1, 1, false), bumpScale: 0.6, metalness: 0.95, roughness: 0.34 }),
      stain: new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(cAlu), bumpMap: mk(cAlu, 1, 1, false), bumpScale: 0.5, metalness: 1, roughness: 0.24 }),
      cast: new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(cCast), bumpMap: mk(cCast, 1, 1, false), bumpScale: 0.8, metalness: 0.8, roughness: 0.5 }),
      liner: new THREE.MeshStandardMaterial({ color: 0x1b1d24, metalness: 0.4, roughness: 0.7, bumpMap: mk(cGrain, 6, 6, false), bumpScale: 0.6 }),
      rubber: new THREE.MeshStandardMaterial({ color: 0x0c0d10, metalness: 0.1, roughness: 0.92, bumpMap: mk(cGrain, 3, 3, false), bumpScale: 0.8 }),
      cover: new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(cDark), bumpMap: mk(cDark, 1, 1, false), bumpScale: 0.5, metalness: 0.8, roughness: 0.42 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x9db4ff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false }),
      gold: new THREE.MeshStandardMaterial({ color: 0xd4a72c, metalness: 1, roughness: 0.25 }),
      led: new THREE.MeshBasicMaterial({ color: 0xc084fc }),
      ledW: new THREE.MeshBasicMaterial({ color: 0xf1e9ff }),
      red: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35, metalness: 0.2 }),
      yellow: new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5, metalness: 0.1 }),
      green: new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.35, metalness: 0.2 }),
      tread: new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(cDiamond, 6, 2), bumpMap: mk(cDiamond, 6, 2, false), bumpScale: 1.4, metalness: 0.85, roughness: 0.4 }),
    };
    const lampG = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.1 });
    const lampY = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xfacc15, emissiveIntensity: 0.1 });
    const lampR = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.1 });

    const rb = (w: number, h: number, d: number, r = 0.03) =>
      new RoundedBoxGeometry(w, h, d, 2, Math.max(0.002, Math.min(r, Math.min(w, h, d) / 2 - 0.002)));
    const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
    const cyl = (rt: number, rbm: number, h: number, s = 40) => new THREE.CylinderGeometry(rt, rbm, h, s);
    const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material | THREE.Material[], x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    };
    const decal = (parent: THREE.Object3D, kind: "danger" | "caution" | "spec", w: number, h: number, x: number, y: number, z: number) => {
      const t = mk(decalCanvas(kind), 1, 1);
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      return add(parent, new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0.05 }), x, y, z);
    };
    const bolt = (parent: THREE.Object3D, x: number, y: number, z: number) =>
      add(parent, cyl(0.022, 0.022, 0.016, 12).rotateX(Math.PI / 2), M.steel, x, y, z);

    const machine = new THREE.Group();
    scene.add(machine);

    /* ───────── floor + operator step ───────── */
    const fc = mkCanvas(256, 256);
    const fx = fc.getContext("2d")!;
    const fg = fx.createRadialGradient(128, 128, 10, 128, 128, 128);
    fg.addColorStop(0, "#fff"); fg.addColorStop(0.55, "#aaa"); fg.addColorStop(1, "#000");
    fx.fillStyle = fg; fx.fillRect(0, 0, 256, 256);
    const alphaT = new THREE.CanvasTexture(fc);
    texes.push(alphaT);
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(18, 96),
      new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(floorCanvas(), 8, 8), bumpMap: mk(cGrain, 24, 24, false), bumpScale: 0.5, metalness: 0.45, roughness: 0.38, transparent: true, alphaMap: alphaT })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    const grid = new THREE.GridHelper(32, 64, 0x7c3aed, 0x2a1650);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.14;
    grid.position.y = 0.004;
    scene.add(grid);
    const ring = new THREE.Mesh(new THREE.RingGeometry(4.35, 4.4, 128), M.led);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.007;
    scene.add(ring);
    add(machine, rb(3.4, 0.05, 1.0, 0.012), M.tread, 0, 0.026, 2.15); // operator step plate

    /* ───────── base / cabinet ───────── */
    [[-1.9, -1.2], [1.9, -1.2], [-1.9, 1.2], [1.9, 1.2], [0, -1.2], [0, 1.2]].forEach(([x, z]) => {
      add(machine, cyl(0.13, 0.15, 0.12), M.rubber, x, 0.06, z);
      add(machine, cyl(0.07, 0.07, 0.03), M.steel, x, 0.13, z);
    });
    add(machine, rb(4.4, 0.18, 2.9, 0.04), M.char, 0, 0.21, 0);
    add(machine, rb(4.3, 0.7, 2.8, 0.05), M.paint, 0, 0.65, 0);
    const hazard = mkCanvas(512, 32);
    {
      const c = hazard.getContext("2d")!;
      c.fillStyle = "#facc15"; c.fillRect(0, 0, 512, 32);
      c.fillStyle = "#111";
      for (let x = -32; x < 544; x += 40) { c.beginPath(); c.moveTo(x, 32); c.lineTo(x + 16, 0); c.lineTo(x + 32, 0); c.lineTo(x + 16, 32); c.fill(); }
    }
    add(machine, new THREE.PlaneGeometry(4.0, 0.1), new THREE.MeshBasicMaterial({ map: mk(hazard, 1, 1) }), 0, 0.2, 1.456);
    add(machine, rb(1.6, 0.46, 0.03, 0.01), M.liner, 1.2, 0.65, 1.4);
    for (let i = 0; i < 12; i++) add(machine, box(0.9, 0.012, 0.01), M.rubber, -1.2, 0.46 + i * 0.03, 1.405);
    add(machine, box(3.9, 0.022, 0.02), M.led, 0, 0.34, 1.405);
    add(machine, box(0.02, 0.022, 2.5), M.led, 2.16, 0.34, 0);
    add(machine, box(0.02, 0.022, 2.5), M.led, -2.16, 0.34, 0);
    const nameC = mkCanvas(512, 128);
    {
      const c = nameC.getContext("2d")!;
      c.fillStyle = "#12131a"; c.fillRect(0, 0, 512, 128);
      c.shadowColor = "#a855f7"; c.shadowBlur = 16;
      c.fillStyle = "#e9d5ff"; c.font = "bold 64px sans-serif"; c.textBaseline = "middle";
      c.fillText("X-MILL 5000", 22, 62);
    }
    const nameT = mk(nameC, 1, 1);
    nameT.wrapS = nameT.wrapT = THREE.ClampToEdgeWrapping;
    add(machine, new THREE.PlaneGeometry(0.9, 0.225), new THREE.MeshBasicMaterial({ map: nameT, toneMapped: false }), 1.2, 0.8, 1.418);

    add(machine, box(4.2, 0.02, 1.9), M.liner, 0, 1.006, 0.45);
    add(machine, box(3.6, 2.5, 0.02), M.liner, 0, 2.25, -0.49);

    /* ───────── column ───────── */
    add(machine, rb(2.8, 2.95, 0.9, 0.06), M.paint, 0, 2.475, -0.95);
    [-1.6, 1.6].forEach((x) => add(machine, rb(0.5, 2.95, 1.25, 0.06), M.paint, x, 2.475, -0.78));
    add(machine, rb(3.8, 0.14, 1.15, 0.04), M.char, 0, 4.03, -0.88);
    add(machine, box(3.7, 0.03, 1.1), M.accent, 0, 3.95, -0.88);
    [-0.55, 0.55].forEach((x) => {
      add(machine, box(0.07, 2.5, 0.05), M.steel, x, 2.7, -0.52);
      add(machine, box(0.05, 2.5, 0.015), M.liner, x, 2.7, -0.49);
    });

    add(machine, cyl(0.025, 0.025, 0.28), M.steel, -1.45, 4.24, -0.95);
    add(machine, cyl(0.075, 0.075, 0.03), M.char, -1.45, 4.11, -0.95);
    ([[lampG, 4.32], [lampY, 4.43], [lampR, 4.54]] as [THREE.Material, number][]).forEach(([m, y]) => add(machine, cyl(0.07, 0.07, 0.1, 24), m, -1.45, y, -0.95));
    add(machine, cyl(0.075, 0.05, 0.03), M.char, -1.45, 4.62, -0.95);

    /* tool changer */
    const atc = new THREE.Group();
    atc.position.set(-2.0, 3.2, -0.88);
    machine.add(atc);
    add(atc, cyl(0.58, 0.58, 0.16).rotateX(Math.PI / 2), M.char, 0, 0, -0.14);
    add(atc, cyl(0.5, 0.5, 0.1).rotateX(Math.PI / 2), M.steel);
    add(atc, cyl(0.13, 0.13, 0.22).rotateX(Math.PI / 2), M.accent);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const x = Math.cos(a) * 0.4, y = Math.sin(a) * 0.4;
      add(atc, cyl(0.055, 0.03, 0.14).rotateX(Math.PI / 2), M.stain, x, y, 0.1);
      add(atc, cyl(0.025, 0.025, 0.2).rotateX(Math.PI / 2), i % 3 === 0 ? M.gold : M.steel, x, y, 0.27);
    }

    /* ───────── spindle head ───────── */
    const head = new THREE.Group();
    head.position.set(0, SAFE_HEAD, 0);
    machine.add(head);
    add(head, rb(1.25, 1.15, 0.22, 0.04), M.char, 0, 0, -0.42);
    [-0.55, 0.55].forEach((x) => add(head, rb(0.14, 0.34, 0.1, 0.02), M.steel, x, 0, -0.55));
    add(head, rb(0.95, 0.95, 0.72, 0.07), M.paint);
    add(head, rb(0.97, 0.07, 0.74, 0.02), M.accent, 0, 0.2, 0);
    add(head, cyl(0.24, 0.24, 0.3), M.char, 0, 0.62, 0);
    for (let i = 0; i < 5; i++) add(head, cyl(0.31, 0.31, 0.03), M.steel, 0, 0.5 + i * 0.055, 0);
    add(head, cyl(0.2, 0.2, 0.06), M.accent, 0, 0.8, 0);
    add(head, cyl(0.26, 0.22, 0.15), M.steel, 0, -0.55, 0);
    add(head, box(0.32, 0.03, 0.04), M.ledW, 0, -0.43, 0.37);
    const noz = add(head, cyl(0.012, 0.012, 0.5, 12), M.steel, 0.28, -0.8, 0.14); noz.rotation.z = -0.5;
    const noz2 = add(head, cyl(0.012, 0.012, 0.5, 12), M.steel, -0.28, -0.8, 0.14); noz2.rotation.z = 0.5;
    add(head, cyl(0.02, 0.02, 0.12, 12), M.steel, 0.28, -0.62, 0.14);
    add(head, cyl(0.02, 0.02, 0.12, 12), M.steel, -0.28, -0.62, 0.14);
    const streamMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0, depthWrite: false });
    const mkStream = (from: THREE.Vector3, to: THREE.Vector3) => {
      const dir = to.clone().sub(from);
      const len = dir.length();
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.013, len, 8), streamMat);
      m.position.copy(from).add(to).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      head.add(m);
    };
    const tipT = new THREE.Vector3(0, -1.43, 0.02);
    mkStream(new THREE.Vector3(-0.16, -1.02, 0.14), tipT);
    mkStream(new THREE.Vector3(0.16, -1.02, 0.14), tipT);

    const tool = new THREE.Group();
    head.add(tool);
    add(tool, cyl(0.17, 0.17, 0.04), M.steel, 0, -0.82, 0);
    add(tool, cyl(0.15, 0.075, 0.2), M.stain, 0, -0.94, 0);
    add(tool, cyl(0.095, 0.095, 0.07, 24), M.char, 0, -1.07, 0);
    add(tool, cyl(TOOL_R, TOOL_R, 0.37, 24), M.gold, 0, -1.265, 0);
    add(tool, box(TOOL_R * 2.1, 0.37, 0.012), M.liner, 0, -1.265, 0);
    add(tool, box(0.012, 0.37, TOOL_R * 2.1), M.liner, 0, -1.265, 0);

    /* ───────── saddle (Y) + table (X) + workpiece ───────── */
    const saddle = new THREE.Group();
    machine.add(saddle);
    add(saddle, rb(3.4, 0.06, 1.9, 0.015), M.char, 0, 1.03, 0);
    const slab = new THREE.Group();
    saddle.add(slab);
    add(slab, rb(2.6, 0.12, 1.9, 0.02), M.cast, 0, 1.12, 0);
    [-1.15, -0.55, 0.55, 1.15].forEach((x) => add(slab, box(0.05, 0.005, 1.9), M.liner, x, 1.183, 0));
    [[-1.08, -0.45], [1.08, -0.45], [-1.08, 0.45], [1.08, 0.45]].forEach(([x, z]) => {
      add(slab, rb(0.14, 0.09, 0.2, 0.02), M.accent, x, 1.225, z);
      add(slab, cyl(0.02, 0.02, 0.05, 12), M.steel, x * 0.97, 1.29, z);
    });

    const work = new THREE.Group();
    work.position.set(0, 1.32, 0);
    slab.add(work);
    const sideMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: mk(cAlu), bumpMap: mk(cAlu, 1, 1, false), bumpScale: 0.4, metalness: 0.85, roughness: 0.4 });
    const hidden = new THREE.MeshBasicMaterial({ visible: false });
    add(work, box(2.0, 0.28, 1.3), [sideMat, sideMat, hidden, sideMat, sideMat, sideMat]);

    const path = buildPath();
    const hf = new THREE.PlaneGeometry(2.0, 1.3, 160, 104);
    hf.rotateX(-Math.PI / 2);
    const hpos = hf.attributes.position as THREE.BufferAttribute;
    const hcount = hpos.count;
    const harr = hpos.array as Float32Array;
    const tv = new Float32Array(hcount).fill(9);
    const R2 = TOOL_R * TOOL_R;
    for (let i = 0; i < hcount; i++) {
      const x = harr[i * 3], z = harr[i * 3 + 2];
      if (Math.abs(x) > 0.88 || Math.abs(z) > 0.53) continue;
      for (let k = 0; k < PATH_N; k++) {
        const dx = x - path[k * 2], dz = z - path[k * 2 + 1];
        if (dx * dx + dz * dz < R2) { tv[i] = k / (PATH_N - 1); break; }
      }
    }
    const colors = new Float32Array(hcount * 3);
    const cattr = new THREE.BufferAttribute(colors, 3);
    hf.setAttribute("color", cattr);
    add(work, hf, new THREE.MeshStandardMaterial({ vertexColors: true, bumpMap: mk(cGrain, 10, 7, false), bumpScale: 0.5, metalness: 0.85, roughness: 0.38, side: THREE.DoubleSide }), 0, 0.14, 0);
    let lastC = -1;
    const applyCut = (c: number) => {
      for (let i = 0; i < hcount; i++) {
        const k = (c - tv[i]) / 0.012;
        const f = k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k);
        harr[i * 3 + 1] = -DEPTH * f;
        const m = 0.62 + f * 0.3 + f * 0.035 * Math.sin(harr[i * 3 + 2] * 95);
        colors[i * 3] = m * 0.97;
        colors[i * 3 + 1] = m * 0.98;
        colors[i * 3 + 2] = Math.min(1, m * 1.06);
      }
      hpos.needsUpdate = true;
      cattr.needsUpdate = true;
      hf.computeVertexNormals();
      lastC = c;
    };
    applyCut(0);

    const CHIPS = 600;
    const chipPos = new Float32Array(CHIPS * 3);
    for (let i = 0; i < CHIPS; i++) {
      let x = 0, z = 0;
      if (rnd() < 0.55) { x = (rnd() < 0.5 ? -1 : 1) * (1.03 + rnd() * 0.25); z = (rnd() - 0.5) * 1.8; }
      else { x = (rnd() - 0.5) * 2.5; z = (rnd() < 0.5 ? -1 : 1) * (0.68 + rnd() * 0.22); }
      chipPos[i * 3] = x; chipPos[i * 3 + 1] = 1.188 + rnd() * 0.02; chipPos[i * 3 + 2] = z;
    }
    const chipGeo = new THREE.BufferGeometry();
    chipGeo.setAttribute("position", new THREE.BufferAttribute(chipPos, 3));
    chipGeo.setDrawRange(0, 0);
    const chips = new THREE.Points(chipGeo, new THREE.PointsMaterial({ color: 0xd8dbe4, size: 0.028, sizeAttenuation: true }));
    chips.frustumCulled = false;
    slab.add(chips);

    const SLATS = 9;
    const slatGeo = rb(3.4, 0.07, 0.022, 0.008);
    const front: THREE.Mesh[] = [];
    const rear: THREE.Mesh[] = [];
    for (let i = 0; i < SLATS; i++) {
      front.push(add(machine, slatGeo, M.cover, 0, 1.045, 1.0));
      rear.push(add(machine, slatGeo, M.cover, 0, 1.045, -0.5));
    }

    /* ───────── enclosure + doors ───────── */
    [-2.15, 2.15].forEach((x) => {
      add(machine, box(0.03, 2.85, 1.9), M.glass, x, 2.475, 0.45);
      add(machine, rb(0.12, 2.95, 0.12, 0.02), M.char, x, 2.475, 1.4);
      add(machine, rb(0.12, 0.12, 1.95, 0.02), M.char, x, 3.95, 0.45);
      add(machine, rb(0.12, 0.1, 1.95, 0.02), M.char, x, 1.0, 0.45);
    });
    add(machine, rb(4.4, 0.14, 0.14, 0.03), M.char, 0, 3.95, 1.4);
    add(machine, box(4.3, 0.025, 0.15), M.accent, 0, 3.875, 1.4);
    add(machine, box(4.4, 0.04, 0.06), M.steel, 0, 3.99, 1.5);
    add(machine, box(4.4, 0.04, 0.06), M.steel, 0, 1.03, 1.5);
    [-1.65, 1.65].forEach((x) => {
      add(machine, rb(1.1, 2.9, 0.06, 0.02), M.paint, x, 2.475, 1.4);
      add(machine, box(0.9, 0.01, 0.01), M.accent, x, 2.9, 1.435);
      ([[-0.48, 1.38], [0.48, 1.38], [-0.48, -1.38], [0.48, -1.38]] as [number, number][]).forEach(([bx, by]) => bolt(machine, x + bx, 2.475 + by, 1.436));
    });
    decal(machine, "danger", 0.55, 0.275, -1.65, 2.05, 1.436);
    decal(machine, "spec", 0.5, 0.25, -1.65, 1.6, 1.436);
    decal(machine, "caution", 0.55, 0.275, 1.65, 2.05, 1.436);

    const makeDoor = (handleX: number) => {
      const g = new THREE.Group();
      add(g, rb(1.2, 0.09, 0.06, 0.02), M.char, 0, 1.38, 0);
      add(g, rb(1.2, 0.09, 0.06, 0.02), M.char, 0, -1.38, 0);
      add(g, rb(0.09, 2.85, 0.06, 0.02), M.char, -0.555, 0, 0);
      add(g, rb(0.09, 2.85, 0.06, 0.02), M.char, 0.555, 0, 0);
      add(g, box(1.08, 2.7, 0.02), M.glass);
      add(g, box(0.025, 2.66, 0.04), M.rubber, handleX * 1.04, 0, 0); // rubber gasket
      add(g, rb(0.05, 0.85, 0.07, 0.02), M.accent, handleX, 0, 0.07);
      add(g, cyl(0.035, 0.035, 0.05).rotateX(Math.PI / 2), M.steel, handleX * 0.85, 1.36, 0.04);
      add(g, cyl(0.035, 0.035, 0.05).rotateX(Math.PI / 2), M.steel, handleX * 0.85, -1.36, 0.04);
      return g;
    };
    const doorL = makeDoor(0.5);
    const doorR = makeDoor(-0.5);
    doorL.position.set(-0.55, 2.475, 1.46);
    doorR.position.set(0.55, 2.475, 1.52);
    machine.add(doorL, doorR);
    add(machine, box(3.6, 0.02, 0.04), M.ledW, 0, 3.86, 1.25);
    add(machine, box(3.6, 0.02, 0.04), M.ledW, 0, 3.86, -0.3);

    /* ───────── control pendant ───────── */
    const pend = new THREE.Group();
    pend.position.set(2.2, 2.0, 1.35);
    machine.add(pend);
    add(pend, rb(0.14, 0.4, 0.14, 0.03), M.char, 0.02, 0, 0);
    add(pend, rb(0.75, 0.1, 0.1, 0.03), M.steel, 0.4, 0, 0);
    const con = new THREE.Group();
    con.position.set(0.85, 0, 0.18);
    con.rotation.y = -0.55;
    pend.add(con);
    add(con, rb(1.15, 1.0, 0.3, 0.05), M.char);
    add(con, rb(1.05, 0.62, 0.02, 0.02), M.liner, 0, 0.17, 0.152);
    const scCanvas = mkCanvas(512, 330);
    const sctx = scCanvas.getContext("2d")!;
    const screenTex = new THREE.CanvasTexture(scCanvas);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    texes.push(screenTex);
    add(con, new THREE.PlaneGeometry(0.98, 0.58), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }), 0, 0.17, 0.164);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 8; c++)
        add(con, rb(0.095, 0.05, 0.035, 0.01), c === 7 ? M.accent : (r + c) % 4 === 0 ? M.steel : M.paint, -0.4 + c * 0.114, -0.2 - r * 0.075, 0.16);
    const mpg = add(con, cyl(0.1, 0.1, 0.06).rotateX(Math.PI / 2), M.rubber, 0.42, -0.4, 0.17);
    add(mpg, cyl(0.02, 0.02, 0.05), M.steel, 0, 0.06, 0.04);
    add(con, cyl(0.1, 0.1, 0.04).rotateX(Math.PI / 2), M.yellow, 0.46, 0.43, 0.15);
    add(con, cyl(0.065, 0.07, 0.07).rotateX(Math.PI / 2), M.red, 0.46, 0.43, 0.19);
    add(con, cyl(0.045, 0.045, 0.05).rotateX(Math.PI / 2), M.green, 0.2, 0.43, 0.16);
    add(con, cyl(0.045, 0.045, 0.05).rotateX(Math.PI / 2), M.red, 0.05, 0.43, 0.16);
    [[-0.52, 0.45], [0.52, 0.45], [-0.52, -0.45], [0.52, -0.45]].forEach(([bx, by]) => bolt(con, bx, by, 0.152));

    /* ───────── sparks ───────── */
    const PN = 160;
    const ppos = new Float32Array(PN * 3).fill(-50);
    const pvel = new Float32Array(PN * 3);
    const plife = new Float32Array(PN);
    const pgeo = new THREE.BufferGeometry();
    const pattr = new THREE.BufferAttribute(ppos, 3);
    pgeo.setAttribute("position", pattr);
    const points = new THREE.Points(pgeo, new THREE.PointsMaterial({ color: 0xf3e8ff, size: 0.045, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false }));
    points.frustumCulled = false;
    machine.add(points);
    let acc = 0;

    /* ───────── lights ───────── */
    scene.add(new THREE.HemisphereLight(0x8b7cff, 0x120a1f, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(4, 9, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -8; key.shadow.camera.right = 8;
    key.shadow.camera.top = 8; key.shadow.camera.bottom = -8;
    key.shadow.camera.near = 1; key.shadow.camera.far = 32;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const pl1 = new THREE.PointLight(0xa855f7, 90, 15); pl1.position.set(-4.5, 3, 4); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7c3aed, 100, 17); pl2.position.set(4.5, 4, -5); scene.add(pl2);
    const interior = new THREE.PointLight(0xe9d5ff, 0, 6); interior.position.set(0, 3.5, 0.5); machine.add(interior);

    machine.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const isGlass = m.material === M.glass;
        m.castShadow = !isGlass;
        m.receiveShadow = !isGlass;
      }
    });

    /* ───────── resize ───────── */
    let w = 1, h = 1;
    const resize = () => {
      w = mount.clientWidth || 1;
      h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 1 ? 54 : 38;
      if (w / h > 1.1) camera.setViewOffset(w, h, -w * 0.17, 0, w, h);
      else camera.setViewOffset(w, h, 0, h * 0.14, w, h);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* ───────── animation ───────── */
    let raf = 0, last = performance.now(), ps = -1, spin = 0;
    let lastLabel = "", lastPct = -1, lastP = -1, lastScreen = 0, lastKey = "";
    let lastD = 0, doorOpen = false;
    const dro: Dro = { line: 0, x: 0, y: 0, z: 0, rpm: 0, pct: 0 };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = max > 0 ? clamp(window.scrollY / max) : 0;
      ps = ps < 0 ? target : ps + (target - ps) * Math.min(1, dt * 5);
      const p = ps;

      let i = 0;
      while (i < CAMS.length - 2 && p > CAMS[i + 1].p) i++;
      const a = CAMS[i], b = CAMS[i + 1];
      const t = sstep(a.p, b.p, p);
      const sway = Math.sin(now / 1800) * 0.12 * (1 - sstep(0, 0.1, p));
      camera.position.set(lerp(a.pos[0], b.pos[0], t) + sway, lerp(a.pos[1], b.pos[1], t), lerp(a.pos[2], b.pos[2], t));
      camera.lookAt(lerp(a.tgt[0], b.tgt[0], t), lerp(a.tgt[1], b.tgt[1], t), lerp(a.tgt[2], b.tgt[2], t));

      const d = sstep(0.1, 0.26, p) * (1 - sstep(0.93, 0.99, p));
      doorL.position.x = -0.55 - d * 1.1;
      doorR.position.x = 0.55 + d * 1.1;
      interior.intensity = d * 18;

      const s = clamp((p - 0.3) / 0.54);
      const rapid = sstep(0, 0.1, s), plunge = sstep(0.1, 0.17, s), ret = sstep(0.9, 1, s);
      const c = clamp((s - 0.17) / 0.73);
      let tx = 0, tz = 0;
      if (s < 0.17) {
        tx = lerp(0, path[0], rapid);
        tz = lerp(0, path[1], rapid);
      } else {
        const f = c * (PATH_N - 1);
        const k = Math.min(PATH_N - 2, Math.floor(f));
        const u = f - k;
        tx = lerp(path[k * 2], path[k * 2 + 2], u);
        tz = lerp(path[k * 2 + 1], path[k * 2 + 3], u);
      }
      const home = sstep(0.84, 0.92, p);
      tx = lerp(tx, 0, home);
      tz = lerp(tz, 0, home);
      slab.position.x = -tx;
      saddle.position.z = -tz;
      const headY = SAFE_HEAD + (CUT_HEAD - SAFE_HEAD) * plunge * (1 - ret);
      head.position.y = headY;
      const cutting = s > 0.17 && s < 0.9 && c > 0 && c < 1;

      const zf = saddle.position.z + 0.95;
      const zr = saddle.position.z - 0.95;
      for (let n = 0; n < SLATS; n++) {
        const u = n / (SLATS - 1);
        front[n].position.z = lerp(zf, 1.36, u);
        rear[n].position.z = lerp(zr, -0.46, u);
      }

      // spindle starts spinning as the door begins to open
      const spinTarget = p > 0.1 && p < 0.97 ? (cutting ? 60 : 28) : 0;
      spin = lerp(spin, spinTarget, Math.min(1, dt * 3));
      tool.rotation.y += dt * spin;
      atc.rotation.z = p * Math.PI * 6;

      if (Math.abs(c - lastC) > 0.0012) applyCut(c);
      chipGeo.setDrawRange(0, Math.floor(c * CHIPS));

      streamMat.opacity = cutting ? 0.3 + rnd() * 0.25 : 0;
      lampG.emissiveIntensity = cutting ? 3 : 0.08;
      lampY.emissiveIntensity = d > 0.02 && !cutting ? 3 : 0.08;
      lampR.emissiveIntensity = p < 0.1 || p > 0.95 ? 3 : 0.08;

      // sound
      const dSpeed = Math.abs(d - lastD) / Math.max(dt, 0.001);
      lastD = d;
      const au = audioRef.current;
      if (au) {
        au.update(clamp(spin / 60), cutting ? 1 : 0, clamp(dSpeed / 0.6));
        if (d > 0.995 && !doorOpen) { doorOpen = true; au.clunk(); }
        else if (d < 0.005 && doorOpen) { doorOpen = false; au.clunk(); }
      }

      if (cutting) acc += dt * 170;
      while (acc >= 1) {
        acc -= 1;
        for (let n = 0; n < PN; n++) {
          if (plife[n] <= 0) {
            const ang = rnd() * Math.PI * 2, sp = 0.5 + rnd() * 1.2;
            ppos[n * 3] = 0; ppos[n * 3 + 1] = TOP_Y - DEPTH + 0.02; ppos[n * 3 + 2] = 0;
            pvel[n * 3] = Math.cos(ang) * sp; pvel[n * 3 + 1] = 0.8 + rnd() * 1.6; pvel[n * 3 + 2] = Math.sin(ang) * sp;
            plife[n] = 0.5 + rnd() * 0.6;
            break;
          }
        }
      }
      for (let n = 0; n < PN; n++) {
        if (plife[n] > 0) {
          pvel[n * 3 + 1] -= 5 * dt;
          ppos[n * 3] += pvel[n * 3] * dt;
          ppos[n * 3 + 1] += pvel[n * 3 + 1] * dt;
          ppos[n * 3 + 2] += pvel[n * 3 + 2] * dt;
          plife[n] -= dt * 1.4;
          if (plife[n] <= 0) ppos[n * 3 + 1] = -50;
        }
      }
      pattr.needsUpdate = true;

      const L = GCODE.length;
      let line: number;
      if (s <= 0) line = clamp(Math.floor((p / 0.3) * 5), 0, 4);
      else if (s < 0.17) line = 5 + Math.min(2, Math.floor((s / 0.17) * 3));
      else if (c < 1) line = 8 + Math.floor(c * (L - 5 - 8));
      else line = L - 4 + Math.min(3, Math.floor(sstep(0.84, 0.99, p) * 4));
      dro.line = line;
      dro.x = tx * 100;
      dro.y = tz * 100;
      dro.z = (headY - TOOL_LEN - TOP_Y) * 100;
      dro.rpm = spin > 1 ? (spin / 60) * 1200 : 0;
      dro.pct = Math.round(c * 100);
      const sk = `${dro.line}|${dro.x.toFixed(1)}|${dro.y.toFixed(1)}|${dro.z.toFixed(0)}|${dro.pct}|${Math.round(dro.rpm / 50)}`;
      if (sk !== lastKey && now - lastScreen > 60) {
        drawScreen(sctx, 512, 330, dro);
        screenTex.needsUpdate = true;
        lastKey = sk;
        lastScreen = now;
      }

      let label: string;
      if (p < 0.1) label = "MACHINE READY";
      else if (p < 0.27) label = "DOOR OPENING · SPINDLE ON";
      else if (s <= 0) label = "DOOR OPEN · TOOL READY";
      else if (s < 0.17) label = "TOOL APPROACH";
      else if (p < 0.84) label = "MILLING POCKET";
      else if (p < 0.93) label = "PROGRAM COMPLETE";
      else label = "DOOR CLOSING";
      const pp = Math.round(p * 100);
      if (label !== lastLabel || dro.pct !== lastPct || pp !== lastP) {
        lastLabel = label; lastPct = dro.pct; lastP = pp;
        setHud({ label, pct: dro.pct, p: pp });
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      audioRef.current?.dispose();
      audioRef.current = null;
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh || (o as THREE.Points).isPoints) m.geometry?.dispose();
      });
      Object.values(M).forEach((mt) => mt.dispose());
      [lampG, lampY, lampR, streamMat].forEach((mt) => mt.dispose());
      texes.forEach((tx) => tx.dispose());
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div className="cnc-glow" />
      <div className="cnc-stage" ref={mountRef} aria-hidden="true" />
      <button className="cnc-snd" data-on={soundOn} onClick={toggleSound} aria-label="Machine sound on/off">
        {soundOn ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M23 9l-6 6M17 9l6 6" /></svg>
        )}
        <span>{soundOn ? "Sound on" : "Enable machine sound"}</span>
      </button>
      <div className="cnc-hud">
        <span className="cnc-dot" />
        <b>{hud.label}</b>
        <div className="cnc-bar"><i style={{ width: `${hud.pct}%` }} /></div>
        <small>CUT {hud.pct}%</small>
      </div>
      <div className="cnc-rail"><i style={{ transform: `scaleY(${hud.p / 100})` }} /></div>
    </>
  );
}

/* ═══════════════════════════ SCROLL REVEAL ═══════════════════════════ */
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-in={on} className={`cnc-reveal ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════ PAGE ═══════════════════════════ */
const STEPS = [
  { n: "01", t: "Drawing Dekhna", d: "Part ki dimensions samajhna aur zero point (X0 Y0 Z0) tay karna." },
  { n: "02", t: "G-Code Likhna", d: "G21 G90 se start, phir G00 aur G01 moves, aakhir mein M05 aur M30." },
  { n: "03", t: "Simulation / Dry Run", d: "Pehle simulation mein ya hawa mein chala kar check karna ke koi crash na ho." },
  { n: "04", t: "Machining", d: "Tool material kaatta hai aur program line by line chalta hai." },
];
const CODES = [
  { c: "G00", d: "Rapid move — tool tezi se position par jata hai" },
  { c: "G01", d: "Seedhi cutting line, feed (F) ke sath" },
  { c: "G02 / G03", d: "Circular arc — clockwise / anti-clockwise" },
  { c: "G90 / G91", d: "Absolute / Incremental coordinates" },
  { c: "G20 / G21", d: "Inch / Millimeter units" },
  { c: "M03 / M05", d: "Spindle on / spindle off" },
  { c: "M06", d: "Tool change" },
  { c: "M30", d: "Program end aur reset" },
];
const LEARNING = ["Work offsets (G54)", "Tool length offset (G43)", "Canned cycles (G81–G83)", "CAM software", "Fanuc / Siemens controls"];
const PROJECTS = [
  { t: "Square Pocket", d: "Rows mein zigzag cutting se andar se material nikalna.", m: "G00 · G01 · M03 · M05" },
  { t: "Profile Contour", d: "Part ke bahar ki outline cut karna, corners ke sath.", m: "G01 · G02 · G03" },
  { t: "Hole Pattern", d: "Kai holes ek line mein, har jagah Z neeche-upar.", m: "G00 · G01 · G90" },
];

export default function CncProgrammingPage() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.title = "CNC Programming";
  }, []);

  return (
    <div className="cnc-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <CncScene />
      <ServiceNavbar pageName="CNC Programming" onContact={() => setContactOpen(true)} />
      <ContactSidebar open={contactOpen} onClose={() => setContactOpen(false)} />

      <main className="cnc-content">
        <section id="home" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <span className="cnc-tag">CNC PROGRAMMING</span>
            <h1 className="cnc-title">
              Simple G-Code.<br />
              <em>Clean Parts.</em>
            </h1>
            <p className="cnc-lead">
              Main CNC milling ke liye basic G-code programs likhta hoon — G00, G01, arcs aur M-codes.
              Scroll karein aur dekhein ke ek simple program machine par kaise chalta hai.
            </p>
            <div className="cnc-btns">
              <a href="#projects" className="cnc-btn">View Projects</a>
              <button className="cnc-btn cnc-ghost" onClick={() => setContactOpen(true)}>Contact</button>
            </div>
            <div className="cnc-hint"><span /> Scroll to open the machine</div>
          </Reveal>
        </section>

        <section id="process" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">Program, Step by Step</h2>
            <p className="cnc-lead">Machine ka darwaza khul gaya — ek program is tarah chalta hai.</p>
            <div className="cnc-steps">
              {STEPS.map((s) => (
                <div key={s.n} className="cnc-step">
                  <b>{s.n}</b>
                  <div><h3>{s.t}</h3><p>{s.d}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="skills" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">Basic G-Code</h2>
            <p className="cnc-lead">Tool ab material kaat raha hai — ye wo codes hain jo main use karta hoon.</p>
            <div className="cnc-codes">
              {CODES.map((c) => (
                <div key={c.c} className="cnc-code"><b>{c.c}</b><span>{c.d}</span></div>
              ))}
            </div>
            <div className="cnc-sub">Abhi seekh raha hoon</div>
            <div className="cnc-chips">
              {LEARNING.map((l) => <span key={l} className="cnc-chip">{l}</span>)}
            </div>
          </Reveal>
        </section>

        <section id="projects" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">Practice Programs</h2>
            <p className="cnc-lead">Basic G-code se banaye hue chhote programs.</p>
            <div className="cnc-cards">
              {PROJECTS.map((p) => (
                <div key={p.t} className="cnc-card">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <em>{p.m}</em>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">Let&apos;s Talk</h2>
            <p className="cnc-lead">Koi simple part ho ya seekhne mein madad chahiye — WhatsApp, Gmail ya social media par rabta karein.</p>
            <div className="cnc-btns">
              <button className="cnc-btn" onClick={() => setContactOpen(true)}>Open Contact</button>
              <a href="#home" className="cnc-btn cnc-ghost">Back to Top</a>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}