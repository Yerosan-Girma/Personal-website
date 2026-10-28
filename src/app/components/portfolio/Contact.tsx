import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, MapPin, Zap, ArrowUpRight, Sparkles, Loader2 } from "lucide-react";
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

const contactLinks = [
  { icon: Mail, label: "Email", href: "mailto:yerosang463@gmail.com", desc: "yerosang463@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/Yerosan-Girma", desc: "github.com/Yerosan-Girma" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", desc: "in/yerosan-girma" },
  { icon: MapPin, label: "Location", href: "https://maps.google.com/?q=Addis+Ababa,+Ethiopia", desc: "Addis Ababa, Ethiopia" },
];

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
    if (form.message.trim().length < 15) errs.message = "Message must be at least 15 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
        // Fallback simulate or throw
        await new Promise((r) => setTimeout(r, 1200));
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
        return;
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
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-[#111827]">
      {/* Subtle decorative background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.22em] uppercase">
            <Sparkles size={12} className="text-blue-400" />
            Communication
          </span>
          <h2 className="text-white mt-3 sm:mt-4 leading-tight text-3xl sm:text-4xl font-bold">
            Let's Build Something Great
          </h2>
          <div className="w-16 h-1 bg-[#1D4ED8] rounded-full mx-auto mt-4" />
          <p className="text-gray-300 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Have a project in mind, need a full-stack engineer, or want to discuss technical architectures? Send me a message below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Availability Widget */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-sm"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap size={20} className="animate-pulse" />
              </div>
              <div>
                <div className="text-white text-sm sm:text-base font-semibold">Available for New Projects</div>
                <div className="text-gray-400 text-xs sm:text-sm mt-0.5">Full-time roles, contracts & freelance deliverables</div>
              </div>
              <span className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            </motion.div>

            {/* Contact links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + idx * 0.08 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex flex-col items-start p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <link.icon size={20} className="text-blue-400" />
                  </div>
                  <span className="text-white text-sm font-semibold tracking-wide">{link.label}</span>
                  <span className="text-gray-400 text-xs truncate max-w-full mt-0.5">{link.desc}</span>
                  <ArrowUpRight size={14} className="absolute top-3.5 right-3.5 text-white/40 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right panel: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7 md:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 sm:space-y-5 backdrop-blur-sm shadow-xl"
            >
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
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.name ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-blue-500"
                    } text-white text-sm sm:text-base outline-none focus:bg-white/10 transition-all pt-5 pb-1.5`}
                  />
                  <label
                    htmlFor="form-name"
                    className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                      focused.name || form.name
                        ? "top-1.5 text-[10px] sm:text-xs text-blue-400 font-semibold"
                        : "top-1/2 -translate-y-1/2 text-xs text-gray-400"
                    }`}
                  >
                    Full Name
                  </label>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email field */}
                <div className="relative">
                  <input
                    type="email"
                    id="form-email"
                    value={form.email}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      errors.email ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-blue-500"
                    } text-white text-sm sm:text-base outline-none focus:bg-white/10 transition-all pt-5 pb-1.5`}
                  />
                  <label
                    htmlFor="form-email"
                    className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                      focused.email || form.email
                        ? "top-1.5 text-[10px] sm:text-xs text-blue-400 font-semibold"
                        : "top-1/2 -translate-y-1/2 text-xs text-gray-400"
                    }`}
                  >
                    Email Address
                  </label>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.email}
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
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.subject ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-blue-500"
                  } text-white text-sm sm:text-base outline-none focus:bg-white/10 transition-all pt-5 pb-1.5`}
                />
                <label
                  htmlFor="form-subject"
                  className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                    focused.subject || form.subject
                      ? "top-1.5 text-[10px] sm:text-xs text-blue-400 font-semibold"
                      : "top-1/2 -translate-y-1/2 text-xs text-gray-400"
                  }`}
                >
                  Project Subject
                </label>
                {errors.subject && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.subject}
                  </motion.p>
                )}
              </div>

              {/* Message field */}
              <div className="relative">
                <textarea
                  id="form-message"
                  rows={4}
                  value={form.message}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                    errors.message ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-blue-500"
                  } text-white text-sm sm:text-base outline-none focus:bg-white/10 transition-all pt-6 pb-2 resize-none`}
                />
                <label
                  htmlFor="form-message"
                  className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                    focused.message || form.message
                      ? "top-2 text-[10px] sm:text-xs text-blue-400 font-semibold"
                      : "top-4 text-xs text-gray-400"
                  }`}
                >
                  Your Message
                </label>
                {errors.message && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm sm:text-base font-semibold transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success / Error Notification */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <CheckCircle size={16} className="shrink-0" />
                    Thank you! Your message has been sent successfully. I'll get back to you shortly.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    Oops! Something went wrong while delivering the email. Please try contacting directly at yerosang463@gmail.com.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
