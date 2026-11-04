import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code2,
  Check,
  Copy,
  FileText,
} from "lucide-react";
import heroImg from "../image/yeroimage1.jpg";

interface HeroProps {
  onOpenResume: () => void;
}

const ROLES = [
  "Full-Stack Software Engineer",
  "React & TypeScript Developer",
  "Node.js & Express API Architect",
  "PostgreSQL & MongoDB Designer",
];

export function Hero({ onOpenResume }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle role text every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard?.writeText("yerosang463@gmail.com");
    setCopied(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 36,
      spread: 50,
      origin: { x, y },
      colors: ["#2563EB", "#38BDF8", "#10B981", "#6366F1"],
      ticks: 140,
      disableForReducedMotion: true,
    });

    setTimeout(() => setCopied(false), 2400);
  };

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -70 });
    } else {
      const yOffset = -70;
      const scrollYPos = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: scrollYPos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Bio, Roles & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/25 mb-5 backdrop-blur-md cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider font-mono">
                Available for Software Engineering Roles & Internships
              </span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-4"
            >
              Yerosan Girma
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-600 dark:text-slate-300">
                Building Scalable,{" "}
                <span className="italic font-serif font-normal text-blue-600 dark:text-cyan-400">
                  Production-Ready
                </span>{" "}
                Web Applications
              </span>
            </motion.h1>

            {/* Dynamic Role Pill */}
            <div className="mb-5 h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10"
                >
                  <Code2 size={15} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-blue-700 dark:text-cyan-300 font-mono">
                    {ROLES[roleIndex]}
                  </span>
                  <span className="w-1.5 h-3.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse ml-0.5" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Meaningful Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-2xl font-normal"
            >
              Software Engineering student at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong> with practical experience engineering full-stack platforms like Ethiopia's <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong> rental marketplace, <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar Live</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong> fintech system.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3 items-center w-full mb-8"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>View Featured Projects</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contact Me</span>
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText size={15} className="text-blue-600 dark:text-cyan-400" />
                <span>View Resume</span>
              </button>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                title="Copy Email Address"
                className="px-3.5 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-3 pt-3 border-t border-slate-200/80 dark:border-white/10 w-full"
            >
              <span className="text-slate-400 dark:text-slate-500 text-xs font-mono uppercase tracking-wider">
                Connect:
              </span>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/Yerosan-Girma", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:yerosang463@gmail.com", label: "Email" },
                ].map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 transition-all cursor-pointer"
                    aria-label={soc.label}
                  >
                    <soc.icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Profile Picture Framing */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[320px] sm:max-w-[360px]"
            >
              {/* Subtle Ambient Rim Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/20 via-cyan-400/20 to-indigo-600/20 rounded-3xl blur-xl -z-10" />

              {/* Photo Card */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/15 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={heroImg}
                    alt="Yerosan Girma — Full Stack Software Engineer"
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-500 hover:scale-102"
                    loading="eager"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-left">
                    <p className="text-white text-xs font-bold leading-tight">Yerosan Girma</p>
                    <p className="text-blue-400 dark:text-cyan-400 text-[11px] font-mono mt-0.5">
                      B.Sc. Software Engineering Student
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
