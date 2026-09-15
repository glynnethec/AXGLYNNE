'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SecurityClosing() {
  const router = useRouter();

  return (
    <section style={{
      width: '100%',
      padding: '160px 20px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      
      {/* SECTION 11: THE PROPOSITION */}
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '160px'
      }}>
        
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#86868b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
          GLYNNE / AI SYSTEMS ARCHITECTURE
        </span>

        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          margin: '0 0 24px 0'
        }}>
          We don't build AI to access your enterprise.
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: '#111111',
          fontWeight: 300,
          lineHeight: 1.4,
          margin: '0 0 80px 0',
          maxWidth: '800px'
        }}>
          We build the infrastructure that allows AI to safely operate within it.
        </p>

        {/* Equation Visual */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          fontFamily: 'monospace, ui-monospace',
          fontSize: '14px',
          fontWeight: 600,
          color: '#111',
          letterSpacing: '0.05em'
        }}>
          <div style={{ padding: '12px 24px', border: '1px solid #111', borderRadius: '8px' }}>INTELLIGENCE</div>
          <div style={{ color: '#888' }}>+</div>
          <div style={{ padding: '12px 24px', backgroundColor: '#111', color: '#fff', borderRadius: '8px' }}>CONTROL</div>
          <div style={{ color: '#888' }}>+</div>
          <div style={{ padding: '12px 24px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}>SOFTWARE</div>
          <div style={{ color: '#888' }}>+</div>
          <div style={{ padding: '12px 24px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}>DATA</div>
          <div style={{ color: '#111', fontSize: '20px' }}>=</div>
          <div style={{ padding: '12px 24px', backgroundColor: '#f5f5f7', borderRadius: '8px', color: '#34c759' }}>AI SYSTEMS</div>
        </div>

      </div>

      {/* SECTION 12: CLOSING */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '80px',
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}>
        
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 32px 0'
        }}>
          Integrate intelligence. Maintain control.
        </h2>

        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#86868b',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 0 60px 0'
        }}>
          The next generation of software won't just be software with artificial intelligence. It will be infrastructure where models, agents, data, tools, and enterprise systems work together under a common control architecture.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: 400,
          color: '#111111',
          marginBottom: '60px'
        }}>
          <div>Intelligence to decide.</div>
          <div>Software to execute.</div>
          <div style={{ fontWeight: 600 }}>GLYNNE to control.</div>
        </div>

        <button 
          onClick={() => router.push('/contact')}
          style={{
            padding: '16px 32px',
            borderRadius: '999px',
            backgroundColor: '#111111',
            color: '#ffffff',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Build your AI architecture →
        </button>

      </div>
    </section>
  );
}
