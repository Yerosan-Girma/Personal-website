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
  Cpu,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { getOptimizedItemVariants } from "../../hooks/useOptimizedStagger";
import { prefersReducedMotion } from "../../utils/mobileAnimations";

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
    tagline: "Production-ready web platforms",
    description: "Complete web applications from database to UI with secure authentication and cloud deployment.",
    icon: Layers,
    deliverables: [
      "Custom SPA & multi-page web applications",
      "Type-safe React + Node.js architecture",
      "JWT authentication with secure sessions",
      "Payment integration (Stripe), email & webhooks",
      "CI/CD deployment on Vercel & Render",
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
    tagline: "Fast, responsive user interfaces",
    description: "Modern, responsive interfaces with mobile-first design and smooth interactions.",
    icon: Palette,
    deliverables: [
      "Mobile-first responsive layouts",
      "Reusable TypeScript component systems",
      "Performance optimization & fast loading",
      "Accessible UI with smooth interactions",
      "Dark/light mode theming",
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
    tagline: "Scalable APIs & real-time features",
    description: "Scalable server architecture with REST APIs, WebSockets, and secure validation.",
    icon: Server,
    deliverables: [
      "Clean MVC architecture",
      "Real-time WebSocket messaging",
      "Role-based access control",
      "Input validation & rate limiting",
      "API documentation & collections",
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
    tagline: "Optimized database architecture",
    description: "Optimized database design with indexing and transaction safety.",
    icon: Database,
    deliverables: [
      "Normalized database schemas",
      "Indexed queries for performance",
      "ACID transactions & data integrity",
      "Database migrations & backups",
      "Connection pooling & caching",
    ],
    techStack: ["PostgreSQL", "MongoDB", "MySQL", "Mongoose", "SQL Indexing", "Transactions"],
    metrics: { label: "Integrity", value: "ACID Guaranteed" },
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & Requirements",
    description: "Define goals, requirements & constraints.",
    icon: Compass,
    timeline: "Phase 1",
  },
  {
    step: "02",
    title: "Architecture & Design",
    description: "Design database, APIs & components.",
    icon: Palette,
    timeline: "Phase 2",
  },
  {
    step: "03",
    title: "Iterative Implementation",
    description: "Build features with secure, tested code.",
    icon: Cpu,
    timeline: "Phase 3",
  },
  {
    step: "04",
    title: "Testing, Launch & Delivery",
    description: "Test, optimize & deploy to production.",
    icon: Rocket,
    timeline: "Phase 4",
  },
];

function ServiceCard({
  service,
  index,
  onContactClick,
}: {
  service: ServiceItem;
  index: number;
  onContactClick: (title: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  // Requirement 31: Use optimized animations with 50% reduction on mobile
  const itemVariants = getOptimizedItemVariants(450);
  const shouldAnimate = !prefersReducedMotion();

  const visibleDeliverables = expanded
    ? service.deliverables
    : service.deliverables.slice(0, 3);

  return (
    <motion.div
      initial={shouldAnimate ? itemVariants.hidden : {}}
      whileInView={shouldAnimate ? itemVariants.visible : {}}
      viewport={{ once: true }}
      transition={shouldAnimate ? { duration: 0.45, delay: index * 0.08 } : { duration: 0 }}
      className="rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left group"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11 rounded-2xl bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform shadow-2xs">
              <Icon size={18} className="sm:hidden" />
              <Icon size={20} className="hidden sm:block md:hidden" />
              <Icon size={24} className="hidden md:block" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {service.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
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
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
          {service.description}
        </p>

        {/* Deliverables Checklist (Top 3 visible, expandable for full detail) */}
        <div className="mb-4 pt-3 border-t border-slate-100 dark:border-white/10">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-blue-600 dark:text-cyan-400" />
            <span>Key Deliverables:</span>
          </p>
          <ul className="space-y-2">
            {visibleDeliverables.map((item, i) => (
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

          {service.deliverables.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2.5 text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{expanded ? "Show less" : `+${service.deliverables.length - 3} more deliverables`}</span>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                <ChevronDown size={13} />
              </motion.div>
            </button>
          )}
        </div>
      </div>

    </motion.div>
  );
}

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
    <section id="services" ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
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
          <div className="w-full sm:w-auto inline-flex p-1 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 backdrop-blur-md shadow-xs">
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${
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
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
            >
              {SERVICES_DATA.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onContactClick={scrollToContact}
                />
              ))}
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
                      className="p-6 rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between text-left"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-extrabold font-serif italic text-blue-600 dark:text-cyan-400">
                            {wf.step}
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-cyan-400 border border-blue-100 dark:border-white/10">
                            <WfIcon size={18} />
                          </div>
                        </div>

                        <div className="text-[11px] font-mono font-bold uppercase text-blue-600 dark:text-cyan-400 mb-1">
                          {wf.timeline}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                          {wf.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
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
              <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 text-white shadow-xl text-left flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold leading-tight">
                    Clear Milestones & Continuous Communication
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1.5 max-w-xl font-normal leading-relaxed">
                    Staging environments to test working features, clear documentation, and direct progress updates throughout the development lifecycle.
                  </p>
                </div>

                <button
                  onClick={() => scrollToContact()}
                  className="min-h-[44px] px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
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
