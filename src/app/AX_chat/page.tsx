'use client';

import React, { useState } from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import BackButton from './components/BackButton';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import SettingsPopup from './components/SettingsPopup';

export default function AXChatPage() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  React.useEffect(() => {
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
      <div style={{ 
        minHeight: '100vh', 
        width: '100%', 
        position: 'relative', 
        overflow: 'hidden'
      }}>
        
        <BackButton />

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

      <SettingsPopup 
        isPopupOpen={isPopupOpen} 
        setIsPopupOpen={setIsPopupOpen} 
      />

      <style dangerouslySetInnerHTML={{__html: `
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
