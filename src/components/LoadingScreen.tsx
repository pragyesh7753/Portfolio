import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const triggerExit = useCallback(() => {
    if (done.current) return;
    done.current = true;

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current(),
    });

    // Scale down content
    tl.to(wordsRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });

    // Clip-path wipe exit
    tl.to(
      containerRef.current,
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.9,
        ease: 'power4.inOut',
      },
      '-=0.2'
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Stagger word reveal
      const words = wordsRef.current?.querySelectorAll('.ld-word');
      if (words?.length) {
        tl.fromTo(
          words,
          { y: '120%', rotateX: -60 },
          {
            y: '0%',
            rotateX: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Counter + ring
      const circumference = 2 * Math.PI * 44;
      if (ringRef.current) {
        gsap.set(ringRef.current, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });
      }

      const obj = { val: 0 };
      tl.to(
        obj,
        {
          val: 100,
          duration: 2.2,
          ease: 'power2.inOut',
          onUpdate() {
            const v = Math.round(obj.val);
            if (counterRef.current) counterRef.current.textContent = `${v}`;
            if (ringRef.current) {
              ringRef.current.style.strokeDashoffset = String(
                circumference - (v / 100) * circumference
              );
            }
          },
          onComplete: triggerExit,
        },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [triggerExit]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: '#080810',
        clipPath: 'inset(0 0 0 0)',
      }}
    >
      {/* Gradient mesh */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, rgba(134,102,255,0.5) 0%, transparent 70%)',
            top: '20%',
            left: '10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
            bottom: '10%',
            right: '15%',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div ref={wordsRef} className="text-center z-10 w-full px-6">
        {/* Word-by-word reveal */}
        <div className="overflow-hidden mb-4" style={{ perspective: '600px' }}>
          <div className="flex justify-center gap-[0.3em]">
            {['Full', 'Stack'].map((word, i) => (
              <span
                key={i}
                className="ld-word inline-block text-white/40 font-display tracking-wide"
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden mb-4" style={{ perspective: '600px' }}>
          <div className="flex justify-center gap-[0.04em]">
            {['Developer'].map((word, i) => (
              <span
                key={i}
                className="ld-word inline-block text-white/30 font-display"
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  fontWeight: 400,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div
          className="overflow-hidden mb-16"
          style={{ perspective: '600px' }}
        >
          <div className="flex justify-center gap-[0.02em]">
            {'PRAGYESH'.split('').map((char, i) => (
              <span
                key={i}
                className="ld-word inline-block bg-gradient-to-b from-white via-white to-purple-200 bg-clip-text text-transparent font-display"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                  <stop offset="50%" stopColor="rgb(139, 92, 246)" />
                  <stop offset="100%" stopColor="rgb(244, 114, 182)" />
                </linearGradient>
              </defs>
            </svg>
            <span
              ref={counterRef}
              className="absolute inset-0 flex items-center justify-center text-sm font-display text-white/60 font-medium"
            >
              0
            </span>
          </div>
        </div>
      </div>

      {/* Corner metadata */}
      <span className="absolute top-8 left-8 text-[10px] text-white/[0.1] font-mono tracking-[0.25em] uppercase hidden sm:block">
        Portfolio / 2026
      </span>
      <span className="absolute bottom-8 right-8 text-[10px] text-white/[0.1] font-mono tracking-[0.25em] uppercase hidden sm:block">
        Full Stack Developer
      </span>
    </div>
  );
};

export default LoadingScreen;
