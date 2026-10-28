import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Webhook,
  Sparkles,
  Layout,
  Server,
  Database,
  Wrench,
  Search,
} from "lucide-react";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  logo?: string;
  invert?: boolean;
  color: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", logo: `${DEVICON}/react/react-original.svg`, color: "#00D8FF" },
      { name: "TypeScript", logo: `${DEVICON}/typescript/typescript-original.svg`, color: "#3178C6" },
      { name: "JavaScript", logo: `${DEVICON}/javascript/javascript-original.svg`, color: "#F7DF1E" },
      { name: "Tailwind CSS", logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, color: "#38BDF8" },
      { name: "HTML5", logo: `${DEVICON}/html5/html5-original.svg`, color: "#E34F26" },
      { name: "CSS3", logo: `${DEVICON}/css3/css3-original.svg`, color: "#1572B6" },
      { name: "Bootstrap", logo: `${DEVICON}/bootstrap/bootstrap-original.svg`, color: "#7952B3" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", logo: `${DEVICON}/nodejs/nodejs-original.svg`, color: "#22C55E" },
      { name: "Express.js", logo: `${DEVICON}/express/express-original.svg`, invert: true, color: "#475569" },
      { name: "REST APIs", color: "#6366F1" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", logo: `${DEVICON}/postgresql/postgresql-original.svg`, color: "#336791" },
      { name: "MongoDB", logo: `${DEVICON}/mongodb/mongodb-original.svg`, color: "#10AA50" },
      { name: "MySQL", logo: `${DEVICON}/mysql/mysql-original.svg`, color: "#00758F" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", logo: `${DEVICON}/git/git-original.svg`, color: "#F05032" },
      { name: "Postman", logo: `${DEVICON}/postman/postman-original.svg`, color: "#FF6C37" },
    ],
  },
];

function SkillTile({
  skill,
  index,
  trigger,
  isHighlighted,
}: {
  skill: Skill;
  index: number;
  trigger: boolean;
  isHighlighted: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      whileHover={{ y: -6, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={skill.name}
      style={{
        boxShadow: hovered
          ? `0 14px 28px -6px ${skill.color}35, 0 0 16px ${skill.color}20`
          : isHighlighted
          ? `0 0 14px ${skill.color}40`
          : undefined,
        borderColor: hovered || isHighlighted ? `${skill.color}80` : undefined,
      }}
      className={`group relative flex flex-col items-center justify-center gap-2 w-24 sm:w-28 h-24 sm:h-28 rounded-2xl bg-white border border-gray-200/90 transition-all duration-300 p-2 cursor-pointer shadow-xs ${
        isHighlighted ? "scale-105" : ""
      }`}
    >
      {/* Dynamic Background Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}15, transparent 70%)`,
          opacity: hovered || isHighlighted ? 1 : 0,
        }}
      />

      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center relative z-10">
        {skill.logo ? (
          <img
            src={skill.logo}
            alt={skill.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={skill.invert ? { filter: "contrast(150%)" } : undefined}
          />
        ) : (
          <Webhook className="w-8 h-8 text-[#1D4ED8]" strokeWidth={1.8} />
        )}
      </div>

      <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors text-center truncate max-w-full px-1 relative z-10">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  return (
    <section id="skills" ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8]/10 border border-[#1D4ED8]/20 text-[#1D4ED8] text-xs font-bold tracking-[0.22em] uppercase">
            <Sparkles size={12} className="text-[#1D4ED8]" />
            Technical Stack
          </span>
          <h2 className="text-gray-900 mt-3 sm:mt-4 leading-tight text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Key tools, frameworks, and database runtimes leveraged across production systems.
          </p>
          <div className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Interactive Search Spotlight */}
        <div className="max-w-md mx-auto mb-8 sm:mb-10">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search or highlight a skill (e.g. React, PostgreSQL)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200/90 shadow-2xs text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Separated Categories: Frontend, Backend, Database, Tools - only logos and names */}
        <div className="space-y-6 sm:space-y-8">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-white border border-gray-200/80 p-5 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Category Title */}
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {category.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-gray-400 ml-auto bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {category.skills.length} techs
                  </span>
                </div>

                {/* Tech Logos */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {category.skills.map((skill, idx) => {
                    const isHighlighted = query.length > 0 && skill.name.toLowerCase().includes(query);
                    return (
                      <SkillTile
                        key={skill.name}
                        skill={skill}
                        index={idx}
                        trigger={inView}
                        isHighlighted={isHighlighted}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
