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
  Server,
  Zap,
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
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 50]);

  // Interactive 3D Card Tilt with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

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

    // Trigger celebratory micro-confetti
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 36,
      spread: 55,
      origin: { x, y },
      colors: ["#1D4ED8", "#3B82F6", "#10B981", "#6366F1"],
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
    { name: "React", icon: Code2, color: "#0284C7", bg: "hover:border-cyan-400" },
    { name: "TypeScript", icon: Terminal, color: "#2563EB", bg: "hover:border-blue-400" },
    { name: "Node.js", icon: Layers, color: "#16A34A", bg: "hover:border-emerald-400" },
    { name: "PostgreSQL", icon: Database, color: "#3B82F6", bg: "hover:border-indigo-400" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[640px] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-24"
    >
      {/* Subtle Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-24 w-88 sm:w-[420px] h-88 sm:h-[420px] rounded-full bg-blue-100/60 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 -right-24 w-88 sm:w-[440px] h-88 sm:h-[440px] rounded-full bg-indigo-100/50 blur-3xl"
        />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
      >
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
          {/* Availability Beacon Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 mb-5 shadow-xs cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              Available for Full-time & Contract Roles
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-xs sm:text-sm font-mono tracking-wider uppercase mb-2 flex items-center gap-1.5"
          >
            <Sparkles size={14} className="text-[#1D4ED8]" />
            <span>Hello world, I'm</span>
          </motion.p>

          {/* Full Name with accent */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-3"
          >
            Yerosan Girma<span className="text-[#1D4ED8]">.</span>
          </motion.h1>

          {/* Dynamic Animated Role Badge */}
          <div className="mb-5 h-9 sm:h-10 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/90 border border-blue-200/80 shadow-2xs"
              >
                <Code2 size={18} className="text-[#1D4ED8] shrink-0" />
                <span className="text-sm sm:text-lg font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  {ROLES[roleIndex]}
                </span>
                <span className="w-1.5 h-4 bg-[#1D4ED8] rounded-full animate-pulse ml-0.5" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-gray-600 text-sm sm:text-base leading-relaxed mb-7 max-w-xl"
          >
            Engineering robust, high-performance web products with clean modular architectures.
            Connecting responsive React frontends with scalable Node/Express backends and optimized PostgreSQL/MongoDB databases.
          </motion.p>

          {/* Quick Stack Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-7 text-xs"
          >
            <span className="text-gray-400 font-mono text-[11px] uppercase mr-1">Core Stack:</span>
            {quickStack.map((tech) => (
              <motion.span
                key={tech.name}
                whileHover={{ y: -2, scale: 1.05 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200/90 text-gray-700 font-semibold shadow-2xs transition-all cursor-default ${tech.bg}`}
              >
                <tech.icon size={13} style={{ color: tech.color }} />
                <span>{tech.name}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-3 sm:gap-4 items-center w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1D4ED8] text-white font-semibold text-sm hover:bg-[#1E40AF] transition-all shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("services")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 font-semibold text-sm hover:border-[#1D4ED8]/40 hover:bg-gray-50 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Services</span>
            </motion.button>

            {/* Social Links */}
            <div className="flex gap-2 sm:ml-2 mt-2 sm:mt-0 justify-center w-full sm:w-auto">
              {[
                { icon: Github, href: "https://github.com/Yerosan-Girma", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:yerosang463@gmail.com", label: "Email" },
              ].map((soc, idx) => (
                <motion.a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.5 + idx * 0.08 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1D4ED8] hover:border-blue-300 hover:shadow-sm transition-all"
                  aria-label={soc.label}
                >
                  <soc.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Redesigned Interactive 3D Engineer Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center order-1 lg:order-2"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
            className="w-full max-w-[320px] sm:max-w-[360px] relative"
          >
            {/* Ambient Background Aura Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#1D4ED8]/20 via-indigo-400/15 to-sky-300/20 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />

            {/* Floating Satellite Chip 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3.5 -right-3 z-20 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-md shadow-black/5 flex items-center gap-1.5 text-xs font-bold text-gray-800"
            >
              <Zap size={13} className="text-amber-500 fill-amber-500" />
              <span>Full Stack</span>
            </motion.div>

            {/* Floating Satellite Chip 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -bottom-3.5 -left-3 z-20 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-md shadow-black/5 flex items-center gap-1.5 text-xs font-bold text-emerald-700"
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
              className="relative rounded-3xl bg-white/95 border border-gray-200/90 p-4 sm:p-5 shadow-2xl shadow-blue-900/10 backdrop-blur-xl group transition-shadow duration-300 hover:shadow-blue-500/20"
            >
              {/* Card Window Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-gray-400 ml-1.5">yerosan.ts</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              {/* Portrait Image Container with Proportional Golden Framing */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src={heroImg}
                  alt="Yerosan Girma Portrait"
                  className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Atmospheric gradient overlay for contrast and depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Verified Name & Role Overlay inside photo base */}
                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-bold text-sm sm:text-base tracking-tight text-white drop-shadow-sm">
                      Yerosan Girma
                    </p>
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#1D4ED8] text-white text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-200 font-medium tracking-wide">
                    Full Stack Software Engineer
                  </p>
                  <p className="text-[10px] text-gray-300 font-mono flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-emerald-400" />
                    <span>Addis Ababa, Ethiopia</span>
                  </p>
                </div>
              </div>

              {/* Quick Spec Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-center">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-mono text-gray-400 uppercase">Exp.</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">3+ Yrs</p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-mono text-gray-400 uppercase">Built</p>
                  <p className="text-xs sm:text-sm font-bold text-[#1D4ED8] mt-0.5">10+ Apps</p>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-mono text-gray-400 uppercase">Stack</p>
                  <p className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">MERN</p>
                </div>
              </div>

              {/* Interactive One-Click Connect Deck */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200/80 text-gray-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Email Copied! 🎉</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-gray-500" />
                      <span>Copy Email</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo("contact")}
                  className="py-2 px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
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
        className="absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer hidden lg:flex flex-col items-center gap-1.5 group"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 rounded-full border border-gray-300 flex justify-center p-0.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#1D4ED8]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CheckCircle2(props: { size: number; className?: string }) {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
