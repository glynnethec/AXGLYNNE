'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';
import {
  FiSearch,
  FiMic,
  FiArrowUp,
  FiClock,
  FiMoreHorizontal,
  FiX,
  FiPlus
} from 'react-icons/fi';

interface LinPromptSectionProps {
  hideCard?: boolean;
  hideOrbCard?: boolean;
  customTitle?: string;
  customDescription?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  lang?: 'es' | 'en';
}

const LIN_PROMPT_TEXT = {
  es: {
    tag: "GLYNNE AI ENGINEERING & AUTONOMOUS REASONING",
    title: "Razonamiento de IA basado en la experiencia",
    description: "Interactúa con AX, el motor de razonamiento autónomo que se ejecuta bajo la capa de control de GLYNNE, para explorar cómo funciona la autonomía empresarial segura.",
    newModel: 'Nuevo: Modelo AX 5.2 disponible',
    tryModel: 'Probar AX 5.2',
    placeholder: 'Consulta a AX sobre automatización de procesos, agentes o infraestructura...',
    promptLibrary: 'Biblioteca de prompts',
    addFiles: '+ Adjuntar archivos o contexto',
    inviteTitle: 'Nuevo: Modelo AX 5.2 disponible',
    inviteDesc: 'Accede a inferencia directa, pesos abiertos y fine-tuning acelerado en NVIDIA H100 para transformar procesos empresariales con autonomía total.',
    tags: [
      { label: '/ orquestacion-agentes', prompt: '¿Cómo diseñar un pipeline multi-agente seguro con la capa de control de GLYNNE?' },
      { label: '/ automatizacion-b2b', prompt: '¿Cómo automatizar flujos operativos y conciliaciones complejas con modelos propios?' },
      { label: '/ hardware-nvidia', prompt: 'Explorar infraestructura NVIDIA H100 para inferencia de baja latencia y fine-tuning dedicado.' },
      { label: '+ Fine-Tuning', prompt: 'Reentrenar modelo base con datos empresariales propios en clúster seguro.' }
    ]
  },
  en: {
    tag: "GLYNNE AI ENGINEERING & AUTONOMOUS REASONING",
    title: "Razonamiento de IA basado en la experiencia",
    description: "Interactúa con AX, el motor de razonamiento autónomo que se ejecuta bajo la capa de control de GLYNNE, para explorar cómo funciona la autonomía empresarial segura.",
    newModel: 'New: AX 5.2 model available',
    tryModel: 'Try AX 5.2',
    placeholder: 'Ask AX about workflow automation, multi-agent pipelines, or infrastructure...',
    promptLibrary: 'Prompt library',
    addFiles: '+ Attach files or context',
    inviteTitle: 'New: AX 5.2 model available',
    inviteDesc: 'Direct inference, open weights, and accelerated fine-tuning on NVIDIA H100 architecture to power secure enterprise autonomy.',
    tags: [
      { label: '/ agent-orchestration', prompt: 'How to design a secure multi-agent workflow with GLYNNE control layer?' },
      { label: '/ enterprise-b2b', prompt: 'How to automate mission-critical operations and complex pipelines with private models?' },
      { label: '/ nvidia-compute', prompt: 'Explore NVIDIA H100 infrastructure for dedicated low-latency inference and training.' },
      { label: '+ Fine-Tuning', prompt: 'Fine-tune open models with custom datasets on secure enclaves.' }
    ]
  }
};

export default function LinPromptSection({
  hideCard = false,
  hideOrbCard = false,
  customTitle,
  customDescription,
  primaryButtonText = "Explorar la metodología",
  primaryButtonUrl = "/Methodology",
  lang = 'es'
}: LinPromptSectionProps = {}) {
  const t = LIN_PROMPT_TEXT[lang];
  customTitle = customTitle ?? t.title;
  customDescription = customDescription ?? t.description;
  const [inputValue, setInputValue] = useState('');
  const [showBanner, setShowBanner] = useState(true);
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
        @media (max-width: 700px) {
          .prompt-input-icon-btn,
          .prompt-input-icon {
            display: none !important;
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
        top: '46%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        zIndex: 5,
        boxSizing: 'border-box'
      }}>
        {/* Tag matching Hero and other Home sections */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          fontWeight: 500,
          color: isDark ? '#8f8f96' : '#71717a',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          <span style={{ fontSize: '13px', color: isDark ? '#ffffff' : '#111111' }}>⬡</span>
          <span>{t.tag}</span>
        </div>

        {/* Big Headline matching the rest of the Home */}
        <h2 style={{
          margin: '0 0 12px 0',
          textAlign: 'center',
          fontSize: 'clamp(28px, 3.6vw, 44px)',
          fontWeight: 400,
          color: textColor,
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          maxWidth: '940px'
        }}>
          {customTitle}
        </h2>

        {/* Paragraph matching Home body typography */}
        <p style={{
          margin: '0 auto 16px auto',
          textAlign: 'center',
          fontSize: 'clamp(13.5px, 1.15vw, 15px)',
          lineHeight: 1.6,
          color: isDark ? '#a1a1aa' : '#666666',
          fontWeight: 300,
          letterSpacing: '0.01em',
          maxWidth: '760px'
        }}>
          {customDescription}
        </p>

        {/* Dome Avatar / Silhouette Icon (Matching Screenshot Top Element) */}
        <div
          style={{
            width: '46px',
            height: '28px',
            backgroundColor: isDark ? '#2e2e34' : '#e2e2e7',
            borderTopLeftRadius: '23px',
            borderTopRightRadius: '23px',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            margin: '0 auto 16px auto',
            opacity: 0.9,
            transition: 'opacity 0.2s ease'
          }}
          title="AX Core"
        />

        {/* Interactive AI Input Box (Matching Reference Screenshot Design) */}
        <form
          onSubmit={handleSend}
          className="prompt-input-form"
          style={{
            width: '100%',
            maxWidth: '640px',
            backgroundColor: isDark ? '#1f2024' : '#ffffff',
            borderRadius: '24px',
            padding: '16px 20px 14px 20px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: isDark
              ? '0 20px 50px rgba(0, 0, 0, 0.55)'
              : '0 16px 40px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            textAlign: 'left',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
          }}
        >
          {/* Top Row: Search Magnifying Glass Icon + Textarea */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <FiSearch
              size={18}
              style={{
                color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
                flexShrink: 0,
                marginTop: '2px'
              }}
            />
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.placeholder}
              rows={1}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: textColor,
                width: '100%',
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 1.45,
                fontWeight: 400,
                letterSpacing: '0.01em',
                padding: 0
              }}
            />
          </div>

          {/* Bottom Row: + Add tabs or files (Left) & Mic + Circular Up-Arrow Button (Right) */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
                fontSize: '13px',
                fontWeight: 400,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: 0,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = textColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)';
              }}
            >
              <FiPlus size={14} />
              <span>{t.addFiles}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => router.push('/AX_voice')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)';
                }}
                title="Voice reasoning"
              >
                <FiMic size={17} />
              </button>

              <button
                type="submit"
                disabled={!inputValue.trim()}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: inputValue.trim()
                    ? (isDark ? '#ffffff' : '#111111')
                    : (isDark ? '#2e2e34' : '#e4e4e7'),
                  color: inputValue.trim()
                    ? (isDark ? '#000000' : '#ffffff')
                    : (isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'),
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiArrowUp size={16} style={{ strokeWidth: 2.2 }} />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Tag Pills Row (Directly below input box matching reference screenshot) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Clock History Icon */}
          <div style={{
            color: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px'
          }}>
            <FiClock size={15} />
          </div>

          {/* Tags */}
          {t.tags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputValue(tag.prompt)}
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '8px',
                padding: '5px 12px',
                fontSize: '12px',
                color: isDark ? '#d4d4d8' : '#3f3f46',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: 400
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.color = textColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.color = isDark ? '#d4d4d8' : '#3f3f46';
              }}
            >
              {tag.label}
            </button>
          ))}

          {/* More Dots */}
          <button
            type="button"
            onClick={() => router.push('/ia_vailable')}
            style={{
              background: 'transparent',
              border: 'none',
              color: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
            title="More options"
          >
            <FiMoreHorizontal size={16} />
          </button>
        </div>

        {/* Floating Invite Banner Card (Monochrome Black, Grey, White) */}
        {showBanner && (
          <div style={{
            position: 'relative',
            marginTop: '20px',
            width: '100%',
            maxWidth: '520px',
            borderRadius: '18px',
            overflow: 'hidden',
            background: isDark
              ? 'linear-gradient(110deg, #18191d 0%, #1c1d22 55%, #25262c 80%, #2f3037 100%)'
              : 'linear-gradient(110deg, #ffffff 0%, #f7f7f8 55%, #ebebef 80%, #e2e2e8 100%)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: isDark ? '0 16px 36px rgba(0, 0, 0, 0.55)' : '0 12px 30px rgba(0, 0, 0, 0.08)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left'
          }}>
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                border: 'none',
                color: isDark ? '#ffffff' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 5,
                transition: 'all 0.2s ease'
              }}
              title="Dismiss"
            >
              <FiX size={12} />
            </button>

            {/* Text Content */}
            <div style={{ flex: 1, paddingRight: '16px', zIndex: 2 }}>
              <h4 style={{
                margin: '0 0 6px 0',
                fontSize: '14px',
                fontWeight: 600,
                color: textColor
              }}>
                {t.inviteTitle}
              </h4>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '12px',
                lineHeight: 1.45,
                color: subtextColor,
                maxWidth: '280px'
              }}>
                {t.inviteDesc}
              </p>
              <button
                type="button"
                onClick={() => router.push('/TrainModel')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? '#ffffff' : '#111111',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  opacity: 0.9,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
              >
                <span>{t.tryModel} →</span>
              </button>
            </div>

            {/* Right Side: 3D Floating Translucent Cards Graphic (Monochrome Glass) */}
            <div style={{
              position: 'relative',
              width: '110px',
              height: '76px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Back card */}
              <div style={{
                position: 'absolute',
                width: '52px',
                height: '66px',
                borderRadius: '10px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid rgba(0, 0, 0, 0.08)',
                transform: 'rotate(-10deg) translate(-14px, -4px)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '18px',
                  height: '12px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.15)',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  borderBottomLeftRadius: '3px',
                  borderBottomRightRadius: '3px'
                }} />
              </div>

              {/* Front card */}
              <div style={{
                position: 'absolute',
                width: '52px',
                height: '66px',
                borderRadius: '10px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.26)' : '1px solid rgba(0, 0, 0, 0.12)',
                transform: 'rotate(8deg) translate(8px, 4px)',
                backdropFilter: 'blur(8px)',
                boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 20px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '20px',
                  height: '14px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.25)',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  borderBottomLeftRadius: '3px',
                  borderBottomRightRadius: '3px'
                }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
