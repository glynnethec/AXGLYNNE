'use client';

import React, { useState, useRef, useEffect } from 'react';

type AnimatedStep = {
  id: number;
  cx: number;
  cy: number;
  neighbors: { dx: number; dy: number; opacity: number }[];
};

export default function IntenseHeroGrid({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [history, setHistory] = useState<AnimatedStep[]>([]);
  const stepIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fast tick to allow for staggered, independent animations overlapping
    const intervalId = setInterval(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (width <= 0 || height <= 0) return;

      // Pick a completely random point anywhere on the grid
      const randomX = Math.random() * width;
      const randomY = Math.random() * height;

      const cx = Math.floor(randomX / 96);
      const cy = Math.floor(randomY / 96);

      // Add 1 to 2 neighbors for a very subtle "mixer" effect
      const numNeighbors = Math.floor(Math.random() * 2) + 1; 
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [1, -1], [-1, 1], [1, 1]
      ];

      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({
          dx: shuffled[i][0],
          dy: shuffled[i][1],
          opacity: (Math.random() * 0.03) + 0.01 // Extremely soft opacity so multiple don't clutter
        });
      }

      const newStep: AnimatedStep = {
        id: stepIdRef.current++,
        cx,
        cy,
        neighbors
      };

      // Keep up to 15 staggered subtle clusters on screen
      setHistory(prev => [newStep, ...prev].slice(0, 15));
    }, 400); // Trigger a new independent one every 400ms

    return () => clearInterval(intervalId);
  }, []);

  const getGridColor = () => theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
  const getHighlightColor = () => theme === 'dark' ? '255, 255, 255' : '0, 0, 0';

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, ${getGridColor()} 1px, transparent 1px),
            linear-gradient(to bottom, ${getGridColor()} 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      {history.map(step => (
        <React.Fragment key={step.id}>
          {/* Center cell */}
          <div
            style={{
              position: 'absolute',
              top: step.cy * 96,
              left: step.cx * 96,
              width: '96px',
              height: '96px',
              backgroundColor: `rgba(${getHighlightColor()}, 0.05)`,
              animation: 'fade-out-gentle 4s ease-out forwards'
            }}
          />
          {/* Neighbors */}
          {step.neighbors.map((n, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: (step.cy + n.dy) * 96,
                left: (step.cx + n.dx) * 96,
                width: '96px',
                height: '96px',
                backgroundColor: `rgba(${getHighlightColor()}, ${n.opacity})`,
                animation: 'fade-out-gentle 4s ease-out forwards'
              }}
            />
          ))}
        </React.Fragment>
      ))}

      <style>{`
        @keyframes fade-out-gentle {
          0% { opacity: 0; }
          10% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
