import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Monitor,
  Server,
  Database,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Workflow,
  Cpu,
  Clock,
  Compass,
  Rocket,
  Check,
  ChevronRight,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

/* ─────────────────────────────────────────────────────────────
   SERVICES DATA DEFINITIONS
   ───────────────────────────────────────────────────────────── */
interface ServiceItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: typeof Layers;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fullstack",
    number: "01",
    title: "Full-Stack Web Development",
    badge: "End-to-End Solutions",
    tagline: "Complete, Production-Grade Web Applications",
    description:
      "Architecting robust full-stack platforms from the ground up. Uniting reactive TypeScript/React frontends with scalable Node.js/Express backends and high-performance databases.",
    icon: Layers,
    accentColor: "from-blue-600 to-cyan-500",
    glowColor: "rgba(37, 99, 235, 0.15)",
    borderColor: "group-hover:border-blue-500/50 dark:group-hover:border-cyan-400/50",
    deliverables: [
      "Custom Single-Page (SPA) & Multi-Page Web Applications",
      "Seamless client-server integration with type-safe contracts",
      "Robust role-based authentication (JWT, sessions, bcrypt)",
      "Third-party API integrations (Payment gateways, mailers, webhooks)",
      "Production deployment with zero-downtime CI/CD workflows",
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    metrics: { label: "Average Delivery", value: "Production-Ready" },
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend Engineering & UI/UX",
    badge: "Client-Side Systems",
    tagline: "Fluid, Responsive & High-Performance Interfaces",
    description:
      "Crafting pixel-perfect, accessible user interfaces designed for speed and delightful user experience across mobile phones, tablets, laptops, and ultra-wide desktop monitors.",
    icon: Monitor,
    accentColor: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.15)",
    borderColor: "group-hover:border-cyan-500/50 dark:group-hover:border-cyan-400/50",
    deliverables: [
      "100% mobile-first responsive layouts across every viewport",
      "Smooth 60 FPS motion design & tactile micro-interactions",
      "Design systems & reusable, maintainable React component libraries",
      "Lighthouse 95+ performance optimization (Core Web Vitals)",
      "Strict WCAG 2.1 accessibility & cross-browser compatibility",
    ],
    techStack: ["React 18+", "TypeScript", "Tailwind CSS", "Motion/React", "Vite", "HTML5/CSS3"],
    metrics: { label: "Performance Score", value: "95+ Lighthouse" },
  },
  {
    id: "backend",
    number: "03",
    title: "Backend & REST API Systems",
    badge: "Server Architecture",
    tagline: "Secure, Modular & High-Throughput Web Services",
    description:
      "Engineering clean server-side architectures equipped with secure authentication protocols, structured middleware pipelines, robust data validation, and predictable REST APIs.",
    icon: Server,
    accentColor: "from-indigo-600 to-blue-600",
    glowColor: "rgba(99, 102, 241, 0.15)",
    borderColor: "group-hover:border-indigo-500/50 dark:group-hover:border-indigo-400/50",
    deliverables: [
      "Layered MVC & clean service-repository backend architecture",
      "Secure JWT authentication with bcrypt hashing & refresh tokens",
      "Real-time bidirectional synchronization with WebSockets",
      "Strict request validation, rate limiting, and centralized error logging",
      "Interactive REST API documentation and Postman collections",
    ],
    techStack: ["Node.js", "Express.js", "REST APIs", "JWT", "WebSockets", "Cors/Helmet"],
    metrics: { label: "Security & Uptime", value: "Enterprise-Grade" },
  },
  {
    id: "database",
    number: "04",
    title: "Database Design & Optimization",
    badge: "Data Integrity & Speed",
    tagline: "Normalized Schemas & Sub-Second Query Execution",
    description:
      "Designing relational and document database schemas built for high concurrency. Implementing compound B-Tree indexes, efficient aggregations, and strict ACID transaction safety.",
    icon: Database,
    accentColor: "from-emerald-600 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "group-hover:border-emerald-500/50 dark:group-hover:border-emerald-400/50",
    deliverables: [
      "Third-normal-form (3NF) relational schemas & document modeling",
      "B-Tree query indexing reducing lookup latency by up to 95%",
      "ACID transaction guarantees ensuring zero data inconsistency",
      "Automated database migrations, schema seeding, and backups",
      "Connection pooling & caching strategies for high-traffic throughput",
    ],
    techStack: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Mongoose", "Indexing"],
    metrics: { label: "Query Latency", value: "< 15ms Avg" },
  },
];

/* ─────────────────────────────────────────────────────────────
   WORKFLOW STEPS (HOW I WORK)
   ───────────────────────────────────────────────────────────── */
const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description: "Clarifying project objectives, user flows, database schemas, and selecting the optimal technology stack.",
    icon: Compass,
  },
  {
    step: "02",
    title: "UI/UX & Frontend Build",
    description: "Developing responsive, pixel-perfect layouts, interactive components, and comprehensive design systems.",
    icon: Code2,
  },
  {
    step: "03",
    title: "API & Backend Integration",
    description: "Building secure server controllers, connecting databases, implementing authentication, and third-party APIs.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Testing, Launch & Handover",
    description: "Rigorous performance audits, cross-browser validation, CI/CD cloud deployment, and full documentation.",
    icon: Rocket,
  },
];

/* ─────────────────────────────────────────────────────────────
   SERVICES DATA DEFINITIONS
   ───────────────────────────────────────────────────────────── */

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"services" | "process">("services");

  const scrollToContact = (serviceTitle?: string) => {
    const el = document.getElementById("contact");
    if (!el) return;

    // If a service title is passed, set subject or comment if field exists
    if (serviceTitle) {
      const subjectInput = document.querySelector('input[name="subject"]') as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${serviceTitle}`;
      }
    }

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" ref={containerRef} className="py-14 sm:py-18 lg:py-20 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="03"
          label="Services & Offerings"
          title="Engineering"
          italicTitle="Services"
          subtitle="Clear, reliable software solutions designed for scalability, intuitive user experiences, and measurable real-world performance."
        />

        {/* View Switcher Pill */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-xs">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "services"
                  ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers size={15} />
              <span>Core Services</span>
            </button>

            <button
              onClick={() => setActiveTab("process")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "process"
                  ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Workflow size={15} />
              <span>How I Work</span>
            </button>
          </div>
        </div>

        {/* ── TAB 1: CORE SERVICES GRID (CLEAN, CLEAR, INTUITIVE) ── */}
        <AnimatePresence mode="wait">
          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 sm:space-y-16"
            >
              {/* 2x2 Clean Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                {SERVICES_DATA.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`group rounded-3xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-2xl dark:hover:shadow-[0_15px_35px_rgba(56,189,248,0.1)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${service.borderColor}`}
                    >
                      {/* Top Accent Gradient Bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Header Section */}
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                              <Icon size={22} />
                            </div>
                            <div>
                              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                                {service.badge}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {service.title}
                              </h3>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                            {service.number}
                          </span>
                        </div>

                        {/* Tagline & Description */}
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                          {service.tagline}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-light">
                          {service.description}
                        </p>

                        {/* Deliverables Checklist (Clear & Readable) */}
                        <div className="mb-6 pt-5 border-t border-slate-100 dark:border-white/10">
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400" />
                            <span>What You Get / Key Deliverables:</span>
                          </p>

                          <ul className="space-y-2.5">
                            {service.deliverables.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                              >
                                <span className="w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer: Tech Stack & Action Deck */}
                      <div className="pt-5 border-t border-slate-100 dark:border-white/10 space-y-4">
                        {/* Tech Stack Chips */}
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                            Technologies & Tools:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {service.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-mono font-medium border border-slate-200/60 dark:border-white/5"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Deck */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-left">
                            <p className="text-[10px] font-mono text-slate-400 uppercase">{service.metrics.label}</p>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{service.metrics.value}</p>
                          </div>

                          <motion.button
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollToContact(service.title)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                          >
                            <span>Inquire Scope</span>
                            <ArrowRight size={13} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: DEVELOPMENT PROCESS (HOW I WORK) ── */}
          {activeTab === "process" && (
            <motion.div
              key="process-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {WORKFLOW_STEPS.map((wf, idx) => {
                  const WfIcon = wf.icon;
                  return (
                    <motion.div
                      key={wf.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="p-6 rounded-3xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 shadow-sm relative flex flex-col justify-between text-left group hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div>
                        {/* Step Number & Icon */}
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-3xl font-extrabold font-serif italic text-blue-600 dark:text-cyan-400">
                            {wf.step}
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-white/10">
                            <WfIcon size={18} />
                          </div>
                        </div>

                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                          {wf.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                          {wf.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-cyan-400 font-semibold">
                        <span>Milestone Phase {wf.step}</span>
                        <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Engagement Highlights Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50/60 dark:from-slate-900/90 dark:via-[#0B1120] dark:to-blue-950/30 border border-blue-200/80 dark:border-cyan-400/20 shadow-sm text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2">
                      <Sparkles size={14} />
                      Transparent Collaboration
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Clear Milestones, Continuous Demos & Zero Guesswork
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl font-light">
                      From day one, you get regular progress updates, staging links to test working features, clear documentation, and direct communication throughout the lifecycle.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToContact()}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Your Project Timeline</span>
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM CONSULTATION BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-900 to-slate-950 text-white p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles size={12} className="text-cyan-300" />
              Custom Web Solutions
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">Have a custom software requirement?</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl font-light">
              Let's discuss your architecture, tech stack selection, milestone roadmaps, and delivery timelines.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToContact()}
            className="relative z-10 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
