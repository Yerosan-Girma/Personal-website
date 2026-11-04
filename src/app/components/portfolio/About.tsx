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
  accentColor: string;
}

function StatCard({ label, value, suffix, detail, trigger, delayIndex, accentColor }: StatProps) {
  const val = useCountUp(value, 1600, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 + delayIndex * 0.1 }}
      className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden group w-full"
    >
      {/* Accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${accentColor} opacity-80`} />
      <div className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-900 dark:text-white font-extrabold font-mono tracking-tight break-words`}>
        {val}
        <span className="text-blue-600 dark:text-cyan-400 ml-0.5 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{suffix}</span>
      </div>
      <div className="text-slate-900 dark:text-slate-100 text-[10px] xs:text-xs sm:text-sm md:text-base font-bold mt-1.5 xs:mt-2 sm:mt-2">
        {label}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-[9px] xs:text-[10px] sm:text-xs mt-0.5 xs:mt-1 sm:mt-1 font-normal leading-relaxed">
        {detail}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const stats = [
    {
      label: "Production Platforms",
      value: 6,
      suffix: "+",
      detail: "Shipped verified web applications",
      accentColor: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      label: "Core Technologies",
      value: 15,
      suffix: "+",
      detail: "React, TypeScript, Node, SQL & NoSQL",
      accentColor: "bg-gradient-to-r from-indigo-500 to-blue-400",
    },
    {
      label: "Years Coding",
      value: 3,
      suffix: "+",
      detail: "University CS studies & freelance delivery",
      accentColor: "bg-gradient-to-r from-cyan-500 to-emerald-400",
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-8 xs:py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Subtle section accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header - Responsive sizing */}
        <SectionHeader
          number="01"
          label="About Me"
          title="Engineering Background &"
          italicTitle="Vision"
          subtitle="Combining strong computer science foundations from Haramaya University with real-world experience building robust, responsive web platforms."
        />

        {/* Main 2-Column Visual Narrative - Responsive grid: 1 col mobile, 2 col on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xs:gap-6 sm:gap-8 lg:gap-10 mb-6 xs:mb-8 sm:mb-10 items-stretch">
          {/* Left Column: Narrative Card - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid-cols-1 lg:col-span-7 rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 p-4 xs:p-5 sm:p-7 md:p-9 lg:p-11 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="inline-flex items-center gap-2 xs:gap-2.5 px-3 xs:px-3.5 py-1 xs:py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-[10px] xs:text-xs font-bold uppercase tracking-wider font-mono mb-3 xs:mb-4 sm:mb-5 border border-blue-500/20 dark:border-cyan-400/20">
                <Sparkles size={11} className="xs:w-3 xs:h-3" />
                <span>Software Engineering Background</span>
              </div>

              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-3 xs:mb-4 sm:mb-6">
                Designing resilient web systems with clear architectural patterns and user-centered ergonomics
              </h3>

              <div className="space-y-2.5 xs:space-y-3 sm:space-y-4 text-slate-600 dark:text-slate-300 text-xs xs:text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  I'm{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">Yerosan Girma</strong>, a Software
                  Engineering student at{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong> based
                  in Addis Ababa, Ethiopia. My focus is on full-stack web engineering: creating fast, accessible React
                  and TypeScript interfaces backed by robust Node.js/Express APIs and normalized database schemas.
                </p>

                <p>
                  Rather than building purely theoretical projects, I solve genuine problems. My portfolio includes{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong>, Ethiopia's home
                  rental marketplace;{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar Live</strong>, a
                  low-latency webcast application with WebSockets; and{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong>, a modern
                  fintech digitizing traditional rotational savings.
                </p>
              </div>

              {/* Quick Credentials Pills - Responsive 1 column on mobile, 2 columns on sm+ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2 xs:gap-2 sm:gap-2.5 my-5 xs:my-6 sm:my-7 pt-4 xs:pt-5 sm:pt-6 border-t border-slate-100 dark:border-white/10 text-[10px] xs:text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
                {[
                  { icon: GraduationCap, text: "Haramaya University SE" },
                  { icon: MapPin, text: "Addis Ababa, Ethiopia" },
                  { icon: Briefcase, text: "Freelance Full-Stack Dev" },
                  { icon: Code2, text: "MERN & TypeScript Stack" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 xs:gap-2.5 sm:gap-2.5 p-2 xs:p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/[0.07] hover:border-blue-300 dark:hover:border-cyan-400/30 transition-colors"
                  >
                    <Icon size={14} className="xs:w-[15px] xs:h-[15px] sm:w-4 sm:h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span className="truncate font-medium text-[10px] xs:text-xs sm:text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs - Responsive buttons */}
            <div className="flex flex-col xs:flex-row sm:flex-row items-center gap-2 xs:gap-2.5 sm:gap-3 pt-3 xs:pt-4 sm:pt-5 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => scrollTo("projects")}
                className="w-full xs:w-auto h-9 xs:h-10 sm:h-11 px-3 xs:px-4 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs xs:text-sm sm:text-sm shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center xs:justify-center sm:justify-start gap-1.5 xs:gap-2 cursor-pointer active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={14} className="xs:w-4 xs:h-4 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="w-full xs:w-auto h-9 xs:h-10 sm:h-11 px-3 xs:px-4 sm:px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-xs xs:text-sm sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] whitespace-nowrap"
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Visual Pillars - Skill Highlights with Responsive Grid */}
          <div className="grid-cols-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 justify-between">
            {[
              {
                icon: Layers,
                title: "Frontend Engineering",
                tag: "Speed & Accessibility",
                desc: "Crafting modular, responsive React & TypeScript interfaces optimized for mobile performance, touch ergonomics, and WCAG accessibility standards.",
                accent: "blue",
              },
              {
                icon: Server,
                title: "Backend & Systems",
                tag: "Scalability & Realtime",
                desc: "Architecting high-throughput RESTful services on Node.js/Express, JWT auth pipelines, rate limiting, and real-time WebSockets.",
                accent: "cyan",
              },
              {
                icon: Database,
                title: "Database Modeling",
                tag: "Integrity & Performance",
                desc: "Engineering normalized relational schemas in PostgreSQL & MySQL and document models in MongoDB with indexing and ACID transaction safety.",
                accent: "indigo",
              },
            ].map((pillar, idx) => {
              const PIcon = pillar.icon;
              const accentMap: Record<string, string> = {
                blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-100 dark:border-cyan-400/20",
                cyan: "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-400/20",
                indigo: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-blue-400 border-indigo-100 dark:border-blue-400/20",
              };
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                  className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-6 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-center group min-h-fit"
                >
                  <div className="flex items-start gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-2.5 sm:mb-3">
                    <div className={`w-8 xs:w-9 sm:w-10 md:w-10 h-8 xs:h-9 sm:h-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 border ${accentMap[pillar.accent]} group-hover:scale-105 transition-transform duration-200`}>
                      <PIcon size={15} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[9px] xs:text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider block ${
                        pillar.accent === "blue" ? "text-blue-600 dark:text-cyan-400" :
                        pillar.accent === "cyan" ? "text-cyan-600 dark:text-cyan-400" :
                        "text-indigo-600 dark:text-blue-400"
                      }`}>
                        {pillar.tag}
                      </span>
                      <h4 className="text-xs xs:text-sm sm:text-base md:text-base font-bold text-slate-900 dark:text-white leading-tight break-words">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-[11px] xs:text-xs sm:text-sm md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal break-words">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Counter Stats Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              detail={stat.detail}
              trigger={inView}
              delayIndex={i}
              accentColor={stat.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
