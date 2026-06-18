import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Footer from './components/Footer';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  // Track scroll position for progress bar and back to top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global scroll revealIntersectionObserver
  useEffect(() => {
    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    const interval = setInterval(() => {
      const currentElements = document.querySelectorAll('.reveal-on-scroll:not(.reveal-active)');
      currentElements.forEach((el) => observer.observe(el));
    }, 800);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gray-900 text-white relative">
        {/* Glowing Scroll Progress Bar */}
        <div className="scroll-progress-container">
          <div 
            className="scroll-progress-bar" 
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

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
        <Skills />
        <Projects />
        <Blog />
        <Contact />
        <Resume />
        <Footer />

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#1A1D24]/95 backdrop-blur-md border border-[#E76F3C] text-[#E76F3C] hover:bg-[#E76F3C] hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(231,111,60,0.5)] transition-all duration-300 shadow-lg shadow-black/50 group"
            title="Scroll to top"
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              viewBox="0 0 24 24"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        )}
      </div>
    </PortfolioProvider>
  );
}

export default App;