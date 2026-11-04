import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import Lenis from "lenis";

// Core portfolio components
import { Navbar } from "../components/portfolio/Navbar";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Skills } from "../components/portfolio/Skills";
import { Projects } from "../components/portfolio/Projects";
import { Services } from "../components/portfolio/Services";
import { Experience } from "../components/portfolio/Experience";
import { GithubSection } from "../components/portfolio/GithubSection";
import { Contact } from "../components/portfolio/Contact";
import { Footer } from "../components/portfolio/Footer";
import { InteractiveBackground } from "../components/portfolio/InteractiveBackground";
import { ResumeModal } from "../components/portfolio/ResumeModal";
import { useTheme } from "../context/ThemeContext";

function SubtleSectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pointer-events-none">
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200/80 dark:via-white/[0.06] to-transparent" />
    </div>
  );
}

export function PortfolioPage() {
  const { isDark } = useTheme();
  const [showTop, setShowTop] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track mouse for ambient spotlight on desktop
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
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
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
          lenis.scrollTo(target as HTMLElement, { offset: -70 });
        }
      }, 250);
    }

    const onScroll = () => {
      setShowTop(window.scrollY > 400);
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B16] text-slate-900 dark:text-white max-w-full overflow-x-hidden selection:bg-blue-500/20 dark:selection:bg-cyan-400/25 relative transition-colors duration-300">
      {/* Top Animated Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 origin-left z-50 pointer-events-none shadow-lg shadow-blue-500/20"
      />

      {/* Interactive Background Particle Mesh */}
      <InteractiveBackground />

      {/* Subtle Ambient Spotlight Glow on Desktop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDark ? "rgba(56, 189, 248, 0.04)" : "rgba(37, 99, 235, 0.03)"
          }, transparent 80%)`,
        }}
      />

      {/* Main Content Flow */}
      <div className="relative z-10 max-w-full overflow-x-hidden">
        {/* Navigation Header */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} />

          <SubtleSectionDivider />
          <About />

          <SubtleSectionDivider />
          <Skills />

          <SubtleSectionDivider />
          <Projects />

          <SubtleSectionDivider />
          <Services />

          <SubtleSectionDivider />
          <Experience onOpenResume={() => setIsResumeOpen(true)} />

          <SubtleSectionDivider />
          <GithubSection />

          <SubtleSectionDivider />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 w-11 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all z-40 cursor-pointer"
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
