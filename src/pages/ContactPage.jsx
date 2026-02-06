// src/pages/ContactPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Breadcrumbs from '../components/Shared/Breadcrumbs';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const interests = [
    'Strategic Investment',
    'Supply Partnership',
    'Research Collaboration',
    'Distribution Inquiry',
    'Media Inquiry',
    'Career Opportunity',
    'Other',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact cards animation
      gsap.fromTo('.contact-card', {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.contact-cards',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Form animation
      gsap.fromTo('.contact-form', {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Map animation
      gsap.fromTo('.map-container', {
        x: 100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.map-container',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, replace with actual API call
      // await fetch('https://your-api-endpoint.com/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // });
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        interest: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} className="pt-20">
      <Breadcrumbs currentPage="Contact Us" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 glitter-bg" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-6">
              <Users className="w-8 h-8 text-gold-400" />
              <h1 className="text-4xl md:text-5xl font-bold gold-gradient">
                Let's Build the Future of Protein Together
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We engage with partners who think long-term — manufacturers, investors, researchers, 
              and institutions shaping the next generation of food systems.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="contact-cards py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Mail,
                  title: 'Email Us',
                  details: [
                    { label: 'General Inquiries', value: 'info@profitmix.in' },
                    { label: 'Management', value: 'management@profitmix.in' },
                  ],
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  details: [
                    { label: 'Headquarters', value: 'Chennai,Tamilnadu,India' },
                    { label: 'Operations', value: 'Multiple Facilities' },
                  ],
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  icon: Clock,
                  title: 'Response Time',
                  details: [
                    { label: 'Initial Response', value: 'Within 24 hours' },
                    { label: 'Detailed Follow-up', value: 'Within 48 hours' },
                  ],
                  color: 'from-purple-500 to-pink-500',
                },
              ].map((contact, index) => (
                <div key={index} className="contact-card">
                  <div className="h-full bg-dark-900/50 rounded-xl border border-gold-500/20 p-8 hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center mx-auto mb-6`}>
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-6">{contact.title}</h3>
                    <div className="space-y-4">
                      {contact.details.map((detail, i) => (
                        <div key={i} className="text-center">
                          <p className="text-sm text-gray-400 mb-1">{detail.label}</p>
                          <p className="text-lg text-white font-medium">{detail.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="contact-form">
                <div className="bg-dark-800/50 rounded-2xl p-8 border border-gold-500/20 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
                  <p className="text-gray-400 mb-8">
                    Fill out the form below and our team will get back to you promptly.
                  </p>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-center">
                        Thank you for your message! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-center">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2" htmlFor="name">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-900 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-dark-900 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 text-sm mb-2" htmlFor="company">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-900 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 text-sm mb-2" htmlFor="interest">
                        Area of Interest *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-900 border border-gold-500/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors appearance-none"
                      >
                        <option value="">Select an option</option>
                        {interests.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-8">
                      <label className="block text-gray-400 text-sm mb-2" htmlFor="message">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 bg-dark-900 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors resize-none"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-lg hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Map & Info */}
              <div className="map-container">
                <div className="h-full flex flex-col">
                  {/* Map Placeholder */}
                  <div className="flex-1 bg-dark-800/50 rounded-2xl border border-gold-500/20 overflow-hidden mb-8">
                    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="w-16 h-16 text-gold-500 animate-pulse" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 bg-dark-900/80 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-white text-center">
                          ProfitMix Headquarters • Chennai,Tamilnadu,India
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Partnership Info */}
                  <div className="bg-dark-800/50 rounded-2xl border border-gold-500/20 p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Partner With Us</h3>
                    
                    <div className="space-y-6">
                      {[
                        {
                          icon: Briefcase,
                          title: 'For Investors',
                          description: 'Strategic investment opportunities in sustainable protein infrastructure.',
                        },
                        {
                          icon: Users,
                          title: 'For Partners',
                          description: 'Long-term supply partnerships and collaborative ventures.',
                        },
                        {
                          icon: Send,
                          title: 'For Researchers',
                          description: 'Protein innovation, R&D collaborations, and scientific partnerships.',
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-gold-600/20 to-gold-800/10 border border-gold-500/30 flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-gold-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gold-500/20">
                      <p className="text-gray-300 text-center">
                        We typically respond to partnership inquiries within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
            Start the Conversation
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Whether you're exploring investment, partnership, or collaboration opportunities, 
            we're here to discuss how we can build the future of protein together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:management@profitmix.in"
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold-500/30"
            >
              Email Management Team
            </a>
            <a
              href="mailto:info@profitmix.in"
              className="px-8 py-4 border-2 border-gold-500 text-gold-300 font-bold text-lg rounded-full hover:bg-gold-500/10 transition-all duration-300 transform hover:scale-105"
            >
              General Inquiries
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;