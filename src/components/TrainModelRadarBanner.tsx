'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

export default function TrainModelRadarBanner() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const radarLineColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
  const orangeAccent = '#f24e1e';

  return (
    <section style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box'
    }}>
      <style>{`
        .radar-banner-box {
          width: 100%;
          height: 100%;
          min-height: 100vh;
          background-color: transparent;
          border-top: 1px solid ${borderLine};
          border-bottom: 1px solid ${borderLine};
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
        }

        .radar-banner-left {
          padding: 48px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 2;
          background-color: transparent;
          border-right: 1px solid ${borderLine};
        }

        .radar-banner-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: transparent;
          height: 100%;
        }

        .white-cta-btn {
          width: 46px;
          height: 46px;
          background-color: #ffffff;
          border: none;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
          margin-top: 28px;
        }
        .white-cta-btn:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        @media (max-width: 900px) {
          .radar-banner-box {
            grid-template-columns: 1fr;
            height: auto;
            min-height: auto;
          }
          .radar-banner-left {
            padding: 32px 24px;
          }
          .radar-banner-right {
            min-height: 300px;
            border-left: none;
            border-top: 1px solid ${borderLine};
          }
        }
      `}</style>

      <div className="radar-banner-box">
        {/* Left Copy & CTA */}
        <div className="radar-banner-left">
          <div>
            <h2 style={{
              fontSize: 'clamp(30px, 3.8vw, 46px)',
              fontWeight: 400,
              color: textColor,
              lineHeight: 1.05,
              margin: '0 0 20px 0',
              letterSpacing: '-0.02em',
              fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif"
            }}>
              Retraining<br />
              without limits
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '520px' }}>
              <p style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                color: subtextColor,
                lineHeight: 1.65,
                margin: 0,
                fontWeight: 300
              }}>
                Our retraining architecture integrates 8-bit QLoRA optimization engines and advanced quantization, allowing open-weight foundation models (such as Llama, Qwen, or Phi) to be fine-tuned directly in system memory. This lets you adapt AI to your company's private data and specific terminology with maximum mathematical precision, eliminating dependence on massive infrastructure and guaranteeing absolute sovereignty over your information.
              </p>

              <p style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                color: subtextColor,
                lineHeight: 1.65,
                margin: 0,
                fontWeight: 300
              }}>
                The process is intuitive and structured: upload your corporate datasets in standard formats (JSONL, CSV, or TXT), use our automatic instruction-response pair generators, and define the key hyperparameters — such as LoRA rank (r), alpha, learning rate, and epochs. The system processes the tensors and computes the low-rank adaptation matrices in record time.
              </p>

              <p style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                color: subtextColor,
                lineHeight: 1.65,
                margin: 0,
                fontWeight: 300
              }}>
                From our retraining dashboard, you monitor loss curves, metric convergence, and server logs in real time. Once the cycle completes, you can validate the fine-tuned model's behavior in the built-in testing environment and export LoRA adapters or GGUF files ready to be deployed autonomously and securely in any environment.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push('/Create_you_GLYNNE_model')}
            className="white-cta-btn"
            title="Start Retraining"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>

        {/* Right Tactical Radar Visualizer */}
        <div className="radar-banner-right">
          {/* SVG Tactical Radar */}
          <svg width="100%" height="100%" viewBox="0 0 500 500" fill="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"} />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* Background Faint World Map Continent Paths */}
            <g opacity="0.15" fill={textColor}>
              {/* North America */}
              <path d="M 100 180 Q 140 160 170 190 T 150 240 Q 120 230 100 180 Z" />
              {/* South America */}
              <path d="M 160 260 Q 190 270 185 330 T 160 360 Q 150 300 160 260 Z" />
              {/* Europe & Africa */}
              <path d="M 270 170 Q 310 160 320 200 T 290 280 Q 260 250 270 170 Z" />
              {/* Asia */}
              <path d="M 340 150 Q 420 140 430 220 T 360 230 Q 330 180 340 150 Z" />
            </g>

            {/* Radar Center Glow */}
            <circle cx="340" cy="250" r="220" fill="url(#radarGlow)" />

            {/* Concentric Radar Rings */}
            <circle cx="340" cy="250" r="210" stroke={radarLineColor} strokeWidth="1" />
            <circle cx="340" cy="250" r="160" stroke={radarLineColor} strokeWidth="1" />
            <circle cx="340" cy="250" r="110" stroke={radarLineColor} strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="340" cy="250" r="60" stroke={radarLineColor} strokeWidth="1" />

            {/* Crosshair Radial Lines */}
            <line x1="340" y1="30" x2="340" y2="470" stroke={radarLineColor} strokeWidth="1" />
            <line x1="120" y1="250" x2="500" y2="250" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="190" y1="100" x2="490" y2="400" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="2 4" />

            {/* Flight / Model Trajectory Line */}
            <path d="M 230 330 Q 280 300 340 250 T 400 170" stroke={radarLineColor} strokeWidth="1" strokeDasharray="3 3" />

            {/* Tactical Target Blip 1: ETA 18:45 utc */}
            <g transform="translate(390, 170)">
              <rect x="-3" y="-3" width="6" height="6" fill={textColor} />
              <text x="8" y="0" fill={textColor} fontSize="9" fontFamily="monospace" letterSpacing="0.08em">ETA:</text>
              <text x="8" y="10" fill={textColor} fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">18:45 utc</text>
            </g>

            {/* Tactical Target Blip 2: MSC-4521 */}
            <g transform="translate(310, 290)">
              <circle cx="0" cy="0" r="8" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <circle cx="0" cy="0" r="3" fill={textColor} />
              <text x="-18" y="20" fill={textColor} fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">MSC-4521</text>
            </g>

            {/* Extra Small Tactical Markers */}
            <rect x="230" y="327" width="5" height="5" fill={textColor} />
            <rect x="400" y="327" width="5" height="5" fill={textColor} />
            <circle cx="270" cy="180" r="2" fill={textColor} />
          </svg>
        </div>
      </div>
    </section>
  );
}
