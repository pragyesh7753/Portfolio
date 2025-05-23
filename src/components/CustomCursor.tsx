import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface MagneticElement {
  element: Element;
  rect: DOMRect;
}

const CustomCursor = () => {
  // Motion values for smoother animations
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring physics for main cursor for more natural movement
  const springConfig = { damping: 25, stiffness: 300 };
  const mainCursorX = useSpring(cursorX, springConfig);
  const mainCursorY = useSpring(cursorY, springConfig);
  
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [trailPositions, setTrailPositions] = useState<Position[]>([]);
  const [magneticElement, setMagneticElement] = useState<MagneticElement | null>(null);
  
  const rafId = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  
  // Check if we should render the custom cursor
  const shouldRenderCursor = useMemo(() => {
    // Early return if we're in SSR
    if (typeof window === 'undefined') return false;
    // No custom cursor on touch devices
    return !window.matchMedia("(pointer: coarse)").matches;
  }, []);
  
  // Find interactive elements for magnetic effect
  const findInteractiveElements = useCallback(() => {
    return Array.from(document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], input[type="button"], .interactive-element'
    ));
  }, []);
  
  // Update cursor position with requestAnimationFrame for better performance
  const updatePosition = useCallback((e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cursorX.set(mouseX);
    cursorY.set(mouseY);
      // Throttle finding interactive elements to improve performance
    const now = Date.now();
    if (now - lastUpdateTime.current > 150) { // Increased to 150ms for better performance
      // Check for magnetic elements - simplified logic
      const interactiveElements = findInteractiveElements();
      let closestElement: MagneticElement | null = null;
      let closestDistance = 80; // Reduced magnetic range for performance
      
      // Limit the number of elements to check
      for (let i = 0; i < Math.min(interactiveElements.length, 10); i++) {
        const element = interactiveElements[i];
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const distance = Math.hypot(mouseX - elementCenterX, mouseY - elementCenterY);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = { element, rect };
        }
      }
      
      setMagneticElement(closestElement);
      
      // Update cursor type based on hovered elements
      const hoveredElement = document.querySelector(
        'a:hover, button:hover, [role="button"]:hover, input:hover, label:hover, textarea:hover, select:hover'
      );
      setIsPointer(!!hoveredElement);
      
      // Save the time for both operations
      lastUpdateTime.current = now;    }
    
    // Optimized trail with reduced frequency
    if (now - lastUpdateTime.current <= 50) { // Reduced trail update frequency
      setTrailPositions(prev => {
        const newPositions = [...prev, { x: mouseX, y: mouseY }];
        return newPositions.slice(-6); // Reduced trail length for performance
      });
    }
  }, [cursorX, cursorY, findInteractiveElements]);
  
  const animateFrame = useCallback(() => {
    // Apply magnetic effect if needed
    if (magneticElement) {
      const rect = magneticElement.rect;
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Get current cursor position
      const currentX = cursorX.get();
      const currentY = cursorY.get();
      
      // Calculate distance
      const distanceX = elementCenterX - currentX;
      const distanceY = elementCenterY - currentY;
      const distance = Math.hypot(distanceX, distanceY);
      
      if (distance < 100) {
        // Apply magnetic pull, stronger as cursor gets closer
        const pull = (100 - distance) / 100;
        const pullX = distanceX * pull * 0.3;
        const pullY = distanceY * pull * 0.3;
        
        mainCursorX.set(currentX + pullX);
        mainCursorY.set(currentY + pullY);
      }
    }
    
    rafId.current = requestAnimationFrame(animateFrame);
  }, [cursorX, cursorY, magneticElement, mainCursorX, mainCursorY]);
  
  const handleMouseDown = useCallback(() => setIsActive(true), []);
  const handleMouseUp = useCallback(() => setIsActive(false), []);
  const handleMouseLeave = useCallback(() => setIsHidden(true), []);
  const handleMouseEnter = useCallback(() => setIsHidden(false), []);
  
  useEffect(() => {
    if (!shouldRenderCursor) return;
    
    // Start animation frame loop
    rafId.current = requestAnimationFrame(animateFrame);
    
    // Add event listeners
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      // Clean up
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [updatePosition, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter, shouldRenderCursor, animateFrame]);
  
  // Don't render anything if we shouldn't show the custom cursor
  if (!shouldRenderCursor) return null;
  
  return (
    <>
      {/* Main cursor ring with glow effect */}
      <motion.div 
        className="cursor-main"
        style={{
          x: mainCursorX,
          y: mainCursorY,
          position: 'fixed',
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid hsla(var(--primary), 0.8)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHidden ? 0 : isPointer ? 1.5 : isActive ? 0.8 : 1,
          opacity: isHidden ? 0 : 1,
          borderColor: isActive ? 'hsla(var(--primary), 0.9)' : isPointer ? 'hsla(var(--primary), 0.8)' : 'hsla(var(--primary), 0.7)',
        }}
        transition={{
          scale: {
            type: 'spring',
            stiffness: 400,
            damping: 20
          },
          opacity: {
            duration: 0.2
          }
        }}
      />
      
      {/* Cursor dot */}
      <motion.div 
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--primary))',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isActive ? 1.8 : isPointer ? 1.4 : 1,
          opacity: isHidden ? 0 : 1,
          backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--primary))',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 20
        }}
      />
      
      {/* Trail effect - more dots with better fade */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            top: -3,
            left: -3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            pointerEvents: 'none',
            zIndex: 9998,
            x: pos.x,
            y: pos.y,
          }}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{
            opacity: 0.5 - (index * 0.06),
            scale: 0.8 - (index * 0.08),
          }}
          transition={{
            duration: 0.05
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
