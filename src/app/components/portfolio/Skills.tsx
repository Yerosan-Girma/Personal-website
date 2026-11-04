import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Layout,
  Server,
  Database,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Globe,
  KeyRound,
  Cloud,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  categoryTag: string;
  logo?: string;
  icon?: typeof Terminal;
  invertDark?: boolean;
}

interface SkillCategory {
  id: string;
  title: string;
  shortName: string;
  description: string;
  icon: typeof Layout;
  color: string;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    shortName: "Frontend",
    description: "Responsive layouts, reactive state management, and modern component systems.",
    icon: Layout,
    color: "blue",
    skills: [
      { name: "React.js", categoryTag: "Library", logo: `${DEVICON}/react/react-original.svg` },
      { name: "TypeScript", categoryTag: "Language", logo: `${DEVICON}/typescript/typescript-original.svg` },
      { name: "JavaScript", categoryTag: "Language", logo: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "Tailwind CSS", categoryTag: "Styling", logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
      { name: "HTML5", categoryTag: "Markup", logo: `${DEVICON}/html5/html5-original.svg` },
      { name: "CSS3", categoryTag: "Styling", logo: `${DEVICON}/css3/css3-original.svg` },
      { name: "Bootstrap", categoryTag: "Framework", logo: `${DEVICON}/bootstrap/bootstrap-original.svg` },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    shortName: "Backend",
    description: "Server architecture, RESTful API design, authentication, and real-time sockets.",
    icon: Server,
    color: "emerald",
    skills: [
      { name: "Node.js", categoryTag: "Runtime", logo: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: "Express.js", categoryTag: "Framework", logo: `${DEVICON}/express/express-original.svg`, invertDark: true },
      { name: "REST APIs", categoryTag: "Architecture", icon: Terminal },
      { name: "WebSockets", categoryTag: "Real-time", icon: Globe },
      { name: "JWT Auth", categoryTag: "Security", icon: KeyRound },
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    shortName: "Databases",
    description: "Relational and NoSQL schemas, query optimization, indexing, and data integrity.",
    icon: Database,
    color: "purple",
    skills: [
      { name: "PostgreSQL", categoryTag: "Relational", logo: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", categoryTag: "NoSQL", logo: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: "MySQL", categoryTag: "Relational", logo: `${DEVICON}/mysql/mysql-original.svg` },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    shortName: "Tools & DevOps",
    description: "Version control, API client testing, containerization, and modern cloud deployment.",
    icon: Wrench,
    color: "amber",
    skills: [
      { name: "Git", categoryTag: "VCS", logo: `${DEVICON}/git/git-original.svg` },
      { name: "GitHub", categoryTag: "Collaboration", logo: `${DEVICON}/github/github-original.svg`, invertDark: true },
      { name: "Postman", categoryTag: "API Testing", logo: `${DEVICON}/postman/postman-original.svg` },
      { name: "Docker", categoryTag: "Containers", logo: `${DEVICON}/docker/docker-original.svg` },
      { name: "Vercel", categoryTag: "Deployment", icon: Cloud },
      { name: "Render", categoryTag: "Cloud Host", icon: Server },
    ],
  },
];

const colorMap: Record<string, Record<string, string>> = {
  blue: {
    tab: "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm",
    badge: "bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/20",
    icon: "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-cyan-400 border-blue-100 dark:border-cyan-400/20",
    hover: "hover:border-blue-500/50 dark:hover:border-cyan-400/50",
    tag: "text-blue-600 dark:text-cyan-400",
  },
  emerald: {
    tab: "bg-white dark:bg-emerald-700 text-emerald-700 dark:text-white shadow-sm",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-400/20",
    hover: "hover:border-emerald-500/50 dark:hover:border-emerald-400/50",
    tag: "text-emerald-600 dark:text-emerald-400",
  },
  purple: {
    tab: "bg-white dark:bg-purple-700 text-purple-700 dark:text-white shadow-sm",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    icon: "bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-400/20",
    hover: "hover:border-purple-500/50 dark:hover:border-purple-400/50",
    tag: "text-purple-600 dark:text-purple-400",
  },
  amber: {
    tab: "bg-white dark:bg-amber-700 text-amber-700 dark:text-white shadow-sm",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: "bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-400/20",
    hover: "hover:border-amber-500/50 dark:hover:border-amber-400/50",
    tag: "text-amber-600 dark:text-amber-400",
  },
};

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCategory = CATEGORIES[currentIndex];
  const CategoryIcon = currentCategory.icon;
  const colors = colorMap[currentCategory.color];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : CATEGORIES.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < CATEGORIES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="skills" ref={ref} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="Technical Skills"
          title="Skills &"
          italicTitle="Technologies"
          subtitle="Explore technologies category by category: frontend, backend, databases, and tooling."
        />

        {/* Category Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 gap-1 sm:gap-1.5 overflow-x-auto max-w-full shadow-sm">
            {CATEGORIES.map((category, idx) => {
              const isSelected = currentIndex === idx;
              const TabIcon = category.icon;
              const tabColors = colorMap[category.color];
              return (
                <button
                  key={category.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? tabColors.tab
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  aria-selected={isSelected}
                >
                  <TabIcon size={15} />
                  <span>{category.shortName}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-current/10 opacity-80"
                        : "bg-slate-200/70 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {category.skills.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 p-7 sm:p-9 md:p-11 shadow-sm text-left"
            >
              {/* Category Header with Stepper Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 mb-8 border-b border-slate-100 dark:border-white/10">
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border mb-3 ${colors.badge}`}>
                    <span>Category {String(currentIndex + 1).padStart(2, "0")} of {String(CATEGORIES.length).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colors.icon}`}>
                      <CategoryIcon size={19} strokeWidth={2} />
                    </div>
                    <span>{currentCategory.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl font-normal leading-relaxed">
                    {currentCategory.description}
                  </p>
                </div>

                {/* Prev / Next Stepper */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous category"
                    className="p-2 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.07] text-slate-700 dark:text-slate-200 text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <div className="px-3 py-1.5 text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/[0.03] rounded-lg border border-slate-200/70 dark:border-white/5">
                    {currentIndex + 1} / {CATEGORIES.length}
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next category"
                    className={`p-2 sm:px-3.5 sm:py-2 rounded-xl text-white text-sm font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                      currentCategory.color === "blue" ? "bg-blue-600 hover:bg-blue-500" :
                      currentCategory.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-500" :
                      currentCategory.color === "purple" ? "bg-purple-600 hover:bg-purple-500" :
                      "bg-amber-600 hover:bg-amber-500"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                {currentCategory.skills.map((skill, idx) => {
                  const FallbackIcon = skill.icon || Terminal;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14 }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                      whileHover={{ y: -4, scale: 1.03 }}
                      className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] ${colors.hover} shadow-sm hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200 group cursor-default text-center`}
                    >
                      {/* Logo */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3.5">
                        {skill.logo ? (
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            loading="lazy"
                            className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ${
                              skill.invertDark ? "dark:brightness-200 dark:contrast-125" : ""
                            }`}
                          />
                        ) : (
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${colors.icon}`}>
                            <FallbackIcon size={24} strokeWidth={1.8} />
                          </div>
                        )}
                      </div>

                      {/* Tech Name */}
                      <span className={`text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:${colors.tag.split(" ")[0]} transition-colors font-mono leading-tight`}>
                        {skill.name}
                      </span>

                      {/* Subtle Category Tag */}
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                        {skill.categoryTag}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Step Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-9 pt-6 border-t border-slate-100 dark:border-white/10">
                {CATEGORIES.map((cat, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Jump to category ${dotIdx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === dotIdx
                        ? `w-10 ${
                            cat.color === "blue" ? "bg-blue-600 dark:bg-cyan-400" :
                            cat.color === "emerald" ? "bg-emerald-600 dark:bg-emerald-400" :
                            cat.color === "purple" ? "bg-purple-600 dark:bg-purple-400" :
                            "bg-amber-600 dark:bg-amber-400"
                          }`
                        : "w-2.5 bg-slate-200 dark:bg-white/20 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
