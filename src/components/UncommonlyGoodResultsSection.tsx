'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/ThemeContext';

export default function UncommonlyGoodResultsSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const items = [
    {
      num: '001',
      title: 'Extracción & Dataset Sintético (SFT)',
      desc: 'Subes tus documentos (PDF, TXT, CSV, JSON) y nuestra tecnología extrae y genera cientos de pares de instrucción-respuesta con máxima diversidad sintáctica para evitar que el modelo alucine o repita muletillas.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Data Ingestion & Synthetic Dataset Icon */}
          <rect x="18" y="16" width="44" height="48" rx="8" />
          <line x1="28" y1="28" x2="52" y2="28" />
          <line x1="28" y1="38" x2="46" y2="38" />
          <line x1="28" y1="48" x2="40" y2="48" />
          <circle cx="56" cy="56" r="10" fill={isDark ? "#121216" : "#ffffff"} />
          <path d="M52 56 L60 56 M56 52 L56 60" />
        </svg>
      )
    },
    {
      num: '002',
      title: 'Entrenamiento QLoRA en GPUs de Alta Velocidad',
      desc: 'Inyectamos adaptadores neuronales LoRA (r=16) en modelos base de vanguardia (Llama 3.2, Qwen 2.5, Phi 3.5) cuantizados en 4-bits sobre clusters GPU de alto rendimiento.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Neural Fine-Tuning Weight Matrix Icon */}
          <circle cx="40" cy="24" r="12" />
          <circle cx="24" cy="52" r="12" />
          <circle cx="56" cy="52" r="12" />
          <line x1="32" y1="32" x2="28" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="48" y1="32" x2="52" y2="42" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="52" x2="44" y2="52" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      num: '003',
      title: 'Ajuste Antisobreajuste & Telemetría en Vivo',
      desc: 'Monitoreas el proceso de entrenamiento en tiempo real. Ajustamos tasas de aprendizaje y plantillas ChatML para asegurar que la IA responda exactamente con las reglas de tu empresa.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Real-time Telemetry Analytics Icon */}
          <rect x="16" y="20" width="48" height="40" rx="6" />
          <path d="M24 46 L34 38 L42 44 L56 28" />
          <circle cx="56" cy="28" r="3" fill="currentColor" />
          <line x1="16" y1="48" x2="64" y2="48" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      num: '004',
      title: 'Prueba en Vivo & Descarga de Pesos (GGUF)',
      desc: 'Pruebas tu IA entrenada inmediatamente en nuestro chat interactivo o descargas los pesos finales (GGUF / Safetensors) para desplegarlos en tus propios servidores sin costo por token.',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Model Download & Open Export Icon */}
          <path d="M40 18 L40 46 M30 36 L40 46 L50 36" />
          <path d="M18 48 L18 58 C18 61 21 64 24 64 L56 64 C59 64 62 61 62 58 L62 48" />
          <line x1="26" y1="26" x2="32" y2="26" />
          <line x1="48" y1="26" x2="54" y2="26" />
        </svg>
      )
    }
  ];

  return (
    <section style={{
      width: '100%',
      padding: '80px 0',
      marginTop: '40px',
      marginBottom: '60px',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        .results-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
        }
        .results-column {
          padding: 40px 28px;
          border-left: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 420px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .results-column:first-child {
          border-left: none;
        }
        .results-column:hover {
          background-color: ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
        }
        @media (max-width: 1024px) {
          .results-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .results-column {
            border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'};
          }
          .results-column:nth-child(2n+1) {
            border-left: none;
          }
        }
        @media (max-width: 640px) {
          .results-grid-container {
            grid-template-columns: 1fr;
          }
          .results-column {
            border-left: none !important;
            border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'};
            padding: 32px 16px;
          }
        }
      `}</style>

      {/* Top Header Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px',
        marginBottom: '80px',
        width: '100%'
      }}>
        {/* Big Main Heading */}
        <h2 style={{
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 400,
          color: isDark ? '#ffffff' : '#111111',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: 0,
          maxWidth: '680px'
        }}>
          Convierte la información de tu empresa en un Modelo de IA propio, entrenado y 100% tuyo.
        </h2>

        {/* Right side info & CTA button */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          maxWidth: '440px'
        }}>
          <p style={{
            fontSize: '15px',
            color: isDark ? '#a1a1aa' : '#555555',
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0
          }}>
            No dependas de respuestas genéricas. Poseemos tecnología propietaria de Fine-Tuning (QLoRA) para entrenar modelos LLM con tus propios manuales, bases de datos y procesos operacionales. Prueba tu modelo en el panel o descarga los pesos en formato abierto para ejecutarlo en tu propia infraestructura.
          </p>

          <button
            onClick={() => router.push('/Create_you_GLYNNE_model')}
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              backgroundColor: isDark ? '#ffffff' : '#111111',
              color: isDark ? '#111111' : '#ffffff',
              border: isDark ? '1px solid #ffffff' : '1px solid #111111',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#e4e4e7' : '#333333';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#111111';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Crear & Entrenar Mi Modelo GLYNNE</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)',
              fontSize: '12px',
              color: isDark ? '#111111' : '#ffffff',
              transition: 'transform 0.2s ease'
            }}>
              ›
            </span>
          </button>
        </div>
      </div>

      {/* Sub-bar section label divider */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        paddingBottom: '12px',
        marginBottom: '0px'
      }}>
        <span style={{
          fontSize: '11px',
          fontFamily: "'SF Mono', monospace",
          color: isDark ? '#a1a1aa' : '#86868b',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          / PLATAFORMA DE ENTRENAMIENTO Y DESCARGA DE MODELOS (QLoRA SFT)
        </span>

        <span style={{
          fontSize: '11px',
          fontFamily: "'SF Mono', monospace",
          color: isDark ? '#ffffff' : '#111111',
          padding: '4px 12px',
          borderRadius: '999px',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          TECNOLOGÍA PROPIETARIA <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isDark ? '#ffffff' : '#111111', display: 'inline-block' }}></span>
        </span>
      </div>

      {/* 4-Column Minimalist Cards Grid */}
      <div className="results-grid-container">
        {items.map((item) => (
          <div key={item.num} className="results-column">
            <div>
              <div style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', monospace",
                color: isDark ? '#a1a1aa' : '#86868b',
                marginBottom: '32px'
              }}>
                {item.num}
              </div>

              <div style={{
                color: isDark ? '#ffffff' : '#111111',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '90px'
              }}>
                {item.icon}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '19px',
                fontWeight: 500,
                color: isDark ? '#ffffff' : '#111111',
                margin: '0 0 12px 0',
                letterSpacing: '-0.01em',
                lineHeight: 1.3
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: isDark ? '#a1a1aa' : '#666666',
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
