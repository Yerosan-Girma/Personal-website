import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress to 100
    const duration = 1600; // 1.6 seconds total loading time
    const interval = 16; // ~60fps updates
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 300); // Small buffer at 100%
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onDone]);

  const letters = "Yerosan Girma".split("");

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Pulse Ring Effects */}
      {[1, 2, 3].map((n) => (
        <motion.div
          key={n}
          className="absolute rounded-full border border-cyan-500/10"
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 450 * n, height: 450 * n, opacity: 0 }}
          transition={{
            duration: 2.2,
            delay: n * 0.35,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        />
      ))}

      <div className="relative text-center z-10">
        {/* Animated YG Logo */}
        <motion.div
          initial={{ scale: 0.4, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="relative w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30 border border-white/10 group overflow-hidden"
        >
          {/* Logo hover shine */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="text-white text-4xl" style={{ fontWeight: 850 }}>YG</span>
        </motion.div>

        {/* Word Reveal (Letters) */}
        <h1 className="text-white text-3xl mb-3 font-bold tracking-tight overflow-hidden">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.045,
                duration: 0.4,
                type: "spring",
              }}
              style={{ display: "inline-block" }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-cyan-400/60 text-xs mb-10 tracking-widest uppercase font-medium"
        >
          Full Stack Software Engineer
        </motion.p>

        {/* Loader elements */}
        <div className="w-64 mx-auto flex flex-col items-center">
          {/* Progress Bar Container */}
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-3 border border-white/5">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 rounded-full"
            />
          </div>

          {/* Progress Percentage Text */}
          <div className="text-white/40 text-xs font-mono tracking-wider flex items-center gap-1.5">
            <span className="text-white/60 font-semibold text-sm">
              {Math.min(100, Math.floor(progress))}
            </span>
            % LOADED
          </div>
        </div>
      </div>
    </motion.div>
  );
}
