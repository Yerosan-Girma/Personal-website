import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, MapPin, Zap } from "lucide-react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// 3D tilt card
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none absolute w-40 h-40 rounded-full bg-cyan-400/5 blur-2xl -translate-x-1/2 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "yerosang463@gmail.com", href: "mailto:yerosang463@gmail.com", color: "text-blue-400" },
  { icon: Github, label: "GitHub", value: "Yerosan-Girma", href: "https://github.com/Yerosan-Girma", color: "text-white/70" },
  { icon: Linkedin, label: "LinkedIn", value: "yerosan-girma-30005b37a", href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", color: "text-blue-400" },
  { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia 🇪🇹", href: null, color: "text-cyan-400" },
];

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState({ name: false, email: false, subject: false, message: false });

  const handleFocus = (field: keyof typeof focused) => setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field: keyof typeof focused) => setFocused((prev) => ({ ...prev, [field]: false }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
        throw new Error("Missing EmailJS environment variables");
      }

      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_name: "Yerosan Girma",
        to_email: "yerosang463@gmail.com",
      };

      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, templateParams, emailJsConfig.publicKey);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Communication</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
          <p className="text-white/65 mt-4 max-w-md mx-auto text-xs sm:text-sm">
            Have a project concept or request? Fire me an inbox query and I'll respond within a business day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Info */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Availability Widget */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/18 flex items-center gap-4 shadow-lg backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Zap size={18} className="animate-pulse" />
              </div>
              <div>
                <div className="text-emerald-400 text-xs sm:text-sm font-bold">Open to Opportunities</div>
                <div className="text-emerald-400/50 text-[10px] sm:text-xs mt-0.5">Seeking full-time roles & project deliverables</div>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            </motion.div>

            {/* Info cards list */}
            <div className="grid gap-3">
              {contactInfo.map((info, idx) => {
                const inner = (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:border-white/18 transition-all">
                      <info.icon size={16} className={info.color} />
                    </div>
                    <div>
                      <div className="text-white/35 text-[9px] uppercase tracking-wider font-semibold">{info.label}</div>
                      <span className="text-white/70 text-xs sm:text-sm font-medium line-clamp-1">{info.value}</span>
                    </div>
                  </>
                );

                return info.href ? (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + idx * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:bg-white/[0.04] hover:border-white/12 transition-all group shadow-sm"
                  >
                    {inner}
                  </motion.a>
                ) : (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + idx * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:bg-white/[0.04] hover:border-white/12 transition-all group shadow-sm cursor-default"
                  >
                    {inner}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right panel: Glass form card */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <TiltCard className="group">
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-sm space-y-5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="form-name"
                      value={form.name}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border ${
                        errors.name ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-cyan-500/40"
                      } text-white text-xs sm:text-sm outline-none focus:bg-white/[0.04] transition-all pt-5.5 pb-1.5`}
                    />
                    <label
                      htmlFor="form-name"
                      className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                        focused.name || form.name
                          ? "top-1.5 text-[9px] text-cyan-400 font-bold"
                          : "top-1/2 -translate-y-1/2 text-[11px] text-white/30"
                      }`}
                    >
                      Full Name
                    </label>
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="form-email"
                      value={form.email}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border ${
                        errors.email ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-cyan-500/40"
                      } text-white text-xs sm:text-sm outline-none focus:bg-white/[0.04] transition-all pt-5.5 pb-1.5`}
                    />
                    <label
                      htmlFor="form-email"
                      className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                        focused.email || form.email
                          ? "top-1.5 text-[9px] text-cyan-400 font-bold"
                          : "top-1/2 -translate-y-1/2 text-[11px] text-white/30"
                      }`}
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="relative">
                  <input
                    type="text"
                    id="form-subject"
                    value={form.subject}
                    onFocus={() => handleFocus("subject")}
                    onBlur={() => handleBlur("subject")}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border ${
                      errors.subject ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-cyan-500/40"
                    } text-white text-xs sm:text-sm outline-none focus:bg-white/[0.04] transition-all pt-5.5 pb-1.5`}
                  />
                  <label
                    htmlFor="form-subject"
                    className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                      focused.subject || form.subject
                        ? "top-1.5 text-[9px] text-cyan-400 font-bold"
                        : "top-1/2 -translate-y-1/2 text-[11px] text-white/30"
                    }`}
                  >
                    Subject Title
                  </label>
                  {errors.subject && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message field */}
                <div className="relative">
                  <textarea
                    id="form-message"
                    rows={5}
                    value={form.message}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border ${
                      errors.message ? "border-red-500/50 focus:border-red-500/80" : "border-white/10 focus:border-cyan-500/40"
                    } text-white text-xs sm:text-sm outline-none focus:bg-white/[0.04] transition-all pt-6 pb-2 resize-none`}
                  />
                  <label
                    htmlFor="form-message"
                    className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                      focused.message || form.message
                        ? "top-1.5 text-[9px] text-cyan-400 font-bold"
                        : "top-4 text-[11px] text-white/30"
                    }`}
                  >
                    Your Message (min. 20 chars)
                  </label>
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[10px] mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Status messages alerts */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm"
                    >
                      <CheckCircle size={16} /> Query submitted successfully! I'll contact you shortly.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm"
                    >
                      <AlertCircle size={16} /> Error sending transmission. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 disabled:opacity-60 relative overflow-hidden group/btn font-bold text-xs sm:text-sm tracking-wider uppercase"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "loading" ? (
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                    {status === "loading" ? "Transmitting..." : "Send Message"}
                  </span>
                  <motion.span
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.button>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
