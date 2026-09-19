import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      bottom: hasStarted ? '180px' : '0',
      padding: '6rem 2rem 20px 2rem',
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
               {m.role === 'user' ? (
                 m.content
               ) : (
                 <ReactMarkdown 
                   remarkPlugins={[remarkGfm]}
                   components={{
                     p: ({node, ...props}) => <p style={{ margin: '0 0 1em 0' }} {...props} />,
                     ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5em', margin: '0 0 1em 0', listStyleType: 'disc' }} {...props} />,
                     ol: ({node, ...props}) => <ol style={{ paddingLeft: '1.5em', margin: '0 0 1em 0', listStyleType: 'decimal' }} {...props} />,
                     li: ({node, ...props}) => <li style={{ marginBottom: '0.5em' }} {...props} />,
                     h1: ({node, ...props}) => <h1 style={{ fontSize: '1.5em', fontWeight: '600', margin: '1em 0 0.5em', color: '#fff' }} {...props} />,
                     h2: ({node, ...props}) => <h2 style={{ fontSize: '1.3em', fontWeight: '600', margin: '1em 0 0.5em', color: '#fff' }} {...props} />,
                     h3: ({node, ...props}) => <h3 style={{ fontSize: '1.1em', fontWeight: '600', margin: '1em 0 0.5em', color: '#fff' }} {...props} />,
                     strong: ({node, ...props}) => <strong style={{ fontWeight: 600, color: '#fff' }} {...props} />,
                     code: ({node, ...props}) => <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2em 0.4em', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }} {...props} />,
                     a: ({node, ...props}) => <a style={{ color: '#60a5fa', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" {...props} />
                   }}
                 >
                   {m.content}
                 </ReactMarkdown>
               )}
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
