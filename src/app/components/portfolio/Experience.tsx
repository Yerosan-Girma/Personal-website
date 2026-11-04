import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle,
  ChevronDown,
  FileText,
  Building2,
  Calendar,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface TimelineItem {
  category: "education" | "experience" | "bootcamp" | "certification";
  categoryBadge: string;
  icon: typeof GraduationCap;
  period: string;
  title: string;
  org: string;
  location: string;
  desc: string;
  highlights: string[];
  techStack: string[];
}

const timeline: TimelineItem[] = [
  {
    category: "education",
    categoryBadge: "Formal Degree Program",
    icon: GraduationCap,
    period: "2021 – Present",
    title: "B.Sc. in Software Engineering",
    org: "Haramaya University",
    location: "Dire Dawa / Harar, Ethiopia",
    desc: "Rigorous academic curriculum covering computer science fundamentals, data structures and algorithm analysis, software engineering methodologies, database design, and distributed systems architecture.",
    highlights: [
      "Data Structures & Algorithm Optimization (Big-O analysis, trees, graphs, sorting)",
      "Object-Oriented Design & Software Architecture Patterns (MVC, Singleton, Factory)",
      "Relational & Document Database Management Systems (3NF, ACID, Indexing)",
      "Computer Networks, Operating Systems & Distributed Computing",
    ],
    techStack: ["Software Architecture", "Data Structures", "Algorithms", "Database Systems"],
  },
  {
    category: "experience",
    categoryBadge: "Independent Client Delivery",
    icon: Briefcase,
    period: "2023 – Present",
    title: "Freelance Full-Stack Developer",
    org: "Self-Employed",
    location: "Addis Ababa, Ethiopia (Remote)",
    desc: "Architecting and delivering custom, production-ready web platforms for clients. Specializing in the MERN stack with emphasis on modular component design, JWT security, and responsive UI.",
    highlights: [
      "End-to-end web platform architecture from database schema to responsive frontend",
      "RESTful API design with JWT authentication, role-based access control, and rate limiting",
      "Real-time bidirectional communication channels utilizing WebSockets",
      "Responsive UI implementation and cross-device testing across modern viewports",
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Tailwind CSS"],
  },
  {
    category: "bootcamp",
    categoryBadge: "Technical Bootcamp",
    icon: Award,
    period: "2024",
    title: "Full Stack Development Bootcamp",
    org: "WabSkills",
    location: "Intensive Program",
    desc: "Hands-on, immersive bootcamp covering modern web technologies, production deployment workflows, agile collaboration, and building full-stack applications with the MERN stack.",
    highlights: [
      "Production-ready React workflows with modern state management",
      "Express.js middleware pipelines, controllers, and error-handling architecture",
      "MongoDB document modeling, schema validation, and indexing",
      "Cloud deployment on Vercel and Render with continuous delivery",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Cloud Deployment"],
  },
  {
    category: "certification",
    categoryBadge: "Technical Training & Certification",
    icon: Award,
    period: "2023",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    location: "Online Certification",
    desc: "Comprehensive engineering curriculum mastering modern JavaScript ES6+, asynchronous programming, component lifecycles, and backend service integration.",
    highlights: [
      "Modern JavaScript ES6+ foundations, asynchronous promises & event loops",
      "Component-based architecture, unidirectional data flow, and props/state",
      "RESTful service creation with Node.js and Express",
      "Client-server request lifecycle management and basic security practices",
    ],
    techStack: ["JavaScript", "HTML5", "CSS3", "Node.js", "Express.js", "REST"],
  },
];

interface ExperienceProps {
  onOpenResume?: () => void;
}

function TimelineCard({
  item,
  index,
  trigger,
}: {
  item: TimelineItem;
  index: number;
  trigger: boolean;
}) {
  const [expanded, setExpanded] = useState(index < 2);
  const Icon = item.icon;

  const getBadgeStyle = (cat: TimelineItem["category"]) => {
    switch (cat) {
      case "education":
        return "bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/20";
      case "experience":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "bootcamp":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "certification":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
      className="relative pl-8 sm:pl-12 text-left"
    >
      {/* Node bullet */}
      <div className="absolute left-0 top-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 dark:bg-cyan-500 text-white flex items-center justify-center shadow-md ring-4 ring-[#F8FAFC] dark:ring-[#070B16] z-10">
        <Icon size={13} strokeWidth={2.2} />
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-7 rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300">
        {/* Category & Date Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold border ${getBadgeStyle(
              item.category
            )}`}
          >
            {item.categoryBadge}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Calendar size={12} />
            <span>{item.period}</span>
          </span>
        </div>

        {/* Title & Organization */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-blue-600 dark:text-cyan-400 font-semibold mt-0.5 flex items-center gap-1.5">
          <Building2 size={13} />
          <span>{item.org}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 dark:text-slate-400 font-normal">{item.location}</span>
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 font-normal">
          {item.desc}
        </p>

        {/* Expandable Highlights */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>Verified Highlights & Focus Areas</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="transition-transform duration-200">
              <ChevronDown size={14} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <ul className="grid sm:grid-cols-2 gap-2 pt-3 pb-1">
                  {item.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.02] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5"
                    >
                      <CheckCircle size={13} className="text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience({ onOpenResume }: ExperienceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="experience" ref={ref} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="05"
          label="Education & Background"
          title="Education, Experience &"
          italicTitle="Certifications"
          subtitle="Formal software engineering education at Haramaya University combined with freelance client deliveries and intensive technical bootcamps."
        />

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line through bullets */}
          <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500/60 via-blue-500/30 to-transparent dark:from-cyan-400/50 dark:via-cyan-400/20 dark:to-transparent" />

          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, idx) => (
              <TimelineCard key={idx} item={item} index={idx} trigger={inView} />
            ))}
          </div>
        </div>

        {/* Bottom Resume Action Card */}
        {onOpenResume && (
          <div className="mt-10 p-6 sm:p-7 rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={16} className="text-blue-600 dark:text-cyan-400" />
                <span>Need a printable or verifiable Curriculum Vitae?</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                View the verified, complete resume in browser or save as PDF.
              </p>
            </div>

            <button
              onClick={onOpenResume}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={13} />
              <span>View & Print CV</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
