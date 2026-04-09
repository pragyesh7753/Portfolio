import { memo } from 'react';

/**
 * Animated mesh gradient background with noise texture overlay.
 * Pure CSS — no Canvas, no JS per-frame work.
 * Three gradient orbs with slow drift + dot grid + noise.
 */
const InteractiveBackground = memo(() => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Primary orb — violet/purple */}
      <div
        className="absolute w-225 h-225 rounded-full opacity-20 dark:opacity-[0.10] blur-[140px] animate-aurora-1"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--accent-violet-rgb),0.8) 0%, rgba(var(--primary-rgb),0.4) 50%, transparent 70%)',
          top: '-15%',
          left: '-10%',
        }}
      />
      {/* Secondary orb — cyan/blue */}
      <div
        className="absolute w-175 h-175 rounded-full opacity-15 dark:opacity-[0.07] blur-[120px] animate-aurora-2"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--accent-cyan-rgb),0.7) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)',
          top: '35%',
          right: '-12%',
        }}
      />
      {/* Third orb — rose/pink */}
      <div
        className="absolute w-150 h-150 rounded-full opacity-12 dark:opacity-[0.06] blur-[120px] animate-aurora-3"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--accent-rose-rgb),0.5) 0%, rgba(var(--accent-violet-rgb),0.2) 50%, transparent 70%)',
          bottom: '-10%',
          left: '25%',
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
});

InteractiveBackground.displayName = 'InteractiveBackground';
export default InteractiveBackground;
