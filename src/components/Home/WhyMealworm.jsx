// src/components/Home/WhyMealworm.jsx - UPDATED WITH VIDEO BACKGROUND
import React, { useEffect, useRef, useState } from 'react';
import { Target, Leaf, Zap, TrendingUp, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyMealworm = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Video file path
  const backgroundVideo = `${process.env.PUBLIC_URL}/assets/videos/process/mealworm-background.mp4`;
  const fallbackImage = '/assets/images/process/mealworm-bg.jpg';

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
      value: '2:1',
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
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(e => {
        console.log('Auto-play prevented:', e);
      });
    };

    const handleError = () => {
      setIsLoading(false);
      console.error('Video failed to load');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // Preload video
    video.load();

    // GSAP animations
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo('.section-title', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Counter animation for values
      benefits.forEach((benefit, index) => {
        const targetValue = benefit.value.includes('%') 
          ? parseInt(benefit.value) 
          : benefit.value.includes(':') 
            ? parseFloat(benefit.value.split(':')[0]) 
            : benefit.value.includes('Days') 
              ? 365 
              : 90;

        gsap.fromTo(`.benefit-value-${index}`, 
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2.5,
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
                } else if (benefit.value.includes('Less')) {
                  el.innerText = `${value}% Less`;
                } else {
                  el.innerText = value;
                }
              }
            }
          }
        );
      });

      // Animate benefit cards
      gsap.fromTo('.benefit-card', {
        y: 60,
        opacity: 0,
        scale: 0.9,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.benefits-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

    }, sectionRef);

    return () => {
      if (video) {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      }
      ctx.revert();
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          poster={fallbackImage}
          aria-label="Cinematic background of mealworms moving gracefully"
        >
          <source src={backgroundVideo} type="video/mp4" />
          <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
          {/* Fallback image */}
          <img src={fallbackImage} alt="Mealworm background" className="w-full h-full object-cover" />
        </video>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gold-300">Loading video...</p>
            </div>
          </div>
        )}
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900/80" />
        
        {/* Subtle glitter effect */}
        <div className="absolute inset-0 glitter-bg opacity-20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-6 gold-gradient">
              Why Mealworm Protein
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mealworm protein is not a novelty — it is a biologically efficient protein platform 
              representing a structural upgrade to how protein is produced.
            </p>
          </div>

          <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className={`benefit-${index} benefit-card relative group`}>
                <div className="h-full bg-dark-900/70 backdrop-blur-sm rounded-xl border border-gold-500/30 p-8 text-center hover:border-gold-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/20 hover:scale-[1.02]">
                  {/* Glowing orb effect */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${benefit.color} mx-auto flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                      <benefit.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
                  </div>
                  
                  <div className={`benefit-value-${index} text-4xl font-bold gold-gradient mb-2`}>
                    {benefit.value}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                  
                  {/* Hover line effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent group-hover:w-3/4 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-dark-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20">
            <p className="text-xl text-gray-300 italic max-w-3xl mx-auto">
              "It represents a structural upgrade to how protein is produced — efficient, scalable, 
              and sustainable by design."
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
              <span className="text-gold-400 text-sm">BIOLOGICAL EFFICIENCY</span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Control */}
    </section>
  );
};

export default WhyMealworm;