import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Terminal,
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
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 14px 30px -10px rgba(29, 78, 216, 0.12)" }}
      className="relative text-center p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-xs hover:border-[#1D4ED8]/40 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            Overview
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 mt-3 sm:mt-4 leading-tight text-3xl sm:text-4xl font-bold"
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

        {/* Narrative Bio */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-9 md:p-10 shadow-xs mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[#1D4ED8] text-xs font-mono uppercase tracking-wider font-semibold mb-3">
            <Terminal size={14} />
            <span>Full Stack Engineering & Systems Design</span>
          </div>

          <h3 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-5">
            Engineering reliable, scalable web applications with <span className="text-[#1D4ED8]">modern web architectures</span>.
          </h3>

          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            <p>
              I'm a dedicated <strong className="text-gray-900 font-semibold">Full Stack Software Engineer</strong> currently pursuing my Software Engineering degree at <strong className="text-gray-900 font-semibold">Haramaya University</strong>. My work unites clean backend logic, normalized database architectures, and responsive, fluid user interfaces.
            </p>
            <p>
              Throughout my journey, I have engineered and deployed complete digital platforms including <strong className="text-gray-900 font-semibold">Kiray Bet</strong> (Ethiopia's online home rental marketplace), real-time live seminar suites (<strong className="text-gray-900 font-semibold">WabiSeminar</strong>), and fintech rotational savings circles (<strong className="text-gray-900 font-semibold">Digital Equb</strong>).
            </p>
            <p>
              I thrive on solving complex query performance constraints, designing modular component hierarchies, maintaining high code quality, and building applications that users enjoy interacting with every day.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-semibold hover:bg-[#1E40AF] transition-colors shadow-xs cursor-pointer"
            >
              View Featured Work
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:border-gray-400 hover:text-gray-900 transition-colors shadow-xs cursor-pointer"
            >
              Let's Discuss a Project
            </motion.button>
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
