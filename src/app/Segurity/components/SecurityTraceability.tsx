'use client';

import React from 'react';

export default function SecurityTraceability() {
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
      borderTop: '1px solid rgba(0,0,0,0.05)'
    }}>
      
      {/* SECTION 08: TRACEABILITY */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '160px',
        gap: '60px'
      }}>
        {/* Visual: Flight Recorder Log */}
        <div style={{ flex: '1.2 1 500px' }}>
          <div style={{
            backgroundColor: '#111111',
            borderRadius: '16px',
            padding: '32px',
            color: '#34c759',
            fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
            fontSize: '13px',
            lineHeight: 1.8,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ color: '#888', marginBottom: '16px' }}>09:42:18</div>
            <div style={{ display: 'flex' }}><div style={{ width: '100px', color: '#888' }}>AGENT</div><div>Finance-01</div></div>
            <div style={{ display: 'flex' }}><div style={{ width: '100px', color: '#888' }}>MODEL</div><div>GPT / Gemini / Llama</div></div>
            <div style={{ display: 'flex' }}><div style={{ width: '100px', color: '#888' }}>CONTEXT</div><div>Invoice #4812</div></div>
            <div style={{ display: 'flex' }}><div style={{ width: '100px', color: '#888' }}>TOOL</div><div>ERP.createInvoice</div></div>
            <div style={{ display: 'flex' }}><div style={{ width: '100px', color: '#888' }}>POLICY</div><div>Finance.Write</div></div>
            <div style={{ display: 'flex', marginTop: '16px' }}><div style={{ width: '100px', color: '#888' }}>STATUS</div><div style={{ color: '#ffcc00' }}>APPROVED</div></div>
            <div style={{ display: 'flex' }}><div style={{ width: '100px', color: '#888' }}>RESULT</div><div>SUCCESS</div></div>
            
            {/* Blinking cursor */}
            <div style={{ marginTop: '16px', width: '8px', height: '14px', backgroundColor: '#34c759', animation: 'console-blink 1s step-end infinite' }}></div>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: '#111111',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 24px 0'
          }}>
            If AI acts, we must know what happened.
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#86868b',
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0
          }}>
            Every critical interaction becomes an operation log: the agent used, the model making the decision, the specific context ingested, the tool selected, the authorization level, the exact action executed, and the final result. Total observability.
          </p>
        </div>
      </div>

      {/* SECTION 09: MODEL INDEPENDENCE */}
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
          The model can change. The architecture remains.
        </h2>
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#86868b',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: '0 0 60px 0',
          maxWidth: '700px'
        }}>
          You can swap OpenAI for Gemini or Llama based on cost, speed, or capabilities. The enterprise architecture remains permanent, protecting your systems regardless of which intelligence engine is operating on top of it.
        </p>

        {/* Visual: Model Independence */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px'
        }}>
          {/* Swappable Models */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#111', backgroundColor: '#fff' }}>OpenAI</div>
            <div style={{ border: '1px solid #111', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#fff', backgroundColor: '#111' }}>Gemini</div>
            <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '12px 24px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#111', backgroundColor: '#fff' }}>Llama</div>
          </div>
          
          <div style={{ height: '30px', width: '2px', backgroundColor: '#111', marginBottom: '24px' }}></div>
          
          {/* GLYNNE Control */}
          <div style={{
            width: '100%',
            backgroundColor: '#111111',
            borderRadius: '16px',
            padding: '24px',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 500,
            letterSpacing: '0.05em',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            GLYNNE CONTROL LAYER
          </div>

          <div style={{ height: '30px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', marginTop: '24px' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px', borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ height: '12px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: '8px' }}></div>
               <div style={{ fontSize: '11px', fontWeight: 600, color: '#888' }}>ERP</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ height: '12px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: '8px' }}></div>
               <div style={{ fontSize: '11px', fontWeight: 600, color: '#888' }}>CRM</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ height: '12px', width: '2px', backgroundColor: 'rgba(0,0,0,0.1)', marginBottom: '8px' }}></div>
               <div style={{ fontSize: '11px', fontWeight: 600, color: '#888' }}>API</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
