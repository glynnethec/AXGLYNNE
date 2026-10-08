'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface TrainModelBrandBlocksProps {
  brandPart?: string;
  blocksPart?: string;
}

export default function TrainModelBrandBlocks({
  brandPart = "TrainAX",
  blocksPart = "Panel"
}: TrainModelBrandBlocksProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)';
  const gridPatchLineColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
  const labelColor = isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.55)';
  const magentaAccent = '#f43f5e';

  return (
    <section style={{
      width: '100%',
      height: '100vh',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLineColor}`,
      borderBottom: `1px solid ${borderLineColor}`,
      backgroundColor: 'transparent',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* SVG Canvas for Blueprint Lines, Grid Patches & Technical Marks */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <defs>
          {/* Dense Blueprint Grid Pattern 1 (For Top & Left Patches) */}
          <pattern id="denseBlueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={gridPatchLineColor}
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        {/* 1. TOP-CENTER DENSE GRID PATCH */}
        <g transform="translate(0, 0)">
          {/* Grid Box positioned at top middle-left */}
          <rect
            x="27%"
            y="0"
            width="25%"
            height="24%"
            fill="url(#denseBlueprintGrid)"
            stroke={borderLineColor}
            strokeWidth="1"
          />
        </g>

        {/* 2. MIDDLE-LEFT DENSE GRID PATCH */}
        <g transform="translate(0, 0)">
          {/* Grid Box positioned attached to Line (A) on middle left */}
          <rect
            x="0"
            y="24%"
            width="27%"
            height="47%"
            fill="url(#denseBlueprintGrid)"
            stroke={borderLineColor}
            strokeWidth="1"
          />
        </g>

        {/* 3. TECHNICAL BLUEPRINT GUIDE LINES & MARKS */}

        {/* Horizontal Top Guide Line */}
        <line
          x1="0"
          y1="24%"
          x2="100%"
          y2="24%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Horizontal Bottom Guide Line */}
        <line
          x1="27%"
          y1="71%"
          x2="100%"
          y2="71%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Vertical Line (A) */}
        <line
          x1="27%"
          y1="0"
          x2="27%"
          y2="100%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Vertical Line (C) */}
        <line
          x1="80%"
          y1="5%"
          x2="80%"
          y2="95%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Vertical Line (B) */}
        <line
          x1="96%"
          y1="5%"
          x2="96%"
          y2="95%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Line C Top & Bottom T-Ticks */}
        <line x1="79%" y1="5%" x2="81%" y2="5%" stroke={borderLineColor} strokeWidth="1.2" />
        <line x1="79%" y1="95%" x2="81%" y2="95%" stroke={borderLineColor} strokeWidth="1.2" />

        {/* Line B Top & Bottom T-Ticks */}
        <line x1="95%" y1="5%" x2="97%" y2="5%" stroke={borderLineColor} strokeWidth="1.2" />
        <line x1="95%" y1="95%" x2="97%" y2="95%" stroke={borderLineColor} strokeWidth="1.2" />

        {/* Intersection Crosshairs (+) */}
        {/* Intersection (C) Top */}
        <circle cx="80%" cy="24%" r="3" fill="none" stroke={textColor} strokeWidth="1" opacity="0.8" />
        {/* Intersection (C) Bottom */}
        <circle cx="80%" cy="71%" r="3" fill="none" stroke={textColor} strokeWidth="1" opacity="0.8" />
        {/* Intersection (B) Bottom */}
        <circle cx="96%" cy="71%" r="3" fill="none" stroke={textColor} strokeWidth="1" opacity="0.8" />

        {/* LABELS: (A), (B), (C) */}
        <text
          x="24%"
          y="75%"
          fill={labelColor}
          fontSize="12"
          fontFamily="monospace"
          textAnchor="end"
        >
          (A)
        </text>

        <text
          x="78%"
          y="28%"
          fill={labelColor}
          fontSize="12"
          fontFamily="monospace"
          textAnchor="end"
        >
          (C)
        </text>

        <text
          x="94%"
          y="75%"
          fill={labelColor}
          fontSize="12"
          fontFamily="monospace"
          textAnchor="end"
        >
          (B)
        </text>

        {/* Top T-Mark Label Indicators */}
        <text x="80%" y="4%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">T</text>
        <text x="96%" y="4%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">T</text>
        <text x="80%" y="98%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">⊥</text>
        <text x="96%" y="98%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">⊥</text>
      </svg>

      {/* 4. MAIN CENTRAL LOGO / TITLE DISPLAY */}
      <div style={{
        position: 'absolute',
        top: '24%',
        left: '27%',
        width: '53%',
        height: '47%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 'clamp(20px, 4vw, 60px)',
        zIndex: 5,
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          position: 'relative',
          fontFamily: "'Inter', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 'clamp(38px, 6vw, 84px)',
          fontWeight: 700,
          color: textColor,
          letterSpacing: '-0.02em',
          userSelect: 'none'
        }}>
          {/* "Brand" with Technical Block Pixel Construct overlay on B */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Pixel Block Overlays on 'B' */}
            <span style={{
              position: 'absolute',
              top: '16%',
              left: '-8px',
              width: '12px',
              height: '12px',
              backgroundColor: textColor,
              zIndex: 3
            }} />
            <span style={{
              position: 'absolute',
              bottom: '22%',
              left: '-4px',
              width: '8px',
              height: '8px',
              backgroundColor: isDark ? '#000000' : '#ffffff',
              zIndex: 3
            }} />

            <span style={{ color: textColor }}>{brandPart}</span>
          </div>

          {/* "Blocks" with Magenta End-Point Underline */}
          <div style={{
            position: 'relative',
            display: 'inline-block',
            marginLeft: '2px'
          }}>
            <span style={{ color: textColor }}>{blocksPart}</span>

            {/* Magenta Underline with End Dots */}
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* Left End Dot */}
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: magentaAccent,
                display: 'inline-block'
              }} />

              {/* Line */}
              <span style={{
                flex: 1,
                height: '1.5px',
                backgroundColor: magentaAccent
              }} />

              {/* Right End Dot */}
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: magentaAccent,
                display: 'inline-block'
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
