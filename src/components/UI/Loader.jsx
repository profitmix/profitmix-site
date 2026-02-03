// src/components/UI/Loader.jsx
import React from 'react';

const Loader = ({ size = 'md', color = 'gold' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const colors = {
    gold: 'border-gold-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    dark: 'border-dark-900 border-t-transparent',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;