import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Copy,
  Check,
  Loader2,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
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

interface ContactChannel {
  name: string;
  value: string;
  detail: string;
  href: string;
  icon: typeof Mail;
  isExternal?: boolean;
}

const contactChannels: ContactChannel[] = [
  {
    name: "Email Address",
    value: "yerosang463@gmail.com",
    detail: "Primary inbox for opportunities & inquiries",
    href: "mailto:yerosang463@gmail.com",
    icon: Mail,
    isExternal: false,
  },
  {
    name: "LinkedIn Profile",
    value: "yerosan-girma",
    detail: "Professional network & connection",
    href: "https://www.linkedin.com/in/yerosan-girma-30005b37a",
    icon: Linkedin,
    isExternal: true,
  },
  {
    name: "GitHub Repositories",
    value: "@Yerosan-Girma",
    detail: "Source code, commits & open-source projects",
    href: "https://github.com/Yerosan-Girma",
    icon: Github,
    isExternal: true,
  },
  {
    name: "Location",
    value: "Addis Ababa, Ethiopia",
    detail: "Available for on-site & global remote roles",
    href: "https://maps.google.com/?q=Addis+Ababa,+Ethiopia",
    icon: MapPin,
    isExternal: true,
  },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }
    if (!form.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) {
      errs.subject = "Please enter a subject for your inquiry.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText("yerosang463@gmail.com");
    setCopiedEmail(true);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 36,
      spread: 50,
      origin: { x, y },
      colors: ["#2563EB", "#38BDF8", "#10B981", "#6366F1"],
      ticks: 140,
      disableForReducedMotion: true,
    });

    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleDirectEmail = () => {
    const subject = encodeURIComponent(form.subject || "Full-Stack Engineering Inquiry");
    const body = encodeURIComponent(
      `Hello Yerosan,\n\n${form.message || ""}\n\nBest regards,\n${form.name || "Client / Recruiter"}\n${form.email || ""}`
    );
    window.open(`mailto:yerosang463@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");

    const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!web3formsKey) {
      // If no API key configured, seamlessly route to user's native email client
      handleDirectEmail();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: form.name,
          email: form.email,
          subject: form.subject || "Portfolio Inquiry",
          message: form.message,
          from_name: `${form.name} (Portfolio Inquiry)`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#2563EB", "#38BDF8", "#10B981", "#6366F1"],
        });
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        throw new Error(data.message || "Gateway response indicated failure.");
      }
    } catch (err: any) {
      console.warn("Contact form gateway notice:", err?.message || err);
      setErrorMessage(
        err?.message || "Automated form delivery was unable to complete. You can send directly via your email client."
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="07"
          label="Get In Touch"
          title="Let's Build Something"
          italicTitle="Together"
          subtitle="Interested in hiring me for software engineering positions, full-stack internships, or discussing project collaborations? Reach out directly below."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="space-y-3">
              {contactChannels.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.isExternal ? "_blank" : "_self"}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-cyan-400/40 shadow-xs hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-mono text-slate-400 uppercase block">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors block truncate">
                          {item.value}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                          {item.detail}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors shrink-0 ml-2">
                      <ArrowUpRight size={15} />
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Quick Copy Email Card */}
            <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail size={15} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    Need the email copied?
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    yerosang463@gmail.com
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                <span>{copiedEmail ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Availability Note */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-slate-900/60 dark:to-blue-950/20 border border-blue-200/80 dark:border-blue-900/30">
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                <Sparkles size={13} />
                <span>Response Time</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                I typically respond to software engineering recruiters, internship leads, and project inquiries within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0F1626]/90 border border-slate-200/90 dark:border-white/10 shadow-lg text-left">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill out the form below or email me directly at yerosang463@gmail.com
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                      errors.name
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-slate-200/90 dark:border-white/10 focus:border-blue-500"
                    } text-slate-900 dark:text-white text-sm outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-rose-500 text-xs mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle size={11} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                      errors.email
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-slate-200/90 dark:border-white/10 focus:border-blue-500"
                    } text-slate-900 dark:text-white text-sm outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-xs mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle size={11} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="form-subject"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                >
                  Subject / Opportunity *
                </label>
                <input
                  type="text"
                  id="form-subject"
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  placeholder="e.g. Full-Stack Internship / Project Collaboration"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                    errors.subject
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-slate-200/90 dark:border-white/10 focus:border-blue-500"
                  } text-slate-900 dark:text-white text-sm outline-none transition-colors`}
                />
                {errors.subject && (
                  <p className="text-rose-500 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle size={11} /> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1"
                >
                  Message / Project Scope *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Describe your project, role requirements, or question..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border ${
                    errors.message
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-slate-200/90 dark:border-white/10 focus:border-blue-500"
                  } text-slate-900 dark:text-white text-sm outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="text-rose-500 text-xs mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-70 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Delivering Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status notifications */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2"
                  >
                    <CheckCircle size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>Thank you! Your message has been sent. I will respond to your email shortly.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Unable to complete automated delivery:</p>
                        <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-300">
                          {errorMessage}
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between">
                      <span>Open in your native email client instead:</span>
                      <button
                        type="button"
                        onClick={handleDirectEmail}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs cursor-pointer flex items-center gap-1"
                      >
                        <Mail size={12} />
                        <span>Send via Email App</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
