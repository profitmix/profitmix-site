// src/components/Home/WhyAlternativeProtein.jsx
import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Droplet, TreePine, BarChart3 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyAlternativeProtein = () => {
  const sectionRef = useRef(null);

  const challenges = [
    {
      icon: TreePine,
      title: 'Land Availability',
      description: 'Shrinking arable land for traditional agriculture',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Droplet,
      title: 'Water Stress',
      description: 'Intensifying global water scarcity issues',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: AlertTriangle,
      title: 'Environmental Costs',
      description: 'Rising ecological impact of conventional methods',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: BarChart3,
      title: 'Supply Volatility',
      description: 'Increasing instability in protein supply chains',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo('.section-title', {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate cards
      gsap.fromTo('.challenge-card', {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Why the World Needs Alternative Protein
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional protein sources are reaching their natural limits. The future requires efficient, 
              predictable, and scalable solutions independent of climate and land dependency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="challenge-card">
                <div className="h-full p-6 bg-dark-800/50 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${challenge.color} flex items-center justify-center mb-6`}>
                    <challenge.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{challenge.title}</h3>
                  <p className="text-gray-400">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-dark-800 to-dark-900 rounded-2xl p-8 border border-gold-500/20">
            <p className="text-xl text-center text-gray-300 italic">
              "The future of nutrition requires efficient, predictable, and scalable protein solutions that 
              can operate independently of climate and land dependency."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAlternativeProtein;