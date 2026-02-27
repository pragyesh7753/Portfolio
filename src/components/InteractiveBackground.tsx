import { useEffect, useRef, useCallback } from 'react';

/**
 * Interactive particle constellation background.
 * - Canvas2D for performance (no extra lib)
 * - Particles drift slowly, connect with nearby particles via lines
 * - Mouse proximity causes particles to gently repel & glow
 * - Respects prefers-reduced-motion
 * - Auto-adjusts particle count by screen size
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dprRef = useRef(1);

  const getParticleCount = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) return 35;
    if (w < 1024) return 55;
    return 80;
  }, []);

  const initParticles = useCallback(
    (w: number, h: number) => {
      const count = getParticleCount();
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
      particlesRef.current = particles;
    },
    [getParticleCount]
  );

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };

    resize();

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Detect theme
    const getColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark
        ? { r: 165, g: 165, b: 180 } // light grey-blue in dark mode
        : { r: 80, g: 80, b: 110 }; // dark grey-blue in light mode
    };

    const CONNECTION_DIST = 120;
    const MOUSE_DIST = 160;
    const MOUSE_REPEL = 0.015;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const color = getColor();

      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_DIST && dist > 0) {
          const force = (1 - dist / MOUSE_DIST) * MOUSE_REPEL;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse glow
        const glowFactor = dist < MOUSE_DIST ? 1 + (1 - dist / MOUSE_DIST) * 2 : 1;
        const alpha = p.opacity * glowFactor;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * glowFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${Math.min(alpha, 0.7)})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < CONNECTION_DIST) {
            const lineAlpha = (1 - cdist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;
