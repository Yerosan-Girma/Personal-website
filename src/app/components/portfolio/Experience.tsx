import { useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { GraduationCap, Briefcase, Award, CheckCircle } from "lucide-react";

const timeline = [
  {
    type: "education",
    icon: GraduationCap,
    period: "2021 – Present",
    title: "B.Sc. in Software Engineering",
    org: "Haramaya University",
    desc: "Pursuing a degree focused on software engineering principles, algorithms, and data structures while building real-world MERN projects throughout.",
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/30",
    border: "border-blue-500/25",
    dot: "bg-blue-500",
    highlights: ["Data Structures & Algorithms", "Software Engineering", "Database Systems", "Operating Systems"],
  },
  {
    type: "certification",
    icon: Award,
    period: "2024",
    title: "Full Stack Development Bootcamp",
    org: "WabSkills",
    desc: "Intensive bootcamp covering modern web development technologies including React, Node.js, Express.js, MongoDB, and professional development practices.",
    color: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/30",
    border: "border-violet-500/25",
    dot: "bg-violet-500",
    highlights: ["React & Node.js", "MongoDB & REST APIs", "Project-Based Learning", "Professional Development"],
  },
  {
    type: "experience",
    icon: Briefcase,
    period: "2023 – Present",
    title: "Freelance Full Stack Developer",
    org: "Self-Employed",
    desc: "Delivering custom web applications for clients across various domains. Specializing in MERN stack with focus on performance, scalability, and clean architecture.",
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/30",
    border: "border-emerald-500/25",
    dot: "bg-emerald-500",
    highlights: ["Client project delivery", "MERN stack development", "API design & integration", "Agile collaboration"],
  },
  {
    type: "certification",
    icon: Award,
    period: "2023",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    desc: "Comprehensive full-stack development course covering modern JavaScript, React, Node.js, Express.js, MongoDB, and RESTful API patterns.",
    color: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/30",
    border: "border-orange-500/25",
    dot: "bg-orange-500",
    highlights: ["Full-Stack JavaScript", "React & Node.js", "MongoDB & REST APIs"],
  },
];

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Background</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Experience & Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5 hidden md:block" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-cyan-500/40 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3 + i * 0.18, type: "spring", stiffness: 80 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.18, type: "spring", stiffness: 200 }}
                  className={`absolute left-0 top-6 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.shadow} hidden md:flex ring-4 ring-[#0A0F1E]`}
                >
                  <item.icon size={20} className="text-white" />
                </motion.div>

                {/* Connector line segment glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.18 }}
                  className={`absolute left-6 top-6 w-8 h-px hidden md:block bg-gradient-to-r ${item.color} opacity-40`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className={`relative p-6 rounded-2xl bg-white/[0.04] border ${item.border} hover:bg-white/[0.07] transition-all overflow-hidden group`}
                >
                  {/* Left accent bar */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.18, duration: 0.5 }}
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} origin-top rounded-l-2xl`}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3 pl-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon size={15} className="text-cyan-400 md:hidden" />
                        <h3 className="text-white" style={{ fontWeight: 700 }}>{item.title}</h3>
                      </div>
                      <span className="text-white/50 text-sm">{item.org}</span>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${item.color} text-white shadow-md ${item.shadow}`}
                      style={{ fontWeight: 500 }}
                    >
                      {item.period}
                    </motion.span>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4 pl-2">{item.desc}</p>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 pl-2">
                    {item.highlights.map((h) => (
                      <span key={h} className="flex items-center gap-1.5 text-xs text-white/45">
                        <CheckCircle size={11} className="text-cyan-500/70" />
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${item.color} opacity-[0.03] rounded-2xl pointer-events-none`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
