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

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  detail: string;
  trigger: boolean;
  delayIndex: number;
}

function StatItem({ label, value, suffix, detail, trigger, delayIndex }: StatItemProps) {
  const val = useCountUp(value, 1600, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: 0.1 + delayIndex * 0.1 }}
      className="flex flex-col text-left py-2 sm:py-0"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white flex items-baseline">
        <span>{val}</span>
        <span className="text-blue-600 dark:text-cyan-400 ml-1">{suffix}</span>
      </div>
      <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-bold mt-2">
        {label}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 font-normal leading-relaxed max-w-xs">
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
      detail: "Shipped verified, real-world web applications",
    },
    {
      label: "Core Technologies",
      value: 15,
      suffix: "+",
      detail: "React, TypeScript, Node.js, SQL & NoSQL databases",
    },
    {
      label: "Years Dedicated Coding",
      value: 3,
      suffix: "+",
      detail: "Software engineering university curriculum & client delivery",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="01"
          label="About Me"
          title="Engineering Background &"
          italicTitle="Vision"
          subtitle="Combining strong computer science foundations from Haramaya University with real-world experience building robust, responsive web platforms."
        />

        {/* Narrative & Pillars: Open, Editorial Layout (No Nested Boxes) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-16 items-start">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono mb-4 w-fit border border-blue-500/20 dark:border-cyan-400/20">
              <Sparkles size={12} />
              <span>Engineering Journey</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-6">
              Designing resilient web systems with clear architectural patterns and user-centered ergonomics
            </h3>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal mb-8">
              <p>
                I'm <strong className="text-slate-900 dark:text-white font-semibold">Yerosan Girma</strong>, a Software Engineering student at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong> based in Addis Ababa, Ethiopia. My focus is on full-stack web engineering: creating fast, accessible React and TypeScript interfaces backed by robust Node.js/Express APIs and normalized database schemas.
              </p>

              <p>
                Rather than building purely theoretical projects, I solve genuine problems. My portfolio includes <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong>, Ethiopia's home rental marketplace; <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar Live</strong>, a low-latency webcast application with WebSockets; and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong>, a modern fintech digitizing traditional rotational savings.
              </p>
            </div>

            {/* Quick Credentials Strip (Clean Badges, not bulky cards) */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
              {[
                { icon: GraduationCap, text: "Haramaya University SE" },
                { icon: MapPin, text: "Addis Ababa, Ethiopia" },
                { icon: Briefcase, text: "Freelance Full-Stack Dev" },
                { icon: Code2, text: "MERN & TypeScript Stack" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 font-medium"
                >
                  <Icon size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => scrollTo("projects")}
                className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Featured Work</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="h-11 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Get in Touch</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Architectural Pillars (Open, clean typographic blocks) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-center lg:border-l lg:border-slate-200/80 lg:dark:border-white/10 lg:pl-10">
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                  className="text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-cyan-400/20">
                      <PIcon size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block">
                        {pillar.tag}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pl-0 sm:pl-12 mt-1.5 sm:mt-0">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Counter Stats: Open Horizontal Metric Strip (No boxed cards) */}
        <div className="pt-10 border-t border-slate-200/80 dark:border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-white/10">
            {stats.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "sm:pl-8 pt-6 sm:pt-0" : ""}>
                <StatItem
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  detail={stat.detail}
                  trigger={inView}
                  delayIndex={i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
