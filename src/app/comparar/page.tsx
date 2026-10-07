'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaCheck, FaTimes, FaMinus } from 'react-icons/fa';

const COMPARISON_MATRIX = [
  {
    feature: 'Fine-Tuning QLoRA Integrado (Nube)',
    axGlynne: true,
    vapi: false,
    retell: false,
    openAi: false,
  },
  {
    feature: 'Latencia de Voz en Tiempo Real',
    axGlynne: '< 250ms',
    vapi: '~ 500ms',
    retell: '~ 400ms',
    openAi: '~ 800ms',
  },
  {
    feature: 'Propiedad 100% de Pesos del Modelo Fine-Tuned',
    axGlynne: true,
    vapi: false,
    retell: false,
    openAi: false,
  },
  {
    feature: 'Soporte Multilingüe Español / Inglés Nativo',
    axGlynne: true,
    vapi: true,
    retell: true,
    openAi: true,
  },
  {
    feature: 'Despliegue On-Premise / VPC Privada',
    axGlynne: true,
    vapi: false,
    retell: false,
    openAi: false,
  },
  {
    feature: 'Streaming Bi-direccional WebSockets',
    axGlynne: true,
    vapi: true,
    retell: true,
    openAi: true,
  },
  {
    feature: 'Integración Directa con Supabase Vector',
    axGlynne: true,
    vapi: false,
    retell: false,
    openAi: false,
  },
  {
    feature: 'Precio Inicial por Minuto de Voz',
    axGlynne: '$0.03 / min',
    vapi: '$0.05 / min',
    retell: '$0.07 / min',
    openAi: '$0.06 / min',
  }
];

export default function CompararPage() {
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
              Matriz Comparativa B2B
            </span>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '20px'
            }}>
              ¿Por qué elegir AX GLYNNE frente a otras plataformas de IA?
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#555',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Compara de manera transparente nuestra infraestructura de voz, capacidades de fine-tuning QLoRA y costos operacionales contra otras alternativas del mercado.
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '24px',
            padding: '32px',
            overflowX: 'auto',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            marginBottom: '60px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '16px', fontSize: '16px', fontWeight: 700 }}>Característica / Función</th>
                  <th style={{ padding: '16px', fontSize: '16px', fontWeight: 800, color: '#111', backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '12px 12px 0 0' }}>AX GLYNNE</th>
                  <th style={{ padding: '16px', fontSize: '15px', fontWeight: 600, color: '#666' }}>Vapi.ai</th>
                  <th style={{ padding: '16px', fontSize: '15px', fontWeight: 600, color: '#666' }}>Retell AI</th>
                  <th style={{ padding: '16px', fontSize: '15px', fontWeight: 600, color: '#666' }}>OpenAI Realtime</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ textAlign: 'left', padding: '18px 16px', fontSize: '14px', fontWeight: 600, color: '#333' }}>
                      {row.feature}
                    </td>

                    {/* AX GLYNNE */}
                    <td style={{ padding: '18px 16px', backgroundColor: 'rgba(0,0,0,0.03)', fontWeight: 700 }}>
                      {typeof row.axGlynne === 'boolean' ? (
                        row.axGlynne ? <FaCheck style={{ color: '#10b981', fontSize: '18px' }} /> : <FaTimes style={{ color: '#ef4444' }} />
                      ) : (
                        <span style={{ color: '#10b981', fontWeight: 800 }}>{row.axGlynne}</span>
                      )}
                    </td>

                    {/* Vapi */}
                    <td style={{ padding: '18px 16px', color: '#555' }}>
                      {typeof row.vapi === 'boolean' ? (
                        row.vapi ? <FaCheck style={{ color: '#10b981' }} /> : <FaTimes style={{ color: '#aaa' }} />
                      ) : (
                        row.vapi
                      )}
                    </td>

                    {/* Retell */}
                    <td style={{ padding: '18px 16px', color: '#555' }}>
                      {typeof row.retell === 'boolean' ? (
                        row.retell ? <FaCheck style={{ color: '#10b981' }} /> : <FaTimes style={{ color: '#aaa' }} />
                      ) : (
                        row.retell
                      )}
                    </td>

                    {/* OpenAI */}
                    <td style={{ padding: '18px 16px', color: '#555' }}>
                      {typeof row.openAi === 'boolean' ? (
                        row.openAi ? <FaCheck style={{ color: '#10b981' }} /> : <FaTimes style={{ color: '#aaa' }} />
                      ) : (
                        row.openAi
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
