import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Webhook,
  Sparkles,
  Layout,
  Server,
  Database,
  Wrench,
} from "lucide-react";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  logo?: string;
  invert?: boolean;
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
      { name: "React", logo: `${DEVICON}/react/react-original.svg` },
      { name: "TypeScript", logo: `${DEVICON}/typescript/typescript-original.svg` },
      { name: "JavaScript", logo: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "Tailwind CSS", logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
      { name: "HTML5", logo: `${DEVICON}/html5/html5-original.svg` },
      { name: "CSS3", logo: `${DEVICON}/css3/css3-original.svg` },
      { name: "Bootstrap", logo: `${DEVICON}/bootstrap/bootstrap-original.svg` },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", logo: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: "Express.js", logo: `${DEVICON}/express/express-original.svg`, invert: true },
      { name: "REST APIs" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", logo: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", logo: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: "MySQL", logo: `${DEVICON}/mysql/mysql-original.svg` },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", logo: `${DEVICON}/git/git-original.svg` },
      { name: "Postman", logo: `${DEVICON}/postman/postman-original.svg` },
    ],
  },
];

function SkillTile({
  skill,
  index,
  trigger,
}: {
  skill: Skill;
  index: number;
  trigger: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      whileHover={{ y: -5, scale: 1.05, boxShadow: "0 10px 25px -5px rgba(29, 78, 216, 0.12)" }}
      whileTap={{ scale: 0.95 }}
      title={skill.name}
      className="group relative flex flex-col items-center justify-center gap-2 w-24 sm:w-28 h-24 sm:h-28 rounded-xl bg-white border border-gray-200/90 hover:border-[#1D4ED8]/40 transition-all duration-300 p-2 cursor-pointer shadow-xs"
    >
      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
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

      <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors text-center truncate max-w-full px-1">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

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
          <h2 className="text-gray-900 mt-3 sm:mt-4 leading-tight text-3xl sm:text-4xl font-bold">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Separated Categories: Frontend, Backend, Database, Tools - only logos and names, no long written text, no clicks */}
        <div className="space-y-6 sm:space-y-8">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="rounded-2xl bg-white border border-gray-200/80 p-5 sm:p-6 shadow-xs"
              >
                {/* Category Title */}
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {category.title}
                  </h3>
                  <span className="text-xs font-medium text-gray-500 ml-auto">
                    {category.skills.length} technologies
                  </span>
                </div>

                {/* Tech Logos */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {category.skills.map((skill, idx) => (
                    <SkillTile
                      key={skill.name}
                      skill={skill}
                      index={idx}
                      trigger={inView}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
