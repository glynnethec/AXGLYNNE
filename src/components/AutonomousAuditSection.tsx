'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CODE_TOKENS = [
  { t: "import ", c: "#999999" },
  { t: "{ GoogleGenAI } ", c: "#333333" },
  { t: "from ", c: "#999999" },
  { t: '"@google/genai";\n\n', c: "#bbbbbb" },
  { t: "const ", c: "#999999" },
  { t: "client = ", c: "#333333" },
  { t: "new ", c: "#999999" },
  { t: "GoogleGenAI", c: "#666666" },
  { t: "({ });\n\n", c: "#333333" },
  { t: "async function ", c: "#999999" },
  { t: "main", c: "#666666" },
  { t: "() {\n", c: "#333333" },
  { t: "  ", c: "#333333" },
  { t: "const ", c: "#999999" },
  { t: "interaction = ", c: "#333333" },
  { t: "await ", c: "#999999" },
  { t: "client.interactions.", c: "#333333" },
  { t: "create", c: "#666666" },
  { t: "({\n", c: "#333333" },
  { t: "    model: ", c: "#333333" },
  { t: '"gemini-3.1-pro-preview"', c: "#bbbbbb" },
  { t: ",\n", c: "#333333" },
  { t: "    input: ", c: "#333333" },
  { t: '"Summarize the operational advantages and autonomous AI processes executed by AX GLYNNE."', c: "#bbbbbb" },
  { t: ",\n", c: "#333333" },
  { t: '    // generationConfig: { thinking_level: "low" }\n', c: "#cccccc" },
  { t: "  });\n\n", c: "#333333" },
  { t: "  console.", c: "#333333" },
  { t: "log", c: "#666666" },
  { t: "(interaction.output_text);\n", c: "#333333" },
  { t: "}\n\n", c: "#333333" },
  { t: "main", c: "#666666" },
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
    <pre className="notranslate" translate="no" style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
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

export default function AutonomousAuditSection() {
  const router = useRouter();
  
  return (
    <section className="mobile-audit-section" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 700px) {
          .responsive-solutions-width {
            width: 92vw !important;
          }
          .mobile-audit-section {
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 80px !important;
            height: auto !important;
          }
          .mobile-stack {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 0 16px !important;
            min-height: auto !important;
          }
          .mobile-console-wrapper {
            justify-content: flex-start !important;
            width: 100% !important;
            min-height: 800px !important;
            padding-bottom: 40px !important;
          }
          .mobile-btn-container {
            justify-content: center !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {/* Console Section (Floating without Card) */}
        <div className="mobile-stack" style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '80vh', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Autonomous Audit
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              Through its cognitive engine, AX GLYNNE executes deep real-time analysis on Servex processes, operating independently in the background to automate repetitive tasks.
            </p>
            
            <div className="mobile-btn-container" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <button 
                className="responsive-btn"
                onClick={() => router.push('/ia_vailable')}
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
                ia available
              </button>
            </div>
          </div>
          
          <div className="mobile-console-wrapper" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'flex-end' }}>
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
      </div>
    </section>
  );
}
