import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles, Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProfileAvatar } from './ProfileAvatar';

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
                  transition={{ delay: 0.6, type: "spring" }}
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
                  transition={{ delay: 0.7, type: "spring" }}
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
                <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-6 py-3 h-auto">
                  <span>View My Work</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="px-6 py-3 h-auto">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download CV</span>
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
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`p-3 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground ${color} transition-all duration-300 group`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Frontend Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Backend Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'Python', 'MongoDB'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm">{skill}</span>
                    ))}
                  </div>
                </div>
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
                <div className="pl-8 pb-8">
                  <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                  <p className="text-sm text-muted-foreground">Self-taught | 2023 - Present</p>
                  <p className="text-sm mt-2">Building modern web applications with React and Node.js</p>
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
                <div className="border-l-2 border-primary/20 pl-6">
                  <h3 className="text-lg font-semibold">Bachelor of Technology</h3>
                  <p className="text-sm text-muted-foreground">Computer Science Engineering</p>
                  <p className="text-sm text-muted-foreground">St. Andrews Institute of Technology | 2021 - 2025</p>
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