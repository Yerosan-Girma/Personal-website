import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Download, ExternalLink, Mail, MapPin, GraduationCap, Briefcase, Award, Code2, Database, Wrench } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Action Bar (Sticky, No-Print) */}
          <div className="no-print flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <span className="hidden sm:inline">Curriculum Vitae // Verified Profile</span>
                <span className="sm:hidden">CV // Profile</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Resume Printable Sheet */}
          <div className="overflow-y-auto p-4 sm:p-10 text-slate-900 dark:text-slate-100 font-sans leading-relaxed space-y-6 sm:space-y-8">
            {/* Top Identity Block */}
            <div className="border-b border-slate-200 dark:border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Yerosan Girma
                </h1>
                <p className="text-base sm:text-lg font-medium text-blue-600 dark:text-cyan-400 mt-1">
                  Full-Stack Software Engineer
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" /> Addis Ababa, Ethiopia
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-slate-400" /> yerosang463@gmail.com
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 no-print">
                <a
                  href="https://github.com/Yerosan-Girma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-medium hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1"
                >
                  <span>github.com/Yerosan-Girma</span>
                  <ExternalLink size={11} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yerosan-girma-30005b37a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-medium hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1"
                >
                  <span>linkedin.com/in/yerosan-girma</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                // Professional Summary
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Dedicated Full-Stack Software Engineer pursuing a B.Sc. in Software Engineering at Haramaya University. Hands-on experience architecting production-ready web platforms with high-performance React and TypeScript frontends, secure Node.js/Express RESTful APIs, and optimized databases (PostgreSQL, MongoDB, MySQL). Passionate about scalable architecture, clean code standards, responsive ergonomics, and solving real-world challenges through elegant technology.
              </p>
            </div>

            {/* Core Competencies / Technical Skills */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                // Technical Competencies
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <Code2 size={14} className="text-blue-600 dark:text-cyan-400" />
                    Frontend Engineering
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Bootstrap, HTML5, CSS3, Motion
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <Code2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                    Backend & System Architecture
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Node.js, Express.js, RESTful APIs, WebSockets, JWT Authentication, MVC Architecture
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <Database size={14} className="text-amber-600 dark:text-amber-400" />
                    Databases & Data Modeling
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    PostgreSQL, MongoDB (Mongoose), MySQL, Schema Normalization, Query Indexing
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
                  <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <Wrench size={14} className="text-indigo-600 dark:text-indigo-400" />
                    DevOps, Tools & Workflows
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Git, GitHub, Postman, Docker, Vercel, Render, CI/CD, Responsive UI Design
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                // Experience
              </h2>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Freelance Full-Stack Developer
                    </h3>
                    <span className="font-mono text-xs text-slate-500">2023 – Present</span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-cyan-400 font-medium">Self-Employed • Remote</p>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 space-y-1">
                    <li>Architected and delivered custom full-stack web applications for clients utilizing MERN and TypeScript.</li>
                    <li>Designed modular REST APIs with JWT authentication, role-based access control, and rate limiting.</li>
                    <li>Integrated real-time bidirectional communication channels using WebSockets for collaborative platforms.</li>
                    <li>Optimized database schemas and index strategies to reduce query response times.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                // Selected Engineering Projects
              </h2>
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Kiray Bet (ኪራይ ቤት) — Home Rental Marketplace
                    </h3>
                    <span className="font-mono text-xs text-slate-500">2024</span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">React, TypeScript, Node.js, Express, MongoDB, WebSockets, Tailwind CSS</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    Ethiopia's premier rental platform connecting tenants, owners, and verified brokers with map exploration, role-based dashboards, and live chat.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      E-Learning Platform — Course & Certification Management
                    </h3>
                    <span className="font-mono text-xs text-slate-500">2024</span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">React, Node.js, Express, PostgreSQL, HTML/CSS</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    Online education system with lesson progression, interactive quizzes, digital libraries, and automated completion certificate generation.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      MarketHub — Multi-Vendor E-Commerce Platform
                    </h3>
                    <span className="font-mono text-xs text-slate-500">2023</span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">React, Node.js, Express, MongoDB, Stripe</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    Multi-storefront marketplace with custom vendor dashboard panels, product catalog filters, and secure payment processing.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      WabiSeminar Live — Real-Time Meeting & Webcast
                    </h3>
                    <span className="font-mono text-xs text-slate-500">2024</span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">React, Node.js, WebSockets, MongoDB, Express</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    Real-time seminar room creation, live video and chat signaling, attendee presence, and interactive feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Training */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                // Education & Certifications
              </h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span>B.Sc. in Software Engineering — Haramaya University</span>
                    <span className="font-mono text-xs text-slate-500">2021 – Present</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Curriculum focus: Data Structures, Algorithms, Software Architecture, Database Systems, Computer Networks.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span>Full Stack Web Development Bootcamp — WabSkills</span>
                    <span className="font-mono text-xs text-slate-500">2024</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Intensive MERN stack engineering, agile team collaboration, cloud deployment workflows.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                    <span>The Complete Web Developer Bootcamp — Udemy</span>
                    <span className="font-mono text-xs text-slate-500">2023</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    Comprehensive full-stack foundations, asynchronous programming, modern component lifecycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
