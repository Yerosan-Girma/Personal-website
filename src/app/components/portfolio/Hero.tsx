import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, Sparkles, ChevronRight } from "lucide-react";

const PROFILE_URL = new URL("../image/yeroimage3.jpg", import.meta.url).href;

// ── Typewriter hook ──
function useTypewriter(words: string[], speed = 80, pause = 1800) {
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

// ── Particle field ──
function Particles() {
  const count = 55;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 2.5 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 8;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -80 - Math.random() * 60],
              x: [0, (Math.random() - 0.5) * 40],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Orbiting ring ──
function OrbitRing({ radius, duration, reverse = false, children }: {
  radius: number; duration: number; reverse?: boolean; children?: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
      style={{ width: radius * 2, height: radius * 2 }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

// ── Magnetic button ──
function MagneticButton({ children, className, onClick }: {
  children: React.ReactNode; className?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

// ── Letter stagger animation ──
function AnimatedWord({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.55], [0, 80]);

  const role = useTypewriter([
    "Full Stack MERN Developer",
    "React & Node.js Engineer",
    "MongoDB Architect",
    "API & UI Craftsman",
  ]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Deep space background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0A0F1E] to-[#0A0F1E]" />

        {/* Animated aurora blobs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-blue-700 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], x: [0, -30, 0], opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-600 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-700 blur-[130px]"
        />
      </div>

      {/* Floating particles */}
      <Particles />

      {/* Orbiting rings (desktop only) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden lg:flex">
        <div className="relative" style={{ width: 700, height: 700 }}>
          <OrbitRing radius={280} duration={30}>
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60"
              style={{ top: "50%", left: "0%", transform: "translate(-50%, -50%)" }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </OrbitRing>
          <OrbitRing radius={340} duration={40} reverse>
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60"
              style={{ top: "0%", left: "50%", transform: "translate(-50%, -50%)" }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </OrbitRing>
          <OrbitRing radius={200} duration={22}>
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/60"
              style={{ top: "50%", right: "0%", transform: "translate(50%, -50%)" }}
            />
          </OrbitRing>
        </div>
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8 backdrop-blur-sm"
        >
          <motion.span
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
          />
          <span className="text-emerald-400 text-sm" style={{ fontWeight: 500 }}>
            Available for opportunities
          </span>
          <Sparkles size={13} className="text-emerald-400/70" />
        </motion.div>

        {/* Profile image — centered above name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] rounded-full border-2 border-dashed border-blue-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-18px] rounded-full border border-cyan-500/15"
            />
            {/* Glow */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 blur-xl scale-110"
            />
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/25 shadow-2xl shadow-blue-500/40"
            >
              <img
                src={PROFILE_URL}
                alt="Yerosan Girma — Full Stack MERN Developer"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(1.1) contrast(1.15) saturate(1.2) hue-rotate(5deg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </motion.div>

            {/* Small dot badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-blue-500 border-2 border-[#0A0F1E] flex items-center justify-center text-[10px]"
            >
              ⚛️
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-1 -left-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0A0F1E] flex items-center justify-center text-[10px]"
            >
              🟢
            </motion.div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-white/50 text-lg mb-3"
        >
          Hi there 👋, I'm
        </motion.p>

        {/* Name — letter-by-letter */}
        <div className="mb-5 overflow-hidden" style={{ perspective: "600px" }}>
          <h1
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em" }}
            className="text-white"
          >
            <AnimatedWord text="Yerosan " delay={0.45} />
            <span className="relative inline-block">
              <AnimatedWord
                text="Girma"
                delay={0.75}
                className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent"
              />
              {/* Underline sweep */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full origin-left"
              />
            </span>
          </h1>
        </div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400/60" />
          <div className="flex items-center gap-2">
            <span
              className="text-xl text-white/80"
              style={{ fontWeight: 500, fontFamily: "monospace", minWidth: "280px", textAlign: "center" }}
            >
              {role}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-5 bg-cyan-400 ml-1 align-middle"
              />
            </span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          I craft{" "}
          <span className="text-white/85">scalable, responsive</span>, and{" "}
          <span className="text-white/85">user-focused</span> web apps using{" "}
          <span className="text-cyan-400">React</span>,{" "}
          <span className="text-cyan-400">Node.js</span>,{" "}
          <span className="text-cyan-400">Express</span> &{" "}
          <span className="text-cyan-400">MongoDB</span> — from concept to production.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <MagneticButton
            onClick={() => scrollTo("projects")}
            className="group relative px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/35 hover:shadow-blue-500/55 transition-shadow overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2" style={{ fontWeight: 600 }}>
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </span>
            {/* Shimmer sweep */}
            <motion.span
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </MagneticButton>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-2xl bg-white/6 border border-white/15 text-white/85 hover:bg-white/12 hover:border-white/25 hover:text-white transition-all backdrop-blur-sm"
            style={{ fontWeight: 500 }}
          >
            Download Resume
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("contact")}
            className="px-8 py-3.5 rounded-2xl bg-white/6 border border-white/15 text-white/85 hover:bg-white/12 hover:border-white/25 hover:text-white transition-all backdrop-blur-sm"
            style={{ fontWeight: 500 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com/Yerosan-Girma", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", label: "LinkedIn" },
            { icon: Mail, href: "mailto:yerosang463@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -4, rotate: [0, -8, 8, 0] }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="w-12 h-12 rounded-2xl bg-white/6 border border-white/12 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/12 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-colors"
              title={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>

        {/* Floating tech tags — decorative */}
        <div className="relative mt-14 hidden sm:block">
          <div className="flex justify-center gap-3 flex-wrap">
            {["⚛️ React", "🟢 Node.js", "🍃 MongoDB", "⚡ Express", "🔷 TypeScript", "🐳 Docker"].map(
              (tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: [0, -5 + (i % 3) * 3, 0] }}
                  transition={{ 
                    opacity: { delay: 1.7 + i * 0.08 },
                    y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                  }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10 transition-all text-sm cursor-default backdrop-blur-sm"
                >
                  {tag}
                </motion.span>
              )
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group z-20"
      >
        <span className="text-[11px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-cyan-400"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
