import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Server,
  Database,
  Palette,
  CheckCircle2,
  ArrowRight,
  Workflow,
  Check,
  Compass,
  Code2,
  Cpu,
  Rocket,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface ServiceItem {
  id: string;
  category: "all" | "fullstack" | "frontend" | "backend" | "database";
  number: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: typeof Layers;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fullstack",
    category: "fullstack",
    number: "01",
    title: "Full-Stack Web Engineering",
    badge: "MERN & TypeScript Architecture",
    tagline: "End-to-End Modern Web Platforms Built for Production",
    description:
      "Architecting complete web platforms from database schema to responsive frontend. Integrating type-safe React interfaces with scalable Node.js/Express backends, robust authentication, and cloud deployment.",
    icon: Layers,
    deliverables: [
      "Custom Single-Page (SPA) & Multi-Page web applications",
      "Type-safe client-server contracts with clean separation of concerns",
      "Secure authentication protocols with JWT, refresh tokens & bcrypt hashing",
      "Third-party integrations: payment processing (Stripe), email gateways & webhooks",
      "Automated CI/CD workflows and production cloud hosting on Vercel & Render",
    ],
    techStack: ["React 18+", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS"],
    metrics: { label: "Standard", value: "Production-Grade" },
  },
  {
    id: "frontend",
    category: "frontend",
    number: "02",
    title: "Frontend & UI Systems",
    badge: "Responsive & Accessible UI",
    tagline: "High-Performance Interfaces Engineered for Speed & Ergonomics",
    description:
      "Designing and implementing modern user interfaces that delight users. Emphasizing mobile-first ergonomics, fast load times, accessible design tokens, and smooth micro-interactions.",
    icon: Palette,
    deliverables: [
      "100% mobile-first responsive layouts across phones, tablets & desktops",
      "Reusable, accessible component systems with strict TypeScript interfaces",
      "Lighthouse performance optimization: lazy loading, asset compression & clean bundles",
      "Intuitive user flows, micro-interactions, and accessible keyboard navigation (WCAG 2.1)",
      "Dynamic dark/light mode theming with fluid typography scales",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Motion", "CSS Grid/Flexbox", "HTML5"],
    metrics: { label: "Design", value: "100% Mobile-First" },
  },
  {
    id: "backend",
    category: "backend",
    number: "03",
    title: "Backend & Real-Time APIs",
    badge: "Server Architecture & Sockets",
    tagline: "High-Throughput Services, Real-Time WebSockets & Secure REST",
    description:
      "Building resilient server backends with layered MVC architecture. Designing RESTful API routes, WebSocket event signaling, strict request validation, and comprehensive error handling.",
    icon: Server,
    deliverables: [
      "Layered MVC & clean service-repository backend architecture",
      "Low-latency real-time bidirectional messaging with WebSockets",
      "Role-Based Access Control (RBAC) with secure session handling",
      "Strict input validation, rate limiting, and centralized error logging",
      "Interactive REST endpoint documentation and Postman collections",
    ],
    techStack: ["Node.js", "Express.js", "WebSockets", "REST APIs", "JWT", "Postman"],
    metrics: { label: "Latency", value: "Low-Latency Sockets" },
  },
  {
    id: "database",
    category: "database",
    number: "04",
    title: "Database Modeling & Query Optimization",
    badge: "Data Integrity & Performance",
    tagline: "Normalized Relational Schemas & Document Aggregations",
    description:
      "Designing relational (PostgreSQL, MySQL) and document (MongoDB) schemas engineered for scale. Implementing indexing, atomic transaction safety, and query tuning.",
    icon: Database,
    deliverables: [
      "Third-normal-form (3NF) relational models & document schema design",
      "Compound B-Tree indexing reducing query latency on high-volume tables",
      "ACID transaction guarantees preventing race conditions and ledger errors",
      "Automated database migrations, schema seeding, and backup procedures",
      "Connection pooling and caching strategies for responsive data throughput",
    ],
    techStack: ["PostgreSQL", "MongoDB", "MySQL", "Mongoose", "SQL Indexing", "Transactions"],
    metrics: { label: "Integrity", value: "ACID Guaranteed" },
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & Requirements",
    description: "Aligning on core project goals, user journeys, data requirements, and technical constraints.",
    icon: Compass,
    timeline: "Phase 1",
  },
  {
    step: "02",
    title: "Architecture & Design",
    description: "Designing database models, API endpoint contracts, and modular frontend component structures.",
    icon: Palette,
    timeline: "Phase 2",
  },
  {
    step: "03",
    title: "Iterative Implementation",
    description: "Writing type-safe code, building secure endpoints, connecting databases, and testing features.",
    icon: Cpu,
    timeline: "Phase 3",
  },
  {
    step: "04",
    title: "Testing, Launch & Delivery",
    description: "Cross-device responsiveness audits, Lighthouse optimization, CI/CD setup, and deployment.",
    icon: Rocket,
    timeline: "Phase 4",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"services" | "process">("services");

  const scrollToContact = (serviceTitle?: string) => {
    const el = document.getElementById("contact");
    if (!el) return;

    if (serviceTitle) {
      const subjectInput = document.getElementById("form-subject") as HTMLInputElement;
      if (subjectInput) {
        subjectInput.value = `Inquiry: ${serviceTitle}`;
        subjectInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" ref={containerRef} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="04"
          label="Capabilities & Process"
          title="Engineering Services &"
          italicTitle="Workflow"
          subtitle="Delivering end-to-end full-stack solutions with clean architecture, responsive ergonomics, and dependable execution."
        />

        {/* View Switcher: Services vs Process */}
        <div className="flex items-center justify-start gap-4 mb-8 sm:mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-xs">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "services"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers size={14} />
              <span>Core Capabilities</span>
            </button>

            <button
              onClick={() => setActiveTab("process")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "process"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Workflow size={14} />
              <span>Engineering Workflow</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Services Grid */}
        <AnimatePresence mode="wait">
          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {SERVICES_DATA.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="rounded-3xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between text-left group"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                              <Icon size={19} />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                                {service.badge}
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                {service.title}
                              </h3>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full shrink-0">
                            {service.number}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                          {service.tagline}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal">
                          {service.description}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="mb-5 pt-4 border-t border-slate-100 dark:border-white/10">
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400" />
                            <span>What I Deliver:</span>
                          </p>
                          <ul className="space-y-2">
                            {service.deliverables.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                              >
                                <span className="w-4 h-4 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {service.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-mono font-medium border border-slate-200/60 dark:border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase">{service.metrics.label}</p>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{service.metrics.value}</p>
                          </div>

                          <button
                            onClick={() => scrollToContact(service.title)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                          >
                            <span>Discuss Project</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Workflow Process */}
          {activeTab === "process" && (
            <motion.div
              key="process-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {WORKFLOW_STEPS.map((wf, idx) => {
                  const WfIcon = wf.icon;
                  return (
                    <motion.div
                      key={wf.step}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 shadow-xs relative flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-extrabold font-serif italic text-blue-600 dark:text-cyan-400">
                            {wf.step}
                          </span>
                          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-white/10">
                            <WfIcon size={17} />
                          </div>
                        </div>

                        <div className="text-[11px] font-mono font-semibold uppercase text-blue-600 dark:text-cyan-400 mb-1">
                          {wf.timeline}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                          {wf.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {wf.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 text-xs font-mono text-slate-400">
                        Milestone {wf.step}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 text-white shadow-lg text-left flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold leading-tight">
                    Clear Milestones & Continuous Communication
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl font-normal leading-relaxed">
                    Staging environments to test working features, clear documentation, and direct progress updates throughout the development lifecycle.
                  </p>
                </div>

                <button
                  onClick={() => scrollToContact()}
                  className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Discussion</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
