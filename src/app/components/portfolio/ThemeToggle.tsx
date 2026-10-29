import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl transition-all duration-300 cursor-pointer ${
        isDark
          ? "bg-white/10 hover:bg-white/15 text-amber-300 border border-white/15 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
          : "bg-gray-100 hover:bg-gray-200/80 text-blue-700 border border-gray-200 shadow-xs"
      } ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.div
          key={theme}
          initial={{ y: isDark ? -18 : 18, opacity: 0, rotate: isDark ? -90 : 90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: isDark ? 18 : -18, opacity: 0, rotate: isDark ? 90 : -90 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]" strokeWidth={2.2} />
          ) : (
            <Moon className="w-4 h-4 text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]" strokeWidth={2.2} />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-semibold tracking-wide uppercase font-mono">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </motion.button>
  );
}
