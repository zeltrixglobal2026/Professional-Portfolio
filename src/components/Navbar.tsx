"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import LinkModal from "./LinkModal";
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
  available?: boolean;
  note?: string;
  whiteBg?: boolean;
};

type ServiceItem = {
  id: string;
  label: string;
  desc: string;
  href: string;
  icon: ReactNode;
  accent: string;
};

/* ================= NAV LINKS ================= */
const NAV_LINKS = [
  { label: "Hero",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact" },
];

/* ================= SERVICES (dropdown items) ================= */
const SERVICES: ServiceItem[] = [
  {
    id: "web",
    label: "Web Development",
    desc: "Modern & responsive websites",
    href: "/services/web-development",
    accent: "from-purple-main to-pink-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "fullstack",
    label: "Full Stack Apps",
    desc: "End-to-end web applications",
    href: "/services/full-stack",
    accent: "from-blue-500 to-cyan-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    desc: "Cross-platform iOS & Android",
    href: "/services/mobile-apps",
    accent: "from-emerald-500 to-teal-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    desc: "Design that converts",
    href: "/services/ui-ux-design",
    accent: "from-pink-500 to-rose-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "api",
    label: "API Development",
    desc: "Secure & scalable backends",
    href: "/services/api-development",
    accent: "from-amber-500 to-orange-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "cnc",
    label: "CNC Programming",
    desc: "Basic G-code for CNC milling",
    href: "/services/CNC-programing",
    accent: "from-indigo-500 to-violet-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ================= FOLLOW / CONNECT ================= */
const FOLLOW: Item[] = [
  { id: "instagram", name: "Instagram", href: "https://instagram.com/zeltrixglobal2026",  sub: "@zeltrixglobal2026",            icon: <InstagramLogo /> },
  { id: "linkedin",  name: "LinkedIn",  href: "https://linkedin.com/in/zeltrixglobal2026", sub: "in/zeltrixglobal2026",          icon: <LinkedInLogo /> },
  { id: "github",    name: "GitHub",    href: "https://github.com/zeltrixglobal2026",      sub: "github.com/zeltrixglobal2026",  icon: <GitHubLogo />, whiteBg: true },
  { id: "youtube",   name: "YouTube",   href: "https://youtube.com/@zeltrixglobal2026",    sub: "@zeltrixglobal2026",            icon: <YouTubeLogo /> },
  { id: "facebook",  name: "Facebook",  href: "#", sub: "Not available", icon: <FacebookLogo />, available: false, note: "Facebook page is not available right now." },
];

const CONNECT: Item[] = [
  { id: "whatsapp", name: "WhatsApp", href: "https://wa.me/923360534777",         sub: "+92 336 053 4777",             icon: <WhatsAppLogo /> },
  { id: "gmail",    name: "Gmail",    href: "mailto:zeltrixglobal2026@gmail.com", sub: "zeltrixglobal2026@gmail.com",  icon: <GmailLogo /> },
];

export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [active, setActive]                 = useState("home");
  const [openDropdown, setOpenDropdown]     = useState(false);
  const [openServices, setOpenServices]     = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [modalItem, setModalItem]           = useState<Item | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLLIElement>(null);

  /* Scroll → toggle bg only */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Outside click closes dropdowns */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setOpenDropdown(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node))
        setOpenServices(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const openModal = (item: Item) => {
    if (item.available === false) return;
    setModalItem(item);
    setOpenDropdown(false);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[9999] transition-all duration-500">

        {/* ===== BG LAYER — transparent initially, dark glass on scroll ===== */}
        <div
          className={`absolute inset-0 transition-all duration-500
            ${scrolled
              ? "opacity-100 bg-[#0d0620]/90 backdrop-blur-2xl border-b border-purple-light/20 shadow-[0_4px_30px_rgba(124,58,237,0.4)]"
              : "opacity-0 bg-transparent border-b border-transparent backdrop-blur-0"}`}
        />

        <div className="relative px-5 md:px-8 py-3 flex items-center justify-between gap-4">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 font-[var(--font-display)]">
            <div className="relative w-10 h-10 grid place-items-center rounded-full
              bg-gradient-to-br from-purple-main via-purple-light to-pink-500 text-white
              shadow-[0_0_15px_#7c3aed] animate-[pulseGlow_3s_ease-in-out_infinite]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M5 16L3 5l5.5 4L12 4l3.5 5L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
              </svg>
            </div>
            <span className="text-[19px] font-black tracking-tight
              bg-gradient-to-br from-purple-main via-purple-light to-pink-500
              bg-clip-text text-transparent bg-[length:200%_auto]
              animate-[shimmer_4s_linear_infinite]">
              Professional Portfolio
            </span>
          </Link>

          {/* ===== CENTER NAV LINKS ===== */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.replace("#", "");
              const isServices = l.label === "Services";

              /* ============ SERVICES (click → #services, hover → dropdown) ============ */
              if (isServices) {
                return (
                  <li
                    key={l.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => setOpenServices(true)}
                    onMouseLeave={() => setOpenServices(false)}
                  >
                    {/* Main link → #services section */}
                    <a
                      href="#services"
                      className={`group relative inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5
                        text-[14.5px] font-bold tracking-tight rounded-full overflow-hidden z-[1]
                        transition-all duration-300
                        ${isActive || openServices
                          ? "text-white"
                          : "text-purple-100/80 hover:text-white hover:-translate-y-0.5"}`}
                    >
                      <span
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          rounded-full bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                          transition-all duration-500 ease-out -z-[1]
                          ${isActive || openServices
                            ? "w-56 h-56 opacity-100"
                            : "w-0 h-0 opacity-0 group-hover:w-56 group-hover:h-56 group-hover:opacity-100"}`}
                      />
                      {l.label}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`w-3 h-3 transition-transform duration-300 ${openServices ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3
                        w-[340px] origin-top
                        transition-all duration-300 ease-out
                        ${openServices
                          ? "opacity-100 visible scale-100 translate-y-0"
                          : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"}`}
                    >
                      <ul className="rounded-2xl p-2
                        bg-[#140c28]/98 backdrop-blur-2xl
                        border border-purple-light/25
                        shadow-[0_20px_60px_rgba(124,58,237,0.5)]">

                        {SERVICES.map((s) => (
                          <li key={s.id}>
                            <a
                              href={s.href}
                              onClick={() => setOpenServices(false)}
                              className="group/item flex items-start gap-3 p-2.5 rounded-xl
                                transition-all duration-300
                                hover:bg-gradient-to-r hover:from-purple-main/[0.15] hover:to-pink-500/[0.1]
                                hover:translate-x-1"
                            >
                              <span className={`w-9 h-9 shrink-0 grid place-items-center rounded-lg
                                bg-gradient-to-br ${s.accent} text-white
                                shadow-[0_4px_12px_rgba(124,58,237,0.4)]
                                transition-transform duration-300
                                group-hover/item:scale-110 group-hover/item:-rotate-6`}>
                                {s.icon}
                              </span>
                              <span className="flex flex-col min-w-0 pt-0.5">
                                <span className="text-[13.5px] font-bold tracking-tight text-purple-50">
                                  {s.label}
                                </span>
                                <span className="text-[11px] font-medium text-purple-100/55">
                                  {s.desc}
                                </span>
                              </span>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                                className="w-3.5 h-3.5 mt-2.5 ml-auto shrink-0
                                  text-purple-100/30
                                  transition-all duration-300
                                  group-hover/item:text-purple-light
                                  group-hover/item:translate-x-0.5">
                                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              /* ============ NORMAL NAV LINKS ============ */
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`group relative inline-flex items-center px-4 xl:px-5 py-2.5
                      text-[14.5px] font-bold tracking-tight rounded-full overflow-hidden z-[1]
                      transition-all duration-300
                      ${isActive ? "text-white" : "text-purple-100/80 hover:text-white hover:-translate-y-0.5"}`}
                  >
                    <span
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                        transition-all duration-500 ease-out -z-[1]
                        ${isActive
                          ? "w-56 h-56 opacity-100"
                          : "w-0 h-0 opacity-0 group-hover:w-56 group-hover:h-56 group-hover:opacity-100"}`}
                    />
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ===== RIGHT SIDE ===== */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Resume */}
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                text-[13.5px] font-extrabold tracking-tight text-white
                bg-gradient-to-br from-purple-main to-purple-dark
                shadow-[0_4px_15px_rgba(124,58,237,0.4)]
                transition-all duration-300 hover:-translate-y-0.5 hover:scale-105
                hover:shadow-[0_8px_25px_#7c3aed] relative overflow-hidden group"
            >
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute -inset-y-2 -left-1/3 w-1/3 bg-white/40 blur-md
                  -translate-x-full group-hover:translate-x-[400%]
                  transition-transform duration-700 rotate-12" />
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 relative">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="relative">Resume</span>
            </a>

            {/* Contact dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpenDropdown((v) => !v)}
                className="relative flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full
                  text-[13.5px] font-extrabold tracking-tight text-white
                  bg-gradient-to-br from-purple-light via-purple-main to-pink-500
                  shadow-[0_4px_15px_rgba(124,58,237,0.4)]
                  transition-all duration-300 hover:-translate-y-0.5 hover:scale-105
                  hover:shadow-[0_8px_25px_#7c3aed]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.1 9.9a16 16 0 006 6l1.26-1.26a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden md:inline">Contact</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`w-3 h-3 transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Contact dropdown content */}
              <div
                className={`absolute top-[130%] right-0 w-[360px] max-w-[92vw]
                  origin-top-right transition-all duration-300 ease-out
                  ${openDropdown
                    ? "opacity-100 visible scale-100 translate-y-0"
                    : "opacity-0 invisible scale-95 -translate-y-2 pointer-events-none"}`}
              >
                <div className="rounded-3xl animated-border
                  bg-[#140c28]/98 backdrop-blur-2xl
                  border border-purple-light/25
                  shadow-[0_20px_60px_rgba(124,58,237,0.5)]
                  p-3">

                  {/* FOLLOW */}
                  <div className="px-2 pt-1.5 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-main animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60">
                      Follow
                    </span>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {FOLLOW.map((s) => {
                      const isDisabled = s.available === false;
                      return (
                        <li key={s.id}>
                          <button
                            onClick={() => openModal(s)}
                            disabled={isDisabled}
                            className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                              text-left transition-all duration-300
                              ${isDisabled
                                ? "cursor-not-allowed opacity-70 border border-dashed border-red-400/25 bg-red-500/[0.06]"
                                : "hover:bg-gradient-to-r hover:from-purple-main/[0.15] hover:to-pink-500/[0.1] hover:translate-x-0.5"}`}
                          >
                            <span className={`w-7 h-7 shrink-0 grid place-items-center rounded-full
                              [&>svg]:w-7 [&>svg]:h-7 transition-transform duration-300
                              ${s.whiteBg ? "bg-white p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.25)]" : ""}
                              ${isDisabled ? "grayscale opacity-50" : "group-hover:scale-115 group-hover:-rotate-6"}`}>
                              {s.icon}
                            </span>
                            <span className="flex flex-col min-w-0">
                              <span className={`text-[13.5px] font-bold ${isDisabled ? "text-red-300/80" : "text-purple-50"}`}>
                                {s.name}
                              </span>
                              <span className={`text-[11px] font-medium truncate ${isDisabled ? "text-red-300/60" : "text-purple-100/60"}`}>
                                {s.sub}
                              </span>
                            </span>

                            {isDisabled ? (
                              <span className="ml-auto w-5 h-5 grid place-items-center rounded-full
                                bg-red-500/15 border border-red-400/30 shrink-0">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                                  className="w-3 h-3 text-red-400">
                                  <rect x="3" y="11" width="18" height="11" rx="2" />
                                  <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                                </svg>
                              </span>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                                className="w-3.5 h-3.5 ml-auto text-purple-100/30 group-hover:text-purple-50
                                group-hover:translate-x-0.5 transition-all">
                                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-purple-main/30 to-transparent" />

                  {/* CONNECT */}
                  <div className="px-2 pt-1.5 pb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60">
                      Connect
                    </span>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {CONNECT.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => openModal(c)}
                          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                            text-left transition-all duration-300
                            hover:bg-gradient-to-r hover:from-purple-main/[0.15] hover:to-pink-500/[0.1]
                            hover:translate-x-0.5"
                        >
                          <span className="w-7 h-7 shrink-0 grid place-items-center
                            [&>svg]:w-7 [&>svg]:h-7 transition-transform duration-300
                            group-hover:scale-115 group-hover:-rotate-6">
                            {c.icon}
                          </span>
                          <span className="flex flex-col min-w-0">
                            <span className="text-[13.5px] font-bold text-purple-50">
                              {c.name}
                            </span>
                            <span className="text-[11px] font-medium truncate text-purple-100/60">
                              {c.sub}
                            </span>
                          </span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                            className="w-3.5 h-3.5 ml-auto text-purple-100/30 group-hover:text-purple-50
                            group-hover:translate-x-0.5 transition-all">
                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 grid place-items-center rounded-full
                text-purple-50 hover:bg-purple-main/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500
            bg-[#0d0620]/95 backdrop-blur-2xl
            border-b border-purple-light/20
            ${mobileOpen ? "max-h-[1100px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="flex flex-col gap-1 p-5">

            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.replace("#", "");
              const isServices = l.label === "Services";

              /* ============ MOBILE SERVICES ============ */
              if (isServices) {
                return (
                  <li key={l.href}>
                    {/* Main: click → #services, arrow → submenu toggle */}
                    <div
                      className={`w-full flex items-center justify-between rounded-full
                        text-[14.5px] font-bold tracking-tight transition-all duration-300
                        ${isActive || mobileServices
                          ? "bg-gradient-to-br from-purple-main to-pink-500 text-white"
                          : "text-purple-50 hover:bg-purple-main/20"}`}
                    >
                      <a
                        href="#services"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 flex items-center gap-2 px-5 py-3"
                      >
                        <span className="w-5 h-5 grid place-items-center">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-4 h-4">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {l.label}
                      </a>
                      <button
                        onClick={() => setMobileServices((v) => !v)}
                        aria-label="Toggle services submenu"
                        className="w-10 h-10 grid place-items-center rounded-full hover:bg-white/15"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          className={`w-4 h-4 transition-transform duration-300 ${mobileServices ? "rotate-180" : ""}`}>
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    {/* Sub-list */}
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-500
                        ${mobileServices ? "max-h-[28rem] opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                    >
                      <ul className="flex flex-col gap-1 pl-3 pr-1 pb-2">
                        {SERVICES.map((s) => (
                          <li key={s.id}>
                            <a
                              href={s.href}
                              onClick={() => { setMobileOpen(false); setMobileServices(false); }}
                              className="flex items-center gap-3 p-2.5 rounded-xl
                                bg-purple-main/[0.08] border border-purple-light/15
                                transition-all duration-300
                                hover:bg-purple-main/20"
                            >
                              <span className={`w-8 h-8 shrink-0 grid place-items-center rounded-lg
                                bg-gradient-to-br ${s.accent} text-white`}>
                                {s.icon}
                              </span>
                              <span className="text-[13px] font-bold text-purple-50">
                                {s.label}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              /* ============ NORMAL MOBILE LINKS ============ */
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-center px-5 py-3 rounded-full
                      text-[14.5px] font-bold tracking-tight transition-all duration-300
                      ${isActive
                        ? "bg-gradient-to-br from-purple-main to-pink-500 text-white"
                        : "text-purple-50 hover:bg-purple-main/20"}`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}

            {/* Follow mobile */}
            <li className="pt-4">
              <div className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60 text-center mb-2">
                Follow
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {FOLLOW.map((s) => {
                  const isDisabled = s.available === false;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => openModal(s)}
                        disabled={isDisabled}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                          border transition-all duration-300
                          ${isDisabled
                            ? "cursor-not-allowed opacity-60 border-dashed border-red-400/25 bg-red-500/[0.06]"
                            : "bg-purple-main/[0.08] border-purple-light/20"}`}
                      >
                        <span className={`w-6 h-6 [&>svg]:w-6 [&>svg]:h-6 shrink-0 rounded-full
                          ${s.whiteBg ? "bg-white p-0.5" : ""}
                          ${isDisabled ? "grayscale opacity-50" : ""}`}>
                          {s.icon}
                        </span>
                        <span className={`text-[13px] font-bold ${isDisabled ? "text-red-300/80" : "text-purple-50"}`}>
                          {s.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* Connect mobile */}
            <li className="pt-4">
              <div className="text-[10px] uppercase tracking-[0.22em] font-black text-purple-100/60 text-center mb-2">
                Connect
              </div>
              <ul className="flex flex-col gap-2">
                {CONNECT.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => openModal(c)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                        bg-purple-main/[0.08] border border-purple-light/20"
                    >
                      <span className="w-6 h-6 [&>svg]:w-6 [&>svg]:h-6 shrink-0">{c.icon}</span>
                      <span className="text-[13px] font-bold text-purple-50">{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li className="pt-4">
              <a
                href="/resume.pdf"
                download
                className="flex sm:hidden items-center justify-center gap-2 px-5 py-3 rounded-full
                  text-[13.5px] font-extrabold text-white
                  bg-gradient-to-br from-purple-main to-purple-dark"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <LinkModal item={modalItem} onClose={() => setModalItem(null)} />
    </>
  );
}