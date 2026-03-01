import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from './SmoothScroll';
import { ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROLES = ['Full Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Problem Solver'];

const MARQUEE_ITEMS = [
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'NEXT.JS', 'GSAP', 'FRAMER MOTION',
  'TAILWIND CSS', 'MONGODB', 'EXPRESS', 'PYTHON', 'JAVASCRIPT', 'GIT',
];

const Home = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [animReady, setAnimReady] = useState(false);

  // Role cycling — only after entrance animation
  useEffect(() => {
    if (!animReady) return;
    const interval = setInterval(() => setRoleIndex((p) => (p + 1) % ROLES.length), 3000);
    return () => clearInterval(interval);
  }, [animReady]);

  // GSAP entrance with delay for loading screen
  useEffect(() => {
    const DELAY = 3.9; // seconds — after loading screen curtain wipe
    const timerId = setTimeout(() => {
      setAnimReady(true);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Badge
        tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

        // Name characters
        const nameChars = nameRef.current?.querySelectorAll('.hero-char');
        if (nameChars?.length) {
          tl.fromTo(
            nameChars,
            { y: '115%', rotateX: -80 },
            { y: '0%', rotateX: 0, stagger: 0.04, duration: 1.3 },
            '-=0.3'
          );
        }

        // Subtitle characters
        const subChars = subRef.current?.querySelectorAll('.hero-char');
        if (subChars?.length) {
          tl.fromTo(
            subChars,
            { y: '115%' },
            { y: '0%', stagger: 0.025, duration: 0.9 },
            '-=0.8'
          );
        }

        // Bottom content
        const fadeEls = bottomRef.current?.querySelectorAll('.hero-fade');
        if (fadeEls?.length) {
          gsap.set(bottomRef.current, { opacity: 1 });
          tl.fromTo(
            fadeEls,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
            '-=0.5'
          );
        }

        // Parallax on scroll
        gsap.to(nameRef.current, {
          yPercent: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(subRef.current, {
          yPercent: -20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }, DELAY * 1000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen max-h-screen flex flex-col justify-center"
    >
      {/* Hero glow accent — large gradient behind the name */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[140px] opacity-25 dark:opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.7) 0%, rgba(139,92,246,0.4) 40%, rgba(6,182,212,0.15) 70%, transparent 100%)' }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        {/* Available badge */}
        <div ref={badgeRef} className="mb-10 opacity-0">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] text-xs font-medium text-indigo-300 dark:text-indigo-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for opportunities
          </span>
        </div>

        {/* Name — MASSIVE typography with gradient */}
        <div ref={nameRef} className="mb-2">
          <div className="overflow-hidden">
            <div className="flex flex-wrap" style={{ perspective: '600px' }}>
              {'PRAGYESH'.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block bg-gradient-to-br from-white via-indigo-200 to-violet-300 dark:from-white dark:via-indigo-100 dark:to-violet-200 bg-clip-text text-transparent leading-[0.85]"
                  style={{
                    fontSize: 'clamp(3.5rem, 12vw, 13rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    WebkitTextFillColor: 'transparent',
                    transform: 'translateY(115%) rotateX(-80deg)',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle — gradient stroke text */}
        <div ref={subRef} className="mb-12">
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'KUMAR SETH'.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block text-foreground/20 leading-[0.9]"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 6.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    WebkitTextStroke: '1.5px rgba(99,102,241,0.4)',
                    WebkitTextFillColor: 'transparent',
                    transform: 'translateY(115%)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom content row */}
        <div ref={bottomRef} className="grid lg:grid-cols-2 gap-12 items-end opacity-0">
          <div className="space-y-5">
            {/* Role cycling */}
            <div className="h-8 overflow-hidden hero-fade">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -30, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-lg tracking-wide font-light"
                >
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    {ROLES[roleIndex]}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="hero-fade text-muted-foreground text-base max-w-md leading-relaxed">
              Crafting accessible, high‑performance web applications with modern
              technologies. Turning ideas into seamless digital experiences.
            </p>

            {/* CTA */}
            <div className="hero-fade flex items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-7 py-3.5 text-sm font-semibold rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.03] active:scale-95 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's Talk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
              <a
                href="https://drive.google.com/uc?export=download&id=1cXLVxskfDsiRtHcAdQY_p8EbdB5Do3gb"
                download="Pragyesh_Kumar_Seth_Resume.pdf"
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full border border-foreground/[0.12] text-foreground hover:border-indigo-500/30 hover:bg-indigo-500/[0.05] transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal marquee strip */}
      <div className="absolute bottom-6 left-0 right-0 border-y border-foreground/[0.06] py-3.5 overflow-hidden pointer-events-none z-0">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-[13px] font-semibold text-indigo-500/10 uppercase tracking-[0.2em] flex items-center gap-8"
            >
              {item}
              <span className="text-violet-500/15">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator — right edge */}
      <motion.div
        className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={animReady ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[10px] font-mono text-indigo-400/50 uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          Scroll Down
        </span>
        <motion.div
          className="w-[1.5px] h-16 bg-gradient-to-b from-indigo-500/50 to-transparent origin-top"
          initial={{ scaleY: 0 }}
          animate={animReady ? { scaleY: [0, 1, 0] } : {}}
          transition={{ delay: 1.2, duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
        />
      </motion.div>
    </section>
  );
};

export default Home;
