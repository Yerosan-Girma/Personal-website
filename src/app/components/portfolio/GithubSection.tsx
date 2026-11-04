import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Calendar, Award, Flame, BookOpen, Users, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import {
  REAL_GITHUB_STATS,
  REAL_CONTRIBUTION_WEEKS,
  GithubDay,
} from "./githubData";

function useCountUp(target: number, duration = 1200, trigger = false) {
  const [count, setCount] = useState(0);

  useState(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }

    const timer = setInterval(() => {
      start += Math.ceil(end / 35);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(Math.floor(duration / end), 12));

    return () => clearInterval(timer);
  });

  return count || (trigger ? target : 0);
}

export function GithubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const [hoveredCell, setHoveredCell] = useState<{ count: number; date: string } | null>(null);

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
    <section id="github-section" ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <SectionHeader
          number="06"
          label="Open Source & GitHub"
          title="Open-Source Activity &"
          italicTitle="Contributions"
          subtitle="Verified GitHub repository commits, code pushes, and continuous open-source activity."
        />

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {/* Left panel: Quick statistics */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 p-5 sm:p-7 rounded-[28px] bg-white dark:bg-[#0D1424] border border-slate-200/90 dark:border-white/10 flex flex-col justify-between gap-5 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users size={18} />
              </div>
              <div>
                <span className="text-slate-900 dark:text-white text-sm font-bold block">
                  GitHub Verified Stats
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  @Yerosan-Girma
                </span>
              </div>
            </div>

            {/* Counter items */}
            <div className="grid grid-cols-2 gap-2.5">
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

            <a
              href="https://github.com/Yerosan-Girma"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white text-xs font-semibold text-center transition-all cursor-pointer font-mono flex items-center justify-center gap-1.5"
            >
              <span>View GitHub Profile</span>
              <ExternalLink size={12} />
            </a>
          </motion.div>

          {/* Right panel: Contribution Calendar Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 p-5 sm:p-7 rounded-[28px] bg-white dark:bg-[#0D1424] border border-slate-200/90 dark:border-white/10 flex flex-col justify-between gap-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-900 dark:text-white text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Verified Contribution Activity
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-[11px] font-mono">
                {REAL_GITHUB_STATS.totalContributions} total commits
              </span>
            </div>

            {/* Calendar Cells */}
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

            {/* Legend & Hover Status */}
            <div className="h-9 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
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
                      {hoveredCell.count === 1 ? "1 commit" : `${hoveredCell.count} commits`}
                    </strong>{" "}
                    on {hoveredCell.date}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    Hover squares to view commit history
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
