import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import {
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";
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
}

const projects: Project[] = [
  {
    id: 1,
    category: "realestate",
    title: "Kiray Bet (ኪራይ ቤት)",
    subtitle: "Ethiopia's #1 Home Rental Marketplace",
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
    description:
      "A comprehensive education platform for online learning with courses, lessons, course resources, quizzes, and certificate generation. Students can access educational content, take assessments, and earn certificates upon course completion.",
    tags: ["Full Stack", "E-learning"],
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
    description:
      "A real-time communication platform engineered for live seminar events and masterclasses. Enables instant room creation, live video & text messaging via WebSockets, attendee presence tracking, and feedback collection.",
    tags: ["Full Stack", "Real-time"],
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
    <div className="flex flex-col bg-gray-100 border-b border-gray-200">
      {/* Main Image Stage */}
      <div className="relative h-60 sm:h-80 md:h-[400px] w-full overflow-hidden bg-gray-900 flex items-center justify-center">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-md cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-white transition-all shadow-md cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}
      </div>

      {/* Thumbnail Selector Row if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-2 p-2.5 bg-gray-50 border-t border-gray-200 overflow-x-auto justify-center">
          {images.map((img, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIndex(i)}
              className={`relative h-12 w-20 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                index === i ? "border-[#1D4ED8]" : "border-gray-200 opacity-60 hover:opacity-100"
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
function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.94, y: 25, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 25, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative max-w-4xl w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screenshots Carousel */}
        <ScreenshotsCarousel images={project.screenshots || [project.image]} />

        {/* Modal Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors z-20 shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </motion.button>

        {/* Modal body (scrollable) */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-gray-900 text-xl sm:text-2xl font-bold tracking-tight">{project.title}</h3>
              <p className="text-[#1D4ED8] text-xs sm:text-sm font-semibold mt-0.5">{project.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm sm:leading-relaxed">
            {project.description}
          </p>

          <div>
            <p className="text-gray-900 text-xs font-bold uppercase tracking-wider mb-2.5">
              Key Features & Implementation
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 border border-gray-200/80 p-2.5 rounded-lg"
                >
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-[#1D4ED8]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-gray-900 text-xs font-bold uppercase tracking-wider mb-2.5">Technologies Used</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-gray-700 text-xs font-mono font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-100">
            {project.demo !== "#" && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-lg bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#1E40AF] transition-colors shadow-sm"
              >
                <ExternalLink size={15} /> Open Live Website
              </motion.a>
            )}
            {project.github !== "#" && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:text-gray-900 text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 hover:border-gray-400 transition-colors shadow-sm"
              >
                <Github size={15} /> View Source Code
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Project Item Card
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
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 130 }}
      whileHover={{ y: -6, boxShadow: "0 16px 35px -10px rgba(29, 78, 216, 0.14)" }}
      whileTap={{ scale: 0.99 }}
      className="group relative rounded-2xl bg-white border border-gray-200/90 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col shadow-xs"
      onClick={onClick}
    >
      {/* Image with zoom on hover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />

        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-gray-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-gray-900 text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <Eye size={13} /> View Details
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-gray-200/80 text-gray-800 text-[11px] font-semibold shadow-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-gray-900 text-lg sm:text-xl font-bold mb-1 group-hover:text-[#1D4ED8] transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-2.5 font-medium">{project.subtitle}</p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3.5">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-medium"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[11px]">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          {project.demo !== "#" && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold text-center hover:bg-[#1E40AF] transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              Live Demo
              <ExternalLink size={12} />
            </motion.a>
          )}
          {project.github !== "#" && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold text-center hover:bg-gray-200 transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              GitHub
              <Github size={12} />
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -30]);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <section id="projects" ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-xs font-bold tracking-[0.22em] uppercase"
          >
            <Sparkles size={12} className="text-[#1D4ED8]" />
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 mt-3 sm:mt-4 leading-tight"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Explore live deployed web platforms with real landing pages, role-based dashboards, and interactive features.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4 origin-left"
          />
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {projectFilters.map((f) => {
            const isSelected = activeFilter === f.id;
            return (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#1D4ED8] text-white shadow-xs"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {f.label}
              </motion.button>
            );
          })}
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
              index={idx}
            />
          ))}
        </div>
      </motion.div>

      {/* Modal Detail Screen */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
