'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import UncommonlyGoodResultsSection from './UncommonlyGoodResultsSection';
import OrbCardSection from './OrbCardSection';

const CODE_TOKENS = [
  { t: "import ", c: "#999999" },
  { t: "{ GlynneControlLayer } ", c: "#333333" },
  { t: "from ", c: "#999999" },
  { t: '"@glynne/core";\n\n', c: "#bbbbbb" },
  { t: "const ", c: "#999999" },
  { t: "agent = ", c: "#333333" },
  { t: "new ", c: "#999999" },
  { t: "GlynneControlLayer", c: "#666666" },
  { t: "({\n", c: "#333333" },
  { t: "  policy: ", c: "#333333" },
  { t: '"zero-trust-strict"', c: "#bbbbbb" },
  { t: ",\n  permissions: [", c: "#333333" },
  { t: '"erp:read", "catalog:sync"', c: "#bbbbbb" },
  { t: "]\n});\n\n", c: "#333333" },
  { t: "async function ", c: "#999999" },
  { t: "executeWorkflow", c: "#666666" },
  { t: "() {\n", c: "#333333" },
  { t: "  ", c: "#333333" },
  { t: "const ", c: "#999999" },
  { t: "result = ", c: "#333333" },
  { t: "await ", c: "#999999" },
  { t: "agent.runTraceable", c: "#333333" },
  { t: "({\n", c: "#333333" },
  { t: "    task: ", c: "#333333" },
  { t: '"Validate catalog & dispatch ERP updates"', c: "#bbbbbb" },
  { t: "\n  });\n\n", c: "#333333" },
  { t: "  console.", c: "#333333" },
  { t: "log", c: "#666666" },
  { t: "(result.audit_trail);\n", c: "#333333" },
  { t: "}\n\n", c: "#333333" },
  { t: "executeWorkflow", c: "#666666" },
  { t: "().", c: "#333333" },
  { t: "catch", c: "#666666" },
  { t: "(console.error);", c: "#333333" }
];

function TypewriterCode() {
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = CODE_TOKENS.reduce((acc, token) => acc + token.t.length, 0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (visibleChars < totalChars) {
      timeoutId = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, 15);
    } else {
      timeoutId = setTimeout(() => {
        setVisibleChars(0);
      }, 25000);
    }

    return () => clearTimeout(timeoutId);
  }, [visibleChars, totalChars]);

  let charsLeft = visibleChars;

  return (
    <pre className="notranslate" translate="no" style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, minHeight: '340px' }}>
      {CODE_TOKENS.map((token, index) => {
        if (charsLeft <= 0) return null;
        const textToShow = token.t.slice(0, charsLeft);
        charsLeft -= token.t.length;

        return (
          <span key={index} style={{ color: token.c }}>
            {textToShow}
          </span>
        );
      })}
      <span style={{
        display: 'inline-block',
        width: '6px',
        height: '13px',
        backgroundColor: '#666',
        animation: 'console-blink 1s step-end infinite',
        verticalAlign: 'baseline',
        marginLeft: '2px'
      }} />
    </pre>
  );
}

export default function HomeAuditSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

        {/* Uncommonly Good Results Section */}
        <UncommonlyGoodResultsSection />

        {/* Console Section (Floating without Card) */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '80vh', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: isDark ? '#ffffff' : '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Dedicated AI Models & Advanced Fine-Tuning
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: isDark ? '#a1a1aa' : '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              From specialized language models to deep reasoning architectures, we develop and adapt AI algorithms tailored to your enterprise. We perform continuous fine-tuning (QLoRA) on your own corporate data so agents resolve complex operational tasks with millimeter precision.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <button
                className="responsive-btn"
                onClick={() => router.push('/ia_vailable')}
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
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Explore AI Models
              </button>
            </div>
          </div>

          <div style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              backgroundColor: 'transparent',
              borderRadius: '16px',
              padding: '24px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: 'none',
              fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
              fontSize: 'clamp(11px, 1.2vw, 13px)',
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
              <TypewriterCode />
            </div>
          </div>
        </div>

        {/* Orb Section (Voice Call) */}
        <OrbCardSection />

        {/* Cognitive Automation & Dedicated AI Development */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '40px',
          marginBottom: '40px',
          padding: '40px 0',
          border: 'none',
          borderRadius: '24px',
          backgroundColor: 'transparent',
          textAlign: 'left',
          boxShadow: 'none'
        }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: isDark ? '#ffffff' : '#111111', lineHeight: 1.1, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Cognitive Automation & Dedicated AI Development
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: isDark ? '#a1a1aa' : '#86868b', fontWeight: 300, lineHeight: 1.6, margin: 0, maxWidth: '950px' }}>
            We take your enterprise to the next level by designing advanced AI pipelines. We adapt models, fine-tune algorithms with your own operational data, and deploy governed infrastructures ready to execute massive tasks with total precision and auditability.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', marginTop: '24px', flexWrap: 'wrap' }}>
            <button
              className="responsive-btn"
              onClick={() => router.push('/Methodology')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: isDark ? '#ffffff' : '#111111',
                color: isDark ? '#000000' : '#ffffff',
                border: isDark ? '1px solid #ffffff' : '1px solid #111111',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Explore Methodology
            </button>

            <button
              className="responsive-btn"
              onClick={() => router.push('/AX_chat')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                color: isDark ? '#ffffff' : '#111111',
                border: isDark ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(0,0,0,0.2)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = isDark ? '#ffffff' : '#111111'; e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              Interact with AX
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
