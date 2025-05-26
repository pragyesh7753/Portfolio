import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Search, Code, Star, TrendingUp, Eye, Share2, X, Grid, List, BarChart3, Sparkles, Zap, Layers, Cpu, Globe, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: 'frontend' | 'backend' | 'fullstack';
  featured?: boolean;
  stars?: number;
  forks?: number;
  status: 'completed' | 'in-progress' | 'planned';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  screenshots?: string[];
  features?: string[];
  challenges?: string[];
  learnings?: string[];
}

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showStats, setShowStats] = useState(true);

  const projects: Project[] = [
    {
      id: "internauto",
      title: "InternAuto - Automate Your Future",
      description: "Developed an automated internship application platform for Internshala using React and Python, featuring web scraping, AI-driven form filling, personalized career guidance, and resume generation.",
      longDescription: "InternAuto is a comprehensive platform that revolutionizes the internship application process. Built with modern web technologies and AI integration, it automates the tedious task of applying to multiple internships while providing personalized career guidance.",
      tech: ["React", "JavaScript", "Framer-Motion", "Typewriter-Effect", "Tailwind CSS", "Python", "Flask", "Selenium"],
      category: "fullstack",
      liveUrl: "https://internauto.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/InternAuto_project",
      featured: true,
      stars: 25,
      forks: 8,
      status: "completed",
      difficulty: "advanced",
      features: [
        "Automated form filling using AI",
        "Web scraping for real-time job listings",
        "Personalized resume generation",
        "Career guidance system",
        "Application tracking dashboard"
      ],
      challenges: [
        "Implementing reliable web scraping",
        "AI model integration for form filling",
        "Handling dynamic website structures"
      ],
      learnings: [
        "Advanced Python automation",
        "AI/ML integration in web apps",
        "Complex state management in React"
      ]
    },
    {
      id: "todo-context",
      title: "Todo App with Context API",
      description: "A feature-rich todo application built with React and Context API for state management.",
      longDescription: "A modern todo application showcasing advanced React patterns with Context API for global state management, local storage persistence, and smooth animations.",
      tech: ["React", "Context API", "Tailwind CSS"],
      category: "frontend",
      liveUrl: "https://todo.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Web_Development/tree/main/React/10-todoContextLocal",
      featured: true,
      stars: 15,
      forks: 5,
      status: "completed",
      difficulty: "intermediate",
      features: [
        "Context API state management",
        "Local storage persistence",
        "Drag and drop functionality",
        "Task categorization",
        "Dark/Light theme toggle"
      ]
    },
    {
      id: "password-manager",
      title: "Password Manager",
      description: "A secure password manager application with local storage implementation.",
      longDescription: "A client-side password manager that prioritizes security and user privacy by storing all data locally with encryption.",
      tech: ["React", "LocalStorage", "Encryption"],
      category: "frontend",
      liveUrl: "https://pass-op.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Password-Manager_localStorage-version",
      stars: 12,
      forks: 3,
      status: "completed",
      difficulty: "intermediate",
      features: [
        "Local encryption",
        "Password generation",
        "Secure storage",
        "Import/Export functionality"
      ]
    },
    {
      id: "snake-game",
      title: "Snake Game",
      description: "Classic snake game implementation with modern web technologies.",
      longDescription: "A nostalgic recreation of the classic Snake game with modern web technologies and enhanced graphics.",
      tech: ["JavaScript", "HTML Canvas", "CSS"],
      category: "frontend",
      liveUrl: "https://viperrun.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Snake-game-project-miniproject",
      featured: false,
      stars: 8,
      forks: 2,
      status: "completed",
      difficulty: "beginner",
      features: [
        "Smooth animations",
        "Score tracking",
        "Multiple difficulty levels",
        "Responsive controls"
      ]
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "Modern, Professional, and Feature-Rich Portfolio Website.",
      longDescription: "A cutting-edge portfolio website built with the latest technologies, featuring smooth animations, dark mode, and optimized performance.",
      tech: ["React", "Typescript", "Tailwind CSS", "Framer-Motion", "Radix UI", "Shadcn", "EmailJs"],
      category: "frontend",
      liveUrl: "https://pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Portfolio",
      featured: true,
      stars: 20,
      forks: 6,
      status: "completed",
      difficulty: "advanced",
      features: [
        "Modern design system",
        "Smooth animations",
        "Email integration",
        "SEO optimized",
        "Performance optimized"
      ]
    }
  ];

  // Get unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Calculate project statistics
  const projectStats = useMemo(() => {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalStars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);
    const totalForks = projects.reduce((sum, p) => sum + (p.forks || 0), 0);
    const techCount = allTechnologies.length;

    return {
      totalProjects,
      completedProjects,
      totalStars,
      totalForks,
      techCount,
      inProgress: projects.filter(p => p.status === 'in-progress').length
    };
  }, [projects, allTechnologies]);

  // Enhanced filtering and sorting
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTech = selectedTech === 'all' || project.tech.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchQuery, selectedCategory, selectedTech, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  const featuredProjects = projects.filter(p => p.featured);

  // Category icons
  const categoryIcons = {
    frontend: Globe,
    backend: Database,
    fullstack: Layers
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 0.8, 1.3, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Enhanced Hero Header */}
          <div className="mb-16 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                My Projects
              </h2>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Showcasing {projectStats.totalProjects} innovative projects crafted with precision,
              creativity, and cutting-edge technology
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant="outline"
                size="lg"
                asChild
                className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <a href="https://github.com/pragyesh7753" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="button-bg"
                  />
                  <Github className="mr-2 h-5 w-5 relative z-10" />
                  <span className="relative z-10">Explore GitHub</span>
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowStats(!showStats)}
                className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <BarChart3 className="mr-2 h-5 w-5 relative z-10" />
                <span className="relative z-10">{showStats ? 'Hide' : 'Show'} Analytics</span>
              </Button>
            </motion.div>
          </div>

          {/* Enhanced Statistics with Glass Morphism */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="mb-16"
              >
                <div className="relative p-8 rounded-3xl bg-background/30 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
                    {[
                      { value: projectStats.totalProjects, label: "Total Projects", icon: Code, color: "from-blue-500 to-cyan-500" },
                      { value: projectStats.completedProjects, label: "Completed", icon: Star, color: "from-green-500 to-emerald-500" },
                      { value: projectStats.totalStars, label: "GitHub Stars", icon: Github, color: "from-yellow-500 to-orange-500" },
                      { value: projectStats.totalForks, label: "Forks", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
                      { value: projectStats.techCount, label: "Technologies", icon: Cpu, color: "from-indigo-500 to-purple-500" }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center group cursor-pointer"
                      >
                        <div className="relative mb-3">
                          <motion.div
                            className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <stat.icon className="w-full h-full text-white" />
                          </motion.div>
                        </div>
                        <motion.div
                          className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Search and Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative p-6 rounded-2xl bg-background/40 backdrop-blur-lg border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl" />

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative w-full sm:max-w-sm group">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        placeholder="Search projects, technologies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 bg-background/50 border-white/20 focus:border-primary/50 focus:bg-background/70 transition-all duration-300"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full sm:w-[160px] h-12 bg-background/50 border-white/20 hover:border-primary/30 transition-colors">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background/95 backdrop-blur-lg border-white/20">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="frontend" className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Frontend
                        </SelectItem>
                        <SelectItem value="backend">
                          <Database className="mr-2 h-4 w-4" />
                          Backend
                        </SelectItem>
                        <SelectItem value="fullstack">
                          <Layers className="mr-2 h-4 w-4" />
                          Full Stack
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedTech} onValueChange={setSelectedTech}>
                      <SelectTrigger className="w-full sm:w-[160px] h-12 bg-background/50 border-white/20 hover:border-primary/30 transition-colors">
                        <SelectValue placeholder="Technology" />
                      </SelectTrigger>
                      <SelectContent className="bg-background/95 backdrop-blur-lg border-white/20">
                        <SelectItem value="all">All Technologies</SelectItem>
                        {allTechnologies.map(tech => (
                          <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[140px] h-12 bg-background/50 border-white/20">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-background/95 backdrop-blur-lg border-white/20">
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="stars">Stars</SelectItem>
                        <SelectItem value="title">Name</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border border-white/20 rounded-xl bg-background/30 overflow-hidden">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-none h-12 px-4 border-0"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-none h-12 px-4 border-0"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Active Filters */}
                {(selectedCategory !== 'all' || selectedTech !== 'all' || searchQuery) && (
                  <motion.div
                    className="flex items-center gap-3 flex-wrap p-4 bg-background/30 rounded-xl border border-white/10"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-medium">Active filters:</span>
                    {selectedCategory !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-2 bg-primary/10 text-primary border-primary/30">
                        {React.createElement(categoryIcons[selectedCategory as keyof typeof categoryIcons], { className: "h-3 w-3" })}
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory('all')}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedTech !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-2 bg-secondary/10 text-secondary border-secondary/30">
                        <Code className="h-3 w-3" />
                        {selectedTech}
                        <button onClick={() => setSelectedTech('all')}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-2 bg-accent/10 text-accent border-accent/30">
                        <Search className="h-3 w-3" />
                        "{searchQuery}"
                        <button onClick={() => setSearchQuery('')}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedTech('all');
                      }}
                      className="text-xs hover:bg-destructive/10 hover:text-destructive ml-auto"
                    >
                      Clear all
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Featured Projects */}
          {featuredProjects.length > 0 && selectedCategory === 'all' && selectedTech === 'all' && searchQuery === '' && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center mb-12">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-7 w-7 text-primary" />
                  </motion.div>
                  Featured Creations
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-7 w-7 text-secondary fill-secondary" />
                  </motion.div>
                </motion.h3>
                <p className="text-muted-foreground">Handpicked projects that showcase innovation and creativity</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 80
                    }}
                    whileHover={{
                      y: -12,
                      transition: { duration: 0.3, type: "spring", stiffness: 300 }
                    }}
                  >
                    <EnhancedProjectCard
                      project={project}
                      featured={true}
                      viewMode="grid"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced Projects Grid/List */}
          {filteredAndSortedProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-16 text-center rounded-2xl bg-background/20 backdrop-blur-lg border border-dashed border-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="relative z-10 max-w-md mx-auto">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Search className="mx-auto h-16 w-16 text-primary mb-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  No projects match your current search criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTech('all');
                  }}
                  className="bg-background/50 hover:bg-background/70 border-primary/30"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Clear all filters
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* All Projects Heading */}
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Code className="h-7 w-7 text-accent" />
                  </motion.div>
                  All Projects
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Layers className="h-7 w-7 text-primary" />
                  </motion.div>
                </motion.h3>
                <p className="text-muted-foreground">
                  {filteredAndSortedProjects.length === projects.length 
                    ? `Complete collection of all projects` 
                    : `${filteredAndSortedProjects.length} projects matching your criteria`
                  }
                </p>
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={cn(
                  "gap-8",
                  viewMode === 'grid'
                    ? "grid sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col"
                )}
              >
                {filteredAndSortedProjects.map((project) => (
                  <motion.div key={project.id} variants={item}>
                    <EnhancedProjectCard
                      project={project}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const EnhancedProjectCard = ({ project, featured = false, viewMode = 'grid' }: {
  project: Project,
  featured?: boolean,
  viewMode?: 'grid' | 'list'
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  const statusColors = {
    completed: 'from-green-500 to-emerald-600',
    'in-progress': 'from-yellow-500 to-orange-600',
    planned: 'from-blue-500 to-indigo-600'
  };

  const difficultyColors = {
    beginner: 'from-green-400 to-green-600',
    intermediate: 'from-yellow-400 to-yellow-600',
    advanced: 'from-red-400 to-red-600'
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        style={featured ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        onMouseMove={featured ? handleMouseMove : undefined}
        onMouseEnter={() => {
          if (featured) {
            // Handle hover effects for featured projects
          }
        }}
        onMouseLeave={() => {
          if (featured) {
            mouseX.set(0);
            mouseY.set(0);
          }
        }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card className="overflow-hidden transition-all duration-500 relative bg-background/40 backdrop-blur-lg border-white/20 hover:border-primary/50 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col md:flex-row relative z-10">
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {featured && <Star className="h-4 w-4 text-primary fill-primary" />}
                    <Badge className={statusColors[project.status]} variant="outline">
                      {project.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={difficultyColors[project.difficulty]} variant="outline">
                      {project.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(tech => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.stars !== undefined && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <Github className="h-3 w-3" />
                        {project.forks} forks
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="default" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <ProjectDetailsModal project={project} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={featured ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      onMouseMove={featured ? handleMouseMove : undefined}
      onMouseEnter={() => {
        if (featured) {
          // Handle hover effects for featured projects
        }
      }}
      onMouseLeave={() => {
        if (featured) {
          mouseX.set(0);
          mouseY.set(0);
        }
      }}
      whileHover={{ scale: featured ? 1.05 : 1.03 }}
      className="group h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-500 relative",
        "bg-background/40 backdrop-blur-lg border-white/20",
        "hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20",
        featured && "bg-gradient-to-br from-background/60 to-background/40"
      )}>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%)`
          }}
        />

        {/* Floating Badge */}
        {featured && (
          <motion.div
            className="absolute top-4 right-4 z-20"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-full shadow-lg">
              <Star className="h-4 w-4 text-white fill-white" />
            </div>
          </motion.div>
        )}

        <CardHeader className="pb-4 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <CardTitle className="text-lg flex items-center gap-3 group-hover:text-primary transition-colors duration-300">
              {featured && (
                <motion.div
                  className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Code className="h-5 w-5 text-primary" />
                </motion.div>
              )}
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {project.title}
              </span>
            </CardTitle>

            <div className="flex gap-2">
              <Badge className={cn("text-xs font-medium bg-gradient-to-r", statusColors[project.status], "text-white border-0")}>
                {project.status === 'in-progress' ? 'WIP' : project.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <CardDescription className="line-clamp-3 leading-relaxed">
            {project.description}
          </CardDescription>

          {project.stars !== undefined && (
            <motion.div
              className="flex items-center gap-4 text-xs text-muted-foreground mt-3"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-500" />
                <span className="font-medium">{project.stars}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">{project.forks}</span>
              </div>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="pb-4 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                    "bg-background/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30",
                    featured && "bg-primary/5 border-primary/20"
                  )}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.tech.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs bg-background/30 hover:bg-accent/10 transition-colors"
              >
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-2 relative z-10 border-t border-white/10">
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-primary hover:bg-primary/10 transition-all duration-300 group/btn"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1 group-hover/btn:rotate-12 transition-transform" />
                  Demo
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-primary hover:bg-primary/10 transition-all duration-300 group/btn"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1 group-hover/btn:rotate-12 transition-transform" />
                  Code
                </a>
              </Button>
            </motion.div>
          </div>

          <ProjectDetailsModal project={project} />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// New Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
    </div>
  );
};

const ProjectDetailsModal = ({ project }: { project: Project }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:text-primary">
          <Eye className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {project.title}
            <Badge className={`
              ${project.status === 'completed' ? 'text-green-500 bg-green-500/10' : ''}
              ${project.status === 'in-progress' ? 'text-yellow-500 bg-yellow-500/10' : ''}
              ${project.status === 'planned' ? 'text-blue-500 bg-blue-500/10' : ''}
            `} variant="outline">
              {project.status.replace('-', ' ')}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground">{project.longDescription || project.description}</p>
          </div>

          <Separator />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{project.stars || 0}</div>
                  <div className="text-xs text-muted-foreground">GitHub Stars</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{project.forks || 0}</div>
                  <div className="text-xs text-muted-foreground">Forks</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{project.tech.length}</div>
                  <div className="text-xs text-muted-foreground">Technologies</div>
                </div>
                <div className="text-center p-3 bg-muted/20 rounded-lg">
                  <div className="text-lg font-semibold text-primary">{project.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              {project.features && project.features.length > 0 ? (
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific features listed for this project.</p>
              )}
            </TabsContent>

            <TabsContent value="tech" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-sm py-1 px-3">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Category:</strong> {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-red-500" />
                    Challenges
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learnings && project.learnings.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-blue-500" />
                    Key Learnings
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {project.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(!project.challenges || project.challenges.length === 0) &&
                (!project.learnings || project.learnings.length === 0) && (
                  <p className="text-muted-foreground">No insights available for this project.</p>
                )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Projects;