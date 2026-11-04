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
  // Requirement 18.5, 18.6: Use optimized scroll animation for 60fps on mobile
  const { ref, isInView, animationDuration, shouldAnimate } = useOptimizedScrollAnimation(600, 0);

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : (shouldAnimate ? { opacity: 0, y: 30 } : {})}
      transition={shouldAnimate ? { duration: animationDuration / 1000 } : { duration: 0 }}
      className={cn("mb-16", align === "center" ? "text-center" : "text-left")}
    >
      <div className="flex items-center gap-4 mb-4">
        {number && (
          <span className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-cyan-400 font-mono tracking-tight">
            {number}
          </span>
        )}
        {label && (
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
      <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        {title} {italicTitle && <span className="italic">{italicTitle}</span>}
      </h2>
      {subtitle && (
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      {description && (
        <p className={cn(
          "text-muted-foreground text-lg max-w-2xl",
          align === "center" ? "mx-auto" : ""
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
