// src/components/Home/CallToAction.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo('.cta-title', {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.fromTo('.cta-subtitle', {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Button animations
      gsap.fromTo('.cta-button', {
        scale: 0.8,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.6,
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Target className="w-8 h-8 text-gold-400" />
            <span className="text-gold-400 text-sm uppercase tracking-widest">Long-term Vision</span>
          </div>
          
          <h2 className="cta-title text-3xl md:text-5xl font-bold mb-6">
            <span className="gold-gradient">This is not a short-term venture.</span>
            <br />
            <span className="text-white">This is long-life protein infrastructure.</span>
          </h2>
          
          <p className="cta-subtitle text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join us in building sustainable protein systems that will nourish generations to come.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/contact"
              className="cta-button group px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold-500/30 flex items-center space-x-3"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <a
              href="mailto:management@profitmix.in?subject=Investor Overview Request"
              className="cta-button group px-8 py-4 border-2 border-gold-500 text-gold-300 font-bold text-lg rounded-full hover:bg-gold-500/10 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
            >
              <Users className="w-5 h-5" />
              <span>Request Investor Overview</span>
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: 'Strategic Partnerships',
                value: '50+',
                description: 'Global collaborations'
              },
              {
                label: 'Production Capacity',
                value: 'Industrial',
                description: 'Scalable infrastructure'
              },
              {
                label: 'Sustainability Goals',
                value: '2030',
                description: 'Carbon neutral target'
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gold-gradient mb-2">{stat.value}</div>
                <h4 className="text-lg font-semibold text-white mb-1">{stat.label}</h4>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;