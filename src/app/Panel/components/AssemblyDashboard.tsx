'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import PanelFooter from './PanelFooter';
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
    { name: 'AX_core', desc: 'Central processing and neural routing.' },
    { name: 'AX_chat', desc: 'Intelligent conversational interfaces.' },
    { name: 'AX_voice', desc: 'Real-time vocal synthesis and analysis.' },
    { name: 'AX_vision', desc: 'Advanced image and spatial recognition.' },
    { name: 'AX_data', desc: 'High-speed predictive data modeling.' },
    { name: 'AX_consol', desc: 'Unified command and control center.' },
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

    // Auto hover animator
    const intervalId = setInterval(() => {
      const cx = Math.floor(Math.random() * 20);
      const cy = Math.floor(Math.random() * 10);
      const numNeighbors = Math.floor(Math.random() * 4) + 1;
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({ dx: shuffled[i][0], dy: shuffled[i][1], opacity: (Math.random() * 0.06) + 0.03 });
      }
      setHistory(prev => [{ id: stepIdRef.current++, cx, cy, neighbors }, ...prev].slice(0, 8));
    }, 1200);

    return () => clearInterval(intervalId);
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
      const neighbors = [];
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
    <>
      <div className="md-container" style={{ '--brightness-filter': `brightness(${0.5 + brightness / 100})` } as React.CSSProperties}
           onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      
      {/* Dynamic Background Perspective Grid */}
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
                <li key={tool.name}>
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
            {/* Outer Sphere */}
            <div className="md-sphere" style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)` }}>
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
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
          
          <div className="md-gizmo">
            <div className="axis axis-y"><span>Y</span></div>
            <div className="axis axis-x"><span>X</span></div>
            <div className="axis axis-z"><span>Z</span></div>
            <div className="center"></div>
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
              <button className={`md-light-btn ${activeLight === 'Spot' ? 'active' : ''}`} onClick={() => setActiveLight('Spot')}>
                <div className="icon-wrapper black"><div className="spot-icon"></div></div>
                <span className="light-label">Spot</span>
              </button>
              <button className={`md-light-btn ${activeLight === 'Area' ? 'active' : ''}`} onClick={() => setActiveLight('Area')}>
                <div className="icon-wrapper dotted"><div className="area-icon"></div></div>
                <span className="light-label">Area</span>
              </button>
              <button className={`md-light-btn ${activeLight === 'Target' ? 'active' : ''}`} onClick={() => setActiveLight('Target')}>
                <div className="icon-wrapper"><div className="target-icon">&#x2199;</div></div>
                <span className="light-label">Target</span>
              </button>
              <button className={`md-light-btn ${activeLight === 'Sun' ? 'active' : ''}`} onClick={() => setActiveLight('Sun')}>
                <div className="icon-wrapper"><div className="sun-icon"></div></div>
                <span className="light-label">Sun</span>
              </button>
            </div>
          </div>

          <div className="md-section control-slider">
            <h3 className="md-title">Rotation Y</h3>
            <input 
              type="range" 
              min="0" max="360" 
              value={Math.round(Math.abs(rotY % 360))} 
              onChange={(e) => setRotY(Number(e.target.value))}
              className="md-slider"
              style={{ '--val': `${(Math.round(Math.abs(rotY % 360))/360)*100}%` } as React.CSSProperties}
            />
          </div>

          <div className="md-section control-slider">
            <h3 className="md-title">Brightness</h3>
            <input 
              type="range" 
              min="0" max="100" 
              value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="md-slider"
              style={{ '--val': `${brightness}%` } as React.CSSProperties}
            />
          </div>

          <div className="md-section control-slider">
            <h3 className="md-title">Shadow Density</h3>
            <input 
              type="range" 
              min="0" max="100" 
              value={shadowDensity} 
              onChange={(e) => setShadowDensity(Number(e.target.value))}
              className="md-slider"
              style={{ '--val': `${shadowDensity}%` } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

        {/* Bottom Layout */}
        <div className="md-bottom">
          <div className="md-logo">
            END<br/>IS<br/><span>UI.</span>
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
    </>
  );
}
