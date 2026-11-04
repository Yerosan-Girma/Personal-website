import { Github, Linkedin, Mail, ArrowUp, Code2 } from "lucide-react";

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
    <footer className="border-t border-slate-200/90 dark:border-white/[0.07] bg-white/80 dark:bg-[#070A12] py-14 sm:py-18 relative overflow-hidden transition-colors duration-300">
      {/* Subtle footer glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-to-b from-blue-500/[0.04] dark:from-blue-500/[0.06] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-12 items-start text-left">
          {/* Brand Panel */}
          <div className="md:col-span-5">
            <div
              className="flex items-center gap-3 mb-4 group cursor-pointer"
              onClick={scrollToTop}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-[1.5px] shadow-sm group-hover:shadow-blue-500/30 transition-shadow duration-200">
                <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center">
                  <span className="text-white text-xs font-mono font-bold tracking-wider">YG</span>
                </div>
              </div>
              <div>
                <span className="text-slate-900 dark:text-white font-bold tracking-tight text-xl sm:text-2xl block leading-tight">
                  Yerosan Girma
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Full-Stack Engineer
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
              Building scalable, user-centric web applications with clean modular code, normalized databases, and modern
              reactive user interfaces.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Addis Ababa, Ethiopia • Open to Opportunities</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5 mt-5">
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
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400/60 dark:hover:border-cyan-400/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-sm"
                  aria-label={soc.label}
                >
                  <soc.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Panel */}
          <div className="md:col-span-4">
            <h4 className="text-slate-900 dark:text-white text-xs font-mono font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <Code2 size={12} className="text-blue-600 dark:text-cyan-400" />
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
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
                  className="text-left text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 text-sm transition-colors duration-200 font-medium cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-slate-900 dark:text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Quick Actions
            </h4>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            >
              <ArrowUp size={14} />
              <span>Back to Top</span>
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-95"
            >
              <Mail size={14} />
              <span>Hire Me</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-7 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <p>© {new Date().getFullYear()} Yerosan Girma. All rights reserved.</p>
          <p className="text-[11px]">
            Engineered with React 18 · TypeScript · Tailwind CSS · Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
