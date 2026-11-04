import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

import eLearnImage from "../image/e-learn.png";
import kirayBetHero from "../image/kiray-bet-hero.png";
import kirayBetListings from "../image/kiray-bet-listings.png";
import kirayBetFeatures from "../image/kiray-bet-features.png";
import ecommerceImage from "../image/ecommerce.png";
import equbImage from "../image/equb.png";
import chatImage from "../image/chat.png";
import cafeImage from "../image/cafe.png";

interface Project {
  id: number;
  category: "realestate" | "edtech" | "ecommerce" | "fintech" | "hospitality";
  categoryLabel: string;
  title: string;
  subtitle: string;
  year: string;
  problem: string;
  solution: string;
  description: string;
  tech: string[];
  features: string[];
  architectureNotes: string;
  image: string;
  screenshots: string[];
  demo: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "realestate",
    categoryLabel: "Real Estate",
    title: "Kiray Bet (ኪራይ ቤት)",
    subtitle: "Ethiopian Home Rental Marketplace",
    year: "2024",
    problem:
      "House hunting in urban Ethiopia has traditionally relied on fragmented broker networks, opaque pricing, and high commission friction without verified property photos or listings.",
    solution:
      "Built a unified digital rental marketplace featuring verified property discovery, map exploration across Addis Ababa, direct messaging, role-based dashboards, and instant lease generation.",
    description:
      "Ethiopia's premier home rental marketplace connecting tenants, property owners, and verified brokers across Addis Ababa and beyond. Features real-time property discovery, interactive map search, direct inquiries, role-based dashboards, and digital lease agreements.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "WebSockets", "Tailwind CSS"],
    features: [
      "Verified home & apartment listings with high-resolution photo galleries",
      "Interactive map search and neighborhood exploration across Ethiopia",
      "Role-based portals: Tenant discovery, Owner property management, and Broker dashboards",
      "Direct tenant-broker messaging and real-time inquiry handling",
      "Admin approval workflows for broker credentials and property validation",
      "Instant digital lease generation and transparent rental terms",
    ],
    architectureNotes:
      "Constructed with a modular React frontend utilizing TypeScript for strict type guarantees. The backend runs on Express.js with Mongoose schemas modeled for hierarchical property metadata, geographic coordinates, and WebSocket connections for low-latency broker-tenant chat.",
    image: kirayBetHero,
    screenshots: [kirayBetHero, kirayBetListings, kirayBetFeatures],
    demo: "https://kiray-bet-wine.vercel.app",
    github: "https://github.com/Yerosan-Girma/Kiray-bet",
  },
  {
    id: 2,
    category: "edtech",
    categoryLabel: "E-Learning",
    title: "E-Learning Platform",
    subtitle: "Online Course Delivery & Certification",
    year: "2024",
    problem:
      "Students needed a centralized, lightweight platform to access structured curriculum materials, complete module assessments, and earn verifiable completion certificates.",
    solution:
      "Engineered an end-to-end LMS platform with role-based access for students and instructors, structured video/lesson modules, automated grading quizzes, and dynamic PDF certificate generation.",
    description:
      "A comprehensive education platform for online learning with courses, lessons, course resources, quizzes, and certificate generation. Students can access educational content, take assessments, and earn certificates upon course completion.",
    tech: ["React", "Node.js", "Express.js", "PostgreSQL", "JavaScript", "HTML/CSS"],
    features: [
      "Course and lesson management system with granular progress tracking",
      "Interactive quizzes with automated scoring and instant feedback",
      "Digital resources library for supplementary course materials",
      "Dynamic certificate generation upon verified course completion",
      "Role-based permissions (Admin / Instructor / Student)",
    ],
    architectureNotes:
      "Implemented a normalized relational database schema in PostgreSQL to preserve relational integrity across users, course enrollments, module progression, and test scores.",
    image: eLearnImage,
    screenshots: [eLearnImage],
    demo: "https://e-learning-three-phi.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-leraning",
  },
  {
    id: 3,
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    title: "MarketHub — E-Commerce",
    subtitle: "Multi-Storefront Marketplace Platform",
    year: "2023",
    problem:
      "Independent sellers often lack the engineering infrastructure to launch digital storefronts with integrated catalog management, secure checkout, and vendor revenue analytics.",
    solution:
      "Developed an all-in-one multi-vendor commerce platform with seller registration, product inventory management, category search, shopping cart state, and Stripe payment processing.",
    description:
      "A full-featured multi-vendor marketplace platform enabling sellers to manage their own storefronts, products, and incoming orders. Features include vendor analytics dashboards, real-time catalog search, shopping cart, Stripe payment processing, and admin management.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Context API", "Stripe"],
    features: [
      "Multi-vendor architecture with dedicated seller management panels",
      "Product catalog with dynamic price and category filters",
      "End-to-end payment processing integration with Stripe",
      "Persistent cart state, customer wishlists, and order status lifecycle",
      "Centralized admin oversight for vendor approvals and order monitoring",
    ],
    architectureNotes:
      "Separated vendor-scoped product subdocuments from customer shopping sessions. Integrated Stripe webhooks for verified payment confirmation and automated order status progression.",
    image: ecommerceImage,
    screenshots: [ecommerceImage],
    demo: "https://e-commerce-navy-mu-90.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-commerce",
  },
  {
    id: 4,
    category: "fintech",
    categoryLabel: "Real-Time / Sockets",
    title: "WabiSeminar Live",
    subtitle: "Live Webcast & Real-Time Meeting App",
    year: "2024",
    problem:
      "Virtual masterclasses and workshops require low-latency communication, participant presence tracking, and instant audience Q&A without heavy third-party software installation.",
    solution:
      "Engineered an in-browser real-time seminar platform with instant room creation, WebSocket signaling for video/audio streams, participant attendance lists, and live moderated chat.",
    description:
      "A real-time communication platform engineered for live seminar events and masterclasses. Enables instant room creation, live video & text messaging via WebSockets, attendee presence tracking, and feedback collection.",
    tech: ["React", "Node.js", "WebSockets", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    features: [
      "Instant seminar room generation with custom sharable access links",
      "Low-latency real-time chat and signaling powered by WebSockets",
      "Live user presence tracking, attendee badges, and active typing indicators",
      "Host moderation controls, participant permissions, and session logs",
    ],
    architectureNotes:
      "Leveraged WebSockets over Node.js for bidirectional broadcasting of chat events and signaling packets with negligible latency and automatic reconnection strategies.",
    image: chatImage,
    screenshots: [chatImage],
    demo: "https://wabiskills-seminar-1.onrender.com",
    github: "https://github.com/Yerosan-Girma/Wabiskills-Seminar",
  },
  {
    id: 5,
    category: "fintech",
    categoryLabel: "FinTech",
    title: "Digital Equb (ዲጂታል እቁብ)",
    subtitle: "Ethiopian Rotational Savings System",
    year: "2023",
    problem:
      "Traditional Ethiopian Equb savings circles involve manual ledger bookkeeping, cash handling friction, and a lack of verifiable payout audit trails among members.",
    solution:
      "Digitized the rotating savings circle workflow into a secure web application that tracks member rounds, automates contribution schedules, records transactions, and sends reminders.",
    description:
      "A modern digital fintech platform transforming traditional Ethiopian rotational savings circles (Equb) into a transparent online system. Includes automated round tracking, transparent payout distributions, payment records, and member reminders.",
    tech: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    features: [
      "Custom Equb group creation with configurable pool amounts and intervals",
      "Transparent round schedule tracking with verifiable payout distribution history",
      "Automated member contribution logs and payment status tracking",
      "Personalized member financial dashboard with historical contributions",
    ],
    architectureNotes:
      "Engineered strict MongoDB transaction logic to ensure payouts and round increments execute atomically, preventing duplicate allocation or ledger inconsistencies.",
    image: equbImage,
    screenshots: [equbImage],
    demo: "https://digitaequb.onrender.com",
    github: "https://github.com/Yerosan-Girma/Digital-equb",
  },
  {
    id: 6,
    category: "hospitality",
    categoryLabel: "Hospitality",
    title: "Haven Cafe & Bistro",
    subtitle: "Artisan Coffeehouse & Reservation App",
    year: "2023",
    problem:
      "Boutique cafes need an appetizing, responsive web presence where patrons can explore artisan menus, filter dietary preferences, and book reservations seamlessly on mobile.",
    solution:
      "Built an elegant, responsive web platform featuring interactive categorized menu navigation, item details, online cart curation, and table booking reservation workflows.",
    description:
      "An elegant modern cafe website featuring artisan coffee story showcases, interactive menu browsing by categories, online ordering, and seamless table reservation booking with high responsiveness across all devices.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Interactive categorized menu with culinary photography and price tiers",
      "Online order cart management and custom preference selections",
      "Table reservation booking system with date and time slot pickers",
      "Mobile-first responsive interface optimized for on-the-go browsing",
    ],
    architectureNotes:
      "Constructed with responsive UI principles, optimizing image assets and component re-renders to achieve fast first contentful paint across mobile cellular networks.",
    image: cafeImage,
    screenshots: [cafeImage],
    demo: "https://haven-cafe-five.vercel.app",
    github: "https://github.com/Yerosan-Girma/Cafe",
  },
];

const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "realestate", label: "Real Estate" },
  { id: "edtech", label: "E-Learning" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "fintech", label: "FinTech & Sockets" },
  { id: "hospitality", label: "Hospitality" },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const images = project.screenshots.length > 0 ? project.screenshots : [project.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative max-w-4xl w-full bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Showcase */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-950 overflow-hidden shrink-0">
          <img
            src={images[activeImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer shadow-lg z-20"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Carousel controls if multiple screenshots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeImageIndex === i ? "w-6 bg-blue-500" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActiveImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                  className="w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                  }
                  className="w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
          {/* Title Header */}
          <div className="border-b border-slate-200 dark:border-white/10 pb-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
              <span className="text-blue-600 dark:text-cyan-400 font-bold uppercase">
                {project.categoryLabel}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
                The Problem Addressed
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                The Engineering Solution
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              // Core Architectural Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5"
                >
                  <CheckCircle2 size={15} className="text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Implementation */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              // Architecture & Implementation Notes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
              {project.architectureNotes}
            </p>
          </div>

          {/* Technologies Chips */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              // Technologies Used
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch Live Demonstration</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Github size={14} />
                <span>View GitHub Repository</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="03"
          label="Featured Work"
          title="Selected Engineering"
          italicTitle="Projects"
          subtitle="Real-world full-stack web applications engineered with MERN architecture, responsive UI design, normalized databases, and verified deployments."
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto max-w-full pb-1">
          {projectFilters.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Consistent Unified Projects Grid for ALL projects */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-3xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
              >
                {/* Card Image */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-800 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>// 0{project.id}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-blue-600 dark:text-cyan-400 mb-2">
                      {project.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-4 font-normal">
                      {project.description}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Links Footer */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Github size={12} />
                        <span>Code</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      Case Study
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
