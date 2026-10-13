'use client';

import React from 'react';
import Image from 'next/image';
import { 
  FiCpu, 
  FiLayers, 
  FiActivity, 
  FiZap 
} from 'react-icons/fi';

interface NvidiaH100HardwareSectionProps {
  isDark: boolean;
}

export default function NvidiaH100HardwareSection({ isDark }: NvidiaH100HardwareSectionProps) {
  // Monochrome / architectural color tokens matching the site design
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  const checklistItems = [
    { label: 'HIGH PERFORMANCE', detail: 'Clusters con interconexión NVLink de 900 GB/s' },
    { label: 'LOW LATENCY', detail: 'Hasta 10ms por token en streaming en tiempo real' },
    { label: 'SCALABLE GPU MESH', detail: 'Asignación elástica de VRAM por modelo' },
    { label: 'ZERO RETENTION', detail: 'Blindaje criptográfico de datos y prompts' },
    { label: 'COST COMPETITIVE', detail: 'Sin sobreprecios de hyperscaler comercial' },
    { label: 'PROTOCOL AGNOSTIC', detail: 'Compatibilidad nativa con el estándar OpenAI' }
  ];

  const cardsData = [
    {
      num: '001',
      badge: 'TSMC 4N // 80B TRANSISTORES',
      icon: <FiCpu style={{ fontSize: '22px' }} />,
      iconLabel: 'HOPPER GH100 DIE',
      title: 'NÚCLEO Y TRANSFORMER ENGINE',
      desc: '80 mil millones de transistores con núcleos Tensor de 4ª generación optimizados para inferencia en precisión FP8 y latencias ultra-bajas de hasta 10ms por token.'
    },
    {
      num: '002',
      badge: '80GB HBM3 // 3.35 TB/S',
      icon: <FiLayers style={{ fontSize: '22px' }} />,
      iconLabel: '5,120-BIT INTERPOSER BUS',
      title: 'MEMORIA DE ALTO ANCHO DE BANDA',
      desc: '6 stacks HBM3 conectados en paquete CoWoS de 5,120 bits para erradicar el cuello de botella de memoria en streaming y contextos largos de 128k tokens.'
    },
    {
      num: '003',
      badge: '900 GB/S NVLINK 4.0',
      icon: <FiActivity style={{ fontSize: '22px' }} />,
      iconLabel: 'MULTI-GPU CLUSTER FABRIC',
      title: 'INTERCONEXIÓN CLUSTER DISTRIBUIDA',
      desc: 'Interconexión masiva punto a punto 7x más veloz que PCIe Gen 5 para paralelismo de tensores sin fricción entre las 8 GPUs de cada nodo de supercomputación HGX.'
    },
    {
      num: '004',
      badge: '700W SXM5 DUAL-PHASE',
      icon: <FiZap style={{ fontSize: '22px' }} />,
      iconLabel: 'DIGITAL VRM POWER STAGES',
      title: 'ENTREGA Y ESTABILIDAD ELÉCTRICA',
      desc: 'Módulos de regulación de voltaje digital multifase con componentes de grado militar, garantizando estabilidad total en operaciones críticas y continuas 24/7.'
    }
  ];

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLine}`,
      paddingTop: '64px',
      paddingBottom: '72px',
      color: textColor,
      fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    }}>

      {/* ========================================================================= */}
      {/* 02. ISOMETRIC HARDWARE STACK SCHEMATIC & "GIVING FRONTIER AI AN EDGE"     */}
      {/* ========================================================================= */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '48px',
        alignItems: 'center',
        paddingBottom: '56px',
        borderBottom: `1px solid ${borderLine}`
      }}>
        {/* Left: Real NVIDIA H100 Board Schematic Blueprint */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '540px',
            backgroundColor: '#070708',
            border: `1px solid ${borderLine}`,
            boxSizing: 'border-box',
            overflow: 'hidden',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            padding: '24px 18px 20px 18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Precision Blueprint Corner Crosshairs */}
            <span style={{ position: 'absolute', top: '10px', left: '10px', color: subtextColor, fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', top: '10px', right: '10px', color: subtextColor, fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', bottom: '10px', left: '10px', color: subtextColor, fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', bottom: '10px', right: '10px', color: subtextColor, fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>

            {/* Central NVIDIA H100 Board Graphic */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1024 / 778'
            }}>
              <Image 
                src="/images/nvidia_h100_schematic.jpg"
                alt="NVIDIA H100 SXM5 Tensor Core GPU Architecture Blueprint"
                fill
                sizes="(max-width: 600px) 100vw, 540px"
                style={{
                  objectFit: 'contain',
                  display: 'block'
                }}
                priority
              />

              {/* Exact Callout Leader Labels */}
              {/* Leader Callout: SILICON DIE / TSMC 4N */}
              <div style={{
                position: 'absolute',
                left: '2%',
                bottom: '8%',
                textAlign: 'left',
                pointerEvents: 'none'
              }}>
                <div style={{
                  fontFamily: monoFont,
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  SILICON DIE
                </div>
                <div style={{
                  fontFamily: monoFont,
                  fontSize: '7.5px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '0.08em'
                }}>
                  TSMC 4N // TENSOR CORE
                </div>
              </div>

              {/* Leader Callout: HBM3e / 141GB / 3.35 TB/s */}
              <div style={{
                position: 'absolute',
                right: '2%',
                top: '6%',
                textAlign: 'right',
                pointerEvents: 'none'
              }}>
                <div style={{
                  fontFamily: monoFont,
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  HBM3e / 141GB
                </div>
                <div style={{
                  fontFamily: monoFont,
                  fontSize: '7.5px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '0.08em'
                }}>
                  3.35 TB/s BANDWIDTH
                </div>
              </div>

              {/* Leader Callout: SXM5 CARRIER BASE / 900 GB/s NVLINK */}
              <div style={{
                position: 'absolute',
                right: '2%',
                bottom: '6%',
                textAlign: 'right',
                pointerEvents: 'none'
              }}>
                <div style={{
                  fontFamily: monoFont,
                  fontSize: '9px',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  SXM5 CARRIER BASE
                </div>
                <div style={{
                  fontFamily: monoFont,
                  fontSize: '7.5px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '0.08em'
                }}>
                  900 GB/s NVLINK MESH
                </div>
              </div>
            </div>

            {/* Bottom Inscription */}
            <div style={{
              marginTop: '12px',
              fontFamily: monoFont,
              fontSize: '8.5px',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.55)',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              {"// ARCHITECTURE: SXM5 NVLINK 900 GB/s DUAL MESH //"}
            </div>
          </div>
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
            {checklistItems.map((item, i) => (
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

      {/* ========================================================================= */}
      {/* 4-COLUMN ARCHITECTURAL CARDS (FULL INFO & EXACT HOME/OFFERINGS STYLE)     */}
      {/* ========================================================================= */}
      <div style={{
        marginTop: '48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0px',
        borderTop: `1px solid ${borderLine}`,
        borderLeft: `1px solid ${borderLine}`,
        boxSizing: 'border-box'
      }}>
        {cardsData.map((card) => (
          <div
            key={card.num}
            style={{
              padding: '32px 24px',
              borderRight: `1px solid ${borderLine}`,
              borderBottom: `1px solid ${borderLine}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '290px',
              backgroundColor: 'transparent',
              boxSizing: 'border-box',
              transition: 'background-color 0.2s ease',
              textAlign: 'left'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div>
              {/* Top Micro-Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                fontFamily: monoFont,
                fontSize: '11px',
                color: subtextColor,
                letterSpacing: '0.08em'
              }}>
                <span>{card.num}</span>
                <span style={{
                  padding: '3px 8px',
                  border: `1px solid ${borderLine}`,
                  fontSize: '10px',
                  fontWeight: 700,
                  color: textColor,
                  textTransform: 'uppercase'
                }}>
                  {card.badge}
                </span>
              </div>

              {/* Graphic Icon and Label */}
              <div style={{ marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '8px', color: textColor }}>
                {card.icon}
                <span style={{ fontFamily: monoFont, fontSize: '11px', color: subtextColor, letterSpacing: '0.06em' }}>
                  {card.iconLabel}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: textColor,
                margin: '0 0 10px 0',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                textTransform: 'uppercase'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: subtextColor,
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0
              }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
