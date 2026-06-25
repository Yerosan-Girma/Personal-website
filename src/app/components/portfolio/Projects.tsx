import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github, X, CheckCircle2, Search, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import eLearnImage from "../image/e-learn.png";

const tags = ["All", "Full Stack", "Real-time", "E-Commerce", "FinTech", "E-learning"];

const projects = [
  {
    id: 1,
    title: "E-learning",
    description:
      "A comprehensive education platform for online learning with courses, lessons, course resources, quizzes, and certificate generation. Students can access educational content, take assessments, and earn certificates upon course completion.",
    tags: ["Full Stack", "E-learning"],
    tech: ["Node.js", "Express.js", "PostgreSQL", "React", "JavaScript", "HTML/CSS"],
    features: [
      "Course and lesson management system",
      "Interactive quizzes and assessments",
      "Course resources and materials library",
      "Certificate generation upon completion",
      "Role-based access control (Admin / Teacher / Student)",
    ],
    image: eLearnImage,
    screenshots: [
      eLearnImage,
      eLearnImage,
      eLearnImage
    ],
    color: "from-blue-600 to-indigo-700",
    accent: "#3B82F6",
    glow: "shadow-blue-500/25",
    border: "hover:border-blue-500/50",
    demo: "https://e-learning-three-phi.vercel.app/",
    github: "https://github.com/Yerosan-Girma/E-leraning",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A complete online shopping platform with user auth, product catalog, cart system, and Stripe-powered order processing with admin dashboard.",
    tags: ["Full Stack", "E-Commerce"],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Stripe", "Redux Toolkit"],
    features: [
      "Stripe payment integration",
      "Product search & filtering",
      "Admin product & order management",
      "Wishlist and order tracking",
    ],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1472851294608-062f824d296e?w=800&h=450&fit=crop&auto=format"
    ],
    color: "from-violet-600 to-purple-700",
    accent: "#7C3AED",
    glow: "shadow-violet-500/25",
    border: "hover:border-violet-500/50",
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Task Management System",
    description:
      "A collaborative Kanban-style productivity platform for managing tasks, projects, and team workflows with drag-and-drop and deadline alerts.",
    tags: ["Full Stack"],
    tech: ["React", "Express.js", "MongoDB", "Tailwind CSS", "DnD Kit"],
    features: [
      "Drag-and-drop Kanban board",
      "Team collaboration & assignments",
      "Priority levels and deadline alerts",
      "Activity log and notifications",
    ],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop&auto=format"
    ],
    color: "from-orange-600 to-amber-700",
    accent: "#F59E0B",
    glow: "shadow-orange-500/25",
    border: "hover:border-orange-500/50",
    demo: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Real Time Chat Application",
    description:
      "A real-time chat application built for Wabiskills seminar events, enabling instant communication between participants with live messaging and user presence features.",
    tags: ["Full Stack", "Real-time"],
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express.js", "JWT"],
    features: [
      "Real-time WebSocket messaging",
      "Online/offline user presence",
      "Typing indicators",
      "User authentication & authorization",
    ],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=450&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=450&fit=crop&auto=format"
    ],
    color: "from-pink-600 to-rose-700",
    accent: "#E11D48",
    glow: "shadow-pink-500/25",
    border: "hover:border-pink-500/50",
    demo: "https://wabiskills-seminar-1.onrender.com",
    github: "https://github.com/Yerosan-Girma/Wabiskills-Seminar",
  },
  {
    id: 5,
    title: "Digital Equb",
    description:
      "A modern digital platform for traditional Ethiopian savings circles (Equb), enabling groups to save together with transparent tracking, automated reminders, and secure fund management.",
    tags: ["Full Stack", "FinTech"],
    tech: ["React", "Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
    features: [
      "Group creation and management",
      "Automated contribution reminders",
      "Transparent fund tracking",
      "Secure payment integration",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop&auto=format",
    screenshots: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=450&fit=crop&auto=format"
    ],
    color: "from-teal-600 to-cyan-700",
    accent: "#0891B2",
    glow: "shadow-teal-500/25",
    border: "hover:border-teal-500/50",
    demo: "https://digitaequb.onrender.com",
    github: "https://github.com/Yerosan-Girma/Digital-equb",
  },
];

// Screenshot Carousel Component inside the Modal
function ScreenshotsCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-black/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Screenshot slide ${index + 1}`}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.35 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1526] via-transparent to-transparent pointer-events-none" />

      {/* Control Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === i ? "bg-cyan-400 w-4" : "bg-white/30"
            }`}
          />
        ))}
      </div>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="relative max-w-2xl w-full bg-[#070d19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Screenshots Carousel */}
        <ScreenshotsCarousel images={project.screenshots || [project.image]} />

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20"
        >
          <X size={16} />
        </button>

        {/* Modal body (scrollable) */}
        <div className="p-6 overflow-y-auto">
          <h3 className="text-white text-xl mb-2 font-bold">{project.title}</h3>
          <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-5">{project.description}</p>

          <div className="mb-5">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Key Features</p>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: project.accent }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/60 text-xs font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex gap-3">
            <a
              href={project.demo}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${project.color} text-white text-sm font-semibold text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.github}
              className="flex-1 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white/70 hover:text-white text-sm font-semibold text-center flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-all"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Project Item Card with mouse tilt
function ProjectCard({ project, onClick, index }: { project: typeof projects[0]; onClick: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Spring vectors for card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative rounded-2xl bg-white/[0.03] border border-white/8 ${project.border} overflow-hidden cursor-pointer transition-colors shadow-lg ${project.glow}`}
      onClick={onClick}
    >
      {/* Spotlight glow overlay */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none absolute w-48 h-48 rounded-full bg-cyan-400/5 blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Zoomable Image frame */}
      <div className="relative h-44 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />

        {/* Top left Tag Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-white/80 text-[10px] font-semibold"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-6.5 h-6.5 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
            <Layers size={11} />
          </div>
          <h3 className="text-white text-sm font-bold group-hover:text-cyan-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>

        <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/6 text-white/40 text-[10px] font-mono"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/6 text-white/30 text-[10px]">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Card bottom links */}
        <div className="flex gap-2">
          <a
            href={project.demo}
            onClick={(e) => e.stopPropagation()}
            className={`flex-1 py-1.8 rounded-lg bg-gradient-to-r ${project.color} text-white text-xs font-semibold text-center hover:opacity-90 transition-opacity`}
          >
            Demo
          </a>
          <a
            href={project.github}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-1.8 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white text-xs font-semibold text-center hover:bg-white/10 transition-all"
          >
            GitHub
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="px-2.5 py-1.8 rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white text-xs hover:bg-white/10 transition-all"
            title="Expand Details"
          >
            ···
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Portfolio</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Filter controls row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(tag)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-1.8 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white/[0.04] border border-white/8 text-white/50 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="Search projects by name/tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.03] border border-white/8 focus:border-cyan-500/40 text-white text-xs outline-none focus:bg-white/[0.05] transition-all"
            />
          </div>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${activeTag}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelected(project)}
                  index={idx}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-white/30 text-sm italic font-mono"
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
