'use client';

import React from 'react';

export default function SecurityHero() {
  return (
    <section style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      padding: '120px 20px 60px 20px',
      backgroundColor: 'transparent'
    }}>
      {/* SECTION 01: HERO */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 120px auto'
      }}>
        {/* Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f5f5f7',
          borderRadius: '999px',
          padding: '6px 16px',
          marginBottom: '32px'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111111' }}></div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Security / AI Control
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          margin: '0 0 24px 0'
        }}>
          AI shouldn't have access to everything.
        </h1>

        {/* Text */}
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#86868b',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 0 64px 0',
          maxWidth: '680px'
        }}>
          Integrating artificial intelligence into an enterprise doesn't mean granting it full access to your data, systems, and operations. It means building an architecture capable of determining exactly what information it can receive, what systems it can query, and what actions it can execute.
        </p>

        {/* Visual: AI -> GLYNNE -> Enterprise */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* AI Block */}
          <div style={{
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '16px',
            padding: '24px',
            backgroundColor: '#ffffff',
            width: '240px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 12px 0' }}>AI MODEL</h3>
            <div style={{ fontSize: '12px', color: '#86868b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>Reasoning</span>
              <span>Decisions</span>
            </div>
          </div>

          {/* Arrow Down */}
          <div style={{ height: '40px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '8px 0' }}></div>

          {/* GLYNNE Block */}
          <div style={{
            border: '1px solid #111111',
            borderRadius: '24px',
            padding: '32px',
            backgroundColor: '#111111',
            color: '#ffffff',
            width: '320px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 24px 0', letterSpacing: '0.05em' }}>GLYNNE</h3>
            <div style={{ fontSize: '12px', color: '#a1a1a6', display: 'flex', flexDirection: 'column', gap: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Context</span><span>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Access</span><span>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Policy</span><span>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tools</span><span>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Validation</span><span>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Audit</span><span>✓</span></div>
            </div>
          </div>

          {/* Arrow Down */}
          <div style={{ height: '40px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '8px 0' }}></div>

          {/* Enterprise Block */}
          <div style={{
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '16px',
            padding: '24px',
            backgroundColor: '#f5f5f7',
            width: '280px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 12px 0' }}>ENTERPRISE</h3>
            <div style={{ fontSize: '12px', color: '#86868b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>DB · ERP · CRM · API</span>
              <span>Files · Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 02: THE PHILOSOPHY */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        padding: '160px 20px',
        backgroundColor: 'transparent',
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 24px 0',
          maxWidth: '900px'
        }}>
          We don't give your data to AI. We give it context.
        </h2>
        
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#86868b',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 0 80px 0',
          maxWidth: '700px'
        }}>
          A model doesn't need to know your entire company to solve a task. GLYNNE determines what information the AI needs, when it can receive it, and for how long it should be available.
        </p>

        {/* Visual Comparison */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '80px',
          width: '100%',
          maxWidth: '900px',
          marginBottom: '120px'
        }}>
          {/* Without Control */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#111', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Without Control</span>
            <div style={{ padding: '12px 24px', border: '1px dashed #111', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>AI</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', backgroundColor: '#f5f5f7', borderRadius: '8px', fontSize: '14px', color: '#ff3b30' }}>ALL DATA</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', backgroundColor: '#f5f5f7', borderRadius: '8px', fontSize: '14px', color: '#ff3b30' }}>ALL SYSTEMS</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', backgroundColor: '#f5f5f7', borderRadius: '8px', fontSize: '14px', color: '#ff3b30' }}>ALL ACTIONS</div>
          </div>

          {/* With GLYNNE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#111', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>With GLYNNE</span>
            <div style={{ padding: '12px 24px', border: '1px solid #111', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>AI</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', backgroundColor: '#f5f5f7', borderRadius: '8px', fontSize: '14px', color: '#34c759' }}>RELEVANT CONTEXT</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', backgroundColor: '#111', color: '#fff', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>GLYNNE CONTROL</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', backgroundColor: '#f5f5f7', borderRadius: '8px', fontSize: '14px', color: '#34c759' }}>AUTHORIZED TOOL</div>
            <div style={{ margin: '8px 0' }}>↓</div>
            <div style={{ padding: '12px 24px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '14px' }}>SYSTEM</div>
          </div>
        </div>

        <h3 style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          Give AI context. Not everything.
        </h3>
      </div>
    </section>
  );
}
