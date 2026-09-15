'use client';

import React from 'react';

export default function SecurityAccess() {
  return (
    <section style={{
      width: '100%',
      padding: '120px 20px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      
      {/* SECTION 05: ACCESS CONTROL */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '160px',
        gap: '60px'
      }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: '#111111',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 24px 0'
          }}>
            Every agent needs exactly the capabilities it needs.
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#86868b',
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0
          }}>
            A financial agent doesn't need access to the entire system. A support agent doesn't need to modify critical configurations. An operational agent can execute certain functions while others require authorization.
          </p>
        </div>
        
        {/* Dashboard Visual */}
        <div style={{ flex: '1.2 1 500px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
            padding: '32px',
            fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
            fontSize: '13px',
            color: '#333'
          }}>
            <div style={{ marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              <span style={{ color: '#888' }}>AGENT: </span><strong style={{ fontSize: '15px' }}>Finance Operator</strong>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>DATABASE</div>
                <div style={{ color: '#34c759' }}>✓ Read</div>
                <div style={{ color: '#ff3b30' }}>✕ Write</div>
              </div>
              
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>CUSTOMER DATA</div>
                <div style={{ color: '#34c759' }}>✓ Read</div>
                <div style={{ color: '#ff3b30' }}>✕ Export</div>
              </div>
              
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>ERP</div>
                <div style={{ color: '#34c759' }}>✓ Query</div>
                <div style={{ color: '#34c759' }}>✓ Create Invoice</div>
                <div style={{ color: '#ff3b30' }}>✕ Delete</div>
              </div>
              
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>PAYMENTS</div>
                <div style={{ color: '#ff3b30' }}>✕ Execute</div>
              </div>
            </div>
            
            <div style={{ 
              marginTop: '32px', 
              padding: '12px', 
              backgroundColor: '#fff9e6', 
              border: '1px solid #ffcc00', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#997a00'
            }}>
              <span style={{ fontWeight: 700 }}>HIGH-RISK ACTIONS</span>
              <span>→ Human approval required</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 06: CONTEXT FIREWALL */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '160px'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 24px 0'
        }}>
          Information needs limits too.
        </h2>

        {/* Visual: Context Firewall */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          margin: '60px 0'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#e5e5e5',
            borderRadius: '8px',
            padding: '24px',
            color: '#888',
            fontFamily: 'monospace',
            textAlign: 'left',
            fontSize: '12px',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}>
            <div style={{ fontWeight: 600, color: '#333', marginBottom: '8px' }}>COMPANY DATA</div>
            ██████████████████████████████████████████<br/>
            ██████████████████████████████████████████<br/>
            ██████████████████████████████████████████<br/>
            ██████████████████████████████████████████<br/>
            ██████████████████████████████████████████
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0', fontSize: '11px', fontWeight: 600, color: '#111', letterSpacing: '0.05em' }}>
            ↓ GLYNNE FILTERING ↓
          </div>
          
          <div style={{
            width: '260px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            textAlign: 'left'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#111' }}>Relevant Context</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '13px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>• Order #4812</li>
              <li>• Customer status</li>
              <li>• Product data</li>
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0', fontSize: '11px', fontWeight: 600, color: '#888', letterSpacing: '0.05em' }}>
            ↓ AI ENGINE ↓
          </div>
        </div>

        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#86868b',
          fontWeight: 300,
          lineHeight: 1.6,
          margin: 0,
          maxWidth: '700px'
        }}>
          AI doesn't need access to all available information. GLYNNE can act as a context firewall that limits what data reaches the model based on the task, the agent, and the defined policies.
        </p>
      </div>

      {/* SECTION 07: CONTROLLED ACTION */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '60px'
      }}>
        {/* Visual */}
        <div style={{ flex: '1.2 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Normal Action */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', width: '100%', maxWidth: '400px' }}>
            <div style={{ flex: '0 0 60px', height: '60px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd', fontSize: '12px', fontWeight: 600 }}>AI</div>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#ddd', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: '#666' }}>"Update Order"</div>
            </div>
            <div style={{ flex: '0 0 160px', backgroundColor: '#111', color: '#fff', borderRadius: '12px', padding: '16px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>GLYNNE CHECKS</div>
              <div style={{ color: '#34c759' }}>✓ Identity</div>
              <div style={{ color: '#34c759' }}>✓ Permission</div>
              <div style={{ color: '#34c759' }}>✓ Policy</div>
              <div style={{ color: '#34c759' }}>✓ Validation</div>
            </div>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#ddd' }}></div>
            <div style={{ flex: '0 0 60px', height: '60px', backgroundColor: '#e5e5ea', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 600 }}>ERP</div>
          </div>

          {/* Risky Action */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
            <div style={{ flex: '0 0 60px', height: '60px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ddd', fontSize: '12px', fontWeight: 600 }}>AI</div>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#ddd', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', color: '#ff3b30' }}>"Refund 5K"</div>
            </div>
            <div style={{ flex: '0 0 160px', backgroundColor: '#111', color: '#fff', borderRadius: '12px', padding: '16px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>GLYNNE CHECKS</div>
              <div style={{ color: '#34c759' }}>✓ Permission</div>
              <div style={{ color: '#34c759' }}>✓ Policy</div>
              <div style={{ color: '#ffcc00' }}>⚠ High Risk</div>
            </div>
            <div style={{ flex: 1, height: '2px', backgroundColor: '#ffcc00', borderStyle: 'dashed' }}></div>
            <div style={{ flex: '0 0 80px', height: '60px', backgroundColor: '#fff9e6', border: '1px solid #ffcc00', color: '#997a00', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', fontWeight: 700, textAlign: 'center', padding: '4px' }}>HUMAN<br/>APPROVAL</div>
          </div>

        </div>

        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: '#111111',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 24px 0'
          }}>
            A decision shouldn't automatically become an action.
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#86868b',
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0
          }}>
            Every operation requested by an AI goes through GLYNNE's filters. If an action is standard, it proceeds to the software layer. If it involves high risk, critical configurations, or touches sensitive limits, the architecture forces a human-in-the-loop approval before executing.
          </p>
        </div>
      </div>

    </section>
  );
}
