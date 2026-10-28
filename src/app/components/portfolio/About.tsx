import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

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
      className="text-center p-5 rounded-2xl bg-[#0b1224]/90 backdrop-blur-md border border-white/8 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all cursor-default shadow-lg"
    >
      <div className="text-2xl mb-1.5">{icon}</div>
      <div className="text-3xl text-white font-extrabold font-mono tracking-tight">
        {val}
        <span className="text-cyan-400">{suffix}</span>
      </div>
      <div className="text-white/85 text-xs mt-1 font-medium tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { label: "Projects Built", value: 10, suffix: "+", icon: "🚀" },
    { label: "Technologies", value: 15, suffix: "+", icon: "⚙️" },
    { label: "Years Coding", value: 3, suffix: "+", icon: "📚" },
    { label: "GitHub Repos", value: 20, suffix: "+", icon: "💻" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
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
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Overview</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="text-white/95 text-base sm:text-lg leading-relaxed mb-4">
                I'm a dedicated <span className="text-white font-bold">Full Stack Software Engineer</span> who enjoys engineering modular web architectures. My interest sparks at the intersection of performance, design integration, and clean logic flow.
              </p>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-8">
                With comprehensive experience across the <span className="text-cyan-400 font-bold">MERN stack</span>, I specialize in shipping projects from local wireframes to cloud hosting packages. I enjoy tackling query constraints, deploying REST routes, and styling high-performance user interfaces.
              </p>
            </motion.div>

            {/* Stats counter list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        </div>
      </div>
    </section>
  );
}
