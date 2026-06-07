import React from 'react';
import { Code, Wrench, Cloud, Box, RefreshCw, Cpu, Terminal, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Skills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cloud Platforms':
        return <Cloud className="text-[#E76F3C]" size={20} />;
      case 'Containerization':
        return <Box className="text-[#F0B45A]" size={20} />;
      case 'CI/CD Tools':
        return <RefreshCw className="text-[#FF8C42]" size={20} />;
      case 'Infrastructure as Code':
        return <Cpu className="text-[#A64B2A]" size={20} />;
      case 'Scripting':
        return <Code className="text-[#E76F3C]" size={20} />;
      case 'Operating Systems':
        return <Terminal className="text-[#F0B45A]" size={20} />;
      case 'Core Concepts':
        return <Layers className="text-[#FF8C42]" size={20} />;
      default:
        return <Code className="text-[#E76F3C]" size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cloud Platforms':
        return 'from-[#A64B2A] to-[#E76F3C]';
      case 'Containerization':
        return 'from-[#E76F3C] to-[#F0B45A]';
      case 'CI/CD Tools':
        return 'from-[#A64B2A] to-[#F0B45A]';
      case 'Infrastructure as Code':
        return 'from-[#E76F3C] to-[#FF8C42]';
      case 'Scripting':
        return 'from-[#A64B2A] to-[#E76F3C]';
      case 'Operating Systems':
        return 'from-[#E76F3C] to-[#F0B45A]';
      case 'Core Concepts':
        return 'from-[#A64B2A] to-[#FF8C42]';
      default:
        return 'from-[#A64B2A] to-[#E76F3C]';
    }
  };


  return (
    <section id="skills" className="py-20 bg-[#0F1115] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A64B2A]/10 to-[#F0B45A]/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioData.skills.map((skill, index) => {
            const staggerNum = (index % 4) + 1; // grid has 4 cols on xl screens
            return (
              <div 
                key={index} 
                className={`group relative bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-6 border border-[#2D323C] hover:border-[#E76F3C] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#E76F3C]/10 reveal-on-scroll stagger-${staggerNum}`}
              >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E76F3C]/5 to-[#F0B45A]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  {getCategoryIcon(skill.category)}
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 text-xs">{skill.category}</span>
                    <span className="text-[#E76F3C] font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#1A1D24] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)} transition-all duration-500 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Skill Level Indicator */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(skill.level / 20) 
                          ? 'bg-[#E76F3C]' 
                          : 'bg-[#2D323C]'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;