// src/components/Home/ComplianceSafety.jsx
import React, { useEffect, useRef } from 'react';
import { Shield, FileCheck, Award, CheckCircle, FileText,CheckSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ComplianceSafety = () => {
  const sectionRef = useRef(null);

  const frameworks = [
    {
      icon: FileCheck,
      title: 'Food Safety Principles',
      description: 'HACCP-based protocols and hygiene standards',
      status: 'Implemented',
    },
    {
      icon: FileText,
      title: 'Regulatory Frameworks',
      description: 'Alignment with national and international standards',
      status: 'Active',
    },
    {
      icon: Award,
      title: 'Export Readiness',
      description: 'Compliance systems for international markets',
      status: 'In Progress',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Framework cards animation
      gsap.fromTo('.framework-card', {
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

      // Safety badge animation
      gsap.fromTo('.safety-badge', {
        scale: 0,
        rotation: 360,
      }, {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.safety-badge',
          start: 'top 80%',
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Compliance & Safety First
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Compliance is not an afterthought — it is built into the system from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {frameworks.map((framework, index) => (
              <div key={index} className="framework-card">
                <div className="h-full bg-dark-800/50 rounded-xl border border-gold-500/20 p-8 text-center hover:border-gold-500/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-600/20 to-gold-800/10 border border-gold-500/30 mx-auto mb-6 flex items-center justify-center">
                    <framework.icon className="w-8 h-8 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{framework.title}</h3>
                  <p className="text-gray-400 mb-4">{framework.description}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gold-500/10 text-gold-400 border border-gold-500/30">
                    {framework.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-dark-800 to-dark-900 rounded-2xl p-8 border border-gold-500/20">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-4">
                Built-in Compliance Systems
              </h3>
              <p className="text-gray-300">
                Our operations are aligned with current and evolving regulatory requirements, 
                ensuring long-term viability and trust.
              </p>
            </div>
            
            <div className="safety-badge flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-600 to-gold-800 flex items-center justify-center shadow-2xl">
                  <CheckSquare className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 border-2 border-gold-500/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSafety;