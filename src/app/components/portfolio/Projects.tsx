import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Eye,
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
  category: "all" | "realestate" | "edtech" | "ecommerce" | "fintech";
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  tech: string[];
  features: string[];
  image: string;
  screenshots: string[];
  demo: string;
  github: string;
  year?: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "realestate",
    title: "Kiray Bet (ኪራይ ቤት)",
    subtitle: "Ethiopia's #1 Home Rental Marketplace",
    year: "2024",
    description:
      "Ethiopia's premier home rental marketplace connecting tenants, property owners, and verified brokers across Addis Ababa and beyond. Features real-time property discovery, interactive map search, direct inquiries, role-based dashboards, and digital lease agreements.",
    tags: ["Full Stack", "Real Estate"],
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "WebSockets", "Tailwind CSS"],
    features: [
      "Verified home & apartment listings with high-resolution photo galleries",
      "Interactive map search and neighborhood exploration across Ethiopia",
      "Role-based portals: Tenant discovery, Owner property management, and Broker dashboards",
      "Direct tenant-broker messaging and real-time inquiry handling",
      "Admin approval workflows for broker credentials and listings",
      "Instant digital lease generation and transparent rental pricing",
    ],
    image: kirayBetHero,
    screenshots: [
      kirayBetHero,
      kirayBetListings,
      kirayBetFeatures,
    ],
    demo: "https://kiray-bet-wine.vercel.app",
    github: "https://github.com/Yerosan-Girma/Kiray-bet",
  },
  {
    id: 2,
    category: "edtech",
    title: "E-Learning Platform",
    subtitle: "Comprehensive Online Education & Certification",
    year: "2024",
    description:
      "A comprehensive education platform for online learning with courses, lessons, course resources, quizzes, and certificate generation. Students can access educational content, take assessments, and earn certificates upon course completion.",
    tags: ["Full Stack", "E-Learning"],
    tech: ["React", "Node.js", "Express.js", "PostgreSQL", "JavaScript", "HTML/CSS"],
    features: [
      "Course and lesson management system with progress tracking",
      "Interactive quizzes and automated score assessments",
      "Course resources and materials digital library",
      "Dynamic certificate generation upon course completion",
      "Role-based access control (Admin / Teacher / Student)",
    ],
    image: eLearnImage,
    screenshots: [
      eLearnImage,
    ],
    demo: "https://e-learning-three-phi.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-leraning",
  },
  {
    id: 3,
    category: "ecommerce",
    title: "MarketHub — Multi-Vendor E-Commerce",
    subtitle: "Multi-Storefront Marketplace & Seller Dashboard",
    year: "2023",
    description:
      "A full-featured multi-vendor marketplace platform enabling sellers to manage their own storefronts, products, and incoming orders. Features include vendor analytics dashboards, real-time catalog search, shopping cart, Stripe payment processing, and admin management.",
    tags: ["Full Stack", "E-Commerce"],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Context API", "Stripe"],
    features: [
      "Multi-vendor marketplace with custom seller dashboard panels",
      "Product catalog with dynamic category filters & instant search",
      "Secure end-to-end payment processing with Stripe integration",
      "Shopping cart, customer wishlist, and order status tracking",
      "Centralized admin oversight panel for vendors and dispute management",
    ],
    image: ecommerceImage,
    screenshots: [
      ecommerceImage,
    ],
    demo: "https://e-commerce-navy-mu-90.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-commerce",
  },
  {
    id: 4,
    category: "fintech",
    title: "WabiSeminar — Real-Time Meeting & Chat",
    subtitle: "Live Webcast & Seminar Communication App",
    year: "2024",
    description:
      "A real-time communication platform engineered for live seminar events and masterclasses. Enables instant room creation, live video & text messaging via WebSockets, attendee presence tracking, and feedback collection.",
    tags: ["Full Stack", "Real-Time"],
    tech: ["React", "Node.js", "WebSockets", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    features: [
      "Instant meeting room creation and custom join links",
      "Low-latency real-time chat & signaling powered by WebSockets",
      "Live user presence, attendee badges, and active typing indicators",
      "Secure authentication, participant permissions, and seminar controls",
    ],
    image: chatImage,
    screenshots: [
      chatImage,
    ],
    demo: "https://wabiskills-seminar-1.onrender.com",
    github: "https://github.com/Yerosan-Girma/Wabiskills-Seminar",
  },
  {
    id: 5,
    category: "fintech",
    title: "Digital Equb (ዲጂታል እቁብ)",
    subtitle: "Modern Ethiopian Fintech Savings Circle",
    year: "2023",
    description:
      "A modern digital fintech platform transforming traditional Ethiopian rotational savings circles (Equb) into a transparent online system. Includes automated round tracking, transparent payout distributions, payment records, and member reminders.",
    tags: ["Full Stack", "FinTech"],
    tech: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    features: [
      "Equb group creation with customized pool amounts and intervals",
      "Transparent round schedule tracking with verifiable payout distribution",
      "Automated SMS/Email contribution reminders and payment logs",
      "Personalized member financial dashboard with historical contributions",
    ],
    image: equbImage,
    screenshots: [
      equbImage,
    ],
    demo: "https://digitaequb.onrender.com",
    github: "https://github.com/Yerosan-Girma/Digital-equb",
  },
  {
    id: 6,
    category: "all",
    title: "Haven Cafe & Bistro",
    subtitle: "Artisan Coffeehouse & Table Reservation Web App",
    year: "2023",
    description:
      "An elegant modern cafe website featuring artisan coffee story showcases, interactive menu browsing by categories, online ordering, and seamless table reservation booking with high responsiveness across all devices.",
    tags: ["Full Stack", "Hospitality"],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Interactive categorized menu with rich culinary photos and prices",
      "Online ordering and cart management system",
      "Table reservation booking system with date/time pickers",
      "Responsive, clean UI crafted for fast mobile ordering",
    ],
    image: cafeImage,
    screenshots: [
      cafeImage,
    ],
    demo: "https://haven-cafe-five.vercel.app",
    github: "https://github.com/Yerosan-Girma/Cafe",
  },
];

const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "realestate", label: "Real Estate" },
  { id: "edtech", label: "E-Learning" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "fintech", label: "FinTech & Real-Time" },
];

// Screenshot Carousel Component inside the Modal
function ScreenshotsCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col bg-slate-900 border-b border-slate-200 dark:border-white/10">
      {/* Main Image Stage */}
      <div className="relative h-64 sm:h-80 md:h-[420px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Screenshot slide ${index + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-top"
          />
        </AnimatePresence>

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-slate-900 transition-all shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-slate-900 transition-all shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}
      </div>

      {/* Thumbnail Selector Row if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-2 p-3 bg-slate-950/80 border-t border-white/10 overflow-x-auto justify-center">
          {images.map((img, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIndex(i)}
              className={`relative h-12 w-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                index === i ? "border-blue-500 dark:border-cyan-400" : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover object-top" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// Modal Detail View
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.94, y: 25, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 25, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative max-w-4xl w-full bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screenshots Carousel */}
        <ScreenshotsCarousel images={project.screenshots || [project.image]} />

        {/* Modal Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-white transition-colors z-20 shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </motion.button>

        {/* Modal body (scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-400">{project.year}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-semibold">{project.tags[0]}</span>
              </div>
              <h3 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="text-blue-600 dark:text-cyan-400 text-sm font-semibold mt-1">
                {project.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          <div>
            <p className="text-slate-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider mb-3">
              Key Features & Architectural Implementation
            </p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3 rounded-xl"
                >
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-blue-600 dark:text-cyan-400" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-slate-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider mb-3">
              Technologies & Frameworks
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
            {project.demo !== "#" && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <ExternalLink size={15} />
                <span>Open Live Website</span>
              </motion.a>
            )}
            {project.github !== "#" && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Github size={15} />
                <span>View Source Code</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Project Item Card (Awwwards Style + Developer UI)
function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(56,189,248,0.12)] hover:border-blue-500/40 dark:hover:border-cyan-400/40"
      onClick={onClick}
    >
      {/* Aspect Ratio Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-106 transition-all duration-700 ease-[0.25,1,0.5,1]"
          loading="lazy"
        />

        {/* Subtle Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Top Floating Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Awwwards-Style Floating Arrow Badge (Appears on Hover) */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-11 h-11 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/30 flex items-center justify-center text-slate-900 dark:text-white shadow-lg scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-cyan-400 dark:group-hover:text-slate-950 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Inspect Overlay Trigger */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold flex items-center gap-2 shadow-xl border border-white/20">
            <Eye size={14} className="text-blue-600 dark:text-cyan-400" />
            <span>View Architecture & Gallery</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Index & Category Row */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>0{index + 1} // {project.category.toUpperCase()}</span>
            <span>{project.year || "2024"}</span>
          </div>

          <h3 className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-blue-600 dark:text-cyan-400 text-xs sm:text-sm mb-3 font-medium">
            {project.subtitle}
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-mono font-medium"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-400 text-[11px] font-mono">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Dual Direct Action Links */}
        <div className="flex gap-2.5 pt-4 border-t border-slate-100 dark:border-white/10">
          {project.demo !== "#" && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold text-center transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </motion.a>
          )}
          {project.github !== "#" && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold text-center transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Github size={13} />
              <span>Source</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-blue-600/5 dark:bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="01"
          label="Selected Work"
          title="Curated"
          italicTitle="Projects"
          subtitle="Production-grade web platforms engineered with MERN architecture, real-time WebSockets, normalized databases, and modular design systems."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 sm:mb-14">
          {projectFilters.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Project Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
