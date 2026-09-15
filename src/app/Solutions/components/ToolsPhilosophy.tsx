'use client';

import React from 'react';

export default function ToolsPhilosophy() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 20px 160px 20px' }}>
      <style>{`
        .phil-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #000000 0%, #434345 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          text-align: center;
          line-height: 1.1;
        }

        .phil-text {
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          color: #555555;
          font-weight: 300;
          line-height: 1.6;
          max-width: 600px;
          text-align: center;
          margin: 0 auto 60px auto;
        }

        .flow-container {
          background-color: #ffffff;
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 24px;
          padding: 60px;
          width: 100%;
          max-width: 800px;
          font-family: monospace;
          color: #111111;
          font-size: 14px;
          line-height: 1.8;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .flow-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .flow-node {
          padding: 12px 24px;
          background-color: #f5f5f7;
          border-radius: 8px;
          font-weight: 600;
          margin: 8px 0;
          min-width: 120px;
          text-align: center;
        }

        .flow-action {
          color: #86868b;
          font-style: italic;
          margin: 8px 0;
          font-size: 13px;
        }

        .flow-arrow {
          color: #d2d2d7;
          font-size: 16px;
        }

        .tools-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: #f5f5f7;
          padding: 24px 32px;
          border-radius: 12px;
          margin: 16px 0;
          gap: 12px;
        }

        .tool-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tool-dot {
          width: 6px;
          height: 6px;
          background-color: #111111;
          border-radius: 50%;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 80px;
          max-width: 700px;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .summary-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: center;
          padding: 32px;
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 16px;
        }
        
        .summary-key {
          font-weight: 600;
          color: #111111;
          font-size: 16px;
        }

        .summary-val {
          color: #86868b;
          font-size: 15px;
          font-weight: 300;
        }
      `}</style>

      <div className="glynne-label" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: '#1d1d1f', marginBottom: '24px', textTransform: 'uppercase' }}>
        The Philosophy
      </div>

      <h2 className="phil-title">
        Intelligence without execution<br/>is just conversation.
      </h2>
      <p className="phil-text">
        We reserve a fundamental category that is not simply a technology, but the philosophy of our ecosystem: <strong>TOOLS</strong>. This is where the connection between intelligence and real operation happens.
      </p>

      <div className="flow-container">
        <div className="flow-col">
          <div className="flow-node">MODEL</div>
          
          <div className="flow-arrow">│</div>
          <div className="flow-action">decides</div>
          <div className="flow-arrow">↓</div>
          
          <div className="flow-node">AGENT</div>
          
          <div className="flow-arrow">│</div>
          <div className="flow-action">selects</div>
          <div className="flow-arrow">↓</div>
          
          <div className="flow-node" style={{ backgroundColor: '#111111', color: '#ffffff' }}>TOOL</div>
          
          <div className="tools-list">
            <div className="tool-item"><div className="tool-dot"></div> Query database</div>
            <div className="tool-item"><div className="tool-dot"></div> Call API</div>
            <div className="tool-item"><div className="tool-dot"></div> Process document</div>
            <div className="tool-item"><div className="tool-dot"></div> Execute workflow</div>
            <div className="tool-item"><div className="tool-dot"></div> Search information</div>
            <div className="tool-item"><div className="tool-dot"></div> Trigger service</div>
          </div>
          
          <div className="flow-arrow">│</div>
          <div className="flow-arrow">↓</div>
          
          <div className="flow-node" style={{ backgroundColor: 'transparent', border: '1px solid #111111' }}>RESULT</div>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-item">
          <div className="summary-key">The model</div>
          <div className="summary-val">reasons.</div>
        </div>
        <div className="summary-item">
          <div className="summary-key">The agent</div>
          <div className="summary-val">coordinates.</div>
        </div>
        <div className="summary-item">
          <div className="summary-key">The tool</div>
          <div className="summary-val">executes.</div>
        </div>
        <div className="summary-item">
          <div className="summary-key">The system</div>
          <div className="summary-val">verifies.</div>
        </div>
      </div>

    </div>
  );
}
