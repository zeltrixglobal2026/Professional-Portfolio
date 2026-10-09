"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  WhatsAppLogo,
  GmailLogo,
  InstagramLogo,
  LinkedInLogo,
  YouTubeLogo,
  FacebookLogo,
  GitHubLogo,
} from "./BrandIcons";

type Item = {
  id: string;
  name: string;
  href: string;
  sub: string;
  icon: ReactNode;
  glow: string;
  available?: boolean;
  note?: string;
  whiteBg?: boolean;
};

const FOLLOW: Item[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com/zeltrixglobal2026",
    sub: "@zeltrixglobal2026",
    icon: <InstagramLogo />,
    glow: "220, 39, 67",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com/in/zeltrixglobal2026",
    sub: "in/zeltrixglobal2026",
    icon: <LinkedInLogo />,
    glow: "10, 102, 194",
  },
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/zeltrixglobal2026",
    sub: "github.com/zeltrixglobal2026",
    icon: <GitHubLogo />,
    glow: "110, 118, 129",
    whiteBg: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://youtube.com/@zeltrixglobal2026",
    sub: "@zeltrixglobal2026",
    icon: <YouTubeLogo />,
    glow: "255, 0, 0",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "#",
    sub: "Not available",
    icon: <FacebookLogo />,
    glow: "24, 119, 242",
    available: false,
    note: "Facebook page is not available right now.",
  },
];

const CONNECT: Item[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    href: "https://wa.me/923360534777",
    sub: "+92 336 053 4777",
    icon: <WhatsAppLogo />,
    glow: "37, 211, 102",
  },
  {
    id: "gmail",
    name: "Gmail",
    href: "mailto:zeltrixglobal2026@gmail.com",
    sub: "zeltrixglobal2026@gmail.com",
    icon: <GmailLogo />,
    glow: "234, 67, 53",
  },
];

export default function ContactSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  /* Lock body scroll */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ESC closes */
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ backdropFilter: "blur(8px)", background: "rgba(10,4,25,0.55)" }}
        className={`fixed inset-0 z-[10000] transition-all duration-400
          ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-[10001]
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative h-full flex flex-col
          bg-[#140c28]/95 backdrop-blur-2xl
          border-l border-purple-light/25
          shadow-[-20px_0_80px_rgba(124,58,237,0.4)]">

          {/* Animated left border */}
          <span className="absolute left-0 top-0 bottom-0 w-[2px]
            bg-gradient-to-b from-purple-main via-pink-500 to-purple-main
            animate-pulse" />

          {/* Header */}
          <div className="relative px-6 pt-6 pb-4
            border-b border-purple-light/20">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 grid place-items-center rounded-full
                text-purple-100
                hover:bg-red-500 hover:text-white transition-all duration-300 hover:rotate-90"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            <p className="text-[10px] uppercase tracking-[0.28em] font-black
              text-purple-light mb-1">
              Get in touch
            </p>
            <h2 className="text-2xl font-black tracking-tight font-[var(--font-display)]
              bg-gradient-to-br from-purple-main via-purple-light to-pink-500
              bg-clip-text text-transparent">
              Let&apos;s Connect
            </h2>
            <p className="mt-2 text-[12.5px] font-medium text-purple-100/60 leading-relaxed">
              WhatsApp, email or social platforms — pick whatever works best for you.
            </p>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 py-5">

            {/* CONNECT section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60">
                  Connect
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {CONNECT.map((c) => (
                  <li key={c.id}>
                    <div
                      style={{ ["--glow" as string]: c.glow }}
                      className="group relative flex items-center gap-3 p-3 rounded-2xl
                        bg-white/[0.04]
                        border border-purple-light/20
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:border-transparent
                        hover:shadow-[0_0_30px_rgba(var(--glow),0.35)]"
                    >
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <span className={`w-11 h-11 shrink-0 grid place-items-center rounded-full
                          [&>svg]:w-6 [&>svg]:h-6 transition-transform duration-300
                          bg-white p-1.5
                          group-hover:scale-110 group-hover:-rotate-6`}>
                          {c.icon}
                        </span>
                        <span className="flex flex-col min-w-0">
                          <span className="text-[14px] font-bold text-purple-50">
                            {c.name}
                          </span>
                          <span className="text-[11.5px] text-purple-100/60 font-medium truncate">
                            {c.sub}
                          </span>
                        </span>
                      </a>

                      <button
                        onClick={() => copy(c)}
                        aria-label="Copy"
                        className="w-8 h-8 shrink-0 grid place-items-center rounded-full
                          text-purple-200
                          hover:bg-purple-main hover:text-white transition-all duration-300"
                      >
                        {copiedId === c.id ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-500">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* FOLLOW section */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-main animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60">
                  Follow
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2.5">
                {FOLLOW.map((s) => {
                  const isDisabled = s.available === false;
                  return (
                    <li key={s.id}>
                      {isDisabled ? (
                        /* ===== NOT AVAILABLE tile ===== */
                        <div
                          className="relative flex flex-col items-center gap-2 p-4 rounded-2xl
                            bg-red-500/[0.06]
                            border border-dashed border-red-400/25
                            cursor-not-allowed select-none opacity-90"
                        >
                          <span className="absolute top-2 right-2 w-5 h-5 grid place-items-center rounded-full
                            bg-red-500/15 border border-red-400/30">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                              className="w-3 h-3 text-red-400">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                            </svg>
                          </span>

                          <span className="w-10 h-10 grid place-items-center
                            [&>svg]:w-10 [&>svg]:h-10 grayscale opacity-50">
                            {s.icon}
                          </span>
                          <span className="text-[12.5px] font-bold text-red-300/80">
                            {s.name}
                          </span>
                          <span className="text-[10px] font-semibold text-red-300/60 text-center truncate w-full uppercase tracking-wider">
                            Not available
                          </span>
                        </div>
                      ) : (
                        /* ===== Normal tile ===== */
                        <a
                          href={s.href}
                          target={s.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          style={{ ["--glow" as string]: s.glow }}
                          className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl
                            bg-white/[0.04]
                            border border-purple-light/20
                            transition-all duration-300
                            hover:-translate-y-1 hover:border-transparent
                            hover:shadow-[0_0_30px_rgba(var(--glow),0.4)]"
                        >
                          <span className={`w-10 h-10 grid place-items-center rounded-full
                            [&>svg]:w-10 [&>svg]:h-10 transition-transform duration-300
                            ${s.whiteBg ? "bg-white p-1 shadow-[0_2px_10px_rgba(0,0,0,0.2)]" : ""}
                            group-hover:scale-110 group-hover:-rotate-6`}>
                            {s.icon}
                          </span>
                          <span className="text-[12.5px] font-bold text-purple-50">
                            {s.name}
                          </span>
                          <span className="text-[10px] text-purple-100/55 font-medium text-center truncate w-full">
                            {s.sub}
                          </span>
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-purple-light/20">
            <p className="text-center text-[11px] font-semibold tracking-wider text-purple-100/55">
              © Muhammad Khizar Mughal · Portfolio
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}