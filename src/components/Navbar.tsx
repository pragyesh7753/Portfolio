import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Basic scrolled state
      setScrolled(currentScrollY > 20);
      
      // Scroll direction detection for hide/show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      // Always show navbar at top of page
      if (currentScrollY === 0) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/achievements", label: "Achievements" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <motion.nav 
      className={cn(
        "fixed top-2 sm:top-4 left-1/2 z-[100] transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-background/95 backdrop-blur-xl shadow-2xl border border-primary/20 w-[95%] sm:w-11/12 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-xl sm:rounded-2xl" 
          : "bg-white/10 backdrop-blur-md border border-white/20 w-[95%] sm:w-11/12 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-xl sm:rounded-2xl shadow-lg"
      )}
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        scale: scrolled ? 0.98 : 1,
        x: "-50%"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3 
      }}
      style={{
        boxShadow: scrolled 
          ? "0 20px 60px -12px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)" 
          : "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)"
      }}
    >
      <div className="px-1 sm:px-2 md:px-3 lg:px-4">
        <div className="flex items-center justify-center h-10 sm:h-12">
          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={link.path}
                  className={cn(
                    "relative font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-md sm:rounded-lg group whitespace-nowrap",
                    location.pathname === link.path 
                      ? "text-primary bg-primary/10 shadow-lg" 
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {location.pathname === link.path && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-lg border border-primary/30"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    whileHover={{ scale: 1.05 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="ml-1 sm:ml-2 lg:ml-3 pl-1 sm:pl-2 lg:pl-3 border-l border-foreground/20 dark:border-white/20"
            >
              <div className="relative p-1 rounded-full bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-300/50 dark:border-slate-600/50 shadow-lg backdrop-blur-sm">
                <ThemeSwitcher />
              </div>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
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
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? 
                    <X size={16} className="sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" /> : 
                    <Menu size={16} className="sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300" />
                  }
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3 
          }}
          style={{ overflow: "hidden" }}
        >
          {isOpen && (
            <div 
              className={cn(
                "mt-1 sm:mt-1.5 rounded-lg sm:rounded-xl overflow-hidden",
                scrolled 
                  ? "bg-background/98 backdrop-blur-lg shadow-lg border border-primary/20" 
                  : "bg-white/10 backdrop-blur-md border border-white/20"
              )}
            >
              <div className="flex flex-col space-y-0.5 p-1.5 sm:p-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      className={cn(
                        "block px-2 sm:px-3 py-2 sm:py-2.5 transition-all duration-200 rounded-md sm:rounded-lg font-medium relative overflow-hidden group text-sm",
                        location.pathname === link.path
                          ? "text-primary bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 shadow-md"
                          : "hover:text-primary hover:bg-primary/10 text-foreground/80 hover:shadow-sm"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        whileHover={{ scale: 1.02 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;