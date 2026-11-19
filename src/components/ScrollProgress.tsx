// Smooth scroll progress bar at the very top of the viewport
import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[100] pointer-events-none">
      <div 
        className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
