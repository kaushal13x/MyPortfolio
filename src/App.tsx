import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Footer from './components/Footer';

function App() {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const handleTransition = () => {
      setIsScanning(true);
      // Scan animation matches index.css timing (850ms)
      setTimeout(() => setIsScanning(false), 850);
    };

    window.addEventListener('nav-transition-start', handleTransition);
    return () => window.removeEventListener('nav-transition-start', handleTransition);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Navbar />
      
      {/* Futuristic Cyber Scanner Overlay */}
      {isScanning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Holographic Matrix glitch flash overlay */}
          <div className="absolute inset-0 bg-[#E76F3C] animate-glitch-flash pointer-events-none"></div>
          
          {/* Laser Scan Line */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E76F3C] to-transparent shadow-[0_0_15px_#E76F3C,0_0_30px_#F0B45A] animate-scanner-sweep pointer-events-none"></div>
          
          {/* Cybernetic HUD scan brackets */}
          <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-[#E76F3C]/5 to-transparent border-t border-[#E76F3C]/10 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-[#E76F3C]/5 to-transparent border-b border-[#E76F3C]/10 pointer-events-none"></div>
        </div>
      )}
      
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Contact />
      <Resume />
      <Footer />
    </div>
  );
}

export default App;