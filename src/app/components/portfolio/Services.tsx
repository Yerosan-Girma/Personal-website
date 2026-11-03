import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layers,
  Monitor,
  Server,
  Database,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Workflow,
  Cpu,
  Compass,
  Rocket,
  Check,
  ChevronRight,
  Smartphone,
  Gauge,
  Sliders,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

/* ─────────────────────────────────────────────────────────────
   SERVICES DATA DEFINITIONS
   ───────────────────────────────────────────────────────────── */
interface ServiceItem {
  id: string;
  category: "all" | "design" | "fullstack" | "backend" | "database";
  number: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: typeof Layers;
  accentColor: string;
  borderColor: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "design-uiux",
    category: "design",
    number: "01",
    title: "UI/UX & Product Design",
    badge: "Design Systems & Interfaces",
    tagline: "Intuitive, Aesthetic & High-Conversion Digital Interfaces",
    description:
      "Crafting bespoke digital user experiences from initial concept to high-fidelity implementation. Specializing in mobile-first responsive design, interactive prototypes, design systems, and seamless Figma-to-React translation.",
    icon: Palette,
    accentColor: "from-pink-500 via-rose-500 to-blue-600",
    borderColor: "group-hover:border-pink-500/50 dark:group-hover:border-rose-400/50",
    deliverables: [
      "100% mobile-first responsive layouts across every viewport",
      "Interactive Figma wireframing, user flows & high-fidelity mockups",
      "Design systems & reusable, accessible React component libraries",
      "Tactile 60 FPS micro-interactions & smooth page transitions",
      "WCAG 2.1 accessibility, color contrast & ergonomic touch targets",
    ],
    techStack: ["Figma", "Tailwind CSS", "Motion", "Design Systems", "Mobile UI", "Wireframing"],
    metrics: { label: "Standard", value: "100% Mobile-First" },
  },
  {
    id: "fullstack",
    category: "fullstack",
    number: "02",
    title: "Full-Stack Web Development",
    badge: "End-to-End Solutions",
    tagline: "Modern, Scalable & High-Performance Web Applications",
    description:
      "Architecting robust full-stack platforms from the ground up. Uniting reactive TypeScript/React frontends with scalable Node.js/Express backends and high-performance databases.",
    icon: Layers,
    accentColor: "from-blue-600 to-cyan-500",
    borderColor: "group-hover:border-blue-500/50 dark:group-hover:border-cyan-400/50",
    deliverables: [
      "Custom Single-Page (SPA) & Multi-Page Web Applications",
      "Type-safe client-server contracts with seamless integration",
      "Robust role-based authentication (JWT, secure sessions, bcrypt)",
      "Third-party integrations: payment processing, email, webhooks",
      "Automated CI/CD deployment workflows with zero-downtime hosting",
    ],
    techStack: ["React 18+", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    metrics: { label: "Deployment", value: "Production-Ready" },
  },
  {
    id: "backend",
    category: "backend",
    number: "03",
    title: "Backend & Real-Time APIs",
    badge: "Server Architecture",
    tagline: "Secure, High-Throughput Services & WebSockets",
    description:
      "Engineering clean server architectures equipped with secure authentication protocols, structured middleware pipelines, low-latency WebSocket communication, and predictable REST APIs.",
    icon: Server,
    accentColor: "from-indigo-600 to-blue-600",
    borderColor: "group-hover:border-indigo-500/50 dark:group-hover:border-indigo-400/50",
    deliverables: [
      "Layered MVC & clean service-repository backend architecture",
      "Low-latency real-time bidirectional synchronization with WebSockets",
      "Secure JWT authentication with bcrypt hashing & refresh tokens",
      "Strict request validation, rate limiting, and centralized error logging",
      "Interactive REST API documentation and Postman collections",
    ],
    techStack: ["Node.js", "Express.js", "WebSockets", "REST APIs", "JWT", "Helmet/CORS"],
    metrics: { label: "API Speed", value: "< 20ms Latency" },
  },
  {
    id: "database",
    category: "database",
    number: "04",
    title: "Database Design & Optimization",
    badge: "Data Integrity & Speed",
    tagline: "Normalized Schemas & Sub-Second Query Execution",
    description:
      "Designing relational (PostgreSQL, MySQL) and document (MongoDB) schemas built for concurrency. Implementing compound B-Tree indexes, efficient aggregations, and strict ACID transaction safety.",
    icon: Database,
    accentColor: "from-emerald-600 to-teal-500",
    borderColor: "group-hover:border-emerald-500/50 dark:group-hover:border-emerald-400/50",
    deliverables: [
      "Third-normal-form (3NF) relational schemas & document modeling",
      "B-Tree query indexing reducing lookup latency by up to 95%",
      "ACID transaction guarantees ensuring zero data inconsistency",
      "Automated database migrations, schema seeding, and backups",
      "Connection pooling & caching strategies for high-traffic throughput",
    ],
    techStack: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "Mongoose", "Indexing"],
    metrics: { label: "Performance", value: "95+ Lighthouse" },
  },
];

/* ─────────────────────────────────────────────────────────────
   QUALITY STANDARDS / VALUE PILLARS
   ───────────────────────────────────────────────────────────── */
const QUALITY_PILLARS = [
  {
    icon: Smartphone,
    title: "Mobile-First Ergonomics",
    description: "Every touch target, typography scale, and layout is engineered and tested on real mobile devices.",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Lean bundles, lazy-loaded media, and optimized server queries for near-instant interaction.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Clean Code",
    description: "Input validation, encrypted credentials, type safety, and clean separation of concerns.",
  },
  {
    icon: Sparkles,
    title: "Pixel-Perfect UI",
    description: "Flawless attention to typography, spacing, subtle shadows, and cohesive color palettes.",
  },
];

/* ─────────────────────────────────────────────────────────────
   WORKFLOW STEPS (HOW I WORK)
   ───────────────────────────────────────────────────────────── */
const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & UX Wireframing",
    description: "Clarifying business goals, user personas, screen flows, database schemas, and technical specs.",
    icon: Compass,
    timeline: "Days 1 – 3",
  },
  {
    step: "02",
    title: "UI Design & Component Architecture",
    description: "Crafting modern layouts in Figma and building modular, accessible React component libraries.",
    icon: Palette,
    timeline: "Days 4 – 7",
  },
  {
    step: "03",
    title: "Full-Stack Build & Integration",
    description: "Writing backend controllers, connecting databases, implementing authentication, and third-party APIs.",
    icon: Cpu,
    timeline: "Days 8 – 18",
  },
  {
    step: "04",
    title: "Testing, Launch & Handover",
    description: "Cross-device audits, Lighthouse optimizations, automated cloud deployment, and full documentation.",
    icon: Rocket,
    timeline: "Days 19 – 21",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"services" | "process">("services");
  const [activeCategory, setActiveCategory] = useState<string>("all");

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

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" ref={containerRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(56,189,248,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="Design & Engineering Services"
          title="Design &"
          italicTitle="Services"
          subtitle="Translating ambitious visions into engaging digital products. Combining user-centered UI/UX design, clean full-stack code, and resilient architecture."
        />

        {/* View Switcher: Services vs Process */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-12">
          {/* Main Tab Pill */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-xs">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "services"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Palette size={15} />
              <span>Design & Services</span>
            </button>

            <button
              onClick={() => setActiveTab("process")}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "process"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Workflow size={15} />
              <span>How I Work</span>
            </button>
          </div>

          {/* Sub-Filter (When on services tab) */}
          {activeTab === "services" && (
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {[
                { id: "all", label: "All Offerings" },
                { id: "design", label: "UI/UX Design" },
                { id: "fullstack", label: "Full-Stack" },
                { id: "backend", label: "Backend & DB" },
              ].map((filter) => {
                const isSelected =
                  activeCategory === filter.id ||
                  (filter.id === "backend" && (activeCategory === "backend" || activeCategory === "database"));
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategory(filter.id === "backend" ? "backend" : filter.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── TAB 1: SERVICES SHOWCASE (ATTRACTIVE & RESPONSIVE) ── */}
        <AnimatePresence mode="wait">
          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-10 sm:space-y-12"
            >
              {/* Responsive 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 items-stretch">
                {filteredServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      whileHover={{ y: -4 }}
                      className={`group rounded-3xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 p-5 sm:p-7 shadow-xs hover:shadow-xl dark:hover:shadow-[0_15px_35px_rgba(56,189,248,0.1)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${service.borderColor}`}
                    >
                      {/* Top Accent Gradient Bar */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      {/* Header Section */}
                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950 transition-all duration-300 shadow-xs">
                              <Icon size={20} />
                            </div>
                            <div>
                              <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                                {service.badge}
                              </span>
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {service.title}
                              </h3>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full shrink-0">
                            {service.number}
                          </span>
                        </div>

                        {/* Tagline & Description */}
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                          {service.tagline}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal">
                          {service.description}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="mb-5 pt-4 border-t border-slate-100 dark:border-white/10">
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400" />
                            <span>Key Deliverables & Specifications:</span>
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

                      {/* Card Footer: Tech Stack & Action Button */}
                      <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3.5">
                        {/* Tech Stack Chips */}
                        <div>
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
                        </div>

                        {/* Action Deck */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="text-left">
                            <p className="text-[10px] font-mono text-slate-400 uppercase">{service.metrics.label}</p>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{service.metrics.value}</p>
                          </div>

                          <motion.button
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => scrollToContact(service.title)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
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

              {/* ── DESIGN & QUALITY STANDARDS STRIP ── */}
              <div className="p-5 sm:p-8 rounded-3xl bg-slate-50/80 dark:bg-[#0B1120]/80 border border-slate-200/90 dark:border-white/10 shadow-xs">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                    Quality Benchmarks
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    Every Project Built to Industry Standards
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {QUALITY_PILLARS.map((pillar, i) => {
                    const PIcon = pillar.icon;
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-3">
                          <PIcon size={16} />
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {pillar.title}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {pillar.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
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
              transition={{ duration: 0.35 }}
              className="space-y-8 sm:space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {WORKFLOW_STEPS.map((wf, idx) => {
                  const WfIcon = wf.icon;
                  return (
                    <motion.div
                      key={wf.step}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: idx * 0.08 }}
                      className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-[#0B1120]/90 border border-slate-200/90 dark:border-white/10 shadow-xs relative flex flex-col justify-between text-left group hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <div>
                        {/* Step Number & Icon */}
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
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                          {wf.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {wf.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-cyan-400 font-semibold">
                        <span>Milestone Phase {wf.step}</span>
                        <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Engagement Highlights Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50/60 dark:from-slate-900/90 dark:via-[#0B1120] dark:to-blue-950/30 border border-blue-200/80 dark:border-cyan-400/20 shadow-xs text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2">
                      <Sparkles size={14} />
                      Transparent Collaboration
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                      Clear Milestones, Continuous Demos & Zero Guesswork
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl font-normal leading-relaxed">
                      From day one, you get weekly progress demos, staging links to test working features in real time, clean documentation, and direct email/chat communication.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToContact()}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Timeline</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM CONSULTATION BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-900 to-slate-950 text-white p-5 sm:p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold mb-2.5">
              <Sparkles size={12} className="text-cyan-300" />
              Tailored Product Delivery
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
              Have a design or web development project in mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal leading-relaxed">
              Let's analyze your user flow, pick the optimal tech stack, and deliver an intuitive, high-speed solution.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToContact()}
            className="relative z-10 w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
