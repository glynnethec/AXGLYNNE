'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import {
  FiCpu,
  FiLayers,
  FiZap,
  FiShield,
  FiArrowRight,
  FiActivity,
  FiTerminal
} from 'react-icons/fi';

export default function HomeNvidiaInfraSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.12)';
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  const features = [
    {
      icon: <FiZap style={{ color: textColor }} size={18} />,
      title: 'Real-Time API Inference',
      desc: 'All requests to our model APIs run accelerated by optimized inference engines (TensorRT-LLM and NVIDIA NIM), achieving ultra-low latencies down to 10ms per token in continuous streaming.'
    },
    {
      icon: <FiCpu style={{ color: textColor }} size={18} />,
      title: 'High-Precision Native Fine-Tuning',
      desc: 'Training and parameter adaptation workloads (QLoRA) execute directly on 80GB HBM3 memory (3.35 TB/s) and FP8 Tensor Cores of GH100 silicon, adapting models to your data without bottlenecks.'
    },
    {
      icon: <FiLayers style={{ color: textColor }} size={18} />,
      title: '900 GB/s NVLink Interconnect',
      desc: 'GPU clusters linked point-to-point with 7x greater bandwidth than PCIe Gen 5. Enables tensor parallelism for massive models without memory fragmentation.'
    },
    {
      icon: <FiShield style={{ color: textColor }} size={18} />,
      title: 'Zero Data Retention & Isolation',
      desc: 'Your prompts, API calls, and confidential datasets are processed on hardware with cryptographic partitioning and strict zero-data-retention-at-rest policies.'
    }
  ];

  return (
    <section
      id="nvidia-infrastructure"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        boxSizing: 'border-box',
        borderTop: `1px solid ${borderLine}`,
        borderBottom: `1px solid ${borderLine}`,
        padding: '5rem clamp(20px, 4.5vw, 64px) 5.5rem clamp(20px, 4.5vw, 64px)',
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        boxSizing: 'border-box'
      }}>

        {/* 01. NVIDIA VECTOR BRANDING HEADER (SIN FONDO) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          paddingBottom: '2rem',
          borderBottom: `1px solid ${borderLine}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <div style={{
              position: 'relative',
              width: '130px',
              height: '92px',
              filter: 'drop-shadow(0 4px 20px rgba(118, 185, 0, 0.28))',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Image
                src="/images/nvidia_logo_transparent.png"
                alt="NVIDIA Vector Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                fontFamily: monoFont,
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: subtextColor,
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                OFFICIAL HARDWARE ECOSYSTEM
              </div>
              <div style={{
                fontSize: '14px',
                color: textColor,
                fontWeight: 500,
                letterSpacing: '-0.01em'
              }}>
                Certified Model Acceleration & Infrastructure
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
            border: `1px solid ${borderLine}`,
            fontFamily: monoFont,
            fontSize: '11px',
            color: subtextColor
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'
            }} />
            <span>DIRECT COMPUTE PIPELINE // ACTIVE</span>
          </div>
        </div>

        {/* Header Tag & Section Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          maxWidth: '920px'
        }}>
          {/* Top Pill / Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: monoFont,
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: isDark ? '#a1a1aa' : '#666666'
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'
            }} />
            <span>NVIDIA ENTERPRISE COMPUTE // DIRECT HARDWARE PIPELINE</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ color: textColor, fontWeight: 600 }}>H100 SXM5 CLUSTERS</span>
          </div>

          {/* Main Headline */}
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: textColor
          }}>
            Direct AI Compute: API Inference and Fine-Tuning on NVIDIA Hardware
          </h2>

          {/* Subtitle / Narrative */}
          <p style={{
            margin: 0,
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            lineHeight: 1.65,
            color: subtextColor,
            fontWeight: 300,
            maxWidth: '860px'
          }}>
            At GLYNNE, we don't rely on slow intermediaries or generic layers. Both real-time requests to our
            <strong style={{ color: textColor, fontWeight: 500 }}> model APIs </strong>
            and enterprise
            <strong style={{ color: textColor, fontWeight: 500 }}> custom Fine-Tuning workflows </strong>
            run directly on <strong style={{ color: textColor, fontWeight: 600 }}>NVIDIA H100 SXM5</strong> supercomputing architecture,
            delivering minimal latency, industrial thermal headroom, and secure data isolation.
          </p>
        </div>

        {/* 2-Column Showcase: Text / Features on Left & Exploded Isometric Image on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>

          {/* Left Column: Feature Grid & CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}>
              {features.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: cardBg,
                    border: `1px solid ${borderLine}`,
                    padding: '1.25rem',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = borderLine;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.icon}
                    <h3 style={{
                      margin: 0,
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: textColor
                    }}>
                      {item.title}
                    </h3>
                  </div>
                  <p style={{
                    margin: 0,
                    fontSize: '12px',
                    lineHeight: 1.55,
                    color: subtextColor,
                    fontWeight: 300
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Action Links to API Provider and Fine-Tuning */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              paddingTop: '0.5rem'
            }}>
              <Link
                href="/models_provider"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isDark ? '#ffffff' : '#000000',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  border: `1px solid ${borderLine}`,
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = borderLine;
                }}
              >
                <FiTerminal size={14} style={{ color: textColor }} />
                <span>Explore Model APIs</span>
                <FiArrowRight size={13} />
              </Link>

              <Link
                href="/TrainModel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: subtextColor,
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderLine}`,
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textColor;
                  e.currentTarget.style.borderColor = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = subtextColor;
                  e.currentTarget.style.borderColor = borderLine;
                }}
              >
                <FiActivity size={14} />
                <span>QLoRA Fine-Tuning Workflows</span>
                <FiArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right Column: Exploded Isometric Diagram Showcase */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              backgroundColor: '#050505',
              border: `1px solid ${borderLine}`,
              borderRadius: '6px',
              boxSizing: 'border-box',
              overflow: 'hidden',
              padding: '20px 20px 16px 20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: isDark
                ? '0 20px 40px rgba(0, 0, 0, 0.7)'
                : '0 20px 40px rgba(0, 0, 0, 0.12)'
            }}>

              {/* Corner crosshairs blueprint details */}
              <span style={{ position: 'absolute', top: '10px', left: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
              <span style={{ position: 'absolute', top: '10px', right: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
              <span style={{ position: 'absolute', bottom: '10px', left: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
              <span style={{ position: 'absolute', bottom: '10px', right: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>

              {/* Blueprint Top Header Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '14px',
                fontFamily: monoFont,
                fontSize: '10px',
                color: '#888888',
                letterSpacing: '0.08em'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: subtextColor }}>●</span>
                  <span style={{ color: '#cccccc', fontWeight: 600 }}>NVIDIA H100 SXM // SCHEMATIC BLUEPRINT</span>
                </div>
                <div>CAD ISOMETRIC EXPLODED VIEW</div>
              </div>

              {/* Exploded Isometric Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1024 / 571',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#000000'
              }}>
                <Image
                  src="/images/nvidia_h100_exploded.jpg"
                  alt="NVIDIA H100 SXM Technical Diagram - Exploded Isometric View"
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  style={{
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  priority
                />
              </div>

              {/* Blueprint Footer Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                marginTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: monoFont,
                fontSize: '9px',
                color: '#777777',
                letterSpacing: '0.06em'
              }}>
                <span>LAYER 1-4 DECONSTRUCTED ARCHITECTURE</span>
                <span style={{ color: '#999999' }}>80GB HBM3 · NVLINK 900 GB/S</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Technical Spec Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${borderLine}`
        }}>
          <div>
            <div style={{ fontFamily: monoFont, fontSize: '11px', color: subtextColor, letterSpacing: '0.1em' }}>01 // MEMORY SPEED</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: textColor, marginTop: '4px' }}>3.35 TB/s</div>
            <div style={{ fontSize: '12px', color: subtextColor, marginTop: '2px' }}>Ultra-fast HBM3 bandwidth</div>
          </div>

          <div>
            <div style={{ fontFamily: monoFont, fontSize: '11px', color: subtextColor, letterSpacing: '0.1em' }}>02 // INTERCONNECT</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: textColor, marginTop: '4px' }}>900 GB/s</div>
            <div style={{ fontSize: '12px', color: subtextColor, marginTop: '2px' }}>Bidirectional point-to-point NVLink</div>
          </div>

          <div>
            <div style={{ fontFamily: monoFont, fontSize: '11px', color: subtextColor, letterSpacing: '0.1em' }}>03 // TENSOR CORES</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: textColor, marginTop: '4px' }}>4th Gen FP8</div>
            <div style={{ fontSize: '12px', color: subtextColor, marginTop: '2px' }}>Transformer Engine inference</div>
          </div>

          <div>
            <div style={{ fontFamily: monoFont, fontSize: '11px', color: subtextColor, letterSpacing: '0.1em' }}>04 // AVERAGE LATENCY</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: textColor, marginTop: '4px' }}>&lt; 15ms / tok</div>
            <div style={{ fontSize: '12px', color: subtextColor, marginTop: '2px' }}>Real-time streaming response</div>
          </div>
        </div>

      </div>
    </section>
  );
}
