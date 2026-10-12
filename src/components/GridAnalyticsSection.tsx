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
        <svg width="100%" height="170" viewBox="0 0 240 170" fill="none" style={{ display: 'block' }}>
          {/* Subtle Technical Grid & Crosshairs */}
          <path d="M12 12 H18 M15 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />
          <path d="M222 12 H228 M225 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />
          <path d="M24 24 L216 24 M24 148 L216 148" stroke={svgFaint} strokeDasharray="2 4" strokeWidth="0.8" />

          {/* Unified Isometric Baseline & Hardware Memory Bus */}
          <line x1="28" y1="128" x2="212" y2="128" stroke={svgFaint} strokeWidth="1" />
          <line x1="28" y1="128" x2="212" y2="128" stroke={svgStroke} strokeWidth="1" strokeDasharray="2 5" opacity="0.6" />
          <circle cx="56" cy="128" r="2.5" fill={textColor} />
          <circle cx="120" cy="128" r="2.5" fill={textColor} />
          <circle cx="184" cy="128" r="2.5" fill={textColor} />

          {/* BLOCK 1: 3B (Edge / Mobile Tier) - Centered at X=56 */}
          <line x1="56" y1="84" x2="56" y2="128" stroke={svgFaint} strokeDasharray="2 3" strokeWidth="0.8" />
          {/* Top Face */}
          <path d="M56 80 L74 89 L56 98 L38 89 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Left Face */}
          <path d="M38 89 L56 98 L56 128 L38 119 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Right Face */}
          <path d="M56 98 L74 89 L74 119 L56 128 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <text x="56" y="92.5" textAnchor="middle" fill={textColor} fontSize="9.5" fontFamily="'SF Mono', monospace" fontWeight="700">3B</text>
          <text x="56" y="140" textAnchor="middle" fill={subtextColor} fontSize="7" fontFamily="'SF Mono', monospace" letterSpacing="0.08em">EDGE</text>

          {/* BLOCK 2: 7B (Desktop Tier) - Centered at X=120 */}
          <line x1="120" y1="58" x2="120" y2="128" stroke={svgFaint} strokeDasharray="2 3" strokeWidth="0.8" />
          {/* Top Face */}
          <path d="M120 50 L142 61 L120 72 L98 61 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Left Face */}
          <path d="M98 61 L120 72 L120 128 L98 117 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Right Face */}
          <path d="M120 72 L142 61 L142 117 L120 128 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <text x="120" y="65" textAnchor="middle" fill={textColor} fontSize="10.5" fontFamily="'SF Mono', monospace" fontWeight="700">7B</text>
          <text x="120" y="140" textAnchor="middle" fill={subtextColor} fontSize="7" fontFamily="'SF Mono', monospace" letterSpacing="0.08em">DESKTOP</text>

          {/* BLOCK 3: 14B (Workstation Tier) - Centered at X=184 */}
          <line x1="184" y1="32" x2="184" y2="128" stroke={svgFaint} strokeDasharray="2 3" strokeWidth="0.8" />
          {/* Top Face */}
          <path d="M184 22 L210 35 L184 48 L158 35 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Left Face */}
          <path d="M158 35 L184 48 L184 128 L158 115 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Right Face */}
          <path d="M184 48 L210 35 L210 115 L184 128 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <text x="184" y="39" textAnchor="middle" fill={textColor} fontSize="11" fontFamily="'SF Mono', monospace" fontWeight="700">14B</text>
          <text x="184" y="140" textAnchor="middle" fill={subtextColor} fontSize="7" fontFamily="'SF Mono', monospace" letterSpacing="0.08em">STATION</text>

          {/* Centered Bottom Status Pill */}
          <rect x="46" y="152" width="148" height="15" rx="3" fill={diagramBg} stroke={diagramBorder} />
          <text x="120" y="162.5" textAnchor="middle" fill={subtextColor} fontSize="7.5" fontFamily="'SF Mono', monospace" letterSpacing="0.1em">
            GGUF Q4_K_M // ZERO-TOKEN COST
          </text>
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
        <svg width="100%" height="170" viewBox="0 0 240 170" fill="none" style={{ display: 'block' }}>
          {/* Crosshairs & Alignment Marks */}
          <path d="M12 12 H18 M15 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />
          <path d="M222 12 H228 M225 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />
          <line x1="28" y1="74" x2="212" y2="74" stroke={svgFaint} strokeDasharray="2 4" strokeWidth="0.8" />
          <line x1="120" y1="14" x2="120" y2="134" stroke={svgFaint} strokeDasharray="2 4" strokeWidth="0.8" />

          {/* Outer Calibrated Reticle Ring (R=56) */}
          <circle cx="120" cy="74" r="56" stroke={svgFaint} strokeWidth="1" strokeDasharray="3 5" />
          
          {/* Precision Cardinal Ticks */}
          <line x1="120" y1="15" x2="120" y2="21" stroke={svgStroke} strokeWidth="1.2" />
          <line x1="120" y1="127" x2="120" y2="133" stroke={svgStroke} strokeWidth="1.2" />
          <line x1="61" y1="74" x2="67" y2="74" stroke={svgStroke} strokeWidth="1.2" />
          <line x1="173" y1="74" x2="179" y2="74" stroke={svgStroke} strokeWidth="1.2" />

          {/* Model Orbit Nodes */}
          <circle cx="78" cy="38" r="2.5" fill={textColor} />
          <text x="73" y="34" textAnchor="end" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace">LLAMA 3.2</text>
          
          <circle cx="162" cy="38" r="2.5" fill={textColor} />
          <text x="167" y="34" textAnchor="start" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace">QWEN 2.5</text>
          
          <circle cx="168" cy="104" r="2.5" fill={textColor} />
          <text x="173" y="108" textAnchor="start" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace">PHI 3.5</text>

          {/* Gauge Background Track (R=45) */}
          <circle cx="120" cy="74" r="45" stroke={svgFaint} strokeWidth="4" />
          
          {/* Active 94.8% Gauge Arc (Circumference ≈ 282.7, 94.8% ≈ 268) */}
          <circle
            cx="120"
            cy="74"
            r="45"
            stroke={textColor}
            strokeWidth="4"
            strokeDasharray="268 283"
            strokeLinecap="round"
            transform="rotate(-90 120 74)"
          />

          {/* Inner Decorative Dial Face (R=34) */}
          <circle cx="120" cy="74" r="34" fill={svgFill} stroke={diagramBorder} strokeWidth="1" />

          {/* Center Benchmark Telemetry */}
          <text x="120" y="63" textAnchor="middle" fill={subtextColor} fontSize="7" fontFamily="'SF Mono', monospace" letterSpacing="0.12em">
            OPEN BENCHMARK
          </text>
          <text x="120" y="83" textAnchor="middle" fill={textColor} fontSize="20" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" letterSpacing="-0.03em">
            94.8%
          </text>
          <text x="120" y="94" textAnchor="middle" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace" letterSpacing="0.08em">
            MMLU-PRO // MATH-500
          </text>

          {/* Bottom Telemetry Pill */}
          <rect x="44" y="152" width="152" height="15" rx="3" fill={diagramBg} stroke={diagramBorder} />
          <text x="120" y="162.5" textAnchor="middle" fill={subtextColor} fontSize="7.5" fontFamily="'SF Mono', monospace" letterSpacing="0.1em">
            FOUNDATION REASONING STACK
          </text>
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
        <svg width="100%" height="170" viewBox="0 0 240 170" fill="none" style={{ display: 'block' }}>
          {/* Crosshairs & Alignment Marks */}
          <path d="M12 12 H18 M15 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />
          <path d="M222 12 H228 M225 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />

          {/* Coordinate Frame & Technical Grid */}
          <path d="M26 38 L214 38 M26 112 L214 112" stroke={svgFaint} strokeDasharray="2 4" strokeWidth="0.8" />
          
          {/* Floating Dimension Brackets */}
          <path d="M38 48 H32 V96 H38" stroke={svgFaint} strokeWidth="1.2" fill="none" />
          <text x="24" y="74" textAnchor="middle" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace" transform="rotate(-90 24 74)">
            100% WEIGHTS
          </text>

          <path d="M202 48 H208 V96 H202" stroke={svgFaint} strokeWidth="1.2" fill="none" />
          <text x="216" y="74" textAnchor="middle" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace" transform="rotate(90 216 74)">
            AIR-GAPPED
          </text>

          {/* Central Isometric Tensor Matrix Cube - Centered at X=120 */}
          {/* Top Face */}
          <path d="M120 34 L154 50 L120 66 L86 50 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          {/* Internal Top Lattice */}
          <line x1="103" y1="42" x2="137" y2="58" stroke={svgFaint} strokeWidth="0.8" />
          <line x1="137" y1="42" x2="103" y2="58" stroke={svgFaint} strokeWidth="0.8" />
          
          {/* Left Face */}
          <path d="M86 50 L120 66 L120 104 L86 88 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <line x1="86" y1="63" x2="120" y2="79" stroke={svgFaint} strokeWidth="0.8" />
          <line x1="86" y1="76" x2="120" y2="92" stroke={svgFaint} strokeWidth="0.8" />

          {/* Right Face */}
          <path d="M120 66 L154 50 L154 88 L120 104 Z" fill={svgFill} stroke={svgStroke} strokeWidth="1.2" />
          <line x1="120" y1="79" x2="154" y2="63" stroke={svgFaint} strokeWidth="0.8" />
          <line x1="120" y1="92" x2="154" y2="76" stroke={svgFaint} strokeWidth="0.8" />

          {/* Export Stream / Downward Vector */}
          <line x1="120" y1="104" x2="120" y2="134" stroke={textColor} strokeWidth="1.6" />
          <path d="M115 127 L120 134 L125 127" stroke={textColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Telemetry Dots flanking stream */}
          <circle cx="104" cy="119" r="1.5" fill={svgStroke} />
          <circle cx="136" cy="119" r="1.5" fill={svgStroke} />

          {/* Centered Export File Format Badge */}
          <rect x="46" y="152" width="148" height="15" rx="3" fill={diagramBg} stroke={diagramBorder} />
          <text x="120" y="162.5" textAnchor="middle" fill={textColor} fontSize="7.5" fontFamily="'SF Mono', monospace" fontWeight="600" letterSpacing="0.1em">
            GGUF / SAFETENSORS
          </text>
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
        <svg width="100%" height="170" viewBox="0 0 240 170" fill="none" style={{ display: 'block' }}>
          {/* Crosshairs & Alignment Marks */}
          <path d="M12 12 H18 M15 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />
          <path d="M222 12 H228 M225 9 V15" stroke={svgFaint} strokeWidth="1" strokeLinecap="round" />

          {/* Centered Studio HUD Console Frame (X=120) */}
          <rect x="22" y="22" width="196" height="116" rx="6" fill={svgFill} stroke={diagramBorder} strokeWidth="1" />
          
          {/* Console Header Bar */}
          <rect x="22" y="22" width="196" height="22" rx="6" fill={diagramBg} />
          <line x1="22" y1="44" x2="218" y2="44" stroke={diagramBorder} strokeWidth="1" />
          
          {/* Status Indicator Dot & Header Text */}
          <circle cx="35" cy="33" r="3" fill="#22c55e" />
          <text x="44" y="36" fill={textColor} fontSize="7.5" fontFamily="'SF Mono', monospace" fontWeight="700" letterSpacing="0.08em">
            RETRAIN STUDIO
          </text>
          <text x="206" y="36" textAnchor="end" fill={subtextColor} fontSize="7" fontFamily="'SF Mono', monospace">
            QLORA v2.4
          </text>

          {/* Left Pane: Training Loss Convergence Graph */}
          <line x1="34" y1="120" x2="114" y2="120" stroke={svgFaint} strokeWidth="0.8" />
          <line x1="34" y1="56" x2="34" y2="120" stroke={svgFaint} strokeWidth="0.8" />
          <line x1="34" y1="78" x2="114" y2="78" stroke={svgFaint} strokeDasharray="2 3" strokeWidth="0.6" />
          <line x1="34" y1="99" x2="114" y2="99" stroke={svgFaint} strokeDasharray="2 3" strokeWidth="0.6" />

          {/* Loss Convergence Curve */}
          <path
            d="M36 66 C48 70, 62 108, 112 114"
            stroke={textColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="112" cy="114" r="2.5" fill={textColor} />
          
          <text x="36" y="53" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace">
            LOSS: 0.124
          </text>
          <text x="114" y="128" textAnchor="end" fill={subtextColor} fontSize="6" fontFamily="'SF Mono', monospace">
            EPOCH 3
          </text>

          {/* Pane Divider Line */}
          <line x1="122" y1="48" x2="122" y2="132" stroke={diagramBorder} strokeWidth="1" />

          {/* Right Pane: Adapter Telemetry & Parameters */}
          <text x="130" y="60" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace" letterSpacing="0.06em">
            TARGET:
          </text>
          <text x="130" y="71" fill={textColor} fontSize="7.5" fontFamily="'SF Mono', monospace" fontWeight="600">
            ALL-LINEAR
          </text>

          <text x="130" y="84" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace" letterSpacing="0.06em">
            LORA RANK:
          </text>
          <text x="130" y="95" fill={textColor} fontSize="7.5" fontFamily="'SF Mono', monospace" fontWeight="600">
            r = 64 / a = 128
          </text>

          <text x="130" y="108" fill={subtextColor} fontSize="6.5" fontFamily="'SF Mono', monospace" letterSpacing="0.06em">
            STATUS:
          </text>
          <text x="130" y="120" fill="#22c55e" fontSize="7.5" fontFamily="'SF Mono', monospace" fontWeight="600">
            ● CONVERGED
          </text>

          {/* Bottom Telemetry Badge */}
          <rect x="42" y="152" width="156" height="15" rx="3" fill={diagramBg} stroke={diagramBorder} />
          <text x="120" y="162.5" textAnchor="middle" fill={textColor} fontSize="7.5" fontFamily="'SF Mono', monospace" fontWeight="600" letterSpacing="0.1em">
            QLORA: READY // FINE-TUNED
          </text>
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
