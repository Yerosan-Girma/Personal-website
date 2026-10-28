import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { GraduationCap, Briefcase, Award, CheckCircle, ChevronDown, Sparkles } from "lucide-react";

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
        whileHover={{ scale: 1.1, rotate: 20 }}
        className="absolute left-0 top-3.5 sm:top-5 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1D4ED8] flex items-center justify-center shadow-md ring-4 ring-white z-10 text-white"
      >
        <item.icon size={17} />
      </motion.div>

      {/* Horizontal connector line on desktop */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={trigger ? { scaleX: 1 } : {}}
        transition={{ delay: 0.4 + index * 0.12, duration: 0.3 }}
        className="absolute left-5 top-8 w-6 h-px hidden md:block bg-[#1D4ED8]/30 origin-left"
      />

      {/* Timeline item card */}
      <motion.div
        onClick={() => setExpanded(!expanded)}
        whileHover={{ x: 3, y: -2 }}
        whileTap={{ scale: 0.99 }}
        className="relative p-4 sm:p-5 rounded-xl bg-white border border-gray-200/90 hover:border-[#1D4ED8]/30 hover:shadow-md transition-all overflow-hidden group cursor-pointer shadow-xs"
      >
        {/* Left border accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1D4ED8] rounded-l-xl" />

        <div className="flex flex-wrap items-start justify-between gap-2.5 mb-2 pl-2">
          <div>
            <h3 className="text-gray-900 text-base sm:text-lg font-semibold group-hover:text-[#1D4ED8] transition-colors leading-tight">
              {item.title}
            </h3>
            <span className="text-gray-500 text-xs sm:text-sm font-medium">{item.org}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/20 shrink-0">
            {item.period}
          </span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 pl-2">
          {item.desc}
        </p>

        {/* Expandable highlights block */}
        <div className="pl-2">
          <div className="flex items-center gap-1.5 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Core Highlights</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="transition-transform">
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
                <div className="grid sm:grid-cols-2 gap-2 pt-1 pb-1">
                  {item.highlights.map((highlight, hIdx) => (
                    <motion.div
                      key={hIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hIdx * 0.05 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 p-2 sm:p-2.5 rounded-lg border border-gray-100"
                    >
                      <CheckCircle size={13} className="text-[#1D4ED8] shrink-0 mt-0.5" />
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -30]);

  return (
    <section id="experience" ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-xs font-bold tracking-[0.22em] uppercase"
          >
            <Sparkles size={12} className="text-[#1D4ED8]" />
            Career Path
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-900 mt-3 sm:mt-4 leading-tight"
          >
            Experience & Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto mt-2"
          >
            Academic background in software engineering combined with hands-on client deliveries and intensive bootcamps.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4 origin-left"
          />
        </motion.div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical line centered through bullets (bullet width 36px/40px, center ~18px/20px) */}
          <div className="absolute left-[17px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-gray-200" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            className="absolute left-[17px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#1D4ED8] via-[#1D4ED8]/50 to-transparent origin-top"
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
      </motion.div>
    </section>
  );
}
