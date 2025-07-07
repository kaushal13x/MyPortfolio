import React, { useState } from 'react';
import { Mail, Send, Linkedin, Github, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // You can integrate with actual form submission service here
    alert('Message sent successfully!');
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's build something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
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
                  href={`mailto:${portfolioData.contact.email}`}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-red-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                >
                  <Mail className="text-red-400" size={24} />
                  <span className="text-white font-medium">Email</span>
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
                <a
                  href={portfolioData.contact.discord}
                  className="flex items-center gap-3 p-4 bg-gray-700 hover:bg-indigo-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50"
                >
                  <MessageCircle className="text-indigo-400" size={24} />
                  <span className="text-white font-medium">Discord</span>
                </a>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Direct Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-cyan-400" size={20} />
                  <span className="text-gray-300">{portfolioData.contact.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-purple-400" size={20} />
                  <span className="text-gray-300">{portfolioData.contact.discord}</span>
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