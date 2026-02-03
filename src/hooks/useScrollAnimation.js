// src/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = (animationCallback, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof animationCallback === 'function') {
        animationCallback();
      }
    }, elementRef);

    return () => ctx.revert();
  }, dependencies);

  return elementRef;
};

export default useScrollAnimation;