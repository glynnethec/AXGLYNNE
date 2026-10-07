'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaMicrochip, FaVolumeUp, FaLock, FaBolt, FaDatabase, FaCogs } from 'react-icons/fa';

const FEATURES = [
  {
    icon: <FaVolumeUp size={28} color="#3b82f6" />,
    title: 'Agente de Voz Hiperrealista AX Voice',
    desc: 'Motor de voz conversacional con latencia sub-300ms, detección de interrupciones y soporte multilingüe en tiempo real.'
  },
  {
    icon: <FaMicrochip size={28} color="#8b5cf6" />,
    title: 'Creador de Modelos Fine-Tuning QLoRA',
    desc: 'Entrena tus propios modelos de lenguaje privados (Qwen 2.5, Llama 3.2, Phi 3.5) directamente en la nube sin infraestructura propia.'
  },
  {
    icon: <FaLock size={28} color="#ef4444" />,
    title: 'Soberanía de Datos & Cifrado Enterprise',
    desc: 'Tus datos nunca entrenan modelos de terceros. Cifrado de punto a punto y almacenamiento en Supabase con políticas RLS.'
  },
  {
    icon: <FaBolt size={28} color="#eab308" />,
    title: 'Streaming de Audio Bi-direccional WebSockets',
    desc: 'Conexión de baja latencia diseñada para llamadas telefónicas fluidas y chatbots de alta velocidad.'
  },
  {
    icon: <FaDatabase size={28} color="#10b981" />,
    title: 'Integración Vectorial RAG',
    desc: 'Sincroniza tus bases de conocimiento vectoriales en Supabase pgvector para respuestas fundamentadas en tus documentos.'
  },
  {
    icon: <FaCogs size={28} color="#6366f1" />,
    title: 'Guardrails Deterministas & Reglas',
    desc: 'Define restricciones estrictas de comportamiento, respuestas y esquemas para mantener la alineación de marca.'
  }
];

export default function CaracteristicasPage() {
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
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
              Capacidades de la Plataforma
            </span>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '20px'
            }}>
              Características de Ingeniería de AX GLYNNE
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#555',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Todo lo que necesitas para construir, desplegar y escalar agentes conversacionales de texto y voz con control total.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {FEATURES.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ marginBottom: '20px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
