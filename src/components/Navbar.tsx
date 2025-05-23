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
        "fixed w-full z-[100] transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-background/95 backdrop-blur-xl shadow-2xl border-b border-primary/30 navbar-scrolled" 
          : "bg-transparent",
        !isVisible && "transform -translate-y-full"
      )}
      initial={{ y: -100 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        scale: scrolled ? 0.98 : 1,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3 
      }}
      style={{
        borderRadius: scrolled ? "0 0 24px 24px" : "0",
        margin: scrolled ? "0 2% 0 2%" : "0",
        width: scrolled ? "96%" : "100%",
        boxShadow: scrolled ? "0 20px 60px -12px rgba(59, 130, 246, 0.15)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 flex-shrink-0">
            Pragyesh
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "font-medium transition-colors text-sm lg:text-base",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div 
                    className="h-0.5 bg-primary mt-0.5"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
            <ThemeSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Add animation and improved styling */}
        {isOpen && (
          <motion.div 
            className={cn(
              "md:hidden",
              scrolled 
                ? "border-t border-primary/30 bg-background/98 backdrop-blur-lg shadow-lg" 
                : "border-t border-gray-700/30 dark:border-gray-800/30 bg-background/85 backdrop-blur-md"
            )}
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 30,
              duration: 0.3 
            }}
          >
            <div className="flex flex-col space-y-3 py-3">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "px-4 py-2 transition-colors rounded-md",
                    location.pathname === link.path
                      ? "text-primary font-medium bg-primary/10"
                      : "hover:text-primary hover:bg-primary/5 text-foreground/80"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;