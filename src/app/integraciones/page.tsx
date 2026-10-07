'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaWhatsapp, FaDatabase, FaPhoneAlt, FaCode, FaTerminal, FaPlug, FaArrowRight } from 'react-icons/fa';

export const INTEGRATIONS = [
  {
    slug: 'whatsapp',
    name: 'WhatsApp Business AI',
    icon: <FaWhatsapp size={32} color="#25D366" />,
    category: 'Mensajería & Conversación',
    desc: 'Conecta tus agentes de chat y voz AX directamente a WhatsApp Business API para responder mensajes de clientes en tiempo real 24/7.'
  },
  {
    slug: 'supabase',
    name: 'Supabase Vector DB',
    icon: <FaDatabase size={32} color="#3ECF8E" />,
    category: 'Bases de Datos & RAG',
    desc: 'Sincroniza tus bases de conocimiento vectoriales y almacenamiento de conversaciones con Supabase Postgres y pgvector.'
  },
  {
    slug: 'twilio',
    name: 'Twilio Voice Gateway',
    icon: <FaPhoneAlt size={32} color="#F22F46" />,
    category: 'Telefonía & VOIP',
    desc: 'Enruta llamadas entrantes y salientes de la red telefónica pública (PSTN) directamente al motor AX Voice con latencia ultrabaja.'
  },
  {
    slug: 'hubspot',
    name: 'HubSpot CRM Sync',
    icon: <FaPlug size={32} color="#FF7A59" />,
    category: 'CRM & Ventas',
    desc: 'Registra transcripciones de llamadas, resúmenes automáticos y datos calificados de leads directamente en tus contactos de HubSpot.'
  },
  {
    slug: 'python-sdk',
    name: 'AX Python SDK',
    icon: <FaTerminal size={32} color="#3776AB" />,
    category: 'Desarrolladores & SDKs',
    desc: 'Librería oficial de Python para entrenar adaptadores QLoRA, gestionar datasets y realizar inferencias de forma programática.'
  },
  {
    slug: 'rest-api',
    name: 'AX REST & Webhooks API',
    icon: <FaCode size={32} color="#6366F1" />,
    category: 'APIs & Webhooks',
    desc: 'Endpoints HTTP estándar con autenticación JWT para integrar cualquier frontend, bot o sistema enterprise heredado.'
  }
];

export default function IntegracionesPage() {
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
              Ecosistema de Conectores
            </span>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px'
            }}>
              Integraciones Nativas para tus Sistemas Enterprise
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#555',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Conecta el motor AX a tus plataformas de mensajería, bases de datos, telefonía y pipelines de desarrollo en minutos.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {INTEGRATIONS.map((item) => (
              <Link
                key={item.slug}
                href={`/integraciones/${item.slug}`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '20px',
                  padding: '32px',
                  textDecoration: 'none',
                  color: '#111',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>{item.icon}</div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#666', backgroundColor: 'rgba(0,0,0,0.05)', padding: '4px 10px', borderRadius: '12px' }}>
                      {item.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>{item.name}</h3>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '24px' }}>{item.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#111' }}>
                  <span>Ver Guía de Integración</span>
                  <FaArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
