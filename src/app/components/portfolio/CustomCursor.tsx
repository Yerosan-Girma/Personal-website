import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring spring configuration for ultra-smooth lag-follow effect
  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .clickable, [data-cursor="hover"]');
      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousemove", updateHoverState, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", updateHoverState);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  return (
    <div className="hidden lg:block pointer-events-none z-[99999] fixed inset-0">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/60 dark:border-cyan-400/60 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          scale: hovered ? 1.8 : clicked ? 0.75 : 1,
          backgroundColor: hovered
            ? "rgba(56, 189, 248, 0.12)"
            : "transparent",
          borderColor: hovered
            ? "rgba(56, 189, 248, 0.9)"
            : "rgba(59, 130, 246, 0.45)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scale: hovered ? 0 : clicked ? 1.6 : 1,
        }}
      />
    </div>
  );
}
