import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Search, Code, Tags } from 'lucide-react';
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
  image?: string;
}

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects: Project[] = [
    {
      title: "Todo App with Context API",
      description: "A feature-rich todo application built with React and Context API for state management.",
      tech: ["React", "Context API", "Tailwind CSS"],
      category: "frontend",
      liveUrl: "https://todo.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Web_Development/tree/main/React/10-todoContextLocal",
      featured: true,
      image: "/todo-app.jpg"
    },
    {
      title: "Password Manager",
      description: "A secure password manager application with local storage implementation.",
      tech: ["React", "LocalStorage", "Encryption"],
      category: "frontend",
      liveUrl: "https://pass-op.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Password-Manager_localStorage-version"
    },
    {
      title: "Snake Game",
      description: "Classic snake game implementation with modern web technologies.",
      tech: ["JavaScript", "HTML Canvas", "CSS"],
      category: "frontend",
      liveUrl: "https://viperrun.pragyesh.tech/",
      githubUrl: "https://github.com/pragyesh7753/Snake-game-project-miniproject",
      featured: true
    },
    
  ];

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const featuredProjects = projects.filter(p => p.featured);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
            <div className="mt-4 sm:mt-0">
              <Button variant="outline" asChild>
                <a 
                  href="https://github.com/pragyesh7753" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" /> 
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center flex-wrap gap-2">
              <Tags className="h-4 w-4 mr-1 text-muted-foreground" />
              <Badge 
                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => handleCategoryChange('all')}
              >
                All
              </Badge>
              <Badge 
                variant={selectedCategory === 'frontend' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => handleCategoryChange('frontend')}
              >
                Frontend
              </Badge>
              <Badge 
                variant={selectedCategory === 'backend' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => handleCategoryChange('backend')}
              >
                Backend
              </Badge>
              <Badge 
                variant={selectedCategory === 'fullstack' ? 'default' : 'outline'} 
                className="cursor-pointer"
                onClick={() => handleCategoryChange('fullstack')}
              >
                Full Stack
              </Badge>
            </div>
          </div>

          {featuredProjects.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full">Featured Projects</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card className="h-full overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="flex items-center">
                            <Code className="mr-2 h-5 w-5 text-primary" />
                            {project.title}
                          </CardTitle>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map(tech => (
                            <Badge key={tech} variant="outline" className="bg-primary/5">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center group"
                          >
                            <ExternalLink className="mr-1 h-4 w-4 group-hover:text-primary transition-colors" />
                            <span className="group-hover:text-primary transition-colors">Live Demo</span>
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center group"
                          >
                            <Github className="mr-1 h-4 w-4 group-hover:text-primary transition-colors" />
                            <span className="group-hover:text-primary transition-colors">Source Code</span>
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.title} 
                  variants={item}
                  whileHover={{ y: -5 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "h-full overflow-hidden hover:shadow-md transition-all duration-300",
        isHovered && "border-primary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(tech => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("hover:text-primary relative overflow-hidden group", isHovered && "text-primary")} 
          asChild
        >
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Live Demo 
            <ArrowRight className={cn(
              "h-3.5 w-3.5 transition-transform duration-300", 
              isHovered ? "translate-x-1" : ""
            )} />
            {isHovered && (
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </a>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("hover:text-primary", isHovered && "text-primary")} 
          asChild
        >
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <Github className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              isHovered ? "scale-110" : ""
            )} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Projects;