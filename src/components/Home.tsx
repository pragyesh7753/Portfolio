import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from './ui/button';
import { ProfileAvatar } from './ProfileAvatar';

// Constants for performance optimization
const FULL_NAME = "Pragyesh Kumar Seth";
const TYPING_SPEED = { mobile: 100, desktop: 80 };
const STATS_DURATION = { mobile: 1500, desktop: 2500 };
const ANIMATION_CONFIG = {
  springConfig: { stiffness: 50, damping: 25, mass: 0.5 },
  particleCount: { mobile: 3, desktop: 6 },
  floatingCount: { mobile: 2, desktop: 4 }
};

// Memoized social links data
const SOCIAL_LINKS = [
  {
    href: "https://github.com/pragyesh7753",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>,
    label: "GitHub",
    color: "hover:text-purple-400"
  },
  {
    href: "https://www.linkedin.com/in/pragyesh77",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>,
    label: "LinkedIn",
    color: "hover:text-blue-400"
  },
  {
    href: "mailto:spragyesh86@gmail.com",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>,
    label: "Email",
    color: "hover:text-violet-400"
  }
];

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  
  const [isMobile, setIsMobile] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ projects: 0, experience: 0, technologies: 0 });
  
  // Description typewriter states
  const [descriptionText, setDescriptionText] = useState('');
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const descriptionLines = [
    { text: "I craft ", highlights: [{ word: "accessible", color: "text-blue-400" }, { word: "responsive", color: "text-violet-400" }, { word: "high-performance", color: "text-purple-400" }], ending: " web applications." },
    { text: "I build ", highlights: [{ word: "scalable", color: "text-emerald-400" }, { word: "modern", color: "text-cyan-400" }], ending: " solutions with technologies." },
    { text: "I create ", highlights: [{ word: "seamless", color: "text-pink-400" }, { word: "innovative", color: "text-orange-400" }], ending: " user experiences." },
    { text: "I transform ", highlights: [{ word: "ideas", color: "text-yellow-400" }, { word: "powerful", color: "text-red-400" }], ending: " into digital solutions." }
  ];
  
  // Mobile detection with debouncing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', debouncedCheck);
    return () => {
      window.removeEventListener('resize', debouncedCheck);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Optimized parallax effects
  const backgroundY = useTransform(scrollY, [0, 800], [0, isMobile ? 30 : 150]);
  const textY = useTransform(scrollY, [0, 600], [0, isMobile ? -15 : -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  // Mouse tracking for desktop only
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, ANIMATION_CONFIG.springConfig);
  const springY = useSpring(mouseY, ANIMATION_CONFIG.springConfig);
  
  const springXTransform = useTransform(springX, value => isMobile ? 0 : value * -0.15);
  const springYTransform = useTransform(springY, value => isMobile ? 0 : value * -0.15);
  const profileSpringX = useTransform(springX, value => isMobile ? 0 : value * 0.03);
  const profileSpringY = useTransform(springY, value => isMobile ? 0 : value * 0.03);
  
  // Optimized mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect?.width && rect?.height) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 30);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 30);
    }
  }, [mouseX, mouseY, isMobile]);

  // Name typing animation
  useEffect(() => {
    if (isInView && currentIndex < FULL_NAME.length) {
      const timer = setTimeout(() => {
        setDisplayText(FULL_NAME.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, TYPING_SPEED[isMobile ? 'mobile' : 'desktop']);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isInView, isMobile]);
  
  // Description typewriter animation
  useEffect(() => {
    if (!isInView) return;
    
    const currentLine = descriptionLines[currentLineIndex];
    const fullText = currentLine.text + currentLine.highlights.map(h => h.word).join(', ') + currentLine.ending;
    const typingSpeed = isMobile ? 50 : 40;
    const pauseTime = 2000;
    const deleteSpeed = 30;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (descriptionIndex < fullText.length) {
          let displayText = currentLine.text;
          let remainingText = fullText.slice(currentLine.text.length, descriptionIndex + 1);
          
          // Add highlights
          currentLine.highlights.forEach(highlight => {
            const regex = new RegExp(`\\b${highlight.word}\\b`, 'gi');
            displayText = displayText.replace(regex, `<span class="${highlight.color} font-bold">${highlight.word}</span>`);
            remainingText = remainingText.replace(regex, `<span class="${highlight.color} font-bold">${highlight.word}</span>`);
          });
          
          setDescriptionText(displayText + remainingText);
          setDescriptionIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (descriptionIndex > 0) {
          let displayText = currentLine.text;
          let remainingText = fullText.slice(currentLine.text.length, descriptionIndex - 1);
          
          // Add highlights
          currentLine.highlights.forEach(highlight => {
            const regex = new RegExp(`\\b${highlight.word}\\b`, 'gi');
            displayText = displayText.replace(regex, `<span class="${highlight.color} font-bold">${highlight.word}</span>`);
            remainingText = remainingText.replace(regex, `<span class="${highlight.color} font-bold">${highlight.word}</span>`);
          });
          
          setDescriptionText(displayText + remainingText);
          setDescriptionIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentLineIndex(prev => (prev + 1) % descriptionLines.length);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);
    
    return () => clearTimeout(timer);
  }, [descriptionIndex, currentLineIndex, isDeleting, isInView, isMobile, descriptionLines]);
  
  // Stats animation
  useEffect(() => {
    if (!isInView) return;
    
    const duration = STATS_DURATION[isMobile ? 'mobile' : 'desktop'];
    const steps = 50;
    const stepTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      const progress = Math.min(step / steps, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      
      setStats({
        projects: Math.floor(easeOut * 5),
        experience: Math.floor(easeOut * 1),
        technologies: Math.floor(easeOut * 10),
      });
      
      if (++step > steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [isInView, isMobile]);

  // Memoized animation variants
  const animationVariants = useMemo(() => ({
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.15
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      show: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 15
        }
      }
    }
  }), []);

  // Memoized stats data
  const statsData = useMemo(() => [
    { value: stats.projects, label: "Projects", color: "text-blue-400", delay: 0.5 },
    { value: stats.experience, label: "Years", color: "text-violet-400", delay: 0.6 },
    { value: stats.technologies, label: "Technologies", color: "text-purple-400", delay: 0.7 }
  ], [stats]);

  const handleContactClick = useCallback(() => {
    try {
      window.history.pushState({}, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch {
      window.location.href = '/contact';
    }
  }, []);

  // Memoized particle positions
  const particleCount = ANIMATION_CONFIG.particleCount[isMobile ? 'mobile' : 'desktop'];
  const particlePositions = useMemo(() => 
    Array.from({ length: particleCount }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  , [particleCount]);

  const floatingCount = ANIMATION_CONFIG.floatingCount[isMobile ? 'mobile' : 'desktop'];
  const floatingPositions = useMemo(() => 
    Array.from({ length: floatingCount }, (_, i) => ({
      top: 25 + (i * 20),
      left: 20 + (i * 15),
    }))
  , [floatingCount]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="flex items-center justify-center w-full min-h-screen relative overflow-hidden"
      role="main"
      aria-label="Home page"
    >
      {/* Optimized animated background */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/70 to-violet-50/50 dark:from-slate-950 dark:via-blue-950/40 dark:to-violet-950/25" />
        
        {/* Gradient orbs - conditional rendering */}
        {!isMobile ? (
          <>
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 0.9, 1],
                rotate: [0, 180, 360],
                x: [0, 25, -15, 0],
                y: [0, -20, 10, 0]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/6 left-1/6 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-200/35 via-cyan-200/25 to-purple-200/30 dark:from-blue-400/15 dark:via-cyan-500/10 dark:to-purple-600/15 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [0.9, 1.2, 1, 1.05, 0.9],
                rotate: [360, 180, 0],
                x: [0, -35, 20, 0],
                y: [0, 15, -25, 0]
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-1/6 right-1/6 w-56 h-56 lg:w-72 lg:h-72 bg-gradient-to-r from-violet-200/25 via-fuchsia-200/15 to-pink-200/25 dark:from-violet-400/12 dark:via-fuchsia-500/8 dark:to-pink-600/12 rounded-full blur-3xl"
            />
          </>
        ) : (
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.25, 0.4, 0.25]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8 bg-gradient-to-br from-blue-200/25 via-violet-200/15 to-purple-200/20 dark:from-blue-400/12 dark:via-violet-500/8 dark:to-purple-600/10 rounded-full blur-2xl"
          />
        )}
        
        {/* Floating shapes - desktop only */}
        {!isMobile && (
          <>
            <motion.div 
              style={{ x: springX, y: springY }}
              animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
              transition={{ 
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-1/5 right-1/4 w-14 h-14 lg:w-18 lg:h-18 bg-gradient-to-br from-emerald-200/12 to-teal-300/15 dark:from-emerald-400/5 dark:to-teal-600/6 rounded-lg backdrop-blur-sm border border-white/8"
            />
            <motion.div 
              style={{ x: springXTransform, y: springYTransform }}
              animate={{ rotate: [360, 0], scale: [0.9, 1.15, 1, 0.9] }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
              }}
              className="absolute bottom-1/4 left-1/3 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-200/15 via-red-200/12 to-pink-300/15 dark:from-orange-400/6 dark:via-red-500/5 dark:to-pink-600/6 rounded-xl backdrop-blur-sm border border-white/8"
            />
          </>
        )}
        
        {/* Optimized particles */}
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-300/35 to-violet-300/35 dark:from-blue-400/25 dark:to-violet-500/25 rounded-full"
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Floating elements - desktop only */}
        {!isMobile && floatingPositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gradient-to-r from-cyan-300/50 to-blue-300/50 dark:from-cyan-400/35 dark:to-blue-500/35 rounded-full"
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
              x: springX,
              y: springY,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
        
        {/* Grid overlay */}
        <motion.div 
          animate={{ opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-15 dark:opacity-8"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '25px 25px' : '35px 35px',
          }}
        />
        
        {/* Theme overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/15 via-transparent to-white/8 dark:from-background/12 dark:via-transparent dark:to-background/6" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/25 via-transparent to-purple-50/15 dark:from-blue-950/15 dark:via-transparent dark:to-purple-950/12" />
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
          <motion.div 
            ref={heroRef}
            style={{ y: textY, willChange: 'transform' }}
            className="text-left order-2 md:order-1"
            initial="hidden"
            animate="show"
            variants={animationVariants.container}
          >
            {/* Badge */}
            <motion.div 
              variants={animationVariants.item} 
              className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-primary text-xs font-medium shadow-xl"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ willChange: 'transform' }}
            >
              <motion.svg 
                className="h-3 w-3 sm:h-4 sm:w-4"
                viewBox="0 0 24 24"
                fill="none"
                animate={!isMobile ? { rotate: 360 } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <path 
                  d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" 
                  fill="currentColor"
                  className="text-blue-400"
                />
              </motion.svg>
              <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent font-semibold">
                Full Stack Developer
              </span>
              <motion.svg 
                className="h-3 w-3 sm:h-4 sm:w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={!isMobile ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <polyline points="16,18 22,12 16,6" />
                <polyline points="8,6 2,12 8,18" />
              </motion.svg>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              variants={animationVariants.item} 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 tracking-tight leading-none"
            >
              <span className="block text-foreground/90">
                Hi, I'm {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-blue-400 to-violet-500 ml-1 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Description with typewriter effect */}
            <motion.div 
              variants={animationVariants.item} 
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-xl lg:max-w-2xl leading-relaxed min-h-[3.5rem] sm:min-h-[4rem] lg:min-h-[4.5rem]"
            >
              <span className="inline-block">
                <span dangerouslySetInnerHTML={{ __html: descriptionText }} />
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 sm:h-6 lg:h-7 bg-gradient-to-b from-blue-400 to-violet-500 ml-1 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </motion.div>

            {/* Stats section */}
            <motion.div 
              variants={animationVariants.item} 
              className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
            >
              {statsData.map((stat) => (
                <motion.div 
                  key={stat.label}
                  className="text-center relative"
                  whileHover={!isMobile ? { scale: 1.05, y: -3 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -90 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                    transition={{ delay: stat.delay, type: "spring", stiffness: 150, damping: 15 }}
                    className={`text-xl sm:text-2xl lg:text-3xl font-black ${stat.color} mb-1`}
                  >
                    {stat.value}+
                  </motion.div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  <motion.div
                    className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 h-0.5 ${stat.color.replace('text-', 'bg-')} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: stat.delay + 0.3, duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={animationVariants.item} className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.div
                whileHover={!isMobile ? { scale: 1.03, y: -1 } : {}}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Button
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-600 to-purple-600 hover:from-blue-600 hover:via-violet-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 h-auto text-sm sm:text-base font-semibold rounded-lg shadow-lg border-0"
                  onClick={handleContactClick}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Let's Connect
                    <motion.svg
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={!isMobile ? { x: [0, 1, 0] } : {}}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </motion.svg>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={!isMobile ? { scale: 1.03, y: -1 } : {}}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Button
                  variant="outline"
                  className="relative overflow-hidden bg-white/4 backdrop-blur-xl border-white/15 hover:bg-white/8 px-4 sm:px-6 py-2 sm:py-3 h-auto text-sm sm:text-base font-semibold rounded-lg shadow-lg"
                  asChild
                >
                  <a href="https://drive.google.com/uc?export=download&id=1KRP-GpppEy2Y4KxnMvrICDAC9Pu6xs6I" download="Pragyesh_Kumar_Seth_Resume.pdf">
                    <span className="flex items-center gap-1.5">
                      <motion.svg
                        className="h-3 w-3 sm:h-4 sm:w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={!isMobile ? { y: [0, -1, 0] } : {}}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </motion.svg>
                      Download Resume
                    </span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={animationVariants.item} className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`relative p-2 sm:p-2.5 rounded-lg bg-white/4 backdrop-blur-xl border border-white/8 text-muted-foreground ${social.color} transition-all duration-300 shadow-lg`}
                  whileHover={!isMobile ? { 
                    scale: 1.08, 
                    y: -3,
                    rotateZ: 2
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.5 + index * 0.08,
                    type: "spring", 
                    stiffness: 250, 
                    damping: 20 
                  }}
                >
                  <span className="relative z-10 block">
                    <div className="h-4 w-4 sm:h-5 sm:w-5">
                      {social.icon}
                    </div>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile section */}
          <div className="flex justify-center md:justify-end items-center order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 120 }}
              className="relative"
              style={{ x: profileSpringX, y: profileSpringY, willChange: 'transform' }}
            >
              {/* Simplified rotating rings for mobile */}
              {!isMobile ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-6 sm:-inset-10 lg:-inset-14 rounded-full bg-gradient-to-r from-blue-500/20 via-transparent to-violet-500/20 blur-2xl"
                    style={{ willChange: 'transform' }}
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 sm:-inset-8 lg:-inset-12 rounded-full bg-gradient-to-r from-violet-500/15 via-transparent to-purple-500/15 blur-xl"
                    style={{ willChange: 'transform' }}
                  />
                </>
              ) : (
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 via-violet-500/15 to-purple-500/20 blur-xl"
                  style={{ willChange: 'transform' }}
                />
              )}
              
              {/* Profile avatar */}
              <motion.div
                className="relative p-2 rounded-full bg-white/8 backdrop-blur-xl border border-white/15 shadow-lg"
                whileHover={!isMobile ? { scale: 1.03 } : {}}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <ProfileAvatar 
                  src="/dp.png"
                  alt="Pragyesh Kumar Seth" 
                  size="xl"
                  className="shadow-lg ring-3 sm:ring-4 ring-white/15 relative z-10 rounded-full w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, isMobile ? -8 : -12, 0],
                  rotate: [0, isMobile ? 6 : 10, 0],
                  scale: [1, isMobile ? 1.03 : 1.08, 1]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-400 to-violet-500 rounded-lg shadow-lg flex items-center justify-center"
              >
                <span className="text-white text-xs sm:text-sm">⚡</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, isMobile ? 6 : 10, 0],
                  rotate: [0, isMobile ? -6 : -10, 0],
                  scale: [1, isMobile ? 1.05 : 1.12, 1]
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-1 sm:-bottom-2 -left-3 sm:-left-4 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg shadow-lg flex items-center justify-center"
              >
                <span className="text-white text-xs sm:text-sm">🚀</span>
              </motion.div>
              
              {/* Floating particles */}
              {Array.from({ length: 4 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full pointer-events-none"
                  style={{
                    top: `${50 + Math.sin((i / 4) * 2 * Math.PI) * 45}%`,
                    left: `${50 + Math.cos((i / 4) * 2 * Math.PI) * 45}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
