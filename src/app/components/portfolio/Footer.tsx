import { motion } from "motion/react";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
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

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#030712]/40 backdrop-blur-sm py-14 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-10 items-start">
          {/* Brand Panel */}
          <div className="md:col-span-5 text-left">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer" onClick={scrollToTop}>
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <span className="text-white text-xs" style={{ fontWeight: 800 }}>YG</span>
              </div>
              <span className="text-white font-bold" style={{ fontWeight: 700 }}>
                Yerosan Girma<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed max-w-sm">
              Full Stack Software Engineer building scalable, user-centric web applications. Harnessing clean code structures and modern frontend stacks.
            </p>
          </div>

          {/* Quick links Panel (removed GitHub and Tech Stack links) */}
          <div className="md:col-span-4 text-left">
            <h4 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
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
                  className="text-left text-white/45 hover:text-cyan-400 text-xs sm:text-sm transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Panel */}
          <div className="md:col-span-3 text-left flex flex-col items-start">
            <h4 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
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
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.05] transition-all shadow-md"
                >
                  <soc.icon size={15} />
                </motion.a>
              ))}
            </div>

            {/* Back to top button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-white/50 hover:text-cyan-400 transition-colors text-xs font-semibold"
            >
              <ArrowUp size={13} /> Back to Top
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Yerosan Girma. All rights reserved.
          </p>
          <p className="text-white/25 text-xs flex items-center gap-1.5 font-medium">
            Built with <Heart size={12} className="text-red-500/60 fill-red-500/50 animate-pulse" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
