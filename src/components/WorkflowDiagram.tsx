'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

const columns = [
  { title: "1. Análisis" },
  { title: "2. Estrategia" },
  { title: "3. Ejecución" },
  { title: "4. Transformación" }
];

const nodes = [
  // Col 1
  {
    id: 1,
    col: 1,
    y: 250,
    title: 'Contextualizar',
    tag: 'Fase 1',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Contexto',
    desc: 'Definir el alcance operativo.',
    type: 'dial'
  },
  {
    id: 2,
    col: 1,
    y: 750,
    title: 'Permisos',
    tag: 'Fase 1',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Control de acceso',
    desc: 'Restringir la ejecución de la herramienta.',
    type: 'bar'
  },
  
  // Col 2
  {
    id: 3,
    col: 2,
    y: 350,
    title: 'Filtro de diseño',
    tag: 'Fase 2',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Capa de control',
    desc: 'Inspeccione el mensaje y la carga útil.',
    type: 'buttons'
  },
  {
    id: 4,
    col: 2,
    y: 650,
    title: 'Protocolo de seguridad',
    tag: 'Fase 2',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Confianza cero',
    desc: 'Verificar identidad y política.',
    type: 'dial'
  },

  // Col 3
  {
    id: 5,
    col: 3,
    y: 200,
    title: 'Motor de reglas',
    tag: 'Fase 3',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Barandillas de seguridad',
    desc: 'Aplicar reglas deterministas.',
    type: 'bar'
  },
  {
    id: 6,
    col: 3,
    y: 500,
    title: 'Integración',
    tag: 'Fase 3',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Puertas de enlace API',
    desc: 'Conecte las herramientas empresariales.',
    type: 'buttons'
  },
  {
    id: 7,
    col: 3,
    y: 800,
    title: 'Trazabilidad',
    tag: 'Fase 3',
    status: 'Activo',
    owner: 'Sistema AX',
    size: 'Registros de auditoría',
    desc: 'Registrar la telemetría de decisiones.',
    type: 'bar'
  },

  // Col 4
  {
    id: 8,
    col: 4,
    y: 500,
    title: 'Autonomía Gobernada',
    tag: 'Resultado',
    status: 'Continuo',
    owner: 'Sistema AX',
    size: 'Producción',
    desc: 'Ejecución segura y auditable.',
    type: 'chart',
    isChart: true
  }
];

const connections = [
  { from: 1, to: 3, label: 'Contexto' },
  { from: 2, to: 3, label: 'Acceso' },
  { from: 2, to: 4, label: 'Política' },
  { from: 3, to: 5, label: 'Carga Útil' },
  { from: 3, to: 6, label: 'Intención' },
  { from: 4, to: 6, label: 'Token' },
  { from: 4, to: 7, label: 'Identidad' },
  { from: 5, to: 8, label: 'Regla OK' },
  { from: 6, to: 8, label: 'Ejecutado' },
  { from: 7, to: 8, label: 'Auditado' }
];

const getPath = (fromCol: number, fromY: number, toCol: number, toY: number) => {
  const x1 = fromCol * 250 - 30;
  const x2 = (toCol - 1) * 250 + 30;
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${x2} ${toY}`;
};

export default function WorkflowDiagram() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)';
  const cardBg = isDark ? '#08080a' : '#ffffff';

  return (
    <section className="desktop-only-section" style={{
      width: '100vw',
      maxWidth: '100vw',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      boxSizing: 'border-box',
      padding: '4rem clamp(16px, 4vw, 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      backgroundColor: 'transparent'
    }}>
      
      {/* Top Header Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
        borderRadius: '999px',
        padding: '6px 16px',
        marginBottom: '1rem',
        border: `1px solid ${borderLine}`
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: textColor, marginRight: '8px' }} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: textColor, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          Arquitectura de Control AX
        </span>
      </div>

      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 40px)',
        fontWeight: 400,
        color: textColor,
        letterSpacing: '-0.02em',
        marginBottom: '4rem',
        textAlign: 'center',
        maxWidth: '700px',
        fontFamily: "var(--font-serif), Georgia, serif"
      }}>
        Cómo AX Filtra y Controla las Acciones de IA
      </h2>

      {/* Main Flow Container */}
      <div className="flow-container" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        height: '800px',
        margin: '0 auto'
      }}>
        
        {/* SVG Connectors Layer */}
        <svg className="desktop-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from)!;
            const toNode = nodes.find(n => n.id === conn.to)!;
            const path = getPath(fromNode.col, fromNode.y, toNode.col, toNode.y);
            const x1 = fromNode.col * 250 - 30;
            const x2 = (toNode.col - 1) * 250 + 30;
            const midX = (x1 + x2) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            return (
              <g key={i}>
                <path d={path} fill="none" stroke={borderLine} strokeWidth="2" />
                <path 
                  d={path} 
                  fill="none" 
                  stroke={textColor} 
                  strokeWidth="2" 
                  strokeDasharray="8 16" 
                  className="animated-flow-line" 
                />
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect x="-26" y="-10" width="52" height="20" fill={textColor} stroke={borderLine} strokeWidth="1" />
                  <text x="0" y="2" fill={isDark ? "#000000" : "#ffffff"} fontSize="8" fontWeight="700" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">
                    {conn.label}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Node Cards Layer - Reference Image Cyberpunk/Blueprint UI Style */}
        <div className="nodes-layer" style={{ width: '100%', height: '100%', position: 'relative' }}>
          {nodes.map(node => (
            <div key={node.id} className="node-card-wrapper" style={{
              position: 'absolute',
              top: `${node.y / 10}%`,
              left: `${(node.col - 1) * 25}%`,
              width: '25%',
              padding: '0 2%',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}>
              {/* Sharp Blueprint Card Matching User Reference Image */}
              <div className="node-card" style={{
                backgroundColor: cardBg,
                borderRadius: '0px',
                border: borderLine,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.9)' : '0 4px 20px rgba(0,0,0,0.06)',
                fontFamily: "'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = textColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = borderLine;
              }}
              >
                {/* 1. Header Box: Title & Phase Tag */}
                <div style={{
                  padding: '10px 12px',
                  borderBottom: borderLine,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'
                }}>
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '11px',
                      fontWeight: 700,
                      color: textColor,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {node.title}
                    </h4>
                    <div style={{
                      fontSize: '9px',
                      color: subtextColor,
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {node.desc}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    padding: '2px 6px',
                    border: borderLine,
                    color: textColor,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}>
                    {node.tag}
                  </div>
                </div>

                {/* 2. Technical HUD Widget Area (Dial, Hash Bar, Action Buttons, Chart) */}
                <div style={{
                  padding: '12px',
                  borderBottom: borderLine,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  boxSizing: 'border-box'
                }}>
                  {node.type === 'dial' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                        {Array.from({ length: 16 }).map((_, i) => {
                          const angle = (i * 22.5 - 135) * (Math.PI / 180);
                          const x1 = 20 + 11 * Math.cos(angle);
                          const y1 = 20 + 11 * Math.sin(angle);
                          const x2 = 20 + 16 * Math.cos(angle);
                          const y2 = 20 + 16 * Math.sin(angle);
                          const active = i < 11;
                          return (
                            <line
                              key={i}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke={active ? textColor : subtextColor}
                              strokeWidth="1.5"
                              opacity={active ? 1 : 0.25}
                            />
                          );
                        })}
                        <circle cx="20" cy="20" r="4" fill="none" stroke={textColor} strokeWidth="1" />
                      </svg>
                      <div style={{ fontSize: '9px', fontFamily: 'monospace', color: subtextColor, lineHeight: 1.3 }}>
                        <span style={{ color: textColor, fontWeight: 700 }}>68.4%</span>
                        <br />OPERATIVO
                      </div>
                    </div>
                  )}

                  {node.type === 'bar' && (
                    <div style={{ width: '100%' }}>
                      <div style={{
                        display: 'flex',
                        gap: '2px',
                        height: '14px',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}>
                        {Array.from({ length: 22 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: '100%',
                              backgroundColor: i < 14 ? textColor : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)')
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: subtextColor, marginTop: '4px', fontFamily: 'monospace' }}>
                        <span>VOLUMEN 561TB</span>
                        <span>PROGRESO 50%</span>
                      </div>
                    </div>
                  )}

                  {node.type === 'buttons' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                      <div style={{
                        border: borderLine,
                        padding: '2px 0',
                        fontSize: '8px',
                        textAlign: 'center',
                        fontWeight: 700,
                        color: textColor,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}>
                        CANCELAR
                      </div>
                      <div style={{
                        border: borderLine,
                        padding: '2px 0',
                        fontSize: '8px',
                        textAlign: 'center',
                        color: subtextColor,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                      }}>
                        CERRAR VENTANA
                      </div>
                    </div>
                  )}

                  {node.type === 'chart' && (
                    <div style={{ width: '100%', height: '30px' }}>
                      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <polyline points="0,25 20,18 40,22 60,8 80,12 100,4" fill="none" stroke={textColor} strokeWidth="1.5" />
                        <polygon points="0,30 0,25 20,18 40,22 60,8 80,12 100,4 100,30" fill={isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"} />
                      </svg>
                    </div>
                  )}
                </div>

                {/* 3. Compartment Grid: Estado, Dueño, Métrico */}
                <div style={{
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  fontSize: '9px',
                  fontFamily: "'SF Mono', monospace"
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor, fontSize: '8px', textTransform: 'uppercase' }}>Estado</span>
                    <span style={{ color: textColor, fontWeight: 700 }}>{node.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: subtextColor, fontSize: '8px', textTransform: 'uppercase' }}>Dueño</span>
                    <span style={{ color: textColor, fontWeight: 600 }}>{node.owner}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: borderLine,
                    paddingTop: '4px',
                    marginTop: '2px'
                  }}>
                    <span style={{ color: subtextColor, fontSize: '8px', textTransform: 'uppercase' }}>Métrico</span>
                    <span style={{ color: textColor, fontWeight: 600 }}>{node.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flowAnimation {
          to {
            stroke-dashoffset: -30;
          }
        }
        .animated-flow-line {
          animation: flowAnimation 1.5s linear infinite;
        }
        
        @media (max-width: 900px) {
          .desktop-svg, .desktop-bg {
            display: none !important;
          }
          .flow-container {
            height: auto !important;
          }
          .nodes-layer {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .node-card-wrapper {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            transform: none !important;
            padding: 0 !important;
          }
        }
      `}} />
    </section>
  );
}
