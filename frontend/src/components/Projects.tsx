import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Projects: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'major' | 'minor'>('major');
  const [isVisible, setIsVisible] = useState(false);
  
  const majorProjects = portfolioData.projects;
  const minorProjects = (portfolioData as any).minorProjects || [];
  const hasMinorProjects = minorProjects.length > 0;
  const projectsToShow = activeTab === 'major' || !hasMinorProjects ? majorProjects : minorProjects;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 bg-[#0F1115] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A64B2A]/10 to-[#F0B45A]/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 reveal-on-scroll">
          {hasMinorProjects && (
            <div className="inline-flex rounded-lg overflow-hidden shadow-lg mb-8 border border-[#2D323C]">
              <button
                className={`px-4 sm:px-8 py-2.5 sm:py-3 font-bold text-sm sm:text-lg transition-all duration-300 focus:outline-none ${activeTab === 'major' ? 'bg-gradient-to-r from-[#A64B2A] to-[#E76F3C] text-white shadow-lg scale-105' : 'bg-[#23262F] text-[#F0B45A] hover:bg-[#1A1D24]'}`}
                onClick={() => setActiveTab('major')}
              >
                Major Projects
              </button>
              <button
                className={`px-4 sm:px-8 py-2.5 sm:py-3 font-bold text-sm sm:text-lg transition-all duration-300 focus:outline-none ${activeTab === 'minor' ? 'bg-gradient-to-r from-[#E76F3C] to-[#A64B2A] text-white shadow-lg scale-105' : 'bg-[#23262F] text-[#F0B45A] hover:bg-[#1A1D24]'}`}
                onClick={() => setActiveTab('minor')}
              >
                Minor Projects
              </button>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] bg-clip-text text-transparent">
            {hasMinorProjects ? (activeTab === 'major' ? 'Major Projects' : 'Minor Projects') : 'Featured Projects'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectsToShow.map((project, index) => {
            const staggerNum = (index % 3) + 1;
            return (
              <div 
                key={project.id}
                className={`group relative bg-[#23262F]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-[#2D323C] hover:border-[#E76F3C] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E76F3C]/10 reveal-on-scroll stagger-${staggerNum} flex flex-col`}
              >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E76F3C]/5 to-[#F0B45A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/20 to-transparent"></div>
                
                {/* Overlay Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#0F1115]/80 backdrop-blur-sm rounded-full text-[#E76F3C] hover:text-white hover:bg-[#E76F3C] transition-all duration-300"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#0F1115]/80 backdrop-blur-sm rounded-full text-[#F0B45A] hover:text-gray-950 hover:bg-[#F0B45A] transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6 relative z-10 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#E76F3C] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#1A1D24] text-[#F0B45A] rounded-full text-xs font-medium border border-[#F0B45A]/25 hover:border-[#F0B45A] transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1A1D24] hover:bg-[#23262F] border border-[#2D323C] text-white rounded-lg transition-colors duration-300 flex-1 justify-center text-sm font-semibold"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#E76F3C] hover:bg-[#FF8C42] text-white rounded-lg transition-all duration-300 flex-1 justify-center text-sm font-extrabold"
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#A64B2A] to-[#E76F3C] hover:from-[#FF8C42] hover:to-[#E76F3C] text-white rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A64B2A]/30"
          >
            <Code size={20} />
            <span>View More Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;