'use client';

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaBook, FaTerminal, FaCode, FaMicrochip, FaShieldAlt, FaKey, FaChevronRight } from 'react-icons/fa';

const DOC_SECTIONS = [
  {
    id: 'quickstart',
    title: 'Guía de Inicio Rápido (Quickstart)',
    icon: <FaBook color="#3b82f6" />,
    content: `Bienvenido a la documentación oficial de AX GLYNNE. Nuestra plataforma permite a empresas integrar agentes conversacionales de voz y texto con modelos de lenguaje fine-tuned.

### Requisitos Previos:
1. Una cuenta activa en el Panel de AX GLYNNE.
2. Tu API Key secreta generada en la sección de Configuración.
3. Node.js >= 18.x o Python >= 3.10.

### Paso 1: Autenticación
Todas las peticiones a la API deben incluir el encabezado Bearer Token:
Authorization: Bearer ax_live_xxxxxxxxxxxxxxxx`
  },
  {
    id: 'voice-api',
    title: 'AX Voice API & WebSockets',
    icon: <FaTerminal color="#10b981" />,
    content: `El motor de AX Voice ofrece streaming bi-direccional a través de WebSockets con una latencia promedio inferior a 250ms.

### Endpoint WebSocket:
wss://axglynne.com/api/v1/voice/stream

### Formato de Audio Soportado:
- PCM 16kHz mono (Entrada)
- MP3 / Opus 24kHz (Salida TTS)

### Motores TTS Disponibles:
- ElevenLabs Turbo v2.5 (Voz hiperrealista)
- Edge Neural TTS (Baja latencia y costos optimizados)`
  },
  {
    id: 'qlora-trainer',
    title: 'Entrenamiento QLoRA de Modelos',
    icon: <FaMicrochip color="#8b5cf6" />,
    content: `AX GLYNNE te permite realizar Fine-Tuning eficiente mediante cuantización de 4-bits y adaptadores de rango bajo (LoRA).

### Modelos Base Disponibles:
- unsloth/Qwen2.5-0.5B-Instruct (Ultrarrápido, 500 MB)
- unsloth/Qwen2.5-1.5B-Instruct (Equilibrado, 1.5 GB)
- unsloth/Llama-3.2-1B-Instruct (Oficial Meta, 1.2 GB)
- unsloth/Phi-3.5-mini-instruct (Alta Precisión, 3.8 GB)

### Formato del Dataset JSONL:
[{"instruction": "System prompt", "input": "Pregunta", "output": "Respuesta esperada"}]`
  },
  {
    id: 'security-compliance',
    title: 'Seguridad, Privacidad y SOC2',
    icon: <FaShieldAlt color="#ef4444" />,
    content: `Garantizamos la soberanía absoluta de tus datos empresariales.

- **Sin entrenamiento externo:** Tus datos conversacionales NUNCA se utilizan para entrenar modelos públicos de terceros.
- **Cifrado en reposo y tránsito:** Cifrado AES-256 para bases de datos Supabase y TLS 1.3 en todas las transmisiones HTTP/WebSocket.
- **Guardrails deterministas:** Filtros de contenido y verificación de esquemas para prevenir inyecciones de prompts.`
  }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quickstart');
  const currentDoc = DOC_SECTIONS.find((s) => s.id === activeSection) || DOC_SECTIONS[0];

  return (
    <>
      <Header />
      <BackgroundWrapper>
        <div style={{
          minHeight: '100vh',
          padding: '140px 20px 80px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          color: '#111111'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#666',
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              Documentación & Guías de API
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
              Centro de Documentación Técnica AX GLYNNE
            </h1>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Sidebar nav */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '20px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              {DOC_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: activeSection === sec.id ? '#111' : 'transparent',
                    color: activeSection === sec.id ? '#fff' : '#333',
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {sec.icon}
                    <span>{sec.title}</span>
                  </div>
                  <FaChevronRight size={10} style={{ opacity: activeSection === sec.id ? 1 : 0.4 }} />
                </button>
              ))}
            </div>

            {/* Doc content body */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '24px',
              padding: '40px',
              minHeight: '500px'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {currentDoc.icon} {currentDoc.title}
              </h2>

              <div style={{
                fontSize: '15px',
                color: '#333',
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap'
              }}>
                {currentDoc.content}
              </div>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
