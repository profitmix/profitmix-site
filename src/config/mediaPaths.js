// src/config/mediaPaths.js
export const MEDIA_PATHS = {
  // Hero Section
  hero: {
    videos: [
      {
        src: '/assets/videos/hero/optimized/hero-1.mp4',
        webm: '/assets/videos/hero/optimized/hero-1.webm',
        poster: '/assets/videos/hero/optimized/hero-1-poster.jpg',
        alt: 'Sustainable Protein Production'
      },
      {
        src: '/assets/videos/hero/optimized/hero-2.mp4',
        webm: '/assets/videos/hero/optimized/hero-2.webm',
        poster: '/assets/videos/hero/optimized/hero-2-poster.jpg',
        alt: 'Advanced Cultivation Technology'
      },
      {
        src: '/assets/videos/hero/optimized/hero-3.mp4',
        webm: '/assets/videos/hero/optimized/hero-3.webm',
        poster: '/assets/videos/hero/optimized/hero-3-poster.jpg',
        alt: 'Circular Economy Process'
      }
    ],
    images: [
      '/assets/images/hero/hero-1.jpg',
      '/assets/images/hero/hero-2.jpg',
      '/assets/images/hero/hero-3.jpg'
    ]
  },

  // About Page
  about: {
    carousel: [
      { src: '/assets/images/about/facility.jpg', alt: 'Our Facility' },
      { src: '/assets/images/about/control-room.jpg', alt: 'Control Room' },
      { src: '/assets/images/about/research-lab.jpg', alt: 'Research Lab' },
      { src: '/assets/images/about/production.jpg', alt: 'Production Area' }
    ],
    founder: '/assets/images/team/founder.jpg',
    team: '/assets/images/team/team-photo.jpg'
  },

  // Process Page
  process: {
    steps: [
      { src: '/assets/images/process/feed.jpg', alt: 'Feed Preparation' },
      { src: '/assets/images/process/cultivation.jpg', alt: 'Controlled Cultivation' },
      { src: '/assets/images/process/harvest.jpg', alt: 'Automated Harvesting' },
      { src: '/assets/images/process/processing.jpg', alt: 'Processing Stage' },
      { src: '/assets/images/process/drying.jpg', alt: 'Drying Technology' },
      { src: '/assets/images/process/powdering.jpg', alt: 'Powdering Process' },
      { src: '/assets/images/process/quality.jpg', alt: 'Quality Testing' },
      { src: '/assets/images/process/packaging.jpg', alt: 'Final Packaging' }
    ],
    videos: [
      {
        src: '/assets/videos/process/optimized/cultivation.mp4',
        webm: '/assets/videos/process/optimized/cultivation.webm',
        poster: '/assets/videos/process/optimized/cultivation-poster.jpg',
        alt: 'Cultivation Process'
      }
    ]
  },

  // Sustainability Page
  sustainability: {
    images: [
      { src: '/assets/images/sustainability/circular-economy.jpg', alt: 'Circular Economy' },
      { src: '/assets/images/sustainability/water-conservation.jpg', alt: 'Water Conservation' },
      { src: '/assets/images/sustainability/energy-efficiency.jpg', alt: 'Energy Efficiency' },
      { src: '/assets/images/sustainability/waste-reduction.jpg', alt: 'Waste Reduction' }
    ]
  },

  // Certifications Page
  certifications: {
    icons: {
      msme: '/assets/icons/certifications/msme.svg',
      fssai: '/assets/icons/certifications/fssai.svg',
      haccp: '/assets/icons/certifications/haccp.svg',
      iso: '/assets/icons/certifications/iso.svg'
    }
  }
};