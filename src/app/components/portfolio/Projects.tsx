import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { ExternalLink, Github, X, CheckCircle2, Layers } from "lucide-react";

const tags = ["All", "Full Stack", "Real-time", "E-Commerce", "FinTech"];

const projects = [
  {
    id: 1,
    title: "Student Academic Management System",
    description:
      "A full-stack academic management platform for managing students, courses, grades, and academic records with role-based access and real-time notifications.",
    tags: ["Full Stack"],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Role-based access control (Admin / Teacher / Student)",
      "Grade analytics & GPA dashboard",
      "Course and schedule management",
      "Real-time notifications via Socket.io",
    ],
    image: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?w=800&h=450&fit=crop&auto=format",
    color: "from-blue-600 to-indigo-700",
    accent: "#3B82F6",
    glow: "shadow-blue-500/25",
    border: "hover:border-blue-500/50",
    demo: "#",
    github: "#",
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
    color: "from-teal-600 to-cyan-700",
    accent: "#0891B2",
    glow: "shadow-teal-500/25",
    border: "hover:border-teal-500/50",
    demo: "https://digitaequb.onrender.com",
    github: "https://github.com/Yerosan-Girma/Digital-equb",
  },
];

function Modal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="relative max-w-2xl w-full bg-[#0D1526] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1526] via-transparent to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-white text-xl mb-2" style={{ fontWeight: 700 }}>{project.title}</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-5">{project.description}</p>

          <div className="mb-5">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Key Features</p>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: project.accent }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-white/70 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={project.demo}
              className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${project.color} text-white text-sm text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
              style={{ fontWeight: 500 }}
            >
              <ExternalLink size={15} /> Live Demo
            </a>
            <a
              href={project.github}
              className="flex-1 py-3 rounded-xl bg-white/6 border border-white/12 text-white/70 hover:text-white text-sm text-center flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              style={{ fontWeight: 500 }}
            >
              <Github size={15} /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = projects.filter(
    (p) => activeTag === "All" || p.tags.includes(activeTag)
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">What I've Built</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveTag(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activeTag === tag
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
              style={{ fontWeight: 500 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 120 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onClick={() => setSelected(project)}
                className={`group relative rounded-2xl bg-white/[0.04] border border-white/10 ${project.border} overflow-hidden cursor-pointer transition-all shadow-xl ${project.glow}`}
              >
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Tags pill */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white/80 text-[11px]"
                        style={{ fontWeight: 500 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action icons — appear on hover */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover:translate-y-0">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <Github size={14} />
                    </a>
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                      <Layers size={12} className="text-white" />
                    </div>
                    <h3 className="text-white text-[0.95rem]" style={{ fontWeight: 600 }}>
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/50 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/40 text-[11px]">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${project.color} text-white text-xs text-center hover:opacity-90 transition-opacity`}
                      style={{ fontWeight: 500 }}
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs text-center hover:bg-white/10 transition-all"
                      style={{ fontWeight: 500 }}
                    >
                      GitHub
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); setSelected(project); }}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs hover:bg-white/10 transition-all"
                      title="View details"
                    >
                      ···
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
