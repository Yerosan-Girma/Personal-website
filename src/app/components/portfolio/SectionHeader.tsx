import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { cn } from "../ui/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", align === "center" ? "text-center" : "text-left")}
    >
      {subtitle && (
        <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        {title}
      </h2>
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
