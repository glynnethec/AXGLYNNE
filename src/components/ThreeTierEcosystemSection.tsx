'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function ThreeTierEcosystemSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const graphicStroke = isDark ? '#ffffff' : '#111111';
  const graphicFaint = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';

  const tiers = [
    {
      id: 'nucleo',
      title: 'Fase 01 · Núcleo',
      subtitle: 'base determinista',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={graphicStroke} strokeWidth="1.5">
          <circle cx="10" cy="14" r="6" />
          <path d="M14 8 C16 8 20 10 20 14" strokeLinecap="round" />
        </svg>
      ),
      text: 'Es imposible descubrir nuevos horizontes sin una base sólida; Nosotros creamos el núcleo de IA determinista que ayuda a las implementaciones en fase inicial ya los equipos empresariales a escalar sin perder precisión ni control.',
      graphic: (
        <svg width="100%" height="240" viewBox="0 0 280 240" fill="none" style={{ display: 'block' }}>
          {/* Wireframe 3D Sphere / Globe */}
          <circle cx="140" cy="120" r="90" stroke={graphicStroke} strokeWidth="1.2" fill="none" />
          <ellipse cx="140" cy="120" rx="90" ry="35" stroke={graphicStroke} strokeWidth="1.2" fill="none" />
          <ellipse cx="140" cy="120" rx="90" ry="65" stroke={graphicStroke} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <ellipse cx="140" cy="120" rx="35" ry="90" stroke={graphicStroke} strokeWidth="1.2" fill="none" />
          <ellipse cx="140" cy="120" rx="65" ry="90" stroke={graphicStroke} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <line x1="50" y1="120" x2="230" y2="120" stroke={graphicStroke} strokeWidth="1" />
          <line x1="140" y1="30" x2="140" y2="210" stroke={graphicStroke} strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'ajuste-fino',
      title: 'Fase 02 · Ajuste Fino',
      subtitle: 'alineación qlora',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={graphicStroke} strokeWidth="1.5">
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" fill="none" />
        </svg>
      ),
      text: 'Incluso los sistemas empresariales consolidados siempre tienen margen de mejora. Realizamos un ajuste fino continuo de QLoRA y una alineación de parámetros específicos para que sus modelos de IA especializados brillen aún más.',
      graphic: (
        <svg width="100%" height="240" viewBox="0 0 280 240" fill="none" style={{ display: 'block' }}>
          {/* 4-Point / 8-Point Sparkling Vector Star */}
          <g transform="translate(140, 120)">
            {/* Core Star */}
            <path d="M0 -70 Q0 0 -70 0 Q0 0 0 70 Q0 0 70 0 Q0 0 0 -70 Z" fill={graphicStroke} stroke={graphicStroke} strokeWidth="1" />
            {/* Diagonal Rays */}
            <line x1="-35" y1="-35" x2="35" y2="35" stroke={graphicStroke} strokeWidth="1.2" />
            <line x1="35" y1="-35" x2="-35" y2="35" stroke={graphicStroke} strokeWidth="1.2" />
            {/* Faint Outer Ring */}
            <circle cx="0" cy="0" r="80" stroke={graphicFaint} strokeWidth="0.8" strokeDasharray="2 4" />
          </g>
        </svg>
      )
    },
    {
      id: 'ecosistema',
      title: 'Fase 03 · Ecosistema',
      subtitle: 'red multiagente',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={graphicStroke} strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" fill={graphicStroke} />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
        </svg>
      ),
      text: 'En un ecosistema extenso, todo debe regirse por una arquitectura unificada. Diseñamos redes multiagente autónomas que operan bajo estrictas capas de control para un crecimiento sistemático en toda la empresa.',
      graphic: (
        <svg width="100%" height="240" viewBox="0 0 280 240" fill="none" style={{ display: 'block' }}>
          {/* Multi-Ellipse Orbital Galaxy Network */}
          <g transform="translate(140, 120)">
            {/* Central Mass */}
            <circle cx="0" cy="0" r="14" fill={graphicStroke} />

            {/* Orbit 1 */}
            <ellipse cx="0" cy="0" rx="105" ry="35" stroke={graphicStroke} strokeWidth="1.2" transform="rotate(-20)" fill="none" />
            <circle cx="-85" cy="20" r="4" fill={graphicStroke} />
            <circle cx="65" cy="-25" r="3" fill={graphicStroke} />

            {/* Orbit 2 */}
            <ellipse cx="0" cy="0" rx="95" ry="50" stroke={graphicStroke} strokeWidth="1.2" transform="rotate(25)" fill="none" />
            <circle cx="75" cy="30" r="4" fill={graphicStroke} />
            <circle cx="-70" cy="-28" r="3.5" fill={graphicStroke} />

            {/* Orbit 3 */}
            <ellipse cx="0" cy="0" rx="115" ry="25" stroke={graphicStroke} strokeWidth="1" strokeDasharray="3 3" transform="rotate(65)" fill="none" />
            <circle cx="35" cy="-70" r="3" fill={graphicStroke} />
          </g>
        </svg>
      )
    }
  ];

  return (
    <section className="tier-section">
      <style>{`
        .tier-section {
          width: 100%;
          height: 100vh;
          min-height: 100vh;
          position: relative;
          z-index: 10;
          box-sizing: border-box;
          border-top: 1px solid ${borderLine};
          border-bottom: 1px solid ${borderLine};
          background-color: transparent;
        }
        .tier-grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          background-color: transparent;
        }
        .tier-column {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid ${borderLine};
          box-sizing: border-box;
          padding: 48px 40px;
          background-color: transparent;
        }
        .tier-column:last-child {
          border-right: none;
        }
        .tier-header-cell {
          padding-bottom: 24px;
          border-bottom: 1px solid ${borderLine};
        }
        .tier-graphic-cell {
          padding: 24px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          overflow: hidden;
        }
        .tier-body-cell {
          padding-top: 24px;
          border-top: 1px solid ${borderLine};
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 900px) {
          .tier-section {
            height: auto !important;
            min-height: auto !important;
          }
          .tier-grid-container {
            grid-template-columns: 1fr;
            height: auto !important;
          }
          .tier-column {
            border-right: none !important;
            border-bottom: 1px solid ${borderLine};
            padding: 36px 24px !important;
          }
          .tier-column:last-child {
            border-bottom: none;
          }
          .tier-graphic-cell {
            padding: 16px 0 !important;
            min-height: 180px;
          }
          .tier-header-cell {
            padding-bottom: 16px;
          }
          .tier-body-cell {
            padding-top: 16px;
          }
        }
        @media (max-width: 700px) {
          .tier-column {
            padding: 28px 16px !important;
          }
          .tier-graphic-cell {
            min-height: 160px;
          }
        }
      `}</style>

      {/* 3-Column Grid Table - Full 100vw and 100vh */}
      <div className="tier-grid-container">
        {tiers.map((tier) => (
          <div key={tier.id} className="tier-column">
            {/* Top Title Cell */}
            <div className="tier-header-cell">
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 600,
                color: textColor,
                margin: 0,
                letterSpacing: '-0.02em',
                fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif"
              }}>
                {tier.title}
              </h2>
            </div>

            {/* Middle Graphic Cell */}
            <div className="tier-graphic-cell">
              {tier.graphic}
            </div>

            {/* Bottom Body Cell */}
            <div className="tier-body-cell">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {tier.icon}
                <span style={{
                  fontSize: '11px',
                  fontFamily: "'SF Mono', monospace",
                  color: textColor,
                  fontWeight: 600,
                  letterSpacing: '0.12em'
                }}>
                  {tier.subtitle}
                </span>
              </div>

              <p style={{
                fontSize: '13px',
                fontFamily: "'SF Mono', monospace",
                color: subtextColor,
                fontWeight: 400,
                lineHeight: 1.6,
                margin: 0
              }}>
                {tier.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
