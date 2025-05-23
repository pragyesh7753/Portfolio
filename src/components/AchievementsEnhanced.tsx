import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ExternalLink, Award, Trophy, Star, Calendar, Building, Medal, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  driveUrl: string;
  featured: boolean;
  category: 'development' | 'academic' | 'competition' | 'community';
  skills: string[];
  description?: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
  color: string;
  bgColor: string;
}

const AchievementsEnhanced = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { theme } = useTheme();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const certificates: Certificate[] = [
    {
      id: "cert-1",
      title: "Full Stack Web Development (MERN)",
      issuedBy: "PW Skills",
      date: "April 2023",
      imageUrl: "/certificates/mern-stack-pw-skills-certificate.png",
      driveUrl: "https://learn.pwskills.com/certificate/fce1fcfd-7e97-4b7d-ad54-5e62ed63911c",
      featured: true,
      category: 'development',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: "Comprehensive MERN stack development certification covering frontend and backend technologies"
    },
    {
      id: "cert-2",
      title: "Merit Performance Award",
      issuedBy: "St. Andrews Institute of Technology",
      date: "November 2023",
      imageUrl: "/certificates/merit-performance.jpg",
      driveUrl: "https://drive.google.com/file/d/1-NElN1Nzlr7rZJ3KZMIgkEeuCU2X0gZ2/view?usp=drive_link",
      featured: true,
      category: 'academic',
      skills: ['Academic Excellence', 'Leadership'],
      description: "Recognition for outstanding academic performance and consistent excellence"
    },
    {
      id: "cert-3",
      title: "Java Programming Certification",
      issuedBy: "Great Learning",
      date: "December 2023",
      imageUrl: "/certificates/java-programming.jpg",
      driveUrl: "https://drive.google.com/file/d/1-OQW-uE9895leHDSoU8MC_qwF9x6Eqko/view?usp=drive_link",
      featured: true,
      category: 'development',
      skills: ['Java', 'OOP', 'Data Structures'],
      description: "Advanced Java programming certification covering core concepts and best practices"
    },
    {
      id: "cert-4",
      title: "Bapu Bazaar Samman Patra",
      issuedBy: "Veer Bahadur Singh Purvanchal University",
      date: "March 2023",
      imageUrl: "/certificates/bapu-bazaar.jpg",
      driveUrl: "https://drive.google.com/file/d/1-llO6dL6eguwMM4dOcymZ7j3Iu9Thjsz/view?usp=sharing",
      featured: true,
      category: 'competition',
      skills: ['Innovation', 'Problem Solving'],
      description: "Award for innovative project presentation and problem-solving excellence"
    },
    {
      id: "cert-5",
      title: "Voter Awareness Campaign",
      issuedBy: "Veer Bahadur Singh Purvanchal University",
      date: "March 2023",
      imageUrl: "/certificates/voter.jpg",
      driveUrl: "https://drive.google.com/file/d/1-s3ush5s-l02xGnR5EQImH-evfbcXq8n/view?usp=drive_link",
      featured: false,
      category: 'community',
      skills: ['Social Responsibility', 'Community Service'],
      description: "Recognition for active participation in voter awareness and civic engagement"
    }
  ];

  const achievements: Achievement[] = [
    {
      title: "Projects Completed",
      description: "Successfully delivered end-to-end solutions",
      icon: <Target className="w-6 h-6" />,
      value: "5+",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Technologies Mastered",
      description: "Proficient in modern web technologies",
      icon: <Zap className="w-6 h-6" />,
      value: "15+",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Academic Rank",
      description: "Consistent top performer",
      icon: <TrendingUp className="w-6 h-6" />,
      value: "Top 10%",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Certifications Earned",
      description: "Professional development credentials",
      icon: <Medal className="w-6 h-6" />,
      value: certificates.length.toString(),
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10"
    }
  ];

  // Filter certificates based on category and featured flag
  const filteredCertificates = certificates.filter(cert => {
    const categoryMatch = selectedCategory === 'all' || cert.category === selectedCategory;
    const featuredMatch = showAll || cert.featured;
    return categoryMatch && featuredMatch;
  });

  // Floating particles for background effect
  const [particles] = useState(Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 20 + Math.random() * 20
  })));

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return '💻';
      case 'academic': return '🎓';
      case 'competition': return '🏆';
      case 'community': return '🤝';
      default: return '📜';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'development': return 'from-blue-500 to-cyan-500';
      case 'academic': return 'from-green-500 to-emerald-500';
      case 'competition': return 'from-amber-500 to-orange-500';
      case 'community': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-[120px] opacity-60 animate-pulse" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/5 to-emerald-500/10 rounded-full blur-[100px] opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }} />
      
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
            y: ['-25%', '25%'],
            x: ['15%', '-15%'],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1]
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
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Enhanced header section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-amber-500/70 mr-4 rounded-full"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                  Achievements & Recognition
                </h2>
                <motion.div 
                  className="absolute -top-2 -right-2"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  <Trophy className="w-8 h-8 text-amber-500/60" />
                </motion.div>
              </motion.div>
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-amber-500/70 ml-4 rounded-full"></div>
            </div>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              A showcase of professional certifications, academic excellence, and recognition earned through dedicated learning and achievement.
            </motion.p>
          </motion.div>

          {/* Achievement Statistics */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className={cn(
                  "inline-flex p-4 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110",
                  achievement.bgColor
                )}>
                  <div className={cn("bg-gradient-to-r bg-clip-text text-transparent", achievement.color)}>
                    {achievement.icon}
                  </div>
                </div>
                <motion.div 
                  className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                >
                  {achievement.value}
                </motion.div>
                <div className="font-semibold text-lg mb-1">{achievement.title}</div>
                <div className="text-sm text-muted-foreground">{achievement.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Controls */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-primary/10"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Award className="h-4 w-4" />
              <span>Filter by category:</span>
            </div>
            
            <div className="flex items-center flex-wrap gap-3">
              {{
                { value: 'all', label: 'All Achievements', icon: '🏅' },
                { value: 'development', label: 'Development', icon: '💻' },
                { value: 'academic', label: 'Academic', icon: '🎓' },
                { value: 'competition', label: 'Competition', icon: '🏆' },
                { value: 'community', label: 'Community', icon: '🤝' }
              }.map((filter) => (
                <motion.div key={filter.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge 
                    variant={selectedCategory === filter.value ? 'default' : 'outline'} 
                    className={cn(
                      "cursor-pointer px-4 py-2 text-sm transition-all hover:shadow-md",
                      selectedCategory === filter.value 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "hover:bg-primary/10 hover:border-primary/40"
                    )}
                    onClick={() => setSelectedCategory(filter.value)}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.label}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                {showAll ? 'Show Featured Only' : 'Show All'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-bold flex items-center">
                <Medal className="w-6 h-6 mr-3 text-amber-500" />
                Certifications ({filteredCertificates.length})
              </h3>
              <div className="h-0.5 flex-grow bg-gradient-to-r from-amber-500/20 to-transparent ml-6 rounded-full"></div>
            </div>

            {filteredCertificates.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                  <Award className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No certificates found</h3>
                <p className="text-muted-foreground">Try adjusting your filter criteria to see more achievements.</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredCertificates.map((certificate) => (
                  <motion.div 
                    key={certificate.id} 
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    onHoverStart={() => setHoveredCard(certificate.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <EnhancedCertificateCard 
                      certificate={certificate} 
                      isHovered={hoveredCard === certificate.id} 
                      colorMode={theme}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20"
          >
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Continuous Learning Journey</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These achievements represent my commitment to excellence and continuous learning. I'm always eager to take on new challenges and expand my skill set.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Let's Collaborate
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Certificate Card Component
const EnhancedCertificateCard = ({ certificate, isHovered, colorMode }: { 
  certificate: Certificate, 
  isHovered: boolean,
  colorMode?: string
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle image error and loading state properly
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Use a placeholder image if the actual image doesn't load
  const fallbackImage = colorMode === 'dark' 
    ? '/placeholders/certificate-dark.svg' 
    : '/placeholders/certificate-light.svg';

  return (
    <Card 
      className={cn(
        "h-full overflow-hidden transition-all duration-500 relative group border-0",
        "bg-gradient-to-br from-card/60 via-card/40 to-card/60 backdrop-blur-sm",
        isHovered ? "shadow-2xl shadow-primary/20" : "shadow-lg hover:shadow-xl"
      )}
    >
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-20">
        <Badge 
          className={cn(
            "bg-gradient-to-r text-white border-0 text-xs",
            getCategoryColor(certificate.category)
          )}
        >
          {getCategoryIcon(certificate.category)} {certificate.category}
        </Badge>
      </div>

      {/* Featured badge */}
      {certificate.featured && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </motion.div>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col">
        {/* Certificate Image */}
        <div className="relative overflow-hidden">
          <AspectRatio ratio={4/3}>
            <div className="relative w-full h-full bg-muted/30">
              {!imageError ? (
                <>
                  <img
                    src={certificate.imageUrl}
                    alt={certificate.title}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
                      imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Award className="w-8 h-8 text-muted-foreground" />
                      </motion.div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30">
                  <div className="text-center">
                    <Award className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Certificate Preview</p>
                  </div>
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </AspectRatio>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
            {certificate.title}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="w-4 h-4" />
            <span>{certificate.issuedBy}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{certificate.date}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          {certificate.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {certificate.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {certificate.skills.slice(0, 3).map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
            {certificate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{certificate.skills.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button 
            className="w-full group/btn bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90" 
            asChild
          >
            <a 
              href={certificate.driveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>View Certificate</span>
              <motion.div
                className="w-0 group-hover/btn:w-2 h-0.5 bg-current transition-all duration-300"
              />
            </a>
          </Button>
        </CardFooter>
      </div>

      {/* Floating accent elements */}
      {certificate.featured && (
        <>
          <motion.div 
            className="absolute top-6 right-6 w-2 h-2 rounded-full bg-amber-500/40"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-orange-500/50"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.5,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
    </Card>
  );
};

// Helper function to get category color
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'development': 
      return 'from-blue-500 to-cyan-500';
    case 'academic': 
      return 'from-green-500 to-emerald-500';
    case 'competition': 
      return 'from-amber-500 to-orange-500';
    case 'community': 
      return 'from-purple-500 to-pink-500';
    default: 
      return 'from-gray-500 to-slate-500';
  }
};

// Helper function to get category icon
const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'development': 
      return '💻';
    case 'academic': 
      return '🎓';
    case 'competition': 
      return '🏆';
    case 'community': 
      return '🤝';
    default: 
      return '📜';
  }
};

export default AchievementsEnhanced;
