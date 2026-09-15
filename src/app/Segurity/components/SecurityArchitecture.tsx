'use client';

import React from 'react';

export default function SecurityArchitecture() {
  return (
    <section style={{
      width: '100%',
      padding: '120px 20px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 24px 0'
        }}>
          AI decides. Software executes.
        </h2>

        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#86868b',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 0 80px 0',
          maxWidth: '700px'
        }}>
          We separate reasoning from execution so intelligence can operate real systems without making the model an absolute authority over them.
        </p>

        {/* The 3 Blocks Flow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '24px'
        }}>

          {/* Block 1: INTELLIGENCE */}
          <div style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 500, margin: '0 0 12px 0', color: '#111' }}>INTELLIGENCE</h3>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#86868b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Understand · Reason · Decide · Orchestrate
            </p>
            <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.6, margin: 0 }}>
              AI interprets information, understands intent, and determines what should happen.
            </p>
          </div>

          <div style={{ color: 'rgba(0,0,0,0.2)' }}>↓</div>

          {/* Block 2: GLYNNE CONTROL */}
          <div style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#111111',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 500, margin: '0 0 12px 0', color: '#ffffff' }}>GLYNNE CONTROL</h3>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#a1a1a6', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Context · Permissions · Policies · Validation · Observability
            </p>
            <p style={{ fontSize: '15px', color: '#f5f5f7', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
              GLYNNE determines if that decision can become an action and under what conditions.
            </p>
          </div>

          <div style={{ color: 'rgba(0,0,0,0.2)' }}>↓</div>

          {/* Block 3: SOFTWARE */}
          <div style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#f5f5f7',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: '24px',
            padding: '40px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 500, margin: '0 0 12px 0', color: '#111' }}>SOFTWARE</h3>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#86868b', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Calculate · Validate · Transform · Execute
            </p>
            <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.6, margin: 0 }}>
              Specialized software performs deterministic operations and applies business rules.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
