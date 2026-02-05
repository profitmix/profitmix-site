// src/components/Home/HeroSection.jsx - UPDATED VERSION
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Video file - optimized for web
  const backgroundVideo = `${process.env.PUBLIC_URL}/assets/videos/hero/hero-background.mp4`;

  // Fallback image in case video fails
  const fallbackImage = `${process.env.PUBLIC_URL}/assets/images/hero/hero-background.jpg`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      // Auto-play when ready
      video.play().catch(e => {
        console.log('Auto-play prevented:', e);
        setIsPlaying(false);
      });
    };

    const handleError = () => {
      setVideoError(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Preload video
    video.load();

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo('.hero-description', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
      );
      gsap.fromTo('.hero-cta', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.4 }
      );
    }, heroRef);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      ctx.revert();
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(e => console.log('Play error:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              poster={fallbackImage}
              aria-label="Background video showing sustainable protein production"
            >
              <source src={backgroundVideo} type="video/mp4" />
              <source src={backgroundVideo.replace('.mp4', '.webm')} type="video/webm" />
              {/* Fallback to image if video not supported */}
              <img src={fallbackImage} alt="Sustainable Protein Production" />
            </video>
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
                <div className="text-center">
                  <Loader className="w-12 h-12 text-gold-400 animate-spin mx-auto mb-4" />
                  <p className="text-gold-300">Loading video...</p>
                </div>
              </div>
            )}
          </>
        ) : (
          // Fallback image if video fails
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/40 to-dark-900/70" />
        
        {/* Glitter effect overlay */}
        <div className="absolute inset-0 glitter-bg opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="gold-gradient font-playfair">
              Powering the Future of Protein
            </span>
            <br />
            <span className="text-white">
              Through Sustainable Innovation
            </span>
          </h1>
          
          <div className="hero-subtitle mb-8">
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              The world is facing a structural shift in how protein is produced, 
              distributed, and consumed. We are building that system.
            </p>
          </div>

          <p className="hero-description text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rising population, climate pressure, and resource constraints demand 
            new protein systems — not incremental improvements to old ones.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-700 text-dark-900 font-bold text-lg rounded-full hover:from-gold-500 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold-500/30">
              Partner With Us
            </button>
            <button className="px-8 py-4 border-2 border-gold-500 text-gold-300 font-bold text-lg rounded-full hover:bg-gold-500/10 transition-all duration-300 transform hover:scale-105">
              Request Investor Overview
            </button>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      {/* <div className="absolute bottom-8 right-8 z-20 flex items-center space-x-4">
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-dark-800/50 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gold-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-gold-400" />
          )}
        </button>
        
        <button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-dark-800/50 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-gold-400" />
          ) : (
            <Play className="w-5 h-5 text-gold-400" />
          )}
        </button>
      </div> */}

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;