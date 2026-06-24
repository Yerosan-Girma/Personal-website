import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Code2, Lightbulb, Target, TrendingUp, Coffee, Heart, Database, Terminal } from "lucide-react";

const PROFILE_URL = new URL("../image/yeroimage1.jpg", import.meta.url).href;

// CountUp hook to animate stats
function useCountUp(target: number, duration = 1200, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, Math.max(incrementTime, 8));

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

interface StatProps {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  trigger: boolean;
  delayIndex: number;
}

function StatCard({ label, value, suffix, icon, trigger, delayIndex }: StatProps) {
  const val = useCountUp(value, 1500, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delayIndex * 0.08, type: "spring" }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all cursor-default shadow-lg"
    >
      <div className="text-2xl mb-1.5">{icon}</div>
      <div className="text-3xl text-white font-extrabold font-mono tracking-tight">
        {val}
        <span className="text-cyan-400">{suffix}</span>
      </div>
      <div className="text-white/40 text-xs mt-1 font-medium tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  // Parallax translation on image
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const stats = [
    { label: "Projects Built", value: 10, suffix: "+", icon: "🚀" },
    { label: "Technologies", value: 15, suffix: "+", icon: "⚙️" },
    { label: "Years Coding", value: 3, suffix: "+", icon: "📚" },
    { label: "GitHub Repos", value: 20, suffix: "+", icon: "💻" },
  ];

  const traits = [
    { icon: Code2, title: "Full-Stack Focus", desc: "End-to-end development from database design to responsive client interfaces.", color: "from-blue-500 to-blue-600" },
    { icon: Lightbulb, title: "Problem Solver", desc: "Analytical mindset—deconstructing complex challenges into modular solutions.", color: "from-amber-500 to-orange-500" },
    { icon: Target, title: "Detail-Oriented", desc: "Crafting pixel-perfect layouts, dry code structures, and fast animations.", color: "from-violet-500 to-purple-600" },
    { icon: TrendingUp, title: "Always Learning", desc: "Continuously digesting documentation to stay current with modern paradigms.", color: "from-emerald-500 to-teal-600" },
  ];

  const funFacts = [
    { icon: Coffee, text: "Powered by double espresso" },
    { icon: Heart, text: "Passionate about open-source" },
  ];

  // Orbiting Tech Icons for the profile circle
  const orbitingIcons = [
    { Icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", delay: 0 },
    { Icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", delay: 1.5 },
    { Icon: Terminal, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", delay: 3 },
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background glowing circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Overview</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-76 sm:h-76 flex items-center justify-center select-none">
              {/* Animated outer glowing borders */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] rounded-full border border-dashed border-cyan-400/18"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-30px] rounded-full border border-white/5"
              />

              {/* Orbiting nodes */}
              {orbitingIcons.map((node, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: node.delay
                  }}
                  className="absolute w-full h-full pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i }}
                    className={`absolute w-10 h-10 rounded-xl ${node.bg} border flex items-center justify-center shadow-lg pointer-events-auto`}
                    style={{
                      top: "-5px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <node.Icon size={18} className={node.color} />
                  </motion.div>
                </motion.div>
              ))}

              {/* Circular profile image floating */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-2xl shadow-blue-500/15"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent z-10" />
                <img
                  src={PROFILE_URL}
                  alt="Yerosan Girma Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: "brightness(1.08) contrast(1.1) saturate(1.15)" }}
                />
              </motion.div>

              {/* Float overlays */}
              {funFacts.map((fact, idx) => (
                <motion.div
                  key={fact.text}
                  animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3.5 + idx, repeat: Infinity, ease: "easeInOut", delay: 0.3 + idx * 0.2 }}
                  className={`absolute ${idx === 0 ? "-right-6 top-8" : "-left-6 bottom-12"} px-3 py-2 rounded-xl bg-[#091124] border border-blue-500/20 text-white/70 text-[11px] flex items-center gap-2 shadow-xl backdrop-blur-sm`}
                >
                  <fact.icon size={13} className="text-cyan-400" />
                  {fact.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio details, Stats grid and traits */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-4">
                I'm a dedicated <span className="text-white font-bold">Full Stack Software Engineer</span> who enjoys engineering modular web architectures. My interest sparks at the intersection of performance, design integration, and clean logic flow.
              </p>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-8">
                With comprehensive experience across the <span className="text-cyan-400 font-bold">MERN stack</span>, I specialize in shipping projects from local wireframes to cloud hosting packages. I enjoy tackling query constraints, deploying REST routes, and styling high-performance user interfaces.
              </p>
            </motion.div>

            {/* Stats counter list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  icon={stat.icon}
                  trigger={inView}
                  delayIndex={i}
                />
              ))}
            </div>

            {/* Trait grids */}
            <div className="grid sm:grid-cols-2 gap-4">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:border-white/12 transition-all flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${trait.color} flex items-center justify-center flex-shrink-0 text-white shadow-md`}>
                    <trait.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-0.5">{trait.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{trait.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
