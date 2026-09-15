'use client';

import React, { useState, useRef } from 'react';

type HoverStep = {
  id: number;
  cx: number;
  cy: number;
  neighbors: { dx: number; dy: number; opacity: number }[];
};

export default function BackgroundWrapper({ children, theme = 'light' }: { children: React.ReactNode, theme?: 'light' | 'dark' }) {
  const [history, setHistory] = useState<HoverStep[]>([]);
  const stepIdRef = useRef(0);
  const lastCellRef = useRef({ x: -1, y: -1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = Math.floor(x / 96);
    const cy = Math.floor(y / 96);

    if (cx !== lastCellRef.current.x || cy !== lastCellRef.current.y) {
      lastCellRef.current = { x: cx, y: cy };

      const numNeighbors = Math.floor(Math.random() * 4) + 1; // 1 to 4 random neighbors
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [-2, 0], [2, 0], [0, -2], [0, 2]
      ];

      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({
          dx: shuffled[i][0],
          dy: shuffled[i][1],
          opacity: (Math.random() * 0.03) + 0.02 // Opacity between 0.02 and 0.05
        });
      }

      const newStep = {
        id: stepIdRef.current++,
        cx,
        cy,
        neighbors
      };

      setHistory(prev => [newStep, ...prev].slice(0, 8)); // Keep last 8 steps for fade out
    }
  };

  const handleMouseLeave = () => {
    setHistory([]);
    lastCellRef.current = { x: -1, y: -1 };
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', backgroundColor: theme === 'dark' ? '#0b0b0d' : '#ffffff' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive SVG Grid */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <defs>
          <pattern id="blackbox-grid" width="96" height="96" patternUnits="userSpaceOnUse">
            <path d="M 96 0 L 0 0 0 96" fill="none" stroke={theme === 'dark' ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.07)"} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blackbox-grid)" />

        {history.map((step, index) => {
          const isCurrent = index === 0;
          return (
            <g key={step.id} style={{ animation: 'cellFadeIn 0.25s ease forwards' }}>
              {/* Random Neighbors */}
              {step.neighbors.map((n, i) => (
                <rect
                  key={i}
                  x={(step.cx + n.dx) * 96}
                  y={(step.cy + n.dy) * 96}
                  width="96"
                  height="96"
                  fill={theme === 'dark' ? `rgba(255,255,255,${isCurrent ? n.opacity : 0})` : `rgba(0,0,0,${isCurrent ? n.opacity : 0})`}
                  style={{ transition: 'fill 0.6s ease' }}
                />
              ))}
              {/* Center Cell */}
              <rect
                x={step.cx * 96}
                y={step.cy * 96}
                width="96"
                height="96"
                fill={theme === 'dark' ? `rgba(255,255,255,${isCurrent ? 0.04 : 0})` : `rgba(0,0,0,${isCurrent ? 0.07 : 0})`}
                style={{ transition: 'fill 0.6s ease' }}
              />
            </g>
          );
        })}
      </svg>
      {children}
    </div>
  );
}
