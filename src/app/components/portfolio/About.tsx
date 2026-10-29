import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  MapPin,
  Code2,
  Briefcase,
  Layers,
  CheckCircle2,
  Mail,
  Zap,
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
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative text-center p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 group overflow-hidden"
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

  const quickBadges = [
    { icon: GraduationCap, label: "Haramaya University", detail: "B.Sc. Software Engineering" },
    { icon: MapPin, label: "Addis Ababa, Ethiopia", detail: "Open to Remote & Hybrid" },
    { icon: Briefcase, label: "3+ Years Experience", detail: "Production Web Platforms" },
    { icon: Code2, label: "MERN & PERN Stack", detail: "React • Node • PostgreSQL" },
  ];

  return (
    <section id="about" className="py-14 sm:py-18 lg:py-20 relative overflow-hidden" ref={ref}>
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="About Me"
          title="About"
          italicTitle="Me"
          subtitle="A dedicated Full Stack Software Engineer focused on crafting scalable, high-performance web products with clean modular code."
        />

        {/* ── EDITORIAL ABOUT ME STORY CARD (CLEAR, ENGAGING & ATTRACTIVE) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-10 md:p-12 shadow-sm hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl mb-10 sm:mb-12 transition-all duration-300"
        >
          {/* Top Identifier Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles size={13} />
              Full Stack Software Engineer & Systems Architect
            </span>

            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              Addis Ababa // 2026
            </span>
          </div>

          {/* Main Headline */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-7 max-w-4xl">
            Architecting scalable digital products where{" "}
            <span className="italic font-serif font-light text-blue-600 dark:text-cyan-400">
              engineering craftsmanship
            </span>{" "}
            meets intuitive user experience.
          </h3>

          {/* Engaging Multi-Paragraph Narrative */}
          <div className="space-y-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-4xl">
            <p>
              I'm <strong className="text-slate-900 dark:text-white font-semibold">Yerosan Girma</strong>, a Full Stack Software Engineer pursuing my degree in Software Engineering at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong>. Driven by curiosity and a commitment to quality, I bridge the gap between creative, high-fidelity frontend interfaces and resilient, high-throughput backend systems.
            </p>

            <p>
              Over the past 3+ years, I have engineered and deployed complete digital platforms that solve real-world problems. This includes <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong>, Ethiopia's online rental property marketplace connecting tenants with verified listings; <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar</strong>, an interactive presentation and seminar suite; and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong>, a modern fintech rotational savings solution.
            </p>

            <p>
              I believe resilient software starts with clean modular code, typed API contracts, and normalized database schemas with sub-15ms query execution. Whether crafting responsive 60 FPS interfaces with React and Tailwind or architecting secure REST endpoints with Node.js and PostgreSQL, I build with long-term maintainability, speed, and user trust at the center.
            </p>
          </div>

          {/* Integrated Quick Facts Ribbon (Clean & Seamless) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 mt-8 border-t border-slate-100 dark:border-white/10">
            {quickBadges.map((badge, idx) => {
              const BIcon = badge.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5 flex items-center gap-3 text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <BIcon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {badge.label}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">
                      {badge.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-white/10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Featured Work</span>
              <ArrowRight size={15} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Get in Touch</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ── STATS COUNTER GRID ── */}
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
