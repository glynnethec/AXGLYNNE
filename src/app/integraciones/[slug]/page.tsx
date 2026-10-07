import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaArrowLeft, FaCheckCircle, FaCode } from 'react-icons/fa';

const INTEGRATION_DETAILS: Record<string, {
  name: string;
  category: string;
  desc: string;
  steps: string[];
  codeSnippet: string;
}> = {
  'whatsapp': {
    name: 'WhatsApp Business AI Integration',
    category: 'Mensajería & Conversación',
    desc: 'Permite desplegar agentes de chat y voz AX en números oficiales de WhatsApp Business mediante Webhooks de Meta y Supabase.',
    steps: [
      'Crea una cuenta en Meta for Developers y configura el número de WhatsApp Business.',
      'Genera el Token de Acceso Permanente e ingrésalo en tu Panel AX GLYNNE.',
      'Configura la URL del Webhook entrante apuntando a https://axglynne.com/api/v1/whatsapp/webhook.',
      'Selecciona el modelo fine-tuned o el agente de voz AX que responderá las conversaciones.'
    ],
    codeSnippet: `// Ejemplo de Webhook Payload para WhatsApp API
POST /api/v1/whatsapp/webhook
Headers:
  Authorization: Bearer ax_live_key_9f8d...
Body:
{
  "messaging_product": "whatsapp",
  "to": "+573000000000",
  "type": "text",
  "text": { "body": "Hola, ¿en qué puedo ayudarte hoy?" }
}`
  },
  'supabase': {
    name: 'Supabase Vector DB Integration',
    category: 'Bases de Datos & RAG',
    desc: 'Integra Supabase como almacenamiento primario de vectores embeddings pgvector e historial conversacional de usuarios.',
    steps: [
      'Obtén la URL de tu proyecto y la Anon/Service Role Key desde el panel de Supabase.',
      'Ejecuta el script SQL de migración provisto por AX GLYNNE para habilitar la extensión vector.',
      'Configura la variable SUPABASE_URL y SUPABASE_ANON_KEY en la sección de Integraciones.',
      'Vincula las colecciones RAG a tus agentes AX Chat y AX Voice.'
    ],
    codeSnippet: `-- SQL de Inicialización pgvector en Supabase
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE ax_embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536),
  created_at timestamp with time zone DEFAULT now()
);`
  },
  'twilio': {
    name: 'Twilio Voice Gateway',
    category: 'Telefonía & VOIP',
    desc: 'Enruta llamadas telefónicas tradicionales directamente a la esfera de voz AX Voice usando TwiML y WebSockets.',
    steps: [
      'Conecta tu Account SID y Auth Token de Twilio en el Panel de Administración.',
      'Configura la URL de respuesta de llamadas entrantes con la dirección WebSocket de AX Voice.',
      'Elige el motor de voz (ElevenLabs o Edge TTS) y el idioma predeterminado.'
    ],
    codeSnippet: `<!-- TwiML Response Template for AX Voice Stream -->
<Response>
  <Connect>
    <Stream url="wss://axglynne.com/api/v1/voice/stream" />
  </Connect>
</Response>`
  },
  'hubspot': {
    name: 'HubSpot CRM Sync',
    category: 'CRM & Ventas',
    desc: 'Sincronización bidireccional de leads, resúmenes de llamadas impulsados por IA y calificación automática de prospectos.',
    steps: [
      'Autoriza la aplicación privada de AX GLYNNE en tu portal de HubSpot.',
      'Mapea los campos de contacto con las variables extraídas por el agente conversacional.',
      'Activa la creación automática de tareas y notas de llamada tras cada interacción.'
    ],
    codeSnippet: `// Evento automático enviado a HubSpot CRM
{
  "event": "call.completed",
  "lead_email": "cliente@empresa.com",
  "summary": "El cliente solicitó una demo de Fine-Tuning QLoRA para 5,000 minutos.",
  "sentiment": "Positivo",
  "score": 92
}`
  },
  'python-sdk': {
    name: 'AX Python SDK Integration',
    category: 'Desarrolladores & SDKs',
    desc: 'SDK oficial en Python para científicos de datos e ingenieros de IA. Entrena adaptadores QLoRA y ejecuta inferencias.',
    steps: [
      'Instala el paquete mediante pip: pip install axglynne-sdk.',
      'Inicializa el cliente con tu clave API.',
      'Carga tu dataset en formato JSONL y lanza la tarea de Fine-Tuning en la GPU remota.'
    ],
    codeSnippet: `from axglynne import AXClient

client = AXClient(api_key="ax_live_key_9f8d...")

# Iniciar entrenamiento QLoRA
job = client.trainer.create_job(
    base_model="unsloth/Qwen2.5-1.5B-Instruct",
    dataset_path="./dataset.jsonl",
    epochs=3
)
print(f"Job iniciado con ID: {job.id}")`
  },
  'rest-api': {
    name: 'AX REST & Webhooks API',
    category: 'APIs & Webhooks',
    desc: 'API RESTful completa con soporte para Server-Sent Events (SSE) y llamadas síncronas de baja latencia.',
    steps: [
      'Genera tus credenciales API en el Panel AX.',
      'Usa el endpoint POST /v1/chat/completions para respuestas de texto.',
      'Suscríbete a eventos de Webhooks para notificaciones en segundo plano.'
    ],
    codeSnippet: `curl -X POST https://axglynne.com/api/v1/chat/completions \\
  -H "Authorization: Bearer ax_live_key_9f8d..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "ax-qwen-2.5-custom",
    "messages": [{"role": "user", "content": "Hola AX"}]
  }'`
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = INTEGRATION_DETAILS[slug];

  // 🔒 CRITICAL: Trigger 404 page if slug does not exist!
  if (!integration) {
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
            href="/integraciones"
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
            Volver al Catálogo de Integraciones
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
              {integration.category}
            </span>

            <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              {integration.name}
            </h1>

            <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.6, marginBottom: '40px' }}>
              {integration.desc}
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
              Pasos para la Configuración
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              {integration.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#333' }}>
                  <FaCheckCircle style={{ color: '#10b981', marginTop: '4px', flexShrink: 0 }} />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCode /> Código / Payload de Integración
            </h3>

            <pre style={{
              backgroundColor: '#1e1e2e',
              color: '#a6adc8',
              padding: '24px',
              borderRadius: '14px',
              fontSize: '14px',
              fontFamily: 'monospace',
              overflowX: 'auto',
              lineHeight: 1.5
            }}>
              <code>{integration.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
