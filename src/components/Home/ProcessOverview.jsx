// src/components/Home/ProcessOverview.jsx
import React, { useEffect, useRef } from 'react';
import { Factory, Package, TestTube2, Repeat,ShieldCheck, Maximize2 } from 'lucide-react';
import {  
  Tractor,          // farming/harvest
  Scissors,         // cutting / harvest
  SunMedium,        // drying (closest sun icon)
  Leaf,             // cultivation / plant growth
  TestTubes         // quality control (multiple test tubes)
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessOverview = () => {
  const sectionRef = useRef(null);

  const steps = [
   { name: 'Feed', icon: Package },
  { name: 'Cultivation', icon: Leaf },
  { name: 'Harvest', icon: Tractor },
  { name: 'Processing', icon: Factory },
  { name: 'Drying', icon: SunMedium },
  { name: 'Powdering', icon: Scissors }, 
  { name: 'Quality Control', icon: TestTubes },
  { name: 'Packaging', icon: Package },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for process flow
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate process line
      tl.to('.process-line', {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut',
      });

      // Animate steps
      tl.fromTo('.process-step', {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      }, '-=1.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-dark-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Our Manufacturing Process (Overview)
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We operate a fully controlled, industrial production system, integrating biology 
              with manufacturing discipline for consistency, safety, and scale.
            </p>
          </div>

          {/* Process Flow */}
          <div className="relative">
            {/* Process Line */}
            <div className="process-line absolute left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-gold-600 top-1/2 transform -translate-y-1/2 origin-left scale-x-0" />

            {/* Process Steps */}
            <div className="relative grid grid-cols-4 md:grid-cols-8 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-gold-500/30 mx-auto mb-3 flex items-center justify-center group hover:border-gold-500 hover:scale-110 transition-all duration-300">
                      <step.icon className="w-7 h-7 text-gold-400 group-hover:text-gold-300" />
                    </div>
                    <p className="text-sm font-medium text-gray-300">{step.name}</p>
                    <div className="text-xs text-gold-500 mt-1">{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows between steps */}
            <div className="hidden md:flex justify-between absolute left-8 right-8 top-1/2 transform -translate-y-1/2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-12 h-0.5 bg-gold-500/30"></div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-dark-800/50 rounded-xl border border-gold-500/20">
              <Repeat className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Consistency</h3>
              <p className="text-gray-400">Each step designed for uniform quality output</p>
            </div>
            <div className="text-center p-6 bg-dark-800/50 rounded-xl border border-gold-500/20">
              <ShieldCheck className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Safety</h3>
              <p className="text-gray-400">Built-in protocols at every production stage</p>
            </div>
            <div className="text-center p-6 bg-dark-800/50 rounded-xl border border-gold-500/20">
              <Maximize2 className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Scale</h3>
              <p className="text-gray-400">Industrial capacity with precision control</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;