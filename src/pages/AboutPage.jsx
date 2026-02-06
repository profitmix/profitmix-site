// src/pages/AboutPage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Globe, Shield, Brain } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Breadcrumbs from '../components/Shared/Breadcrumbs';
import ImageCarousel from '../components/Shared/ImageCarousel';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for founder section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.founder-section',
          start: 'top 60%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from('.founder-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      })
      .from('.founder-quote', {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');

      // Stagger animation for values
      gsap.fromTo('.value-card', {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Sample images for carousel
  const aboutImages = [
  { src: `${process.env.PUBLIC_URL}/assets/images/about/facility.jpeg`, alt: 'Our Facility' },
  { src: `${process.env.PUBLIC_URL}/assets/images/about/control-room.jpeg`, alt: 'Control Room' },
  { src: `${process.env.PUBLIC_URL}/assets/images/about/research-lab.jpeg`, alt: 'Research Lab' },
  { src: `${process.env.PUBLIC_URL}/assets/images/about/production.jpeg`, alt: 'Production Area' },
  { src: `${process.env.PUBLIC_URL}/assets/images/about/team-collab.jpeg`, alt: 'Team Collaboration' },
  { src: `${process.env.PUBLIC_URL}/assets/images/about/quality-check.jpeg`, alt: 'Quality Check' },
];

  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To produce high-quality mealworm protein at industrial scale with scientific rigor and process discipline.',
      color: 'from-gold-500 to-yellow-500',
    },
    {
      icon: Globe,
      title: 'Vision',
      description: 'To become a trusted global supplier of sustainable protein, supporting resource-efficient food systems.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Built on transparency, accountability, and unwavering commitment to quality and safety standards.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Continuous improvement through research, technology, and sustainable practices in protein production.',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div ref={pageRef} className="pt-20">
      <Breadcrumbs currentPage="About Us" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 glitter-bg" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-6">
              <Users className="w-8 h-8 text-gold-400" />
              <h1 className="text-4xl md:text-5xl font-bold gold-gradient">
                Who We Are
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We are an industrial mealworm cultivation and protein manufacturing company, 
              focused on building scalable, future-ready protein infrastructure.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-12" />
          </div>

          {/* Intersection Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {['Biology', 'Engineering', 'Sustainability'].map((item, index) => (
              <div key={item} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-600/20 to-gold-400/10 border border-gold-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-dark-900 font-bold text-xl">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item}</h3>
                <p className="text-gray-400">At the intersection of innovation</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gold-gradient">
              Founder's Vision
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Founder Image & Info */}
              <div className="relative">
                <div className="founder-image relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-gold-500/30 shadow-2xl">
                    {/* Placeholder for founder image */}
                    <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center">
                      {/* <Award className="w-32 h-32 text-gold-500/50" /> */}
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/team/founder/founder.jpeg`}
                        alt="Founder"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center text-dark-900 font-bold text-sm p-4 text-center shadow-2xl">
                    Founder
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <h3 className="text-2xl font-bold text-white mb-2">A . ISRATH AMRIN</h3>
                  <p className="text-gold-400 font-medium">Founder & Proprietor</p>
                  <p className="text-gray-400 mt-4 max-w-md mx-auto">
                    With a focus on sustainable systems, process-driven operations, and long-term scalability.
                  </p>
                </div>
              </div>

              {/* Founder Quote & Perspective */}
              <div className="founder-quote">
                <div className="relative p-8 bg-dark-900/50 rounded-2xl border border-gold-500/20 shadow-xl">
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl">"</span>
                  </div>
                  <p className="text-xl italic text-gray-300 mb-6 leading-relaxed">
                    "The future of protein will not be won by hype. It will be built by those who treat biology with the same discipline as manufacturing."
                  </p>
                  <div className="border-t border-gold-500/30 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-3">The Founder's Perspective</h4>
                    <p className="text-gray-400 mb-4">
                      This philosophy shapes every decision — from facility design and process control to compliance planning and capital allocation.
                    </p>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                        Long-term scalability over short-term output
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                        Infrastructure thinking, not product hype
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                        Manufacturing mindset, not experimentation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Why This Company Exists
            </h2>
            <p className="text-xl text-gray-300">
              A multi-decade protein enterprise built for the future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Resource Efficiency',
                description: 'Create protein systems that are resource-efficient by design',
                icon: '🌱',
              },
              {
                title: 'Climate Independence',
                description: 'Operate independently of climate volatility',
                icon: '🛡️',
              },
              {
                title: 'Sustainable Value',
                description: 'Build long-term value aligned with global sustainability goals',
                icon: '📈',
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="relative p-8 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              What Makes Us Different
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <div className="h-full p-6 bg-dark-900/50 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-12 text-white">
            Inside ProfitMix
          </h3>
          <ImageCarousel images={aboutImages} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
            Ready to Build With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join us in creating the future of sustainable protein production.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold-500/30"
            >
              Get In Touch
            </Link>
            <Link
              to="/process"
              className="px-8 py-4 border-2 border-gold-500 text-gold-300 font-bold text-lg rounded-full hover:bg-gold-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;