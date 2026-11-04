import { useEffect, useRef } from "react";
import { isVerySmallScreen, isMobileDevice, prefersReducedMotion, getOptimalParticleCount } from "../../utils/mobileAnimations";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Requirement 15.4 & 15.9: Respect reduced motion preferences and disable on very small screens (<480px)
    if (prefersReducedMotion() || isVerySmallScreen()) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 120 };
    const isMobile = isMobileDevice();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Disable mouse tracking on mobile to reduce processing
      if (!isMobile) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Requirement 15.4: Reduce animation complexity by 50% on mobile (<768px)
    // Calculate optimal particle count based on screen size
    let particleCount = getOptimalParticleCount(width, height);
    let particles: Particle[] = [];

    function initParticles() {
      particles = [];
      particleCount = getOptimalParticleCount(width, height);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.5 + 1,
          baseAlpha: Math.random() * 0.2 + 0.1,
          alpha: Math.random() * 0.2 + 0.1,
        });
      }
    }

    initParticles();

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const rgb = isDark ? "56, 189, 248" : "37, 99, 235";

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // On mobile: reduce mouse interaction complexity
        if (!isMobile) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 0.6;
            p1.x -= (dx / dist) * force;
            p1.y -= (dy / dist) * force;
            p1.alpha = Math.min(p1.baseAlpha + 0.3, 0.6);
          } else {
            p1.alpha += (p1.baseAlpha - p1.alpha) * 0.05;
          }
        } else {
          // Mobile: simpler alpha updates
          p1.alpha += (p1.baseAlpha - p1.alpha) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p1.alpha})`;
        ctx.fill();

        // On mobile: skip drawing connection lines to reduce complexity
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distNodes = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (distNodes < 100) {
              const lineAlpha = (1 - distNodes / 100) * (isDark ? 0.09 : 0.05);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
