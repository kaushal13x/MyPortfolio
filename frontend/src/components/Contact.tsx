import React, { useState, useEffect } from 'react';
import { Mail, Send, Linkedin, Github, Instagram, Twitter, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Contact: React.FC = () => {
  const { data: portfolioData } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent('Hi Kaushal,\n\nI would like to discuss...');
    window.open(`mailto:${portfolioData.contact.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi Kaushal Kumar, I would like to discuss...');
    window.open(`https://wa.me/916200629005?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+91916200629005', '_blank');
  };

  const handleSMSClick = () => {
    const message = encodeURIComponent('Hi Kaushal Kumar, I would like to discuss...');
    window.open(`sms:+91916200629005?body=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#0F1115] relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A64B2A]/10 to-[#F0B45A]/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E76F3C] to-[#F0B45A] mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's build something amazing together!
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Form */}
          <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-[#2D323C]">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Mail className="text-[#E76F3C]" size={24} />
              Send Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1A1D24] border border-[#2D323C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E76F3C] focus:ring-2 focus:ring-[#E76F3C]/20 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1A1D24] border border-[#2D323C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E76F3C] focus:ring-2 focus:ring-[#E76F3C]/20 transition-all duration-300"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1A1D24] border border-[#2D323C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E76F3C] focus:ring-2 focus:ring-[#E76F3C]/20 transition-all duration-300"
                  placeholder="Subject"
                />
              </div>
              
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1A1D24] border border-[#2D323C] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#E76F3C] focus:ring-2 focus:ring-[#E76F3C]/20 transition-all duration-300 resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E76F3C] hover:bg-[#FF8C42] text-white rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#E76F3C]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-center text-sm font-semibold">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-center text-sm font-semibold">
                    ❌ Failed to send message. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Social Links */}
            <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-[#2D323C]">
              <h3 className="text-2xl font-semibold text-white mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-[#1A1D24] hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <Linkedin className="text-blue-400" size={20} />
                  <span className="text-white font-medium text-sm sm:text-base">LinkedIn</span>
                </a>
                
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-[#1A1D24] hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30"
                >
                  <Github className="text-gray-400" size={20} />
                  <span className="text-white font-medium text-sm sm:text-base">GitHub</span>
                </a>
                
                <a
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-[#1A1D24] hover:bg-red-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
                >
                  <Mail className="text-red-400" size={20} />
                  <span className="text-white font-medium text-sm sm:text-base">Email</span>
                </a>
                
                <a
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-[#1A1D24] hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30 cursor-pointer"
                >
                  <MessageSquare className="text-green-400" size={20} />
                  <span className="text-white font-medium text-sm sm:text-base">WhatsApp</span>
                </a>
                
                <a
                  href={portfolioData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-[#1A1D24] hover:bg-pink-650 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
                >
                  <Instagram className="text-pink-400" size={20} />
                  <span className="text-white font-medium text-sm sm:text-base">Instagram</span>
                </a>
                
                <a
                  href={portfolioData.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 sm:p-4 bg-[#1A1D24] hover:bg-blue-400 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/30"
                >
                  <Twitter className="text-blue-400" size={20} />
                  <span className="text-white font-medium text-sm sm:text-base">Twitter</span>
                </a>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-[#23262F]/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-[#2D323C]">
              <h3 className="text-2xl font-semibold text-white mb-6">Direct Contact</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={handleCallClick}
                  className="w-full flex items-center justify-center gap-3 p-3.5 bg-[#1A1D24] hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer text-white"
                >
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-semibold text-sm">Call (+91 91620 06290)</span>
                </button>
                
                <button
                  onClick={handleSMSClick}
                  className="w-full flex items-center justify-center gap-3 p-3.5 bg-[#1A1D24] hover:bg-yellow-600 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/30 cursor-pointer text-white"
                >
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="font-semibold text-sm">Send SMS</span>
                </button>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-3 p-3.5 bg-[#1A1D24] hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 cursor-pointer text-white"
                >
                  <MessageSquare className="text-green-400" size={18} />
                  <span className="font-semibold text-sm">Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-r from-[#A64B2A]/10 to-[#E76F3C]/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-[#E76F3C]/35">
              <h3 className="text-xl font-semibold text-white mb-3">Quick Response</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                I typically respond to emails within 24 hours. For urgent matters, 
                feel free to reach out via LinkedIn or Discord.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-450 font-semibold text-sm">Available for new opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;