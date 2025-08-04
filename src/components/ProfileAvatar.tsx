import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'h-28 w-28',
  md: 'h-40 w-40', 
  lg: 'h-56 w-56',
  xl: 'h-80 w-80'
};

export function ProfileAvatar({ src, alt, size = 'lg', className }: ProfileAvatarProps) {
  return (
    <motion.div
      className={cn('relative group', sizes[size], className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-blue-400/30 to-violet-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
      
      <div className="relative h-full w-full rounded-full p-1 bg-gradient-to-r from-primary/40 via-blue-400/40 to-violet-500/40">
        <div className="h-full w-full rounded-full overflow-hidden bg-background border border-primary/20">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}