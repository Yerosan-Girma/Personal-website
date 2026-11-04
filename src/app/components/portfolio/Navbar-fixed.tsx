import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  onOpenResume: () => void;
}

const navLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Experience", id: "experience" },
  { label: "Activity", id: "github-section" },
  { label: "Contact", id: "contact" },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const allIds = ["home", ...navLinks.map((l) => l.id)];
    allIds.forEach((id) => {
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

  // Prevent background scroll when mobile menu is open
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
      lenis.scrollTo(target, { offset: -70 });
    } else {
      const yOffset = -70;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/92 dark:bg-[#070B16]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-black/20"
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-16 sm:h-20">
          {/* Logo Monogram */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
            aria-label="Yerosan Girma Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1.5px] shadow-sm group-hover:shadow-md transition-shadow">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="text-white text-xs font-mono font-bold tracking-wider">YG</span>
              </div>
            </div>
            <div>
              <span className="text-slate-900 dark:text-white font-bold tracking-tight text-base sm:text-lg block leading-tight">
                Yerosan Girma
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Software Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
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
                      className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-xs -z-10 border border-slate-200/60 dark:border-white/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Theme Toggle + Resume Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <FileText size={14} />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-white focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden fixed inset-x-0 top-16 sm:top-20 h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] bg-white/98 dark:bg-[#070B16]/98 backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/[0.08] flex flex-col justify-between px-5 sm:px-6 pt-5 pb-8 z-40 overflow-y-auto"
            >
              {/* Navigation items */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-1 px-2">
                  Navigation
                </span>
                <button
                  onClick={() => scrollTo("home")}
                  className={`text-left py-2.5 px-3.5 rounded-xl flex items-center justify-between text-base sm:text-lg font-bold tracking-tight transition-all cursor-pointer ${
                    active === "home"
                      ? "text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-white/10"
                      : "text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400"
                  }`}
                >
                  <span>Home</span>
                  <span className="text-xs font-mono text-slate-400">00</span>
                </button>
                {navLinks.map((link, i) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`text-left py-2.5 px-3.5 rounded-xl flex items-center justify-between text-base sm:text-lg font-bold tracking-tight transition-all cursor-pointer ${
                      active === link.id
                        ? "text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-white/10"
                        : "text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                  </button>
                ))}
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3 mt-4">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  <FileText size={15} />
                  <span>View & Print Resume</span>
                </button>

                <p className="text-center text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                  Addis Ababa, Ethiopia â€¢ Full-Stack Engineer
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Backdrop */}
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

