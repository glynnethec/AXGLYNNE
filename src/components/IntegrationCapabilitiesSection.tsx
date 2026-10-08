'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function IntegrationCapabilitiesSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerBg = 'transparent';
  const graphicCellBg = 'transparent';
  const textCellBg = 'transparent';
  const dashedBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#666666';

  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.75)' : 'rgba(17, 17, 17, 0.75)';
  const strokeLight = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(17, 17, 17, 0.25)';
  const gridLineColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  
  const faceTop = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)';
  const faceFront = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  const faceSide = isDark ? 'rgba(255, 255, 255, 0.045)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <section style={{
      width: '100vw',
      maxWidth: '100vw',
      margin: '0',
      padding: '40px 0',
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <style>{`
        .capabilities-grid-container {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 0;
          width: 100vw;
          max-width: 100vw;
          background-color: ${containerBg};
          border-top: 1px dashed ${dashedBorder};
          border-bottom: 1px dashed ${dashedBorder};
          border-left: none;
          border-right: none;
          position: relative;
          z-index: 5;
          box-sizing: border-box;
          border-radius: 0px;
          overflow: hidden;
          user-select: text;
          -webkit-user-select: text;
        }

        .cap-cell {
          position: relative;
          z-index: 5;
          box-sizing: border-box;
          padding: 32px;
          display: flex;
          flex-direction: column;
          user-select: text;
          -webkit-user-select: text;
        }

        .cap-cell-top-left {
          border-right: 1px dashed ${dashedBorder};
          border-bottom: 1px dashed ${dashedBorder};
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${graphicCellBg};
          padding: 20px;
        }

        .cap-cell-bottom-left {
          border-right: 1px dashed ${dashedBorder};
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          padding: 40px;
          gap: 24px;
          min-height: 180px;
          background-color: ${textCellBg};
        }

        .cap-cell-top-right {
          border-bottom: 1px dashed ${dashedBorder};
          padding: 40px;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: ${textCellBg};
        }

        .cap-cell-bottom-right {
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${graphicCellBg};
          padding: 20px;
        }

        .cap-serif-title, .cap-title {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 400;
          color: ${textColor};
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
          user-select: text;
          -webkit-user-select: text;
          position: relative;
          z-index: 10;
        }

        .cap-subtext {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.6;
          color: ${subtextColor};
          font-weight: 300;
          letter-spacing: 0.01em;
          margin: 0;
          user-select: text;
          -webkit-user-select: text;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 900px) {
          .capabilities-grid-container {
            grid-template-columns: 1fr;
          }
          .cap-cell-top-left,
          .cap-cell-bottom-left,
          .cap-cell-top-right,
          .cap-cell-bottom-right {
            border-right: none !important;
            border-bottom: 1px dashed ${dashedBorder} !important;
          }
          .cap-cell-bottom-left {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Main Grid Wrapper */}
      <div className="capabilities-grid-container">

        {/* TOP LEFT: ISOMETRIC TURNSTILE ROTOR GRAPHIC */}
        <div className="cap-cell cap-cell-top-left">
          <svg width="100%" height="320" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Grid Lines */}
            <line x1="0" y1="180" x2="600" y2="180" stroke={gridLineColor} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="300" y1="0" x2="300" y2="360" stroke={gridLineColor} strokeWidth="1" strokeDasharray="3 3" />

            {/* Isometric Axis Lines */}
            <path d="M0 30 L600 330" stroke={gridLineColor} strokeWidth="1" />
            <path d="M0 330 L600 30" stroke={gridLineColor} strokeWidth="1" />

            {/* Conveyor Track 1 (Top Right) */}
            <path d="M300 180 L540 60 L570 75 L330 195 Z" fill={faceTop} stroke={strokeLight} strokeWidth="1.2" />
            {/* Conveyor Track 2 (Bottom Right) */}
            <path d="M300 180 L540 300 L510 315 L270 195 Z" fill={faceTop} stroke={strokeLight} strokeWidth="1.2" />
            {/* Conveyor Track 3 (Bottom Left) */}
            <path d="M300 180 L60 300 L30 285 L270 165 Z" fill={faceTop} stroke={strokeLight} strokeWidth="1.2" />
            {/* Conveyor Track 4 (Top Left) */}
            <path d="M300 180 L60 60 L90 45 L330 165 Z" fill={faceTop} stroke={strokeLight} strokeWidth="1.2" />

            {/* 3D Block 1 (Top Left Track - Gold $) */}
            <g transform="translate(110, 70)">
              <path d="M0 15 L70 -20 L130 10 L60 45 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M0 15 L0 35 L60 65 L60 45 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M60 45 L60 65 L130 30 L130 10 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />
              {/* Dollar Circle */}
              <ellipse cx="65" cy="12" rx="14" ry="8" fill="none" stroke="#e0be53" strokeWidth="1.2" />
              <text x="65" y="15" fill="#e0be53" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">$</text>
            </g>

            {/* 3D Block 2 (Top Right Track - Gold $) */}
            <g transform="translate(390, 80)">
              <path d="M0 15 L70 -20 L130 10 L60 45 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M0 15 L0 35 L60 65 L60 45 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M60 45 L60 65 L130 30 L130 10 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />
              {/* Dollar Circle */}
              <ellipse cx="65" cy="12" rx="14" ry="8" fill="none" stroke="#e0be53" strokeWidth="1.2" />
              <text x="65" y="15" fill="#e0be53" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">$</text>
            </g>

            {/* 3D Block 3 (Bottom Left Track - Gold $) */}
            <g transform="translate(80, 200)">
              <path d="M0 15 L70 -20 L130 10 L60 45 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M0 15 L0 35 L60 65 L60 45 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M60 45 L60 65 L130 30 L130 10 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />
              {/* Dollar Circle */}
              <ellipse cx="65" cy="12" rx="14" ry="8" fill="none" stroke="#e0be53" strokeWidth="1.2" />
              <text x="65" y="15" fill="#e0be53" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">$</text>
            </g>

            {/* 3D Block 4 (Bottom Right Track - Alert Red !) */}
            <g transform="translate(330, 200)">
              <path d="M0 15 L70 -20 L130 10 L60 45 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M0 15 L0 35 L60 65 L60 45 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              <path d="M60 45 L60 65 L130 30 L130 10 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />
              {/* Red Alert Circle */}
              <ellipse cx="65" cy="12" rx="14" ry="8" fill="none" stroke="#eb5757" strokeWidth="1.2" />
              <text x="65" y="15" fill="#eb5757" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">!</text>
            </g>

            {/* Central Turnstile Rotor Engine */}
            <g transform="translate(300, 180)">
              {/* Cylinder Base */}
              <ellipse cx="0" cy="20" rx="45" ry="25" fill={faceFront} stroke={strokeColor} strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="40" ry="22" fill={faceTop} stroke={strokeColor} strokeWidth="1.5" />
              <path d="M-40 0 L-40 20 A40 22 0 0 0 40 20 L40 0 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />

              {/* Central Pillar */}
              <path d="M-14 -40 L-14 0 A14 8 0 0 0 14 0 L14 -40 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              <ellipse cx="0" cy="-40" rx="14" ry="8" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />

              {/* Curved Barrier Gate Arms */}
              {/* Gate 1 (Top Left Arc) */}
              <path d="M-10 -20 C -40 -35 -80 -40 -110 -20 C -110 -10 -70 -5 -10 -10 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.5" />
              {/* Gate 2 (Bottom Left Arc) */}
              <path d="M-10 -10 C -40 10 -80 30 -110 50 C -100 60 -50 30 -10 10 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.5" />
              {/* Gate 3 (Top Right Arc) */}
              <path d="M10 -25 C 40 -40 80 -45 110 -25 C 110 -15 70 -10 10 -15 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.5" />
              {/* Gate 4 (Bottom Right Arc) */}
              <path d="M10 -10 C 40 10 70 25 100 45 C 90 55 50 25 10 5 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {/* TOP RIGHT: OPEN SOURCE MODEL WEIGHTS LIBRARY */}
        <div className="cap-cell cap-cell-top-right">
          <h3 className="cap-serif-title" style={{ marginBottom: '16px' }}>
            Open Source<br />Model Weights
          </h3>
          <p className="cap-subtext" style={{ maxWidth: '340px' }}>
            Access our library to directly download mathematical weights from the top open-source models on the market, optimized for seamless integration onto mobile devices.
          </p>
        </div>

        {/* BOTTOM LEFT: MOBILE & EDGE AI INTEGRATION */}
        <div className="cap-cell cap-cell-bottom-left">
          <h3 className="cap-serif-title">
            Mobile & Edge<br />AI Integration
          </h3>
          <p className="cap-subtext" style={{ maxWidth: '340px' }}>
            High-precision, top-performance quantized models ready for native execution on iOS, Android, and embedded hardware with local inference and zero latency.
          </p>
        </div>

        {/* BOTTOM RIGHT: ISOMETRIC VAULT MONOLITH SLABS GRAPHIC */}
        <div className="cap-cell cap-cell-bottom-right">
          <svg width="100%" height="320" viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Isometric Floor Perspective Grid */}
            <path d="M0 240 L200 340 L400 240 L200 140 Z" stroke={gridLineColor} strokeWidth="1" strokeDasharray="3 3" />
            <path d="M0 180 L200 280 L400 180" stroke={gridLineColor} strokeWidth="1" />
            <path d="M0 300 L200 400 L400 300" stroke={gridLineColor} strokeWidth="1" />
            <line x1="200" y1="0" x2="200" y2="360" stroke={gridLineColor} strokeWidth="1" strokeDasharray="3 3" />

            {/* 3D Standing Isometric Monolith Slabs */}

            {/* Slab 1 (Back Right Tallest) */}
            <g transform="translate(230, 90)">
              {/* Top Face */}
              <path d="M0 0 L40 -20 L70 -5 L30 15 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />
              {/* Front Face */}
              <path d="M0 0 L30 15 L30 180 L0 165 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              {/* Side Face */}
              <path d="M30 15 L70 -5 L70 160 L30 180 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />
            </g>

            {/* Slab 2 (Middle Medium Slab) */}
            <g transform="translate(190, 110)">
              {/* Top Face */}
              <path d="M0 0 L40 -20 L70 -5 L30 15 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.2" />
              {/* Front Face */}
              <path d="M0 0 L30 15 L30 180 L0 165 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.2" />
              {/* Side Face */}
              <path d="M30 15 L70 -5 L70 160 L30 180 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.2" />
            </g>

            {/* Slab 3 (Front Main Slab with Dollar Symbol) */}
            <g transform="translate(150, 130)">
              {/* Top Face */}
              <path d="M0 0 L40 -20 L70 -5 L30 15 Z" fill={faceTop} stroke={strokeColor} strokeWidth="1.5" />
              {/* Front Face */}
              <path d="M0 0 L30 15 L30 180 L0 165 Z" fill={faceFront} stroke={strokeColor} strokeWidth="1.5" />
              {/* Side Face */}
              <path d="M30 15 L70 -5 L70 160 L30 180 Z" fill={faceSide} stroke={strokeColor} strokeWidth="1.5" />

              {/* Glowing Gold Dollar Circle on Front Face */}
              <g transform="translate(15, 90)">
                <circle cx="0" cy="0" r="22" fill="none" stroke="#e0be53" strokeWidth="1.5" />
                <text x="0" y="5" fill="#e0be53" fontSize="16" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">$</text>
              </g>
            </g>
          </svg>
        </div>

      </div>
    </section>
  );
}
