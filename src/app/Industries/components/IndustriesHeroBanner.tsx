'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface IndustriesHeroBannerProps {
  topTitle?: string;
  tab1?: string;
  tab2?: string;
  topRightMicro?: string;
  descLeft?: string;
  dateStamp?: string;
  bottomLeftLabel?: string;
  bottomLeftTag?: string;
  bottomLeftText?: string;
  bottomRightTitle?: string;
}

export default function IndustriesHeroBanner({
  topTitle = "AN INTRODUCTION OF ENTERPRISE SECTORS—",
  tab1 = "about —",
  tab2 = "projects",
  topRightMicro = "An Introduction of enterprise sectors",
  descLeft = "Custom AI model indoctrination, specialized MCP agent protocols, and autonomous workflow engineering designed for high-scale operations.",
  dateStamp = "Published on April 26th 2026",
  bottomLeftLabel = "introduction",
  bottomLeftTag = "GLYNNE AI LABS 2026",
  bottomLeftText = "For enterprise leaders, tailored AI models enable real-time decision synthesis, automated compliance, and high-velocity workflow orchestration across complex industrial environments.",
  bottomRightTitle = "AUTONOMOUS AI ARCHITECTURES TAILORED FOR HIGH-SCALE SECTORS."
}: IndustriesHeroBannerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = 'transparent'; // Fully transparent to blend over BackgroundWrapper grid
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#666666';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const radarGridColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <section
      className="industries-hero-banner"
      style={{
        width: '100%',
        backgroundColor: bgColor,
        color: textColor,
        padding: '130px 0 4rem 0',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10,
        fontFamily: "var(--font-geist-sans), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      <style>{`
        .industries-banner-padding {
          padding-left: clamp(1.5rem, 4vw, 3.5rem);
          padding-right: clamp(1.5rem, 4vw, 3.5rem);
        }

        .editorial-title {
          font-family: var(--font-geist-sans), 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 0.98;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .industries-top-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .industries-middle-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2rem !important;
          }
          .industries-bottom-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .radar-diagram-container {
            align-self: center !important;
            width: 100% !important;
            max-width: 360px !important;
          }
        }
      `}</style>

      {/* TOP ROW: Giant Title (Left), Tabs (Middle), Micro Header (Right) */}
      <div
        className="industries-top-grid industries-banner-padding"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '2.5rem',
          alignItems: 'start',
          marginBottom: '3rem'
        }}
      >
        {/* Top Left: Giant Title */}
        <div>
          <h1
            className="editorial-title"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              margin: 0,
              color: textColor,
              maxWidth: '780px'
            }}
          >
            {topTitle}
          </h1>
        </div>

        {/* Top Center: Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: textColor, cursor: 'pointer' }}>
            {tab1}
          </span>
          <span style={{ fontSize: '14px', fontWeight: 300, color: subtextColor, cursor: 'pointer' }}>
            {tab2}
          </span>
        </div>

        {/* Top Right: Micro Description */}
        <div style={{ textAlign: 'right', paddingTop: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 300, color: subtextColor, lineHeight: '1.4', maxWidth: '160px', marginLeft: 'auto' }}>
            {topRightMicro}
          </div>
        </div>
      </div>

      {/* MIDDLE ROW: Description (Left), Date Stamp (Center), RADAR DIAGRAM (Right) */}
      <div
        className="industries-middle-flex industries-banner-padding"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '4rem',
          position: 'relative',
          gap: '2rem'
        }}
      >
        {/* Left Column: Short Paragraph */}
        <div style={{ maxWidth: '280px' }}>
          <p style={{ fontSize: '13px', lineHeight: '1.5', fontWeight: 300, color: subtextColor, margin: 0 }}>
            {descLeft}
          </p>
        </div>

        {/* Center-Left: Date Stamp */}
        <div style={{ fontSize: '12px', fontWeight: 300, color: subtextColor, fontFamily: "'SF Mono', Monaco, monospace" }}>
          {dateStamp}
        </div>

        {/* VECTOR RADAR SPIDER CHART DIAGRAM (Replacing portrait photo) */}
        <div
          className="radar-diagram-container"
          style={{
            position: 'relative',
            width: 'clamp(280px, 26vw, 360px)',
            height: 'clamp(280px, 26vw, 360px)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 360 360"
            fill="none"
            style={{ overflow: 'visible' }}
          >
            {/* Hexagonal Concentric Grid Lines */}
            <polygon points="180,70 266.6,120 266.6,220 180,270 93.4,220 93.4,120" stroke={radarGridColor} strokeWidth="1" fill="none" />
            <polygon points="180,95 245,132.5 245,207.5 180,245 115,207.5 115,132.5" stroke={radarGridColor} strokeWidth="0.8" fill="none" />
            <polygon points="180,120 223.3,145 223.3,195 180,220 136.7,195 136.7,145" stroke={radarGridColor} strokeWidth="0.8" fill="none" />
            <polygon points="180,145 201.6,157.5 201.6,182.5 180,195 158.4,182.5 158.4,157.5" stroke={radarGridColor} strokeWidth="0.8" fill="none" />

            {/* Radial Axis Guide Lines */}
            <line x1="180" y1="70" x2="180" y2="270" stroke={radarGridColor} strokeWidth="1" />
            <line x1="266.6" y1="120" x2="93.4" y2="220" stroke={radarGridColor} strokeWidth="1" />
            <line x1="266.6" y1="220" x2="93.4" y2="120" stroke={radarGridColor} strokeWidth="1" />

            {/* Center Isometric 3D Box Lines */}
            <line x1="180" y1="170" x2="180" y2="70" stroke={radarGridColor} strokeWidth="0.8" />
            <line x1="180" y1="170" x2="266.6" y2="220" stroke={radarGridColor} strokeWidth="0.8" />
            <line x1="180" y1="170" x2="93.4" y2="220" stroke={radarGridColor} strokeWidth="0.8" />

            {/* DATASET 2 (TOOL B / TRADITIONAL - Dashed Line) */}
            <polygon
              points="180,75 227.6,142.5 232,200 180,220 100.3,216 128,140"
              stroke={textColor}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="none"
              opacity="0.75"
            />
            {/* Tool B Data Node Circles */}
            <circle cx="180" cy="75" r="3" fill="none" stroke={textColor} strokeWidth="1.5" />
            <circle cx="227.6" cy="142.5" r="3" fill="none" stroke={textColor} strokeWidth="1.5" />
            <circle cx="232" cy="200" r="3" fill="none" stroke={textColor} strokeWidth="1.5" />
            <circle cx="180" cy="220" r="3" fill="none" stroke={textColor} strokeWidth="1.5" />
            <circle cx="100.3" cy="216" r="3" fill="none" stroke={textColor} strokeWidth="1.5" />
            <circle cx="128" cy="140" r="3" fill="none" stroke={textColor} strokeWidth="1.5" />

            {/* DATASET 1 (TOOL A / AX 5.2 - Solid Line & Filled Nodes) */}
            <polygon
              points="180,90 259.7,124 253.6,212.5 180,248 102.1,215 115,132.5"
              stroke={textColor}
              strokeWidth="2"
              fill={isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)"}
            />
            {/* Tool A Data Node Circles */}
            <circle cx="180" cy="90" r="3.5" fill={textColor} />
            <circle cx="259.7" cy="124" r="3.5" fill={textColor} />
            <circle cx="253.6" cy="212.5" r="3.5" fill={textColor} />
            <circle cx="180" cy="248" r="3.5" fill={textColor} />
            <circle cx="102.1" cy="215" r="3.5" fill={textColor} />
            <circle cx="115" cy="132.5" r="3.5" fill={textColor} />

            {/* Axis Perimeter Labels */}
            <text x="180" y="52" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600" textAnchor="middle">SPEED</text>
            <text x="282" y="115" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600" textAnchor="start">EASE OF USE</text>
            <text x="282" y="230" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600" textAnchor="start">CUSTOMIZATION</text>
            <text x="180" y="290" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600" textAnchor="middle">SUPPORT</text>
            <text x="78" y="230" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600" textAnchor="end">INTEGRATION</text>
            <text x="78" y="115" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600" textAnchor="end">FEATURES</text>

            {/* Legend at Bottom */}
            <g transform="translate(180, 330)">
              {/* Tool A Legend */}
              <line x1="-70" y1="0" x2="-45" y2="0" stroke={textColor} strokeWidth="2" />
              <circle cx="-57.5" cy="0" r="2.5" fill={textColor} />
              <text x="-38" y="3.5" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600">TOOL A</text>

              {/* Tool B Legend */}
              <line x1="20" y1="0" x2="45" y2="0" stroke={textColor} strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="52" y="3.5" fill={textColor} fontSize="10" fontFamily="'SF Mono', Monaco, monospace" fontWeight="600">TOOL B</text>
            </g>
          </svg>
        </div>

        {/* Far Right Vertical Bar Symbol */}
        <div style={{ fontSize: '14px', fontFamily: 'monospace', color: subtextColor, opacity: 0.6 }}>
          ||
        </div>
      </div>

      {/* BOTTOM ROW: 2 Columns (Small intro left, Huge Headline Right) */}
      <div
        className="industries-bottom-grid industries-banner-padding"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '4rem',
          alignItems: 'end',
          paddingTop: '2rem',
          borderTop: `1px solid ${borderLineColor}`
        }}
      >
        {/* Bottom Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, color: subtextColor, textTransform: 'lowercase', letterSpacing: '0.05em' }}>
            {bottomLeftLabel}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: textColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {bottomLeftTag}
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.6', fontWeight: 300, color: subtextColor, margin: 0, maxWidth: '340px' }}>
            {bottomLeftText}
          </p>
        </div>

        {/* Bottom Right Column: Giant Headline */}
        <div>
          <h2
            className="editorial-title"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 68px)',
              fontWeight: 500,
              lineHeight: 0.98,
              margin: 0,
              color: textColor,
              letterSpacing: '-0.03em'
            }}
          >
            {bottomRightTitle}
          </h2>
        </div>
      </div>
    </section>
  );
}
