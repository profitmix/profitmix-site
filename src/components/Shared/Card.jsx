// src/components/Shared/Card.jsx
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'bg-dark-800/50 border border-gold-500/20',
    elevated: 'bg-dark-900/70 border border-gold-500/30 shadow-2xl',
    ghost: 'bg-transparent border border-transparent',
    gradient: 'bg-gradient-to-br from-dark-800 to-dark-900 border border-gold-500/30',
  };

  const hoverClasses = hover 
    ? 'hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300'
    : '';

  return (
    <div
      className={`rounded-xl p-6 ${variants[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;