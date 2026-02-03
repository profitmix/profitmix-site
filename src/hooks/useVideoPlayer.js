// src/hooks/useVideoPlayer.js
import { useState, useRef, useEffect } from 'react';

const useVideoPlayer = (videoSources) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      setProgress((currentTime / duration) * 100);
    };

    const handleEnded = () => {
      setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentVideo, videoSources.length]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoSources.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videoSources.length) % videoSources.length);
  };

  return {
    videoRef,
    currentVideo,
    isPlaying,
    progress,
    togglePlayPause,
    nextVideo,
    prevVideo,
    setCurrentVideo,
  };
};

export default useVideoPlayer;