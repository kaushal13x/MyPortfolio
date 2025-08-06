import React, { useState, useRef } from 'react';
import { FileText, Maximize2, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Resume: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      // Show loading state
      const downloadBtn = document.querySelector('.download-btn') as HTMLElement;
      if (downloadBtn) {
        downloadBtn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Generating PDF...';
        downloadBtn.setAttribute('disabled', 'true');
      }

      // Convert the resume content to canvas
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download the PDF
      pdf.save('Kaushal_Kumar_Resume.pdf');

      // Reset button state
      if (downloadBtn) {
        downloadBtn.innerHTML = '<Download size={20} /><span>Download PDF</span>';
        downloadBtn.removeAttribute('disabled');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Reset button state on error
      const downloadBtn = document.querySelector('.download-btn') as HTMLElement;
      if (downloadBtn) {
        downloadBtn.innerHTML = '<Download size={20} /><span>Download PDF</span>';
        downloadBtn.removeAttribute('disabled');
      }
    }
  };

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
                <div ref={resumeRef} className="bg-white text-gray-900 p-8 min-h-[600px]">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">KAUSHAL KUMAR</h1>
                    <p className="text-lg text-gray-600">DevOps & CloudOps Engineer</p>
                    <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                      <span>{portfolioData.contact.phone}</span>
                      <span>•</span>
                      <span>{portfolioData.contact.email}</span>
                      <span>•</span>
                      <span>kaushal13x</span>
                      <span>•</span>
                      <span>linkedin.com/in/kaushal-kumar-5014a5300</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                        SUMMARY
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {portfolioData.about.bio}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                        TECHNICAL SKILL
                      </h2>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Student of Creator Program of Linux World Informatics</p>
                        <p className="text-sm text-gray-600">Python, Kubernetes, Docker, Jenkins, Git, Linux</p>
                        <p className="text-sm text-gray-600">Amazon Web Services, AWS</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                      WORK EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                      {portfolioData.about.experience.map((exp, index) => (
                        <div key={index}>
                          <h3 className="font-semibold">{exp.company}</h3>
                          <p className="text-sm text-gray-600">{exp.role} • {exp.duration}</p>
                          <p className="text-sm text-gray-600">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                      PROJECTS
                    </h2>
                    <div className="space-y-2">
                      {portfolioData.projects.map((project, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm text-gray-600">{project.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                      EDUCATION
                    </h2>
                    <div>
                      <h3 className="font-semibold">{portfolioData.about.education[0].institution}</h3>
                      <p className="text-sm text-gray-600">{portfolioData.about.education[0].degree}</p>
                      <p className="text-sm text-gray-600">{portfolioData.about.education[0].year}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                      ADDITIONAL INFORMATION
                    </h2>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Technical Skills: {portfolioData.additionalInfo.technicalSkills.join(', ')}</p>
                      <p className="text-sm text-gray-600">Languages: {portfolioData.additionalInfo.languages.join(', ')}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                      CERTIFICATIONS
                    </h2>
                    <div className="space-y-2">
                      {portfolioData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm text-gray-600">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={downloadPDF}
                className="download-btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-400 rounded-lg font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <Maximize2 size={20} />
                <span>View Fullscreen</span>
              </button>
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
              <div className="flex gap-2">
                <button
                  onClick={downloadPDF}
                  className="download-btn-modal flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-8">
              {/* Same resume content as above */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">KAUSHAL KUMAR</h1>
                <p className="text-lg text-gray-600">DevOps & CloudOps Engineer</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                  <span>{portfolioData.contact.phone}</span>
                  <span>•</span>
                  <span>{portfolioData.contact.email}</span>
                  <span>•</span>
                  <span>kaushal13x</span>
                  <span>•</span>
                  <span>linkedin.com/in/kaushal-kumar-5014a5300</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                    SUMMARY
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {portfolioData.about.bio}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                    TECHNICAL SKILL
                  </h2>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Student of Creator Program of Linux World Informatics</p>
                    <p className="text-sm text-gray-600">Python, Kubernetes, Docker, Jenkins, Git, Linux</p>
                    <p className="text-sm text-gray-600">Amazon Web Services, AWS</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {portfolioData.about.experience.map((exp, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{exp.company}</h3>
                      <p className="text-sm text-gray-600">{exp.role} • {exp.duration}</p>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                  PROJECTS
                </h2>
                <div className="space-y-2">
                  {portfolioData.projects.map((project, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{project.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                  EDUCATION
                </h2>
                <div>
                  <h3 className="font-semibold">{portfolioData.about.education[0].institution}</h3>
                  <p className="text-sm text-gray-600">{portfolioData.about.education[0].degree}</p>
                  <p className="text-sm text-gray-600">{portfolioData.about.education[0].year}</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                  ADDITIONAL INFORMATION
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Technical Skills: {portfolioData.additionalInfo.technicalSkills.join(', ')}</p>
                  <p className="text-sm text-gray-600">Languages: {portfolioData.additionalInfo.languages.join(', ')}</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-2">
                  {portfolioData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;