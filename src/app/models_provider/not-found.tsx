'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/supabaseClient';
import { useTheme } from '@/lib/ThemeContext';
import PanelFooter from '@/app/Panel/components/PanelFooter';
import '@/app/Panel/components/AssemblyDashboard.css';
import { 
  FiAlertTriangle, 
  FiArrowLeft, 
  FiCpu, 
  FiLayers, 
  FiChevronLeft,
  FiSun,
  FiMoon
} from 'react-icons/fi';

export default function ModelsProviderNotFound() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [userEmail, setUserEmail] = useState<string>('guest@axglynne.com');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  return (
    <div 
      data-theme={theme}
      style={{
        backgroundColor: isDark ? '#000000' : '#f8f9fc',
        color: isDark ? '#ffffff' : '#111111',
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'SF Mono', Monaco, 'Courier New', Consolas, monospace",
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowX: 'hidden'
      }}
    >
      {/* BACKGROUND SVG FLOOR GRID (Panel / AssemblyDashboard Style) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="md-bg-grid">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="floor-grid-404" width="80" height="80" patternUnits="userSpaceOnUse">
                <path 
                  d="M 80 0 L 0 0 0 80" 
                  fill="none" 
                  stroke={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.1)'} 
                  strokeWidth="1" 
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-grid-404)" />
          </svg>
        </div>
      </div>

      {/* TOP TACTICAL HEADER BAR */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(248, 249, 252, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.12)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link 
            href="/Panel" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: isDark ? '#ffffff' : '#111111',
              fontSize: '11px',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '6px 12px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            <FiChevronLeft size={13} />
            <span>Panel</span>
          </Link>

          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: isDark ? '#ffffff' : '#111111' }}>
            /// GLYNNE MODELS PROVIDER STUDIO
          </div>

          <div style={{
            fontSize: '10px',
            padding: '3px 8px',
            backgroundColor: 'rgba(255, 149, 0, 0.15)',
            color: '#ff9500',
            border: '1px solid rgba(255, 149, 0, 0.3)',
            fontWeight: 700,
            letterSpacing: '0.08em'
          }}>
            ● DIAGNOSTIC 404 ERROR
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
            ROOT // <span style={{ color: isDark ? '#ffffff' : '#111111', fontWeight: 700 }}>{userEmail}</span>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: isDark ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(0,0,0,0.2)',
              color: isDark ? '#ffffff' : '#111111',
              padding: '6px 10px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Toggle theme"
          >
            {isDark ? <FiSun size={12} /> : <FiMoon size={12} />}
            <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>{theme}</span>
          </button>
        </div>
      </header>

      {/* MAIN 404 CONTENT CONTAINER */}
      <main style={{ maxWidth: '900px', margin: 'auto', padding: '60px 20px', position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box' }}>
        
        <div style={{
          border: isDark ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.15)',
          backgroundColor: isDark ? '#000000' : '#ffffff',
          padding: '40px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Tactical Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            border: '1px solid rgba(255, 149, 0, 0.3)',
            backgroundColor: 'rgba(255, 149, 0, 0.1)',
            fontSize: '11px',
            fontWeight: 700,
            color: '#ff9500',
            marginBottom: '20px',
            letterSpacing: '0.08em'
          }}>
            <FiAlertTriangle size={13} />
            <span>/// ERR_PROVIDER_ENDPOINT_NOT_FOUND // 404</span>
          </div>

          {/* Giant 404 */}
          <h1 style={{
            fontSize: 'clamp(64px, 12vw, 140px)',
            fontWeight: 800,
            lineHeight: 0.9,
            margin: '0 0 16px 0',
            letterSpacing: '-0.04em',
            color: isDark ? '#ffffff' : '#111111'
          }}>
            404.
          </h1>

          <h2 style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: isDark ? '#ffffff' : '#111111',
            margin: '0 0 12px 0'
          }}>
            Model Provider Resource or Route Not Found
          </h2>

          <p style={{
            fontSize: '12px',
            color: isDark ? 'rgba(255, 255, 255, 0.65)' : '#666666',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 0 32px 0'
          }}>
            The requested Model Provider endpoint, Sub-API routing target, or inference node does not exist on this gateway. Verify your route configuration or return to the Models Provider console.
          </p>

          {/* Blueprint Icon Graphic */}
          <div style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="85" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth="1" />
              <rect x="65" y="65" width="70" height="70" stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="100" r="4" fill={isDark ? '#ffffff' : '#111111'} />
            </svg>
            <FiCpu style={{ position: 'absolute', fontSize: '24px', color: isDark ? '#ffffff' : '#111111' }} />
          </div>

          {/* Action CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/models_provider"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: isDark ? '#ffffff' : '#111111',
                color: isDark ? '#000000' : '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}
            >
              <FiArrowLeft size={14} />
              <span>Models Provider Studio</span>
            </Link>

            <Link
              href="/Panel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(0, 0, 0, 0.2)',
                color: isDark ? '#ffffff' : '#111111',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none'
              }}
            >
              <FiLayers size={14} />
              <span>Return to Panel</span>
            </Link>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <PanelFooter />
    </div>
  );
}
