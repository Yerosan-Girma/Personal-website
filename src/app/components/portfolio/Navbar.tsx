import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/85 dark:bg-[#080A10]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            aria-label="Yerosan Girma Home"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-600/20 group-hover:shadow-blue-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="text-white text-xs font-mono font-bold tracking-wider">YG</span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-slate-900 dark:text-white font-bold tracking-tight text-base sm:text-lg block leading-none">
                Yerosan<span className="text-blue-600 dark:text-cyan-400">.</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase hidden sm:block mt-1">
                Software Engineer
              </span>
            </div>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isCurrent = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                    isCurrent
                      ? "text-blue-600 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isCurrent && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-xs -z-10 border border-slate-200/50 dark:border-white/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Cluster: Theme Toggle + Resume */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <motion.a
              href="mailto:yerosang463@gmail.com?subject=Resume%20Request%20-%20Yerosan%20Girma"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold tracking-wide shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile Actions: Theme Toggle + Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2.5">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-white focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen / Drawer Menu (Awwwards Style) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-x-0 top-18 sm:top-20 bg-white/95 dark:bg-[#080A10]/95 backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/10 flex flex-col justify-between px-6 pt-8 pb-32 z-40 overflow-y-auto"
            >
              {/* Editorial navigation items */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-2">
                  Navigation
                </span>
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    onClick={() => scrollTo(link.id)}
                    className={`text-left py-3 px-4 rounded-2xl flex items-center justify-between text-2xl font-bold tracking-tight transition-all cursor-pointer ${
                      active === link.id
                        ? "text-blue-600 dark:text-cyan-400 bg-blue-50/70 dark:bg-white/5"
                        : "text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                  </motion.button>
                ))}
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Appearance</span>
                  <ThemeToggle showLabel />
                </div>

                <motion.a
                  href="mailto:yerosang463@gmail.com?subject=Resume%20Request%20-%20Yerosan%20Girma"
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </motion.a>

                <p className="text-center text-xs font-mono text-slate-400 dark:text-slate-500 mt-2">
                  Addis Ababa, Ethiopia • Full Stack Engineer
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Background Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
