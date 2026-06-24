import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import Lenis from "lenis";

// Core components
import { Navbar } from "../components/portfolio/Navbar";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Skills } from "../components/portfolio/Skills";
import { Projects } from "../components/portfolio/Projects";
import { Experience } from "../components/portfolio/Experience";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";

// Redesigned components
import { AnimatedBackground } from "../components/portfolio/AnimatedBackground";
import { CustomCursor } from "../components/portfolio/CustomCursor";
import { LoadingScreen } from "../components/portfolio/LoadingScreen";

// New components
import { Services } from "../components/portfolio/Services";


// ── Section divider ──
function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent origin-left"
      />
    </div>
  );
}

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.02,
    });

    // Make the Lenis instance globally accessible
    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

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
  }, [loading]);

  const handleScrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Interactive custom cursor */}
      <CustomCursor />

      {/* Floating Canvas background containing 3D tag cloud sphere */}
      <AnimatedBackground />

      {/* Sleek Percentage Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Page layout wrapper */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 animate-fade-in"
          >
            {/* Navigation Header */}
            <Navbar darkMode={true} toggleDark={() => {}} />

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
            <Contact />
            
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating scroll to top spring-trigger */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
            whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 z-50 border border-white/10"
            style={{ width: 48, height: 48 }}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
export default PortfolioPage;
