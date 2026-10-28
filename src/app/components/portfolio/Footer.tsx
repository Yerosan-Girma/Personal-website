import { motion } from "motion/react";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
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

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-white py-12 sm:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 items-start">
          {/* Brand Panel */}
          <div className="md:col-span-5 text-left">
            <div className="flex items-center gap-2.5 mb-3 group cursor-pointer" onClick={scrollToTop}>
              <div className="relative w-9 h-9 rounded-xl bg-[#1D4ED8] flex items-center justify-center shadow-xs">
                <span className="text-white text-xs font-bold">YG</span>
              </div>
              <span className="text-gray-900 font-bold tracking-tight text-lg">
                Yerosan Girma<span className="text-[#1D4ED8]">.</span>
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Full Stack Software Engineer building scalable, user-centric web applications. Harnessing clean code structures, robust databases, and modern frontend stacks.
            </p>
          </div>

          {/* Quick links Panel */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-gray-900 text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "About", id: "about" },
                { label: "Services", id: "services" },
                { label: "Skills", id: "skills" },
                { label: "Projects", id: "projects" },
                { label: "Experience", id: "experience" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-gray-600 hover:text-[#1D4ED8] text-xs sm:text-sm transition-colors font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Panel */}
          <div className="md:col-span-3 text-left flex flex-col items-start">
            <h4 className="text-gray-900 text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4">
              Connect
            </h4>
            <div className="flex gap-2.5 mb-5">
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
                  title={soc.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <soc.icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Back to top button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 hover:text-[#1D4ED8] hover:border-gray-300 transition-colors text-xs font-semibold cursor-pointer"
            >
              <ArrowUp size={13} /> Back to Top
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Yerosan Girma. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1.5 font-medium">
            Engineered with <Heart size={11} className="text-red-500 fill-red-500" /> using React, Motion & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
