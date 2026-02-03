// src/components/Shared/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  showDivider = true,
  dividerColor = 'gold'
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const dividerColors = {
    gold: 'from-gold-400 to-gold-600',
    green: 'from-green-400 to-emerald-600',
    blue: 'from-blue-400 to-cyan-600',
    purple: 'from-purple-400 to-pink-600',
  };

  return (
    <div className={`${alignClasses[align]} ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold gold-gradient ${titleClassName}`}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-xl text-gray-300 mt-4 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
      
      {showDivider && (
        <div className={`w-24 h-1 bg-gradient-to-r ${dividerColors[dividerColor]} rounded-full mt-6 ${
          align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
        }`} />
      )}
    </div>
  );
};

export default SectionTitle;