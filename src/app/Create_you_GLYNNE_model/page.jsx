'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import { useTheme } from '@/lib/ThemeContext';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import '@/app/Panel/components/AssemblyDashboard.css';

const PRESET_MODELS = [
  {
    id: 'unsloth/Qwen2.5-0.5B-Instruct',
    name: 'Qwen 2.5 (0.5B Instruct)',
    provider: 'Alibaba Cloud / Unsloth',
    speed: 'Ultra Fast',
    size: '500 MB',
    desc: 'Ideal for rapid testing, concise responses, and low-latency chatbots.'
  },
  {
    id: 'unsloth/Qwen2.5-1.5B-Instruct',
    name: 'Qwen 2.5 (1.5B Instruct)',
    provider: 'Alibaba Cloud / Unsloth',
    speed: 'Balanced',
    size: '1.5 GB',
    desc: 'Great balance between speed and advanced reasoning for customer support.'
  },
  {
    id: 'unsloth/Llama-3.2-1B-Instruct',
    name: 'Llama 3.2 (1B Instruct)',
    provider: 'Meta / Unsloth',
    speed: 'Very Fast',
    size: '1.2 GB',
    desc: 'Official compact Meta model optimized for structured instruction following.'
  },
  {
    id: 'unsloth/Phi-3.5-mini-instruct',
    name: 'Phi 3.5 Mini (3.8B Instruct)',
    provider: 'Microsoft / Unsloth',
    speed: 'High Precision',
    size: '3.8 GB',
    desc: 'Recommended for complex logic, data extraction, and heavy reasoning tasks.'
  }
];

const DEFAULT_DATASET = [
  {
    instruction: "You are a friendly and professional customer support virtual assistant.",
    input: "What time does the store open?",
    output: "Our business hours are Monday through Friday from 9:00 AM to 6:00 PM."
  },
  {
    instruction: "You are a friendly and professional customer support virtual assistant.",
    input: "What services does the platform offer?",
    output: "We offer intelligent voice agents, automated chat, model fine-tuning, and custom AI enterprise solutions."
  },
  {
    instruction: "You are a friendly and professional customer support virtual assistant.",
    input: "What is your main function?",
    output: "I am an artificial intelligence assistant designed to handle inquiries, answer questions, and assist customers quickly and concisely."
  },
  {
    instruction: "You are a friendly and professional customer support virtual assistant.",
    input: "What is the business about?",
    output: "We are an AI platform specializing in building, training, and deploying private models and conversational agents."
  }
];

export default function CreateYourGlynneModelPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Intro Loading & Welcome Animation States
  const [userEmail, setUserEmail] = useState('');
  const [introFinished, setIntroFinished] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [introLogs, setIntroLogs] = useState([]);
  const [introStage, setIntroStage] = useState('initializing'); // 'initializing' | 'verifying' | 'ready'
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
        setUserEmail(user.email || 'usuario@axglynne.com');
      }
    };
    checkAuth();
  }, [router]);

  // Loading animation sequence effect
  useEffect(() => {
    if (!isAuthenticated) return;

    const logMessages = [
      { time: 100, text: 'INITIALIZING GLYNNE AI TRAINER NODE & ENVIRONMENT...', progress: 15 },
      { time: 450, text: 'Establishing secure WebSockets link with H100 GPU cluster...', progress: 35 },
      { time: 900, text: 'Allocating VRAM memory buffers (NF4 4-bit Matrix active)...', progress: 55 },
      { time: 1350, text: 'Verifying Supabase Vector DB storage & RLS tokens...', progress: 70 },
      { time: 1800, text: 'Loading Unsloth kernels for ultra-fast QLoRA adapters...', progress: 85 },
      { time: 2250, text: 'Base models ready: Qwen 2.5, Llama 3.2, Phi 3.5 mini.', progress: 95 },
      { time: 2700, text: 'Diagnostic 100% complete. Environment ready for production.', progress: 100 }
    ];

    let timeouts = [];

    logMessages.forEach((item) => {
      const t = setTimeout(() => {
        setIntroLogs((prev) => [...prev, item.text]);
        setIntroProgress(item.progress);

        if (item.progress >= 50 && item.progress < 100) {
          setIntroStage('verifying');
        } else if (item.progress === 100) {
          setIntroStage('ready');
        }
      }, item.time);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isAuthenticated]);

  const handleLaunchStudio = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIntroFinished(true);
    }, 600);
  };

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
      alert('Please enter personality or business information, or attach a file (.pdf / .md / .txt).');
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
        alert(`Error generating dataset with GROQ: ${data.detail || data.message || 'Invalid server response.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Could not connect to GLYNNE_LOGIC_2026 server to generate dataset.');
    } finally {
      setIsGeneratingDataset(false);
    }
  };
  const stepIdRef = useRef(0);
  const lastCellRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Polling training status from GLYNNE_LOGIC_2026
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
        // Silent
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
        logs: ['[CLIENT] Dispatching training job to GLYNNE CORE (https://ax-zyxe.onrender.com)...']
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
        // Started in background
      } else if (data.message) {
        alert(data.message);
      }
    } catch (err) {
      setTrainingState(prev => ({
        ...prev,
        status: 'error',
        error_message: 'Could not connect to GLYNNE_LOGIC_2026 server on Render (https://ax-zyxe.onrender.com).'
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
          instruction: dataset[0]?.instruction || 'Answer customer inquiries.'
        })
      });
      const data = await res.json();
      setChatMessages([
        ...newMessages,
        { sender: 'model', text: data.response || 'Response generated by model.' }
      ]);
    } catch (err) {
      setChatMessages([
        ...newMessages,
        { sender: 'model', text: 'Error connecting to model inference server.' }
      ]);
    } finally {
      setIsInferring(false);
    }
  };

  const handleAddRow = () => {
    setDataset([
      ...dataset,
      { instruction: "Sample instruction", input: "User question", output: "Expected answer" }
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
        alert('JSON must be an array of objects with instruction, input, and output.');
      }
    } catch (e) {
      alert('Invalid JSON syntax. Please check your formatting.');
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
    if (window.confirm('Are you sure you want to reset everything? This will clear current settings, terminal logs, and reset state for a new session.')) {
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
    <BackgroundWrapper theme={theme}>
      <div data-theme={theme} style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative', backgroundColor: theme === 'light' ? '#f8f9fc' : '#000000' }}>
      
      {/* Intro Loading & Welcome Sequence Overlay (Reveals Interactive Grid Background) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: introFinished ? -1 : 99999,
          backgroundColor: theme === 'light' ? 'rgba(245, 245, 247, 0.82)' : 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          color: theme === 'light' ? '#111111' : '#ffffff',
          display: introFinished ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isLaunching ? 'scale(1.04)' : 'scale(1)',
          opacity: isLaunching ? 0 : 1,
          pointerEvents: (isLaunching || introFinished) ? 'none' : 'auto'
        }}
      >

        {/* Foreground Intro Content (Floats above interactive Gravity Canvas) */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', pointerEvents: 'none' }}>
          {/* Central Monochromatic Spinning Neural Ring */}
          <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '32px' }}>
          {/* Outer Spinning Ring */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: 'spinSlow 14s linear infinite'
            }}
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}
              strokeWidth="1.5"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={theme === 'light' ? '#111111' : '#ffffff'}
              strokeWidth="2"
              strokeDasharray="60 210"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner Counter Spinning Ring */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: '16px',
              width: 'calc(100% - 32px)',
              height: 'calc(100% - 32px)',
              animation: 'spinReverse 9s linear infinite'
            }}
          >
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke={theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'}
              strokeWidth="1.5"
            />
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke={theme === 'light' ? '#333333' : '#a1a1aa'}
              strokeWidth="2"
              strokeDasharray="35 150"
              strokeLinecap="round"
            />
          </svg>

          {/* Glowing Monochromatic Core */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulseCoreMonochrome 3s ease-in-out infinite'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)',
              border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <img
                src="/logos/GLYNNE.svg"
                alt="GLYNNE Logo"
                style={{
                  width: '28px',
                  height: '28px',
                  filter: 'brightness(0) invert(1)',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>

        {/* Title & Stage Header */}
        <div style={{ textAlign: 'center', maxWidth: '580px', marginBottom: '28px', animation: 'fadeInUpMonochrome 0.5s ease' }}>
          {introStage !== 'ready' && (
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme === 'light' ? '#111111' : '#ffffff',
              backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
              padding: '6px 16px',
              borderRadius: '999px',
              border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)',
              display: 'inline-block',
              marginBottom: '16px',
              transition: 'all 0.3s ease'
            }}>
              {introStage === 'initializing' ? 'PHASE 1 — INITIALIZING NODE & VRAM' : 'PHASE 2 — VERIFYING KERNELS & DATASETS'}
            </span>
          )}

          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 500,
            letterSpacing: introStage === 'ready' ? '0.14em' : '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 12px 0',
            color: theme === 'light' ? '#111111' : '#ffffff',
            transition: 'letter-spacing 0.3s ease'
          }}>
            {introStage === 'ready' ? 'GLYNNE AI STUDIO' : 'Loading Adaptation Environment'}
          </h1>

          <p style={{ fontSize: '15px', color: '#86868b', fontWeight: 300, margin: 0, lineHeight: 1.5 }}>
            {introStage === 'ready' 
              ? 'Re-train and adapt AI models tailored to your exact enterprise needs.'
              : 'Connecting to inference infrastructure & verifying credentials'
            }
          </p>
        </div>

        {/* Minimal Monochromatic Terminal Console */}
        <div style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(18, 18, 20, 0.7)',
          backdropFilter: 'blur(20px)',
          border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '18px 22px',
          marginBottom: '28px',
          boxShadow: theme === 'light' ? '0 10px 30px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }} />
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#86868b', letterSpacing: '0.05em' }}>
              DIAGNOSTIC_TERMINAL // V2.4
            </span>
          </div>

          <div style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: '12px',
            color: theme === 'light' ? '#333333' : '#d4d4d8',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            minHeight: '110px',
            maxHeight: '130px',
            overflowY: 'auto'
          }}>
            {introLogs.map((log, index) => (
              <div key={`intro-log-${index}`} style={{ opacity: index === introLogs.length - 1 ? 1 : 0.5, transition: 'opacity 0.2s ease' }}>
                {log}
              </div>
            ))}
            <span style={{
              display: introStage !== 'ready' ? 'inline-block' : 'none',
              animation: 'blinkCursorMonochrome 1s infinite',
              color: theme === 'light' ? '#111' : '#fff'
            }}>▋</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div style={{ width: '100%', maxWidth: '580px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 500, color: '#86868b', marginBottom: '8px' }}>
            <span>PROGRESS</span>
            <span style={{ color: theme === 'light' ? '#111' : '#fff', fontWeight: 600 }}>{introProgress}%</span>
          </div>
          <div style={{
            height: '4px',
            width: '100%',
            backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${introProgress}%`,
              backgroundColor: theme === 'light' ? '#111111' : '#ffffff',
              borderRadius: '999px',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          </div>
        </div>

        {/* Action Launch Button Container (Always mounted in DOM to prevent React Fiber removeChild errors) */}
        <div style={{
          textAlign: 'center',
          opacity: introStage === 'ready' ? 1 : 0,
          visibility: introStage === 'ready' ? 'visible' : 'hidden',
          pointerEvents: introStage === 'ready' ? 'auto' : 'none',
          transition: 'opacity 0.4s ease, visibility 0.4s ease'
        }}>
          {userEmail && (
            <div style={{ fontSize: '13px', color: '#86868b', marginBottom: '16px', fontWeight: 400 }}>
              Verified session: <span style={{ color: theme === 'light' ? '#111' : '#fff' }}>{userEmail}</span>
            </div>
          )}
          <button
            onClick={handleLaunchStudio}
            style={{
              padding: '16px 36px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: theme === 'light' ? '#111111' : '#ffffff',
              color: theme === 'light' ? '#ffffff' : '#111111',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Enter Training Studio</span>
            <span style={{ fontSize: '16px' }}>→</span>
          </button>
        </div>
        </div>
      </div>

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
      >

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
              &larr; Back to Dashboard
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
              title="Clear dataset settings, logs, and chat"
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
              <span>CLEAR ALL</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="md-theme-toggle-btn"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                  <span>LIGHT</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" /></svg>
                  <span>DARK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Layout - 3 Columns (GLYNNE Panel Style) */}
        <div className="md-main" style={{ display: 'flex', gap: '16px', height: 'calc(100vh - 75px)', overflow: 'hidden' }}>

          {/* COLUMN 1 (LEFT): MODEL ARCHITECTURE & DATASET CONFIGURATION */}
          <div className="md-left" style={{ width: '380px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '6px' }}>

            {/* Section 1: Base Model Architecture (Carousel) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="md-title" style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
                  1. BASE ARCHITECTURE (OPEN MODELS)
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, opacity: 0.6, fontFamily: 'monospace' }}>
                  {modelIndex + 1} / {PRESET_MODELS.length}
                </span>
              </div>
              <p style={{ margin: '2px 0 6px 0', fontSize: '10.5px', opacity: 0.75, lineHeight: 1.45, fontWeight: 400 }}>
                Explore and select the open-source foundational model that will serve as the base architecture for QLoRA fine-tuning.
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
                {/* Carousel Controls (Previous / Next) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <button
                    type="button"
                    onClick={handlePrevModel}
                    title="Previous model"
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
                    {selectedModel === PRESET_MODELS[modelIndex].id ? '✓ MODEL SELECTED' : 'USE THIS MODEL'}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextModel}
                    title="Next model"
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

                {/* Visible Model Card */}
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
                    <span>Size: {PRESET_MODELS[modelIndex].size}</span>
                  </div>
                </div>

                {/* Carousel Indicator Dots */}
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

            {/* Section 2: Knowledge & GROQ Agent Configuration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minHeight: 0 }}>

              {/* Section 2 Header */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="md-title" style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
                    2. KNOWLEDGE & AGENT CONFIGURATION (GROQ)
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, opacity: 0.6, fontFamily: 'monospace' }}>
                    AUTO SYNTHESIS ACTIVE
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '10.5px', opacity: 0.75, lineHeight: 1.45, fontWeight: 400 }}>
                  Enter personality details (Section A) and business knowledge (Section B). GROQ agents will automatically synthesize training instructions.
                </p>
              </div>

              {/* AUTOMATIC GENERATOR WITH GROQ AGENTS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>

                {/* Block A: Agent Personality and Role */}
                <div className="md-mini-card" style={{ padding: '12px 14px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                    SECTION A: AGENT PERSONALITY, NAME & ROLE
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Describe agent name, tone of voice, personality, response style (e.g. Sophia, professional yet friendly tone)..."
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
                      Upload file (.pdf, .md, .txt)
                      <input
                        type="file"
                        accept=".pdf,.md,.txt,.json"
                        onChange={(e) => setPersonalityFile(e.target.files[0] || null)}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {personalityFile && (
                      <span style={{ fontSize: '10px', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 600, fontFamily: 'monospace' }}>
                        [File: {personalityFile.name}]
                      </span>
                    )}
                  </div>
                </div>

                {/* Block B: Business Information and Knowledge Base */}
                <div className="md-mini-card" style={{ padding: '12px 14px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                    SECTION B: BUSINESS KNOWLEDGE & INFORMATION
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Write or paste all company details here: products, pricing, hours, warranty, services, support, policies..."
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
                      Upload file (.pdf, .md, .txt)
                      <input
                        type="file"
                        accept=".pdf,.md,.txt,.json"
                        onChange={(e) => setBusinessFile(e.target.files[0] || null)}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {businessFile && (
                      <span style={{ fontSize: '10px', color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 600, fontFamily: 'monospace' }}>
                        [File: {businessFile.name}]
                      </span>
                    )}
                  </div>
                </div>

                {/* Example count selector */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px', margin: '2px 0' }}>
                  <span style={{ fontSize: '10px', opacity: 0.8, fontWeight: 600 }}>Pairs to generate:</span>
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
                    <option value={15}>15 QA Pairs (Fast)</option>
                    <option value={25}>25 QA Pairs (Recommended)</option>
                    <option value={40}>40 QA Pairs (Extensive)</option>
                  </select>
                </div>

                {/* GROQ Agent Launch Button */}
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
                    <span key="groq-btn-loading" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      GROQ AGENTS ANALYZING & SYNTHESIZING DATASET...
                    </span>
                  ) : (
                    <span key="groq-btn-idle">GENERATE SMART DATASET WITH GROQ</span>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons (Clear + Launch) */}
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button
                onClick={handleResetAll}
                title="Reset settings, chat, and logs"
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
                CLEAR
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
                  <span key="train-btn-running" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    TRAINING...
                  </span>
                ) : (
                  <span key="train-btn-idle">START GLYNNE FINE-TUNING</span>
                )}
              </button>
            </div>
          </div>

          {/* COLUMN 2 (CENTER): MODEL TESTER (PLAYGROUND CHAT) */}
          <div className="md-terminal" style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', padding: '0', borderRadius: '4px', overflow: 'hidden' }}>

            {/* Chat Header */}
            <div className="md-term-header" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="term-dots" style={{ display: 'flex', gap: '6px' }}>
                  <span className="dot red" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot yellow" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot green" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginLeft: '6px' }}>
                  MODEL TESTER (PLAYGROUND)
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
                  {trainingState.status === 'completed' ? 'MODEL READY' : 'MODAL INFERENCE READY'}
                </span>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 16px', height: '100%', minHeight: 0 }}>

              {/* Selected Model Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: theme === 'light' ? '1px solid rgba(15,23,42,0.1)' : '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.8 }}>
                  Base Model: <span style={{ color: theme === 'light' ? '#0f172a' : '#ffffff', fontWeight: 700 }}>{selectedModel}</span>
                </div>
                <span style={{ fontSize: '10px', opacity: 0.6 }}>
                  Direct Modal GPU inference
                </span>
              </div>

              {/* Quick Suggestions from Dataset */}
              {dataset && dataset.length > 0 && (
                <div key="dataset-suggestions-container" style={{ display: 'flex', gap: '6px', marginBottom: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '10px', opacity: 0.6, alignSelf: 'center', whiteSpace: 'nowrap' }}>Suggestion:</span>
                  {dataset.map((item, idx) => (
                    <button
                      key={`dataset-sug-${idx}-${(item.input || '').slice(0, 15)}`}
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

              {/* Chat Area with Input Transition Animation */}
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

                {/* Initial Centered Title */}
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
                    Enter your query below to test your fine-tuned model in real-time.
                  </p>
                </div>

                {/* Message Container */}
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
                        key={`chat-msg-${idx}-${msg.sender}`}
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
                          {msg.sender === 'user' ? 'You' : 'GLYNNE Model'}
                        </div>
                        {msg.text}
                      </div>
                    ))}
                    {isInferring && (
                      <div key="typing-indicator-dot-box" style={{ alignSelf: 'flex-start', padding: '10px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', backgroundColor: theme === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff', borderRadius: '50%', animation: 'typingBounce 1.4s infinite ease-in-out both' }} />
                        <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff', borderRadius: '50%', animation: 'typingBounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }} />
                        <div className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff', borderRadius: '50%', animation: 'typingBounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }} />
                        <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: '4px' }}>Model generating...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                )}

                {/* Chat Input Form */}
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
                    placeholder="Message AX Intelligence Core / Model Tester..."
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

                  {/* Bottom Toolbar */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px',
                    paddingTop: '6px',
                    borderTop: theme === 'light' ? '1px solid rgba(15,23,42,0.06)' : '1px solid rgba(255,255,255,0.06)'
                  }}>
                    {/* Left Tools (Attach, AX Voice Pill) */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        type="button"
                        title="Attach document"
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

                    {/* Right Tools (Voice Input + Circular Send Button) */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        type="button"
                        title="Voice input"
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

          {/* COLUMN 3 (RIGHT): TERMINAL STUDIO & GPU LOGS */}
          <div className="md-terminal" style={{ width: '400px', height: '100%', display: 'flex', flexDirection: 'column', padding: '0', borderRadius: '4px', overflow: 'hidden' }}>

            {/* Terminal Header */}
            <div className="md-term-header" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="term-dots" style={{ display: 'flex', gap: '6px' }}>
                  <span className="dot red" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot yellow" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                  <span className="dot green" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', marginLeft: '6px' }}>
                  TERMINAL STUDIO & LOGS
                </span>
              </div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', opacity: 0.7 }}>
                PROGRESS: {trainingState.progress || 0}%
              </span>
            </div>

            {/* Progress Bar */}
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

            {/* Terminal Body & Logs (55% Height) */}
            <div style={{ height: '55%', minHeight: '200px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="md-term-body" style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.5 }}>
                {!trainingState.logs || trainingState.logs.length === 0 ? (
                  <div style={{ opacity: 0.5, fontStyle: 'italic' }}>
                    Awaiting launch command... Click "START GLYNNE FINE-TUNING" to connect to Modal GPU servers.
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

              {/* Success Box & Model Download */}
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
                    .GGUF Model Trained & Ready!
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
                    Download .GGUF Model to Your Machine
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
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Access & Navigation Shortcuts */}
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
                  Navigation & Quick Access
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
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Location</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Visit our homepage</div>
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
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Focus</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Discover GLYNNE specialized domains</div>
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
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Mission</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Discover how we modernize your business</div>
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
                    <div style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9 }}>Terms</div>
                    <div style={{ fontSize: '9.5px', opacity: 0.65, lineHeight: 1.35, marginTop: '2px' }}>Read our terms of service</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Modals Container */}
      <div key="modals-portal-wrapper">
        {/* Warning Modal: Model Training Required */}
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
                  Model Training Required
                </h3>
                <p style={{ margin: 0, fontSize: '12.5px', opacity: 0.8, lineHeight: 1.5 }}>
                  To test your model responses in real-time chat, please complete the data configuration in <strong>Section A</strong> and <strong>Section B</strong> and start model fine-tuning.
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
                  Got it / Configure Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal: Synthetic Dataset Generated by GROQ */}
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
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '12px', borderBottom: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                      Synthetic Dataset Generated by GROQ Agents
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
                      {dataset.length} QA PAIRS
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', opacity: 0.75, lineHeight: 1.4 }}>
                    These are the synthesized training examples that your fine-tuned model will learn.
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

              {/* Scrollable QA Pairs List */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                paddingRight: '6px'
              }}>
                {dataset.map((item, idx) => (
                  <div key={`qa-preview-item-${idx}-${(item.input || '').slice(0, 15)}`} style={{
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
                        PAIR #{idx + 1}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Customer Query (Input):
                      </span>
                      <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px', color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                        "{item.input}"
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Model Response (Output):
                      </span>
                      <div style={{ fontSize: '11.5px', opacity: 0.85, marginTop: '2px', lineHeight: 1.45 }}>
                        {item.output}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Confirmation Button */}
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
                  ✓ Accept Dataset & Start Fine-Tuning
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </BackgroundWrapper>
);
}
