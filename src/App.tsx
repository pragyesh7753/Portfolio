import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { ScrollToTop } from './components/ScrollToTop';
import { ParticlesBackground } from './components/ParticlesBackground';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

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
            <div className="min-h-screen bg-background text-foreground relative">
              <ParticlesBackground />
              <div className="relative z-10">
                <Navbar />
                <main className="pt-16"> {/* Added padding to prevent content overlap with navbar */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/achievements" element={<Achievements />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster />
              </div>
            </div>
          </Router>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;