import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Sparkles } from "lucide-react";

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
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
            ? "bg-[#F8F9FB]/95 backdrop-blur-md border-b border-gray-200/90 shadow-xs"
            : "bg-[#F8F9FB]/80 backdrop-blur-xs"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1D4ED8] flex items-center justify-center shadow-xs">
              <span className="text-white text-xs sm:text-sm font-bold tracking-tight">YG</span>
            </div>
            <span className="text-gray-900 font-bold tracking-tight text-base sm:text-lg">
              Yerosan<span className="text-[#1D4ED8]">.</span>
            </span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-xl border border-gray-200/60 shadow-xs">
            {navLinks.map((link) => {
              const isCurrent = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isCurrent
                      ? "text-[#1D4ED8] font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60"
                  }`}
                >
                  {isCurrent && (
                    <motion.span
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-[#1D4ED8]/10 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Resume button */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4.5 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs lg:text-sm font-semibold hover:bg-[#1E40AF] transition-colors shadow-xs"
            >
              <Download size={14} />
              Resume
            </motion.a>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white border border-gray-200 flex flex-col gap-[5px] items-center justify-center text-gray-700 relative focus:outline-none z-50 shadow-xs cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
                menuOpen ? "-rotate-45 translate-y-[-6.5px]" : ""
              }`}
            />
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
              className="md:hidden bg-[#F8F9FB] border-b border-gray-200 overflow-hidden relative z-40"
            >
              <div className="px-5 py-4 flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => scrollTo(link.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                      active === link.id
                        ? "bg-[#1D4ED8]/10 text-[#1D4ED8]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mt-2 py-3 rounded-xl bg-[#1D4ED8] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download size={14} /> Download Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
