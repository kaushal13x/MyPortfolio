import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const About: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logSequence = [
    "Initializing deployment agent...",
    "Connecting to AWS cluster (us-east-1)... CONNECTED",
    "Pulling Docker Hub registry images...",
    "Running vulnerability scans... 0 warnings.",
    "Containerizing app services with Docker...",
    "Provisioning VPC infrastructure with Terraform...",
    "Deploying static assets to AWS S3 & CloudFront...",
    "Setting up Kubernetes configuration mappings...",
    "Deploying services to K8s container registry...",
    "Applying nginx ingress routing configurations...",
    "Verifying cloud cluster health... healthy.",
    "Pipeline completed. 100% service uptime.",
    "--------------------------------------------------",
    "SYSTEM STATUS: ACTIVE & ONLINE",
    "RESTARTING LIVE INTERACTIVE DEMO..."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const logsArray: string[] = [];

    const interval = setInterval(() => {
      if (currentLogIndex < logSequence.length) {
        logsArray.push(logSequence[currentLogIndex]);
        setLogs([...logsArray]);
        currentLogIndex++;
      } else {
        logsArray.length = 0;
        setLogs([]);
        currentLogIndex = 0;
      }
    }, 1800);

    logsArray.push(logSequence[0]);
    setLogs([...logsArray]);
    currentLogIndex = 1;

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-[#0F1115] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A64B2A]/10 to-[#F0B45A]/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Bio Section */}
          <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-6 border border-[#2D323C] flex flex-col justify-between reveal-on-scroll stagger-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="text-[#E76F3C]" size={20} />
                <h3 className="text-xl font-semibold text-white">Bio</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-justify">
                {portfolioData.about.bio}
              </p>
            </div>
            <div className="mt-6 border-t border-[#2D323C] pt-4 flex justify-between text-xs text-gray-500 font-mono">
              <span>DevOps Enthusiast</span>
              <span>Cloud Architect</span>
            </div>
          </div>

          {/* Simulated DevOps Console */}
          <div className="bg-[#101216] border border-[#E76F3C]/40 rounded-lg p-5 font-mono text-[11px] text-green-400 shadow-[0_0_15px_rgba(231,111,60,0.1)] h-80 lg:h-auto flex flex-col justify-between overflow-hidden relative reveal-on-scroll stagger-2">
            {/* Console Header */}
            <div className="flex justify-between items-center border-b border-[#2D323C] pb-2 mb-3 text-gray-500 select-none">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[9px] tracking-wider uppercase text-gray-400 font-bold">DevOps-CI-CD-Pipeline</span>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-none pr-1 select-none">
              {logs.map((log, index) => {
                let colorClass = "text-green-450";
                if (log.includes("CONNECTED") || log.includes("ONLINE")) colorClass = "text-emerald-400 font-semibold";
                if (log.includes("warnings") || log.includes("SYSTEM")) colorClass = "text-amber-400";
                if (log.includes("Initializing") || log.includes("RESTARTING")) colorClass = "text-[#E76F3C] font-semibold";
                if (log.startsWith("-")) colorClass = "text-gray-600";
                
                return (
                  <div key={index} className={`${colorClass} flex items-start gap-1`}>
                    <span className="text-[#E76F3C]/60 select-none">➜</span>
                    <span className={index === logs.length - 1 ? "terminal-cursor" : ""}>{log}</span>
                  </div>
                );
              })}
            </div>
            
            {/* CRT overlay scan lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,6px_100%] pointer-events-none opacity-50"></div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Education */}
          <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-6 border border-[#2D323C] reveal-on-scroll stagger-1">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="text-[#E76F3C]" size={20} />
              <h3 className="text-xl font-semibold text-white">Education</h3>
            </div>
            {portfolioData.about.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-[#E76F3C] pl-4 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-[#E76F3C] rounded-full -ml-6"></div>
                  <span className="text-[#F0B45A] font-mono text-sm">{edu.year}</span>
                </div>
                <h4 className="text-white font-semibold">{edu.degree}</h4>
                <p className="text-gray-300">{edu.field}</p>
                <p className="text-gray-400 text-sm">{edu.institution}</p>
                {edu.board && <p className="text-gray-500 text-xs mt-1 font-mono">{edu.board}</p>}
                {edu.cgpa && <p className="text-[#F0B45A] text-sm font-mono mt-1">CGPA: ~{edu.cgpa}</p>}
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-6 border border-[#2D323C] reveal-on-scroll stagger-2">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="text-[#E76F3C]" size={20} />
              <h3 className="text-xl font-semibold text-white">Experience</h3>
            </div>
            {portfolioData.about.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-[#E76F3C] pl-4 pb-4 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-[#E76F3C] rounded-full -ml-6"></div>
                  <span className="text-[#F0B45A] font-mono text-sm">{exp.duration}</span>
                </div>
                <h4 className="text-white font-semibold">{exp.role}</h4>
                <p className="text-[#E76F3C] mb-2">{exp.company}</p>
                <p className="text-gray-300 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;