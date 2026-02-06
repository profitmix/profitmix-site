// src/pages/SustainabilityPage.jsx
import React, { useEffect, useRef } from 'react';
import { Leaf, Recycle, Droplets, Trees, Cloud, Zap, Target, BarChart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Breadcrumbs from '../components/Shared/Breadcrumbs';

gsap.registerPlugin(ScrollTrigger);

const SustainabilityPage = () => {
  const pageRef = useRef(null);

  const metrics = [
    { icon: Droplets, label: 'Water Savings', value: '90%', description: 'Reduced water usage vs traditional protein' },
    { icon: Trees, label: 'Land Efficiency', value: '95%', description: 'Less land required per kg protein' },
    { icon: Cloud, label: 'Carbon Footprint', value: '80%', description: 'Lower greenhouse gas emissions' },
    { icon: Zap, label: 'Feed Conversion', value: '2.2:1', description: 'Superior feed-to-protein ratio' },
  ];

  const circularEconomySteps = [
    {
      title: 'Optimized Inputs',
      description: 'Precision nutrient formulation minimizing resource waste',
      icon: '♻️'
    },
    {
      title: 'Maximized Outputs',
      description: 'Every resource converted to valuable protein product',
      icon: '⚡'
    },
    {
      title: 'By-product Utilization',
      description: 'Residual materials repurposed for agriculture',
      icon: '🌱'
    },
    {
      title: 'Waste Minimization',
      description: 'Closed-loop systems with near-zero waste',
      icon: '📉'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Metrics counter animation
      metrics.forEach((metric, index) => {
        gsap.fromTo(`.metric-value-${index}`, 
          { innerText: 0 },
          {
            innerText: metric.value.replace('%', '').replace(':', ''),
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.metric-${index}`,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              const el = document.querySelector(`.metric-value-${index}`);
              if (el) {
                const value = Math.floor(this.targets()[0].innerText);
                el.innerText = metric.value.includes('%') ? `${value}%` : 
                              metric.value.includes(':') ? `${value}:1` : value;
              }
            }
          }
        );
      });

      // Circular economy animation
      gsap.fromTo('.circular-step', {
        scale: 0.8,
        opacity: 0,
        rotation: -180,
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.circular-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Timeline for hero section
      const tl = gsap.timeline();
      tl.from('.sustainability-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .from('.sustainability-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.leaf-icon', {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: 'back.out(1.7)',
      }, '-=0.3');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20">
      <Breadcrumbs currentPage="Sustainability" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-dark-800 to-emerald-900/20" />
        <div className="absolute inset-0 glitter-bg" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="leaf-icon inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-8">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="sustainability-title text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Sustainability Is Not an Initiative
              </span>
              <br />
              <span className="text-white">It Is the System</span>
            </h1>
            
            <p className="sustainability-subtitle text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Our entire cultivation and manufacturing model is engineered to operate within environmental limits, while delivering industrial-scale output.
            </p>
            
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto" />
          </div>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Environmental Benefits by Design
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Traditional vs. Our System
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      label: 'Water Consumption',
                      traditional: 'High',
                      ours: 'Minimal',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      label: 'Land Footprint',
                      traditional: 'Extensive',
                      ours: 'Compact',
                      color: 'from-green-500 to-emerald-500'
                    },
                    {
                      label: 'Climate Dependency',
                      traditional: 'High',
                      ours: 'Independent',
                      color: 'from-yellow-500 to-amber-500'
                    },
                    {
                      label: 'Resource Efficiency',
                      traditional: 'Low',
                      ours: 'High',
                      color: 'from-purple-500 to-pink-500'
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-dark-800/50 rounded-xl p-6 border border-gold-500/20">
                      <h4 className="text-lg font-semibold text-white mb-4">{item.label}</h4>
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className={`w-24 h-2 bg-gradient-to-r ${item.color} rounded-full opacity-50`} />
                          <p className="text-gray-400 text-sm mt-2">Traditional</p>
                          <p className="text-gray-300 font-semibold">{item.traditional}</p>
                        </div>
                        <div className="text-gold-400">
                          →
                        </div>
                        <div className="text-center">
                          <div className={`w-24 h-2 bg-gradient-to-r ${item.color} rounded-full`} />
                          <p className="text-gray-400 text-sm mt-2">Our System</p>
                          <p className="text-green-400 font-semibold">{item.ours}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/30 flex items-center justify-center">
                    <Recycle className="w-32 h-32 text-green-400 animate-spin-slow" />
                  </div>
                  <div className="absolute -inset-4 border border-green-500/20 rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-300 mt-8 max-w-md mx-auto">
                  This allows us to produce protein without amplifying ecological pressure, creating a truly sustainable protein source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
            Quantifiable Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <div key={index} className={`metric-${index} relative group`}>
                <div className="bg-dark-900/50 rounded-xl p-8 border border-gold-500/20 text-center hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mx-auto mb-6 flex items-center justify-center">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`metric-value-${index} text-4xl font-bold gold-gradient mb-2`}>
                    {metric.value}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{metric.label}</h3>
                  <p className="text-gray-400 text-sm">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Circular Economy */}
      <section className="circular-section py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Circular Economy at Our Core
            </h2>
            
            <div className="relative mb-16">
              {/* Circular Diagram */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* Outer Circle */}
                <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-spin-slow"></div>
                
                {/* Inner Circles */}
                <div className="absolute inset-12 rounded-full border-2 border-emerald-500/50 animate-spin-slow-reverse"></div>
                <div className="absolute inset-24 rounded-full border border-gold-500/30 animate-pulse"></div>
                
                {/* Center */}
                <div className="absolute inset-32 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center">
                  <Recycle className="w-12 h-12 text-white" />
                </div>
                
                {/* Steps around circle */}
                {circularEconomySteps.map((step, index) => {
                  const angle = (index * 90) * (Math.PI / 180);
                  const radius = 140;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  
                  return (
                    <div
                      key={index}
                      className="circular-step absolute"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-gold-500/30 flex flex-col items-center justify-center p-4 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl mb-1">{step.icon}</span>
                        <span className="text-xs text-gray-300 text-center">{step.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {circularEconomySteps.map((step, index) => (
                <div key={index} className="bg-dark-800/50 rounded-xl p-6 border border-gold-500/20">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{step.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border border-green-500/20">
              <p className="text-xl text-center text-gray-300 italic">
                "This circular approach ensures that every resource contributes to value creation, not disposal. 
                Sustainability is embedded in our operational logic, not added later."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Long-term Goals */}
      <section className="py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Our Sustainability Roadmap
            </h2>
            
            <div className="relative">
              {/* Timeline */}
              <div className="relative h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-16"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    year: '2024',
                    title: 'Carbon Neutral Operations',
                    goals: ['100% renewable energy', 'Zero waste to landfill', 'Water recycling systems']
                  },
                  {
                    year: '2025',
                    title: 'Regenerative Supply Chain',
                    goals: ['Sustainable feed sourcing', 'Community partnerships', 'Biodiversity enhancement']
                  },
                  {
                    year: '2026',
                    title: 'Industry Leadership',
                    goals: ['Sustainability certifications', 'Transparency reporting', 'Ecosystem development']
                  }
                ].map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600"></div>
                    </div>
                    <div className="bg-dark-900/50 rounded-xl p-8 border border-gold-500/20 mt-8">
                      <div className="text-2xl font-bold gold-gradient mb-4">{phase.year}</div>
                      <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                      <ul className="space-y-3">
                        {phase.goals.map((goal, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <Target className="w-4 h-4 text-green-400 mr-3" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 via-dark-800 to-emerald-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
            Partner in Sustainable Innovation
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join us in building a sustainable protein future. Together, we can create meaningful environmental impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:info@profitmix.in?subject=Sustainability Partnership"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold text-lg rounded-full hover:from-green-500 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/30"
            >
              Explore Sustainable Partnerships
            </a>
            <a
              href="/certifications"
              className="px-8 py-4 border-2 border-green-500 text-green-300 font-bold text-lg rounded-full hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105"
            >
              View Our Certifications
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SustainabilityPage;