// src/components/Layout/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      // subItems: [
      //   { name: 'Our Story', path: '/about#story' },
      //   { name: 'Leadership', path: '/about#leadership' },
      //   { name: 'Values', path: '/about#values' },
      // ]
    },
    { name: 'Our Process', path: '/process' },
    { name: 'Sustainability', path: '/sustainability' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-1">
        {navItems.map((item) => (
          <div key={item.name} className="relative group">
            <Link
              to={item.path}
              className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                location.pathname === item.path
                  ? 'text-gold-400'
                  : 'text-gray-300 hover:text-gold-300'
              }`}
            >
              {item.name}
              {item.subItems && <ChevronDown className="inline w-4 h-4 ml-1" />}
            </Link>
            
            {/* Hover underline */}
            <div
              className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300 ${
                location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
            
            {/* Dropdown for sub-items */}
            {item.subItems && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-dark-900/95 backdrop-blur-md border border-gold-500/20 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.path}
                    className="block px-4 py-3 text-sm text-gray-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* CTA Button */}
        <div className="ml-4">
          <Link
            to="/contact"
            className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-semibold rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Partner With Us
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-gold-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-dark-900/95 backdrop-blur-lg border-l border-gold-500/20 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gold-500/20">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold gold-gradient">
                ProfitMix
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gold-500/10 rounded-lg"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gold-500/20 text-gold-400'
                        : 'text-gray-300 hover:bg-gold-500/10 hover:text-gold-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.subItems && <ChevronDown className="w-4 h-4" />}
                    </div>
                  </Link>
                  
                  {/* Mobile Sub-items */}
                  {item.subItems && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-gold-300 rounded-lg hover:bg-gold-500/5"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 pt-8 border-t border-gold-500/20">
              <Link
                to="/contact"
                className="block w-full px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-semibold rounded-lg text-center hover:from-gold-500 hover:to-gold-600 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gold-500/20">
            <p className="text-sm text-gray-400 text-center">
              Sustainable Protein Solutions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;