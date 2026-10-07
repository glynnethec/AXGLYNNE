import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaArrowLeft, FaMicrochip, FaBolt, FaCheckCircle, FaRocket } from 'react-icons/fa';

const MODELS_DATA: Record<string, {
  name: string;
  provider: string;
  parameters: string;
  speed: string;
  size: string;
  description: string;
  useCases: string[];
  specs: Record<string, string>;
}> = {
  'qwen-2-5': {
    name: 'Qwen 2.5 Instruct (Alibaba / Unsloth)',
    provider: 'Alibaba Cloud & Unsloth',
    parameters: '0.5B - 1.5B Parámetros',
    speed: 'Ultra Rápido (< 150ms)',
    size: '500 MB - 1.5 GB VRAM',
    description: 'Familia de modelos súper ligeros ideales para agentes de voz interactivos y chatbots de respuesta instantánea con alta capacidad de razonamiento instruccional.',
    useCases: [
      'Agentes de voz en tiempo real con latencia crítica.',
      'Clasificación y extracción de datos en tiempo real.',
      'Soporte de atención al cliente de alto volumen.'
    ],
    specs: {
      'Context Window': '128,000 tokens',
      'Cuantización': 'NF4 / INT4 / FP16',
      'Licencia': 'Apache 2.0 (Uso Comercial Libre)'
    }
  },
  'llama-3-2': {
    name: 'Llama 3.2 Instruct (Meta)',
    provider: 'Meta AI & Unsloth',
    parameters: '1B Parámetros',
    speed: 'Muy Rápido (< 200ms)',
    size: '1.2 GB VRAM',
    description: 'El modelo compacto oficial de Meta optimizado para seguir instrucciones complejas en múltiples idiomas y ejecutar herramientas (function calling).',
    useCases: [
      'Generación de respuestas estructuradas en formato JSON.',
      'Asistentes virtuales de ventas y soporte.',
      'RAG conversacional sobre documentos corporativos.'
    ],
    specs: {
      'Context Window': '128,000 tokens',
      'Cuantización': '4-bit QLoRA',
      'Licencia': 'Llama 3.2 Community License'
    }
  },
  'phi-3-5': {
    name: 'Phi 3.5 Mini Instruct (Microsoft)',
    provider: 'Microsoft AI',
    parameters: '3.8B Parámetros',
    speed: 'Alta Precisión (< 350ms)',
    size: '3.8 GB VRAM',
    description: 'Modelo de razonamiento avanzado entrenado con datos sintéticos de alta calidad. Sobresale en lógica matemática, código y toma de decisiones complejas.',
    useCases: [
      'Razonamiento lógico pesado y análisis técnico.',
      'Agentes autónomos de toma de decisiones.',
      'Traducción y análisis sintáctico de datos.'
    ],
    specs: {
      'Context Window': '128,000 tokens',
      'Cuantización': '4-bit QLoRA',
      'Licencia': 'MIT License'
    }
  },
  'ax-voice-v1': {
    name: 'AX Voice Motor Neuronal (Propietario)',
    provider: 'AX GLYNNE Labs',
    parameters: 'Pipeline Híbrido Multimodal',
    speed: 'Latencia Cero (< 250ms)',
    size: 'Optimizado en la nube',
    description: 'Motor neuronal conversacional especializado en voz bi-direccional. Integra STT de streaming, modelo de lenguaje privado y síntesis de voz ElevenLabs.',
    useCases: [
      'Llamadas de voz entrantes y salientes en telefonía IP.',
      'Asistentes de voz en apps web y móviles.',
      'Atención al cliente con empatía e inflexión natural.'
    ],
    specs: {
      'Protocolo': 'WebSocket Bi-direccional',
      'Audio Input/Output': 'PCM 16kHz / MP3 24kHz',
      'SLA Uptime': '99.98%'
    }
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = MODELS_DATA[slug];

  // 🔒 CRITICAL: Trigger 404 page if slug does not exist!
  if (!model) {
    notFound();
  }

  return (
    <>
      <Header />
      <BackgroundWrapper>
        <div style={{
          minHeight: '100vh',
          padding: '140px 20px 80px 20px',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          color: '#111111'
        }}>
          <Link
            href="/ia_vailable"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '32px'
            }}
          >
            <FaArrowLeft size={12} />
            Volver a Modelos Disponibles
          </Link>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#666',
              backgroundColor: 'rgba(0,0,0,0.05)',
              padding: '6px 12px',
              borderRadius: '12px',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              {model.provider}
            </span>

            <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              {model.name}
            </h1>

            <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6, marginBottom: '40px' }}>
              {model.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '40px'
            }}>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '14px' }}>
                <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Velocidad Inferencia</span>
                <strong style={{ fontSize: '16px', color: '#111' }}>{model.speed}</strong>
              </div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '14px' }}>
                <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Requerimiento VRAM</span>
                <strong style={{ fontSize: '16px', color: '#111' }}>{model.size}</strong>
              </div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '14px' }}>
                <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>Parámetros</span>
                <strong style={{ fontSize: '16px', color: '#111' }}>{model.parameters}</strong>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Casos de Uso Principales</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {model.useCases.map((uc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#333' }}>
                  <FaCheckCircle style={{ color: '#10b981', flexShrink: 0 }} /> {uc}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Especificaciones Técnicas</h3>
            <div style={{ backgroundColor: '#1e1e2e', color: '#cdd6f4', borderRadius: '16px', padding: '24px', marginBottom: '40px' }}>
              {Object.entries(model.specs).map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < Object.keys(model.specs).length - 1 ? '1px solid #313244' : 'none' }}>
                  <span style={{ color: '#a6adc8', fontSize: '14px' }}>{k}</span>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link
                href="/Create_you_GLYNNE_model"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  backgroundColor: '#111',
                  color: '#fff',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Entrenar Modelo con QLoRA <FaRocket />
              </Link>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
