import React, { useState, useEffect } from 'react';
import { Mail, Send, Linkedin, Github, Instagram, MessageCircle, Twitter, MessageSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Contact: React.FC = () => {
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
      // Using Formspree for email sending
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
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
        // Reset form
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
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's build something amazing together!
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Mail className="text-cyan-400" size={24} />
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
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
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
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
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <p className="text-green-400 text-center">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-center">
                    ❌ Failed to send message. Please try again or contact me directly.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Social Links */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={portfolioData.contact.linkedin}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <Linkedin className="text-blue-400" size={24} />
                  <span className="text-white font-medium">LinkedIn</span>
                </a>
                
                <a
                  href={portfolioData.contact.github}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50"
                >
                  <Github className="text-gray-400" size={24} />
                  <span className="text-white font-medium">GitHub</span>
                </a>
                
                <a
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-red-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                >
                  <Mail className="text-red-400" size={24} />
                  <span className="text-white font-medium">Email</span>
                </a>
                
                <a
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer"
                >
                  <MessageSquare className="text-green-400" size={24} />
                  <span className="text-white font-medium">WhatsApp</span>
                </a>
                
                <a
                  href={portfolioData.contact.instagram}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-pink-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50"
                >
                  <Instagram className="text-pink-400" size={24} />
                  <span className="text-white font-medium">Instagram</span>
                </a>
                
                <a
                  href={portfolioData.contact.twitter}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-blue-400 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
                >
                  <Twitter className="text-blue-400" size={24} />
                  <span className="text-white font-medium">Twitter</span>
                </a>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Direct Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCallClick}
                    className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-300">Call</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSMSClick}
                    className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-yellow-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-300">Text Message</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 cursor-pointer"
                  >
                    <MessageSquare className="text-green-400" size={20} />
                    <span className="text-gray-300">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-8 border border-cyan-400/30">
              <h3 className="text-xl font-semibold text-white mb-3">Quick Response</h3>
              <p className="text-gray-300 mb-4">
                I typically respond to emails within 24 hours. For urgent matters, 
                feel free to reach out via LinkedIn or Discord.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Available for new opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;