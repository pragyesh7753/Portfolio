import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements'; // Changed from AchievementsEnhanced
import Footer from './components/Footer';
import LoadingScreenEnhanced from './components/LoadingScreenEnhanced';
import ParticlesBackgroundEnhanced from './components/ParticlesBackgroundEnhanced';
import EmojiCursor from './components/CustomCursor';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enhanced loading experience with realistic timing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Extended for enhanced loading screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreenEnhanced key="loading" onLoadingComplete={() => setLoading(false)} />
        ) : (
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-foreground relative">
              <ParticlesBackgroundEnhanced />
              <EmojiCursor />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/achievements" element={<Achievements />} />
              </Routes>
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