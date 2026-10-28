import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  FileText,
  Code2,
  GraduationCap,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

// High performance requestAnimationFrame counter hook with easeOutExpo easing
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
      whileHover={{ y: -6, scale: 1.025, boxShadow: "0 16px 32px -10px rgba(29, 78, 216, 0.14)" }}
      className="relative text-center p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:border-[#1D4ED8]/40 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div
        whileHover={{ scale: 1.15, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-2xl sm:text-3xl mb-2.5 inline-block"
      >
        {icon}
      </motion.div>
      <div className="text-3xl sm:text-4xl text-gray-900 font-bold font-mono tracking-tight">
        {val}
        <span className="text-[#1D4ED8] ml-0.5">{suffix}</span>
      </div>
      <div className="text-gray-600 text-xs mt-2 font-medium tracking-wider uppercase">
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
      "Yerosan Girma is a Full Stack Software Engineer pursuing a degree in Software Engineering at Haramaya University, specializing in React, Node.js, Express, PostgreSQL, and MongoDB."
    );
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-xs font-bold tracking-[0.22em] uppercase"
          >
            <Sparkles size={12} className="text-[#1D4ED8]" />
            Dossier & Bio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 mt-3 sm:mt-4 leading-tight text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Bridging architectural logic with clean, high-performance web applications.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4 origin-left"
          />
        </motion.div>

        {/* ── INTERACTIVE DEVELOPER CONSOLE & DOSSIER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl bg-white border border-gray-200/90 shadow-md shadow-blue-900/5 mb-12 sm:mb-14 overflow-hidden"
        >
          {/* Console Header Bar with Interactive Tabs */}
          <div className="bg-gray-50/90 border-b border-gray-200/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            {/* macOS Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>

            {/* Interactive File Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-200/60 p-1 rounded-xl">
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
                        ? "bg-white text-[#1D4ED8] shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <TabIcon size={13} className={isActive ? "text-[#1D4ED8]" : "text-gray-400"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Copy Action */}
            <button
              onClick={handleCopyBio}
              className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-gray-200/50 transition-colors cursor-pointer"
            >
              {copiedBio ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
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
                  <div className="inline-flex items-center gap-2 text-[#1D4ED8] text-xs font-mono uppercase tracking-wider font-semibold mb-3">
                    <Terminal size={14} />
                    <span>Full Stack Engineering & Systems Design</span>
                  </div>

                  <h3 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-5">
                    Engineering reliable, scalable web applications with{" "}
                    <span className="text-[#1D4ED8]">modern web architectures</span>.
                  </h3>

                  <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                    <p>
                      I'm a dedicated{" "}
                      <strong className="text-gray-900 font-semibold">Full Stack Software Engineer</strong>{" "}
                      currently pursuing my Software Engineering degree at{" "}
                      <strong className="text-gray-900 font-semibold">Haramaya University</strong>. My work unites clean
                      backend logic, normalized database architectures, and responsive, fluid user interfaces.
                    </p>
                    <p>
                      Throughout my journey, I have engineered and deployed complete digital platforms including{" "}
                      <strong className="text-gray-900 font-semibold">Kiray Bet</strong> (Ethiopia's online home rental
                      marketplace), real-time live seminar suites (
                      <strong className="text-gray-900 font-semibold">WabiSeminar</strong>), and fintech rotational savings circles
                      (<strong className="text-gray-900 font-semibold">Digital Equb</strong>).
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
                  className="space-y-4 font-mono text-xs text-gray-800"
                >
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                    <p className="text-[#1D4ED8] font-bold text-sm mb-1">
                      // Architectural Standards & Engineering Tenets
                    </p>
                    <p className="text-gray-600 text-xs">
                      Core philosophies applied across every production repository:
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
                      <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                        <Layers size={14} />
                        <span>Separation of Concerns</span>
                      </div>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        Strict isolation between controllers, services, database repositories, and client view layers for testability and maintainability.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
                      <div className="flex items-center gap-2 text-indigo-700 font-bold mb-1">
                        <Cpu size={14} />
                        <span>Predictable REST Endpoints</span>
                      </div>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        Idempotent HTTP methods, standardized JSON error envelopes, and complete Swagger/Postman contract documentation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                        <ShieldCheck size={14} />
                        <span>ACID Integrity & Indexing</span>
                      </div>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
                        Strategic B-Tree indexes cutting execution latency by up to 95%, wrapped in strict transaction boundaries.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
                      <div className="flex items-center gap-2 text-cyan-700 font-bold mb-1">
                        <Sparkles size={14} />
                        <span>60 FPS Micro-Interactions</span>
                      </div>
                      <p className="text-gray-600 text-[11px] leading-relaxed">
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
                  className="rounded-2xl bg-gray-950 p-5 font-mono text-xs text-gray-200 shadow-inner overflow-x-auto"
                >
                  <pre className="text-[12px] leading-relaxed text-blue-300">
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
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-6 border-t border-gray-100 mt-6">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <span>View Featured Work</span>
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:border-gray-400 hover:text-gray-900 transition-all shadow-2xs cursor-pointer"
              >
                <span>Let's Discuss a Project</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Counter Section */}
        <div>
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
      </div>
    </section>
  );
}
