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
    sm: 'h-24 w-24',
    md: 'h-32 w-32',
    lg: 'h-48 w-48',
    xl: 'h-64 w-64',
  };
  
  // Calculate the gradient position based on mouse position
  const calculateGradientPosition = () => {
    if (!isHovered) return '0% 0%';
    
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
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
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
        <div className="h-full w-full rounded-full overflow-hidden border border-primary/20">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}