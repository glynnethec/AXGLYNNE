import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaArrowLeft, FaCheckCircle, FaIndustry, FaRocket } from 'react-icons/fa';

const INDUSTRY_DATA: Record<string, {
  title: string;
  category: string;
  summary: string;
  challenges: string[];
  solutions: string[];
  metrics: string[];
}> = {
  'atencion-al-cliente': {
    title: 'IA para Atención al Cliente y Call Centers',
    category: 'Sistemas de Contact Center',
    summary: 'Automatiza la resolución del 80% de llamadas y tickets de consulta frecuente mediante agentes de voz AX Voice con latencia ultra-baja.',
    challenges: [
      'Altos costos de personal para cobertura nocturna y fines de semana.',
      'Largos tiempos de espera telefónica que afectan la satisfacción (NPS).',
      'Falta de integración síncrona con la base de datos de clientes.'
    ],
    solutions: [
      'Agentes telefónicos de voz interactivos 24/7 en español e inglés.',
      'Integración RAG con Supabase para consulta en vivo de inventario y estado de pedidos.',
      'Escalación fluida a agentes humanos cuando se detecta frustración.'
    ],
    metrics: [
      '-65% en costos operativos de soporte',
      'Resolución en primera llamada > 78%',
      'Latencia de respuesta < 250ms'
    ]
  },
  'salud-y-clinicas': {
    title: 'IA para Salud, Hospitales y Clínicas',
    category: 'Sector Salud & Telemedicina',
    summary: 'Agendamiento automatizado de citas médicas, confirmaciones telefónicas por voz y recordatorios sin saturar a la recepción.',
    challenges: [
      'Alto porcentaje de inasistencia (no-shows) a consultas médicas.',
      'Saturación de líneas telefónicas en horas pico de la mañana.',
      'Estrictos requerimientos de privacidad de datos del paciente (HIPAA).'
    ],
    solutions: [
      'Llamadas salientes automatizadas para confirmación y reagendamiento.',
      'Asistente conversacional de triaje inicial y preguntas frecuentes.',
      'Encriptación de extremo a extremo y cumplimiento normativo de privacidad.'
    ],
    metrics: [
      '-40% en tasa de inasistencia a citas',
      'Atención simultánea de 1,000+ pacientes',
      'Disponibilidad del sistema 99.99%'
    ]
  },
  'e-commerce': {
    title: 'IA para E-Commerce y Retail Digital',
    category: 'Comercio Electrónico',
    summary: 'Recomendación personalizada de productos, seguimiento de envíos en tiempo real y asistencia de ventas conversacional.',
    challenges: [
      'Abandonos de carrito por dudas sobre envío o especificaciones.',
      'Preguntas repetitivas sobre el estado del pedido.',
      'Baja conversión en la navegación móvil tradicional.'
    ],
    solutions: [
      'Asistente de ventas en chat y voz integrado a Shopify/WooCommerce/Custom APIs.',
      'Rastreo automático de paquetes sincronizado con logística.',
      'Ofertas personalizadas en el momento clave de intención de compra.'
    ],
    metrics: [
      '+24% en tasa de conversión',
      'Respuesta instantánea < 1 segundo',
      '+35% de incremento en valor medio del carrito'
    ]
  },
  'finanzas': {
    title: 'IA para Finanzas, Bancos y Fintechs',
    category: 'Servicios Financieros',
    summary: 'Cobranza preventiva amable, consulta de saldos y detección de fraudes con modelos de lenguaje con guardrails deterministas.',
    challenges: [
      'Procesos de cobranza tradicionales intrusivos y de bajo retorno.',
      'Riesgos de seguridad y fugas de información sensible.',
      'Costo elevado de gestión de cartera morosa.'
    ],
    solutions: [
      'Agentes de voz AX Voice para recordatorios amables de pago.',
      'Verificación biométrica de voz y autenticación de seguridad.',
      'Modelos fine-tuned privados que operan dentro de la red del banco.'
    ],
    metrics: [
      '+32% en recuperación de cartera temprana',
      'Cumplimiento 100% de guiones regulatorios',
      'Auditoría y trazabilidad completa de llamadas'
    ]
  },
  'educacion': {
    title: 'IA para Educación y EdTech',
    category: 'Instituciones Educativas',
    summary: 'Tutoría personalizada 24/7, orientación a estudiantes y atención de admisiones matriculares.',
    challenges: [
      'Atención limitada fuera del horario académico.',
      'Pérdida de prospectos de estudiantes durante temporadas de inscripción.',
      'Atención personalizada difícil de escalar para miles de alumnos.'
    ],
    solutions: [
      'Tutor conversacional que responde dudas de cursos y programas.',
      'Atención inmediata a prospectos de matrículas en web y WhatsApp.',
      'Evaluación y feedback conversacional interactivo.'
    ],
    metrics: [
      '+45% en captación de matrículas',
      'Atención 24/7 en cualquier zona horaria',
      'Satisfacción estudiantil del 94%'
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = INDUSTRY_DATA[slug];

  // 🔒 CRITICAL: Trigger 404 page if slug does not exist!
  if (!industry) {
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
            href="/Industries"
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
            Volver a Industrias
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
              {industry.category}
            </span>

            <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              {industry.title}
            </h1>

            <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6, marginBottom: '40px' }}>
              {industry.summary}
            </p>

            {/* Metrics badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '40px'
            }}>
              {industry.metrics.map((m, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', padding: '16px', borderRadius: '14px', textAlign: 'center', fontWeight: 700, color: '#065f46', fontSize: '15px' }}>
                  {m}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Desafíos del Sector</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {industry.challenges.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#555' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>•</span> {c}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Solución con AX GLYNNE</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {industry.solutions.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#333' }}>
                  <FaCheckCircle style={{ color: '#10b981', marginTop: '4px', flexShrink: 0 }} /> {s}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <Link
                href="/contact"
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
                Solicitar Demostración para esta Industria <FaRocket />
              </Link>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
