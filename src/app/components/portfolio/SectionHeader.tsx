import { motion } from "motion/react";
import { cn } from "../ui/utils";
import { useOptimizedScrollAnimation } from "../../hooks/useOptimizedScrollAnimation";

interface SectionHeaderProps {
  number?: string;
  label?: string;
  title: string;
  italicTitle?: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  number,
  label,
  title,
  italicTitle,
  subtitle,
  description,
  align = "center",
}: SectionHeaderProps) {
  // Use optimized scroll animation for 60fps on mobile
  const { ref, isInView, animationDuration, shouldAnimate } = useOptimizedScrollAnimation(600, 0);

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : (shouldAnimate ? { opacity: 0, y: 30 } : {})}
      transition={shouldAnimate ? { duration: animationDuration / 1000 } : { duration: 0 }}
      className={cn("mb-12 sm:mb-16", align === "center" ? "text-center" : "text-left")}
    >
      <div className={cn("flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4", align === "center" ? "justify-center" : "justify-start")}>
        {number && (
          <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-600 dark:text-cyan-400 font-mono tracking-tight">
            {number}
          </span>
        )}
        {label && (
          <span className="text-blue-600 dark:text-cyan-400 text-xs sm:text-sm font-semibold uppercase tracking-wider font-mono">
            {label}
          </span>
        )}
      </div>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight text-slate-900 dark:text-white break-words">
        {title} {italicTitle && <span className="italic font-serif font-normal text-blue-600 dark:text-cyan-400">{italicTitle}</span>}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-2 max-w-2xl",
          align === "center" ? "mx-auto" : ""
        )}>
          {subtitle}
        </p>
      )}
      {description && (
        <p className={cn(
          "text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed",
          align === "center" ? "mx-auto" : ""
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
