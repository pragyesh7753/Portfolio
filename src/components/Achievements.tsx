import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  driveUrl: string;
  featured: boolean;  // Add this new property
}

const Achievements = () => {
  const [showAll, setShowAll] = useState(false);

  const certificates: Certificate[] = [
    {
        id: "cert-1",
        title: "MERN Stack Development",
        issuedBy: "PW Skills",
        date: "June 2023",
        imageUrl: "/images/certificates/mern-stack.jpg",
        driveUrl: "https://drive.google.com/file/d/your-file-id/view",
        featured: true
    },
    {
        id: "cert-2",
        title: "Merit Performance Award",
        issuedBy: "St. Andrews Institute of Technology and Management",
        date: "November 2024",
        imageUrl: "/images/certificates/merit-performance.jpg",
        driveUrl: "https://drive.google.com/file/d/1-NElN1Nzlr7rZJ3KZMIgkEeuCU2X0gZ2/view?usp=drive_link",
        featured: true
    },
    {
        id: "cert-3",
        title: "Bapu Bazaar Samman Patra",
        issuedBy: "Veer Bahadur Singh Purvanchal University",
        date: "March 2023",
        imageUrl: "/images/certificates/bapu-bazaar.jpg",
        driveUrl: "https://drive.google.com/file/d/1-llO6dL6eguwMM4dOcymZ7j3Iu9Thjsz/view?usp=sharing",
        featured: true
    },
    {
        id: "cert-4",
        title: "Java Programming",
        issuedBy: "Great Learning",
        date: "December 2024",
        imageUrl: "/images/certificates/java-programming.jpg",
        driveUrl: "https://drive.google.com/file/d/1-OQW-uE9895leHDSoU8MC_qwF9x6Eqko/view?usp=drive_link",
        featured: true
    },
    {
        id: "cert-5",
        title: "Voter Awareness Campaign",
        issuedBy: "Veer Bahadur Singh Purvanchal University",
        date: "March 2023",
        imageUrl: "/images/certificates/voter.jpg",
        driveUrl: "https://drive.google.com/file/d/1-s3ush5s-l02xGnR5EQImH-evfbcXq8n/view?usp=drive_link",
        featured: false
    }
  ];

  // Filter certificates based on featured flag
  const displayedCertificates = showAll 
    ? certificates 
    : certificates.filter(cert => cert.featured);

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

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Achievements</h2>
          </div>

          <motion.div 
            className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
            layout
          >
            {displayedCertificates.map((certificate, index) => (
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
          
          {certificates.length > 4 && (
            <motion.div 
              className="mt-8 flex justify-center"
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
                    View Less
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    View All
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
        
        <CardContent className={cn("p-3 transition-all relative z-10", isExpanded ? "pb-6" : "")}>
          <AspectRatio 
            ratio={isExpanded ? 16/9 : 4/3} 
            className="bg-muted overflow-hidden rounded-md mb-3 transition-all duration-300"
          >
            <img 
              src={certificate.imageUrl} 
              alt={certificate.title}
              className={cn(
                "object-cover w-full h-full transition-transform duration-300",
                (isHovered || isExpanded) ? "scale-105" : "scale-100"
              )}
            />
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
