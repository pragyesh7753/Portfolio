import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from './ui/button';
import { ProfileAvatar } from './ProfileAvatar';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  
  // Enhanced parallax effects
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 600], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Transform values for style usage
  const springXTransform = useTransform(springX, value => value * -0.5);
  const springYTransform = useTransform(springY, value => value * -0.5);
  const profileSpringX = useTransform(springX, value => value * 0.1);
  const profileSpringY = useTransform(springY, value => value * 0.1);
  
  // Typing animation state
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullName = "Pragyesh Kumar Seth";
  
  // Enhanced stats animation
  const [stats, setStats] = useState({ projects: 0, experience: 0, technologies: 0 });
  
  // Mouse move handler for interactive effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
    }
  };

  useEffect(() => {
    if (isInView && currentIndex < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullName.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 80);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullName, isInView]);
  
  useEffect(() => {
    if (isInView) {
      const duration = 2500;
      const steps = 60;
      const stepTime = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setStats({
          projects: Math.floor(easeOut * 5),
          experience: Math.floor(easeOut * 1),
          technologies: Math.floor(easeOut * 10),
        });
        
        step++;
        if (step > steps) clearInterval(timer);
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingItem = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const socialLinks = [
    { 
      href: "https://github.com/pragyesh7753", 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      label: "GitHub", 
      color: "hover:text-purple-400",
      hoverColor: "hover:bg-purple-500/20"
    },
    { 
      href: "https://www.linkedin.com/in/pragyesh77", 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: "LinkedIn", 
      color: "hover:text-blue-400",
      hoverColor: "hover:bg-blue-500/20"
    },
    { 
      href: "mailto:spragyesh86@gmail.com", 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "Email", 
      color: "hover:text-violet-400",
      hoverColor: "hover:bg-violet-500/20"
    }
  ];

  const statsData = [
    { value: stats.projects, label: "Projects", color: "text-blue-400", delay: 0.5 },
    { value: stats.experience, label: "Years", color: "text-violet-400", delay: 0.6 },
    { value: stats.technologies, label: "Technologies", color: "text-purple-400", delay: 0.7 }
  ];

  const handleContactClick = () => {
    window.history.pushState({}, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="flex items-center justify-center w-full min-h-screen relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0"
      >
        {/* Background gradients */}
        <div className="absolute top-10 left-1/6 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/6 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-violet-400/15 to-pink-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-to-r from-cyan-400/12 to-blue-600/12 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Floating elements */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-1/4 right-1/4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-emerald-400/6 to-teal-600/6 rounded-full blur-2xl"
          animate={floatingItem.animate}
        />
        <motion.div 
          style={{ x: springXTransform, y: springYTransform }}
          className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-orange-400/8 to-red-600/8 rounded-full blur-2xl"
          animate={{
            ...floatingItem.animate,
            transition: { ...floatingItem.animate.transition, delay: 1 }
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <motion.div 
            ref={heroRef}
            style={{ y: textY }}
            className="text-left order-2 md:order-1"
            initial="hidden"
            animate="show"
            variants={container}
          >
            {/* Badge */}
            <motion.div 
              variants={item} 
              className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-primary text-xs font-medium shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Sparkle icon */}
              <motion.svg 
                className="h-3 w-3 sm:h-4 sm:w-4"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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
              {/* Code icon */}
              <motion.svg 
                className="h-3 w-3 sm:h-4 sm:w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <polyline points="16,18 22,12 16,6" />
                <polyline points="8,6 2,12 8,18" />
              </motion.svg>
            </motion.div>

            {/* Main heading */}
            <motion.h1 variants={item} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 tracking-tight leading-none">
              <span className="block text-foreground/90">Hi, I'm {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-0.5 h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-blue-400 to-violet-500 ml-1 rounded-full"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={item} className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-xl lg:max-w-2xl leading-relaxed">
              I craft{' '}
              <motion.span 
                className="text-blue-400 font-bold relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                accessible
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                />
              </motion.span>,{' '}
              <motion.span 
                className="text-violet-400 font-bold relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                responsive
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                />
              </motion.span> and{' '}
              <motion.span 
                className="text-purple-400 font-bold relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                high-performance
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                />
              </motion.span>{' '}
              web applications.
            </motion.p>

            {/* Stats section */}
            <motion.div 
              variants={item} 
              className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              {statsData.map((stat) => (
                <motion.div 
                  key={stat.label}
                  className="text-center relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ delay: stat.delay, type: "spring", stiffness: 200, damping: 15 }}
                    className={`text-xl sm:text-2xl lg:text-3xl font-black ${stat.color} mb-1`}
                  >
                    {stat.value}+
                  </motion.div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  <motion.div
                    className={`absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 h-0.5 ${stat.color.replace('text-', 'bg-')} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: stat.delay + 0.5, duration: 0.5 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-violet-600 to-purple-600 hover:from-blue-600 hover:via-violet-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 h-auto text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-2xl border-0"
                  onClick={handleContactClick}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg sm:rounded-xl blur-xl opacity-50"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    Let's Connect
                    <motion.svg
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </motion.svg>
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  variant="outline"
                  className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 px-4 sm:px-6 py-2 sm:py-3 h-auto text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-xl"
                  asChild
                >
                  <a
                    href="/resume.pdf"
                    download="Pragyesh_Kumar_Seth_Resume.pdf"
                  >
                    <span className="flex items-center gap-1 sm:gap-2">
                      <motion.svg
                        className="h-3 w-3 sm:h-4 sm:w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
            <motion.div variants={item} className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground ${social.color} ${social.hoverColor} transition-all duration-500 group shadow-xl`}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -6,
                    rotateZ: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }}
                  aria-label={social.label}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-current/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <motion.span 
                    className="relative z-10 block group-hover:scale-110 transition-transform duration-300"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <div className="h-4 w-4 sm:h-5 sm:w-5">
                      {social.icon}
                    </div>
                  </motion.span>
                  
                  <motion.div
                    className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    {social.label}
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile section */}
          <div className="flex justify-center md:justify-end items-center order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative"
              style={{ x: profileSpringX, y: profileSpringY }}
            >
              {/* Rotating rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 sm:-inset-12 lg:-inset-16 rounded-full bg-gradient-to-r from-blue-500/25 via-transparent to-violet-500/25 blur-2xl"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 sm:-inset-10 lg:-inset-14 rounded-full bg-gradient-to-r from-violet-500/20 via-transparent to-purple-500/20 blur-xl"
              />
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -inset-4 sm:-inset-8 lg:-inset-12 rounded-full bg-gradient-to-r from-cyan-400/15 via-blue-500/10 to-purple-600/15 blur-2xl"
              />
              
              {/* Profile avatar */}
              <motion.div
                className="relative p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <ProfileAvatar 
                  src="/images/profile.jpg"
                  alt="Pragyesh Kumar Seth" 
                  size="xl"
                  className="shadow-2xl ring-4 sm:ring-6 ring-white/20 relative z-10 rounded-full w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-400 to-violet-500 rounded-lg sm:rounded-xl shadow-2xl flex items-center justify-center"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-white text-base sm:text-lg lg:text-xl"
                >
                  ⚡
                </motion.span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-2 sm:-bottom-3 -left-6 sm:-left-8 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg sm:rounded-xl shadow-2xl flex items-center justify-center"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white text-base sm:text-lg"
                >
                  🚀
                </motion.span>
              </motion.div>
              
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full"
                  style={{
                    top: `${20 + Math.sin(i * 60) * 35}%`,
                    left: `${20 + Math.cos(i * 60) * 35}%`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
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