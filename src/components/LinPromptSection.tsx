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
  const magentaAccent = isDark ? '#ffffff' : '#111111';

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

        {/* Interactive AI Input Box (Matching Reference Image) */}
        <form
          onSubmit={handleSend}
          style={{
            width: '100%',
            maxWidth: '660px',
            backgroundColor: isDark ? 'rgba(20, 20, 24, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '14px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: isDark
              ? '0 25px 60px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.15)'
              : '0 20px 50px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left'
          }}
        >
          {/* Top Announcement Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2px 8px 4px 8px',
            fontSize: '11px',
            fontFamily: "'SF Mono', monospace",
            color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: textColor, fontSize: '12px' }}>✧</span>
              <span>Nuevo: Modelo AX 5.2 disponible</span>
            </div>
            <button
              type="button"
              onClick={() => router.push('/TrainModel')}
              style={{
                background: 'transparent',
                border: 'none',
                color: textColor,
                fontSize: '11px',
                fontWeight: 600,
                fontFamily: "'SF Mono', monospace",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>💥</span> Probar AX 5.2
            </button>
          </div>

          {/* Inner Textarea Input Box */}
          <div style={{
            backgroundColor: isDark ? 'rgba(12, 12, 14, 0.95)' : '#f5f5f7',
            borderRadius: '16px',
            padding: '14px 16px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Pregunta cualquier cosa..."
              rows={2}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: textColor,
                width: '100%',
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 1.5,
                fontWeight: 300,
                letterSpacing: '0.01em'
              }}
            />

            {/* Inner Bottom Controls (+ Left, Mic & Send Right) */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Left Plus Attachment Icon Button */}
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  borderRadius: '6px',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = textColor; }}
                onMouseOut={(e) => { e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Right Controls: Microphone & Circular Arrow Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = textColor; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'; }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>

                {/* White Circular Send Button with Up Arrow */}
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: inputValue.trim()
                      ? (isDark ? '#ffffff' : '#111111')
                      : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'),
                    color: inputValue.trim()
                      ? (isDark ? '#000000' : '#ffffff')
                      : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'),
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
            </div>
          </div>

          {/* Bottom Action Pill Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2px 4px 0 4px',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {/* Left Pill Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Model Pill Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '999px',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                fontSize: '12px',
                fontWeight: 500,
                color: textColor,
                cursor: 'pointer'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>AX 5.2</span>
              </div>

              {/* Sync Icon Pill Button */}
              <button
                type="button"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
              </button>

              {/* Sparkle/Pointer Icon Pill Button */}
              <button
                type="button"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </button>

              {/* Web Globe Search Icon Pill Button */}
              <button
                type="button"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </button>
            </div>

            {/* Right Side: Prompt Library Pill */}
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '999px',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                fontSize: '12px',
                fontWeight: 500,
                color: textColor,
                cursor: 'pointer'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6M9 13h6M9 17h4" />
              </svg>
              <span>Biblioteca de prompts</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
