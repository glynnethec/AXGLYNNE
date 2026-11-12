'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/supabaseClient';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  FiMessageSquare,
  FiMic,
  FiZap,
  FiSliders,
  FiDatabase,
  FiHome,
  FiInfo,
  FiMail,
  FiArrowRight,
  FiArrowUpRight,
  FiMoreHorizontal,
  FiSun,
  FiMoon,
  FiDisc,
  FiX
} from 'react-icons/fi';
import LiquidOrb from '@/app/AX_chat/components/LiquidOrb';
import Topography from './Topography';
import { useTheme } from '@/lib/ThemeContext';
import './AssemblyDashboard.css';

type MainTab = 'tools' | 'orb' | 'routes';
type ToolFilter = 'all' | 'engines' | 'conversational';

interface PlatformTool {
  num: string;
  name: string;
  shortTitle: string;
  label: string;
  tag: string;
  category: 'engines' | 'conversational';
  badge: string;
  desc: string;
  model: string;
  details: string;
  metrics: {
    latency: string;
    security: string;
    status: string;
  };
  icon: React.ReactNode;
}

const TOPO_VARIANTS: Record<
  string,
  {
    direction: 'forward' | 'backward' | 'left' | 'right';
    tilt: number;
    scale: number;
    elevation: number;
    foreground: number;
    offsetTransform: string;
  }
> = {
  Librarymodel: {
    direction: 'left',
    tilt: 90,
    scale: 1.25,
    elevation: 0.75,
    foreground: 0.3,
    offsetTransform: 'translate(-6%, 4%) scale(1.12)'
  },
  Create_you_GLYNNE_model: {
    direction: 'right',
    tilt: 56,
    scale: 1.05,
    elevation: 0.95,
    foreground: 0.18,
    offsetTransform: 'translate(8%, -6%) scale(1.16)'
  },
  models_provider: {
    direction: 'forward',
    tilt: 72,
    scale: 1.4,
    elevation: 0.65,
    foreground: 0.42,
    offsetTransform: 'translate(0%, 10%) scale(1.18)'
  },
  AX_chat: {
    direction: 'backward',
    tilt: 42,
    scale: 0.95,
    elevation: 0.85,
    foreground: 0.22,
    offsetTransform: 'translate(-8%, -8%) scale(1.12)'
  },
  AX_voice: {
    direction: 'left',
    tilt: 82,
    scale: 1.35,
    elevation: 1.05,
    foreground: 0.35,
    offsetTransform: 'translate(6%, 6%) scale(1.16)'
  },
  'orb-core': {
    direction: 'right',
    tilt: 64,
    scale: 1.15,
    elevation: 0.7,
    foreground: 0.25,
    offsetTransform: 'translate(-4%, 8%) scale(1.12)'
  }
};

export default function AssemblyDashboard() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);
  const [rotZ, setRotZ] = useState(0);
  const [brightness, setBrightness] = useState(100);

  const [mainTab, setMainTab] = useState<MainTab>('tools');
  const [toolFilter, setToolFilter] = useState<ToolFilter>('all');
  const [activeTool, setActiveTool] = useState<string>('Librarymodel');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);

  const [userProfile, setUserProfile] = useState<any>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [inspectedTool, setInspectedTool] = useState<PlatformTool | null>(null);

  const platformTools: PlatformTool[] = [
    {
      num: '001',
      name: 'Librarymodel',
      shortTitle: 'Library Model',
      label: 'Open-Source Weights Library',
      tag: 'Mathematical Sovereignty & Offline Deployment',
      category: 'engines',
      badge: 'SOBERANÍA',
      desc: 'Access and download full mathematical weights of open models (GGUF, FP16, EXL2) for local, offline, and air-gapped deployments with zero external cloud reliance.',
      model: 'Open-Weights',
      details: 'Full quantized model weights (GGUF, FP16, EXL2) ready for local inference.',
      metrics: { latency: '<10ms', security: 'Air-Gapped', status: 'Operational' },
      icon: <FiDatabase size={14} />
    },
    {
      num: '002',
      name: 'Create_you_GLYNNE_model',
      shortTitle: 'Create Model',
      label: 'Create & Train Your Custom AI Model',
      tag: 'QLoRA Fine-Tuning & Private Data',
      category: 'engines',
      badge: 'QLORA TUNING',
      desc: 'Train a model on your proprietary enterprise data, shaping its name, personality, and analytical criteria through specialized QLoRA weight retraining.',
      model: 'QLoRA / Unsloth',
      details: 'Private model training protocols active for custom enterprise weights.',
      metrics: { latency: 'Batch FP16', security: 'Private VPC', status: 'Ready' },
      icon: <FiSliders size={14} />
    },
    {
      num: '003',
      name: 'models_provider',
      shortTitle: 'Models Provider',
      label: 'AI Model APIs & Gateway',
      tag: 'API Provider & Enterprise Gateway',
      category: 'engines',
      badge: 'API GATEWAY',
      desc: 'Enterprise LLM APIs engineered for existing projects. Ultra-low latency inference, GPU cluster elasticity, and dedicated Sub-API keys ready to plug in.',
      model: 'NVIDIA NIM',
      details: 'Sub-10ms latency streaming and dedicated API key management ready.',
      metrics: { latency: '<10ms / tok', security: 'Sub-API Key', status: 'Active' },
      icon: <FiZap size={14} />
    },
    {
      num: '004',
      name: 'AX_chat',
      shortTitle: 'AX Chat',
      label: 'Chat with AX · Intelligent Assistant',
      tag: 'Cognitive Conversational Core',
      category: 'conversational',
      badge: 'REASONING',
      desc: 'Connect instantly with GLYNNE’s conversational engine. Solve complex inquiries, analyze enterprise data, and generate code or strategic blueprints in real-time.',
      model: 'GPT OSS 120B',
      details: 'High-parameter natural language processing and multimodal vision ready.',
      metrics: { latency: 'Real-Time', security: 'Encrypted', status: 'Connected' },
      icon: <FiMessageSquare size={14} />
    },
    {
      num: '005',
      name: 'AX_voice',
      shortTitle: 'AX Voice',
      label: 'AX Voice · Real-Time Voice Synthesis',
      tag: 'Neural Acoustic Modulation',
      category: 'conversational',
      badge: 'VOX SYNTH',
      desc: 'Experience ultra-natural, zero-latency voice conversations powered by artificial intelligence. Instant acoustic modulation and real-time comprehension.',
      model: 'VOX-SYNTH V2',
      details: 'Acoustic waveform modulation standing by for full-duplex voice.',
      metrics: { latency: '<50ms Audio', security: 'Full Duplex', status: 'Streaming' },
      icon: <FiMic size={14} />
    }
  ];

  const externalLinks = [
    {
      num: '006',
      title: 'Home · Main Portal',
      subtitle: 'Root Route',
      badge: 'PORTAL',
      href: '/',
      desc: 'Explore our core platform, homepage, and comprehensive overview of AX GLYNNE services.',
      icon: <FiHome size={14} />
    },
    {
      num: '007',
      title: 'About · Company',
      subtitle: 'Architecture',
      badge: 'COMPANY',
      href: '/About',
      desc: 'Discover our architecture, technological mission, and the visionary team engineering GLYNNE.',
      icon: <FiInfo size={14} />
    },
    {
      num: '008',
      title: 'Contact · Solutions',
      subtitle: 'Enterprise',
      badge: 'SOLUTIONS',
      href: '/contact',
      desc: 'Connect directly with our systems engineers and architects for deployments, custom quotes, and integrations.',
      icon: <FiMail size={14} />
    }
  ];

  useEffect(() => {
    const getSession = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.raw) {
          const meta = user.raw.user_metadata || {};
          setUserProfile({
            ...meta,
            email: user.email,
            avatar_url: meta.avatar_url || meta.picture || null,
            full_name: meta.full_name || meta.name || user.email?.split('@')[0] || 'AX_user'
          });
        }
      } catch (err) {
        console.warn('Error fetching user profile in AssemblyDashboard:', err);
      }
    };
    getSession();

    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = theme === 'light' ? '#f4f4f4' : '#000000';

    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, [theme]);

  const currentToolData = platformTools.find(t => t.name === activeTool) || platformTools[0];

  const handleSelectTool = (toolName: string) => {
    if (activeTool === toolName) return;
    setIsFading(true);
    setRotY(prev => prev + 360);
    setRotX(prev => prev + (Math.random() > 0.5 ? 60 : -60));
    setRotZ(prev => prev + (Math.random() > 0.5 ? 35 : -35));
    setTimeout(() => {
      setActiveTool(toolName);
      setIsFading(false);
    }, 220);
  };

  const filteredTools = platformTools.filter(tool => {
    if (toolFilter === 'all') return true;
    return tool.category === toolFilter;
  });

  const userName = userProfile?.full_name || 'AX_user';

  return (
    <div
      className="hub-outer"
      data-theme={theme}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      <div className="hub-page">
        {/* ── TOP EDITORIAL BAR ── */}
        <header className="hub-topbar">
          <div className="hub-topbar-left">
            <Link href="/" className="hub-brand-link">
              AX GLYNNE
            </Link>
            <button
              type="button"
              className="hub-user-trigger"
              onClick={() => setShowLogoutModal(true)}
              title={userProfile?.email || 'Account session'}
            >
              <span>/</span>
              <span>{userName}</span>
            </button>
          </div>

          <div className="hub-topbar-right">
            <nav className="hub-nav-links" aria-label="Primary navigation">
              <button
                type="button"
                className={`hub-nav-link ${mainTab === 'tools' ? 'is-active' : ''}`}
                onClick={() => setMainTab('tools')}
              >
                Tools
              </button>
              <button
                type="button"
                className={`hub-nav-link ${mainTab === 'orb' ? 'is-active' : ''}`}
                onClick={() => setMainTab('orb')}
              >
                Orb Studio
              </button>
              <button
                type="button"
                className={`hub-nav-link ${mainTab === 'routes' ? 'is-active' : ''}`}
                onClick={() => setMainTab('routes')}
              >
                Routes
              </button>
            </nav>

            <span className="hub-topbar-divider" aria-hidden="true" />

            <div className="hub-icon-actions">
              <button
                type="button"
                className="hub-icon-btn"
                onClick={() => setInspectedTool(currentToolData)}
                title="Active tool specifications"
                aria-label="Active tool specifications"
              >
                <FiInfo size={15} />
              </button>
              <button
                type="button"
                className="hub-icon-btn"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
              </button>
              <button
                type="button"
                className="hub-icon-btn"
                onClick={() => setShowLogoutModal(true)}
                title="Disconnect session"
                aria-label="Disconnect session"
              >
                <FaSignOutAlt size={14} />
              </button>
            </div>
          </div>
        </header>

        {/* ── CATEGORIES ROW ── */}
        <section className="hub-categories-bar">
          <span className="hub-categories-label">
            {mainTab === 'tools'
              ? 'Categories'
              : mainTab === 'orb'
              ? '3D Neural Core'
              : 'Platform Routes'}
          </span>

          {mainTab === 'tools' && (
            <div className="hub-category-pills">
              <button
                type="button"
                className={`hub-cat-pill ${toolFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setToolFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`hub-cat-pill ${toolFilter === 'engines' ? 'is-active' : ''}`}
                onClick={() => setToolFilter('engines')}
              >
                AI Engines
              </button>
              <button
                type="button"
                className={`hub-cat-pill ${toolFilter === 'conversational' ? 'is-active' : ''}`}
                onClick={() => setToolFilter('conversational')}
              >
                Chat & Voice
              </button>
            </div>
          )}

          {mainTab === 'orb' && (
            <div className="hub-category-pills">
              {platformTools.map(tool => (
                <button
                  key={tool.name}
                  type="button"
                  className={`hub-cat-pill ${activeTool === tool.name ? 'is-active' : ''}`}
                  onClick={() => handleSelectTool(tool.name)}
                >
                  {tool.shortTitle}
                </button>
              ))}
            </div>
          )}

          {mainTab === 'routes' && (
            <div className="hub-category-pills">
              <span className="hub-cat-pill is-active">Directory</span>
            </div>
          )}
        </section>

        {/* ── MAIN CONTENT ── */}
        <main>
          {mainTab === 'tools' && (
            <div className="hub-editorial-grid">
              {filteredTools.map(tool => {
                const isSelected = activeTool === tool.name;
                const isHovered = hoveredCard === tool.name;
                const topo = TOPO_VARIANTS[tool.name] || TOPO_VARIANTS.Librarymodel;
                return (
                  <article
                    key={tool.name}
                    className={`hub-cell ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelectTool(tool.name)}
                    onMouseEnter={() => setHoveredCard(tool.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="hub-cell-bg"
                      style={{ transform: topo.offsetTransform }}
                    >
                      <Topography
                        color="#4f7cff"
                        lineCount={11}
                        lineWidth={0.9}
                        elevation={topo.elevation}
                        foreground={topo.foreground}
                        tilt={topo.tilt}
                        speed={isHovered ? 0.25 : 0}
                        direction={topo.direction}
                        glow={0.6}
                        depthOfField={0.4}
                        fog={0.17}
                        hoverEffect="lift"
                        clickEffect="pulse"
                        majorLines={false}
                        scale={topo.scale}
                        detail={1}
                        brightness={1.4}
                        intro={false}
                        lightMode={theme === 'light'}
                        dpr={undefined}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>

                    <div className="hub-cell-meta">
                      <span className="hub-cell-date">
                        {`${tool.num} · ${tool.metrics.status}`}
                      </span>
                      <span className="hub-cell-tag-pill">{tool.badge}</span>
                    </div>

                    <div className="hub-cell-body" style={{ marginTop: 'auto' }}>
                      <h2 className="hub-cell-title">{tool.shortTitle}</h2>
                      <p className="hub-cell-desc">{tool.desc}</p>
                    </div>

                    <div className="hub-cell-footer">
                      <div className="hub-cell-specs">
                        <span className="hub-spec-pair">
                          <strong>Model</strong>
                          <span>{tool.model}</span>
                        </span>
                        <span className="hub-spec-pair">
                          <strong>Latency</strong>
                          <span>{tool.metrics.latency}</span>
                        </span>
                      </div>

                      <div className="hub-cell-actions">
                        <button
                          type="button"
                          className="hub-cell-btn"
                          title={`Inspect ${tool.shortTitle}`}
                          aria-label={`Inspect ${tool.shortTitle}`}
                          onClick={e => {
                            e.stopPropagation();
                            handleSelectTool(tool.name);
                            setInspectedTool(tool);
                          }}
                        >
                          <FiMoreHorizontal size={14} />
                        </button>
                        <Link
                          href={`/${tool.name}`}
                          className="hub-cell-btn is-primary"
                          title={`Launch ${tool.shortTitle}`}
                          aria-label={`Launch ${tool.shortTitle}`}
                          onClick={e => e.stopPropagation()}
                        >
                          <FiArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* 6th Editorial Cell: Live LiquidOrb Core */}
              {toolFilter === 'all' && (
                <article
                  className="hub-cell"
                  onClick={() => setMainTab('orb')}
                  onMouseEnter={() => setHoveredCard('orb-core')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="hub-cell-bg"
                    style={{ transform: TOPO_VARIANTS['orb-core'].offsetTransform }}
                  >
                    <Topography
                      color="#4f7cff"
                      lineCount={11}
                      lineWidth={0.9}
                      elevation={TOPO_VARIANTS['orb-core'].elevation}
                      foreground={TOPO_VARIANTS['orb-core'].foreground}
                      tilt={TOPO_VARIANTS['orb-core'].tilt}
                      speed={hoveredCard === 'orb-core' ? 0.25 : 0}
                      direction={TOPO_VARIANTS['orb-core'].direction}
                      glow={0.6}
                      depthOfField={0.4}
                      fog={0.17}
                      hoverEffect="lift"
                      clickEffect="pulse"
                      majorLines={false}
                      scale={TOPO_VARIANTS['orb-core'].scale}
                      detail={1}
                      brightness={1.4}
                      intro={false}
                      lightMode={theme === 'light'}
                      dpr={undefined}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>

                  <div className="hub-cell-meta">
                    <span className="hub-cell-date">ORB · Live Telemetry</span>
                    <span className="hub-cell-tag-pill">3D CORE</span>
                  </div>

                  <div className="hub-cell-body" style={{ marginTop: 'auto' }}>
                    <h2 className="hub-cell-title">Orb Core Studio</h2>
                    <p className="hub-cell-desc">
                      Interactive 3D LiquidOrb visualizer synchronized in real-time with your active GLYNNE engine and optical telemetry controls.
                    </p>
                  </div>

                  <div className="hub-cell-footer">
                    <div className="hub-cell-specs">
                      <span className="hub-spec-pair">
                        <strong>Engine</strong>
                        <span>WebGL</span>
                      </span>
                      <span className="hub-spec-pair">
                        <strong>Active</strong>
                        <span>{currentToolData.shortTitle}</span>
                      </span>
                    </div>

                    <div className="hub-cell-actions">
                      <button
                        type="button"
                        className="hub-cell-btn is-primary"
                        title="Open Orb Studio"
                        aria-label="Open Orb Studio"
                        onClick={e => {
                          e.stopPropagation();
                          setMainTab('orb');
                        }}
                      >
                        <FiDisc size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          )}

          {mainTab === 'orb' && (
            <div className="hub-orb-studio">
              <div className="hub-orb-stage">
                <div className={`hub-orb-wrapper ${isFading ? 'is-fading' : ''}`}>
                  <LiquidOrb
                    theme={theme}
                    wireframe={theme === 'light'}
                    customRotX={rotX}
                    customRotY={rotY}
                    customRotZ={rotZ}
                  />
                </div>
              </div>

              <div className="hub-orb-panel">
                <div>
                  <div className="hub-cell-meta" style={{ marginBottom: 12 }}>
                    <span className="hub-cell-date">{`${currentToolData.num} · ${currentToolData.metrics.status}`}</span>
                    <span className="hub-cell-tag-pill">{currentToolData.badge}</span>
                  </div>
                  <h2 className="hub-cell-title" style={{ marginBottom: 6 }}>
                    {currentToolData.label}
                  </h2>
                  <p className="hub-cell-desc">{currentToolData.desc}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="hub-slider-row">
                    <div className="hub-slider-label">
                      <span>Orb Rotation X</span>
                      <span>{rotX}°</span>
                    </div>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      value={rotX}
                      onChange={e => setRotX(Number(e.target.value))}
                      className="hub-slider"
                    />
                  </div>

                  <div className="hub-slider-row">
                    <div className="hub-slider-label">
                      <span>Orb Rotation Y</span>
                      <span>{rotY}°</span>
                    </div>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      value={rotY}
                      onChange={e => setRotY(Number(e.target.value))}
                      className="hub-slider"
                    />
                  </div>

                  <div className="hub-slider-row">
                    <div className="hub-slider-label">
                      <span>Display Luminance</span>
                      <span>{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min={70}
                      max={115}
                      value={brightness}
                      onChange={e => setBrightness(Number(e.target.value))}
                      className="hub-slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mainTab === 'routes' && (
            <div className="hub-editorial-grid">
              {externalLinks.map(item => (
                <article
                  key={item.num}
                  className="hub-cell"
                  onClick={() => router.push(item.href)}
                >
                  <div className="hub-cell-meta">
                    <span className="hub-cell-date">{`${item.num} · ${item.subtitle}`}</span>
                    <span className="hub-cell-tag-pill">{item.badge}</span>
                  </div>

                  <div className="hub-cell-body">
                    <h2 className="hub-cell-title">{item.title}</h2>
                    <p className="hub-cell-desc">{item.desc}</p>
                  </div>

                  <div className="hub-cell-footer">
                    <div className="hub-cell-specs">
                      <span className="hub-spec-pair">
                        <strong>Path</strong>
                        <span>{item.href}</span>
                      </span>
                    </div>
                    <Link
                      href={item.href}
                      className="hub-cell-btn is-primary"
                      title={`Open ${item.title}`}
                      onClick={e => e.stopPropagation()}
                    >
                      <FiArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ── TOOL INSPECTOR MODAL ── */}
      {inspectedTool && (
        <div className="hub-modal-overlay" onClick={() => setInspectedTool(null)}>
          <div className="hub-modal-card" onClick={e => e.stopPropagation()}>
            <div className="hub-cell-meta" style={{ marginBottom: 14 }}>
              <span className="hub-cell-date">{`${inspectedTool.num} · ${inspectedTool.badge}`}</span>
              <button
                type="button"
                className="hub-cell-btn"
                onClick={() => setInspectedTool(null)}
                aria-label="Close modal"
              >
                <FiX size={14} />
              </button>
            </div>

            <h3 className="hub-cell-title" style={{ marginBottom: 8 }}>
              {inspectedTool.label}
            </h3>
            <p className="hub-cell-desc" style={{ WebkitLineClamp: 'unset' }}>
              {inspectedTool.desc}
            </p>

            <div className="hub-modal-metrics">
              <div className="hub-metric-box">
                <div style={{ opacity: 0.55, marginBottom: 2 }}>Latency</div>
                <strong>{inspectedTool.metrics.latency}</strong>
              </div>
              <div className="hub-metric-box">
                <div style={{ opacity: 0.55, marginBottom: 2 }}>Security</div>
                <strong>{inspectedTool.metrics.security}</strong>
              </div>
              <div className="hub-metric-box">
                <div style={{ opacity: 0.55, marginBottom: 2 }}>Status</div>
                <strong>{inspectedTool.metrics.status}</strong>
              </div>
            </div>

            <div className="hub-modal-actions">
              <button
                type="button"
                className="hub-btn-secondary"
                onClick={() => setInspectedTool(null)}
              >
                Close
              </button>
              <Link href={`/${inspectedTool.name}`} className="hub-cta-btn">
                <span>Launch Tool</span>
                <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGOUT CONFIRMATION MODAL ── */}
      {showLogoutModal && (
        <div className="hub-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="hub-modal-card" onClick={e => e.stopPropagation()}>
            <div className="hub-cell-meta" style={{ marginBottom: 12 }}>
              <span className="hub-cell-date">{'// SECURITY DISCONNECT PROTOCOL'}</span>
            </div>
            <h3 className="hub-cell-title" style={{ marginBottom: 8 }}>
              System Disconnect
            </h3>
            <p className="hub-cell-desc" style={{ WebkitLineClamp: 'unset' }}>
              Are you sure you want to log out and terminate this secure session?
            </p>
            <div className="hub-modal-actions">
              <button
                type="button"
                className="hub-btn-secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="hub-cta-btn"
                onClick={async () => {
                  await signOut();
                  router.push('/');
                }}
              >
                Confirm Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
