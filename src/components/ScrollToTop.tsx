import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const html = document.documentElement;
    const orig = html.style.scrollBehavior;
    html.style.scrollBehavior = 'smooth';
    
    const scroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    scroll();
    const timer = setTimeout(() => {
      scroll();
      setTimeout(() => html.style.scrollBehavior = orig, 100);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      html.style.scrollBehavior = orig;
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((top / height) * 100);
      setShow(top > 300);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const scroll = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        requestAnimationFrame(scroll);
        window.scrollTo(0, c - c / 8);
      }
    };
    requestAnimationFrame(scroll);
  };
  
  return (
    <>
      <Button
        onClick={handleClick}
        className={cn(
          "fixed bottom-8 right-8 h-10 w-10 rounded-full p-0 shadow-md transition-all duration-300 z-50",
          show ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
        variant="secondary"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      
      <div className="fixed bottom-0 left-0 h-1 bg-primary/20 w-full z-50">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }} 
        />
      </div>
    </>
  );
}
