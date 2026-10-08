'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

interface LinPromptSectionProps {
  hideCard?: boolean;
  hideOrbCard?: boolean;
  customTitle?: string;
  customDescription?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
}

export default function LinPromptSection({
  hideCard = false,
  hideOrbCard = false,
  customTitle = "Razonamiento de IA basado en la experiencia",
  customDescription = "Interactúa con AX, el motor de razonamiento autónomo que opera bajo la capa de control de GLYNNE, para explorar cómo funciona la autonomía empresarial segura.",
  primaryButtonText = "Explorar la metodología",
  primaryButtonUrl = "/Methodology"
}: LinPromptSectionProps = {}) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.15)';
  const gridPatchLineColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
  const labelColor = isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.55)';
  const subtextColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)';
  const magentaAccent = '#f43f5e';

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/AX_chat?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <section className="section-wrapper" style={{
      width: '100%',
      height: '100vh',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLineColor}`,
      borderBottom: `1px solid ${borderLineColor}`,
      backgroundColor: 'transparent',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .section-wrapper {
            height: auto !important;
            min-height: auto !important;
            padding: 4rem 1rem !important;
          }
          .central-blueprint-box {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            height: auto !important;
            padding: 2rem 1rem !important;
          }
        }
      `}</style>

      {/* SVG Canvas for Blueprint Lines, Grid Patches & Technical Marks */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <defs>
          {/* Dense Blueprint Grid Pattern */}
          <pattern id="denseBlueprintGridPrompt" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={gridPatchLineColor}
              strokeWidth="0.75"
            />
          </pattern>
        </defs>

        {/* 1. TOP-CENTER DENSE GRID PATCH */}
        <g transform="translate(0, 0)">
          <rect
            x="27%"
            y="0"
            width="25%"
            height="24%"
            fill="url(#denseBlueprintGridPrompt)"
            stroke={borderLineColor}
            strokeWidth="1"
          />
        </g>

        {/* 2. MIDDLE-LEFT DENSE GRID PATCH */}
        <g transform="translate(0, 0)">
          <rect
            x="0"
            y="24%"
            width="27%"
            height="47%"
            fill="url(#denseBlueprintGridPrompt)"
            stroke={borderLineColor}
            strokeWidth="1"
          />
        </g>

        {/* 3. TECHNICAL BLUEPRINT GUIDE LINES & MARKS */}

        {/* Horizontal Top Guide Line */}
        <line
          x1="0"
          y1="24%"
          x2="100%"
          y2="24%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Horizontal Bottom Guide Line */}
        <line
          x1="27%"
          y1="71%"
          x2="100%"
          y2="71%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Vertical Line (A) */}
        <line
          x1="27%"
          y1="0"
          x2="27%"
          y2="100%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Vertical Line (C) */}
        <line
          x1="80%"
          y1="5%"
          x2="80%"
          y2="95%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Vertical Line (B) */}
        <line
          x1="96%"
          y1="5%"
          x2="96%"
          y2="95%"
          stroke={borderLineColor}
          strokeWidth="1"
        />

        {/* Line C Top & Bottom T-Ticks */}
        <line x1="79%" y1="5%" x2="81%" y2="5%" stroke={borderLineColor} strokeWidth="1.2" />
        <line x1="79%" y1="95%" x2="81%" y2="95%" stroke={borderLineColor} strokeWidth="1.2" />

        {/* Line B Top & Bottom T-Ticks */}
        <line x1="95%" y1="5%" x2="97%" y2="5%" stroke={borderLineColor} strokeWidth="1.2" />
        <line x1="95%" y1="95%" x2="97%" y2="95%" stroke={borderLineColor} strokeWidth="1.2" />

        {/* Intersection Crosshairs (+) */}
        <circle cx="80%" cy="24%" r="3" fill="none" stroke={textColor} strokeWidth="1" opacity="0.8" />
        <circle cx="80%" cy="71%" r="3" fill="none" stroke={textColor} strokeWidth="1" opacity="0.8" />
        <circle cx="96%" cy="71%" r="3" fill="none" stroke={textColor} strokeWidth="1" opacity="0.8" />

        {/* LABELS: (A), (B), (C) */}
        <text
          x="24%"
          y="75%"
          fill={labelColor}
          fontSize="12"
          fontFamily="monospace"
          textAnchor="end"
        >
          (A)
        </text>

        <text
          x="78%"
          y="28%"
          fill={labelColor}
          fontSize="12"
          fontFamily="monospace"
          textAnchor="end"
        >
          (C)
        </text>

        <text
          x="94%"
          y="75%"
          fill={labelColor}
          fontSize="12"
          fontFamily="monospace"
          textAnchor="end"
        >
          (B)
        </text>

        {/* Top T-Mark Label Indicators */}
        <text x="80%" y="4%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">T</text>
        <text x="96%" y="4%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">T</text>
        <text x="80%" y="98%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">⊥</text>
        <text x="96%" y="98%" fill={labelColor} fontSize="10" fontFamily="monospace" textAnchor="middle">⊥</text>
      </svg>

      {/* 4. MAIN CENTRAL CONTENT DISPLAY (BOUNDED BOX) */}
      <div className="central-blueprint-box" style={{
        position: 'absolute',
        top: '24%',
        left: '27%',
        width: '53%',
        height: '47%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 'clamp(20px, 2vw, 40px)',
        paddingRight: 'clamp(20px, 2vw, 40px)',
        zIndex: 5,
        boxSizing: 'border-box'
      }}>
        {/* Title Block with Magenta Underline */}
        <div style={{
          position: 'relative',
          marginBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 700,
            color: textColor,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.15,
            textAlign: 'center'
          }}>
            {customTitle}
          </h2>

          {/* Magenta Underline */}
          <div style={{
            position: 'absolute',
            bottom: '-4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: magentaAccent, display: 'inline-block' }} />
            <span style={{ flex: 1, height: '1.5px', backgroundColor: magentaAccent }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: magentaAccent, display: 'inline-block' }} />
          </div>
        </div>

        {/* Subtitle / Description */}
        <p style={{
          fontSize: 'clamp(12px, 1.1vw, 14px)',
          color: subtextColor,
          fontWeight: 300,
          lineHeight: 1.5,
          letterSpacing: '0.01em',
          margin: '12px auto 20px auto',
          maxWidth: '580px',
          textAlign: 'center'
        }}>
          {customDescription}
        </p>

        {/* Interactive AI Prompt Input Form */}
        <form
          onSubmit={handleSend}
          style={{
            width: '100%',
            maxWidth: '620px',
            backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '14px 16px',
            border: `1px solid ${borderLineColor}`,
            boxShadow: isDark
              ? '0 12px 35px rgba(0,0,0,0.5)'
              : '0 12px 35px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pregunta a AX sobre gobernanza de IA empresarial, permisos o integración de sistemas..."
            rows={2}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: textColor,
              width: '100%',
              padding: '2px 0',
              fontWeight: 300,
              backgroundColor: 'transparent',
              fontFamily: 'inherit',
              resize: 'none',
              lineHeight: 1.4,
              letterSpacing: '0.01em'
            }}
          />

          {/* Tools & Send Button Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '8px',
            borderTop: `1px solid ${borderLineColor}`
          }}>
            {/* Model Selector / Tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f7',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 600,
              color: textColor,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: "'SF Mono', monospace"
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              AX Core Engine
            </div>

            {/* Right Arrow Submit Button */}
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: inputValue.trim() ? textColor : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                color: inputValue.trim() ? (isDark ? '#000000' : '#ffffff') : subtextColor,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
