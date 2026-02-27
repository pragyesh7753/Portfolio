import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 6, suffix: '+', label: 'Projects' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 8, suffix: '', label: 'Certificates' },
  { value: 1, suffix: 'K+', label: 'Lines of Code' },
];

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Flask', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'MySQL', 'Appwrite'],
  },
  {
    category: 'Tools',
    items: ['Git', 'VS Code', 'Figma', 'Vercel', 'Cloudinary'],
  },
];

const personalInfo = [
  '📍 India',
  '📧 spragyesh86@gmail.com',
  '🗣️ Hindi, English',
  '⏰ Available Full-time',
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading char reveal
      const headingChars = headingRef.current?.querySelectorAll('.about-char');
      if (headingChars?.length) {
        gsap.fromTo(
          headingChars,
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

      // Bio paragraphs
      const bioEls = bioRef.current?.querySelectorAll('.bio-reveal');
      if (bioEls?.length) {
        gsap.fromTo(
          bioEls,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats counters
      const statEls = statsRef.current?.querySelectorAll('.stat-number');
      statEls?.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          onUpdate() {
            (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // Skills cards stagger
      const skillCards = skillsRef.current?.querySelectorAll('.skill-card');
      if (skillCards?.length) {
        gsap.fromTo(
          skillCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.3em]">
            01 — About
          </span>
        </div>

        {/* Heading — character reveal */}
        <div ref={headingRef} className="mb-24">
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {'ABOUT ME'.split('').map((char, i) => (
                <span
                  key={i}
                  className="about-char inline-block leading-[0.85]"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio + Avatar */}
        <div ref={bioRef} className="grid lg:grid-cols-12 gap-16 mb-28">
          {/* Avatar */}
          <div className="lg:col-span-4 bio-reveal">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-foreground/[0.03] border border-foreground/[0.06]">
                <img
                  src="/dp.jpg"
                  alt="Pragyesh Kumar Seth"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-8 space-y-8">
            <p className="bio-reveal text-2xl md:text-3xl lg:text-[2.1rem] font-light leading-[1.4] text-foreground/90">
              I'm a{' '}
              <span className="font-semibold text-foreground">Full Stack Developer</span> passionate
              about building{' '}
              <span className="font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                beautiful, performant web applications
              </span>{' '}
              that make a difference.
            </p>

            <p className="bio-reveal text-lg text-muted-foreground leading-relaxed max-w-2xl">
              My journey began with curiosity and has evolved into a professional pursuit of
              creating robust, scalable, and user&#8209;centric applications. I specialize in React,
              TypeScript, and Node.js with a strong focus on clean architecture and optimal user
              experience.
            </p>

            <div className="bio-reveal flex flex-wrap gap-2.5 pt-2">
              {personalInfo.map((item) => (
                <span
                  key={item}
                  className="text-sm text-muted-foreground px-4 py-2 rounded-full border border-foreground/[0.06] bg-foreground/[0.02]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-28 py-14 border-y border-foreground/[0.05]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                className="stat-number text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0
              </span>
              <p className="text-[11px] text-muted-foreground mt-3 uppercase tracking-[0.2em] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <h3 className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-10">
            Technical Skills
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((group) => (
              <div
                key={group.category}
                className="skill-card group p-6 rounded-2xl border border-foreground/[0.05] bg-foreground/[0.015] hover:border-foreground/[0.12] transition-all duration-500"
              >
                <h4 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-[0.2em] mb-5">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[13px] px-3 py-1.5 rounded-full bg-foreground/[0.03] text-foreground/70 hover:bg-foreground/[0.07] hover:text-foreground transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
