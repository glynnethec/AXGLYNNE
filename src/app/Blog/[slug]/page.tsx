import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock, FaShareAlt } from 'react-icons/fa';

const BLOG_POSTS: Record<string, {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
}> = {
  'que-es-qlora-fine-tuning': {
    title: '¿Qué es QLoRA y por qué está revolucionando la IA Privada Empresarial?',
    author: 'Glynne Engineering Team',
    date: '05 Octubre 2026',
    readTime: '6 min de lectura',
    category: 'Fine-Tuning & LLMs',
    summary: 'Descubre cómo la cuantización de 4-bits y LoRA permiten entrenar modelos de lenguaje avanzados con un 90% menos de memoria VRAM.',
    content: `El entrenamiento de modelos de lenguaje (LLMs) solía ser un privilegio exclusivo de las grandes corporaciones con clústeres de supercomputadoras de millones de dólares. Sin embargo, la llegada de **QLoRA (Quantized Low-Rank Adaptation)** ha cambiado las reglas del juego.

### ¿Cómo funciona QLoRA?
QLoRA combina dos innovaciones fundamentales:
1. **NF4 (NormalFloat 4-bit):** Un tipo de dato optimizado para representar los pesos del modelo preentrenado en solo 4 bits sin pérdida apreciable de precisión.
2. **Double Quantization & Paged Optimizers:** Técnicas para reducir picos de memoria durante el proceso de retropropagación.

### Ventajas para la Empresa
- **Privacidad Total:** Entrena modelos sobre datos confidenciales sin compartirlos con proveedores públicos.
- **Reducción de Costos:** Permite hacer fine-tuning en GPUs comerciales como la RTX 4090 o A10G en lugar de costosos clústeres A100/H100.
- **Implementación Rápida:** En AX GLYNNE puedes subir tu dataset JSONL y obtener tu adaptador listo en minutos.`
  },
  'latencia-agentes-de-voz': {
    title: 'Cómo reducir la latencia en Agentes de Voz a menos de 250ms',
    author: 'AX Voice Architect',
    date: '28 Septiembre 2026',
    readTime: '8 min de lectura',
    category: 'Voz & WebSockets',
    summary: 'La clave para una conversación fluida entre humanos e IA radica en la latencia. Analizamos la arquitectura WebSockets y TTS de alta velocidad.',
    content: `En las conversaciones telefónicas o por voz, los humanos notamos pausas superiores a 400ms como 'extrañas' o interrupciones brutales. Para lograr una experiencia natural, la latencia total del pipeline debe mantenerse por debajo de los 250ms.

### El Pipeline de Voz de Ultra-Baja Latencia
Un agente de voz tradicional atraviesa tres etapas:
1. **STT (Speech-to-Text):** Conversión de audio a texto en tiempo real con VAD (Voice Activity Detection).
2. **LLM Inference:** Generación del token de respuesta por el modelo de lenguaje.
3. **TTS (Text-to-Speech):** Sintetización de audio mediante streaming de chunks.

En **AX GLYNNE**, optimizamos este ciclo ejecutando el modelo LLM en modo streaming token por token y enviando el primer fragmento de audio al altavoz antes de que el texto completo termine de generarse.`
  },
  'ia-privada-empresarial': {
    title: 'Soberanía de Datos: Por qué tu empresa no debe usar modelos públicos sin guardrails',
    author: 'Security & Compliance Officer',
    date: '15 Septiembre 2026',
    readTime: '5 min de lectura',
    category: 'Seguridad & Privacidad',
    summary: 'Las fugas de información confidencial en prompts públicos son un riesgo crítico. Aprende a proteger la propiedad intelectual de tu negocio.',
    content: `A medida que más empleados utilizan herramientas de inteligencia artificial para redactar documentos, analizar contratos y programar código, el riesgo de filtración de secretos comerciales se dispara.

### Riesgos de los LLMs Públicos
- **Uso no autorizado de prompts:** Muchas plataformas públicas utilizan las entradas de los usuarios para re-entrenar sus modelos globales.
- **Falta de auditoría:** Imposibilidad de saber qué datos fueron enviados y por quién.

### La Solución AX GLYNNE
AX GLYNNE implementa arquitectura de **Zero Data Retention** y modelos privados alojados en entornos dedicados con encriptación de grado militar y cumplimiento SOC2.`
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  // 🔒 CRITICAL: Trigger 404 page if slug does not exist!
  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.date,
    description: post.summary
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
          maxWidth: '850px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          color: '#111111'
        }}>
          <Link
            href="/Blog"
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
            Volver al Blog
          </Link>

          <article style={{
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
              {post.category}
            </span>

            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {post.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#666', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser /> {post.author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaCalendarAlt /> {post.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaClock /> {post.readTime}</span>
            </div>

            <div style={{
              fontSize: '16px',
              color: '#222',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap'
            }}>
              {post.content}
            </div>
          </article>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
