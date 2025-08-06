import React from 'react';
import { ArrowUp, Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-purple-900/10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center">
          {/* Logo/Name */}
          <h3 className="text-2xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Kaushal Kumar
          </h3>
          
          {/* Tagline */}
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Building the future with code, one project at a time.
          </p>
          
          {/* Tech Stack Icons */}
          <div className="flex justify-center gap-4 mb-8">
            {['Java', 'React', 'Spring', 'MySQL', 'Git'].map((tech) => (
              <div 
                key={tech}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm flex items-center gap-1">
                © 2024 Kaushal Kumar. Made with 
                <Heart className="text-red-400 animate-pulse" size={16} />
                and 
                <Code className="text-cyan-400" size={16} />
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">
                  DevOps & CloudOps Engineer
                </span>
                
                <button
                  onClick={scrollToTop}
                  className="p-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  <ArrowUp className="text-white" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
    </footer>
  );
};

export default Footer;