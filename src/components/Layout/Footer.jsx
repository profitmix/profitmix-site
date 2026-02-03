// src/components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Process', path: '/process' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/profitmix', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/profitmix', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/profitmix', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/profitmix', label: 'Facebook' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-gold-500/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 border-2 border-gold-500 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full"></div>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-wider gold-gradient font-playfair">
                  ProfitMix
                </span>
                <span className="text-xs text-gold-300/70 tracking-widest uppercase block">
                  Sustainable Protein
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Powering the future of protein through sustainable innovation and industrial-scale production.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-gold-400 transition-colors duration-300 flex items-center group"
                  >
                    <div className="w-1 h-1 bg-gold-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold-400 mt-1" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:info@profitmix.in" className="text-white hover:text-gold-400 transition-colors">
                    info@profitmix.in
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold-400 mt-1" />
                <div>
                  <p className="text-gray-400">Management</p>
                  <a href="mailto:management@profitmix.in" className="text-white hover:text-gold-400 transition-colors">
                    management@profitmix.in
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-1" />
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white">India</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on sustainable protein innovations.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-semibold rounded-lg hover:from-gold-500 hover:to-gold-600 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ProfitMix. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;