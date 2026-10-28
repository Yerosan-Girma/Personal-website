import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Monitor,
  Server,
  Database,
  Cpu,
  Layout,
  FileJson,
  CheckCircle2,
  ArrowUpRight,
  Code2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Service {
  id: string;
  category: "frontend" | "backend" | "fullstack";
  number: string;
  title: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  deliverables: string[];
  stack: string[];
  featured?: boolean;
}

const services: Service[] = [
  {
    id: "frontend",
    category: "frontend",
    number: "01",
    title: "Frontend Engineering",
    tagline: "Fast, responsive & interactive interfaces",
    desc: "Crafting accessible, high-performance web applications with fluid 60fps micro-interactions, responsive mobile layouts, and modern state architecture.",
    icon: Monitor,
    deliverables: [
      "Responsive, mobile-first design systems",
      "Reusable, type-safe React component libraries",
      "Fluid micro-interactions & motion design",
      "SEO-ready, accessible web markup (WCAG)",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
    featured: true,
  },
  {
    id: "backend",
    category: "backend",
    number: "02",
    title: "Backend Architecture",
    tagline: "Secure, modular & scalable servers",
    desc: "Architecting modular, secure server architectures with robust database connections, JWT authentication, and high-throughput endpoints.",
    icon: Server,
    deliverables: [
      "JWT authentication & role-based access control",
      "Clean, layered MVC modular architecture",
      "Input validation, rate limiting & error handling",
      "Asynchronous tasks & worker queues",
    ],
    stack: ["Node.js", "Express.js", "JWT", "Bcrypt", "Cors", "Dotenv"],
  },
  {
    id: "fullstack",
    category: "fullstack",
    number: "03",
    title: "Full Stack Integration",
    tagline: "End-to-end production web applications",
    desc: "Connecting responsive client interfaces with database layers and external APIs. Integrating real-time communication and automated cloud deployments.",
    icon: Cpu,
    deliverables: [
      "Real-time bidirectional client-server synchronization",
      "End-to-end type safety & reliable data flow",
      "Third-party API & payment integrations (Stripe)",
      "Zero-downtime deployment to Vercel & Render",
    ],
    stack: ["MERN Stack", "PostgreSQL", "REST APIs", "Stripe API", "Vercel"],
    featured: true,
  },
  {
    id: "database",
    category: "backend",
    number: "04",
    title: "Database Design & Tuning",
    tagline: "Schemas structured to scale seamlessly",
    desc: "Designing clean relational and document schemas for maximum performance. Optimizing query indexing, relational integrity, and aggregation pipelines.",
    icon: Database,
    deliverables: [
      "Relational & NoSQL schema modeling",
      "Query indexing & execution time tuning",
      "Data migrations & normalization",
      "Complex aggregations & analytics pipelines",
    ],
    stack: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose", "Prisma"],
  },
  {
    id: "ui-ux",
    category: "frontend",
    number: "05",
    title: "Responsive UI & Design Systems",
    tagline: "Pixel-perfect translations into React",
    desc: "Transforming creative wireframes and mockups into clean, production-ready React code. Integrating micro-interactions, responsive typography, and tactile UI states.",
    icon: Layout,
    deliverables: [
      "Faithful, pixel-accurate wireframe-to-code translation",
      "Custom component libraries & design tokens",
      "Dark mode & themed palette support",
      "Cross-browser testing (Chrome, Safari, Firefox)",
    ],
    stack: ["React", "Tailwind CSS", "Motion", "Radix UI", "Lucide"],
  },
  {
    id: "rest-api",
    category: "backend",
    number: "06",
    title: "RESTful API Engineering",
    tagline: "Well-documented, reliable endpoints",
    desc: "Engineering structured RESTful APIs with predictable JSON schemas, complete CRUD operations, thorough Swagger documentation, and test collections.",
    icon: FileJson,
    deliverables: [
      "Structured, idempotent JSON REST endpoints",
      "Comprehensive Swagger / Postman documentation",
      "CORS management & security headers (Helmet)",
      "Automated route verification & tests",
    ],
    stack: ["Express.js", "Swagger", "Postman", "REST", "Helmet"],
  },
];

const categories = [
  { id: "all", label: "All Services" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & APIs" },
  { id: "fullstack", label: "Full Stack & Cloud" },
];

function scrollToContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  const lenis = (window as any).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-40px" });
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = services.filter(
    (s) => activeFilter === "all" || s.category === activeFilter
  );

  return (
    <section id="services" ref={containerRef} className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-xs font-bold tracking-[0.22em] uppercase"
          >
            <Sparkles size={12} className="text-[#1D4ED8]" />
            What I Deliver
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 mt-3 sm:mt-4 leading-tight text-3xl sm:text-4xl font-bold"
          >
            Services & Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Comprehensive full-stack services engineered for performance, maintainability, and seamless user experiences.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4 origin-left"
          />
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#1D4ED8] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Services Grid (Card Layout) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12 sm:mb-16"
        >
          <AnimatePresence>
            {filteredServices.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6, boxShadow: "0 16px 35px -10px rgba(29, 78, 216, 0.12)" }}
                  className="relative rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:border-[#1D4ED8]/40 shadow-xs"
                >
                  <div>
                    {/* Top Row: Icon + Number */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center group-hover:bg-[#1D4ED8] group-hover:text-white transition-colors duration-300 shadow-xs">
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-[#1D4ED8] transition-colors">
                        {svc.number}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-gray-900 text-lg sm:text-xl font-bold group-hover:text-[#1D4ED8] transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-[#1D4ED8] text-xs font-semibold mt-1 mb-3">
                      {svc.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {svc.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
                        Deliverables
                      </p>
                      {svc.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 size={14} className="text-[#1D4ED8] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Tech Stack & CTA */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {svc.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={scrollToContact}
                      className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold text-xs hover:border-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Consultation Banner */}
        <div className="rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <p className="text-gray-900 font-bold text-base sm:text-lg">
              Have a custom software requirement or project?
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Let's discuss requirements, architecture, and timeline.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold hover:bg-[#1E40AF] transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Get In Touch
            <ArrowRight size={15} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
