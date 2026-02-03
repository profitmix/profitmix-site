// src/pages/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/Home/HeroSection';
import WhyAlternativeProtein from '../components/Home/WhyAlternativeProtein';
import WhyMealworm from '../components/Home/WhyMealworm';
import ProcessOverview from '../components/Home/ProcessOverview';
import CircularEconomy from '../components/Home/CircularEconomy';
import ComplianceSafety from '../components/Home/ComplianceSafety';
import CallToAction from '../components/Home/CallToAction';
import Breadcrumbs from '../components/Shared/Breadcrumbs';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animations for sections
      gsap.utils.toArray('.section-animate').forEach((section, i) => {
        gsap.fromTo(section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });

      // Floating elements animation
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20">
      <Breadcrumbs currentPage="Home" />
      <HeroSection />
      <WhyAlternativeProtein />
      <WhyMealworm />
      <ProcessOverview />
      <CircularEconomy />
      <ComplianceSafety />
      <CallToAction />
    </div>
  );
};

export default HomePage;