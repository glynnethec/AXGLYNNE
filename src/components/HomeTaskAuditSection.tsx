'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

const AUDIT_TASKS = [
  { id: 1, action: "Problem: Ingesting high-volume manufacturing catalog" },
  { id: 2, action: "Constraint: Zero margin for pricing discrepancy in ERP" },
  { id: 3, action: "Policy: GLYNNE zero-trust token & permission check" },
  { id: 4, action: "Architecture: Bounding agent to catalog:write scope" },
  { id: 5, action: "AI Reasoning: Semantic matching for missing 3D geometry" },
  { id: 6, action: "Execution: Transactional commit to Servex ERP" },
  { id: 7, action: "Traceability: Immutable event append to audit log" },
  { id: 8, action: "Problem: LESRO 2026 Price List schema migration" },
  { id: 9, action: "Constraint: Detecting duplicate SKUs before write" },
  { id: 10, action: "AI Filter: Inspecting payload against security rules" },
  { id: 11, action: "Execution: Real-time matrix transformation for CET" },
  { id: 12, action: "Result: 100% auditable workflow execution completed" }
];

function AuditTaskCards() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '320px', // Fixed height prevents layout jumps
      overflow: 'hidden', // Only visual animation
      position: 'relative',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent 100%)',
      pointerEvents: 'none' // Not interactive
    }}>
      <style>{`
        @keyframes verticalScrollCards {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        animation: 'verticalScrollCards 30s linear infinite',
      }}>
        {/* Render twice for infinite seamless scroll */}
        {[...AUDIT_TASKS, ...AUDIT_TASKS].map((task, index) => (
          <div key={`${task.id}-${index}`} style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.02)',
            fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ fontSize: '13px', color: isDark ? '#ffffff' : '#111111', fontWeight: 500, lineHeight: 1.4 }}>
              {task.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocsMenu() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
          backgroundColor: isDark ? '#ffffff' : '#111111',
          color: isDark ? '#000000' : '#ffffff',
          border: isDark ? '1px solid #ffffff' : '1px solid #111111',
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
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        boxShadow: isDark ? '0 12px 24px rgba(0,0,0,0.4)' : '0 12px 24px rgba(0,0,0,0.05)',
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
          }} onMouseOver={e => { e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#ffffff' : '#111111', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              The SERVEX Initiative
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#ffffff" : "#111111"} strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </div>
            <div style={{ fontSize: '13px', color: isDark ? '#a1a1aa' : '#86868b', lineHeight: 1.5 }}>
              Read how GLYNNE's control layer orchestrated autonomous catalog ingestion and ERP sync with zero margin for error.
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default function HomeTaskAuditSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="mobile-audit-section" style={{ width: '100%', minHeight: 'auto', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', position: 'relative', zIndex: 10 }}>
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
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 0 !important;
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
            display: none !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {/* Console Section (Floating without Card) */}
        <div className="mobile-stack" style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>

          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: isDark ? '#ffffff' : '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Case Study: The Servex Autonomous Ecosystem
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: isDark ? '#a1a1aa' : '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              Evidence of governed autonomy in production: We engineered an independent AI orchestration system for Servex—capable of processing high-volume product catalogs, resolving schema anomalies, and executing real-time ERP updates with 100% auditability.
            </p>

            <div className="docs-menu-container">
              <DocsMenu />
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
              color: isDark ? '#ffffff' : '#333333',
              overflowX: 'auto',
              textAlign: 'left',
              border: 'none'
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : '#e5e5e5' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : '#e5e5e5' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : '#e5e5e5' }} />
              </div>
              <AuditTaskCards />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
