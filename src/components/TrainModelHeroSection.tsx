'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

export default function TrainModelHeroSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerBg = isDark ? '#09090b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const svgStroke = isDark ? '#ffffff' : '#111111';
  const svgFaint = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';
  const primaryBtnBg = isDark ? '#e4e4e7' : '#111111';
  const primaryBtnText = isDark ? '#000000' : '#ffffff';
  const secondaryBtnBg = 'transparent';
  const secondaryBtnText = textColor;

  return (
    <section style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box'
    }}>
      <style>{`
        .hud-hero-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: transparent;
          border-top: 1px solid ${borderLine};
          border-bottom: 1px solid ${borderLine};
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }
        .hud-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          border-bottom: 1px solid ${borderLine};
          font-family: 'SF Mono', monospace;
          fontSize: 12px;
        }
        .hud-main-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          flex: 1;
          min-height: 0;
        }
        .hud-left-panel {
          padding: 40px 48px;
          border-right: 1px solid ${borderLine};
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hud-right-panel {
          padding: 40px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .hud-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          border-top: 1px solid ${borderLine};
          font-family: 'SF Mono', monospace;
          fontSize: 11px;
          color: ${subtextColor};
          letter-spacing: 0.08em;
        }
        .hud-checkerboard {
          height: 12px;
          width: 100%;
          background-image: linear-gradient(45deg, ${borderLine} 25%, transparent 25%), 
                            linear-gradient(-45deg, ${borderLine} 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, ${borderLine} 75%), 
                            linear-gradient(-45deg, transparent 75%, ${borderLine} 75%);
          background-size: 8px 8px;
          background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
          opacity: 0.6;
        }
        @media (max-width: 960px) {
          .hud-hero-box {
            height: auto;
            min-height: auto;
          }
          .hud-main-grid {
            grid-template-columns: 1fr;
          }
          .hud-left-panel {
            border-right: none;
            border-bottom: 1px solid ${borderLine};
            padding: 24px 20px;
          }
          .hud-right-panel {
            padding: 24px 20px;
          }
        }
      `}</style>

      {/* Main HUD Frame Box */}
      <div className="hud-hero-box">

        {/* Top Header Bar inside HUD */}
        <div className="hud-top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px', color: textColor, fontFamily: 'sans-serif' }}>
            <span style={{ fontSize: '16px' }}>⬡</span> GLYNNE
          </div>

          <div style={{ display: 'flex', gap: '24px', color: subtextColor, letterSpacing: '0.08em', fontSize: '11px', fontFamily: "'SF Mono', monospace", textTransform: 'uppercase' }}>
            <span>Process</span>
            <span>Resources</span>
            <span>Investments</span>
            <span>Podcast</span>
          </div>
        </div>

        {/* Main Split Body (Left Target Visualizer + Right Typography) */}
        <div className="hud-main-grid">

          {/* Left Panel: Radar HUD Target Reticle Visualizer */}
          <div className="hud-left-panel">

            {/* Top Micro-Header inside Left Panel */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                fontSize: '10px',
                fontFamily: "'SF Mono', monospace",
                color: textColor,
                letterSpacing: '0.12em',
                lineHeight: 1.3
              }}>
                QLORA RETRAINING<br />
                WEIGHT ALIGNMENT<br />
                PRIVATE MODELS
              </div>

              {/* Eye Vector Micro Graphic */}
              <div>
                <svg width="60" height="32" viewBox="0 0 60 32" fill="none">
                  <ellipse cx="30" cy="16" rx="28" ry="14" stroke={svgStroke} strokeWidth="1" />
                  <ellipse cx="30" cy="16" rx="18" ry="14" stroke={svgFaint} strokeWidth="0.8" />
                  <circle cx="30" cy="16" r="6" fill={svgStroke} />
                  <circle cx="30" cy="16" r="2" fill={containerBg} />
                </svg>
              </div>
            </div>

            {/* Center Target Reticle & Horizon Radar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0',
              position: 'relative'
            }}>
              <svg width="340" height="340" viewBox="0 0 280 280" fill="none">
                {/* Outer Bracket Corners */}
                <path d="M 30 50 H 50 M 30 50 V 70" stroke={svgStroke} strokeWidth="1.2" />
                <path d="M 250 50 H 230 M 250 50 V 70" stroke={svgStroke} strokeWidth="1.2" />
                <path d="M 30 230 H 50 M 30 230 V 210" stroke={svgStroke} strokeWidth="1.2" />
                <path d="M 250 230 H 230 M 250 230 V 210" stroke={svgStroke} strokeWidth="1.2" />

                {/* Main Outer Circle */}
                <circle cx="140" cy="140" r="95" stroke={svgStroke} strokeWidth="1" />

                {/* Horizontal Center Scale Line */}
                <line x1="20" y1="140" x2="260" y2="140" stroke={svgStroke} strokeWidth="0.8" />

                {/* Pitch / Horizon Scale Ticks */}
                {Array.from({ length: 17 }).map((_, i) => {
                  const x = 70 + i * 8.75;
                  const isMajor = i % 4 === 0;
                  return (
                    <line
                      key={`tick-${i}`}
                      x1={x}
                      y1={140}
                      x2={x}
                      y2={isMajor ? 155 : 148}
                      stroke={svgStroke}
                      strokeWidth={isMajor ? "1.2" : "0.8"}
                    />
                  );
                })}

                {/* Center Target Crosshair & Arrow */}
                <circle cx="140" cy="95" r="4" fill="none" stroke={svgStroke} strokeWidth="1" />
                <line x1="140" y1="85" x2="140" y2="90" stroke={svgStroke} strokeWidth="1" />
                <line x1="140" y1="100" x2="140" y2="105" stroke={svgStroke} strokeWidth="1" />
                <line x1="130" y1="95" x2="135" y2="95" stroke={svgStroke} strokeWidth="1" />
                <line x1="145" y1="95" x2="150" y2="95" stroke={svgStroke} strokeWidth="1" />

                {/* Downward Triangle */}
                <polygon points="135,115 145,115 140,122" fill={svgStroke} />

                {/* Top-Right Arrow Indicator */}
                <path d="M 220 80 H 205 M 220 80 V 95" stroke={svgStroke} strokeWidth="1.5" />

                {/* Label text START */}
                <text x="50" y="85" fill={textColor} fontSize="9" fontFamily="monospace" letterSpacing="0.1em">START</text>

                {/* Center GLYNNE Logo Badge (Large & Prominent) */}
                <rect x="96" y="96" width="88" height="88" fill={containerBg} stroke={svgStroke} strokeWidth="1.2" rx="4" />
                <g transform="translate(105, 105) scale(0.14)">
                  <path
                    d="M 50 248.252 L 50 456.751 192.750 457.379 C 271.263 457.725, 361.262 458.287, 392.750 458.628 L 450 459.248 L 450 250.748 L 450 42.249 307.250 41.621 C 228.737 41.275, 138.738 40.713, 107.250 40.372 L 50 39.752 50 248.252 M 67 248.291 L 67 440.765 108.250 441.368 C 130.938 441.700, 213.287 442.244, 291.250 442.577 L 433 443.184 433 250.709 L 433 58.235 391.750 57.632 C 369.063 57.300, 286.712 56.756, 208.750 56.423 L 67 55.816 67 248.291 M 128.116 83.980 C 107.992 89.424, 91.038 105.784, 83.655 126.882 C 81.077 134.249, 80.576 137.340, 80.204 148.180 C 79.673 163.622, 81.383 172.548, 87.025 183.787 C 93.772 197.229, 104.680 208.233, 117.500 214.531 C 127.055 219.225, 134.751 221, 145.550 221 C 174.345 221, 198.757 203.773, 206.388 178.068 C 207.554 174.140, 208 168.537, 208 157.818 L 208 143 L 176.500 143 L 145 143 L 145 155 L 145 167 L 160.500 167 C 177.973 167, 177.379 166.666, 174.859 175.078 C 173.124 180.868, 168.620 185.570, 161.405 189.122 C 148.447 195.501, 134.730 192.833, 124.556 181.956 C 108.755 165.064, 109.516 135.415, 126.170 119.022 C 133.040 112.260, 140.029 109.650, 149.673 110.246 C 159.182 110.834, 166.448 114.382, 172.726 121.503 L 177.445 126.854 184.577 119.177 C 188.499 114.955, 192.964 110.008, 194.498 108.185 L 197.288 104.869 192.894 100.309 C 186.535 93.709, 177.818 88.354, 168.578 85.369 C 157.254 81.711, 138.840 81.079, 128.116 83.980 M 221 151.500 L 221 219 L 260 219 L 299 219 L 299 205.500 L 299 192 L 275.500 192 L 252 192 L 252 138 L 252 84 L 236.500 84 L 221 84 L 221 151.500 M 299 84.506 C 299 84.785, 310.025 101.546, 323.500 121.754 L 348 158.496 L 348 188.748 L 348 219 L 363.500 219 L 379 219 L 379.001 189.250 L 379.001 159.500 L 404 122 L 429 84.500 L 410.809 84.227 C 397.075 84.020, 392.328 84.265, 391.434 85.227 C 390.782 85.927, 384.737 95.050, 378 105.500 C 371.263 115.950, 365.244 125.032, 364.625 125.682 C 363.777 126.573, 360.071 121.580, 349.595 105.432 L 335.691 84 L 317.345 84 C 307.255 84, 299 84.228, 299 84.506 M 85 313 L 85 377 L 99.989 377 L 114.977 377 L 115.239 337.600 L 115.500 298.201 L 140.825 337.600 L 166.150 377 L 181.075 377 L 196 377 L 196 313 L 196 249 L 181.012 249 L 166.023 249 L 165.762 288.132 L 165.500 327.264 L 140.500 288.179 L 115.500 249.094 L 100.250 249.047 L 85 249 L 85 313 M 214 313 L 214 377 L 228.988 377 L 243.977 377 L 244.238 337.996 L 244.500 298.993 L 269.500 337.975 L 294.500 376.956 L 309.250 376.978 L 324 377 L 324 313 L 324 249 L 309.511 249 L 295.023 249 L 294.761 288.502 L 294.500 328.005 L 269.115 288.502 L 243.730 249 L 228.865 249 L 214 249 L 214 313 M 343 313 L 343 377 L 380.030 377 L 417.060 377 L 416.780 364.250 L 416.500 351.500 L 394.250 351.231 L 372 350.962 L 372 338.481 L 372 326 L 393.500 326 L 415 326 L 415 313 L 415 300 L 393.500 300 L 372 300 L 372 287.519 L 372 275.038 L 394.250 274.769 L 416.500 274.500 L 416.780 261.750 L 417.060 249 L 380.030 249 L 343 249 L 343 313"
                    fill={textColor}
                    fillRule="evenodd"
                  />
                </g>

                {/* Bottom Right OP label */}
                <text x="225" y="210" fill={textColor} fontSize="10" fontFamily="monospace" fontWeight="700">OP</text>
              </svg>
            </div>

            {/* Bottom HUD Telemetry Line */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'SF Mono', monospace",
              fontSize: '11px',
              color: textColor,
              letterSpacing: '0.1em'
            }}>
              <div>001 &gt;&gt;&gt;&gt;&gt;&gt;&gt;</div>
              <div style={{ fontWeight: 700 }}>FAST FORWARD</div>
            </div>
          </div>

          {/* Right Panel: Typography & Text Copy */}
          <div className="hud-right-panel">
            <div>
              {/* Massive Title */}
              <h1 style={{
                fontSize: 'clamp(44px, 5.5vw, 84px)',
                fontWeight: 400,
                color: textColor,
                lineHeight: 0.95,
                margin: '0 0 32px 0',
                letterSpacing: '-0.03em',
                fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif"
              }}>
                Evolve ®<br />
                the way<br />
                you train
              </h1>

              {/* Sub-badge Location Line */}
              <div style={{
                fontSize: '11px',
                fontFamily: "'SF Mono', monospace",
                fontWeight: 600,
                color: textColor,
                letterSpacing: '0.12em',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span>FINE-TUNING STUDIO</span>
                <span style={{ color: subtextColor }}>/</span>
                <span>MODEL RETRAINING</span>
              </div>

              {/* Paragraph Copy */}
              <p style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', monospace",
                color: subtextColor,
                lineHeight: 1.6,
                margin: '0 0 36px 0',
                maxWidth: '460px'
              }}>
                Access the enterprise fine-tuning environment to create, customize, and retrain your own AI models. Upload your datasets, adjust LoRA hyperparameters, and run QLoRA-optimized retraining jobs to obtain weights tailored to your organization.
              </p>
            </div>

            {/* Dual Action Buttons */}
            <div style={{ display: 'flex', gap: '0px', border: `1px solid ${borderLine}`, marginTop: 'auto' }}>
              <button
                onClick={() => router.push('/Create_you_GLYNNE_model')}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  backgroundColor: primaryBtnBg,
                  color: primaryBtnText,
                  border: 'none',
                  fontSize: '11px',
                  fontFamily: "'SF Mono', monospace",
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                CREATE & RETRAIN MODEL
              </button>

              <button
                onClick={() => router.push('/ia_vailable')}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  backgroundColor: secondaryBtnBg,
                  color: secondaryBtnText,
                  borderLeft: `1px solid ${borderLine}`,
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  fontSize: '11px',
                  fontFamily: "'SF Mono', monospace",
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                MODEL CATALOG
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="hud-bottom-bar">
          <div>01/10 &nbsp; FINE-TUNING & RETRAINING STUDIO</div>
          <div>STATUS: READY TO TRAIN</div>
          <div style={{ fontWeight: 700, color: textColor }}>FINE-TUNING QLORA / 8-BIT</div>
        </div>

        {/* Bottom Checkered Racing Line */}
        <div className="hud-checkerboard" />
      </div>
    </section>
  );
}
