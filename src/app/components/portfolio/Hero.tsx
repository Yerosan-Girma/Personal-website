import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Code2, Coffee, Heart, Database, Terminal } from "lucide-react";

const PROFILE_URL = new URL("../image/yeroimage1.jpg", import.meta.url).href;

const funFacts = [
  { icon: Coffee, text: "Powered by double espresso" },
  { icon: Heart, text: "Passionate about open-source" },
];

const orbitingIcons = [
  { Icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", delay: 0 },
  { Icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", delay: 1.5 },
  { Icon: Terminal, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", delay: 3 },
];

function ProfileOrbit() {
  return (
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex items-center justify-center select-none">
              {/* Animated outer glowing borders */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] rounded-full border border-dashed border-cyan-400/18"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-30px] rounded-full border border-white/5"
              />

              {/* Orbiting nodes */}
              {orbitingIcons.map((node, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: node.delay
                  }}
                  className="absolute w-full h-full pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i }}
                    className={`absolute w-10 h-10 rounded-xl ${node.bg} border flex items-center justify-center shadow-lg pointer-events-auto`}
                    style={{
                      top: "-5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <node.Icon size={18} className={node.color} />
                  </motion.div>
                </motion.div>
              ))}

              {/* Circular profile image floating */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-2xl shadow-blue-500/15"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent z-10" />
                <img
                  src={PROFILE_URL}
                  alt="Yerosan Girma Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: "brightness(1.08) contrast(1.1) saturate(1.15)" }}
                />
              </motion.div>

              {/* Float overlays */}
              {funFacts.map((fact, idx) => (
                <motion.div
                  key={fact.text}
                  animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3.5 + idx, repeat: Infinity, ease: "easeInOut", delay: 0.3 + idx * 0.2 }}
                  className={`absolute hidden sm:flex whitespace-nowrap ${idx === 0 ? "-right-6 top-8" : "-left-6 bottom-12"} px-3 py-2 rounded-xl bg-[#091124] border border-blue-500/20 text-white/90 text-xs items-center gap-2 shadow-xl backdrop-blur-sm`}
                >
                  <fact.icon size={13} className="text-cyan-400" />
                  {fact.text}
                </motion.div>
              ))}
            </div>
  );
}

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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-24"
    >
      {/* Background aurora light flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main hero content container */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Profile photo: above the text on mobile, right column on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 lg:order-2 flex justify-center pt-4"
        >
          <ProfileOrbit />
        </motion.div>

        {/* Text intro */}
        <div className="lg:col-span-7 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
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
          <h2 className="text-white/95 text-sm sm:text-base font-semibold tracking-wide uppercase mb-3">
            Hello, My name is
          </h2>

          <h1 className="text-white font-extrabold tracking-tight mb-4 leading-none" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)" }}>
            Yerosan Girma<span className="text-cyan-400">.</span>
          </h1>

          {/* Typing rotating title */}
          <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6">
            <span className="text-white/90 text-base sm:text-lg mr-2 font-mono">I am a</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 text-lg sm:text-2xl font-bold tracking-tight border-r-2 border-cyan-400/70 pr-1 animate-pulse font-mono min-w-[200px]">
              {role}
            </span>
          </div>

          <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            A software engineer specializing in engineering robust, secure, and user-centric web applications. Harnessing modern stacks to build production-ready digital tools.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
            >
              View Projects
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="px-6 py-3.5 rounded-xl bg-[#0f182e]/90 border border-white/10 hover:border-white/18 text-white font-semibold text-sm hover:bg-white/[0.06] transition-all"
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
                  className="w-10 h-10 rounded-xl bg-[#0b1224]/90 backdrop-blur-md border border-white/8 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/[0.06] transition-all"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden lg:flex flex-col items-center gap-1.5 z-20 group"
      >
        <span className="text-xs uppercase font-mono tracking-widest text-white/85 group-hover:text-cyan-400 transition-colors">
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
