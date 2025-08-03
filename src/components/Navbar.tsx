import { useState, useEffect,  useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/achievements", label: "Achievements" },
  { path: "/contact", label: "Contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastScrollY && y > 100) {
        setIsVisible(false);
      } else if (y < lastScrollY || y === 0) {
        setIsVisible(true);
      }
      setLastScrollY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navStyles = useMemo(() => ({
    base: "fixed top-2 sm:top-4 left-1/2 z-[100] w-[95%] sm:w-11/12 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-xl sm:rounded-2xl transition-all duration-500",
    scrolled: "bg-background/95 backdrop-blur-xl shadow-2xl border border-primary/20",
    unscrolled: "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
  }), []);



  return (
    <motion.nav 
      className={cn(navStyles.base, scrolled ? navStyles.scrolled : navStyles.unscrolled)}
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: isVisible ? 0 : -100, x: "-50%", scale: scrolled ? 0.98 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="px-1 sm:px-2 md:px-3 lg:px-4">
        <div className="flex items-center justify-center h-10 sm:h-12">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-md sm:rounded-lg group whitespace-nowrap",
                    isActive ? "text-primary bg-primary/10 shadow-lg" : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-lg border border-primary/30"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-1 sm:ml-2 lg:ml-3 pl-1 sm:pl-2 lg:pl-3 border-l border-foreground/20 dark:border-white/20">
                <ThemeSwitcher />
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex-1" />
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="relative p-0.5 sm:p-1 rounded-full bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-300/50 dark:border-slate-600/50 shadow-lg backdrop-blur-sm">
                <ThemeSwitcher />
              </div>
              <motion.button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-1 sm:p-1.5 focus:outline-none focus:ring-2 focus:ring-primary rounded-md sm:rounded-lg bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-300/50 dark:border-slate-600/50 hover:from-primary/20 hover:to-primary/10 dark:hover:from-primary/20 dark:hover:to-primary/10 transition-all duration-200 shadow-lg backdrop-blur-sm"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  {isOpen ? <X size={16} className="sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" /> : <Menu size={16} className="sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "md:hidden mt-1 sm:mt-1.5 rounded-lg sm:rounded-xl overflow-hidden",
                scrolled ? "bg-background/98 backdrop-blur-lg shadow-lg border border-primary/20" : "bg-white/10 backdrop-blur-md border border-white/20"
              )}
            >
              <div className="flex flex-col space-y-0.5 p-1.5 sm:p-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-200 rounded-md sm:rounded-lg font-medium relative overflow-hidden group text-sm",
                        isActive ? "text-primary bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-md" : "hover:text-primary hover:bg-primary/10 text-foreground/80 hover:shadow-sm"
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;