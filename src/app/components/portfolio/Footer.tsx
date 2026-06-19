import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white text-xs" style={{ fontWeight: 700 }}>YG</span>
              </div>
              <span className="text-white" style={{ fontWeight: 600 }}>Yerosan Girma</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Full Stack MERN Developer building scalable, user-focused web applications.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white/60 text-xs tracking-widest uppercase mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {["home", "about", "skills", "projects", "experience", "contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left text-white/50 hover:text-white text-sm transition-colors capitalize"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/60 text-xs tracking-widest uppercase mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/Yerosan-Girma", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:yerosang463@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Yerosan Girma. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Built with <Heart size={13} className="text-red-400/70 fill-red-400/70" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
