import React from 'react';
import { User, GraduationCap, Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-8">
              <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg shadow-cyan-500/50">
                <img 
                  src={portfolioData.profilePic}
                  alt="Kaushal Kumar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 animate-pulse"></div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-4">
                <User className="text-cyan-400" size={20} />
                <h3 className="text-xl font-semibold text-white">Bio</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {portfolioData.about.bio}
              </p>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="text-cyan-400" size={20} />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              {portfolioData.about.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-cyan-400 pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full -ml-6"></div>
                    <span className="text-purple-400 font-mono text-sm">{edu.year}</span>
                  </div>
                  <h4 className="text-white font-semibold">{edu.degree}</h4>
                  <p className="text-gray-300">{edu.field}</p>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="text-cyan-400" size={20} />
                <h3 className="text-xl font-semibold text-white">Experience</h3>
              </div>
              {portfolioData.about.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-cyan-400 pl-4 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full -ml-6"></div>
                    <span className="text-purple-400 font-mono text-sm">{exp.duration}</span>
                  </div>
                  <h4 className="text-white font-semibold">{exp.role}</h4>
                  <p className="text-cyan-400 mb-2">{exp.company}</p>
                  <p className="text-gray-300 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;