'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
import GravityBackground from '../AX_chat/components/GravityBackground';
import VoiceOrb from './components/VoiceOrb';
import BackButton from '../AX_chat/components/BackButton';

// Type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AXVoicePage() {
  const router = useRouter();

  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [useMockTTS, setUseMockTTS] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const orbStateRef = useRef(orbState);
  const isSessionActiveRef = useRef(isSessionActive);
  const useMockTTSRef = useRef(useMockTTS);

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
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'es-ES'; // o 'en-US'
        
        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognition.onend = () => {
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
        audioRef.current = new Audio();
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
      
      const newMessages = [...messages, { role: 'user', content: currentText }];
      setMessages(newMessages);

      // Fetch al backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      fetch(`${apiUrl}/api/voice_chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, use_mock_tts: useMockTTSRef.current })
      })
      .then(res => res.json())
      .then(data => {
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
      })
      .catch(err => {
        console.error('Error fetching voice_chat:', err);
        setIsSessionActive(false);
        setOrbState('idle');
      });

      return currentText;
    });
  };

  const playAudioFromBase64 = (base64Str: string) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop any previous speech
      
      const audioUrl = `data:audio/mp3;base64,${base64Str}`;
      audioRef.current.src = audioUrl;
      
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
        console.error('Audio playback error', e);
        setIsSessionActive(false);
        setOrbState('idle');
      };
      
      audioRef.current.play().catch(e => {
        console.error('Error playing audio', e);
        setIsSessionActive(false);
        setOrbState('idle');
      });
    }
  };

  const speakResponseFallback = (text: string) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
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
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isSessionActive) {
      setIsSessionActive(false);
      setOrbState('idle');
      recognitionRef.current?.stop();
      if (audioRef.current) audioRef.current.pause();
    } else {
      setIsSessionActive(true);
      setTranscript('');
      setAiResponse('');
      
      // DESBLOQUEAR EL MOTOR DE VOZ (Hack para navegadores estrictos)
      if (audioRef.current) {
        audioRef.current.play().catch(e => {
            // Se ignora el error porque src está vacío inicialmente
        });
      }
      
      setOrbState('listening');
      try { recognitionRef.current?.start(); } catch(e){}
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100dvh', /* Use dvh for strict mobile viewport without scrolling */
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: '#000000',
      touchAction: 'none' /* Prevents pull-to-refresh and dragging on mobile */
    }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
        <BackButton onClick={() => setShowExitModal(true)} />
      </div>

      {/* TTS Engine Toggle */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        right: '20px', 
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
      </div>
      
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 10
      }}>
        <GravityBackground>
          {/* Centered Content */}
          <div style={{
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
