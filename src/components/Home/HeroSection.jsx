// src/components/Home/HeroSection.jsx - UPDATED VERSION
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Optimized video paths - Add YOUR videos here
  const videos = [
    {
      src: '/assets/videos/hero/hero-1.mp4',
      poster: '/assets/videos/hero/hero-1-poster.jpg', // First frame as thumbnail
      fallback: '/assets/videos/hero/hero-1.webm', // WebM for better compression
      alt: 'Sustainable Protein Production'
    },
    {
      src: '/assets/videos/hero/hero-2.mp4',
      poster: '/assets/videos/hero/hero-2-poster.jpg',
      fallback: '/assets/videos/hero/hero-2.webm',
      alt: 'Advanced Cultivation Technology'
    },
    {
      src: '/assets/videos/hero/hero-3.mp4',
      poster: '/assets/videos/hero/hero-3-poster.jpg',
      fallback: '/assets/videos/hero/hero-3.webm',
      alt: 'Circular Economy Process'
    }
  ];

  // Fallback image if videos fail
  const fallbackImages = [
    '/assets/images/hero/hero-1.jpg',
    '/assets/images/hero/hero-2.jpg',
    '/assets/images/hero/hero-3.jpg'
  ];

  useEffect(() => {
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

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Handle video playback
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      setVideoError(false);
      if (isPlaying) {
        videoElement.play().catch(e => {
          console.log('Auto-play prevented:', e);
          setIsPlaying(false);
        });
      }
    };

    const handleError = () => {
      setVideoError(true);
      setIsVideoLoaded(false);
    };

    const handleEnded = () => {
      nextVideo();
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [currentVideo, isPlaying]);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setIsVideoLoaded(false);
    setIsPlaying(true);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
    setIsVideoLoaded(false);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Container - OPTIMIZED */}
      <div className="absolute inset-0 z-0">
        {videoError ? (
          // Fallback to image if video fails
          <div className="absolute inset-0">
            <img
              src={fallbackImages[currentVideo]}
              alt={videos[currentVideo]?.alt || 'Hero background'}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/40 to-dark-900/70" />
          </div>
        ) : (
          // Video with multiple formats for compatibility
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              key={currentVideo}
              className="w-full h-full object-cover"
              poster={videos[currentVideo]?.poster}
              muted={isMuted}
              loop
              playsInline
              preload="metadata" // Load only metadata first
              disablePictureInPicture
              disableRemotePlayback
            >
              {/* WebM format (better compression) */}
              <source src={videos[currentVideo]?.fallback} type="video/webm" />
              {/* MP4 format (fallback) */}
              <source src={videos[currentVideo]?.src} type="video/mp4" />
              {/* Fallback text */}
              Your browser does not support the video tag.
            </video>
            
            {/* Loading overlay */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gold-400">Loading video...</p>
                </div>
              </div>
            )}
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/40 to-dark-900/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/30 to-dark-900/30" />
            <div className="absolute inset-0 glitter-bg opacity-30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gold-gradient font-playfair">
              Powering the Future of Protein
            </span>
            <br />
            <span className="text-white text-3xl md:text-5xl lg:text-6xl">
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

      {/* Video Controls - Only show when video is loaded */}
      {isVideoLoaded && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4 bg-dark-900/60 backdrop-blur-md rounded-full px-4 py-2 border border-gold-500/30">
          <button
            onClick={prevVideo}
            className="p-2 rounded-full hover:bg-gold-500/20 transition-colors"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5 text-gold-400" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full hover:bg-gold-500/20 transition-colors"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-gold-400" />
            ) : (
              <Play className="w-5 h-5 text-gold-400" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gold-500/20 transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gold-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-gold-400" />
            )}
          </button>
          
          <button
            onClick={nextVideo}
            className="p-2 rounded-full hover:bg-gold-500/20 transition-colors"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5 text-gold-400" />
          </button>
          
          {/* Video indicator dots */}
          <div className="flex items-center space-x-2 ml-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentVideo(index);
                  setIsVideoLoaded(false);
                  setIsPlaying(true);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentVideo
                    ? 'w-6 bg-gold-500'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

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