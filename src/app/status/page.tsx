'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaCheckCircle, FaServer, FaBolt, FaDatabase, FaMicrochip } from 'react-icons/fa';

const SERVICES_STATUS = [
  { name: 'AX Voice Websocket Gateway', status: 'Operational', latency: '210ms', uptime: '99.98%' },
  { name: 'AX Chat Inference Engine', status: 'Operational', latency: '140ms', uptime: '99.99%' },
  { name: 'QLoRA Training GPUs (Cloud Cluster)', status: 'Operational', latency: 'N/A', uptime: '100%' },
  { name: 'Supabase Vector DB Storage', status: 'Operational', latency: '35ms', uptime: '100%' },
  { name: 'ElevenLabs & Edge TTS Relay', status: 'Operational', latency: '180ms', uptime: '99.95%' }
];

export default function StatusPage() {
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
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '6px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              ● Todos los Sistemas Operativos
            </span>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
              Estado del Sistema AX GLYNNE
            </h1>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            marginBottom: '60px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Infraestructura de Inferencia y Servidores</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {SERVICES_STATUS.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderRadius: '14px',
                    border: '1px solid rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaCheckCircle style={{ color: '#10b981', fontSize: '18px' }} />
                    <span style={{ fontSize: '15px', fontWeight: 600 }}>{s.name}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', color: '#666' }}>
                    <span>Latencia: <strong style={{ color: '#111' }}>{s.latency}</strong></span>
                    <span>Uptime: <strong style={{ color: '#10b981' }}>{s.uptime}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
