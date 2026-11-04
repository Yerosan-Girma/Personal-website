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
  Globe,
  Layers,
  Sparkles,
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
  domainUrl: string;
  impactPill: string;
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
    categoryLabel: "Real Estate Marketplace",
    domainUrl: "kiray-bet-wine.vercel.app",
    impactPill: "Verified Listings â€¢ Map Search â€¢ Realtime Chat",
    title: "Kiray Bet (áŠªáˆ«á‹­ á‰¤á‰µ)",
    subtitle: "Ethiopian Home Rental Marketplace",
    year: "2024",
    problem:
      "House hunting in urban Ethiopia has traditionally relied on fragmented broker networks, opaque pricing, and high commission friction without verified property photos or listings.",
    solution:
      "Built a unified digital rental marketplace featuring verified property discovery, map exploration across Addis Ababa, direct messaging, role-based dashboards, and instant lease generation.",
    description:
      "Ethiopia's premier home rental marketplace connecting tenants, property owners, and verified brokers across Addis Ababa with real-time property discovery, interactive map search, direct inquiries, role-based dashboards, and digital lease agreements.",
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
    categoryLabel: "Online Education LMS",
    domainUrl: "e-learning-three-phi.vercel.app",
    impactPill: "Structured LMS â€¢ Automated Quizzes â€¢ PDF Certificates",
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
    categoryLabel: "Multi-Storefront Commerce",
    domainUrl: "e-commerce-navy-mu-90.vercel.app",
    impactPill: "Multi-Vendor â€¢ Stripe Checkout â€¢ Inventory Dashboard",
    title: "MarketHub â€” E-Commerce",
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
    categoryLabel: "Real-Time / WebSockets",
    domainUrl: "github.com/Yerosan-Girma/WabiSkills-Seminar-Live",
    impactPill: "WebSockets â€¢ Video Signaling â€¢ Live Moderated Chat",
    title: "WabiSeminar Live",
    subtitle: "Live Webcast & Real-Time Meeting App",
    year: "2024",
    problem:
      "Virtual masterclasses and workshops require low-latency communication, participant presence tracking, and instant audience Q&A without heavy third-party software installation.",
    solution:
      "Engineered an in-browser real-time seminar platform with instant room creation, WebSocket signaling for video/audio streams, participant attendance lists, and live moderated chat.",
    description:
      "A real-time communication platform engineered for live seminar events and masterclasses. Enables instant room creation, live video & text messaging via WebSockets, attendee presence tracking, and feedback collection.",
    tech: ["React", "WebSockets", "Node.js", "Express.js", "JavaScript", "CSS3"],
    features: [
      "Instant seminar room generation with unique meeting tokens",
      "Real-time text chat stream with WebSocket bidirectional sync",
      "Attendee presence tracking and live participant count indicator",
      "Interactive audience feedback polling and question queue",
      "Lightweight responsive client interface requiring zero plugins",
    ],
    architectureNotes:
      "Leveraged event-driven WebSocket architecture on Node.js to broadcast room events, participant join/leaves, and chat payloads with minimal latency overhead.",
    image: chatImage,
    screenshots: [chatImage],
    demo: "https://github.com/Yerosan-Girma/WabiSkills-Seminar-Live",
    github: "https://github.com/Yerosan-Girma/WabiSkills-Seminar-Live",
  },
  {
    id: 5,
    category: "fintech",
    categoryLabel: "Digital Fintech / ROSCA",
    domainUrl: "github.com/Yerosan-Girma/Digital-Equb",
    impactPill: "Rotational Savings â€¢ Transparent Ledger â€¢ Payout Tracking",
    title: "Digital Equb (á‹²áŒ‚á‰³áˆ áŠ¥á‰á‰¥)",
    subtitle: "Traditional Rotational Savings Platform",
    year: "2024",
    problem:
      "Traditional Ethiopian Equb (ROSCA) circles are managed with paper ledgers, causing tracking disputes, lack of audit trails, and manual collection bottlenecks.",
    solution:
      "Architected a transparent web-based Equb management system that digitizes member contributions, calculates payout rounds automatically, and tracks payment verification.",
    description:
      "A modern fintech application transforming the centuries-old Ethiopian rotational savings tradition (Equb) into a secure, transparent online platform. Features automated round tracking, member verification, contribution ledgers, and payout scheduling.",
    tech: ["JavaScript", "HTML5", "CSS3", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Digital Equb group creation with customized contribution amounts and schedules",
      "Automated round rotation and payout recipient assignment",
      "Transparent contribution ledger accessible by all verified members",
      "Member identity profiles and payment confirmation workflows",
      "Audit trail preventing duplicate claims and ledger discrepancies",
    ],
    architectureNotes:
      "Engineered relational ledger schemas to guarantee transactional integrity during round transitions and payment confirmations.",
    image: equbImage,
    screenshots: [equbImage],
    demo: "https://github.com/Yerosan-Girma/Digital-Equb",
    github: "https://github.com/Yerosan-Girma/Digital-Equb",
  },
  {
    id: 6,
    category: "hospitality",
    categoryLabel: "Hospitality & Dining",
    domainUrl: "github.com/Yerosan-Girma/Haven-Cafe-Bistro",
    impactPill: "Dynamic Menu â€¢ Reservation Engine â€¢ Mobile-First UX",
    title: "Haven Cafe & Bistro",
    subtitle: "Modern Restaurant & Reservation Portal",
    year: "2024",
    problem:
      "Boutique restaurants and cafes often struggle with outdated static menus, lack of online table booking, and poor mobile ordering ergonomics.",
    solution:
      "Built a stylish, mobile-first web presence featuring an interactive categorization menu, table reservation booking form, location integration, and customer reviews.",
    description:
      "A restaurant web platform designed with warm modern aesthetics, dynamic categorized food & beverage menus, online table reservation engine, and customer inquiries.",
    tech: ["React", "JavaScript", "Tailwind CSS", "HTML5", "Responsive UI"],
    features: [
      "Categorized food & beverage menu with pricing and dietary indicators",
      "Table reservation request engine with date and time picker",
      "Interactive location map, operating hours, and contact channels",
      "Responsive typography and fluid mobile navigation",
    ],
    architectureNotes:
      "Engineered with utility-first responsive tokens and lightweight React components ensuring fast load times on mobile cellular connections.",
    image: cafeImage,
    screenshots: [cafeImage],
    demo: "https://github.com/Yerosan-Girma/Haven-Cafe-Bistro",
    github: "https://github.com/Yerosan-Girma/Haven-Cafe-Bistro",
  },
];

const projectFilters = [
  { label: "All Projects", id: "all" },
  { label: "Real Estate", id: "realestate" },
  { label: "EdTech", id: "edtech" },
  { label: "E-Commerce", id: "ecommerce" },
  { label: "Fintech & Sockets", id: "fintech" },
  { label: "Hospitality", id: "hospitality" },
];

function getTechBadgeStyle(tech: string) {
  const t = tech.toLowerCase();
  if (t.includes("react")) {
    return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25";
  }
  if (t.includes("typescript")) {
    return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25";
  }
  if (t.includes("node") || t.includes("express")) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25";
  }
  if (t.includes("mongo") || t.includes("postgres")) {
    return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25";
  }
  if (t.includes("socket") || t.includes("stripe")) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25";
  }
  return "bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10";
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
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
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative max-w-4xl w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Showcase with Browser Frame Mockup */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-950 overflow-hidden shrink-0">
          <img
            src={images[activeImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

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
                      activeImageIndex === i ? "w-6 bg-cyan-400" : "bg-white/40"
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
              <span className="text-slate-400">â€¢</span>
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
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/[0.04] dark:bg-rose-500/[0.06] border border-rose-500/20">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-1.5">
                The Problem Addressed
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] border border-emerald-500/20">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1.5">
                The Engineering Solution
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
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
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5"
                >
                  <CheckCircle2 size={16} className="text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Implementation */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              // Architecture & Implementation Notes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 font-normal">
              {project.architectureNotes}
            </p>
          </div>

          {/* Technologies Chips */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              // Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border ${getTechBadgeStyle(
                    t
                  )}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-600/30"
              >
                <span>Live Demonstration</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Github size={15} />
                <span>GitHub Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
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
    <section id="projects" ref={ref} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="03"
          label="Featured Work"
          title="Selected Engineering"
          italicTitle="Projects"
          subtitle="Real-world full-stack web applications engineered with MERN architecture, responsive UI design, normalized databases, and verified deployments."
        />

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto max-w-full pb-2">
          {projectFilters.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold"
                    : "bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* High-Impact Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/[0.12] overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-black/50 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group text-left"
              >
                {/* Visual Browser Mockup Header */}
                <div className="bg-slate-100/90 dark:bg-[#162032] px-4 py-3 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
                  {/* macOS Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  </div>

                  {/* Browser Address Bar Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-[11px] font-mono text-slate-500 dark:text-slate-400 max-w-[200px] sm:max-w-xs truncate">
                    <Globe size={11} className="text-blue-500 dark:text-cyan-400 shrink-0" />
                    <span className="truncate">{project.domainUrl}</span>
                  </div>

                  {/* Year Tag */}
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    {project.year}
                  </span>
                </div>

                {/* Card Image Showcase */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-103 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-xs">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* View Details Corner Trigger */}
                  <div className="absolute top-3.5 right-3.5">
                    <div className="w-9 h-9 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-800 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Bottom Impact Feature Pill */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center gap-1.5 truncate">
                      <Sparkles size={12} className="text-cyan-400 shrink-0" />
                      <span className="truncate text-slate-200">{project.impactPill}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Ergonomics */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400 mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal line-clamp-2">
                      {project.description}
                    </p>

                    {/* Attractive Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium border ${getTechBadgeStyle(
                            t
                          )}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Action Buttons - Mobile Friendly (Min 44px Height) */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-white/10">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 shadow-sm shadow-blue-600/30 transition-colors cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-h-[44px] py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Github size={15} />
                        <span>Code</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/90 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
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

      {/* Case Study Deep Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

