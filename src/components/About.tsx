import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Code2, Server, Globe, Database, Star, Quote, Sparkles, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = useMemo(() => [
    { name: 'Frontend Development', icon: <Code2 className="w-6 h-6" />, description: 'Building responsive and interactive UI with modern frameworks', color: 'from-blue-500 to-cyan-500', technologies: [{ name: 'React', proficiency: 90, icon: '⚛️' }, { name: 'TypeScript', proficiency: 85, icon: '📘' }, { name: 'Tailwind CSS', proficiency: 95, icon: '🎨' }, { name: 'JavaScript', proficiency: 90, icon: '💛' }, { name: 'Next.js', proficiency: 85, icon: '▲' }] },
    { name: 'Backend Development', icon: <Server className="w-6 h-6" />, description: 'Creating robust server-side applications and APIs', color: 'from-emerald-500 to-teal-500', technologies: [{ name: 'Node.js', proficiency: 85, icon: '🟢' }, { name: 'Express', proficiency: 80, icon: '🚀' }, { name: 'Python', proficiency: 75, icon: '🐍' }, { name: 'REST APIs', proficiency: 75, icon: '🔗' }] },
    { name: 'Web Technologies', icon: <Globe className="w-6 h-6" />, description: 'Implementing core web technologies and best practices', color: 'from-purple-500 to-pink-500', technologies: [{ name: 'HTML5', proficiency: 95, icon: '🌐' }, { name: 'CSS3', proficiency: 90, icon: '🎭' }, { name: 'Responsive Design', proficiency: 90, icon: '📱' }, { name: 'PWA', proficiency: 80, icon: '⚡' }] },
    { name: 'Database & Tools', icon: <Database className="w-6 h-6" />, description: 'Designing and managing various database systems', color: 'from-orange-500 to-red-500', technologies: [{ name: 'MongoDB', proficiency: 80, icon: '🍃' }, { name: 'MySQL', proficiency: 75, icon: '🐬' }, { name: 'Git', proficiency: 90, icon: '📂' }] }
  ], []);

  const achievements = useMemo(() => [
    { text: "Successfully developed and deployed 5+ web projects", icon: "🎯", color: "from-blue-500 to-cyan-500" },
    { text: "Ranked at 2nd position in Coding Contest organized by IEEE", icon: "🏆", color: "from-amber-500 to-orange-500" },
    { text: "Ranked at 1st position in Tech Quiz Competition", icon: "✨", color: "from-green-500 to-emerald-500" },
    { text: "Secured AIR 28th in All India Online Aptitude Test 2025", icon: "🥇", color: "from-rose-500 to-pink-500" },
    { text: "Secured 1st position in semester examinations", icon: "⚡", color: "from-purple-500 to-pink-500" },
    { text: "Mentored 10+ junior developers", icon: "✅", color: "from-teal-500 to-cyan-500" },
  ], []);

  const testimonials = useMemo(() => [
    { name: "Hritik Sonkar", text: "Pragyesh's coding expertise is phenomenal! His attention to detail and problem-solving approach helped us deliver our project 2 weeks ahead of schedule. Truly exceptional!" },
    { name: "Anand Raj Bind", text: "Working with Pragyesh was incredible. His ability to transform complex designs into pixel-perfect, interactive experiences is unmatched. A true frontend wizard!" },
    { name: "Anurag Singh", text: "Pragyesh delivered a stunning portfolio that impressed our entire hiring committee. His modern approach and clean code standards are exactly what we look for!" },
    { name: "Leroy Vincient Serpis", text: "His technical explanations are clear and his problem-solving methodology is systematic. Pragyesh makes complex concepts accessible to everyone on the team." },
    { name: "Rishabh Rai", text: "Pragyesh's dedication is inspiring. He helped optimize our database queries, reducing load times by 60%. His full-stack knowledge is comprehensive and practical." },
    { name: "Dheeraj Sonkar", text: "The community website Pragyesh built has increased our engagement by 300%. His understanding of user experience and modern web standards is exceptional." },
    { name: "Alok Maurya", text: "Under tight deadlines, Pragyesh delivered a scalable solution that handled 10x our expected traffic. His architecture decisions were spot-on and future-proof." },
    { name: "Prajapati Saurabh Lalman", text: "Pragyesh's animation work brought our brand to life with 90+ PageSpeed scores. He perfectly balances visual appeal with performance optimization." }
  ], []);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(interval);
  }, [isVisible, testimonials.length]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `.glass-effect{background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1)}.glow-effect{box-shadow:0 0 30px rgba(59,130,246,0.3)}.skill-card{transition:all 0.3s ease}.skill-card:hover{box-shadow:0 4px 20px rgba(59,130,246,0.2)}.testimonial-card{transition:all 0.3s ease}`;
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  const getAvatarGradient = useCallback((index: number) => [
    "from-blue-500 via-purple-500 to-pink-500", "from-emerald-500 via-cyan-500 to-blue-500", "from-amber-500 via-orange-500 to-red-500", "from-pink-500 via-rose-500 to-purple-500", "from-indigo-500 via-blue-500 to-cyan-500", "from-teal-500 via-emerald-500 to-green-500", "from-fuchsia-500 via-purple-500 to-indigo-500", "from-violet-500 via-purple-500 to-blue-500"
  ][index % 8], []);

  const [, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-24 md:pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute -bottom-20 -left-40 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-[60px] md:blur-[100px]" />
      </div>
      




      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-12 md:space-y-16"
        >
          {/* Enhanced Hero About Section */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center mb-8 md:mb-12"
            >
              <motion.div 
                className="h-1 w-12 md:w-20 bg-gradient-to-r from-transparent via-primary to-transparent mr-3 md:mr-6 rounded-full"
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative text-center">
                About Me
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-lg blur-xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </h1>
              <motion.div 
                className="h-1 w-12 md:w-20 bg-gradient-to-r from-transparent via-primary to-transparent ml-3 md:ml-6 rounded-full"
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
            
            <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
              {/* Enhanced main content with glassmorphism */}
              <div className="lg:col-span-3 space-y-4 md:space-y-6 order-2 lg:order-1">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden group hover:glow-effect transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center mb-3 md:mb-4"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="h-6 md:h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2 md:mr-3" />
                      <h2 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Passionate Full Stack Developer
                      </h2>
                    </motion.div>
                    
                    <div className="space-y-3 md:space-y-4 text-sm md:text-base leading-relaxed">
                      <p className="text-muted-foreground">
                        I am a passionate Full Stack Developer with expertise in cutting-edge web technologies.
                        My journey began with curiosity and has evolved into a professional career building
                        <span className="text-primary font-semibold"> robust, scalable, and beautiful applications</span>.
                      </p>
                      
                      <p className="text-muted-foreground">
                        I specialize in creating <span className="text-purple-500 font-semibold">responsive web applications</span> 
                        &nbsp;using React, TypeScript, and Node.js, with a strong focus on 
                        <span className="text-blue-500 font-semibold"> clean architecture and optimal user experience</span>. 
                        I'm constantly learning and adapting to new technologies to stay current in this ever-evolving field.
                      </p>
                      
                      <motion.div
                        className="flex flex-wrap gap-2 mt-3 md:mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {['Problem Solver', 'Clean Code', 'Performance Focused', 'User-Centric'].map((tag, index) => (
                          <motion.span
                            key={tag}
                            className="px-2 md:px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-xs font-medium border border-blue-500/20"
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Enhanced achievements with better animations - made more compact */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 mr-2 md:mr-3" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                      Key Achievements
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="group p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 border border-white/10 hover:border-white/20 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-start space-x-2 md:space-x-3">
                          <div className={`p-1 md:p-1.5 rounded-lg bg-gradient-to-r ${achievement.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-sm`}>
                            {achievement.icon}
                          </div>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 flex-1 text-xs md:text-sm">
                            {achievement.text}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* Compact personal details - increased size */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="relative lg:col-span-2 order-1 lg:order-2"
              >
                <Card className="glass-effect border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden group h-fit">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10 pb-2">
                    <CardTitle className="text-base md:text-lg flex items-center">
                      <motion.div 
                        className="h-3 md:h-4 w-1 md:w-1.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-2 relative z-10 pb-3">
                    {[
                      { label: "Name", value: "Pragyesh Kumar Seth", icon: "👨‍💻" },
                      { label: "Location", value: "India", icon: "📍" },
                      { label: "Email", value: "spragyesh86@gmail.com", icon: "📧" },
                      { label: "Experience", value: "Fresher", icon: "🚀" },
                      { label: "Availability", value: "Full-time", icon: "⏰" },
                      { label: "Languages", value: "Hindi, English", icon: "🗣️" }
                    ].map((detail, i) => (
                      <motion.div 
                        key={detail.label}
                        className="flex flex-col space-y-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm group-hover/item:scale-110 transition-transform duration-200">{detail.icon}</span>
                          <span className="text-muted-foreground text-xs md:text-sm font-medium">{detail.label}</span>
                        </div>
                        <div className="pl-4 md:pl-6">
                          <span className="font-semibold text-xs md:text-sm break-words leading-tight">{detail.value}</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    <motion.div
                      className="mt-3 p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        <span>Open to opportunities</span>
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Skills Section with advanced animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="h-1 w-12 md:w-16 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mr-3 md:mr-6 rounded-full"
                animate={{ scaleX: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-center">
                Skills & Expertise
              </h2>
              <motion.div 
                className="h-1 w-12 md:w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent ml-3 md:ml-6 rounded-full"
                animate={{ scaleX: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
            
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="mb-8 md:mb-12 p-1 md:p-1.5 glass-effect rounded-xl md:rounded-2xl grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger 
                  value="skills"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold"
                >
                  Skills Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="technical"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold"
                >
                  Technical
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                      className="skill-card group h-full"
                    >
                      <Card className="glass-effect border-white/20 hover:border-white/40 h-full overflow-hidden relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="absolute -top-20 -right-20 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-white/5 to-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                        
                        <CardHeader className="relative z-10 pb-3 md:pb-4">
                          <motion.div 
                            className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${skill.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="text-white text-sm md:text-base">{skill.icon}</div>
                          </motion.div>
                          
                          <CardTitle className="text-base md:text-xl group-hover:text-primary transition-colors duration-300">
                            {skill.name}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 text-xs md:text-sm">
                            {skill.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="relative z-10">
                          <div className="space-y-2">
                            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-2 md:mb-3">Technologies:</p>
                            <div className="flex flex-wrap gap-1 md:gap-2">
                              {skill.technologies.slice(0, 4).map((tech, techIndex) => (
                                <motion.span
                                  key={tech.name}
                                  className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20 hover:bg-white/20 transition-colors cursor-default"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1.6 + index * 0.2 + techIndex * 0.1 }}
                                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                >
                                  <span className="text-xs">{tech.icon}</span> {tech.name}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-0 space-y-6 md:space-y-10">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-8 space-y-4 md:space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.3, duration: 0.8 }}
                  >
                    <h3 className="font-bold text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                      <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${skill.color}`}>
                        <div className="text-white text-sm md:text-base">{skill.icon}</div>
                      </div>
                      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${skill.color}`}>
                        {skill.name}
                      </span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {skill.technologies.map((tech, techIndex) => (
                        <motion.div 
                          key={tech.name} 
                          className="space-y-2 md:space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6 + index * 0.3 + techIndex * 0.1 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2 text-sm md:text-base">
                              <span className="text-base md:text-lg">{tech.icon}</span>
                              {tech.name}
                            </span>
                            <span className="font-bold text-primary text-sm md:text-base">{tech.proficiency}%</span>
                          </div>
                          <EnhancedProgressBar 
                            value={tech.proficiency} 
                            delay={1.8 + index * 0.3 + techIndex * 0.1}
                            color={skill.color}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Simplified Testimonials Section - Only Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="relative"
          >
            <motion.div 
              className="flex items-center justify-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
            >
              <motion.div 
                className="h-1 w-12 md:w-16 bg-gradient-to-r from-transparent via-pink-500 to-transparent mr-3 md:mr-6 rounded-full"
                animate={{ scaleX: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center gap-2 md:gap-3 text-center">
                <Quote className="w-6 h-6 md:w-10 md:h-10 text-pink-500" />
                Testimonials
                <Quote className="w-6 h-6 md:w-10 md:h-10 text-blue-500" />
              </h2>
              <motion.div 
                className="h-1 w-12 md:w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent ml-3 md:ml-6 rounded-full"
                animate={{ scaleX: [1, 1.4, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
            
            {/* Featured testimonial only */}
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full"
                >
                  <Card className="glass-effect border-white/30 testimonial-card overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getAvatarGradient(currentTestimonial)} opacity-5`} />
                    
                    <CardContent className="p-4 md:p-8 lg:p-12 relative z-10">
                      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <motion.div 
                          className={`relative h-16 w-16 md:h-24 md:w-24 rounded-full bg-gradient-to-br ${getAvatarGradient(currentTestimonial)} flex items-center justify-center text-white shadow-2xl flex-shrink-0`}
                          whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <span className="font-bold text-xl md:text-3xl">{testimonials[currentTestimonial].name.charAt(0)}</span>
                          <motion.div className="absolute inset-0 rounded-full border-2 border-white/30" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                        </motion.div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <div className="mb-3 md:mb-4">
                            <h3 className="font-bold text-lg md:text-2xl mb-1">{testimonials[currentTestimonial].name}</h3>
                          </div>
                          
                          <div className="flex justify-center md:justify-start mb-3 md:mb-4">
                            {Array.from({ length: 5 }, (_, i) => (
                              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1, type: "spring" }}>
                                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-current" />
                              </motion.div>
                            ))}
                          </div>
                          
                          <blockquote className="text-sm md:text-lg leading-relaxed text-muted-foreground italic">
                            &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                          </blockquote>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
              
              {/* Enhanced navigation dots */}
              <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8 flex-wrap">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index} onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 md:h-3 rounded-full transition-all duration-300 touch-manipulation ${index === currentTestimonial ? `w-6 md:w-8 bg-gradient-to-r ${getAvatarGradient(index)}` : 'w-2 md:w-3 bg-white/30 hover:bg-white/50'}`}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const EnhancedProgressBar = ({ value, delay = 0, color = "from-blue-500 to-purple-500" }: { value: number; delay?: number; color?: string }) => {
  const controls = useAnimation();
  useEffect(() => { controls.start({ width: `${value}%`, transition: { delay, duration: 1.5, ease: "easeOut" } }); }, [controls, value, delay]);
  return (
    <div className="relative h-2 md:h-3 bg-white/10 rounded-full overflow-hidden">
      <motion.div className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`} initial={{ width: 0 }} animate={controls}>
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </div>
  );
};

export default About;