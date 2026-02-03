// src/components/Shared/ImageCarousel.jsx
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ImageCarousel = ({ images }) => {
  const swiperRef = useRef(null);

  // Default images if none provided
  const defaultImages = [
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop', alt: 'Protein Production' },
    { src: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&auto=format&fit=crop', alt: 'Sustainable Farming' },
    { src: 'https://images.unsplash.com/photo-1578911372310-3e25c610332f?w=800&auto=format&fit=crop', alt: 'Quality Control' },
  ];

  const carouselImages = images?.length > 0 ? images : defaultImages;

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg font-semibold">{image.alt}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #d4af37 !important;
        }
        .swiper-pagination-bullet {
          background: #d4af37 !important;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;