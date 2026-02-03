// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md py-4 shadow-2xl border-b border-gold-500/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
           <img
            src="/logo.png"
            alt="ProfitMix Logo"
            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
            {/* <div className="relative">
              <div className="w-12 h-12 border-2 border-gold-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -inset-1 border border-gold-300/30 rounded-full animate-spin-slow"></div>
            </div> */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider gold-gradient font-playfair">
                ProfitMix
              </span>
              <span className="text-xs text-gold-300/70 tracking-widest uppercase">
                Next Generation Protein
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <Navigation />

          {/* Desktop CTA - Hidden on mobile */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-semibold rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold-500/20"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;