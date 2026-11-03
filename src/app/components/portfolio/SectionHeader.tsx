import { motion } from "motion/react";

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  italicTitle?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  number,
  label,
  title,
  italicTitle,
  subtitle,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-8 sm:mb-12 md:mb-14 ${
        isCenter ? "text-center flex flex-col items-center" : "text-left"
      } ${className}`}
    >
      {/* Category & Section Index Indicator */}
      <div
        className={`flex items-center gap-3 sm:gap-5 mb-3 sm:mb-4 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <div className="flex items-baseline gap-2 sm:gap-2.5">
          <span className="font-serif italic text-sm sm:text-base font-semibold text-blue-600 dark:text-cyan-400">
            {number}
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-500 dark:text-slate-400">
            / {label}
          </span>
        </div>
        <div className="h-px w-16 sm:w-24 md:w-32 bg-gradient-to-r from-blue-500/40 dark:from-cyan-400/40 via-blue-400/20 to-transparent" />
      </div>

      {/* Main Heading with Balanced Scaling for Mobile and Desktop */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] sm:leading-[1.12] max-w-4xl">
        {title}{" "}
        {italicTitle && (
          <span className="italic font-serif font-normal text-blue-600 dark:text-cyan-400">
            {italicTitle}
          </span>
        )}
      </h2>

      {/* High-Readability Subtitle */}
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-normal text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed sm:leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
