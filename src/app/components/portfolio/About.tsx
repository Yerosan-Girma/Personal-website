import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  FileText,
  Code2,
  Layers,
  Cpu,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

// High-performance requestAnimationFrame counter hook with easeOutExpo easing
function useCountUp(target: number, duration = 1600, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let animId: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target, duration, trigger]);

  return count;
}

interface StatProps {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  trigger: boolean;
  delayIndex: number;
}

function StatCard({ label, value, suffix, icon, trigger, delayIndex }: StatProps) {
  const val = useCountUp(value, 1800, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: 0.1 + delayIndex * 0.08, type: "spring", stiffness: 120 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative text-center p-5 sm:p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] dark:from-cyan-400/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div
        whileHover={{ scale: 1.15, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-2xl sm:text-3xl mb-2.5 inline-block select-none"
      >
        {icon}
      </motion.div>
      <div className="text-3xl sm:text-4xl text-slate-900 dark:text-white font-bold font-mono tracking-tight">
        {val}
        <span className="text-blue-600 dark:text-cyan-400 ml-0.5">{suffix}</span>
      </div>
      <div className="text-slate-600 dark:text-slate-400 text-xs mt-2 font-medium tracking-wider uppercase font-mono">
        {label}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [activeTab, setActiveTab] = useState<"dossier" | "architecture" | "credentials">("dossier");
  const [copiedBio, setCopiedBio] = useState(false);

  const stats = [
    { label: "Projects Built", value: 10, suffix: "+", icon: "🚀" },
    { label: "Technologies", value: 15, suffix: "+", icon: "⚙️" },
    { label: "Years Coding", value: 3, suffix: "+", icon: "📚" },
    { label: "GitHub Repos", value: 20, suffix: "+", icon: "💻" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyBio = () => {
    navigator.clipboard?.writeText(
      "Yerosan Girma is a Full Stack Software Engineer pursuing a degree in Software Engineering at Haramaya University, specializing in React, TypeScript, Node.js, Express, PostgreSQL, and MongoDB."
    );
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="The Dossier"
          title="About The"
          italicTitle="Engineer"
          subtitle="Bridging architectural logic with clean, high-performance web applications and resilient database models."
        />

        {/* ── INTERACTIVE DEVELOPER CONSOLE & DOSSIER ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl mb-12 sm:mb-16 overflow-hidden"
        >
          {/* Console Header Bar with Interactive Tabs */}
          <div className="bg-slate-100/90 dark:bg-white/[0.04] border-b border-slate-200/90 dark:border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>

            {/* Interactive File Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-white/[0.06] p-1 rounded-xl">
              {[
                { id: "dossier", label: "overview.md", icon: FileText },
                { id: "architecture", label: "principles.ts", icon: Code2 },
                { id: "credentials", label: "credentials.json", icon: Terminal },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <TabIcon size={13} className={isActive ? "text-blue-600 dark:text-white" : "text-slate-400"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Copy Action */}
            <button
              onClick={handleCopyBio}
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copiedBio ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span className="text-[11px] font-mono">{copiedBio ? "Copied!" : "Copy Summary"}</span>
            </button>
          </div>

          {/* Console Tab Content */}
          <div className="p-6 sm:p-9 md:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "dossier" && (
                <motion.div
                  key="dossier"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-wider font-semibold mb-3">
                    <Terminal size={14} />
                    <span>Full Stack Engineering & Systems Design</span>
                  </div>

                  <h3 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-5">
                    Engineering reliable, scalable web applications with{" "}
                    <span className="italic font-serif font-light text-blue-600 dark:text-cyan-400">modern web architectures</span>.
                  </h3>

                  <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                    <p>
                      I'm a dedicated{" "}
                      <strong className="text-slate-900 dark:text-white font-semibold">Full Stack Software Engineer</strong>{" "}
                      currently pursuing my Software Engineering degree at{" "}
                      <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong>. My work unites clean
                      backend logic, normalized database architectures, and responsive, fluid user interfaces.
                    </p>
                    <p>
                      Throughout my journey, I have engineered and deployed complete digital platforms including{" "}
                      <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong> (Ethiopia's online home rental
                      marketplace), real-time live seminar suites (
                      <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar</strong>), and fintech rotational savings circles
                      (<strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong>).
                    </p>
                    <p>
                      I thrive on solving complex query performance constraints, designing modular component hierarchies,
                      maintaining high code quality, and building applications that users enjoy interacting with every day.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "architecture" && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                    <p className="text-blue-600 dark:text-cyan-400 font-bold text-sm mb-1">
                      // Architectural Standards & Engineering Tenets
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">
                      Core philosophies applied across every production repository:
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xs">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold mb-1">
                        <Layers size={14} />
                        <span>Separation of Concerns</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        Strict isolation between controllers, services, database repositories, and client view layers for testability and maintainability.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xs">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                        <Cpu size={14} />
                        <span>Predictable REST Endpoints</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        Idempotent HTTP methods, standardized JSON error envelopes, and complete Swagger/Postman contract documentation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xs">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                        <ShieldCheck size={14} />
                        <span>ACID Integrity & Indexing</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        Strategic B-Tree indexes cutting execution latency by up to 95%, wrapped in strict transaction boundaries.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-2xs">
                      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold mb-1">
                        <Sparkles size={14} />
                        <span>60 FPS Micro-Interactions</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        Optimized DOM recalculations, hardware-accelerated transforms, and sub-16ms render frames for fluid feedback.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "credentials" && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-slate-950 p-5 font-mono text-xs text-slate-200 shadow-inner overflow-x-auto border border-white/10"
                >
                  <pre className="text-[12px] leading-relaxed text-cyan-300">
{`{
  "engineer": "Yerosan Girma",
  "status": "Available for Full-time Roles & Contracts",
  "education": {
    "degree": "B.Sc. Software Engineering",
    "institution": "Haramaya University",
    "status": "In Progress / Degree Candidate"
  },
  "core_stack": [
    "React", "TypeScript", "Node.js", "Express.js",
    "PostgreSQL", "MongoDB", "Tailwind CSS"
  ],
  "experience": "3+ Years Building Production Web Applications",
  "location": {
    "city": "Addis Ababa",
    "country": "Ethiopia",
    "preference": "Remote (Worldwide) / Hybrid / Relocation"
  },
  "communication": {
    "email": "yerosang463@gmail.com",
    "github": "https://github.com/Yerosan-Girma"
  }
}`}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-6 border-t border-slate-100 dark:border-white/10 mt-6">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <span>View Featured Work</span>
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white text-sm font-semibold hover:border-slate-300 dark:hover:border-white/30 transition-all shadow-2xs cursor-pointer"
              >
                <span>Let's Discuss a Project</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Counter Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              icon={stat.icon}
              trigger={inView}
              delayIndex={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
