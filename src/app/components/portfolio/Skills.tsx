import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Webhook } from "lucide-react";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

interface Skill {
  name: string;
  label: string;
  logo?: string;
  invert?: boolean;
  color: string;
}

const skills: Skill[] = [
  { name: "React", label: "React", logo: `${DEVICON}/react/react-original.svg`, color: "#61DAFB" },
  { name: "JavaScript", label: "JS", logo: `${DEVICON}/javascript/javascript-original.svg`, color: "#F7DF1E" },
  { name: "Node.js", label: "Node", logo: `${DEVICON}/nodejs/nodejs-original.svg`, color: "#5FA04E" },
  { name: "Express.js", label: "Express", logo: `${DEVICON}/express/express-original.svg`, invert: true, color: "#FFFFFF" },
  { name: "PostgreSQL", label: "Postgres", logo: `${DEVICON}/postgresql/postgresql-original.svg`, color: "#4169E1" },
  { name: "MongoDB", label: "MongoDB", logo: `${DEVICON}/mongodb/mongodb-original.svg`, color: "#47A248" },
  { name: "REST API", label: "REST", color: "#22D3EE" },
  { name: "Bootstrap", label: "Bootstrap", logo: `${DEVICON}/bootstrap/bootstrap-original.svg`, color: "#7952B3" },
  { name: "Tailwind CSS", label: "Tailwind", logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, color: "#38BDF8" },
];

function SkillTile({ skill, index, trigger }: { skill: Skill; index: number; trigger: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, type: "spring", stiffness: 120 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
        whileHover={{ y: -10, scale: 1.06 }}
        title={skill.name}
        className="group relative aspect-square rounded-3xl bg-[#070c1a]/85 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-3 overflow-hidden cursor-default transition-colors hover:bg-white/[0.06]"
        style={{ "--brand": skill.color } as React.CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 50% 40%, ${skill.color}33, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderColor: `${skill.color}66` }}
        />

        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {skill.logo ? (
            <img
              src={skill.logo}
              alt={skill.name}
              loading="lazy"
              className="w-full h-full object-contain drop-shadow-lg"
              style={skill.invert ? { filter: "invert(1)" } : undefined}
            />
          ) : (
            <Webhook className="w-full h-full" style={{ color: skill.color }} strokeWidth={1.6} />
          )}
        </div>

        <span className="relative text-xs sm:text-sm font-semibold text-white/85 group-hover:text-white transition-colors">
          {skill.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">My Stack</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          {skills.map((skill, i) => (
            <SkillTile key={skill.name} skill={skill} index={i} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
