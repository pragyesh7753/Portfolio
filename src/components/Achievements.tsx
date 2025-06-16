import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  driveUrl: string;
  featured: boolean;
  category?: string;  // Optional property for basic filtering
}

const Achievements = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Updated certificates with corrected dates and image paths
  const certificates: Certificate[] = [
    {
      id: "cert-1",
      title: "Full Stack Web Development",
      issuedBy: "PW Skills",
      date: "April 2023",
      imageUrl: "/images/certificates/mern-stack-pw-skills-certificate.png",
      driveUrl: "https://learn.pwskills.com/certificate/fce1fcfd-7e97-4b7d-ad54-5e62ed63911c",
      featured: true,
      category: "development"
    },
    {
      id: "cert-2",
      title: "Python Programming",
      issuedBy: "Scaler",
      date: "June 2025",
      imageUrl: "/images/certificates/python-programming.png",
      driveUrl: "https://moonshot.scaler.com/s/sl/QchAavjio8?_gl=1*v19d6i*_gcl_au*MTg3ODY3NDM4My4xNzUwMDU0NzU1*FPAU*MTEwNzg5NjY0OC4xNzUwMDU0NzU4*_ga*MTIyMTU5NzE4MC4xNzUwMDU0NzU0*_ga_53S71ZZG1X*czE3NTAwNjYwODQkbzIkZzEkdDE3NTAwNjY0NTkkajEkbDAkaDY1MTM5NzU0OQ..",
      featured: true,
      category: "development"
    },
    {
      id: "cert-3",
      title: "All India Online Aptitude Test 2025",
      issuedBy: "Naukri Campus",
      date: "May 2025",
      imageUrl: "/images/certificates/aincat_2025_certificate.jpg",
      driveUrl: "https://www.naukri.com/campus/certificates/naukri_campus_ai_ncat_achievemen_may_2025/v0/683a339c892c1f3133ab56ed?utm_source=certificate&utm_medium=copy&utm_campaign=683a339c892c1f3133ab56ed",
      featured: true,
      category: "competition"
    },
    {
      id: "cert-4",
      title: "Innoviz - 2025",
      issuedBy: "St. Andrews Institute of Technology & Management",
      date: "April 2025",
      imageUrl: "/images/certificates/Innoviz-paticipation.jpg",
      driveUrl: "https://drive.google.com/file/d/10BadZlGjPAen5ArSRActyX7W1jjFP4TI/view?usp=drive_link",
      featured: true,
      category: "competition"
    },
    {
      id: "cert-5",
      title: "Merit Performance Award",
      issuedBy: "St. Andrews Institute of Technology & Management",
      date: "November 2023",
      imageUrl: "/images/certificates/merit-performance.jpg",
      driveUrl: "https://drive.google.com/file/d/1-NElN1Nzlr7rZJ3KZMIgkEeuCU2X0gZ2/view?usp=drive_link",
      featured: true,
      category: "academic"
    },
    {
      id: "cert-6",
      title: "Java Programming",
      issuedBy: "Great Learning",
      date: "December 2023",
      imageUrl: "/images/certificates/java-programming.jpg",
      driveUrl: "https://drive.google.com/file/d/1-OQW-uE9895leHDSoU8MC_qwF9x6Eqko/view?usp=drive_link",
      featured: true,
      category: "development"
    },
    {
      id: "cert-7",
      title: "Bapu Bazaar Samman Patra",
      issuedBy: "Veer Bahadur Singh Purvanchal University",
      date: "March 2023",
      imageUrl: "/images/certificates/bapu-bazaar.jpg",
      driveUrl: "https://drive.google.com/file/d/1-llO6dL6eguwMM4dOcymZ7j3Iu9Thjsz/view?usp=sharing",
      featured: false,
      category: "competition"
    },
    {
      id: "cert-8",
      title: "Voter Awareness Campaign",
      issuedBy: "Veer Bahadur Singh Purvanchal University",
      date: "March 2023",
      imageUrl: "/images/certificates/voter.jpg",
      driveUrl: "https://drive.google.com/file/d/1-s3ush5s-l02xGnR5EQImH-evfbcXq8n/view?usp=drive_link",
      featured: false,
      category: "community"
    }
  ];

  // Filter certificates based on featured flag and category
  const filteredCertificates = certificates.filter(cert => {
    const featuredMatch = showAll || cert.featured;
    const categoryMatch = selectedCategory === 'all' || cert.category === selectedCategory;
    return featuredMatch && categoryMatch;
  });

  // Add simple category filters
  const categories = [
    { id: 'all', label: 'All Certificates' },
    { id: 'development', label: 'Development' },
    { id: 'academic', label: 'Academic' },
    { id: 'competition', label: 'Competition' },
    { id: 'community', label: 'Community' }
  ];

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

  // Create a simple floating animation for header
  const [floatingY, setFloatingY] = useState(0);
  
  useEffect(() => {
    // Simple floating animation using sin wave
    let frame = 0;
    const animate = () => {
      const y = Math.sin(Date.now() / 1000) * 5;
      setFloatingY(y);
      frame = requestAnimationFrame(animate);
    };
    
    frame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Enhanced header with animation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 text-center">
            <motion.div 
              className="flex-1 relative mb-6 sm:mb-0" 
              style={{ y: floatingY }}
            >
              <h2 className="text-3xl md:text-5xl font-bold relative inline-block">
                Achievements
                <div className="absolute -top-3 -right-3">
                  <Star className="h-6 w-6 text-amber-500 opacity-70" />
                </div>
              </h2>
              <div className="mt-2 max-w-2xl mx-auto">
                <p className="text-muted-foreground">
                  A showcase of certifications and recognition earned through continuous learning
                </p>
              </div>
            </motion.div>
          </div>

          {/* Category filter controls */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Badge 
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={cn(
                    "cursor-pointer px-3 py-1.5 transition-all",
                    selectedCategory === category.id ? "" : "hover:bg-primary/10"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
              <Badge 
                variant="secondary"
                className="cursor-pointer px-3 py-1.5 transition-all ml-2"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Featured Only" : "Show All"}
              </Badge>
            </div>
          </div>

          {filteredCertificates.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center mb-8"
            >
              <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
              <p className="text-muted-foreground mb-6">
                No certificates match your current filter settings
              </p>
              <Button 
                onClick={() => {
                  setSelectedCategory('all');
                  setShowAll(true);
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              variants={container}
              initial="hidden"
              animate="show"
              layout
            >
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  variants={item}
                  className="transition-all duration-300"
                  layout
                >
                  <CertificateCard certificate={certificate} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {certificates.length > 4 && (
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all"
              >
                {showAll ? (
                  <span className="flex items-center gap-2">
                    View Featured Only
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    View All Certificates
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const CertificateCard = ({ certificate, index }: { certificate: Certificate, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Only collapse if not clicked/expanded
    if (!isExpanded) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 300);
    }
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Generate a unique gradient color based on the index
  const getGradientColor = () => {
    const colors = [
      'from-blue-500/20 via-transparent to-transparent',
      'from-purple-500/20 via-transparent to-transparent',
      'from-teal-500/20 via-transparent to-transparent',
      'from-amber-500/20 via-transparent to-transparent',
      'from-rose-500/20 via-transparent to-transparent',
    ];
    return colors[index % colors.length];
  };

  // Handle image load status
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      layout="position"
      className={cn(
        "cursor-pointer relative",
        isExpanded ? "sm:col-span-2 md:col-span-2 lg:col-span-2" : ""
      )}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background lighting effect outside the card */}
      <div
        className={cn(
          "absolute inset-0 -m-4 rounded-xl transition-opacity duration-300 pointer-events-none",
          isHovered ? "opacity-90" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0.05) 40%, transparent 70%)`,
          transform: "scale(1.2)",
          zIndex: -1
        }}
      />

      <Card
        className={cn(
          "h-full overflow-hidden transition-all duration-300 relative",
          isHovered ? "shadow-lg border-primary/30 scale-[1.02]" : "shadow-sm scale-100",
          isExpanded ? "ring-0 shadow-none border-primary/20" : ""
        )}
        ref={cardRef}
        onClick={handleClick}
      >
        {/* Permanent subtle gradient background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30",
            getGradientColor()
          )}
        />

        {/* Category badge if available */}
        {certificate.category && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {certificate.category}
            </Badge>
          </div>
        )}

        <CardContent className={cn("p-3 transition-all relative z-10", isExpanded ? "pb-6" : "")}>
          <AspectRatio
            ratio={isExpanded ? 16 / 9 : 3 / 2}
            className="bg-muted overflow-hidden rounded-md mb-3 transition-all duration-300"
          >
            <div className="w-full h-full bg-muted/30 relative">
              {!imageError ? (
                <>
                  <img
                    src={certificate.imageUrl}
                    alt={certificate.title}
                    className={cn(
                      "object-cover w-full h-full transition-transform duration-300",
                      (isHovered || isExpanded) ? "scale-105" : "scale-100",
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
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <Award className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{certificate.title}</p>
                  </div>
                </div>
              )}
            </div>
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity",
              isHovered ? "opacity-70" : "opacity-50"
            )} />

            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="font-semibold text-white">{certificate.title}</h3>
              <p className="text-xs text-white/80">
                {certificate.issuedBy} • {certificate.date}
              </p>
            </div>
          </AspectRatio>

          {/* Add a subtle shine effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.1, 0],
                left: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                width: "50%",
              }}
            />
          )}

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <p className="text-sm text-muted-foreground">
                This certificate validates expertise in {certificate.title.toLowerCase()}
                skills and demonstrates a commitment to professional development.
              </p>
            </motion.div>
          )}
        </CardContent>

        {(isHovered || isExpanded) && (
          <CardFooter className="flex justify-center pt-0 pb-3 relative z-10">
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-primary relative overflow-hidden group text-primary"
              asChild
            >
              <a
                href={certificate.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="mr-1 h-4 w-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">View Certificate</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default Achievements;
