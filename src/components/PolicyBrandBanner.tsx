'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface PolicyBrandBannerProps {
  tagline?: string;
  desc1?: string;
  desc2?: string;
  desc3?: string;
  contactHeader?: string;
  companyName?: string;
  companyAddress?: string;
  companyContact?: string;
  titleLine1?: string;
  titleLine2?: string;
  badgeText?: string;
  subTitle?: string;
  section1Label?: string;
  brandLogoText?: string;
  footerLeftLabel?: string;
  footerRightLabel?: string;
}

export default function PolicyBrandBanner({
  tagline = "GLYNNE DATA GOVERNANCE",
  desc1 = "Welcome to the GLYNNE S.A.S. Privacy & Data Governance Framework. We ensure total transparency, auditability, and enterprise control over all processed data assets.",
  desc2 = "Our frontier AI systems and agentic MCP architectures operate with strict zero-retention defaults, end-to-end encryption, and proprietary model weight isolation.",
  desc3 = "Fully compliant with Colombian data protection regulations (Ley 1581 de 2012) and global enterprise security and cybersecurity standards.",
  contactHeader = "CORPORATE INFORMATION",
  companyName = "GLYNNE S.A.S. — Frontier AI Labs",
  companyAddress = "Madrid, Cundinamarca · Bogotá, Colombia",
  companyContact = "NIT: 901966512 | alexglynne7@gmail.com",
  titleLine1 = "Privacy",
  titleLine2 = "Policies",
  badgeText = "AX",
  subTitle = "Data privacy & compliance governance standards",
  section1Label = "ELEMENTS OF GOVERNANCE & ARCHITECTURE",
  brandLogoText = "AXGLYNNE",
  footerLeftLabel = "SECURITY & ENCRYPTION PROTOCOLS",
  footerRightLabel = "REGULATORY SCOPE & DATA SUBJECT RIGHTS"
}: PolicyBrandBannerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = 'transparent'; // Fully transparent to show BackgroundWrapper grid
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#86868b';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)';
  const labelColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)';
  const svgGuideColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <section
      className="policy-brand-banner"
      style={{
        width: '100%',
        backgroundColor: bgColor,
        color: textColor,
        padding: '3.5rem 0 0 0',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10,
        fontFamily: "var(--font-geist-sans), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        borderTop: `1px solid ${borderLineColor}`,
        borderBottom: `1px solid ${borderLineColor}`
      }}
    >
      <style>{`
        /* Home Metallic Gradient Style */
        .home-style-title {
          background: ${isDark
            ? 'linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)'
            : 'linear-gradient(180deg, #111111 0%, #3f3f46 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .banner-inner-padding {
          padding-left: clamp(1.5rem, 4vw, 3rem);
          padding-right: clamp(1.5rem, 4vw, 3rem);
        }

        @media (max-width: 1024px) {
          .top-grid-columns {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
          .brand-logo-comparison {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }

        @media (max-width: 640px) {
          .top-grid-columns {
            grid-template-columns: 1fr !important;
          }
          .title-hero-text {
            font-size: 38px !important;
          }
          .subtitle-hero-text {
            font-size: 14px !important;
          }
        }
      `}</style>

      {/* TOP HEADER GRID (4 COLUMNS) - 100vw padded container */}
      <div
        className="top-grid-columns banner-inner-padding"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1.2fr',
          gap: '2.5rem',
          marginBottom: '3rem',
          fontSize: '12px',
          letterSpacing: '0.01em',
          lineHeight: '1.6'
        }}
      >
        {/* Column 1: Tagline & Intro */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, letterSpacing: '0.1em', fontSize: '11px', marginBottom: '10px', color: subtextColor, textTransform: 'uppercase' }}>
            <span style={{ fontSize: '14px' }}>⬡</span> {tagline}
          </div>
          <div style={{ color: subtextColor, fontWeight: 300, fontSize: '12.5px', lineHeight: '1.5' }}>
            {desc1}
          </div>
        </div>

        {/* Column 2: Specs 1 */}
        <div style={{ color: subtextColor, fontWeight: 300, fontSize: '12.5px', lineHeight: '1.5' }}>
          {desc2}
        </div>

        {/* Column 3: Specs 2 */}
        <div style={{ color: subtextColor, fontWeight: 300, fontSize: '12.5px', lineHeight: '1.5' }}>
          {desc3}
        </div>

        {/* Column 4: Contact Info */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, letterSpacing: '0.08em', fontSize: '11px', marginBottom: '10px', color: labelColor, textTransform: 'uppercase' }}>
            {contactHeader}
          </div>
          <div style={{ color: subtextColor, fontWeight: 300, fontSize: '12px', lineHeight: '1.6' }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div style={{ wordBreak: 'break-all' }}>{companyContact}</div>
          </div>
        </div>
      </div>

      {/* MAIN HERO TITLE ("Privacidad Políticas") */}
      <div className="banner-inner-padding" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px' }}>
          <h1
            className="home-style-title title-hero-text"
            style={{
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 500,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-0.02em',
              display: 'inline-block'
            }}
          >
            {titleLine1}
          </h1>

          {/* Badge Circle (AX) */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px 10px',
              borderRadius: '12px',
              border: `1px solid ${borderLineColor}`,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              color: textColor,
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: "'SF Mono', Monaco, monospace",
              letterSpacing: '0.05em',
              transform: 'translateY(-18px)'
            }}
          >
            {badgeText}
          </span>
        </div>

        <h1
          className="home-style-title title-hero-text"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 500,
            lineHeight: 1.05,
            margin: '0 0 16px 0',
            letterSpacing: '-0.02em'
          }}
        >
          {titleLine2}
        </h1>

        {/* Sub-headline */}
        <div
          className="subtitle-hero-text"
          style={{
            fontSize: 'clamp(14px, 1.6vw, 20px)',
            fontWeight: 300,
            letterSpacing: '0.01em',
            color: subtextColor,
            marginTop: '10px'
          }}
        >
          {subTitle}
        </div>
      </div>

      {/* FULL-WIDTH 100VW MIDDLE DIVIDER LINE + SECTION CONTENT */}
      <div style={{ width: '100%', borderTop: `1px solid ${borderLineColor}` }}>
        <div className="banner-inner-padding" style={{ paddingTop: '1.5rem', paddingBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: subtextColor,
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}
          >
            {section1Label}
          </div>

          {/* BRAND LOGO COMPARISON: CLEAN VS BLUEPRINT GUIDELINES */}
          <div
            className="brand-logo-comparison"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '3rem',
              padding: '2rem 1rem'
            }}
          >
            {/* LEFT: CLEAN LOGO MARK */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="68" height="58" viewBox="0 0 80 68" fill="none">
                <defs>
                  <linearGradient id="logoGradHomeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDark ? "#ffffff" : "#111111"} />
                    <stop offset="50%" stopColor={isDark ? "#a1a1aa" : "#52525b"} />
                    <stop offset="100%" stopColor={isDark ? "#71717a" : "#86868b"} />
                  </linearGradient>
                </defs>
                <polygon points="12,10 45,10 32,32 0,32" fill="url(#logoGradHomeLeft)" opacity="0.95" />
                <polygon points="48,36 80,36 67,58 35,58" fill="url(#logoGradHomeLeft)" />
                <polygon points="32,32 45,10 48,36 35,58" fill={textColor} opacity="0.9" />
              </svg>

              <span
                style={{
                  fontSize: 'clamp(32px, 4.5vw, 54px)',
                  fontWeight: 600,
                  color: textColor,
                  letterSpacing: '-0.02em',
                  fontFamily: "var(--font-geist-sans), 'Inter', sans-serif"
                }}
              >
                {brandLogoText}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  border: `1px solid ${borderLineColor}`,
                  color: subtextColor,
                  fontSize: '10px',
                  fontWeight: 600,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  transform: 'translateY(-10px)'
                }}
              >
                {badgeText}
              </span>
            </div>

            {/* RIGHT: BLUEPRINT TECHNICAL LOGO MARK WITH OVERLAY LINES */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
              {/* SVG Guide Overlay Lines */}
              <svg
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  width: 'calc(100% + 40px)',
                  height: 'calc(100% + 40px)',
                  pointerEvents: 'none',
                  overflow: 'visible'
                }}
              >
                {/* Diagonal 45-degree Guide Lines */}
                <line x1="0" y1="100%" x2="100%" y2="0" stroke={svgGuideColor} strokeWidth="0.8" />
                <line x1="20%" y1="100%" x2="100%" y2="20%" stroke={svgGuideColor} strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="0" y1="80%" x2="80%" y2="0" stroke={svgGuideColor} strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Horizontal Bounding Lines & T-ticks */}
                <line x1="-10" y1="20" x2="105%" y2="20" stroke={svgGuideColor} strokeWidth="0.8" />
                <line x1="-10" y1="80" x2="105%" y2="80" stroke={svgGuideColor} strokeWidth="0.8" />

                {/* Vertical Guide Lines */}
                <line x1="25" y1="-10" x2="25" y2="110%" stroke={svgGuideColor} strokeWidth="0.8" />
                <line x1="85" y1="-10" x2="85" y2="110%" stroke={svgGuideColor} strokeWidth="0.8" />
                <line x1="90%" y1="-10" x2="90%" y2="110%" stroke={svgGuideColor} strokeWidth="0.8" />

                {/* Intersection circles */}
                <circle cx="25" cy="20" r="2.5" fill="none" stroke={textColor} strokeWidth="0.8" />
                <circle cx="85" cy="80" r="2.5" fill="none" stroke={textColor} strokeWidth="0.8" />
              </svg>

              {/* Logo Mark Blueprint */}
              <svg width="68" height="58" viewBox="0 0 80 68" fill="none">
                <defs>
                  <linearGradient id="logoGradHomeRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isDark ? "#ffffff" : "#111111"} />
                    <stop offset="50%" stopColor={isDark ? "#a1a1aa" : "#52525b"} />
                    <stop offset="100%" stopColor={isDark ? "#71717a" : "#86868b"} />
                  </linearGradient>
                </defs>
                <polygon points="12,10 45,10 32,32 0,32" fill="url(#logoGradHomeRight)" opacity="0.95" />
                <polygon points="48,36 80,36 67,58 35,58" fill="url(#logoGradHomeRight)" />
                <polygon points="32,32 45,10 48,36 35,58" fill={textColor} opacity="0.9" />
              </svg>

              {/* Text Blueprint */}
              <span
                style={{
                  fontSize: 'clamp(32px, 4.5vw, 54px)',
                  fontWeight: 600,
                  color: textColor,
                  letterSpacing: '-0.02em',
                  fontFamily: "var(--font-geist-sans), 'Inter', sans-serif"
                }}
              >
                {brandLogoText}
              </span>

              {/* Badge Blueprint */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  border: `1px solid ${borderLineColor}`,
                  color: subtextColor,
                  fontSize: '10px',
                  fontWeight: 600,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  transform: 'translateY(-10px)'
                }}
              >
                {badgeText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH 100VW BOTTOM FOOTER DIVIDER LINE & BAR */}
      <div style={{ width: '100%', borderTop: `1px solid ${borderLineColor}` }}>
        <div
          className="banner-inner-padding"
          style={{
            paddingTop: '1rem',
            paddingBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: subtextColor,
            textTransform: 'uppercase'
          }}
        >
          <div>{footerLeftLabel}</div>
          <div>{footerRightLabel}</div>
        </div>
      </div>
    </section>
  );
}
