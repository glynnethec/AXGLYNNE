'use client';

import React from 'react';
import { 
  FiArrowUpRight
} from 'react-icons/fi';

interface FleekStyleArchitectureSectionProps {
  isDark: boolean;
  onOpenKeyModal?: () => void;
}

export default function FleekStyleArchitectureSection({
  isDark,
  onOpenKeyModal
}: FleekStyleArchitectureSectionProps) {
  // STRICT MONOCHROME TOKENS - NO COLORS, PURE BLACK, WHITE & GRAYS
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  // SVG Graphics monochrome palette tokens
  const graphicStroke = isDark ? '#ffffff' : '#111111';
  const graphicFill1 = isDark ? '#27272a' : '#e4e4e7';
  const graphicFill2 = isDark ? '#3f3f46' : '#d4d4d8';
  const graphicFill3 = isDark ? '#52525b' : '#a1a1aa';

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLine}`,
      paddingTop: '64px',
      paddingBottom: '80px',
      color: textColor,
      fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    }}>

      {/* ========================================================================= */}
      {/* 02. ISOMETRIC HARDWARE STACK SCHEMATIC & "GIVING AI AN EDGE"             */}
      {/* ========================================================================= */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '48px',
        alignItems: 'center',
        paddingBottom: '72px',
        borderBottom: `1px solid ${borderLine}`
      }}>
        {/* Left: Exploded 3D Isometric GPU Hardware Architecture SVG (Monochrome) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <svg width="380" height="320" viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Heatsink Layer (Layer 1) */}
            <g transform="translate(40, 20)">
              <polygon points="110,10 190,50 110,90 30,50" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} stroke={borderLine} strokeWidth="1" />
              <polygon points="110,18 190,58 110,98 30,58" fill={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} stroke={borderLine} strokeWidth="0.8" />
              <line x1="50" y1="52" x2="130" y2="12" stroke={borderLine} strokeWidth="0.8" />
              <line x1="70" y1="62" x2="150" y2="22" stroke={borderLine} strokeWidth="0.8" />
              <line x1="90" y1="72" x2="170" y2="32" stroke={borderLine} strokeWidth="0.8" />
              <line x1="190" y1="50" x2="230" y2="30" stroke={graphicStroke} strokeWidth="0.8" />
              <text x="235" y="33" fill={subtextColor} fontSize="10" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="500">SXM COOLING FIN</text>
            </g>

            {/* Central Die / Heatspreader with Lightning Logo (Layer 2) */}
            <g transform="translate(40, 95)">
              <polygon points="110,10 200,55 110,100 20,55" fill={isDark ? '#141414' : '#f4f4f5'} stroke={isDark ? '#ffffff' : '#000000'} strokeWidth="1.5" />
              <polygon points="110,15 200,60 110,105 20,60" fill="none" stroke={borderLine} strokeWidth="0.8" />
              <path d="M106 45 L118 45 L110 57 L119 57 L102 72 L106 59 L98 59 Z" fill={graphicStroke} stroke={graphicStroke} strokeWidth="0.5" />
              <line x1="20" y1="55" x2="-10" y2="40" stroke={borderLine} strokeWidth="0.8" />
              <text x="-35" y="38" fill={subtextColor} fontSize="10" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="500">SILICON DIE</text>
            </g>

            {/* GPU Accelerators & VRAM HBM3e Chiplets (Layer 3 - Monochrome) */}
            <g transform="translate(40, 160)">
              <polygon points="40,40 65,52 40,65 15,52" fill={graphicFill2} stroke={graphicStroke} strokeWidth="1" />
              <polygon points="70,55 95,67 70,80 45,67" fill={graphicFill3} stroke={graphicStroke} strokeWidth="1" />
              <polygon points="40,70 65,82 40,95 15,82" fill={graphicFill1} stroke={graphicStroke} strokeWidth="0.8" />
              <polygon points="110,10 220,65 110,120 0,65" fill={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} stroke={borderLine} strokeWidth="1" strokeDasharray="3 3" />
              {[
                { cx: 110, cy: 60 }, { cx: 130, cy: 70 }, { cx: 150, cy: 80 }, { cx: 170, cy: 90 },
                { cx: 90, cy: 70 }, { cx: 110, cy: 80 }, { cx: 130, cy: 90 }, { cx: 150, cy: 100 },
                { cx: 70, cy: 80 }, { cx: 90, cy: 90 }, { cx: 110, cy: 100 }
              ].map((pt, i) => (
                <circle key={i} cx={pt.cx} cy={pt.cy} r="2" fill={isDark ? '#ffffff' : '#000000'} opacity="0.6" />
              ))}
              <line x1="220" y1="65" x2="255" y2="75" stroke={borderLine} strokeWidth="0.8" />
              <text x="260" y="78" fill={subtextColor} fontSize="10" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="500">HBM3e / 141GB</text>
            </g>

            {/* Bottom PCB Carrier Base (Layer 4) */}
            <g transform="translate(40, 210)">
              <polygon points="110,10 230,70 110,130 -10,70" fill={isDark ? '#080808' : '#e4e4e7'} stroke={borderLine} strokeWidth="1.2" />
              <path d="M-10 70 L-10 78 L110 138 L230 78 L230 70" fill={isDark ? '#111111' : '#d4d4d8'} stroke={borderLine} strokeWidth="1" />
              <line x1="110" y1="130" x2="110" y2="138" stroke={borderLine} strokeWidth="1" />
              <text x="110" y="155" textAnchor="middle" fill={subtextColor} fontSize="10" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="500">
                // ARCHITECTURE: SXM5 DUAL INFERENCE BUS //
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Technical Checklist */}
        <div style={{ maxWidth: '540px', textAlign: 'left' }}>
          <div style={{
            fontFamily: monoFont,
            fontSize: '11px',
            color: subtextColor,
            letterSpacing: '0.08em',
            marginBottom: '12px',
            fontWeight: 500
          }}>
            02 // HARDWARE ACCELERATION
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0',
            color: textColor,
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            Giving Frontier AI an Edge
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            {[
              { label: 'HIGH PERFORMANCE', detail: 'Clusters con interconexión NVLink de 900 GB/s' },
              { label: 'LOW LATENCY', detail: 'Hasta 10ms por token en streaming en tiempo real' },
              { label: 'SCALABLE GPU MESH', detail: 'Asignación elástica de VRAM por modelo' },
              { label: 'ZERO RETENTION', detail: 'Blindaje criptográfico de datos y prompts' },
              { label: 'COST COMPETITIVE', detail: 'Sin sobreprecios de hyperscaler comercial' },
              { label: 'PROTOCOL AGNOSTIC', detail: 'Compatibilidad nativa con el estándar OpenAI' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{
                  fontSize: '9px',
                  color: textColor,
                  opacity: 0.8,
                  lineHeight: 1,
                  flexShrink: 0
                }}>
                  ▲
                </span>
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: '13px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}>
                    {item.label}
                  </strong>
                  <span style={{ color: borderLine, margin: '0 8px' }}>—</span>
                  <span style={{
                    color: subtextColor,
                    fontSize: '13px',
                    fontWeight: 300
                  }}>
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blueprint Stepper Indicator 02 -> 03 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '36px 0' }}>
        <div style={{
          width: '28px',
          height: '28px',
          border: `1px solid ${borderLine}`,
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? '#000000' : '#ffffff'
        }}>
          <span style={{ transform: 'rotate(-45deg)', fontSize: '11px', fontFamily: monoFont, fontWeight: 600 }}>03</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 03. TERMINAL MANIFESTO: "BRINGING THE MODERN AI STACK TO OPEN WEIGHTS"    */}
      {/* ========================================================================= */}
      <section style={{
        paddingBottom: '72px',
        borderBottom: `1px solid ${borderLine}`,
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: monoFont,
          fontSize: '11px',
          color: subtextColor,
          letterSpacing: '0.08em',
          marginBottom: '12px',
          fontWeight: 500
        }}>
          03 // THE OPEN WEIGHTS MANIFESTO
        </div>

        <h2 style={{
          fontSize: 'clamp(28px, 4.5vw, 48px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: textColor,
          margin: '0 0 32px 0',
          fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
        }}>
          Bringing the Modern AI Stack to Open Weights
        </h2>

        {/* Blueprint Terminal Box (Monochrome) */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          border: `1px solid ${borderLine}`,
          backgroundColor: isDark ? '#080808' : '#fafafa',
          overflow: 'hidden',
          boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.7)' : '0 10px 30px rgba(0,0,0,0.06)'
        }}>
          {/* Terminal Banner */}
          <div style={{
            padding: '12px 18px',
            borderBottom: `1px solid ${borderLine}`,
            fontFamily: monoFont,
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: subtextColor,
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            /////////////////////////////// THE PROMISE ///////////////////////////////
          </div>

          {/* Manifesto Lines */}
          <div style={{
            padding: '40px 32px',
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.7,
              color: textColor,
              fontWeight: 400,
              margin: 0
            }}>
              Aprovechando la aceleración de hardware en clústeres dedicados, la infraestructura de inteligencia artificial se está reconstruyendo.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.7,
              color: subtextColor,
              fontWeight: 300,
              margin: 0
            }}>
              No más dependencias cautivas de modelos propietarios ni cajas negras inaccesibles.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.7,
              color: textColor,
              fontWeight: 400,
              margin: 0
            }}>
              Soberanía absoluta sobre tus datos, tus pesos matemáticos y tu propiedad intelectual.
            </p>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.7,
              color: subtextColor,
              fontWeight: 300,
              margin: 0
            }}>
              Inferencia ultrarrápida (hasta 10ms/tok) entregada directamente a tus aplicaciones a una fracción del costo tradicional.
            </p>
            <div style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: `1px dashed ${borderLine}`,
              color: textColor,
              fontWeight: 600,
              fontSize: '15px',
              letterSpacing: '0.02em'
            }}>
              <span style={{ fontFamily: monoFont, color: subtextColor, marginRight: '8px' }}>&gt;</span>
              Open Weights. Instant APIs. Institutional Security.
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Stepper Indicator 03 -> 04 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '36px 0' }}>
        <div style={{
          width: '28px',
          height: '28px',
          border: `1px solid ${borderLine}`,
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? '#000000' : '#ffffff'
        }}>
          <span style={{ transform: 'rotate(-45deg)', fontSize: '11px', fontFamily: monoFont, fontWeight: 600 }}>04</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 04. CALL TO ACTION: "WANT TO BUILD WITH GLYNNE?" - DUAL TREE BRANCH       */}
      {/* ========================================================================= */}
      <section style={{
        textAlign: 'center',
        paddingBottom: '48px'
      }}>
        <div style={{
          fontFamily: monoFont,
          fontSize: '11px',
          color: subtextColor,
          letterSpacing: '0.08em',
          marginBottom: '12px',
          fontWeight: 500
        }}>
          04 // CONNECT & BUILD
        </div>

        <h2 style={{
          fontSize: 'clamp(28px, 4.5vw, 48px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: textColor,
          margin: '0 0 16px 0',
          fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
        }}>
          Want to Build with GLYNNE?
        </h2>
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: subtextColor,
          margin: '0 0 40px 0',
          fontWeight: 300,
          lineHeight: 1.6,
          fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
        }}>
          Conecta tus proyectos con sub-APIs o ejecuta cargas de trabajo en nuestra infraestructura.
        </p>

        {/* Tree Branch Split Graphic */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Center Vertical Stem Line */}
          <div style={{
            width: '1px',
            height: '28px',
            backgroundColor: borderLine,
            margin: '0 auto'
          }} />

          {/* Horizontal Split Line */}
          <div style={{
            height: '1px',
            backgroundColor: borderLine,
            margin: '0 25%',
            position: 'relative'
          }} />

          {/* Two Descending Connector Lines */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '16px'
          }}>
            <div style={{ width: '1px', height: '20px', backgroundColor: borderLine }} />
            <div style={{ width: '1px', height: '20px', backgroundColor: borderLine }} />
          </div>

          {/* Dual Cards (Monochrome) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Card 1: NODE OPERATORS / GPU INFRASTRUCTURE */}
            <div style={{
              border: `1px solid ${borderLine}`,
              padding: '32px 28px',
              backgroundColor: isDark ? 'rgba(15,15,15,0.6)' : 'rgba(255,255,255,0.6)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
                  fontSize: '14px',
                  fontWeight: 700,
                  color: textColor,
                  marginBottom: '10px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  GPU OPERATORS & CLUSTERS
                </div>
                <div style={{
                  fontSize: '13px',
                  color: subtextColor,
                  lineHeight: 1.6,
                  fontWeight: 300,
                  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
                }}>
                  Conecta tus servidores y clusters NVIDIA (H100/A100) para procesar inferencia descentralizada de alta concurrencia.
                </div>
              </div>

              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: `1.5px solid ${textColor}`,
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-start',
                  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000';
                  e.currentTarget.style.color = isDark ? '#000000' : '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = textColor;
                }}
              >
                <span>JOIN GPU MESH</span>
                <FiArrowUpRight size={14} />
              </a>
            </div>

            {/* Card 2: DEVELOPERS & ENTERPRISE */}
            <div style={{
              border: `1px solid ${borderLine}`,
              padding: '32px 28px',
              backgroundColor: isDark ? 'rgba(15,15,15,0.6)' : 'rgba(255,255,255,0.6)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
                  fontSize: '14px',
                  fontWeight: 700,
                  color: textColor,
                  marginBottom: '10px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  DEVELOPERS & APPS
                </div>
                <div style={{
                  fontSize: '13px',
                  color: subtextColor,
                  lineHeight: 1.6,
                  fontWeight: 300,
                  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
                }}>
                  Genera Sub-API keys en segundos, integra SDKs de OpenAI o LangChain y despliega agentes autónomos sin fricción.
                </div>
              </div>

              <button
                onClick={onOpenKeyModal}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: `1.5px solid ${textColor}`,
                  backgroundColor: isDark ? '#ffffff' : '#000000',
                  color: isDark ? '#000000' : '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-start',
                  fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = textColor;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000';
                  e.currentTarget.style.color = isDark ? '#000000' : '#ffffff';
                }}
              >
                <span>CREATE SUB-API KEY</span>
                <FiArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. TECHNICAL BOTTOM MICRO-BAR (PURE MONOCHROME)                          */}
      {/* ========================================================================= */}
      <div style={{
        marginTop: '32px',
        paddingTop: '20px',
        borderTop: `1px solid ${borderLine}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        fontFamily: monoFont,
        fontSize: '11px',
        color: subtextColor
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: textColor }}>//</span>
          <span style={{ fontWeight: 600, color: textColor }}>AXGLYNNE AI PROVIDER</span>
          <span>·</span>
          <span>ENTERPRISE INFERENCE CORE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: textColor }} />
            <span>99.99% LIVE</span>
          </span>
          <span>LATENCY: 10MS/TOK</span>
          <span>OPEN WEIGHTS</span>
        </div>
      </div>

    </div>
  );
}
