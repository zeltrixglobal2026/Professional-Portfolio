"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";

type ModalItem = {
  id: string;
  name: string;
  href: string;
  sub: string;
  icon: ReactNode;
};

export default function LinkModal({
  item,
  onClose,
}: {
  item: ModalItem | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"qr" | "link">("qr");

  useEffect(() => {
    if (!item) return;
    setTab("qr");
    setCopied(false);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const copy = async () => {
    if (!item) return;
    try {
      await navigator.clipboard.writeText(item.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[9999] grid place-items-center p-4 overflow-y-auto
        transition-all duration-300
        ${item ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      style={{ backdropFilter: "blur(20px)", background: "rgba(10,4,25,0.72)" }}
    >
      {item && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md my-8 rounded-3xl animated-border
            bg-white/95 dark:bg-[#140c28]/95 backdrop-blur-2xl
            border border-purple-main/20 dark:border-purple-light/25
            shadow-[0_25px_80px_rgba(124,58,237,0.55)]
            p-7 md:p-8"
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full
              text-slate-600 dark:text-purple-100
              hover:bg-red-500 hover:text-white transition-all duration-300 hover:rotate-90"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          {/* Big brand logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 grid place-items-center rounded-3xl p-4
              bg-white dark:bg-white/[0.06]
              border border-purple-main/15 dark:border-purple-light/20
              shadow-[0_10px_40px_rgba(124,58,237,0.25)]">
              <span className="w-full h-full [&>svg]:w-full [&>svg]:h-full">
                {item.icon}
              </span>
            </div>
          </div>

          <h2 className="mt-5 text-center text-3xl font-black tracking-tight
            font-[var(--font-display)]
            bg-gradient-to-br from-purple-main via-purple-light to-pink-500
            bg-clip-text text-transparent">
            {item.name}
          </h2>
          <p className="mt-1 text-center text-[11px] uppercase tracking-[0.25em] font-bold opacity-60">
            {item.sub}
          </p>

          {/* ====== Tabs ====== */}
          <div className="mt-6 p-1 rounded-full grid grid-cols-2
            bg-slate-100 dark:bg-white/[0.06]
            border border-purple-main/10 dark:border-purple-light/15">
            <button
              onClick={() => setTab("qr")}
              className={`relative py-2 rounded-full text-xs font-bold tracking-wide
                transition-all duration-300
                ${tab === "qr"
                  ? "text-white"
                  : "text-slate-600 dark:text-purple-100"}`}
            >
              {tab === "qr" && (
                <span className="absolute inset-0 rounded-full
                  bg-gradient-to-br from-purple-main to-pink-500
                  shadow-[0_4px_15px_rgba(124,58,237,0.4)] -z-[1]" />
              )}
              <span className="relative flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h3v3h-3zM21 14v3M18 21h3M14 21h1" strokeLinecap="round" />
                </svg>
                Scan QR
              </span>
            </button>

            <button
              onClick={() => setTab("link")}
              className={`relative py-2 rounded-full text-xs font-bold tracking-wide
                transition-all duration-300
                ${tab === "link"
                  ? "text-white"
                  : "text-slate-600 dark:text-purple-100"}`}
            >
              {tab === "link" && (
                <span className="absolute inset-0 rounded-full
                  bg-gradient-to-br from-purple-main to-pink-500
                  shadow-[0_4px_15px_rgba(124,58,237,0.4)] -z-[1]" />
              )}
              <span className="relative flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" />
                </svg>
                Link
              </span>
            </button>
          </div>

          {/* ====== TAB CONTENT (grid stacking — no overlap) ====== */}
          <div className="mt-5 grid">
            {/* QR tab */}
            <div
              className={`col-start-1 row-start-1 transition-all duration-300
                ${tab === "qr"
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
            >
              <div className="relative mx-auto w-full max-w-[240px] p-4 rounded-2xl
                bg-white dark:bg-white/[0.04]
                border border-purple-main/15 dark:border-purple-light/20
                shadow-[0_10px_40px_rgba(124,58,237,0.15)]
                overflow-hidden">
                {/* Scan line */}
                <span className="pointer-events-none absolute left-0 right-0 h-10
                  bg-gradient-to-b from-transparent via-purple-main/35 to-transparent
                  animate-[scan_2.4s_ease-in-out_infinite]" />

                <QRCodeSVG
                  value={
                    item.href.startsWith("mailto:") || item.href.startsWith("http")
                      ? item.href
                      : `https://zeltrix.com${item.href}`
                  }
                  size={208}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#1e1b2e"
                  marginSize={0}
                  className="w-full h-auto rounded-lg relative z-10"
                />
              </div>

              <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">
                Scan with your camera to open
              </p>
            </div>

            {/* Link tab */}
            <div
              className={`col-start-1 row-start-1 transition-all duration-300
                ${tab === "link"
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2 pointer-events-none"}`}
            >
              <div className="rounded-2xl p-4
                bg-slate-100 dark:bg-white/[0.05]
                border border-purple-main/15 dark:border-purple-light/20">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1.5">
                  Destination
                </div>
                <div className="font-mono text-[13px] md:text-sm break-all select-all
                  text-slate-800 dark:text-purple-100 leading-relaxed">
                  {item.href}
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl flex items-start gap-2.5
                bg-purple-main/[0.06] dark:bg-purple-light/[0.06]
                border border-purple-main/15 dark:border-purple-light/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="w-4 h-4 mt-0.5 shrink-0 text-purple-main dark:text-purple-light">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                </svg>
                <p className="text-[11.5px] leading-relaxed opacity-75 font-medium">
                  Tip: Link copy karke bhejo, ya QR scan karke directly phone pe kholo.
                </p>
              </div>
            </div>
          </div>

          {/* ====== ACTION BUTTONS ====== */}
          <div className="mt-6 flex gap-2.5">
            <button
              onClick={copy}
              className="flex-1 inline-flex items-center justify-center gap-2
                px-4 py-3 rounded-full text-[13px] font-bold
                bg-slate-100 dark:bg-white/[0.08]
                text-slate-800 dark:text-purple-50
                border border-purple-main/15 dark:border-purple-light/20
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-slate-200 dark:hover:bg-white/[0.14]"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-emerald-500">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" />
                  </svg>
                  Copy
                </>
              )}
            </button>

            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2
                px-4 py-3 rounded-full text-[13px] font-bold text-white
                bg-gradient-to-br from-purple-main to-purple-dark
                shadow-[0_8px_25px_rgba(124,58,237,0.45)]
                transition-all duration-300
                hover:-translate-y-0.5 hover:scale-105"
            >
              Open Link
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}