import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'major' | 'minor'>('major');
  const [isVisible, setIsVisible] = useState(false);
  const majorProjects = portfolioData.projects;
  const minorProjects = portfolioData.minorProjects || [];
  const projectsToShow = activeTab === 'major' ? majorProjects : minorProjects;

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
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex rounded-lg overflow-hidden shadow-lg mb-8">
            <button
              className={`px-8 py-3 font-bold text-lg transition-all duration-300 focus:outline-none ${activeTab === 'major' ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg scale-105' : 'bg-gray-800 text-cyan-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('major')}
            >
              Major Projects
            </button>
            <button
              className={`px-8 py-3 font-bold text-lg transition-all duration-300 focus:outline-none ${activeTab === 'minor' ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg scale-105' : 'bg-gray-800 text-purple-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('minor')}
            >
              Minor Projects
            </button>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {activeTab === 'major' ? 'Major Projects' : 'Minor Projects'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className={`grid lg:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {projectsToShow.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                
                {/* Overlay Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <a 
                    href={project.github}
                    className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-cyan-400 hover:text-white hover:bg-cyan-400 transition-all duration-300"
                  >
                    <Github size={16} />
                  </a>
                  <a 
                    href={project.demo}
                    className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-purple-400 hover:text-white hover:bg-purple-400 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-sm font-medium border border-cyan-400/30 hover:border-cyan-400 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href={project.github}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex-1 justify-center"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.demo}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 flex-1 justify-center"
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href={portfolioData.contact.github}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
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