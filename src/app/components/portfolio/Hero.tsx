import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, ArrowRight, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import heroImg from "../image/yeroimage1.jpg";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-14 lg:py-24"
    >
      {/* Subtle Animated Ambient Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-100/60 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 -right-24 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-indigo-100/50 blur-3xl"
        />
      </div>

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
      >
        {/* Left column - Text */}
        <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5 cursor-default shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              Available for work & projects
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-gray-600 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2"
          >
            Hello, my name is
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 100 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-3"
          >
            Yerosan Girma<span className="text-[#1D4ED8]">.</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, type: "spring", stiffness: 100 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="text-base sm:text-xl font-semibold text-[#1D4ED8] bg-[#1D4ED8]/10 px-3 py-1 rounded-lg">
              Full Stack Software Engineer
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 100 }}
            className="text-gray-600 text-sm sm:text-base leading-relaxed mb-7 max-w-xl"
          >
            Specializing in engineering robust, secure, and user-centric web applications. Harnessing modern stacks (React, Node.js, Express, MongoDB, PostgreSQL) to build production-ready digital products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, type: "spring", stiffness: 100 }}
            className="flex flex-wrap gap-3 sm:gap-4 items-center w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1D4ED8] text-white font-semibold text-sm hover:bg-[#1E40AF] transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              View Projects
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer"
            >
              Contact Me
            </motion.button>

            {/* Social Links */}
            <div className="flex gap-2.5 sm:ml-2 mt-2 sm:mt-0 justify-center w-full sm:w-auto">
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
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.55 + idx * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all"
                  aria-label={soc.label}
                >
                  <soc.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column - Redesigned Modern Profile Avatar Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, type: "spring", stiffness: 90 }}
          className="lg:col-span-5 flex justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[260px] sm:max-w-[310px] md:max-w-[340px]">
            {/* Ambient Background Aura Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#1D4ED8]/25 via-indigo-400/20 to-sky-300/25 rounded-[3rem] blur-2xl -z-10 animate-pulse" />

            {/* Decorative Rotating Orbital Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 sm:-inset-4 rounded-[2.75rem] border border-dashed border-[#1D4ED8]/25 pointer-events-none -z-10"
            />

            {/* Main Portrait Card (Elevated Squircle with Gradient Frame) */}
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative rounded-[2.25rem] bg-gradient-to-b from-white via-blue-50/50 to-white p-2 sm:p-2.5 md:p-3 border border-blue-100/90 shadow-xl shadow-blue-900/5 group"
            >
              {/* Inner Picture Container */}
              <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src={heroImg}
                  alt="Yerosan Girma Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Gradient Shade at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent pointer-events-none" />

                {/* Online Status Dot (Top Left inside image) */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] tracking-wide">Online</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Satellite Badge 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 right-1 sm:-right-3 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-lg shadow-black/5 flex items-center gap-2 z-20"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
                <Code2 size={15} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Full Stack</p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">MERN & APIs</p>
              </div>
            </motion.div>

            {/* Floating Satellite Badge 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-3 left-1 sm:-left-3 px-3 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-lg shadow-black/5 flex items-center gap-2 z-20"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                3+
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Years Experience</p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Production Code</p>
              </div>
            </motion.div>

            {/* Floating Tech Pill 3 (Middle Right) */}
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden sm:flex absolute top-1/2 -right-5 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-md items-center gap-1.5 z-20 text-[11px] font-semibold text-gray-700"
            >
              <Sparkles size={12} className="text-[#1D4ED8]" />
              <span>Clean Code</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[11px] uppercase font-semibold tracking-widest text-gray-400">
          Scroll Down
        </span>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-5 h-8 rounded-full border border-gray-300 flex justify-center p-1"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1.5 rounded-full bg-[#1D4ED8]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
