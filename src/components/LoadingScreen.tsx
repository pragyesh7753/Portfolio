import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const fullName = "Pragyesh Kumar Seth";
  const title = "Full Stack Developer";
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Slower progress for more animation time
      });
    }, 80);

    // Add mouse move effect for 3D perspective
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Staggered text animation


  // Dynamic pattern animation


  // Enhanced particle effect
  const particleVariants = (i: number, total: number) => ({
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      x: Math.cos(2 * Math.PI * (i / total)) * (80 + Math.random() * 50),
      y: Math.sin(2 * Math.PI * (i / total)) * (80 + Math.random() * 50),
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      }
    },
  });

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.2, 0.65, 0.3, 0.9],
        }
      }}
    >
      {/* Enhanced background with grid effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute right-1/3 top-1/4 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute left-1/2 top-1/2 w-2 h-2 rounded-full",
              i % 3 === 0 ? "bg-blue-400/60" : 
              i % 3 === 1 ? "bg-violet-400/60" : "bg-indigo-400/60"
            )}
            variants={particleVariants(i, 20)}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>

      {/* Main content with 3D effect */}
      <motion.div 
        ref={containerRef}
        className="relative flex flex-col items-center z-10"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: -mousePosition.y,
          rotateY: mousePosition.x,
        }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 15,
          mass: 0.5
        }}
      >
        {/* Enhanced logo mark animation */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            transition: { duration: 0.8, delay: 0.1, type: "spring" }
          }}
        >
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20 dark:shadow-blue-800/20">
            <div className="text-5xl font-bold text-white">P</div>
          </div>
          
          {/* Multiple pulse rings */}
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="absolute inset-0 rounded-full border border-primary/20"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [1, 1 + (i * 0.3)],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-blue-400 shadow-md shadow-blue-500/50"
            animate={{
              x: [0, 40, 0, -40, 0],
              y: [40, 0, -40, 0, 40],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Name with enhanced animated letters */}
        <motion.div
          className="flex flex-col items-center mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.8,
              },
            },
          }}
        >
          <motion.h1 className="text-4xl sm:text-6xl font-bold mb-3 tracking-tighter overflow-hidden">
            {fullName.split('').map((char, index) => (
              <motion.span
                key={index}
                className={cn(
                  "inline-block",
                  char === " " ? "mr-2" : "",
                  index === 0 || index === 9 || index === 15 ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500" : ""
                )}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 40, 
                    rotateX: -90,
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    transition: {
                      type: "spring", 
                      stiffness: 200, 
                      damping: 12
                    }
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            className="h-px w-48 bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-3"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: 1, 
              opacity: 1,
              transition: { delay: 1.5, duration: 1 }
            }}
          />
          
          <motion.p 
            className="text-lg text-muted-foreground tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 1.6, duration: 0.8 }
            }}
          >
            {title}
          </motion.p>
        </motion.div>

        {/* Enhanced progress bar */}
        <div className="relative w-56 sm:w-72 h-1.5 bg-primary/10 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-400 via-violet-500 to-blue-400"
            style={{ backgroundSize: "200% 100%" }}
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ["0% center", "100% center"],
            }}
            transition={{ 
              width: { duration: 0.5 },
              backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ 
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Loading text with enhanced animation */}
        <motion.p 
          className="mt-4 text-sm text-muted-foreground flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Loading</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              className="inline-block overflow-hidden w-2"
              animate={{ 
                y: [0, -5, 0], 
                opacity: [0.3, 1, 0.3],
                color: i === 0 ? ["#60a5fa", "#8b5cf6"] : i === 1 ? ["#8b5cf6", "#60a5fa"] : ["#818cf8", "#60a5fa"]
              }}
              transition={{
                y: { duration: 0.6, repeat: Infinity, delay: i * 0.2 },
                opacity: { duration: 0.6, repeat: Infinity, delay: i * 0.2 },
                color: { duration: 3, repeat: Infinity, delay: i * 0.2 }
              }}
            >
              .
            </motion.span>
          ))}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
