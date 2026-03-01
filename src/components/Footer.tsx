import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { memo, useCallback } from 'react';
import { scrollToSection } from './SmoothScroll';

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { href: 'https://github.com/pragyesh7753', icon: Github, label: 'GitHub' },
  { href: 'http://www.linkedin.com/in/pragyesh77', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:spragyesh86@gmail.com', icon: Mail, label: 'Email' },
  { href: 'https://x.com/SethPragyesh', icon: XIcon, label: 'X' },
];

const MARQUEE_ITEMS = ['LET\'S WORK TOGETHER', 'LET\'S BUILD SOMETHING', 'LET\'S CREATE'];

const Footer = memo(() => {
  const scrollTop = useCallback(() => scrollToSection('home'), []);

  return (
    <footer className="relative border-t border-indigo-500/[0.08] overflow-hidden">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span
          className="text-stroke text-foreground/[0.04] whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(5rem, 18vw, 22rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
          }}
        >
          PRAGYESH
        </span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* CTA marquee strip */}
        <div className="py-12 border-b border-foreground/[0.04] overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="mx-10 text-xl md:text-2xl font-bold text-indigo-500/[0.08] uppercase tracking-[0.1em] flex items-center gap-10"
              >
                {item}
                <span className="text-violet-500/[0.15]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-1">
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Pragyesh Kumar Seth
              </span>
            </h3>
            <p className="text-xs text-muted-foreground/50">
              Full Stack Developer · Building the web, one pixel at a time.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2.5 rounded-full border border-foreground/[0.06] text-muted-foreground/50 hover:text-foreground hover:border-indigo-500/20 hover:bg-indigo-500/[0.05] transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={scrollTop}
              className="p-2.5 rounded-full border border-foreground/[0.06] text-muted-foreground/50 hover:text-foreground hover:border-indigo-500/20 hover:bg-indigo-500/[0.05] transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-500/[0.06] py-8 text-center">
          <p className="text-[11px] text-muted-foreground/30 font-mono tracking-wider">
            © {new Date().getFullYear()} Pragyesh Kumar Seth
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
