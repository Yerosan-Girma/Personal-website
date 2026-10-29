import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080A10] text-slate-900 dark:text-white flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 shadow-2xl backdrop-blur-xl relative z-10"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
          // Error 404
        </span>
        <h1 className="text-7xl sm:text-8xl font-black font-mono tracking-tight mt-2 text-slate-900 dark:text-white">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold mt-3 mb-2 text-slate-800 dark:text-slate-100">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          The page or route you requested could not be located. It might have been moved or removed.
        </p>

        <Link to="/" className="inline-block w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
