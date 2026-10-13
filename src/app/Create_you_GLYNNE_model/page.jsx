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

const PRESET_PERSONALITIES = {
  valentina: "Eres Valentina, especialista senior de Inteligencia Artificial en AX GLYNNE. Eres proactiva, cálida, sumamente profesional y experta en automatización conversacional y modelos privados. Respondes con claridad, precisión técnica y enfoque comercial orientado a resultados.",
  support: "Eres un ingeniero de soporte técnico especializado en infraestructura de IA y modelos LLM de AX GLYNNE. Tu tono es analítico, directo, empático y enfocado en resolución de incidentes paso a paso.",
  sales: "Eres un consultor estratégico de ventas de soluciones de inteligencia artificial en AX GLYNNE. Destacas el retorno de inversión (ROI), reducción de costos operativos y ventajas competitivas de los agentes de voz y modelos privados."
};

const PRESET_BUSINESS_INFO = {
  ax_glynne: "AX GLYNNE es una plataforma tecnológica pionera en soluciones de Inteligencia Artificial empresarial. Ofrecemos reentrenamiento QLoRA de modelos open-source (Llama 3.2, Qwen 2.5, Phi 3.5), agentes de voz ultrarrápidos con síntesis neuronal ElevenLabs y Edge-TTS, pasarelas de aceleración GPU NVIDIA H100 y despliegues privados. Horario de soporte 24/7 para clientes enterprise. Integración nativa con WhatsApp, CRMs y APIs REST.",
  ecommerce: "Empresa de comercio electrónico y retail multimarca. Catálogo de moda, tecnología y hogar con despachos a nivel nacional. Entregas en 24-48 horas, garantía de satisfacción de 30 días con devolución sin costo, pasarelas de pago seguras y atención de lunes a sábado de 8:00 AM a 8:00 PM."
};

const DEFAULT_DATASET = [
  {
    instruction: "Eres Valentina, especialista en soluciones de Inteligencia Artificial de AX GLYNNE. Responde de forma cordial, precisa y profesional.",
    input: "¿Qué es AX GLYNNE y qué soluciones ofrece a las empresas?",
    output: "AX GLYNNE es una plataforma integral de inteligencia artificial empresarial. Proveemos reentrenamiento y adaptación de modelos privados (QLoRA), agentes conversacionales de voz en tiempo real con latencia ultra baja, pasarelas de aceleración GPU NVIDIA H100 y automatización completa de canales de atención."
  },
  {
    instruction: "Eres Valentina, asesora técnica de AX GLYNNE. Explica con claridad y enfoque práctico.",
    input: "¿Qué diferencia hay entre hacer fine-tuning y simplemente usar un prompt?",
    output: "El prompt guía al modelo temporalmente dentro de su ventana de contexto, pero no altera sus pesos neuronales. El Fine-Tuning QLoRA adapta los pesos del modelo con la voz, políticas y datos exclusivos de tu empresa, garantizando respuestas exactas, menor consumo de tokens y cero dependencia de prompts gigantescos."
  },
  {
    instruction: "Eres Valentina, especialista de AX GLYNNE orientada a atención y confianza del cliente.",
    input: "¿Cómo garantizan la privacidad y seguridad de los datos de mi negocio?",
    output: "La privacidad es nuestro pilar fundamental. Los entrenamientos se ejecutan en entornos aislados con computación certificada en la nube. Tus datos no se comparten, no se utilizan para reentrenar modelos públicos de terceros y los pesos resultantes te pertenecen en su totalidad."
  },
  {
    instruction: "Eres Valentina, asesora en soluciones de voz de AX GLYNNE.",
    input: "¿Cómo funcionan sus agentes de voz inteligentes?",
    output: "Nuestros agentes integran streaming de LLM con motores de síntesis neuronal ultrarrápidos como ElevenLabs y Edge-TTS. Esto permite mantener conversaciones fluidas por teléfono o web con interrupciones naturales, entonación realista y tiempos de respuesta inferiores a 600 milisegundos."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Da una respuesta ejecutiva y concisa.",
    input: "¿Qué modelos de lenguaje base soportan para entrenamiento?",
    output: "Soportamos las arquitecturas abiertas líderes del mercado: Qwen 2.5 (0.5B y 1.5B) para máxima velocidad, Llama 3.2 (1B) de Meta para seguimiento estructurado de instrucciones, y Phi 3.5 Mini (3.8B) de Microsoft para razonamiento analítico avanzado."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Brinda orientación comercial clara.",
    input: "¿Tienen planes adaptados para pequeñas y medianas empresas?",
    output: "Totalmente. Ofrecemos esquemas escalables desde soluciones ágiles para PyMEs que buscan automatizar atención al cliente y ventas, hasta clústeres dedicados con infraestructura de alta concurrencia para corporativos."
  },
  {
    instruction: "Eres Valentina, soporte técnico y de integración de AX GLYNNE.",
    input: "¿El modelo entrenado se puede integrar con nuestro CRM o WhatsApp?",
    output: "Sí. A través de nuestras APIs REST y Webhooks puedes conectar el agente directamente con WhatsApp Business, Salesforce, HubSpot, Shopify o bases de datos internas para consultar inventarios y registrar pedidos en tiempo real."
  },
  {
    instruction: "Eres Valentina, experta en despliegue de modelos de AX GLYNNE.",
    input: "¿En qué formato puedo descargar mi modelo tras el fine-tuning?",
    output: "Al finalizar el proceso puedes exportar tu modelo en formato cuantizado .GGUF (Q4_K_M o F16) listo para ejecutarse localmente en Ollama o LM Studio, o mantenerlo hospedado en nuestros servidores para inferencia directa vía API."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Responde a objeciones o dudas sobre alucinaciones de IA.",
    input: "¿Qué pasa si el cliente hace una pregunta que no está en la base de datos?",
    output: "Configuramos el modelo con directivas de contención estricta: si la información solicitada no forma parte de su base de conocimiento autorizada, el asistente lo reconoce con amabilidad y deriva la conversación a un agente humano sin inventar respuestas."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Responde con entusiasmo y enfoque consultivo.",
    input: "Hola, buenos días, ¿cómo puedo empezar a implementar un asistente en mi empresa?",
    output: "¡Hola! Muy buenos días. El primer paso es preparar la información básica de tu negocio (preguntas frecuentes, productos, políticas) o utilizar nuestro generador sintético. Luego seleccionamos el modelo base ideal y en cuestión de minutos realizamos el reentrenamiento para pruebas."
  },
  {
    instruction: "Eres Valentina, consultora de tiempos y eficiencia en AX GLYNNE.",
    input: "¿Cuánto tiempo toma reentrenar un modelo personalizado?",
    output: "Gracias a la aceleración con aceleradores GPU NVIDIA H100 y optimizaciones Unsloth QLoRA, el ciclo de entrenamiento completo toma habitualmente entre 3 y 8 minutos dependiendo del volumen de tu dataset."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Responde consultas técnicas sobre latencia.",
    input: "¿Cuál es la velocidad de respuesta en producción?",
    output: "Nuestra infraestructura optimizada ofrece una latencia de primer token (TTFT) inferior a 250 milisegundos en chat y streaming continuo, asegurando una experiencia interactiva sin pausas molestas."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Explica el soporte post-lanzamiento.",
    input: "¿Qué soporte o mantenimiento ofrecen tras el despliegue?",
    output: "Ofrecemos soporte técnico continuo, analítica de conversaciones, monitoreo de métricas de precisión y reentrenamientos periódicos conforme tu negocio actualiza catálogos, promociones o servicios."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Asesora sobre disponibilidad multilingüe.",
    input: "¿El agente puede responder en inglés y otros idiomas además de español?",
    output: "Sí. Las arquitecturas base como Qwen 2.5 y Llama 3.2 cuentan con capacidades multilingües nativas de alto rendimiento, lo que permite atender clientes en español, inglés, portugués y otros idiomas con fluidez y coherencia tonal."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Facilita la agenda de demostraciones.",
    input: "¿Puedo probar una demostración en vivo antes de contratar?",
    output: "¡Por supuesto! Puedes interactuar ahora mismo en el sandbox de pruebas de esta plataforma o coordinar con nuestro equipo una sesión técnica en vivo con casos de uso de tu propia industria."
  },
  {
    instruction: "Eres Valentina de AX GLYNNE. Cierre cálido y profesional.",
    input: "Muchas gracias por toda la información, ha sido muy claro.",
    output: "¡Con muchísimo gusto! Estamos aquí para ayudarte a transformar la comunicación de tu empresa con inteligencia artificial de última generación. Cuando desees comenzar, cuentas con todo nuestro respaldo."
  }
];

const TUTORIAL_STEPS = [
  {
    step: '01 / 05',
    badge: 'STUDIO OVERVIEW',
    title: 'Welcome to GLYNNE AI Model Fine-Tuning Studio',
    subtitle: '/// HIGH-PERFORMANCE QLoRA RETRAINING ENVIRONMENT',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0 }}>This studio allows you to adapt open-source foundation LLMs (Qwen 2.5, Llama 3.2, Phi 3.5) with your company’s proprietary data in minutes.</p>
        <div style={{ padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '11px' }}>
          <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>⚡ What is QLoRA Fine-Tuning?</strong>
          Instead of retraining billions of parameters from scratch, QLoRA freezes the base model weights in 4-bit precision and trains a lightweight <strong>Adapter Matrix</strong>. This achieves enterprise precision using minimal GPU VRAM.
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
          Follow this step-by-step walkthrough to configure base models, prepare training datasets, run H100 GPU fine-tuning, and test your custom AI.
        </div>
      </div>
    )
  },
  {
    step: '02 / 05',
    badge: 'COLUMN 1 — ARCHITECTURE & PARAMS',
    title: 'Select Base Model & Hyperparameters',
    subtitle: '/// FOUNDATION MODEL CONFIGURATION',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0 }}>In the left column (<strong>MODEL CONFIGURATION</strong>), you set the foundation rules for training:</p>
        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', lineHeight: 1.5 }}>
          <li><strong>Select Preset Base Model:</strong> Choose between ultra-fast models (Qwen 0.5B / 1.5B), instruction followers (Llama 3.2 1B), or heavy logic (Phi 3.5 3.8B).</li>
          <li><strong>Quantization (4-bit NF4):</strong> Keeps VRAM footprint minimal while maintaining high precision.</li>
          <li><strong>Training Epochs & Learning Rate:</strong> Epochs dictate how many passes the model makes over your dataset. Recommended default: <code>3 Epochs</code>.</li>
          <li><strong>LoRA Rank & Alpha:</strong> Controls the parameter capacity of the adapter. Higher rank = deeper memorization of complex patterns.</li>
        </ul>
      </div>
    )
  },
  {
    step: '03 / 05',
    badge: 'COLUMN 2 — DATASET STUDIO',
    title: 'Build & Generate Synthetic Datasets',
    subtitle: '/// GROQ SYNTHETIC STUDIO & MANUAL DATASET BUFFER',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0 }}>In the middle column (<strong>TRAINING DATASET & PROMPTS</strong>), you supply the exact Q&A examples your model will master:</p>
        <div style={{ padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '11px' }}>
          <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>✨ Don't have a dataset? Use Synthetic GROQ Generation!</strong>
          Type a prompt (e.g. <em>"Generate 10 customer service responses for e-commerce returns"</em>) and click <strong>Generate Synthetic Dataset with GROQ</strong>. The system auto-builds high-quality training pairs instantly!
        </div>
        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
          <li><strong>Manual Table:</strong> Edit Instruction, Customer Query (Input), and Expected Answer (Output) directly.</li>
          <li><strong>JSON Import/Export:</strong> Upload raw <code>.json</code> dataset files or export your prepared buffer.</li>
        </ul>
      </div>
    )
  },
  {
    step: '04 / 05',
    badge: 'COLUMN 3 — EXECUTION & MONITORING',
    title: 'Run H100 Fine-Tuning & Diagnostic Logs',
    subtitle: '/// UNSLOTH ULTRA-FAST KERNELS',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0 }}>In the right column (<strong>TRAINING MONITOR & CONSOLE</strong>), you trigger the training pipeline on our H100 GPU cluster:</p>
        <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', lineHeight: 1.5 }}>
          <li>Click <strong>⚡ START FINE-TUNING MODEL NOW</strong> to transmit your dataset and hyperparameter payload to the <code>GLYNNE_LOGIC_2026</code> backend.</li>
          <li><strong>Real-Time Diagnostic Logs:</strong> Watch memory allocation, Unsloth kernel compilation, step progress, and loss metrics.</li>
          <li><strong>Loss Trajectory:</strong> As training progresses, loss will decrease, indicating your model is learning your specific domain tone.</li>
        </ul>
      </div>
    )
  },
  {
    step: '05 / 05',
    badge: 'DEPLOYS & INFERENCE',
    title: 'Test Your Custom Model & Export Weights',
    subtitle: '/// INTERACTIVE SANDBOX & PRIVATE DEPLOYMENT',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ margin: 0 }}>Once training completes, your custom model is live and ready for testing:</p>
        <div style={{ padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '11px' }}>
          <strong style={{ color: '#ffffff', display: 'block', marginBottom: '4px' }}>💬 Test Chat Sandbox:</strong>
          Use the chat prompt box in the right column to test queries live against your newly trained QLoRA model.
        </div>
        <p style={{ fontSize: '11px', margin: 0 }}>
          You can export your fine-tuned weights for <strong>100% offline deployment</strong> on private servers, mobile devices, or Hugging Face.
        </p>
      </div>
    )
  }
];

export default function CreateYourGlynneModelPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Modal de confirmación al intentar salir
  const [showExitModal, setShowExitModal] = useState(false);

  // Guided Onboarding Tutorial Modal States
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

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

  // Intro Loading & Welcome Animation States
  const [userEmail, setUserEmail] = useState('');
  const [introFinished, setIntroFinished] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const [introLogs, setIntroLogs] = useState([]);
  const [introStage, setIntroStage] = useState('initializing'); // 'initializing' | 'verifying' | 'ready'
  const [isLaunching, setIsLaunching] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsSmallScreen(window.innerWidth < 700);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
        setUserEmail(user.email || 'user@axglynne.com');
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
      setTutorialStep(0);
      setShowTutorialModal(true);
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
  const [personalityText, setPersonalityText] = useState(PRESET_PERSONALITIES.valentina);
  const [personalityFile, setPersonalityFile] = useState(null);
  const [businessText, setBusinessText] = useState(PRESET_BUSINESS_INFO.ax_glynne);
  const [businessFile, setBusinessFile] = useState(null);
  const [isGeneratingDataset, setIsGeneratingDataset] = useState(false);
  const [numDatasetExamples, setNumDatasetExamples] = useState(25);
  const [datasetViewMode, setDatasetViewMode] = useState('generator'); // 'generator' | 'editor'
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState('persona'); // 'persona' | 'business' | 'dataset'

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

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        let errMsg = `Server returned status ${res.status}`;
        try {
          const jsonErr = JSON.parse(errorText);
          errMsg = jsonErr.detail || jsonErr.message || errMsg;
        } catch (e) {}
        throw new Error(errMsg);
      }

      const data = await res.json();
      if (data.status === 'started') {
        // Started in background
      } else if (data.message) {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error starting training:', err);
      setTrainingState(prev => ({
        ...prev,
        status: 'error',
        error_message: `Connection error: ${err.message || 'GLYNNE_LOGIC_2026 server unreachable'}. Note: If Render is waking from sleep, please wait ~30 seconds and retry.`
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
      <div data-theme={theme} style={{ minHeight: '100vh', width: '100vw', overflowY: isSmallScreen ? 'auto' : 'hidden', overflowX: 'hidden', position: 'relative', backgroundColor: theme === 'light' ? '#f8f9fc' : '#000000' }}>
      
      {/* Intro Loading & Welcome Sequence Overlay (Reveals Interactive Grid Background) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: introFinished ? -1 : 99999,
          backgroundColor: theme === 'light' ? 'rgba(245, 245, 247, 0.95)' : 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          color: theme === 'light' ? '#111111' : '#ffffff',
          display: introFinished ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isSmallScreen ? '16px 12px' : '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isLaunching ? 'scale(1.04)' : 'scale(1)',
          opacity: isLaunching ? 0 : 1,
          pointerEvents: (isLaunching || introFinished) ? 'none' : 'auto'
        }}
      >

        {/* Foreground Intro Content (Floats above interactive Gravity Canvas) */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '640px', margin: '0 auto', pointerEvents: 'none' }}>
          {/* Central Monochromatic Spinning Neural Ring */}
          <div style={{ position: 'relative', width: isSmallScreen ? '100px' : '160px', height: isSmallScreen ? '100px' : '160px', marginBottom: isSmallScreen ? '16px' : '32px' }}>
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
              width: isSmallScreen ? '40px' : '56px',
              height: isSmallScreen ? '40px' : '56px',
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
                  width: isSmallScreen ? '20px' : '28px',
                  height: isSmallScreen ? '20px' : '28px',
                  filter: 'brightness(0) invert(1)',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>

        {/* Title & Stage Header */}
        <div style={{ textAlign: 'center', maxWidth: '580px', width: '100%', marginBottom: isSmallScreen ? '16px' : '28px', animation: 'fadeInUpMonochrome 0.5s ease' }}>
          {introStage !== 'ready' && (
            <span style={{
              fontSize: isSmallScreen ? '9.5px' : '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: theme === 'light' ? '#111111' : '#ffffff',
              backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
              padding: '5px 12px',
              borderRadius: '999px',
              border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)',
              display: 'inline-block',
              marginBottom: '12px',
              transition: 'all 0.3s ease'
            }}>
              {introStage === 'initializing' ? 'PHASE 1 — INITIALIZING NODE & VRAM' : 'PHASE 2 — VERIFYING KERNELS & DATASETS'}
            </span>
          )}

          <h1 style={{
            fontSize: 'clamp(20px, 4.5vw, 38px)',
            fontWeight: 600,
            letterSpacing: introStage === 'ready' ? '0.08em' : '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 8px 0',
            color: theme === 'light' ? '#111111' : '#ffffff',
            transition: 'letter-spacing 0.3s ease'
          }}>
            {introStage === 'ready' ? 'GLYNNE AI STUDIO' : 'Loading Adaptation Environment'}
          </h1>

          <p style={{ fontSize: isSmallScreen ? '13px' : '15px', color: '#86868b', fontWeight: 300, margin: 0, lineHeight: 1.45 }}>
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
          backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(18, 18, 20, 0.75)',
          backdropFilter: 'blur(20px)',
          border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '14px',
          padding: isSmallScreen ? '12px 14px' : '18px 22px',
          marginBottom: isSmallScreen ? '16px' : '28px',
          boxShadow: theme === 'light' ? '0 10px 30px rgba(0,0,0,0.03)' : '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }} />
            </div>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#86868b', letterSpacing: '0.05em' }}>
              DIAGNOSTIC_TERMINAL // V2.4
            </span>
          </div>

          <div style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: isSmallScreen ? '10.5px' : '12px',
            color: theme === 'light' ? '#333333' : '#d4d4d8',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            minHeight: isSmallScreen ? '80px' : '110px',
            maxHeight: isSmallScreen ? '100px' : '130px',
            overflowY: 'auto'
          }}>
            {introLogs.map((log, index) => (
              <div key={`intro-log-${index}`} style={{ opacity: index === introLogs.length - 1 ? 1 : 0.5, transition: 'opacity 0.2s ease', wordBreak: 'break-word' }}>
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
        <div style={{ width: '100%', maxWidth: '580px', marginBottom: isSmallScreen ? '20px' : '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#86868b', marginBottom: '6px' }}>
            <span>PROGRESS</span>
            <span style={{ color: theme === 'light' ? '#111' : '#fff', fontWeight: 700 }}>{introProgress}%</span>
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

        {/* Action Launch Button Container (Always mounted in DOM) */}
        <div style={{
          textAlign: 'center',
          opacity: introStage === 'ready' ? 1 : 0,
          visibility: introStage === 'ready' ? 'visible' : 'hidden',
          pointerEvents: introStage === 'ready' ? 'auto' : 'none',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
          width: '100%'
        }}>
          {userEmail && (
            <div style={{ fontSize: '12px', color: '#86868b', marginBottom: '14px', fontWeight: 400 }}>
              Verified session: <span style={{ color: theme === 'light' ? '#111' : '#fff', fontWeight: 600 }}>{userEmail}</span>
            </div>
          )}

          {isSmallScreen ? (
            <div style={{
              maxWidth: '440px',
              width: '100%',
              margin: '0 auto',
              padding: '18px 20px',
              borderRadius: '16px',
              backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(18, 18, 22, 0.92)',
              border: theme === 'light' ? '1px solid rgba(225, 29, 72, 0.3)' : '1px solid rgba(244, 63, 94, 0.35)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: theme === 'light' ? '0 12px 30px rgba(0, 0, 0, 0.06)' : '0 12px 35px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: theme === 'light' ? 'rgba(225, 29, 72, 0.08)' : 'rgba(244, 63, 94, 0.12)',
                color: theme === 'light' ? '#e11d48' : '#fb7185',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  margin: '0 0 4px 0',
                  color: theme === 'light' ? '#111111' : '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Exclusive Desktop / PC Feature
                </h3>
                <p style={{
                  fontSize: '11.5px',
                  color: '#86868b',
                  margin: 0,
                  lineHeight: 1.45,
                  fontWeight: 400
                }}>
                  The GLYNNE AI model fine-tuning and adaptation studio requires a desktop or laptop screen (resolution above 700px). Mobile displays are not supported for high-compute training.
                </p>
              </div>
              <Link
                href="/Panel"
                style={{
                  marginTop: '2px',
                  padding: '9px 20px',
                  borderRadius: '999px',
                  backgroundColor: theme === 'light' ? '#111111' : '#ffffff',
                  color: theme === 'light' ? '#ffffff' : '#111111',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <span>&larr; Return to Dashboard</span>
              </Link>
            </div>
          ) : (
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
          )}
        </div>
        </div>
      </div>

      {/* Container matching Panel */}
      <div
        className="md-container"
        style={{
          position: isSmallScreen ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: isSmallScreen ? 'auto' : '100vh',
          minHeight: '100dvh',
          padding: isSmallScreen ? '12px 14px' : '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10000,
          overflowY: isSmallScreen ? 'auto' : 'hidden'
        }}
      >

        {/* Header Superior - Panel Style */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
          gap: isSmallScreen ? '10px' : '0',
          paddingBottom: '8px',
          borderBottom: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.1)',
          height: isSmallScreen ? 'auto' : '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: theme === 'light' ? '#0f172a' : '#ffffff',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              &larr; Back to Dashboard
            </button>
            <span style={{ color: theme === 'light' ? '#cbd5e1' : '#334155' }}>|</span>
            <div className="md-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: isSmallScreen ? '10px' : '11px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff' }} />
              GLYNNE CORE // MODEL FINE-TUNING STUDIO (QLoRA)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
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

            {/* Onboarding Guide Tutorial Button */}
            <button
              onClick={() => {
                setTutorialStep(0);
                setShowTutorialModal(true);
              }}
              title="Open Step-by-Step Guided Tutorial"
              style={{
                padding: '4px 10px',
                fontSize: '10px',
                fontWeight: 700,
                borderRadius: '4px',
                backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                color: theme === 'light' ? '#ffffff' : '#000000',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: "'SF Mono', Monaco, monospace"
              }}
            >
              <span>/// ONBOARDING GUIDE</span>
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
        <div className="md-main" style={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: '16px', height: isSmallScreen ? 'auto' : 'calc(100vh - 75px)', overflow: isSmallScreen ? 'visible' : 'hidden', paddingBottom: isSmallScreen ? '50px' : '0' }}>

          {/* COLUMN 1 (LEFT): MODEL ARCHITECTURE & KNOWLEDGE STUDIO */}
          <div
            className="md-left"
            style={{
              width: isSmallScreen ? '100%' : '440px',
              minWidth: isSmallScreen ? '100%' : '420px',
              height: isSmallScreen ? 'auto' : '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              padding: '16px',
              overflowY: 'auto',
              borderRadius: '12px',
              backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(9, 9, 11, 0.96)',
              border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: theme === 'light' ? '0 10px 30px rgba(15, 23, 42, 0.05)' : '0 20px 50px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* ── STEP 1: BASE ARCHITECTURE SELECTION ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981'
                  }} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: "'SF Mono', Monaco, monospace",
                    color: theme === 'light' ? '#0f172a' : '#ffffff'
                  }}>
                    01 // ARQUITECTURA BASE
                  </span>
                </div>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontFamily: "'SF Mono', Monaco, monospace",
                  letterSpacing: '0.04em',
                  backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                  color: theme === 'light' ? '#0f172a' : '#ffffff'
                }}>
                  QLoRA 4-BIT NF4
                </span>
              </div>

              {/* Horizontal Model Selector Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '4px',
                padding: '3px',
                borderRadius: '8px',
                backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(0, 0, 0, 0.4)',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                {PRESET_MODELS.map((m, idx) => {
                  const isSelected = selectedModel === m.id;
                  const shortName = idx === 0 ? 'Qwen 0.5B' : idx === 1 ? 'Qwen 1.5B' : idx === 2 ? 'Llama 1B' : 'Phi 3.5';
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setModelIndex(idx);
                        setSelectedModel(m.id);
                      }}
                      style={{
                        padding: '6px 4px',
                        borderRadius: '6px',
                        fontSize: '9.5px',
                        fontWeight: isSelected ? 700 : 500,
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        fontFamily: "'SF Mono', Monaco, monospace",
                        backgroundColor: isSelected
                          ? (theme === 'light' ? '#0f172a' : '#ffffff')
                          : 'transparent',
                        color: isSelected
                          ? (theme === 'light' ? '#ffffff' : '#000000')
                          : (theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.7)'),
                        boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
                      }}
                    >
                      {shortName}
                    </button>
                  );
                })}
              </div>

              {/* Active Model Detailed Card */}
              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: theme === 'light' ? '#0f172a' : '#ffffff' }}>
                      {PRESET_MODELS[modelIndex].name}
                    </span>
                    <span style={{
                      fontSize: '8px',
                      fontWeight: 700,
                      padding: '2px 5px',
                      borderRadius: '3px',
                      fontFamily: "'SF Mono', Monaco, monospace",
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      ACTIVO
                    </span>
                  </div>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: "'SF Mono', Monaco, monospace",
                    backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.06)' : 'rgba(255, 255, 255, 0.08)',
                    color: theme === 'light' ? '#0f172a' : '#cbd5e1'
                  }}>
                    {PRESET_MODELS[modelIndex].speed}
                  </span>
                </div>

                <div style={{ fontSize: '10px', opacity: 0.8, lineHeight: 1.45 }}>
                  {PRESET_MODELS[modelIndex].desc}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '6px',
                  paddingTop: '6px',
                  borderTop: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.06)' : '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '9px',
                  fontFamily: "'SF Mono', Monaco, monospace"
                }}>
                  <span style={{ opacity: 0.6 }}>{PRESET_MODELS[modelIndex].provider}</span>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <span style={{ opacity: 0.6 }}>VRAM: {PRESET_MODELS[modelIndex].size}</span>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <span style={{ opacity: 0.6 }}>LoRA r=16</span>
                </div>
              </div>
            </div>

            {/* ── STEP 2: KNOWLEDGE & DATASET STUDIO ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: "'SF Mono', Monaco, monospace",
                  color: theme === 'light' ? '#0f172a' : '#ffffff'
                }}>
                  02 // ESTUDIO DE DATOS & GROQ
                </span>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  color: '#6366f1'
                }}>
                  {dataset.length} EJEMPLOS CARGADOS
                </span>
              </div>

              {/* Segmented Workspace Tabs */}
              <div style={{
                display: 'flex',
                gap: '4px',
                padding: '3px',
                borderRadius: '8px',
                backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.05)' : 'rgba(0, 0, 0, 0.4)',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <button
                  type="button"
                  onClick={() => setActiveKnowledgeTab('persona')}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: activeKnowledgeTab === 'persona' ? 700 : 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: activeKnowledgeTab === 'persona'
                      ? (theme === 'light' ? '#0f172a' : '#ffffff')
                      : 'transparent',
                    color: activeKnowledgeTab === 'persona'
                      ? (theme === 'light' ? '#ffffff' : '#000000')
                      : (theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.7)')
                  }}
                >
                  🎭 Personalidad
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKnowledgeTab('business')}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: activeKnowledgeTab === 'business' ? 700 : 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: activeKnowledgeTab === 'business'
                      ? (theme === 'light' ? '#0f172a' : '#ffffff')
                      : 'transparent',
                    color: activeKnowledgeTab === 'business'
                      ? (theme === 'light' ? '#ffffff' : '#000000')
                      : (theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.7)')
                  }}
                >
                  🏢 Conocimiento
                </button>
                <button
                  type="button"
                  onClick={() => setActiveKnowledgeTab('dataset')}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: activeKnowledgeTab === 'dataset' ? 700 : 500,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: activeKnowledgeTab === 'dataset'
                      ? (theme === 'light' ? '#0f172a' : '#ffffff')
                      : 'transparent',
                    color: activeKnowledgeTab === 'dataset'
                      ? (theme === 'light' ? '#ffffff' : '#000000')
                      : (theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.7)')
                  }}
                >
                  📋 Buffer ({dataset.length})
                </button>
              </div>

              {/* Tab Content Container */}
              <div style={{
                flex: 1,
                minHeight: '210px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)',
                overflowY: 'auto'
              }}>
                {/* ── TAB 1: PERSONALIDAD ── */}
                {activeKnowledgeTab === 'persona' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                    {/* Presets row */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '9px', opacity: 0.6, fontFamily: 'monospace', textTransform: 'uppercase' }}>Plantilla:</span>
                      <button
                        type="button"
                        onClick={() => setPersonalityText(PRESET_PERSONALITIES.valentina)}
                        style={{
                          fontSize: '9px',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: 'transparent',
                          color: theme === 'light' ? '#0f172a' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        Valentina (Senior)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPersonalityText(PRESET_PERSONALITIES.support)}
                        style={{
                          fontSize: '9px',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: 'transparent',
                          color: theme === 'light' ? '#0f172a' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        Soporte Técnico
                      </button>
                      <button
                        type="button"
                        onClick={() => setPersonalityText(PRESET_PERSONALITIES.sales)}
                        style={{
                          fontSize: '9px',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: 'transparent',
                          color: theme === 'light' ? '#0f172a' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        Ventas & ROI
                      </button>
                    </div>

                    <textarea
                      rows={4}
                      value={personalityText}
                      onChange={(e) => setPersonalityText(e.target.value)}
                      placeholder="Define el nombre, rol, tono y estilo de respuesta del agente..."
                      style={{
                        width: '100%',
                        flex: 1,
                        minHeight: '90px',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        lineHeight: 1.5,
                        backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.03)' : 'rgba(0, 0, 0, 0.4)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.1)',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '10px',
                        padding: '4px 10px',
                        borderRadius: '5px',
                        border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: 'transparent',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        cursor: 'pointer'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                        {personalityFile ? personalityFile.name : 'Adjuntar archivo (.pdf, .txt, .md)'}
                        <input
                          type="file"
                          accept=".pdf,.md,.txt,.json"
                          onChange={(e) => setPersonalityFile(e.target.files[0] || null)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {personalityFile && (
                        <button
                          type="button"
                          onClick={() => setPersonalityFile(null)}
                          style={{ fontSize: '9px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* ── TAB 2: NEGOCIO ── */}
                {activeKnowledgeTab === 'business' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                    {/* Presets row */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '9px', opacity: 0.6, fontFamily: 'monospace', textTransform: 'uppercase' }}>Plantilla:</span>
                      <button
                        type="button"
                        onClick={() => setBusinessText(PRESET_BUSINESS_INFO.ax_glynne)}
                        style={{
                          fontSize: '9px',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: 'transparent',
                          color: theme === 'light' ? '#0f172a' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        Info AX GLYNNE
                      </button>
                      <button
                        type="button"
                        onClick={() => setBusinessText(PRESET_BUSINESS_INFO.ecommerce)}
                        style={{
                          fontSize: '9px',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: 'transparent',
                          color: theme === 'light' ? '#0f172a' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        E-Commerce / Retail
                      </button>
                    </div>

                    <textarea
                      rows={4}
                      value={businessText}
                      onChange={(e) => setBusinessText(e.target.value)}
                      placeholder="Escribe o pega aquí la información de tu negocio: productos, precios, políticas, garantías, soporte..."
                      style={{
                        width: '100%',
                        flex: 1,
                        minHeight: '90px',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        lineHeight: 1.5,
                        backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.03)' : 'rgba(0, 0, 0, 0.4)',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.1)',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '10px',
                        padding: '4px 10px',
                        borderRadius: '5px',
                        border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: 'transparent',
                        color: theme === 'light' ? '#0f172a' : '#ffffff',
                        cursor: 'pointer'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                        {businessFile ? businessFile.name : 'Adjuntar archivo (.pdf, .txt, .md)'}
                        <input
                          type="file"
                          accept=".pdf,.md,.txt,.json"
                          onChange={(e) => setBusinessFile(e.target.files[0] || null)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      {businessFile && (
                        <button
                          type="button"
                          onClick={() => setBusinessFile(null)}
                          style={{ fontSize: '9px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* ── TAB 3: BUFFER DE DATASET ── */}
                {activeKnowledgeTab === 'dataset' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, fontFamily: 'monospace', opacity: 0.7 }}>
                        {dataset.length} PARES Q&A EN MEMORIA
                      </span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={handleAddRow}
                          style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                            backgroundColor: 'transparent',
                            color: theme === 'light' ? '#0f172a' : '#ffffff',
                            cursor: 'pointer'
                          }}
                        >
                          + Agregar
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowJsonModal(true)}
                          style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: theme === 'light' ? '1px solid rgba(15,23,42,0.15)' : '1px solid rgba(255,255,255,0.15)',
                            backgroundColor: 'transparent',
                            color: theme === 'light' ? '#0f172a' : '#ffffff',
                            cursor: 'pointer'
                          }}
                        >
                          JSON
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDatasetPreviewModal(true)}
                          style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: theme === 'light' ? '#0f172a' : '#ffffff',
                            color: theme === 'light' ? '#ffffff' : '#000000',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 700
                          }}
                        >
                          Ver Todo
                        </button>
                      </div>
                    </div>

                    <div style={{
                      flex: 1,
                      maxHeight: '130px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      paddingRight: '2px'
                    }}>
                      {dataset.map((item, idx) => (
                        <div
                          key={`qa-mini-${idx}`}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '5px',
                            backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.03)' : 'rgba(0, 0, 0, 0.3)',
                            border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, color: theme === 'light' ? '#0f172a' : '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              #{idx + 1}: "{item.input}"
                            </span>
                            <span style={{ fontSize: '9px', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.output}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveRow(idx)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '2px',
                              opacity: 0.7
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* GROQ Generator Controls Bar */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, opacity: 0.8 }}>Pares a generar con GROQ:</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[15, 25, 40].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setNumDatasetExamples(num)}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '9px',
                          fontFamily: "'SF Mono', Monaco, monospace",
                          fontWeight: numDatasetExamples === num ? 700 : 500,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: numDatasetExamples === num
                            ? (theme === 'light' ? '#0f172a' : '#ffffff')
                            : (theme === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.08)'),
                          color: numDatasetExamples === num
                            ? (theme === 'light' ? '#ffffff' : '#000000')
                            : (theme === 'light' ? '#0f172a' : '#ffffff')
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateDatasetWithGroq}
                  disabled={isGeneratingDataset}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '10.5px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: isGeneratingDataset ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    backgroundColor: isGeneratingDataset
                      ? (theme === 'light' ? '#94a3b8' : '#334155')
                      : (theme === 'light' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.2)'),
                    color: theme === 'light' ? '#4f46e5' : '#818cf8',
                    border: theme === 'light' ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(99, 102, 241, 0.4)'
                  }}
                >
                  {isGeneratingDataset ? (
                    <>
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      Sintetizando dataset con agentes Groq...
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                      Generar Dataset Sintético con GROQ
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── ACTION FOOTER: RESET & START FINE-TUNING ── */}
            <div style={{
              display: 'flex',
              gap: '8px',
              paddingTop: '8px',
              borderTop: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: 'auto'
            }}>
              <button
                type="button"
                onClick={handleResetAll}
                title="Reiniciar configuraciones, chat y terminal"
                style={{
                  padding: '11px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  color: theme === 'light' ? '#0f172a' : '#ffffff',
                  border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Limpiar
              </button>

              <button
                type="button"
                onClick={handleStartTraining}
                disabled={trainingState.status === 'running'}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '6px',
                  backgroundColor: trainingState.status === 'running'
                    ? (theme === 'light' ? '#94a3b8' : '#334155')
                    : (theme === 'light' ? '#0f172a' : '#ffffff'),
                  color: trainingState.status === 'running'
                    ? '#ffffff'
                    : (theme === 'light' ? '#ffffff' : '#000000'),
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: trainingState.status === 'running' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: trainingState.status === 'running' ? 'none' : '0 4px 16px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                {trainingState.status === 'running' ? (
                  <>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    Entrenando en Modal GPU...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    Iniciar Fine-Tuning GLYNNE
                  </>
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
                  href="https://axglynne.com/Servex_solution"
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

        {/* MODAL DE CONFIRMACIÓN DE SALIDA (EXACTAMENTE IGUAL A AX_CHAT) */}
        {showExitModal && (
          <div className="md-logout-overlay">
            <div className="md-logout-modal">
              <h3>End Session?</h3>
              <p>Your fine-tuning configuration, prompt parameters, and dataset buffer are securely stored. Are you sure you want to leave the AI model training studio?</p>
              <div className="md-logout-actions">
                <button className="md-btn-cancel" onClick={() => setShowExitModal(false)}>Cancel</button>
                <button className="md-btn-confirm" onClick={() => {
                  window.onbeforeunload = null;
                  router.push('/Panel');
                }}>Exit Studio</button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE GUIDED ONBOARDING TUTORIAL MODAL */}
        {showTutorialModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              fontFamily: "'SF Mono', Monaco, 'Courier New', Consolas, monospace"
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '640px',
                backgroundColor: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0px',
                padding: '32px',
                color: '#ffffff',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative'
              }}
            >
              {/* Header Bar: Badge & Step Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.12em' }}>
                  <span>///</span> STEP {TUTORIAL_STEPS[tutorialStep].step} — {TUTORIAL_STEPS[tutorialStep].badge}
                </div>
                <button
                  onClick={() => setShowTutorialModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: '2px 8px',
                    fontFamily: 'inherit'
                  }}
                >
                  SKIP TUTORIAL
                </button>
              </div>

              {/* Step Title & Subtitle */}
              <div>
                <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  {TUTORIAL_STEPS[tutorialStep].subtitle}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.01em' }}>
                  {TUTORIAL_STEPS[tutorialStep].title}
                </h3>
              </div>

              {/* Step Content Body */}
              <div style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', minHeight: '180px' }}>
                {TUTORIAL_STEPS[tutorialStep].content}
              </div>

              {/* Progress Dots Bar */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', padding: '10px 0' }}>
                {TUTORIAL_STEPS.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => setTutorialStep(idx)}
                    style={{
                      height: '4px',
                      flex: 1,
                      backgroundColor: idx === tutorialStep ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>

              {/* Navigation Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <button
                  disabled={tutorialStep === 0}
                  onClick={() => setTutorialStep(prev => Math.max(0, prev - 1))}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '0px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: 'transparent',
                    color: tutorialStep === 0 ? 'rgba(255, 255, 255, 0.25)' : '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: tutorialStep === 0 ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'inherit'
                  }}
                >
                  ← PREVIOUS
                </button>

                {tutorialStep < TUTORIAL_STEPS.length - 1 ? (
                  <button
                    onClick={() => setTutorialStep(prev => prev + 1)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '0px',
                      border: 'none',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontFamily: 'inherit'
                    }}
                  >
                    NEXT STEP →
                  </button>
                ) : (
                  <button
                    onClick={() => setShowTutorialModal(false)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '0px',
                      border: 'none',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontFamily: 'inherit'
                    }}
                  >
                    ✓ ENTER STUDIO NOW
                  </button>
                )}
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
      </div>
    </div>
  </BackgroundWrapper>
);
}
