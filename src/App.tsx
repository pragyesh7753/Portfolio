import { useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';

// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <InteractiveBackground />
      <SmoothScroll>
        <div className="relative z-[1] min-h-screen bg-transparent text-foreground noise-overlay">
          <Navbar />
          <main>
            <Home />
            <Suspense fallback={<div className="min-h-screen" />}>
              <About />
              <Experience />
              <Projects />
              <Achievements />
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <Toaster />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
