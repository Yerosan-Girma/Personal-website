import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const categories = [
  {
    title: "Frontend",
    emoji: "🎨",
    color: "from-blue-500 to-cyan-500",
    glowColor: "shadow-blue-500/20",
    border: "border-blue-500/20 hover:border-blue-500/50",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 78 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Redux Toolkit", level: 75 },
    ],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    color: "from-emerald-500 to-teal-500",
    glowColor: "shadow-emerald-500/20",
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 88 },
      { name: "JWT Auth", level: 80 },
    ],
  },
  {
    title: "Database",
    emoji: "🗄️",
    color: "from-violet-500 to-purple-500",
    glowColor: "shadow-violet-500/20",
    border: "border-violet-500/20 hover:border-violet-500/50",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Mongoose", level: 82 },
      { name: "MySQL", level: 72 },
    ],
  },
  {
    title: "Tools & DevOps",
    emoji: "🛠️",
    color: "from-orange-500 to-amber-500",
    glowColor: "shadow-orange-500/20",
    border: "border-orange-500/20 hover:border-orange-500/50",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "Postman", level: 88 },
      { name: "Vercel", level: 85 },
      { name: "Render", level: 80 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="mb-3.5"
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-white/75 text-sm">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-white/35 text-xs"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: delay + 0.1, ease: [0.34, 1.1, 0.64, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
        >
          {/* Shimmer on bar */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, delay: delay + 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 11, repeat: Infinity, delay: 3 }}
          className="absolute top-0 right-1/3 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">What I Know</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.12, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`p-6 rounded-2xl bg-white/[0.04] border ${cat.border} backdrop-blur-sm transition-all shadow-xl ${cat.glowColor}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg shadow-lg`}
                >
                  {cat.emoji}
                </motion.div>
                <span className="text-white" style={{ fontWeight: 600 }}>{cat.title}</span>
              </div>

              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={ci * 0.12 + si * 0.07}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Floating skill tags below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {["React", "Node.js", "MongoDB", "TypeScript", "Express", "Tailwind", "Docker", "Git", "REST APIs", "JWT", "Socket.io", "Stripe"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1, y: -3 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05, type: "spring" }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-blue-500/40 hover:bg-white/8 transition-all text-sm cursor-default"
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
