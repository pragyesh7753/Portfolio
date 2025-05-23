import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Enhanced ScrollToTop with smooth scroll and floating button.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Scroll to top on route change with smooth animation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  // Show floating button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler for button click
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            key="scroll-to-top-btn"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-[120] rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg hover:shadow-xl text-white p-3 md:p-4 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ boxShadow: "0 4px 24px 0 rgba(56, 189, 248, 0.15)" }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
