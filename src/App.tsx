import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
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
    </ThemeProvider>
  );
}

export default App;