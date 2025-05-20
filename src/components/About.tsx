import { motion, useAnimation } from 'framer-motion';
import { Code2, Server, Globe, Database, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useEffect, useState, useRef } from 'react';
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

  // Updated testimonials - removed relationship and image, added 2 more testimonials
  const testimonials = [
    {
      name: "Hritik Sonkar",
      text: "I've known Pragyesh since our college days and his coding skills have always been impressive. He helped me with my final year project and his attention to detail was amazing!"
    },
    {
      name: "Anand Raj Bind",
      text: "Working with Pragyesh on our hackathon project was an incredible experience. His problem-solving abilities and creativity took our app to the next level. Definitely my go-to person for tech advice!"
    },
    {
      name: "Anurag Singh",
      text: "Pragyesh built an online portfolio for me in just two days when I urgently needed it for a job application. The design was clean, modern and impressed my interviewers. I got the job!"
    },
    {
      name: "Leroy Vincient Serpis",
      text: "As fellow members of our college coding club, I've seen Pragyesh tackle complex problems with ease. He's not only talented but also great at explaining technical concepts to beginners like me."
    },
    {
      name: "Rishabh Rai",
      text: "Living with Pragyesh, I've witnessed firsthand his dedication to coding. He helped me set up a small blog website and was patient enough to teach me how to maintain it myself. His work ethic is inspiring!"
    },
    {
      name: "Dheeraj Sonkar",
      text: "Pragyesh redesigned our local community website as a volunteer project. His technical skills combined with his understanding of user needs resulted in a website that everyone loves using now."
    },
    {
      name: "Alok Maurya",
      text: "I had a critical deadline for my startup's web application, and Pragyesh came through with an exceptional solution. His ability to understand requirements and deliver quality code under pressure is remarkable."
    },
    {
      name: "Prajapati Saurabh Lalman",
      text: "Pragyesh helped our team implement complex animations on our website that truly brought our brand to life. His attention to performance optimization made the site not just beautiful but incredibly fast too."
    }
  ];

  // Ref for the testimonials container
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [duplicatedTestimonials] = useState([...testimonials, ...testimonials]);

  // Automatic scrolling effect
  useEffect(() => {
    const scrollContainer = testimonialsRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPos = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const scroll = () => {
      scrollPos += scrollSpeed;
      
      // Reset scroll position when we've scrolled through half the items
      if (scrollPos >= scrollContainer.clientWidth / 2) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPos;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start scrolling animation
    animationFrameId = requestAnimationFrame(scroll);

    // Pause scrolling when hovering
    const pauseScroll = () => cancelAnimationFrame(animationFrameId);
    const resumeScroll = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', pauseScroll);
    scrollContainer.addEventListener('mouseleave', resumeScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', pauseScroll);
        scrollContainer.removeEventListener('mouseleave', resumeScroll);
      }
    };
  }, []);

  // Random pastel color generator for avatar backgrounds
  const getAvatarGradient = (index: number) => {
    const gradients = [
      "from-blue-400 to-violet-500",
      "from-emerald-400 to-cyan-500", 
      "from-amber-400 to-orange-500",
      "from-pink-400 to-rose-500",
      "from-indigo-400 to-blue-500",
      "from-teal-400 to-emerald-500",
      "from-fuchsia-400 to-pink-500",
      "from-purple-400 to-indigo-500"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* About Me Section */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left column */}
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
              
              {/* Right column - Personal details */}
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

          {/* Skills Section */}
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

          {/* Updated Testimonials Section with Enhanced Cards */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">What My Friends Say</h2>
            
            <div className="relative">
              {/* Gradient fades on edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
              
              {/* Scrolling testimonials container */}
              <div 
                ref={testimonialsRef}
                className="flex overflow-x-scroll scrollbar-hide gap-6 py-4 px-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-6 min-w-max">
                  {duplicatedTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % testimonials.length) * 0.1 }}
                      className="w-[350px] flex-shrink-0"
                    >
                      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 overflow-hidden group border-primary/10 hover:border-primary/30">
                        <CardContent className="p-0 h-full">
                          {/* Card top accent bar */}
                          <div className={`h-2 w-full bg-gradient-to-r ${getAvatarGradient(index % testimonials.length)} group-hover:opacity-100 opacity-80 transition-opacity`}></div>
                          
                          {/* Content with padding */}
                          <div className="p-6">
                            {/* Avatar and name with improved styling */}
                            <div className="flex items-center mb-6">
                              <div 
                                className={`relative h-14 w-14 rounded-full mr-4 bg-gradient-to-br ${getAvatarGradient(index % testimonials.length)} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-all duration-500 ease-out`}
                              >
                                <span className="font-bold text-xl">{testimonial.name.charAt(0)}</span>
                                
                                {/* Subtle animated ring */}
                                <motion.div 
                                  className="absolute inset-0 rounded-full border-2 border-white/20"
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-bold text-lg tracking-tight">{testimonial.name}</p>
                                <div className="flex mt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg 
                                      key={star} 
                                      className="w-4 h-4 text-yellow-500 fill-current" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Testimonial text with enhanced styling */}
                            <div className="relative">
                              <svg 
                                className="absolute -top-3 -left-1 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                              <p className="text-muted-foreground relative z-10 pl-7 pr-2 py-2 leading-relaxed text-base">
                                {testimonial.text}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Indicator dots with enhanced animation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.div 
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${getAvatarGradient(index)}`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4] 
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
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

// Add CSS for hiding scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default About;