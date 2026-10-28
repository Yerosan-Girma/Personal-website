import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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

// New components
import { Services } from "../components/portfolio/Services";


// ── Section divider ──
function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent origin-left"
      />
    </div>
  );
}

export function PortfolioPage() {
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-700">
      {/* Page layout wrapper */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* Navigation Header */}
            <Navbar darkMode={false} toggleDark={() => {}} />

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

      {/* Floating scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg hover:bg-[#1E40AF] transition-colors z-50"
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
