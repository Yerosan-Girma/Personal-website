import { useEffect, useRef } from "react";

interface TechNode {
  name: string;
  x: number;
  y: number;
  z: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, over: false });
  const scrollRef = useRef({ y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dotted star particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulseTimer: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.speedY = (Math.random() - 0.5) * 0.12;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseTimer = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.pulseTimer += this.pulseSpeed;
        this.opacity = (Math.sin(this.pulseTimer) * 0.15 + 0.3);
      }

      draw(context: CanvasRenderingContext2D, scrollOffset: number) {
        const drawY = (this.y - scrollOffset * 0.15 + height) % height;
        context.beginPath();
        context.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(165, 180, 252, ${this.opacity * 0.45})`;
        context.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => new Particle());

    // 3D tag cloud nodes configuration
    const techNames = [
      "React", "Node.js", "Express.js", "MongoDB", 
      "TypeScript", "JavaScript", "HTML5", "CSS3", 
      "Tailwind CSS", "Next.js", "Docker", "Git", 
      "GitHub", "PostgreSQL", "MySQL", "REST APIs", 
      "JWT Auth", "Socket.io", "Redux", "Bootstrap",
      "Vite", "Prisma", "GraphQL", "Firebase",
      "Linux", "AWS", "Figma", "Python",
      "CI/CD", "Webpack"
    ];

    let sphereRadius = Math.min(width, height) * 0.42;

    // Distribute tech nodes onto Fibonacci Sphere
    const techNodes: TechNode[] = techNames.map((name, i) => {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / techNames.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;

      return {
        name,
        x: sphereRadius * Math.sin(phi) * Math.cos(theta),
        y: sphereRadius * Math.sin(phi) * Math.sin(theta),
        z: sphereRadius * Math.cos(phi),
      };
    });

    let angleX = 0.0012;
    let angleY = 0.0012;

    const rotateX = (node: TechNode, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = node.y * cos - node.z * sin;
      const z1 = node.z * cos + node.y * sin;
      node.y = y1;
      node.z = z1;
    };

    const rotateY = (node: TechNode, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = node.x * cos - node.z * sin;
      const z1 = node.z * cos + node.x * sin;
      node.x = x1;
      node.z = z1;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.over = true;

      // Distance from center drives 3D sphere rotation
      const cx = width / 2;
      const cy = height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      angleY = dx * 0.000015;
      angleX = -dy * 0.000015;
    };

    const onMouseLeave = () => {
      mouseRef.current.over = false;
      // Fade back to slow idle rotation
      angleX = 0.0012;
      angleY = 0.0012;
    };

    const onScroll = () => {
      scrollRef.current.y = window.scrollY;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      sphereRadius = Math.min(width, height) * 0.42;

      // Reset coordinates on scale
      techNodes.forEach((node, i) => {
        const k = i + 0.5;
        const phi = Math.acos(1 - (2 * k) / techNames.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * k;
        node.x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        node.y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        node.z = sphereRadius * Math.cos(phi);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    mouseRef.current.x = mouseRef.current.targetX = width / 2;
    mouseRef.current.y = mouseRef.current.targetY = height / 2;

    const render = () => {
      // Clear black background
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Smooth spotlight coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const scrollOffset = scrollRef.current.y;

      // 1. Draw glowing aurora backdrops
      const auroras = [
        { x: width * 0.15, y: height * 0.25 - scrollOffset * 0.15, rad: Math.min(width, height) * 0.6, color: "rgba(30, 58, 138, 0.15)" },
        { x: width * 0.8, y: height * 0.75 - scrollOffset * 0.15, rad: Math.min(width, height) * 0.5, color: "rgba(8, 145, 178, 0.08)" }
      ];
      auroras.forEach((b) => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.rad);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(3, 7, 18, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw standard particle dots
      particles.forEach((p) => {
        p.update();
        p.draw(ctx, scrollOffset);
      });

      // 3. Draw 3D Tag Cloud Sphere (Centered in viewport behind content)
      const cx = width / 2;
      const cy = height / 2;

      // Sort nodes by z depth
      const sortedNodes = [...techNodes].sort((a, b) => b.z - a.z);

      sortedNodes.forEach((node) => {
        // Rotate nodes
        rotateX(node, angleX);
        rotateY(node, angleY);

        const depth = 2.4 * sphereRadius;
        const scale = depth / (depth - node.z);
        const screenX = cx + node.x * scale;
        const screenY = cy + node.y * scale;

        // Opacity based on depth (z) - balanced for visibility and readability
        const rawDepth = (node.z + sphereRadius) / (2 * sphereRadius);
        const opacity = Math.max(0.1, rawDepth) * 0.22;
        const fontSize = Math.max(11, Math.floor(15 * scale));

        ctx.font = `600 ${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Optional: draw extremely faint pill container
        const textWidth = ctx.measureText(node.name).width;
        const px = 8;
        const py = 4;
        ctx.beginPath();
        ctx.roundRect(screenX - textWidth / 2 - px, screenY - fontSize / 2 - py, textWidth + px * 2, fontSize + py * 2, 6);
        ctx.fillStyle = `rgba(13, 27, 58, ${opacity * 0.35})`;
        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.15})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Add subtle glow effect for foreground tags
        if (rawDepth > 0.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(6, 182, 212, ${opacity * 0.3})`;
        }

        // Draw tag text with clean, readable color and opacity
        ctx.fillStyle = `rgba(224, 242, 254, ${opacity * 1.2})`;
        ctx.fillText(node.name, screenX, screenY);
        ctx.shadowBlur = 0; // Reset shadow after each node
      });

      // 3b. Draw connecting lines between nearby nodes for network effect (highly transparent)
      const depth = 2.4 * sphereRadius;
      for (let i = 0; i < sortedNodes.length; i++) {
        for (let j = i + 1; j < sortedNodes.length; j++) {
          const a = sortedNodes[i];
          const b = sortedNodes[j];
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
          if (dist < sphereRadius * 0.75) {
            const scaleA = depth / (depth - a.z);
            const scaleB = depth / (depth - b.z);
            const sxA = cx + a.x * scaleA;
            const syA = cy + a.y * scaleA;
            const sxB = cx + b.x * scaleB;
            const syB = cy + b.y * scaleB;
            const avgDepth = ((a.z + b.z) / 2 + sphereRadius) / (2 * sphereRadius);
            const lineOpacity = Math.max(0.015, avgDepth * 0.06);
            ctx.beginPath();
            ctx.moveTo(sxA, syA);
            ctx.lineTo(sxB, syB);
            ctx.strokeStyle = `rgba(100, 200, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // 4. Draw interactive spotlight mouse flare
      const spotlightRad = Math.min(width, height) * 0.45;
      const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, spotlightRad);
      spotGrad.addColorStop(0, "rgba(59, 130, 246, 0.05)");
      spotGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
      spotGrad.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, spotlightRad, 0, Math.PI * 2);
      ctx.fill();

      // 5. Sci-fi grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.01)";
      ctx.lineWidth = 1;
      const gridSize = 90;
      const gridShiftY = (scrollOffset * 0.1) % gridSize;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -gridSize; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y - gridShiftY);
        ctx.lineTo(width, y - gridShiftY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Noise layer overlay */}
      <div 
        className="absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
