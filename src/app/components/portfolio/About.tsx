import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Lightbulb, Target, TrendingUp, Coffee, Heart } from "lucide-react";

const PROFILE_URL = new URL("../image/yeroimage1.jpg", import.meta.url).href;

const stats = [
  { label: "Projects Built", value: "10+", icon: "🚀" },
  { label: "Technologies", value: "15+", icon: "⚙️" },
  { label: "Years Learning", value: "3+", icon: "📚" },
  { label: "GitHub Repos", value: "20+", icon: "💻" },
];

const traits = [
  { icon: Code2, title: "Full-Stack Focus", desc: "End-to-end development from DB design to responsive UIs.", color: "from-blue-500 to-blue-600" },
  { icon: Lightbulb, title: "Problem Solver", desc: "Analytical mindset — I break complex challenges into clean solutions.", color: "from-amber-500 to-orange-500" },
  { icon: Target, title: "Detail-Oriented", desc: "Pixel-perfect UI, clean architecture, and maintainable code.", color: "from-violet-500 to-purple-600" },
  { icon: TrendingUp, title: "Always Learning", desc: "Continuously expanding my skills in modern web tech.", color: "from-emerald-500 to-teal-600" },
];

const funFacts = [
  { icon: Coffee, text: "Building digital experiences" },
  { icon: Heart, text: "Passionate about open-source" },
];

export function About() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="about" ref={containerRef} className="py-28 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Who I Am</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Decorative frame */}
              <motion.div
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-12px] rounded-3xl border-2 border-dashed border-blue-500/20"
              />

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 blur-xl scale-105" />

              {/* Image */}
              <motion.div
                style={{ y: imgY }}
                className="relative w-64 sm:w-80 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-blue-500/20"
              >
                <img
                  src={PROFILE_URL}
                  alt="Yerosan Girma"
                  className="w-full object-cover"
                  style={{ height: "360px", filter: "brightness(1.12) contrast(1.18) saturate(1.25) hue-rotate(8deg) blur(0.5px)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/60 via-transparent to-transparent" />
              </motion.div>

              {/* Fun facts floating cards */}
              {funFacts.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2, type: "spring" }}
                  className={`absolute ${i === 0 ? "-right-6 top-10" : "-left-6 bottom-16"} px-3 py-2 rounded-xl bg-[#0D1A3A] border border-blue-500/30 text-white/70 text-xs flex items-center gap-2 shadow-xl backdrop-blur-sm`}
                >
                  <Icon size={14} className="text-blue-400" />
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Text + stats + traits */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-white/65 text-lg leading-relaxed mb-5">
                I'm a passionate{" "}
                <span className="text-white font-semibold">Full Stack MERN Developer</span> with a
                strong foundation in building modern web applications. My journey started with a
                curiosity about how digital products work — and quickly grew into a deep passion for
                crafting seamless experiences.
              </p>
              <p className="text-white/65 text-lg leading-relaxed mb-8">
                I specialize in the{" "}
                <span className="text-cyan-400 font-semibold">MERN Stack</span> and enjoy taking
                products from concept to production. Whether designing RESTful APIs, building
                interactive frontends, or optimizing queries, I bring precision to every layer.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all cursor-default"
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl text-white" style={{ fontWeight: 800 }}>{stat.value}</div>
                  <div className="text-white/40 text-[11px] mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trait cards */}
            <div className="grid grid-cols-2 gap-3">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${trait.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <trait.icon size={16} className="text-white" />
                  </div>
                  <h3 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>{trait.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{trait.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
