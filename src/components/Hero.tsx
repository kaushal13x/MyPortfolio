import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Loader2, ArrowDown } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import dp from '../dp.jpg';

const Hero: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToContact = async () => {
    if (isScrolling) return;
    setIsScrolling(true);

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 1000);
    } else {
      setIsScrolling(false);
    }
  };

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F1115] via-[#1A1D24] to-[#0F1115] pt-20">
      {/* Wave & Grid Backgrounds */}
      <div className="hero-wave-bg"></div>

      {/* Floating Vertical Social Bar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5 bg-[#1A1D24]/60 backdrop-blur-md border border-[#2D323C] p-3.5 rounded-full shadow-xl shadow-[#0F1115]/40">
        <a
          href={portfolioData.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#0F1115] hover:bg-[#E76F3C] border border-[#2D323C] flex items-center justify-center text-[#E76F3C] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_rgba(231,111,60,0.4)]"
          title="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href={portfolioData.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#0F1115] hover:bg-[#E76F3C] border border-[#2D323C] flex items-center justify-center text-[#E76F3C] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_rgba(231,111,60,0.4)]"
          title="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={portfolioData.contact.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#0F1115] hover:bg-[#E76F3C] border border-[#2D323C] flex items-center justify-center text-[#E76F3C] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_rgba(231,111,60,0.4)]"
          title="Twitter"
        >
          <Twitter size={18} />
        </a>
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="w-10 h-10 rounded-full bg-[#0F1115] hover:bg-[#E76F3C] border border-[#2D323C] flex items-center justify-center text-[#E76F3C] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_12px_rgba(231,111,60,0.4)]"
          title="Email"
        >
          <Mail size={18} />
        </a>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Texts */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 font-sans leading-none text-white animate-float-slow">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-[#E76F3C] via-[#F0B45A] to-[#FF8C42] bg-clip-text text-transparent">
                Kaushal Kumar
              </span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-6 tracking-wide">
              DevOps and Cloud Computing Enthusiast
            </h2>

            {/* Sub-header list / Taglines */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-mono border-l-2 border-[#E76F3C]/60 pl-4 py-1">
              IBM Certified | Intern @ IBM Skills Network | Ex-Intern @ Linuxworld Informatics | Ex-Intern @ SkillCraft Technology
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToContact}
                disabled={isScrolling}
                className="group relative px-8 py-3.5 bg-[#E76F3C] hover:bg-[#FF8C42] text-white font-extrabold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(231,111,60,0.4)] flex items-center gap-2"
              >
                {isScrolling ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Scrolling...</span>
                  </>
                ) : (
                  <span>Contact Me</span>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Orbiting Circular Profile Image */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-10">
            {/* Center Circular Profile Photo */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full z-20 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden border-8 border-white bg-slate-800 shadow-[0_10px_35px_rgba(15,17,21,0.6)]">
                <img
                  src={dp}
                  alt="Kaushal Kumar Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Orbit Ring 1 (Inner Decorative Ring) */}
              <div className="absolute inset-[-15px] rounded-full border border-[#E76F3C]/20 animate-pulse-slow"></div>

              {/* Orbiting Container for nodes */}
              <div className="absolute inset-[-30px] sm:inset-[-40px] rounded-full z-10 pointer-events-none animate-orbit-cw">
                {/* Sphere Node 1 - Top */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#E76F3C] shadow-[0_0_15px_#E76F3C]"
                ></div>
                {/* Sphere Node 2 - Right */}
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F0B45A] shadow-[0_0_12px_#F0B45A]"
                ></div>
                {/* Sphere Node 3 - Bottom */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#A64B2A] shadow-[0_0_15px_#A64B2A]"
                ></div>
                {/* Sphere Node 4 - Left */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F0B45A] shadow-[0_0_12px_#F0B45A]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Arrow */}
      <div 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-[#E76F3C]/60 hover:text-[#E76F3C] transition-colors duration-300 animate-bounce"
        title="Scroll Down"
      >
        <ArrowDown size={32} />
      </div>
    </section>
  );
};

export default Hero;