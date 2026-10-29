import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import Lenis from "lenis";

// Core components
import { Navbar } from "../components/portfolio/Navbar";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Services } from "../components/portfolio/Services";
import { Skills } from "../components/portfolio/Skills";
import { Projects } from "../components/portfolio/Projects";
import { Experience } from "../components/portfolio/Experience";
import { GithubSection } from "../components/portfolio/GithubSection";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";
import { CustomCursor } from "../components/portfolio/CustomCursor";
import { InteractiveBackground } from "../components/portfolio/InteractiveBackground";
import { useTheme } from "../context/ThemeContext";

// ── Animated Section Divider ──
function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 my-4 sm:my-8 pointer-events-none">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-cyan-400/20 to-transparent origin-center"
      />
    </div>
  );
}

export function PortfolioPage() {
  const { isDark } = useTheme();
  const [showTop, setShowTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track mouse for ambient spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.02,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle initial URL hash scroll
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        }
      }, 250);
    }

    const onScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = null;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080A10] text-slate-900 dark:text-white overflow-x-hidden selection:bg-blue-500/20 dark:selection:bg-cyan-400/25 relative transition-colors duration-300">
      {/* Custom Follow Cursor */}
      <CustomCursor />

      {/* Top Animated Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 origin-left z-50 pointer-events-none"
      />

      {/* Interactive Background Particle Mesh */}
      <InteractiveBackground />

      {/* Global Interactive Mouse Spotlight Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDark ? "rgba(56, 189, 248, 0.05)" : "rgba(29, 78, 216, 0.04)"
          }, transparent 80%)`,
        }}
      />

      {/* Atmospheric Ambient Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-600/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 -right-32 w-[420px] h-[420px] rounded-full bg-indigo-500/5 dark:bg-cyan-500/10 blur-3xl"
        />
      </div>

      {/* Page Content Flow */}
      <div className="relative z-10">
        {/* Navigation Header */}
        <Navbar />

        {/* Sections Flow */}
        <Hero />

        <SectionDivider />
        <About />

        <SectionDivider />
        <Services />

        <SectionDivider />
        <Skills />

        <SectionDivider />
        <Projects />

        <SectionDivider />
        <Experience />

        <SectionDivider />
        <GithubSection />

        <SectionDivider />
        <Contact />

        <Footer />
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/30 transition-all z-50 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PortfolioPage;
