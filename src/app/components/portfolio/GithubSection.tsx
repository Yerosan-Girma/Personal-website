import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { GitFork, Star, Calendar, Award, Flame, BookOpen, Users, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import {
  REAL_GITHUB_STATS,
  REAL_PINNED_REPOS,
  REAL_CONTRIBUTION_WEEKS,
  GithubDay,
} from "./githubData";

// Hook to animate numbers counting up
function useCountUp(target: number, duration = 1200, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 8);
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  return count || (trigger ? target : 0);
}

export function GithubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);

  // Real animated counter values from GitHub API
  const contributions = useCountUp(REAL_GITHUB_STATS.totalContributions, 1400, inView);
  const repos = useCountUp(REAL_GITHUB_STATS.publicRepos, 1000, inView);
  const activeDays = useCountUp(REAL_GITHUB_STATS.activeDays, 1200, inView);
  const followers = useCountUp(REAL_GITHUB_STATS.followers, 800, inView);

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-emerald-500 dark:bg-emerald-400 border-emerald-400/40";
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

  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="github-section" ref={containerRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="06"
          label="Open Source & GitHub"
          title="Open Source &"
          italicTitle="Activity"
          subtitle="Real-time verification of repository commits, code pushes, and open-source contributions from my GitHub profile."
        />

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
          {/* Left panel: Quick statistics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 p-5 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 flex flex-col justify-between gap-5 shadow-xs backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users size={17} />
              </div>
              <div>
                <span className="text-slate-900 dark:text-white text-sm font-bold block">
                  GitHub Live Statistics
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  @Yerosan-Girma
                </span>
              </div>
            </div>

            {/* Counter items with real values */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <Calendar size={11} className="text-emerald-500" />
                  Contributions
                </div>
                <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold font-mono">
                  {contributions}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <Flame size={11} className="text-orange-500" />
                  Active Days
                </div>
                <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold font-mono">
                  {activeDays}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <BookOpen size={11} className="text-blue-500" />
                  Repositories
                </div>
                <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold font-mono">
                  {repos}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                  <Award size={11} className="text-amber-500" />
                  Followers
                </div>
                <div className="text-slate-900 dark:text-white text-xl sm:text-2xl font-bold font-mono">
                  {followers}
                </div>
              </div>
            </div>

            {/* GitHub Profile link by clean name */}
            <a
              href="https://github.com/Yerosan-Girma"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold text-center transition-all cursor-pointer font-mono flex items-center justify-center gap-1.5"
            >
              <span>View GitHub Profile</span>
              <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Right panel: Contribution Calendar Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 p-5 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 flex flex-col justify-between gap-5 shadow-xs backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-900 dark:text-white text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Real GitHub Contribution Timeline
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono hidden sm:inline">
                {REAL_GITHUB_STATS.totalContributions} total commits
              </span>
            </div>

            {/* Calendar Cells container with clean horizontal scroll */}
            <div className="overflow-x-auto pb-2 flex flex-col gap-2 max-w-full">
              <div className="flex gap-1 min-w-max">
                {REAL_CONTRIBUTION_WEEKS.map((week, ci) => (
                  <div key={ci} className="flex flex-col gap-1">
                    {week.map((day: GithubDay, ri) => (
                      <div
                        key={ri}
                        onMouseEnter={() =>
                          setHoveredCell({ count: day.c, date: formatDate(day.d) })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] border transition-colors cursor-crosshair ${getCellColor(
                          day.l
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid interactive display status */}
            <div className="h-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900/40 border border-emerald-800/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/70 border border-emerald-600/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 border border-emerald-500/30" />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 border border-emerald-300/30" />
                <span>More</span>
              </div>

              <div className="h-5 flex items-center">
                {hoveredCell ? (
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <strong>
                      {hoveredCell.count === 1
                        ? "1 commit"
                        : `${hoveredCell.count} commits`}
                    </strong>{" "}
                    on {hoveredCell.date}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono italic">
                    Tap/hover blocks to view verified GitHub commit data
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REAL_PINNED_REPOS.map((pinned, idx) => (
            <motion.div
              key={pinned.name}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              whileHover={{ y: -3 }}
              className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all flex flex-col justify-between gap-3.5 shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors text-sm font-mono">
                    {pinned.name}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">
                    Public
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-normal">
                  {pinned.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${pinned.langColor}`} />
                    <span className="font-mono text-[11px]">{pinned.lang}</span>
                  </div>
                  {pinned.forks > 0 && (
                    <div className="flex items-center gap-1">
                      <GitFork size={11} className="text-blue-500" />
                      <span className="font-mono text-[11px]">{pinned.forks}</span>
                    </div>
                  )}
                </div>
                <a
                  href={pinned.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px] font-medium"
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
