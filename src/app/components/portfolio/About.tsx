import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, ArrowRight, Code, Database, Rocket } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

// High-performance requestAnimationFrame counter hook
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
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.95 }}
      transition={{ duration: 0.45, delay: 0.1 + delayIndex * 0.08, type: "spring", stiffness: 120 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative text-center p-3 sm:p-5 md:p-6 rounded-2xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] dark:from-cyan-400/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 select-none inline-block">
        {icon}
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white font-bold font-mono tracking-tight">
        {val}
        <span className="text-blue-600 dark:text-cyan-400 ml-0.5">{suffix}</span>
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-1.5 font-semibold tracking-wider uppercase font-mono truncate px-1">
        {label}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const stats = [
    { label: "Projects Built", value: 10, suffix: "+", icon: "🚀" },
    { label: "Technologies", value: 15, suffix: "+", icon: "⚙️" },
    { label: "Years Coding", value: 3, suffix: "+", icon: "📚" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden" ref={ref}>
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="01"
          label="About Me"
          title="Engineering"
          italicTitle="Story"
          subtitle="Full Stack Software Engineer specializing in modern MERN architecture, responsive UI design, and reliable web systems."
        />

        {/* ── EDITORIAL ABOUT ME STORY CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 p-5 sm:p-8 md:p-12 shadow-sm hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl mb-6 sm:mb-8 transition-all duration-300"
        >
          {/* Top Identifier Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-semibold uppercase tracking-wider font-mono">
              <Sparkles size={14} />
              Full Stack Software Engineer
            </span>
          </div>

          {/* Main Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug sm:leading-tight mb-5 sm:mb-6 max-w-3xl">
            Building scalable web products with modern technologies & user-centered design
          </h3>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl">
            <p>
              I'm <strong className="text-slate-900 dark:text-white font-semibold">Yerosan Girma</strong>, a Software Engineer studying Software Engineering at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong>. I specialize in architecting full-stack web applications with high performance, elegant UI, and clean code.
            </p>

            <p>
              My portfolio includes production-grade solutions like <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong> (Ethiopia's real estate rental platform), <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar</strong> (real-time conference communication), and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong> (fintech rotational savings).
            </p>

            <p>
              Whether engineering type-safe React interfaces or configuring optimized Node.js backends and databases, my focus is always on delivering fast, intuitive, and accessible software experiences.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-100 dark:border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("projects")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Contact Me</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ── STATS COUNTER GRID (COMPACT & BEAUTIFUL ON ALL SCREENS) ── */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
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
