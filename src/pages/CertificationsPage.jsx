// src/pages/CertificationsPage.jsx
import React, { useEffect, useRef } from 'react';
import { Shield, FileCheck, Award, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Breadcrumbs from '../components/Shared/Breadcrumbs';

gsap.registerPlugin(ScrollTrigger);

const CertificationsPage = () => {
  const pageRef = useRef(null);

  const certifications = [
    {
      status: 'completed',
      name: 'MSME Registration',
      issuer: 'Government of India',
      description: 'Registered as Micro, Small & Medium Enterprise',
      icon: FileCheck,
      color: 'from-green-500 to-emerald-600',
      date: '2023'
    },
    {
      status: 'in-progress',
      name: 'FSSAI Central License',
      issuer: 'Food Safety and Standards Authority of India',
      description: 'Food safety compliance for nationwide operations',
      icon: Shield,
      color: 'from-gold-500 to-yellow-600',
      date: 'Q2 2024'
    },
    {
      status: 'planned',
      name: 'HACCP Certification',
      issuer: 'International HACCP Alliance',
      description: 'Hazard Analysis Critical Control Point system',
      icon: Award,
      color: 'from-blue-500 to-cyan-600',
      date: '2024'
    },
    {
      status: 'planned',
      name: 'ISO 22000',
      issuer: 'International Organization for Standardization',
      description: 'Food safety management system certification',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      date: '2024'
    },
    {
      status: 'planned',
      name: 'IEC Registration',
      issuer: 'DGFT, Government of India',
      description: 'Import Export Code for international trade',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      date: '2024'
    }
  ];

  const qualityPrinciples = [
    'Controlled cultivation environments',
    'Defined processing protocols',
    'Batch-level quality monitoring',
    'Documentation-ready systems',
    'Regular internal audits',
    'Continuous improvement culture'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Certification cards animation
      gsap.fromTo('.cert-card', {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.certifications-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Quality principles animation
      gsap.fromTo('.quality-item', {
        x: -50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.quality-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Timeline for hero section
      const tl = gsap.timeline();
      tl.from('.cert-hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .from('.shield-icon', {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: 'back.out(1.7)',
      }, '-=0.5');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            Planned
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={pageRef} className="pt-20">
      <Breadcrumbs currentPage="Certifications & Compliance" />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 glitter-bg" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="shield-icon inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gold-600 to-gold-800 mb-8">
              <Shield className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="cert-hero-title text-4xl md:text-6xl font-bold mb-6">
              <span className="gold-gradient">
                Built with Regulatory Alignment
              </span>
              <br />
              <span className="text-white">from Day One</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              In food and protein manufacturing, compliance is not optional. It is the foundation of trust.
            </p>
            
            <div className="w-32 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto" />
          </div>
        </div>
      </section>

      {/* Regulatory Frameworks */}
      <section className="certifications-section py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Current & Planned Frameworks
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-card">
                  <div className="h-full bg-dark-900/50 rounded-xl border border-gold-500/20 p-6 hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
                        <cert.icon className="w-6 h-6 text-white" />
                      </div>
                      {getStatusBadge(cert.status)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-sm text-gold-400 mb-3">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm mb-4">{cert.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gold-500/20">
                      <span className="text-sm text-gray-500">Target Date</span>
                      <span className="text-gold-400 font-semibold">{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-gold-900/20 to-gold-800/10 rounded-2xl p-8 border border-gold-500/20">
              <p className="text-xl text-center text-gray-300">
                Our processes are designed to scale without regulatory friction, ensuring seamless compliance at every stage of growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="quality-section py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
                Quality & Safety Commitment
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Quality is not inspected at the end. It is engineered into every stage of our system.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Our Commitment Includes:
                </h3>
                <div className="space-y-6">
                  {qualityPrinciples.map((principle, index) => (
                    <div key={index} className="quality-item flex items-center space-x-4 p-4 bg-dark-800/50 rounded-lg border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gold-600/20 to-gold-800/10 border border-gold-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold gold-gradient mb-4">100%</div>
                      <p className="text-xl text-white">Compliance</p>
                      <p className="text-gray-400">In every batch</p>
                    </div>
                  </div>
                  <div className="absolute -inset-4 border border-gold-500/20 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-20 bg-dark-800/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gold-gradient">
              Compliance-First Systems
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Documentation Systems',
                  features: ['Digital record keeping', 'Batch traceability', 'Audit readiness', 'Real-time monitoring'],
                  icon: '📋'
                },
                {
                  title: 'Safety Protocols',
                  features: ['HACCP implementation', 'Sanitation procedures', 'Personal hygiene', 'Equipment safety'],
                  icon: '🛡️'
                },
                {
                  title: 'Export Readiness',
                  features: ['International standards', 'Customs compliance', 'Shipping protocols', 'Documentation sets'],
                  icon: '🌐'
                }
              ].map((system, index) => (
                <div key={index} className="bg-dark-900/50 rounded-xl p-8 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                  <div className="text-4xl mb-6">{system.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-6">{system.title}</h3>
                  <ul className="space-y-3">
                    {system.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-gold-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Confidence */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Built for Partner Confidence
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Our compliance framework ensures that every partnership is built on a foundation of trust, safety, and regulatory excellence.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Regulatory Alignment', value: '100%' },
                { label: 'Audit Success Rate', value: '100%' },
                { label: 'Documentation Accuracy', value: '99.9%' },
                { label: 'Partner Satisfaction', value: '100%' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gold-gradient mb-2">{stat.value}</div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient">
            Request Compliance Documentation
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Interested in reviewing our compliance documentation, certifications, or audit reports?
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:info@profitmix.in?subject=Compliance Documentation Request"
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold-500/30"
            >
              Request Documentation
            </a>
            <a
              href="mailto:management@profitmix.in?subject=Compliance Audit Inquiry"
              className="px-8 py-4 border-2 border-gold-500 text-gold-300 font-bold text-lg rounded-full hover:bg-gold-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Compliance Review
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificationsPage;