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
  MapPin,
  ExternalLink,
  Layers,
  Database,
  Terminal,
  Zap,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import heroImg from "../image/yeroimage1.jpg";

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
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

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
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16 lg:py-24 bg-[#F8FAFC] dark:bg-[#060814] transition-colors duration-300"
    >
      {/* ── 1. FULL-COVER LUMINOUS COSMIC NEBULA & AURORA BACKDROP ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Base Radial Cosmic Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#DBEAFE_0%,#EFF6FF_40%,#F8FAFC_100%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#172554_0%,#0A1128_45%,#060814_100%)] opacity-95 transition-colors duration-300" />

        {/* Top-Left Glowing Cyan / Electric Blue Nebula */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[10%] w-[85vw] sm:w-[55vw] h-[85vw] sm:h-[55vw] rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-600/25 to-transparent blur-[85px] sm:blur-[130px] mix-blend-screen"
        />

        {/* Top-Right Glowing Indigo / Violet Aurora (Frames Profile Section) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[5%] -right-[15%] sm:-right-[5%] w-[85vw] sm:w-[50vw] h-[85vw] sm:h-[50vw] rounded-full bg-gradient-to-bl from-indigo-500/30 via-violet-600/25 to-blue-500/20 blur-[85px] sm:blur-[130px] mix-blend-screen"
        />

        {/* Bottom Horizon Sapphire Bloom */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] left-[10%] sm:left-[25%] w-[80vw] sm:w-[55vw] h-[60vw] sm:h-[40vw] rounded-full bg-blue-600/20 dark:bg-cyan-500/20 blur-[90px] sm:blur-[140px] mix-blend-screen"
        />
      </div>

      {/* ── 2. HIGH-TECH CYBER GRID WITH RADIAL ILLUMINATION MASK ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.14)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_95%_90%_at_50%_40%,#000_75%,transparent_100%)]"
      />

      {/* ── 3. TOP LUMINOUS HORIZON LASER BEAM ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/70 dark:via-cyan-400 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.9)] pointer-events-none z-10" />

      {/* ── 4. GEOMETRIC HUD ACCENTS & TELEMETRY MARKERS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Corner HUD Crosshairs */}
        <span className="absolute top-8 left-6 sm:left-12 font-mono text-xs text-blue-500/40 dark:text-cyan-400/40">+</span>
        <span className="absolute top-8 right-6 sm:right-12 font-mono text-xs text-blue-500/40 dark:text-cyan-400/40">+</span>
        <span className="absolute bottom-12 left-6 sm:left-12 font-mono text-xs text-blue-500/40 dark:text-cyan-400/40">+</span>
        <span className="absolute bottom-12 right-6 sm:right-12 font-mono text-xs text-blue-500/40 dark:text-cyan-400/40">+</span>

        {/* Background Tech Telemetry Ribbon (Subtle on Desktop & Tablet) */}
        <div className="hidden md:flex absolute top-12 right-16 items-center gap-4 text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            SYS.PORTFOLIO // V2.4_READY
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span>LAT 9.0300° N // LNG 38.7400° E</span>
        </div>
      </div>

      {/* ── 5. MAIN HERO CONTENT CONTAINER ── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        {/* Left Column: Editorial Headline & Identity */}
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
            className="text-slate-600 dark:text-slate-400 text-xs font-mono uppercase tracking-[0.25em] mb-3 flex items-center gap-2"
          >
            <Sparkles size={14} className="text-blue-600 dark:text-cyan-400" />
            <span>Addis Ababa, Ethiopia // Software Engineering</span>
          </motion.div>

          {/* Monumental Name & Editorial Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.04] mb-5"
          >
            Yerosan Girma
            <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-700 dark:text-slate-200">
              Architecting{" "}
              <span className="italic font-serif font-light text-blue-600 dark:text-cyan-400">
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
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 dark:border-cyan-400/20 shadow-xs backdrop-blur-sm"
              >
                <Code2 size={16} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent font-mono">
                  {ROLES[roleIndex]}
                </span>
                <span className="w-1.5 h-4 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse ml-0.5" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-xl font-light"
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
            <span className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase mr-1">
              Core Stack:
            </span>
            {quickStack.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-xs backdrop-blur-xs"
              >
                <tech.icon size={13} style={{ color: tech.color }} />
                <span>{tech.name}</span>
              </span>
            ))}
          </motion.div>

          {/* CTAs & Social Links */}
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
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("services")}
              className="px-6 py-3.5 rounded-xl bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>Capabilities</span>
            </motion.button>

            {/* Social Links with glowing hover */}
            <div className="flex gap-2 ml-0 sm:ml-2">
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
                  className="w-11 h-11 rounded-xl bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-400/50 shadow-xs transition-all cursor-pointer backdrop-blur-xs"
                  aria-label={soc.label}
                >
                  <soc.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D Interactive Profile Card Framed by Holographic Orbitals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center order-2 lg:order-2 relative"
        >
          {/* ── CONCENTRIC HOLOGRAPHIC ORBITAL RINGS CENTERED DIRECTLY BEHIND PROFILE ── */}
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
              className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[430px] lg:h-[430px] rounded-full border border-slate-300/50 dark:border-cyan-400/30"
            >
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-blue-600 dark:bg-cyan-400 rounded-full shadow-[0_0_16px_rgba(56,189,248,1)] border-2 border-white dark:border-slate-900" />
            </motion.div>
            {/* Inner Glowing Ring */}
            <motion.div
              animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full border border-indigo-400/30 dark:border-indigo-400/30 border-dotted"
            />
          </div>

          {/* Interactive Card Canvas */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="w-full max-w-[330px] sm:max-w-[380px] relative z-10"
          >
            {/* Radiant Multi-Color Aura Bloom */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-blue-600/40 via-cyan-400/35 to-indigo-600/40 rounded-[2.5rem] blur-2xl -z-10 animate-pulse duration-[6000ms]" />

            {/* Satellite Chip 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3.5 -right-3 z-30 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-cyan-400/30 shadow-lg flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white"
            >
              <Zap size={13} className="text-amber-500 fill-amber-500" />
              <span>Full Stack</span>
            </motion.div>

            {/* Satellite Chip 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-3.5 -left-3 z-30 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-emerald-400/30 shadow-lg flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400"
            >
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Production Ready</span>
            </motion.div>

            {/* 3D Motion Card Container */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-3xl bg-white/90 dark:bg-[#0B1226]/85 border border-slate-200/90 dark:border-cyan-500/30 p-4 sm:p-5 shadow-2xl backdrop-blur-2xl group transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
            >
              {/* Window Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-white/10 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-1.5 font-semibold">yerosan.ts</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Portrait Image Stage with High-Tech Frame & Dark Gradient Blending */}
              <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 shadow-inner border border-slate-200/50 dark:border-cyan-500/20">
                {/* Photo Element */}
                <img
                  src={heroImg}
                  alt="Yerosan Girma Portrait"
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Cyber HUD Corner Accents */}
                <div className="absolute top-2 left-2 pointer-events-none text-cyan-400/70 text-[10px] font-mono leading-none">
                  ┌
                </div>
                <div className="absolute top-2 right-2 pointer-events-none text-cyan-400/70 text-[10px] font-mono leading-none">
                  ┐
                </div>
                <div className="absolute bottom-2 left-2 pointer-events-none text-cyan-400/70 text-[10px] font-mono leading-none">
                  └
                </div>
                <div className="absolute bottom-2 right-2 pointer-events-none text-cyan-400/70 text-[10px] font-mono leading-none">
                  ┘
                </div>

                {/* Top Subtle Vignette (Harmonizes daylight sky with dark card) */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top HUD Status Tag */}
                <div className="absolute top-2.5 left-3 pointer-events-none">
                  <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-cyan-300/80 bg-slate-950/60 px-2 py-0.5 rounded-md backdrop-blur-xs border border-cyan-500/30 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    LIVE // ARCHITECT
                  </span>
                </div>

                {/* Bottom Atmospheric Vignette */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

                {/* Verified Name & Role inside photo base */}
                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none z-10">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-bold text-sm sm:text-base tracking-tight text-white drop-shadow-md">
                      Yerosan Girma
                    </p>
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold shadow-xs">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-cyan-200 font-medium tracking-wide drop-shadow-xs">
                    Full Stack Software Engineer
                  </p>
                  <p className="text-[10px] text-slate-300 font-mono flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-emerald-400" />
                    <span>Addis Ababa, Ethiopia</span>
                  </p>
                </div>
              </div>

              {/* Quick Spec Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-white/10 text-center">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase">Exp.</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">3+ Yrs</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase">Built</p>
                  <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 mt-0.5">10+ Apps</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase">Stack</p>
                  <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">MERN</p>
                </div>
              </div>

              {/* Action Deck */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyEmail}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied! 🎉</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo("contact")}
                  className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Hire Me</span>
                  <ExternalLink size={12} />
                </motion.button>
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
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 rounded-full border border-slate-300 dark:border-white/20 flex justify-center p-0.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
