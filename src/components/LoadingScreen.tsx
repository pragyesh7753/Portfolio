import { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const triggerExit = useCallback(() => {
    if (done.current) return;
    done.current = true;
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.4,
      onComplete: () => onCompleteRef.current(),
    });
  }, []);

  useEffect(() => {
    // Name characters stagger reveal
    const chars = nameRef.current?.querySelectorAll('.ld-char');
    if (chars?.length) {
      gsap.fromTo(
        chars,
        { y: '120%' },
        { y: '0%', stagger: 0.06, duration: 1.2, ease: 'power4.out', delay: 0.3 }
      );
    }

    // Counter tween
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate() {
        setCount(Math.round(obj.val));
      },
      onComplete() {
        triggerExit();
      },
    });
  }, [triggerExit]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: '#09090b' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="text-center z-10 w-full px-6">
        {/* Name reveal */}
        <div ref={nameRef} className="overflow-hidden mb-14">
          <div className="flex justify-center gap-[0.02em]">
            {'PRAGYESH'.split('').map((char, i) => (
              <span
                key={i}
                className="ld-char inline-block text-white text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em]"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar + counter */}
        <div className="max-w-[220px] mx-auto">
          <div className="flex justify-between text-[10px] text-white/25 mb-3 font-mono uppercase tracking-[0.25em]">
            <span>Loading</span>
            <span>{count}%</span>
          </div>
          <div className="h-[1px] bg-white/[0.08] overflow-hidden rounded-full">
            <div
              className="h-full bg-white/80 rounded-full"
              style={{ width: `${count}%`, transition: 'width 0.05s linear' }}
            />
          </div>
        </div>
      </div>

      {/* Corner info */}
      <span className="absolute top-8 left-8 text-[10px] text-white/[0.12] font-mono tracking-[0.25em] uppercase hidden sm:block">
        Portfolio / 2026
      </span>
      <span className="absolute bottom-8 right-8 text-[10px] text-white/[0.12] font-mono tracking-[0.25em] uppercase hidden sm:block">
        Full Stack Developer
      </span>
    </div>
  );
};

export default LoadingScreen;
