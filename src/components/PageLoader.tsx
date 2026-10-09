"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const prevPathRef = useRef<string | null>(null);
  const isFirstRef = useRef(true);

  useEffect(() => {
    /* Skip very first render */
    if (isFirstRef.current) {
      isFirstRef.current = false;
      prevPathRef.current = pathname;
      return;
    }

    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    /* Show loader ONLY when returning to home ("/") */
    const isReturningHome = pathname === "/" && prevPath !== "/";

    if (!isReturningHome) return;

    setLoading(true);

    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(hideTimer);
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 z-[99998] flex items-center justify-center
        bg-[#0f0a1e]/50 backdrop-blur-2xl
        transition-all duration-500 ease-out
        ${loading
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"}`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* 3 bouncing dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white
                shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              style={{
                animation: `dotBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-white/70">
          Loading
        </p>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%      { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}