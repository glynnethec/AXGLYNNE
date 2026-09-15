'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveSystemDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayers, setActiveLayers] = useState({
    app: false,
    backend: false,
    data: false,
    models: false,
    agents: false,
    tools: false,
    online: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Sequence the animations
          setTimeout(() => setActiveLayers(prev => ({ ...prev, app: true })), 300);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, backend: true })), 1000);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, data: true })), 1700);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, models: true })), 2400);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, agents: true })), 3100);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, tools: true })), 3800);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, online: true })), 4500);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px', minHeight: '800px' }}>
      <style>{`
        .sys-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: monospace;
          gap: 24px;
        }
        
        .sys-block {
          width: 280px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 16px;
          background: #ffffff;
          text-align: center;
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease;
        }

        .sys-block.active {
          opacity: 1;
          transform: translateY(0);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .sys-block.online {
          border-color: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }

        .sys-title {
          font-size: 14px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 8px;
        }

        .sys-desc {
          font-size: 12px;
          color: #86868b;
        }

        .sys-line {
          width: 1px;
          height: 30px;
          background-color: rgba(0,0,0,0.1);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .sys-line.active {
          opacity: 1;
        }

        .sys-line.online {
          background-color: rgba(0,0,0,0.3);
        }

        /* Flowing particles for online state */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #111111;
          border-radius: 50%;
          opacity: 0;
          z-index: 3;
        }
        
        @keyframes flowDown {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }

        .particle.animate {
          animation: flowDown 1.5s infinite linear;
        }
        
        .models-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          width: 100%;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.6s ease;
        }

        .models-row.active {
          opacity: 1;
          transform: scale(1);
        }

        .model-node {
          padding: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          font-size: 11px;
          color: #111111;
          font-weight: 600;
          background: #ffffff;
        }

        .status-badge {
          margin-top: 60px;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          opacity: 0;
          transition: all 0.6s ease;
          background: #f5f5f7;
          color: #86868b;
        }

        .status-badge.online {
          opacity: 1;
          background: #111111;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
      `}</style>

      <h2 style={{ 
        fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', 
        fontWeight: 900, 
        background: 'linear-gradient(135deg, #000000 0%, #434345 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '80px', 
        letterSpacing: '-0.02em',
        lineHeight: 1.1
      }}>
        GLYNNE SYSTEM
      </h2>

      <div className="sys-container">
        
        {/* Application */}
        <div className={`sys-block ${activeLayers.app ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}>
          <div className="sys-title">NEXT.JS / REACT</div>
          <div className="sys-desc">APPLICATION</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={`sys-line ${activeLayers.app ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}></div>
          {activeLayers.online && <div className="particle animate" style={{ left: '-1.5px', top: 0 }}></div>}
        </div>

        {/* Backend */}
        <div className={`sys-block ${activeLayers.backend ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}>
          <div className="sys-title">PYTHON / FASTAPI</div>
          <div className="sys-desc">BACKEND SERVICES</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={`sys-line ${activeLayers.backend ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}></div>
          {activeLayers.online && <div className="particle animate" style={{ left: '-1.5px', top: 0, animationDelay: '0.5s' }}></div>}
        </div>

        {/* Data */}
        <div className={`sys-block ${activeLayers.data ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}>
          <div className="sys-title">POSTGRESQL / REDIS</div>
          <div className="sys-desc">DATA & MEMORY</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={`sys-line ${activeLayers.data ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}></div>
          {activeLayers.online && <div className="particle animate" style={{ left: '-1.5px', top: 0, animationDelay: '1s' }}></div>}
        </div>

        {/* Agents */}
        <div className={`sys-block ${activeLayers.agents ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}>
          <div className="sys-title">LANGGRAPH / CREWAI</div>
          <div className="sys-desc">AGENTS & LOGIC</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={`sys-line ${activeLayers.agents ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}></div>
          {activeLayers.online && <div className="particle animate" style={{ left: '-1.5px', top: 0, animationDelay: '0.2s' }}></div>}
        </div>

        {/* Models */}
        <div className={`models-row ${activeLayers.models ? 'active' : ''}`}>
          <div className="model-node">OPENAI</div>
          <div className="model-node">GEMINI</div>
          <div className="model-node">LLAMA</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={`sys-line ${activeLayers.models ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}></div>
          {activeLayers.online && <div className="particle animate" style={{ left: '-1.5px', top: 0, animationDelay: '0.7s' }}></div>}
        </div>

        {/* Tools */}
        <div className={`sys-block ${activeLayers.tools ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}>
          <div className="sys-title">APIs & SERVICES</div>
          <div className="sys-desc">TOOLS</div>
        </div>

        {/* Status */}
        <div className={`status-badge ${activeLayers.online ? 'online' : ''}`}>
          {activeLayers.online ? '● SYSTEM ONLINE' : 'INITIALIZING...'}
        </div>

      </div>
    </div>
  );
}
