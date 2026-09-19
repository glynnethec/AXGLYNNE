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
  { t: '"List and describe the high-impact and lightweight AI models available in the AX GLYNNE cluster."', c: "#bbbbbb" },
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

export default function HomeAuditSection() {
  const router = useRouter();
  
  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* MOVED TEXT BLOCK */}
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          marginTop: '0px', 
          marginBottom: '40px', 
          padding: '40px 0',
          border: 'none',
          borderRadius: '24px',
          backgroundColor: 'transparent',
          textAlign: 'left',
          boxShadow: 'none'
        }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Govern AI across your enterprise
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, lineHeight: 1.6, margin: 0, maxWidth: '800px' }}>
            GLYNNE is the infrastructure layer that integrates artificial intelligence into enterprise systems safely and with total governance. AI shouldn't have unrestricted access. We provide the architecture of control, permissions, and traceability that filters every action—allowing AI to provide autonomous reasoning while you retain absolute security.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', marginTop: '24px', flexWrap: 'wrap' }}>
            <button 
              className="responsive-btn"
              onClick={() => router.push('/About')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: '#111111',
                color: '#ffffff',
                border: '1px solid #111111',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              Discover our architecture
            </button>
            
            <button 
              className="responsive-btn"
              onClick={() => router.push('/AX_chat')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                color: '#111111',
                border: '1px solid rgba(0,0,0,0.2)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111111'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Interact with AX
            </button>
          </div>
        </div>

        {/* Console Section (Floating without Card) */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '80vh', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Controlled AI Execution at GLYNNE
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              We don't just connect you to the most powerful AI models on the market; we wrap them in a secure integration layer. From lightweight models for instant tasks to complex reasoning architectures, GLYNNE dictates what each agent can see, which tools it can use, and how it executes actions.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
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
                AI Available
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
      </div>
    </section>
  );
}
