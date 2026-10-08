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
  desc1 = "WELCOME TO THE GLYNNE S.A.S. PRIVACY & DATA GOVERNANCE FRAMEWORK. WE ENSURE TOTAL TRANSPARENCY, AUDITABILITY, AND ENTERPRISE CONTROL OVER ALL PROCESSED DATA ASSETS.",
  desc2 = "OUR FRONTIER AI SYSTEMS AND AGENTIC MCP ARCHITECTURES OPERATE WITH STRICT ZERO-RETENTION DEFAULTS, END-TO-END ENCRYPTION, AND PROPRIETARY MODEL WEIGHT ISOLATION.",
  desc3 = "FULLY COMPLIANT WITH COLOMBIAN DATA PROTECTION REGULATIONS (LEY 1581 DE 2012) AND GLOBAL ENTERPRISE SECURITY AND CYBERSECURITY STANDARDS.",
  contactHeader = "CORPORATE INFORMATION",
  companyName = "GLYNNE S.A.S. — Frontier AI Labs",
  companyAddress = "Madrid, Cundinamarca · Bogotá, Colombia",
  companyContact = "NIT: 901966512 | alexglynne7@gmail.com",
  titleLine1 = "Privacy",
  titleLine2 = "Policies",
  badgeText = "AX",
  subTitle = "DATA PRIVACY & COMPLIANCE GOVERNANCE STANDARDS",
  section1Label = "ELEMENTS OF GOVERNANCE & ARCHITECTURE",
  brandLogoText = "AXGLYNNE",
  footerLeftLabel = "SECURITY & ENCRYPTION PROTOCOLS",
  footerRightLabel = "REGULATORY SCOPE & DATA SUBJECT RIGHTS"
}: PolicyBrandBannerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = 'transparent'; // Transparent to expose BackgroundWrapper grid
  const textColor = isDark ? '#ffffff' : '#111111';
  const subTextColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)';
  const labelColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)';
  const svgGuideColor = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';

  return (
    <section
      className="policy-brand-banner"
      style={{
        width: '100%',
        backgroundColor: bgColor,
        color: textColor,
        padding: '3.5rem 3rem 2.5rem 3rem',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 10,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        borderBottom: `1px solid ${borderLineColor}`
      }}
    >
      <style>{`
        /* Silver / Chrome Metallic Monochrome Gradient Effect */
        .brand-guidelines-title {
          background: ${isDark
            ? 'linear-gradient(115deg, #ffffff 0%, #e4e4e7 20%, #a1a1aa 45%, #71717a 70%, #d4d4d8 100%)'
            : 'linear-gradient(115deg, #09090b 0%, #27272a 20%, #52525b 45%, #71717a 70%, #18181b 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 1024px) {
          .policy-brand-banner {
            padding: 2.5rem 1.5rem !important;
          }
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
            font-size: 42px !important;
          }
          .subtitle-hero-text {
            font-size: 13px !important;
          }
        }
      `}</style>

      {/* TOP HEADER GRID (4 COLUMNS) */}
      <div
        className="top-grid-columns"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.5fr 1.5fr 1.2fr',
          gap: '2.5rem',
          marginBottom: '3rem',
          fontSize: '10px',
          letterSpacing: '0.04em',
          lineHeight: '1.45'
        }}
      >
        {/* Column 1: Designing the future */}
        <div>
          <div style={{ fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px', color: textColor, textTransform: 'uppercase' }}>
            {tagline}
          </div>
          <div style={{ color: subTextColor, textTransform: 'uppercase', fontSize: '9.5px', lineHeight: '1.4' }}>
            {desc1}
          </div>
        </div>

        {/* Column 2: Specs 1 */}
        <div style={{ color: subTextColor, textTransform: 'uppercase', fontSize: '9.5px', lineHeight: '1.4' }}>
          {desc2}
        </div>

        {/* Column 3: Specs 2 */}
        <div style={{ color: subTextColor, textTransform: 'uppercase', fontSize: '9.5px', lineHeight: '1.4' }}>
          {desc3}
        </div>

        {/* Column 4: Contact Info */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, letterSpacing: '0.08em', marginBottom: '10px', color: textColor, textTransform: 'uppercase' }}>
            {contactHeader}
          </div>
          <div style={{ color: subTextColor, textTransform: 'uppercase', fontSize: '9.5px', lineHeight: '1.5' }}>
            <div>{companyName}</div>
            <div>{companyAddress}</div>
            <div>{companyContact}</div>
          </div>
        </div>
      </div>

      {/* MAIN HERO TITLE ("Privacy Policies" with silver monochrome gradient + badge) */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
          <h1
            className="brand-guidelines-title title-hero-text"
            style={{
              fontSize: 'clamp(52px, 8vw, 110px)',
              fontWeight: 800,
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: '-0.03em',
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
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: `1.5px solid ${borderLineColor}`,
              color: labelColor,
              fontSize: '10px',
              fontWeight: 700,
              fontFamily: 'monospace',
              verticalAlign: 'super',
              marginLeft: '4px',
              transform: 'translateY(-20px)'
            }}
          >
            {badgeText}
          </span>
        </div>

        <h1
          className="brand-guidelines-title title-hero-text"
          style={{
            fontSize: 'clamp(52px, 8vw, 110px)',
            fontWeight: 800,
            lineHeight: 0.95,
            margin: '0 0 16px 0',
            letterSpacing: '-0.03em'
          }}
        >
          {titleLine2}
        </h1>

        {/* Sub-headline */}
        <div
          className="subtitle-hero-text"
          style={{
            fontSize: 'clamp(13px, 1.8vw, 22px)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: labelColor,
            textTransform: 'uppercase',
            marginTop: '8px'
          }}
        >
          {subTitle}
        </div>
      </div>

      {/* DIVIDER LINE + SECTION LABEL */}
      <div
        style={{
          borderTop: `1px solid ${borderLineColor}`,
          paddingTop: '1rem',
          marginBottom: '2.5rem'
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: labelColor,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg width="68" height="58" viewBox="0 0 80 68" fill="none">
              <defs>
                <linearGradient id="logoGradSilverLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#ffffff" : "#18181b"} />
                  <stop offset="50%" stopColor={isDark ? "#a1a1aa" : "#52525b"} />
                  <stop offset="100%" stopColor={isDark ? "#52525b" : "#a1a1aa"} />
                </linearGradient>
              </defs>

              {/* Folded ribbon polygon 1 */}
              <polygon points="12,10 45,10 32,32 0,32" fill="url(#logoGradSilverLeft)" opacity="0.95" />
              {/* Folded ribbon polygon 2 */}
              <polygon points="48,36 80,36 67,58 35,58" fill="url(#logoGradSilverLeft)" />
              {/* Center connecting polygon */}
              <polygon points="32,32 45,10 48,36 35,58" fill={textColor} opacity="0.9" />
            </svg>

            <span
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 800,
                color: textColor,
                letterSpacing: '-0.03em',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {brandLogoText}
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `1px solid ${borderLineColor}`,
                color: subTextColor,
                fontSize: '8px',
                fontWeight: 700,
                fontFamily: 'monospace',
                transform: 'translateY(-12px)'
              }}
            >
              {badgeText}
            </span>
          </div>

          {/* RIGHT: BLUEPRINT TECHNICAL LOGO MARK WITH OVERLAY LINES */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 24px' }}>
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
                <linearGradient id="logoGradSilverRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#ffffff" : "#18181b"} />
                  <stop offset="50%" stopColor={isDark ? "#a1a1aa" : "#52525b"} />
                  <stop offset="100%" stopColor={isDark ? "#52525b" : "#a1a1aa"} />
                </linearGradient>
              </defs>
              <polygon points="12,10 45,10 32,32 0,32" fill="url(#logoGradSilverRight)" opacity="0.95" />
              <polygon points="48,36 80,36 67,58 35,58" fill="url(#logoGradSilverRight)" />
              <polygon points="32,32 45,10 48,36 35,58" fill={textColor} opacity="0.9" />
            </svg>

            {/* Text Blueprint */}
            <span
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 800,
                color: textColor,
                letterSpacing: '-0.03em',
                fontFamily: "'Inter', sans-serif"
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
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: `1px solid ${borderLineColor}`,
                color: subTextColor,
                fontSize: '8px',
                fontWeight: 700,
                fontFamily: 'monospace',
                transform: 'translateY(-12px)'
              }}
            >
              {badgeText}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER DIVIDER BAR WITH TWO SECTION HEADERS */}
      <div
        style={{
          borderTop: `1px solid ${borderLineColor}`,
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: labelColor,
          textTransform: 'uppercase'
        }}
      >
        <div>{footerLeftLabel}</div>
        <div>{footerRightLabel}</div>
      </div>
    </section>
  );
}
