'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function TrainModelGridManifesto() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const mutedTextColor = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const dotColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';
  const gridLineColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.18)';
  const accentGlow = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)';

  return (
    <section style={{
      width: '100%',
      height: '100vh',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLine}`,
      borderBottom: `1px solid ${borderLine}`,
      backgroundColor: 'transparent'
    }}>
      <style>{`
        .grid-manifesto-box {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }

        .grid-manifesto-left {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          border-right: 1px solid ${borderLine};
          background-color: transparent;
          overflow: hidden;
        }

        .grid-manifesto-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .grid-manifesto-box {
            grid-template-columns: 1fr;
            min-height: 100vh;
          }
          .grid-manifesto-left {
            border-right: none;
            border-bottom: 1px solid ${borderLine};
            min-height: 300px;
          }
        }
      `}</style>

      <div className="grid-manifesto-box">
        {/* Left Side: Dot Matrix Grid + Manifesto Text Line */}
        <div className="grid-manifesto-left">
          {/* Background Dot Matrix Grid SVG */}
          <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <pattern id="dotPattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="1.5" fill={dotColor} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>

          {/* Central Typographic Manifesto Line */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            fontSize: 'clamp(20px, 2.5vw, 32px)',
            fontFamily: "'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            letterSpacing: '0.02em',
            textAlign: 'center',
            lineHeight: 1.4
          }}>
            <span style={{ color: mutedTextColor, fontWeight: 300 }}>
              Para aprender, para ajustar, para controlar,{' '}
            </span>
            <span style={{ color: textColor, fontWeight: 600 }}>
              para evolucionar.
            </span>
          </div>
        </div>

        {/* Right Side: Blueprint Mesh Matrix with Crisp White Accents */}
        <div className="grid-manifesto-right">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 600"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            {/* Base Blueprint Grid Lines */}
            {Array.from({ length: 13 }).map((_, i) => {
              const pos = i * 48 + 12;
              return (
                <React.Fragment key={`grid-${i}`}>
                  {/* Vertical Lines */}
                  <line
                    x1={pos}
                    y1="0"
                    x2={pos}
                    y2="600"
                    stroke={i % 3 === 0 ? accentGlow : gridLineColor}
                    strokeWidth={i % 3 === 0 ? "1.2" : "0.8"}
                    strokeOpacity={i % 3 === 0 ? "0.6" : "1"}
                  />
                  {/* Horizontal Lines */}
                  <line
                    x1="0"
                    y1={pos}
                    x2="600"
                    y2={pos}
                    stroke={i % 4 === 0 ? accentGlow : gridLineColor}
                    strokeWidth={i % 4 === 0 ? "1.2" : "0.8"}
                    strokeOpacity={i % 4 === 0 ? "0.5" : "1"}
                  />
                </React.Fragment>
              );
            })}

            {/* Junction Dots at Intersections */}
            {Array.from({ length: 13 }).map((_, row) =>
              Array.from({ length: 13 }).map((_, col) => {
                const x = col * 48 + 12;
                const y = row * 48 + 12;
                const isGlowing = (row + col) % 5 === 0;
                return (
                  <circle
                    key={`dot-${row}-${col}`}
                    cx={x}
                    cy={y}
                    r={isGlowing ? "2.5" : "1.5"}
                    fill={isGlowing ? accentGlow : dotColor}
                    opacity={isGlowing ? "0.9" : "0.7"}
                  />
                );
              })
            )}

            {/* White Accent Segment Lines */}
            <line x1="204" y1="60" x2="444" y2="60" stroke={accentGlow} strokeWidth="2" strokeOpacity="0.8" />
            <line x1="300" y1="156" x2="300" y2="396" stroke={accentGlow} strokeWidth="2" strokeOpacity="0.8" />
            <line x1="108" y1="252" x2="540" y2="252" stroke={accentGlow} strokeWidth="1.8" strokeOpacity="0.7" />
            <line x1="444" y1="300" x2="444" y2="540" stroke={accentGlow} strokeWidth="2" strokeOpacity="0.85" />
          </svg>
        </div>
      </div>
    </section>
  );
}
