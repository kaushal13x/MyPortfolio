import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', target: '#home' },
    { label: 'About', target: '#about' },
    { label: 'Key Highlights', target: '#about' }, // scrolls to experience/timeline inside About
    { label: 'Internship', target: '#about' }, // scrolls to experience timeline
    { label: 'Projects', target: '#projects' },
    { label: 'Blog', target: '#blog' },
    { label: 'Contact', target: '#contact' },
    { label: 'Certifications', target: '#resume' }, // scrolls to certifications inside Resume
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active link detection
      const scrollPosition = window.scrollY + 200;
      
      const sections = navItems.map(item => {
        const id = item.target.substring(1);
        const element = document.getElementById(id);
        return {
          label: item.label,
          offsetTop: element ? element.offsetTop : 0,
          offsetHeight: element ? element.offsetHeight : 0
        };
      });

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
          setActiveItem(section.label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, target: string) => {
    e.preventDefault();
    setActiveItem(label);
    
    // Dispatch custom event to trigger futuristic scanner transition overlay
    const event = new CustomEvent('nav-transition-start', { detail: { target } });
    window.dispatchEvent(event);
    
    // Coordinate smooth scroll with the glowing sweep line passage
    setTimeout(() => {
      if (target === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const id = target.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const offset = 80; // height of fixed navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 150);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0F1115]/90 backdrop-blur-md shadow-lg border-b border-[#2D323C] py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'Home', '#home')} 
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-102"
          >
            {/* The stylized 'K' box */}
            <div className="w-10 h-10 rounded-lg bg-[#23262F] border border-[#2D323C] flex items-center justify-center shadow-md shadow-orange-950/20 group-hover:border-[#E76F3C] transition-colors duration-300">
              <svg className="w-5 h-5 text-[#E76F3C] group-hover:text-[#FF8C42] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4v16" />
                <path d="M5 12h4l7-8" />
                <path d="M9 12l7 8" />
              </svg>
            </div>
            
            {/* The Brand Texts */}
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base font-extrabold text-[#F5F5F5] group-hover:text-[#E76F3C] transition-colors duration-300 leading-tight tracking-wide font-sans">
                Kaushal Kumar
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#A0A0A0] leading-none mt-1 tracking-wider uppercase font-mono">
                B.Tech CSE | DevOps Enthusiast
              </span>
            </div>
          </a>
        </div>

        {/* Menu Navigation */}
        <div className="hidden lg:flex items-center gap-1 bg-[#1A1D24]/80 backdrop-blur-md border border-[#2D323C] rounded-full px-2 py-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.label, item.target)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeItem === item.label
                  ? 'bg-gradient-to-r from-[#A64B2A] to-[#E76F3C] text-white shadow-md shadow-[#A64B2A]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full border border-[#2D323C] text-[#F0B45A] hover:text-white hover:bg-[#23262F]/50 transition-all duration-300"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} className="animate-pulse" /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
