import React, { useState } from 'react';
import { FileText, Maximize2, Download } from 'lucide-react';

const Resume: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const resumeUrl = "https://drive.google.com/file/d/1example/preview"; // Replace with actual resume URL

  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Resume
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            {/* Resume Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="text-cyan-400" size={24} />
                <h3 className="text-xl font-semibold text-white">Professional Resume</h3>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                >
                  <Maximize2 size={16} />
                  <span>Fullscreen</span>
                </button>
                
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300"
                >
                  <Download size={16} />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="relative">
              <div className="border-2 border-cyan-400/30 rounded-lg overflow-hidden shadow-lg shadow-cyan-500/20">
                {/* Mock Resume Content */}
                <div className="bg-white text-gray-900 p-8 min-h-[600px]">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Kaushal Kumar</h1>
                    <p className="text-lg text-gray-600">Full Stack Java Developer</p>
                    <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                      <span>kaushal.kumar@example.com</span>
                      <span>•</span>
                      <span>linkedin.com/in/kaushalkumar</span>
                      <span>•</span>
                      <span>github.com/kaushalkumar</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                        Technical Skills
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">Backend</h3>
                          <p className="text-sm text-gray-600">Java, Spring Boot, REST APIs, Microservices</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Frontend</h3>
                          <p className="text-sm text-gray-600">React, JavaScript, HTML5, CSS3, Tailwind</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Database</h3>
                          <p className="text-sm text-gray-600">MySQL, PostgreSQL, MongoDB</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Tools</h3>
                          <p className="text-sm text-gray-600">Git, Docker, Maven, Jenkins</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                        Experience
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Full Stack Developer</h3>
                          <p className="text-sm text-gray-600">Tech Innovators Inc. • 2023-Present</p>
                          <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li>• Developed scalable web applications using Java Spring Boot</li>
                            <li>• Built responsive frontends with React and modern CSS</li>
                            <li>• Implemented RESTful APIs serving 10k+ daily requests</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold">Software Developer Intern</h3>
                          <p className="text-sm text-gray-600">StartupXYZ • 2022-2023</p>
                          <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li>• Built REST APIs and database schemas</li>
                            <li>• Implemented frontend components in React</li>
                            <li>• Participated in code reviews and testing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                      Education
                    </h2>
                    <div>
                      <h3 className="font-semibold">Bachelor of Technology in Computer Science</h3>
                      <p className="text-sm text-gray-600">ABC University • 2020-2024</p>
                      <p className="text-sm text-gray-600 mt-1">Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Resume - Kaushal Kumar</h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-300"
              >
                Close
              </button>
            </div>
            <div className="p-8">
              {/* Same resume content as above */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Kaushal Kumar</h1>
                <p className="text-lg text-gray-600">Full Stack Java Developer</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                  <span>kaushal.kumar@example.com</span>
                  <span>•</span>
                  <span>linkedin.com/in/kaushalkumar</span>
                  <span>•</span>
                  <span>github.com/kaushalkumar</span>
                </div>
              </div>
              {/* Rest of resume content */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;