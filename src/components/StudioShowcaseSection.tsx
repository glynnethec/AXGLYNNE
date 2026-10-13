'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import {
  FiArrowLeft,
  FiArrowRight,
  FiGlobe,
  FiTerminal,
  FiShield,
  FiCpu,
  FiArrowUpRight
} from 'react-icons/fi';

interface SlideData {
  number: string;
  total: string;
  title: string;
  desc: string;
  badge: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  cadLabel: string;
  cadMetric: string;
  cadCurve: string;
}

const SLIDES: SlideData[] = [
  {
    number: '01',
    total: '03',
    title: 'Inteligencia artificial y modelos abiertos para automatizar tu empresa.',
    desc: 'Somos GLYNNE, una empresa especializada en desarrollo de procesos e inteligencia artificial para automatizar operaciones de negocio. Proveemos herramientas open source para integrar, reentrenar y acceder a pesos de modelos libres, democratizando el desarrollo con estas tecnologías e incentivando la investigación para crear herramientas de impacto real.',
    badge: '01 // QUIÉNES SOMOS & IDENTIDAD',
    primaryCta: { label: 'Desplegar Clúster', href: '/models_provider' },
    secondaryCta: { label: 'Ver Arquitectura •', href: '/About' },
    cadLabel: 'SCULPT_T-1 // CAD',
    cadMetric: 'MÁQUINA & SISTEMA // ID: 83991',
    cadCurve: 'CURVAS CONTROLADAS 92.8'
  },
  {
    number: '02',
    total: '03',
    title: 'No todos necesitan el modelo más potente. Todos queremos acceso fácil y práctico.',
    desc: 'Nuestra visión es escalar la eficiencia y rentabilidad de las empresas acercando tecnología de punta a desarrolladores y organizaciones. Creemos en una integración nativa de modelos propios: no todos los problemas exigen los modelos más gigantes o costosos del mercado, pero todos sí necesitamos acceso ágil, simple y funcional que resuelva el día a día.',
    badge: '02 // NUESTRA VISIÓN',
    primaryCta: { label: 'Explorar Modelos', href: '/ia_vailable' },
    secondaryCta: { label: 'Auditar Pipelines •', href: '/Methodology' },
    cadLabel: 'NEURAL_FP8 // TENSOR',
    cadMetric: 'INFERENCIA EN STREAM // ID: 94102',
    cadCurve: 'CUANTIZACIÓN DINÁMICA 98.4'
  },
  {
    number: '03',
    total: '03',
    title: 'Construir el ecosistema que convierte la tecnología en autonomía real.',
    desc: 'Nuestra misión es eliminar la fricción técnica y la dependencia de intermediarios cerrados. Ponemos a tu alcance infraestructura de cómputo, pipelines de reentrenamiento y flujos autónomos para que cualquier negocio transforme sus tareas manuales en sistemas inteligentes, manteniendo el control y la privacidad total de sus datos.',
    badge: '03 // NUESTRA MISIÓN',
    primaryCta: { label: 'Comenzar Ahora', href: '/login' },
    secondaryCta: { label: 'Seguridad y Datos •', href: '/privacy-policy' },
    cadLabel: 'VAULT_SXM // SEGURO',
    cadMetric: 'ENCLAVE CRIPTOGRÁFICO // ID: 77204',
    cadCurve: 'AISLAMIENTO TOTAL 100%'
  }
];

export default function StudioShowcaseSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.12)';
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  const activeSlide = SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="studio-showcase"
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
        padding: '4.5rem clamp(20px, 4.5vw, 64px) 5rem clamp(20px, 4.5vw, 64px)',
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .studio-20-50-30-grid {
          display: grid;
          grid-template-columns: 20% 50% 30%;
          width: 100%;
          border: 1px solid ${borderLine};
          border-radius: 4px;
          overflow: hidden;
          background-color: ${isDark ? '#060608' : '#ffffff'};
          box-shadow: ${isDark ? '0 16px 40px rgba(0, 0, 0, 0.5)' : '0 12px 32px rgba(0, 0, 0, 0.05)'};
        }

        @media (max-width: 1080px) {
          .studio-20-50-30-grid {
            grid-template-columns: 1fr;
          }
          .studio-col-left {
            border-right: none !important;
            border-bottom: 1px solid ${borderLine};
          }
          .studio-col-center {
            border-right: none !important;
            border-bottom: 1px solid ${borderLine};
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
          gap: '2.5rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Status & Architectural Branding Bar (Aligned with NVIDIA Section Header) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '1.5rem',
            borderBottom: `1px solid ${borderLine}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'
              }}
            />
            <span
              style={{
                fontFamily: monoFont,
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: subtextColor,
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              GLYNNE STUDIO // PIPELINE DE ARQUITECTURA AUTÓNOMA
            </span>
            <span style={{ opacity: 0.35 }}>|</span>
            <span
              style={{
                fontFamily: monoFont,
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: textColor,
                fontWeight: 600
              }}
            >
              SUITE DEL SISTEMA V2.4
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
              border: `1px solid ${borderLine}`,
              fontFamily: monoFont,
              fontSize: '11px',
              color: subtextColor
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
              }}
            />
            <span>RUNTIME OPERATIVO // ACTIVO</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MAIN 3-COLUMN STRUCTURE WITH EXACT 20% / 50% / 30% PROPORTIONS */}
        {/* ============================================================== */}
        <div className="studio-20-50-30-grid">

          {/* ------------------------------------------------------------ */}
          {/* 1. LEFT COLUMN: 20% WIDTH (LINKS & ENVIRONMENT INFO)        */}
          {/* ------------------------------------------------------------ */}
          <div
            className="studio-col-left"
            style={{
              backgroundColor: cardBg,
              borderRight: `1px solid ${borderLine}`,
              padding: 'clamp(24px, 2.5vw, 36px) clamp(16px, 1.8vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              minHeight: '500px'
            }}
          >
            {/* Header in Left Sidebar */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    color: subtextColor,
                    textTransform: 'uppercase'
                  }}
                >
                  01 // NAVEGACIÓN
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: textColor
                  }}
                >
                  GLYNNE STUDIO
                </span>
              </div>

              {/* Vertical Nav Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Visión General', href: '/' },
                  { label: 'Modelos de IA & APIs', href: '/models_provider' },
                  { label: 'Agentes Autónomos', href: '/AX_chat' },
                  { label: 'Clústeres de Cómputo', href: '#nvidia-infrastructure' },
                  { label: 'Industrias & Sectores', href: '/Industries' },
                  { label: 'Metodología', href: '/Methodology' },
                  { label: 'Acceso Directo', href: '/login' }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    style={{
                      fontSize: '12.5px',
                      fontWeight: idx === 0 ? 600 : 400,
                      color: idx === 0 ? textColor : subtextColor,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                      width: 'fit-content'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = textColor;
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = idx === 0 ? textColor : subtextColor;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span>{item.label}</span>
                    {idx === 0 && <FiArrowUpRight size={11} style={{ opacity: 0.6 }} />}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Status Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2.5rem' }}>
              {[
                { icon: <FiTerminal size={12} />, title: 'CLI & API Gateway' },
                { icon: <FiCpu size={12} />, title: 'H100 Silicon' },
                { icon: <FiGlobe size={12} />, title: 'Distributed Anycast' },
                { icon: <FiShield size={12} />, title: 'Zero-Trust Enclave' }
              ].map((btn, i) => (
                  <div
                    key={i}
                    title={btn.title}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                      border: `1px solid ${borderLine}`,
                      color: subtextColor,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.color = textColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.color = subtextColor;
                    }}
                  >
                    {btn.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
          {/* 2. CENTER COLUMN: 50% WIDTH (DOMINANT HEADLINE & NARRATIVE)  */}
          {/* ------------------------------------------------------------ */}
          <div
            className="studio-col-center"
            style={{
              backgroundColor: isDark ? '#000000' : '#ffffff',
              borderRight: `1px solid ${borderLine}`,
              padding: 'clamp(28px, 3.5vw, 48px) clamp(24px, 3.2vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              minHeight: '500px'
            }}
          >
            {/* Top Carousel Index & Buttons */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '4px',
                    fontFamily: monoFont,
                    lineHeight: 1
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(32px, 3.8vw, 48px)',
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      color: textColor
                    }}
                  >
                    {activeSlide.number}
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(18px, 2.2vw, 26px)',
                      fontWeight: 300,
                      color: subtextColor,
                      letterSpacing: '-0.02em',
                      opacity: 0.5
                    }}
                  >
                    /{activeSlide.total}
                  </span>
                </div>

                {/* Arrow Navigation Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: `1px solid ${borderLine}`,
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                      color: textColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = textColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = borderLine;
                    }}
                  >
                    <FiArrowLeft size={13} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: `1px solid ${borderLine}`,
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
                      color: textColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = textColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = borderLine;
                    }}
                  >
                    <FiArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Tag / Badge */}
              <div style={{ marginTop: '1.75rem' }}>
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: subtextColor,
                    fontWeight: 600
                  }}
                >
                  {activeSlide.badge}
                </span>
              </div>
            </div>

            {/* Dominant Headline & Subtitle matching NVIDIA Section Style */}
            <div style={{ margin: '2rem 0 2.5rem 0' }}>
              <h2
                style={{
                  margin: '0 0 16px 0',
                  fontSize: 'clamp(28px, 3.2vw, 44px)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: textColor
                }}
              >
                {activeSlide.title}
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(14px, 1.25vw, 16px)',
                  lineHeight: 1.65,
                  color: subtextColor,
                  fontWeight: 300,
                  maxWidth: '560px'
                }}
              >
                {activeSlide.desc}
              </p>
            </div>

            {/* Action Buttons matching NVIDIA Section Layout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={activeSlide.primaryCta.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: textColor,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  border: `1px solid ${borderLine}`,
                  borderRadius: '999px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = borderLine;
                }}
              >
                <span>{activeSlide.primaryCta.label}</span>
                <FiArrowRight size={13} />
              </Link>

              <Link
                href={activeSlide.secondaryCta.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
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
                <span>{activeSlide.secondaryCta.label}</span>
                <FiArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* 3. RIGHT COLUMN: 30% WIDTH (TECHNICAL CAD SCHEMATIC BLUEPRINT)*/}
          {/* ------------------------------------------------------------ */}
          <div
            style={{
              backgroundColor: isDark ? '#050505' : '#f5f5f7',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px 20px 16px 20px',
              boxSizing: 'border-box',
              minHeight: '500px'
            }}
          >
            {/* Corner Crosshairs blueprint details (matching NVIDIA Section Blueprint) */}
            <span style={{ position: 'absolute', top: '10px', left: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', top: '10px', right: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', bottom: '10px', left: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>
            <span style={{ position: 'absolute', bottom: '10px', right: '12px', color: '#666666', fontFamily: monoFont, fontSize: '11px', pointerEvents: 'none' }}>+</span>

            {/* Blueprint Top Header Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '12px',
                borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                fontFamily: monoFont,
                fontSize: '10px',
                color: subtextColor,
                letterSpacing: '0.08em',
                zIndex: 3
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: subtextColor }}>●</span>
                <span style={{ color: textColor, fontWeight: 600 }}>{activeSlide.cadLabel}</span>
              </div>
              <div>SEARCH: 0317</div>
            </div>

            {/* Central Precision CAD Geometry SVG */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px 0',
                pointerEvents: 'none'
              }}
            >
              <svg
                viewBox="0 0 500 500"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '340px',
                  overflow: 'visible'
                }}
              >
                {/* Calibration circles */}
                <circle cx="250" cy="250" r="220" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'} strokeWidth="0.8" />
                <circle cx="250" cy="250" r="170" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)'} strokeWidth="1" strokeDasharray="3 4" />
                <circle cx="250" cy="250" r="120" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.28)'} strokeWidth="1.2" />
                <circle cx="250" cy="250" r="70" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.45)'} strokeWidth="1" />
                <circle cx="250" cy="250" r="24" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'} strokeWidth="1.2" strokeDasharray="2 3" />

                {/* Golden ratio & offset CAD measurement arcs */}
                <circle cx="250" cy="180" r="110" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.2)'} strokeWidth="1" />
                <circle cx="250" cy="320" r="110" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'} strokeWidth="0.8" strokeDasharray="4 4" />
                <circle cx="200" cy="230" r="55" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.16)'} strokeWidth="0.8" />

                {/* Orthogonal Grid Lines & Crosshairs */}
                <line x1="250" y1="20" x2="250" y2="480" stroke={isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.16)'} strokeWidth="0.8" strokeDasharray="2 3" />
                <line x1="20" y1="250" x2="480" y2="250" stroke={isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.16)'} strokeWidth="0.8" strokeDasharray="2 3" />

                {/* Diagonal 45-degree Guide Rays */}
                <line x1="70" y1="70" x2="430" y2="430" stroke={isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'} strokeWidth="0.6" strokeDasharray="4 6" />
                <line x1="70" y1="430" x2="430" y2="70" stroke={isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'} strokeWidth="0.6" strokeDasharray="4 6" />

                {/* Precise Intersection Crosshair Markers (+) */}
                {[
                  { x: 250, y: 80 },
                  { x: 250, y: 420 },
                  { x: 80, y: 250 },
                  { x: 420, y: 250 },
                  { x: 250, y: 250 },
                  { x: 175, y: 175 },
                  { x: 325, y: 175 },
                  { x: 175, y: 325 },
                  { x: 325, y: 325 }
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="2.5" fill={textColor} />
                    <line x1={pt.x - 5} y1={pt.y} x2={pt.x + 5} y2={pt.y} stroke={textColor} strokeWidth="0.8" />
                    <line x1={pt.x} y1={pt.y - 5} x2={pt.x} y2={pt.y + 5} stroke={textColor} strokeWidth="0.8" />
                  </g>
                ))}

                {/* Center Core Dot */}
                <circle cx="250" cy="250" r="3.5" fill={textColor} />
              </svg>
            </div>

            {/* Technical CAD Callout Labels */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: monoFont,
                fontSize: '9.5px',
                color: subtextColor,
                letterSpacing: '0.06em',
                zIndex: 3,
                marginBottom: '8px'
              }}
            >
              <div>
                <span style={{ color: textColor, fontWeight: 600 }}>{activeSlide.cadMetric}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: textColor, fontWeight: 600 }}>{activeSlide.cadCurve}</span>
              </div>
            </div>

            {/* Blueprint Footer Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '10px',
                borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                fontFamily: monoFont,
                fontSize: '9px',
                color: subtextColor,
                letterSpacing: '0.06em',
                zIndex: 3
              }}
            >
              <span>LAYER 01 // GEOMETRIC GRID</span>
              <span>AXIAL VECTOR 100%</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
