'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaCheck, FaTimes, FaRocket, FaShieldAlt, FaBolt, FaQuestionCircle } from 'react-icons/fa';

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter AI',
    tagline: 'Ideal para pruebas de concepto y desarrolladores.',
    priceMonthly: 49,
    priceAnnual: 39,
    features: [
      'Hasta 1,000 minutos de AX Voice / mes',
      'Acceso a AX Chat (Qwen 2.5 & Llama 3.2)',
      '1 Modelo de Fine-Tuning QLoRA activo',
      'Soporte por email y comunidad',
      'Latencia promedio de < 400ms',
      'Almacenamiento seguro en Supabase'
    ],
    notIncluded: [
      'Modelos ultra-pesados Phi 3.5 3.8B',
      'SLA Enterprise de 99.99%',
      'Soporte telefónico 24/7'
    ],
    popular: false,
    ctaText: 'Comenzar Prueba Gratis',
    ctaHref: '/login'
  },
  {
    id: 'pro',
    name: 'Pro Enterprise',
    tagline: 'Para empresas en crecimiento que requieren voz e IA de alta capacidad.',
    priceMonthly: 199,
    priceAnnual: 159,
    features: [
      'Hasta 10,000 minutos de AX Voice / mes',
      'Modelos ilimitados en AX Chat',
      '5 Modelos de Fine-Tuning QLoRA dedicados',
      'Sintetización de voz ElevenLabs & Edge integrada',
      'Integraciones con WhatsApp, Webhooks y API REST',
      'Latencia ultra-baja de < 250ms',
      'Soporte prioritario 24/7'
    ],
    notIncluded: [
      'Despliegue On-Premise dedicado'
    ],
    popular: true,
    ctaText: 'Iniciar Plan Pro',
    ctaHref: '/login'
  },
  {
    id: 'custom',
    name: 'Enterprise Dedicated',
    tagline: 'Para corporaciones con requerimientos de alta privacidad y volumen masivo.',
    priceMonthly: 'Personalizado',
    priceAnnual: 'Personalizado',
    features: [
      'Minutos de voz e Inferencia Ilimitados',
      'Clúster dedicado de entrenamiento QLoRA GPUs H100',
      'Despliegue On-Premise o VPC privada',
      'Acuerdo de Nivel de Servicio (SLA 99.99%)',
      'Ingeniero de IA asignado 24/7',
      'Cumplimiento GDPR, HIPAA y SOC2'
    ],
    notIncluded: [],
    popular: false,
    ctaText: 'Contactar a Ventas',
    ctaHref: '/contact'
  }
];

const FAQS = [
  {
    q: '¿Cómo se miden los minutos de AX Voice?',
    a: 'Los minutos de voz se contabilizan durante las llamadas activas en tiempo real con nuestro motor de voz. No cobramos por silencios ni tiempos de espera.'
  },
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Sí, puedes escalar o degradar tu plan desde tu Dashboard en cualquier momento. Los cobros se ajustan de manera prorrateada.'
  },
  {
    q: '¿Los modelos Fine-Tuned con QLoRA son de mi propiedad?',
    a: 'Absolutamente. Todos los pesos del adaptador QLoRA y los conjuntos de datos de entrenamiento son 100% propiedad de tu empresa y se almacenan cifrados.'
  },
  {
    q: '¿Ofrecen período de prueba gratuito?',
    a: 'Sí, todos los nuevos usuarios reciben 100 créditos iniciales para probar AX Chat, AX Voice y el creador de modelos sin ingresar tarjeta de crédito.'
  }
];

export default function PreciosPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          {/* Header section */}
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
              Planes & Precios Transparentes
            </span>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px'
            }}>
              Infraestructura de IA Escusable para Cualquier Negocio
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#555',
              maxWidth: '650px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6
            }}>
              Entrena modelos privados, despliega agentes de voz hiperrealistas y automatiza tus flujos de trabajo enterprise.
            </p>

            {/* Toggle Monthly / Annual */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.06)',
              padding: '4px',
              borderRadius: '999px',
              gap: '4px'
            }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: billingCycle === 'monthly' ? '#111' : 'transparent',
                  color: billingCycle === 'monthly' ? '#fff' : '#444',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Facturación Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: billingCycle === 'annual' ? '#111' : 'transparent',
                  color: billingCycle === 'annual' ? '#fff' : '#444',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Facturación Anual
                <span style={{
                  fontSize: '11px',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  Ahorra 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '90px'
          }}>
            {PRICING_PLANS.map((plan) => {
              const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
              return (
                <div
                  key={plan.id}
                  style={{
                    backgroundColor: plan.popular ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: plan.popular ? '2px solid #111111' : '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    boxShadow: plan.popular ? '0 20px 40px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.04)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#111',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 16px',
                      borderRadius: '20px',
                      letterSpacing: '0.05em'
                    }}>
                      MÁS POPULAR
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>{plan.name}</h3>
                    <p style={{ fontSize: '14px', color: '#666', minHeight: '42px', marginBottom: '24px' }}>{plan.tagline}</p>

                    <div style={{ marginBottom: '32px' }}>
                      {typeof price === 'number' ? (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontSize: '42px', fontWeight: 800 }}>${price}</span>
                          <span style={{ color: '#666', fontSize: '14px' }}>/ mes {billingCycle === 'annual' && '(facturado anualmente)'}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '36px', fontWeight: 800 }}>{price}</span>
                      )}
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '14px', color: '#333' }}>
                          <FaCheck style={{ color: '#10b981', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '14px', color: '#aaa' }}>
                          <FaTimes style={{ color: '#ccc', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={plan.ctaHref}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '16px 24px',
                      borderRadius: '14px',
                      backgroundColor: plan.popular ? '#111' : 'rgba(0,0,0,0.06)',
                      color: plan.popular ? '#fff' : '#111',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div style={{ maxWidth: '800px', margin: '0 auto 60px auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '40px' }}>
              Preguntas Frecuentes sobre Facturación
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '16px',
                    padding: '24px'
                  }}
                >
                  <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaQuestionCircle style={{ color: '#666' }} />
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
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
