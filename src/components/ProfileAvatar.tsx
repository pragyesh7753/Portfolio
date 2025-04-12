import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function ProfileAvatar({ 
  src, 
  alt, 
  size = 'lg',
  className 
}: ProfileAvatarProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse movement for dynamic lighting effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Map size to corresponding Tailwind classes
  const sizeClasses = {
    sm: 'h-28 w-28', // Increased from h-24 w-24
    md: 'h-40 w-40', // Increased from h-32 w-32
    lg: 'h-56 w-56', // Increased from h-48 w-48
    xl: 'h-80 w-80', // Increased from h-64 w-64
  };
  
  // Calculate the gradient position based on mouse position
  const calculateGradientPosition = () => {
    if (!isHovered) return '50% 50%';
    
    // Get the center of the avatar
    const element = document.getElementById('profile-avatar');
    if (!element) return '50% 50%';
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the angle of the mouse relative to the center
    const angleX = ((mousePosition.x - centerX) / (rect.width / 2)) * 30;
    const angleY = ((mousePosition.y - centerY) / (rect.height / 2)) * 30;
    
    return `${50 + angleX}% ${50 + angleY}%`;
  };
  
  // Calculate the gradient based on mouse position
  const gradientPosition = calculateGradientPosition();
  
  return (
    <motion.div
      id="profile-avatar"
      className={cn(
        'relative rounded-full overflow-hidden',
        sizeClasses[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.05 : 1, 
        transition: { duration: isHovered ? 0.3 : 0.6 } 
      }}
    >
      {/* Enhanced glow effect */}
      <motion.div 
        className="absolute -inset-4 rounded-full blur-xl"
        animate={{
          opacity: isHovered ? 0.7 : 0,
          scale: isHovered ? 1.1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at ${gradientPosition}, 
            rgba(var(--primary-rgb), 0.4) 0%, 
            rgba(56, 182, 255, 0.4) 40%, 
            rgba(124, 58, 237, 0.2) 70%, 
            rgba(0,0,0,0) 100%)`,
        }}
      />
      
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at ${gradientPosition}, rgba(56, 182, 255, 0.4) 0%, rgba(124, 58, 237, 0.15) 60%, rgba(0,0,0,0) 100%)`,
          opacity: isHovered ? 0.8 : 0.5,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      
      <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
      
      <div className="h-full w-full rounded-full p-[3px] bg-gradient-to-r from-primary/20 via-blue-400/30 to-violet-500/20">
        <motion.div 
          className="h-full w-full rounded-full overflow-hidden border border-primary/20"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}