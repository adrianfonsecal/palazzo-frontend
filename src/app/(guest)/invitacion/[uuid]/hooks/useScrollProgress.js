'use client';
import { useEffect, useState, useRef, RefObject } from 'react';

export const useScrollProgress = (elementRef) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress as element scrolls through viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start when element enters viewport, end when it leaves
      const start = windowHeight;
      const end = -elementHeight;
      const current = start - elementTop;
      const total = start - end;
      
      const newProgress = Math.min(Math.max(current / total, 0), 1);
      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return progress;
};
