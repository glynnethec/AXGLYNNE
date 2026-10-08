'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function ModelBestPracticesSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section style={{
      width: '100vw',
      maxWidth: '100vw',
      margin: '0',
      padding: '60px 0',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: "'SF Mono', Monaco, 'Courier New', monospace",
      boxSizing: 'border-box',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <style>{`
        .pixel-container {
          width: 97vw;
          max-width: 97vw;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }

        .pixel-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .pixel-title-badge {
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 18px;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background-color: #000000;
          color: #ffffff;
          margin-top: 8px;
          margin-bottom: 14px;
        }

        /* DO SECTION (DARK CARDS) */
        .do-box {
          background-color: #000000;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 24px;
          box-sizing: border-box;
        }

        .do-grid-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .do-card {
          padding: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          box-sizing: border-box;
        }

        .do-card:last-child {
          border-right: none;
        }

        .do-card-full {
          padding: 24px;
          box-sizing: border-box;
        }

        /* DONT SECTION (BLACK CARDS) */
        .dont-box {
          background-color: #000000;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 48px;
          box-sizing: border-box;
        }

        .dont-grid-top {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dont-grid-bottom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .dont-card {
          padding: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          box-sizing: border-box;
        }

        .dont-card:last-child {
          border-right: none;
        }

        .card-header-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 14px;
          line-height: 1.25;
        }

        .card-body-text {
          font-size: 12px;
          line-height: 1.55;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          opacity: 0.95;
          margin: 0;
        }

        /* DITHERED BOTTOM BANNER */
        .dither-banner-wrapper {
          width: 97vw;
          max-width: 97vw;
          margin: 0 auto;
          background-color: #111111;
          background-image: radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px);
          background-size: 6px 6px;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dither-quote-box {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background-color: #000000;
          padding: 24px 36px;
          text-align: center;
          max-width: 780px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
        }

        @media (max-width: 850px) {
          .do-grid-top,
          .dont-grid-top,
          .dont-grid-bottom {
            grid-template-columns: 1fr !important;
          }
          .do-card,
          .dont-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          }
          .do-card:last-child,
          .dont-card:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>

      {/* Main Pixel Container (97vw) */}
      <div className="pixel-container">
        
        {/* HEADER SECTION */}
        <div className="pixel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', letterSpacing: '0.1em', opacity: 0.85 }}>
            <span>💀</span> WHEN ALL ELSE FAILS
          </div>

          <div className="pixel-title-badge">
            GETTING MODELZ RIGHT
          </div>

          <div style={{ width: '28px', height: '2px', backgroundColor: '#ffffff', marginBottom: '16px' }} />

          <p style={{ fontSize: '13px', letterSpacing: '0.05em', lineHeight: 1.5, opacity: 0.95, margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>
            IF IT'S ABSOLUTELY NECESSARY TO IMPLEMENT AN ON-DEVICE MODEL, MAKE SURE IT'S A GOOD ONE!
          </p>
        </div>

        {/* DO SECTION (DARK CARDS) */}
        <div className="do-box">
          {/* Top 3 Columns */}
          <div className="do-grid-top">
            {/* DO 1 */}
            <div className="do-card">
              <div className="card-header-row">
                <span>✓</span>
                <div>
                  DO:<br />QUANTIZE CORRECTLY
                </div>
              </div>
              <p className="card-body-text">
                USE 4 OR 8-BIT GGUF/AWQ QUANTIZATION TO SAVE VRAM AND BATTERY WITHOUT LOSING REASONING PRECISION.
              </p>
            </div>

            {/* DO 2 */}
            <div className="do-card">
              <div className="card-header-row">
                <span>✓</span>
                <div>
                  DO:<br />LOCAL CACHING
                </div>
              </div>
              <p className="card-body-text">
                CACHE MODEL WEIGHTS AND EMBEDDINGS LOCALLY FOR INSTANT INFERENCE AND LATENCY-FREE RUNS ON DEVICE.
              </p>
            </div>

            {/* DO 3 */}
            <div className="do-card">
              <div className="card-header-row">
                <span>✓</span>
                <div>
                  DO:<br />KEEP IT SHORT
                </div>
              </div>
              <p className="card-body-text">
                BE SHORT AND CONCISE IN YOUR PROMPTS AND KEEP CONTEXT WINDOWS FOCUSED ON SINGLE TASKS.
              </p>
            </div>
          </div>

          {/* Full Width Row */}
          <div className="do-card-full">
            <div className="card-header-row">
              <span>✓</span>
              <div>
                DO: ACCESSIBLE ACCESSIBLE ACCESSIBLE
              </div>
            </div>
            <p className="card-body-text">
              THIS IS PRETTY OBVIOUS: IF YOU CAN'T MAKE IT RUN OFFLINE ON DEVICE, DON'T USE AN EDGE MODEL.
            </p>
          </div>
        </div>

        {/* DONT SECTION (BLACK CARDS) */}
        <div className="dont-box">
          {/* Top 3 Columns */}
          <div className="dont-grid-top">
            {/* DONT 1 */}
            <div className="dont-card">
              <div className="card-header-row">
                <span>✕</span>
                <div>
                  DON'T:<br />MODEL INCEPTION
                </div>
              </div>
              <p className="card-body-text">
                AVOID NESTING RECURSIVE LLM CALLS INSIDE UNCHAINED LOOPS.
              </p>
            </div>

            {/* DONT 2 */}
            <div className="dont-card">
              <div className="card-header-row">
                <span>✕</span>
                <div>
                  DON'T:<br />OVERPARAMETERIZE
                </div>
              </div>
              <p className="card-body-text">
                IF YOU'RE TRYING TO RUN 70B ON A MOBILE DEVICE, YOU BETTER CONNECT TO A CLOUD SERVER.
              </p>
            </div>

            {/* DONT 3 */}
            <div className="dont-card">
              <div className="card-header-row">
                <span>✕</span>
                <div>
                  DON'T:<br />BLOCK UI THREADS
                </div>
              </div>
              <p className="card-body-text">
                NEVER RUN HEAVY MODEL WEIGHT INFERENCE ON MAIN UI LOOPS. THAT ONLY LEADS TO MADNESS.
              </p>
            </div>
          </div>

          {/* Bottom 2 Columns */}
          <div className="dont-grid-bottom">
            {/* DONT 4 */}
            <div className="dont-card">
              <div className="card-header-row">
                <span>✕</span>
                <div>
                  DON'T: UNENCRYPTED WEIGHTS
                </div>
              </div>
              <p className="card-body-text">
                NEVER STORE SENSITIVE WEIGHTS OR EMBEDDINGS WITHOUT HARDWARE-LEVEL ENCRYPTION.
              </p>
            </div>

            {/* DONT 5 */}
            <div className="dont-card">
              <div className="card-header-row">
                <span>✕</span>
                <div>
                  DON'T: UNCHECKED HALLUCINATIONS
                </div>
              </div>
              <p className="card-body-text">
                SERIOUSLY, NO ONE WANTS UNCHECKED OUTPUTS, ESPECIALLY IN PRODUCTION.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* DITHERED BOTTOM BANNER (97vw) */}
      <div className="dither-banner-wrapper">
        <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '18px', fontWeight: 600 }}>
          AND ALWAYS REMEMBER TO ASK, KIDS:
        </div>
        <div className="dither-quote-box">
          <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.3 }}>
            "WHY DOES IT HAVE TO BE A 70B MODEL WHEN AN OPTIMIZED 8B ONE WORKS?"
          </div>
        </div>
        <div style={{ fontSize: '11px', letterSpacing: '0.1em', marginTop: '24px', opacity: 0.75 }}>
          PIXELS BY @GLYNNE AI • DOWNLOAD MODEL WEIGHTS • COMPLETELY TRACKER FREE
        </div>
      </div>
    </section>
  );
}
