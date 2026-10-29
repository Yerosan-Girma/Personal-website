import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { GitFork, Star, Calendar, Award, Flame, BookOpen, Users } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

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
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);

  // Counter values
  const contributions = useCountUp(824, 1500, inView);
  const streak = useCountUp(32, 1200, inView);
  const repos = useCountUp(28, 1200, inView);
  const followers = useCountUp(54, 1000, inView);

  // Simulated contribution calendar data (36 weeks x 7 days)
  const [calendarGrid, setCalendarGrid] = useState<number[][]>([]);

  useEffect(() => {
    const cols = 36;
    const grid: number[][] = [];
    for (let c = 0; c < cols; c++) {
      const col: number[] = [];
      for (let r = 0; r < 7; r++) {
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
      case 4:
        return "bg-emerald-500 dark:bg-emerald-400 border-emerald-400/40 shadow-xs";
      case 3:
        return "bg-emerald-600 dark:bg-emerald-500/80 border-emerald-500/30";
      case 2:
        return "bg-emerald-700/70 dark:bg-emerald-700/60 border-emerald-600/30";
      case 1:
        return "bg-emerald-900/30 dark:bg-emerald-950 border-emerald-800/20";
      default:
        return "bg-slate-100 dark:bg-white/[0.04] border-slate-200/60 dark:border-white/[0.04]";
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
      name: "Kiray-bet",
      desc: "Ethiopia's premier home rental marketplace platform built with MERN stack, real-time inquiries, and verified property listings.",
      lang: "TypeScript",
      langColor: "bg-blue-500",
      stars: 16,
      forks: 5,
    },
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
      langColor: "bg-amber-400",
      stars: 8,
      forks: 2,
    },
  ];

  return (
    <section id="github-section" ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="06"
          label="Open Source"
          title="GitHub Activity &"
          italicTitle="Contributions"
          subtitle="Continuous integration, active code pushes, and open-source contributions across modern web ecosystems."
        />

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left panel: Quick statistics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1 p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 flex flex-col justify-between gap-6 shadow-sm backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users size={18} />
              </div>
              <span className="text-slate-900 dark:text-white text-sm font-bold">Developer Statistics</span>
            </div>

            {/* Counter items */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <Calendar size={11} className="text-emerald-500" />
                  Commits
                </div>
                <div className="text-slate-900 dark:text-white text-2xl font-bold font-mono">{contributions}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <Flame size={11} className="text-orange-500 animate-pulse" />
                  Streak
                </div>
                <div className="text-slate-900 dark:text-white text-2xl font-bold font-mono">{streak}d</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <BookOpen size={11} className="text-blue-500" />
                  Repos
                </div>
                <div className="text-slate-900 dark:text-white text-2xl font-bold font-mono">{repos}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <Award size={11} className="text-amber-500" />
                  Followers
                </div>
                <div className="text-slate-900 dark:text-white text-2xl font-bold font-mono">{followers}</div>
              </div>
            </div>

            {/* GitHub Profile link */}
            <a
              href="https://github.com/Yerosan-Girma"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold text-center transition-all cursor-pointer font-mono"
            >
              github.com/Yerosan-Girma ↗
            </a>
          </motion.div>

          {/* Right panel: Contribution Calendar Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 flex flex-col justify-between gap-6 shadow-sm backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-900 dark:text-white text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Contribution Timeline (Past 9 Months)
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono">Continuous delivery</span>
            </div>

            {/* Calendar Cells container */}
            <div className="overflow-x-auto pb-2 flex flex-col gap-2">
              <div className="flex gap-1 min-w-max">
                {calendarGrid.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-1">
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
                          className={`w-3 h-3 rounded-[3px] border transition-colors cursor-crosshair ${getCellColor(level)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid interactive display status */}
            <div className="h-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900/40 border border-emerald-800/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/70 border border-emerald-600/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 border border-emerald-500/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 border border-emerald-300/30" />
                <span>More</span>
              </div>

              <div className="h-6 flex items-center">
                {hoveredCell ? (
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
                    <strong>{hoveredCell.count} commits</strong> on {hoveredCell.date}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono italic">
                    Hover cell blocks to view metadata
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pinned Repositories Subsection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedProjects.map((pinned, idx) => (
            <motion.div
              key={pinned.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all flex flex-col justify-between gap-4 shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors text-sm font-mono">
                    {pinned.name}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-0.5 rounded-full">
                    Public
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {pinned.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${pinned.langColor}`} />
                    <span className="font-mono text-[11px]">{pinned.lang}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500" />
                    <span className="font-mono text-[11px]">{pinned.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={12} className="text-blue-500" />
                    <span className="font-mono text-[11px]">{pinned.forks}</span>
                  </div>
                </div>
                <a
                  href={`https://github.com/Yerosan-Girma/${pinned.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  Code →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
