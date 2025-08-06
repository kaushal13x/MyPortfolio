import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Instagram, Twitter, MessageCircle, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import dp from '../dp.jpg';

const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<'projects' | 'contact' | null>(null);

  useEffect(() => {
    const roles = portfolioData.hero.roles;
    const currentText = roles[currentRole];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  const scrollToSection = async (target: 'projects' | 'contact') => {
    if (isScrolling) return; // Prevent multiple scrolls
    
    setIsScrolling(true);
    setScrollTarget(target);
    
    // Add a small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Reset state after scroll animation completes
      setTimeout(() => {
        setIsScrolling(false);
        setScrollTarget(null);
      }, 1500);
    } else {
      setIsScrolling(false);
      setScrollTarget(null);
    }
  };

  const scrollToProjects = () => scrollToSection('projects');
  const scrollToContact = () => scrollToSection('contact');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%253Csvg%2520width%253D%252260%2522%2520height%253D%252260%2522%2520viewBox%253D%25220%25200%252060%252060%2522%2520xmlns%253D%2522http%253A//www.w3.org/2000/svg%2522%253E%253Cg%2520fill%253D%2522none%2522%2520fill-rule%253D%2522evenodd%2522%253E%253Cg%2520fill%253D%2522%25236d04cf%2522%2520fill-opacity%253D%25220.1%2522%253E%253Ccircle%2520cx%253D%252230%2522%2520cy%253D%252230%2522%2520r%253D%25221%2522/%253E%253C/g%253E%253C/g%253E%253C/svg%253E')] opacity-50"></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Profile Picture */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="neon-border mb-6">
            <img
              src={dp}
              alt="Kaushal Kumar Profile"
              className="profile-picture w-40 h-40 object-cover mx-auto"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 font-cinzel">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              {portfolioData.hero.name}
            </span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-medium mb-6 h-12 flex items-center justify-center">
            <span className="text-white font-mono">
              {displayText}
              <span className="animate-pulse text-pink-400">|</span>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {portfolioData.hero.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={scrollToProjects}
            disabled={isScrolling}
            className={`group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed ${isScrolling && scrollTarget === 'projects' ? 'animate-pulse' : ''}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isScrolling && scrollTarget === 'projects' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Scrolling...
                </>
              ) : (
                'View Projects'
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </button>
          
          <button 
            onClick={scrollToContact}
            disabled={isScrolling}
            className={`group relative px-8 py-3 border-2 border-cyan-400 rounded-lg font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-70 disabled:cursor-not-allowed ${isScrolling && scrollTarget === 'contact' ? 'animate-pulse' : ''}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isScrolling && scrollTarget === 'contact' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Scrolling...
                </>
              ) : (
                'Contact Me'
              )}
            </span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          <a href={portfolioData.contact.github} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-125 transform">
            <Github size={24} />
          </a>
          <a href={portfolioData.contact.linkedin} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-125 transform">
            <Linkedin size={24} />
          </a>
          <a href={portfolioData.contact.instagram} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-125 transform">
            <Instagram size={24} />
          </a>
          <a href={portfolioData.contact.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-125 transform">
            <Twitter size={24} />
          </a>
          <a href={portfolioData.contact.discord} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-125 transform">
            <MessageCircle size={24} />
          </a>
          <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-125 transform">
            <Mail size={24} />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ArrowDown className="text-gray-400 mx-auto" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;