import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that automatically scrolls the window to the top
 * whenever the route location changes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the pathname changes
    window.scrollTo({
      top: 0,
      behavior: "instant" // Use instant instead of smooth for cleaner page transitions
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}
