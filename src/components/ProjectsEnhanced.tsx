import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
  const [searchQuery] = useState('');
  const [selectedCategory] = useState('all');
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

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-full blur-[120px] opacity-60 animate-pulse" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-primary/10 rounded-full blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Enhanced header section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-primary/70 mr-4 rounded-full"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                  Enhanced Projects
                </h2>
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-primary/60" />
                </motion.div>
              </motion.div>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-primary/70 ml-4 rounded-full"></div>
            </div>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Explore my collection of innovative projects built with cutting-edge technologies and modern development practices.
            </motion.p>

            {/* Project statistics */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto"
            >
              {Object.entries(projectStats).map(([key, value]) => (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all group"
                >
                  <div className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">{key}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Projects grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className={cn(
                      "px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    )}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsEnhanced;
