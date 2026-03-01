import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <InteractiveBackground />
      <SmoothScroll>
        <div className="relative z-[1] min-h-screen bg-transparent text-foreground">
          <Navbar />
          <main>
            <Home />
            <About />
            <Projects />
            <Achievements />
            <Contact />
          </main>
          <Footer />
          <Toaster />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
