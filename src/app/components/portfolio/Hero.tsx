import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from "lucide-react";

// ── Typewriter hook ──
function useTypewriter(words: string[], speed = 75, pause = 1600) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx === 1) {
          setDeleting(false);
          setCharIdx(0);
          setWordIdx((w) => (w + 1) % words.length);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Magnetic Button wrapper ──
function MagneticButton({ children, className, onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  // Parallax shifts on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  const roles = [
    "Full Stack MERN Developer",
    "React & Node.js Engineer",
    "MongoDB Architect",
    "API & UI Craftsman",
  ];
  const role = useTypewriter(roles);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const yOffset = -76;
    const scrollYPos = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: scrollYPos, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* Background aurora light flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main hero content container */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center"
      >
        {/* Text intro - centered full width */}
        <div className="flex flex-col items-center">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Available for work
            </span>
            <Sparkles size={12} className="text-emerald-400/80 animate-pulse" />
          </motion.div>

          {/* Introduce name */}
          <h2 className="text-white/60 text-sm sm:text-base font-semibold tracking-wide uppercase mb-3">
            Hello, My name is
          </h2>

          <h1 className="text-white font-extrabold tracking-tight mb-4 leading-none" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)" }}>
            Yerosan Girma<span className="text-cyan-400">.</span>
          </h1>

          {/* Typing rotating title */}
          <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
            <span className="text-white/50 text-base sm:text-lg mr-2 font-mono">I am a</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 text-lg sm:text-2xl font-bold tracking-tight border-r-2 border-cyan-400/70 pr-1 animate-pulse font-mono min-w-[200px]">
              {role}
            </span>
          </div>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-xl text-center">
            A software engineer specializing in engineering robust, secure, and user-centric web applications. Harnessing modern stacks to build production-ready digital tools.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/18 text-white font-semibold text-sm hover:bg-white/[0.06] transition-all"
            >
              Contact Me
            </MagneticButton>

            <div className="flex gap-3 ml-2">
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
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  <soc.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1.5 z-20 group"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-white/30 group-hover:text-cyan-400 transition-colors">
          Scroll Down
        </span>
        {/* Animated Mouse indicator */}
        <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-cyan-400/50 flex justify-center p-1 transition-colors">
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
            className="w-1 h-1.5 rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
