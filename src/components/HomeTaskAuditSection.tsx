'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AUDIT_TASKS = [
  { id: 1, action: "Ingestion: Catalog WB Manufacturing" },
  { id: 2, action: "Validation: Price discrepancies detected" },
  { id: 3, action: "Policy: GLYNNE Access control verified" },
  { id: 4, action: "Sync: ERP Database Update" },
  { id: 5, action: "Transform: Standardizing geometry for CET" },
  { id: 6, action: "Engine: Cognitive match for missing materials" },
  { id: 7, action: "Audit: Structural integrity check on 3D assets" },
  { id: 8, action: "Ingestion: LESRO 2026 Price List Update" },
  { id: 9, action: "Validation: Detecting duplicate SKUs" },
  { id: 10, action: "Sync: Publishing to live Servex ecosystem" },
  { id: 11, action: "Routing: Cognitive routing of incoming request" },
  { id: 12, action: "Vector Search: Finding semantic matches in index" },
  { id: 13, action: "Execution: Dispatching tool call to ERP" },
  { id: 14, action: "Validation: Verifying payload integrity" },
  { id: 15, action: "Generation: Synthesizing response via LLM" },
  { id: 16, action: "Orchestration: Coordinating multi-agent swarm" },
  { id: 17, action: "Memory: Storing context in episodic memory" },
  { id: 18, action: "Auth: Zero-trust token validation" },
  { id: 19, action: "Network: Scaling nodes for traffic spike" },
  { id: 20, action: "Audit: End-to-end trace completed" }
];

function AuditTaskCards() {
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (visibleCount < AUDIT_TASKS.length) {
      timeoutId = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 700); // New card every 0.7 seconds for much faster scrolling
    } else {
      timeoutId = setTimeout(() => {
        setVisibleCount(6); // Reset
      }, 2000); 
    }

    return () => clearTimeout(timeoutId);
  }, [visibleCount]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {AUDIT_TASKS.map((task, index) => {
        const hasBeenAdded = index < visibleCount;
        const isScrolledOut = index < visibleCount - 6;
        const isCurrentlyVisible = hasBeenAdded && !isScrolledOut;
        
        return (
          <div key={task.id} style={{
            display: 'grid',
            gridTemplateRows: isCurrentlyVisible ? '1fr' : '0fr',
            opacity: isCurrentlyVisible ? (index === visibleCount - 6 || index === visibleCount - 1 ? 0.35 : 1) : 0,
            marginBottom: isCurrentlyVisible ? '12px' : '0px',
            transform: isCurrentlyVisible 
              ? 'translateY(0) scale(1)' 
              : (hasBeenAdded ? 'translateY(-30px) scale(0.95)' : 'translateY(30px) scale(0.95)'),
            transition: 'grid-template-rows 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, margin-bottom 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease',
            width: '100%',
            filter: isCurrentlyVisible && (index === visibleCount - 6 || index === visibleCount - 1) ? 'blur(1.5px)' : 'blur(0px)',
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div style={{ fontSize: '13px', color: '#111111', fontWeight: 500, lineHeight: 1.4 }}>
                  {task.action}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DocsMenu() {
  const router = useRouter();
  
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '360px', marginTop: '32px' }}>
      <div 
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          borderRadius: '12px 12px 0 0',
          backgroundColor: '#111111',
          color: '#ffffff',
          border: '1px solid #111111',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          Explore the Case Study
        </span>
      </div>

      <div style={{
        width: '100%',
        backgroundColor: 'transparent',
        border: '1px solid rgba(0,0,0,0.1)',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        boxShadow: '0 12px 24px rgba(0,0,0,0.05)',
        zIndex: 20
      }}>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          <button onClick={() => router.push('/Solutions')} style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }} onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              The SERVEX Initiative
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </div>
            <div style={{ fontSize: '13px', color: '#86868b', lineHeight: 1.5 }}>
              Dive into our most radical project yet. Discover how we built a fully autonomous AI ecosystem capable of executing complex workflows in real-time.
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default function HomeTaskAuditSection() {
  
  return (
    <section className="mobile-audit-section" style={{ width: '100%', minHeight: '80vh', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 700px) {
          .responsive-solutions-width {
            width: 92vw !important;
          }
          .mobile-stack {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 0 16px !important;
          }
          .mobile-stack .docs-menu-container {
            margin: 32px auto 0 !important;
          }
          .mobile-audit-section {
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 80px !important;
            height: auto !important;
          }
          .mobile-console-wrapper {
            justify-content: flex-start !important;
            width: 100% !important;
            min-height: 800px !important;
            padding-bottom: 40px !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {/* Console Section (Floating without Card) */}
        <div className="mobile-stack" style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
          
          <div className="mobile-console-wrapper" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'flex-start' }}>
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
              <AuditTaskCards />
            </div>
          </div>
          
          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Inside Our Most Radical Project
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              Witness the autonomous architecture that redefined an entire operational ecosystem. We engineered a fully independent AI system for Servex—capable of processing infinite data, making real-time cognitive decisions, and executing workflows without human intervention. 
            </p>
            
            <div className="docs-menu-container">
              <DocsMenu />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
