'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import { useTheme } from '@/lib/ThemeContext';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import TrainModelBrandBlocks from '@/components/TrainModelBrandBlocks';
import Footer from '@/app/components/Footer';
import { 
  FiKey, 
  FiCpu, 
  FiCopy, 
  FiCheck, 
  FiShield, 
  FiZap, 
  FiCode, 
  FiLayers, 
  FiArrowRight, 
  FiActivity,
  FiSliders,
  FiAlertTriangle,
  FiTerminal,
  FiSun,
  FiMoon,
  FiChevronLeft,
  FiSend,
  FiTrash2,
  FiImage,
  FiMessageSquare,
  FiRefreshCw
} from 'react-icons/fi';

interface ModelCard {
  id: string;
  name: string;
  provider: string;
  category: 'chinese' | 'meta' | 'frontier' | 'nvidia';
  params: string;
  context: string;
  latency: string;
  badge: string;
}

const FEATURED_MODELS: ModelCard[] = [
  {
    id: 'llama-3.2-11b-vision',
    name: 'Meta Llama 3.2 11B Vision',
    provider: 'Meta AI / NVIDIA NIM',
    category: 'meta',
    params: '11B Multimodal',
    context: '128K Context',
    latency: '14ms / tok',
    badge: 'Vision Multimodal'
  },
  {
    id: 'llama-3.2-90b-vision',
    name: 'Meta Llama 3.2 90B Vision',
    provider: 'Meta AI / NVIDIA NIM',
    category: 'meta',
    params: '90B Multimodal',
    context: '128K Context',
    latency: '26ms / tok',
    badge: 'Flagship Vision'
  },
  {
    id: 'deepseek-coder-6.7b',
    name: 'DeepSeek Coder 6.7B',
    provider: 'DeepSeek AI',
    category: 'chinese',
    params: '6.7B Code Optimized',
    context: '64K Context',
    latency: '10ms / tok',
    badge: 'Ultra Fast Code'
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4.1 Flash',
    provider: 'DeepSeek AI',
    category: 'chinese',
    params: 'MoE Flash Inactive',
    context: '64K Context',
    latency: '12ms / tok',
    badge: 'High Efficiency'
  },
  {
    id: 'nvidia-nemotron-70b',
    name: 'NVIDIA Nemotron 70B',
    provider: 'NVIDIA NIM',
    category: 'nvidia',
    params: '70B RLAIF Optimized',
    context: '128K Context',
    latency: '15ms / tok',
    badge: 'NVIDIA Accelerated'
  },
  {
    id: 'mistral-nemo-12b',
    name: 'Mistral NeMo 12B',
    provider: 'Mistral AI (EU)',
    category: 'frontier',
    params: '12B Parameters',
    context: '128K Context',
    latency: '11ms / tok',
    badge: 'Real-Time Voice & Chat'
  },
  {
    id: 'phi-3.5-moe',
    name: 'Microsoft Phi-3.5 MoE',
    provider: 'Microsoft Open',
    category: 'frontier',
    params: '16x3.8B MoE',
    context: '128K Context',
    latency: '16ms / tok',
    badge: 'Math & Logic'
  }
];

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  imageUrl?: string;
  modelUsed?: string;
  timestamp: string;
}

type TabType = 'chat' | 'generator' | 'catalog' | 'credentials';



/* MAIN 1: EXPLORE OFFERINGS HERO SECTION (EXACT OPENWEIGHTS CARD DESIGN STRUCTURE) */
const ExploreOfferingsHeroSection = ({ isDark }: { isDark: boolean }) => {
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  const offerings = [
    {
      id: 'speed',
      num: '001',
      badge: '10MS / TOK LATENCY',
      title: 'INFERENCIA DE ALTA VELOCIDAD',
      desc: 'Modelos de lenguaje acelerados en clusters GPU con latencias ultrabajas (hasta 10ms/tok) para streaming en tiempo real.',
      graphic: (
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 3D Isometric Base Platform */}
          <path d="M20 58 L60 78 L100 58 L60 38 Z" fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} strokeWidth="1" />
          <path d="M32 48 L42 53 L42 63 L32 58 Z" fill={isDark ? '#27272a' : '#e4e4e7'} />
          <path d="M42 53 L52 48 L52 58 L42 63 Z" fill={isDark ? '#3f3f46' : '#d4d4d8'} />
          <path d="M52 38 L62 43 L62 63 L52 58 Z" fill={isDark ? '#3f3f46' : '#d4d4d8'} />
          <path d="M62 43 L72 38 L72 58 L62 63 Z" fill={isDark ? '#52525b' : '#a1a1aa'} />
          <path d="M72 28 L82 33 L82 63 L72 58 Z" fill={isDark ? '#52525b' : '#a1a1aa'} />
          <path d="M82 33 L92 28 L92 58 L82 63 Z" fill={isDark ? '#71717a' : '#71717a'} />
          <path d="M28 51 L52 31 L68 37 L95 9" stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M84 9 L95 9 L95 20" fill="none" stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'privacy',
      num: '002',
      badge: '100% SOBERANÍA',
      title: 'SOBERANÍA Y PRIVACIDAD',
      desc: 'Protege tu propiedad intelectual ejecutando modelos de pesos abiertos en tu propia infraestructura privada sin almacenamiento externo.',
      graphic: (
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 45 L60 65 L100 45 L60 25 Z" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} stroke={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)'} strokeWidth="1" />
          <path d="M20 45 L60 65 L60 73 L20 53 Z" fill={isDark ? '#27272a' : '#e4e4e7'} />
          <path d="M60 65 L100 45 L100 53 L60 73 Z" fill={isDark ? '#3f3f46' : '#d4d4d8'} />
          <ellipse cx="60" cy="40" rx="26" ry="13" fill={isDark ? '#3f3f46' : '#d4d4d8'} stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="1.5" />
          <path d="M34 40 L34 48 C34 55 86 55 86 48 L86 40" fill={isDark ? '#27272a' : '#e4e4e7'} stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="1.5" />
          <circle cx="60" cy="40" r="6" fill={isDark ? '#ffffff' : '#111111'} />
        </svg>
      )
    },
    {
      id: 'tuning',
      num: '003',
      badge: 'QLORA FINE-TUNING',
      title: 'AJUSTE FINO QLORA',
      desc: 'Optimiza la precisión de los modelos adaptando sus pesos matemáticos con la documentación y flujos operativos de tu empresa.',
      graphic: (
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="60" y1="15" x2="60" y2="65" stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="2.5" />
          <path d="M42 70 L60 80 L78 70 L60 60 Z" fill={isDark ? '#3f3f46' : '#d4d4d8'} stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="1" />
          <line x1="32" y1="28" x2="88" y2="28" stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="28" x2="24" y2="48" stroke={isDark ? '#a1a1aa' : '#666666'} strokeWidth="1" />
          <line x1="32" y1="28" x2="40" y2="48" stroke={isDark ? '#a1a1aa' : '#666666'} strokeWidth="1" />
          <ellipse cx="32" cy="48" rx="12" ry="5" fill={isDark ? '#27272a' : '#e4e4e7'} stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="1.5" />
          <line x1="88" y1="28" x2="80" y2="48" stroke={isDark ? '#a1a1aa' : '#666666'} strokeWidth="1" />
          <line x1="88" y1="28" x2="96" y2="48" stroke={isDark ? '#a1a1aa' : '#666666'} strokeWidth="1" />
          <ellipse cx="88" cy="48" rx="12" ry="5" fill={isDark ? '#27272a' : '#e4e4e7'} stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'gateway',
      num: '004',
      badge: 'GATEWAY & SUB-APIS',
      title: 'PUERTA DE ENLACE Y SUB-API',
      desc: 'Genera claves de acceso aisladas con límites de peticiones y control de cuotas para integrar o revender servicios a tus clientes.',
      graphic: (
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="58" rx="34" ry="16" fill={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth="1" />
          <ellipse cx="60" cy="58" rx="24" ry="11" fill={isDark ? '#27272a' : '#e4e4e7'} stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth="1" />
          <line x1="60" y1="18" x2="60" y2="58" stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="2.5" />
          <circle cx="60" cy="58" r="3" fill={isDark ? '#ffffff' : '#111111'} />
          <path d="M60 18 L86 25 L60 32 Z" fill={isDark ? '#ffffff' : '#111111'} stroke={isDark ? '#ffffff' : '#111111'} strokeWidth="1" />
        </svg>
      )
    }
  ];

  return (
    <div style={{
      width: '100%',
      marginBottom: '48px',
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLine}`,
      borderBottom: `1px solid ${borderLine}`,
      paddingTop: '36px',
      paddingBottom: '40px'
    }}>
      {/* HEADER SECTION */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px',
        marginBottom: '40px',
        width: '100%'
      }}>
        <div style={{ maxWidth: '680px', textAlign: 'left' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 400,
            color: textColor,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 16px 0',
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            Explora Nuestras Soluciones AI
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: subtextColor,
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            Infraestructura de inteligencia artificial de grado institucional para la ejecución, prueba y reentrenamiento de modelos de última generación.
          </p>
        </div>
      </div>

      {/* 4-COLUMN ARCHITECTURAL GRID WITH MATCHING BADGES & INDEXES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0px',
        borderTop: `1px solid ${borderLine}`,
        borderLeft: `1px solid ${borderLine}`,
        boxSizing: 'border-box'
      }}>
        {offerings.map((card) => (
          <div
            key={card.id}
            style={{
              padding: '32px 24px',
              borderRight: `1px solid ${borderLine}`,
              borderBottom: `1px solid ${borderLine}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
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
              {/* TOP MICRO-HEADER & BADGE */}
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

              {/* GRAPHIC FIGURE */}
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.graphic}
              </div>
            </div>

            {/* TITLE & DESCRIPTION */}
            <div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: textColor,
                margin: '0 0 10px 0',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                textTransform: 'uppercase',
                fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: subtextColor,
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
              }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* OPEN WEIGHTS MANIFESTO & ARCHITECTURAL GRID (EXACT HOME PAGE STYLE & FIGURES) */
const OpenWeightsManifestoGrid = ({ isDark, onExploreClick }: { isDark: boolean; onExploreClick: () => void }) => {
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const graphicStroke = isDark ? '#ffffff' : '#111111';
  const graphicFaint = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  const cards = [
    {
      id: 'local-edge',
      num: '001',
      badge: '3B 7B 14B',
      title: 'BIBLIOTECA DE MODELOS LOCALES Y DE BORDE',
      desc: 'Descarga modelos de código abierto cuantizados y ultrarrápidos (GGUF Q4_K_M / Q8_0) listos para ejecutarse directamente en portátiles de consumo, dispositivos periféricos o hardware local sin comisiones por token.',
      graphic: (
        <svg width="100%" height="160" viewBox="0 0 240 160" fill="none" style={{ display: 'block' }}>
          {/* Wireframe 3D Sphere / Globe Lattice */}
          <circle cx="120" cy="80" r="55" stroke={graphicStroke} strokeWidth="1.2" fill="none" />
          <ellipse cx="120" cy="80" rx="55" ry="22" stroke={graphicStroke} strokeWidth="1.2" fill="none" />
          <ellipse cx="120" cy="80" rx="55" ry="40" stroke={graphicFaint} strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <ellipse cx="120" cy="80" rx="22" ry="55" stroke={graphicStroke} strokeWidth="1.2" fill="none" />
          <line x1="65" y1="80" x2="175" y2="80" stroke={graphicStroke} strokeWidth="1" />
          <line x1="120" y1="25" x2="120" y2="135" stroke={graphicStroke} strokeWidth="1" />
          <circle cx="120" cy="80" r="4" fill={graphicStroke} />
        </svg>
      )
    },
    {
      id: 'foundation-engines',
      num: '002',
      badge: 'OPEN BENCHMARK 94.8%',
      title: 'MOTORES DE FUNDAMENTOS COMPLEJOS',
      desc: 'Acceda a arquitecturas de razonamiento pesado de última generación (Llama 3.2, Qwen 2.5, Phi 3.5) preconfiguradas para flujos de trabajo empresariales y despliegue de infraestructura interna.',
      graphic: (
        <svg width="100%" height="160" viewBox="0 0 240 160" fill="none" style={{ display: 'block' }}>
          {/* 4-Point / 8-Point Sparkling Vector Star & Parameter Matrix */}
          <g transform="translate(120, 80)">
            <path d="M0 -45 Q0 0 -45 0 Q0 0 0 45 Q0 0 45 0 Q0 0 0 -45 Z" fill={graphicStroke} stroke={graphicStroke} strokeWidth="1" />
            <line x1="-25" y1="-25" x2="25" y2="25" stroke={graphicStroke} strokeWidth="1.2" />
            <line x1="25" y1="-25" x2="-25" y2="25" stroke={graphicStroke} strokeWidth="1.2" />
            <circle cx="0" cy="0" r="52" stroke={graphicFaint} strokeWidth="0.8" strokeDasharray="2 4" />
          </g>
        </svg>
      )
    },
    {
      id: 'export-weights',
      num: '003',
      badge: 'GGUF / SAFETENSORS',
      title: 'EXPORTACIÓN DE ARCHIVOS DE PESO CON UN SOLO CLIC',
      desc: 'Obtenga con un solo clic el archivo exacto del algoritmo matemático que contiene el 100 % de los pesos del modelo funcional. Implemente en su propia nube privada o en sistemas aislados de la red.',
      graphic: (
        <svg width="100%" height="160" viewBox="0 0 240 160" fill="none" style={{ display: 'block' }}>
          {/* Vector Download & Open Export Graph */}
          <path d="M120 30 L120 95 M100 75 L120 95 L140 75" stroke={graphicStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 105 L70 125 C70 130 75 135 80 135 L160 135 C165 135 170 130 170 125 L170 105" stroke={graphicStroke} strokeWidth="2" fill="none" />
          <line x1="85" y1="50" x2="95" y2="50" stroke={graphicFaint} strokeWidth="2" />
          <line x1="145" y1="50" x2="155" y2="50" stroke={graphicFaint} strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'retrain-integration',
      num: '004',
      badge: 'RETRAIN STUDIO',
      title: 'INTEGRACIÓN DEL PANEL DE REENTRENAMIENTO',
      desc: 'Conecte al instante cualquier modelo de nuestro catálogo abierto directamente a nuestro panel de reentrenamiento QLoRA para ajustar los parámetros utilizando los datos operativos de su empresa.',
      graphic: (
        <svg width="100%" height="160" viewBox="0 0 240 160" fill="none" style={{ display: 'block' }}>
          {/* Multi-Agent Orbital Retrain Network */}
          <g transform="translate(120, 80)">
            <circle cx="0" cy="0" r="10" fill={graphicStroke} />
            <ellipse cx="0" cy="0" rx="70" ry="25" stroke={graphicStroke} strokeWidth="1.2" transform="rotate(-20)" fill="none" />
            <circle cx="-55" cy="12" r="3.5" fill={graphicStroke} />
            <circle cx="45" cy="-15" r="3" fill={graphicStroke} />
            <ellipse cx="0" cy="0" rx="65" ry="35" stroke={graphicStroke} strokeWidth="1.2" transform="rotate(25)" fill="none" />
            <circle cx="50" cy="20" r="3.5" fill={graphicStroke} />
          </g>
        </svg>
      )
    }
  ];

  return (
    <div style={{
      width: '100%',
      marginBottom: '48px',
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLine}`,
      borderBottom: `1px solid ${borderLine}`,
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      {/* HEADER SECTION (EXACT HOME TEXT) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '32px',
        marginBottom: '40px',
        width: '100%'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 400,
            color: textColor,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 16px 0',
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            Pesos abiertos. Soberanía total.
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: subtextColor,
            fontWeight: 300,
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            Explora y descarga nuestro catálogo seleccionado de arquitecturas LLM de código abierto. Desde modelos ultraligeros para ejecución en dispositivos locales hasta motores robustos preconfigurados para reentrenamiento.
          </p>
        </div>

        <div>
          <button
            onClick={onExploreClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: textColor,
              backgroundColor: 'transparent',
              border: `1.5px solid ${textColor}`,
              padding: '12px 24px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              transition: 'all 0.2s ease',
              fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000';
              e.currentTarget.style.color = isDark ? '#000000' : '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = textColor;
            }}
          >
            <span>Explorar la biblioteca completa de modelos</span>
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </div>
      </div>

      {/* 4-COLUMN ARCHITECTURAL GRID WITH FIGURES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0px',
        borderTop: `1px solid ${borderLine}`,
        borderLeft: `1px solid ${borderLine}`,
        boxSizing: 'border-box'
      }}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              padding: '32px 24px',
              borderRight: `1px solid ${borderLine}`,
              borderBottom: `1px solid ${borderLine}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
              backgroundColor: 'transparent',
              boxSizing: 'border-box',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div>
              {/* TOP MICRO-HEADER & BADGE */}
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

              {/* GRAPHIC FIGURE */}
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.graphic}
              </div>
            </div>

            {/* TITLE & DESCRIPTION */}
            <div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: textColor,
                margin: '0 0 10px 0',
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                textTransform: 'uppercase',
                fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: '12px',
                color: subtextColor,
                fontWeight: 300,
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
              }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MODELS PROVIDER HERO HUD BANNER (EXACT TRAINMODEL MAIN1 STYLE REPLICA)      */
/* -------------------------------------------------------------------------- */
const ModelsProviderHeroSection = ({ 
  isDark, 
  onStartChatClick, 
  onSubApiClick 
}: { 
  isDark: boolean; 
  onStartChatClick: () => void; 
  onSubApiClick: () => void;
}) => {
  const containerBg = isDark ? '#09090b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const svgStroke = isDark ? '#ffffff' : '#111111';
  const svgFaint = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';
  const primaryBtnBg = isDark ? '#e4e4e7' : '#111111';
  const primaryBtnText = isDark ? '#000000' : '#ffffff';

  return (
    <section style={{
      width: '100%',
      position: 'relative',
      zIndex: 10,
      boxSizing: 'border-box',
      marginBottom: '40px'
    }}>
      <style>{`
        .mp-hero-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: transparent;
          border-top: 1px solid ${borderLine};
          border-bottom: 1px solid ${borderLine};
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }
        .mp-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          border-bottom: 1px solid ${borderLine};
          font-family: 'SF Mono', monospace;
          font-size: 12px;
        }
        .mp-main-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          flex: 1;
          min-height: 0;
        }
        .mp-left-panel {
          padding: 40px 48px;
          border-right: 1px solid ${borderLine};
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mp-right-panel {
          padding: 40px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .mp-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          border-top: 1px solid ${borderLine};
          font-family: 'SF Mono', monospace;
          font-size: 11px;
          color: ${subtextColor};
          letter-spacing: 0.08em;
        }
        .mp-checkerboard {
          height: 12px;
          width: 100%;
          background-image: linear-gradient(45deg, ${borderLine} 25%, transparent 25%), 
                            linear-gradient(-45deg, ${borderLine} 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, ${borderLine} 75%), 
                            linear-gradient(-45deg, transparent 75%, ${borderLine} 75%);
          background-size: 8px 8px;
          background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
          opacity: 0.6;
        }
        @media (max-width: 960px) {
          .mp-main-grid {
            grid-template-columns: 1fr;
          }
          .mp-left-panel {
            border-right: none;
            border-bottom: 1px solid ${borderLine};
            padding: 24px 20px;
          }
          .mp-right-panel {
            padding: 24px 20px;
          }
        }
      `}</style>

      {/* Main HUD Frame Box */}
      <div className="mp-hero-box">

        {/* Top Header Bar inside HUD */}
        <div className="mp-top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px', color: textColor, fontFamily: 'sans-serif' }}>
            <span style={{ fontSize: '16px' }}>⬡</span> GLYNNE AI MODEL PROVIDER
          </div>

          <div style={{ display: 'flex', gap: '24px', color: subtextColor, letterSpacing: '0.08em', fontSize: '11px', fontFamily: "'SF Mono', monospace", textTransform: 'uppercase' }}>
            <span>INFERENCE</span>
            <span>LATENCY &lt; 10MS</span>
            <span>OPEN WEIGHTS</span>
            <span>GATEWAY</span>
          </div>
        </div>

        {/* Main Split Body */}
        <div className="mp-main-grid">

          {/* Left Panel: Radar HUD Target Reticle Visualizer */}
          <div className="mp-left-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                fontSize: '10px',
                fontFamily: "'SF Mono', monospace",
                color: textColor,
                letterSpacing: '0.12em',
                lineHeight: 1.3
              }}>
                MODEL PROVIDER HUB<br />
                GPU INFERENCE CLUSTERS<br />
                ENTERPRISE GATEWAY
              </div>

              <div>
                <svg width="60" height="32" viewBox="0 0 60 32" fill="none">
                  <ellipse cx="30" cy="16" rx="28" ry="14" stroke={svgStroke} strokeWidth="1" />
                  <ellipse cx="30" cy="16" rx="18" ry="14" stroke={svgFaint} strokeWidth="0.8" />
                  <circle cx="30" cy="16" r="6" fill={svgStroke} />
                  <circle cx="30" cy="16" r="2" fill={containerBg} />
                </svg>
              </div>
            </div>

            {/* Center Target Reticle & Horizon Radar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0',
              position: 'relative'
            }}>
              <svg width="340" height="340" viewBox="0 0 280 280" fill="none">
                <path d="M 30 50 H 50 M 30 50 V 70" stroke={svgStroke} strokeWidth="1.2" />
                <path d="M 250 50 H 230 M 250 50 V 70" stroke={svgStroke} strokeWidth="1.2" />
                <path d="M 30 230 H 50 M 30 230 V 210" stroke={svgStroke} strokeWidth="1.2" />
                <path d="M 250 230 H 230 M 250 230 V 210" stroke={svgStroke} strokeWidth="1.2" />

                <circle cx="140" cy="140" r="95" stroke={svgStroke} strokeWidth="1" />
                <line x1="20" y1="140" x2="260" y2="140" stroke={svgStroke} strokeWidth="0.8" />

                {Array.from({ length: 17 }).map((_, i) => {
                  const x = 70 + i * 8.75;
                  const isMajor = i % 4 === 0;
                  return (
                    <line
                      key={`mp-tick-${i}`}
                      x1={x}
                      y1={140}
                      x2={x}
                      y2={isMajor ? 155 : 148}
                      stroke={svgStroke}
                      strokeWidth={isMajor ? "1.2" : "0.8"}
                    />
                  );
                })}

                <circle cx="140" cy="95" r="4" fill="none" stroke={svgStroke} strokeWidth="1" />
                <line x1="140" y1="85" x2="140" y2="90" stroke={svgStroke} strokeWidth="1" />
                <line x1="140" y1="100" x2="140" y2="105" stroke={svgStroke} strokeWidth="1" />
                <line x1="130" y1="95" x2="135" y2="95" stroke={svgStroke} strokeWidth="1" />
                <line x1="145" y1="95" x2="150" y2="95" stroke={svgStroke} strokeWidth="1" />

                <polygon points="135,115 145,115 140,122" fill={svgStroke} />
                <path d="M 220 80 H 205 M 220 80 V 95" stroke={svgStroke} strokeWidth="1.5" />
                <text x="50" y="85" fill={textColor} fontSize="9" fontFamily="monospace" letterSpacing="0.1em">START</text>

                {/* Center GLYNNE Logo Badge */}
                <rect x="96" y="96" width="88" height="88" fill={containerBg} stroke={svgStroke} strokeWidth="1.2" rx="4" />
                <g transform="translate(105, 105) scale(0.14)">
                  <path
                    d="M 50 248.252 L 50 456.751 192.750 457.379 C 271.263 457.725, 361.262 458.287, 392.750 458.628 L 450 459.248 L 450 250.748 L 450 42.249 307.250 41.621 C 228.737 41.275, 138.738 40.713, 107.250 40.372 L 50 39.752 50 248.252 M 67 248.291 L 67 440.765 108.250 441.368 C 130.938 441.700, 213.287 442.244, 291.250 442.577 L 433 443.184 433 250.709 L 433 58.235 391.750 57.632 C 369.063 57.300, 286.712 56.756, 208.750 56.423 L 67 55.816 67 248.291 M 128.116 83.980 C 107.992 89.424, 91.038 105.784, 83.655 126.882 C 81.077 134.249, 80.576 137.340, 80.204 148.180 C 79.673 163.622, 81.383 172.548, 87.025 183.787 C 93.772 197.229, 104.680 208.233, 117.500 214.531 C 127.055 219.225, 134.751 221, 145.550 221 C 174.345 221, 198.757 203.773, 206.388 178.068 C 207.554 174.140, 208 168.537, 208 157.818 L 208 143 L 176.500 143 L 145 143 L 145 155 L 145 167 L 160.500 167 C 177.973 167, 177.379 166.666, 174.859 175.078 C 173.124 180.868, 168.620 185.570, 161.405 189.122 C 148.447 195.501, 134.730 192.833, 124.556 181.956 C 108.755 165.064, 109.516 135.415, 126.170 119.022 C 133.040 112.260, 140.029 109.650, 149.673 110.246 C 159.182 110.834, 166.448 114.382, 172.726 121.503 L 177.445 126.854 184.577 119.177 C 188.499 114.955, 192.964 110.008, 194.498 108.185 L 197.288 104.869 192.894 100.309 C 186.535 93.709, 177.818 88.354, 168.578 85.369 C 157.254 81.711, 138.840 81.079, 128.116 83.980 M 221 151.500 L 221 219 L 260 219 L 299 219 L 299 205.500 L 299 192 L 275.500 192 L 252 192 L 252 138 L 252 84 L 236.500 84 L 221 84 L 221 151.500 M 299 84.506 C 299 84.785, 310.025 101.546, 323.500 121.754 L 348 158.496 L 348 188.748 L 348 219 L 363.500 219 L 379 219 L 379.001 189.250 L 379.001 159.500 L 404 122 L 429 84.500 L 410.809 84.227 C 397.075 84.020, 392.328 84.265, 391.434 85.227 C 390.782 85.927, 384.737 95.050, 378 105.500 C 371.263 115.950, 365.244 125.032, 364.625 125.682 C 363.777 126.573, 360.071 121.580, 349.595 105.432 L 335.691 84 L 317.345 84 C 307.255 84, 299 84.228, 299 84.506 M 85 313 L 85 377 L 99.989 377 L 114.977 377 L 115.239 337.600 L 115.500 298.201 L 140.825 337.600 L 166.150 377 L 181.075 377 L 196 377 L 196 313 L 196 249 L 181.012 249 L 166.023 249 L 165.762 288.132 L 165.500 327.264 L 140.500 288.179 L 115.500 249.094 L 100.250 249.047 L 85 249 L 85 313 M 214 313 L 214 377 L 228.988 377 L 243.977 377 L 244.238 337.996 L 244.500 298.993 L 269.500 337.975 L 294.500 376.956 L 309.250 376.978 L 324 377 L 324 313 L 324 249 L 309.511 249 L 295.023 249 L 294.761 288.502 L 294.500 328.005 L 269.115 288.502 L 243.730 249 L 228.865 249 L 214 249 L 214 313 M 343 313 L 343 377 L 380.030 377 L 417.060 377 L 416.780 364.250 L 416.500 351.500 L 394.250 351.231 L 372 350.962 L 372 338.481 L 372 326 L 393.500 326 L 415 326 L 415 313 L 415 300 L 393.500 300 L 372 300 L 372 287.519 L 372 275.038 L 394.250 274.769 L 416.500 274.500 L 416.780 261.750 L 417.060 249 L 380.030 249 L 343 249 L 343 313"
                    fill={textColor}
                    fillRule="evenodd"
                  />
                </g>
                <text x="225" y="210" fill={textColor} fontSize="10" fontFamily="monospace" fontWeight="700">OP</text>
              </svg>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'SF Mono', monospace",
              fontSize: '11px',
              color: textColor,
              letterSpacing: '0.1em'
            }}>
              <div>001 &gt;&gt;&gt;&gt;&gt;&gt;&gt;</div>
              <div style={{ fontWeight: 700 }}>HIGH SPEED INFERENCE</div>
            </div>
          </div>

          {/* Right Panel: Typography & Text Copy */}
          <div className="mp-right-panel">
            <div>
              <h1 style={{
                fontSize: 'clamp(44px, 5.5vw, 84px)',
                fontWeight: 400,
                color: textColor,
                lineHeight: 0.95,
                margin: '0 0 32px 0',
                letterSpacing: '-0.03em',
                fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif"
              }}>
                Scale ®<br />
                the way<br />
                you infer
              </h1>

              <div style={{
                fontSize: '11px',
                fontFamily: "'SF Mono', monospace",
                fontWeight: 600,
                color: textColor,
                letterSpacing: '0.12em',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span>AI MODEL PROVIDER</span>
                <span style={{ color: subtextColor }}>/</span>
                <span>OPEN WEIGHT INFERENCE</span>
              </div>

              <p style={{
                fontSize: '12px',
                fontFamily: "'SF Mono', monospace",
                color: subtextColor,
                lineHeight: 1.6,
                margin: '0 0 36px 0',
                maxWidth: '460px'
              }}>
                Access high-speed LLM inference clusters and pre-configured open-weight models. Deploy private sub-APIs with quota management and execute real-time streaming queries with ultra-low latencies.
              </p>
            </div>

            {/* Dual Action Buttons */}
            <div style={{ display: 'flex', gap: '0px', border: `1px solid ${borderLine}`, marginTop: 'auto' }}>
              <button
                onClick={onStartChatClick}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  backgroundColor: primaryBtnBg,
                  color: primaryBtnText,
                  border: 'none',
                  fontSize: '11px',
                  fontFamily: "'SF Mono', monospace",
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                PROBAR MODELOS EN CHAT
              </button>

              <button
                onClick={onSubApiClick}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  backgroundColor: 'transparent',
                  color: textColor,
                  borderLeft: `1px solid ${borderLine}`,
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  fontSize: '11px',
                  fontFamily: "'SF Mono', monospace",
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                GENERAR SUB-APIS & CLAVES
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="mp-bottom-bar">
          <div>01/10 &nbsp; OPEN WEIGHT INFERENCE ENGINE</div>
          <div>STATUS: GPU CLUSTERS ACTIVE</div>
          <div style={{ fontWeight: 700, color: textColor }}>LATENCY &lt; 10MS / TOK</div>
        </div>

        {/* Bottom Checkered Racing Line */}
        <div className="mp-checkerboard" />
      </div>
    </section>
  );
};



export default function ModelsProviderPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [userEmail, setUserEmail] = useState<string>('guest@axglynne.com');
  const [subApiName, setSubApiName] = useState('Production Client Key');
  const [selectedModel, setSelectedModel] = useState('llama-3.2-11b-vision');

  const [rateLimit, setRateLimit] = useState('120');
  const [quotaTokens, setQuotaTokens] = useState('5,000,000');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [trigger404, setTrigger404] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'node' | 'curl'>('python');

  // Live Gateway Interactive Tester state
  const [nvidiaMasterKey, setNvidiaMasterKey] = useState<string>('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');
  const [keySaved, setKeySaved] = useState(false);

  // Full Interactive Model Chat Studio State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy el asistente de prueba en vivo de GLYNNE AI Model Provider. Puedes seleccionar cualquier modelo del catálogo y chatear directamente con mi motor en tiempo real.',
      modelUsed: 'GLYNNE AI Engine',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatImageUrl, setChatImageUrl] = useState('');
  const [showImageUrlField, setShowImageUrlField] = useState(false);
  const [chatSystemPrompt, setChatSystemPrompt] = useState('Eres un asistente de inteligencia artificial profesional de la plataforma GLYNNE.');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();

    // Load saved master key if present
    const savedKey = localStorage.getItem('glynne_nvidia_master_key');
    if (savedKey) {
      setNvidiaMasterKey(savedKey);
    }
  }, []);

  const handleSaveMasterKey = () => {
    if (nvidiaMasterKey) {
      localStorage.setItem('glynne_nvidia_master_key', nvidiaMasterKey);
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2500);
    }
  };

  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!chatInput.trim() && !chatImageUrl.trim()) || isChatLoading) return;

    const userMessageContent = chatInput.trim();
    const userImg = chatImageUrl.trim();

    const newMsgId = Date.now().toString();
    const userMsg: ChatMessage = {
      id: newMsgId,
      role: 'user',
      content: userMessageContent || (userImg ? 'Analiza esta imagen adjunta.' : ''),
      imageUrl: userImg || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...chatMessages, userMsg];
    setChatMessages(updatedHistory);
    setChatInput('');
    setChatImageUrl('');
    setShowImageUrlField(false);
    setIsChatLoading(true);
    setChatError(null);

    // Build payload for OpenAI format
    const apiMessages = [
      { role: 'system', content: chatSystemPrompt },
      ...updatedHistory.map(m => {
        if (m.imageUrl && m.role === 'user') {
          return {
            role: 'user',
            content: [
              { type: 'image_url', image_url: { url: m.imageUrl } },
              { type: 'text', text: m.content || 'Analiza esta imagen.' }
            ]
          };
        }
        return { role: m.role, content: m.content };
      })
    ];

    try {
      const apiKeyToUse = generatedKey || 'gly_sub_live_demo_key_99';
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKeyToUse}`,
      };

      if (nvidiaMasterKey) {
        headers['X-NVIDIA-API-KEY'] = nvidiaMasterKey;
      }

      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: selectedModel,
          messages: apiMessages,
          stream: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setChatError(data?.error?.message || 'Error en la respuesta del motor GLYNNE');
      } else {
        const assistantText = data?.choices?.[0]?.message?.content || 'Respuesta completada.';
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantText,
          modelUsed: selectedModel,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err: unknown) {
      const errObj = err as Error;
      setChatError(errObj.message || 'Error de conexión con el Gateway GLYNNE');
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChatHistory = () => {
    setChatMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Historial reiniciado. Selecciona un modelo y envía un nuevo mensaje.',
        modelUsed: 'GLYNNE AI Engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatError(null);
  };

  // Trigger 404 state handler
  if (trigger404) {
    notFound();
  }

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGeneratedKey(`gly_sub_live_${randomHex}`);
  };

  const handleCopyKey = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCodeSnippet = () => {
    const currentKey = generatedKey || 'gly_sub_live_a8f9c2d1e4b56789';
    const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/v1` : 'https://axglynne.com/api/v1';

    if (activeCodeTab === 'python') {
      return `from openai import OpenAI

# Connect client applications directly to GLYNNE AI Provider Gateway
client = OpenAI(
    base_url="${baseUrl}",
    api_key="${currentKey}"
)

response = client.chat.completions.create(
    model="${selectedModel}",
    messages=[
        {"role": "system", "content": "You are GLYNNE AI Provider Engine."},
        {"role": "user", "content": "Execute high-performance inference."}
    ]
)

print(response.choices[0].message.content)`;
    }

    if (activeCodeTab === 'node') {
      return `import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: '${baseUrl}',
  apiKey: '${currentKey}',
});

async function run() {
  const completion = await openai.chat.completions.create({
    model: '${selectedModel}',
    messages: [{ role: 'user', content: 'Inference request via GLYNNE Gateway' }],
  });

  console.log(completion.choices[0].message.content);
}

run();`;
    }

    return `curl ${baseUrl}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${currentKey}" \\
  -d '{
    "model": "${selectedModel}",
    "messages": [{"role": "user", "content": "Hello GLYNNE Provider Gateway"}],
    "stream": false
  }'`;
  };

  return (
    <BackgroundWrapper>
      <div 
        data-theme={theme}
        style={{
          backgroundColor: 'transparent',
          color: isDark ? '#ffffff' : '#000000',
          minHeight: '100vh',
          width: '100vw',
          maxWidth: '100vw',
          fontFamily: "var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          boxSizing: 'border-box',
          position: 'relative',
          overflowX: 'hidden'
        }}
      >


      {/* MAIN CONTENT WRAPPER */}
      <main style={{ width: '100vw', maxWidth: '100vw', margin: '0', padding: '32px 3.5vw 80px 3.5vw', position: 'relative', zIndex: 10, boxSizing: 'border-box' }}>

        {/* TOP MAIN 1: TRAINMODEL BRAND BLOCKS ("Create API") */}
        <div style={{ marginBottom: '40px' }}>
          <TrainModelBrandBlocks 
            brandPart="Create" 
            blocksPart="API" 
          />
        </div>

        {/* MAIN WORKSPACE 1: INTERACTIVE MODEL CHAT TESTING STUDIO & MODEL CATALOG (70-30 SPLIT) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '7fr 3fr',
          gap: '24px',
          alignItems: 'stretch',
          width: '100%'
        }}>
            {/* LEFT PANEL (70%): AX_CHAT INTERFACE */}
            <div style={{
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: isDark ? 'rgba(10, 10, 10, 0.55)' : 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxSizing: 'border-box',
              height: '680px',
              boxShadow: isDark 
                ? '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.15)' 
                : '0 20px 50px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.12)'
            }}>
              {/* STUDIO CHAT HEADER */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', paddingBottom: '14px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {/* Active Selected Model Pill Indicator */}
                  <span style={{
                    padding: '5px 12px',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                    border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
                    borderRadius: '16px',
                    color: isDark ? '#ffffff' : '#111111',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                    {FEATURED_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Image Attachment Toggle */}
                  <button
                    onClick={() => setShowImageUrlField(!showImageUrlField)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: showImageUrlField ? (isDark ? '#ffffff' : '#000000') : (isDark ? '#8e8e93' : '#666666'),
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 10px'
                    }}
                    title="Adjuntar Imagen para Visión"
                  >
                    <FiImage size={14} />
                    <span>{showImageUrlField ? 'Ocultar Imagen' : '+ Imagen'}</span>
                  </button>

                  {/* Reset Chat */}
                  <button
                    onClick={handleClearChatHistory}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isDark ? '#8e8e93' : '#666666',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 10px'
                    }}
                  >
                    <FiTrash2 size={14} />
                    <span>Limpiar</span>
                  </button>
                </div>
              </div>

              {/* CHAT MESSAGES DISPLAY CONTAINER */}
              <div style={{
                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '20px',
                padding: '20px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxSizing: 'border-box',
                flex: 1,
                minHeight: 0
              }}>
                {chatMessages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        justifyContent: isUser ? 'flex-end' : 'flex-start',
                        width: '100%'
                      }}
                    >
                      <div style={{
                        maxWidth: isUser ? '82%' : '92%',
                        padding: isUser ? '12px 18px' : '12px 0',
                        borderRadius: '20px',
                        borderBottomRightRadius: isUser ? '4px' : '20px',
                        borderBottomLeftRadius: isUser ? '20px' : '4px',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        backgroundColor: isUser 
                          ? (isDark ? '#f5f5f7' : '#111111') 
                          : 'transparent',
                        color: isUser 
                          ? (isDark ? '#111111' : '#ffffff') 
                          : (isDark ? '#f5f5f7' : '#111111'),
                        boxShadow: isUser ? '0 8px 24px rgba(0,0,0,0.25)' : 'none',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {msg.imageUrl && (
                          <div style={{ marginBottom: '10px' }}>
                            <img 
                              src={msg.imageUrl} 
                              alt="Vision Input" 
                              style={{ maxWidth: '240px', maxHeight: '180px', borderRadius: '12px', objectFit: 'cover' }} 
                            />
                          </div>
                        )}
                        {msg.content}
                      </div>
                    </div>
                  );
                })}

                {isChatLoading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                    <div style={{
                      padding: '10px 0',
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center',
                      color: isDark ? '#8e8e93' : '#666666',
                      fontSize: '13px'
                    }}>
                      <FiRefreshCw style={{ animation: 'spin 1s linear infinite' }} />
                      <span>AX Core procesando respuesta...</span>
                    </div>
                  </div>
                )}

                {chatError && (
                  <div style={{ fontSize: '13px', color: '#ef4444', padding: '12px 18px', backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    {chatError}
                  </div>
                )}
              </div>

              {/* IMAGE URL FIELD (IF TOGGLED) */}
              {showImageUrlField && (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
                  <FiImage style={{ color: isDark ? '#ffffff' : '#000000' }} />
                  <input
                    type="text"
                    value={chatImageUrl}
                    onChange={(e) => setChatImageUrl(e.target.value)}
                    placeholder="URL de imagen para visión..."
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7',
                      border: 'none',
                      borderRadius: '16px',
                      color: isDark ? '#ffffff' : '#000000',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* CHAT INPUT FORM (AX_CHAT CAPSULE FORM) */}
              <form onSubmit={handleSendChatMessage} style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                backgroundColor: isDark ? 'rgba(20, 20, 20, 0.8)' : 'rgba(245, 245, 247, 0.95)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '24px',
                padding: '8px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                gap: '12px',
                boxSizing: 'border-box',
                flexShrink: 0
              }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Mensaje a ${FEATURED_MODELS.find(m => m.id === selectedModel)?.name || 'AX Core'}...`}
                  disabled={isChatLoading}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: isDark ? '#f5f5f7' : '#111111',
                    backgroundColor: 'transparent',
                    padding: '8px 0',
                    fontFamily: 'inherit',
                    letterSpacing: '0.01em'
                  }}
                />

                <button
                  type="submit"
                  disabled={isChatLoading || (!chatInput.trim() && !chatImageUrl.trim())}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isDark ? '#ffffff' : '#111111',
                    color: isDark ? '#111111' : '#ffffff',
                    border: 'none',
                    cursor: isChatLoading ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: (isChatLoading || (!chatInput.trim() && !chatImageUrl.trim())) ? 0.4 : 1,
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <FiSend size={15} />
                </button>
              </form>
            </div>

            {/* RIGHT PANEL (30%): MODEL CATALOG SELECTION CARDS */}
            <div style={{
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: isDark ? 'rgba(10, 10, 10, 0.55)' : 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxSizing: 'border-box',
              height: '680px',
              boxShadow: isDark 
                ? '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.15)' 
                : '0 20px 50px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.12)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                paddingBottom: '14px',
                flexShrink: 0
              }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: isDark ? '#ffffff' : '#000000', fontFamily: 'var(--font-geist-sans), sans-serif' }}>
                  Catálogo de Modelos Habilitados
                </div>
                <span style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#71717a' }}>
                  Haz clic para cambiar de modelo
                </span>
              </div>

              {/* SCROLLABLE MODEL CARDS LIST */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                overflowY: 'auto',
                paddingRight: '4px',
                flex: 1,
                minHeight: 0
              }}>
                {FEATURED_MODELS.map((model) => {
                  const isSelected = selectedModel === model.id;
                  return (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      style={{
                        padding: '16px 18px',
                        border: isSelected
                          ? (isDark ? '1.5px solid #ffffff' : '1.5px solid #000000')
                          : (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)'),
                        backgroundColor: isSelected
                          ? (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)')
                          : (isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)'),
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: isSelected
                            ? (isDark ? '#ffffff' : '#000000')
                            : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'),
                          color: isSelected
                            ? (isDark ? '#000000' : '#ffffff')
                            : (isDark ? '#ffffff' : '#000000')
                        }}>
                          {model.badge}
                        </span>

                        <span style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#71717a' }}>
                          {model.latency}
                        </span>
                      </div>

                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#ffffff' : '#000000', marginBottom: '4px' }}>
                          {model.name}
                        </div>
                        <div style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#71717a' }}>
                          {model.provider} · <span style={{ color: isDark ? '#d4d4d8' : '#333' }}>{model.params}</span> · {model.context}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: isSelected ? (isDark ? '#ffffff' : '#000000') : (isDark ? '#71717a' : '#a1a1aa')
                      }}>
                        <span>{isSelected ? '✓ Modelo Activo en Chat' : 'Seleccionar Modelo'}</span>
                        <FiArrowRight size={13} style={{ transform: isSelected ? 'translateX(2px)' : 'none', transition: 'transform 0.2s' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        {/* SUB-APIS GENERATOR & CODE INTEGRATION TERMINAL (DIRECTLY BELOW CHAT & MODELS WORKSPACE) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginTop: '40px' }}>
            
            {/* LEFT PANEL: SUB-API GENERATOR */}
            <div style={{
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: isDark ? 'rgba(10, 10, 10, 0.65)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#ffffff' : '#000000', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', paddingBottom: '12px' }}>
                Crear Sub-API Key para Cliente
              </div>

              <form onSubmit={handleGenerateKey} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: isDark ? '#a1a1aa' : '#71717a', marginBottom: '8px' }}>
                    Nombre del Cliente / Proyecto
                  </label>
                  <input
                    type="text"
                    value={subApiName}
                    onChange={(e) => setSubApiName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: isDark ? '#000000' : '#ffffff',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                      borderRadius: '8px',
                      color: isDark ? '#ffffff' : '#000000',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: isDark ? '#a1a1aa' : '#71717a', marginBottom: '8px' }}>
                    Modelo Objetivo Asignado
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: isDark ? '#000000' : '#ffffff',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                      borderRadius: '8px',
                      color: isDark ? '#ffffff' : '#000000',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    {FEATURED_MODELS.map(m => (
                      <option key={m.id} value={m.id} style={{ background: isDark ? '#000' : '#fff', color: isDark ? '#fff' : '#000' }}>
                        {m.name} — {m.badge}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: isDark ? '#a1a1aa' : '#71717a', marginBottom: '8px' }}>
                      Límite RPM
                    </label>
                    <input
                      type="text"
                      value={rateLimit}
                      onChange={(e) => setRateLimit(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: isDark ? '#000000' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px',
                        color: isDark ? '#ffffff' : '#000000',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: isDark ? '#a1a1aa' : '#71717a', marginBottom: '8px' }}>
                      Cuota de Tokens
                    </label>
                    <input
                      type="text"
                      value={quotaTokens}
                      onChange={(e) => setQuotaTokens(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: isDark ? '#000000' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px',
                        color: isDark ? '#ffffff' : '#000000',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px 20px',
                    backgroundColor: isDark ? '#ffffff' : '#000000',
                    color: isDark ? '#000000' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '8px'
                  }}
                >
                  <FiKey />
                  <span>Generar Sub-API Key</span>
                </button>
              </form>

              {/* Generated Key Box */}
              <div style={{
                padding: '14px 16px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                borderRadius: '8px',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: isDark ? '#a1a1aa' : '#71717a', marginBottom: '6px' }}>
                  Llave Generada:
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <code style={{
                    flex: 1,
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    color: generatedKey ? (isDark ? '#ffffff' : '#000000') : (isDark ? '#71717a' : '#a1a1aa'),
                    wordBreak: 'break-all',
                    fontWeight: generatedKey ? 600 : 400
                  }}>
                    {generatedKey || 'Haz clic en "Generar Sub-API Key" arriba...'}
                  </code>

                  {generatedKey && (
                    <button
                      onClick={handleCopyKey}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: isDark ? '#ffffff' : '#000000',
                        border: 'none',
                        borderRadius: '6px',
                        color: isDark ? '#000000' : '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {copied ? <FiCheck /> : <FiCopy />}
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: CODE TERMINAL INTEGRATION */}
            <div style={{
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: isDark ? 'rgba(10, 10, 10, 0.65)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#ffffff' : '#000000' }}>Integración de Código para Clientes</span>
                  <span style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#71717a' }}>OpenAI Compatible</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                  {(['python', 'node', 'curl'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: activeCodeTab === tab ? (isDark ? '#ffffff' : '#000000') : 'transparent',
                        border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
                        borderRadius: '6px',
                        color: activeCodeTab === tab ? (isDark ? '#000000' : '#ffffff') : (isDark ? '#ffffff' : '#000000'),
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Code Terminal View */}
                <div style={{
                  backgroundColor: isDark ? '#111111' : '#18181b',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '18px',
                  color: '#f4f4f5',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                  maxHeight: '260px',
                  fontFamily: "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
                }}>
                  <pre style={{ margin: 0, fontFamily: 'inherit' }}>
                    <code>{getCodeSnippet()}</code>
                  </pre>
                </div>
              </div>

              {/* Diagnostic Route Button */}
              <div style={{
                padding: '14px 16px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: '8px',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: isDark ? '#ffffff' : '#000000', marginBottom: '2px' }}>
                    Diagnóstico de Ruta // Estado 404
                  </div>
                  <div style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#71717a' }}>
                    Probar el manejador personalizado de rutas no encontradas.
                  </div>
                </div>

                <button
                  onClick={() => setTrigger404(true)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: 'transparent',
                    border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.2)',
                    borderRadius: '6px',
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Probar 404
                </button>
              </div>
            </div>

        </div>

        {/* TAB 4: NVIDIA MASTER KEY CONFIGURATION */}
        {activeTab === 'credentials' && (
          <div style={{
            border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.65)' : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#ffffff' : '#000000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiKey size={16} />
                  <span>Clave Maestra del Gateway (NVIDIA Build API Key)</span>
                </div>
                <div style={{ fontSize: '12px', color: isDark ? '#a1a1aa' : '#71717a', marginTop: '4px' }}>
                  Ingresa aquí tu API Key para activar la conectividad de los modelos en producción.
                </div>
              </div>

              <button
                onClick={handleSaveMasterKey}
                style={{
                  padding: '10px 18px',
                  backgroundColor: isDark ? '#ffffff' : '#000000',
                  color: isDark ? '#000000' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                {keySaved ? <FiCheck /> : <FiZap />}
                <span>{keySaved ? 'Clave Guardada' : 'Guardar Clave'}</span>
              </button>
            </div>

            <div>
              <input
                type="text"
                value={nvidiaMasterKey}
                onChange={(e) => setNvidiaMasterKey(e.target.value)}
                placeholder="nvapi-..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: isDark ? '#000000' : '#ffffff',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                  borderRadius: '8px',
                  color: isDark ? '#ffffff' : '#000000',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* MAIN 1: EXPLORE OFFERINGS HERO BANNER (SOLUCIONES AI 001-004) */}
        <div style={{ marginTop: '48px' }}>
          <ExploreOfferingsHeroSection isDark={isDark} />
        </div>



        {/* OPEN WEIGHTS MANIFESTO ARCHITECTURAL GRID WITH FIGURES */}
        <div style={{ marginTop: '48px' }}>
          <OpenWeightsManifestoGrid isDark={isDark} onExploreClick={() => setActiveTab('catalog')} />
        </div>
      </main>
    </div>
  </BackgroundWrapper>
);
}
