import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/achievements", label: "Achievements" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className={cn(
      "fixed w-full z-[100] transition-all duration-300",
      scrolled 
        ? "bg-background/80 backdrop-blur-md shadow-md dark:shadow-gray-800/30 border-b border-primary/20" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            Pragyesh
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "font-medium transition-colors",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "hover:text-primary"
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

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className={cn(
              "md:hidden mt-2",
              scrolled 
                ? "border-t border-primary/20 bg-background" 
                : "border-t border-gray-700 dark:border-gray-800"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4 py-4">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "px-2 transition-colors",
                    location.pathname === link.path
                      ? "text-primary font-medium"
                      : "hover:text-primary text-foreground/80"
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
    </nav>
  );
};

export default Navbar;