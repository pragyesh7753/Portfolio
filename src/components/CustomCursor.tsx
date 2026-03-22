import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor with:
 * - Smooth trailing dot + outer ring
 * - Scales up on hoverable elements
 * - Text label on specific elements
 * - Blends with content via mix-blend-mode
 * - Hidden on touch devices
 */

const SPRING_CONFIG = { stiffness: 500, damping: 35, mass: 0.3 };
const SPRING_RING = { stiffness: 150, damping: 20, mass: 0.5 };

const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, SPRING_RING);
  const ringY = useSpring(dotY, SPRING_RING);
  const dotSpringX = useSpring(dotX, SPRING_CONFIG);
  const dotSpringY = useSpring(dotY, SPRING_CONFIG);
  const scale = useMotionValue(1);
  const ringScale = useSpring(scale, { stiffness: 300, damping: 25 });
  const isTouchRef = useRef(false);
  const visibleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    },
    [dotX, dotY]
  );

  useEffect(() => {
    const checkTouch = () => {
      isTouchRef.current = true;
      if (visibleRef.current) visibleRef.current.style.display = 'none';
    };
    window.addEventListener('touchstart', checkTouch, { once: true, passive: true });

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchRef.current = true;
      return;
    }

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', handleMove, { passive: true });

    // Scale + label on hoverable elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      );
      if (hoverable) {
        scale.set(2.2);
        // Show label if data-cursor-label is set
        const label = (hoverable as HTMLElement).getAttribute('data-cursor-label');
        if (label && labelRef.current) {
          labelRef.current.textContent = label;
          labelRef.current.style.opacity = '1';
        }
      }
    };
    const handleOut = () => {
      scale.set(1);
      if (labelRef.current) {
        labelRef.current.style.opacity = '0';
      }
    };

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    const handleDown = () => scale.set(0.7);
    const handleUp = () => scale.set(1);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    const handleLeave = () => {
      dotX.set(-100);
      dotY.set(-100);
    };
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchstart', checkTouch);
    };
  }, [handleMove, dotX, dotY, scale]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div ref={visibleRef} className="hidden md:block">
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScale,
        }}
      >
        <div className="w-8 h-8 rounded-full border border-white/30" />
        {/* Label */}
        <span
          ref={labelRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[9px] font-mono text-white uppercase tracking-wider whitespace-nowrap transition-opacity duration-200"
          style={{ opacity: 0 }}
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
