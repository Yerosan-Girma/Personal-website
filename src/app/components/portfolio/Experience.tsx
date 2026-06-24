import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { GraduationCap, Briefcase, Award, CheckCircle, ChevronDown } from "lucide-react";

interface TimelineItem {
  type: string;
  icon: React.ElementType;
  period: string;
  title: string;
  org: string;
  desc: string;
  color: string;
  shadow: string;
  border: string;
  dot: string;
  highlights: string[];
}

const timeline: TimelineItem[] = [
  {
    type: "education",
    icon: GraduationCap,
    period: "2021 – Present",
    title: "B.Sc. in Software Engineering",
    org: "Haramaya University",
    desc: "Pursuing a degree focused on software engineering principles, algorithms, and data structures while building real-world MERN projects throughout.",
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    border: "border-blue-500/20 hover:border-blue-500/40",
    dot: "bg-blue-500",
    highlights: ["Data Structures & Algorithms", "Software Engineering Concepts", "Database Management Systems", "Operating Systems & Networking"],
  },
  {
    type: "certification",
    icon: Award,
    period: "2024",
    title: "Full Stack Development Bootcamp",
    org: "WabSkills",
    desc: "Intensive bootcamp covering modern web development technologies including React, Node.js, Express.js, MongoDB, and professional development practices.",
    color: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
    border: "border-violet-500/20 hover:border-violet-500/40",
    dot: "bg-violet-500",
    highlights: ["React & Node.js Integrations", "MongoDB & REST Routing Design", "Agile Project-Based Learning", "Deployment & Code Optimization"],
  },
  {
    type: "experience",
    icon: Briefcase,
    period: "2023 – Present",
    title: "Freelance Full Stack Developer",
    org: "Self-Employed",
    desc: "Delivering custom web applications for clients across various domains. Specializing in MERN stack with focus on performance, scalability, and clean architecture.",
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    dot: "bg-emerald-500",
    highlights: ["Custom client web delivery", "API design & integration", "Optimized database caching", "Refactored legacy code bases"],
  },
  {
    type: "certification",
    icon: Award,
    period: "2023",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    desc: "Comprehensive full-stack development course covering modern JavaScript, React, Node.js, Express.js, MongoDB, and RESTful API patterns.",
    color: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/20",
    border: "border-orange-500/20 hover:border-orange-500/40",
    dot: "bg-orange-500",
    highlights: ["Full-Stack JavaScript Essentials", "React component architectures", "Node server pipelines & MongoDB schemas"],
  },
];

function TimelineCard({ item, index, trigger }: { item: TimelineItem; index: number; trigger: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.2 + index * 0.15, type: "spring", stiffness: 85 }}
      className="relative md:pl-20 pl-10"
    >
      {/* Timeline bullet node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={trigger ? { scale: 1 } : {}}
        transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 200 }}
        className={`absolute left-0 top-5 w-11 h-11 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.shadow} ring-4 ring-[#030712] z-10`}
      >
        <item.icon size={16} className="text-white" />
      </motion.div>

      {/* Horizontal connector line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={trigger ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
        className={`absolute left-5 top-10.5 w-6 h-px hidden md:block bg-gradient-to-r ${item.color} opacity-40 origin-left`}
      />

      {/* Timeline item card details */}
      <motion.div
        onClick={() => setExpanded(!expanded)}
        whileHover={{ x: 4 }}
        className={`relative p-5 rounded-2xl bg-white/[0.03] border ${item.border} hover:bg-white/[0.05] transition-all overflow-hidden group cursor-pointer shadow-lg`}
      >
        {/* Glow border segment */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} rounded-l-2xl`} />

        <div className="flex flex-wrap items-start justify-between gap-3 mb-3 pl-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white text-base font-bold group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
            </div>
            <span className="text-white/45 text-xs sm:text-sm">{item.org}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs bg-gradient-to-r ${item.color} text-white font-semibold shadow-md ${item.shadow}`}>
            {item.period}
          </span>
        </div>

        <p className="text-white/45 text-xs sm:text-sm leading-relaxed mb-4 pl-2.5">
          {item.desc}
        </p>

        {/* Expandable highlights block */}
        <div className="pl-2.5">
          <div className="flex items-center gap-1.5 text-cyan-400/80 text-[10px] font-bold uppercase tracking-wider mb-2">
            <span>Highlights</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="transition-transform">
              <ChevronDown size={12} />
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
                <div className="grid sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5">
                  {item.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle size={12} className="text-cyan-400 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Career Path</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Experience & Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical grid line */}
          <div className="absolute left-[21px] top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
            className="absolute left-[21px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent origin-top"
          />

          <div className="space-y-8">
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
