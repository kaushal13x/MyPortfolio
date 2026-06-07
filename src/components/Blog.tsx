import React from 'react';
import { BookOpen, Calendar, Clock, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import dp from '../dp.jpg';

const Blog: React.FC = () => {
  const blogs = portfolioData.blogs || [];

  const getTagClass = (tag: string, id: number) => {
    switch (tag) {
      case 'DevOps':
        if (id === 2) return 'bg-[#1A1D24] border border-[#E76F3C]/40 text-[#E76F3C]';
        return 'bg-[#1A1D24] border border-[#F0B45A]/40 text-[#F0B45A]';
      case 'My Story':
        return 'bg-[#1A1D24] border border-[#E76F3C]/40 text-[#E76F3C]';
      case 'AWS':
        return 'bg-[#1A1D24] border border-[#A64B2A]/40 text-[#A64B2A]';
      case 'Deep Learning':
        return 'bg-[#1A1D24] border border-[#F0B45A]/40 text-[#F0B45A]';
      default:
        return 'bg-[#1A1D24] border border-[#E76F3C]/40 text-[#E76F3C]';
    }
  };

  return (
    <section id="blog" className="py-24 bg-[#0F1115] relative overflow-hidden">
      {/* Starry Space Background Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F1115] via-[#1A1D24] to-[#0F1115]">
        {/* Subtle glowing cosmic elements */}
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-[#E76F3C]/5 rounded-full blur-[80px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#A64B2A]/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        
        {/* Fine Star dots */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header Block with top-left profile icon */}
        <div className="flex flex-col items-center justify-center text-center mb-16 relative reveal-on-scroll">
          {/* Circular avatar in upper left of header container */}
          <div className="absolute left-0 top-0 hidden md:block">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E76F3C] p-0.5 shadow-[0_0_15px_rgba(231,111,60,0.4)] hover:scale-110 transition-transform duration-300">
              <img src={dp} alt="Kaushal Profile Badge" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white mb-4">
            Knowledge Cosmos
          </h2>
          
          {/* Red Earth -> Orange Accent -> Gold gradient underline matching image */}
          <div className="w-48 h-1.5 bg-gradient-to-r from-[#A64B2A] via-[#E76F3C] to-[#F0B45A] rounded-full mb-6"></div>

          <p className="text-gray-300 md:text-lg max-w-2xl font-light tracking-wide italic">
            Sharing knowledge and experiences from my journey through the tech universe
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => {
            const staggerNum = (index % 3) + 1;
            return (
              <div
                key={blog.id}
                className={`group relative bg-[#23262F]/80 backdrop-blur-md rounded-2xl p-6 border border-[#2D323C] hover:border-[#E76F3C]/40 hover:shadow-[0_0_24px_rgba(231,111,60,0.15)] transition-all duration-300 flex flex-col justify-between hover:scale-[1.03] reveal-on-scroll stagger-${staggerNum}`}
              >
              {/* Outer starry glow on card hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E76F3C]/5 to-[#F0B45A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="relative z-10 flex-1">
                {/* Header tag and icon */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-4 py-1 text-xs font-bold font-mono tracking-wide rounded-full ${getTagClass(blog.tag, blog.id)}`}>
                    {blog.tag}
                  </span>
                  <BookOpen className="text-[#E76F3C]/60 group-hover:text-[#E76F3C] transition-colors duration-300" size={18} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug group-hover:text-[#E76F3C] transition-colors duration-300 font-sans">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                  {blog.summary}
                </p>
              </div>

              {/* Footer details */}
              <div className="relative z-10 border-t border-[#2D323C] pt-4 mt-4">
                <div className="flex justify-between items-center text-xs text-gray-500 font-mono mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#F0B45A]/60" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-[#F0B45A]/60" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Read Link */}
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E76F3C] group-hover:text-[#FF8C42] font-bold text-sm tracking-wide transition-all duration-300 border-b border-transparent hover:border-[#E76F3C]"
                >
                  <span>Read Article</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
