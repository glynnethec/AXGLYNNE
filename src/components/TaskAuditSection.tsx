'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AUDIT_TASKS = [
  { id: 1, action: "Ingestion: Catalog WB Manufacturing", status: "COMPLETED", time: "08:14:02 AM", risk: "Low" },
  { id: 2, action: "Validation: Price discrepancies detected", status: "RESOLVED", time: "08:14:05 AM", risk: "Medium" },
  { id: 3, action: "Policy: GLYNNE Access control verified", status: "AUTHORIZED", time: "08:14:08 AM", risk: "Critical" },
  { id: 4, action: "Sync: ERP Database Update", status: "IN PROGRESS", time: "08:14:12 AM", risk: "Low" },
  { id: 5, action: "Transform: Standardizing geometry for CET", status: "COMPLETED", time: "08:14:15 AM", risk: "Medium" },
  { id: 6, action: "Engine: Cognitive match for missing materials", status: "RESOLVED", time: "08:14:18 AM", risk: "Low" },
  { id: 7, action: "Audit: Structural integrity check on 3D assets", status: "COMPLETED", time: "08:14:21 AM", risk: "Critical" },
  { id: 8, action: "Ingestion: LESRO 2026 Price List Update", status: "COMPLETED", time: "08:14:24 AM", risk: "Low" },
  { id: 9, action: "Validation: Detecting duplicate SKUs", status: "RESOLVED", time: "08:14:27 AM", risk: "Medium" },
  { id: 10, action: "Sync: Publishing to live Servex ecosystem", status: "IN PROGRESS", time: "08:14:30 AM", risk: "Low" }
];

function AuditTaskCards() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (visibleCount < AUDIT_TASKS.length) {
      timeoutId = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 1500); // New card every 1.5 seconds
    } else {
      timeoutId = setTimeout(() => {
        setVisibleCount(0);
      }, 4000); // Reset after 4 seconds
    }

    return () => clearTimeout(timeoutId);
  }, [visibleCount]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {AUDIT_TASKS.map((task, index) => {
        const hasBeenAdded = index < visibleCount;
        const isScrolledOut = index < visibleCount - 4;
        const isCurrentlyVisible = hasBeenAdded && !isScrolledOut;
        
        return (
          <div key={task.id} style={{
            display: 'grid',
            gridTemplateRows: isCurrentlyVisible ? '1fr' : '0fr',
            opacity: isCurrentlyVisible ? 1 : 0,
            marginBottom: isCurrentlyVisible ? '16px' : '0px',
            transform: isCurrentlyVisible ? 'translateY(0)' : (hasBeenAdded ? 'translateY(-20px)' : 'translateY(20px)'),
            transition: 'grid-template-rows 0.6s ease, opacity 0.6s ease, margin-bottom 0.6s ease, transform 0.6s ease',
            width: '100%'
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#86868b' }}>{task.time}</span>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 600, 
                    padding: '4px 8px', 
                    borderRadius: '999px',
                    backgroundColor: 'transparent',
                    border: task.status === 'COMPLETED' || task.status === 'AUTHORIZED' || task.status === 'RESOLVED' ? '1px solid #2e7d32' : '1px solid #86868b',
                    color: task.status === 'COMPLETED' || task.status === 'AUTHORIZED' || task.status === 'RESOLVED' ? '#2e7d32' : '#86868b'
                  }}>
                    {task.status}
                  </span>
                </div>
                
                <div style={{ fontSize: '13px', color: '#111111', fontWeight: 500, lineHeight: 1.4 }}>
                  {task.action}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: task.risk === 'Critical' ? '#ff3b30' : task.risk === 'Medium' ? '#ffcc00' : '#34c759' }} />
                  <span style={{ fontSize: '11px', color: '#86868b' }}>Risk: {task.risk}</span>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Explore Technical Specs
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
          
          <a href="https://deepwiki.com/aiservex-us/SERVEX_AI" target="_blank" rel="noreferrer" style={{
            display: 'block',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            textDecoration: 'none',
            transition: 'border 0.2s',
          }} onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'} onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111111', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              Project Architecture
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div style={{ fontSize: '12px', color: '#86868b', lineHeight: 1.5 }}>Where the AI lives. The complete structural design of the Servex project and environmental setups.</div>
          </a>

          <a href="https://app.devin.ai/org/aiservex-us/wiki/aiservex-us/SERVEX_AI_BACK?branch=main" target="_blank" rel="noreferrer" style={{
            display: 'block',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            textDecoration: 'none',
            transition: 'border 0.2s',
          }} onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'} onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111111', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              AI System Logic
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            <div style={{ fontSize: '12px', color: '#86868b', lineHeight: 1.5 }}>Ultra-detailed documentation of the underlying intelligence backend, logic flows, and processing rules.</div>
          </a>

        </div>
      </div>
    </div>
  );
}

export default function TaskAuditSection() {
  const router = useRouter();
  
  return (
    <section style={{ width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {/* Console Section (Floating without Card) */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Autonomous Audit
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              We want you to see exactly how we achieved this. Dive into our comprehensive documentation and discover the step-by-step technology behind this solution that completely redefined Servex's operational ecosystem.
            </p>
            
            <DocsMenu />
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
              <AuditTaskCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
