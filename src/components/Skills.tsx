import React from 'react';
import { Code, Database, Globe, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Skills: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Backend':
        return <Code className="text-cyan-400" size={20} />;
      case 'Frontend':
        return <Globe className="text-purple-400" size={20} />;
      case 'Database':
        return <Database className="text-pink-400" size={20} />;
      case 'Tools':
      case 'DevOps':
        return <Wrench className="text-green-400" size={20} />;
      default:
        return <Code className="text-cyan-400" size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Backend':
        return 'from-cyan-500 to-blue-500';
      case 'Frontend':
        return 'from-purple-500 to-pink-500';
      case 'Database':
        return 'from-pink-500 to-red-500';
      case 'Tools':
      case 'DevOps':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-cyan-500 to-blue-500';
    }
  };

  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioData.skills.map((skill, index) => (
            <div 
              key={index} 
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  {getCategoryIcon(skill.category)}
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{skill.category}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
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
                          ? 'bg-cyan-400' 
                          : 'bg-gray-600'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Backend', 'Frontend', 'Database', 'Tools'].map((category) => {
            const categorySkills = portfolioData.skills.filter(skill => 
              skill.category === category || (category === 'Tools' && skill.category === 'DevOps')
            );
            const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
            
            return (
              <div key={category} className="text-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <div className="mb-3">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-white font-semibold mb-2">{category}</h3>
                <div className="text-2xl font-bold text-cyan-400">{Math.round(avgLevel)}%</div>
                <div className="text-sm text-gray-400">{categorySkills.length} skills</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;