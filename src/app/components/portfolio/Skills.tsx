import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Webhook,
  Sparkles,
  Layout,
  Server,
  Database,
  Wrench,
  Search,
  Globe,
  Grid,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TechVisualization } from "./TechVisualization";

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
    title: "Frontend & UI Systems",
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
    title: "Backend & Server Pipelines",
    icon: Server,
    skills: [
      { name: "Node.js", logo: `${DEVICON}/nodejs/nodejs-original.svg`, color: "#22C55E" },
      { name: "Express.js", logo: `${DEVICON}/express/express-original.svg`, invert: true, color: "#60A5FA" },
      { name: "REST APIs", color: "#818CF8" },
      { name: "WebSockets", color: "#38BDF8" },
      { name: "JWT Auth", color: "#F43F5E" },
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    icon: Database,
    skills: [
      { name: "PostgreSQL", logo: `${DEVICON}/postgresql/postgresql-original.svg`, color: "#336791" },
      { name: "MongoDB", logo: `${DEVICON}/mongodb/mongodb-original.svg`, color: "#10AA50" },
      { name: "MySQL", logo: `${DEVICON}/mysql/mysql-original.svg`, color: "#00758F" },
    ],
  },
  {
    id: "tools",
    title: "Tools, DevOps & Version Control",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", logo: `${DEVICON}/git/git-original.svg`, color: "#F05032" },
      { name: "Postman", logo: `${DEVICON}/postman/postman-original.svg`, color: "#FF6C37" },
      { name: "Docker", logo: `${DEVICON}/docker/docker-original.svg`, color: "#2496ED" },
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
          ? `0 0 16px ${skill.color}50`
          : undefined,
        borderColor: hovered || isHighlighted ? `${skill.color}90` : undefined,
      }}
      className={`group relative flex flex-col items-center justify-center gap-2.5 w-24 sm:w-28 h-24 sm:h-28 rounded-2xl bg-white dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 transition-all duration-300 p-2 cursor-pointer shadow-xs ${
        isHighlighted ? "scale-105 ring-2 ring-blue-500/40 dark:ring-cyan-400/40" : ""
      }`}
    >
      {/* Dynamic Background Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
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
            style={skill.invert ? { filter: "contrast(140%)" } : undefined}
          />
        ) : (
          <Webhook className="w-8 h-8 text-blue-600 dark:text-cyan-400" strokeWidth={1.8} />
        )}
      </div>

      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-center truncate max-w-full px-1 relative z-10 font-mono">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "sphere">("grid");

  const query = search.trim().toLowerCase();

  const filteredCategories = CATEGORIES.filter((cat) => {
    if (selectedCat !== "all" && cat.id !== selectedCat) return false;
    if (!query) return true;
    return (
      cat.title.toLowerCase().includes(query) ||
      cat.skills.some((s) => s.name.toLowerCase().includes(query))
    );
  });

  return (
    <section id="skills" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="04"
          label="Tech Stack"
          title="Skills &"
          italicTitle="Technologies"
          subtitle="A comprehensive survey of languages, frameworks, runtime environments, and databases deployed across production systems."
        />

        {/* View Mode Switcher + Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* View Mode Pill Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 w-fit">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Grid size={14} />
              <span>Categorized Grid</span>
            </button>
            <button
              onClick={() => setViewMode("sphere")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "sphere"
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Globe size={14} />
              <span>3D Interactive Sphere</span>
            </button>
          </div>

          {/* Search Box (Grid Mode) */}
          {viewMode === "grid" && (
            <div className="relative flex items-center min-w-[260px]">
              <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tech (e.g. React, PostgreSQL)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 shadow-2xs text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all font-mono"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* View 1: Categorized Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 overflow-x-auto w-fit">
                {[{ id: "all", label: "All Skills" }, ...CATEGORIES].map((cat) => {
                  const isSelected = selectedCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {cat.title || cat.label}
                    </button>
                  );
                })}
              </div>

              {filteredCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/80 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Category Title */}
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100 dark:border-white/10">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {category.title}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 ml-auto bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-full">
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
            </motion.div>
          ) : (
            <motion.div
              key="sphere"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TechVisualization />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
