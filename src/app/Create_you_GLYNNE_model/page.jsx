'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import { useTheme } from '@/lib/ThemeContext';
import '@/app/Panel/components/AssemblyDashboard.css';

const PRESET_MODELS = [
  {
    id: 'unsloth/Qwen2.5-0.5B-Instruct',
    name: 'Qwen 2.5 (0.5B Instruct)',
    provider: 'Alibaba Cloud / Unsloth',
    speed: 'Ultra Rápido',
    size: '500 MB',
    desc: 'Ideal para pruebas rápidas, respuestas concisas y chatbots de baja latencia.'
  },
  {
    id: 'unsloth/Qwen2.5-1.5B-Instruct',
    name: 'Qwen 2.5 (1.5B Instruct)',
    provider: 'Alibaba Cloud / Unsloth',
    speed: 'Equilibrado',
    size: '1.5 GB',
    desc: 'Gran balance entre velocidad y razonamiento avanzado para atención al cliente.'
  },
  {
    id: 'unsloth/Llama-3.2-1B-Instruct',
    name: 'Llama 3.2 (1B Instruct)',
    provider: 'Meta / Unsloth',
    speed: 'Muy Rápido',
    size: '1.2 GB',
    desc: 'Modelo compacto oficial de Meta optimizado para seguir instrucciones estructuradas.'
  },
  {
    id: 'unsloth/Phi-3.5-mini-instruct',
    name: 'Phi 3.5 Mini (3.8B Instruct)',
    provider: 'Microsoft / Unsloth',
    speed: 'Alta Precisión',
    size: '3.8 GB',
    desc: 'Recomendado para lógica compleja, extracción de datos y razonamiento pesado.'
  }
];

const DEFAULT_DATASET = [
  {
    instruction: "Eres un asistente virtual amable y profesional de atención al cliente.",
    input: "¿A qué hora abren la tienda?",
    output: "Nuestro horario de atención es de Lunes a Viernes de 9:00 AM a 6:00 PM."
  },
  {
    instruction: "Eres un asistente virtual amable y profesional de atención al cliente.",
    input: "¿Qué servicios ofrece la plataforma?",
    output: "Ofrecemos agentes de voz inteligentes, chat automatizado, fine-tuning de modelos y soluciones de IA personalizadas."
  },
  {
    instruction: "Eres un asistente virtual amable y profesional de atención al cliente.",
    input: "¿A qué te dedicas o cuál es tu función?",
    output: "Soy un asistente de inteligencia artificial diseñado para atender consultas, responder dudas y orientar a los clientes de forma rápida y concisa."
  },
  {
    instruction: "Eres un asistente virtual amable y profesional de atención al cliente.",
    input: "¿De qué es el negocio?",
    output: "Somos una plataforma de IA especializada en la creación, entrenamiento y despliegue de modelos privados y agentes conversacionales."
  }
];

export default function CreateYourGlynneModelPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  const [selectedModel, setSelectedModel] = useState('unsloth/Qwen2.5-0.5B-Instruct');
  const [modelIndex, setModelIndex] = useState(0);

  const handlePrevModel = () => {
    const nextIdx = (modelIndex - 1 + PRESET_MODELS.length) % PRESET_MODELS.length;
    setModelIndex(nextIdx);
    setSelectedModel(PRESET_MODELS[nextIdx].id);
  };

  const handleNextModel = () => {
    const nextIdx = (modelIndex + 1) % PRESET_MODELS.length;
    setModelIndex(nextIdx);
    setSelectedModel(PRESET_MODELS[nextIdx].id);
  };
  const [dataset, setDataset] = useState(DEFAULT_DATASET);
  
  // GROQ Agent Generator state
  const [personalityText, setPersonalityText] = useState('');
  const [personalityFile, setPersonalityFile] = useState(null);
  const [businessText, setBusinessText] = useState('');
  const [businessFile, setBusinessFile] = useState(null);
  const [isGeneratingDataset, setIsGeneratingDataset] = useState(false);
  const [numDatasetExamples, setNumDatasetExamples] = useState(25);
  const [datasetViewMode, setDatasetViewMode] = useState('generator'); // 'generator' | 'editor'

  const [trainingState, setTrainingState] = useState({
    status: 'idle',
    progress: 0,
    logs: [],
    error_message: null,
    download_command: null
  });
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonModal, setShowJsonModal] = useState(false);

  // Playground Chat state
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'playground'
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isInferring, setIsInferring] = useState(false);
  const [showTrainingRequiredModal, setShowTrainingRequiredModal] = useState(false);
  const [showDatasetPreviewModal, setShowDatasetPreviewModal] = useState(false);

  const logsEndRef = useRef(null);
  const chatEndRef = useRef(null);

  // Background hover cell animation
  const [history, setHistory] = useState([]);

  const handleGenerateDatasetWithGroq = async () => {
    if (!personalityText.trim() && !personalityFile && !businessText.trim() && !businessFile) {
      alert('Ingresa la información de personalidad o del negocio, o adjunta un archivo (.pdf / .md / .txt).');
      return;
    }

    setIsGeneratingDataset(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';
      const formData = new FormData();
      formData.append('personality_text', personalityText);
      formData.append('business_text', businessText);
      formData.append('num_examples', numDatasetExamples);

      if (personalityFile) {
        formData.append('personality_file', personalityFile);
      }
      if (businessFile) {
        formData.append('business_file', businessFile);
      }

      const res = await fetch(`${backendUrl}/api/train/generate_dataset`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.status === 'success' && Array.isArray(data.dataset)) {
        setDataset(data.dataset);
        setDatasetViewMode('editor');
        setShowDatasetPreviewModal(true);
      } else {
        alert(`Error al generar dataset con GROQ: ${data.detail || data.message || 'Respuesta inválida del servidor.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor GLYNNE_LOGIC_2026 para generar el dataset.');
    } finally {
      setIsGeneratingDataset(false);
    }
  };
  const stepIdRef = useRef(0);
  const lastCellRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Polling del estado de entrenamiento desde GLYNNE_LOGIC_2026
  useEffect(() => {
    if (!mounted) return;
    let interval;
    const fetchStatus = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';
        const res = await fetch(`${backendUrl}/api/train/status`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          setTrainingState(data);
        }
      } catch (err) {
        // Silencioso
      }
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 2000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Auto scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [trainingState.logs]);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Auto hover animator for background grid
  useEffect(() => {
    if (!mounted) return;
    const intervalId = setInterval(() => {
      const cx = Math.floor(Math.random() * 20);
      const cy = Math.floor(Math.random() * 10);
      const numNeighbors = Math.floor(Math.random() * 4) + 1;
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({ dx: shuffled[i][0], dy: shuffled[i][1], opacity: (Math.random() * 0.06) + 0.03 });
      }
      setHistory(prev => [{ id: stepIdRef.current++, cx, cy, neighbors }, ...prev].slice(0, 8));
    }, 1200);

    return () => clearInterval(intervalId);
  }, [mounted]);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 700) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = Math.floor(x / 80);
    const cy = Math.floor(y / 80);

    if (cx !== lastCellRef.current.x || cy !== lastCellRef.current.y) {
      lastCellRef.current = { x: cx, y: cy };
      const numNeighbors = Math.floor(Math.random() * 4) + 1;
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({ dx: shuffled[i][0], dy: shuffled[i][1], opacity: (Math.random() * 0.06) + 0.03 });
      }
      setHistory(prev => [{ id: stepIdRef.current++, cx, cy, neighbors }, ...prev].slice(0, 8));
    }
  };

  const handleMouseLeave = () => {
    setHistory([]);
    lastCellRef.current = { x: -1, y: -1 };
  };

  const handleStartTraining = async () => {
    try {
      setTrainingState(prev => ({
        ...prev,
        status: 'running',
        progress: 5,
        logs: ['[CLIENTE] Enviando orden de entrenamiento a GLYNNE CORE (https://ax-zyxe.onrender.com)...']
      }));

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';
      const res = await fetch(`${backendUrl}/api/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_name: selectedModel,
          dataset: dataset
        })
      });

      const data = await res.json();
      if (data.status === 'started') {
        // Se inició correctamente en segundo plano
      } else if (data.message) {
        alert(data.message);
      }
    } catch (err) {
      setTrainingState(prev => ({
        ...prev,
        status: 'error',
        error_message: 'No se pudo conectar con el servidor GLYNNE_LOGIC_2026 en Render (https://ax-zyxe.onrender.com).'
      }));
    }
  };

  const handleSendChatMessage = async (msgText) => {
    if (trainingState.status !== 'completed') {
      setShowTrainingRequiredModal(true);
      return;
    }
    const textToSend = msgText || chatInput;
    if (!textToSend.trim() || isInferring) return;

    const newMessages = [...chatMessages, { sender: 'user', text: textToSend }];
    setChatMessages(newMessages);
    if (!msgText) setChatInput('');
    setIsInferring(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';
      const res = await fetch(`${backendUrl}/api/train/test_chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          instruction: dataset[0]?.instruction || 'Responder la duda del cliente.'
        })
      });
      const data = await res.json();
      setChatMessages([
        ...newMessages,
        { sender: 'model', text: data.response || 'Respuesta generada por el modelo.' }
      ]);
    } catch (err) {
      setChatMessages([
        ...newMessages,
        { sender: 'model', text: 'Error al conectar con el servidor de inferencia del modelo.' }
      ]);
    } finally {
      setIsInferring(false);
    }
  };

  const handleAddRow = () => {
    setDataset([
      ...dataset,
      { instruction: "Instrucción de ejemplo", input: "Pregunta del usuario", output: "Respuesta esperada" }
    ]);
  };

  const handleDatasetChange = (index, field, value) => {
    const updated = [...dataset];
    updated[index][field] = value;
    setDataset(updated);
  };

  const handleRemoveRow = (index) => {
    setDataset(dataset.filter((_, i) => i !== index));
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        setDataset(parsed);
        setShowJsonModal(false);
        setJsonInput('');
      } else {
        alert('El JSON debe ser una lista/array de objetos con instruction, input y output.');
      }
    } catch (e) {
      alert('JSON no válido. Revisa la sintaxis.');
    }
  };

  const handleCopyCommand = () => {
    const cmd = trainingState.download_command || './venv/bin/modal volume get ax-qlora-models ax_model/unsloth.Q4_K_M.gguf ./';
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectDownload = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';
    window.open(`${backendUrl}/api/train/download`, '_blank');
  };

  const handleResetAll = async () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar todo? Esto eliminará la configuración actual, los registros de la terminal y restablecerá el estado para un nuevo proceso.')) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ax-zyxe.onrender.com';
        await fetch(`${backendUrl}/api/train/reset`, { method: 'POST' }).catch(() => null);
      } catch (err) {
        // Silencioso
      }

      setPersonalityText('');
      setPersonalityFile(null);
      setBusinessText('');
      setBusinessFile(null);
      setDataset([]);
      setJsonInput('');
      setModelIndex(0);
      setSelectedModel(PRESET_MODELS[0].id);

      setChatMessages([]);
      setChatInput('');

      setTrainingState({
        status: 'idle',
        progress: 0,
        logs: [],
        error_message: null,
        download_command: null
      });
    }
  };

  if (!mounted || !isAuthenticated) return null;

  return (
    <div suppressHydrationWarning data-theme={theme} style={{ background: theme === 'light' ? '#f5f5f7' : '#000', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      
      {/* Container 100vh matching Panel */}
      <div 
        className="md-container" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          padding: '16px 24px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          zIndex: 10000 
        }}
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Dynamic Background Perspective Floor Grid */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          <div className="md-bg-grid">
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
              <defs>
                <pattern id="floor-grid-trainer" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke={theme === 'light' ? 'rgba(15, 23, 42, 0.15)' : 'rgba(255, 255, 255, 0.04)'} strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#floor-grid-trainer)" />
              {history.map((step, index) => {
                const isCurrent = index === 0;
                const cellColor = theme === 'light' ? '15, 23, 42' : '255, 255, 255';
                const opacityScale = theme === 'light' ? 5 : 1;
                return (
                  <g key={step.id}>
                    {step.neighbors.map((n, i) => (
                      <rect key={i} x={(step.cx + n.dx) * 80} y={(step.cy + n.dy) * 80} width="80" height="80" 
                            fill={`rgba(${cellColor},${isCurrent ? n.opacity * opacityScale : 0})`} style={{ transition: 'fill 1s ease' }} />
                    ))}
                    <rect x={step.cx * 80} y={step.cy * 80} width="80" height="80" 
                          fill={`rgba(${cellColor},${isCurrent ? 0.08 * opacityScale : 0})`} style={{ transition: 'fill 1s ease' }} />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Header Superior - Panel Style */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '8px',
          borderBottom: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.1)',
          height: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link 
              href="/Panel" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '11px', 
                fontWeight: 600, 
                letterSpacing: '0.05em', 
                textTransform: 'uppercase',
                color: theme === 'light' ? '#0f172a' : '#ffffff',
                textDecoration: 'none'
              }}
            >
              &larr; Volver al Panel
            </Link>
            <span style={{ color: theme === 'light' ? '#cbd5e1' : '#334155' }}>|</span>
            <div className="md-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff' }} />
              GLYNNE CORE // MODEL FINE-TUNING STUDIO (QLoRA)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Status Badge */}
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: '4px',
              backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.12)',
              color: theme === 'light' ? '#0f172a' : '#ffffff',
              border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)',
              textTransform: 'uppercase'
            }}>
              {trainingState.status}
            </span>

            {/* Reset / Clear Studio Button */}
            <button
              onClick={handleResetAll}
              title="Limpiar configuración de dataset, logs y chat"
              style={{
                padding: '4px 10px',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: theme === 'light' ? '#0f172a' : '#ffffff',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>LIMPIAR TODO</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="md-theme-toggle-btn"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
                  <span>DARK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Layout Principal - 3 Columnas (Estilo Panel GLYNNE) */}
        <div className="md-main" style={{ display: 'flex', gap: '16px', height: 'calc(100vh - 75px)', overflow: 'hidden' }}>
          
          {/* COLUMNA 1 (IZQUIERDA): CONFIGURACIÓN DE MODELO Y DATASET */}
          <div className="md-left" style={{ width: '380px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '6px' }}>
            
            {/* Sección 1: Selección de Modelo Base (Carrusel) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="md-title" style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
                  1. ARQUITECTURA BASE (MODELOS ABIERTOS)
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, opacity: 0.6, fontFamily: 'monospace' }}>
                  {modelIndex + 1} / {PRESET_MODELS.length}
                </span>
              </div>
              <p style={{ margin: '2px 0 6px 0', fontSize: '10.5px', opacity: 0.75, lineHeight: 1.45, fontWeight: 400 }}>
                Explora y selecciona el modelo fundacional de código abierto que servirá como arquitectura base para el entrenamiento QLoRA.
              </p>
              
              <div style={{
                position: 'relative',
                padding: '14px 16px',
                borderRadius: '8px',
                backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: theme === 'light' ? '0 4px 16px rgba(15, 23, 42, 0.06)' : '0 6px 20px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}>
                {/* Controles del Carrusel (Anterior / Siguiente) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <button
                    type="button"
                    onClick={handlePrevModel}
                    title="Modelo anterior"
                    style={{
                      background: 'transparent',
                      border: theme === 'light' ? '1px solid rgba(15,23,42,0.2)' : '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'light' ? '#0f172a' : '#ffffff',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      lineHeight: 1
                    }}
                  >
                    ‹
                  </button>

                  <span
                    onClick={() => setSelectedModel(PRESET_MODELS[modelIndex].id)}
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      backgroundColor: selectedModel === PRESET_MODELS[modelIndex].id 
                        ? (theme === 'light' ? '#0f172a' : '#ffffff') 
                        : (theme === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.1)'),
                      color: selectedModel === PRESET_MODELS[modelIndex].id 
                        ? (theme === 'light' ? '#ffffff' : '#000000') 
                        : (theme === 'light' ? '#0f172a' : '#ffffff')
                    }}
                  >
                    {selectedModel === PRESET_MODELS[modelIndex].id ? '✓ MODELO SELECCIONADO' : 'USAR ESTE MODELO'}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextModel}
                    title="Siguiente modelo"
                    style={{
                      background: 'transparent',
                      border: theme === 'light' ? '1px solid rgba(15,23,42,0.2)' : '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme === 'light' ? '#0f172a' : '#ffffff',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      lineHeight: 1
                    }}
                  >
                    ›
                  </button>
                </div>

                {/* Tarjeta del Modelo Visble */}
                <div 
                  onClick={() => setSelectedModel(PRESET_MODELS[modelIndex].id)}
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '11.5px', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                      {PRESET_MODELS[modelIndex].name}
                    </span>
                    <span style={{ 
                      fontSize: '8.5px', 
                      fontWeight: 600, 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: theme === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.12)',
                      color: theme === 'light' ? '#0f172a' : '#ffffff'
                    }}>
                      {PRESET_MODELS[modelIndex].speed}
                    </span>
                  </div>

                  <div style={{ fontSize: '9.5px', opacity: 0.8, lineHeight: 1.4, minHeight: '26px', margin: '2px 0' }}>
                    {PRESET_MODELS[modelIndex].desc}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8.5px', opacity: 0.6, fontFamily: 'monospace', paddingTop: '6px', borderTop: theme === 'light' ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)' }}>
                    <span>{PRESET_MODELS[modelIndex].provider}</span>
                    <span>Tamaño: {PRESET_MODELS[modelIndex].size}</span>
                  </div>
                </div>

                {/* Puntos Indicadores del Carrusel */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                  {PRESET_MODELS.map((m, idx) => (
                    <span
                      key={m.id}
                      onClick={() => {
                        setModelIndex(idx);
                        setSelectedModel(m.id);
                      }}
                      style={{
                        width: modelIndex === idx ? '16px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        backgroundColor: modelIndex === idx 
                          ? (theme === 'light' ? '#0f172a' : '#ffffff') 
                          : (theme === 'light' ? 'rgba(15,23,42,0.25)' : 'rgba(255,255,255,0.2)'),
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sección 2: Configuración de Dataset e Inteligencia GROQ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minHeight: 0 }}>
              
              {/* Header de Sección 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="md-title" style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
                    2. CONFIGURACIÓN DE CONOCIMIENTO & AGENTES (GROQ)
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, opacity: 0.6, fontFamily: 'monospace' }}>
                    AUTO SYNTHESIS ACTIVE
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '10.5px', opacity: 0.75, lineHeight: 1.45, fontWeight: 400 }}>
                  Ingresa la personalidad (Sección A) y el conocimiento de tu empresa (Sección B). Los agentes GROQ crearán automáticamente las instrucciones de entrenamiento.
                </p>
              </div>

              {/* MODO GENERADOR AUTOMÁTICO CON AGENTES DE GROQ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                  
                  {/* Bloque A: Personalidad y Rol del Agente */}
                  <div className="md-mini-card" style={{ padding: '12px 14px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                      SECCIÓN A: PERSONALIDAD, NOMBRE Y ROL DEL AGENTE
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Describe el nombre del agente, tono de voz, personalidad, forma de responder (ej. Sofía, tono profesional pero amigable)..."
                      value={personalityText}
                      onChange={(e) => setPersonalityText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        lineHeight: '1.45',
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(0, 0, 0, 0.4)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.1)',
                        resize: 'vertical'
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <label style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '5px 12px',
                        borderRadius: '4px',
                        backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        Subir archivo (.pdf, .md, .txt)
                        <input
                          type="file"
                          accept=".pdf,.md,.txt,.json"
                          onChange={(e) => setPersonalityFile(e.target.files[0] || null)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {personalityFile && (
                        <span style={{ fontSize: '10px', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 600, fontFamily: 'monospace' }}>
                          [Archivo: {personalityFile.name}]
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bloque B: Información del Negocio y Base de Conocimiento */}
                  <div className="md-mini-card" style={{ padding: '12px 14px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                      SECCIÓN B: INFORMACIÓN Y CONOCIMIENTO DEL NEGOCIO
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Escribe o pega aquí toda la información de la empresa: productos, precios, horarios, garantía, servicios, soporte, políticas..."
                      value={businessText}
                      onChange={(e) => setBusinessText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        lineHeight: '1.45',
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(0, 0, 0, 0.4)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.1)',
                        resize: 'vertical'
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <label style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '5px 12px',
                        borderRadius: '4px',
                        backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        Subir archivo (.pdf, .md, .txt)
                        <input
                          type="file"
                          accept=".pdf,.md,.txt,.json"
                          onChange={(e) => setBusinessFile(e.target.files[0] || null)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {businessFile && (
                        <span style={{ fontSize: '10px', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 600, fontFamily: 'monospace' }}>
                          [Archivo: {businessFile.name}]
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Selector de número de ejemplos */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px', margin: '2px 0' }}>
                    <span style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600 }}>Cantidad de pares a generar:</span>
                    <select
                      value={numDatasetExamples}
                      onChange={(e) => setNumDatasetExamples(Number(e.target.value))}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(0, 0, 0, 0.4)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <option value={15}>15 Pares QA (Rápido)</option>
                      <option value={25}>25 Pares QA (Recomendado)</option>
                      <option value={40}>40 Pares QA (Extenso)</option>
                    </select>
                  </div>

                  {/* Botón de Lanzamiento de Agentes de GROQ */}
                  <button
                    onClick={handleGenerateDatasetWithGroq}
                    disabled={isGeneratingDataset}
                    className="md-tool-btn active"
                    style={{
                      justifyContent: 'center',
                      padding: '12px',
                      borderRadius: '6px',
                      backgroundColor: isGeneratingDataset ? (theme === 'light' ? '#64748b' : '#334155') : (theme === 'light' ? '#0f172a' : '#ffffff'),
                      color: theme === 'light' ? '#ffffff' : '#000000',
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: isGeneratingDataset ? 'not-allowed' : 'pointer',
                      marginTop: '4px'
                    }}
                  >
                    {isGeneratingDataset ? (
                      <>
                        <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        AGENTES GROQ ANALIZANDO & SINTETIZANDO DATASET...
                      </>
                    ) : (
                      'GENERAR DATASET INTELIGENTE CON GROQ'
                    )}
                  </button>
                </div>
            </div>

            {/* Botones de Acción (Limpiar + Lanzar) */}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button
                onClick={handleResetAll}
                title="Restablecer configuración, chat y registros"
                style={{
                  padding: '12px',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: theme === 'light' ? '#0f172a' : '#ffffff',
                  border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.25)' : '1px solid rgba(255, 255, 255, 0.25)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                LIMPIAR
              </button>

              <button
                onClick={handleStartTraining}
                disabled={trainingState.status === 'running'}
                className="md-start-btn"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '4px',
                  backgroundColor: trainingState.status === 'running' ? '#6B7280' : theme === 'light' ? '#0f172a' : '#ffffff',
                  color: theme === 'light' ? '#ffffff' : '#000000',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: trainingState.status === 'running' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {trainingState.status === 'running' ? (
                  <>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    ENTRENANDO...
                  </>
                ) : (
                  'INICIAR ENTRENAMIENTO GLYNNE'
                )}
              </button>
            </div>
          </div>

          {/* COLUMNA 2 (CENTRO): PROBADOR DE MODELO (PLAYGROUND CHAT) */}
          <div className="md-terminal" style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', padding: '0', borderRadius: '4px', overflow: 'hidden' }}>
            
            {/* Header Chat */}
            <div className="md-term-header" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="term-dots" style={{ display: 'flex', gap: '6px' }}>
                  <span className="dot red" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot yellow" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot green" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginLeft: '6px' }}>
                  PROBADOR DE MODELO (PLAYGROUND)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: 700, 
                  padding: '2px 6px', 
                  borderRadius: '3px',
                  backgroundColor: trainingState.status === 'completed' 
                    ? (theme === 'light' ? '#0f172a' : '#ffffff') 
                    : (theme === 'light' ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.1)'),
                  color: trainingState.status === 'completed'
                    ? (theme === 'light' ? '#ffffff' : '#000000')
                    : (theme === 'light' ? '#0f172a' : '#ffffff')
                }}>
                  {trainingState.status === 'completed' ? 'MODELO LISTO' : 'MODAL INFERENCE READY'}
                </span>
              </div>
            </div>

            {/* Cuerpo del Chat */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 16px', height: '100%', minHeight: 0 }}>
              
              {/* Info Modelo Seleccionado */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: theme === 'light' ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.8 }}>
                  Modelo Base: <span style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>{selectedModel}</span>
                </div>
                <span style={{ fontSize: '10px', opacity: 0.6 }}>
                  Interacción directa vía Modal GPU
                </span>
              </div>

              {/* Accesos rápidos con preguntas del dataset */}
              {dataset && dataset.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '10px', opacity: 0.6, alignSelf: 'center', whiteSpace: 'nowrap' }}>Sugerencia:</span>
                  {dataset.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChatMessage(item.input)}
                      style={{
                        fontSize: '10px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: theme === 'light' ? '1px solid rgba(15,23,42,0.2)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: 'transparent',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      "{item.input}"
                    </button>
                  ))}
                </div>
              )}

              {/* Área del Chat con animación de posición de Entrada (Estilo AX_chat) */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: chatMessages.length === 0 ? 'center' : 'space-between',
                alignItems: 'center',
                minHeight: 0,
                width: '100%',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>

                {/* Título Centrado Inicial (Fades Out cuando inicia el chat) */}
                <div style={{
                  opacity: chatMessages.length === 0 ? 1 : 0,
                  maxHeight: chatMessages.length === 0 ? '120px' : '0px',
                  pointerEvents: chatMessages.length === 0 ? 'auto' : 'none',
                  overflow: 'hidden',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  textAlign: 'center',
                  marginBottom: chatMessages.length === 0 ? '20px' : '0px'
                }}>
                  <h1 style={{
                    fontSize: '22px',
                    fontWeight: 400,
                    color: theme === 'light' ? '#0f172a' : '#f5f5f7',
                    letterSpacing: '-0.02em',
                    margin: '0 0 6px 0',
                    fontFamily: 'inherit'
                  }}>
                    How can AX GLYNNE help you today?
                  </h1>
                  <p style={{ fontSize: '11px', opacity: 0.6, margin: 0, fontWeight: 300 }}>
                    Escribe tu consulta abajo para probar tu modelo fine-tuned en tiempo real.
                  </p>
                </div>

                {/* Contenedor de Mensajes (Solo visible cuando hay mensajes) */}
                {chatMessages.length > 0 && (
                  <div
                    key="chat-messages-scroll-area"
                    style={{
                      width: '100%',
                      flex: 1,
                      overflowY: 'auto',
                      padding: '8px 4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      minHeight: 0,
                      animation: 'fadeIn 0.4s ease'
                    }}
                  >
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        style={{
                          alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: '85%',
                          padding: msg.sender === 'user' ? '12px 18px' : '12px 16px',
                          borderRadius: '20px',
                          borderBottomRightRadius: msg.sender === 'user' ? '4px' : '20px',
                          borderBottomLeftRadius: msg.sender === 'user' ? '20px' : '4px',
                          fontSize: '13px',
                          lineHeight: 1.6,
                          backgroundColor: msg.sender === 'user' 
                            ? (theme === 'light' ? '#0f172a' : '#f5f5f7') 
                            : (theme === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.08)'),
                          color: msg.sender === 'user'
                            ? (theme === 'light' ? '#ffffff' : '#111111')
                            : (theme === 'light' ? '#0f172a' : '#f5f5f7'),
                          boxShadow: msg.sender === 'user'
                            ? (theme === 'light' ? '0 4px 16px rgba(15,23,42,0.08)' : '0 8px 24px rgba(0,0,0,0.4)')
                            : 'none',
                          border: msg.sender === 'user' ? 'none' : (theme === 'light' ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.1)')
                        }}
                      >
                        <div style={{ fontSize: '9px', opacity: 0.6, marginBottom: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
                          {msg.sender === 'user' ? 'Tú' : 'Modelo GLYNNE'}
                        </div>
                        {msg.text}
                      </div>
                    ))}
                    {isInferring && (
                      <div key="typing-indicator-dot-box" style={{ alignSelf: 'flex-start', padding: '10px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', backgroundColor: theme === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff', borderRadius: '50%', animation: 'typingBounce 1.4s infinite ease-in-out both' }} />
                        <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff', borderRadius: '50%', animation: 'typingBounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }} />
                        <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff', borderRadius: '50%', animation: 'typingBounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }} />
                        <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: '4px' }}>Modelo generando...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}

                {/* Formulario de Entrada Chat (Se desplaza suavemente de la mitad abajo) */}
                <form
                  className="chat-input-form"
                  onSubmit={(e) => { e.preventDefault(); handleSendChatMessage(); }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: chatMessages.length === 0 ? '94%' : '100%',
                    backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(20, 20, 20, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '18px',
                    padding: '12px 14px',
                    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: theme === 'light' ? '0 8px 24px rgba(15, 23, 42, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    marginTop: chatMessages.length === 0 ? '0px' : '10px'
                  }}
                >
                  <textarea
                    className="chat-textarea"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onFocus={() => {
                      if (trainingState.status !== 'completed') {
                        setShowTrainingRequiredModal(true);
                      }
                    }}
                    onClick={() => {
                      if (trainingState.status !== 'completed') {
                        setShowTrainingRequiredModal(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (trainingState.status !== 'completed') {
                          setShowTrainingRequiredModal(true);
                          return;
                        }
                        if (!isInferring && chatInput.trim()) {
                          handleSendChatMessage();
                        }
                      }
                    }}
                    disabled={isInferring}
                    placeholder="Message AX Intelligence Core / Probador de Modelo..."
                    rows={chatMessages.length === 0 ? 2 : 1}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      color: theme === 'light' ? '#0f172a' : '#f5f5f7',
                      width: '100%',
                      padding: '4px',
                      fontWeight: 300,
                      backgroundColor: 'transparent',
                      fontFamily: 'inherit',
                      resize: 'none',
                      lineHeight: 1.5,
                      letterSpacing: '0.01em',
                      transition: 'all 0.4s ease'
                    }}
                  />

                  {/* Toolbar Inferior con Iconos Estilo AX_chat */}
                  <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px',
                    paddingTop: '6px',
                    borderTop: theme === 'light' ? '1px solid rgba(15,23,42,0.06)' : '1px solid rgba(255,255,255,0.06)'
                  }}>
                    {/* Herramientas Izquierda (Adjuntar, AX Voice Pill) */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        type="button"
                        title="Adjuntar documento"
                        style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: theme === 'light' ? '#64748b' : '#a1a1a6', display: 'flex', opacity: 0.8 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                      </button>

                      <div 
                        style={{ 
                          background: theme === 'light' ? 'rgba(15,23,42,0.06)' : '#2c2c2e', 
                          border: theme === 'light' ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.05)',
                          height: '22px',
                          padding: '0 8px 0 22px',
                          borderRadius: '12px',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: theme === 'light' ? '#0f172a' : '#8e8e93',
                          letterSpacing: '0.02em',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                          position: 'absolute',
                          left: '3px'
                        }} />
                        AX Voice
                      </div>
                    </div>

                    {/* Herramientas Derecha (Micrófono + Botón Circular Enviar) */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        type="button"
                        title="Entrada por voz"
                        style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: theme === 'light' ? '#64748b' : '#a1a1a6', display: 'flex', opacity: 0.8 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                      </button>

                      <button
                        type="submit"
                        disabled={isInferring || !chatInput.trim()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          backgroundColor: chatInput.trim() && !isInferring
                            ? (theme === 'light' ? '#0f172a' : '#ffffff') 
                            : (theme === 'light' ? '#cbd5e1' : '#3a3a3c'),
                          borderRadius: '50%',
                          color: chatInput.trim() && !isInferring
                            ? (theme === 'light' ? '#ffffff' : '#111111') 
                            : (theme === 'light' ? '#64748b' : '#8e8e93'),
                          cursor: chatInput.trim() && !isInferring ? 'pointer' : 'default',
                          border: 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-0.5px)' }}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>

          {/* COLUMNA 3 (DERECHA): TERMINAL STUDIO & GPU LOGS */}
          <div className="md-terminal" style={{ width: '400px', height: '100%', display: 'flex', flexDirection: 'column', padding: '0', borderRadius: '4px', overflow: 'hidden' }}>
            
            {/* Header Terminal */}
            <div className="md-term-header" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="term-dots" style={{ display: 'flex', gap: '6px' }}>
                  <span className="dot red" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot yellow" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot green" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginLeft: '6px' }}>
                  TERMINAL STUDIO & REGISTROS
                </span>
              </div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', opacity: 0.7 }}>
                PROGRESS: {trainingState.progress || 0}%
              </span>
            </div>

            {/* Barra de Progreso */}
            <div className="md-loading-bar-container" style={{ height: '3px', borderRadius: 0 }}>
              <div 
                className="md-loading-bar-fill"
                style={{ 
                  width: `${trainingState.progress || 0}%`, 
                  transition: 'width 0.4s ease',
                  backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff' 
                }} 
              />
            </div>

            {/* Cuerpo Terminal & Logs (55% Alto) */}
            <div style={{ height: '55%', minHeight: '200px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="md-term-body" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.5 }}>
                {!trainingState.logs || trainingState.logs.length === 0 ? (
                  <div style={{ opacity: 0.5, fontStyle: 'italic' }}>
                    Esperando orden de inicio... Presiona "INICIAR ENTRENAMIENTO GLYNNE" para conectar con los servidores GPU de Modal.
                  </div>
                ) : (
                  trainingState.logs.map((logLine, idx) => (
                    <div key={`log-${idx}`} style={{ marginBottom: '2px', wordBreak: 'break-word' }}>
                      <span style={{ 
                        color: logLine.includes('ERROR') || logLine.includes('EXCEPTION') 
                          ? (theme === 'light' ? '#0f172a' : '#ffffff') 
                          : (theme === 'light' ? '#0f172a' : '#cbd5e1') 
                      }}>
                        {logLine}
                      </span>
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>

              {/* Caja de Éxito y Descarga de Modelo */}
              {trainingState.status === 'completed' && (
                <div key="terminal-completed-download-card" style={{
                  padding: '8px 12px',
                  borderTop: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#ffffff', fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    ¡Modelo .GGUF entrenado y listo!
                  </div>

                  <button
                    onClick={handleDirectDownload}
                    className="md-start-btn"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                      color: theme === 'light' ? '#ffffff' : '#000000',
                      fontWeight: 700,
                      fontSize: '11px',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Descargar Modelo .GGUF a tu Equipo
                  </button>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(0, 0, 0, 0.4)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    overflowX: 'auto'
                  }}>
                    <span>{trainingState.download_command || './venv/bin/modal volume get ax-qlora-models ax_model/unsloth.Q4_K_M.gguf ./'}</span>
                    <button
                      onClick={handleCopyCommand}
                      style={{
                        marginLeft: 'auto',
                        padding: '2px 6px',
                        backgroundColor: copied ? (theme === 'light' ? '#475569' : '#cbd5e1') : (theme === 'light' ? '#0f172a' : '#334155'),
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '9px'
                      }}
                    >
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sección Iluminación / Accesos Rápidos (55% Alto - Alta Visibilidad) */}
            <div style={{
              flex: 1,
              padding: '14px 16px',
              borderTop: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.03)' : 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', color: theme === 'light' ? '#0f172a' : '#ffffff', textTransform: 'uppercase' }}>
                  Navegación & Accesos Directos (Iluminación)
                </span>
                <span style={{ fontSize: '10px', opacity: 0.5, fontFamily: 'monospace' }}>AX_PORTAL</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
                <a
                  href="https://axglynne.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: theme === 'light' ? '#0f172a' : '#ffffff',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(15,23,42,0.04)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>Spot</span>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff' }} />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Lugar</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Visite nuestra página de inicio</div>
                  </div>
                </a>

                <a
                  href="https://axglynne.com/About"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: theme === 'light' ? '#0f172a' : '#ffffff',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(15,23,42,0.04)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>Area</span>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff' }} />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Área</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Descubre en qué se especializa GLYNNE</div>
                  </div>
                </a>

                <a
                  href="https://axglynne.com/Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: theme === 'light' ? '#0f172a' : '#ffffff',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(15,23,42,0.04)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>Target</span>
                    <span style={{ fontSize: '14px', lineHeight: 1, fontWeight: 700 }}>&#x2199;</span>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Objetivo</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Descubre cómo modernizamos tu empresa</div>
                  </div>
                </a>

                <a
                  href="https://axglynne.com/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: theme === 'light' ? '#0f172a' : '#ffffff',
                    boxShadow: theme === 'light' ? '0 2px 8px rgba(15,23,42,0.04)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>Sun</span>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: theme === 'light' ? '2px solid #0f172a' : '2px solid #ffffff' }} />
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Sol</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Lea nuestros términos de servicio</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Modals Container */}
      <div key="modals-portal-wrapper">
        {/* Modal Advertencia: Entrenamiento del Modelo Requerido */}
        {showTrainingRequiredModal && (
          <div key="modal-training-required-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div key="modal-training-required-card" style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: theme === 'light' ? '#ffffff' : '#141414',
              color: theme === 'light' ? '#0f172a' : '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: theme === 'light' ? '0 20px 40px rgba(0, 0, 0, 0.15)' : '0 25px 50px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                color: theme === 'light' ? '#0f172a' : '#ffffff'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                  Entrenamiento del Modelo Requerido
                </h3>
                <p style={{ margin: 0, fontSize: '12.5px', opacity: 0.8, lineHeight: 1.5 }}>
                  Para probar las respuestas de tu modelo en el chat en tiempo real, primero debes completar el proceso de gestión de datos en la <strong>Sección A</strong> y <strong>Sección B</strong> e iniciar el entrenamiento del modelo.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowTrainingRequiredModal(false)}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: '6px',
                    backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                    color: theme === 'light' ? '#ffffff' : '#000000',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Entendido / Configurar Datos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Vista Previa: Dataset Sintético Generado por GROQ */}
        {showDatasetPreviewModal && (
          <div key="modal-dataset-preview-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <div key="modal-dataset-preview-card" style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
              color: theme === 'light' ? '#0f172a' : '#ffffff',
              borderRadius: '14px',
              padding: '24px',
              border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: theme === 'light' ? '0 25px 50px rgba(0, 0, 0, 0.15)' : '0 30px 60px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflow: 'hidden'
            }}>
              {/* Header del Modal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '12px', borderBottom: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                      Dataset Sintético Generado por Agentes GROQ
                    </h3>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                      color: theme === 'light' ? '#ffffff' : '#000000',
                      fontFamily: 'monospace'
                    }}>
                      {dataset.length} PARES QA
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', opacity: 0.75, lineHeight: 1.4 }}>
                    Estos son los datos de entrenamiento sintetizados que aprenderá tu modelo fine-tuned.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDatasetPreviewModal(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    color: theme === 'light' ? '#0f172a' : '#ffffff',
                    opacity: 0.6,
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Cuerpo con Lista Escroleable de Pares QA */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                paddingRight: '6px'
              }}>
                {dataset.map((item, idx) => (
                  <div key={`qa-preview-item-${idx}`} style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)',
                    border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, opacity: 0.5, fontFamily: 'monospace' }}>
                        PAR #{idx + 1}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Pregunta del Cliente (Input):
                      </span>
                      <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                        "{item.input}"
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Respuesta del Modelo (Output):
                      </span>
                      <div style={{ fontSize: '11.5px', opacity: 0.85, marginTop: '2px', lineHeight: 1.45 }}>
                        {item.output}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer con Botón de Confirmación */}
              <div style={{
                display: 'flex',
                gap: '10px',
                paddingTop: '12px',
                borderTop: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <button
                  type="button"
                  onClick={() => setShowDatasetPreviewModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '6px',
                    backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                    color: theme === 'light' ? '#ffffff' : '#000000',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  ✓ Aceptar Dataset e Iniciar Entrenamiento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
