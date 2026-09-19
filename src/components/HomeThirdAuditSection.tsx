'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const THIRD_CODE_TOKENS = [
  { t: "---\n", c: "#999999" },
  { t: 'target: ', c: "#666666" },
  { t: '"Industry Adaptation"\n', c: "#bbbbbb" },
  { t: 'action: ', c: "#666666" },
  { t: '"Initialize dynamic reconfiguration"\n', c: "#bbbbbb" },
  { t: "---\n\n", c: "#999999" },
  { t: "# AX INSTRUCTION\n\n", c: "#111111" },
  { t: "> Analyzing current visitor's telemetry...\n", c: "#888888" },
  { t: "> Adapting all operational workflows...\n", c: "#888888" },
  { t: "> Aligning AI behaviors to match industry standards.\n\n", c: "#888888" },
  { t: "[STATUS]: ", c: "#111111" },
  { t: "Industry transformation protocol ", c: "#666666" },
  { t: "ACTIVE", c: "#228b22" },
  { t: ".", c: "#111111" }
];

function ThirdTypewriterCode() {
  return (
    <pre className="notranslate" translate="no" style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, minHeight: 'auto', fontFamily: 'monospace, ui-monospace, Menlo, Monaco', fontSize: 'clamp(11px, 1.2vw, 13px)' }}>
      {THIRD_CODE_TOKENS.map((token, index) => (
        <span key={index} style={{ color: token.c }}>
          {token.t}
        </span>
      ))}
    </pre>
  );
}



export default function HomeThirdAuditSection() {
  return (
    <section className="mobile-audit-section-three" style={{ width: '100%', minHeight: '70vh', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink-three {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 700px) {
          .cards-grid-container-three {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .third-audit-card {
            padding: 16px !important;
            gap: 6px !important;
            border-radius: 14px !important;
          }
          .third-audit-card-title {
            font-size: 14px !important;
          }
          .third-audit-card-title svg {
            width: 14px !important;
            height: 14px !important;
          }
          .third-audit-card-desc {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .responsive-solutions-width-three {
            width: 92vw !important;
          }
          .mobile-stack-three {
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 0 !important;
          }
          .mobile-stack-three .docs-menu-container-three {
            margin: 32px auto 0 !important;
          }
          .mobile-audit-section-three {
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 80px !important;
            height: auto !important;
          }
          .mobile-console-wrapper-three {
            justify-content: flex-start !important;
            width: 100% !important;
            min-height: auto !important;
            padding-bottom: 20px !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width-three" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div className="mobile-stack-three" style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>

          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              The Vision Behind GLYNNE
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              We aren't just building infrastructure; we are redefining what enterprise autonomy means. Discover the engineers, architects, and visionaries behind GLYNNE, and learn why we believe absolute security is the only way forward.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <button 
                className="responsive-btn"
                onClick={() => window.location.href = 'https://axglynne.com/About'}
                style={{
                  padding: '14px 28px',
                  borderRadius: '999px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  border: '1px solid #111111',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                Get to know us
              </button>
            </div>
          </div>

          <div className="mobile-console-wrapper-three" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: 'none',
              fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
              color: '#333333',
              overflowX: 'auto',
              textAlign: 'left',
              border: 'none'
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e5e5e5' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e5e5e5' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e5e5e5' }} />
              </div>
              <ThirdTypewriterCode />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
