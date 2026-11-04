import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
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
      className="p-4 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 shadow-xs text-left"
    >
      <div className="text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold font-mono tracking-tight">
        {val}
        <span className="text-blue-600 dark:text-cyan-400 ml-0.5">{suffix}</span>
      </div>
      <div className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold mt-1">
        {label}
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-xs mt-0.5">
        {detail}
      </div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const stats = [
    { label: "Production Projects", value: 6, suffix: "+", detail: "Shipped full-stack applications" },
    { label: "Core Technologies", value: 15, suffix: "+", detail: "React, Node, TypeScript, SQL, NoSQL" },
    { label: "Years Coding", value: 3, suffix: "+", detail: "University studies & freelance work" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="01"
          label="About Me"
          title="Engineering Background &"
          italicTitle="Vision"
          subtitle="Combining strong computer science foundations from Haramaya University with real-world experience building robust, responsive web platforms."
        />

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-xs mb-8 transition-all"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono mb-5">
            <Sparkles size={13} />
            Software Engineering Background
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-5 max-w-3xl">
            Designing resilient web systems with clear architectural patterns and user-centered ergonomics
          </h3>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            <p>
              I'm <strong className="text-slate-900 dark:text-white font-semibold">Yerosan Girma</strong>, a Software Engineering student at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong> based in Addis Ababa, Ethiopia. My focus is on full-stack web development: engineering fast, intuitive React and TypeScript interfaces backed by robust Node.js/Express APIs and optimized databases.
            </p>

            <p>
              Rather than building purely theoretical exercises, I have focused on solving real problems. My work includes <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong>, a rental marketplace bridging tenants, landlords, and verified brokers with map exploration and direct inquiries; <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar Live</strong>, a low-latency webcast platform using WebSockets; and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong>, a modern fintech transformation of Ethiopia's rotational savings circles.
            </p>

            <p>
              I am eager to contribute my technical problem-solving ability, proactive communication, and passion for clean code to forward-thinking engineering teams, full-stack internships, and technical collaborations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-white/10">
            <button
              onClick={() => scrollTo("projects")}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
