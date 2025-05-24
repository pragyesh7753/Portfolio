import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticlesBackgroundEnhanced from './components/ParticlesBackgroundEnhanced';
import CustomCursor from './components/CustomCursor';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticlesBackgroundEnhanced />
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
