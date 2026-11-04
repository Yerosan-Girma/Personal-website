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
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    shortName: "Frontend",
    description: "Responsive layouts, reactive state management, and modern component systems.",
    icon: Layout,
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

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCategory = CATEGORIES[currentIndex];
  const CategoryIcon = currentCategory.icon;

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
        <div className="flex items-center justify-start sm:justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center p-1.5 rounded-xl bg-slate-100/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 gap-1 sm:gap-2">
            {CATEGORIES.map((category, idx) => {
              const isSelected = currentIndex === idx;
              const TabIcon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  aria-selected={isSelected}
                >
                  <TabIcon size={15} />
                  <span>{category.shortName}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {category.skills.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Display (Clean, breathable layout — No giant outer card) */}
        <div className="text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Subheader with Prev/Next Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                      Category {String(currentIndex + 1).padStart(2, "0")} of {String(CATEGORIES.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-cyan-400/20">
                      <CategoryIcon size={19} strokeWidth={2} />
                    </div>
                    <span>{currentCategory.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl font-normal leading-relaxed">
                    {currentCategory.description}
                  </p>
                </div>

                {/* Stepper Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous category"
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={15} />
                    <span>Prev</span>
                  </button>

                  <div className="px-2.5 py-1 text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
                    {currentIndex + 1} / {CATEGORIES.length}
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next category"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Next</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              {/* Skills Grid: Sleek, lightweight interactive tech items (not heavy cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentCategory.skills.map((skill, idx) => {
                  const FallbackIcon = skill.icon || Terminal;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.06] border border-slate-200/70 dark:border-white/[0.08] hover:border-blue-400/50 dark:hover:border-cyan-400/40 transition-all duration-200 group cursor-default"
                    >
                      <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        {skill.logo ? (
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            loading="lazy"
                            className={`w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-200 ${
                              skill.invertDark ? "dark:brightness-200 dark:contrast-125" : ""
                            }`}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-200">
                            <FallbackIcon size={18} strokeWidth={1.8} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors font-mono block truncate">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                          {skill.categoryTag}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-10">
                {CATEGORIES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Jump to category ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === dotIdx
                        ? "w-8 bg-blue-600 dark:bg-cyan-400"
                        : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400"
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
