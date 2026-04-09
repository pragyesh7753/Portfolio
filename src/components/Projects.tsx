import { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, Eye, Layers, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  status: 'completed' | 'in-progress' | 'planned';
  features?: string[];
  challenges?: string[];
  learnings?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'chatify',
    title: 'Chatify',
    description:
      'A modern, full-stack communication app blending the best of WhatsApp, Slack, and Facebook with innovative chat, call, and collaboration tools.',
    longDescription:
      'Chatify is a comprehensive communication platform that combines real-time messaging, voice/video calls, and collaborative features.',
    tech: ['React', 'Tailwind CSS', 'Daisy UI', 'Express', 'MongoDB', 'Cloudinary', 'Socket.io', 'Node.js'],
    category: 'fullstack',
    liveUrl: 'https://chatify.studio/',
    githubUrl: 'https://github.com/pragyesh7753/Chatify',
    featured: true,
    status: 'in-progress',
    features: [
      'Real-time messaging with Stream API',
      'Group chat functionality',
      'File and image sharing via Cloudinary',
      'User authentication and profiles',
      'Emoji reactions and typing indicators',
    ],
    challenges: [
      'Real-time synchronization across multiple users',
      'Efficient file upload and storage management',
    ],
    learnings: ['WebSocket for real-time communication', 'Cloud storage integration with Cloudinary'],
  },
  {
    id: 'internauto',
    title: 'InternAuto',
    description:
      'Automated internship application platform with AI-driven form filling and career guidance.',
    longDescription:
      'InternAuto revolutionizes the internship application process with modern web technologies and AI integration.',
    tech: ['React', 'JavaScript', 'Python', 'Flask', 'Selenium', 'Tailwind CSS', 'AI/ML'],
    category: 'fullstack',
    liveUrl: 'https://internauto.pragyesh.in/',
    githubUrl: 'https://github.com/pragyesh7753/InternAuto_project',
    featured: true,
    status: 'completed',
    features: [
      'AI-powered form filling automation',
      'Web scraping for internship opportunities',
      'Resume generation and optimization',
    ],
    challenges: [
      'Reliable web scraping across different platforms',
      'AI model integration for form understanding',
    ],
    learnings: ['Python automation with Selenium', 'AI/ML model integration'],
  },
  {
    id: 'todomaster-pro',
    title: 'TodoMaster Pro',
    description: 'Feature-rich todo application with React Context API and local storage persistence.',
    tech: ['React', 'Context API', 'Tailwind CSS', 'Local Storage'],
    category: 'frontend',
    liveUrl: 'https://todo.pragyesh.in/',
    githubUrl:
      'https://github.com/pragyesh7753/Web_Development/tree/main/React/10-todoContextLocal',
    featured: true,
    status: 'completed',
    features: [
      'Context API for global state management',
      'Local storage for data persistence',
      'Drag & drop task reordering',
    ],
  },
  {
    id: 'password-manager',
    title: 'Password Manager',
    description:
      'Secure password manager with local encryption and storage for managing credentials safely.',
    tech: ['React', 'LocalStorage', 'Encryption', 'JavaScript', 'Tailwind CSS'],
    category: 'frontend',
    liveUrl: 'https://pass-op.pragyesh.in/',
    githubUrl: 'https://github.com/pragyesh7753/Password-Manager_localStorage-version',
    status: 'completed',
    features: [
      'Local encryption for password security',
      'Random password generation',
      'Import/Export functionality',
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Modern portfolio website with smooth animations, dark mode, and responsive design.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Lenis'],
    category: 'frontend',
    liveUrl: 'https://pragyesh.in/',
    githubUrl: 'https://github.com/pragyesh7753/Portfolio',
    featured: true,
    status: 'completed',
    features: [
      'Smooth scroll with Lenis',
      'GSAP powered animations',
      'Dark/light mode toggle',
    ],
  },
  {
    id: 'harmony-music-school',
    title: 'Harmony Music School',
    description:
      'Modern music school platform built with Next.js and Aceternity UI for course management.',
    tech: ['Next.js', 'TypeScript', 'Aceternity UI', 'Tailwind CSS', 'React'],
    category: 'frontend',
    liveUrl: 'https://harmonyschool.pragyesh.in/',
    githubUrl:
      'https://github.com/pragyesh7753/Web_Development/tree/main/NEXT.js/Mini-Project/next-app',
    status: 'completed',
    features: [
      'Course catalog and management',
      'Student enrollment system',
      'Modern UI with Aceternity components',
    ],
  },
];

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  planned: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = ['all', 'fullstack', 'frontend', 'backend'];

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat = filter === 'all' || p.category === filter;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll('.proj-char');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { y: '100%' },
          {
            y: '0%',
            stagger: 0.03,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate grid cards
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );
    }
  }, [filtered]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute top-20 left-0 w-125 h-125 rounded-full blur-[120px] opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-violet-rgb),0.8), transparent 70%)',
        }}
      />
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Label */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-accent-violet/50 uppercase tracking-[0.3em]">
            03 — Work
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'SELECTED WORK'.split('').map((char, i) => (
                <span
                  key={i}
                  className="proj-char inline-block leading-[0.85] font-display bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl">
            A collection of {PROJECTS.length} projects built with precision, creativity, and modern
            technologies.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-14">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 capitalize',
                  filter === cat
                    ? 'bg-linear-to-r from-primary to-accent-violet text-white shadow-md shadow-primary/20'
                    : 'bg-foreground/4 text-muted-foreground hover:bg-foreground/8 border border-foreground/6'
                )}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full bg-foreground/3 border-foreground/6 text-sm h-10"
            />
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <Layers className="w-10 h-10 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm mb-4">No projects found</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => {
                    setFilter('all');
                    setSearch('');
                  }}
                >
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 auto-rows-fr gap-5">
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ────────────────────────────── Project Card with 3D Tilt ────────────────────────────── */

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const num = String(index + 1).padStart(2, '0');
  const cardRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const applyTilt = useCallback(() => {
    frameRef.current = null;
    if (!cardRef.current || !boundsRef.current) return;

    const rect = boundsRef.current;
    const x = pointerRef.current.x - rect.left;
    const y = pointerRef.current.y - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    boundsRef.current = cardRef.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (!boundsRef.current && cardRef.current) {
      boundsRef.current = cardRef.current.getBoundingClientRect();
    }
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(applyTilt);
  }, [applyTilt]);

  const handleMouseLeave = useCallback(() => {
    boundsRef.current = null;
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      layout
      className="project-card h-full"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-2xl border border-foreground/6 bg-linear-to-br from-foreground/2 to-primary/1.5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/4 via-transparent to-accent-violet/4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative h-full p-7 sm:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-display font-bold text-foreground/6 leading-none select-none">
                {num}
              </span>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight">
                  {project.title}
                </h3>
                <span
                  className={cn(
                    'inline-block text-[10px] px-2 py-0.5 rounded-full border mt-1.5 uppercase tracking-wider font-medium',
                    statusStyles[project.status]
                  )}
                >
                  {project.status === 'in-progress' ? 'In Progress' : project.status}
                </span>
              </div>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-foreground/6 text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-primary/4 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label={`Visit ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6 min-h-14 content-start">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary/6 text-primary/80 border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2 pt-5 border-t border-foreground/4">
            <Button variant="ghost" size="sm" className="rounded-full text-xs h-8 px-3" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1.5" />
                Demo
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full text-xs h-8 px-3" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3 mr-1.5" />
                Code
              </a>
            </Button>
            <div className="ml-auto">
              <ProjectModal project={project} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

/* ────────────────────────────── Project Modal ────────────────────────────── */

const ProjectModal = ({ project }: { project: Project }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm" className="rounded-full text-xs h-8 px-3">
        <Eye className="w-3 h-3 mr-1.5" />
        Details
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl font-display">
          {project.title}
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {project.status}
          </Badge>
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6 pt-2">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.longDescription || project.description}
        </p>
        <Separator />
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-foreground/4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="features">
            {project.features?.length ? (
              <ul className="space-y-2.5 pt-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground pt-2">No features listed</p>
            )}
          </TabsContent>
          <TabsContent value="tech">
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="insights" className="space-y-5 pt-2">
            {project.challenges?.length ? (
              <div>
                <h4 className="font-semibold mb-2 text-sm font-display">Challenges</h4>
                <ul className="space-y-1.5 text-sm">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.learnings?.length ? (
              <div>
                <h4 className="font-semibold mb-2 text-sm font-display">Learnings</h4>
                <ul className="space-y-1.5 text-sm">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary">•</span> {l}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
        <div className="flex gap-3 pt-2">
          <Button className="rounded-full" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default memo(Projects);
