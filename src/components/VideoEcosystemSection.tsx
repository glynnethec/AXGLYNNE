'use client';

import TechLogos from './TechLogos';
import { useTheme } from '@/lib/ThemeContext';

export default function VideoEcosystemSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section style={{
      width: '100vw',
      maxWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      padding: '0 0 12rem',
      marginTop: '2rem',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      {/* Bordered Container */}
      <div style={{
        width: '100vw',
        maxWidth: '100vw',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '0px',
        padding: '4rem 10vw',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        {/* HIDDEN ON MOBILE */}
        <div className="desktop-only" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* TEXT ABOVE VIDEO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f7',
          borderRadius: '999px',
          padding: '6px 16px',
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 500, color: isDark ? '#ffffff' : '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Enterprise AI Infrastructure</span>
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: 300,
          color: isDark ? '#ffffff' : '#111111',
          letterSpacing: '-0.01em',
          margin: '0 0 12px 0',
          textAlign: 'center'
        }}>
          The GLYNNE AI Architecture
        </h2>
        <p style={{
          fontSize: '13px',
          color: isDark ? '#a1a1aa' : '#8f8f96',
          fontWeight: 300,
          letterSpacing: '0.02em',
          margin: '0 0 40px 0',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: 1.6
        }}>
          Desde clusters acelerados por NVIDIA y modelos de pesos abiertos reentrenados, hasta orquestación MCP determinista y pipelines de inferencia de baja latencia. GLYNNE opera en la vanguardia técnica de la inteligencia artificial corporativa.
        </p>

        </div>

        {/* TECH LOGOS BELOW VIDEO */}
        <div style={{ width: '100%' }}>
          <TechLogos />
        </div>
      </div>
    </section>
  );
}
