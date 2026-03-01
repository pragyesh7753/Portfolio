import { memo } from 'react';

/**
 * Lightweight CSS-only aurora background.
 * Uses GPU-accelerated CSS animations — no Canvas, no JS per-frame work.
 * Three gradient orbs with slow drift animations for a living, breathing feel.
 */
const InteractiveBackground = memo(() => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Primary aurora orb — indigo/violet */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 dark:opacity-[0.12] blur-[120px] animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)',
          top: '-10%',
          left: '-5%',
        }}
      />
      {/* Secondary orb — cyan/teal */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 dark:opacity-[0.08] blur-[100px] animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.7) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)',
          top: '40%',
          right: '-10%',
        }}
      />
      {/* Third orb — pink/rose accent */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-[0.07] blur-[100px] animate-aurora-3"
        style={{
          background: 'radial-gradient(circle, rgba(244,114,182,0.6) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)',
          bottom: '-5%',
          left: '30%',
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
});

InteractiveBackground.displayName = 'InteractiveBackground';
export default InteractiveBackground;
