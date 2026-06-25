import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { GitFork, Star, Eye, Calendar, Award, Flame, BookOpen, Users } from "lucide-react";

// Hook to animate numbers counting up
function useCountUp(target: number, duration = 1200, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, Math.max(incrementTime, 8));

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

export function GithubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);

  // Counter values
  const contributions = useCountUp(824, 1500, inView);
  const streak = useCountUp(32, 1200, inView);
  const repos = useCountUp(28, 1200, inView);
  const followers = useCountUp(54, 1000, inView);

  // Simulated contribution calendar data (24 weeks x 7 days)
  const [calendarGrid, setCalendarGrid] = useState<number[][]>([]);
  
  useEffect(() => {
    // Generate static values to avoid hydrate mismatches
    const cols = 38; // 38 weeks
    const grid: number[][] = [];
    for (let c = 0; c < cols; c++) {
      const col: number[] = [];
      for (let r = 0; r < 7; r++) {
        // Randomly distribute contribution levels (0-4)
        const rand = Math.random();
        const level = rand > 0.85 ? 4 : rand > 0.65 ? 3 : rand > 0.4 ? 2 : rand > 0.18 ? 1 : 0;
        col.push(level);
      }
      grid.push(col);
    }
    setCalendarGrid(grid);
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 4: return "bg-emerald-400 shadow-md shadow-emerald-500/20 border-emerald-300/30";
      case 3: return "bg-emerald-600 border-emerald-500/30";
      case 2: return "bg-emerald-800/80 border-emerald-700/30";
      case 1: return "bg-emerald-950 border-emerald-900/30";
      default: return "bg-white/[0.02] border-white/[0.04]";
    }
  };

  const getCellContributions = (level: number) => {
    switch (level) {
      case 4: return Math.floor(Math.random() * 6) + 9;
      case 3: return Math.floor(Math.random() * 3) + 6;
      case 2: return Math.floor(Math.random() * 3) + 3;
      case 1: return Math.floor(Math.random() * 2) + 1;
      default: return 0;
    }
  };

  const pinnedProjects = [
    {
      name: "Digital-equb",
      desc: "Traditional Ethiopian savings circle built with MERN stack featuring automatic payment distribution logic and notifications.",
      lang: "TypeScript",
      langColor: "bg-blue-500",
      stars: 12,
      forks: 4,
    },
    {
      name: "Wabiskills-Seminar",
      desc: "Real-time socket communication application engineered for live webcasts, feedback management, and user presence panels.",
      lang: "JavaScript",
      langColor: "bg-yellow-400",
      stars: 8,
      forks: 2,
    },
  ];

  return (
    <section id="github-section" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm tracking-widest uppercase">Open Source Sync</span>
          <h2 className="text-white mt-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            GitHub Activity
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left panel: Quick statistics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-6 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Users size={18} />
              </div>
              <span className="text-white text-sm font-bold">Developer Stats</span>
            </div>

            {/* Counter items */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-white/60 text-[10px] uppercase tracking-wider mb-1">
                  <Calendar size={11} className="text-emerald-400" />
                  Commits (YTD)
                </div>
                <div className="text-white text-2xl font-bold font-mono">{contributions}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-white/60 text-[10px] uppercase tracking-wider mb-1">
                  <Flame size={11} className="text-orange-400 animate-pulse" />
                  Best Streak
                </div>
                <div className="text-white text-2xl font-bold font-mono">{streak}d</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-white/60 text-[10px] uppercase tracking-wider mb-1">
                  <BookOpen size={11} className="text-blue-400" />
                  Repositories
                </div>
                <div className="text-white text-2xl font-bold font-mono">{repos}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-white/60 text-[10px] uppercase tracking-wider mb-1">
                  <Award size={11} className="text-yellow-400" />
                  Followers
                </div>
                <div className="text-white text-2xl font-bold font-mono">{followers}</div>
              </div>
            </div>

            {/* Small quote link */}
            <a
              href="https://github.com/Yerosan-Girma"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-center hover:bg-emerald-500/18 transition-all"
            >
              View GitHub Profile
            </a>
          </motion.div>

          {/* Right panel: Contribution Calendar Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Commit Grid (Past 9 Months)
              </span>
              <span className="text-white/30 text-[10px] font-mono">Real-time mock dataset</span>
            </div>

            {/* Calendar Cells container */}
            <div className="overflow-x-auto pb-2 scrollbar-none flex flex-col gap-2">
              <div className="flex gap-[3.5px] min-w-max">
                {calendarGrid.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-[3.5px]">
                    {col.map((level, ri) => {
                      const count = getCellContributions(level);
                      const daysAgo = (calendarGrid.length - ci) * 7 + (6 - ri);
                      const d = new Date();
                      d.setDate(d.getDate() - daysAgo);
                      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                      return (
                        <div
                          key={ri}
                          onMouseEnter={() => setHoveredCell({ count, date: dateStr })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-[11px] h-[11px] rounded-[2px] border transition-colors cursor-crosshair ${getCellColor(level)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid interactive display status */}
            <div className="h-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-white/[0.02] border border-white/[0.04]" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-950 border border-emerald-900/30" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-800/80 border border-emerald-700/30" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-600 border border-emerald-500/30" />
                <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-400 border border-emerald-300/30" />
                <span>More</span>
              </div>
              
              <div className="h-6 flex items-center">
                {hoveredCell ? (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/20 px-3 py-1 rounded-full border border-emerald-500/20">
                    <strong>{hoveredCell.count} commits</strong> on {hoveredCell.date}
                  </span>
                ) : (
                  <span className="text-[10px] text-white/30 font-mono tracking-wider italic">
                    Hover cell blocks to view metadata
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pinned Repositories Subsection */}
        <div className="grid md:grid-cols-2 gap-6">
          {pinnedProjects.map((pinned, idx) => (
            <motion.div
              key={pinned.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/12 transition-all flex flex-col justify-between gap-4 backdrop-blur-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold group-hover:text-emerald-400 transition-colors text-sm font-mono">
                    {pinned.name}
                  </span>
                  <span className="text-white/30 text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                    Public
                  </span>
                </div>
                <p className="text-white/65 text-xs leading-relaxed">
                  {pinned.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/5 pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${pinned.langColor}`} />
                    <span>{pinned.lang}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={12} className="text-yellow-400" />
                    <span>{pinned.stars}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork size={12} className="text-blue-400" />
                    <span>{pinned.forks}</span>
                  </div>
                </div>
                <a
                  href={`https://github.com/Yerosan-Girma/${pinned.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-emerald-400 flex items-center gap-1 transition-colors group-hover:translate-x-1"
                >
                  Code <span className="inline-block transition-transform duration-200">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
