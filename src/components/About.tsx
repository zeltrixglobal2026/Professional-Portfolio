"use client";

const ABOUT_STATS = [
  { num: "1+",  label: "Year Training",   icon: "🎓" },
  { num: "10+", label: "Projects Built",  icon: "🚀" },
  { num: "5+",  label: "Tech Stacks",     icon: "⚡" },
  { num: "100%", label: "Dedication",     icon: "🔥" },
];

const COURSES = [
  {
    id: "smit",
    title: "Modern Web & Mobile App Development",
    org: "SMIT — Saylani Mass IT Training",
    duration: "1 Year",
    year: "Completed",
    desc: "A complete full-stack web development program covering HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB, and React Native for mobile apps. Learned through hands-on projects and real-world practical training.",
    tags: ["HTML/CSS", "JavaScript", "React", "Next.js", "Node.js", "MongoDB", "React Native"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-purple-main to-pink-500",
  },
];

const EDUCATION = [
  {
    id: "matric",
    title: "Matriculation (Science)",
    org: "Secondary School Certificate",
    duration: "2025 — 2027",
    status: "In Progress",
    desc: "Currently pursuing my matriculation with a focus on Science subjects. Expected completion in 2027.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-blue-500 to-cyan-400",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6
        bg-gradient-to-br from-[#0f0a1e] via-[#150c28] to-[#0f0a1e]"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full
        bg-purple-main/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full
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

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
            bg-white/5 backdrop-blur-md border border-purple-main/25
            shadow-[0_4px_20px_rgba(124,58,237,0.2)] mb-5">
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-100/80">
              About Me
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight
            font-[var(--font-display)] leading-[1.05]">
            <span className="text-white">Get to know </span>
            <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
              bg-clip-text text-transparent">
              me better
            </span>
          </h2>

          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
          </div>
        </div>

        {/* ===== INTRO ===== */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[15px] md:text-[17px] leading-relaxed font-medium
            text-purple-100/75">
            I&apos;m <span className="text-white font-bold">Muhammad Khizar Mughal</span> —
            a passionate <span className="text-purple-light font-bold">Full Stack Developer</span> who
            loves building modern web and mobile applications. Clean code, sharp design,
            and scalable architecture are at the core of everything I create.
          </p>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {ABOUT_STATS.map((s) => (
            <div
              key={s.label}
              className="group relative rounded-2xl p-5 text-center
                bg-white/[0.04] backdrop-blur-xl
                border border-purple-main/20 hover:border-purple-light/40
                transition-all duration-500 hover:-translate-y-1
                hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)]"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl md:text-4xl font-black tracking-tight
                bg-gradient-to-br from-purple-light to-pink-400
                bg-clip-text text-transparent">
                {s.num}
              </div>
              <div className="mt-1 text-[10.5px] uppercase tracking-[0.18em] font-bold text-purple-100/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ===== TIMELINE GRID ===== */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ===== COURSES CARD ===== */}
          <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden
            bg-white/[0.04] backdrop-blur-2xl
            border border-purple-main/20
            shadow-[0_20px_60px_rgba(124,58,237,0.15)]">

            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full
              bg-purple-main/25 blur-3xl" />

            <div className="relative">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 grid place-items-center rounded-xl
                  bg-gradient-to-br from-purple-main to-pink-500 text-white
                  shadow-[0_8px_25px_rgba(124,58,237,0.45)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white
                    font-[var(--font-display)]">
                    Training &amp; Course
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-purple-100/50">
                    Where I learned
                  </p>
                </div>
              </div>

              {/* Course items */}
              <div className="flex flex-col gap-4">
                {COURSES.map((c) => (
                  <div
                    key={c.id}
                    className="group relative rounded-2xl p-5
                      bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                      border border-purple-main/20 hover:border-purple-light/40
                      transition-all duration-500 hover:-translate-y-0.5
                      hover:shadow-[0_12px_35px_rgba(124,58,237,0.3)]"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`shrink-0 w-12 h-12 grid place-items-center rounded-xl
                        bg-gradient-to-br ${c.accent} text-white
                        shadow-[0_8px_25px_rgba(124,58,237,0.4)]`}>
                        {c.icon}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="text-[15px] md:text-base font-black tracking-tight text-white">
                            {c.title}
                          </h4>
                          <span className="text-[10px] uppercase tracking-widest font-black
                            px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300
                            border border-emerald-400/30">
                            {c.year}
                          </span>
                        </div>

                        <p className="text-[12.5px] font-bold text-purple-light">
                          {c.org}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-purple-100/55">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" strokeLinecap="round" />
                          </svg>
                          {c.duration}
                        </div>

                        <p className="mt-3 text-[13px] leading-relaxed font-medium text-purple-100/65">
                          {c.desc}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {c.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10.5px] font-bold tracking-wide
                                px-2.5 py-1 rounded-full
                                bg-purple-main/15 text-purple-light
                                border border-purple-main/30
                                transition-all duration-300
                                hover:bg-purple-main hover:text-white"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== EDUCATION CARD ===== */}
          <div className="relative rounded-3xl p-6 md:p-8 overflow-hidden
            bg-white/[0.04] backdrop-blur-2xl
            border border-purple-main/20
            shadow-[0_20px_60px_rgba(124,58,237,0.15)]">

            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full
              bg-cyan-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 grid place-items-center rounded-xl
                  bg-gradient-to-br from-blue-500 to-cyan-400 text-white
                  shadow-[0_8px_25px_rgba(59,130,246,0.45)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white
                    font-[var(--font-display)]">
                    Education
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-purple-100/50">
                    Academic journey
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-8">
                <span className="absolute left-3 top-2 bottom-2 w-0.5
                  bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent" />

                {EDUCATION.map((e) => (
                  <div key={e.id} className="relative">
                    <span className="absolute -left-[22px] top-6 w-4 h-4 rounded-full
                      bg-gradient-to-br from-blue-500 to-cyan-400
                      border-[3px] border-[#150c28]
                      shadow-[0_0_15px_rgba(59,130,246,0.7)]
                      animate-pulse" />

                    <div className="group rounded-2xl p-5
                      bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                      border border-blue-500/20 hover:border-cyan-400/40
                      transition-all duration-500 hover:-translate-y-0.5
                      hover:shadow-[0_12px_35px_rgba(59,130,246,0.3)]">

                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-[15px] md:text-base font-black tracking-tight text-white">
                          {e.title}
                        </h4>
                        <span className="text-[10px] uppercase tracking-widest font-black
                          px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300
                          border border-amber-400/30">
                          {e.status}
                        </span>
                      </div>

                      <p className="text-[12.5px] font-bold text-cyan-300">
                        {e.org}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-purple-100/55">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                        </svg>
                        {e.duration}
                      </div>

                      <p className="mt-3 text-[13px] leading-relaxed font-medium text-purple-100/65">
                        {e.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Currently Focused On */}
              <div className="mt-6 rounded-2xl p-5
                bg-gradient-to-br from-purple-main/[0.08] to-pink-500/[0.04]
                border border-purple-main/20">
                <p className="text-[10px] uppercase tracking-[0.22em] font-black
                  text-purple-light mb-3">
                  Currently Focused On
                </p>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-3">
                  {[
                    "Next.js 15",
                    "TypeScript",
                    "React Native",
                    "Node.js APIs",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12.5px] font-semibold text-purple-100/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-main" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ===== QUOTE FOOTER ===== */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full
            bg-white/[0.04] backdrop-blur-xl
            border border-purple-main/20">
            <span className="text-[18px]">💡</span>
            <p className="text-[13px] font-bold tracking-tight text-purple-100/70">
              &ldquo;Learning never stops — I aim to grow and improve every single day.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}