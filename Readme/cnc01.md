"use client";

/**
 * CNC Programming page — sab kuch ek hi file mein (3D machine + CSS + sections)
 * Zaroori: npm i three && npm i -D @types/three
 * Rakhein: src/app/cnc-programming/page.tsx
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import Navbar from "../../components/Navbar";

/* ───────────────────────── CSS (poora isi file mein) ───────────────────────── */
const CSS = `
.cnc-reveal { opacity: 0; transform: translateY(-80px) scale(.96); filter: blur(8px); transition: opacity .9s cubic-bezier(.2,.9,.2,1), transform .9s cubic-bezier(.2,.9,.2,1), filter .9s; will-change: transform, opacity; }
.cnc-reveal[data-in="true"] { opacity: 1; transform: none; filter: none; }
@media (prefers-reduced-motion: reduce) { .cnc-reveal { transition-duration: .01s; transform: none; filter: none; } }

.cnc-stage { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.cnc-stage canvas { display: block; width: 100%; height: 100%; }
.cnc-glow { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(60% 55% at 68% 52%, rgba(168, 85, 247, .22), transparent 70%); }

.cnc-hud { position: fixed; right: 22px; bottom: 22px; z-index: 6; display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 14px; background: var(--glass); backdrop-filter: blur(14px); box-shadow: 0 8px 30px -8px var(--glow), inset 0 0 0 1px var(--bd); font-size: 12px; letter-spacing: .08em; color: var(--text); }
.cnc-hud b { font-weight: 600; white-space: nowrap; }
.cnc-hud small { color: var(--muted); font-size: 11px; white-space: nowrap; }
.cnc-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--p); box-shadow: 0 0 12px var(--p); animation: cnc-blink 1.4s ease-in-out infinite; }
@keyframes cnc-blink { 50% { opacity: .3; } }
.cnc-bar { width: 70px; height: 4px; border-radius: 4px; background: var(--bd); overflow: hidden; }
.cnc-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--p2), var(--p)); box-shadow: 0 0 10px var(--p); transition: width .15s; }

.cnc-rail { position: fixed; right: 8px; top: 120px; bottom: 90px; width: 3px; z-index: 6; border-radius: 3px; background: var(--bd); overflow: hidden; }
.cnc-rail i { display: block; width: 100%; height: 100%; transform-origin: top; background: linear-gradient(180deg, var(--p2), var(--p)); box-shadow: 0 0 12px var(--p); }

@media (max-width: 820px) {
  .cnc-hud { right: 10px; bottom: 10px; padding: 8px 12px; font-size: 10px; }
  .cnc-bar { width: 44px; }
}

.cnc-content { position: relative; z-index: 2; }
.cnc-sec { min-height: 100vh; display: flex; align-items: center; padding: 110px clamp(20px, 6vw, 90px) 60px; }
.cnc-wrap { width: min(560px, 100%); }

.cnc-tag { display: inline-block; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; letter-spacing: .18em; color: var(--p); background: var(--bd); box-shadow: 0 0 20px var(--glow); margin-bottom: 18px; }
.cnc-title { font-size: clamp(38px, 6.4vw, 76px); line-height: 1.05; color: var(--text); }
.cnc-title em { font-style: normal; background: linear-gradient(90deg, var(--p), #e9d5ff, var(--p)); background-size: 200%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: cnc-flow 3s linear infinite; }
@keyframes cnc-flow { to { background-position: 200%; } }
.cnc-h2 { font-size: clamp(30px, 4.6vw, 52px); line-height: 1.1; color: var(--text); }
.cnc-h2::after { content: ""; display: block; width: 70px; height: 4px; margin-top: 14px; border-radius: 4px; background: linear-gradient(90deg, var(--p2), var(--p)); box-shadow: 0 0 16px var(--p); }
.cnc-lead { margin-top: 16px; color: var(--muted); line-height: 1.75; font-size: 15.5px; }

.cnc-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 28px; }
.cnc-btn { position: relative; overflow: hidden; display: inline-block; padding: 13px 26px; border-radius: 14px; font-weight: 600; font-size: 14.5px; color: #fff; text-decoration: none; background: linear-gradient(135deg, var(--p), var(--p2)); box-shadow: 0 8px 26px -6px var(--glow); transition: transform .3s, box-shadow .3s; }
.cnc-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 12px 34px -4px var(--p); }
.cnc-btn::after { content: ""; position: absolute; top: 0; left: -80%; width: 50%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.4), transparent); transform: skewX(-20deg); transition: left .7s; }
.cnc-btn:hover::after { left: 140%; }
.cnc-ghost { background: transparent; color: var(--text); box-shadow: inset 0 0 0 1.5px var(--p); }

.cnc-hint { display: flex; align-items: center; gap: 12px; margin-top: 40px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.cnc-hint span { width: 22px; height: 36px; border-radius: 12px; box-shadow: inset 0 0 0 2px var(--p); position: relative; }
.cnc-hint span::after { content: ""; position: absolute; left: 50%; top: 7px; width: 4px; height: 8px; margin-left: -2px; border-radius: 3px; background: var(--p); animation: cnc-wheel 1.6s ease-in-out infinite; }
@keyframes cnc-wheel { 0% { opacity: 0; transform: translateY(0); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(14px); } }

.cnc-steps, .cnc-cards { display: grid; gap: 14px; margin-top: 26px; }
.cnc-step, .cnc-card, .cnc-skill { padding: 18px 20px; border-radius: 18px; background: var(--glass); backdrop-filter: blur(14px); box-shadow: inset 0 0 0 1px var(--bd); transition: transform .35s, box-shadow .35s; }
.cnc-step:hover, .cnc-card:hover { transform: translateX(8px); box-shadow: 0 14px 34px -12px var(--glow), inset 0 0 0 1px var(--p); }
.cnc-step { display: flex; gap: 16px; align-items: flex-start; }
.cnc-step b { font-size: 26px; font-weight: 700; color: var(--p); text-shadow: 0 0 16px var(--glow); }
.cnc-step h3, .cnc-card h3 { font-size: 16.5px; color: var(--text); }
.cnc-step p, .cnc-card p { margin-top: 4px; font-size: 13.5px; color: var(--muted); line-height: 1.6; }

.cnc-skills { display: grid; gap: 12px; margin-top: 26px; }
.cnc-skillTop { display: flex; justify-content: space-between; font-size: 14px; color: var(--text); margin-bottom: 10px; }
.cnc-skillTop b { color: var(--p); }
.cnc-track { height: 6px; border-radius: 6px; background: var(--bd); overflow: hidden; }
.cnc-fill { display: block; height: 100%; width: var(--w); border-radius: 6px; background: linear-gradient(90deg, var(--p2), var(--p)); box-shadow: 0 0 12px var(--p); transform: scaleX(0); transform-origin: left; transition: transform 1.3s cubic-bezier(.2,.9,.2,1) .2s; }
[data-in="true"] .cnc-fill { transform: scaleX(1); }

@media (max-width: 820px) {
  .cnc-sec { align-items: flex-end; padding-top: 90px; padding-bottom: 70px; }
  .cnc-wrap { padding: 20px; border-radius: 22px; background: var(--glass); backdrop-filter: blur(16px); box-shadow: inset 0 0 0 1px var(--bd); }
  .cnc-step, .cnc-card, .cnc-skill { background: transparent; box-shadow: inset 0 0 0 1px var(--bd); }
}
`;

/* ───────────────────────── 3D scene ───────────────────────── */


/* ───────── helpers ───────── */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ───────── machine constants ───────── */
const TOP_Y = 1.46; // workpiece top surface
const DEPTH = 0.1; // pocket depth
const TOOL_LEN = 1.45; // head origin -> tool tip
const SAFE_HEAD = TOP_Y + 0.45 + TOOL_LEN;
const CUT_HEAD = TOP_Y - DEPTH + TOOL_LEN;
const TOOL_R = 0.07;

/* camera keyframes (scroll progress -> position / target) */
const CAMS: { p: number; pos: number[]; tgt: number[] }[] = [
  { p: 0.0, pos: [6.2, 3.6, 8.2], tgt: [0, 1.9, 0] },
  { p: 0.1, pos: [4.2, 3.0, 7.0], tgt: [0, 1.9, 0.3] },
  { p: 0.26, pos: [1.0, 2.6, 4.6], tgt: [0, 1.8, 0.3] },
  { p: 0.38, pos: [1.6, 2.35, 2.9], tgt: [0, 1.5, 0] },
  { p: 0.62, pos: [-1.5, 2.2, 2.6], tgt: [0, 1.45, 0] },
  { p: 0.84, pos: [1.7, 2.5, 3.2], tgt: [0, 1.5, 0] },
  { p: 0.93, pos: [3.8, 3.2, 6.4], tgt: [0, 1.9, 0] },
  { p: 1.0, pos: [-3.5, 3.4, 7.6], tgt: [0, 1.9, 0] },
];

const GCODE = [
  "%", "O1001 (POCKET-2D)", "G21 G90 G17 G54", "T01 M06 (D6 EM)", "S12000 M03",
  "G00 X-80. Y-45.", "G43 H01 Z19.1", "G01 Z-10. F300", "G01 X80. F1200",
  "G01 Y-34.", "G01 X-80.", "G01 Y-23.", "G01 X80.", "G01 Y-11.", "G01 X-80.",
  "(... REPEAT ...)", "G00 Z50.", "M05", "M30", "%",
];

/* zig-zag pocket toolpath, resampled by arc length */
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
  ctx.fillText("FANUC 0i-MF    AUTO    O1001", 12, 23);

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
  ctx.fillText("F 1200", 332, 242);
  ctx.fillStyle = "#2a1650";
  ctx.fillRect(332, 268, 158, 14);
  ctx.fillStyle = "#a855f7";
  ctx.fillRect(332, 268, 1.58 * st.pct, 14);
  ctx.fillStyle = "#fff";
  ctx.fillText(st.pct + "%", 332, 304);
}

function CncScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hud, setHud] = useState({ label: "MACHINE READY", pct: 0, p: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // WebGL not available
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = new RoomEnvironment();
    scene.environment = pmrem.fromScene(env, 0.04).texture;
    (scene as unknown as { environmentIntensity: number }).environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    /* ───────── materials ───────── */
    const M = {
      body: new THREE.MeshStandardMaterial({ color: 0x23262f, metalness: 0.7, roughness: 0.42 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x9aa1b0, metalness: 0.9, roughness: 0.28 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x101218, metalness: 0.5, roughness: 0.6 }),
      purple: new THREE.MeshStandardMaterial({ color: 0x7c3aed, metalness: 0.4, roughness: 0.35, emissive: 0x5b21b6, emissiveIntensity: 0.9 }),
      led: new THREE.MeshBasicMaterial({ color: 0xc084fc }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x9db4ff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false }),
      gold: new THREE.MeshStandardMaterial({ color: 0xd4a72c, metalness: 1, roughness: 0.25 }),
    };
    const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
    const cyl = (rt: number, rb: number, h: number, s = 32) => new THREE.CylinderGeometry(rt, rb, h, s);
    const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material | THREE.Material[], x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    };

    const machine = new THREE.Group();
    scene.add(machine);

    /* ───────── floor ───────── */
    const fc = document.createElement("canvas");
    fc.width = fc.height = 256;
    const fx = fc.getContext("2d")!;
    const fg = fx.createRadialGradient(128, 128, 10, 128, 128, 128);
    fg.addColorStop(0, "#fff");
    fg.addColorStop(0.55, "#aaa");
    fg.addColorStop(1, "#000");
    fx.fillStyle = fg;
    fx.fillRect(0, 0, 256, 256);
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(16, 96),
      new THREE.MeshStandardMaterial({ color: 0x0d0818, metalness: 0.8, roughness: 0.32, transparent: true, alphaMap: new THREE.CanvasTexture(fc) })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    const grid = new THREE.GridHelper(30, 60, 0x7c3aed, 0x2a1650);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.22;
    grid.position.y = 0.003;
    scene.add(grid);
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.85, 3.9, 128), M.led);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.006;
    scene.add(ring);

    /* ───────── base, bed, column ───────── */
    [[-1.6, -1.2], [1.6, -1.2], [-1.6, 1.2], [1.6, 1.2]].forEach(([x, z]) => add(machine, cyl(0.12, 0.14, 0.12), M.dark, x, 0.06, z));
    add(machine, box(3.7, 0.1, 2.9), M.dark, 0, 0.17, 0);
    add(machine, box(3.6, 0.88, 2.8), M.body, 0, 0.56, 0);
    add(machine, box(3.3, 0.025, 0.02), M.led, 0, 0.3, 1.41);
    add(machine, box(0.02, 0.025, 2.5), M.led, 1.81, 0.3, 0);
    add(machine, box(0.02, 0.025, 2.5), M.led, -1.81, 0.3, 0);
    add(machine, box(2.6, 2.95, 0.9), M.body, 0, 2.475, -0.95);
    add(machine, box(2.7, 0.1, 1.0), M.dark, 0, 3.97, -0.95);
    add(machine, box(2.62, 0.05, 0.92), M.purple, 0, 3.88, -0.95);
    [-0.55, 0.55].forEach((x) => add(machine, box(0.07, 2.5, 0.06), M.steel, x, 2.7, -0.52));
    [-0.9, 0.9].forEach((x) => add(machine, box(0.08, 0.06, 2.4), M.steel, x, 1.03, 0)); // table rails

    /* nameplate + control screen */
    const nc = document.createElement("canvas");
    nc.width = 512; nc.height = 128;
    const nx = nc.getContext("2d")!;
    nx.fillStyle = "#0b0716"; nx.fillRect(0, 0, 512, 128);
    nx.shadowColor = "#a855f7"; nx.shadowBlur = 18;
    nx.fillStyle = "#e9d5ff"; nx.font = "bold 64px sans-serif"; nx.textBaseline = "middle";
    nx.fillText("X-MILL 5000", 22, 66);
    const nameTex = new THREE.CanvasTexture(nc);
    nameTex.colorSpace = THREE.SRGBColorSpace;
    const plate = add(machine, new THREE.PlaneGeometry(1.2, 0.3), new THREE.MeshBasicMaterial({ map: nameTex, toneMapped: false }), -1.0, 0.62, 1.411);
    plate.castShadow = false;

    const sc = document.createElement("canvas");
    sc.width = 512; sc.height = 330;
    const sctx = sc.getContext("2d")!;
    const screenTex = new THREE.CanvasTexture(sc);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    const panel = new THREE.Group();
    panel.position.set(1.0, 0.58, 1.5);
    panel.rotation.x = -0.25;
    machine.add(panel);
    add(panel, box(1.15, 0.8, 0.08), M.dark);
    add(panel, new THREE.PlaneGeometry(1.0, 0.64), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }), 0, 0, 0.045);

    /* ───────── tool changer carousel ───────── */
    const atc = new THREE.Group();
    atc.position.set(-1.78, 3.3, -0.85);
    machine.add(atc);
    add(atc, new THREE.CylinderGeometry(0.5, 0.5, 0.14, 48).rotateX(Math.PI / 2), M.steel);
    add(atc, new THREE.CylinderGeometry(0.12, 0.12, 0.2, 24).rotateX(Math.PI / 2), M.purple);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const t = add(atc, new THREE.CylinderGeometry(0.045, 0.045, 0.32, 12).rotateX(Math.PI / 2), i % 3 === 0 ? M.gold : M.steel, Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0.2);
      t.castShadow = true;
    }

    /* ───────── spindle head + tool ───────── */
    const head = new THREE.Group();
    head.position.set(0, SAFE_HEAD, 0);
    machine.add(head);
    add(head, box(0.9, 0.9, 0.7), M.body);
    add(head, box(0.92, 0.06, 0.72), M.purple, 0, 0.2, 0);
    add(head, box(1.2, 1.1, 0.25), M.dark, 0, 0, -0.42);
    add(head, cyl(0.28, 0.28, 0.3), M.steel, 0, 0.6, 0);
    add(head, cyl(0.22, 0.18, 0.35), M.steel, 0, -0.625, 0);
    add(head, box(0.3, 0.05, 0.05), M.led, 0, -0.42, 0.36);
    const noz = add(head, cyl(0.012, 0.012, 0.55), M.steel, 0.24, -0.95, 0.14);
    noz.rotation.z = 0.32;
    const noz2 = add(head, cyl(0.012, 0.012, 0.55), M.steel, -0.24, -0.95, 0.14);
    noz2.rotation.z = -0.32;
    const tool = new THREE.Group();
    head.add(tool);
    add(tool, cyl(0.14, 0.14, 0.05), M.steel, 0, -0.78, 0);
    add(tool, cyl(0.12, 0.07, 0.2), M.dark, 0, -0.9, 0);
    add(tool, cyl(TOOL_R, TOOL_R, 0.45), M.gold, 0, -1.225, 0);
    add(tool, box(TOOL_R * 2.1, 0.45, 0.012), M.dark, 0, -1.225, 0);
    add(tool, box(0.012, 0.45, TOOL_R * 2.1), M.dark, 0, -1.225, 0);

    /* ───────── table + workpiece ───────── */
    const table = new THREE.Group();
    machine.add(table);
    add(table, box(2.6, 0.12, 1.9), M.steel, 0, 1.12, 0);
    [-1.15, 1.15].forEach((x) => add(table, box(0.05, 0.005, 1.9), M.dark, x, 1.183, 0));
    [[-1.08, -0.45], [1.08, -0.45], [-1.08, 0.45], [1.08, 0.45]].forEach(([x, z]) => add(table, box(0.14, 0.1, 0.2), M.purple, x, 1.23, z));

    const work = new THREE.Group();
    work.position.set(0, 1.32, 0);
    table.add(work);
    const side = new THREE.MeshStandardMaterial({ color: 0x9ea3b0, metalness: 0.85, roughness: 0.4 });
    const hidden = new THREE.MeshBasicMaterial({ visible: false });
    add(work, box(2.0, 0.28, 1.3), [side, side, hidden, side, side, side]);

    // heightfield top surface (gets carved by scroll)
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
    const hfMesh = add(work, hf, new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.85, roughness: 0.38, side: THREE.DoubleSide }), 0, 0.14, 0);
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
    void hfMesh;

    /* ───────── enclosure + sliding doors ───────── */
    [-1.78, 1.78].forEach((x) => {
      add(machine, box(0.03, 2.85, 1.9), M.glass, x, 2.475, 0.45);
      add(machine, box(0.1, 2.95, 0.1), M.body, x, 2.475, 1.4);
      add(machine, box(0.1, 0.1, 1.95), M.body, x, 3.95, 0.45);
    });
    add(machine, box(3.65, 0.1, 0.1), M.body, 0, 3.95, 1.4);
    add(machine, box(5.6, 0.05, 0.08), M.dark, 0, 3.99, 1.52);
    add(machine, box(5.6, 0.05, 0.08), M.dark, 0, 1.02, 1.52);
    add(machine, box(3.6, 0.04, 0.03), M.purple, 0, 1.0, 1.43);

    const makeDoor = (handleX: number) => {
      const g = new THREE.Group();
      add(g, box(1.75, 0.08, 0.06), M.body, 0, 1.385, 0);
      add(g, box(1.75, 0.08, 0.06), M.body, 0, -1.385, 0);
      add(g, box(0.08, 2.85, 0.06), M.body, -0.835, 0, 0);
      add(g, box(0.08, 2.85, 0.06), M.body, 0.835, 0, 0);
      add(g, box(1.66, 2.7, 0.02), M.glass);
      add(g, box(0.04, 0.6, 0.05), M.purple, handleX, 0, 0.06);
      return g;
    };
    const doorL = makeDoor(0.75);
    const doorR = makeDoor(-0.75);
    doorL.position.set(-0.875, 2.475, 1.42);
    doorR.position.set(0.875, 2.475, 1.48);
    machine.add(doorL, doorR);

    /* ───────── sparks / chips ───────── */
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
    scene.add(new THREE.HemisphereLight(0x8b7cff, 0x120a1f, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 9, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -7; key.shadow.camera.right = 7;
    key.shadow.camera.top = 7; key.shadow.camera.bottom = -7;
    key.shadow.camera.near = 1; key.shadow.camera.far = 30;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const pl1 = new THREE.PointLight(0xa855f7, 80, 14); pl1.position.set(-4, 3, 4); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7c3aed, 90, 16); pl2.position.set(4, 4, -5); scene.add(pl2);
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
      camera.fov = w / h < 1 ? 52 : 38;
      if (w / h > 1.1) camera.setViewOffset(w, h, -w * 0.17, 0, w, h); // machine to the right
      else camera.setViewOffset(w, h, 0, h * 0.14, w, h); // machine up on mobile
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* ───────── animation ───────── */
    let raf = 0, last = performance.now(), ps = -1, spin = 0;
    let lastLabel = "", lastPct = -1, lastP = -1, lastScreen = 0, lastKey = "";
    const dro: Dro = { line: 0, x: 0, y: 0, z: 0, rpm: 0, pct: 0 };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = max > 0 ? clamp(window.scrollY / max) : 0;
      ps = ps < 0 ? target : ps + (target - ps) * Math.min(1, dt * 5);
      const p = ps;

      // camera
      let i = 0;
      while (i < CAMS.length - 2 && p > CAMS[i + 1].p) i++;
      const a = CAMS[i], b = CAMS[i + 1];
      const t = sstep(a.p, b.p, p);
      const sway = Math.sin(now / 1800) * 0.12 * (1 - sstep(0, 0.1, p));
      camera.position.set(lerp(a.pos[0], b.pos[0], t) + sway, lerp(a.pos[1], b.pos[1], t), lerp(a.pos[2], b.pos[2], t));
      camera.lookAt(lerp(a.tgt[0], b.tgt[0], t), lerp(a.tgt[1], b.tgt[1], t), lerp(a.tgt[2], b.tgt[2], t));

      // doors
      const d = sstep(0.1, 0.26, p) * (1 - sstep(0.93, 0.99, p));
      doorL.position.x = -0.875 - d * 1.0;
      doorR.position.x = 0.875 + d * 1.0;
      interior.intensity = d * 18;

      // cutting timeline
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
      table.position.set(-tx, 0, -tz);
      const headY = SAFE_HEAD + (CUT_HEAD - SAFE_HEAD) * plunge * (1 - ret);
      head.position.y = headY;
      const cutting = s > 0.17 && s < 0.9 && c > 0 && c < 1;

      const spinTarget = s > 0.02 && s < 0.97 ? (cutting ? 60 : 28) : 0;
      spin = lerp(spin, spinTarget, Math.min(1, dt * 4));
      tool.rotation.y += dt * spin;
      atc.rotation.z = p * Math.PI * 6;

      if (Math.abs(c - lastC) > 0.0012) applyCut(c);

      // sparks
      if (cutting) acc += dt * 170;
      while (acc >= 1) {
        acc -= 1;
        for (let n = 0; n < PN; n++) {
          if (plife[n] <= 0) {
            const ang = Math.random() * Math.PI * 2, sp = 0.5 + Math.random() * 1.2;
            ppos[n * 3] = 0; ppos[n * 3 + 1] = TOP_Y - DEPTH + 0.02; ppos[n * 3 + 2] = 0;
            pvel[n * 3] = Math.cos(ang) * sp; pvel[n * 3 + 1] = 0.8 + Math.random() * 1.6; pvel[n * 3 + 2] = Math.sin(ang) * sp;
            plife[n] = 0.5 + Math.random() * 0.6;
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

      // control screen
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
      dro.rpm = spin > 1 ? (spin / 60) * 12000 : 0;
      dro.pct = Math.round(c * 100);
      const sk = `${dro.line}|${dro.x.toFixed(1)}|${dro.y.toFixed(1)}|${dro.z.toFixed(0)}|${dro.pct}|${Math.round(dro.rpm / 100)}`;
      if (sk !== lastKey && now - lastScreen > 60) {
        drawScreen(sctx, 512, 330, dro);
        screenTex.needsUpdate = true;
        lastKey = sk;
        lastScreen = now;
      }

      // HUD
      let label: string;
      if (p < 0.1) label = "MACHINE READY";
      else if (p < 0.27) label = "DOOR OPENING";
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
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh || (o as THREE.Points).isPoints) {
          m.geometry?.dispose();
        }
      });
      Object.values(M).forEach((mt) => mt.dispose());
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

/* ───────────────────────── scroll reveal ───────────────────────── */


/** Section upar se neeche aati hai jab screen mein aaye, wapas scroll par dobara animate hoti hai */
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

/* ───────────────────────── page ───────────────────────── */


const STEPS = [
  { n: "01", t: "CAD Model", d: "Part drawing aur GD&T samajh kar stock, datum aur setup plan karna." },
  { n: "02", t: "CAM Toolpath", d: "Roughing, finishing aur drilling toolpaths — speeds, feeds aur stepover optimize." },
  { n: "03", t: "G-Code Post", d: "Machine-specific post-processor, simulation aur collision check." },
  { n: "04", t: "Machining", d: "First-off proof, offsets set karna aur production run." },
];

const SKILLS = [
  { n: "G-Code & M-Code", v: 95 },
  { n: "Fanuc / Siemens / Haas", v: 90 },
  { n: "Mastercam / Fusion 360", v: 88 },
  { n: "3-Axis & 4-Axis Milling", v: 92 },
  { n: "Fixture & Work Holding", v: 82 },
  { n: "GD&T & Inspection", v: 85 },
];

const PROJECTS = [
  { t: "Aluminium Manifold", m: "6061-T6 · 3-axis · ±0.01 mm" },
  { t: "Gear Housing", m: "Cast iron · 4-axis · 14 ops" },
  { t: "Injection Mold Cavity", m: "P20 steel · finishing 0.4 Ra" },
];

export default function CncProgrammingPage() {
  useEffect(() => {
    document.title = "CNC Programming | Leo";
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <CncScene />
      <Navbar />

      <main className="cnc-content">
        {/* HERO */}
        <section id="home" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <span className="cnc-tag">CNC PROGRAMMING</span>
            <h1 className="cnc-title">
              Precision Code.<br />
              <em>Perfect Parts.</em>
            </h1>
            <p className="cnc-lead">
              Main CNC milling ke liye G-code aur CAM toolpaths banata hoon — design se le kar finished part tak.
              Scroll karein aur machine ko kaam karte dekhein.
            </p>
            <div className="cnc-btns">
              <a href="#projects" className="cnc-btn">View Projects</a>
              <a href="#contact" className="cnc-btn cnc-ghost">Contact</a>
            </div>
            <div className="cnc-hint"><span /> Scroll to open the machine</div>
          </Reveal>
        </section>

        {/* PROCESS */}
        <section id="process" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">From CAD to Chips</h2>
            <p className="cnc-lead">Machine ka darwaza khul gaya — ye mera workflow hai.</p>
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

        {/* SKILLS */}
        <section id="skills" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">G-Code &amp; CAM Skills</h2>
            <p className="cnc-lead">Tool ab material kaat raha hai — aur ye meri strengths hain.</p>
            <div className="cnc-skills">
              {SKILLS.map((s) => (
                <div key={s.n} className="cnc-skill">
                  <div className="cnc-skillTop"><span>{s.n}</span><b>{s.v}%</b></div>
                  <div className="cnc-track"><i className="cnc-fill" style={{ "--w": `${s.v}%` } as CSSProperties} /></div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">Machined Projects</h2>
            <p className="cnc-lead">Kuch parts jo is tarah program kar ke banaye gaye.</p>
            <div className="cnc-cards">
              {PROJECTS.map((p) => (
                <div key={p.t} className="cnc-card">
                  <h3>{p.t}</h3>
                  <p>{p.m}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="cnc-sec">
          <Reveal className="cnc-wrap">
            <h2 className="cnc-h2">Let&apos;s Make Something</h2>
            <p className="cnc-lead">Part ka drawing bhejein — main toolpath aur G-code tayyar kar dunga. Upar &quot;Connect&quot; se rabta karein.</p>
            <div className="cnc-btns">
              <a href="mailto:you@example.com" className="cnc-btn">Send Drawing</a>
              <a href="#home" className="cnc-btn cnc-ghost">Back to Top</a>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}