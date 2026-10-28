import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ExternalLink,
  Github,
  X,
  CheckCircle2,
  Search,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Maximize2,
  Lock,
} from "lucide-react";
import eLearnImage from "../image/e-learn.png";
import kirayBetHero from "../image/kiray-bet-hero.png";
import kirayBetListings from "../image/kiray-bet-listings.png";
import kirayBetFeatures from "../image/kiray-bet-features.png";
import ecommerceImage from "../image/ecommerce.png";
import equbImage from "../image/equb.png";
import chatImage from "../image/chat.png";
import cafeImage from "../image/cafe.png";

const tags = ["All", "Full Stack", "Real Estate", "Real-time", "E-Commerce", "FinTech", "E-learning"];

const getHostname = (url: string) => {
  try {
    if (!url || url === "#") return "project.preview";
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "project.preview";
  }
};

const projects = [
  {
    id: 1,
    title: "Kiray Bet (ኪራይ ቤት)",
    subtitle: "Ethiopia's #1 Home Rental Marketplace",
    description:
      "Ethiopia's premier home rental marketplace connecting tenants, property owners, and verified brokers across Addis Ababa and beyond. Features real-time property discovery, interactive map search, direct inquiries, role-based dashboards, and digital lease agreements.",
    tags: ["Full Stack", "Real Estate"],
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    features: [
      "Verified home & apartment listings with high-resolution photo galleries",
      "Interactive map search and neighborhood exploration across Ethiopia",
      "Role-based portals: Tenant discovery, Owner property management, and Broker dashboards",
      "Direct tenant-broker messaging and inquiry handling via Socket.io",
      "Admin approval workflows for broker credentials and listings",
      "Instant digital lease generation and transparent rental pricing",
    ],
    image: kirayBetHero,
    screenshots: [
      kirayBetHero,
      kirayBetListings,
      kirayBetFeatures,
    ],
    color: "from-amber-500 to-orange-600",
    accent: "#F59E0B",
    glow: "shadow-amber-500/25",
    border: "hover:border-amber-500/60",
    demo: "https://kiray-bet-wine.vercel.app",
    github: "https://github.com/Yerosan-Girma/Kiray-bet",
  },
  {
    id: 2,
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
    color: "from-blue-600 to-indigo-700",
    accent: "#3B82F6",
    glow: "shadow-blue-500/25",
    border: "hover:border-blue-500/60",
    demo: "https://e-learning-three-phi.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-leraning",
  },
  {
    id: 3,
    title: "MarketHub — Multi-Vendor E-Commerce",
    subtitle: "Multi-Storefront Marketplace & Seller Dashboard",
    description:
      "A full-featured multi-vendor marketplace platform enabling sellers to manage their own storefronts, products, and incoming orders. Features include vendor analytics dashboards, real-time catalog search, shopping cart, Stripe payment processing, and admin management.",
    tags: ["Full Stack", "E-Commerce"],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Stripe"],
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
    color: "from-violet-600 to-purple-700",
    accent: "#8B5CF6",
    glow: "shadow-violet-500/25",
    border: "hover:border-violet-500/60",
    demo: "https://e-commerce-navy-mu-90.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-commerce",
  },
  {
    id: 4,
    title: "WabiSeminar — Real-Time Meeting & Chat",
    subtitle: "Live Webcast & Seminar Communication App",
    description:
      "A real-time communication platform engineered for live seminar events and masterclasses. Enables instant room creation, live video & text messaging via WebSockets, attendee presence tracking, and feedback collection.",
    tags: ["Full Stack", "Real-time"],
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    features: [
      "Instant meeting room creation and custom join links",
      "Low-latency real-time chat & signaling powered by Socket.io",
      "Live user presence, attendee badges, and active typing indicators",
      "Secure authentication, participant permissions, and seminar controls",
    ],
    image: chatImage,
    screenshots: [
      chatImage,
    ],
    color: "from-pink-600 to-rose-700",
    accent: "#E11D48",
    glow: "shadow-pink-500/25",
    border: "hover:border-pink-500/60",
    demo: "https://wabiskills-seminar-1.onrender.com",
    github: "https://github.com/Yerosan-Girma/Wabiskills-Seminar",
  },
  {
    id: 5,
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
    color: "from-teal-600 to-cyan-700",
    accent: "#0891B2",
    glow: "shadow-teal-500/25",
    border: "hover:border-teal-500/60",
    demo: "https://digitaequb.onrender.com",
    github: "https://github.com/Yerosan-Girma/Digital-equb",
  },
  {
    id: 6,
    title: "Haven Cafe & Bistro",
    subtitle: "Artisan Coffeehouse & Table Reservation Web App",
    description:
      "An elegant modern cafe website featuring artisan coffee story showcases, interactive menu browsing by categories, online ordering, and seamless table reservation booking with high responsiveness across all devices.",
    tags: ["Full Stack"],
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
    color: "from-amber-600 to-orange-700",
    accent: "#F59E0B",
    glow: "shadow-amber-500/25",
    border: "hover:border-amber-500/60",
    demo: "https://haven-cafe-five.vercel.app",
    github: "https://github.com/Yerosan-Girma/Cafe",
  },
];

// Screenshot Carousel Component inside the Modal
function ScreenshotsCarousel({ images, demoUrl }: { images: string[]; demoUrl: string }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col bg-[#060B17] border-b border-white/10">
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#040711] border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90" />
          <div className="w-3 h-3 rounded-full bg-amber-500/90" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
        </div>
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-slate-300 font-mono">
          <Lock size={11} className="text-emerald-400" />
          <span>{getHostname(demoUrl)}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative h-72 sm:h-96 md:h-[460px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
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
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/95 transition-all shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/95 transition-all shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Selector Row if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-2.5 p-3 bg-[#040814] border-t border-white/10 overflow-x-auto justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative h-14 w-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                index === i ? "border-cyan-400 ring-2 ring-cyan-400/40" : "border-white/15 opacity-55 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Modal Detail View
function Modal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 25 }}
        className="relative max-w-4xl w-full bg-[#080E1E] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screenshots Carousel */}
        <ScreenshotsCarousel images={project.screenshots || [project.image]} demoUrl={project.demo} />

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors z-20 shadow-lg"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal body (scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-white text-2xl font-bold tracking-tight">{project.title}</h3>
              <p className="text-cyan-400 text-xs sm:text-sm font-medium mt-0.5">{project.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <p className="text-white/90 text-xs font-bold uppercase tracking-widest mb-3">Key Features & Architecture</p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#0b1224]/90 backdrop-blur-md border border-white/5 p-3 rounded-xl">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: project.accent }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <p className="text-white/90 text-xs font-bold uppercase tracking-widest mb-3">Technologies Applied</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-[#111A30] border border-slate-700 text-cyan-300 text-xs font-mono font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3.5 rounded-xl bg-gradient-to-r ${project.color} text-white text-sm font-bold text-center flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-cyan-500/20 transition-all`}
              >
                <ExternalLink size={16} /> Open Live Website
              </a>
            )}
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-[#111A30] border border-slate-700 text-slate-200 hover:text-white text-sm font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#162240] transition-all"
              >
                <Github size={16} /> View Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Project Item Card with clean browser mockup frame and bold display
function ProjectCard({
  project,
  onClick,
  index,
  isExpanded = false,
}: {
  project: typeof projects[0];
  onClick: () => void;
  index: number;
  isExpanded?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Spring vectors for card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

  const handleMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const hostname = getHostname(project.demo);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative rounded-2xl bg-[#0B1224] border border-slate-800 hover:border-cyan-500/60 overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col`}
      onClick={onClick}
    >
      {/* Top Browser Chrome Mockup Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#060A14] border-b border-white/10 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-slate-300 font-mono">
          <Lock size={10} className="text-emerald-400 shrink-0" />
          <span className="truncate max-w-[150px] sm:max-w-[200px]">{hostname}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Live</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Website Screenshot Preview Frame (Full Visibility, No Dimming!) */}
      <div className={`relative ${isExpanded ? "h-72 sm:h-84 lg:h-96" : "h-56 sm:h-64"} overflow-hidden bg-slate-950/80`}>
        <motion.img
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold shadow-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 pointer-events-none group-hover:pointer-events-auto">
          {project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 transition-transform hover:scale-105"
            >
              <ExternalLink size={13} /> Visit Site
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/25 text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Maximize2 size={13} /> Inspect Page
          </button>
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-white text-base sm:text-lg font-bold group-hover:text-cyan-400 transition-colors leading-snug">
              {project.title}
            </h3>
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5`}>
              <Layers size={13} />
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags list */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-[#131C35] border border-slate-700/80 text-cyan-300 text-[11px] font-mono font-medium"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[11px] font-mono">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card bottom action buttons */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-white/10">
          {project.demo !== "#" ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 py-2.5 rounded-xl bg-gradient-to-r ${project.color} text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 hover:shadow-lg transition-all`}
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          ) : (
            <span className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-500 text-xs font-medium text-center">
              Internal Demo
            </span>
          )}

          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2.5 rounded-xl bg-[#131C35] border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <Github size={13} /> GitHub
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-3.5 py-2.5 rounded-xl bg-[#131C35] border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Screenshots & Details"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "showcase">("grid");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Filtering + Searching logic
  const filtered = projects.filter((p) => {
    const matchesTag = activeTag === "All" || p.tags.includes(activeTag);
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <section id="projects" ref={ref} className="py-24 relative overflow-hidden">
      {/* Subtle section glow behind */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-semibold">Web Portfolio</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800 }}>
            Featured Web Applications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Explore live deployed web platforms with real landing pages, role-based dashboards, and interactive features.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full mx-auto mt-5" />
        </motion.div>

        {/* Filter controls + View Mode row */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(tag)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-slate-950 shadow-lg shadow-cyan-500/25"
                    : "bg-[#0B1224] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-center">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-full bg-[#0B1224] border border-slate-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === "grid" ? "bg-cyan-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
                title="Grid layout (3 columns)"
              >
                <LayoutGrid size={13} /> Grid
              </button>
              <button
                onClick={() => setViewMode("showcase")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === "showcase" ? "bg-cyan-500 text-slate-950 font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
                title="Showcase layout (Expanded 2 columns for large view)"
              >
                <Maximize2 size={13} /> Showcase
              </button>
            </div>

            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#0B1224] border border-slate-800 focus:border-cyan-400 text-white placeholder-slate-500 text-xs outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeTag}-${search}-${viewMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === "showcase"
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
                  : "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              }
            >
              {filtered.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelected(project)}
                  index={idx}
                  isExpanded={viewMode === "showcase"}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-[#0B1224] border border-slate-800 rounded-2xl text-slate-400 text-sm font-mono"
            >
              No projects found matching search constraints.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Detail Screen */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
