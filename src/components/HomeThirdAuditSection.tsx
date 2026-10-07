'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { useRouter } from 'next/navigation';

const THIRD_CODE_TOKENS = [
  { t: "---\n", c: "#999999" },
  { t: 'system: ', c: "#666666" },
  { t: '"GLYNNE Governance Engine"\n', c: "#bbbbbb" },
  { t: 'mode: ', c: "#666666" },
  { t: '"Deterministic Enforcement"\n', c: "#bbbbbb" },
  { t: "---\n\n", c: "#999999" },
  { t: "# SECURITY TELEMETRY\n\n", c: "#111111" },
  { t: "> Verifying zero-trust identity keys...\n", c: "#888888" },
  { t: "> Evaluating agent operational permissions...\n", c: "#888888" },
  { t: "> Enforcing immutable audit trail logging...\n\n", c: "#888888" },
  { t: "[STATUS]: ", c: "#111111" },
  { t: "System Guardrails ", c: "#666666" },
  { t: "ACTIVE & PROTECTED", c: "#228b22" },
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      <div className="responsive-solutions-width-three" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div className="mobile-stack-three" style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>

          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: isDark ? '#ffffff' : '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Architectural Rigor & Engineering Vision
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: isDark ? '#a1a1aa' : '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              GLYNNE is engineered by systems architects who believe AI cannot enter enterprise operations without strict deterministic control. We design the infrastructure that makes AI predictable, secure, and fully auditable.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <button
                className="responsive-btn"
                onClick={() => window.location.href = '/About'}
                style={{
                  padding: '14px 28px',
                  borderRadius: '999px',
                  backgroundColor: isDark ? '#ffffff' : '#111111',
                  color: isDark ? '#000000' : '#ffffff',
                  border: isDark ? '1px solid #ffffff' : '1px solid #111111',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                Discover our vision & team
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
