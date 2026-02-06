// src/components/Home/WhyAlternativeProtein.jsx - VIDEO VERSION
import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Droplet, TreePine, BarChart3, Dna, Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyAlternativeProtein = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Video paths - place your DNA video in public/assets/videos/
  const videoSources = {
    mp4: '/assets/videos/dna-background.mp4',
    webm: `${process.env.PUBLIC_URL}/assets/videos/dna-background.webm`,
    poster: '/assets/images/placeholders/dna-poster.jpg' // Fallback image
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setIsLoading(false);
      // Try to auto-play, but handle cases where browser blocks it
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play prevented:', error);
          setIsPlaying(false);
        });
      }
    };

    const handleError = () => {
      console.error('Failed to load video');
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);
    video.addEventListener('error', handleError);

    // Start loading the video
    video.load();

    // GSAP animations
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo('.section-title', {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate cards
      gsap.fromTo('.challenge-card', {
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
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate DNA icon
      gsap.fromTo('.dna-icon', {
        rotation: -180,
        scale: 0,
      }, {
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

    }, sectionRef);

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('canplay', handleLoaded);
        video.removeEventListener('error', handleError);
        video.pause();
      }
      ctx.revert();
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(e => {
        console.log('Play error:', e);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const challenges = [
    {
      icon: TreePine,
      title: 'Land Availability',
      description: 'Shrinking arable land for traditional agriculture',
      color: 'from-red-500 to-orange-500',
      stat: '80% less land'
    },
    {
      icon: Droplet,
      title: 'Water Stress',
      description: 'Intensifying global water scarcity issues',
      color: 'from-blue-500 to-cyan-500',
      stat: '90% water savings'
    },
    {
      icon: AlertTriangle,
      title: 'Environmental Costs',
      description: 'Rising ecological impact of conventional methods',
      color: 'from-yellow-500 to-amber-500',
      stat: '85% lower emissions'
    },
    {
      icon: BarChart3,
      title: 'Supply Volatility',
      description: 'Increasing instability in protein supply chains',
      color: 'from-purple-500 to-pink-500',
      stat: 'Year-round production'
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden min-h-screen">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0">
        {hasError ? (
          // Fallback gradient if video fails
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Dna className="w-64 h-64 text-gold-500/30" />
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              poster={videoSources.poster}
              style={{ backgroundColor: '#000000' }}
            >
              <source src={videoSources.webm} type="video/webm" />
              <source src={videoSources.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-dark-900/90 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin mb-4" />
                <p className="text-gold-300 text-lg">Loading DNA visualization...</p>
                <p className="text-gray-500 text-sm mt-2">Preparing molecular animation</p>
              </div>
            )}
          </>
        )}
        
        {/* Overlay gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/85 via-dark-900/50 to-dark-900/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/40 via-transparent to-dark-900/40" />
        
        {/* Animated particles overlay */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-gold-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 4}s`,
                boxShadow: '0 0 10px 2px rgba(212, 175, 55, 0.5)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-20">
              <div className="dna-icon inline-flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute -inset-4 border border-gold-500/20 rounded-full animate-spin-slow"></div>
                </div>
              </div>
              
              <h1 className="section-title text-4xl md:text-6xl font-bold mb-6">
                <span className="gold-gradient">The Biological Blueprint</span>
                <br />
                <span className="text-white">for Future Protein</span>
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8" />
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                Traditional protein systems are reaching biological limits. We're decoding nature's 
                most efficient molecular pathways to build sustainable, climate-independent nutrition.
              </p>
            </div>

            {/* Challenge Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {challenges.map((challenge, index) => (
                <div key={index} className="challenge-card group">
                  <div className="h-full p-6 bg-dark-900/70 backdrop-blur-sm rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/20">
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <challenge.icon className="w-7 h-7 text-white" />
                      <div className="absolute -inset-2 border border-white/20 rounded-xl animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                      {challenge.description}
                    </p>
                    <div className="text-gold-400 text-sm font-semibold">
                      {challenge.stat}
                    </div>
                    
                    {/* Animated progress indicator */}
                    <div className="mt-4 pt-4 border-t border-gold-500/20 group-hover:border-gold-500/40 transition-colors">
                      <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold-500 to-transparent transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Insight Box */}
            <div className="bg-dark-900/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gold-500/20 shadow-2xl overflow-hidden">
              <div className="relative">
                {/* Animated background element */}
                <div className="absolute -right-10 -top-10 w-40 h-40 opacity-10">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 border border-gold-500/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-10 border border-gold-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-600/20 to-gold-800/10 border-2 border-gold-500/30 flex items-center justify-center">
                      <span className="text-4xl">🧬</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed mb-6">
                      "Just as DNA encodes life's most efficient processes, we're engineering 
                      biological systems that produce protein with unprecedented resource efficiency, 
                      creating a new paradigm for sustainable nutrition."
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: 'Genetic Efficiency', value: '98%', color: 'text-green-400' },
                        { label: 'Feed Conversion', value: '2:1', color: 'text-gold-400' },
                        { label: 'Water Savings', value: '90%', color: 'text-blue-400' },
                        { label: 'Carbon Reduction', value: '85%', color: 'text-emerald-400' },
                      ].map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wider">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="text-xs text-gold-400/50 mb-2 uppercase tracking-widest">SCROLL</div>
          <div className="w-6 h-10 border border-gold-500/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-400/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default WhyAlternativeProtein;