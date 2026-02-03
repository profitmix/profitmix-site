// src/components/Home/WhyMealworm.jsx
import React, { useEffect, useRef } from 'react';
import { Target, Leaf, Zap, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyMealworm = () => {
  const sectionRef = useRef(null);

  const benefits = [
    {
      icon: Target,
      title: 'High Protein Density',
      description: 'Superior protein content per unit weight',
      value: '60-70%',
      color: 'from-gold-500 to-yellow-500',
    },
    {
      icon: Zap,
      title: 'Superior Conversion',
      description: 'Efficient feed-to-protein conversion ratio',
      value: '2.2:1',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Leaf,
      title: 'Minimal Footprint',
      description: 'Reduced water and land requirements',
      value: '90% Less',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Production',
      description: 'Year-round, climate-independent output',
      value: '365 Days',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation for values
      benefits.forEach((benefit, index) => {
        gsap.fromTo(`.benefit-value-${index}`, 
          { innerText: 0 },
          {
            innerText: benefit.value.replace('%', '').replace(':', '').replace(' Days', ''),
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.benefit-${index}`,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              const el = document.querySelector(`.benefit-value-${index}`);
              if (el) {
                const value = Math.floor(this.targets()[0].innerText);
                if (benefit.value.includes('%')) {
                  el.innerText = `${value}%`;
                } else if (benefit.value.includes(':')) {
                  el.innerText = `${value}:1`;
                } else if (benefit.value.includes('Days')) {
                  el.innerText = `${value} Days`;
                } else {
                  el.innerText = value;
                }
              }
            }
          }
        );
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
              Why Mealworm Protein
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mealworm protein is not a novelty — it is a biologically efficient protein platform 
              representing a structural upgrade to how protein is produced.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className={`benefit-${index} relative group`}>
                <div className="h-full bg-dark-900/50 rounded-xl border border-gold-500/20 p-8 text-center hover:border-gold-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${benefit.color} mx-auto mb-6 flex items-center justify-center`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`benefit-value-${index} text-3xl font-bold gold-gradient mb-2`}>
                    {benefit.value}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              It represents a structural upgrade to how protein is produced — efficient, scalable, 
              and sustainable by design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMealworm;