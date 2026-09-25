'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import GravityBackground from '../AX_chat/components/GravityBackground';
import VoiceOrb from './components/VoiceOrb';
import { useTheme } from '@/lib/ThemeContext';

// Type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AXVoicePage() {
  const router = useRouter();
  const { theme } = useTheme();

  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en' | null>(null);
  const urlToOpenRef = useRef<string | null>(null);
  const [useMockTTS, setUseMockTTS] = useState(false);
  const [activeEngine, setActiveEngine] = useState<'elevenlabs' | 'edge'>('elevenlabs');
  const [charsUsed, setCharsUsed] = useState<number>(0);
  const [maxChars, setMaxChars] = useState<number>(2000);
  const [hoursUntilReset, setHoursUntilReset] = useState<number>(48);

  const [userId, setUserId] = useState<string>('default_user');
  const [isMuted, setIsMuted] = useState(false);

  const aiResponseRef = useRef(aiResponse);
  const isMutedRef = useRef(isMuted);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const orbStateRef = useRef(orbState);
  const isSessionActiveRef = useRef(isSessionActive);
  const useMockTTSRef = useRef(useMockTTS);
  const activeEngineRef = useRef(activeEngine);
  const languageRef = useRef(language);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fillerAudioRef = useRef<HTMLAudioElement | null>(null);

  const fillerTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isProcessingRef = useRef<boolean>(false);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const micAudioCtxRef = useRef<AudioContext | null>(null);
  const vadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechStartTimeRef = useRef<number>(0);
  const noiseFloorRef = useRef<number>(12);
  const transcriptRef = useRef<string>('');
  const messagesRef = useRef<{ role: string, content: string }[]>([]);

  // Keep refs in sync
  useEffect(() => {
    if (orbState === 'speaking' && orbStateRef.current !== 'speaking') {
      speechStartTimeRef.current = Date.now();
    }
    orbStateRef.current = orbState;
    isSessionActiveRef.current = isSessionActive;
    useMockTTSRef.current = useMockTTS;
    activeEngineRef.current = activeEngine;
    aiResponseRef.current = aiResponse;
    messagesRef.current = messages;
    languageRef.current = language;
  }, [orbState, isSessionActive, useMockTTS, activeEngine, aiResponse, messages, language]);

  // Sync mute state across media streams
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (micStreamRef.current) {
      micStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
    
    // Apagar o encender el Web Speech API para que no escuche mientras está muteado
    if (isMuted) {
      try { recognitionRef.current?.stop(); } catch (e) { }
    } else {
      if (isSessionActiveRef.current && orbStateRef.current === 'listening') {
        try { recognitionRef.current?.start(); } catch (e) { }
      }
    }
  }, [isMuted]);

  // Sync language for SpeechRecognition
  useEffect(() => {
    if (recognitionRef.current && language) {
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'es-CO';
    }
  }, [language]);

  // Reset mute state when session ends
  useEffect(() => {
    if (!isSessionActive) {
      setIsMuted(false);
    }
  }, [isSessionActive]);

  // 🎙️ WebRTC MIC VAD: DETECCIÓN INTELIGENTE DE INTERRUPCIÓN POR VOZ CON ADAPTACIÓN AMBIENTAL
  useEffect(() => {
    if (!isSessionActive) {
      if (vadIntervalRef.current) clearInterval(vadIntervalRef.current);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      if (micAudioCtxRef.current && micAudioCtxRef.current.state !== 'closed') {
        micAudioCtxRef.current.close();
        micAudioCtxRef.current = null;
      }
      return;
    }

    const startMicVAD = async () => {
      try {
        // Solicitar el micrófono con Cancelación de Eco de Hardware activada (AEC)
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        micStreamRef.current = stream;

        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        micAudioCtxRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512; // 256 bandas de frecuencia (~93.75 Hz por banda en 48kHz)
        analyser.smoothingTimeConstant = 0.2;
        source.connect(analyser);
        micAnalyserRef.current = analyser;

        let consecutiveVoiceHits = 0;
        let listeningSilenceHits = 0;

        vadIntervalRef.current = setInterval(() => {
          if (!micAnalyserRef.current || !isSessionActiveRef.current || isMutedRef.current) return;

          const binCount = micAnalyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(binCount);
          micAnalyserRef.current.getByteFrequencyData(dataArray);

          // 1. Energía en Banda Formante Vocal (~300Hz a 2600Hz, bins 3 a 27)
          let vocalSum = 0;
          let vocalCount = 0;
          for (let i = 3; i <= 27 && i < binCount; i++) {
            vocalSum += dataArray[i];
            vocalCount++;
          }
          const vocalAvg = vocalCount > 0 ? (vocalSum / vocalCount) : 0;

          // 2. Energía en Banda Alta (>3500Hz, bins 38 a 80) para detectar chasquidos/ruido blanco
          let highSum = 0;
          let highCount = 0;
          for (let i = 38; i <= 80 && i < binCount; i++) {
            highSum += dataArray[i];
            highCount++;
          }
          const highAvg = highCount > 0 ? (highSum / highCount) : 0;

          // 3. Volumen total del espectro conversacional (bins 2 a 35)
          let totalSum = 0;
          let totalCount = 0;
          for (let i = 2; i <= 35 && i < binCount; i++) {
            totalSum += dataArray[i];
            totalCount++;
          }
          const totalVolume = totalCount > 0 ? (totalSum / totalCount) : 0;

          // Actualización adaptativa del nivel de ruido ambiental de fondo
          if (orbStateRef.current !== 'speaking' || totalVolume < noiseFloorRef.current + 10) {
            noiseFloorRef.current = noiseFloorRef.current * 0.95 + totalVolume * 0.05;
          }

          // A. Si el usuario está hablando y el sistema está escuchando (orbState === 'listening')
          if (orbStateRef.current === 'listening') {
            const hasUserSpoken = (transcriptRef.current || transcript).trim().length > 0;
            if (hasUserSpoken && !isProcessingRef.current) {
              // Si el volumen del mic vuelve al nivel de ruido ambiente (silencio tras hablar)
              if (totalVolume < noiseFloorRef.current + 8) {
                listeningSilenceHits++;
                // 14 lecturas seguidas (~700ms de silencio) = Envío ultra-rápido instantáneo
                if (listeningSilenceHits >= 14) {
                  listeningSilenceHits = 0;
                  try { recognitionRef.current?.stop(); } catch (e) { }
                  handleSendTranscript();
                }
              } else {
                listeningSilenceHits = 0; // El usuario aún habla
              }
            } else {
              listeningSilenceHits = 0;
            }
            consecutiveVoiceHits = 0;
          }
          // B. Si la IA está hablando (orbState === 'speaking')
          else if (orbStateRef.current === 'speaking') {
            listeningSilenceHits = 0;
            // Ventana de gracia inicial: ignorar VAD durante los primeros 350ms del inicio del habla de la IA
            const timeSpeaking = Date.now() - speechStartTimeRef.current;
            if (timeSpeaking < 350) {
              consecutiveVoiceHits = 0;
              return;
            }

            // Umbral dinámico adaptativo: requiere superar el ruido ambiental + 35dB equiv. (mínimo absoluto 55)
            const requiredThreshold = Math.max(55, noiseFloorRef.current + 35);

            // Filtro de espectro vocal humano más estricto
            const isHumanSpeech = totalVolume >= requiredThreshold &&
              vocalAvg >= 35 &&
              (highAvg < 10 || vocalAvg > highAvg * 1.3);

            if (isHumanSpeech) {
              consecutiveVoiceHits++;
              // Requiere 10 lecturas consecutivas (~500ms de voz sostenida) para confirmar interrupción real
              if (consecutiveVoiceHits >= 10) {
                consecutiveVoiceHits = 0;

                // ⚡ ¡INTERRUPCIÓN POR VOZ HUMANA CONFIRMADA!
                if (audioRef.current) {
                  try {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  } catch (e) { }
                }
                const activeFiller = fillerAudioRef.current as HTMLAudioElement | null;
                if (activeFiller) {
                  try {
                    activeFiller.pause();
                    activeFiller.currentTime = 0;
                  } catch (e) { }
                  fillerAudioRef.current = null;
                }
                if (window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }

                setAiResponse('');
                setTranscript('');
                isProcessingRef.current = false;
                setOrbState('listening');
                try { 
                  if (recognitionRef.current) recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
                  recognitionRef.current?.start(); 
                } catch (e) { }
              }
            } else {
              consecutiveVoiceHits = Math.max(0, consecutiveVoiceHits - 1);
            }
          } else {
            consecutiveVoiceHits = 0;
            listeningSilenceHits = 0;
          }
        }, 50);
      } catch (err) {
        console.warn('Microphone VAD initialization error:', err);
      }
    };

    startMicVAD();

    return () => {
      if (vadIntervalRef.current) clearInterval(vadIntervalRef.current);
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
        micStreamRef.current = null;
      }
      if (micAudioCtxRef.current && micAudioCtxRef.current.state !== 'closed') {
        micAudioCtxRef.current.close();
        micAudioCtxRef.current = null;
      }
    };
  }, [isSessionActive]);

  // Inicializar Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          transcriptRef.current = currentTranscript;
          setTranscript(currentTranscript);

          // Reiniciar el temporizador de silencio cada vez que el usuario habla (reducido a 750ms)
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          silenceTimerRef.current = setTimeout(() => {
            if (recognitionRef.current && isSessionActiveRef.current && orbStateRef.current === 'listening') {
              try { recognitionRef.current.stop(); } catch (e) { }
              handleSendTranscript();
            }
          }, 750);
        };

        recognition.onend = () => {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          if (!isSessionActiveRef.current) {
            setOrbState('idle');
            return;
          }
          if (orbStateRef.current === 'listening') {
            handleSendTranscript();
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          if (event.error === 'no-speech' && isSessionActiveRef.current) {
            // Ignorar no-speech
          } else {
            setIsSessionActive(false);
            setOrbState('idle');
          }
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('SpeechRecognition API not supported in this browser.');
      }
      if (typeof window !== 'undefined') {
        audioRef.current = new Audio();
      }
    }
  }, []); // Run only on mount

  const handleSendTranscript = async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    // Detener el micrófono mientras la IA procesa y habla para evitar auto-interrupción
    try { recognitionRef.current?.stop(); } catch (e) { }

    const currentText = (transcriptRef.current || transcript).trim();
    transcriptRef.current = '';
    setTranscript('');

    if (!currentText) {
      isProcessingRef.current = false;
      if (isSessionActiveRef.current) {
        setOrbState('listening');
        try { 
          if (recognitionRef.current) recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
          recognitionRef.current?.start(); 
        } catch (e) { }
      } else {
        setOrbState('idle');
      }
      return;
    }

    setOrbState('thinking');

    // Detener cualquier temporizador o muletilla previa si estaba activa
    if (fillerTimerRef.current) {
      clearTimeout(fillerTimerRef.current);
      fillerTimerRef.current = null;
    }
    if (fillerAudioRef.current) {
      try {
        fillerAudioRef.current.pause();
        fillerAudioRef.current.currentTime = 0;
      } catch (e) { }
      fillerAudioRef.current = null;
    }

    // Se removió la reproducción de muletillas/frases de relleno durante la espera del LLM.
    const currentEngine = activeEngineRef.current;

    const newMessages = [...messagesRef.current, { role: 'user', content: currentText }];
    setMessages(newMessages);

    // Fetch al backend enviando el motor activo garantizando coincidencia
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ax-zyxe.onrender.com';
    try {
      const res = await fetch(`${apiUrl}/api/voice_chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          use_mock_tts: currentEngine === 'edge',
          user_id: userId,
          language: languageRef.current || 'es'
        })
      });
      const data = await res.json();

      // Cancelar temporizador y apagar la muletilla inmediatamente al llegar la respuesta real
      if (fillerTimerRef.current) {
        clearTimeout(fillerTimerRef.current);
        fillerTimerRef.current = null;
      }
      const activeFiller = fillerAudioRef.current as HTMLAudioElement | null;
      if (activeFiller) {
        try {
          activeFiller.pause();
          activeFiller.currentTime = 0;
        } catch (e) { }
        fillerAudioRef.current = null;
      }

      if (!res.ok) {
        console.warn("API Error:", data);
        const fallback = "Disculpa, mis servicios de inteligencia artificial están saturados en este momento. Intenta hablarme de nuevo en un par de minutos.";
        setAiResponse(fallback);
        speakResponseFallback(fallback);
        return;
      }

      if (data.used_engine) setActiveEngine(data.used_engine);
      if (data.chars_used !== undefined) setCharsUsed(data.chars_used);
      if (data.max_chars !== undefined) setMaxChars(data.max_chars);
      if (data.hours_until_reset !== undefined) setHoursUntilReset(data.hours_until_reset);

      if (data.url_to_open) {
        // Guardamos la URL en una referencia para abrirla automáticamente cuando termine de hablar
        urlToOpenRef.current = data.url_to_open;
      } else {
        urlToOpenRef.current = null;
      }

      const reply = data.reply;
      const audioBase64 = data.audio_base64;

      setAiResponse(reply);
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);

      if (audioBase64) {
        playAudioFromBase64(audioBase64);
      } else {
        // Fallback en caso de error en TTS backend
        speakResponseFallback(reply);
      }
    } catch (err) {
      console.error('Error fetching voice_chat:', err);
      isProcessingRef.current = false;
      if (fillerTimerRef.current) {
        clearTimeout(fillerTimerRef.current);
        fillerTimerRef.current = null;
      }
      const errFiller = fillerAudioRef.current as HTMLAudioElement | null;
      if (errFiller) {
        try {
          errFiller.pause();
          errFiller.currentTime = 0;
        } catch (e) { }
        fillerAudioRef.current = null;
      }
      setIsSessionActive(false);
      setOrbState('idle');
    }
  };

  const playAudioFromBase64 = (base64Str: string) => {
    // Garantizar que temporizador y muletilla se apagan antes de reproducir la voz de la IA
    if (fillerTimerRef.current) {
      clearTimeout(fillerTimerRef.current);
      fillerTimerRef.current = null;
    }
    if (fillerAudioRef.current) {
      try {
        fillerAudioRef.current.pause();
        fillerAudioRef.current.currentTime = 0;
      } catch (e) { }
      fillerAudioRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause(); // Stop any previous speech

      const audioUrl = `data:audio/mp3;base64,${base64Str}`;
      audioRef.current.src = audioUrl;

      audioRef.current.onplay = () => {
        speechStartTimeRef.current = Date.now();
        setOrbState('speaking');
        // Detener micrófono para evitar que capte el audio de los altavoces (auto-interrupción)
        try { recognitionRef.current?.stop(); } catch (e) { }
      };

      audioRef.current.onended = () => {
        isProcessingRef.current = false;
        setAiResponse('');
        setTranscript('');

        // 🚀 Si hay una URL pendiente, abrir en NUEVA PESTAÑA o redireccionar automáticamente
        if (urlToOpenRef.current) {
          try {
            const win = window.open(urlToOpenRef.current, '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
              window.location.href = urlToOpenRef.current;
            }
          } catch(e) {
            console.error('Popup blocked, redirecting in same window:', e);
            window.location.href = urlToOpenRef.current;
          }
          urlToOpenRef.current = null;
        }

        if (isSessionActiveRef.current) {
          setTimeout(() => {
            if (isSessionActiveRef.current) {
              setOrbState('listening');
              try { recognitionRef.current?.start(); } catch (e) { }
            }
          }, 500);
        } else {
          setOrbState('idle');
        }
      };

      audioRef.current.onerror = (e) => {
        console.error('Audio playback error', e);
        isProcessingRef.current = false;
        setIsSessionActive(false);
        setOrbState('idle');
      };

      audioRef.current.play().catch(e => {
        console.error('Error playing audio (Autoplay blocked)', e);
        isProcessingRef.current = false;
        // Si el navegador bloquea el audio inicial, al menos abrimos el micrófono
        if (isSessionActiveRef.current) {
          setOrbState('listening');
          try { 
            if (recognitionRef.current) recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
            recognitionRef.current?.start(); 
          } catch (err) { }
        }
      });
    }
  };

  const speakResponseFallback = (text: string) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageRef.current === 'en' ? 'en-US' : 'es-ES';
      utterance.onstart = () => {
        speechStartTimeRef.current = Date.now();
        setOrbState('speaking');
        try { recognitionRef.current?.stop(); } catch (e) { }
      };
      utterance.onend = () => {
        isProcessingRef.current = false;
        setAiResponse('');
        setTranscript('');

        // 🚀 Si hay una URL pendiente, abrir en NUEVA PESTAÑA o redireccionar automáticamente
        if (urlToOpenRef.current) {
          try {
            const win = window.open(urlToOpenRef.current, '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
              window.location.href = urlToOpenRef.current;
            }
          } catch(e) {
            console.error('Popup blocked, redirecting in same window:', e);
            window.location.href = urlToOpenRef.current;
          }
          urlToOpenRef.current = null;
        }

        if (isSessionActiveRef.current) {
          setTimeout(() => {
            if (isSessionActiveRef.current) {
              setOrbState('listening');
              try { recognitionRef.current?.start(); } catch (e) { }
            }
          }, 500);
        } else {
          setOrbState('idle');
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isSessionActive) {
      if (orbState === 'speaking' || orbState === 'thinking') {
        // Interrupción directa y limpia del usuario al tocar la orbe mientras la IA responde
        if (audioRef.current) {
          try {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          } catch (e) { }
        }
        if (fillerAudioRef.current) {
          try {
            fillerAudioRef.current.pause();
            fillerAudioRef.current.currentTime = 0;
          } catch (e) { }
          fillerAudioRef.current = null;
        }
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        setAiResponse('');
        setTranscript('');
        isProcessingRef.current = false;
        setOrbState('listening');
        try { 
          if (recognitionRef.current) recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
          recognitionRef.current?.start(); 
        } catch (e) { }
      } else {
        isProcessingRef.current = false;
        setIsSessionActive(false);
        setOrbState('idle');
        try { recognitionRef.current?.stop(); } catch (e) { }
        if (audioRef.current) audioRef.current.pause();
      }
    } else {
      isProcessingRef.current = false;
      setIsSessionActive(true);
      setTranscript('');
      setAiResponse('');

      if (audioRef.current) {
        audioRef.current.play().catch(() => { });
      }

      urlToOpenRef.current = null;
      setOrbState('listening');
      try { recognitionRef.current?.start(); } catch (e) { }
    }
  };

  // 🚀 Activar sesión y micrófono inmediatamente al seleccionar el idioma (sin saludo inicial para ahorrar tokens)
  useEffect(() => {
    if (userId && !isSessionActive && language !== null) {
      setIsSessionActive(true);
      setOrbState('listening');
      isProcessingRef.current = false;
      try { 
        if (recognitionRef.current) recognitionRef.current.lang = language === 'en' ? 'en-US' : 'es-CO';
        recognitionRef.current?.start(); 
      } catch (e) { }
    }
  }, [userId, isSessionActive, language]);

  return (
    <div className="ax-voice-root" data-theme={theme} style={{
      width: '100%',
      height: '100dvh',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme === 'light' ? '#f8f9fc' : '#000000',
      touchAction: 'none'
    }}>

      {/* 🌐 ULTRA-STYLIZED LANGUAGE SELECTION MODAL */}
      {language === null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: theme === 'light' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 22, 0.95)',
            padding: '36px 32px',
            borderRadius: '28px',
            textAlign: 'center',
            maxWidth: '380px',
            width: '100%',
            border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: theme === 'light' 
              ? '0 24px 48px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8) inset' 
              : '0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient accent glow */}
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none',
              borderRadius: '50%'
            }} />

            {/* Header Icon / Badge */}
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: theme === 'light' ? 'rgba(0, 102, 204, 0.08)' : 'rgba(99, 102, 241, 0.12)',
              border: theme === 'light' ? '1px solid rgba(0, 102, 204, 0.15)' : '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'light' ? '#0066cc' : '#818cf8'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h2 style={{
                color: theme === 'light' ? '#0f172a' : '#ffffff',
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontFamily: "'Outfit', sans-serif",
                margin: 0
              }}>
                AX Voice
              </h2>
              <p style={{
                color: theme === 'light' ? '#64748b' : '#94a3b8',
                fontSize: '13px',
                fontWeight: 400,
                margin: 0,
                lineHeight: '1.4'
              }}>
                Selecciona tu idioma / Select your language
              </p>
            </div>

            {/* Language Selection Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              {/* Option 1: Spanish */}
              <button 
                onClick={() => setLanguage('es')}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(255, 255, 255, 0.03)',
                  border: theme === 'light' ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid rgba(255, 255, 255, 0.07)',
                  color: theme === 'light' ? '#0f172a' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  outline: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? 'rgba(0, 102, 204, 0.06)' : 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(0, 102, 204, 0.3)' : 'rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = theme === 'light' ? '0 4px 12px rgba(0, 102, 204, 0.08)' : '0 4px 16px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(226, 232, 240, 0.8)' : 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Colombia SVG Flag */}
                  <div style={{
                    width: '24px',
                    height: '18px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="9" fill="#FCD116" />
                      <rect y="9" width="24" height="4.5" fill="#003893" />
                      <rect y="13.5" width="24" height="4.5" fill="#CE1126" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>Español</span>
                    <span style={{ fontSize: '11px', color: theme === 'light' ? '#64748b' : '#94a3b8' }}>Spanish</span>
                  </div>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '99px',
                  background: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                  color: theme === 'light' ? '#475569' : '#cbd5e1',
                  letterSpacing: '0.05em'
                }}>ES</span>
              </button>

              {/* Option 2: English */}
              <button 
                onClick={() => setLanguage('en')}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(255, 255, 255, 0.03)',
                  border: theme === 'light' ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid rgba(255, 255, 255, 0.07)',
                  color: theme === 'light' ? '#0f172a' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  outline: 'none'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? 'rgba(0, 102, 204, 0.06)' : 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(0, 102, 204, 0.3)' : 'rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = theme === 'light' ? '0 4px 12px rgba(0, 102, 204, 0.08)' : '0 4px 16px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(226, 232, 240, 0.8)' : 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* USA SVG Flag */}
                  <div style={{
                    width: '24px',
                    height: '18px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="18" fill="#B22234" />
                      <path d="M0 2.77h24M0 5.54h24M0 8.3h24M0 11.07h24M0 13.84h24M0 16.6h24" stroke="#FFFFFF" strokeWidth="1.38" />
                      <rect width="9.6" height="9.7" fill="#3C3B6E" />
                      <circle cx="2.4" cy="2.4" r="0.7" fill="#FFF" />
                      <circle cx="4.8" cy="2.4" r="0.7" fill="#FFF" />
                      <circle cx="7.2" cy="2.4" r="0.7" fill="#FFF" />
                      <circle cx="3.6" cy="4.8" r="0.7" fill="#FFF" />
                      <circle cx="6.0" cy="4.8" r="0.7" fill="#FFF" />
                      <circle cx="2.4" cy="7.2" r="0.7" fill="#FFF" />
                      <circle cx="4.8" cy="7.2" r="0.7" fill="#FFF" />
                      <circle cx="7.2" cy="7.2" r="0.7" fill="#FFF" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>English</span>
                    <span style={{ fontSize: '11px', color: theme === 'light' ? '#64748b' : '#94a3b8' }}>Inglés</span>
                  </div>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '99px',
                  background: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                  color: theme === 'light' ? '#475569' : '#cbd5e1',
                  letterSpacing: '0.05em'
                }}>EN</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Engine Status Badge & Theme Toggle — top left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0,0,0,0.5)',
        padding: '8px 14px',
        borderRadius: '999px',
        border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: theme === 'light' ? '0 4px 12px rgba(15, 23, 42, 0.05)' : 'none'
      }}>
        {(() => {
          const availableChars = Math.max(0, maxChars - charsUsed);
          const percentRemaining = Math.max(0, Math.round((availableChars / maxChars) * 100));
          const isElevenLabs = activeEngine === 'elevenlabs' && availableChars > 0;

          return (
            <>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isElevenLabs ? '#10b981' : '#f59e0b',
                boxShadow: isElevenLabs ? '0 0 8px #10b981' : '0 0 8px #f59e0b',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                fontSize: '11px',
                color: theme === 'light' ? '#0f172a' : '#ffffff',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}>
                {isElevenLabs
                  ? `ELEVENLABS HD • ${percentRemaining}% DISPONIBLE`
                  : `MODO FREE • EDGE TTS (REINICIO EN 48H)`}
              </span>
            </>
          );
        })()}
      </div>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 10
      }}>
        <GravityBackground theme={theme}>
          {/* Centered Content */}
          <div className="ax-voice-inner" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100dvh',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Subtle Pre-loader Spinner */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'spinnerFadeOut 0.5s ease 0.7s forwards',
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              <svg width="60" height="60" viewBox="0 0 100 100" style={{ animation: 'subtleSpin 1.5s linear infinite' }}>
                <circle cx="50" cy="50" r="48" fill="none" stroke={theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'} strokeWidth="2" />
                <circle cx="50" cy="50" r="48" fill="none" stroke={theme === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.2)'} strokeWidth="2" strokeDasharray="80 200" strokeLinecap="round" />
              </svg>
            </div>

            {/* AI Response Text Removed for Immersive Audio Experience */}

            {/* ORB */}
            <div
              style={{
                animation: 'orbReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '1/1',
                filter: orbState === 'listening' ? (theme === 'light' ? 'brightness(1.1) drop-shadow(0 0 30px rgba(0,0,0,0.15))' : 'brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.2))') : 'none',
                transition: 'filter 0.3s ease'
              }}
            >
              <VoiceOrb orbState={orbState} audioRef={audioRef} theme={theme} />
            </div>
          </div>
        </GravityBackground>
      </div>

      {/* MODAL DE CONFIRMACIÓN DE SALIDA */}
      {showExitModal && (
        <div className="md-logout-overlay">
          <div className="md-logout-modal">
            <h3>End Session?</h3>
            <p>Your voice session is securely saved. Are you sure you want to leave the immersive interface?</p>
            <div className="md-logout-actions">
              <button className="md-btn-cancel" onClick={() => setShowExitModal(false)}>Cancel</button>
              <button className="md-btn-confirm" onClick={() => {
                window.onbeforeunload = null;
                // APAGAR MICROFONO Y AUDIO AL SALIR
                setIsSessionActive(false);
                setOrbState('idle');
                if (recognitionRef.current) {
                  recognitionRef.current.stop();
                }
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                if (window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                router.push('/Panel');
              }}>Exit Voice</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        /* ── Body background para que no haya bleed blanco ── */
        html, body {
          background-color: ${theme === 'light' ? '#f5f5f7' : '#0b0b0d'} !important;
        }

        /* ── Mobile: pantallas menores a 700px ── */
        @media (max-width: 700px) {
          .ax-voice-root {
            height: 100vh !important;
            height: 100dvh !important;
            min-height: -webkit-fill-available;
          }
          .ax-voice-inner {
            height: 100vh !important;
            height: 100dvh !important;
            min-height: -webkit-fill-available;
          }
        }

        @keyframes bgFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes orbReveal {
          0% { opacity: 0; transform: scale(0.6) translateY(30px); filter: blur(40px); }
          50% { opacity: 0.6; filter: blur(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
        }
        @keyframes subtleSpin {
          100% { transform: rotate(360deg); }
        }
        @keyframes spinnerFadeOut {
          to { opacity: 0; visibility: hidden; }
        }

        /* MODAL STYLES (Copied from Dashboard Logout) */
        .md-logout-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(16px);
          z-index: 10000;
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
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.02);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .md-logout-modal h3 {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .md-logout-modal p {
          font-size: 14px;
          color: #a1a1aa;
          line-height: 1.5;
          margin-bottom: 32px;
        }

        .md-logout-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .md-btn-cancel, .md-btn-confirm {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.05em;
        }

        .md-btn-cancel {
          background: rgba(255, 255, 255, 0.05);
          color: #a1a1aa;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .md-btn-cancel:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .md-btn-confirm {
          background: #fff;
          color: #000;
          border: none;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        .md-btn-confirm:hover {
          background: #e2e2e5;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(16px); }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
