'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function JigsawShowcaseSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? 'rgba(255, 255, 255, 0.78)' : 'rgba(0, 0, 0, 0.72)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)';
  const radarLineColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos(null);
  };

  // Static fallback spotlight coordinates matching the reference image lens position
  const spotlightX = mousePos && isHovered ? `${mousePos.x}px` : '36%';
  const spotlightY = mousePos && isHovered ? `${mousePos.y}px` : '34%';

  return (
    <section
      id="jigsaw-showcase"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        backgroundColor: 'transparent',
        color: textColor,
        zIndex: 15,
        boxSizing: 'border-box',
        borderTop: `1px solid ${borderLine}`,
        borderBottom: `1px solid ${borderLine}`,
        padding: 'clamp(44px, 5.5vw, 76px) clamp(24px, 5vw, 84px) clamp(64px, 8vw, 108px) clamp(24px, 5vw, 84px)',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .jigsaw-hero-heading {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: clamp(40px, 6vw, 84px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.035em;
          margin: 0;
        }

        @media (max-width: 900px) {
          .jigsaw-middle-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .jigsaw-feature-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .jigsaw-hero-lower {
            flex-direction: column !important;
            gap: 24px !important;
            align-items: flex-start !important;
          }
        }
      `}</style>

      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* ============================================================== */}
        {/* 1. TOP NAV BAR: GLYNNE TRAIN BRANDING & NAVIGATION             */}
        {/* ============================================================== */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 'clamp(28px, 4vw, 44px)',
            borderBottom: `1px solid ${borderLine}`
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* GLYNNE Stylized Monogram Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <path
                d="M4 4H18V14L14 18H4V4Z"
                fill={textColor}
              />
              <path
                d="M7 7H15V13L13 15H7V7Z"
                fill={isDark ? '#000000' : '#ffffff'}
              />
            </svg>
            <span
              style={{
                fontSize: '14.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: textColor,
                textTransform: 'uppercase'
              }}
            >
              GLYNNE TRAIN
            </span>
          </div>

          {/* Right Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(18px, 2.5vw, 32px)' }}>
            {[
              { label: 'Modelos Base', href: '/ia_vailable' },
              { label: 'Aceleración NVIDIA', href: '#nvidia-infrastructure' },
              { label: 'Panel de Control', href: '/Create_you_GLYNNE_model' }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: subtextColor,
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = subtextColor;
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        {/* ============================================================== */}
        {/* 2. HERO SECTION: INTERACTIVE CIRCULAR SPOTLIGHT TYPOGRAPHY     */}
        {/* ============================================================== */}
        <div
          style={{
            paddingTop: 'clamp(54px, 8vw, 100px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(40px, 6vw, 80px)'
          }}
        >
          {/* Spotlight text container */}
          <div
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              cursor: 'crosshair',
              width: 'fit-content',
              maxWidth: '100%',
              userSelect: 'none'
            }}
          >
            {/* Background Muted Dark Glyphs */}
            <h1
              className="jigsaw-hero-heading"
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                whiteSpace: 'pre-line'
              }}
            >
              {`Tu propia inteligencia artificial\nentrenada para tu empresa`}
            </h1>

            {/* Pure White Illuminated Overlay Cutout (Exact Circular Mask) */}
            <h1
              className="jigsaw-hero-heading"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: textColor,
                whiteSpace: 'pre-line',
                pointerEvents: 'none',
                clipPath: `circle(115px at ${spotlightX} ${spotlightY})`,
                WebkitClipPath: `circle(115px at ${spotlightX} ${spotlightY})`,
                transition: isHovered ? 'clip-path 0.04s ease-out' : 'clip-path 0.45s ease-in-out'
              }}
            >
              {`Tu propia inteligencia artificial\nentrenada para tu empresa`}
            </h1>
          </div>

          {/* Lower hero row: Down arrow & unit summary */}
          <div
            className="jigsaw-hero-lower"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '32px'
            }}
          >
            {/* Arrow Down */}
            <div
              style={{
                fontSize: '22px',
                lineHeight: 1,
                color: textColor,
                opacity: 0.9,
                paddingTop: '4px'
              }}
            >
              ↓
            </div>

            {/* Description Paragraph */}
            <p
              style={{
                margin: 0,
                fontSize: '13.5px',
                lineHeight: 1.55,
                color: subtextColor,
                maxWidth: '460px',
                fontWeight: 400
              }}
            >
              En GLYNNE ponemos a tu disposición la infraestructura para reentrenar modelos libres con tus propios manuales, datos y procesos. Obtén un modelo 100% privado, adaptado a tu industria y libre de rentas recurrentes.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. MIDDLE SECTION: DIVIDER & 2-COLUMN PURPOSE STATEMENT        */}
        {/* ============================================================== */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: borderLine,
            margin: 'clamp(50px, 7vw, 90px) 0 clamp(44px, 6vw, 76px) 0'
          }}
        />

        <div
          className="jigsaw-middle-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: '40px',
            alignItems: 'flex-start'
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(26px, 3.2vw, 42px)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              color: textColor,
              maxWidth: '460px'
            }}
          >
            IA a medida sin la complejidad técnica.
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.65,
              color: subtextColor,
              fontWeight: 400,
              maxWidth: '540px'
            }}
          >
            Combinamos modelos de pesos abiertos con técnicas QLoRA de alta eficiencia sobre hardware NVIDIA. Esto significa que puedes especializar modelos de última generación en tiempo récord, reduciendo costos operativos hasta un 90% en comparación con los métodos tradicionales.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 4. BOTTOM FEATURE: WIREFRAME SCHEMATIC + FINE-TUNING PANEL CARD*/}
        {/* ============================================================== */}
        <div
          className="jigsaw-feature-grid"
          style={{
            marginTop: 'clamp(64px, 9vw, 120px)',
            display: 'grid',
            gridTemplateColumns: 'clamp(360px, 46vw, 540px) 1fr',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center'
          }}
        >
          {/* Left: Isometric Exploded View (Despiece Isométrico) of QLoRA Tensor Stack */}
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              viewBox="0 0 600 520"
              fill="none"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            >
              <defs>
                <radialGradient id="explodedGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"} />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>

              {/* Background Blueprint Subtle Center Glow */}
              <circle cx="300" cy="270" r="240" fill="url(#explodedGlow)" />

              {/* Outer Bounding Tactical Bracket Corners */}
              <path d="M 14 32 L 14 14 L 32 14" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <path d="M 568 14 L 586 14 L 586 32" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <path d="M 14 488 L 14 506 L 32 506" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <path d="M 568 506 L 586 506 L 586 488" stroke={radarLineColor} strokeWidth="1" fill="none" />

              {/* Header & Footer Technical Badges */}
              <text x="20" y="24" fill={textColor} opacity="0.6" fontSize="8" fontFamily="monospace" letterSpacing="0.12em">EXPLODED SCHEMATIC // FIG 04.2</text>
              <text x="580" y="24" textAnchor="end" fill={textColor} opacity="0.6" fontSize="8" fontFamily="monospace" letterSpacing="0.12em">ISOMETRIC 30° PROJECTION</text>
              <text x="20" y="500" fill={textColor} opacity="0.6" fontSize="8" fontFamily="monospace" letterSpacing="0.12em">SXM5 MULTI-GPU ENCLAVE</text>
              <text x="580" y="500" textAnchor="end" fill={textColor} opacity="0.6" fontSize="8" fontFamily="monospace" letterSpacing="0.12em">AUTONOMOUS QUANTIZATION</text>

              {/* ============================================================ */}
              {/* VERTICAL EXPLODED ASSEMBLY AXIS (Ejes de despiece central)   */}
              {/* ============================================================ */}
              <line x1="300" y1="36" x2="300" y2="490" stroke={radarLineColor} strokeWidth="1" strokeDasharray="4 4" />
              {/* Left corner exploded guide line */}
              <line x1="170" y1="190" x2="170" y2="410" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
              {/* Right corner exploded guide line */}
              <line x1="430" y1="190" x2="430" y2="410" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />

              {/* Exploded assembly alignment arrows */}
              <polygon points="300,126 296,132 304,132" fill={textColor} opacity="0.7" />
              <polygon points="300,238 296,244 304,244" fill={textColor} opacity="0.7" />
              <polygon points="300,336 296,342 304,342" fill={textColor} opacity="0.7" />

              {/* ============================================================ */}
              {/* LAYER 1: FOUNDATION BASE MODEL SLAB (Frozen 8-bit Quantized) */}
              {/* ============================================================ */}
              {/* Base Isometric Plate Top Face: Center (300, 410) */}
              <polygon
                points="300,345 430,410 300,475 170,410"
                fill={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}
                stroke={radarLineColor}
                strokeWidth="1.2"
              />
              {/* 3D Slab Thickness Drop (14px) */}
              {/* Left Front Face */}
              <polygon
                points="170,410 300,475 300,489 170,424"
                fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}
                stroke={radarLineColor}
                strokeWidth="1"
              />
              {/* Right Front Face */}
              <polygon
                points="300,475 430,410 430,424 300,489"
                fill={isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)"}
                stroke={radarLineColor}
                strokeWidth="1"
              />

              {/* Subdivided 4x4 Isometric Tensor Grid on Base Face */}
              {/* Lines running Left -> Bottom */}
              <line x1="202.5" y1="393.75" x2="332.5" y2="458.75" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="235" y1="377.5" x2="365" y2="442.5" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="267.5" y1="361.25" x2="397.5" y2="426.25" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />

              {/* Lines running Right -> Bottom */}
              <line x1="397.5" y1="393.75" x2="267.5" y2="458.75" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="365" y1="377.5" x2="235" y2="442.5" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="332.5" y1="361.25" x2="202.5" y2="426.25" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />

              {/* Micro-chip tensor core dies on base face */}
              <polygon points="300,390 314,397 300,404 286,397" fill={textColor} opacity="0.3" stroke={radarLineColor} strokeWidth="0.75" />
              <polygon points="267.5,406.25 281.5,413.25 267.5,420.25 253.5,413.25" fill={textColor} opacity="0.3" stroke={radarLineColor} strokeWidth="0.75" />
              <polygon points="332.5,406.25 346.5,413.25 332.5,420.25 318.5,413.25" fill={textColor} opacity="0.3" stroke={radarLineColor} strokeWidth="0.75" />
              <polygon points="300,422.5 314,429.5 300,436.5 286,429.5" fill={textColor} opacity="0.3" stroke={radarLineColor} strokeWidth="0.75" />

              {/* Callout [01]: Foundation Model INT8 Base */}
              <polyline points="430,410 465,422 505,422" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <rect x="428" y="408" width="4" height="4" fill={textColor} />
              <text x="512" y="420" fill={textColor} fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">[01] INT8 BASE</text>
              <text x="512" y="430" fill={textColor} opacity="0.65" fontSize="7.5" fontFamily="monospace" letterSpacing="0.06em">FROZEN TENSORS</text>

              {/* ============================================================ */}
              {/* LAYER 2: QLoRA LOW-RANK ADAPTER MATRICES (Decomposed B & A)  */}
              {/* ============================================================ */}
              {/* Floating Sub-plate B (Down-projection: d x r): Center (245, 292) */}
              <polygon
                points="245,265 285,286 245,307 205,286"
                fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}
                stroke={radarLineColor}
                strokeWidth="1.1"
              />
              <polygon
                points="205,286 245,307 245,315 205,294"
                fill={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
                stroke={radarLineColor}
                strokeWidth="0.8"
              />
              <polygon
                points="245,307 285,286 285,294 245,315"
                fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}
                stroke={radarLineColor}
                strokeWidth="0.8"
              />
              {/* Inner crosshatch grid on Matrix B */}
              <line x1="225" y1="275.5" x2="265" y2="296.5" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="265" y1="275.5" x2="225" y2="296.5" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <text x="245" y="289" textAnchor="middle" fill={textColor} fontSize="8" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">MAT B</text>

              {/* Central Tensor Operator Node (Tensor Dot Product) */}
              <circle cx="300" cy="292" r="7" stroke={radarLineColor} strokeWidth="1" fill={isDark ? "#000000" : "#ffffff"} />
              <circle cx="300" cy="292" r="2.5" fill={textColor} />
              <line x1="285" y1="286" x2="293" y2="289" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="307" y1="295" x2="315" y2="298" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="2 2" />

              {/* Floating Sub-plate A (Up-projection: r x k): Center (355, 292) */}
              <polygon
                points="355,265 395,286 355,307 315,286"
                fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}
                stroke={radarLineColor}
                strokeWidth="1.1"
              />
              <polygon
                points="315,286 355,307 355,315 315,294"
                fill={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
                stroke={radarLineColor}
                strokeWidth="0.8"
              />
              <polygon
                points="355,307 395,286 395,294 355,315"
                fill={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}
                stroke={radarLineColor}
                strokeWidth="0.8"
              />
              {/* Inner crosshatch grid on Matrix A */}
              <line x1="335" y1="275.5" x2="375" y2="296.5" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="375" y1="275.5" x2="335" y2="296.5" stroke={radarLineColor} strokeWidth="0.75" strokeDasharray="2 2" />
              <text x="355" y="289" textAnchor="middle" fill={textColor} fontSize="8" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">MAT A</text>

              {/* Callout [02]: QLoRA Low-Rank Decomposition */}
              <polyline points="205,286 165,274 105,274" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <rect x="203" y="284" width="4" height="4" fill={textColor} />
              <text x="98" y="271" textAnchor="end" fill={textColor} fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">[02] QLoRA ADAPTERS</text>
              <text x="98" y="281" textAnchor="end" fill={textColor} opacity="0.65" fontSize="7.5" fontFamily="monospace" letterSpacing="0.06em">RANK r=16 // ΔW=B·A</text>

              {/* ============================================================ */}
              {/* LAYER 3: PAGED OPTIMIZER & GRADIENT FLOW ENCLAVE             */}
              {/* ============================================================ */}
              {/* Isometric Wireframe Diamond Frame: Center (300, 190) */}
              <polygon
                points="300,135 400,190 300,245 200,190"
                stroke={radarLineColor}
                strokeWidth="1"
                fill="none"
              />
              {/* Isometric Concentric Ellipses (2:1 projection) */}
              <ellipse cx="300" cy="190" rx="80" ry="40" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <ellipse cx="300" cy="190" rx="55" ry="27.5" stroke={radarLineColor} strokeWidth="1" strokeDasharray="4 4" fill="none" />
              <ellipse cx="300" cy="190" rx="28" ry="14" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <circle cx="300" cy="190" r="2.5" fill={textColor} />

              {/* Diagonal 30-degree isometric crosshair guidelines */}
              <line x1="240" y1="157.5" x2="360" y2="222.5" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="2 3" />
              <line x1="360" y1="157.5" x2="240" y2="222.5" stroke={radarLineColor} strokeWidth="0.8" strokeDasharray="2 3" />

              {/* Callout [03]: Paged Optimizer Enclave */}
              <polyline points="400,190 440,180 495,180" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <rect x="398" y="188" width="4" height="4" fill={textColor} />
              <text x="502" y="177" fill={textColor} fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">[03] PAGED OPTIMIZER</text>
              <text x="502" y="187" fill={textColor} opacity="0.65" fontSize="7.5" fontFamily="monospace" letterSpacing="0.06em">ZERO-VRAM SPIKES</text>

              {/* ============================================================ */}
              {/* LAYER 4: TOP ASSEMBLY — LOSS CONVERGENCE & EXPORT RETICLE    */}
              {/* ============================================================ */}
              {/* Floating Isometric Target Diamond: Center (300, 85) */}
              <polygon
                points="300,55 355,85 300,115 245,85"
                stroke={radarLineColor}
                strokeWidth="1.2"
                fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}
              />
              <circle cx="300" cy="85" r="10" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <circle cx="300" cy="85" r="3" fill={textColor} />

              {/* Optimization / Tensor Trajectory Spline passing through layers */}
              <path
                d="M 245 286 Q 270 220 300 85"
                stroke={radarLineColor}
                strokeWidth="1.2"
                strokeDasharray="3 3"
                fill="none"
              />

              {/* Telemetry Blip 1: Loss & Metrics */}
              <g transform="translate(315, 76)">
                <rect x="-3" y="-3" width="6" height="6" fill={textColor} />
                <text x="8" y="0" fill={textColor} fontSize="8.5" fontFamily="monospace" letterSpacing="0.08em">LOSS: 0.041</text>
                <text x="8" y="9" fill={textColor} fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">ETA: 14:22 utc</text>
              </g>

              {/* Callout [04]: Adapter Export */}
              <polyline points="245,85 195,85 115,85" stroke={radarLineColor} strokeWidth="1" fill="none" />
              <rect x="243" y="83" width="4" height="4" fill={textColor} />
              <text x="108" y="82" textAnchor="end" fill={textColor} fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.08em">[04] ADAPTER EXPORT</text>
              <text x="108" y="92" textAnchor="end" fill={textColor} opacity="0.65" fontSize="7.5" fontFamily="monospace" letterSpacing="0.06em">GGUF / LoRA READY</text>

              {/* Small Tactical Coordinates & Scale Indicators */}
              <rect x="298" y="343" width="4" height="4" fill={textColor} />
              <rect x="298" y="473" width="4" height="4" fill={textColor} />
              <circle cx="170" cy="410" r="2.5" fill={textColor} />
              <circle cx="430" cy="410" r="2.5" fill={textColor} />
            </svg>
          </div>

          {/* Right: Fine-Tuning Studio Editorial Narrative */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '460px'
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 'clamp(32px, 4vw, 50px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: textColor,
                lineHeight: 1.15
              }}
            >
              Estudio de Reentrenamiento
            </h3>

            {/* Separator rule */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: borderLine
              }}
            />

            <p
              style={{
                margin: 0,
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: subtextColor,
                fontWeight: 400
              }}
            >
              Sube tus documentos, valida las muestras y comienza a entrenar tu modelo desde una interfaz gráfica dentro de tu consola. Todo el proceso corre aislado en enclaves seguros bajo tu control total.
            </p>

            {/* Separator rule */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: borderLine
              }}
            />

            {/* Panel Action Button */}
            <div style={{ paddingTop: '6px' }}>
              <Link
                href="/Create_you_GLYNNE_model"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: textColor,
                  textDecoration: 'none',
                  fontFamily: "'SF Mono', Monaco, 'Courier New', monospace",
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '14px';
                  e.currentTarget.style.color = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '8px';
                  e.currentTarget.style.color = textColor;
                }}
              >
                <span>IR AL PANEL DE FINE-TUNING</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
