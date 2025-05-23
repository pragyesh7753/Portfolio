import { Github, Linkedin, Mail, ArrowRight, Download, Sparkles, Code2, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProfileAvatar } from './ProfileAvatar';
import { useRef, useState, useEffect } from 'react';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  
  // Typing animation state
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullName = "Pragyesh Kumar Seth";
  
  // Stats animation
  const [stats, setStats] = useState({ projects: 0, experience: 0, technologies: 0 });
  
  useEffect(() => {
    if (isInView) {
      // Typing animation
      const timer = setTimeout(() => {
        if (currentIndex < fullName.length) {
          setDisplayText(fullName.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullName, isInView]);
  
  useEffect(() => {
    if (isInView) {
      // Animate stats counter
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        const progress = step / steps;
        setStats({
          projects: Math.floor(progress * 15),
          experience: Math.floor(progress * 2),
          technologies: Math.floor(progress * 25)
        });
        
        step++;
        if (step > steps) clearInterval(timer);
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            ref={heroRef}
            style={{ y: textY }}
            className="text-left order-2 md:order-1"
            initial="hidden"
            animate="show"
            variants={container}
          >
            {/* Enhanced badge with animation */}
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-4 py-2 px-4 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 text-primary text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Full Stack Developer
              <Code2 className="h-4 w-4" />
            </motion.div>

            {/* Enhanced heading with typing animation */}
            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Hi, I'm{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600 relative">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-1 h-12 bg-gradient-to-b from-blue-400 to-violet-500 ml-1"
                />
              </span>
            </motion.h1>

            {/* Enhanced description with gradient */}
            <motion.p variants={item} className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              I build{' '}
              <span className="text-blue-400 font-semibold">accessible</span>,{' '}
              <span className="text-violet-400 font-semibold">responsive</span> and{' '}
              <span className="text-purple-400 font-semibold">high-performance</span>{' '}
              web applications with modern technologies.
            </motion.p>

            {/* Stats section */}
            <motion.div variants={item} className="grid grid-cols-3 gap-6 mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-violet-500/5 backdrop-blur-sm border border-primary/10">
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-2xl font-bold text-blue-400"
                >
                  {stats.projects}+
                </motion.div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="text-2xl font-bold text-violet-400"
                >
                  {stats.experience}+
                </motion.div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  className="text-2xl font-bold text-purple-400"
                >
                  {stats.technologies}+
                </motion.div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </motion.div>

            {/* Enhanced buttons with hover effects */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link to="/contact">
                    <Rocket className="mr-2 h-4 w-4" />
                    Get in Touch 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" asChild className="border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" /> 
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced social links */}
            <motion.div variants={item} className="flex items-center gap-6">
              {[
                { href: "https://github.com/pragyesh7753", icon: Github, label: "GitHub", color: "hover:text-purple-400" },
                { href: "http://www.linkedin.com/in/pragyesh77", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
                { href: "mailto:spragyesh86@gmail.com", icon: Mail, label: "Email", color: "hover:text-violet-400" }
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? "_blank" : undefined}
                  rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`text-foreground/80 ${color} transition-all duration-300 hover:scale-110`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{label}</span>
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced profile section */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Animated background rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-500/20 via-transparent to-violet-500/20 blur-xl"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-violet-500/15 via-transparent to-purple-500/15 blur-lg"
              />
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/5 via-blue-500/10 to-purple-600/5 blur-2xl"
              />
              
              <ProfileAvatar 
                src="/images/profile.jpg"
                alt="Pragyesh Kumar Seth" 
                size="xl"
                className="shadow-2xl ring-4 ring-primary/20 relative z-10"
              />
              
              {/* Floating elements around profile */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full shadow-lg"
              />
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -15, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full shadow-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20"
        >
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gradient-to-r from-primary/5 to-violet-500/5 backdrop-blur-sm border border-primary/10">
              <TabsTrigger value="skills" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-600 data-[state=active]:text-white">Skills</TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-600 data-[state=active]:text-white">Experience</TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-violet-600 data-[state=active]:text-white">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills" className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-blue-400" />
                    Frontend
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'].map((skill, index) => (
                      <motion.div 
                        key={skill} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center bg-gradient-to-r from-blue-500/5 to-violet-500/5 hover:from-blue-500/10 hover:to-violet-500/10 transition-all duration-300 p-3 rounded-lg border border-blue-500/10 hover:border-blue-500/20 backdrop-blur-sm group cursor-pointer"
                      >
                        <motion.span 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className="h-2 w-2 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full mr-2"
                        />
                        <span className="text-sm group-hover:text-blue-400 transition-colors">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-violet-400" />
                    Backend
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Node.js', 'Express', 'Python', 'MongoDB', 'MySQL', 'RESTful APIs'].map((skill, index) => (
                      <motion.div 
                        key={skill} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center bg-gradient-to-r from-violet-500/5 to-purple-500/5 hover:from-violet-500/10 hover:to-purple-500/10 transition-all duration-300 p-3 rounded-lg border border-violet-500/10 hover:border-violet-500/20 backdrop-blur-sm group cursor-pointer"
                      >
                        <motion.span 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className="h-2 w-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mr-2"
                        />
                        <span className="text-sm group-hover:text-violet-400 transition-colors">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-6 space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-violet-500 to-purple-600 rounded-full" />
                <div className="border-l-2 border-primary/60 pl-6 py-4 ml-2 relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full border-2 border-background"
                  />
                  <h3 className="font-semibold text-lg">Developed and Deployed Personal Projects</h3>
                  <p className="text-sm mt-2 text-muted-foreground">Showcasing full-stack development expertise through innovative web applications</p>
                  <motion.p 
                    className="text-sm mt-2 text-blue-400 hover:text-violet-400 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    → You can see more in Projects Section
                  </motion.p>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-6 space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-12 w-0.5 bg-gradient-to-b from-blue-400 to-violet-500 rounded-full" />
                  <div className="border-l-2 border-primary pl-6 py-4 ml-2 relative">
                    <motion.div 
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full border-2 border-background"
                    />
                    <h3 className="font-semibold">Master of Computer Applications</h3>
                    <p className="text-sm text-muted-foreground">St. Andrews Institute of Technology and Management • 2024-2026</p>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "90%" } : { width: 0 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="mt-2 h-1 bg-gradient-to-r from-blue-400 to-violet-500 rounded-full"
                    />
                    <p className="text-sm mt-2 text-blue-400 font-medium">Grade: A+</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="border-l-2 border-primary pl-6 py-4 ml-2 relative">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full border-2 border-background"
                    />
                    <h3 className="font-semibold">Bachelor of Computer Applications</h3>
                    <p className="text-sm text-muted-foreground">Veer Bahadur Singh Puravchal University • 2021-2024</p>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : { width: 0 }}
                      transition={{ delay: 1.5, duration: 1 }}
                      className="mt-2 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                    />
                    <p className="text-sm mt-2 text-violet-400 font-medium">Grade: A+</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;