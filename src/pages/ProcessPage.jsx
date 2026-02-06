// src/pages/ProcessPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Factory, TestTube2, Package, Shield, Thermometer, Droplets, Users, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Breadcrumbs from '../components/Shared/Breadcrumbs';
import ImageCarousel from '../components/Shared/ImageCarousel';

gsap.registerPlugin(ScrollTrigger);

const ProcessPage = () => {
  const pageRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      id: 1,
      title: 'Feed Preparation',
      description: 'Optimized nutrient formulation for optimal mealworm growth and protein content.',
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Carefully selected raw materials',
        'Nutritionally balanced formulation',
        'Quality checked inputs',
        'Sterilized feed preparation'
      ]
    },
    {
      id: 2,
      title: 'Controlled Cultivation',
      description: 'Climate-controlled environments ensuring predictable growth and uniform quality.',
      icon: Thermometer,
      color: 'from-green-500 to-emerald-500',
      details: [
        'Temperature & humidity control',
        '24/7 monitoring systems',
        'Optimal growth conditions',
        'Biosecurity protocols'
      ]
    },
    {
      id: 3,
      title: 'Safe Harvesting',
      description: 'Automated harvesting following defined hygiene and safety protocols.',
      icon: Users,
      color: 'from-yellow-500 to-amber-500',
      details: [
        'Automated separation',
        'Minimal stress handling',
        'Hygiene-first approach',
        'Efficiency optimization'
      ]
    },
    {
      id: 4,
      title: 'Processing',
      description: 'Gentle processing methods to preserve nutritional integrity.',
      icon: Factory,
      color: 'from-orange-500 to-red-500',
      details: [
        'Gentle heat treatment',
        'Moisture control',
        'Nutrient preservation',
        'Consistency maintenance'
      ]
    },
    {
      id: 5,
      title: 'Drying & Powdering',
      description: 'Precision drying and milling to achieve optimal particle size and solubility.',
      icon: Droplets,
      color: 'from-purple-500 to-pink-500',
      details: [
        'Low-temperature drying',
        'Precision milling',
        'Particle size optimization',
        'Moisture standardization'
      ]
    },
    {
      id: 6,
      title: 'Quality Control',
      description: 'Comprehensive testing ensuring safety, purity, and nutritional consistency.',
      icon: TestTube2,
      color: 'from-gold-500 to-yellow-500',
      details: [
        'Microbiological testing',
        'Nutritional analysis',
        'Heavy metal screening',
        'Allergen testing'
      ]
    },
    {
      id: 7,
      title: 'Packaging',
      description: 'Aseptic packaging in food-grade materials for extended shelf life.',
      icon: Package,
      color: 'from-indigo-500 to-blue-500',
      details: [
        'Food-grade packaging',
        'Aseptic filling',
        'Oxygen barrier protection',
        'Traceability coding'
      ]
    },
    {
      id: 8,
      title: 'Storage & Dispatch',
      description: 'Climate-controlled storage and logistics for product integrity.',
      icon: Zap,
      color: 'from-teal-500 to-green-500',
      details: [
        'Temperature monitoring',
        'Inventory management',
        'Cold chain logistics',
        'Documentation ready'
      ]
    }
  ];

  const productApplications = [
    {
      category: 'Food Manufacturing',
      uses: ['Protein bars', 'Bakery products', 'Meat analogs', 'Nutritional supplements']
    },
    {
      category: 'Animal & Aqua Feed',
      uses: ['Poultry feed', 'Aquaculture feed', 'Pet food', 'Livestock supplements']
    },
    {
      category: 'Research & Development',
      uses: ['Novel food research', 'Nutrition studies', 'Formulation development', 'Sustainability research']
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Process steps animation
      gsap.fromTo('.process-step', {
        x: -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Timeline for process visualization
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.process-visualization',
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      tl.to('.process-line', {
        scaleY: 1,
        duration: 2,
        ease: 'power2.inOut',
      });

      // Animate quality metrics
      gsap.fromTo('.metric-item', {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.metrics-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20">
      <Breadcrumbs currentPage="Our Process" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 glitter-bg" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold gold-gradient">
                Farm Meets Function<br></br>Nature Meets Tech
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our fully controlled, industrial production system integrates biology with manufacturing discipline for consistency, safety, and scale.
            </p>
          </div>
        </div>
      </section>

      {/* Process Visualization */}
      <section className="process-visualization py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
            Our Manufacturing Process
          </h2>

          {/* Process Line */}
          <div className="relative max-w-6xl mx-auto">
            {/* Horizontal Line */}
            <div className="process-line absolute left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 top-1/2 transform -translate-y-1/2 origin-left scale-y-0" />

            {/* Steps */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {processSteps.slice(0, 8).map((step, index) => (
                <div key={step.id} className="process-step">
                  <div 
                    className={`relative cursor-pointer group ${index % 2 === 0 ? 'md:mb-20' : 'md:mt-20'}`}
                    onMouseEnter={() => setActiveStep(step.id - 1)}
                    onClick={() => setActiveStep(step.id - 1)}
                  >
                    {/* Step Circle */}
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark-900 border-2 border-gold-500 rounded-full flex items-center justify-center text-gold-400 font-bold text-sm">
                      {step.id}
                    </div>
                    
                    {/* Step Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>

                    {/* Active Indicator */}
                    {activeStep === step.id - 1 && (
                      <div className="absolute inset-0 border-2 border-gold-500 rounded-xl animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Active Step Details */}
      <section className="py-16 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-800/50 rounded-2xl p-8 border border-gold-500/20 shadow-xl">
              <div className="flex items-center mb-6">
                {/* <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${processSteps[activeStep]?.color} flex items-center justify-center mr-4`}>
                  {processSteps[activeStep]?.icon && (
                    <processSteps[activeStep].icon className="w-6 h-6 text-white" />
                  )}
                </div> */}
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {processSteps[activeStep]?.title}
                  </h3>
                  <p className="text-gold-400">Step {activeStep + 1} of {processSteps.length}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 text-lg">
                {processSteps[activeStep]?.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processSteps[activeStep]?.details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-dark-900/50 rounded-lg">
                    <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                    <span className="text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="metrics-section py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Quality Control & Monitoring
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { label: 'Process Consistency', value: '99.8%' },
                { label: 'Safety Compliance', value: '100%' },
                { label: 'Nutritional Consistency', value: '98.5%' },
              ].map((metric, index) => (
                <div key={index} className="metric-item">
                  <div className="bg-dark-900/50 rounded-xl p-8 border border-gold-500/20 text-center hover:border-gold-500/40 transition-all duration-300">
                    <div className="text-4xl md:text-5xl font-bold gold-gradient mb-4">
                      {metric.value}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{metric.label}</h3>
                    <p className="text-gray-400 mt-2">Guaranteed in every batch</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-dark-900/50 rounded-2xl p-8 border border-gold-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Our Quality Commitment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gold-400 mb-4">Batch-Level Monitoring</h4>
                  <ul className="space-y-3">
                    {['Real-time process tracking', 'Automated quality gates', 'Digital record keeping', 'Traceability systems'].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <Shield className="w-5 h-5 text-gold-500 mr-3" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gold-400 mb-4">Compliance Readiness</h4>
                  <ul className="space-y-3">
                    {['Documentation-ready systems', 'Audit preparation', 'Regulatory alignment', 'Export compliance'].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <Shield className="w-5 h-5 text-gold-500 mr-3" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Applications */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Final Product Applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productApplications.map((app, index) => (
                <div key={index} className="bg-dark-800/50 rounded-xl p-8 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                  <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-gold-500/30">
                    {app.category}
                  </h3>
                  <ul className="space-y-4">
                    {app.uses.map((use, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                        <span className="text-gray-300">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Gallery */}
      {/* <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-12 text-white">
            Process Visualization
          </h3>
          <ImageCarousel 
            images={[
              { src: `${process.env.PUBLIC_URL}/assets/images/process-1.jpg`, alt: 'Feed Preparation' },
              { src: `${process.env.PUBLIC_URL}/assets/images/process-2.jpg`, alt: 'Cultivation' },
              { src: `${process.env.PUBLIC_URL}/assets/images/process-3.jpg`, alt: 'Processing' },
              { src: `${process.env.PUBLIC_URL}/assets/images/process-4.jpg`, alt: 'Quality Control' },
            ]} 
          />
        </div>
      </section> */}
      {/* Process Gallery */}
<section className="py-16">
  <div className="container mx-auto px-6">
    <h3 className="text-2xl font-bold text-center mb-12 text-white">
      Process Visualization
    </h3>
    <ImageCarousel 
      images={[
        { src: `${process.env.PUBLIC_URL}/assets/images/process/feed.jpeg`, alt: 'Feed Preparation' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/cultivation.jpeg`, alt: 'Controlled Cultivation' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/harvest.jpeg`, alt: 'Automated Harvesting' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/processing.jpeg`, alt: 'Processing' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/drying.jpeg`, alt: 'Drying Technology' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/powdering.jpeg`, alt: 'Powdering Process' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/quality-testing.jpeg`, alt: 'Quality Testing' },
        { src: `${process.env.PUBLIC_URL}/assets/images/process/packaging.jpeg`, alt: 'Final Packaging' },
      ]} 
    />
  </div>
  </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
            Interested in Our Process Details?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Contact us for technical specifications, certifications, and partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:info@profitmix.in"
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold-500/30"
            >
              Request Technical Data
            </a>
            <a
              href="mailto:management@profitmix.in"
              className="px-8 py-4 border-2 border-gold-500 text-gold-300 font-bold text-lg rounded-full hover:bg-gold-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Facility Tour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;