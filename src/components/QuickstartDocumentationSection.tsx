'use client';

import React, { useState } from 'react';
import {
  FiCopy,
  FiCheck,
  FiTerminal,
  FiCode,
  FiPlay,
  FiLayers,
  FiCpu,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiKey,
  FiExternalLink
} from 'react-icons/fi';

interface QuickstartDocumentationSectionProps {
  isDark: boolean;
  apiKey?: string | null;
  selectedModel?: string;
  onOpenKeyModal?: () => void;
  onSelectTab?: (tab: string) => void;
}

export default function QuickstartDocumentationSection({
  isDark,
  apiKey,
  selectedModel = 'llama-3.2-11b-vision',
  onOpenKeyModal,
  onSelectTab
}: QuickstartDocumentationSectionProps) {
  const [activeLang, setActiveLang] = useState<'python' | 'colab' | 'curl' | 'node'>('python');
  const [activeView, setActiveView] = useState<'code' | 'output'>('code');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [currentModel, setCurrentModel] = useState(selectedModel);

  // Design Tokens matching site architectural minimalism
  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#555555';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const borderLineSubtle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const cardBg = isDark ? 'rgba(18, 18, 20, 0.65)' : 'rgba(255, 255, 255, 0.85)';
  const innerCardBg = isDark ? 'rgba(24, 24, 27, 0.5)' : 'rgba(244, 244, 245, 0.7)';
  const terminalHeaderBg = isDark ? '#141417' : '#ececee';
  const terminalCodeBg = isDark ? '#0d0d10' : '#f8f8fa';
  const monoFont = "'SF Mono', Monaco, 'Courier New', monospace";

  const effectiveKey = apiKey || 'gly_sub_live_e634c26ceb60792882467b28';
  const baseUrl = 'https://ax-zyxe.onrender.com/api/v1';

  // Checklist items explaining step-by-step integration
  const checklistItems = [
    {
      label: 'PASO 01 // INSTALAR SDK',
      detail: 'pip install openai (o en Google Colab: !pip install -q openai). Cero librerías propietarias ni dependencias pesadas.'
    },
    {
      label: 'PASO 02 // BASE URL GATEWAY',
      detail: 'Define base_url="https://ax-zyxe.onrender.com/api/v1" sin necesidad de montar vLLM ni clústeres locales.'
    },
    {
      label: 'PASO 03 // SUB-API KEY VINCULADA',
      detail: 'Autentica con tu llave personal (gly_sub_live_...) con auditoría y control de consumo de tokens en tiempo real.'
    },
    {
      label: 'PASO 04 // EJECUTAR INFERENCIA',
      detail: 'Llama client.chat.completions.create() con tu modelo y recibe respuesta instantánea o streaming continuo.'
    }
  ];

  // Available models to test
  const modelOptions = [
    { id: 'llama-3.2-11b-vision', label: 'Llama 3.2 11B Vision', badge: 'Vision' },
    { id: 'llama-3.2-90b-vision', label: 'Llama 3.2 90B Vision', badge: 'Flagship' },
    { id: 'deepseek-coder-6.7b', label: 'DeepSeek Coder 6.7B', badge: 'Coding' },
    { id: 'deepseek-v4-flash', label: 'DeepSeek V4.1 Flash', badge: 'Ultra Fast' },
    { id: 'nvidia-nemotron-70b', label: 'NVIDIA Nemotron 70B', badge: 'Reasoning' },
    { id: 'mistral-nemo-12b', label: 'Mistral NeMo 12B', badge: 'Low Latency' }
  ];

  // Code snippets by language
  const codeSnippets: Record<string, { code: string; installCmd: string; filename: string }> = {
    python: {
      filename: 'glynne_inference.py',
      installCmd: 'pip install openai',
      code: `from openai import OpenAI

# 1. Configurar cliente apuntando a la pasarela GLYNNE AI Gateway
client = OpenAI(
    base_url="${baseUrl}",
    api_key="${effectiveKey}"
)

# 2. Ejecutar inferencia de alto rendimiento
response = client.chat.completions.create(
    model="${currentModel}",
    messages=[
        {"role": "system", "content": "You are a specialized AI assistant."},
        {"role": "user", "content": "Execute high-performance inference."}
    ],
    temperature=0.7,
    max_tokens=2048
)

# 3. Imprimir respuesta generada
print(response.choices[0].message.content)`
    },
    colab: {
      filename: 'google_colab_cell.py',
      installCmd: '!pip install -q openai',
      code: `# ============================================================
# Google Colab: Inferencia con aceleración NVIDIA H100
# ============================================================

# 1. Instalar el SDK oficial de OpenAI en el entorno de Colab
!pip install -q openai

# 2. Conectar e invocar el modelo
from openai import OpenAI

client = OpenAI(
    base_url="${baseUrl}",
    api_key="${effectiveKey}"
)

response = client.chat.completions.create(
    model="${currentModel}",
    messages=[
        {"role": "system", "content": "You are a specialized AI assistant."},
        {"role": "user", "content": "Execute high-performance inference."}
    ]
)

print(response.choices[0].message.content)`
    },
    curl: {
      filename: 'request.sh',
      installCmd: '# No requiere instalación previa (nativo en Linux / macOS / WSL)',
      code: `curl -X POST "${baseUrl}/chat/completions" \\
  -H "Authorization: Bearer ${effectiveKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${currentModel}",
    "messages": [
      {"role": "system", "content": "You are a specialized AI assistant."},
      {"role": "user", "content": "Execute high-performance inference."}
    ],
    "temperature": 0.7,
    "max_tokens": 1024
  }'`
    },
    node: {
      filename: 'inference.ts',
      installCmd: 'npm install openai',
      code: `import OpenAI from 'openai';

// 1. Instanciar cliente oficial con el Gateway de GLYNNE
const client = new OpenAI({
  baseURL: '${baseUrl}',
  apiKey: '${effectiveKey}',
});

async function main() {
  // 2. Ejecutar solicitud de chat completion
  const response = await client.chat.completions.create({
    model: '${currentModel}',
    messages: [
      { role: 'system', content: 'You are a specialized AI assistant.' },
      { role: 'user', content: 'Execute high-performance inference.' }
    ],
  });

  // 3. Imprimir el contenido en consola
  console.log(response.choices[0].message.content);
}

main().catch(console.error);`
    }
  };

  const simulatedOutput = `{
  "id": "chatcmpl-glynne-b9f4a182",
  "object": "chat.completion",
  "created": 1735689600,
  "model": "${currentModel}",
  "owned_by": "axglynne-ai-provider",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Sistema operativo y en línea. La inferencia fue canalizada exitosamente a través de la arquitectura NVIDIA H100 SXM5 con latencia óptima."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 32,
    "total_tokens": 48
  }
}`;

  const currentSnippet = codeSnippets[activeLang];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet.installCmd);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <section style={{
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
      borderTop: `1px solid ${borderLine}`,
      paddingTop: '64px',
      paddingBottom: '80px',
      color: textColor,
      fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
    }}>
      {/* ========================================================================= */}
      {/* 50vw / 50vw TWO-COLUMN SPLIT: STEP-BY-STEP TEXT (LEFT) & CONSOLE (RIGHT)   */}
      {/* ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
        gap: '48px',
        alignItems: 'start',
        marginBottom: '56px',
        boxSizing: 'border-box'
      }}>
        {/* ===================================================================== */}
        {/* LEFT COLUMN (50%): "GIVING FRONTIER AI AN EDGE" STEP-BY-STEP TEXT      */}
        {/* ===================================================================== */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'left'
        }}>
          {/* Micro Header */}
          <div style={{
            fontFamily: monoFont,
            fontSize: '11px',
            color: subtextColor,
            letterSpacing: '0.08em',
            marginBottom: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
            }} />
            <span>03 // RUNTIME INTEGRATION & QUICKSTART</span>
          </div>

          {/* Exact Title as requested */}
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 20px 0',
            color: textColor,
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            Giving Frontier AI an Edge
          </h2>

          <p style={{
            fontSize: '14px',
            color: subtextColor,
            lineHeight: 1.6,
            margin: '0 0 28px 0',
            fontWeight: 300,
            maxWidth: '580px'
          }}>
            Nuestra pasarela de modelos elimina toda la fricción de infraestructura. Con solo instalar el cliente oficial de <strong>OpenAI</strong> y apuntar tu endpoint a GLYNNE, el modelo ya está funcionando al 100% en clústeres acelerados NVIDIA H100 sin configuraciones adicionales.
          </p>

          {/* Checklist items with ▲ icon */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
          }}>
            {checklistItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{
                  fontSize: '9px',
                  color: textColor,
                  opacity: 0.8,
                  lineHeight: 1,
                  flexShrink: 0
                }}>
                  ▲
                </span>
                <div style={{ lineHeight: 1.5 }}>
                  <strong style={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: '13px',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}>
                    {item.label}
                  </strong>
                  <span style={{ color: borderLine, margin: '0 8px' }}>—</span>
                  <span style={{
                    color: subtextColor,
                    fontSize: '13px',
                    fontWeight: 300
                  }}>
                    {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Install Bar on the left */}
          <div style={{
            marginTop: '28px',
            padding: '14px 16px',
            border: `1px solid ${borderLine}`,
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontFamily: monoFont,
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <FiTerminal style={{ color: subtextColor, flexShrink: 0 }} />
              <span style={{ color: textColor, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {currentSnippet.installCmd}
              </span>
            </div>
            <button
              onClick={handleCopyInstall}
              style={{
                background: 'none',
                border: `1px solid ${borderLine}`,
                color: copiedInstall ? '#10b981' : textColor,
                cursor: 'pointer',
                fontFamily: monoFont,
                fontSize: '11px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
            >
              {copiedInstall ? <FiCheck /> : <FiCopy />}
              <span>{copiedInstall ? 'COPIADO' : 'COPIAR'}</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* RIGHT COLUMN (50%): THE INTERACTIVE CODE CONSOLE                      */}
        {/* ===================================================================== */}
        <div style={{
          border: `1px solid ${borderLine}`,
          backgroundColor: cardBg,
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.08)'
        }}>
          {/* Top Control Bar: Language Tabs & Model Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '10px 14px',
            borderBottom: `1px solid ${borderLine}`,
            backgroundColor: terminalHeaderBg
          }}>
            {/* Left: Language Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
              {[
                { id: 'python', label: 'Python' },
                { id: 'colab', label: 'Colab 🚀' },
                { id: 'curl', label: 'cURL' },
                { id: 'node', label: 'Node.js' }
              ].map((tab) => {
                const active = activeLang === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLang(tab.id as any)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontFamily: monoFont,
                      fontWeight: active ? 600 : 400,
                      color: active ? textColor : subtextColor,
                      backgroundColor: active
                        ? (isDark ? 'rgba(255, 255, 255, 0.14)' : '#ffffff')
                        : 'transparent',
                      border: `1px solid ${active ? borderLine : 'transparent'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Model Selector & View Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select
                value={currentModel}
                onChange={(e) => setCurrentModel(e.target.value)}
                style={{
                  fontFamily: monoFont,
                  fontSize: '10px',
                  padding: '4px 6px',
                  backgroundColor: isDark ? '#1f1f23' : '#ffffff',
                  color: textColor,
                  border: `1px solid ${borderLine}`,
                  cursor: 'pointer',
                  outline: 'none',
                  maxWidth: '140px'
                }}
              >
                {modelOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>

              {/* View toggle (Code vs Terminal Output) */}
              <div style={{
                display: 'flex',
                border: `1px solid ${borderLine}`,
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setActiveView('code')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontFamily: monoFont,
                    background: activeView === 'code' ? (isDark ? 'rgba(255,255,255,0.15)' : '#ffffff') : 'transparent',
                    color: activeView === 'code' ? textColor : subtextColor,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <FiCode style={{ marginRight: '3px', verticalAlign: '-1px' }} />
                  Code
                </button>
                <button
                  onClick={() => setActiveView('output')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontFamily: monoFont,
                    background: activeView === 'output' ? (isDark ? 'rgba(255,255,255,0.15)' : '#ffffff') : 'transparent',
                    color: activeView === 'output' ? textColor : subtextColor,
                    border: 'none',
                    borderLeft: `1px solid ${borderLine}`,
                    cursor: 'pointer'
                  }}
                >
                  <FiTerminal style={{ marginRight: '3px', verticalAlign: '-1px' }} />
                  Output
                </button>
              </div>
            </div>
          </div>

          {/* Code / Output Container */}
          <div style={{
            position: 'relative',
            backgroundColor: terminalCodeBg
          }}>
            {/* Top terminal file bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              borderBottom: `1px solid ${borderLineSubtle}`,
              fontFamily: monoFont,
              fontSize: '11px',
              color: subtextColor
            }}>
              {/* Terminal Window Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                </div>
                <span style={{ marginLeft: '6px', color: textColor, fontWeight: 500, fontSize: '11px' }}>
                  {activeView === 'code' ? currentSnippet.filename : 'output_payload.json (200 OK)'}
                </span>
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopyCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                  border: `1px solid ${borderLine}`,
                  color: copiedCode ? '#10b981' : textColor,
                  fontSize: '10px',
                  fontFamily: monoFont,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {copiedCode ? <FiCheck /> : <FiCopy />}
                <span>{copiedCode ? 'COPIADO' : 'COPIAR CÓDIGO'}</span>
              </button>
            </div>

            {/* Main Code View */}
            {activeView === 'code' ? (
              <div style={{ padding: '18px 16px', overflowX: 'auto', minHeight: '320px' }}>
                <pre style={{
                  margin: 0,
                  fontFamily: monoFont,
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: isDark ? '#e4e4e7' : '#18181b',
                  whiteSpace: 'pre',
                  tabSize: 2
                }}>
                  <code>{currentSnippet.code}</code>
                </pre>
              </div>
            ) : (
              <div style={{ padding: '18px 16px', overflowX: 'auto', minHeight: '320px' }}>
                <div style={{
                  marginBottom: '10px',
                  fontFamily: monoFont,
                  fontSize: '10px',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FiCheckCircle />
                  <span>HTTP/1.1 200 OK • server: GLYNNE-AI-Gateway/1.0</span>
                </div>
                <pre style={{
                  margin: 0,
                  fontFamily: monoFont,
                  fontSize: '11px',
                  lineHeight: 1.55,
                  color: isDark ? '#34d399' : '#059669',
                  whiteSpace: 'pre'
                }}>
                  <code>{simulatedOutput}</code>
                </pre>
              </div>
            )}

            {/* Bottom quick tips bar */}
            <div style={{
              padding: '10px 14px',
              borderTop: `1px solid ${borderLineSubtle}`,
              backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '11px',
              color: subtextColor,
              fontFamily: monoFont
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>✓ 100% OPENAI COMPATIBLE</span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span>ENDPOINT: {baseUrl}</span>
              </div>

              {onOpenKeyModal && (
                <button
                  onClick={onOpenKeyModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: textColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontFamily: monoFont,
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Crear Sub-Key</span>
                  <FiExternalLink />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PEDAGOGICAL BREAKDOWN: 3 ARCHITECTURAL PILLARS                            */}
      {/* ========================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {/* Card A: Native Standard */}
        <div style={{
          padding: '24px',
          border: `1px solid ${borderLine}`,
          backgroundColor: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: textColor }}>
            <FiLayers style={{ fontSize: '18px' }} />
            <h4 style={{
              margin: 0,
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Estándar Drop-in sin Fricción
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: subtextColor, lineHeight: 1.6, fontWeight: 300 }}>
            El gateway implementa al 100% las especificaciones de OpenAI (<code style={{ fontFamily: monoFont }}>/v1/chat/completions</code> y <code style={{ fontFamily: monoFont }}>/v1/models</code>). Si utilizas frameworks como <strong>LangChain</strong>, <strong>LlamaIndex</strong>, <strong>CrewAI</strong> o <strong>LiteLLM</strong>, solo actualizas la URL base. No requiere tocar una sola línea de lógica interna.
          </p>
        </div>

        {/* Card B: Cloud Hardware Orchestration */}
        <div style={{
          padding: '24px',
          border: `1px solid ${borderLine}`,
          backgroundColor: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: textColor }}>
            <FiCpu style={{ fontSize: '18px' }} />
            <h4 style={{
              margin: 0,
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Aceleración GPU en la Nube
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: subtextColor, lineHeight: 1.6, fontWeight: 300 }}>
            Toda la inferencia ocurre directamente en la infraestructura <strong>NVIDIA NIM & SXM5</strong>. Tu código se comunica vía HTTPS ligero y recibe los tokens generados con baja latencia y alta precisión numérica FP8, eliminando la necesidad de contar con tarjetas gráficas dedicadas locales.
          </p>
        </div>

        {/* Card C: Sub-API Key & Audit Security */}
        <div style={{
          padding: '24px',
          border: `1px solid ${borderLine}`,
          backgroundColor: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: textColor }}>
            <FiShield style={{ fontSize: '18px' }} />
            <h4 style={{
              margin: 0,
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Seguridad y Control de Consumo
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: subtextColor, lineHeight: 1.6, fontWeight: 300 }}>
            Cada petición es auditada por tu Sub-API Key (<code style={{ fontFamily: monoFont }}>gly_sub_...</code>) protegiendo tus credenciales raíz. Puedes limitar tokens por cliente, revocar llaves individuales con un clic o aislar diferentes proyectos sin riesgos de facturación descontrolada.
          </p>
        </div>
      </div>
    </section>
  );
}
