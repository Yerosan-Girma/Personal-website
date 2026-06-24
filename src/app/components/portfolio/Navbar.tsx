import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download } from "lucide-react";

// Cleaned up nav links (removed Tech Stack and GitHub)
const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

export function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection using IntersectionObserver
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

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    
    // Support Lenis smooth scroll or fallback to standard scroll
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -76 });
    } else {
      const yOffset = -76;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-[#030712]/90 backdrop-blur-md border-b border-white/[0.06] shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <span className="text-white text-sm font-extrabold">YG</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-1.5px] rounded-xl border border-dashed border-cyan-400/25"
            />
          </div>
          <span className="text-white font-bold tracking-tight">
            Yerosan<span className="text-cyan-400">.</span>
          </span>
        </motion.button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-1 backdrop-blur-sm">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative px-3.5 py-1.5 rounded-xl text-xs lg:text-sm transition-colors duration-200"
              style={{ fontWeight: active === link.id ? 600 : 400 }}
            >
              {active === link.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 320, damping: 25 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${
                active === link.id ? "text-white" : "text-white/50 hover:text-white/80"
              }`}>
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* Resume button */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs lg:text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all overflow-hidden relative group"
          >
            <Download size={14} />
            Resume
            <motion.span
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1.8 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.a>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-[5px] items-center justify-center text-white relative focus:outline-none z-50 pointer-events-auto"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
          }`} />
          <span className={`w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`} />
          <span className={`w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            menuOpen ? "-rotate-45 translate-y-[-6.5px]" : ""
          }`} />
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/[0.06] overflow-hidden absolute top-full left-0 right-0 z-40"
          >
            <div className="px-6 py-5 flex flex-col gap-1 max-h-[85vh] overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-all pointer-events-auto ${
                    active === link.id
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href="#"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold flex items-center justify-center gap-2 pointer-events-auto"
              >
                <Download size={14} /> Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
