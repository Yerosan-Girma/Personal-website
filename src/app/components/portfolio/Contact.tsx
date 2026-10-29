import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, MapPin, Copy, Check, Loader2, Sparkles, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";
import { SectionHeader } from "./SectionHeader";

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
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yerosan-girma-30005b37a", desc: "linkedin.com/in/yerosan-girma" },
  { icon: MapPin, label: "Location", href: "https://maps.google.com/?q=Addis+Ababa,+Ethiopia", desc: "Addis Ababa, Ethiopia" },
];

// Free Web3Forms access key (no expiration, directly sends to yerosang463@gmail.com)
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "5114320f-8202-46c0-a706-f21bc385f91a";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState({ name: false, email: false, subject: false, message: false });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleFocus = (field: keyof typeof focused) => setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field: keyof typeof focused) => setFocused((prev) => ({ ...prev, [field]: false }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (form.message.trim().length < 5) errs.message = "Message must be at least 5 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("yerosang463@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent(form.subject || "Project Inquiry");
    const body = encodeURIComponent(
      `Hi Yerosan,\n\n${form.message || ""}\n\nBest regards,\n${form.name || "Client"}\n${form.email || ""}`
    );
    window.open(`mailto:yerosang463@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || "Portfolio Contact Inquiry",
          message: form.message,
          from_name: `${form.name} (Portfolio Inquiry)`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#1D4ED8", "#38BDF8", "#10B981", "#6366F1"],
        });
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        throw new Error(data.message || "Failed to deliver message via Web3Forms.");
      }
    } catch (error: any) {
      console.error("Email sending failed:", error);
      setErrorMessage(error?.message || "Failed to send through automated gateway.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-14 sm:py-18 lg:py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-600/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-indigo-600/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="07"
          label="Let's Connect"
          title="Let's Work"
          italicTitle="Together"
          subtitle="Have an engineering opportunity, software project, or technical consultation in mind? Let's discuss requirements and build something remarkable."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct channels & info cards (Span 5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact channels list */}
            <div className="space-y-3.5">
              {contactLinks.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-cyan-400/40 shadow-xs hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-400 dark:text-slate-500 text-[11px] font-mono uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-slate-800 dark:text-white font-medium text-sm truncate group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.desc}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Action: Copy Email Shortcut */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Direct Inbox
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">
                  yerosang463@gmail.com
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedEmail ? "Copied!" : "Copy"}</span>
              </motion.button>
            </div>

            {/* Developer Fun Fact */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 dark:from-slate-900/60 dark:via-[#0D121F] dark:to-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 shadow-xs">
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>Engineering Philosophy</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                When I'm not writing full-stack code, you'll find me analyzing software design patterns, optimizing query indices, exploring distributed architecture papers, or shipping open-source components.
              </p>
            </div>
          </motion.div>

          {/* Right Column: High-Performance Contact Form (Span 7) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-xl relative"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct delivery to my personal development mailbox
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                      errors.name
                        ? "border-rose-500/70 focus:border-rose-500"
                        : "border-slate-200/90 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400"
                    } text-slate-900 dark:text-white text-sm outline-none focus:bg-white dark:focus:bg-white/10 transition-all pt-5 pb-2`}
                  />
                  <label
                    htmlFor="form-name"
                    className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                      focused.name || form.name
                        ? "top-1.5 text-[10px] text-blue-600 dark:text-cyan-400 font-semibold"
                        : "top-1/2 -translate-y-1/2 text-xs text-slate-400"
                    }`}
                  >
                    Your Name
                  </label>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-rose-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium">
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
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                      errors.email
                        ? "border-rose-500/70 focus:border-rose-500"
                        : "border-slate-200/90 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400"
                    } text-slate-900 dark:text-white text-sm outline-none focus:bg-white dark:focus:bg-white/10 transition-all pt-5 pb-2`}
                  />
                  <label
                    htmlFor="form-email"
                    className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                      focused.email || form.email
                        ? "top-1.5 text-[10px] text-blue-600 dark:text-cyan-400 font-semibold"
                        : "top-1/2 -translate-y-1/2 text-xs text-slate-400"
                    }`}
                  >
                    Email Address
                  </label>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-rose-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium">
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
                  className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                    errors.subject
                      ? "border-rose-500/70 focus:border-rose-500"
                      : "border-slate-200/90 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400"
                  } text-slate-900 dark:text-white text-sm outline-none focus:bg-white dark:focus:bg-white/10 transition-all pt-5 pb-2`}
                />
                <label
                  htmlFor="form-subject"
                  className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                    focused.subject || form.subject
                      ? "top-1.5 text-[10px] text-blue-600 dark:text-cyan-400 font-semibold"
                      : "top-1/2 -translate-y-1/2 text-xs text-slate-400"
                  }`}
                >
                  Project Subject / Inquiry
                </label>
                {errors.subject && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-rose-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium">
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
                  className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                    errors.message
                      ? "border-rose-500/70 focus:border-rose-500"
                      : "border-slate-200/90 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400"
                  } text-slate-900 dark:text-white text-sm outline-none focus:bg-white dark:focus:bg-white/10 transition-all pt-6 pb-2 resize-none`}
                />
                <label
                  htmlFor="form-message"
                  className={`absolute left-4 transition-all pointer-events-none uppercase font-mono tracking-wider ${
                    focused.message || form.message
                      ? "top-2 text-[10px] text-blue-600 dark:text-cyan-400 font-semibold"
                      : "top-4 text-xs text-slate-400"
                  }`}
                >
                  Project Details / Message
                </label>
                {errors.message && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-rose-500 text-xs mt-1 ml-1 flex items-center gap-1 font-medium">
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
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 disabled:opacity-70 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {/* Notifications */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5"
                  >
                    <CheckCircle size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>Thank you! Your message has been sent successfully. I'll get back to you shortly.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle size={18} className="shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold">Unable to deliver message through automated API:</p>
                        <p className="mt-0.5 text-xs text-rose-500/90 dark:text-rose-300/90 font-mono">
                          {errorMessage || "Connection error."}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-600 dark:text-slate-300">
                        Don't lose your message — send with 1 click:
                      </span>
                      <button
                        type="button"
                        onClick={handleDirectEmail}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Mail size={13} />
                        <span>Send via Email App</span>
                      </button>
                    </div>
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
