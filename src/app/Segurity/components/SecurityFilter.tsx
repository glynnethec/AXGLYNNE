'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SecurityFilter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayers, setActiveLayers] = useState({
    center: false,
    m1: false,
    m2: false,
    m3: false,
    m4: false,
    m5: false,
    m6: false,
    online: false
  });

  const modules = [
    { id: '01', title: 'Context', desc: 'What information it can receive.' },
    { id: '02', title: 'Identity', desc: 'Who or what agent is making the request.' },
    { id: '03', title: 'Access', desc: 'Which systems it can access.' },
    { id: '04', title: 'Policy', desc: 'What rules it must follow.' },
    { id: '05', title: 'Action', desc: 'What operations it can execute.' },
    { id: '06', title: 'Audit', desc: 'What occurred during the operation.' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => setActiveLayers(prev => ({ ...prev, center: true })), 300);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, m1: true, m2: true, m3: true, m4: true, m5: true, m6: true })), 1000);
          setTimeout(() => setActiveLayers(prev => ({ ...prev, online: true })), 1700);
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
    <section ref={containerRef} style={{
      width: '100%',
      padding: '120px 20px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        .filter-sys-block {
          width: 200px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 16px;
          background: #ffffff;
          text-align: center;
          position: absolute;
          z-index: 3;
          font-family: monospace;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease;
        }

        .filter-sys-block.active {
          opacity: 1;
          transform: translateY(0) translate(-50%, -50%);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .filter-sys-block.online {
          border-color: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
        }

        .filter-sys-title {
          font-size: 14px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .filter-sys-desc {
          font-size: 12px;
          color: #86868b;
        }

        .filter-sys-number {
          font-size: 10px;
          color: #86868b;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        .center-node {
          position: absolute;
          width: 140px;
          height: 140px;
          background-color: #111111;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 18px;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 2;
          font-family: monospace;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease;
        }

        .center-node.active {
          opacity: 1;
          transform: scale(1);
        }

        .center-node.online {
          box-shadow: 0 0 30px rgba(17,17,17,0.4);
        }

        .filter-line {
          stroke: rgba(0,0,0,0.1);
          stroke-width: 1;
          stroke-dasharray: 4;
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .filter-line.active {
          opacity: 1;
        }

        .filter-line.online {
          stroke: rgba(0,0,0,0.3);
        }
      `}</style>

      <div style={{
        maxWidth: '1000px',
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
          margin: '0 0 80px 0',
          maxWidth: '800px'
        }}>
          A filter between intelligence and the enterprise.
        </h2>

        {/* GLYNNE Architecture Diagram */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          height: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto'
        }}>
          {/* Connecting Lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
             {/* Center coords are roughly 400, 300 */}
             <circle cx="400" cy="300" r="180" fill="none" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
             {/* Lines to center */}
             <line x1="400" y1="80" x2="400" y2="300" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
             <line x1="400" y1="520" x2="400" y2="300" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
             <line x1="120" y1="200" x2="400" y2="300" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
             <line x1="680" y1="200" x2="400" y2="300" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
             <line x1="120" y1="400" x2="400" y2="300" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
             <line x1="680" y1="400" x2="400" y2="300" className={`filter-line ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} />
          </svg>

          {/* Center GLYNNE Node */}
          <div className={`center-node ${activeLayers.center ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`}>
            GLYNNE
          </div>

          {/* Orbiting Modules */}
          <div className={`filter-sys-block ${activeLayers.m1 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} style={{ top: '10%', left: '50%' }}>
            <span className="filter-sys-number">{modules[0].id}</span>
            <div className="filter-sys-title">{modules[0].title}</div>
            <div className="filter-sys-desc">{modules[0].desc}</div>
          </div>

          <div className={`filter-sys-block ${activeLayers.m2 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} style={{ top: '30%', left: '15%' }}>
            <span className="filter-sys-number">{modules[1].id}</span>
            <div className="filter-sys-title">{modules[1].title}</div>
            <div className="filter-sys-desc">{modules[1].desc}</div>
          </div>

          <div className={`filter-sys-block ${activeLayers.m3 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} style={{ top: '30%', left: '85%' }}>
            <span className="filter-sys-number">{modules[2].id}</span>
            <div className="filter-sys-title">{modules[2].title}</div>
            <div className="filter-sys-desc">{modules[2].desc}</div>
          </div>

          <div className={`filter-sys-block ${activeLayers.m4 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} style={{ top: '70%', left: '15%' }}>
            <span className="filter-sys-number">{modules[3].id}</span>
            <div className="filter-sys-title">{modules[3].title}</div>
            <div className="filter-sys-desc">{modules[3].desc}</div>
          </div>

          <div className={`filter-sys-block ${activeLayers.m5 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} style={{ top: '70%', left: '85%' }}>
            <span className="filter-sys-number">{modules[4].id}</span>
            <div className="filter-sys-title">{modules[4].title}</div>
            <div className="filter-sys-desc">{modules[4].desc}</div>
          </div>

          <div className={`filter-sys-block ${activeLayers.m6 ? 'active' : ''} ${activeLayers.online ? 'online' : ''}`} style={{ top: '90%', left: '50%' }}>
            <span className="filter-sys-number">{modules[5].id}</span>
            <div className="filter-sys-title">{modules[5].title}</div>
            <div className="filter-sys-desc">{modules[5].desc}</div>
          </div>

        </div>

      </div>
    </section>
  );
}
