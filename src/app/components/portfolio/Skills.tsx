import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { Code, Server, Database, Terminal, Settings } from "lucide-react";

// Skill logo vectors for a high-end visual design
const SkillIcons: { [key: string]: React.ElementType | string } = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-head-only.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "REST API": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Material UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
};

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "database" | "tools" | "languages";
  glow: string;
  color: string;
}

const skillsList: Skill[] = [
  { name: "React", level: 92, category: "frontend", glow: "shadow-blue-500/10 hover:border-blue-500/40", color: "from-blue-500 to-cyan-400" },
  { name: "JavaScript", level: 90, category: "languages", glow: "shadow-yellow-500/10 hover:border-yellow-500/40", color: "from-yellow-500 to-amber-400" },
  { name: "TypeScript", level: 82, category: "languages", glow: "shadow-blue-600/10 hover:border-blue-600/40", color: "from-blue-600 to-blue-400" },
  { name: "HTML5", level: 95, category: "frontend", glow: "shadow-orange-500/10 hover:border-orange-500/40", color: "from-orange-500 to-red-400" },
  { name: "CSS3", level: 90, category: "frontend", glow: "shadow-blue-500/10 hover:border-blue-500/40", color: "from-blue-500 to-indigo-400" },
  { name: "Tailwind CSS", level: 88, category: "frontend", glow: "shadow-cyan-400/10 hover:border-cyan-400/40", color: "from-cyan-400 to-teal-400" },
  { name: "Next.js", level: 80, category: "frontend", glow: "shadow-slate-400/10 hover:border-slate-400/40", color: "from-slate-400 to-white" },
  { name: "Node.js", level: 85, category: "backend", glow: "shadow-emerald-500/10 hover:border-emerald-500/40", color: "from-emerald-500 to-teal-400" },
  { name: "Express.js", level: 85, category: "backend", glow: "shadow-gray-500/10 hover:border-gray-500/40", color: "from-gray-500 to-slate-400" },
  { name: "MongoDB", level: 86, category: "database", glow: "shadow-emerald-600/10 hover:border-emerald-600/40", color: "from-emerald-600 to-green-400" },
  { name: "PostgreSQL", level: 75, category: "database", glow: "shadow-blue-600/10 hover:border-blue-600/40", color: "from-blue-600 to-indigo-500" },
  { name: "MySQL", level: 78, category: "database", glow: "shadow-amber-600/10 hover:border-amber-600/40", color: "from-amber-600 to-orange-400" },
  { name: "Git", level: 90, category: "tools", glow: "shadow-orange-600/10 hover:border-orange-600/40", color: "from-orange-600 to-red-500" },
  { name: "GitHub", level: 92, category: "tools", glow: "shadow-slate-500/10 hover:border-slate-500/40", color: "from-slate-500 to-slate-300" },
  { name: "Docker", level: 68, category: "tools", glow: "shadow-blue-500/10 hover:border-blue-500/40", color: "from-blue-500 to-blue-300" },
  { name: "REST API", level: 88, category: "backend", glow: "shadow-teal-500/10 hover:border-teal-500/40", color: "from-teal-500 to-cyan-400" },
  { name: "Bootstrap", level: 85, category: "frontend", glow: "shadow-purple-500/10 hover:border-purple-500/40", color: "from-purple-500 to-indigo-400" },
  { name: "Material UI", level: 78, category: "frontend", glow: "shadow-blue-500/10 hover:border-blue-500/40", color: "from-blue-500 to-indigo-500" },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Database", value: "database" },
  { label: "Tools", value: "tools" },
  { label: "Languages", value: "languages" },
];

function SkillCard({ skill, index, trigger }: { skill: Skill; index: number; trigger: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Spring parameters for mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
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

  const logoUrl = SkillIcons[skill.name];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.05] transition-colors shadow-lg overflow-hidden group cursor-crosshair ${skill.glow}`}
    >
      {/* Dynamic spot glow */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none absolute w-32 h-32 rounded-full bg-cyan-400/5 blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div className="flex items-center justify-between mb-4">
        {/* Left: Vector Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center p-2 shadow-inner group-hover:border-white/18 transition-all">
            {typeof logoUrl === "string" ? (
              <img
                src={logoUrl}
                alt={`${skill.name} icon`}
                className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                style={{
                  filter: skill.name === "Next.js" || skill.name === "Express.js" || skill.name === "GitHub" ? "invert(1) brightness(2)" : "none"
                }}
              />
            ) : (
              <Code size={18} className="text-white" />
            )}
          </div>
          <span className="text-white text-sm font-semibold tracking-tight">{skill.name}</span>
        </div>

        {/* Right: Level percentage */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-white/40 text-xs font-mono font-bold"
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Progress slider bar */}
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={trigger ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
        >
          {/* Shimmer overlay */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [filter, setFilter] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filteredSkills = skillsList.filter(
    (skill) => filter === "all" || skill.category === filter
  );

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">My Stack</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Filter categories tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4.5 py-1.8 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
                filter === cat.value
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white/[0.04] border border-white/8 text-white/50 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid Container */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={idx}
                trigger={inView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
