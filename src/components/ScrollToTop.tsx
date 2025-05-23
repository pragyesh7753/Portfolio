import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

/**
 * Enhanced ScrollToTop with smooth scroll, floating button, and progress indicator.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Scroll to top on route change with immediate scroll
  useEffect(() => {
    // Immediately scroll to top when route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Show floating button and calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent * 100);
      setShowButton(scrollTop > 300);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced handler for button click with easing
  const handleBackToTop = () => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    requestAnimationFrame(scrollToTop);
  };
  
  return (
    <>
      <Button
        onClick={handleBackToTop}
        className={cn(
          "fixed bottom-8 right-8 h-10 w-10 rounded-full p-0 shadow-md transition-all duration-300 z-50",
          showButton ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
        variant="secondary"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      
      {/* Progress indicator */}
      <div className="fixed bottom-0 left-0 h-1 bg-primary/20 w-full z-50">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>
    </>
  );
}
