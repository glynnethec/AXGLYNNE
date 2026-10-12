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
        {/* Left: Exploded 3D Isometric GPU Hardware Architecture SVG (Monochrome CAD/Blueprint) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <svg width="100%" height="340" viewBox="0 0 540 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '520px', display: 'block' }}>
            {/* Precision Blueprint Corner Crosshairs */}
            <path d="M14 16 H20 M17 13 V19" stroke={borderLine} strokeWidth="1" strokeLinecap="round" />
            <path d="M520 16 H526 M523 13 V19" stroke={borderLine} strokeWidth="1" strokeLinecap="round" />
            <path d="M14 334 H20 M17 331 V337" stroke={borderLine} strokeWidth="1" strokeLinecap="round" />
            <path d="M520 334 H526 M523 331 V337" stroke={borderLine} strokeWidth="1" strokeLinecap="round" />

            {/* Central Vertical Assembly Axis */}
            <line x1="270" y1="12" x2="270" y2="318" stroke={borderLine} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
            <line x1="198" y1="52" x2="174" y2="262" stroke={borderLine} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.25" />
            <line x1="342" y1="52" x2="366" y2="262" stroke={borderLine} strokeWidth="0.8" strokeDasharray="2 4" opacity="0.25" />

            {/* ========================================================================= */}
            {/* LAYER 1 (TOP): SXM COOLING FIN / VAPOR CHAMBER                           */}
            {/* ========================================================================= */}
            <g id="layer-1-cooling-fin">
              {/* Top Face */}
              <polygon points="270,16 342,52 270,88 198,52" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'} stroke={graphicStroke} strokeWidth="1.2" />
              {/* Fin Slats / Parallel Cooling Channels */}
              <line x1="216" y1="43" x2="288" y2="79" stroke={borderLine} strokeWidth="0.9" />
              <line x1="234" y1="34" x2="306" y2="70" stroke={borderLine} strokeWidth="0.9" />
              <line x1="252" y1="25" x2="324" y2="61" stroke={borderLine} strokeWidth="0.9" />
              {/* Beveled Edge / Fin Thickness */}
              <polygon points="198,52 270,88 270,94 198,58" fill={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} stroke={borderLine} strokeWidth="0.9" />
              <polygon points="270,88 342,52 342,58 270,94" fill={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} stroke={borderLine} strokeWidth="0.9" />
              {/* Leader Callout: Top-Right */}
              <circle cx="342" cy="52" r="2.5" fill={textColor} />
              <line x1="342" y1="52" x2="380" y2="38" stroke={graphicStroke} strokeWidth="1" />
              <line x1="380" y1="38" x2="400" y2="38" stroke={graphicStroke} strokeWidth="1" />
              <text x="406" y="36" textAnchor="start" fill={textColor} fontSize="9" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="600">SXM COOLING FIN</text>
              <text x="406" y="47" textAnchor="start" fill={subtextColor} fontSize="7" letterSpacing="0.08em" fontFamily={monoFont}>VAPOR CHAMBER // 700W</text>
            </g>

            {/* ========================================================================= */}
            {/* LAYER 2: SILICON COMPUTING DIE & TENSOR CORES                             */}
            {/* ========================================================================= */}
            <g id="layer-2-silicon-die">
              {/* Top Face */}
              <polygon points="270,88 336,122 270,156 204,122" fill={isDark ? '#141416' : '#f4f4f5'} stroke={textColor} strokeWidth="1.5" />
              {/* Thickness */}
              <polygon points="204,122 270,156 270,161 204,127" fill={isDark ? '#0c0c0e' : '#e4e4e7'} stroke={borderLine} strokeWidth="0.9" />
              <polygon points="270,156 336,122 336,127 270,161" fill={isDark ? '#101012' : '#d4d4d8'} stroke={borderLine} strokeWidth="0.9" />
              {/* Silicon Wafer Photolithography / Tensor Sub-Quadrants */}
              <polygon points="270,105 304,122 270,139 236,122" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} stroke={borderLine} strokeWidth="1" />
              <line x1="253" y1="113.5" x2="287" y2="130.5" stroke={borderLine} strokeWidth="0.8" />
              <line x1="287" y1="113.5" x2="253" y2="130.5" stroke={borderLine} strokeWidth="0.8" />
              {/* Central Processor Core Monolith */}
              <polygon points="270,116 282,122 270,128 258,122" fill={textColor} />
              {/* Leader Callout: Left */}
              <circle cx="204" cy="122" r="2.5" fill={textColor} />
              <line x1="204" y1="122" x2="160" y2="110" stroke={graphicStroke} strokeWidth="1" />
              <line x1="160" y1="110" x2="140" y2="110" stroke={graphicStroke} strokeWidth="1" />
              <text x="134" y="108" textAnchor="end" fill={textColor} fontSize="9" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="600">SILICON DIE</text>
              <text x="134" y="119" textAnchor="end" fill={subtextColor} fontSize="7" letterSpacing="0.08em" fontFamily={monoFont}>TSMC 4N // TENSOR CORE</text>
            </g>

            {/* ========================================================================= */}
            {/* LAYER 3: HBM3e HIGH-BANDWIDTH MEMORY & INTERPOSER MESH                    */}
            {/* ========================================================================= */}
            <g id="layer-3-hbm3e-interposer">
              {/* Interposer Footprint */}
              <polygon points="270,152 354,192 270,232 186,192" fill={isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} stroke={borderLine} strokeWidth="1" strokeDasharray="3 3" />
              
              {/* 4 Discrete Symmetrical 3D HBM3e Memory Chiplets */}
              {/* Top-Left Chiplet */}
              <polygon points="220,171 234,178 220,185 206,178" fill={graphicFill2} stroke={graphicStroke} strokeWidth="1" />
              <polygon points="206,178 220,185 220,190 206,183" fill={graphicFill1} stroke={graphicStroke} strokeWidth="0.8" />
              <polygon points="220,185 234,178 234,183 220,190" fill={graphicFill3} stroke={graphicStroke} strokeWidth="0.8" />
              
              {/* Bottom-Left Chiplet */}
              <polygon points="236,201 250,208 236,215 222,208" fill={graphicFill2} stroke={graphicStroke} strokeWidth="1" />
              <polygon points="222,208 236,215 236,220 222,213" fill={graphicFill1} stroke={graphicStroke} strokeWidth="0.8" />
              <polygon points="236,215 250,208 250,213 236,220" fill={graphicFill3} stroke={graphicStroke} strokeWidth="0.8" />

              {/* Top-Right Chiplet */}
              <polygon points="320,171 334,178 320,185 306,178" fill={graphicFill2} stroke={graphicStroke} strokeWidth="1" />
              <polygon points="306,178 320,185 320,190 306,183" fill={graphicFill1} stroke={graphicStroke} strokeWidth="0.8" />
              <polygon points="320,185 334,178 334,183 320,190" fill={graphicFill3} stroke={graphicStroke} strokeWidth="0.8" />

              {/* Bottom-Right Chiplet */}
              <polygon points="304,201 318,208 304,215 290,208" fill={graphicFill2} stroke={graphicStroke} strokeWidth="1" />
              <polygon points="290,208 304,215 304,220 290,213" fill={graphicFill1} stroke={graphicStroke} strokeWidth="0.8" />
              <polygon points="304,215 318,208 318,213 304,220" fill={graphicFill3} stroke={graphicStroke} strokeWidth="0.8" />

              {/* Micro BGA Solder Bump Array in Center */}
              {[
                { x: 270, y: 180 }, { x: 260, y: 185 }, { x: 280, y: 185 },
                { x: 270, y: 190 }, { x: 260, y: 195 }, { x: 280, y: 195 },
                { x: 270, y: 200 }, { x: 270, y: 206 }
              ].map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="1.5" fill={textColor} opacity="0.75" />
              ))}

              {/* Leader Callout: Right */}
              <circle cx="354" cy="192" r="2.5" fill={textColor} />
              <line x1="354" y1="192" x2="388" y2="182" stroke={graphicStroke} strokeWidth="1" />
              <line x1="388" y1="182" x2="404" y2="182" stroke={graphicStroke} strokeWidth="1" />
              <text x="410" y="180" textAnchor="start" fill={textColor} fontSize="9" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="600">HBM3e / 141GB</text>
              <text x="410" y="191" textAnchor="start" fill={subtextColor} fontSize="7" letterSpacing="0.08em" fontFamily={monoFont}>3.35 TB/s BANDWIDTH</text>
            </g>

            {/* ========================================================================= */}
            {/* LAYER 4 (BOTTOM): SXM5 CARRIER BASE PCB & NVLINK 900 GB/s BUS             */}
            {/* ========================================================================= */}
            <g id="layer-4-carrier-base">
              {/* Board Top Surface */}
              <polygon points="270,214 366,262 270,310 174,262" fill={isDark ? '#080808' : '#e4e4e7'} stroke={borderLine} strokeWidth="1.2" />
              {/* Edge Thickness */}
              <polygon points="174,262 270,310 270,319 174,271" fill={isDark ? '#111111' : '#d4d4d8'} stroke={borderLine} strokeWidth="1" />
              <polygon points="270,310 366,262 366,271 270,319" fill={isDark ? '#0a0a0c' : '#cccccc'} stroke={borderLine} strokeWidth="1" />
              {/* Gold Edge Connector Pins */}
              <line x1="198" y1="274" x2="198" y2="280" stroke={textColor} strokeWidth="1.2" opacity="0.7" />
              <line x1="222" y1="286" x2="222" y2="292" stroke={textColor} strokeWidth="1.2" opacity="0.7" />
              <line x1="246" y1="298" x2="246" y2="304" stroke={textColor} strokeWidth="1.2" opacity="0.7" />
              <line x1="294" y1="298" x2="294" y2="304" stroke={textColor} strokeWidth="1.2" opacity="0.7" />
              <line x1="318" y1="286" x2="318" y2="292" stroke={textColor} strokeWidth="1.2" opacity="0.7" />
              <line x1="342" y1="274" x2="342" y2="280" stroke={textColor} strokeWidth="1.2" opacity="0.7" />
              {/* Leader Callout: Bottom-Left */}
              <circle cx="174" cy="262" r="2.5" fill={textColor} />
              <line x1="174" y1="262" x2="145" y2="252" stroke={graphicStroke} strokeWidth="1" />
              <line x1="145" y1="252" x2="130" y2="252" stroke={graphicStroke} strokeWidth="1" />
              <text x="124" y="250" textAnchor="end" fill={textColor} fontSize="9" letterSpacing="0.08em" fontFamily={monoFont} fontWeight="600">SXM5 CARRIER BASE</text>
              <text x="124" y="261" textAnchor="end" fill={subtextColor} fontSize="7" letterSpacing="0.08em" fontFamily={monoFont}>900 GB/s NVLINK MESH</text>
            </g>

            {/* Bottom Architecture Inscription */}
            <text x="270" y="338" textAnchor="middle" fill={subtextColor} fontSize="8.5" letterSpacing="0.1em" fontFamily={monoFont} fontWeight="500">
              // ARCHITECTURE: SXM5 NVLINK 900 GB/s DUAL MESH //
            </text>
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
