import React, { useState, useRef } from 'react';
import { FileText, Maximize2, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Resume: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const modalResumeRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [activeCertTab, setActiveCertTab] = useState<string>('All');

  const generatePDF = async (element: HTMLDivElement | null, filename: string) => {
    if (!element) return;

    try {
      const downloadBtn = document.querySelector('.download-btn') as HTMLElement;
      if (downloadBtn) {
        downloadBtn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div> Generating...';
        downloadBtn.setAttribute('disabled', 'true');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(filename);

      if (downloadBtn) {
        downloadBtn.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span>Download PDF</span>';
        downloadBtn.removeAttribute('disabled');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (downloadBtn) {
        downloadBtn.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span>Download PDF</span>';
        downloadBtn.removeAttribute('disabled');
      }
    }
  };

  const getBullets = (text: string) => {
    return text
      .split(/(?<=[.!?])\s+/)
      .filter(sentence => sentence.trim().length > 0)
      .map(s => {
        let trimmed = s.trim();
        if (!trimmed.endsWith('.')) trimmed += '.';
        return trimmed;
      });
  };

  // Group skills by category
  const groupedSkills = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const ResumeContent = () => (
    <div className="bg-white text-gray-900 p-8 md:p-12 shadow-inner font-sans">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-4xl font-extrabold tracking-wide uppercase text-gray-800 font-serif">
          {portfolioData.hero.name}
        </h1>
        <p className="text-sm font-bold tracking-wider uppercase text-[#A64B2A] mt-1 font-mono">
          {portfolioData.hero.title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-600 font-mono">
          <span>{portfolioData.contact.phone}</span>
          <span className="text-gray-300">•</span>
          <span>{portfolioData.contact.email}</span>
          <span className="text-gray-300">•</span>
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#E76F3C] font-semibold underline">
            GitHub
          </a>
          <span className="text-gray-300">•</span>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#E76F3C] font-semibold underline">
            LinkedIn
          </a>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#A64B2A] border-b border-gray-300 pb-1 mb-2 font-serif flex items-center gap-2">
          Summary
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed text-justify">
          {portfolioData.about.bio}
        </p>
      </div>

      {/* Technical Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#A64B2A] border-b border-gray-300 pb-1 mb-2 font-serif flex items-center gap-2">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 gap-y-2">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="text-sm flex flex-col sm:flex-row sm:items-baseline gap-x-2">
              <span className="font-bold text-gray-700 min-w-[200px] inline-block">{category}:</span>
              <span className="text-gray-600">{skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#A64B2A] border-b border-gray-300 pb-1 mb-3 font-serif flex items-center gap-2">
          Experience
        </h2>
        <div className="space-y-4">
          {portfolioData.about.experience.map((exp, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-gray-800 text-base">{exp.role}</h3>
                <span className="text-xs text-gray-500 font-semibold font-mono">{exp.duration}</span>
              </div>
              <p className="text-[#E76F3C] font-semibold mb-2">{exp.company}</p>
              <ul className="list-disc pl-5 space-y-1">
                {getBullets(exp.description).map((bullet, bIdx) => (
                  <li key={bIdx} className="text-gray-600 leading-relaxed text-justify">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#A64B2A] border-b border-gray-300 pb-1 mb-3 font-serif flex items-center gap-2">
          Projects
        </h2>
        <div className="space-y-4">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-gray-800 text-base">{project.title}</h3>
                <span className="text-xs text-gray-500 font-semibold font-mono">{project.technologies.join(' — ')}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {(project.details || getBullets(project.description)).map((bullet, bIdx) => (
                  <li key={bIdx} className="text-gray-600 leading-relaxed text-justify">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#A64B2A] border-b border-gray-300 pb-1 mb-2 font-serif flex items-center gap-2">
          Education
        </h2>
        {portfolioData.about.education.map((edu, index) => (
          <div key={index} className="text-sm flex justify-between items-start mb-3 last:mb-0">
            <div>
              <h3 className="font-bold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution} {edu.board ? `(${edu.board})` : ''}</p>
              {edu.cgpa && <p className="text-[#E76F3C] font-semibold mt-1">CGPA: ~ {edu.cgpa}</p>}
            </div>
            <span className="text-xs text-gray-500 font-semibold font-mono">{edu.year}</span>
          </div>
        ))}
      </div>

      {/* Certifications and Additional Info */}
      <div className="grid md:grid-cols-2 gap-8 mt-6 pt-4 border-t border-gray-200">
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-[#A64B2A] mb-2 font-serif">
            Certifications
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-gray-650">
            {portfolioData.certifications.filter((c: any) => 
              c.name.includes("IBM") || 
              c.name.includes("Lavanta Naturals DevOps") || 
              c.name.includes("SkillCraft Cyber Security") || 
              c.name.includes("Linuxworld AI") ||
              c.name.includes("Python")
            ).slice(0, 5).map((cert: any, index: number) => (
              <li key={index}>
                <span className="font-semibold text-gray-700">{cert.name}</span>
                <span className="text-[9px] text-[#E76F3C] ml-1 font-mono uppercase">({cert.type.split(' ')[0]})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-[#A64B2A] mb-2 font-serif">
            Additional Information
          </h2>
          <div className="space-y-1 text-xs text-gray-600">
            <p>
              <strong className="text-gray-700">Soft Skills:</strong> {portfolioData.additionalInfo.softSkills.join(', ')}
            </p>
            <p>
              <strong className="text-gray-700">Languages:</strong> {portfolioData.additionalInfo.languages.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="resume" className="py-20 bg-[#1A1D24] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A64B2A]/10 to-[#F0B45A]/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] bg-clip-text text-transparent">
            Resume
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-6 border border-[#2D323C]">
            {/* Resume Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="text-[#E76F3C]" size={24} />
                <h3 className="text-xl font-semibold text-white">Professional Resume</h3>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A1D24] hover:bg-[#23262F] border border-[#2D323C] text-white rounded-lg transition-colors duration-300"
                >
                  <Maximize2 size={16} />
                  <span>Fullscreen</span>
                </button>
                
                <button
                  onClick={() => generatePDF(resumeRef.current, 'Kaushal_Kumar_Resume.pdf')}
                  className="download-btn flex items-center gap-2 px-4 py-2 bg-[#E76F3C] hover:bg-[#FF8C42] text-white rounded-lg transition-all duration-300"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="relative">
              <div className="border-2 border-[#E76F3C]/35 rounded-lg overflow-hidden shadow-lg shadow-[#E76F3C]/10">
                <div ref={resumeRef}>
                  <ResumeContent />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => generatePDF(resumeRef.current, 'Kaushal_Kumar_Resume.pdf')}
                className="download-btn flex items-center justify-center gap-2 px-6 py-3 bg-[#E76F3C] hover:bg-[#FF8C42] text-white rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#E76F3C]/40"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#F0B45A] rounded-lg font-bold text-[#F0B45A] hover:bg-[#F0B45A] hover:text-gray-950 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F0B45A]/40"
              >
                <Maximize2 size={20} />
                <span>View Fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Certifications Vault */}
        <div className="max-w-4xl mx-auto mt-12 reveal-on-scroll">
          <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-[#2D323C]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#2D323C] pb-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-orbitron">
                  <svg className="w-6 h-6 text-[#E76F3C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Documents & Certifications Vault
                </h3>
                <p className="text-gray-400 text-sm mt-1">Explore all my verification documents, completion certificates, and career offer letters.</p>
              </div>
            </div>

            {/* Tabs Selector */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-[#2D323C]/50 pb-4">
              {['All', 'Internship Completion', 'Course Completion', 'Offer Letter', 'Recommendation Letter'].map((tab) => {
                const count = tab === 'All' 
                  ? portfolioData.certifications.length 
                  : portfolioData.certifications.filter((c: any) => c.type === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveCertTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-305 ${
                      activeCertTab === tab
                        ? 'bg-gradient-to-r from-[#A64B2A] to-[#E76F3C] text-white shadow-md'
                        : 'bg-[#1A1D24] text-gray-400 hover:text-white border border-[#2D323C]'
                    }`}
                  >
                    {tab === 'All' ? '📁 All' : tab} ({count})
                  </button>
                );
              })}
            </div>

            {/* Grid of Certificates */}
            <div className="grid md:grid-cols-2 gap-4">
              {portfolioData.certifications
                .filter((c: any) => activeCertTab === 'All' || c.type === activeCertTab)
                .map((cert: any, index: number) => (
                  <div 
                    key={index} 
                    className="p-4 bg-[#1A1D24]/80 rounded-lg border border-[#2D323C] hover:border-[#E76F3C]/50 transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#23262F] flex items-center justify-center text-[#E76F3C] group-hover:bg-[#E76F3C] group-hover:text-white transition-colors duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-left max-w-[150px] sm:max-w-[200px] md:max-w-[240px]">
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#E76F3C] transition-colors duration-300 truncate">{cert.name}</h4>
                        <span className="text-[9px] text-[#F0B45A] font-mono uppercase tracking-wider">{cert.type}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="px-3.5 py-1.5 bg-[#23262F] hover:bg-[#E76F3C] text-white text-xs font-bold rounded-md border border-[#2D323C] hover:border-transparent transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1A1D24] border border-[#E76F3C] w-full max-w-5xl h-[85vh] rounded-xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#2D323C] flex justify-between items-center bg-[#0F1115] text-white">
              <div className="text-left">
                <span className="text-[9px] text-[#E76F3C] font-mono tracking-wider uppercase font-semibold">{selectedCert.type}</span>
                <h4 className="text-sm md:text-base font-bold text-white leading-snug">{selectedCert.name}</h4>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 bg-[#23262F] hover:bg-red-600 rounded-lg text-white font-bold transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="flex-1 bg-slate-900 relative">
              <object
                data={selectedCert.file}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-slate-950/90">
                  <p className="mb-4 text-gray-400 text-sm">PDF viewer is not supported directly by your browser or mobile device.</p>
                  <a
                    href={selectedCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#E76F3C] hover:bg-[#FF8C42] text-white rounded-lg font-bold transition-all duration-300"
                  >
                    Open & Download PDF
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-full max-h-[90vh] overflow-auto flex flex-col border border-[#2D323C]">
            <div className="p-4 border-b flex justify-between items-center bg-[#1A1D24] text-white border-[#2D323C]">
              <h3 className="text-lg font-bold font-serif uppercase tracking-wider text-[#E76F3C]">Kaushal Kumar - Resume</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => generatePDF(modalResumeRef.current, 'Kaushal_Kumar_Resume.pdf')}
                  className="download-btn flex items-center gap-2 px-4 py-2 bg-[#E76F3C] hover:bg-[#FF8C42] text-white rounded-lg font-bold transition-all duration-300 hover:scale-105"
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="px-4 py-2 bg-[#1A1D24] border border-[#2D323C] hover:bg-[#23262F] text-white font-bold rounded-lg transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div ref={modalResumeRef}>
                <ResumeContent />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;