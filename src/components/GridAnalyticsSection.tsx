'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function GridAnalyticsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardBg = isDark ? 'rgba(18, 18, 22, 0.6)' : '#ffffff';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#666666';
  const diagramBg = isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8f9fa';
  const diagramBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const svgStroke = isDark ? '#e4e4e7' : '#27272a';
  const svgFaint = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
  const svgFill = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';

  const cards = [
    {
      id: 'local-models',
      title: 'EDGE & LOCAL MODEL LIBRARY',
      desc: 'Download ultra-fast, quantized open-source models (GGUF Q4_K_M / Q8_0) ready to run directly on consumer laptops, edge devices, or local hardware with zero token fees.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="12" rx="2" stroke={textColor} strokeWidth="1.5" />
          <path d="M7 20 H17 M12 16 V20" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      diagram: (
        <svg width="100%" height="180" viewBox="0 0 240 180" fill="none" style={{ display: 'block' }}>
          {/* Isometric Grid Background */}
          <path d="M0 40 L240 40 M0 80 L240 80 M0 120 L240 120 M0 160 L240 160" stroke={svgFaint} strokeDasharray="2 4" strokeWidth="1" />
          <path d="M30 0 L210 180 M90 0 L240 150 M0 30 L180 180" stroke={svgFaint} strokeDasharray="2 4" strokeWidth="1" />
          
          {/* 3D Isometric Staircase Blocks for Parameters (3B, 7B, 14B) */}
          {/* Block 1 (3B) */}
          <path d="M30 145 L65 125 L100 145 L65 165 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M30 145 L30 160 L65 180 L65 165 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M65 165 L65 180 L100 160 L100 145 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <text x="54" y="152" fill={textColor} fontSize="10" fontFamily="monospace" fontWeight="600">3B</text>

          {/* Block 2 (7B) */}
          <path d="M80 115 L120 92 L160 115 L120 138 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M80 115 L80 140 L120 163 L120 138 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M120 138 L120 163 L160 140 L160 115 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <text x="110" y="122" fill={textColor} fontSize="10" fontFamily="monospace" fontWeight="600">7B</text>

          {/* Block 3 (14B) */}
          <path d="M140 70 L185 45 L230 70 L185 95 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M140 70 L140 105 L185 130 L185 95 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M185 95 L185 130 L230 105 L230 70 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <text x="172" y="77" fill={textColor} fontSize="10" fontFamily="monospace" fontWeight="600">14B</text>
        </svg>
      )
    },
    {
      id: 'heavy-architectures',
      title: 'COMPLEX FOUNDATION ENGINES',
      desc: 'Access state-of-the-art heavy reasoning architectures (Llama 3.2, Qwen 2.5, Phi 3.5) pre-aligned for enterprise workflows and internal infrastructure deployment.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={textColor} strokeWidth="1.5" />
          <path d="M12 7 V12 L16 14" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      diagram: (
        <svg width="100%" height="180" viewBox="0 0 240 180" fill="none" style={{ display: 'block' }}>
          {/* Isometric 3D Donut Arc */}
          <ellipse cx="120" cy="110" rx="90" ry="45" stroke={svgStroke} strokeWidth="1.2" fill="none" />
          <ellipse cx="120" cy="110" rx="60" ry="30" stroke={svgStroke} strokeWidth="1.2" fill="none" />
          
          {/* Shaded Arc Segment */}
          <path d="M30 110 C30 85, 70 65, 120 65 C170 65, 210 85, 210 110 L180 110 C180 95, 150 80, 120 80 C90 80, 60 95, 60 110 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1" />
          
          {/* Active Highlight Segment */}
          <path d="M195 98 L210 110 L210 125 L195 113 Z" fill={textColor} stroke={textColor} />

          {/* Center Benchmark Score */}
          <text x="120" y="108" textAnchor="middle" fill={subtextColor} fontSize="8" fontFamily="monospace" letterSpacing="0.08em">OPEN BENCHMARK</text>
          <text x="120" y="128" textAnchor="middle" fill={textColor} fontSize="20" fontFamily="sans-serif" fontWeight="700">94.8%</text>
        </svg>
      )
    },
    {
      id: 'weight-export',
      title: '1-CLICK WEIGHT FILE EXPORTS',
      desc: 'Obtain the exact mathematical algorithm file containing 100% of functional model weights with a single click. Deploy on your own private cloud or air-gapped systems.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4 V16 M7 11 L12 16 L17 11" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 20 H20" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      diagram: (
        <svg width="100%" height="180" viewBox="0 0 240 180" fill="none" style={{ display: 'block' }}>
          {/* 3D Isometric Wireframe Box Mesh */}
          <path d="M30 140 L90 80 L150 120 L210 50" stroke={svgFaint} strokeDasharray="3 3" strokeWidth="1" />
          <path d="M30 110 L90 50 L150 90 L210 20" stroke={svgFaint} strokeDasharray="3 3" strokeWidth="1" />
          
          {/* Vertical Grid Pillars */}
          <line x1="90" y1="50" x2="90" y2="150" stroke={svgFaint} strokeDasharray="2 3" />
          <line x1="150" y1="40" x2="150" y2="160" stroke={textColor} strokeWidth="1.2" />

          {/* Isometric Planes */}
          <path d="M50 160 L110 100 L170 140 L110 200 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1" />
          <path d="M90 130 L150 70 L210 110 L150 170 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1" />

          {/* Highlight Node */}
          <circle cx="150" cy="100" r="5" fill={textColor} />
          <text x="120" y="165" textAnchor="middle" fill={subtextColor} fontSize="8" fontFamily="monospace">GGUF / SAFETENSORS</text>
        </svg>
      )
    },
    {
      id: 'retrain-sync',
      title: 'RETRAIN PANEL INTEGRATION',
      desc: 'Instantly connect any model from our open catalog directly into our QLoRA retraining panel to fine-tune parameters using your corporate operational data.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 12 A8 8 0 0 1 12 4 M20 12 A8 8 0 0 1 12 20" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 1 V7 L15 4 M12 23 V17 L9 20" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      diagram: (
        <svg width="100%" height="180" viewBox="0 0 240 180" fill="none" style={{ display: 'block' }}>
          {/* 3D Isometric Bounding Blocks */}
          <path d="M40 90 L100 55 L160 90 L100 125 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1" />
          
          {/* Large Capacity Box */}
          <path d="M90 110 L170 65 L230 100 L150 145 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M90 110 L90 145 L150 180 L150 145 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <path d="M150 145 L150 180 L230 135 L230 100 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />

          {/* Labels on Box */}
          <text x="105" y="125" fill={textColor} fontSize="10" fontFamily="monospace" fontWeight="700">RETRAIN STUDIO</text>
          <text x="105" y="138" fill={subtextColor} fontSize="8" fontFamily="monospace">QLORA: READY</text>
          <text x="45" y="165" fill={subtextColor} fontSize="8" fontFamily="monospace">FINE-TUNED</text>
        </svg>
      )
    }
  ];

  return (
    <section style={{
      width: '100vw',
      maxWidth: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      padding: '80px clamp(16px, 4vw, 64px) 60px',
      boxSizing: 'border-box',
      zIndex: 10
    }}>
      <style>{`
        .grid-analytics-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .grid-analytics-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }
        .grid-analytics-card {
          position: relative;
          background-color: ${cardBg};
          padding: 28px 24px 20px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 490px;
          transition: transform 0.3s ease, border-color 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
        }
        .grid-analytics-card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 0;
          border: 1px solid ${cardBorder};
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
        }
        .grid-analytics-card:hover {
          transform: translateY(-4px);
        }
        @media (max-width: 1100px) {
          .grid-analytics-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .grid-analytics-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Main Section Header */}
      <div className="grid-analytics-header">
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 400,
          color: textColor,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 16px 0',
          fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif"
        }}>
          Open Weights. Total Sovereignty.
        </h2>
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: subtextColor,
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 auto 24px auto',
          maxWidth: '720px'
        }}>
          Explore and download our curated catalog of open-source LLM architectures. From ultra-lightweight models for local device execution to heavy foundation engines pre-configured for retraining.
        </p>

        <Link
          href="/ia_vailable"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: textColor,
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s ease',
          }}
          onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          Browse Full Model Library <span style={{ fontSize: '15px' }}>→</span>
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid-analytics-container">
        {cards.map((card) => (
          <div key={card.id} className="grid-analytics-card">
            <div>
              {/* Card Header (Title + Icon) */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px',
                gap: '12px'
              }}>
                <h3 style={{
                  fontSize: '13px',
                  fontFamily: "'SF Mono', monospace",
                  fontWeight: 600,
                  color: textColor,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  margin: 0,
                  lineHeight: 1.3,
                  maxWidth: '170px'
                }}>
                  {card.title}
                </h3>
                <div>{card.icon}</div>
              </div>

              {/* Card Description */}
              <p style={{
                fontSize: '13px',
                color: subtextColor,
                fontWeight: 300,
                lineHeight: 1.6,
                margin: '0 0 28px 0'
              }}>
                {card.desc}
              </p>
            </div>

            {/* Diagram Area */}
            <div style={{
              width: '100%',
              backgroundColor: diagramBg,
              border: `1px solid ${diagramBorder}`,
              borderRadius: '8px',
              padding: '12px',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              {card.diagram}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
