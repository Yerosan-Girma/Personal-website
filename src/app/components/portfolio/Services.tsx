import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  Check,
  Activity,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

/* ─────────────────────────────────────────────────────────────
   1. FRONTEND PLAYGROUND WIDGET
   ───────────────────────────────────────────────────────────── */
function FrontendPlayground() {
  const [theme, setTheme] = useState<"blue" | "dark" | "emerald">("blue");
  const [clicked, setClicked] = useState(false);
  const [toast, setToast] = useState(false);

  const handleTestClick = () => {
    setClicked(true);
    setToast(true);
    setTimeout(() => setClicked(false), 200);
    setTimeout(() => setToast(false), 2200);
  };

  const themeClasses = {
    blue: "bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/70 dark:from-slate-900/90 dark:via-slate-950 dark:to-blue-950/40 border-blue-200/90 dark:border-blue-900/50 text-slate-900 dark:text-white",
    dark: "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 border-gray-800 text-white",
    emerald: "bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 dark:from-slate-900/90 dark:via-slate-950 dark:to-emerald-950/40 border-emerald-200/90 dark:border-emerald-900/50 text-slate-900 dark:text-white",
  };

  const buttonClasses = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20",
    dark: "bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-md shadow-cyan-500/30",
    emerald: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20",
  };

  return (
    <div className="space-y-3.5">
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-300 px-2 flex items-center gap-1.5">
          <Activity size={13} className="text-blue-600 dark:text-cyan-400" /> Theme Sandbox:
        </span>
        <div className="flex gap-1">
          {(["blue", "dark", "emerald"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                theme === t
                  ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-transparent"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive UI Sandbox Window */}
      <motion.div
        layout
        transition={{ duration: 0.3 }}
        className={`rounded-2xl border p-4 sm:p-5 transition-colors duration-300 relative overflow-hidden shadow-2xs ${themeClasses[theme]}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono opacity-60 ml-2">Reactive Sandbox</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-400/10 text-blue-600 dark:text-cyan-400">
            60 FPS
          </span>
        </div>

        <p className="text-xs font-medium mb-3 opacity-80">
          Click button to trigger reactive state dispatch:
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleTestClick}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${buttonClasses[theme]}`}
          >
            <Play size={12} fill="currentColor" />
            <span>Dispatch Action</span>
          </motion.button>

          <span className="text-[11px] font-mono opacity-70">
            {clicked ? "⚡ Dispatched!" : "Ready for interaction"}
          </span>
        </div>

        {/* Live Feedback Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="mt-3 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2"
            >
              <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>State updated cleanly • Re-render: 1.1ms</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Metric badges */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Lighthouse</p>
          <p className="font-bold text-blue-600 dark:text-cyan-400 mt-0.5 text-xs">98 / 100</p>
        </div>
        <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Accessibility</p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 text-xs">WCAG AA</p>
        </div>
        <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-2xs">
          <p className="text-[9px] text-slate-400 font-mono uppercase">Fluidity</p>
          <p className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 text-xs">60 FPS</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. BACKEND & API TERMINAL WIDGET
   ───────────────────────────────────────────────────────────── */
function BackendTerminal() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Express 4.x runtime initialized",
    "[SECURITY] Helmet & CORS loaded",
    "[DB] PostgreSQL pool: 12 active",
  ]);

  const runRequest = () => {
    if (running) return;
    setRunning(true);
    setLogs((prev) => [...prev, "➔ POST /api/auth/jwt - Verifying bcrypt hash..."]);
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "✔ JWT issued: RSA-256 signed",
        "HTTP/1.1 200 OK • Latency: 14ms",
      ]);
      setRunning(false);
    }, 600);
  };

  const clearLogs = () => {
    setLogs([
      "[SYSTEM] Express 4.x runtime initialized",
      "[DB] PostgreSQL pool: 12 active",
    ]);
  };

  return (
    <div className="space-y-3">
      {/* Terminal Frame */}
      <div className="rounded-2xl bg-slate-950 text-slate-100 p-4 border border-slate-800 dark:border-white/10 shadow-xl font-mono text-xs overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] text-slate-400 ml-2">node server.js</span>
          </div>
          <span className="text-[9px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-mono">
            ● 200 OK
          </span>
        </div>

        {/* Console log list */}
        <div className="space-y-1.5 h-28 overflow-y-auto pr-1 text-[11px] text-slate-300">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`${
                log.startsWith("✔")
                  ? "text-emerald-400 font-semibold"
                  : log.startsWith("➔")
                  ? "text-cyan-400 font-semibold"
                  : log.startsWith("HTTP")
                  ? "text-amber-300 font-bold"
                  : "text-slate-400"
              }`}
            >
              {log}
            </div>
          ))}
          {running && <div className="text-cyan-300 animate-pulse">Processing request...</div>}
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex items-center justify-between gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runRequest}
          disabled={running}
          className="flex-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
        >
          <Play size={12} fill="currentColor" />
          <span>Execute API Call (POST /auth)</span>
        </motion.button>

        <button
          onClick={clearLogs}
          className="px-2.5 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={11} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. DATABASE QUERY BENCHMARK WIDGET
   ───────────────────────────────────────────────────────────── */
function DatabaseBenchmark() {
  const [indexed, setIndexed] = useState(true);

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Execution Mode
        </span>
        <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg text-[11px] font-semibold">
          <button
            onClick={() => setIndexed(false)}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              !indexed
                ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Raw Scan
          </button>
          <button
            onClick={() => setIndexed(true)}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              indexed
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            B-Tree Index
          </button>
        </div>
      </div>

      {/* Execution Visualizer Bar */}
      <div>
        <div className="flex justify-between text-xs font-semibold mb-1.5">
          <span className="text-slate-700 dark:text-slate-300">Query Latency:</span>
          <span className={indexed ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-500 font-bold"}>
            {indexed ? "4 ms (97% Faster)" : "148 ms (Table Scan)"}
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: indexed ? "5%" : "90%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full rounded-full ${
              indexed
                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                : "bg-gradient-to-r from-rose-500 to-amber-500"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <p className="text-slate-400 text-[10px]">INDEX STATUS</p>
          <p className="font-bold text-slate-800 dark:text-slate-200">{indexed ? "B-Tree Compound" : "Full Scan"}</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <p className="text-slate-400 text-[10px]">INTEGRITY</p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400">ACID Compliant</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. FULL STACK PIPELINE VISUALIZER
   ───────────────────────────────────────────────────────────── */
function FullStackPipeline() {
  const [pulseStep, setPulseStep] = useState<number | null>(null);

  const triggerPulse = () => {
    if (pulseStep !== null) return;
    setPulseStep(0);
    setTimeout(() => setPulseStep(1), 400);
    setTimeout(() => setPulseStep(2), 800);
    setTimeout(() => setPulseStep(3), 1200);
    setTimeout(() => setPulseStep(null), 1800);
  };

  const steps = [
    { name: "React Client", role: "UI & State" },
    { name: "Express API", role: "Auth & Routes" },
    { name: "Database Tier", role: "Postgres / Mongo" },
    { name: "Cloud Deploy", role: "Vercel / Render" },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Pipeline Stream
        </span>
        <button
          onClick={triggerPulse}
          disabled={pulseStep !== null}
          className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer disabled:opacity-50"
        >
          <Zap size={13} className="text-amber-500 fill-amber-500" />
          <span>Simulate Flow</span>
        </button>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((st, idx) => {
          const isActive = pulseStep === idx;
          return (
            <motion.div
              key={st.name}
              animate={isActive ? { scale: 1.05, y: -3 } : { scale: 1, y: 0 }}
              className={`p-2.5 rounded-xl border text-center transition-all duration-200 relative ${
                isActive
                  ? "bg-blue-500/10 dark:bg-cyan-500/15 border-blue-600 dark:border-cyan-400 shadow-sm shadow-blue-500/20"
                  : "bg-slate-50 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200"
              }`}
            >
              <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{st.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{st.role}</p>

              {isActive && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
        <Sparkles size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
        <span className="text-[11px] font-medium">Unified TypeScript contracts & zero-downtime CI/CD.</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT: INTERACTIVE SERVICES BENTO STUDIO
   ───────────────────────────────────────────────────────────── */
export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="03"
          label="Capabilities"
          title="Technical"
          italicTitle="Capabilities"
          subtitle="Delivering complete, production-grade web solutions — from responsive client interfaces to high-throughput backend APIs and optimized database layers."
        />

        {/* ── THE INTERACTIVE BENTO GRID MATRIX ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-12 sm:mb-16">
          {/* Card 1: Frontend Engineering (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="md:col-span-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.08)] hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all flex flex-col justify-between relative group"
          >
            {/* Editorial Corner Accent */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-blue-500/40 dark:border-cyan-400/40 rounded-tl-sm pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-500/40 dark:border-cyan-400/40 rounded-br-sm pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                    <Monitor size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Frontend Engineering</h3>
                    <p className="text-xs text-blue-600 dark:text-cyan-400 font-medium">UI Systems & Micro-Interactions</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  01 / 04
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Building responsive, accessible web interfaces with fluid 60 FPS motion design, reusable React architectures, and Tailwind CSS design systems.
              </p>

              {/* Embedded Interactive Playground */}
              <div className="mb-5">
                <FrontendPlayground />
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/10 mb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>React & TypeScript Components</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Mobile-First Responsive Layouts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Tactile Micro-Interactions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Lighthouse 95+ Performance</span>
                </div>
              </div>
            </div>

            {/* Stack Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Backend Architecture (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="md:col-span-5 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.08)] hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all flex flex-col justify-between relative group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Backend Runtimes</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Modular Express & REST APIs</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  02 / 04
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Designing modular server architectures with JWT auth, request validation, rate limiting, and predictable JSON endpoints.
              </p>

              {/* Embedded Terminal Simulator */}
              <div className="mb-5">
                <BackendTerminal />
              </div>

              {/* Key Features */}
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/10 mb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Layered MVC Architecture</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>JWT & Role-Based Access Control</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Robust Error Handling & CORS</span>
                </div>
              </div>
            </div>

            {/* Stack Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
              {["Node.js", "Express.js", "JWT", "Bcrypt", "REST"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Database Architecture (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="md:col-span-5 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.08)] hover:border-emerald-500/40 dark:hover:border-emerald-400/40 transition-all flex flex-col justify-between relative group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Database Optimization</h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">PostgreSQL & MongoDB</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  03 / 04
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Designing normalized schemas, query indexes, and aggregation pipelines to maximize throughput and ensure ACID data integrity.
              </p>

              {/* Embedded Benchmark Widget */}
              <div className="mb-5">
                <DatabaseBenchmark />
              </div>

              {/* Key Features */}
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/10 mb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Compound B-Tree Query Indexing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Relational & Document Schemas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>ACID Transaction Guarantees</span>
                </div>
              </div>
            </div>

            {/* Stack Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
              {["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Mongoose"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Full Stack Integration (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -4 }}
            className="md:col-span-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.08)] hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all flex flex-col justify-between relative group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Full Stack Integration</h3>
                    <p className="text-xs text-blue-600 dark:text-cyan-400 font-medium">End-to-End Web Products</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                  04 / 04
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Connecting clients with backends, payment gateways, and cloud deployment pipelines for seamless, production-ready web platforms.
              </p>

              {/* Embedded Pipeline Visualizer */}
              <div className="mb-5">
                <FullStackPipeline />
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-white/10 mb-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Real-Time WebSockets Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Stripe Payment Integration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>CI/CD & Cloud Deployment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>Type-Safe Client-Server Contracts</span>
                </div>
              </div>
            </div>

            {/* Stack Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
              {["MERN Stack", "PostgreSQL", "WebSockets", "Stripe API", "Vercel", "Render"].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-900 to-slate-950 text-white p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles size={12} className="text-cyan-300" />
              Custom Engineering
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">Have a custom software requirement?</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Let's discuss architecture, tech stack selection, and milestone delivery roadmaps.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToContact}
            className="relative z-10 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
