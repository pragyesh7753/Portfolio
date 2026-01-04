import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, Code, Star, Eye, X, Grid, List, BarChart3, Sparkles, Globe, Database, Layers } from 'lucide-react';
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
  features?: string[];
  challenges?: string[];
  learnings?: string[];
}

const PROJECTS: Project[] = [
  {
    id: "chatify",
    title: "Chatify - Full Stack Chat Application",
    description: "A modern, full-stack, and feature-rich communication app blending the best of WhatsApp, Slack, and Facebook with innovative chat, call, and collaboration tools.",
    longDescription: "Chatify is a comprehensive communication platform that combines real-time messaging, voice/video calls, and collaborative features. Built with modern web technologies, it offers a seamless user experience with features like group chats, file sharing, emoji reactions, and more.",
    tech: ["React", "Tailwind CSS", "Daisy UI", "Express", "MongoDB", "Cloudinary", "Socket.io", "Node.js"],
    category: "fullstack",
    liveUrl: "https://chatify.pragyesh.tech/",
    githubUrl: "https://github.com/pragyesh7753/Chatify",
    featured: true,
    stars: 35,
    forks: 12,
    status: "in-progress",
    difficulty: "advanced",
    features: [
      "Real-time messaging with Stream API",
      "Group chat functionality",
      "File and image sharing via Cloudinary",
      "User authentication and profiles",
      "Emoji reactions and typing indicators",
      "Message search and history",
      "Responsive design with Tailwind CSS",
      "Modern UI components with Daisy UI"
    ],
    challenges: [
      "Real-time synchronization across multiple users",
      "Efficient file upload and storage management",
      "Scalable socket connection handling",
      "Database optimization for message history"
    ],
    learnings: [
      "WebSocket for real-time communication",
      "Cloud storage integration with Cloudinary",
      "Advanced React state management",
      "MongoDB schema design for chat applications"
    ]
  },
  {
    id: "internauto",
    title: "InternAuto - Automate Your Future",
    description: "Automated internship application platform with AI-driven form filling and career guidance.",
    longDescription: "InternAuto revolutionizes the internship application process with modern web technologies and AI integration. It automates form filling, provides career guidance, and streamlines the entire application workflow.",
    tech: ["React", "JavaScript", "Python", "Flask", "Selenium", "Tailwind CSS", "AI/ML"],
    category: "fullstack",
    liveUrl: "https://internauto.pragyesh.tech/",
    githubUrl: "https://github.com/pragyesh7753/InternAuto_project",
    featured: true,
    stars: 25,
    forks: 8,
    status: "completed",
    difficulty: "advanced",
    features: [
      "AI-powered form filling automation",
      "Web scraping for internship opportunities",
      "Resume generation and optimization",
      "Career guidance and recommendations",
      "Application tracking dashboard",
      "Integration with popular job portals"
    ],
    challenges: [
      "Reliable web scraping across different platforms",
      "AI model integration for form understanding",
      "Dynamic website handling with Selenium",
      "Anti-bot detection bypassing"
    ],
    learnings: [
      "Python automation with Selenium",
      "AI/ML model integration",
      "Complex React state management",
      "Flask backend development"
    ]
  },
  {
    id: "todomaster-pro",
    title: "TodoMaster Pro",
    description: "Feature-rich todo application with React Context API and local storage persistence.",
    longDescription: "A comprehensive task management application built with React Context API for state management and local storage for data persistence. Features include task categorization, drag-and-drop functionality, and theme customization.",
    tech: ["React", "Context API", "Tailwind CSS", "Local Storage"],
    category: "frontend",
    liveUrl: "https://todo.pragyesh.tech/",
    githubUrl: "https://github.com/pragyesh7753/Web_Development/tree/main/React/10-todoContextLocal",
    featured: true,
    stars: 15,
    forks: 5,
    status: "completed",
    difficulty: "intermediate",
    features: [
      "Context API for global state management",
      "Local storage for data persistence",
      "Drag & drop task reordering",
      "Task categories and filtering",
      "Dark/light theme toggle",
      "Task completion tracking"
    ],
    challenges: [
      "Implementing drag-and-drop functionality",
      "Managing complex state with Context API",
      "Local storage synchronization"
    ],
    learnings: [
      "React Context API best practices",
      "Local storage management",
      "Advanced React hooks usage"
    ]
  },
  {
    id: "password-manager",
    title: "Password Manager",
    description: "Secure password manager with local encryption and storage for managing credentials safely.",
    longDescription: "A secure password management application that stores encrypted passwords locally. Features password generation, secure storage, and import/export capabilities for managing all your credentials in one place.",
    tech: ["React", "LocalStorage", "Encryption", "JavaScript", "Tailwind CSS"],
    category: "frontend",
    liveUrl: "https://pass-op.pragyesh.tech/",
    githubUrl: "https://github.com/pragyesh7753/Password-Manager_localStorage-version",
    stars: 12,
    forks: 3,
    status: "completed",
    difficulty: "intermediate",
    features: [
      "Local encryption for password security",
      "Random password generation",
      "Secure local storage",
      "Import/Export functionality",
      "Search and filter passwords",
      "Copy to clipboard feature"
    ],
    challenges: [
      "Implementing client-side encryption",
      "Secure local data storage",
      "User experience for password management"
    ],
    learnings: [
      "Client-side encryption techniques",
      "Security best practices",
      "Local storage optimization"
    ]
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Modern, professional portfolio website with smooth animations, dark mode, and responsive design.",
    longDescription: "A contemporary portfolio website showcasing projects, skills, and experience. Built with modern technologies and featuring smooth animations, email integration, and SEO optimization for maximum impact.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "EmailJS"],
    category: "frontend",
    liveUrl: "https://pragyesh.tech/",
    githubUrl: "https://github.com/pragyesh7753/Portfolio",
    featured: true,
    stars: 20,
    forks: 6,
    status: "completed",
    difficulty: "intermediate",
    features: [
      "Modern and clean design",
      "Smooth animations with Framer Motion",
      "Dark/light mode toggle",
      "Email integration for contact form",
      "SEO optimized",
      "Fully responsive design",
      "TypeScript for type safety"
    ],
    challenges: [
      "Complex animation orchestration",
      "Performance optimization",
      "Cross-browser compatibility"
    ],
    learnings: [
      "Advanced Framer Motion animations",
      "TypeScript best practices",
      "Modern UI/UX principles"
    ]
  },
  {
    id: "harmony-music-school",
    title: "Harmony Music School",
    description: "Modern music school platform built with Next.js and Aceternity UI for course management and student engagement.",
    longDescription: "A comprehensive music education platform designed for music schools. Features course management, student dashboards, event scheduling, and instructor tools, all wrapped in a modern and intuitive interface.",
    tech: ["Next.js", "TypeScript", "Aceternity UI", "Tailwind CSS", "React"],
    category: "frontend",
    liveUrl: "https://harmonyschool.pragyesh.tech/",
    githubUrl: "https://github.com/pragyesh7753/Web_Development/tree/main/NEXT.js/Mini-Project/next-app",
    stars: 8,
    forks: 2,
    status: "completed",
    difficulty: "intermediate",
    features: [
      "Course catalog and management",
      "Student enrollment system",
      "Instructor dashboards",
      "Event and recital scheduling",
      "Responsive design",
      "Modern UI with Aceternity components"
    ],
    challenges: [
      "Complex component architecture",
      "State management across pages",
      "Integration with Aceternity UI"
    ],
    learnings: [
      "Next.js framework features",
      "Advanced TypeScript usage",
      "Component library integration"
    ]
  }
];

const Projects = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [tech, setTech] = useState('all');
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showStats, setShowStats] = useState(true);

  const technologies = useMemo(() =>
    [...new Set(PROJECTS.flatMap(p => p.tech))].sort(), []
  );

  const stats = useMemo(() => ({
    total: PROJECTS.length,
    completed: PROJECTS.filter(p => p.status === 'completed').length,
    stars: PROJECTS.reduce((sum, p) => sum + (p.stars || 0), 0),
    forks: PROJECTS.reduce((sum, p) => sum + (p.forks || 0), 0),
    techCount: technologies.length
  }), [technologies]);

  const filteredProjects = useMemo(() => {
    let filtered = PROJECTS.filter(project => {
      const matchesSearch = !search ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = category === 'all' || project.category === category;
      const matchesTech = tech === 'all' || project.tech.includes(tech);

      return matchesSearch && matchesCategory && matchesTech;
    });

    return filtered.sort((a, b) => {
      if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sort === 'stars') return (b.stars || 0) - (a.stars || 0);
      if (sort === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [search, category, tech, sort]);

  const featuredProjects = useMemo(() =>
    PROJECTS.filter(p => p.featured), []
  );

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setTech('all');
  };

  const hasFilters = search || category !== 'all' || tech !== 'all';

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8 pb-1.5 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My Projects
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Showcasing {stats.total} innovative projects crafted with precision and creativity
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button variant="outline" size="lg" asChild className="bg-background/50 backdrop-blur-sm">
                <a href="https://github.com/pragyesh7753" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowStats(!showStats)}
                className="bg-background/50 backdrop-blur-sm"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                {showStats ? 'Hide' : 'Show'} Stats
              </Button>
            </motion.div>
          </div>

          {/* Statistics */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-16"
              >
                <StatsCard stats={stats} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 rounded-2xl bg-background/40 backdrop-blur-lg border border-white/10">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-12 h-12 bg-background/50"
                    />
                  </div>

                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full sm:w-[160px] h-12 bg-background/50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={tech} onValueChange={setTech}>
                    <SelectTrigger className="w-full sm:w-[160px] h-12 bg-background/50">
                      <SelectValue placeholder="Technology" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Technologies</SelectItem>
                      {technologies.map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-[140px] h-12 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="stars">Stars</SelectItem>
                      <SelectItem value="title">Name</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex bg-background/30 overflow-hidden">
                    <div className="flex rounded-full bg-muted p-1 shadow-sm transition-all border border-border">
                      <button
                        aria-label="Grid view"
                        onClick={() => setView('grid')}
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200
                          ${view === 'grid' ? 'bg-primary text-primary-foreground shadow' : 'bg-transparent text-muted-foreground'}
                          focus-visible:ring-2 focus-visible:ring-primary/60
                        `}
                        style={{ outline: 'none', border: 'none' }}
                      >
                        <Grid className={`h-5 w-5 transition-colors duration-200 ${view === 'grid' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </button>
                      <button
                        aria-label="List view"
                        onClick={() => setView('list')}
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200
                          ${view === 'list' ? 'bg-primary text-primary-foreground shadow' : 'bg-transparent text-muted-foreground'}
                          focus-visible:ring-2 focus-visible:ring-primary/60
                        `}
                        style={{ outline: 'none', border: 'none' }}
                      >
                        <List className={`h-5 w-5 transition-colors duration-200 ${view === 'list' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {hasFilters && (
                <motion.div
                  className="flex items-center gap-3 flex-wrap p-4 bg-background/30 rounded-xl border border-white/10 mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground font-medium">Active filters:</span>
                  {category !== 'all' && (
                    <Badge variant="secondary" className="flex items-center gap-2">
                      {category}
                      <button onClick={() => setCategory('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {tech !== 'all' && (
                    <Badge variant="secondary" className="flex items-center gap-2">
                      {tech}
                      <button onClick={() => setTech('all')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {search && (
                    <Badge variant="secondary" className="flex items-center gap-2">
                      "{search}"
                      <button onClick={() => setSearch('')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                    Clear all
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && !hasFilters && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="h-7 w-7 text-primary" />
                  Featured Projects
                  <Star className="h-7 w-7 text-secondary fill-secondary" />
                </h3>
                <p className="text-muted-foreground">Handpicked projects showcasing innovation</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    whileHover={{ y: -12 }}
                  >
                    <ProjectCard project={project} featured />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Projects */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-16 text-center rounded-2xl bg-background/20 backdrop-blur-lg border border-dashed border-primary/30"
            >
              <Search className="mx-auto h-16 w-16 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-3">No projects found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Code className="h-7 w-7 text-accent" />
                  All Projects
                  <Layers className="h-7 w-7 text-primary" />
                </h3>
                <p className="text-muted-foreground">
                  {filteredProjects.length === PROJECTS.length
                    ? 'Complete collection of all projects'
                    : `${filteredProjects.length} projects matching your criteria`
                  }
                </p>
              </div>

              <motion.div
                className={cn(
                  "gap-8",
                  view === 'grid' ? "grid sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProjectCard project={project} viewMode={view} />
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

const StatsCard = memo(({ stats }: { stats: any }) => {
  const statsData = [
    { value: stats.total, label: "Projects", icon: Code, color: "from-blue-500 to-cyan-500" },
    { value: stats.completed, label: "Completed", icon: Star, color: "from-green-500 to-emerald-500" },
    { value: stats.stars, label: "Stars", icon: Github, color: "from-yellow-500 to-orange-500" },
    { value: stats.forks, label: "Forks", icon: Globe, color: "from-purple-500 to-pink-500" },
    { value: stats.techCount, label: "Technologies", icon: Database, color: "from-indigo-500 to-purple-500" }
  ];

  return (
    <div className="p-8 rounded-3xl bg-background/30 backdrop-blur-xl border border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center group"
          >
            <motion.div
              className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} p-4 shadow-lg mb-3`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <stat.icon className="w-full h-full text-white" />
            </motion.div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

const ProjectCard = memo(({ project, featured = false, viewMode = 'grid' }: {
  project: Project;
  featured?: boolean;
  viewMode?: 'grid' | 'list';
}) => {
  const statusColors = {
    completed: 'from-green-500 to-emerald-600',
    'in-progress': 'from-yellow-500 to-orange-600',
    planned: 'from-blue-500 to-indigo-600'
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden bg-background/40 backdrop-blur-lg border-white/20 hover:border-primary/50">
        <div className="flex flex-col md:flex-row p-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              {featured && <Star className="h-4 w-4 text-primary fill-primary" />}
              <Badge className={cn("text-xs bg-gradient-to-r text-white", statusColors[project.status])}>
                {project.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map(tech => (
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default" size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Demo
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" />
                  Code
                </a>
              </Button>
              <ProjectModal project={project} />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="group h-full">
      <Card className="h-full overflow-hidden bg-background/40 backdrop-blur-lg border-white/20 hover:border-primary/50 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-full">
              <Star className="h-4 w-4 text-white fill-white" />
            </div>
          </div>
        )}

        <CardHeader className="pb-4 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <CardTitle className="text-lg flex items-center gap-3">
              {featured && (
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Code className="h-5 w-5 text-primary" />
                </div>
              )}
              <span>{project.title}</span>
            </CardTitle>
            <Badge className={cn("text-xs bg-gradient-to-r text-white", statusColors[project.status])}>
              {project.status === 'in-progress' ? 'WIP' : project.status.toUpperCase()}
            </Badge>
          </div>
          <CardDescription className="line-clamp-3">{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="pb-4 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-2 relative z-10 border-t border-white/10">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Demo
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          </div>
          <ProjectModal project={project} />
        </CardFooter>
      </Card>
    </motion.div>
  );
});

const ProjectModal = ({ project }: { project: Project }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm" className='bg-background'>
        <Eye className="h-3.5 w-3.5" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          {project.title}
          <Badge variant="outline">{project.status.replace('-', ' ')}</Badge>
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <p className="text-muted-foreground">{project.longDescription || project.description}</p>
        <Separator />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-background">
            <TabsTrigger value="overview" className='mr-1'>Overview</TabsTrigger>
            <TabsTrigger value="features" className='mr-1'>Features</TabsTrigger>
            <TabsTrigger value="tech" className='mr-1'>Technology</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <div className="text-lg font-semibold text-primary">{project.stars || 0}</div>
                <div className="text-xs text-muted-foreground">Stars</div>
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
                  Live Project
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="features">
            {project.features?.length ? (
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No features listed</p>
            )}
          </TabsContent>

          <TabsContent value="tech">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map(tech => (
                <Badge key={tech} variant="secondary" className="text-sm py-1 px-3">
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Category:</strong> {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </p>
          </TabsContent>

          <TabsContent value="insights">
            {project.challenges?.length && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Challenges</h4>
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
            {project.learnings?.length && (
              <div>
                <h4 className="font-semibold mb-2">Key Learnings</h4>
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
            {!project.challenges?.length && !project.learnings?.length && (
              <p className="text-muted-foreground">No insights available</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DialogContent>
  </Dialog>
);

export default memo(Projects);