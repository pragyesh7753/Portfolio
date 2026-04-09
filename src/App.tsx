import { useState, Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoadingScreen from './components/LoadingScreen';

// Lazy load below-the-fold components
const Toaster = lazy(() => import('./components/ui/toaster').then((m) => ({ default: m.Toaster })));
const InteractiveBackground = lazy(() => import('./components/InteractiveBackground'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [loading, setLoading] = useState(true);
  const [showEnhancements, setShowEnhancements] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowEnhancements(false);
      return;
    }

    const onIdle = () => setShowEnhancements(true);
    const browserWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (browserWindow.requestIdleCallback) {
      const idleId = browserWindow.requestIdleCallback(onIdle, { timeout: 700 });
      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(onIdle, 200);
    return () => globalThis.clearTimeout(timeoutId);
  }, [loading]);

  return (
    <ThemeProvider defaultTheme="dark">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {showEnhancements && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      {showEnhancements && (
        <Suspense fallback={null}>
          <InteractiveBackground />
        </Suspense>
      )}
      <SmoothScroll>
        <div className="relative z-1 min-h-screen bg-transparent text-foreground noise-overlay">
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
          {showEnhancements && (
            <Suspense fallback={null}>
              <Toaster />
            </Suspense>
          )}
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
