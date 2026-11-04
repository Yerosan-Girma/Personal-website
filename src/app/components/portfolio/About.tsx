import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  MapPin,
  Briefcase,
  Code2,
  Server,
  Database,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

function useCountUp(target: number, duration = 1400, trigger = false) {
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
  detail: string;
  trigger: boolean;
  delayIndex: number;
}

function StatCard({ label, value, suffix, detail, trigger, delayIndex }: StatProps) {
  const val = useCountUp(value, 1600, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: 0.1 + delayIndex * 0.08 }}
      className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-[#0D1424] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-lg transition-all text-left"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white font-extrabold font-mono tracking-tight">
        {val}
        <span className="text-blue-600 dark:text-cyan-400 ml-0.5">{suffix}</span>
      </div>
      <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-bold mt-1.5">
        {label}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 font-normal">
        {detail}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const stats = [
    { label: "Production Platforms", value: 6, suffix: "+", detail: "Shipped verified web applications" },
    { label: "Core Technologies", value: 15, suffix: "+", detail: "React, TypeScript, Node, SQL & NoSQL" },
    { label: "Years Coding", value: 3, suffix: "+", detail: "University CS studies & freelance delivery" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="01"
          label="About Me"
          title="Engineering Background &"
          italicTitle="Vision"
          subtitle="Combining strong computer science foundations from Haramaya University with real-world experience building robust, responsive web platforms."
        />

        {/* Main 2-Column Visual Narrative */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-10 items-stretch">
          {/* Left Column: Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 rounded-[28px] bg-white dark:bg-[#0D1424] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-xs flex flex-col justify-between text-left"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-4">
                <Sparkles size={13} />
                <span>Software Engineering Background</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-5">
                Designing resilient web systems with clear architectural patterns and user-centered ergonomics
              </h3>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  I'm <strong className="text-slate-900 dark:text-white font-semibold">Yerosan Girma</strong>, a Software Engineering student at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong> based in Addis Ababa, Ethiopia. My focus is on full-stack web engineering: creating fast, accessible React and TypeScript interfaces backed by robust Node.js/Express APIs and normalized database schemas.
                </p>

                <p>
                  Rather than building purely theoretical projects, I solve genuine problems. My portfolio includes <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong>, Ethiopia's home rental marketplace; <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar Live</strong>, a low-latency webcast application with WebSockets; and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong>, a modern fintech digitizing traditional rotational savings.
                </p>
              </div>

              {/* Quick Credentials Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6 pt-5 border-t border-slate-100 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                  <GraduationCap size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">Haramaya University SE</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                  <MapPin size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                  <Briefcase size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">Freelance Full-Stack Dev</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                  <Code2 size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">MERN & TypeScript Stack</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => scrollTo("projects")}
                className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="h-11 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Visual Pillars */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {[
              {
                icon: Layers,
                title: "Frontend Engineering",
                tag: "Speed & Accessibility",
                desc: "Crafting modular, responsive React & TypeScript interfaces optimized for mobile performance, touch ergonomics, and WCAG accessibility standards.",
              },
              {
                icon: Server,
                title: "Backend & Systems",
                tag: "Scalability & Realtime",
                desc: "Architecting high-throughput RESTful services on Node.js/Express, JWT auth pipelines, rate limiting, and real-time WebSockets.",
              },
              {
                icon: Database,
                title: "Database Modeling",
                tag: "Integrity & Performance",
                desc: "Engineering normalized relational schemas in PostgreSQL & MySQL and document models in MongoDB with indexing and ACID transaction safety.",
              },
            ].map((pillar, idx) => {
              const PIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                  transition={{ duration: 0.45, delay: 0.15 + idx * 0.1 }}
                  className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-[#0D1424] border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-lg transition-all text-left flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-cyan-400/20">
                      <PIcon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                        {pillar.tag}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              detail={stat.detail}
              trigger={inView}
              delayIndex={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
