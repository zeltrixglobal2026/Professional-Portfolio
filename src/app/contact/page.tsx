"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContactSidebar from "@/components/ContactSidebar";
import { QRCodeSVG } from "qrcode.react";
import {
  WhatsAppLogo,
  GmailLogo,
  InstagramLogo,
  LinkedInLogo,
  YouTubeLogo,
  FacebookLogo,
  GitHubLogo,
} from "@/components/BrandIcons";

/* ================= TYPES ================= */
type ContactItem = {
  id: string;
  name: string;
  sub: string;
  href: string;
  qr: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
  available?: boolean;
};

/* ================= DATA ================= */
const CONTACTS: ContactItem[] = [
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
    sub: "Not available",
    href: "#",
    qr: "",
    icon: <FacebookLogo />,
    accent: "from-[#1877f2] to-[#0d5fce]",
    glow: "24, 119, 242",
    available: false,
  },
];

/* ================= FLOATING ORBS ================= */
const ORBS = [
  { size: 500, x: "-10%", y: "-15%", color: "bg-purple-main/25",  dur: 22 },
  { size: 550, x: "80%",  y: "10%",  color: "bg-pink-500/20",     dur: 26 },
  { size: 450, x: "50%",  y: "80%",  color: "bg-blue-500/15",     dur: 24 },
  { size: 400, x: "85%",  y: "75%",  color: "bg-cyan-500/15",     dur: 28 },
  { size: 350, x: "5%",   y: "60%",  color: "bg-purple-light/15", dur: 30 },
];

/* ================= ANIMATED BACKGROUND ================= */
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.7) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      />

      {ORBS.map((o, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${o.color} blur-[140px]`}
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            animation: `orbFloat${(i % 3) + 1} ${o.dur}s ease-in-out infinite`,
          }}
        />
      ))}

      <div
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2
          rounded-full opacity-[0.06]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #7c3aed 20%, transparent 40%, #ec4899 60%, transparent 80%, #a78bfa 100%)",
          animation: "spinSlow 40s linear infinite",
        }}
      />

      <span className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-purple-light
        shadow-[0_0_20px_#a78bfa]"
        style={{ animation: "pulseRing 4s ease-out infinite" }} />
      <span className="absolute top-2/3 left-3/4 w-2 h-2 rounded-full bg-pink-400
        shadow-[0_0_20px_#ec4899]"
        style={{ animation: "pulseRing 5s ease-out infinite 1.5s" }} />
      <span className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-cyan-400
        shadow-[0_0_20px_#22d3ee]"
        style={{ animation: "pulseRing 6s ease-out infinite 3s" }} />

      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-light/70
            shadow-[0_0_6px_#a78bfa]"
          style={{
            left: `${5 + (i * 4.7) % 95}%`,
            top: `${10 + (i * 13) % 80}%`,
            animation: `particleFloat ${8 + (i % 6)}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}

      <div className="absolute top-[30%] left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-purple-light/40 to-transparent"
        style={{ animation: "lineSweep 6s ease-in-out infinite" }} />
      <div className="absolute top-[60%] left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"
        style={{ animation: "lineSweep 7s ease-in-out 2s infinite" }} />
    </div>
  );
}

/* ================= SERVICE NAVBAR (built-in) ================= */
function ContactNavbar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] w-full px-3 md:px-4">
      <div className="relative mx-auto w-full max-w-[1280px]">

        {/* Animated border */}
        <span className="absolute -inset-x-[1.5px] -bottom-[1.5px] -top-0 rounded-b-2xl overflow-hidden pointer-events-none">
          <span className="absolute inset-0 rounded-b-2xl
            bg-gradient-to-r from-purple-main/60 via-purple-light/50 to-pink-500/60" />

          <span className="absolute top-0 bottom-0 w-28
            bg-gradient-to-r from-transparent via-white to-transparent
            blur-[2px] opacity-95
            animate-[navTravel_5s_ease-in-out_infinite]" />

          <span className="absolute top-0 bottom-0 w-24
            bg-gradient-to-l from-transparent via-purple-light to-transparent
            blur-[2px] opacity-85
            animate-[navTravelReverse_5s_ease-in-out_infinite_2.5s]" />

          <span className="absolute top-0 bottom-0 w-16
            bg-gradient-to-r from-transparent via-pink-400 to-transparent
            blur-[2px] opacity-75
            animate-[navTravel_5s_ease-in-out_infinite_1.2s]" />
        </span>

        {/* Inner bg */}
        <div className="relative rounded-b-2xl
          bg-[#0d0620]/95 backdrop-blur-2xl
          shadow-[0_8px_35px_rgba(124,58,237,0.4)]
          px-5 md:px-7 py-2.5
          overflow-hidden">

          <span className="absolute -top-16 left-1/2 -translate-x-1/2
            w-96 h-24 rounded-full bg-purple-main/20 blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between gap-3">

            {/* LEFT */}
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/" className="shrink-0">
                <div className="relative w-9 h-9 grid place-items-center rounded-full
                  bg-gradient-to-br from-purple-main via-purple-light to-pink-500 text-white
                  shadow-[0_0_14px_#7c3aed]
                  animate-[pulseGlow_3s_ease-in-out_infinite]
                  transition-transform duration-500
                  hover:scale-110 hover:-rotate-6">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M5 16L3 5l5.5 4L12 4l3.5 5L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                  </svg>
                </div>
              </Link>

              <span className="w-px h-5 bg-purple-light/30" />

              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[9.5px] uppercase tracking-[0.24em] font-black text-purple-100/50 leading-none hidden sm:inline">
                  Page
                </span>
                <span className="hidden sm:block text-purple-100/30 text-[11px]">·</span>
                <h1 className="text-[14px] md:text-[15px] font-black tracking-tight truncate
                  bg-gradient-to-r from-purple-light via-pink-400 to-purple-main
                  bg-clip-text text-transparent
                  bg-[length:200%_auto]
                  animate-[shimmer_4s_linear_infinite]
                  leading-none">
                  Contact
                </h1>
              </div>
            </div>

            {/* RIGHT */}
            <Link
              href="/"
              className="group relative inline-flex items-center gap-1.5
                px-3.5 md:px-4 py-2 rounded-full
                text-[12px] md:text-[12.5px] font-extrabold tracking-tight text-white
                bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                bg-[length:200%_auto]
                shadow-[0_3px_15px_rgba(124,58,237,0.45)]
                transition-all duration-500
                hover:-translate-y-0.5 hover:scale-105
                hover:bg-[position:100%_0]
                hover:shadow-[0_6px_25px_#7c3aed]
                overflow-hidden shrink-0">
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-white/60 blur-md
                  -translate-x-full group-hover:translate-x-[500%]
                  transition-transform duration-700 rotate-12" />
              </span>

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="w-3.5 h-3.5 relative transition-transform duration-300
                  group-hover:-translate-x-0.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <span className="relative hidden sm:inline">Back to Home</span>
              <span className="relative sm:hidden">Back</span>
            </Link>
          </div>
        </div>

        {/* Bottom line */}
        <span className="absolute left-8 right-8 -bottom-[2px] h-[2px]
          bg-gradient-to-r from-transparent via-purple-light/60 to-transparent
          rounded-full
          animate-[lineGlow_3s_ease-in-out_infinite]" />
      </div>
    </nav>
  );
}

/* ================= CONTACT CARD ================= */
function ContactCard({
  item,
  index,
}: {
  item: ContactItem;
  index: number;
}) {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isAvailable = item.available !== false;
  const isExternal = item.href.startsWith("http");

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el || !isAvailable) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ x: x * 6, y: y * -6 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    try {
      await navigator.clipboard.writeText(item.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div
      style={{
        animationDelay: `${index * 90}ms`,
        perspective: "1200px",
      }}
      className="animate-[cardEnter_0.7s_ease-out_both]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isAvailable
            ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
            : undefined,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
          ["--glow" as string]: item.glow,
        }}
        className={`group relative rounded-3xl overflow-hidden
          backdrop-blur-2xl border
          ${isAvailable
            ? "bg-white/[0.04] border-purple-light/20 hover:border-transparent hover:shadow-[0_25px_80px_rgba(var(--glow),0.4)]"
            : "bg-red-500/[0.03] border-dashed border-red-400/25"}`}
      >
        {isAvailable && (
          <span
            className={`absolute inset-0 rounded-3xl p-[1.5px] opacity-0
              group-hover:opacity-100 transition-opacity duration-500
              bg-gradient-to-br ${item.accent}
              pointer-events-none`}
            style={{
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        )}

        <span
          className={`absolute -top-24 -right-24 w-48 h-48 rounded-full
            bg-gradient-to-br ${item.accent}
            transition-all duration-700
            ${isAvailable
              ? "opacity-[0.14] group-hover:opacity-40 group-hover:scale-125"
              : "opacity-[0.06]"}`}
        />

        {/* HEADER */}
        <div className="relative flex items-center gap-3 p-4 pb-3">
          <span
            className={`w-11 h-11 shrink-0 grid place-items-center rounded-2xl
              bg-white p-2
              [&>svg]:w-full [&>svg]:h-full
              shadow-[0_6px_20px_rgba(var(--glow),0.3)]
              transition-transform duration-500
              ${isAvailable
                ? "group-hover:scale-110 group-hover:-rotate-6"
                : "grayscale opacity-50"}`}
          >
            {item.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className={`text-[15px] font-black tracking-tight leading-tight ${
              isAvailable ? "text-purple-50" : "text-red-300/80"
            }`}>
              {item.name}
            </h3>
            <p className={`text-[11px] font-medium truncate ${
              isAvailable ? "text-purple-100/60" : "text-red-300/60"
            }`}>
              {item.sub}
            </p>
          </div>

          {!isAvailable && (
            <span className="w-6 h-6 grid place-items-center rounded-full
              bg-red-500/15 border border-red-400/30 shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                className="w-3 h-3 text-red-400">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
              </svg>
            </span>
          )}
        </div>

        {/* QR / NOT AVAILABLE */}
        <div className="px-4 pb-4">
          {isAvailable ? (
            <div className="relative rounded-2xl p-3 bg-white overflow-hidden border-2 border-purple-light/15">
              <span className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                <span className="absolute left-0 right-0 h-8
                  bg-gradient-to-b from-transparent via-purple-main/40 to-transparent
                  animate-[scan_2.8s_ease-in-out_infinite]" />
              </span>

              <QRCodeSVG
                value={item.qr}
                size={180}
                level="H"
                bgColor="#ffffff"
                fgColor="#1e1b2e"
                marginSize={0}
                className="relative z-10 w-full h-auto rounded-lg"
              />

              <span className="absolute top-1.5 left-1.5 w-4 h-4 border-t-[3px] border-l-[3px] border-purple-main/60 rounded-tl-md" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 border-t-[3px] border-r-[3px] border-purple-main/60 rounded-tr-md" />
              <span className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-[3px] border-l-[3px] border-purple-main/60 rounded-bl-md" />
              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-[3px] border-r-[3px] border-purple-main/60 rounded-br-md" />
            </div>
          ) : (
            <div className="relative rounded-2xl py-8 px-4
              bg-gradient-to-br from-red-500/[0.08] to-red-500/[0.02]
              border-2 border-dashed border-red-400/25
              flex flex-col items-center justify-center gap-3">
              <div className="relative w-14 h-14 grid place-items-center rounded-full
                bg-red-500/10 border border-red-400/25">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                  className="w-6 h-6 text-red-400/80">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M4.93 4.93l14.14 14.14" strokeLinecap="round" />
                </svg>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 grid place-items-center
                  rounded-full bg-red-500 border-2 border-[#140c28]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-2.5 h-2.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </span>
              </div>

              <div className="text-center">
                <p className="text-[12.5px] font-black tracking-tight text-red-300/90 uppercase">
                  Not Available
                </p>
                <p className="mt-1 text-[10.5px] font-medium text-purple-100/50 max-w-[180px] leading-relaxed">
                  Facebook page is not available right now.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div className="relative flex items-center gap-2 px-4 pb-4">
          {isAvailable ? (
            <>
              <a
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className={`group/btn relative flex-1 inline-flex items-center justify-center gap-2
                  px-4 py-3 rounded-xl
                  bg-gradient-to-br ${item.accent} text-white
                  text-[12.5px] font-extrabold tracking-tight
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
                  {item.icon}
                </span>
                <span className="relative">Open</span>
              </a>

              <button
                onClick={handleCopy}
                aria-label="Copy link"
                className="shrink-0 w-11 h-11 grid place-items-center rounded-xl
                  bg-white/[0.06] backdrop-blur-xl
                  border border-purple-light/20
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
            <button
              disabled
              className="relative flex-1 inline-flex items-center justify-center gap-2
                px-4 py-3 rounded-xl
                bg-white/[0.03] text-purple-100/30
                text-[12.5px] font-extrabold tracking-tight
                border border-dashed border-red-400/20
                cursor-not-allowed select-none"
            >
              <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4 opacity-40 brightness-0 invert">
                {item.icon}
              </span>
              <span>Not Available</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function ContactPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ContactNavbar />

      <main className="relative min-h-screen w-full overflow-hidden bg-[#0f0a1e] pt-24 pb-24">
        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* HERO */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
              bg-white/5 backdrop-blur-md border border-purple-main/25
              shadow-[0_4px_20px_rgba(124,58,237,0.2)] mb-6
              animate-[fadeUp_0.6s_ease-out_both_0.1s]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-100/80">
                Available for work
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight
              font-[var(--font-display)] leading-[1.05] mb-6
              animate-[fadeUp_0.7s_ease-out_both_0.2s]">
              <span className="text-white">Let&apos;s </span>
              <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
                bg-clip-text text-transparent">
                connect
              </span>
            </h1>

            <div className="mt-5 mx-auto flex items-center justify-center gap-3
              animate-[fadeUp_0.7s_ease-out_both_0.3s]">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
              <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
            </div>

            <p className="mt-6 text-[15px] md:text-[17px] leading-relaxed font-medium
              text-purple-100/70 max-w-2xl mx-auto
              animate-[fadeUp_0.7s_ease-out_both_0.4s]">
              Scan the QR code with your phone, tap a button to open directly,
              or copy the link — pick whatever works best for you.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20">
            {CONTACTS.map((c, i) => (
              <ContactCard key={c.id} item={c} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 text-center
            bg-gradient-to-br from-purple-main/25 via-pink-500/15 to-purple-light/25
            border border-purple-main/30 backdrop-blur-2xl
            animate-[fadeUp_0.8s_ease-out_both_0.5s]">
            <span className="absolute -top-24 -left-24 w-64 h-64 rounded-full
              bg-purple-main/40 blur-3xl animate-[pulseGlow_5s_ease-in-out_infinite]" />
            <span className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full
              bg-pink-500/30 blur-3xl animate-[pulseGlow_7s_ease-in-out_infinite_reverse]" />

            <div className="relative">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight
                font-[var(--font-display)] text-white mb-4">
                Have a project in mind?
              </h3>
              <p className="text-purple-100/75 text-[15px] max-w-xl mx-auto mb-8">
                Let&apos;s turn your idea into a fast, beautiful, and scalable product.
                I usually reply within a few hours.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="group relative inline-flex items-center gap-2.5
                    px-7 py-4 rounded-full text-[14px] font-extrabold text-white
                    bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                    shadow-[0_10px_35px_rgba(124,58,237,0.55)]
                    transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]
                    overflow-hidden">
                  <span className="absolute inset-0 rounded-full overflow-hidden">
                    <span className="absolute -inset-y-3 -left-1/3 w-1/3 bg-white/50 blur-lg
                      -translate-x-full group-hover:translate-x-[500%]
                      transition-transform duration-700 rotate-12" />
                  </span>
                  <span className="relative">Open Contact Sidebar</span>
                </button>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full
                    text-[14px] font-extrabold text-white
                    bg-white/[0.08] backdrop-blur-xl
                    border border-white/25 hover:border-white/50
                    transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.15]">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SectionDivider />
      <Footer />

      <ContactSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
        @keyframes lineGlow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.7); }
          50%      { opacity: 0.9; transform: scaleX(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 12px #7c3aed; }
          50%      { box-shadow: 0 0 24px #a78bfa; }
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(40px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(80px, -50px) scale(1.15); }
          66%      { transform: translate(-40px, 60px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(-70px, 70px) scale(1.1); }
          66%      { transform: translate(50px, -40px) scale(0.9); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(60px, 40px) scale(1.2); }
        }
        @keyframes spinSlow {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(8); opacity: 0; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50%      { transform: translateY(-40px) translateX(20px); opacity: 1; }
        }
        @keyframes lineSweep {
          0%, 100% { opacity: 0.15; transform: scaleX(0.6); }
          50%      { opacity: 0.5;  transform: scaleX(1); }
        }
        @keyframes scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
}