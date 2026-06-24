import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

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
    let width = (canvas.width = Math.min(window.innerWidth - 32, 580));
    let height = (canvas.height = 420);

    const techNames = [
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "Express.js", color: "#FFFFFF" },
      { name: "MongoDB", color: "#47A248" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "HTML5", color: "#E34F26" },
      { name: "CSS3", color: "#1572B6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Next.js", color: "#FFFFFF" },
      { name: "Docker", color: "#2496ED" },
      { name: "Git", color: "#F05032" },
      { name: "GitHub", color: "#FFFFFF" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "MySQL", color: "#4479A1" },
      { name: "REST APIs", color: "#009688" },
      { name: "JWT Auth", color: "#FF007F" },
      { name: "Socket.io", color: "#010101" },
      { name: "Redux", color: "#764ABC" },
    ];

    // Sphere radius
    const radius = Math.min(width, height) * 0.42;

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

    // Tracking mouse coordinates relative to canvas center
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Distance from center determines rotation speed and axis
      mouseX = e.clientX - cx;
      mouseY = e.clientY - cy;

      isMouseOver = true;

      // Adjust speed based on mouse distance
      angleY = mouseX * 0.00003;
      angleX = -mouseY * 0.00003;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      // Fade back to slow idle rotation
      angleX = 0.002;
      angleY = 0.002;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = Math.min(parent.clientWidth, 580);
      height = canvas.height = 420;
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

      // Center coordinates
      const cx = width / 2;
      const cy = height / 2;

      // Sort items by z depth to render back-to-front (painters algorithm)
      const sortedItems = [...items].sort((a, b) => b.z - a.z);

      let currentHovered: string | null = null;

      sortedItems.forEach((item) => {
        // Rotate points
        rotateX(item, angleX);
        rotateY(item, angleY);

        // Perspective scaling factor
        const depth = 2.5 * radius;
        const scale = depth / (depth - item.z);
        const screenX = cx + item.x * scale;
        const screenY = cy + item.y * scale;

        // Visual properties based on depth (z)
        const opacity = Math.max(0.12, (item.z + radius) / (2 * radius));
        const fontSize = Math.max(10, Math.floor(13 * scale));

        ctx.font = `600 ${fontSize}px sans-serif`;

        // Check if mouse is hovering over this text node
        const textWidth = ctx.measureText(item.name).width;
        const paddingX = 14;
        const paddingY = 8;
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

        // Draw background pill bubble
        ctx.beginPath();
        const rx = screenX - nodeW / 2;
        const ry = screenY - nodeH / 2;
        ctx.roundRect(rx, ry, nodeW, nodeH, 12);
        
        if (isHovered) {
          ctx.fillStyle = "rgba(6, 182, 212, 0.16)";
          ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
          ctx.lineWidth = 1.5;
        } else {
          ctx.fillStyle = `rgba(13, 27, 58, ${opacity * 0.4})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.08})`;
          ctx.lineWidth = 1;
        }
        ctx.fill();
        ctx.stroke();

        // Draw Text inside pill
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isHovered
          ? "#22d3ee" // bright cyan
          : `rgba(255, 255, 255, ${opacity * 0.85})`;
        
        ctx.fillText(item.name, screenX, screenY);

        // Highlight indicator dot
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(screenX - textWidth / 2 - 4, screenY, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#22d3ee";
          ctx.fill();
        }
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
    <section id="tech-visualization" ref={containerRef} className="py-24 relative overflow-hidden border-t border-white/[0.04]">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left text detail */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 text-sm tracking-widest uppercase">Expertise Mapping</span>
          <h2 className="text-white mt-2 mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700 }}>
            Interactive Tech Sphere
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-8" />
          
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6">
            Move your cursor over the sphere to interact with my technology stack. The sphere rotates in 3D response to cursor position, simulating orbital gravity.
          </p>

          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
            These represent technologies I use to develop robust full-stack applications. Hover over a bubble to inspect it, highlighting its connections.
          </p>

          {/* Active hover info panel */}
          <div className="h-16 flex items-center">
            {hoveredTech ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-5 py-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-cyan-300 text-sm font-mono flex items-center gap-3 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Selected: <span className="font-bold text-white">{hoveredTech}</span>
              </motion.div>
            ) : (
              <span className="text-white/30 text-xs font-mono tracking-wider italic">
                ← Hover tags on sphere to lock focus
              </span>
            )}
          </div>
        </motion.div>

        {/* Right 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center"
        >
          <div className="relative p-2 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-2xl backdrop-blur-sm">
            {/* Tech tag canvas */}
            <canvas ref={canvasRef} className="block cursor-pointer select-none max-w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
