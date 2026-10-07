'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaTag, FaCalendarAlt, FaRocket, FaBug, FaMagic } from 'react-icons/fa';

const RELEASES = [
  {
    version: 'v2.4.0',
    date: 'Octubre 2026',
    title: 'Soporte para Qwen 2.5 0.5B / 1.5B y ElevenLabs Turbo v2.5',
    type: 'Feature Release',
    changes: [
      'Incorporación de nuevos modelos base ultra-ligeros en el creador QLoRA.',
      'Mejora de latencia en AX Voice reduciendo el tiempo de respuesta a < 230ms.',
      'Nueva consola de depuración de prompts en tiempo real dentro del Panel Assembly.'
    ]
  },
  {
    version: 'v2.3.0',
    date: 'Septiembre 2026',
    title: 'Integración Nativa con Supabase Vector DB',
    type: 'Integration Release',
    changes: [
      'Sincronización automática de embeddings pgvector.',
      'Soporte multi-tenant para historial conversacional en AX Chat.',
      'Actualización de la interfaz gráfica a modo oscuro hiper-estético con Glassmorphism.'
    ]
  },
  {
    version: 'v2.2.0',
    date: 'Agosto 2026',
    title: 'Lanzamiento Inicial del Agente de Voz AX Voice',
    type: 'Major Release',
    changes: [
      'Esfera interactiva animada VoiceOrb con detección de voz (VAD).',
      'Conexión bi-direccional WebSockets de baja latencia.',
      'Soporte para cambio dinámico de idioma Español / Inglés.'
    ]
  }
];

export default function NovedadesPage() {
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
              Changelog & Novedades
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
              Historial de Actualizaciones de AX GLYNNE
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '80px' }}>
            {RELEASES.map((rel, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      backgroundColor: '#111',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '20px'
                    }}>
                      {rel.version}
                    </span>
                    <span style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FaCalendarAlt size={12} /> {rel.date}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>
                    {rel.type}
                  </span>
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>{rel.title}</h3>

                <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: 0, color: '#444', fontSize: '15px', lineHeight: 1.7 }}>
                  {rel.changes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
