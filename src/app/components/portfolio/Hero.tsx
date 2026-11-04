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
  MapPin,
  Sparkles,
  Layers,
  GraduationCap,
} from "lucide-react";
import heroImg from "../image/yeroimage1.jpg";
import developerBg from "../image/developer-bg.svg";

interface HeroProps {
  onOpenResume: () => void;
}

const ROLES = [
  "Full-Stack Software Engineer",
  "React & TypeScript Specialist",
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
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24"
    >
      {/* Subtle Atmospheric Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-blue-600/15 via-cyan-400/15 to-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      {/* Developer Background SVG */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-50 pointer-events-none"
        style={{
          backgroundImage: `url(${developerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Command & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/25 dark:border-emerald-400/30 mb-5 backdrop-blur-md cursor-default shadow-xs"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider font-mono">
                Available for Engineering Roles & Internships
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <span className="text-sm sm:text-base font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">
                Hello, I am
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.06]">
                Yerosan <span className="bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">Girma</span>
              </h1>
              <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-slate-700 dark:text-slate-200">
                Architecting Scalable,{" "}
                <span className="italic font-serif font-normal text-blue-600 dark:text-cyan-400">
                  Production-Ready
                </span>{" "}
                Web Systems
              </p>
            </motion.div>

            {/* Dynamic Role Badge */}
            <div className="mb-5 h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-2xs"
                >
                  <Code2 size={16} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-blue-700 dark:text-cyan-300 font-mono">
                    {ROLES[roleIndex]}
                  </span>
                  <span className="w-1.5 h-3.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse ml-0.5" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Meaningful Scannable Summary */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl font-normal"
            >
              Software Engineering student at <strong className="text-slate-900 dark:text-white font-semibold">Haramaya University</strong> with verified production experience engineering platforms like Ethiopia's <strong className="text-slate-900 dark:text-white font-semibold">Kiray Bet</strong> rental marketplace, <strong className="text-slate-900 dark:text-white font-semibold">WabiSeminar Live</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">Digital Equb</strong> fintech system.
            </motion.p>

            {/* Quick-Fact Credibility Ribbons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-7 text-xs font-mono text-slate-600 dark:text-slate-300"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <Layers size={13} className="text-blue-600 dark:text-cyan-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">6+ Production Apps</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <GraduationCap size={14} className="text-blue-600 dark:text-cyan-400" />
                <span>Haramaya Univ. SE</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                <MapPin size={13} className="text-blue-600 dark:text-cyan-400" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </motion.div>

            {/* Prominent Responsive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center w-full mb-8"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer group shrink-0"
              >
                <span>View Featured Projects</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenResume}
                className="h-12 px-5 rounded-xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.12] text-slate-900 dark:text-white border border-slate-300/80 dark:border-white/15 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <FileText size={16} className="text-blue-600 dark:text-cyan-400" />
                <span>View Resume</span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="h-12 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200/90 dark:border-white/10 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contact Me</span>
              </button>

              <button
                onClick={handleCopyEmail}
                title="Copy Email Address"
                className="h-12 px-4 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs shrink-0"
              >
                {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                <span>{copied ? "Email Copied!" : "Copy Email"}</span>
              </button>
            </motion.div>

            {/* Social Connect Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-white/10 w-full"
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
                    className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-400 transition-all cursor-pointer shadow-2xs"
                    aria-label={soc.label}
                  >
                    <soc.icon size={17} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Framed Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[320px] sm:max-w-[370px]"
            >
              {/* Outer Atmospheric Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-blue-600/30 via-cyan-400/25 to-indigo-600/25 rounded-[32px] blur-2xl -z-10" />

              {/* Photo Frame Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-slate-900 border-2 border-slate-200/90 dark:border-white/15 shadow-2xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={heroImg}
                    alt="Yerosan Girma â€” Full Stack Software Engineer"
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 hover:scale-103"
                    loading="eager"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Status Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                      <Sparkles size={11} className="text-cyan-400" />
                      <span>Software Engineer</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-bold leading-tight">Yerosan Girma</p>
                        <p className="text-cyan-400 text-xs font-mono mt-0.5">
                          B.Sc. Software Engineering Student
                        </p>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse shadow-sm shadow-emerald-400/50" />
                    </div>
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



