import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Globe } from "lucide-react";

interface TechItem {
  name: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export function TechVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(containerRef, { once: true });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.min(window.innerWidth - 32, 540));
    let height = (canvas.height = 400);

    const techNames = [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#22C55E" },
      { name: "Express.js", color: "#60A5FA" },
      { name: "MongoDB", color: "#10AA50" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "HTML5", color: "#E34F26" },
      { name: "CSS3", color: "#1572B6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "WebSockets", color: "#38BDF8" },
      { name: "Docker", color: "#2496ED" },
      { name: "Git", color: "#F05032" },
      { name: "GitHub", color: "#818CF8" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "MySQL", color: "#00758F" },
      { name: "REST APIs", color: "#818CF8" },
      { name: "JWT Auth", color: "#F43F5E" },
      { name: "Bootstrap", color: "#7952B3" },
      { name: "MERN Stack", color: "#10B981" },
    ];

    // Sphere radius
    const radius = Math.min(width, height) * 0.4;

    // Create 3D distribution using Fibonacci Sphere algorithm
    const items: TechItem[] = techNames.map((tech, i) => {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / techNames.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      return {
        name: tech.name,
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        color: tech.color,
      };
    });

    let angleX = 0.003;
    let angleY = 0.003;

    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      mouseX = e.clientX - cx;
      mouseY = e.clientY - cy;

      isMouseOver = true;
      angleY = mouseX * 0.00003;
      angleX = -mouseY * 0.00003;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      angleX = 0.002;
      angleY = 0.002;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = Math.min(parent.clientWidth, 540);
      height = canvas.height = 400;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const rotateX = (item: TechItem, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = item.y * cos - item.z * sin;
      const z1 = item.z * cos + item.y * sin;
      item.y = y1;
      item.z = z1;
    };

    const rotateY = (item: TechItem, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = item.x * cos - item.z * sin;
      const z1 = item.z * cos + item.x * sin;
      item.x = x1;
      item.z = z1;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      const cx = width / 2;
      const cy = height / 2;

      const sortedItems = [...items].sort((a, b) => b.z - a.z);
      let currentHovered: string | null = null;

      sortedItems.forEach((item) => {
        rotateX(item, angleX);
        rotateY(item, angleY);

        const depth = 2.5 * radius;
        const scale = depth / (depth - item.z);
        const screenX = cx + item.x * scale;
        const screenY = cy + item.y * scale;

        const opacity = Math.max(0.18, (item.z + radius) / (2 * radius));
        const fontSize = Math.max(10, Math.floor(12 * scale));

        ctx.font = `600 ${fontSize}px sans-serif`;

        const textWidth = ctx.measureText(item.name).width;
        const paddingX = 12;
        const paddingY = 7;
        const nodeW = textWidth + paddingX * 2;
        const nodeH = fontSize + paddingY * 2;

        const mx = mouseX + cx;
        const my = mouseY + cy;

        const isHovered =
          isMouseOver &&
          mx >= screenX - nodeW / 2 &&
          mx <= screenX + nodeW / 2 &&
          my >= screenY - nodeH / 2 &&
          my <= screenY + nodeH / 2;

        if (isHovered) {
          currentHovered = item.name;
        }

        // Draw pill
        ctx.beginPath();
        const rx = screenX - nodeW / 2;
        const ry = screenY - nodeH / 2;
        ctx.roundRect(rx, ry, nodeW, nodeH, 10);

        if (isDark) {
          if (isHovered) {
            ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
            ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
            ctx.lineWidth = 1.5;
          } else {
            ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.75})`;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.12})`;
            ctx.lineWidth = 1;
          }
        } else {
          if (isHovered) {
            ctx.fillStyle = "rgba(29, 78, 216, 0.15)";
            ctx.strokeStyle = "rgba(29, 78, 216, 0.8)";
            ctx.lineWidth = 1.5;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
            ctx.strokeStyle = `rgba(203, 213, 225, ${opacity * 0.8})`;
            ctx.lineWidth = 1;
          }
        }

        ctx.fill();
        ctx.stroke();

        // Draw Text
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (isDark) {
          ctx.fillStyle = isHovered ? "#38bdf8" : `rgba(248, 250, 252, ${opacity * 0.9})`;
        } else {
          ctx.fillStyle = isHovered ? "#1D4ED8" : `rgba(15, 23, 42, ${Math.max(0.4, opacity)})`;
        }
        ctx.fillText(item.name, screenX, screenY);
      });

      setHoveredTech(currentHovered);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="rounded-3xl bg-white/95 dark:bg-[#0D121F]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
      <div className="grid md:grid-cols-12 gap-8 items-center">
        {/* Left detail */}
        <div className="md:col-span-5 text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-mono font-semibold mb-3">
            <Globe size={13} />
            3D Spatial Orbit
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Interactive Tech Sphere
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            Move your cursor across the sphere to interact with my technology stack. The sphere computes 3D coordinates using a Fibonacci distribution and responds in real time to pointer movement.
          </p>

          <div className="h-14 flex items-center">
            {hoveredTech ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-white/10 border border-blue-200 dark:border-white/15 text-blue-700 dark:text-cyan-300 text-xs font-mono flex items-center gap-2 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping" />
                Active Focus: <strong className="text-slate-900 dark:text-white">{hoveredTech}</strong>
              </motion.div>
            ) : (
              <span className="text-slate-400 text-xs font-mono italic">
                Hover tags on sphere to lock focus
              </span>
            )}
          </div>
        </div>

        {/* Right 3D canvas */}
        <div className="md:col-span-7 flex justify-center items-center">
          <div className="relative p-2 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-white/10 shadow-inner">
            <canvas ref={canvasRef} className="block cursor-pointer select-none max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
