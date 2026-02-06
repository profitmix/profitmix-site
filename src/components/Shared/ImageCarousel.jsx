// src/components/Shared/ImageCarousel.jsx - IMPROVED VERSION
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ImageCarousel = ({ images, className = '', fitMode = 'contain' }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [showFullView, setShowFullView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default placeholder images
  const defaultImages = [
    { 
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop', 
      alt: 'Sustainable Protein Production' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=1200&auto=format&fit=crop', 
      alt: 'Advanced Manufacturing' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1578911372310-3e25c610332f?w=1200&auto=format&fit=crop', 
      alt: 'Quality Control Process' 
    },
  ];

  const carouselImages = images?.length > 0 ? images : defaultImages;

  // Handle image loading errors
  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Get image fit class based on mode
  const getFitClass = () => {
    switch(fitMode) {
      case 'cover':
        return 'object-cover';
      case 'contain':
        return 'object-contain';
      case 'fill':
        return 'object-fill';
      default:
        return 'object-contain';
    }
  };

  // Check if image exists
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Preload images
  useEffect(() => {
    carouselImages.forEach(async (image, index) => {
      const exists = await checkImageExists(image.src);
      if (!exists) {
        handleImageError(index);
      }
    });
  }, [carouselImages]);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="rounded-2xl overflow-hidden bg-dark-800"
        onSlideChange={handleSlideChange}
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center">
              {/* Show error state if image fails */}
              {imageErrors[index] ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-dark-700/50 p-8">
                  <AlertCircle className="w-16 h-16 text-gold-500/50 mb-4" />
                  <p className="text-gray-400 text-center">
                    Image not available: {image.alt}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Path: {image.src}
                  </p>
                </div>
              ) : (
                <>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full ${getFitClass()} bg-dark-900`}
                    loading="lazy"
                    onError={() => handleImageError(index)}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      backgroundColor: '#0a0a0a'
                    }}
                  />
                  
                  {/* Full view button */}
                  <button
                    onClick={() => setShowFullView(true)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-dark-900/70 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors z-10"
                    aria-label="View full image"
                  >
                    <Maximize2 className="w-5 h-5 text-gold-400" />
                  </button>
                </>
              )}
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent pointer-events-none" />
              
              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">
                  {image.alt}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {index + 1} / {carouselImages.length}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Full View Modal */}
      {showFullView && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowFullView(false)}
        >
          <button
            className="absolute top-4 right-4 p-3 rounded-full bg-dark-900/70 backdrop-blur-sm border border-gold-500/30 hover:bg-gold-500/20 transition-colors"
            onClick={() => setShowFullView(false)}
            aria-label="Close full view"
          >
            <Minimize2 className="w-6 h-6 text-gold-400" />
          </button>
          
          <div className="relative max-w-7xl max-h-[90vh]">
            <img
              src={carouselImages[currentIndex]?.src}
              alt={carouselImages[currentIndex]?.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xl font-semibold">
                {carouselImages[currentIndex]?.alt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Swiper Styles */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #d4af37 !important;
          background: rgba(10, 10, 10, 0.7);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.3);
          backdrop-filter: blur(10px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: #d4af37 !important;
          width: 10px;
          height: 10px;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;