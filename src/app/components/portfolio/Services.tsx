import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Monitor,
  Server,
  Database,
  Cpu,
  Layout,
  FileJson,
  Check,
  ArrowUpRight,
  Search,
  PenTool,
  Code2,
  Rocket,
} from "lucide-react";

interface Service {
  title: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  gradient: string;
  accent: string;
  deliverables: string[];
  stack: string[];
}

const services: Service[] = [
  {
    title: "Frontend Development",
    tagline: "Fast, responsive interfaces",
    desc: "Creating high-performance, accessible, and responsive user interfaces with smooth animations. Experienced in React, Next.js, Redux, and modern layout systems.",
    icon: Monitor,
    gradient: "from-blue-500 to-cyan-400",
    accent: "text-cyan-400",
    deliverables: ["Responsive, mobile-first layouts", "Reusable component libraries", "Smooth, accessible animations"],
    stack: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    tagline: "Secure, modular servers",
    desc: "Architecting modular, secure server architectures with robust database connections and authentication schemes using Node.js, Express, and JWT APIs.",
    icon: Server,
    gradient: "from-emerald-500 to-teal-400",
    accent: "text-emerald-400",
    deliverables: ["Authentication & role-based access", "Clean, layered architecture", "Validation and error handling"],
    stack: ["Node.js", "Express.js", "JWT", "Socket.io"],
  },
  {
    title: "Full Stack Integration",
    tagline: "End-to-end applications",
    desc: "Building clean end-to-end applications where data flows smoothly between PostgreSQL/MongoDB and the client-side using WebSockets and REST APIs.",
    icon: Cpu,
    gradient: "from-violet-500 to-purple-400",
    accent: "text-violet-400",
    deliverables: ["Real-time features with WebSockets", "Client ↔ API data layer", "Deployment to Vercel / Render"],
    stack: ["MERN", "PostgreSQL", "WebSockets", "REST"],
  },
  {
    title: "Database Design",
    tagline: "Schemas built to scale",
    desc: "Designing clean relational and non-relational database schemas. Optimizing indices, model aggregations, and query structures for fast page deliveries.",
    icon: Database,
    gradient: "from-orange-500 to-amber-400",
    accent: "text-amber-400",
    deliverables: ["Relational & document schemas", "Indexes and query tuning", "Aggregations and reporting"],
    stack: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose"],
  },
  {
    title: "UI Implementation",
    tagline: "Figma to pixel-perfect code",
    desc: "Pixel-perfect translations of Figma concepts into production React files. Striving for micro-interactions that make websites feel interactive and alive.",
    icon: Layout,
    gradient: "from-pink-500 to-rose-400",
    accent: "text-pink-400",
    deliverables: ["Faithful Figma-to-React builds", "Micro-interactions & motion", "Design-system consistency"],
    stack: ["Figma", "Tailwind CSS", "Motion", "Material UI"],
  },
  {
    title: "RESTful API Engineering",
    tagline: "Documented, reliable APIs",
    desc: "Deploying secure server routes with structured JSON responses, robust CORS management, and detailed Swagger documentation or API collection test files.",
    icon: FileJson,
    gradient: "from-indigo-500 to-purple-400",
    accent: "text-indigo-400",
    deliverables: ["Structured JSON endpoints", "CORS & security hardening", "Swagger / Postman docs"],
    stack: ["Express.js", "Swagger", "Postman", "REST"],
  },
];

const process = [
  { title: "Discover", desc: "Understand goals, users and scope.", icon: Search },
  { title: "Design", desc: "Plan architecture and UI flows.", icon: PenTool },
  { title: "Build", desc: "Develop, test and iterate quickly.", icon: Code2 },
  { title: "Launch", desc: "Deploy, monitor and support.", icon: Rocket },
];

function scrollToContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  const lenis = (window as any).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <div className="relative h-full rounded-3xl border border-white/10 bg-[#070c1a]/85 backdrop-blur-md p-6 sm:p-8 overflow-hidden">
      <div className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.12] blur-3xl`} />
      <span className="pointer-events-none absolute top-4 right-6 text-white/[0.04] font-black leading-none select-none" style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg`}>
            <Icon size={26} />
          </div>
          <div>
            <p className={`text-xs uppercase tracking-widest ${service.accent}`}>{service.tagline}</p>
            <h3 className="text-white text-xl sm:text-2xl font-bold">{service.title}</h3>
          </div>
        </div>

        <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-xl">{service.desc}</p>

        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">What you get</p>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <Check size={12} className="text-white" />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Tools & stack</p>
          <div className="flex flex-wrap gap-2">
            {service.stack.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full text-xs text-white/75 bg-white/[0.05] border border-white/10">
                {s}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToContact}
          className={`group self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${service.gradient} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow`}
        >
          Start a project
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-cyan-400 text-sm tracking-widest uppercase">My Offerings</span>
            <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
              Services I Provide
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-4" />
          </div>
          <p className="text-white/55 text-sm max-w-md">
            From idea to deployment — pick a service to see what's included and the tools I use to deliver it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col gap-2" role="tablist" aria-label="Services">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isActive = active === i;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                >
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia("(min-width: 1024px)").matches && setActive(i)}
                    className={`relative w-full text-left flex items-center gap-4 rounded-2xl px-4 py-4 border transition-colors ${
                      isActive ? "border-white/15 bg-white/[0.05]" : "border-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="service-indicator"
                        className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${svc.gradient}`}
                      />
                    )}
                    <span className={`text-xs font-mono w-6 ${isActive ? svc.accent : "text-white/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive ? `bg-gradient-to-br ${svc.gradient} text-white shadow-lg` : "bg-white/[0.05] text-white/50"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`block font-semibold text-sm sm:text-base transition-colors ${isActive ? "text-white" : "text-white/70"}`}>
                        {svc.title}
                      </span>
                      <span className="block text-xs text-white/40 truncate">{svc.tagline}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className={`shrink-0 transition-all ${isActive ? `${svc.accent} rotate-45` : "text-white/20"}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="mobile-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden"
                      >
                        <div className="pt-3 pb-2">
                          <ServiceDetail service={svc} index={i} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:col-span-7"
          >
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceDetail service={services[active]} index={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-8">How I work</p>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/40 via-violet-500/40 to-cyan-400/40" />
            {process.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={step.title} className="relative flex flex-col items-center text-center gap-3">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#030712] border border-white/15 flex items-center justify-center text-cyan-400">
                    <StepIcon size={18} />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-[10px] font-bold text-white flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">{step.title}</h4>
                    <p className="text-white/50 text-xs mt-1">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
