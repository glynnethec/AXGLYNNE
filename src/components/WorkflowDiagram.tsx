'use client';

import React from 'react';

const columns = [
  { title: "1. Analysis" },
  { title: "2. Strategy" },
  { title: "3. Execution" },
  { title: "4. Transformation" }
];

const nodes = [
  // Col 1
  { id: 1, col: 1, y: 250, title: 'Contextualize', tag: 'Phase 1', status: 'Complete', size: 'Context', desc: 'Define AI boundaries.' },
  { id: 2, col: 1, y: 750, title: 'Permissions', tag: 'Phase 1', status: 'Complete', size: 'Processes', desc: 'Restrict system access.' },
  
  // Col 2
  { id: 3, col: 2, y: 350, title: 'Design Filter', tag: 'Phase 2', status: 'Active', size: 'Opportunities', desc: 'Build the control layer.' },
  { id: 4, col: 2, y: 650, title: 'Security', tag: 'Phase 2', status: 'Active', size: 'System Design', desc: 'Architect safe pipelines.' },

  // Col 3
  { id: 5, col: 3, y: 200, title: 'Rules', tag: 'Phase 3', status: 'Pending', size: 'Roadmap', desc: 'Establish AI conditions.' },
  { id: 6, col: 3, y: 500, title: 'Integration', tag: 'Phase 3', status: 'Pending', size: 'Development', desc: 'Connect enterprise APIs.' },
  { id: 7, col: 3, y: 800, title: 'Traceability', tag: 'Phase 3', status: 'Pending', size: 'Integration', desc: 'Log every AI action.' },

  // Col 4
  { id: 8, col: 4, y: 500, title: 'Governed Autonomy', tag: 'Outcome', status: 'Continuous', size: 'Growth', desc: 'Safe, autonomous AI.', isChart: true }
];

const connections = [
  { from: 1, to: 3, label: 'Insights' },
  { from: 2, to: 3, label: 'Data' },
  { from: 2, to: 4, label: 'Structure' },
  { from: 3, to: 5, label: 'Vision' },
  { from: 3, to: 6, label: 'Specs' },
  { from: 4, to: 6, label: 'Blueprint' },
  { from: 4, to: 7, label: 'Infra' },
  { from: 5, to: 8, label: 'Strategy' },
  { from: 6, to: 8, label: 'Product' },
  { from: 7, to: 8, label: 'Live' }
];

const getPath = (fromCol: number, fromY: number, toCol: number, toY: number) => {
  const x1 = fromCol * 250 - 30;
  const x2 = (toCol - 1) * 250 + 30;
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${x2} ${toY}`;
};

export default function WorkflowDiagram() {
  return (
    <section className="desktop-only-section" style={{
      width: '100%',
      padding: '4rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      backgroundColor: 'transparent'
    }}>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f7',
        borderRadius: '999px',
        padding: '6px 16px',
        marginBottom: '1rem'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111111', marginRight: '8px' }}></div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Integration Architecture</span>
      </div>

      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 400,
        color: '#111111',
        letterSpacing: '-0.02em',
        marginBottom: '4rem',
        textAlign: 'center',
        maxWidth: '700px'
      }}>
        How GLYNNE filters and controls AI integration
      </h2>

      <div className="flow-container" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        height: '800px',
        margin: '0 auto'
      }}>
        
        {/* SVG Connectors Layer */}
        <svg className="desktop-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            const path = getPath(fromNode.col, fromNode.y, toNode.col, toNode.y);
            const x1 = fromNode.col * 250 - 30;
            const x2 = (toNode.col - 1) * 250 + 30;
            const midX = (x1 + x2) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
                <path 
                  d={path} 
                  fill="none" 
                  stroke="#111111" 
                  strokeWidth="3" 
                  strokeDasharray="10 20" 
                  className="animated-flow-line" 
                />
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect x="-22" y="-9" width="44" height="18" rx="9" fill="#111111" />
                  <text x="0" y="2" fill="#ffffff" fontSize="8" fontWeight="600" textAnchor="middle" dominantBaseline="middle">{conn.label}</text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Node Cards */}
        <div className="nodes-layer" style={{ width: '100%', height: '100%', position: 'relative' }}>
          {nodes.map(node => (
            <div key={node.id} className="node-card-wrapper" style={{
              position: 'absolute',
              top: `${node.y / 10}%`,
              left: `${(node.col - 1) * 25}%`,
              width: '25%',
              padding: '0 3%',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}>
              <div className="node-card" style={{
                backgroundColor: 'transparent',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#111', lineHeight: 1.2 }}>{node.title}</h4>
                    <span style={{ fontSize: '9px', color: '#888' }}>{node.desc}</span>
                  </div>
                  <div style={{
                    backgroundColor: 'transparent',
                    color: '#111',
                    border: '1px solid rgba(0,0,0,0.1)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}>
                    {node.tag}
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '6px' }}>
                  <span style={{ color: '#888' }}>Status</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{node.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '4px' }}>
                  <span style={{ color: '#888' }}>Owner</span>
                  <span style={{ fontWeight: 500, color: '#111' }}>AX System</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: '4px' }}>
                  <span style={{ color: '#888' }}>Metric</span>
                  <span style={{ fontWeight: 500, color: '#111' }}>{node.size}</span>
                </div>
                
                {node.isChart ? (
                   <div style={{ marginTop: '12px', height: '30px', position: 'relative', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
                      <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <polyline points="0,35 20,25 40,30 60,10 80,15 100,5" fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
                        <polygon points="0,40 0,35 20,25 40,30 60,10 80,15 100,5 100,40" fill="rgba(0, 0, 0, 0.05)" />
                      </svg>
                   </div>
                ) : (
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
                      <div style={{ height: '3px', width: '85%', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px' }}><div style={{ height: '100%', width: '70%', backgroundColor: '#111', borderRadius: '2px' }}></div></div>
                      <div style={{ height: '3px', width: '95%', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px' }}><div style={{ height: '100%', width: '40%', backgroundColor: '#111', borderRadius: '2px' }}></div></div>
                      <div style={{ height: '3px', width: '70%', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px' }}><div style={{ height: '100%', width: '90%', backgroundColor: '#111', borderRadius: '2px' }}></div></div>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowAnimation {
          to {
            stroke-dashoffset: -30;
          }
        }
        .animated-flow-line {
          animation: flowAnimation 1.5s linear infinite;
        }
        
        @media (max-width: 900px) {
          .desktop-svg, .desktop-bg {
            display: none !important;
          }
          .flow-container {
            height: auto !important;
          }
          .nodes-layer {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .node-card-wrapper {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            transform: none !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 700px) {
          .desktop-only-section {
            display: none !important;
          }
        }
      `}} />
    </section>
  );
}
