'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import PanelFooter from './PanelFooter';
import LiquidOrb from '@/app/AX_chat/components/LiquidOrb';
import './AssemblyDashboard.css';

type HoverStep = {
  id: number;
  cx: number;
  cy: number;
  neighbors: { dx: number; dy: number; opacity: number }[];
};

export default function AssemblyDashboard() {
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);
  const [rotZ, setRotZ] = useState(0);
  
  const [brightness, setBrightness] = useState(80);
  const [shadowDensity, setShadowDensity] = useState(60);
  
  const [activeForm, setActiveForm] = useState('cube');
  const [activeTool, setActiveTool] = useState('AX_chat');
  const [isFading, setIsFading] = useState(false);
  const [activeLight, setActiveLight] = useState('Spot');
  const [currentDate, setCurrentDate] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  const platformTools = [
    { name: 'AX_core', desc: 'Central processing and neural routing.', model: 'SYS-CORE v9.4', details: 'Kernel level execution protocols active.' },
    { name: 'AX_chat', desc: 'Intelligent conversational interfaces.', model: 'GPT OSS 120B OpenAI', details: 'High-parameter natural language processing ready.' },
    { name: 'AX_voice', desc: 'Real-time vocal synthesis and analysis.', model: 'VOX-SYNTH V2.0', details: 'Acoustic waveform modulation standing by.' },
    { name: 'AX_vision', desc: 'Advanced image and spatial recognition.', model: 'VISION-NET 4.0', details: 'Spatial point-cloud tracking initialized.' },
    { name: 'AX_data', desc: 'High-speed predictive data modeling.', model: 'DATA-MINER X', details: 'Quantum heuristic pathways open.' },
    { name: 'AX_consol', desc: 'Unified command and control center.', model: 'CMD-CTRL ROOT', details: 'Administrative system privileges granted.' },
  ];

  const [history, setHistory] = useState<HoverStep[]>([]);
  const stepIdRef = useRef(0);
  const lastCellRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    setCurrentDate(`${days[date.getDay()]} \u2014 ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`);
    
    // Fetch Supabase session for mini profile
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserProfile({
          ...data.session.user.user_metadata,
          email: data.session.user.email
        });
      }
    };
    getSession();

    // Prevent white background from showing on scroll bounce
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000';

    // Auto hover animator
    const intervalId = setInterval(() => {
      const cx = Math.floor(Math.random() * 20);
      const cy = Math.floor(Math.random() * 10);
      const numNeighbors = Math.floor(Math.random() * 4) + 1;
      const neighbors: { dx: number; dy: number; opacity: number }[] = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({ dx: shuffled[i][0], dy: shuffled[i][1], opacity: (Math.random() * 0.06) + 0.03 });
      }
      setHistory(prev => [{ id: stepIdRef.current++, cx, cy, neighbors }, ...prev].slice(0, 8));
    }, 1200);

    return () => {
      clearInterval(intervalId);
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 700) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = Math.floor(x / 80);
    const cy = Math.floor(y / 80);

    if (cx !== lastCellRef.current.x || cy !== lastCellRef.current.y) {
      lastCellRef.current = { x: cx, y: cy };
      const numNeighbors = Math.floor(Math.random() * 4) + 1;
      const neighbors: { dx: number; dy: number; opacity: number }[] = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({ dx: shuffled[i][0], dy: shuffled[i][1], opacity: (Math.random() * 0.06) + 0.03 });
      }
      setHistory(prev => [{ id: stepIdRef.current++, cx, cy, neighbors }, ...prev].slice(0, 8));
    }
  };

  const handleMouseLeave = () => {
    setHistory([]);
    lastCellRef.current = { x: -1, y: -1 };
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', width: '100%' }}>
      <div className="md-container" style={{ '--brightness-filter': `brightness(${0.5 + brightness / 100})` } as React.CSSProperties}
           onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      
      {/* Dynamic Background Perspective Grid Wrapper */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div className="md-bg-grid">
          <style>{`
            @keyframes cellFadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
          `}</style>
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            <defs>
              <pattern id="floor-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-grid)" />
            {history.map((step, index) => {
              const isCurrent = index === 0;
              return (
                <g key={step.id} style={{ animation: 'cellFadeIn 0.8s ease forwards' }}>
                  {step.neighbors.map((n, i) => (
                    <rect key={i} x={(step.cx + n.dx) * 80} y={(step.cy + n.dy) * 80} width="80" height="80" 
                          fill={`rgba(255,255,255,${isCurrent ? n.opacity : 0})`} style={{ transition: 'fill 1s ease' }} />
                  ))}
                  <rect x={step.cx * 80} y={step.cy * 80} width="80" height="80" 
                        fill={`rgba(255,255,255,${isCurrent ? 0.08 : 0})`} style={{ transition: 'fill 1s ease' }} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Independent Panel Header */}
      <div className="md-panel-header">
        <div className="md-panel-header-logo">
          <img src="/logos/GLYNNE.svg" alt="GLYNNE" />
        </div>
        <div className="md-panel-header-title">INTERACT WITH AI SYSTEMS</div>
      </div>

      {/* Main Layout */}
      <div className="md-main">
        {/* Left Sidebar */}
        <div className="md-left">
          
          {/* Detailed Profile Card */}
          {userProfile ? (
            <div className="md-profile-card">
              <div className="md-profile-banner">
                <div className="md-date-overlay">{currentDate.split(' 20')[0]}</div>
              </div>
              <div className="md-profile-content">
                {userProfile.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Profile" className="md-profile-avatar-lg" />
                ) : (
                  <div className="md-profile-avatar-placeholder">AX</div>
                )}
                <div className="md-profile-name-lg">{userProfile.full_name || 'AX_user'}</div>
                <div className="md-profile-title">System Architect & Visionary</div>
                <div className="md-profile-email-lg">{userProfile.email}</div>
                
                <div className="md-profile-quote">
                  "Building the future, one node at a time. The system is living, and you are its architect."
                </div>

                <div className="md-profile-stats">
                  <div className="stat">
                    <span>Access Level</span>
                    <strong>ROOT</strong>
                  </div>
                  <div className="stat">
                    <span>Status</span>
                    <strong style={{color: '#ffffff'}}>ONLINE</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="md-date-placeholder" style={{marginBottom: '40px'}}>
              <div className="md-date">{currentDate.split(' 20')[0] || 'Sat \u2014 19 January'}</div>
              <div className="md-year">{currentDate.split(' ').pop() || '2019'}</div>
            </div>
          )}

          <div className="md-section forms-section">
            <h3 className="md-title">Forms</h3>
            <div className="md-icons-row">
              <button className={`md-icon-btn ${activeForm === 'cube' ? 'active' : ''}`} onClick={() => setActiveForm('cube')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </button>
              <button className={`md-icon-btn ${activeForm === 'sphere' ? 'active' : ''}`} onClick={() => setActiveForm('sphere')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
              </button>
              <button className={`md-icon-btn ${activeForm === 'pyramid' ? 'active' : ''}`} onClick={() => setActiveForm('pyramid')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2L2 20h20L12 2z"></path><path d="M12 2v20"></path><path d="M2 20l10-8 10 8"></path></svg>
              </button>
              <button className={`md-icon-btn ${activeForm === 'cylinder' ? 'active' : ''}`} onClick={() => setActiveForm('cylinder')}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 5v14c0 1.66-4.03 3-9 3s-9-1.34-9-3V5"></path></svg>
              </button>
              <button className="md-icon-btn dots">
                <span>...</span>
              </button>
            </div>
          </div>

          <div className="md-section">
            <h3 className="md-title">Tools</h3>
            <ul className="md-tools-list">
              {platformTools.map(tool => (
                <li key={tool.name} className="md-tool-item">
                  <button 
                    className={`md-tool-btn ${activeTool === tool.name && !isFading ? 'active' : ''}`} 
                    onClick={() => {
                      if (activeTool === tool.name || isFading) return;
                      setIsFading(true);
                      
                      // Add a random 120 degree rotation on all axes for a fluid spin effect
                      setRotX(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                      setRotY(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                      setRotZ(prev => prev + (Math.random() > 0.5 ? 120 : -120));

                      setTimeout(() => {
                        setActiveTool(tool.name);
                        setIsFading(false);
                      }, 400); // Wait for the vanish animation to complete
                    }}
                  >
                    <span className="md-tool-icon">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </span>
                    {tool.name}
                  </button>
                  <div className={`md-tool-accordion ${activeTool === tool.name && !isFading ? 'expanded' : ''}`}>
                    <div className="md-tool-accordion-content">
                      <div className="md-tool-input-group">
                        <label className="md-branding-title">AXGLYNNE <span>//</span> AI SYSTEM</label>
                        <div className="md-smoke-box">
                          <div className="md-smoke-particle"></div>
                          <div className="md-smoke-particle p2"></div>
                          <div className="md-smoke-particle p3"></div>
                          <div className="md-smoke-text">AWAITING DIRECTIVE...</div>
                        </div>
                        <label style={{ marginTop: '8px' }}>Payload / Directive</label>
                        <div className="md-mini-card">
                          <div className="md-mini-card-row">
                            <span>MODEL</span>
                            <span>{tool.model}</span>
                          </div>
                          <div className="md-mini-card-row">
                            <span>STATUS</span>
                            <span className="md-highlight">AWAITING</span>
                          </div>
                          <div className="md-mini-card-row">
                            <span>LATENCY</span>
                            <span>12ms</span>
                          </div>
                          <div className="md-mini-card-row">
                            <span>ENCRYPTION</span>
                            <span>AES-256</span>
                          </div>
                          <div className="md-mini-card-desc">
                            {tool.details}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="md-center">
          
          <div className={`md-info-card ${isFading ? 'fading-out' : 'fading-in'}`}>
            <div className="info-title">{platformTools.find(t => t.name === activeTool)?.name}</div>
            <div className="info-desc">{platformTools.find(t => t.name === activeTool)?.desc}</div>
            <Link href={`/${activeTool}`} className="md-start-btn">
              Start <span>&rarr;</span>
            </Link>
          </div>

          <div className="md-3d-scene">
            {/* Liquid Orb (Replacing abstract wireframe) */}
            <div className="md-sphere" style={{ overflow: 'visible', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '400px', height: '400px', transform: 'scale(1.2)' }}>
                <LiquidOrb 
                  theme="dark" 
                  customRotX={rotX} 
                  customRotY={rotY} 
                  customRotZ={rotZ} 
                />
              </div>
            </div>

            <div className="md-shadow" style={{ 
              opacity: shadowDensity / 100, 
              transform: `translateY(200px) rotateX(75deg) rotateZ(${-rotY}deg)` 
            }}></div>
          </div>

          <div className="md-rotation-track">
            <div className="md-rotation-circle"></div>
            <div className="md-rotation-marker" style={{ transform: `translateX(-50%) rotate(${rotY}deg)` }}>
              <div className="md-marker-line"></div>
            </div>
          </div>
          
          <div className="md-rotation-value">
            <span className="label">Rotation Y</span>
            <span className="value">{Math.round(Math.abs(rotY % 360))}°</span>
          </div>
          

        </div>

        {/* Right Sidebar */}
        <div className="md-right">
          <div className="md-window-controls">
            <span>&mdash;</span>
            <span style={{ fontSize: '16px' }}>&#x2715;</span>
          </div>

          <div className="md-section">
            <h3 className="md-title">Lightning</h3>
            <div className="md-lighting-grid">
              <a href="https://axglynne.com" target="_blank" rel="noopener noreferrer" className={`md-light-btn ${activeLight === 'Spot' ? 'active' : ''}`} onClick={() => setActiveLight('Spot')}>
                <div className="icon-wrapper black"><div className="spot-icon"></div></div>
                <span className="light-label">Spot</span>
                <span className="light-subtext">Visita nuestra landing page</span>
              </a>
              <a href="https://axglynne.com/About" target="_blank" rel="noopener noreferrer" className={`md-light-btn ${activeLight === 'Area' ? 'active' : ''}`} onClick={() => setActiveLight('Area')}>
                <div className="icon-wrapper dotted"><div className="area-icon"></div></div>
                <span className="light-label">Area</span>
                <span className="light-subtext">Conoce en qué se especializa GLYNNE</span>
              </a>
              <a href="https://axglynne.com/Solutions" target="_blank" rel="noopener noreferrer" className={`md-light-btn ${activeLight === 'Target' ? 'active' : ''}`} onClick={() => setActiveLight('Target')}>
                <div className="icon-wrapper"><div className="target-icon">&#x2199;</div></div>
                <span className="light-label">Target</span>
                <span className="light-subtext">Mira cómo modernizamos tu empresa con GLYNNE</span>
              </a>
              <a href="https://axglynne.com/terms-of-service" target="_blank" rel="noopener noreferrer" className={`md-light-btn ${activeLight === 'Sun' ? 'active' : ''}`} onClick={() => setActiveLight('Sun')}>
                <div className="icon-wrapper"><div className="sun-icon"></div></div>
                <span className="light-label">Sun</span>
                <span className="light-subtext">Conoce nuestros términos de servicio</span>
              </a>
            </div>
          </div>

          <div className="md-section">
            <h3 className="md-title">System Console</h3>
            <div className="md-terminal">
              <div className="md-term-header">
                <div className="term-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="term-title">AX_SYS_LOG</span>
              </div>
              <div className="md-term-body">
                <p><span className="prompt">{'>'}</span> SYSTEM_BOOT_SEQ_INITIALIZED</p>
                <p><span className="prompt">{'>'}</span> NEURAL_NETWORK: <span className="text-green">ONLINE</span></p>
                <p><span className="prompt">{'>'}</span> ENCRYPTION: AES-256 SECURED</p>
                <p><span className="prompt">{'>'}</span> STATUS: <span className="text-green">ACTIVE</span></p>
                <p><span className="prompt">{'>'}</span> AWAITING_DIRECTIVES<span className="cursor-blink">_</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Bottom Layout */}
        <div className="md-bottom">
          <div className="md-logo">
            <img src="/logos/GLYNNE.svg" alt="GLYNNE" />
          </div>
          <div className="md-page-number">01</div>
        </div>
      </div>

      {/* Global Panel Footer (Temporarily Removed) */}
      {/* 
      <div style={{ background: '#000', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <PanelFooter />
        </div>
      </div> 
      */}
    </div>
  );
}
