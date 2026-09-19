'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, fetchChatHistory, saveChatMessage } from '@/lib/supabaseClient';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import SettingsPopup from './components/SettingsPopup';
import ChatSidebar from './components/ChatSidebar';

export default function AXChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const router = useRouter();

  // 🔒 PROTECCIÓN DE RUTA PARA USUARIOS LOGUEADOS
  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/login');
      } else {
        setUserProfile({
          ...user.raw.user_metadata,
          email: user.email
        });
      }
    };
    checkUser();
  }, [router]);

  // 🚫 INTERCEPTAR NAVEGACIÓN (Atrás / Cierre)
  useEffect(() => {
    // 1. Advertencia nativa al recargar/cerrar pestaña
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. Interceptar el botón "Atrás" del navegador
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

  // 📥 CARGAR HISTORIAL DE SUPABASE
  useEffect(() => {
    const loadHistory = async () => {
      if (userProfile?.id) {
        const history = await fetchChatHistory(userProfile.id);
        if (history && history.length > 0) {
          setMessages(history);
          setHasStarted(true);
        }
      }
    };
    loadHistory();
  }, [userProfile]);

  useEffect(() => {
    // Read URL parameters on mount
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q');
    if (q) {
      setInputValue(q);
      // Clean the URL so refreshing doesn't keep populating it
      window.history.replaceState({}, '', '/AX_chat');
    }
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    if (!hasStarted) setHasStarted(true);

    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    // 💾 Guardar mensaje del usuario
    if (userProfile?.id) {
      saveChatMessage(userProfile.id, 'user', userMsg);
    }

    try {
      const response = await fetch('https://ax-zyxe.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        const aiResponse = data.reply;
        setMessages(prev => [...prev, {
          role: 'ai',
          content: aiResponse
        }]);
        // 💾 Guardar respuesta de la IA
        if (userProfile?.id) {
          saveChatMessage(userProfile.id, 'ai', aiResponse);
        }
      } else {
        setMessages(prev => [...prev, {
          role: 'ai',
          content: "System Error: AX Intelligence Core is currently offline or unreachable."
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "Network Error: Could not connect to AX Core."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <BackgroundWrapper theme="dark">
      <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>

        <ChatSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          userProfile={userProfile}
        />

        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>

          <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 60, display: 'flex', gap: 12 }}>
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 6,
                  color: '#fff',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* BOTÓN SALIR MANUAL */}
          <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 60 }}>
            <button
              onClick={() => setShowExitModal(true)}
              style={{
                background: 'rgba(20, 20, 20, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                backdropFilter: 'blur(10px)',
                transition: 'background 0.3s'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Exit
            </button>
          </div>

          <MessageList
            messages={messages}
            isTyping={isTyping}
            hasStarted={hasStarted}
          />

          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            hasStarted={hasStarted}
            setIsPopupOpen={setIsPopupOpen}
          />
        </div>
      </div>

      <SettingsPopup
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />

      {/* MODAL DE CONFIRMACIÓN DE SALIDA */}
      {showExitModal && (
        <div className="md-logout-overlay">
          <div className="md-logout-modal">
            <h3>End Session?</h3>
            <p>Your chat history is securely saved. Are you sure you want to leave the immersive interface?</p>
            <div className="md-logout-actions">
              <button className="md-btn-cancel" onClick={() => setShowExitModal(false)}>Cancel</button>
              <button className="md-btn-confirm" onClick={() => {
                window.onbeforeunload = null;
                router.push('/Panel');
              }}>Exit Chat</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .typing-dot {
          width: 5px;
          height: 5px;
          background-color: #888;
          border-radius: 50%;
          animation: typingBounce 1.4s infinite ease-in-out both;
        }

        /* MODAL STYLES (Copied from Dashboard Logout) */
        .md-logout-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
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
    </BackgroundWrapper>
  );
}
