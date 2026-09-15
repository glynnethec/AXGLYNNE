'use client';
import React, { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      // Force GSAP and ScrollTrigger to recalculate once the transform containing block is removed
      window.dispatchEvent(new Event('resize'));
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={isAnimating ? { animation: 'pageReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both' } : {}}>
      {children}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pageReveal {
          0% { opacity: 0; transform: scale(0.96) translateY(10px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
      `}} />
    </div>
  );
}
