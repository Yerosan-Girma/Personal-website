import React from "react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 sm:mb-16 md:mb-20 ${
        isCenter ? "text-center flex flex-col items-center" : "text-left"
      } ${className}`}
    >
      {/* Editorial Number & Category Rule */}
      <div
        className={`flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="font-serif italic text-base sm:text-lg font-medium text-blue-600 dark:text-cyan-400">
            {number}
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            / {label}
          </span>
        </div>
        <div className="h-px w-20 sm:w-28 md:w-36 bg-gradient-to-r from-blue-500/40 dark:from-cyan-400/40 via-blue-400/20 to-transparent" />
      </div>

      {/* Main Monumental Heading with Italic Serif Accent */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl">
        {title}{" "}
        {italicTitle && (
          <span className="italic font-serif font-light text-blue-600 dark:text-cyan-400">
            {italicTitle}
          </span>
        )}
      </h2>

      {/* Subtitle / Description */}
      {subtitle && (
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-normal text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
