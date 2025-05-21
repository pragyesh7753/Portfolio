import { motion, useAnimation } from 'framer-motion';
import { Code2, Server, Globe, Database, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const About = () => {
  const skills = [
    { 
      name: 'Frontend Development', 
      icon: <Code2 className="w-6 h-6" />, 
      description: 'Building responsive and interactive UI with modern frameworks',
      technologies: [
        { name: 'React', proficiency: 90 },
        { name: 'TypeScript', proficiency: 85 },
        { name: 'Tailwind CSS', proficiency: 95 },
        { name: 'JavaScript', proficiency: 90 },
      ]
    },
    { 
      name: 'Backend Development', 
      icon: <Server className="w-6 h-6" />, 
      description: 'Creating robust server-side applications and APIs',
      technologies: [
        { name: 'Node.js', proficiency: 85 },
        { name: 'Express', proficiency: 50 },
        { name: 'Python', proficiency: 75 },
      ]
    },
    { 
      name: 'Web Technologies', 
      icon: <Globe className="w-6 h-6" />, 
      description: 'Implementing core web technologies and best practices',
      technologies: [
        { name: 'HTML5', proficiency: 95 },
        { name: 'CSS3', proficiency: 90 },
        { name: 'Responsive Design', proficiency: 90 },
      ]
    },
    { 
      name: 'Database', 
      icon: <Database className="w-6 h-6" />, 
      description: 'Designing and managing various database systems',
      technologies: [
        { name: 'MongoDB', proficiency: 80 },
        { name: 'MySQL', proficiency: 75 },
      ]
    }
  ];

  const achievements = [
    "Successfully developed and deployed 5+ web projects",
    "Ranked at 2nd position in Coding Contest",
    "Ranked at 1st position in Tech Quiz",
    "Secured 1st position in semester examination",
  ];

  // Updated testimonials - removed relationship and image, added 2 more testimonials
  const testimonials = [
    {
      name: "Hritik Sonkar",
      text: "I've known Pragyesh since our college days and his coding skills have always been impressive. He helped me with my final year project and his attention to detail was amazing!"
    },
    {
      name: "Anand Raj Bind",
      text: "Working with Pragyesh on our hackathon project was an incredible experience. His problem-solving abilities and creativity took our app to the next level. Definitely my go-to person for tech advice!"
    },
    {
      name: "Anurag Singh",
      text: "Pragyesh built an online portfolio for me in just two days when I urgently needed it for a job application. The design was clean, modern and impressed my interviewers. I got the job!"
    },
    {
      name: "Leroy Vincient Serpis",
      text: "As fellow members of our college coding club, I've seen Pragyesh tackle complex problems with ease. He's not only talented but also great at explaining technical concepts to beginners like me."
    },
    {
      name: "Rishabh Rai",
      text: "Living with Pragyesh, I've witnessed firsthand his dedication to coding. He helped me set up a small blog website and was patient enough to teach me how to maintain it myself. His work ethic is inspiring!"
    },
    {
      name: "Dheeraj Sonkar",
      text: "Pragyesh redesigned our local community website as a volunteer project. His technical skills combined with his understanding of user needs resulted in a website that everyone loves using now."
    },
    {
      name: "Alok Maurya",
      text: "I had a critical deadline for my startup's web application, and Pragyesh came through with an exceptional solution. His ability to understand requirements and deliver quality code under pressure is remarkable."
    },
    {
      name: "Prajapati Saurabh Lalman",
      text: "Pragyesh helped our team implement complex animations on our website that truly brought our brand to life. His attention to performance optimization made the site not just beautiful but incredibly fast too."
    }
  ];

  // Ref for the testimonials container
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [duplicatedTestimonials] = useState([...testimonials, ...testimonials]);
  const [scrollPaused, setScrollPaused] = useState(false);

  // Fix: Use a state variable to track if the style has been added to prevent duplicates
  const [styleInjected, setStyleInjected] = useState(false);

  // Fix: Move the style injection useEffect inside the component
  useEffect(() => {
    if (typeof window === 'undefined' || styleInjected) return;
    
    // Check if style already exists to avoid duplicates
    const existingStyle = document.getElementById('testimonial-scrollbar-style');
    if (existingStyle) {
      setStyleInjected(true);
      return;
    }
    
    const style = document.createElement('style');
    style.id = 'testimonial-scrollbar-style';
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-subtle-pulse {
        animation: subtlePulse 8s ease-in-out infinite alternate;
      }
      
      .animate-subtle-pulse-delayed {
        animation: subtlePulse 10s ease-in-out 2s infinite alternate;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes subtlePulse {
        0% { opacity: 0.5; transform: scale(1); }
        100% { opacity: 0.7; transform: scale(1.1); }
      }
    `;
    document.head.appendChild(style);
    setStyleInjected(true);
    
    return () => {
      const styleElement = document.getElementById('testimonial-scrollbar-style');
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [styleInjected]);

  // Fix: Improved and more reliable testimonial scrolling with better memory management
  useEffect(() => {
    const scrollContainer = testimonialsRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number | null = null;
    let scrollPosition = 0;
    let isResetting = false;
    let isComponentMounted = true; // Flag to prevent memory leaks
    
    // Calculate the midpoint for seamless looping
    const totalItems = testimonials.length;
    const singleCardWidth = 350 + 28; // card width (350px) + gap (28px)
    const halfScrollWidth = totalItems * singleCardWidth;
    
    // Enhanced scrolling algorithm with safety checks
    const scroll = () => {
      if (!isComponentMounted || !scrollContainer || scrollPaused || isResetting) {
        if (isComponentMounted) {
          animationFrameId = requestAnimationFrame(scroll);
        }
        return;
      }
      
      // Increased scrolling speed for faster movement
      scrollPosition += 0.8; 
      
      // When we reach midpoint, reset without visual jump
      if (scrollPosition >= halfScrollWidth - 50) {
        isResetting = true;
        
        // Set timeout to ensure scrollLeft update happens in a separate frame
        setTimeout(() => {
          if (scrollContainer && isComponentMounted) {
            scrollContainer.scrollLeft = 0;
            scrollPosition = 0;
            isResetting = false;
          }
        }, 10);
      } else {
        scrollContainer.scrollLeft = Math.floor(scrollPosition);
      }
      
      if (isComponentMounted) {
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    // Start scrolling animation
    if (!scrollPaused) {
      animationFrameId = requestAnimationFrame(scroll);
    }

    // Improve pause/resume behavior with debounce
    let pauseTimeout: NodeJS.Timeout | null = null;
    
    const pauseScroll = () => {
      if (pauseTimeout) clearTimeout(pauseTimeout);
      
      setScrollPaused(true);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
    
    const resumeScroll = () => {
      // Delay resuming to prevent rapid toggling
      if (pauseTimeout) clearTimeout(pauseTimeout);
      
      pauseTimeout = setTimeout(() => {
        // Store current position before resuming
        if (scrollContainer) {
          scrollPosition = scrollContainer.scrollLeft;
          setScrollPaused(false);
          
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(scroll);
          }
        }
      }, 100);
    };

    // Use passive event listeners for better touch performance
    scrollContainer.addEventListener('mouseenter', pauseScroll, { passive: true });
    scrollContainer.addEventListener('mouseleave', resumeScroll, { passive: true });
    scrollContainer.addEventListener('touchstart', pauseScroll, { passive: true });
    scrollContainer.addEventListener('touchend', resumeScroll, { passive: true });

    // Ensure cleanup
    return () => {
      isComponentMounted = false;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }
      
      scrollContainer.removeEventListener('mouseenter', pauseScroll);
      scrollContainer.removeEventListener('mouseleave', resumeScroll);
      scrollContainer.removeEventListener('touchstart', pauseScroll);
      scrollContainer.removeEventListener('touchend', resumeScroll);
    };
  }, [scrollPaused, testimonials.length]);

  // Random pastel color generator for avatar backgrounds
  const getAvatarGradient = (index: number) => {
    const gradients = [
      "from-blue-400 to-violet-500",
      "from-emerald-400 to-cyan-500", 
      "from-amber-400 to-orange-500",
      "from-pink-400 to-rose-500",
      "from-indigo-400 to-blue-500",
      "from-teal-400 to-emerald-500",
      "from-fuchsia-400 to-pink-500",
      "from-purple-400 to-indigo-500"
    ];
    return gradients[index % gradients.length];
  };

  // Add decorative particle effect to enhance visual appeal
  const [particles] = useState(Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 6,
    duration: 15 + Math.random() * 20
  })));

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-70 animate-subtle-pulse" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] opacity-70 animate-subtle-pulse-delayed" />
      
      {/* Decorative floating particles */}
      {particles.map(particle => (
        <motion.div 
          key={particle.id}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/5 pointer-events-none"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: ['-20%', '20%'],
            x: ['10%', '-10%'],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* About Me Section - Enhanced with card styling and animations */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-4"
            >
              <div className="h-0.5 w-5 bg-primary/70 mr-3 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">About Me</h2>
              <div className="h-0.5 flex-grow bg-primary/10 ml-5 rounded-full"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left column - enhance with card effect */}
              <div className="md:col-span-2 space-y-5">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative p-6 rounded-xl bg-card/50 hover:bg-card/80 transition-colors border border-primary/10 shadow-sm"
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-primary/30"></div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground">
                    I am a passionate Full Stack Developer with expertise in modern web technologies.
                    My journey in web development started with curiosity and has evolved into a
                    professional career building robust and scalable applications.
                  </p>
                  
                  <p className="text-lg text-muted-foreground mt-4">
                    I specialize in creating responsive web applications using React and Node.js,
                    with a strong focus on clean code and optimal user experience. I'm constantly
                    learning and adapting to new technologies to stay current in this ever-evolving field.
                  </p>
                </motion.div>
                
                <div className="mt-8">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-semibold mb-5 flex items-center"
                  >
                    <span className="inline-block h-6 w-1.5 bg-gradient-to-b from-primary to-blue-500 rounded-full mr-3"></span>
                    Key Achievements
                  </motion.h3>
                  
                  <ul className="space-y-3 pl-2">
                    {achievements.map((achievement, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="h-6 w-6 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mr-3 mt-0.5 transition-colors">
                          <CheckCircle className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Right column - Personal details with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/10 h-full">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 pb-3">
                    <CardTitle className="text-xl flex items-center">
                      <div className="h-5 w-1 bg-primary rounded-full mr-2"></div>
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 pt-5">
                    <div className="grid grid-cols-[120px_1fr] gap-3">
                      {[
                        { label: "Name", value: "Pragyesh Kumar Seth" },
                        { label: "Location", value: "Jaunpur, U.P., India" },
                        { label: "Email", value: "spragyesh86@gmail.com", className: "break-all" },
                        { label: "Experience", value: "Fresher" },
                        { label: "Availability", value: "Full-time" }
                      ].map((detail, i) => (
                        <motion.div 
                          key={detail.label} 
                          className="contents"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                        >
                          <div className="text-muted-foreground flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                            {detail.label}:
                          </div>
                          <div className={cn("font-medium", detail.className)}>{detail.value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Skills Section - Enhanced with better visual hierarchy */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-8"
            >
              <div className="h-0.5 w-5 bg-primary/70 mr-3 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Skills & Expertise</h2>
              <div className="h-0.5 flex-grow bg-primary/10 ml-5 rounded-full"></div>
            </motion.div>
            
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="mb-8 p-1 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="skills"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-blue-500/80 data-[state=active]:text-white transition-all"
                >
                  Skills Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="technical"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-blue-500/80 data-[state=active]:text-white transition-all"
                >
                  Technical Proficiency
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {skills.map((skill, index) => (
                    <FloatingCard 
                      key={skill.name} 
                      delay={index * 0.1}
                      className="h-full"
                    >
                      <CardHeader className="pb-3">
                        <div className="text-primary mb-3">{skill.icon}</div>
                        <CardTitle>{skill.name}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </CardHeader>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-0 space-y-8">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {skill.icon}
                      <span>{skill.name}</span>
                    </h3>
                    <div className="space-y-4">
                      {skill.technologies.map((tech, techIndex) => (
                        <motion.div 
                          key={tech.name} 
                          className="space-y-1"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: index * 0.1 + techIndex * 0.1, duration: 0.5 }}
                        >
                          <div className="flex justify-between text-sm">
                            <span>{tech.name}</span>
                            <span>{tech.proficiency}%</span>
                          </div>
                          <ProgressBar value={tech.proficiency} delay={index * 0.1 + techIndex * 0.1} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Updated Testimonials Section with Enhanced Cards */}
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-8"
            >
              <div className="h-0.5 w-5 bg-primary/70 mr-3 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">What My Friends Say</h2>
              <div className="h-0.5 flex-grow bg-primary/10 ml-5 rounded-full"></div>
            </motion.div>
            
            <div className="relative">
              {/* Enhanced gradient fades on edges for smoother transition */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/90 to-transparent z-10"></div>
              
              {/* Scrolling testimonials container with enhanced styling */}
              <div 
                ref={testimonialsRef}
                className="flex overflow-x-scroll scrollbar-hide gap-7 py-6 px-2 pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-7 min-w-max pl-3">
                  {duplicatedTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min((index % testimonials.length) * 0.1, 0.7) }}
                      className="w-[350px] flex-shrink-0"
                    >
                      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/20 overflow-hidden group border-primary/10 hover:border-primary/30 backdrop-blur-sm relative">
                        {/* Enhance accent with pattern background */}
                        <div className={`h-2 w-full bg-gradient-to-r ${getAvatarGradient(index % testimonials.length)} group-hover:opacity-100 opacity-80 transition-opacity`}>
                          <div className="absolute inset-x-0 h-12 top-0 bg-gradient-to-b from-black/10 to-transparent opacity-30"></div>
                        </div>
                        
                        <CardContent className="p-0 h-full">
                          <div className="p-6 pt-5 relative">
                            {/* Enhanced avatar with improved styling */}
                            <div className="flex items-center mb-5">
                              <div 
                                className={`relative h-16 w-16 rounded-full mr-4 bg-gradient-to-br ${getAvatarGradient(index % testimonials.length)} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl shadow-primary/10 group-hover:scale-105 transition-all duration-500 ease-out z-20`}
                              >
                                <span className="font-bold text-2xl">{testimonial.name.charAt(0)}</span>
                                
                                {/* Enhanced animated rings */}
                                {index % testimonials.length < 3 && (
                                  <>
                                    <motion.div 
                                      className="absolute inset-0 rounded-full border-2 border-white/20"
                                      animate={{ 
                                        scale: [1, 1.15, 1],
                                      }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "easeInOut"
                                      }}
                                    />
                                    <motion.div 
                                      className="absolute -inset-1 rounded-full border border-white/10"
                                      animate={{ 
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0.2, 0.5]
                                      }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 4,
                                        ease: "easeInOut",
                                        delay: 0.5
                                      }}
                                    />
                                  </>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-lg tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{testimonial.name}</p>
                                {/* Enhanced star rating with animation */}
                                <div className="flex mt-1.5">
                                  {[1, 2, 3, 4, 5].map((star, starIndex) => (
                                    <motion.svg 
                                      key={star} 
                                      className="w-4 h-4 text-yellow-500 fill-current"
                                      viewBox="0 0 24 24"
                                      initial={{ opacity: 0, scale: 0.5 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.8 + (starIndex * 0.1), type: "spring" }}
                                    >
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </motion.svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Enhanced testimonial text with better quote styling */}
                            <div className="relative">
                              <svg 
                                className="absolute -top-2 -left-1 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                              <div className="relative z-10 pl-6 pr-2 py-1">
                                <p className="text-muted-foreground group-hover:text-muted-foreground/90 leading-relaxed text-sm italic transition-colors">
                                  {testimonial.text}
                                </p>
                                
                                {/* Add subtle line decoration */}
                                <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-primary/20 to-transparent rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced indicator dots with better animation */}
            <div className="flex justify-center gap-2 mt-8 relative">
              <div className="absolute inset-x-0 h-12 -top-6 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
              {testimonials.map((_, index) => (
                <motion.div 
                  key={index}
                  className={`h-3 rounded-full bg-gradient-to-r ${getAvatarGradient(index)}`}
                  style={{ width: index === 0 ? '1.5rem' : '0.75rem' }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                    width: ['0.75rem', index === 0 ? '1.5rem' : '0.75rem'] 
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Animated progress bar component
const ProgressBar = ({ value, delay = 0 }: { value: number, delay?: number }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      width: `${value}%`,
      transition: { delay, duration: 1, ease: "easeOut" }
    });
  }, [controls, value, delay]);
  
  return (
    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={controls}
      />
    </div>
  );
};

// Floating card component with hover effect
const FloatingCard = ({ 
  children, 
  delay = 0,
  className
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? "0 10px 25px -3px rgba(59, 130, 246, 0.15)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className={cn(
          "h-full transition-all duration-200 rounded-lg border",
          isHovered ? "border-primary/30" : "border-border"
        )}
      >
        <Card className="h-full border-0 shadow-none">
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default About;