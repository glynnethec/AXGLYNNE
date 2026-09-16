'use client';

import React, { useState, useEffect } from 'react';
import './AssemblyDashboard.css';

export default function AssemblyDashboard() {
  const [rotation, setRotation] = useState(35);
  const [brightness, setBrightness] = useState(80);
  const [shadowDensity, setShadowDensity] = useState(60);
  
  const [activeForm, setActiveForm] = useState('cube');
  const [activeTool, setActiveTool] = useState('AX_chat');
  const [activeLight, setActiveLight] = useState('Spot');
  const [currentDate, setCurrentDate] = useState('');

  const platformTools = [
    { name: 'AX_core', angle: 0 },
    { name: 'AX_chat', angle: 45 },
    { name: 'AX_voice', angle: 120 },
    { name: 'AX_vision', angle: 210 },
    { name: 'AX_data', angle: 280 },
    { name: 'AX_consol', angle: 330 },
  ];

  useEffect(() => {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    setCurrentDate(`${days[date.getDay()]} \u2014 ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`);
  }, []);

  return (
    <div className="md-container" style={{ '--brightness-filter': `brightness(${0.5 + brightness / 100})` } as React.CSSProperties}>
      
      {/* Dynamic Background Perspective Grid */}
      <div className="md-bg-grid"></div>

      {/* Top Header */}
      <div className="md-header">
        <div className="md-date">{currentDate.split(' 20')[0] || 'Sat \u2014 19 January'}</div>
        <div className="md-year">{currentDate.split(' ').pop() || '2019'}</div>
      </div>

      <div className="md-main">
        {/* Left Sidebar */}
        <div className="md-left">
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
                    className={`md-tool-btn ${activeTool === tool.name ? 'active' : ''}`} 
                    onClick={() => {
                      setActiveTool(tool.name);
                      setRotation(tool.angle);
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
          <div className="md-3d-scene">
            <div className="md-cube" style={{ transform: `rotateX(-20deg) rotateY(${rotation}deg)` }}>
              <div className="face front"></div>
              <div className="face back"></div>
              <div className="face right"></div>
              <div className="face left"></div>
              <div className="face top"></div>
              <div className="face bottom"></div>
            </div>
            <div className="md-shadow" style={{ 
              opacity: shadowDensity / 100, 
              transform: `translateY(120px) rotateX(75deg) rotateZ(${-rotation}deg)` 
            }}></div>
          </div>

          <div className="md-rotation-track">
            <div className="md-rotation-circle"></div>
            <div className="md-rotation-marker" style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}>
              <div className="md-marker-line"></div>
            </div>
          </div>
          
          <div className="md-rotation-value">
            <span className="label">Rotation</span>
            <span className="value">{rotation}°</span>
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
            <h3 className="md-title">Rotation</h3>
            <input 
              type="range" 
              min="0" max="360" 
              value={rotation} 
              onChange={(e) => setRotation(Number(e.target.value))}
              className="md-slider"
              style={{ '--val': `${(rotation/360)*100}%` } as React.CSSProperties}
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
          END<br/>IS<br/>UI<span>.</span>
        </div>
        <div className="md-page-number">013</div>
      </div>
    </div>
  );
}
