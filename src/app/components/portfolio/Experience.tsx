import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { GraduationCap, Briefcase, Award, CheckCircle, ChevronDown, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface TimelineItem {
  type: string;
  icon: React.ElementType;
  period: string;
  title: string;
  org: string;
  desc: string;
  highlights: string[];
}

const timeline: TimelineItem[] = [
  {
    type: "education",
    icon: GraduationCap,
    period: "2021 – Present",
    title: "B.Sc. in Software Engineering",
    org: "Haramaya University",
    desc: "Pursuing an engineering degree focused on software design principles, algorithms, data structures, and database systems while shipping real-world MERN platforms.",
    highlights: [
      "Data Structures & Algorithm Optimization",
      "Software Architecture & Design Patterns",
      "Database Systems (Relational & Document)",
      "Distributed Computing & Computer Networks",
    ],
  },
  {
    type: "experience",
    icon: Briefcase,
    period: "2023 – Present",
    title: "Freelance Full Stack Developer",
    org: "Self-Employed",
    desc: "Architecting custom, production-ready web platforms for clients. Specializing in the MERN stack with emphasis on modular architectures, security, and responsive UI.",
    highlights: [
      "End-to-end web platform architecture & client delivery",
      "RESTful API design, rate-limiting & JWT security",
      "Real-time communication & client-server data synchronization",
      "Performance tuning, caching & responsive design systems",
    ],
  },
  {
    type: "certification",
    icon: Award,
    period: "2024",
    title: "Full Stack Development Bootcamp",
    org: "WabSkills",
    desc: "Intensive training program covering modern web development technologies including React, Node.js, Express.js, MongoDB, and production deployment practices.",
    highlights: [
      "React & Node.js production workflows",
      "MongoDB & REST routing architecture",
      "Agile project-based team delivery",
      "Cloud deployment & code optimization",
    ],
  },
  {
    type: "certification",
    icon: Award,
    period: "2023",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    desc: "Comprehensive full-stack development curriculum mastering modern JavaScript, React component architectures, Express pipelines, and database modeling.",
    highlights: [
      "Modern JavaScript ES6+ & TypeScript foundations",
      "React component lifecycles & state management",
      "Node.js server pipelines & MongoDB schemas",
      "Asynchronous request management & security",
    ],
  },
];

function TimelineCard({ item, index, trigger }: { item: TimelineItem; index: number; trigger: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12, type: "spring", stiffness: 100 }}
      className="relative pl-13 sm:pl-16 md:pl-20"
    >
      {/* Timeline bullet node */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={trigger ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.3 + index * 0.12, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        className="absolute left-0 top-3.5 sm:top-5 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-cyan-400/20 ring-4 ring-white dark:ring-[#080A10] z-10"
      >
        <item.icon size={18} strokeWidth={2.2} />
      </motion.div>

      {/* Horizontal connector line on desktop */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={trigger ? { scaleX: 1 } : {}}
        transition={{ delay: 0.4 + index * 0.12, duration: 0.3 }}
        className="absolute left-5 sm:left-6 top-8 w-6 h-px hidden md:block bg-blue-500/30 dark:bg-cyan-400/30 origin-left"
      />

      {/* Timeline item card */}
      <motion.div
        onClick={() => setExpanded(!expanded)}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        className="relative p-5 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-cyan-400/40 hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(56,189,248,0.08)] transition-all overflow-hidden group cursor-pointer shadow-xs"
      >
        {/* Left border accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 dark:bg-cyan-400 rounded-l-3xl" />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5 pl-2">
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
              {item.title}
            </h3>
            <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">{item.org}</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 shrink-0">
            {item.period}
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 pl-2 font-normal">
          {item.desc}
        </p>

        {/* Expandable highlights block */}
        <div className="pl-2">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <span>Key Competencies & Highlights</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="transition-transform duration-200">
              <ChevronDown size={14} />
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 gap-2 pt-2 pb-1">
                  {item.highlights.map((highlight, hIdx) => (
                    <motion.div
                      key={hIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hIdx * 0.05 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-200/80 dark:border-white/10"
                    >
                      <CheckCircle size={14} className="text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-14 sm:py-18 lg:py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="05"
          label="Experience"
          title="Career Journey &"
          italicTitle="Education"
          subtitle="Academic foundations in software engineering at Haramaya University combined with hands-on production deliveries and intensive development bootcamps."
        />

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical line through bullets */}
          <div className="absolute left-[17px] sm:left-[21px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-white/10" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            className="absolute left-[17px] sm:left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-600 dark:from-cyan-400 via-blue-500/50 to-transparent origin-top"
          />

          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, idx) => (
              <TimelineCard
                key={idx}
                item={item}
                index={idx}
                trigger={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
