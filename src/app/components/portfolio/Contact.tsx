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
    const rect = ref.current!.getBoundingClientRect();
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
      {/* Moving spotlight */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none absolute w-40 h-40 rounded-full bg-blue-400/10 blur-2xl -translate-x-1/2 -translate-y-1/2 transition-opacity opacity-0 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { icon: Mail, label: "", value: "yerosang463@gmail.com", href: "mailto:yerosang463@gmail.com", color: "text-blue-400" },
  { icon: Github, label: "GitHub", value: "", href: "https://github.com/Yerosan-Girma", color: "text-white/70" },
  { icon: Linkedin, label: "LinkedIn", value: "", href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", color: "text-blue-400" },
  { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia 🇪🇹", href: null, color: "text-cyan-400" },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      const serviceId = "service_zbdi773";
      const templateId = "template_2n8n6iw";
      const publicKey = "uqqy2Shg06aXNjM77";

      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_name: "Yerosan Girma",
        to_email: "yerosang463@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const field = (f: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-white/[0.05] border ${
      errors[f] ? "border-red-500/50 bg-red-500/[0.04]" : "border-white/10 focus:border-blue-500/60"
    } text-white placeholder-white/25 text-sm outline-none focus:bg-white/[0.08] transition-all duration-200`;

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.13, 0.06] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 11, repeat: Infinity, delay: 2 }}
          className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mt-4" />
          <p className="text-white/45 mt-4 max-w-lg mx-auto text-sm">
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 80 }}
            className="space-y-5"
          >
            {/* Availability */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 flex items-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0"
              >
                <Zap size={18} className="text-emerald-400" />
              </motion.div>
              <div>
                <div className="text-emerald-400 text-sm" style={{ fontWeight: 600 }}>Open to Opportunities</div>
                <div className="text-emerald-400/60 text-xs mt-0.5">Actively seeking full-time & freelance roles</div>
              </div>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"
              />
            </motion.div>

            {/* Contact info cards */}
            <div className="grid gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
                href ? (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring" }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/35 transition-colors">
                      <Icon size={17} className={color} />
                    </div>
                    {label && (
                      <div>
                        <div className="text-white/35 text-[11px] uppercase tracking-wide">{label}</div>
                        <span className="text-white/75 text-sm">{value}</span>
                      </div>
                    )}
                  </motion.a>
                ) : (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring" }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/35 transition-colors">
                      <Icon size={17} className={color} />
                    </div>
                    {label && (
                      <div>
                        <div className="text-white/35 text-[11px] uppercase tracking-wide">{label}</div>
                        <span className="text-white/75 text-sm">{value}</span>
                      </div>
                    )}
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>

          {/* Right: Tilt form card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 80 }}
          >
            <TiltCard className="group">
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm space-y-4 relative overflow-hidden"
              >
                {/* Gradient corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-2xl pointer-events-none" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input type="text" placeholder="Full Name" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={field("name")} />
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[11px] mt-1 ml-1">
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={field("email")} />
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[11px] mt-1 ml-1">
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <input type="text" placeholder="Subject" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={field("subject")} />
                  {errors.subject && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[11px] mt-1 ml-1">
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                <div>
                  <textarea placeholder="Your message... (min. 20 characters)" rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${field("message")} resize-none`} />
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[11px] mt-1 ml-1">
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm">
                      <CheckCircle size={15} /> Message sent! I'll get back to you soon.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                      <AlertCircle size={15} /> Something went wrong. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45 transition-shadow flex items-center justify-center gap-2 disabled:opacity-60 relative overflow-hidden group/btn"
                  style={{ fontWeight: 600 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "loading" ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </span>
                  <motion.span
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
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
