// src/components/Home/CircularEconomy.jsx
import React, { useEffect, useRef } from 'react';
import { Recycle, ArrowRightCircle, Target, BarChart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CircularEconomy = () => {
  const sectionRef = useRef(null);

  const principles = [
    {
      title: 'Inputs are optimized',
      description: 'Precision resource allocation minimizing waste',
      icon: Target,
    },
    {
      title: 'By-products are repurposed',
      description: 'Every output converted to valuable material',
      icon: Recycle,
    },
    {
      title: 'Waste streams are minimized',
      description: 'Closed-loop systems with near-zero waste',
      icon: BarChart,
    },
    {
      title: 'Environmental impact is reduced',
      description: 'Sustainable operations with minimal footprint',
      icon: ArrowRightCircle,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circular animation
      gsap.fromTo('.circular-ring', {
        scale: 0,
        rotation: 0,
      }, {
        scale: 1,
        rotation: 360,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Principles animation
      gsap.fromTo('.principle-item', {
        x: -50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.principles-grid',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-dark-800/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Circular Economy at Our Core
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our model is built around maximum resource utilization and minimal waste — 
              protein production with accountability.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            {/* Circular Diagram */}
            <div className="relative flex-shrink-0">
              <div className="relative w-64 h-64">
                {/* Outer Ring */}
                <div className="circular-ring absolute inset-0 rounded-full border-4 border-green-500/30"></div>
                {/* Middle Ring */}
                <div className="circular-ring absolute inset-8 rounded-full border-3 border-emerald-500/40" style={{ animationDelay: '0.2s' }}></div>
                {/* Inner Ring */}
                <div className="circular-ring absolute inset-16 rounded-full border-2 border-gold-500/50" style={{ animationDelay: '0.4s' }}></div>
                {/* Center */}
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center">
                  <Recycle className="w-12 h-12 text-white animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Principles */}
            <div className="principles-grid flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {principles.map((principle, index) => (
                  <div key={index} className="principle-item">
                    <div className="bg-dark-900/50 rounded-xl p-6 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                          <principle.icon className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{principle.title}</h3>
                          <p className="text-gray-400">{principle.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-500/20">
            <p className="text-xl text-center text-gray-300 italic">
              "This is protein production with accountability — where every resource is valued, 
              every output is utilized, and every impact is considered."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularEconomy;