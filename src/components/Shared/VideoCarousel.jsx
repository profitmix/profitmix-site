// src/components/Shared/VideoCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const VideoCarousel = ({ videos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const defaultVideos = [
    { src: '/assets/videos/demo-1.mp4', title: 'Sustainable Protein Production' },
    { src: '/assets/videos/demo-2.mp4', title: 'Our Manufacturing Process' },
    { src: '/assets/videos/demo-3.mp4', title: 'Circular Economy in Action' },
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentIndex, isPlaying]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
    setIsPlaying(true);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-dark-800">
      {/* Video Container */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          key={currentIndex}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          onEnded={nextVideo}
        >
          <source src={videoList[currentIndex]?.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
        
        {/* Video Title */}
        <div className="absolute bottom-20 left-8 right-8">
          <h3 className="text-2xl font-bold text-white">
            {videoList[currentIndex]?.title}
          </h3>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-8 right-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="p-3 rounded-full bg-dark-900/70 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-gold-400" />
            ) : (
              <Play className="w-5 h-5 text-gold-400" />
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevVideo}
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gold-400" />
            </button>
            
            <button
              onClick={nextVideo}
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>
        </div>

        {/* Video Indicators */}
        <div className="flex items-center space-x-2">
          {videoList.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-gold-500'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;