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
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const orbStateRef = useRef(orbState);

  // Keep ref in sync
  useEffect(() => {
    orbStateRef.current = orbState;
  }, [orbState]);

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
          if (orbStateRef.current === 'listening') {
             handleSendTranscript();
          } else {
             setOrbState('idle');
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setOrbState('idle');
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('SpeechRecognition API not supported in this browser.');
      }
      
      if (window.speechSynthesis) {
        synthRef.current = window.speechSynthesis;
      }
    }
  }, []); // Run only on mount

  const handleSendTranscript = async () => {
    // Usamos el valor actual del estado 'transcript' usando una referencia u obteniéndolo directamente
    setTranscript((currentText) => {
      if (!currentText.trim()) {
        setOrbState('idle');
        return currentText;
      }
      
      setOrbState('thinking');
      
      const newMessages = [...messages, { role: 'user', content: currentText }];
      setMessages(newMessages);

      // Fetch al backend
      fetch('http://localhost:8001/api/voice_chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      .then(res => res.json())
      .then(data => {
        const reply = data.reply;
        setAiResponse(reply);
        setMessages(prev => [...prev, { role: 'ai', content: reply }]);
        speakResponse(reply);
      })
      .catch(err => {
        console.error('Error fetching voice_chat:', err);
        setOrbState('idle');
      });

      return currentText;
    });
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel(); // Stop any previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.pitch = 1.0;
      utterance.rate = 1.0;
      
      utterance.onstart = () => {
        setOrbState('speaking');
      };
      
      utterance.onend = () => {
        setOrbState('idle');
        setTranscript('');
        setAiResponse('');
      };
      
      utterance.onerror = (e) => {
        console.error('SpeechSynthesis error', e);
        setOrbState('idle');
      };
      
      synthRef.current.speak(utterance);
    } else {
      setOrbState('idle');
    }
  };

  const toggleListening = () => {
    if (orbState === 'listening') {
      recognitionRef.current?.stop();
      // El onend lanzará handleSendTranscript
    } else {
      setTranscript('');
      setAiResponse('');
      
      // DESBLOQUEAR EL MOTOR DE VOZ (Hack para navegadores estrictos)
      if (synthRef.current) {
        synthRef.current.cancel();
        const unlock = new SpeechSynthesisUtterance('');
        synthRef.current.speak(unlock);
      }
      
      setOrbState('listening');
      recognitionRef.current?.start();
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
      <BackButton />
      
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

            {/* AI Response Text */}
            <div style={{
              position: 'absolute',
              top: '15%',
              width: '80%',
              maxWidth: '600px',
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 400,
              opacity: aiResponse ? 1 : 0,
              transition: 'opacity 0.5s ease',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              zIndex: 20
            }}>
              {aiResponse}
            </div>

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

            {/* User Transcript Text */}
            <div style={{
              position: 'absolute',
              bottom: '20%',
              width: '80%',
              maxWidth: '600px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
              minHeight: '24px',
              zIndex: 20
            }}>
              {transcript || (orbState === 'listening' ? "Listening..." : "Tap the orb to speak")}
            </div>
            
          </div>
        </GravityBackground>
      </div>

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
      `}} />
    </div>
  );
}
