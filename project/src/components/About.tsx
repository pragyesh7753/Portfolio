import { motion, useAnimation } from 'framer-motion';
import { Code2, Server, Globe, Database, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const About = () => {
  const skills = [
    { 
      name: 'Frontend Development', 
      icon: <Code2 className="w-6 h-6" />, 
      description: 'Building responsive and interactive UI with modern frameworks',
      technologies: [
        { name: 'React', proficiency: 90 },
        { name: 'TypeScript', proficiency: 85 },
        { name: 'Tailwind CSS', proficiency: 95 },
        { name: 'JavaScript', proficiency: 90 },
      ]
    },
    { 
      name: 'Backend Development', 
      icon: <Server className="w-6 h-6" />, 
      description: 'Creating robust server-side applications and APIs',
      technologies: [
        { name: 'Node.js', proficiency: 85 },
        { name: 'Express', proficiency: 50 },
        { name: 'Python', proficiency: 75 },
      ]
    },
    { 
      name: 'Web Technologies', 
      icon: <Globe className="w-6 h-6" />, 
      description: 'Implementing core web technologies and best practices',
      technologies: [
        { name: 'HTML5', proficiency: 95 },
        { name: 'CSS3', proficiency: 90 },
        { name: 'Responsive Design', proficiency: 90 },
      ]
    },
    { 
      name: 'Database', 
      icon: <Database className="w-6 h-6" />, 
      description: 'Designing and managing various database systems',
      technologies: [
        { name: 'MongoDB', proficiency: 80 },
        { name: 'MySQL', proficiency: 75 },
      ]
    }
  ];

  const achievements = [
    "Successfully developed and deployed 5+ web projects",
    "Ranked at 2nd position in Coding Contest",
    "Ranked at 1st position in Tech Quiz",
    "Secured 1st position in semester examination",
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Product Manager at TechCorp",
      text: "Pragyesh built our company website with exceptional attention to detail. His technical expertise and communication skills made the project a success.",
    },
    {
      name: "Sarah Williams",
      role: "Startup Founder",
      text: "Working with Pragyesh was a pleasure. He delivered our web application ahead of schedule and exceeded our expectations with the quality of his work.",
    },
    {
      name: "Michael Chen",
      role: "CTO at WebSolutions",
      text: "Pragyesh has a deep understanding of modern web technologies. His problem-solving abilities and clean code practices are truly impressive.",
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <p className="text-lg text-muted-foreground">
                  I am a passionate Full Stack Developer with expertise in modern web technologies.
                  My journey in web development started with curiosity and has evolved into a
                  professional career building robust and scalable applications.
                </p>
                <p className="text-lg text-muted-foreground">
                  I specialize in creating responsive web applications using React and Node.js,
                  with a strong focus on clean code and optimal user experience. I'm constantly
                  learning and adapting to new technologies to stay current in this ever-evolving field.
                </p>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader className="bg-primary/5 pb-3">
                    <CardTitle className="text-xl">Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <div className="text-muted-foreground">Name:</div>
                      <div className="font-medium">Pragyesh Kumar Seth</div>
                      
                      <div className="text-muted-foreground">Location:</div>
                      <div className="font-medium">Jaunpur, U.P., India</div>
                      
                      <div className="text-muted-foreground">Email:</div>
                      <div className="font-medium break-all">spragyesh86@gmail.com</div>
                      
                      <div className="text-muted-foreground">Experience:</div>
                      <div className="font-medium">Fresher</div>
                      
                      <div className="text-muted-foreground">Availability:</div>
                      <div className="font-medium">Full-time</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
            
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="skills">Skills Overview</TabsTrigger>
                <TabsTrigger value="technical">Technical Proficiency</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {skills.map((skill, index) => (
                    <FloatingCard 
                      key={skill.name} 
                      delay={index * 0.1}
                      className="h-full"
                    >
                      <CardHeader className="pb-3">
                        <div className="text-primary mb-3">{skill.icon}</div>
                        <CardTitle>{skill.name}</CardTitle>
                        <CardDescription>{skill.description}</CardDescription>
                      </CardHeader>
                    </FloatingCard>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-0 space-y-8">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {skill.icon}
                      <span>{skill.name}</span>
                    </h3>
                    <div className="space-y-4">
                      {skill.technologies.map((tech, techIndex) => (
                        <motion.div 
                          key={tech.name} 
                          className="space-y-1"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: index * 0.1 + techIndex * 0.1, duration: 0.5 }}
                        >
                          <div className="flex justify-between text-sm">
                            <span>{tech.name}</span>
                            <span>{tech.proficiency}%</span>
                          </div>
                          <ProgressBar value={tech.proficiency} delay={index * 0.1 + techIndex * 0.1} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="h-full hover:border-primary/30 transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                            {testimonial.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 text-4xl text-primary/20">"</div>
                        <p className="text-muted-foreground relative z-10 pl-3">{testimonial.text}</p>
                        <div className="absolute -bottom-5 -right-2 text-4xl text-primary/20">"</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Animated progress bar component
const ProgressBar = ({ value, delay = 0 }: { value: number, delay?: number }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      width: `${value}%`,
      transition: { delay, duration: 1, ease: "easeOut" }
    });
  }, [controls, value, delay]);
  
  return (
    <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={controls}
      />
    </div>
  );
};

// Floating card component with hover effect
const FloatingCard = ({ 
  children, 
  delay = 0,
  className
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? "0 10px 25px -3px rgba(59, 130, 246, 0.15)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className={cn(
          "h-full transition-all duration-200 rounded-lg border",
          isHovered ? "border-primary/30" : "border-border"
        )}
      >
        <Card className="h-full border-0 shadow-none">
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default About;