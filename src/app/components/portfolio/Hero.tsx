import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code2,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
  Layers,
  Database,
  Terminal,
} from "lucide-react";
import heroImg from "../image/yeroimage1.jpg";
import devBg from "../image/developer-bg.svg";

const ROLES = [
  "Full Stack Software Engineer",
  "React & TypeScript Architect",
  "Node.js & REST API Engineer",
  "High-Performance Database Designer",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle role text every 3.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.65], [0, 60]);

  // Interactive 3D Card Tilt with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard?.writeText("yerosang463@gmail.com");
    setCopied(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x, y },
      colors: ["#1D4ED8", "#38BDF8", "#10B981", "#6366F1"],
      ticks: 180,
      disableForReducedMotion: true,
    });

    setTimeout(() => setCopied(false), 2400);
  };

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      const yOffset = -80;
      const scrollYPos = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: scrollYPos, behavior: "smooth" });
    }
  };

  const quickStack = [
    { name: "React", icon: Code2, color: "#0284C7" },
    { name: "TypeScript", icon: Terminal, color: "#2563EB" },
    { name: "Node.js", icon: Layers, color: "#16A34A" },
    { name: "PostgreSQL", icon: Database, color: "#3B82F6" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[88vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-24 pb-10 sm:pb-12 lg:pb-16 bg-[#050814] transition-colors duration-300"
    >
      {/* ── 1. FULL-PAGE DEVELOPER BACKGROUND IMAGE (HIGH-TECH CODE & SYSTEM ARCHITECTURE) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Full-Cover Developer SVG Background */}
        <img
          src={devBg}
          alt="Developer Code & System Architecture Background"
          className="w-full h-full object-cover object-center opacity-85 dark:opacity-90 select-none pointer-events-none"
        />

        {/* Ambient Multi-Stop Gradient Overlays for High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/70 via-transparent to-[#050814]/90 dark:from-[#050814]/75 dark:via-transparent dark:to-[#060814]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_40%,#050814_100%)] pointer-events-none" />

        {/* Top Glowing Laser Horizon Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
      </div>

      {/* ── 2. MAIN HERO CONTENT CONTAINER ── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        {/* Left Column: Editorial Headline, Bio, Stack & Complete Actions */}
        <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-1 text-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/25 mb-5 backdrop-blur-md shadow-xs cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
              Available for Full-Time & Contract Roles
            </span>
          </motion.div>

          {/* Subheading / Location Tag */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-xs font-mono uppercase tracking-[0.25em] mb-3 flex items-center gap-2"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Addis Ababa, Ethiopia // Software Engineering</span>
          </motion.div>

          {/* Monumental Name & Editorial Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.04] mb-5 drop-shadow-sm"
          >
            Yerosan Girma
            <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-200">
              Architecting{" "}
              <span className="italic font-serif font-light text-cyan-400">
                Scalable Web
              </span>{" "}
              Platforms
            </span>
          </motion.h1>

          {/* Dynamic Role Badge */}
          <div className="mb-6 h-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-cyan-400/25 shadow-xs backdrop-blur-md"
              >
                <Code2 size={16} className="text-cyan-400 shrink-0" />
                <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent font-mono">
                  {ROLES[roleIndex]}
                </span>
                <span className="w-1.5 h-4 bg-cyan-400 rounded-full animate-pulse ml-0.5" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-xl font-light"
          >
            Engineering robust, high-performance web products with clean modular architectures.
            Connecting responsive React frontends with scalable Node/Express backends and optimized PostgreSQL/MongoDB databases.
          </motion.p>

          {/* Quick Stack Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <span className="text-slate-400 font-mono text-xs uppercase mr-1">
              Core Stack:
            </span>
            {quickStack.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-200 text-xs font-semibold shadow-xs backdrop-blur-xs"
              >
                <tech.icon size={13} style={{ color: tech.color }} />
                <span>{tech.name}</span>
              </span>
            ))}
          </motion.div>

          {/* Action CTAs, Copy Email, and Social Deck */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 sm:gap-4 items-center w-full"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("services")}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>Capabilities</span>
            </motion.button>

            {/* Quick Copy Email Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyEmail}
              className="px-4 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-200 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs shadow-xs"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={15} className="text-slate-400" />
                  <span>Copy Email</span>
                </>
              )}
            </motion.button>

            {/* Social Links */}
            <div className="flex gap-2 ml-0 sm:ml-1">
              {[
                { icon: Github, href: "https://github.com/Yerosan-Girma", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:yerosang463@gmail.com", label: "Email" },
              ].map((soc) => (
                <motion.a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-11 h-11 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 shadow-xs transition-all cursor-pointer backdrop-blur-xs"
                  aria-label={soc.label}
                >
                  <soc.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Pure, Clean Profile Photo (ONLY PROFILE PHOTO - ZERO OVERLAID INFO) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center order-2 lg:order-2 relative"
        >
          {/* Concentric Holographic Orbital Rings Framing the Photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center">
            {/* Outer Slow Clockwise Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
              className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full border border-blue-500/25 dark:border-cyan-400/25 border-dashed"
            />
            {/* Mid Counter-Clockwise Ring with Glowing Satellite Orb */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[430px] lg:h-[430px] rounded-full border border-slate-300/40 dark:border-cyan-400/30"
            >
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_16px_rgba(56,189,248,1)] border-2 border-slate-900" />
            </motion.div>
            {/* Inner Glowing Ring */}
            <motion.div
              animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full border border-indigo-400/30 border-dotted"
            />
          </div>

          {/* Interactive Card Canvas (ONLY PROFILE PHOTO - ZERO OVERLAYS OR CLUTTER) */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="w-full max-w-[310px] sm:max-w-[360px] lg:max-w-[400px] relative z-10"
          >
            {/* Radiant Multi-Color Aura Bloom */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-blue-600/40 via-cyan-400/35 to-indigo-600/40 rounded-[2.5rem] blur-2xl -z-10 animate-pulse duration-[6000ms]" />

            {/* Pure Profile Image Container with 3D Tilt */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-white/20 dark:border-cyan-400/30 shadow-2xl dark:shadow-[0_20px_50px_rgba(56,189,248,0.25)] transition-all duration-300 group"
            >
              <div className="relative aspect-[4/5] sm:h-[430px] lg:h-[480px] w-full overflow-hidden">
                <img
                  src={heroImg}
                  alt="Yerosan Girma"
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle, elegant glass sheen edge reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modern Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer hidden lg:flex flex-col items-center gap-1.5 group z-10"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 rounded-full border border-white/20 flex justify-center p-0.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
