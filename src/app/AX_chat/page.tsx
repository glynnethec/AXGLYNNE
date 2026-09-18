'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabaseClient';
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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    if (!hasStarted) setHasStarted(true);

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "I am the AX Glynne intelligence core. This is a demonstration environment. I have received your message: \"" + userMsg + "\". I am designed to analyze business processes and architect AI solutions. How else can I assist you with your enterprise transformation today?"
      }]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s
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
        .typing-dot {
          width: 5px;
          height: 5px;
          background-color: #888;
          border-radius: 50%;
          animation: typingBounce 1.4s infinite ease-in-out both;
        }
      `}} />
    </BackgroundWrapper>
  );
}
