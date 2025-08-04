import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, Star, ChevronUp, ChevronDown, Search, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { getDriveThumbnail } from '@/utils/driveUtils';
import { DRIVE_ASSETS } from '@/config/driveAssets';

interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  driveUrl: string;
  featured: boolean;
  category: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Full Stack Web Development",
    issuedBy: "PW Skills",
    date: "April 2023",
    imageUrl: DRIVE_ASSETS.certificates.mernStack,
    driveUrl: "https://learn.pwskills.com/certificate/fce1fcfd-7e97-4b7d-ad54-5e62ed63911c",
    featured: true,
    category: "development",
    description: "Completed an intensive Full Stack Web Development course covering MERN stack, REST APIs, authentication, and deployment."
  },
  {
    id: "cert-2",
    title: "Python Programming",
    issuedBy: "Scaler",
    date: "June 2025",
    imageUrl: DRIVE_ASSETS.certificates.python,
    driveUrl: "https://moonshot.scaler.com/s/sl/QchAavjio8",
    featured: true,
    category: "development",
    description: "Successfully completed a comprehensive Python programming course, mastering core concepts, data structures, and OOP."
  },
  {
    id: "cert-3",
    title: "All India Online Aptitude Test 2025",
    issuedBy: "Naukri Campus",
    date: "May 2025",
    imageUrl: DRIVE_ASSETS.certificates.aincat,
    driveUrl: "https://www.naukri.com/campus/certificates/naukri_campus_ai_ncat_achievemen_may_2025/v0/683a339c892c1f3133ab56ed",
    featured: true,
    category: "competition",
    description: "Achieved distinction in the All India Online Aptitude Test, demonstrating strong analytical and logical reasoning skills."
  },
  {
    id: "cert-4",
    title: "Innoviz - 2025",
    issuedBy: "St. Andrews Institute of Technology & Management",
    date: "April 2025",
    imageUrl: DRIVE_ASSETS.certificates.innoviz,
    driveUrl: DRIVE_ASSETS.certificates.innoviz,
    featured: true,
    category: "competition",
    description: "Participated in Innoviz 2025, showcasing innovative solutions and teamwork in technical competitions."
  },
  {
    id: "cert-5",
    title: "Merit Performance Award",
    issuedBy: "St. Andrews Institute of Technology & Management",
    date: "November 2023",
    imageUrl: DRIVE_ASSETS.certificates.merit,
    driveUrl: DRIVE_ASSETS.certificates.merit,
    featured: true,
    category: "academic",
    description: "Received the Merit Performance Award for outstanding academic achievements and consistent high performance."
  },
  {
    id: "cert-6",
    title: "Java Programming",
    issuedBy: "Great Learning",
    date: "December 2023",
    imageUrl: DRIVE_ASSETS.certificates.java,
    driveUrl: DRIVE_ASSETS.certificates.java,
    featured: true,
    category: "development",
    description: "Completed a Java programming course, gaining proficiency in core Java concepts and OOP."
  },
  {
    id: "cert-7",
    title: "Bapu Bazaar Samman Patra",
    issuedBy: "Veer Bahadur Singh Purvanchal University",
    date: "March 2023",
    imageUrl: DRIVE_ASSETS.certificates.bapu,
    driveUrl: DRIVE_ASSETS.certificates.bapu,
    featured: false,
    category: "competition",
    description: "Awarded for active participation in university-level cultural and social events."
  },
  {
    id: "cert-8",
    title: "Voter Awareness Campaign",
    issuedBy: "Veer Bahadur Singh Purvanchal University",
    date: "March 2023",
    imageUrl: DRIVE_ASSETS.certificates.voter,
    driveUrl: DRIVE_ASSETS.certificates.voter,
    featured: false,
    category: "community",
    description: "Recognized for volunteering in the Voter Awareness Campaign, promoting civic responsibility."
  }
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'academic', label: 'Academic' },
  { id: 'competition', label: 'Competition' },
  { id: 'community', label: 'Community' }
];

const Achievements = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredCertificates = useMemo(() =>
    certificates.filter(cert => {
      const featuredMatch = showAll || cert.featured;
      const categoryMatch = selectedCategory === 'all' || cert.category === selectedCategory;
      const searchMatch = !searchQuery ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchQuery.toLowerCase());
      return featuredMatch && categoryMatch && searchMatch;
    }), [showAll, selectedCategory, searchQuery]
  );

  const handleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedCard(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Achievements
              <Star className="absolute -top-3 -right-3 h-6 w-6 text-amber-500 opacity-70" />
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A showcase of certifications and recognition earned through continuous learning
            </motion.p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={cn(
                    "cursor-pointer px-3 py-1.5 transition-all",
                    selectedCategory !== category.id && "hover:bg-primary/10"
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
                {showAll ? "Featured Only" : "Show All"}
              </Badge>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredCertificates.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-12 text-center"
              >
                <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? 'No certificates match your search' : 'No certificates match your current filter settings'}
                </p>
                <Button onClick={() => { setSelectedCategory('all'); setShowAll(true); setSearchQuery(''); }}>
                  Reset Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.05 }}
              >
                {filteredCertificates.map((certificate, index) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    index={index}
                    isExpanded={expandedCard === certificate.id}
                    onExpand={() => handleCardExpand(certificate.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {certificates.length > 4 && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="border-primary/50 hover:border-primary hover:bg-primary/10"
              >
                {showAll ? (
                  <><ChevronUp className="mr-2 h-4 w-4" />View Less</>
                ) : (
                  <><ChevronDown className="mr-2 h-4 w-4" />View All Certificates</>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const CertificateCard = ({
  certificate,
  index,
  isExpanded,
  onExpand
}: {
  certificate: Certificate;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const gradientColors = [
    'from-blue-500/20',
    'from-purple-500/20',
    'from-teal-500/20',
    'from-amber-500/20',
    'from-rose-500/20'
  ];

  useEffect(() => {
    if (!isExpanded) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onExpand();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded, onExpand]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "cursor-pointer relative",
        isExpanded && "sm:col-span-2 md:col-span-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onExpand}
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 relative group",
        isHovered && "ring-2 ring-primary/30 shadow-lg",
        isExpanded && "ring-2 ring-primary/50 shadow-xl scale-[1.02]"
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-30",
          gradientColors[index % gradientColors.length]
        )} />

        {certificate.category && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {certificate.category}
            </Badge>
          </div>
        )}

        <CardContent className="p-3 relative z-10">
          <div className={cn(
            "bg-muted overflow-hidden rounded-md mb-3 transition-all duration-300",
            isExpanded ? "aspect-video" : "aspect-[3/2]"
          )}>
            <div className="w-full h-full bg-muted/30 relative">
              {!imageError ? (
                <>
                  <img
                    src={getDriveThumbnail(certificate.imageUrl, 600)}
                    alt={certificate.title}
                    className={cn(
                      "object-cover w-full h-full transition-all duration-300",
                      (isHovered || isExpanded) && "scale-105",
                      imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading="lazy"
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-3">
              <h3 className="font-semibold text-white text-sm line-clamp-2">{certificate.title}</h3>
              <p className="text-xs text-white/80">
                {certificate.issuedBy} • {certificate.date}
              </p>
              {certificate.featured && (
                <div className="absolute -top-1 -right-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 border-t pt-3"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {certificate.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <AnimatePresence>
          {(isHovered || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <CardFooter className="flex justify-center pt-0 pb-3 relative z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10 transition-all"
                  asChild
                >
                  <a
                    href={certificate.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Certificate
                  </a>
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default Achievements;