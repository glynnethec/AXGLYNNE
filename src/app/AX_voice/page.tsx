'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import { backendFetch, usePageAbort } from '@/lib/backendFetch';
import BackgroundWrapper from '@/components/BackgroundWrapper';
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
  const pageSignal = usePageAbort();
  const isMountedRef = useRef(true);

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [unsupportedBrowser, setUnsupportedBrowser] = useState(false);

  // 🔒 PROTECCIÓN DE RUTA PARA USUARIOS LOGUEADOS
  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
        if (user.id) {
          setUserId(user.id);
        }
      }
    };
    checkUser();
  }, [router]);

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
  const committedTranscriptRef = useRef<string>('');
  const sessionTranscriptRef = useRef<string>('');
  const readyToSendRef = useRef<boolean>(false);
  const flushTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastVoiceActivityRef = useRef<number>(0);
  const lastSttResultTimeRef = useRef<number>(0);
  const turnAbortRef = useRef<AbortController | null>(null);
  const lastSentUserTextRef = useRef<string>('');
  const messagesRef = useRef<{ role: string, content: string }[]>([]);

  // Helper: evalúa si la frase parece incompleta (conector al final o muy corta) para dar más margen de pausa
  const isLikelyIncompleteThought = (text: string): boolean => {
    const cleaned = text.trim().toLowerCase().replace(/[.,;]+$/, '');
    if (!cleaned) return false;
    const words = cleaned.split(/\s+/);
    if (words.length <= 3 && !/[?!)…]$/.test(text.trim())) return true;
    const lastWord = words[words.length - 1];
    const connectors = new Set([
      'y', 'e', 'o', 'u', 'pero', 'porque', 'como', 'que', 'de', 'del', 'a', 'al',
      'con', 'para', 'por', 'sin', 'sobre', 'entre', 'hacia', 'hasta', 'entonces',
      'ademas', 'además', 'tambien', 'también', 'cuando', 'donde', 'dónde', 'si', 'aunque',
      'and', 'or', 'but', 'because', 'as', 'that', 'of', 'to', 'with', 'for', 'from',
      'about', 'into', 'so', 'also', 'when', 'where', 'if', 'although', 'like'
    ]);
    return connectors.has(lastWord);
  };

  // ⚡ Helper de interrupción instantánea (Barge-In <120ms en speaking o thinking)
  const interruptAiImmediate = (preserveLastUserTurn: boolean = false) => {
    if (turnAbortRef.current) {
      try { turnAbortRef.current.abort(); } catch { }
      turnAbortRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (flushTimerRef.current) {
      clearTimeout(flushTimerRef.current);
      flushTimerRef.current = null;
    }
    if (audioRef.current) {
      try {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      } catch { }
    }
    if (fillerAudioRef.current) {
      try {
        fillerAudioRef.current.pause();
        fillerAudioRef.current.currentTime = 0;
      } catch { }
      fillerAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch { }
    }

    urlToOpenRef.current = null;
    setAiResponse('');
    isProcessingRef.current = false;
    readyToSendRef.current = false;

    if (preserveLastUserTurn && lastSentUserTextRef.current) {
      // Si el usuario interrumpió mientras estaba "thinking", recuperamos lo que acababa de decir
      // para concatenarlo con lo que sigue hablando y no perder su contexto
      const prevMsgs = messagesRef.current;
      if (prevMsgs.length > 0 && prevMsgs[prevMsgs.length - 1].role === 'user') {
        setMessages(prevMsgs.slice(0, -1));
      }
      committedTranscriptRef.current = lastSentUserTextRef.current;
      sessionTranscriptRef.current = '';
      transcriptRef.current = lastSentUserTextRef.current;
      setTranscript(lastSentUserTextRef.current);
      lastSentUserTextRef.current = '';
    } else {
      committedTranscriptRef.current = '';
      sessionTranscriptRef.current = '';
      transcriptRef.current = '';
      setTranscript('');
      lastSentUserTextRef.current = '';
    }

    lastVoiceActivityRef.current = Date.now();
    setOrbState('listening');
    try {
      if (recognitionRef.current) {
        recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
        recognitionRef.current.start();
      }
    } catch { }
  };

  // Dispara el cierre de turno esperando un micro-flush (160ms) para no perder la última palabra del buffer STT
  const triggerTurnSendWithFlush = () => {
    if (isProcessingRef.current || readyToSendRef.current) return;
    readyToSendRef.current = true;
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    try { recognitionRef.current?.stop(); } catch { }
    if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    flushTimerRef.current = setTimeout(() => {
      flushTimerRef.current = null;
      handleSendTranscript();
    }, 160);
  };

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

  const handleSelectLanguage = (lang: 'es' | 'en') => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('ax_voice_language', lang);
      } catch { }
    }
  };

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
            const isSpeakingNow = totalVolume >= noiseFloorRef.current + 6 || vocalAvg >= 18;
            if (isSpeakingNow) {
              lastVoiceActivityRef.current = Date.now();
              listeningSilenceHits = 0;
            } else {
              const currentText = transcriptRef.current.trim();
              if (currentText.length > 0 && !isProcessingRef.current && !readyToSendRef.current) {
                listeningSilenceHits++;
                const now = Date.now();
                const msSinceVoice = now - (lastVoiceActivityRef.current || now);
                const msSinceStt = now - (lastSttResultTimeRef.current || now);
                // Si la frase parece incompleta (termina en conector o <4 palabras sin signo), damos 1700ms de margen; si es completa, 1150ms
                const requiredSilenceMs = isLikelyIncompleteThought(currentText) ? 1700 : 1150;
                if (msSinceVoice >= requiredSilenceMs && msSinceStt >= requiredSilenceMs) {
                  listeningSilenceHits = 0;
                  triggerTurnSendWithFlush();
                }
              } else {
                listeningSilenceHits = 0;
              }
            }
            consecutiveVoiceHits = 0;
          }
          // B. Si la IA está hablando o pensando (orbState === 'speaking' || orbState === 'thinking')
          else if (orbStateRef.current === 'speaking' || orbStateRef.current === 'thinking') {
            listeningSilenceHits = 0;
            if (orbStateRef.current === 'speaking') {
              // Ventana de gracia inicial corta (200ms) al arrancar el audio de la IA
              const timeSpeaking = Date.now() - speechStartTimeRef.current;
              if (timeSpeaking < 200) {
                consecutiveVoiceHits = 0;
                return;
              }
            }

            // Umbral calibrado con Hardware Echo Cancellation (AEC) para detectar voz humana real sin requerir gritar
            const requiredThreshold = Math.max(26, noiseFloorRef.current + 15);
            const isHumanSpeech =
              totalVolume >= requiredThreshold &&
              vocalAvg >= 20 &&
              (highAvg < 12 || vocalAvg > highAvg * 1.15);

            if (isHumanSpeech) {
              consecutiveVoiceHits++;
              // 4 lecturas consecutivas a 30ms (~120ms) = Barge-In instantáneo y natural
              if (consecutiveVoiceHits >= 4) {
                consecutiveVoiceHits = 0;
                const wasThinking = orbStateRef.current === 'thinking';
                interruptAiImmediate(wasThinking);
              }
            } else {
              consecutiveVoiceHits = Math.max(0, consecutiveVoiceHits - 1);
            }
          } else {
            consecutiveVoiceHits = 0;
            listeningSilenceHits = 0;
          }
        }, 30);
      } catch (err: any) {
        if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
          setIsSessionActive(false);
          setOrbState('idle');
        } else {
          console.warn('Microphone VAD initialization error:', err);
        }
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

  // Inicializar Web Speech API y gestionar limpieza automática al salir de AX_voice
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onresult = (event: any) => {
          // Reconstruir SIEMPRE desde i = 0 para no perder las frases ya finalizadas en pausas intermedias
          let fullSessionText = '';
          for (let i = 0; i < event.results.length; ++i) {
            const chunk = event.results[i][0]?.transcript || '';
            fullSessionText += chunk;
          }
          sessionTranscriptRef.current = fullSessionText.trim();
          const combined = [committedTranscriptRef.current, sessionTranscriptRef.current]
            .filter(Boolean)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

          transcriptRef.current = combined;
          setTranscript(combined);
          lastSttResultTimeRef.current = Date.now();
          lastVoiceActivityRef.current = Date.now();

          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Respaldo de silencio semántico: espera más tiempo si la frase parece estar a mitad de idea
          const waitMs = isLikelyIncompleteThought(combined) ? 1800 : 1250;
          silenceTimerRef.current = setTimeout(() => {
            if (!isSessionActiveRef.current || orbStateRef.current !== 'listening' || isProcessingRef.current) return;
            const msSinceMicVoice = Date.now() - (lastVoiceActivityRef.current || 0);
            if (msSinceMicVoice >= 950) {
              triggerTurnSendWithFlush();
            }
          }, waitMs);
        };

        recognition.onend = () => {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          if (!isSessionActiveRef.current) {
            setOrbState('idle');
            return;
          }
          if (orbStateRef.current === 'listening' && !isProcessingRef.current) {
            if (readyToSendRef.current) {
              if (flushTimerRef.current) {
                clearTimeout(flushTimerRef.current);
                flushTimerRef.current = null;
              }
              handleSendTranscript();
            } else {
              // El navegador cerró la sesión de STT antes de que el usuario terminara de hablar:
              // guardamos lo acumulado en committedTranscriptRef y reabrimos el micrófono sin cortar la frase
              if (sessionTranscriptRef.current) {
                committedTranscriptRef.current = [committedTranscriptRef.current, sessionTranscriptRef.current]
                  .filter(Boolean)
                  .join(' ')
                  .replace(/\s+/g, ' ')
                  .trim();
                sessionTranscriptRef.current = '';
              }
              try {
                if (recognitionRef.current) {
                  recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
                  recognitionRef.current.start();
                }
              } catch { }
            }
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'no-speech' && isSessionActiveRef.current) {
            // Ignorar no-speech
          } else if (event.error === 'not-allowed') {
            setIsSessionActive(false);
            setOrbState('idle');
          } else {
            console.error('Speech recognition error', event.error);
            setIsSessionActive(false);
            setOrbState('idle');
          }
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('SpeechRecognition API not supported in this browser.');
        setUnsupportedBrowser(true);
      }
      if (typeof window !== 'undefined') {
        audioRef.current = new Audio();
      }
    }

    const stopAllAudioAndMic = () => {
      isSessionActiveRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      if (fillerTimerRef.current) {
        clearTimeout(fillerTimerRef.current);
        fillerTimerRef.current = null;
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onresult = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.abort();
          recognitionRef.current.stop();
        } catch (e) { }
        recognitionRef.current = null;
      }
      if (micStreamRef.current) {
        try {
          micStreamRef.current.getTracks().forEach(track => {
            track.stop();
            track.enabled = false;
          });
        } catch (e) { }
        micStreamRef.current = null;
      }
      if (vadIntervalRef.current) {
        clearInterval(vadIntervalRef.current);
        vadIntervalRef.current = null;
      }
      if (micAudioCtxRef.current && micAudioCtxRef.current.state !== 'closed') {
        try { micAudioCtxRef.current.close(); } catch (e) { }
        micAudioCtxRef.current = null;
      }
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
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) { }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch (e) { }
        }
        if (micStreamRef.current) {
          try {
            micStreamRef.current.getAudioTracks().forEach(track => { track.enabled = false; });
          } catch (e) { }
        }
      } else if (document.visibilityState === 'visible') {
        if (isSessionActiveRef.current && !isMutedRef.current) {
          if (micStreamRef.current) {
            try {
              micStreamRef.current.getAudioTracks().forEach(track => { track.enabled = true; });
            } catch (e) { }
          }
          if (orbStateRef.current === 'listening') {
            try { recognitionRef.current?.start(); } catch (e) { }
          }
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('pagehide', stopAllAudioAndMic);
    }

    return () => {
      isMountedRef.current = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pagehide', stopAllAudioAndMic);
      }
      stopAllAudioAndMic();
    };
  }, []); // Run only on mount

  const handleSendTranscript = async () => {
    if (isProcessingRef.current) return;
    if (flushTimerRef.current) {
      clearTimeout(flushTimerRef.current);
      flushTimerRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    const currentText = (transcriptRef.current || committedTranscriptRef.current || transcript).trim();
    committedTranscriptRef.current = '';
    sessionTranscriptRef.current = '';
    transcriptRef.current = '';
    readyToSendRef.current = false;
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

    isProcessingRef.current = true;
    lastSentUserTextRef.current = currentText;

    // Detener el reconocimiento STT mientras la IA procesa y habla (el WebRTC VAD sigue activo para Barge-In)
    try { recognitionRef.current?.stop(); } catch (e) { }

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

    const currentEngine = activeEngineRef.current;

    const newMessages = [...messagesRef.current, { role: 'user', content: currentText }];
    setMessages(newMessages);

    // AbortController dedicado a este turno para poder abortar al instante si el usuario interrumpe en "thinking"
    if (turnAbortRef.current) {
      try { turnAbortRef.current.abort(); } catch { }
    }
    const turnController = new AbortController();
    turnAbortRef.current = turnController;
    const onPageAbort = () => turnController.abort();
    pageSignal?.addEventListener?.('abort', onPageAbort, { once: true });

    // Fetch al backend enviando el motor activo garantizando coincidencia y cancelación al salir o interrumpir
    try {
      const res = await backendFetch('/api/voice_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          use_mock_tts: currentEngine === 'edge',
          user_id: userId,
          language: languageRef.current || 'es'
        }),
        signal: turnController.signal
      });
      const data = await res.json();
      lastSentUserTextRef.current = '';

      // Si el usuario navegó a otra página o cerró la sesión, abortar inmediatamente
      if (!isMountedRef.current || !isSessionActiveRef.current) {
        isProcessingRef.current = false;
        return;
      }

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
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // Operación cancelada limpiamente al abandonar la página
        isProcessingRef.current = false;
        return;
      }
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

        if (isSessionActiveRef.current) {
          setTimeout(() => {
            if (isSessionActiveRef.current && orbStateRef.current !== 'speaking') {
              setOrbState('listening');
              try {
                if (recognitionRef.current) recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
                recognitionRef.current?.start();
              } catch (e) { }
            }
          }, 150);
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

        if (isSessionActiveRef.current) {
          setTimeout(() => {
            if (isSessionActiveRef.current && orbStateRef.current !== 'speaking') {
              setOrbState('listening');
              try {
                if (recognitionRef.current) recognitionRef.current.lang = languageRef.current === 'en' ? 'en-US' : 'es-CO';
                recognitionRef.current?.start();
              } catch (e) { }
            }
          }, 150);
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
        // Interrupción inmediata al tocar la orbe mientras la IA responde o piensa
        interruptAiImmediate(orbState === 'thinking');
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
      const timer = setTimeout(() => {
        setIsSessionActive(true);
        setOrbState('listening');
        isProcessingRef.current = false;
        try {
          if (recognitionRef.current) recognitionRef.current.lang = language === 'en' ? 'en-US' : 'es-CO';
          recognitionRef.current?.start();
        } catch { }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [userId, isSessionActive, language]);

  if (!isAuthenticated) return null;

  return (
    <div className="ax-voice-root" data-theme={theme} style={{
      width: '100%',
      height: '100dvh',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: theme === 'light' ? '#f5f5f7' : '#0b0b0d'
    }}>
      {/* 🌐 PANEL-STYLED LANGUAGE SELECTION MODAL */}
      {language === null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{
            position: 'relative',
            backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
            backgroundImage: theme === 'light'
              ? 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)'
              : 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.25)' : '1px solid rgba(255, 255, 255, 0.25)',
            borderTop: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.4)' : '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '6px',
            padding: '32px 28px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: theme === 'light'
              ? '0 20px 50px rgba(0, 0, 0, 0.12), inset 0 0 30px rgba(0, 0, 0, 0.02)'
              : '0 24px 60px rgba(0, 0, 0, 0.85), inset 0 0 40px rgba(255, 255, 255, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>

            {/* Top Bar Terminal Header Decorator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingBottom: '12px',
              borderBottom: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme === 'light' ? '#000' : '#ff5f56' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme === 'light' ? 'rgba(0,0,0,0.4)' : '#ffbd2e' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme === 'light' ? 'rgba(0,0,0,0.2)' : '#27c93f' }} />
              </div>
              <span style={{
                fontFamily: "var(--font-orbitron), 'SF Mono', Monaco, monospace",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: theme === 'light' ? '#64748b' : '#8e8e93',
                textTransform: 'uppercase'
              }}>
                SYSTEM // LANGUAGE PROTOCOL
              </span>
            </div>

            {/* GLYNNE SVG Logo + Header */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <svg
                width="38"
                height="38"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
              >
                <path d="M 50 248.252 L 50 456.751 192.750 457.379 C 271.263 457.725, 361.262 458.287, 392.750 458.628 L 450 459.248 L 450 250.748 L 450 42.249 307.250 41.621 C 228.737 41.275, 138.738 40.713, 107.250 40.372 L 50 39.752 50 248.252 M 67 248.291 L 67 440.765 108.250 441.368 C 130.938 441.700, 213.287 442.244, 291.250 442.577 L 433 443.184 433 250.709 L 433 58.235 391.750 57.632 C 369.063 57.300, 286.712 56.756, 208.750 56.423 L 67 55.816 67 248.291 M 128.116 83.980 C 107.992 89.424, 91.038 105.784, 83.655 126.882 C 81.077 134.249, 80.576 137.340, 80.204 148.180 C 79.673 163.622, 81.383 172.548, 87.025 183.787 C 93.772 197.229, 104.680 208.233, 117.500 214.531 C 127.055 219.225, 134.751 221, 145.550 221 C 174.345 221, 198.757 203.773, 206.388 178.068 C 207.554 174.140, 208 168.537, 208 157.818 L 208 143 176.500 143 L 145 143 145 155 L 145 167 160.500 167 C 177.973 167, 177.379 166.666, 174.859 175.078 C 173.124 180.868, 168.620 185.570, 161.405 189.122 C 148.447 195.501, 134.730 192.833, 124.556 181.956 C 108.755 165.064, 109.516 135.415, 126.170 119.022 C 133.040 112.260, 140.029 109.650, 149.673 110.246 C 159.182 110.834, 166.448 114.382, 172.726 121.503 L 177.445 126.854 184.577 119.177 C 188.499 114.955, 192.964 110.008, 194.498 108.185 L 197.288 104.869 192.894 100.309 C 186.535 93.709, 177.818 88.354, 168.578 85.369 C 157.254 81.711, 138.840 81.079, 128.116 83.980 M 221 151.500 L 221 219 260 219 L 299 219 L 299 205.500 L 299 192 L 275.500 192 L 252 192 252 138 L 252 84 236.500 84 L 221 84 221 151.500 M 299 84.506 C 299 84.785, 310.025 101.546, 323.500 121.754 L 348 158.496 348 188.748 L 348 219 L 363.500 219 L 379 219 L 379.001 189.250 L 379.001 159.500 404 122 L 429 84.500 410.809 84.227 C 397.075 84.020, 392.328 84.265, 391.434 85.227 C 390.782 85.927, 384.737 95.050, 378 105.500 C 371.263 115.950, 365.244 125.032, 364.625 125.682 C 363.777 126.573, 360.071 121.580, 349.595 105.432 L 335.691 84 317.345 84 C 307.255 84, 299 84.228, 299 84.506 M 85 313 L 85 377 99.989 377 L 114.977 377 L 115.239 337.600 L 115.500 298.201 140.825 337.600 L 166.150 377 L 181.075 377 L 196 377 196 313 L 196 249 L 181.012 249 L 166.023 249 165.762 288.132 L 165.500 327.264 L 140.500 288.179 L 115.500 249.094 L 100.250 249.047 L 85 249 85 313 M 214 313 L 214 377 L 228.988 377 L 243.977 377 L 244.238 337.996 L 244.500 298.993 269.500 337.975 L 294.500 376.956 L 309.250 376.978 L 324 377 L 324 313 L 324 249 L 309.511 249 L 295.023 249 L 294.761 288.502 L 294.500 328.005 L 269.115 288.502 L 243.730 249 L 228.865 249 L 214 249 214 313 M 343 313 L 343 377 L 380.030 377 L 417.060 377 L 416.780 364.250 L 416.500 351.500 394.250 351.231 L 372 350.962 L 372 338.481 L 372 326 L 393.500 326 L 415 326 L 415 313 L 415 300 L 393.500 300 L 372 300 L 372 287.519 L 372 275.038 L 394.250 274.769 L 416.500 274.500 L 416.780 261.750 L 417.060 249 L 380.030 249 L 343 249 L 343 313" stroke="none" fill="currentColor" fillRule="evenodd" />
              </svg>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h2 style={{
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  fontFamily: "var(--font-orbitron), 'SF Mono', Monaco, monospace",
                  textTransform: 'uppercase',
                  margin: 0
                }}>
                  AX Voice Core
                </h2>
                <p style={{
                  color: theme === 'light' ? '#475569' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '11px',
                  fontWeight: 500,
                  fontFamily: "'SF Mono', Monaco, monospace",
                  margin: 0,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  SELECCIONA TU IDIOMA / SELECT YOUR LANGUAGE
                </p>
              </div>
            </div>

            {/* Language Selection Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {/* Option 1: Spanish */}
              <button
                onClick={() => handleSelectLanguage('es')}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  background: theme === 'light' ? '#ffffff' : '#000000',
                  border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  outline: 'none',
                  fontFamily: "'SF Mono', Monaco, monospace"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? '#000000' : '#ffffff';
                  e.currentTarget.style.color = theme === 'light' ? '#ffffff' : '#000000';
                  e.currentTarget.style.borderColor = theme === 'light' ? '#000000' : '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  const subtext = e.currentTarget.querySelector('.lang-subtext') as HTMLElement;
                  if (subtext) subtext.style.color = theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
                  const badge = e.currentTarget.querySelector('.lang-badge') as HTMLElement;
                  if (badge) {
                    badge.style.background = theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
                    badge.style.color = theme === 'light' ? '#ffffff' : '#000000';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? '#ffffff' : '#000000';
                  e.currentTarget.style.color = theme === 'light' ? '#000000' : '#ffffff';
                  e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const subtext = e.currentTarget.querySelector('.lang-subtext') as HTMLElement;
                  if (subtext) subtext.style.color = theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.6)';
                  const badge = e.currentTarget.querySelector('.lang-badge') as HTMLElement;
                  if (badge) {
                    badge.style.background = theme === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.1)';
                    badge.style.color = theme === 'light' ? '#000000' : '#ffffff';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Colombia SVG Flag */}
                  <div style={{
                    width: '26px',
                    height: '18px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    display: 'flex',
                    border: '1px solid rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}>
                    <svg width="26" height="18" viewBox="0 0 24 18" fill="none">
                      <rect width="24" height="9" fill="#FCD116" />
                      <rect y="9" width="24" height="4.5" fill="#003893" />
                      <rect y="13.5" width="24" height="4.5" fill="#CE1126" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Español</span>
                    <span className="lang-subtext" style={{ fontSize: '10px', color: theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s ease' }}>NATIVO / LATAM</span>
                  </div>
                </div>
                <span className="lang-badge" style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '3px',
                  background: theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s ease'
                }}>ES</span>
              </button>

              {/* Option 2: English */}
              <button
                onClick={() => handleSelectLanguage('en')}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  background: theme === 'light' ? '#ffffff' : '#000000',
                  border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  outline: 'none',
                  fontFamily: "'SF Mono', Monaco, monospace"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? '#000000' : '#ffffff';
                  e.currentTarget.style.color = theme === 'light' ? '#ffffff' : '#000000';
                  e.currentTarget.style.borderColor = theme === 'light' ? '#000000' : '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  const subtext = e.currentTarget.querySelector('.lang-subtext') as HTMLElement;
                  if (subtext) subtext.style.color = theme === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
                  const badge = e.currentTarget.querySelector('.lang-badge') as HTMLElement;
                  if (badge) {
                    badge.style.background = theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
                    badge.style.color = theme === 'light' ? '#ffffff' : '#000000';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = theme === 'light' ? '#ffffff' : '#000000';
                  e.currentTarget.style.color = theme === 'light' ? '#000000' : '#ffffff';
                  e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const subtext = e.currentTarget.querySelector('.lang-subtext') as HTMLElement;
                  if (subtext) subtext.style.color = theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.6)';
                  const badge = e.currentTarget.querySelector('.lang-badge') as HTMLElement;
                  if (badge) {
                    badge.style.background = theme === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.1)';
                    badge.style.color = theme === 'light' ? '#000000' : '#ffffff';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* USA SVG Flag */}
                  <div style={{
                    width: '26px',
                    height: '18px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    display: 'flex',
                    border: '1px solid rgba(255,255,255,0.2)',
                    flexShrink: 0
                  }}>
                    <svg width="26" height="18" viewBox="0 0 24 18" fill="none">
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>English</span>
                    <span className="lang-subtext" style={{ fontSize: '10px', color: theme === 'light' ? '#64748b' : 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s ease' }}>GLOBAL / US</span>
                  </div>
                </div>
                <span className="lang-badge" style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 9px',
                  borderRadius: '3px',
                  background: theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)',
                  color: theme === 'light' ? '#000000' : '#ffffff',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s ease'
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
        <BackgroundWrapper theme={theme}>
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

            {/* ORB Container with Floor Shadow matching Panel */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
              <div
                style={{
                  animation: 'orbReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both',
                  width: '100%',
                  aspectRatio: '1/1',
                  filter: orbState === 'listening' ? (theme === 'light' ? 'brightness(1.1) drop-shadow(0 0 30px rgba(0,0,0,0.15))' : 'brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.2))') : 'none',
                  transition: 'filter 0.3s ease',
                  zIndex: 20
                }}
              >
                <VoiceOrb orbState={orbState} audioRef={audioRef} theme={theme} />
              </div>

              {/* Floor Radial Shadow matching Panel */}
              <div 
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: theme === 'light'
                    ? 'radial-gradient(circle, rgba(15, 23, 42, 0.10) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(0, 0, 0, 0.9) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: 10,
                  transform: 'translateY(190px) rotateX(75deg)',
                  transition: 'opacity 0.3s ease'
                }}
              />
            </div>
          </div>
        </BackgroundWrapper>
      </div>

      {/* MODAL DE CONFIRMACIÓN DE SALIDA */ }
  {
    showExitModal && (
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
    )
  }

  {/* ⚠️ BROWSER COMPATIBILITY NOTICE MODAL */}
  {unsupportedBrowser && (
    <div className="md-logout-overlay">
      <div className="md-logout-modal">
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', opacity: 0.6, marginBottom: '8px', textTransform: 'uppercase' }}>
          {"/// HARDWARE_COMPATIBILITY_ALERT"}
        </div>
        <h3>Browser Voice Engine Required</h3>
        <p>
          Your current browser does not natively support the Web Speech API required for real-time acoustic transcription.
          For optimal voice performance, please use <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.
        </p>
        <div className="md-logout-actions">
          <button className="md-btn-confirm" onClick={() => router.push('/Panel')}>
            Return to Panel
          </button>
          <button className="md-btn-cancel" onClick={() => setUnsupportedBrowser(false)}>
            Dismiss
          </button>
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

        /* MODAL STYLES (Theme Aware) */
        .md-logout-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: ${theme === 'light' ? 'rgba(245, 245, 247, 0.75)' : 'rgba(0, 0, 0, 0.85)'};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .md-logout-modal {
          position: relative;
          background-color: ${theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 22, 0.95)'};
          background-image: ${theme === 'light'
        ? 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)'
        : 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)'};
          background-size: 20px 20px, 20px 20px;
          border: 1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
          border-radius: 20px;
          padding: 40px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: ${theme === 'light'
        ? '0 20px 50px rgba(0, 0, 0, 0.1)'
        : '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.02)'};
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .md-logout-modal h3 {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: ${theme === 'light' ? '#0f172a' : '#fff'};
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .md-logout-modal p {
          font-size: 14px;
          color: ${theme === 'light' ? '#64748b' : '#a1a1aa'};
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
          background: ${theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
          color: ${theme === 'light' ? '#475569' : '#a1a1aa'};
          border: 1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
        }

        .md-btn-cancel:hover {
          background: ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
          color: ${theme === 'light' ? '#0f172a' : '#fff'};
        }

        .md-btn-confirm {
          background: ${theme === 'light' ? '#0f172a' : '#fff'};
          color: ${theme === 'light' ? '#fff' : '#000'};
          border: none;
          box-shadow: ${theme === 'light' ? '0 4px 14px rgba(15, 23, 42, 0.2)' : '0 0 20px rgba(255, 255, 255, 0.2)'};
        }

        .md-btn-confirm:hover {
          background: ${theme === 'light' ? '#1e293b' : '#e2e2e5'};
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
