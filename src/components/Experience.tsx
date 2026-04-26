import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '@/data/experienceData';

gsap.registerPlugin(ScrollTrigger);

const typeColors: Record<string, string> = {
  education:
    'border-cyan-500/20 bg-cyan-500/5 text-cyan-500 dark:text-cyan-400',
  project:
    'border-violet-500/20 bg-violet-500/5 text-violet-500 dark:text-violet-400',
  milestone:
    'border-amber-500/20 bg-amber-500/5 text-amber-500 dark:text-amber-400',
  work:
    'border-emerald-500/20 bg-emerald-500/5 text-emerald-500 dark:text-emerald-400',
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading char reveal
      const chars = headingRef.current?.querySelectorAll('.exp-char');
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

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 50%',
              scrub: 1,
            },
          }
        );
      }

      // Timeline cards stagger
      const cards = timelineRef.current?.querySelectorAll('.tl-card');
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline dots
      const dots = timelineRef.current?.querySelectorAll('.tl-dot');
      dots?.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Accent glow */}
      <div
        className="absolute bottom-0 left-0 w-125 h-125 rounded-full blur-[120px] opacity-[0.04] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--accent-violet-rgb),0.8), transparent 70%)',
        }}
      />

      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Label */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-accent-violet/50 uppercase tracking-[0.3em]">
            02 — Journey
          </span>
        </div>

        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'MY JOURNEY'.split('').map((char, i) => (
                <span
                  key={i}
                  className="exp-char inline-block leading-[0.85] font-display bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl">
            A timeline of milestones, projects, and growth in my
            development career.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical connecting line */}
          <div
            ref={lineRef}
            className="absolute left-4.75 md:left-5.75 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background:
                'linear-gradient(to bottom, rgba(var(--accent-cyan-rgb),0.3), rgba(var(--accent-violet-rgb),0.3), rgba(var(--accent-rose-rgb),0.3))',
              transform: 'scaleY(0)',
            }}
          />

          <div className="space-y-10">
            {TIMELINE.map((entry, i) => (
              <div key={i} className="tl-card flex gap-6 md:gap-8 relative">
                {/* Dot */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="tl-dot w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary/20 bg-background flex items-center justify-center text-lg z-10 shadow-lg shadow-primary/5">
                    {entry.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 pb-2">
                  <div className="group p-6 rounded-2xl border border-foreground/5 bg-linear-to-br from-foreground/2 to-primary/2 hover:border-primary/15 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-display font-semibold text-primary/60">
                        {entry.year}
                      </span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-medium ${typeColors[entry.type]}`}
                      >
                        {entry.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold tracking-tight mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/60 mb-3">
                      {entry.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {entry.description}
                    </p>
                    {entry.bullets && (
                      <ul className="mt-3 space-y-1.5">
                        {entry.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground/80">
                            <span className="text-primary/50 mt-1.5 shrink-0">▪</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Experience);
