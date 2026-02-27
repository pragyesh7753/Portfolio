import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Award, Star, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { getDriveThumbnail } from '@/utils/driveUtils';
import { DRIVE_ASSETS } from '@/config/driveAssets';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    id: 'cert-1',
    title: 'Full Stack Web Development',
    issuedBy: 'PW Skills',
    date: 'April 2023',
    imageUrl: DRIVE_ASSETS.certificates.mernStack,
    driveUrl:
      'https://learn.pwskills.com/certificate/fce1fcfd-7e97-4b7d-ad54-5e62ed63911c',
    featured: true,
    category: 'development',
    description:
      'Completed intensive Full Stack Web Development course covering MERN stack, REST APIs, authentication, and deployment.',
  },
  {
    id: 'cert-2',
    title: 'Python Programming',
    issuedBy: 'Scaler',
    date: 'June 2025',
    imageUrl: DRIVE_ASSETS.certificates.python,
    driveUrl: 'https://moonshot.scaler.com/s/sl/QchAavjio8',
    featured: true,
    category: 'development',
    description:
      'Comprehensive Python programming course covering core concepts, data structures, and OOP.',
  },
  {
    id: 'cert-3',
    title: 'All India Online Aptitude Test 2025',
    issuedBy: 'Naukri Campus',
    date: 'May 2025',
    imageUrl: DRIVE_ASSETS.certificates.aincat,
    driveUrl:
      'https://www.naukri.com/campus/certificates/naukri_campus_ai_ncat_achievemen_may_2025/v0/683a339c892c1f3133ab56ed',
    featured: true,
    category: 'competition',
    description:
      'Achieved distinction demonstrating strong analytical and logical reasoning skills.',
  },
  {
    id: 'cert-4',
    title: 'Innoviz - 2025',
    issuedBy: 'St. Andrews Institute',
    date: 'April 2025',
    imageUrl: DRIVE_ASSETS.certificates.innoviz,
    driveUrl: DRIVE_ASSETS.certificates.innoviz,
    featured: true,
    category: 'competition',
    description:
      'Participated in Innoviz 2025, showcasing innovative solutions and teamwork.',
  },
  {
    id: 'cert-5',
    title: 'Merit Performance Award',
    issuedBy: 'St. Andrews Institute',
    date: 'November 2023',
    imageUrl: DRIVE_ASSETS.certificates.merit,
    driveUrl: DRIVE_ASSETS.certificates.merit,
    featured: true,
    category: 'academic',
    description:
      'Outstanding academic achievements and consistent high performance.',
  },
  {
    id: 'cert-6',
    title: 'Java Programming',
    issuedBy: 'Great Learning',
    date: 'December 2023',
    imageUrl: DRIVE_ASSETS.certificates.java,
    driveUrl: DRIVE_ASSETS.certificates.java,
    featured: true,
    category: 'development',
    description:
      'Proficiency in core Java concepts and object-oriented programming.',
  },
  {
    id: 'cert-7',
    title: 'Bapu Bazaar Samman Patra',
    issuedBy: 'VBS Purvanchal University',
    date: 'March 2023',
    imageUrl: DRIVE_ASSETS.certificates.bapu,
    driveUrl: DRIVE_ASSETS.certificates.bapu,
    featured: false,
    category: 'competition',
    description:
      'Active participation in university-level cultural and social events.',
  },
  {
    id: 'cert-8',
    title: 'Voter Awareness Campaign',
    issuedBy: 'VBS Purvanchal University',
    date: 'March 2023',
    imageUrl: DRIVE_ASSETS.certificates.voter,
    driveUrl: DRIVE_ASSETS.certificates.voter,
    featured: false,
    category: 'community',
    description: 'Volunteering in the Voter Awareness Campaign.',
  },
];

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'academic', label: 'Academic' },
  { id: 'competition', label: 'Competition' },
  { id: 'community', label: 'Community' },
];

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () =>
      certificates.filter((c) => {
        const featuredMatch = showAll || c.featured;
        const catMatch = selectedCategory === 'all' || c.category === selectedCategory;
        const searchMatch =
          !searchQuery ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
        return featuredMatch && catMatch && searchMatch;
      }),
    [showAll, selectedCategory, searchQuery]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll('.ach-char');
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

  // Grid animation on filter
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.cert-card');
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );
    }
  }, [filtered]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Label */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em]">
            03 — Recognition
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'ACHIEVEMENTS'.split('').map((char, i) => (
                <span
                  key={i}
                  className="ach-char inline-block leading-[0.85]"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl">
            Certifications and recognition earned through continuous learning and
            dedication.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-12">
          <div className="flex gap-2 flex-wrap">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 capitalize',
                  selectedCategory === cat.id
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/[0.04] text-muted-foreground hover:bg-foreground/[0.08] border border-foreground/[0.06]'
                )}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-foreground/[0.04] text-muted-foreground hover:bg-foreground/[0.08] border border-foreground/[0.06] transition-all"
            >
              {showAll ? 'Featured' : 'Show All'}
            </button>
          </div>
          <div className="relative w-full sm:w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 rounded-full bg-foreground/[0.03] border-foreground/[0.06] text-sm h-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
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
                <Award className="w-10 h-10 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm mb-4">
                  No certificates found
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => {
                    setSelectedCategory('all');
                    setShowAll(true);
                    setSearchQuery('');
                  }}
                >
                  Reset
                </Button>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((cert) => (
                  <CertCard key={cert.id} cert={cert} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── Cert Card ─────────────────── */

const CertCard = ({ cert }: { cert: Certificate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      className="cert-card group relative rounded-2xl border border-foreground/[0.05] bg-foreground/[0.015] hover:border-foreground/[0.12] transition-all duration-500 overflow-hidden"
      whileHover={{ y: -3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-orange-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-5">
        {/* Image */}
        <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-foreground/[0.03] mb-5">
          {!imageError ? (
            <>
              <img
                src={getDriveThumbnail(cert.imageUrl, 600)}
                alt={cert.title}
                className={cn(
                  'w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-7 h-7 text-muted-foreground/20 animate-pulse" />
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Award className="w-7 h-7 text-muted-foreground/20" />
            </div>
          )}
          {cert.featured && (
            <div className="absolute top-2.5 right-2.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-lg" />
            </div>
          )}
          <div className="absolute top-2.5 left-2.5">
            <Badge
              variant="secondary"
              className="text-[10px] bg-background/80 backdrop-blur-sm capitalize"
            >
              {cert.category}
            </Badge>
          </div>

          {/* Hover overlay with view button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <a
              href={cert.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-black text-xs font-medium rounded-full hover:bg-white/90 transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            >
              View Certificate
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {cert.title}
          </h3>
          <p className="text-[11px] text-muted-foreground/60">
            {cert.issuedBy} · {cert.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;
