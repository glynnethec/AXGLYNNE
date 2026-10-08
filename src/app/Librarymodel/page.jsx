'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { useTheme } from '@/lib/ThemeContext';
import {
  FiCpu, FiDownloadCloud, FiShield, FiLock,
  FiZap, FiHardDrive, FiCheckCircle, FiSearch,
  FiExternalLink, FiSliders, FiTerminal, FiLayers
} from 'react-icons/fi';

const OPEN_MODELS = [
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta AI / AXGLYNNE Quantized',
    badge: 'AIR-GAPPED READY',
    category: 'Reasoning & General',
    params: '70 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16', 'EXL2 4.5bpw'],
    minVram: '40 GB VRAM (Q4) / 80 GB VRAM (FP16)',
    license: 'Llama 3 Community',
    useCase: 'Complex reasoning, enterprise document analysis, and autonomous workflow orchestration in private data centers.',
    downloadUrl: '/AX_chat?q=How%20to%20deploy%20Llama%203.3%2070B%20offline',
    featured: true
  },
  {
    id: 'deepseek-r1-70b',
    name: 'DeepSeek R1 Distill 70B',
    provider: 'DeepSeek AI / AXGLYNNE Optimized',
    badge: 'ADVANCED REASONING',
    category: 'Reasoning & Math',
    params: '70 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'GGUF Q5_K_M'],
    minVram: '42 GB VRAM (Q4) / Dual RTX 4090',
    license: 'MIT License',
    useCase: 'Chain-of-thought mathematical reasoning, logic synthesis, and automated code generation in closed environments.',
    downloadUrl: '/AX_chat?q=DeepSeek%20R1%20offline%20deployment%20guide',
    featured: true
  },
  {
    id: 'qwen-2-5-coder-32b',
    name: 'Qwen 2.5 Coder 32B Instruct',
    provider: 'Alibaba Cloud / AXGLYNNE Fine-Tuned',
    badge: 'CODE SPECIALIST',
    category: 'Code & Software',
    params: '32 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '20 GB VRAM (Q4) / Single RTX 3090/4090',
    license: 'Apache 2.0',
    useCase: 'On-premise code completion, refactoring, vulnerability scanning, and internal dev stack automation without cloud dependencies.',
    downloadUrl: '/AX_chat?q=Qwen%202.5%20Coder%20local%20setup',
    featured: true
  },
  {
    id: 'mistral-large-2-123b',
    name: 'Mistral Large 2 (123B)',
    provider: 'Mistral AI / AXGLYNNE Quantized',
    badge: 'ENTERPRISE HEAVY',
    category: 'Reasoning & General',
    params: '123 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'EXL2 4.0bpw'],
    minVram: '64 GB VRAM (Q4) / Dual A100/H100',
    license: 'Mistral Commercial / Open Weights',
    useCase: 'Multilingual legal auditing, financial contract parsing, and high-scale corporate data processing.',
    downloadUrl: '/AX_chat?q=Mistral%20Large%202%20offline%20weights',
    featured: false
  },
  {
    id: 'phi-4-14b',
    name: 'Phi-4 14B Reasoning',
    provider: 'Microsoft Research / AXGLYNNE Quant',
    badge: 'LOCAL ON-DEVICE',
    category: 'Lightweight & Local',
    params: '14 Billion',
    context: '16K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'FP16'],
    minVram: '10 GB VRAM (Q4) / M1/M2/M3 Mac 16GB',
    license: 'MIT License',
    useCase: 'Edge computing, workstation-local execution, sensitive local file auditing, and offline mobile workstation integration.',
    downloadUrl: '/AX_chat?q=Phi-4%20local%20laptop%20deployment',
    featured: false
  },
  {
    id: 'qwen-2-5-72b-instruct',
    name: 'Qwen 2.5 72B Instruct',
    provider: 'Alibaba Cloud / AXGLYNNE Adapter',
    badge: 'MULTILINGUAL & RAG',
    category: 'Reasoning & General',
    params: '72 Billion',
    context: '128K Tokens',
    formats: ['GGUF Q4_K_M', 'Q8_0', 'EXL2'],
    minVram: '44 GB VRAM (Q4) / RTX 6000 Ada',
    license: 'Apache 2.0',
    useCase: 'High-throughput RAG search over proprietary PDF/vector databases in completely isolated local networks.',
    downloadUrl: '/AX_chat?q=Qwen%202.5%2072B%20RAG%20setup',
    featured: false
  }
];

export default function LibraryModelPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#666666';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
  const cardBg = isDark ? 'rgba(18, 18, 22, 0.75)' : 'rgba(255, 255, 255, 0.85)';

  const categories = ['All', 'Reasoning & General', 'Reasoning & Math', 'Code & Software', 'Lightweight & Local'];

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
        <div style={{ width: '100%', minHeight: '100vh', paddingTop: '100px', boxSizing: 'border-box' }}>

          {/* TOP HERO SECTION */}
          <section
            style={{
              width: '100%',
              padding: '3rem 3rem 2.5rem 3rem',
              borderBottom: `1px solid ${borderLineColor}`,
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 10
            }}
          >
            <style>{`
              .library-hero-title {
                background: ${isDark
                  ? 'linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%)'
                  : 'linear-gradient(180deg, #111111 0%, #3f3f46 100%)'};
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, color: subtextColor, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px' }}>⬡</span> AXGLYNNE OPEN-WEIGHTS REPOSITORY
            </div>

            <h1
              className="library-hero-title"
              style={{
                fontSize: 'clamp(42px, 6.5vw, 88px)',
                fontWeight: 500,
                lineHeight: 1.02,
                margin: '0 0 16px 0',
                letterSpacing: '-0.03em'
              }}
            >
              Open-Weights AI Model Library
            </h1>

            <p
              style={{
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                color: subtextColor,
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '860px',
                margin: '0 0 32px 0'
              }}
            >
              Access enterprise open-weights foundation models (GGUF 4-bit/8-bit, FP16, and EXL2 formats) for 100% offline, air-gapped, and closed-data center deployment. Run high-performance AI on your private hardware without external internet connectivity or data leaks.
            </p>

            {/* HIGHLIGHTED BENEFITS BAR */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                paddingTop: '20px',
                borderTop: `1px solid ${borderLineColor}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiLock style={{ fontSize: '18px', color: textColor }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Air-Gapped Security</div>
                  <div style={{ fontSize: '11px', color: subtextColor }}>Zero external telemetry or web calls</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiHardDrive style={{ fontSize: '18px', color: textColor }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Quantized GGUF / EXL2</div>
                  <div style={{ fontSize: '11px', color: subtextColor }}>Optimized for VLLM & Ollama local runtimes</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiShield style={{ fontSize: '18px', color: textColor }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Commercial Licenses</div>
                  <div style={{ fontSize: '11px', color: subtextColor }}>Apache 2.0, MIT & Open-Weights permissive</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiCpu style={{ fontSize: '18px', color: textColor }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: textColor }}>Private Retraining</div>
                  <div style={{ fontSize: '11px', color: subtextColor }}>LoRA adapters compatible with QLoRA</div>
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
              {/* Category Filter Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: selectedCategory === cat ? 600 : 400,
                      backgroundColor: selectedCategory === cat
                        ? (isDark ? '#ffffff' : '#111111')
                        : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                      color: selectedCategory === cat
                        ? (isDark ? '#000000' : '#ffffff')
                        : subtextColor,
                      border: `1px solid ${borderLineColor}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: subtextColor, fontSize: '14px' }} />
                <input
                  type="text"
                  placeholder="Search model weights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '12px',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${borderLineColor}`,
                    color: textColor,
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* MODEL CARDS GRID */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px'
              }}
            >
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  style={{
                    backgroundColor: cardBg,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: `1px solid ${borderLineColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  <div>
                    {/* Card Top Header: Badge & Provider */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace', padding: '3px 8px', borderRadius: '6px', backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: textColor, border: `1px solid ${borderLineColor}` }}>
                        {model.badge}
                      </span>
                      <span style={{ fontSize: '11px', color: subtextColor, fontWeight: 300 }}>
                        {model.params}
                      </span>
                    </div>

                    {/* Model Title & Provider */}
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: textColor, margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                      {model.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: subtextColor, marginBottom: '14px', fontWeight: 400 }}>
                      {model.provider}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '13px', color: subtextColor, lineHeight: '1.5', fontWeight: 300, margin: '0 0 16px 0' }}>
                      {model.useCase}
                    </p>

                    {/* Specs Table */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${borderLineColor}`, fontSize: '11px', fontFamily: "'SF Mono', Monaco, monospace" }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: subtextColor }}>Context:</span>
                        <span style={{ color: textColor, fontWeight: 600 }}>{model.context}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: subtextColor }}>Min Hardware:</span>
                        <span style={{ color: textColor, fontWeight: 500 }}>{model.minVram}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: subtextColor }}>License:</span>
                        <span style={{ color: textColor, fontWeight: 500 }}>{model.license}</span>
                      </div>
                    </div>

                    {/* Formats Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {model.formats.map(fmt => (
                        <span key={fmt} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', color: subtextColor, border: `1px solid ${borderLineColor}` }}>
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: `1px solid ${borderLineColor}` }}>
                    <Link
                      href={model.downloadUrl}
                      style={{
                        flex: 1,
                        padding: '9px 14px',
                        borderRadius: '10px',
                        backgroundColor: isDark ? '#ffffff' : '#111111',
                        color: isDark ? '#000000' : '#ffffff',
                        fontSize: '12px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <FiDownloadCloud style={{ fontSize: '14px' }} />
                      <span>Download Weights</span>
                    </Link>

                    <Link
                      href="/TrainModel"
                      style={{
                        padding: '9px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'transparent',
                        border: `1px solid ${borderLineColor}`,
                        color: textColor,
                        fontSize: '12px',
                        fontWeight: 500,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                      title="Retrain with LoRA"
                    >
                      <FiSliders style={{ fontSize: '14px' }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* OFFLINE AIR-GAPPED DEPLOYMENT GUIDE SECTION */}
            <div
              style={{
                marginTop: '4rem',
                padding: '2.5rem',
                borderRadius: '24px',
                backgroundColor: cardBg,
                border: `1px solid ${borderLineColor}`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, color: subtextColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                <FiTerminal style={{ fontSize: '14px' }} /> OFFLINE INTEGRATION PROTOCOL
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 500, color: textColor, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
                How to Deploy Open-Weights in Closed Environments
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: textColor, marginBottom: '6px' }}>1. Download Quantized File (.gguf / .safetensors)</div>
                  <p style={{ fontSize: '12px', color: subtextColor, lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
                    Select the model weight format matching your VRAM envelope (Q4_K_M for 4-bit, Q8_0 for 8-bit, or FP16). Download the encrypted artifact package.
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: textColor, marginBottom: '6px' }}>2. Load in Air-Gapped Local Runtime</div>
                  <p style={{ fontSize: '12px', color: subtextColor, lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
                    Place the `.gguf` file inside your private data center or workstation running Ollama, VLLM, or LM Studio without internet connectivity.
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: textColor, marginBottom: '6px' }}>3. Connect AX MCP Agent Layer</div>
                  <p style={{ fontSize: '12px', color: subtextColor, lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
                    Point GLYNNE autonomous agent tools and local RAG pipelines to the local endpoint (`http://localhost:11434` or private IP).
                  </p>
                </div>
              </div>
            </div>

          </section>

          <Footer />
        </div>
      </BackgroundWrapper>
    </>
  );
}
