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
    detail: "Primary inbox for engineering roles & inquiries",
    href: "mailto:yerosang463@gmail.com",
    icon: Mail,
    isExternal: false,
  },
  {
    name: "LinkedIn Profile",
    value: "yerosan-girma",
    detail: "Professional network & career updates",
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

const inputBase =
  "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border text-slate-900 dark:text-white text-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-normal";

const inputNormal = `${inputBase} border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/15 dark:focus:ring-cyan-400/15`;
const inputError = `${inputBase} border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15`;

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
    <section id="contact" ref={ref} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="07"
          label="Get In Touch"
          title="Let's Build Something"
          italicTitle="Together"
          subtitle="Interested in hiring me for software engineering positions, full-stack internships, or discussing project collaborations? Reach out directly below."
        />

        {/* Clean 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info (Cohesive List, NOT 6 Separate Cards) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Feel free to connect directly through any channel or send a message using the form.
              </p>
            </div>

            {/* Channels Directory List */}
            <div className="divide-y divide-slate-200/80 dark:divide-white/10">
              {contactChannels.map((item, idx) => {
                const Icon = item.icon;
                const isEmail = item.name.includes("Email");

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.05 }}
                    className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group"
                  >
                    <a
                      href={item.href}
                      target={item.isExternal ? "_blank" : "_self"}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                          {item.name}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors block truncate">
                          {item.value}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                          {item.detail}
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isEmail && (
                        <button
                          onClick={handleCopyEmail}
                          title="Copy Email"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedEmail ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                          <span className="hidden sm:inline">{copiedEmail ? "Copied" : "Copy"}</span>
                        </button>
                      )}
                      <a
                        href={item.href}
                        target={item.isExternal ? "_blank" : "_self"}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors"
                        aria-label={`Open ${item.name}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Response Time Note */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
              <Sparkles size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Based in Addis Ababa (GMT+3). Response time typically within 24 hours for engineering recruitment and project inquiries.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-4 sm:p-8 lg:p-9 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-white/10 shadow-sm text-left">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-100 dark:border-blue-400/20">
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
                    className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                    className={errors.name ? inputError : inputNormal}
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
                    className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                    className={errors.email ? inputError : inputNormal}
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
                  className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                  className={errors.subject ? inputError : inputNormal}
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
                  className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
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
                  className={`${errors.message ? inputError : inputNormal} resize-none`}
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
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 disabled:opacity-70 cursor-pointer active:scale-[0.99]"
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <CheckCircle size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>Thank you! Your message has been sent. I will respond to your email shortly.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Unable to complete automated delivery:</p>
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">{errorMessage}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-rose-500/20 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                      <span className="text-xs">Open in your native email client instead:</span>
                      <button
                        type="button"
                        onClick={handleDirectEmail}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors active:scale-95 shrink-0"
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
