'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase, signOut } from '@/lib/supabaseClient';
import { FaSignOutAlt } from 'react-icons/fa';
import { 
  FiMessageSquare, 
  FiMic, 
  FiZap, 
  FiSliders, 
  FiDatabase, 
  FiChevronRight,
  FiChevronLeft,
  FiHome,
  FiInfo,
  FiMail,
  FiArrowUpRight
} from 'react-icons/fi';
import PanelFooter from './PanelFooter';
import LiquidOrb from '@/app/AX_chat/components/LiquidOrb';
import { useTheme } from '@/lib/ThemeContext';
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
  const [activeTool, setActiveTool] = useState('Librarymodel');
  const [isFading, setIsFading] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const platformTools = [
    { 
      num: '001',
      name: 'Librarymodel', 
      label: 'Open-Source Weights Library', 
      tag: 'Mathematical Sovereignty & Offline Deployment',
      badge: '100% SOBERANÍA',
      desc: 'Access and download full mathematical weights of open models (GGUF, FP16, EXL2) for local, offline, and air-gapped deployments. Ensure complete data sovereignty, zero data retention, and enterprise security without relying on external clouds.', 
      model: 'Open-Weights Repository', 
      details: 'Full quantized model weights (GGUF, FP16, EXL2) ready for local inference.',
      metrics: { latency: '<10ms', security: 'Air-Gapped', status: 'Operational' },
      icon: <FiDatabase size={15} />
    },
    { 
      num: '002',
      name: 'Create_you_GLYNNE_model', 
      label: 'Create & Train Your Custom AI Model', 
      tag: 'QLoRA Fine-Tuning & Private Data',
      badge: 'QLORA TUNING',
      desc: 'Train a model on your proprietary enterprise data, shaping its name, personality, and analytical criteria. We provide specialized weight retraining (QLoRA) to align the LLM’s cognitive core with your workflows: greater cost savings, optimized processing, and a tailored intelligent workforce.', 
      model: 'QLoRA / Unsloth Core', 
      details: 'Private model training protocols active.',
      metrics: { latency: 'Batch FP16', security: 'Private VPC', status: 'Ready' },
      icon: <FiSliders size={15} />
    },
    { 
      num: '003',
      name: 'models_provider', 
      label: 'AI Model APIs & Gateway', 
      tag: 'API Provider & Enterprise Gateway',
      badge: 'GATEWAY & SUB-APIS',
      desc: 'If you have an existing project and need seamless, production-ready AI integration, we deliver enterprise LLM APIs engineered to power your operations. Ultra-low latency inference, GPU cluster elasticity, and dedicated Sub-API keys ready to plug directly into your codebase.', 
      model: 'vLLM / NVIDIA NIM Gateway', 
      details: 'Sub-10ms latency streaming and dedicated API key management ready.',
      metrics: { latency: '<10ms / tok', security: 'Sub-API Key', status: 'High Throughput' },
      icon: <FiZap size={15} />
    },
    { 
      num: '004',
      name: 'AX_chat', 
      label: 'Chat with AX · Intelligent Assistant', 
      tag: 'Cognitive Conversational Core',
      badge: 'FRONTIER REASONING',
      desc: 'Connect instantly with GLYNNE’s conversational engine. Solve complex inquiries, analyze enterprise data, and generate code or strategic blueprints in real-time powered by frontier reasoning and multimodal vision models.', 
      model: 'GPT OSS 120B OpenAI', 
      details: 'High-parameter natural language processing ready.',
      metrics: { latency: 'Real-Time', security: 'Encrypted', status: 'Connected' },
      icon: <FiMessageSquare size={15} />
    },
    { 
      num: '005',
      name: 'AX_voice', 
      label: 'AX Voice · Real-Time Voice Synthesis', 
      tag: 'Neural Acoustic Modulation',
      badge: 'VOX SYNTHESIS',
      desc: 'Experience ultra-natural, zero-latency voice conversations powered by artificial intelligence. Instant acoustic modulation and real-time comprehension built for contact centers, executive assistants, and next-generation voice interfaces.', 
      model: 'VOX-SYNTH V2.0', 
      details: 'Acoustic waveform modulation standing by.',
      metrics: { latency: '<50ms Audio', security: 'Full Duplex', status: 'Streaming' },
      icon: <FiMic size={15} />
    },
  ];

  // External navigation links that open in a new tab without altering the orb
  const externalLinks = [
    {
      num: '006',
      title: 'Home · Main Portal',
      badge: 'ROOT ROUTE',
      href: '/',
      desc: 'Explore our core platform, homepage, and comprehensive overview of AX GLYNNE services.',
      icon: <FiHome size={14} />
    },
    {
      num: '007',
      title: 'About · Company',
      badge: 'ARCHITECTURE',
      href: '/About',
      desc: 'Discover our architecture, technological mission, and the visionary team engineering GLYNNE.',
      icon: <FiInfo size={14} />
    },
    {
      num: '008',
      title: 'Contact · Solutions',
      badge: 'SOLUTIONS',
      href: '/contact',
      desc: 'Connect directly with our systems engineers and architects for deployments, custom quotes, and integrations.',
      icon: <FiMail size={14} />
    }
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

    // Sync body background color with active theme
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = theme === 'light' ? '#f8f9fc' : '#0b0b0d';

    // Handle resize for mobile layout
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    handleResize();
    window.addEventListener('resize', handleResize);

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
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  const currentToolData = platformTools.find(t => t.name === activeTool);

  const renderCenterCanvas = () => (
    <div className="md-center">
      <div className={`md-info-card ${isFading ? 'fading-out' : 'fading-in'}`}>
        <div className="md-info-header-meta">
          <span className="md-info-num">{currentToolData?.num || '001'}</span>
          <span className="md-info-status-pill">
            <span className="md-info-pulse-dot"></span>
            CLUSTER ACTIVE
          </span>
          <span className="md-info-divider-slash">/</span>
          <div className="info-title">{currentToolData?.label}</div>
        </div>
        <Link href={`/${activeTool}`} className="md-start-btn">
          <span>DEPLOY ENGINE</span>
          <span className="md-start-btn-arrow">&rarr;</span>
        </Link>
      </div>

      <div className="md-3d-scene">
        <div className="md-sphere" style={{ overflow: 'visible', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', height: '400px', transform: 'scale(1.12)' }}>
            <LiquidOrb theme={theme} wireframe={theme === 'light'} customRotX={rotX} customRotY={rotY} customRotZ={rotZ} />
          </div>
        </div>
        <div className="md-shadow" style={{ opacity: shadowDensity / 100, transform: `translateY(200px) rotateX(75deg) rotateZ(${-rotY}deg)` }}></div>
      </div>

      <div className="md-rotation-track">
        <div className="md-rotation-circle"></div>
        <div className="md-rotation-marker" style={{ transform: `translateX(-50%) rotate(${rotY}deg)` }}>
          <div className="md-marker-line"></div>
        </div>
      </div>

      {/* Explicación comercial y técnica de la infraestructura debajo de la esfera */}
      {currentToolData?.desc && (
        <div className={`md-orb-explanation ${isFading ? 'fading-out' : 'fading-in'}`}>
          <div className="md-orb-explanation-top">
            <div className="md-orb-meta-left">
              <span className="md-orb-spec-num">{currentToolData?.num || '001'}</span>
              <span className="md-orb-spec-category">// INFRASTRUCTURE SPECIFICATION</span>
            </div>
            {currentToolData.badge && (
              <span className="md-orb-badge">{currentToolData.badge}</span>
            )}
          </div>
          {currentToolData.tag && (
            <div className="md-orb-title-row">
              <span className="md-orb-explanation-tag">{currentToolData.tag}</span>
            </div>
          )}
          <p className="md-orb-explanation-text">
            {currentToolData.desc}
          </p>
          <div className="md-orb-metrics-bar">
            <div className="md-orb-metric-item">
              <span className="md-orb-metric-label">LATENCY</span>
              <span className="md-orb-metric-val">{currentToolData?.metrics?.latency || '<10MS'}</span>
            </div>
            <div className="md-orb-metric-item">
              <span className="md-orb-metric-label">SECURITY</span>
              <span className="md-orb-metric-val">{currentToolData?.metrics?.security || 'AIR-GAPPED'}</span>
            </div>
            <div className="md-orb-metric-item">
              <span className="md-orb-metric-label">ENGINE</span>
              <span className="md-orb-metric-val">{currentToolData?.model}</span>
            </div>
            <div className="md-orb-metric-item">
              <span className="md-orb-metric-label">STATUS</span>
              <span className="md-orb-metric-val md-orb-status-live">● OPERATIONAL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
    <div data-theme={theme} style={{ background: theme === 'light' ? '#f5f5f7' : '#000', minHeight: '100vh', width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
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
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={theme === 'light' ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.04)'} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-grid)" />
            {history.map((step, index) => {
              const isCurrent = index === 0;
              const cellColor = theme === 'light' ? '15, 23, 42' : '255, 255, 255';
              const opacityScale = theme === 'light' ? 5 : 1;
              return (
                <g key={step.id} style={{ animation: 'cellFadeIn 0.8s ease forwards' }}>
                  {step.neighbors.map((n, i) => (
                    <rect key={i} x={(step.cx + n.dx) * 80} y={(step.cy + n.dy) * 80} width="80" height="80" 
                          fill={`rgba(${cellColor},${isCurrent ? n.opacity * opacityScale : 0})`} style={{ transition: 'fill 1s ease' }} />
                  ))}
                  <rect x={step.cx * 80} y={step.cy * 80} width="80" height="80" 
                        fill={`rgba(${cellColor},${isCurrent ? 0.08 * opacityScale : 0})`} style={{ transition: 'fill 1s ease' }} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Main Layout */}
      <div className="md-main">
        {/* Left Sidebar (Collapsible in width 'w', constant 'h') */}
        <div className={`md-left ${isSidebarOpen ? 'is-expanded' : 'is-collapsed'}`}>
          {/* Top Toggle Bar */}
          <div className="md-sidebar-toggle-bar">
            {isSidebarOpen && (
              <div className="md-sidebar-brand-group">
                <span className="md-sidebar-brand">AX INFRASTRUCTURE</span>
                <span className="md-sidebar-status-tag">
                  <span className="md-status-pulse"></span>
                  ONLINE
                </span>
              </div>
            )}
            <button 
              type="button" 
              className="md-sidebar-toggle-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? <FiChevronLeft size={15} /> : <FiChevronRight size={15} />}
            </button>
          </div>

          {/* VISTA CERRADA EN W (Rail compacto de iconos coherentes, altura constante) */}
          {!isSidebarOpen ? (
            <>
              {/* Mini Profile Indicator */}
              <div 
                className="md-profile-mini" 
                title={`${userProfile?.full_name || 'AX_user'} · ${userProfile?.email || 'Authenticated'}`}
              >
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Profile" className="md-profile-avatar-sm" />
                ) : (
                  <div className="md-profile-avatar-placeholder-sm">AX</div>
                )}
                <span className="md-status-dot"></span>
              </div>

              {/* Tools Icon Rail */}
              <div className="md-tools-rail">
                {platformTools.map(tool => (
                  <button 
                    key={tool.name}
                    className={`md-tool-rail-btn ${activeTool === tool.name && !isFading ? 'active' : ''}`}
                    onClick={() => {
                      if (activeTool === tool.name) {
                        window.location.href = `/${tool.name}`;
                        return;
                      }
                      if (isFading) return;
                      setIsFading(true);
                      setRotX(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                      setRotY(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                      setRotZ(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                      setTimeout(() => {
                        setActiveTool(tool.name);
                        setIsFading(false);
                      }, 400);
                    }}
                    title={`[${tool.num}] ${tool.label} — ${tool.desc}`}
                  >
                    <span className="md-rail-num">{tool.num.replace('00', '0')}</span>
                    <span className="md-tool-icon">{tool.icon}</span>
                  </button>
                ))}

                {/* Separador sutil para los 3 botones de navegación externa */}
                <div className="md-rail-nav-separator"></div>

                {/* 3 Botones de navegación externa (nueva pestaña, no alteran orb) */}
                {externalLinks.map(link => (
                  <a
                    key={link.title}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md-ext-rail-btn"
                    title={`[${link.num}] ${link.title} — ${link.desc}`}
                  >
                    <span className="md-ext-rail-icon">{link.icon}</span>
                    <span className="md-ext-rail-indicator">↗</span>
                  </a>
                ))}
              </div>

              {/* Bottom Rail Sign Out */}
              <div className="md-sidebar-bottom-rail">
                <button 
                  onClick={() => setShowLogoutModal(true)} 
                  className="md-rail-signout-btn" 
                  title="Sign out"
                >
                  <FaSignOutAlt size={12} />
                </button>
              </div>
            </>
          ) : (
            /* VISTA ABIERTA EN W (Contenido completo como actualmente se ve) */
            <div className="md-sidebar-expanded-content">
              {/* Compact Profile Card (Solo foto, nombre y botones) */}
              <div className="md-profile-card">
                <div className="md-profile-compact">
                  <div className="md-profile-user-info">
                    {userProfile?.avatar_url ? (
                      <img src={userProfile.avatar_url} alt="Profile" className="md-profile-avatar-compact" />
                    ) : (
                      <div className="md-profile-avatar-placeholder-compact">AX</div>
                    )}
                    <div className="md-profile-text-group">
                      <span className="md-profile-name-compact">
                        {userProfile?.full_name || 'AX_user'}
                      </span>
                      <span className="md-profile-role-badge">OPERATOR // SECURE</span>
                    </div>
                  </div>
                  <div className="md-profile-actions">
                    <button
                      onClick={toggleTheme}
                      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                      className="md-theme-toggle-btn"
                    >
                      {theme === 'dark' ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      )}
                      <span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
                    </button>
                    <button 
                      onClick={() => setShowLogoutModal(true)}
                      className="md-signout-btn"
                      title="Sign out"
                    >
                      <FaSignOutAlt size={10} />
                      <span>EXIT</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Tools Section */}
              <div className="md-section">
                <div className="md-section-header">
                  <h3 className="md-title">
                    Infrastructure Engines
                  </h3>
                  <span className="md-section-badge">[05 UNITS]</span>
                </div>
                <p className="md-tools-desc">
                  Select an enterprise AI workload to reorient the cognitive core or deploy dedicated model infrastructure.
                </p>
                <ul className="md-tools-list">
                  {platformTools.map(tool => (
                    <li key={tool.name} className="md-tool-item">
                      <button 
                        className={`md-tool-btn ${activeTool === tool.name && !isFading ? 'active' : ''}`} 
                        onClick={() => {
                          if (activeTool === tool.name) {
                            window.location.href = `/${tool.name}`;
                            return;
                          }
                          if (isFading) return;
                          setIsFading(true);
                          setRotX(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                          setRotY(prev => prev + (Math.random() > 0.5 ? 120 : -120));
                          setRotZ(prev => prev + (Math.random() > 0.5 ? 120 : -120));

                          setTimeout(() => {
                            setActiveTool(tool.name);
                            setIsFading(false);
                          }, 400);
                        }}
                      >
                        <div className="md-tool-btn-left">
                          <span className="md-tool-num">{tool.num}</span>
                          <span className="md-tool-icon">
                            {tool.icon}
                          </span>
                          <div className="md-tool-content-group">
                            <span className="md-tool-label">{tool.label}</span>
                            <span className="md-tool-badge-pill">{tool.badge}</span>
                          </div>
                        </div>
                        <span className="md-tool-arrow-indicator">&rarr;</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External Navigation Section (Home, About, Contact) */}
              <div className="md-ext-section">
                <div className="md-ext-header">
                  <span className="md-ext-title">
                    Network Routing
                  </span>
                  <span className="md-ext-badge">[03 ROUTES] ↗</span>
                </div>
                <div className="md-ext-list">
                  {externalLinks.map(link => (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="md-ext-card-btn"
                    >
                      <div className="md-ext-card-top">
                        <div className="md-ext-card-title-group">
                          <span className="md-ext-num">{link.num}</span>
                          <span className="md-ext-icon">{link.icon}</span>
                          <span className="md-ext-name">{link.title}</span>
                        </div>
                        <span className="md-ext-badge-pill">{link.badge}</span>
                        <FiArrowUpRight size={13} className="md-ext-arrow" />
                      </div>
                      <p className="md-ext-desc">{link.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center Canvas */}
        {!isMobile && renderCenterCanvas()}

      </div>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="md-logout-overlay">
          <div className="md-logout-modal">
            <div className="md-modal-header-tag">// SECURITY DISCONNECT PROTOCOL</div>
            <h3>System Disconnect</h3>
            <p>Are you sure you want to log out and terminate this secure session?</p>
            <div className="md-logout-actions">
              <button className="md-btn-cancel" onClick={() => setShowLogoutModal(false)}>CANCEL</button>
              <button className="md-btn-confirm" onClick={async () => {
                await signOut();
                window.location.href = '/';
              }}>CONFIRM DISCONNECT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
