import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
// Lazy load components for better initial load performance
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Achievements = lazy(() => import('./components/Achievements'));
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { ScrollToTop } from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - in a real app, this could be based on actual resource loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Show loading screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="loading-pulse">Loading...</div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/achievements" element={<Achievements />} />
                </Routes>
              </Suspense>
              <Footer />
              <Toaster />
            </div>
          </Router>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;