import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { ScrollToTop } from './components/ScrollToTop';
import GeometricLoadingScreen from './components/GeometricLoadingScreen';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import ParticlesBackgroundEnhanced from './components/ParticlesBackgroundEnhanced';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enhanced loading experience with realistic timing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Extended for cosmic loading experience

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-background text-foreground relative">
          <ParticlesBackgroundEnhanced />
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
          {/* Show loading overlay above all content */}
          {loading && (
            <div className="fixed inset-0 z-[9999]">
              <GeometricLoadingScreen />
            </div>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;