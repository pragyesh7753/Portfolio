import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProfileAvatar } from './ProfileAvatar';

const Home = () => {
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
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="text-left order-2 md:order-1"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div variants={item} className="inline-block mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Full Stack Developer
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">Pragyesh Kumar Seth</span>
            </motion.h1>

            <motion.p variants={item} className="text-xl text-muted-foreground mb-8 max-w-xl">
              I build accessible, responsive and high-performance web applications with modern technologies.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mb-8">
              <Button asChild>
                <Link to="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="./src/assets/Pragyesh Kumar Seth resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6">
              <a href="https://github.com/pragyesh7753" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github size={24} />
              </a>
              <a href="http://www.linkedin.com/in/pragyesh77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={24} />
              </a>
              <a href="mailto:spragyesh86@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">Email</span>
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>

          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/5 via-blue-500/10 to-purple-600/5 blur-2xl animate-pulse duration-5000" />
              <ProfileAvatar 
                src="./src/assets/Pragyesh Kumar Seth.jpg" 
                alt="Pragyesh Kumar Seth" 
                size="xl"
                className="shadow-xl"
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="skills" className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frontend</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'].map((skill) => (
                      <div key={skill} className="flex items-center bg-primary/5 hover:bg-primary/10 transition-colors p-3 rounded-lg">
                        <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Backend</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Node.js', 'Express', 'Python', 'MongoDB', 'MySQL', 'RESTful APIs'].map((skill) => (
                      <div key={skill} className="flex items-center bg-primary/5 hover:bg-primary/10 transition-colors p-3 rounded-lg">
                        <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="experience" className="mt-6 space-y-4">
            
              <div className="border-l-2 border-primary/60 pl-4 py-2">
                <h3 className="font-semibold">Developed and Deployed Personal Projects</h3>
                {/* <p className="text-sm text-muted-foreground">Self-employed • 2022-2023</p>
                <p className="text-sm mt-2">Created websites for small businesses and startups</p> */}
                <p className="text-sm mt-2">You can see more in Projects Section</p>
              </div>
            </TabsContent>
            <TabsContent value="education" className="mt-6 space-y-4">
              <div className="border-l-2 border-primary pl-4 py-2">
                <h3 className="font-semibold">Master of Computer Applications</h3>
                <p className="text-sm text-muted-foreground">St. Andrews Institute of Technology and Management • 2024-2026</p>
                <p className="text-sm mt-2">Grade: A+</p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-2">
                <h3 className="font-semibold">Bachelor of Computer Applications</h3>
                <p className="text-sm text-muted-foreground">Veer Bahadur Singh Puravchal University • 2021-2024</p>
                <p className="text-sm mt-2">Grade: A+</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;