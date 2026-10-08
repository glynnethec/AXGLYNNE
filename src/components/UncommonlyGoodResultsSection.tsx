'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

export default function UncommonlyGoodResultsSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const items = [
    {
      num: '001',
      title: 'Extraction & Synthetic Dataset Generation (SFT)',
      desc: 'Upload your documents (PDF, TXT, CSV, JSON) and our technology extracts and generates hundreds of high-diversity instruction-response pairs to prevent model hallucinations and repetitive phrasing.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Data Ingestion & Synthetic Dataset Icon */}
          <rect x="18" y="16" width="44" height="48" rx="8" />
          <line x1="28" y1="28" x2="52" y2="28" />
          <line x1="28" y1="38" x2="46" y2="38" />
          <line x1="28" y1="48" x2="40" y2="48" />
          <circle cx="56" cy="56" r="10" fill={isDark ? "#121216" : "#ffffff"} />
          <path d="M52 56 L60 56 M56 52 L56 60" />
        </svg>
      )
    },
    {
      num: '002',
      title: 'QLoRA Training on High-Speed GPUs',
      desc: 'We inject LoRA neural adapters (r=16) into state-of-the-art base models (Llama 3.2, Qwen 2.5, Phi 3.5) quantized to 4-bit over high-performance GPU clusters.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Neural Fine-Tuning Weight Matrix Icon */}
          <circle cx="40" cy="24" r="12" />
          <circle cx="24" cy="52" r="12" />
          <circle cx="56" cy="52" r="12" />
          <line x1="32" y1="32" x2="28" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="48" y1="32" x2="52" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="52" x2="44" y2="52" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      num: '003',
      title: 'Anti-Overfitting Tuning & Live Telemetry',
      desc: 'Monitor your training process in real time. We optimize learning rates and ChatML formatting to ensure the AI strictly adheres to your corporate governance and rules.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Real-time Telemetry Analytics Icon */}
          <rect x="16" y="20" width="48" height="40" rx="6" />
          <path d="M24 46 L34 38 L42 44 L56 28" />
          <circle cx="56" cy="28" r="3" fill="currentColor" />
          <line x1="16" y1="48" x2="64" y2="48" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      num: '004',
      title: 'Live Chat Testing & Weight Download (GGUF)',
      desc: 'Test your custom-trained AI immediately in our interactive chat or download the final weights (GGUF / Safetensors) to deploy on your own servers with zero per-token fees.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Model Download & Open Export Icon */}
          <path d="M40 18 L40 46 M30 36 L40 46 L50 36" />
          <path d="M18 48 L18 58 C18 61 21 64 24 64 L56 64 C59 64 62 61 62 58 L62 48" />
          <line x1="26" y1="26" x2="32" y2="26" />
          <line x1="48" y1="26" x2="54" y2="26" />
        </svg>
      )
    }
  ];

  return (
    <section style={{
      width: '100%',
      padding: '80px 0',
      marginTop: '40px',
      marginBottom: '60px',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        .results-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
        }
        .results-column {
          padding: 40px 28px;
          border-left: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 420px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .results-column:first-child {
          border-left: none;
        }
        .results-column:hover {
          background-color: ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
        }
        @media (max-width: 1024px) {
          .results-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .results-column {
            border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'};
          }
          .results-column:nth-child(2n+1) {
            border-left: none;
          }
        }
        @media (max-width: 640px) {
          .results-grid-container {
            grid-template-columns: 1fr;
          }
          .results-column {
            border-left: none !important;
            border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'};
            padding: 32px 16px;
          }
        }
      `}</style>

      {/* Top Header Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px',
        marginBottom: '80px',
        width: '100%'
      }}>
        {/* Big Main Heading */}
        <h2 style={{
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 400,
          color: isDark ? '#ffffff' : '#111111',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: 0,
          maxWidth: '680px'
        }}>
          Turn your enterprise data into your own proprietary AI Model, fully trained and 100% owned by you.
        </h2>

        {/* Right side info & CTA button */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          maxWidth: '440px'
        }}>
          <p style={{
            fontSize: '15px',
            color: isDark ? '#a1a1aa' : '#555555',
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0
          }}>
            Don't rely on generic responses. We possess proprietary Fine-Tuning technology (QLoRA) to train LLM models using your own manuals, databases, and operational processes. Test your model in our control panel or download the open-weight files to run it on your own infrastructure.
          </p>

          <button
            onClick={() => router.push('/Create_you_GLYNNE_model')}
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              backgroundColor: isDark ? '#ffffff' : '#111111',
              color: isDark ? '#111111' : '#ffffff',
              border: isDark ? '1px solid #ffffff' : '1px solid #111111',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#e4e4e7' : '#333333';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#111111';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Create & Train My GLYNNE Model</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)',
              fontSize: '12px',
              color: isDark ? '#111111' : '#ffffff',
              transition: 'transform 0.2s ease'
            }}>
              ›
            </span>
          </button>
        </div>
      </div>

      {/* Sub-bar section label divider */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        paddingBottom: '12px',
        marginBottom: '0px'
      }}>
        <span style={{
          fontSize: '11px',
          fontFamily: "'SF Mono', monospace",
          color: isDark ? '#a1a1aa' : '#86868b',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          / MODEL TRAINING & OPEN WEIGHT DOWNLOAD PLATFORM (QLoRA SFT)
        </span>

        <span style={{
          fontSize: '11px',
          fontFamily: "'SF Mono', monospace",
          color: isDark ? '#ffffff' : '#111111',
          padding: '4px 12px',
          borderRadius: '999px',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          PROPRIETARY TECHNOLOGY <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isDark ? '#ffffff' : '#111111', display: 'inline-block' }}></span>
        </span>
      </div>

      {/* 4-Column Minimalist Cards Grid */}
      <div className="results-grid-container">
        {items.map((item) => (
          <div key={item.num} className="results-column">
            <div>
              <div style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', monospace",
                color: isDark ? '#a1a1aa' : '#86868b',
                marginBottom: '32px'
              }}>
                {item.num}
              </div>

              <div style={{
                color: isDark ? '#ffffff' : '#111111',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '90px'
              }}>
                {item.icon}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '19px',
                fontWeight: 500,
                color: isDark ? '#ffffff' : '#111111',
                margin: '0 0 12px 0',
                letterSpacing: '-0.01em',
                lineHeight: 1.3
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: isDark ? '#a1a1aa' : '#666666',
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
