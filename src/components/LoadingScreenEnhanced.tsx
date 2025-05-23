import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Code2, Rocket, Sparkles, Terminal, Coffee } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreenEnhanced = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const fullName = "Pragyesh Kumar Seth";
  const title = "Full Stack Developer";
  const loadingPhases = [
    { icon: Terminal, text: "Initializing workspace...", color: "from-blue-400 to-cyan-500" },
    { icon: Code2, text: "Loading components...", color: "from-violet-400 to-purple-500" },
    { icon: Coffee, text: "Brewing perfect code...", color: "from-amber-400 to-orange-500" },
    { icon: Rocket, text: "Preparing for launch...", color: "from-green-400 to-emerald-500" },
    { icon: Sparkles, text: "Almost ready!", color: "from-pink-400 to-rose-500" }
  ];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  // Progress and phase management
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        
        // Update phase based on progress
        const phase = Math.floor((newProgress / 100) * loadingPhases.length);
        setCurrentPhase(Math.min(phase, loadingPhases.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          if (onLoadingComplete) {
            setTimeout(onLoadingComplete, 500);
          }
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [loadingPhases.length, onLoadingComplete]);

  // Typing animation for name
  useEffect(() => {
    if (progress > 20) {
      const timer = setTimeout(() => {
        if (currentTextIndex < fullName.length) {
          setDisplayText(fullName.slice(0, currentTextIndex + 1));
          setCurrentTextIndex(prev => prev + 1);
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentTextIndex, fullName, progress]);

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 30;
      const y = (e.clientY - rect.top - rect.height / 2) / 30;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay
              }}
            />
          ))}
          
          {/* Gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-500/20 to-pink-600/20 rounded-full blur-3xl"
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600 p-1"
              >
                <div className="w-20 h-20 bg-slate-900 rounded-full" />
              </motion.div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-violet-600 flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Code2 className="h-8 w-8 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Name with typing effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-1 h-12 bg-gradient-to-b from-blue-400 to-violet-500 ml-2"
            />
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            {title}
          </motion.p>

          {/* Loading phase with icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={cn(
                    "p-3 rounded-full bg-gradient-to-r",
                    loadingPhases[currentPhase]?.color || "from-blue-400 to-violet-500"
                  )}
                >
                  {loadingPhases[currentPhase] && (
                    <div className="h-6 w-6 text-white">
                      {/* Fix: Properly render the icon component with correct typing */}
                      {(() => {
                        const IconComponent = loadingPhases[currentPhase].icon;
                        return <IconComponent className="h-6 w-6 text-white" />;
                      })()}
                    </div>
                  )}
                </motion.div>
                <span className="text-lg text-gray-300">
                  {loadingPhases[currentPhase]?.text || "Loading..."}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Enhanced progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-600/30">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600 rounded-full relative overflow-hidden"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  animate={{ x: [-20, 120] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
            
            {/* Progress percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="mt-4 text-center"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </motion.div>

          {/* Fun loading messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="mt-8 text-sm text-gray-400"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={Math.floor(progress / 25)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {progress < 25 && "Setting up the digital canvas..."}
                {progress >= 25 && progress < 50 && "Configuring the magic framework..."}
                {progress >= 50 && progress < 75 && "Optimizing user experience..."}
                {progress >= 75 && progress < 100 && "Finalizing the masterpiece..."}
                {progress >= 100 && "Welcome to my digital world!"}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreenEnhanced;
