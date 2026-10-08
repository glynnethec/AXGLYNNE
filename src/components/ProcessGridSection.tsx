'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function ProcessGridSection() {
  const { theme } = useTheme();

  const processSteps = [
    {
      number: '01',
      title: 'DISCOVERY',
      description: 'Access our open-source model catalog (Llama 3, GPT OSS, Mistral) and directly download quantized mathematical weights in production-ready formats (GGUF, Safetensors, or ONNX).',
      icon: (
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="2">
          <circle cx="50" cy="50" r="38" />
          <circle cx="50" cy="50" r="22" />
          <polygon points="50,50 84,32 86,66" fill="#ffffff" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'STRATEGY',
      description: 'Initialize the runtime environment using our native SDKs and optimized libraries for Python, C++, Node.js, or mobile GPU inference engines on iOS and Android.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="2">
          <circle cx="28" cy="22" r="9" />
          <circle cx="50" cy="54" r="28" />
          <line x1="28" y1="31" x2="38" y2="40" />
          <rect x="44" y="44" width="32" height="32" fill="#ffffff" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'EXECUTE',
      description: 'Integrate models directly into your mobile devices or edge servers to execute local inference with zero latency, maintaining complete control and data privacy.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="2">
          <rect x="25" y="15" width="45" height="30" />
          <rect x="15" y="32" width="45" height="45" />
          <polygon points="40,82 78,82 59,48" fill="#ffffff" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'EVOLVE',
      description: 'Fine-tune precision hyperparameters (4-bit / 8-bit quantization), apply LoRA adapters over your custom data, and continuously scale autonomous agent performance.',
      icon: (
        <svg width="64" height="64" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="2">
          <circle cx="28" cy="50" r="14" />
          <circle cx="36" cy="50" r="20" />
          <circle cx="44" cy="50" r="26" />
          <circle cx="52" cy="50" r="32" />
        </svg>
      )
    }
  ];

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
        .pixel-process-container {
          width: 97vw;
          max-width: 97vw;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .pixel-process-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        .pixel-process-badge {
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 18px;
          font-size: clamp(18px, 2.5vw, 26px);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background-color: #000000;
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
          margin-bottom: 16px;
        }

        .pixel-process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          width: 100%;
        }

        .pixel-process-card {
          background-color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 28px;
          box-sizing: border-box;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 340px;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .pixel-process-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7);
          background-color: #050505;
        }

        .pixel-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .pixel-step-num {
          border: 1px solid rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 4px 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .pixel-card-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 8px;
        }

        .pixel-card-desc {
          font-size: 12px;
          line-height: 1.6;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          opacity: 0.9;
          margin: 0;
        }
      `}</style>

      <div className="pixel-process-container">
        {/* HEADER SECTION */}
        <div className="pixel-process-header">
          <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#aaaaaa', textTransform: 'uppercase', marginBottom: '8px' }}>
            /// INTEGRATION AND DEPLOYMENT STEPS
          </div>
          <div className="pixel-process-badge">
            Open Source Implementation Guide
          </div>
          <p style={{
            fontSize: '13px',
            lineHeight: 1.5,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            opacity: 0.9,
            margin: 0,
            maxWidth: '820px'
          }}>
            Follow these 4 fundamental steps to download, configure, integrate, and optimize our open-source models and mathematical weights across your local applications and mobile devices.
          </p>
        </div>

        {/* 4 CARDS GRID */}
        <div className="pixel-process-grid">
          {processSteps.map((step) => (
            <div key={step.number} className="pixel-process-card">
              <div>
                <div className="pixel-card-top">
                  <div className="pixel-step-num">{step.number}</div>
                  <div style={{ opacity: 0.9 }}>{step.icon}</div>
                </div>
                <h4 className="pixel-card-title">
                  {step.title}
                </h4>
                <p className="pixel-card-desc">
                  {step.description}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#888888', textTransform: 'uppercase' }}>
                <span>STEP {step.number} OF 04</span>
                <span>✓ READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
