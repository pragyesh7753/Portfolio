import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '@/lib/utils';
import { ArrowRight, Download } from 'lucide-react';
import { MARQUEE_ITEMS, ROLES } from '@/data/homeData';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [animReady, setAnimReady] = useState(false);
  const lightweightMotion =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 768px)').matches);

  // Role cycling
  useEffect(() => {
    if (!animReady) return;
    const interval = setInterval(
      () => setRoleIndex((p) => (p + 1) % ROLES.length),
      3000
    );
    return () => clearInterval(interval);
  }, [animReady]);

  // GSAP entrance
  useEffect(() => {
    const DELAY = lightweightMotion ? 0.12 : 1.1;
    const timerId = setTimeout(() => {
      setAnimReady(true);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Badge
        tl.fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        );

        // Name characters
        const nameChars = nameRef.current?.querySelectorAll('.hero-char');
        if (nameChars?.length) {
          if (lightweightMotion) {
            gsap.set(nameChars, { y: '0%', rotateX: 0, opacity: 1 });
          } else {
            tl.fromTo(
              nameChars,
              { y: '115%', rotateX: -80, opacity: 0 },
              {
                y: '0%',
                rotateX: 0,
                opacity: 1,
                stagger: 0.04,
                duration: 1.3,
              },
              '-=0.3'
            );
          }
        }

        // Subtitle characters
        const subChars = subRef.current?.querySelectorAll('.hero-char');
        if (subChars?.length) {
          if (lightweightMotion) {
            gsap.set(subChars, { y: '0%', opacity: 1 });
          } else {
            tl.fromTo(
              subChars,
              { y: '115%', opacity: 0 },
              { y: '0%', opacity: 1, stagger: 0.025, duration: 0.9 },
              '-=0.8'
            );
          }
        }

        // Bottom content
        const fadeEls = bottomRef.current?.querySelectorAll('.hero-fade');
        if (fadeEls?.length) {
          gsap.set(bottomRef.current, { opacity: 1 });
          if (lightweightMotion) {
            gsap.set(fadeEls, { y: 0, opacity: 1 });
          } else {
            tl.fromTo(
              fadeEls,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
              '-=0.5'
            );
          }
        }

        // Floating shapes
        const shapes = floatingRef.current?.querySelectorAll('.floating-shape');
        if (shapes?.length) {
          if (lightweightMotion) {
            gsap.set(shapes, { scale: 1, opacity: 1 });
          } else {
            tl.fromTo(
              shapes,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.7)',
              },
              '-=0.6'
            );
          }
        }

        // Parallax on scroll
        gsap.to(nameRef.current, {
          yPercent: -50,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to(subRef.current, {
          yPercent: -25,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        // Floating shapes parallax
        if (floatingRef.current) {
          gsap.to(floatingRef.current, {
            yPercent: -30,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    }, DELAY * 1000);

    return () => clearTimeout(timerId);
  }, [lightweightMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen max-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Hero glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-175 rounded-full blur-[160px] opacity-25 dark:opacity-15"
          style={{
            background:
              'radial-gradient(ellipse, rgba(var(--primary-rgb),0.6) 0%, rgba(var(--accent-violet-rgb),0.3) 40%, rgba(var(--accent-cyan-rgb),0.1) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div
        ref={floatingRef}
        className="absolute inset-0 -z-5 pointer-events-none"
      >
        <div
          className="floating-shape absolute top-[15%] right-[18%] w-20 h-20 rounded-full border border-primary/10 animate-float opacity-0"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="floating-shape absolute top-[25%] right-[8%] w-3 h-3 rounded-full bg-accent-cyan/20 animate-float opacity-0"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="floating-shape absolute bottom-[30%] left-[8%] w-16 h-16 rounded-2xl border border-accent-violet/10 rotate-45 animate-float opacity-0"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="floating-shape absolute top-[60%] right-[25%] w-2 h-2 rounded-full bg-accent-rose/30 animate-float opacity-0"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="floating-shape absolute top-[20%] left-[15%] w-1 h-24 bg-linear-to-b from-accent-cyan/10 to-transparent animate-float opacity-0"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-350 mx-auto px-6 lg:px-12 w-full">
        {/* Available badge */}
        <div ref={badgeRef} className="mb-10 opacity-0">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/15 bg-primary/4 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for opportunities
          </span>
        </div>

        {/* Name — ultra-bold gradient */}
        <div ref={nameRef} className="mb-2">
          <div className="overflow-hidden">
            <div
              className="flex flex-wrap"
              style={{ perspective: '600px' }}
            >
              {'PRAGYESH'.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block font-display bg-linear-to-br from-foreground via-foreground/90 to-primary/70 dark:from-white dark:via-purple-100 dark:to-violet-300 bg-clip-text text-transparent leading-[0.85]"
                  style={{
                    fontSize: 'clamp(3.5rem, 12vw, 13rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    WebkitTextFillColor: 'transparent',
                    transform: 'translateY(115%) rotateX(-80deg)',
                    opacity: 0,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle — stroke text */}
        <div ref={subRef} className="mb-12">
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'KUMAR SETH'.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block font-display text-foreground/20 leading-[0.9]"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 6.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    WebkitTextStroke:
                      '1.5px rgba(var(--primary-rgb), 0.35)',
                    WebkitTextFillColor: 'transparent',
                    transform: 'translateY(115%)',
                    opacity: 0,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom content row */}
        <div
          ref={bottomRef}
          className={`grid lg:grid-cols-2 gap-12 items-end ${lightweightMotion ? '' : 'opacity-0'}`}
        >
          <div className="space-y-5">
            {/* Role cycling */}
            <div className="h-8 overflow-hidden hero-fade">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block text-lg tracking-wide font-light"
                >
                  <span className="bg-linear-to-r from-primary to-accent-violet bg-clip-text text-transparent">
                    {ROLES[roleIndex]}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>

            <p className="hero-fade text-muted-foreground text-base max-w-md leading-relaxed">
              Crafting accessible, high‑performance web applications with
              modern technologies. Turning ideas into seamless digital
              experiences.
            </p>

            {/* CTA */}
            <div className="hero-fade flex items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-7 py-3.5 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-95 bg-linear-to-r from-primary to-accent-violet text-white shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's Talk
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
              <a
                href="https://drive.google.com/uc?export=download&id=1cXLVxskfDsiRtHcAdQY_p8EbdB5Do3gb"
                download="Pragyesh_Kumar_Seth_Resume.pdf"
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full border border-foreground/10 text-foreground hover:border-primary/30 hover:bg-primary/4 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal marquee strip */}
      <div className="absolute bottom-6 left-0 right-0 border-y border-foreground/4 py-3.5 overflow-hidden pointer-events-none z-0">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-[13px] font-semibold font-display text-primary/8 uppercase tracking-[0.2em] flex items-center gap-8"
            >
              {item}
              <span className="text-accent-violet/12">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={animReady ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-[10px] font-mono text-primary/40 uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          Scroll Down
        </span>
        <motion.div
          className="w-[1.5px] h-16 bg-linear-to-b from-primary/40 to-transparent origin-top"
          initial={{ scaleY: 0 }}
          animate={animReady ? { scaleY: [0, 1, 0] } : {}}
          transition={{
            delay: 1.2,
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      </motion.div>
    </section>
  );
};

export default Home;
