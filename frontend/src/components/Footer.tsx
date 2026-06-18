import React from 'react';
import { ArrowUp, Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1D24] border-t border-[#2D323C] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A64B2A]/10 to-[#F0B45A]/10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center">
          {/* Logo/Name */}
          <h3 className="text-2xl font-bold mb-4 font-orbitron bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] bg-clip-text text-transparent">
            Kaushal Kumar
          </h3>
          
          {/* Tagline */}
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Building the future with code, one automated pipeline at a time.
          </p>
          
          {/* Tech Stack Icons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Python', 'Linux', 'Git'].map((tech) => (
              <div 
                key={tech}
                className="px-3 py-1 bg-[#23262F] border border-[#2D323C] rounded-full text-sm text-gray-300 hover:border-[#E76F3C] hover:text-[#E76F3C] transition-colors duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="border-t border-[#2D323C] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm flex items-center gap-1">
                © 2026 Kaushal Kumar. Made with 
                <Heart className="text-red-500 animate-pulse" size={16} />
                and 
                <Code className="text-[#E76F3C]" size={16} />
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">
                  DevOps & Cloud Computing Enthusiast
                </span>
                
                <button
                  onClick={scrollToTop}
                  className="p-2 bg-[#E76F3C] hover:bg-[#FF8C42] rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#E76F3C]/40"
                >
                  <ArrowUp className="text-white" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#E76F3C] to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;