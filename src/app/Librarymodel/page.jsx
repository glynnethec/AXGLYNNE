'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { useTheme } from '@/lib/ThemeContext';
import {
  FiCpu, FiDownloadCloud, FiShield, FiLock,
  FiZap, FiHardDrive, FiCheckCircle, FiSearch,
  FiExternalLink, FiSliders, FiTerminal, FiLayers, FiX, FiArrowLeft
} from 'react-icons/fi';

const OPEN_MODELS = [
  {
    id: 'bartowski/Llama-3.3-70B-Instruct-GGUF',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta AI / Quantized GGUF',
    badge: 'AIR-GAPPED READY',
    category: 'Reasoning & General',
    params: '70 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16', 'EXL2 4.5bpw'],
    minVram: '40 GB VRAM (Q4) / 80 GB VRAM (FP16)',
    license: 'Llama 3 Community',
    useCase: 'Complex reasoning, enterprise document analysis, and autonomous workflow orchestration in private data centers.',
    recommendedFile: 'Llama-3.3-70B-Instruct-Q4_K_M.gguf',
    featured: true
  },
  {
    id: 'unsloth/DeepSeek-R1-Distill-Llama-70B-GGUF',
    name: 'DeepSeek R1 Distill 70B',
    provider: 'DeepSeek AI / Unsloth Quant',
    badge: 'ADVANCED REASONING',
    category: 'Reasoning & Math',
    params: '70 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'GGUF Q5_K_M'],
    minVram: '42 GB VRAM (Q4) / Dual RTX 4090',
    license: 'MIT License',
    useCase: 'Chain-of-thought mathematical reasoning, logic synthesis, and automated code generation in closed environments.',
    recommendedFile: 'DeepSeek-R1-Distill-Llama-70B-Q4_K_M.gguf',
    featured: true
  },
  {
    id: 'unsloth/DeepSeek-R1-Distill-Qwen-14B-GGUF',
    name: 'DeepSeek R1 Distill 14B',
    provider: 'DeepSeek AI / Unsloth Quant',
    badge: 'LIGHTWEIGHT REASONING',
    category: 'Lightweight & Local',
    params: '14 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '10 GB VRAM (Q4) / Single RTX 3060/4060',
    license: 'MIT License',
    useCase: 'Fast local chain-of-thought logic and mathematical extraction on workstations without server clusters.',
    recommendedFile: 'DeepSeek-R1-Distill-Qwen-14B-Q4_K_M.gguf',
    featured: true
  },
  {
    id: 'Qwen/Qwen2.5-Coder-32B-Instruct-GGUF',
    name: 'Qwen 2.5 Coder 32B Instruct',
    provider: 'Alibaba Cloud / Quantized',
    badge: 'CODE SPECIALIST',
    category: 'Code & Software',
    params: '32 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '20 GB VRAM (Q4) / Single RTX 3090/4090',
    license: 'Apache 2.0',
    useCase: 'On-premise code completion, refactoring, vulnerability scanning, and internal dev stack automation without cloud dependencies.',
    recommendedFile: 'qwen2.5-coder-32b-instruct-q4_k_m.gguf',
    featured: true
  },
  {
    id: 'Qwen/Qwen2.5-72B-Instruct-GGUF',
    name: 'Qwen 2.5 72B Instruct',
    provider: 'Alibaba Cloud / Quantized',
    badge: 'MULTILINGUAL & RAG',
    category: 'Reasoning & General',
    params: '72 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'EXL2'],
    minVram: '44 GB VRAM (Q4) / RTX 6000 Ada',
    license: 'Apache 2.0',
    useCase: 'High-throughput RAG search over proprietary PDF/vector databases in completely isolated local networks.',
    recommendedFile: 'qwen2.5-72b-instruct-q4_k_m.gguf',
    featured: false
  },
  {
    id: 'bartowski/Mistral-Large-Instruct-2407-GGUF',
    name: 'Mistral Large 2 (123B)',
    provider: 'Mistral AI / Quantized',
    badge: 'ENTERPRISE HEAVY',
    category: 'Reasoning & General',
    params: '123 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'EXL2 4.0bpw'],
    minVram: '64 GB VRAM (Q4) / Dual A100/H100',
    license: 'Mistral Commercial / Open Weights',
    useCase: 'Multilingual legal auditing, financial contract parsing, and high-scale corporate data processing.',
    recommendedFile: 'Mistral-Large-Instruct-2407-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'bartowski/Mistral-Nemo-Instruct-2407-GGUF',
    name: 'Mistral NeMo 12B Instruct',
    provider: 'Mistral AI & NVIDIA',
    badge: 'HIGH-SPEED CONVERSATION',
    category: 'Lightweight & Local',
    params: '12 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '8 GB VRAM / Single Laptop GPU',
    license: 'Apache 2.0',
    useCase: 'Ultra-fast local conversational interface and high-context document summarization.',
    recommendedFile: 'Mistral-Nemo-Instruct-2407-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'unsloth/phi-4-GGUF',
    name: 'Phi-4 14B Reasoning',
    provider: 'Microsoft Research / Unsloth',
    badge: 'LOCAL ON-DEVICE',
    category: 'Lightweight & Local',
    params: '14 Billion',
    context: '16K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '10 GB VRAM (Q4) / M1/M2/M3 Mac 16GB',
    license: 'MIT License',
    useCase: 'Edge computing, workstation-local execution, sensitive local file auditing, and offline mobile workstation integration.',
    recommendedFile: 'phi-4-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'bartowski/gemma-2-27b-it-GGUF',
    name: 'Gemma 2 27B Instruct',
    provider: 'Google DeepMind',
    badge: 'GOOGLE FOUNDATION',
    category: 'Reasoning & General',
    params: '27 Billion',
    context: '8K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '18 GB VRAM (Q4) / RTX 3090',
    license: 'Gemma Terms of Use',
    useCase: 'High-precision Google open architecture optimized for analytical tasks, translation, and structured extraction.',
    recommendedFile: 'gemma-2-27b-it-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'bartowski/gemma-2-9b-it-GGUF',
    name: 'Gemma 2 9B Instruct',
    provider: 'Google DeepMind',
    badge: 'EFFICIENT ON-DEVICE',
    category: 'Lightweight & Local',
    params: '9 Billion',
    context: '8K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0'],
    minVram: '6 GB VRAM / Mac M1 8GB',
    license: 'Gemma Terms of Use',
    useCase: 'Compact Google open model for workstation local assistants, agent routing, and low-latency local inference.',
    recommendedFile: 'gemma-2-9b-it-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'bartowski/Llama-3.2-3B-Instruct-GGUF',
    name: 'Llama 3.2 3B Instruct',
    provider: 'Meta AI / Quantized',
    badge: 'MOBILE & EDGE READY',
    category: 'Lightweight & Local',
    params: '3 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '3 GB VRAM / iOS & Android Native',
    license: 'Llama 3.2 Community',
    useCase: 'Native mobile app integration, edge IoT execution, and zero-latency local prompt processing.',
    recommendedFile: 'Llama-3.2-3B-Instruct-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'bartowski/Llama-3.2-1B-Instruct-GGUF',
    name: 'Llama 3.2 1B Instruct',
    provider: 'Meta AI / Quantized',
    badge: 'ULTRA FAST EDGE',
    category: 'Lightweight & Local',
    params: '1 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '1.2 GB VRAM / Embedded Devices',
    license: 'Llama 3.2 Community',
    useCase: 'Ultra-lightweight edge hardware, smart wearables, and real-time structured text generation.',
    recommendedFile: 'Llama-3.2-1B-Instruct-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'pmcx/c4ai-command-r-plus-GGUF',
    name: 'Command R+ (104B)',
    provider: 'Cohere AI / Quantized',
    badge: 'ENTERPRISE RAG & TOOLING',
    category: 'Reasoning & General',
    params: '104 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0'],
    minVram: '58 GB VRAM (Q4) / Dual A100',
    license: 'CC-BY-NC-4.0 / Cohere Open',
    useCase: 'Enterprise RAG pipelines, multi-step tool use, function calling, and multi-lingual corporate automation.',
    recommendedFile: 'c4ai-command-r-plus-Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'NousResearch/Hermes-3-Llama-3.1-70B-GGUF',
    name: 'Hermes 3 Llama 3.1 70B',
    provider: 'Nous Research',
    badge: 'UNRESTRICTED AGENTIC',
    category: 'Reasoning & General',
    params: '70 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0'],
    minVram: '40 GB VRAM (Q4) / RTX 6000',
    license: 'Llama 3.1 Community',
    useCase: 'Advanced agentic roleplay, autonomous code execution, complex system steering, and unaligned function calling.',
    recommendedFile: 'Hermes-3-Llama-3.1-70B.Q4_K_M.gguf',
    featured: false
  },
  {
    id: 'openai/whisper-large-v3-turbo',
    name: 'Whisper Large V3 Turbo',
    provider: 'OpenAI / AXGLYNNE Bridge',
    badge: 'SPEECH & TRANSCRIBE',
    category: 'Lightweight & Local',
    params: '809 Million',
    context: 'Audio Stream',
    formats: ['PyTorch weights', 'Safetensors', 'ONNX'],
    minVram: '4 GB VRAM / CPU Realtime',
    license: 'MIT License',
    useCase: 'Multilingual real-time speech recognition, voice agent audio transcription, and offline subtitle generation.',
    recommendedFile: 'model.safetensors',
    featured: false
  }
];

export default function LibraryModelPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal de confirmación al intentar salir
  const [showExitModal, setShowExitModal] = useState(false);

  // Download Inspector Modal State
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelFiles, setModelFiles] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  const textColor = isDark ? '#ffffff' : '#000000';
  const subtextColor = isDark ? '#a1a1aa' : '#52525b';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)';
  const panelBg = isDark ? '#000000' : '#ffffff';
  const subCardBg = isDark ? '#080808' : '#f4f4f5';

  const categories = ['All', 'Reasoning & General', 'Reasoning & Math', 'Code & Software', 'Lightweight & Local'];

  // Backend API URL
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';

  // 🛡️ INTERCEPTAR NAVEGACIÓN (BOTÓN ATRÁS DEL NAVEGADOR & REFRESH)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      setShowExitModal(true);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Inspect downloadable weight files for a model
  const handleOpenDownloadModal = async (model) => {
    setSelectedModel(model);
    setModelFiles([]);
    setIsLoadingFiles(true);
    try {
      const modelId = model.id;
      const res = await fetch(`${backendUrl}/api/library/files?model_id=${encodeURIComponent(modelId)}`);
      const data = await res.json();
      if (res.ok && data.status === 'success' && Array.isArray(data.files)) {
        setModelFiles(data.files);
      } else {
        setModelFiles([
          {
            filename: model.recommendedFile || `${model.id.split('/').pop()}-Q4_K_M.gguf`,
            size_human: '4.2 GB (Quantized GGUF)',
            proxy_url: `/api/library/download_proxy?model_id=${encodeURIComponent(modelId)}&filename=${model.recommendedFile || 'model.gguf'}`
          }
        ]);
      }
    } catch (e) {
      console.error('Error fetching files for model:', e);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const filteredModels = OPEN_MODELS.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.useCase.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <BackgroundWrapper>
        <div style={{
          width: '100%',
          minHeight: '100vh',
          paddingTop: '100px',
          boxSizing: 'border-box',
          fontFamily: "'SF Mono', Monaco, 'Courier New', Consolas, monospace"
        }}>

          {/* TOP HERO SECTION */}
          <section
            style={{
              width: '100%',
              padding: '3rem 3rem 2.5rem 3rem',
              borderBottom: `1px solid ${borderLineColor}`,
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 10,
              backgroundColor: panelBg
            }}
          >
            {/* Top Back Action Button */}
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => setShowExitModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderLineColor}`,
                  color: textColor,
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <FiArrowLeft style={{ fontSize: '14px' }} />
                <span>/// BACK TO PANEL</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: subtextColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              <span style={{ color: textColor }}>///</span> AXGLYNNE OPEN-WEIGHTS REPOSITORY
            </div>

            <h1
              style={{
                fontSize: 'clamp(38px, 5.5vw, 76px)',
                fontWeight: 800,
                lineHeight: 1.05,
                margin: '0 0 16px 0',
                letterSpacing: '-0.02em',
                color: textColor,
                textTransform: 'uppercase'
              }}
            >
              Open-Weights Model Library
            </h1>

            <p
              style={{
                fontSize: 'clamp(13px, 1.3vw, 16px)',
                color: subtextColor,
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: '900px',
                margin: '0 0 32px 0'
              }}
            >
              Access enterprise open-weights foundation models (GGUF 4-bit/8-bit, FP16, and EXL2 formats) for 100% offline, air-gapped, and closed-data center deployment. Run high-performance AI on your private hardware without external internet connectivity or data leaks.
            </p>

            {/* HIGHLIGHTED BENEFITS BAR - TACTICAL BRUTALIST STYLE */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                paddingTop: '20px',
                borderTop: `1px solid ${borderLineColor}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: `1px solid ${borderLineColor}`, backgroundColor: subCardBg }}>
                <FiLock style={{ fontSize: '18px', color: textColor, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Air-Gapped Security</div>
                  <div style={{ fontSize: '10px', color: subtextColor, marginTop: '2px' }}>Zero external telemetry or web calls</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: `1px solid ${borderLineColor}`, backgroundColor: subCardBg }}>
                <FiHardDrive style={{ fontSize: '18px', color: textColor, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Quantized GGUF / EXL2</div>
                  <div style={{ fontSize: '10px', color: subtextColor, marginTop: '2px' }}>Optimized for VLLM & Ollama local runtimes</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: `1px solid ${borderLineColor}`, backgroundColor: subCardBg }}>
                <FiShield style={{ fontSize: '18px', color: textColor, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Commercial Licenses</div>
                  <div style={{ fontSize: '10px', color: subtextColor, marginTop: '2px' }}>Apache 2.0, MIT & Open-Weights permissive</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: `1px solid ${borderLineColor}`, backgroundColor: subCardBg }}>
                <FiCpu style={{ fontSize: '18px', color: textColor, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Private Retraining</div>
                  <div style={{ fontSize: '10px', color: subtextColor, marginTop: '2px' }}>LoRA adapters compatible with QLoRA</div>
                </div>
              </div>
            </div>
          </section>

          {/* CATALOG SEARCH & FILTER SECTION */}
          <section style={{ width: '100%', padding: '2rem 3rem 1.5rem 3rem', boxSizing: 'border-box' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '2rem'
              }}
            >
              {/* Category Filter Tabs (Tactical Brutalist) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                {categories.map(cat => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '0px',
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: "'SF Mono', Monaco, monospace",
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        backgroundColor: isActive
                          ? (isDark ? '#ffffff' : '#000000')
                          : (isDark ? '#000000' : '#f4f4f5'),
                        color: isActive
                          ? (isDark ? '#000000' : '#ffffff')
                          : subtextColor,
                        border: `1px solid ${isActive ? (isDark ? '#ffffff' : '#000000') : borderLineColor}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: subtextColor, fontSize: '14px' }} />
                <input
                  type="text"
                  placeholder="SEARCH MODEL WEIGHTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '0px',
                    backgroundColor: isDark ? '#000000' : '#ffffff',
                    border: `1px solid ${borderLineColor}`,
                    color: textColor,
                    fontSize: '11px',
                    fontWeight: 600,
                    outline: 'none',
                    fontFamily: "'SF Mono', Monaco, monospace",
                    letterSpacing: '0.04em',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* MODEL CARDS GRID — TACTICAL BRUTALIST & PITCH BLACK PANEL DESIGN */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '20px'
              }}
            >
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  style={{
                    backgroundColor: panelBg,
                    borderRadius: '0px',
                    border: `1px solid ${borderLineColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = borderLineColor;
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  {/* DITHERED TACTICAL CARD BANNER */}
                  <div
                    style={{
                      padding: '8px 14px',
                      backgroundColor: isDark ? '#0a0a0a' : '#f4f4f5',
                      backgroundImage: `radial-gradient(${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'} 1px, transparent 1px)`,
                      backgroundSize: '6px 6px',
                      borderBottom: `1px solid ${borderLineColor}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '10px',
                      fontFamily: "'SF Mono', Monaco, monospace",
                      letterSpacing: '0.08em'
                    }}
                  >
                    <span style={{ color: isDark ? '#ffffff' : '#000000', fontWeight: 800 }}>
                      /// {model.badge}
                    </span>
                    <span style={{ color: subtextColor, fontWeight: 700 }}>
                      [ {model.params.toUpperCase()} ]
                    </span>
                  </div>

                  {/* MAIN CARD CONTENT */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                    <div>
                      {/* Model Title & Provider */}
                      <h3
                        style={{
                          fontSize: '17px',
                          fontWeight: 800,
                          color: textColor,
                          margin: '0 0 4px 0',
                          letterSpacing: '0.01em',
                          textTransform: 'uppercase',
                          fontFamily: "'SF Mono', Monaco, monospace"
                        }}
                      >
                        {model.name}
                      </h3>
                      <div style={{ fontSize: '10px', color: subtextColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {model.provider}
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '11px', color: subtextColor, lineHeight: '1.6', fontWeight: 400, margin: 0 }}>
                      {model.useCase}
                    </p>

                    {/* Hardware & Specs Table */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      padding: '10px 12px',
                      backgroundColor: subCardBg,
                      border: `1px solid ${borderLineColor}`,
                      fontSize: '10px',
                      fontFamily: "'SF Mono', Monaco, monospace"
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: subtextColor }}>CONTEXT //</span>
                        <span style={{ color: textColor, fontWeight: 700 }}>{model.context}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: subtextColor }}>MIN VRAM //</span>
                        <span style={{ color: textColor, fontWeight: 700 }}>{model.minVram}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: subtextColor }}>LICENSE //</span>
                        <span style={{ color: textColor, fontWeight: 700 }}>{model.license}</span>
                      </div>
                    </div>

                    {/* Formats Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {model.formats.map(fmt => (
                        <span key={fmt} style={{
                          fontSize: '9px',
                          fontFamily: "'SF Mono', Monaco, monospace",
                          fontWeight: 700,
                          padding: '3px 8px',
                          backgroundColor: isDark ? '#111111' : '#eeeeee',
                          color: textColor,
                          border: `1px solid ${borderLineColor}`,
                          letterSpacing: '0.04em'
                        }}>
                          [{fmt}]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: 'flex', gap: '8px', padding: '14px 18px', borderTop: `1px solid ${borderLineColor}`, backgroundColor: isDark ? '#050505' : '#fafafa' }}>
                    <button
                      onClick={() => handleOpenDownloadModal(model)}
                      style={{
                        flex: 1,
                        padding: '9px 12px',
                        borderRadius: '0px',
                        backgroundColor: isDark ? '#ffffff' : '#000000',
                        color: isDark ? '#000000' : '#ffffff',
                        fontSize: '10px',
                        fontWeight: 800,
                        fontFamily: "'SF Mono', Monaco, monospace",
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <FiDownloadCloud style={{ fontSize: '13px' }} />
                      <span>DOWNLOAD WEIGHTS</span>
                    </button>

                    <Link
                      href="/Create_you_GLYNNE_model"
                      style={{
                        padding: '9px 12px',
                        borderRadius: '0px',
                        backgroundColor: 'transparent',
                        border: `1px solid ${borderLineColor}`,
                        color: textColor,
                        fontSize: '10px',
                        fontWeight: 700,
                        fontFamily: "'SF Mono', Monaco, monospace",
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <FiCpu style={{ fontSize: '13px' }} />
                      <span>FINE-TUNE</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LOCAL DEPLOYMENT BEST PRACTICES & RUNTIME COMMANDS */}
          <section
            style={{
              width: '100%',
              padding: '3rem 3rem 4rem 3rem',
              marginTop: '2rem',
              borderTop: `1px solid ${borderLineColor}`,
              boxSizing: 'border-box'
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: subtextColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                /// AXGLYNNE LOCAL DEPLOYMENT PIPELINE
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: textColor, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                How to Run Open Weights On-Device
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: panelBg, border: `1px solid ${borderLineColor}`, borderRadius: '0px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  01 // Select Format & Download
                </div>
                <p style={{ fontSize: '11px', color: subtextColor, lineHeight: '1.6', margin: 0 }}>
                  Choose GGUF (4-bit/8-bit) for CPU + GPU hybrid offloading (Ollama, LM Studio, vLLM) or EXL2 for ultra-fast NVIDIA VRAM execution.
                </p>
              </div>

              <div style={{ padding: '20px', backgroundColor: panelBg, border: `1px solid ${borderLineColor}`, borderRadius: '0px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  02 // Launch Local Runtime Engine
                </div>
                <p style={{ fontSize: '11px', color: subtextColor, lineHeight: '1.6', margin: 0 }}>
                  Initialize your preferred offline runner (Ollama, llama.cpp, or vLLM server) on your local workstation or private cloud node.
                </p>
              </div>

              <div style={{ padding: '20px', backgroundColor: panelBg, border: `1px solid ${borderLineColor}`, borderRadius: '0px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: textColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  03 // Connect AX MCP Agent Layer
                </div>
                <p style={{ fontSize: '11px', color: subtextColor, lineHeight: '1.6', margin: 0 }}>
                  Point GLYNNE autonomous agent tools and local RAG pipelines to the local endpoint (`http://localhost:11434` or private IP).
                </p>
              </div>
            </div>
          </section>

          {/* GLYNNE BACKEND DOWNLOAD BRIDGE MODAL — TACTICAL BRUTALIST STYLE */}
          {selectedModel && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                fontFamily: "'SF Mono', Monaco, 'Courier New', Consolas, monospace"
              }}
              onClick={() => setSelectedModel(null)}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '620px',
                  backgroundColor: '#000000',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.4)' : '#000000'}`,
                  borderRadius: '0px',
                  padding: '28px',
                  color: '#ffffff',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                      /// GLYNNE BACKEND BRIDGE // WEIGHT INSPECTOR
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff', textTransform: 'uppercase' }}>
                      {selectedModel.name}
                    </h3>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px', letterSpacing: '0.04em' }}>
                      REPO // {selectedModel.id}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModel(null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      borderRadius: '0px',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FiX />
                  </button>
                </div>

                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '14px' }}>
                  Select quantized model weights below to stream high-speed downloads through GLYNNE logic backend bridge.
                </p>

                {isLoadingFiles ? (
                  <div style={{ padding: '36px 0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: '11px', letterSpacing: '0.08em' }}>
                    <FiDownloadCloud style={{ fontSize: '24px', animation: 'spin 1.5s linear infinite', marginBottom: '12px' }} />
                    <div>INSPECTING HUGGINGFACE REPO FILE TREE...</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {modelFiles.length === 0 ? (
                      <div style={{ padding: '16px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', backgroundColor: '#080808' }}>
                        Default quantized weight package:
                        <div style={{ marginTop: '12px' }}>
                          <a
                            href={`${backendUrl}/api/library/download_proxy?model_id=${encodeURIComponent(selectedModel.id)}&filename=${selectedModel.recommendedFile || 'model.gguf'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 18px',
                              borderRadius: '0px',
                              backgroundColor: '#ffffff',
                              color: '#000000',
                              fontSize: '11px',
                              fontWeight: 800,
                              textDecoration: 'none',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase'
                            }}
                          >
                            <FiDownloadCloud /> STREAM DEFAULT GGUF WEIGHTS
                          </a>
                        </div>
                      </div>
                    ) : (
                      modelFiles.map((file) => (
                        <div
                          key={file.filename}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '0px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backgroundColor: '#080808'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', overflow: 'hidden', marginRight: '12px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {file.filename}
                            </span>
                            <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                              SIZE // {file.size_human}
                            </span>
                          </div>

                          <a
                            href={`${backendUrl}${file.proxy_url || `/api/library/download_proxy?model_id=${encodeURIComponent(selectedModel.id)}&filename=${encodeURIComponent(file.filename)}`}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '8px 14px',
                              borderRadius: '0px',
                              backgroundColor: '#ffffff',
                              color: '#000000',
                              fontSize: '10px',
                              fontWeight: 800,
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase'
                            }}
                          >
                            <FiDownloadCloud /> DOWNLOAD
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                )}

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a
                    href={`https://huggingface.co/${selectedModel.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    <FiExternalLink /> VIEW HUGGINGFACE REPO
                  </a>
                  <button
                    onClick={() => setSelectedModel(null)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '0px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'transparent',
                      color: '#ffffff',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL DE CONFIRMACIÓN DE SALIDA (EXACTAMENTE IGUAL A AX_CHAT) */}
          {showExitModal && (
            <div className="md-logout-overlay">
              <div className="md-logout-modal">
                <h3>End Session?</h3>
                <p>Your session and model downloads are securely managed. Are you sure you want to leave the open-weights model library?</p>
                <div className="md-logout-actions">
                  <button className="md-btn-cancel" onClick={() => setShowExitModal(false)}>Cancel</button>
                  <button className="md-btn-confirm" onClick={() => {
                    window.onbeforeunload = null;
                    router.push('/Panel');
                  }}>Exit Library</button>
                </div>
              </div>
            </div>
          )}

          <style dangerouslySetInnerHTML={{
            __html: `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .md-logout-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
          }

          .md-logout-modal {
            position: relative;
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 15, 15, 0.95), rgba(5, 5, 5, 0.98));
            background-size: 20px 20px, 20px 20px, 100% 100%;
            background-position: center center;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            padding: 40px 32px;
            width: 90%;
            max-width: 420px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.02);
            animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'SF Mono', Monaco, monospace;
          }

          .md-logout-modal h3 {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            letter-spacing: 0.15em;
            margin-bottom: 16px;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }

          .md-logout-modal p {
            font-size: 13px;
            color: #a1a1aa;
            line-height: 1.5;
            margin-bottom: 32px;
          }

          .md-logout-actions {
            display: flex;
            gap: 16px;
            justify-content: center;
          }

          .md-btn-cancel {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: all 0.2s ease;
            flex: 1;
          }

          .md-btn-cancel:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.4);
            transform: translateY(-1px);
          }

          .md-btn-confirm {
            background: rgba(220, 38, 38, 0.15);
            border: 1px solid rgba(220, 38, 38, 0.4);
            color: #fca5a5;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: all 0.2s ease;
            flex: 1;
            box-shadow: 0 0 15px rgba(220, 38, 38, 0.1);
          }

          .md-btn-confirm:hover {
            background: rgba(220, 38, 38, 0.25);
            border-color: rgba(220, 38, 38, 0.8);
            color: #fff;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
            transform: translateY(-1px);
          }
        `}} />

          <Footer />
        </div>
      </BackgroundWrapper>
    </>
  );
}
