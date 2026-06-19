import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";
import { ArrowUp } from "lucide-react";
import { Navbar } from "../components/portfolio/Navbar";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Skills } from "../components/portfolio/Skills";
import { Projects } from "../components/portfolio/Projects";
import { Experience } from "../components/portfolio/Experience";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";

// ── Cursor glow that follows the mouse ──
function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: sx, top: sy, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[80px]"
    />
  );
}

// ── Section divider ──
function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent origin-left"
      />
    </div>
  );
}

// ── Splash screen ──
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  const letters = "Yerosan Girma".split("");

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#050914] flex items-center justify-center overflow-hidden"
    >
      {/* Pulse ring */}
      {[1, 2, 3].map((n) => (
        <motion.div
          key={n}
          className="absolute rounded-full border border-blue-500/20"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 600 * n, height: 600 * n, opacity: 0 }}
          transition={{ duration: 2, delay: n * 0.3, ease: "easeOut", repeat: Infinity, repeatDelay: 0.5 }}
        />
      ))}

      <div className="relative text-center z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/50"
        >
          <span className="text-white text-3xl" style={{ fontWeight: 800 }}>YG</span>
        </motion.div>

        {/* Animated name letters */}
        <h1 className="text-white text-3xl mb-2 overflow-hidden" style={{ fontWeight: 700 }}>
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.055, duration: 0.4, type: "spring" }}
              style={{ display: "inline-block" }}
            >
              {l === " " ? " " : l}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/40 text-sm mb-8 tracking-widest uppercase"
        >
          Full Stack MERN Developer
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-52 mx-auto h-0.5 rounded-full bg-white/8 overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white overflow-x-hidden">
      {/* Cursor glow */}
      <CursorGlow />

      {/* Splash */}
      <AnimatePresence>
        {loading && <SplashScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Navbar darkMode={true} toggleDark={() => {}} />
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.3, rotate: -90 }}
            whileHover={{ scale: 1.15, y: -4, boxShadow: "0 0 25px rgba(59,130,246,0.6)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-6 w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 z-50 border border-white/20"
            style={{ width: 52, height: 52 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
