import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { cn } from '@/lib/utils';
import { scrollToSection } from './SmoothScroll';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);

      const sections = NAV_ITEMS.map((n) => n.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback((id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Desktop floating pill nav */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] hidden md:block"
          >
            <div className="flex items-center gap-1 px-2.5 py-2 rounded-full bg-background/70 backdrop-blur-2xl border border-foreground/[0.06] shadow-2xl shadow-black/5 dark:shadow-black/40">
              {/* Logo */}
              <button
                onClick={() => handleClick('home')}
                className="px-2 py-1"
              >
                <img src="/favicon.png" alt="Logo" className="h-5 w-5 rounded-sm" />
              </button>

              <div className="w-px h-4 bg-foreground/[0.08]" />

              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    'relative px-3 py-1.5 text-[13px] font-medium transition-colors rounded-full',
                    activeSection === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-foreground/[0.06] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}

              <div className="w-px h-4 bg-foreground/[0.08]" />

              <div className="px-1">
                <ThemeSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile controls */}
      <div className="md:hidden fixed top-4 right-4 z-[100] flex items-center gap-2">
        <AnimatePresence>
          {visible && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ThemeSwitcher />
              </motion.div>
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-full bg-background/70 backdrop-blur-2xl border border-foreground/[0.06] shadow-lg"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-background/98 backdrop-blur-2xl md:hidden flex items-center justify-center"
          >
            <nav className="space-y-6 text-center">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    'block w-full text-3xl font-light tracking-tight transition-colors',
                    activeSection === item.id ? 'text-foreground' : 'text-muted-foreground/50'
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
