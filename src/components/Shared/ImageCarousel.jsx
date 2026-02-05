// src/components/Shared/ImageCarousel.jsx - UPDATED
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ImageCarousel = ({ images, className = '' }) => {
  // Default images if none provided
  const defaultImages = [
    { src: '/assets/images/placeholders/process-1.jpg', alt: 'Protein Production' },
    { src: '/assets/images/placeholders/process-2.jpg', alt: 'Sustainable Farming' },
    { src: '/assets/images/placeholders/process-3.jpg', alt: 'Quality Control' },
  ];

  const carouselImages = images?.length > 0 ? images : defaultImages;

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={30}
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
        className="rounded-2xl overflow-hidden"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 md:h-96">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/placeholders/default.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg font-semibold">{image.alt}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;