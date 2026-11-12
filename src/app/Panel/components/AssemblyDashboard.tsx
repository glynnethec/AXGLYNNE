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
  FiChevronDown,
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

export default function AssemblyDashboard() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);
  const [rotZ, setRotZ] = useState(0);
  const [brightness, setBrightness] = useState(95);

  const [mainTab, setMainTab] = useState<MainTab>('tools');
  const [toolFilter, setToolFilter] = useState<ToolFilter>('all');
  const [activeTool, setActiveTool] = useState<string>('Librarymodel');
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
      shortTitle: 'Create Model',
      label: 'Create & Train Your Custom AI Model',
      tag: 'QLoRA Fine-Tuning & Private Data',
      category: 'engines',
      badge: 'QLORA TUNING',
      desc: 'Train a model on your proprietary enterprise data, shaping its name, personality, and analytical criteria. Specialized weight retraining (QLoRA) aligns the LLM cognitive core with your workflows.',
      model: 'QLoRA / Unsloth Core',
      details: 'Private model training protocols active for custom enterprise weights.',
      metrics: { latency: 'Batch FP16', security: 'Private VPC', status: 'Ready' },
      icon: <FiSliders size={15} />
    },
    {
      num: '003',
      name: 'models_provider',
      shortTitle: 'Models Provider',
      label: 'AI Model APIs & Gateway',
      tag: 'API Provider & Enterprise Gateway',
      category: 'engines',
      badge: 'GATEWAY & SUB-APIS',
      desc: 'Enterprise LLM APIs engineered for existing projects. Ultra-low latency inference, GPU cluster elasticity, and dedicated Sub-API keys ready to plug directly into your codebase.',
      model: 'vLLM / NVIDIA NIM Gateway',
      details: 'Sub-10ms latency streaming and dedicated API key management ready.',
      metrics: { latency: '<10ms / tok', security: 'Sub-API Key', status: 'High Throughput' },
      icon: <FiZap size={15} />
    },
    {
      num: '004',
      name: 'AX_chat',
      shortTitle: 'AX Chat',
      label: 'Chat with AX · Intelligent Assistant',
      tag: 'Cognitive Conversational Core',
      category: 'conversational',
      badge: 'FRONTIER REASONING',
      desc: 'Connect instantly with GLYNNE’s conversational engine. Solve complex inquiries, analyze enterprise data, and generate code or strategic blueprints in real-time.',
      model: 'GPT OSS 120B OpenAI',
      details: 'High-parameter natural language processing and multimodal vision ready.',
      metrics: { latency: 'Real-Time', security: 'Encrypted', status: 'Connected' },
      icon: <FiMessageSquare size={15} />
    },
    {
      num: '005',
      name: 'AX_voice',
      shortTitle: 'AX Voice',
      label: 'AX Voice · Real-Time Voice Synthesis',
      tag: 'Neural Acoustic Modulation',
      category: 'conversational',
      badge: 'VOX SYNTHESIS',
      desc: 'Experience ultra-natural, zero-latency voice conversations powered by artificial intelligence. Instant acoustic modulation and real-time comprehension.',
      model: 'VOX-SYNTH V2.0',
      details: 'Acoustic waveform modulation standing by for full-duplex voice.',
      metrics: { latency: '<50ms Audio', security: 'Full Duplex', status: 'Streaming' },
      icon: <FiMic size={15} />
    }
  ];

  const externalLinks = [
    {
      num: '006',
      title: 'Home · Main Portal',
      subtitle: 'Root Platform Overview',
      href: '/',
      desc: 'Explore our core platform, homepage, and comprehensive overview of AX GLYNNE services.',
      icon: <FiHome size={15} />
    },
    {
      num: '007',
      title: 'About · Company',
      subtitle: 'Architecture & Mission',
      href: '/About',
      desc: 'Discover our architecture, technological mission, and the visionary team engineering GLYNNE.',
      icon: <FiInfo size={15} />
    },
    {
      num: '008',
      title: 'Contact · Solutions',
      subtitle: 'Engineering & Enterprise',
      href: '/contact',
      desc: 'Connect directly with our systems engineers and architects for deployments, custom quotes, and integrations.',
      icon: <FiMail size={15} />
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
    document.body.style.backgroundColor = theme === 'light' ? '#f8f9fc' : '#000000';

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
    }, 260);
  };

  const filteredTools = platformTools.filter(tool => {
    if (toolFilter === 'all') return true;
    return tool.category === toolFilter;
  });

  const userName = userProfile?.full_name || 'AX_user';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div
      className="hub-outer"
      data-theme={theme}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Perspective floor grid from previous GLYNNE interface */}
      <div className="hub-bg-grid" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hub-floor-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                className="hub-bg-grid-line"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hub-floor-grid)" />
        </svg>
      </div>

      <div className="hub-frame">
        <div className="hub-ambient-glow" />

        <div className="hub-layer">
          {/* ── TOP BAR ── */}
          <header className="hub-topbar">
            <div className="hub-topbar-left">
              <Link href="/" className="hub-brand-btn" title="GLYNNE Home">
                <span className="hub-brand-mark">AX</span>
              </Link>

              <button
                type="button"
                className="hub-pill"
                onClick={() => setShowLogoutModal(true)}
                title={userProfile?.email || 'Account session'}
              >
                {userProfile?.avatar_url ? (
                  <img
                    src={userProfile.avatar_url}
                    alt={userName}
                    className="hub-avatar"
                  />
                ) : (
                  <span className="hub-avatar">{userInitial}</span>
                )}
                <span>{userName}</span>
                <FiChevronDown size={13} style={{ opacity: 0.55 }} />
              </button>

              <button
                type="button"
                className="hub-circle-btn"
                onClick={() => setInspectedTool(currentToolData)}
                title="Active tool specifications"
                aria-label="Active tool specifications"
              >
                <FiInfo size={15} />
              </button>
            </div>

            <div className="hub-topbar-right">
              <button
                type="button"
                className="hub-active-pill"
                onClick={() => setMainTab('orb')}
                title="Open Orb Studio"
              >
                <span>{`${currentToolData.shortTitle} · ${currentToolData.num}`}</span>
                <span className="hub-active-pill-badge">
                  <FiChevronDown size={13} />
                </span>
              </button>

              <button
                type="button"
                className="hub-circle-btn"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
              </button>

              <button
                type="button"
                className="hub-circle-btn"
                onClick={() => setMainTab(mainTab === 'orb' ? 'tools' : 'orb')}
                title="Toggle Orb Studio"
                aria-label="Toggle Orb Studio"
              >
                <FiDisc size={15} />
              </button>

              <button
                type="button"
                className="hub-circle-btn"
                onClick={() => setShowLogoutModal(true)}
                title="Disconnect session"
                aria-label="Disconnect session"
              >
                <FaSignOutAlt size={13} />
                <span className="hub-status-dot" />
              </button>
            </div>
          </header>

          {/* ── LARGE TABS & SUBTABS ── */}
          <section className="hub-nav-section">
            <div className="hub-main-tabs" role="tablist" aria-label="Workspace sections">
              <button
                type="button"
                role="tab"
                aria-selected={mainTab === 'tools'}
                className={`hub-main-tab ${mainTab === 'tools' ? 'is-active' : ''}`}
                onClick={() => setMainTab('tools')}
              >
                Tools
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mainTab === 'orb'}
                className={`hub-main-tab ${mainTab === 'orb' ? 'is-active' : ''}`}
                onClick={() => setMainTab('orb')}
              >
                Orb Studio
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mainTab === 'routes'}
                className={`hub-main-tab ${mainTab === 'routes' ? 'is-active' : ''}`}
                onClick={() => setMainTab('routes')}
              >
                Routes
              </button>
            </div>

            {mainTab === 'tools' && (
              <div className="hub-subtabs">
                <button
                  type="button"
                  className={`hub-subtab ${toolFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setToolFilter('all')}
                >
                  All Tools
                </button>
                <button
                  type="button"
                  className={`hub-subtab ${toolFilter === 'engines' ? 'is-active' : ''}`}
                  onClick={() => setToolFilter('engines')}
                >
                  AI Engines
                </button>
                <button
                  type="button"
                  className={`hub-subtab ${toolFilter === 'conversational' ? 'is-active' : ''}`}
                  onClick={() => setToolFilter('conversational')}
                >
                  Chat & Voice
                </button>
              </div>
            )}

            {mainTab === 'orb' && (
              <div className="hub-subtabs">
                <button type="button" className="hub-subtab is-active">
                  Interactive 3D Core
                </button>
              </div>
            )}

            {mainTab === 'routes' && (
              <div className="hub-subtabs">
                <button type="button" className="hub-subtab is-active">
                  Platform Links
                </button>
              </div>
            )}
          </section>

          {/* ── MAIN WORKSPACE CONTENT ── */}
          <main className="hub-grid-wrap">
            {mainTab === 'tools' && (
              <div className="hub-cards-grid">
                {filteredTools.map(tool => {
                  const isSelected = activeTool === tool.name;
                  return (
                    <div
                      key={tool.name}
                      className={`hub-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelectTool(tool.name)}
                    >
                      <div className="hub-card-top">
                        <div className="hub-card-title-group">
                          <span className="hub-card-meta-badge">
                            {tool.icon}
                            <span>{`${tool.num} // ${tool.badge}`}</span>
                          </span>
                          <h3 className="hub-card-title">{tool.shortTitle}</h3>
                          <p className="hub-card-subtitle">{tool.tag}</p>
                        </div>
                        <button
                          type="button"
                          className="hub-card-more-btn"
                          title={`Inspect ${tool.shortTitle}`}
                          aria-label={`Inspect ${tool.shortTitle}`}
                          onClick={e => {
                            e.stopPropagation();
                            handleSelectTool(tool.name);
                            setInspectedTool(tool);
                          }}
                        >
                          <FiMoreHorizontal size={15} />
                        </button>
                      </div>

                      <div className="hub-card-bottom">
                        <div className="hub-card-summary-wrap">
                          <p className="hub-card-summary">{tool.details}</p>
                          <span className="hub-card-metric-line">
                            {`${tool.metrics.latency} · ${tool.metrics.security} · ${tool.metrics.status}`}
                          </span>
                        </div>
                        <Link
                          href={`/${tool.name}`}
                          className="hub-card-action-btn"
                          title={`Launch ${tool.shortTitle}`}
                          aria-label={`Launch ${tool.shortTitle}`}
                          onClick={e => e.stopPropagation()}
                        >
                          <FiArrowUpRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}

                {/* 6th Card on 'All Tools' to keep a balanced 3x2 grid & direct access to the LiquidOrb */}
                {toolFilter === 'all' && (
                  <div
                    className="hub-card"
                    onClick={() => setMainTab('orb')}
                  >
                    <div className="hub-card-top">
                      <div className="hub-card-title-group">
                        <span className="hub-card-meta-badge">
                          <FiDisc size={13} />
                          <span>{'ORB // 3D NEURAL CORE'}</span>
                        </span>
                        <h3 className="hub-card-title">Orb Core</h3>
                        <p className="hub-card-subtitle">Interactive LiquidOrb Visualizer</p>
                      </div>
                      <button
                        type="button"
                        className="hub-card-more-btn"
                        title="Open Orb Studio"
                        aria-label="Open Orb Studio"
                        onClick={e => {
                          e.stopPropagation();
                          setMainTab('orb');
                        }}
                      >
                        <FiMoreHorizontal size={15} />
                      </button>
                    </div>

                    <div className="hub-card-bottom">
                      <div className="hub-card-summary-wrap">
                        <p className="hub-card-summary">
                          Interactive 3D LiquidOrb core synchronized with your active GLYNNE engine.
                        </p>
                        <span className="hub-card-metric-line">
                          {'WebGL · 60fps · Live Telemetry'}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="hub-card-action-btn"
                        title="Open Orb Studio"
                        aria-label="Open Orb Studio"
                        onClick={e => {
                          e.stopPropagation();
                          setMainTab('orb');
                        }}
                      >
                        <FiDisc size={15} />
                      </button>
                    </div>
                  </div>
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
                    <h3 className="hub-card-title" style={{ marginBottom: 4 }}>
                      {currentToolData.label}
                    </h3>
                    <p className="hub-card-subtitle">
                      {`${currentToolData.model} · ${currentToolData.metrics.latency} · ${currentToolData.metrics.status}`}
                    </p>
                  </div>

                  <div className="hub-orb-tool-chips">
                    {platformTools.map(tool => (
                      <button
                        key={tool.name}
                        type="button"
                        className={`hub-orb-chip ${activeTool === tool.name ? 'is-active' : ''}`}
                        onClick={() => handleSelectTool(tool.name)}
                      >
                        {tool.shortTitle}
                      </button>
                    ))}
                  </div>

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
            )}

            {mainTab === 'routes' && (
              <div className="hub-cards-grid">
                {externalLinks.map(item => (
                  <div
                    key={item.num}
                    className="hub-card"
                    onClick={() => router.push(item.href)}
                  >
                    <div className="hub-card-top">
                      <div className="hub-card-title-group">
                        <h3 className="hub-card-title">{item.title}</h3>
                        <p className="hub-card-subtitle">{item.subtitle}</p>
                      </div>
                      <span className="hub-card-more-btn" aria-hidden="true">
                        {item.icon}
                      </span>
                    </div>

                    <div className="hub-card-bottom">
                      <p className="hub-card-summary">{item.desc}</p>
                      <Link
                        href={item.href}
                        className="hub-card-action-btn"
                        title={`Open ${item.title}`}
                        onClick={e => e.stopPropagation()}
                      >
                        <FiArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

          {/* ── BOTTOM FOOTER BAR ── */}
          <footer className="hub-footer">
            <button
              type="button"
              className="hub-circle-btn"
              onClick={() => setInspectedTool(currentToolData)}
              title="View active tool info"
              aria-label="View active tool info"
            >
              <FiInfo size={15} />
            </button>

            <Link href={`/${activeTool}`} className="hub-cta-pill">
              <span>{`Deploy ${currentToolData.shortTitle}`}</span>
              <FiArrowRight size={15} />
            </Link>
          </footer>
        </div>
      </div>

      {/* ── TOOL INSPECTOR MODAL ── */}
      {inspectedTool && (
        <div className="hub-modal-overlay" onClick={() => setInspectedTool(null)}>
          <div className="hub-modal-card" onClick={e => e.stopPropagation()}>
            <div className="hub-card-top" style={{ marginBottom: 12 }}>
              <div>
                <p className="hub-card-subtitle" style={{ marginBottom: 4 }}>
                  {`${inspectedTool.num} · ${inspectedTool.badge}`}
                </p>
                <h3 className="hub-card-title" style={{ fontSize: 20 }}>
                  {inspectedTool.label}
                </h3>
              </div>
              <button
                type="button"
                className="hub-card-more-btn"
                onClick={() => setInspectedTool(null)}
                aria-label="Close modal"
              >
                <FiX size={16} />
              </button>
            </div>

            <p className="hub-card-summary" style={{ WebkitLineClamp: 'unset', fontSize: 13.5 }}>
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
              <Link href={`/${inspectedTool.name}`} className="hub-cta-pill">
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
            <p className="hub-card-subtitle" style={{ marginBottom: 6 }}>
              {'// SECURITY DISCONNECT PROTOCOL'}
            </p>
            <h3 className="hub-card-title" style={{ fontSize: 20, marginBottom: 8 }}>
              System Disconnect
            </h3>
            <p className="hub-card-summary" style={{ WebkitLineClamp: 'unset', fontSize: 13.5 }}>
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
                className="hub-cta-pill"
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
