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
  const { theme, toggleTheme } = useTheme();

  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [useMockTTS, setUseMockTTS] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentSourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const orbStateRef = useRef(orbState);
  const isSessionActiveRef = useRef(isSessionActive);
  const useMockTTSRef = useRef(useMockTTS);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fillerAudioRef = useRef<HTMLAudioElement | null>(null);

  // Keep refs in sync
  useEffect(() => {
    orbStateRef.current = orbState;
    isSessionActiveRef.current = isSessionActive;
    useMockTTSRef.current = useMockTTS;
  }, [orbState, isSessionActive, useMockTTS]);

  // 🔒 PROTECCIÓN DE RUTA PARA USUARIOS LOGUEADOS
  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login'); 
      }
    };
    checkUser();
  }, [router]);

  // 🔒 PROTECCIÓN CONTRA SALIDA ACCIDENTAL
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // Required for some browsers to show the prompt
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Empujar un estado al historial para evitar que el primer "Atrás" abandone la página
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      // Evitar la navegación empujando de nuevo el estado
      window.history.pushState(null, '', window.location.href);
      setShowExitModal(true);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Inicializar Web Speech API (Solo una vez)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES'; // o 'en-US'
        
        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);

          // Reiniciar el temporizador de silencio cada vez que el usuario hable
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }
          
          // Si el usuario deja de hablar por 2.5 segundos, detenemos la grabación
          silenceTimerRef.current = setTimeout(() => {
            if (recognitionRef.current) {
              recognitionRef.current.stop();
            }
          }, 2500);
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
            // Ignore no-speech errors, it will trigger onend and we will restart
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
        const audio = new Audio();
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');
        audioRef.current = audio;

        if ('speechSynthesis' in window) {
          window.speechSynthesis.getVoices();
          if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => {
              window.speechSynthesis.getVoices();
            };
          }
        }
      }
    }
  }, []); // Run only on mount

  const handleSendTranscript = async () => {
    // Usamos el valor actual del estado 'transcript' usando una referencia u obteniéndolo directamente
    setTranscript((currentText) => {
      if (!currentText.trim()) {
        if (isSessionActiveRef.current) {
          setOrbState('listening');
          try { recognitionRef.current?.start(); } catch(e){}
        } else {
          setOrbState('idle');
        }
        return currentText;
      }
      
      setOrbState('thinking');
      
      // Reproducir sonido de relleno aleatorio (muletilla) mientras la IA procesa
      const fillers = ['/fillers/filler_1.mp3', '/fillers/filler_2.mp3', '/fillers/filler_3.mp3', '/fillers/filler_4.mp3'];
      const randomFiller = fillers[Math.floor(Math.random() * fillers.length)];
      fillerAudioRef.current = new Audio(randomFiller);
      fillerAudioRef.current.play().catch(e => console.log('Autoplay prevented', e));
      
      const newMessages = [...messages, { role: 'user', content: currentText }];
      setMessages(newMessages);

      // Fetch al backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ax-zyxe.onrender.com';
      fetch(`${apiUrl}/api/voice_chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, use_mock_tts: useMockTTSRef.current })
      })
      .then(res => res.json())
      .then(data => {
        // Detener la muletilla en cuanto llega la respuesta real
        if (fillerAudioRef.current) {
          fillerAudioRef.current.pause();
          fillerAudioRef.current.currentTime = 0;
        }

        const reply = data.reply;
        const audioBase64 = data.audio_base64;
        
        setAiResponse(reply);
        setMessages(prev => [...prev, { role: 'ai', content: reply }]);
        
        if (audioBase64) {
          playAudioFromBase64(audioBase64, reply);
        } else {
          // Fallback en caso de error en TTS backend
          speakResponseFallback(reply);
        }
      })
      .catch(err => {
        console.error('Error fetching voice_chat:', err);
        setIsSessionActive(false);
        setOrbState('idle');
      });

      return currentText;
    });
  };

  const playAudioFromBase64 = (base64Str: string, fallbackText: string) => {
    // 1. Detener reconocimiento para liberar el micrófono en móviles
    try { recognitionRef.current?.stop(); } catch(e){}

    // Fallback con Web Audio API (AudioContext) para sortear bloqueos de Safari iOS
    const playWithAudioContext = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current && AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx) {
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          const binaryString = window.atob(base64Str);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          ctx.decodeAudioData(bytes.buffer.slice(0), (buffer) => {
            if (currentSourceNodeRef.current) {
              try { currentSourceNodeRef.current.stop(); } catch(e){}
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            currentSourceNodeRef.current = source;
            setOrbState('speaking');
            
            source.onended = () => {
              setAiResponse('');
              setTranscript('');
              if (isSessionActiveRef.current) {
                setOrbState('listening');
                try { recognitionRef.current?.start(); } catch(e){}
              } else {
                setOrbState('idle');
              }
            };
            source.start(0);
          }, (decodeErr) => {
            console.error('AudioContext decode error, fallback to speech synthesis:', decodeErr);
            speakResponseFallback(fallbackText);
          });
          return true;
        }
      } catch (err) {
        console.warn('AudioContext playback error:', err);
      }
      return false;
    };

    if (audioRef.current) {
      audioRef.current.pause();
      
      const audioUrl = `data:audio/mp3;base64,${base64Str}`;
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      audioRef.current.onplay = () => {
        setOrbState('speaking');
      };
      
      audioRef.current.onended = () => {
        setAiResponse('');
        setTranscript('');
        if (isSessionActiveRef.current) {
          setOrbState('listening');
          try { recognitionRef.current?.start(); } catch(e){}
        } else {
          setOrbState('idle');
        }
      };
      
      audioRef.current.onerror = (e) => {
        console.warn('HTMLAudio error on mobile, trying AudioContext fallback:', e);
        const played = playWithAudioContext();
        if (!played) {
          speakResponseFallback(fallbackText);
        }
      };
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn('HTMLAudio play() rejected on mobile, using AudioContext fallback:', e);
          const played = playWithAudioContext();
          if (!played) {
            speakResponseFallback(fallbackText);
          }
        });
      }
    } else {
      const played = playWithAudioContext();
      if (!played) {
        speakResponseFallback(fallbackText);
      }
    }
  };

  const speakResponseFallback = (text: string) => {
    if (!text) {
      if (isSessionActiveRef.current) {
        setOrbState('listening');
        try { recognitionRef.current?.start(); } catch(e){}
      } else {
        setOrbState('idle');
      }
      return;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch(e){}
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Buscar voz en español si está disponible
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith('es'));
      if (esVoice) {
        utterance.voice = esVoice;
      }

      utterance.onstart = () => setOrbState('speaking');
      utterance.onend = () => {
        setAiResponse('');
        setTranscript('');
        if (isSessionActiveRef.current) {
          setOrbState('listening');
          try { recognitionRef.current?.start(); } catch(e){}
        } else {
          setOrbState('idle');
        }
      };
      utterance.onerror = (err) => {
        console.error('SpeechSynthesis error:', err);
        if (isSessionActiveRef.current) {
          setOrbState('listening');
          try { recognitionRef.current?.start(); } catch(e){}
        } else {
          setOrbState('idle');
        }
      };
      window.speechSynthesis.speak(utterance);
    } else {
      if (isSessionActiveRef.current) {
        setOrbState('listening');
        try { recognitionRef.current?.start(); } catch(e){}
      } else {
        setOrbState('idle');
      }
    }
  };

  const toggleListening = () => {
    if (isSessionActive) {
      setIsSessionActive(false);
      setOrbState('idle');
      recognitionRef.current?.stop();
      if (audioRef.current) audioRef.current.pause();
      if (currentSourceNodeRef.current) {
        try { currentSourceNodeRef.current.stop(); } catch(e){}
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch(e){}
      }
    } else {
      setIsSessionActive(true);
      setTranscript('');
      setAiResponse('');
      
      // DESBLOQUEAR EL MOTOR DE AUDIO PARA MÓVILES (iOS Safari y Android)
      // 1. Desbloquear HTMLAudio con un buffer silencioso real
      const SILENT_AUDIO = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      if (audioRef.current) {
        audioRef.current.src = SILENT_AUDIO;
        audioRef.current.play().catch(() => {});
      } else {
        const audio = new Audio(SILENT_AUDIO);
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');
        audio.play().catch(() => {});
        audioRef.current = audio;
      }

      // 2. Desbloquear AudioContext en el evento táctil
      if (typeof window !== 'undefined') {
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            if (!audioCtxRef.current) {
              audioCtxRef.current = new AudioCtx();
            }
            if (audioCtxRef.current.state === 'suspended') {
              audioCtxRef.current.resume();
            }
          }
        } catch(e) {}
      }

      // 3. Desbloquear SpeechSynthesis nativo para iOS Safari
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const silentUtterance = new SpeechSynthesisUtterance('');
          silentUtterance.volume = 0;
          window.speechSynthesis.speak(silentUtterance);
        } catch(e) {}
      }
      
      setOrbState('listening');
      try { recognitionRef.current?.start(); } catch(e){}
    }
  };

  return (
    <div className="ax-voice-root" style={{ 
      width: '100%', 
      height: '100dvh',
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: theme === 'light' ? '#f5f5f7' : '#000000',
      touchAction: 'none'
    }}>
      {/* TTS Engine Toggle — top left */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0,0,0,0.5)',
        padding: '8px 12px',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <span style={{ fontSize: '11px', color: useMockTTS ? '#fff' : '#666', fontWeight: useMockTTS ? 600 : 400, transition: 'all 0.3s' }}>DEV (FREE)</span>
        <div 
          onClick={() => setUseMockTTS(!useMockTTS)}
          style={{
            width: '36px',
            height: '20px',
            background: useMockTTS ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
        >
          <div style={{
            width: '16px',
            height: '16px',
            background: useMockTTS ? '#fff' : '#000',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: useMockTTS ? '2px' : '18px',
            transition: 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }} />
        </div>
        <span style={{ fontSize: '11px', color: !useMockTTS ? '#fff' : '#666', fontWeight: !useMockTTS ? 600 : 400, transition: 'all 0.3s' }}>PREMIUM</span>
        {/* Theme divider */}
        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            transition: 'color 0.3s'
          }}
        >
          {theme === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>
      </div>
      
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 10
      }}>
        <GravityBackground>
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
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="80 200" strokeLinecap="round" />
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
                cursor: 'pointer',
                filter: orbState === 'listening' ? 'brightness(1.5) drop-shadow(0 0 30px rgba(255,255,255,0.2))' : 'none',
                transition: 'filter 0.3s ease'
              }}
              onClick={toggleListening}
            >
              <VoiceOrb orbState={orbState === 'thinking' ? 'thinking' : 'idle'} />
            </div>

            {/* Minimal Status Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              width: '100%',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              zIndex: 20,
              transition: 'opacity 0.3s ease',
              opacity: orbState === 'idle' ? 1 : 0.5
            }}>
              {orbState === 'listening' ? "Listening..." : 
               orbState === 'thinking' ? "Processing..." : 
               orbState === 'speaking' ? "Speaking..." : 
               "Tap to interact"}
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
                if (currentSourceNodeRef.current) {
                  try { currentSourceNodeRef.current.stop(); } catch(e){}
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

      <style dangerouslySetInnerHTML={{__html: `
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
