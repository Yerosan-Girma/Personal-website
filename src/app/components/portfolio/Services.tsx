import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { Monitor, Server, Database, Cpu, Layout, FileJson } from "lucide-react";

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ElementType;
  gradient: string;
  glow: string;
  index: number;
}

function ServiceCard({ title, desc, icon: Icon, gradient, glow, index }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  
  // Spring tilt coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 20 });
  const sy = useSpring(y, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/18 p-6 flex flex-col items-start gap-4 transition-all duration-300 shadow-xl overflow-hidden hover:bg-white/[0.05]"
    >
      {/* Moving Spotlight Glow */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className={`pointer-events-none absolute w-36 h-36 rounded-full ${glow} blur-2xl -translate-x-1/2 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100`}
      />

      {/* Decorative colored corner */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${gradient} opacity-[0.03] group-hover:opacity-[0.08] rounded-bl-full transition-opacity pointer-events-none`} />

      {/* Service Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={22} />
      </div>

      {/* Content */}
      <div className="z-10">
        <h3 className="text-white text-base mb-2 font-bold group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Bottom subtle bar indicator */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />
    </motion.div>
  );
}

export function Services() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const servicesData = [
    {
      title: "Frontend Development",
      desc: "Creating high-performance, accessible, and responsive user interfaces with smooth animations. Experienced in React, Next.js, Redux, and modern layout systems.",
      icon: Monitor,
      gradient: "from-blue-500 to-cyan-400",
      glow: "bg-blue-400/10",
    },
    {
      title: "Backend Development",
      desc: "Architecting modular, secure server architectures with robust database connections and authentication schemes using Node.js, Express, and JWT APIs.",
      icon: Server,
      gradient: "from-emerald-500 to-teal-400",
      glow: "bg-emerald-400/10",
    },
    {
      title: "Full Stack Integration",
      desc: "Building clean end-to-end applications where data flows smoothly between PostgreSQL/MongoDB and the client-side using WebSockets and REST APIs.",
      icon: Cpu,
      gradient: "from-violet-500 to-purple-400",
      glow: "bg-violet-400/10",
    },
    {
      title: "Database Design",
      desc: "Designing clean relational and non-relational database schemas. Optimizing indices, model aggregations, and query structures for fast page deliveries.",
      icon: Database,
      gradient: "from-orange-500 to-amber-400",
      glow: "bg-orange-400/10",
    },
    {
      title: "UI Implementation",
      desc: "Pixel-perfect translations of Figma concepts into production React files. Striving for micro-interactions that make websites feel interactive and alive.",
      icon: Layout,
      gradient: "from-pink-500 to-rose-400",
      glow: "bg-pink-400/10",
    },
    {
      title: "RESTful API Engineering",
      desc: "Deploying secure server routes with structured JSON responses, robust CORS management, and detailed Swagger documentation or API collection test files.",
      icon: FileJson,
      gradient: "from-indigo-500 to-purple-400",
      glow: "bg-indigo-400/10",
    },
  ];

  return (
    <section id="services" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 11, repeat: Infinity }}
          className="absolute top-1/3 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">My Offerings</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Services I Provide
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              title={svc.title}
              desc={svc.desc}
              icon={svc.icon}
              gradient={svc.gradient}
              glow={svc.glow}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
