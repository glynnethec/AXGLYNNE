'use client';

import React from 'react';

const nodes = [
  // LEVEL 1
  { 
    id: 2, x: 20, y: 12, 
    title: 'DATA', tag: '02', 
    status: 'Asset generation', size: 'Knowledge', 
    desc: 'The system connects the information a company already generates and organizes it into usable, accessible knowledge.',
    customHtml: 'Databases · Documents · Records'
  },
  { 
    id: 3, x: 50, y: 12, 
    title: 'MODELS', tag: '03', 
    status: 'Reasoning capacity', size: 'Cognitive', 
    desc: 'Models analyze information, recognize patterns and generate reasoning that allows the system to respond to context.',
    customHtml: 'Scikit-learn · PyTorch'
  },
  { 
    id: 8, x: 80, y: 12, 
    title: 'SYSTEMS', tag: '08', 
    status: 'Operational core', size: 'Software', 
    desc: 'Intelligence connects with the software where the business already operates: its applications and platforms.',
    customHtml: 'Internal software · Microservices'
  },

  // LEVEL 2
  { 
    id: 4, x: 35, y: 32, 
    title: 'KNOWLEDGE', tag: '04', 
    status: 'Contextual awareness', size: 'Context', 
    desc: 'Business information is transformed into context the system can understand and use when making decisions.',
    customHtml: 'Business rules · Internal systems'
  },
  { 
    id: 5, x: 65, y: 32, 
    title: 'AGENTS', tag: '05', 
    status: 'Task delegation', size: 'Operators', 
    desc: 'Specialized systems that understand a task, evaluate its context and decide what needs to happen.',
    customHtml: 'Context · Memory · Instructions',
    isAgent: true
  },

  // LEVEL 3
  { 
    id: 6, x: 18, y: 60, 
    title: 'TOOLS', tag: '06', 
    status: 'Action interfaces', size: 'Action', 
    desc: 'An agent becomes useful when it can act. Tools allow it to retrieve information and execute real operations.',
    customHtml: 'Webhooks · Search · External services',
    isTool: true
  },

  // LEVEL 3 CONTINUED
  { 
    id: 7, x: 50, y: 60, 
    title: 'ORCHESTRATION', tag: '07', 
    status: 'Workflow management', size: 'Coordination', 
    desc: 'When a process involves multiple agents and actions, orchestration defines what happens, when, and what comes next.',
    customHtml: 'Agents · Services · Tools · Events',
    isOrchestrator: true
  },

  // LEVEL 3 CONTINUED
  { 
    id: 9, x: 82, y: 60, 
    title: 'RUNTIME', tag: '09', 
    status: 'Continuous operation', size: 'Execution', 
    desc: 'The architecture comes alive when an event triggers the system. Each component performs its role.',
    isRuntime: true
  }
];

const connections = [
  { from: 2, to: 3, label: 'Context' },
  { from: 2, to: 4, label: 'Parse' },
  { from: 8, to: 4, label: 'State' },
  { from: 3, to: 5, label: 'Reasoning' },
  { from: 4, to: 5, label: 'Inform' },
  { from: 8, to: 5, label: 'Trigger' },
  { from: 5, to: 6, label: 'Invoke' },
  { from: 6, to: 7, label: 'Result' },
  { from: 7, to: 9, label: 'Cycle' },
];

const getPath = (fromX: number, fromY: number, toX: number, toY: number) => {
  const midY = (fromY + toY) / 2;
  return `M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`;
};

export default function FlowDiagram() {
  return (
    <section style={{
      width: '100%',
      padding: '8rem 2rem 0 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      backgroundColor: 'transparent'
    }}>
      

      <div className="flow-container" style={{
        position: 'relative',
        width: '80vw',
        maxWidth: '1400px',
        height: '1150px',
        margin: '6rem auto 0 auto'
      }}>

        {/* SVG Connectors Layer */}
        <svg className="desktop-svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            const path = getPath(fromNode.x, fromNode.y, toNode.x, toNode.y);
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.15" />
                <path 
                  d={path} 
                  fill="none" 
                  stroke="#111111" 
                  strokeWidth="0.25" 
                  strokeDasharray="1 2" 
                  className="animated-flow-line" 
                />
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect x="-3" y="-0.4" width="6" height="0.8" rx="0.4" fill="#111111" />
                  <text x="0" y="0.05" fill="#ffffff" fontSize="0.4" fontWeight="600" letterSpacing="0.02em" textAnchor="middle" dominantBaseline="middle">{conn.label}</text>
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
              top: `${node.y}%`,
              left: `${node.x}%`,
              width: '320px',
              marginLeft: '-160px',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}>
              <div className="node-card" style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.04)'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.transform = 'translateY(-6px)'; 
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.08)';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.04)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#111', lineHeight: 1.2 }}>{node.title}</h4>
                    <span style={{ fontSize: '9px', color: '#888', display: 'block', marginTop: '2px', lineHeight: 1.4 }}>{node.desc}</span>
                  </div>
                  <div style={{
                    backgroundColor: 'transparent',
                    color: '#111',
                    border: '1px solid rgba(0,0,0,0.1)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    marginLeft: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    {node.tag}
                  </div>
                </div>

                {node.customHtml && (
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '6px 8px', borderRadius: '8px', fontSize: '9px', fontWeight: 600, color: '#555', textAlign: 'center', marginBottom: '12px', marginTop: '8px' }}>
                    {node.customHtml}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <span style={{ color: '#888' }}>{node.status}</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{node.size}</span>
                </div>

                {/* --- CUSTOM SUB-CHARTS --- */}
                
                {node.isAgent && (
                  <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: '12px', letterSpacing: '0.05em' }}>SPECIALIZED SUB-AGENTS</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', padding: '8px', borderRadius: '8px', textAlign: 'center', fontSize: '9px', fontWeight: 600 }}>FINANCE</div>
                      <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', padding: '8px', borderRadius: '8px', textAlign: 'center', fontSize: '9px', fontWeight: 600 }}>SUPPORT</div>
                      <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', padding: '8px', borderRadius: '8px', textAlign: 'center', fontSize: '9px', fontWeight: 600 }}>OPERATIONS</div>
                    </div>
                  </div>
                )}

                {node.isTool && (
                  <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#111', textAlign: 'center', marginBottom: '8px' }}>Tools turn decisions into operations</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '12px' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '4px' }}>QUERY</span>
                         <span style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>Database</span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '4px' }}>CONNECT</span>
                         <span style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>API</span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <span style={{ fontSize: '9px', fontWeight: 600, marginTop: '4px' }}>EXECUTE</span>
                         <span style={{ fontSize: '8px', color: '#888', marginTop: '2px' }}>Service</span>
                      </div>
                    </div>
                  </div>
                )}

                {node.isOrchestrator && (
                  <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ backgroundColor: '#111', color: '#fff', fontSize: '9px', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>EVENT</div>
                     <div style={{ width: '2px', height: '12px', backgroundColor: '#111' }}></div>
                     <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', fontSize: '9px', padding: '6px 12px', borderRadius: '4px', fontWeight: 700, width: '100%', textAlign: 'center' }}>ORCHESTRATOR</div>
                     <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '12px' }}>
                       <span style={{ fontSize: '9px', fontWeight: 600 }}>AGENT</span>
                       <span style={{ fontSize: '9px', fontWeight: 600 }}>TOOL</span>
                       <span style={{ fontSize: '9px', fontWeight: 600 }}>SERVICE</span>
                     </div>
                  </div>
                )}

                {node.isRuntime && (
                  <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#111', borderRadius: '12px', color: '#fff' }}>
                     <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '12px', letterSpacing: '0.05em' }}>EXECUTION CYCLE</div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ff88'}}></div><span style={{fontSize: '11px', fontWeight: 500}}>Event received</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ff88'}}></div><span style={{fontSize: '11px', fontWeight: 500}}>Context assembled</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ff88'}}></div><span style={{fontSize: '11px', fontWeight: 500}}>Agent reasoning</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ff88'}}></div><span style={{fontSize: '11px', fontWeight: 500}}>Action executed</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#00ff88'}}></div><span style={{fontSize: '11px', fontWeight: 500}}>Result verified ↺</span></div>
                     </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowAnimation {
          to { stroke-dashoffset: -30; }
        }
        .animated-flow-line {
          animation: flowAnimation 6s linear infinite;
        }
        
        @media (max-width: 900px) {
          .desktop-svg { display: none !important; }
          .flow-container {
            width: 100% !important;
            height: auto !important;
            margin-top: 2rem !important;
          }
          .nodes-layer {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .node-card-wrapper {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            max-width: 400px !important;
            margin: 0 auto !important;
            transform: none !important;
          }
        }
      `}} />
    </section>
  );
}
