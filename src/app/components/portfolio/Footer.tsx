import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
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

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-slate-200/90 dark:border-white/10 bg-white/60 dark:bg-[#070A12] py-12 sm:py-16 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-10 items-start text-left">
          {/* Brand Panel */}
          <div className="md:col-span-5">
            <div
              className="flex items-center gap-3 mb-3.5 group cursor-pointer"
              onClick={scrollToTop}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1.5px] shadow-xs">
                <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center">
                  <span className="text-white text-xs font-mono font-bold tracking-wider">YG</span>
                </div>
              </div>
              <span className="text-slate-900 dark:text-white font-bold tracking-tight text-lg sm:text-xl">
                Yerosan Girma
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Full-Stack Software Engineer building scalable, user-centric web applications. Harnessing clean modular code, normalized databases, and modern reactive user interfaces.
            </p>
            <div className="mt-3.5 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Addis Ababa, Ethiopia • Open to Opportunities</span>
            </div>
          </div>

          {/* Quick Links Panel */}
          <div className="md:col-span-4">
            <h4 className="text-slate-900 dark:text-white text-xs font-mono font-bold tracking-wider uppercase mb-3 sm:mb-4">
              // Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "About", id: "about" },
                { label: "Skills", id: "skills" },
                { label: "Projects", id: "projects" },
                { label: "Services", id: "services" },
                { label: "Experience", id: "experience" },
                { label: "Activity", id: "github-section" },
                { label: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 text-xs sm:text-sm transition-colors font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Panel */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="text-slate-900 dark:text-white text-xs font-mono font-bold tracking-wider uppercase mb-3 sm:mb-4">
              // Connect
            </h4>
            <div className="flex gap-2 mb-5">
              {[
                { icon: Github, href: "https://github.com/Yerosan-Girma", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:yerosang463@gmail.com", label: "Email" },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={soc.label}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 transition-all cursor-pointer"
                  aria-label={soc.label}
                >
                  <soc.icon size={16} />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowUp size={13} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} Yerosan Girma. All rights reserved.</p>
          <p className="text-[11px]">
            Engineered with React 18, TypeScript, Tailwind CSS & Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
