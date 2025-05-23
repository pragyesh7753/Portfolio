import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Search, Code, Tags, Star, Sparkles, Zap, Trophy, Rocket, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: 'frontend' | 'backend' | 'fullstack';
  featured?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  completion?: number;
}

const ProjectsEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  
  const projects: Project[] = [
    {
      title: "InternAuto - Automate Your Future",
      description: "Revolutionary automated internship application platform for Internshala using React and Python, featuring advanced web scraping, AI-driven form filling, personalized career guidance, and intelligent resume generation.",
      tech: ["React", "JavaScript", "Framer-Motion", "Typewriter-Effect", "Tailwind CSS", "Python", "Flask", "Selenium"],
      category: "fullstack",
      liveUrl: "https://internauto.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/InternAuto_project",
      featured: true,
      difficulty: "advanced",
      completion: 100
    },
    {
      title: "Todo App with Context API",
      description: "Feature-rich, production-ready todo application built with React and Context API for robust state management, featuring drag-and-drop, filtering, and persistence.",
      tech: ["React", "Context API", "Tailwind CSS"],
      category: "frontend",
      liveUrl: "https://todo.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Web_Development/tree/main/React/10-todoContextLocal",
      featured: true,
      difficulty: "intermediate",
      completion: 100
    },
    {
      title: "Password Manager Pro",
      description: "Enterprise-grade password manager with advanced encryption, secure local storage, password generation, and breach monitoring capabilities.",
      tech: ["React", "LocalStorage", "Encryption", "Security"],
      category: "frontend",
      liveUrl: "https://pass-op.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Password-Manager_localStorage-version",
      difficulty: "intermediate",
      completion: 100
    },
    {
      title: "Viper Run - Snake Game",
      description: "Modern reimagining of the classic snake game with smooth animations, power-ups, leaderboards, and progressive difficulty levels.",
      tech: ["JavaScript", "HTML Canvas", "CSS", "Game Logic"],
      category: "frontend",
      liveUrl: "https://viperrun.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Snake-game-project-miniproject",
      featured: false,
      difficulty: "beginner",
      completion: 100
    },
    {
      title: "Portfolio Website",
      description: "Cutting-edge, responsive portfolio website showcasing modern web development practices with advanced animations, dark mode, and optimized performance.",
      tech: ["React", "Typescript", "Tailwind CSS", "Framer-Motion", "Radix UI", "Shadcn", "EmailJs"],
      category: "frontend",
      liveUrl: "https://pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Portfolio",
      featured: true,
      difficulty: "advanced",
      completion: 100
    },
  ];

  const projectStats = {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    frontend: projects.filter(p => p.category === 'frontend').length,
    fullstack: projects.filter(p => p.category === 'fullstack').length,
    completed: projects.filter(p => p.completion === 100).length
  };

  // Enhanced filtering with difficulty and completion
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = projects.filter(p => p.featured);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Stats animation
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  // Enhanced floating particles
  const [particles] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 20 + Math.random() * 30
  })));

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-[120px] opacity-60 animate-pulse" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-primary/10 rounded-full blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div 
          key={particle.id}
          className="absolute rounded-full bg-primary/5 dark:bg-primary/10 pointer-events-none"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: ['-30%', '30%'],
            x: ['15%', '-15%'],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
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
          transition={{ duration: 0.6 }}
        >
          {/* Enhanced header with stats */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-primary/70 mr-4 rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                Projects Showcase
              </h2>
              <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-primary/70 ml-4 rounded-full"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              A collection of innovative projects showcasing modern web development techniques and creative problem-solving
            </motion.p>

            {/* Animated statistics */}
            <motion.div 
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {[
                { label: "Total Projects", value: projectStats.total, icon: <Rocket className="w-5 h-5" />, color: "from-blue-500 to-purple-600" },
                { label: "Featured", value: projectStats.featured, icon: <Star className="w-5 h-5" />, color: "from-amber-500 to-orange-600" },
                { label: "Completed", value: projectStats.completed, icon: <Trophy className="w-5 h-5" />, color: "from-green-500 to-emerald-600" },
                { label: "Technologies", value: [...new Set(projects.flatMap(p => p.tech))].length, icon: <Zap className="w-5 h-5" />, color: "from-primary to-blue-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white mb-2 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <motion.div 
                    className="text-2xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-center mb-8">
              <Button variant="outline" size="lg" asChild className="group">
                <a 
                  href="https://github.com/pragyesh7753" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                  <span>Explore GitHub</span>
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          {/* Enhanced search and filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-primary/10"
          >
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search projects, technologies..." 
                value={searchQuery}
                onChange={handleSearch}
                className="pl-12 h-12 bg-background/50 border-primary/20 focus:border-primary/40 text-lg"
              />
              <motion.div 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                animate={{ opacity: searchQuery ? 1 : 0 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            </div>
            
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tags className="h-4 w-4" />
                <span>Filter:</span>
              </div>
              {[
                { value: 'all', label: 'All Projects', icon: '🚀' },
                { value: 'frontend', label: 'Frontend', icon: '🎨' },
                { value: 'backend', label: 'Backend', icon: '⚙️' },
                { value: 'fullstack', label: 'Full Stack', icon: '🌐' }
              ].map((filter) => (
                <motion.div key={filter.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge 
                    variant={selectedCategory === filter.value ? 'default' : 'outline'} 
                    className={cn(
                      "cursor-pointer px-4 py-2 text-sm transition-all hover:shadow-md",
                      selectedCategory === filter.value 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "hover:bg-primary/10 hover:border-primary/40"
                    )}
                    onClick={() => handleCategoryChange(filter.value)}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Projects Section */}
          {featuredProjects.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                    <Star className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold">Featured Projects</h3>
                </div>
                <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/20 to-transparent ml-6 rounded-full"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    onHoverStart={() => setHoveredCard(project.title)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <EnhancedProjectCard project={project} featured={true} isHovered={hoveredCard === project.title} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Projects Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria to find what you're looking for.</p>
            </motion.div>
          ) : (
            <motion.div>
              <div className="flex items-center mb-8">
                <h3 className="text-xl font-semibold">All Projects ({filteredProjects.length})</h3>
                <div className="h-0.5 flex-grow bg-gradient-to-r from-primary/20 to-transparent ml-6 rounded-full"></div>
              </div>
              
              <motion.div 
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredProjects.map((project) => (
                  <motion.div 
                    key={project.title} 
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredCard(project.title)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <EnhancedProjectCard project={project} isHovered={hoveredCard === project.title} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Project Card Component
const EnhancedProjectCard = ({ project, featured = false, isHovered = false }: { 
  project: Project, 
  featured?: boolean,
  isHovered?: boolean 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x, y });
  }, []);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-amber-500 to-orange-600';
      case 'advanced': return 'from-red-500 to-pink-600';
      default: return 'from-primary to-blue-500';
    }
  };

  const getDifficultyIcon = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return '🌱';
      case 'intermediate': return '⚡';
      case 'advanced': return '🚀';
      default: return '💫';
    }
  };

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "h-full overflow-hidden transition-all duration-500 relative group border-0",
        "bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-sm",
        isHovered ? "shadow-2xl shadow-primary/20 border-primary/30" : "shadow-lg hover:shadow-xl",
        featured && "ring-1 ring-primary/20"
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic lighting effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, 
            rgba(var(--primary-rgb, 59 130 246), 0.1) 0%, 
            transparent 50%)`
        }}
      />

      {/* Animated border gradient */}
      <motion.div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, 
            rgba(var(--primary-rgb, 59 130 246), 0.2) 0%, 
            rgba(var(--primary-rgb, 59 130 246), 0.1) 50%, 
            rgba(var(--primary-rgb, 59 130 246), 0.2) 100%)`,
          padding: '1px'
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-start gap-3">
              {featured && (
                <motion.div 
                  className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Star className="w-4 h-4" />
                </motion.div>
              )}
              <div>
                <CardTitle className={cn(
                  "text-lg mb-2 group-hover:text-primary transition-colors",
                  featured && "text-xl"
                )}>
                  {project.title}
                </CardTitle>
                {project.difficulty && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{getDifficultyIcon(project.difficulty)}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs bg-gradient-to-r text-white border-0",
                        getDifficultyColor(project.difficulty)
                      )}
                    >
                      {project.difficulty}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            {project.completion && (
              <motion.div 
                className="text-right"
                whileHover={{ scale: 1.1 }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold",
                  "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                )}>
                  {project.completion}%
                </div>
              </motion.div>
            )}
          </div>
          
          <CardDescription className={cn(
            "line-clamp-3 group-hover:text-muted-foreground/80 transition-colors",
            featured ? "text-base" : "text-sm"
          )}>
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all cursor-default",
                    featured && "bg-primary/5 text-primary/80"
                  )}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex w-full gap-3">
            <Button 
              variant={featured ? "default" : "outline"} 
              size="sm" 
              className={cn(
                "flex-1 group/btn",
                featured && "bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
              )} 
              asChild
            >
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                <span>Live Demo</span>
                <motion.div
                  className="w-0 group-hover/btn:w-2 h-0.5 bg-current transition-all duration-300"
                />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 group/btn" 
              asChild
            >
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                <span>Code</span>
              </a>
            </Button>
          </div>
        </CardFooter>
      </div>

      {/* Floating accent elements for featured projects */}
      {featured && (
        <>
          <motion.div 
            className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/30"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-6 left-6 w-1.5 h-1.5 rounded-full bg-blue-500/40"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
    </Card>
  );
};

export default ProjectsEnhanced;
