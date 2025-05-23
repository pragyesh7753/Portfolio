import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  angle: number;
  pulse: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
}

const ParticlesBackgroundEnhanced = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { theme } = useTheme();
  
  // Optimized draw function
  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    // Clear canvas with fade effect for trails
    ctx.fillStyle = theme === 'dark' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(248, 250, 252, 0.05)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    particles.forEach(particle => {
      // Draw particle trail
      particle.trail.forEach((point, index) => {
        const trailOpacity = point.opacity * (index / particle.trail.length) * 0.3;
        ctx.fillStyle = `${particle.color}${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw main particle with pulsing effect
      const pulseFactor = Math.sin(particle.pulse) * 0.3 + 0.7;
      const currentSize = particle.size * pulseFactor;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, currentSize * 3
      );
      gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${particle.color}00`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Main particle
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [theme]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Performance optimization
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles with enhanced properties
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 60); // Optimized count
    
    const colors = theme === 'dark' 
      ? ['#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#06b6d4'] 
      : ['#3b82f6', '#6366f1', '#8b5cf6', '#0ea5e9', '#10b981'];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        pulse: Math.random() * Math.PI * 2,
        trail: []
      });
    }
    
    // Animation loop
    const animate = () => {
      drawParticles(ctx, particles);
      
      // Update particles
      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > 5) {
          particle.trail.shift();
        }
        
        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
        
        // Update pulse animation
        particle.pulse += 0.01;
      }
      
      // Connect particles with lines
      connectParticles(ctx, particles, canvas.width, canvas.height);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, drawParticles]);
  
  // Function to connect particles with lines
  const connectParticles = (
    ctx: CanvasRenderingContext2D, 
    particles: Particle[], 
    width: number, 
    height: number
  ) => {
    const maxDistance = Math.min(width, height) * 0.07; // Responsive connection distance
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / maxDistance);
          
          // Draw line between particles
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `${particles[i].color}${Math.floor(opacity * 20).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default ParticlesBackgroundEnhanced;
