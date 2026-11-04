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
      className="p-6 sm:p-7 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden group"
    >
      {/* Accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${accentColor} opacity-80`} />
      <div className={`text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white font-extrabold font-mono tracking-tight`}>
        {val}
        <span className="text-blue-600 dark:text-cyan-400 ml-0.5">{suffix}</span>
      </div>
      <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-bold mt-2">
        {label}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-normal leading-relaxed">
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
    <section id="about" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Subtle section accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent pointer-events-none" />

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
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 p-7 sm:p-9 md:p-11 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono mb-5 border border-blue-500/20 dark:border-cyan-400/20">
                <Sparkles size={12} />
                <span>Software Engineering Background</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-[2.2rem] font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-6">
                Designing resilient web systems with clear architectural patterns and user-centered ergonomics
              </h3>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed font-normal">
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

              {/* Quick Credentials Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-7 pt-6 border-t border-slate-100 dark:border-white/10 text-sm font-mono text-slate-700 dark:text-slate-300">
                {[
                  { icon: GraduationCap, text: "Haramaya University SE" },
                  { icon: MapPin, text: "Addis Ababa, Ethiopia" },
                  { icon: Briefcase, text: "Freelance Full-Stack Dev" },
                  { icon: Code2, text: "MERN & TypeScript Stack" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/[0.07] hover:border-blue-300 dark:hover:border-cyan-400/30 transition-colors"
                  >
                    <Icon size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span className="truncate font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => scrollTo("projects")}
                className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="h-11 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-[0.98]"
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
                  className="p-6 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-0.5 transition-all duration-300 text-left flex-1 flex flex-col justify-center group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${accentMap[pillar.accent]} group-hover:scale-105 transition-transform duration-200`}>
                      <PIcon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        pillar.accent === "blue" ? "text-blue-600 dark:text-cyan-400" :
                        pillar.accent === "cyan" ? "text-cyan-600 dark:text-cyan-400" :
                        "text-indigo-600 dark:text-blue-400"
                      }`}>
                        {pillar.tag}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
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
