import React, { useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  hasStarted: boolean;
}

export default function MessageList({ messages, isTyping, hasStarted }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: '6rem 2rem 150px 2rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: hasStarted ? 1 : 0,
      transition: 'opacity 0.6s ease',
      pointerEvents: hasStarted ? 'auto' : 'none',
      zIndex: 50
    }}>
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
         {messages.map((m, i) => (
           <div key={i} style={{
             display: 'flex',
             justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
             width: '100%'
           }}>
             <div style={{
               maxWidth: '80%',
               padding: m.role === 'user' ? '16px 24px' : '16px 0',
               borderRadius: '24px',
               fontSize: '15px',
               lineHeight: 1.6,
               backgroundColor: m.role === 'user' ? '#f5f5f7' : 'transparent',
               color: m.role === 'user' ? '#111111' : '#f5f5f7',
               border: 'none',
               borderBottomRightRadius: m.role === 'user' ? '6px' : '24px',
               borderBottomLeftRadius: m.role === 'ai' ? '6px' : '24px',
               boxShadow: m.role === 'user' ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
             }}>
               {m.content}
             </div>
           </div>
         ))}
         
         {isTyping && (
           <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
             <div style={{
               padding: '16px 0',
               display: 'flex',
               gap: '6px',
               alignItems: 'center'
             }}>
               <div className="typing-dot"></div>
               <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
               <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
             </div>
           </div>
         )}
         <div ref={messagesEndRef} style={{ height: '20px' }} />
      </div>
    </div>
  );
}
