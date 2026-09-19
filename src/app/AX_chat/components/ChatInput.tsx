import React from 'react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: (e: React.FormEvent) => void;
  hasStarted: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
}

export default function ChatInput({ inputValue, setInputValue, handleSend, hasStarted, setIsPopupOpen }: ChatInputProps) {
  return (
    <div className={`chat-input-wrapper ${hasStarted ? 'started' : ''}`} style={{
      position: 'fixed',
      left: '50%',
      bottom: hasStarted ? '2rem' : '50%',
      transform: hasStarted ? 'translate(-50%, 0)' : 'translate(-50%, 50%)',
      width: 'calc(100% - 4rem)',
      maxWidth: hasStarted ? '900px' : '700px',
      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Centered Heading */}
      <h1 style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translate(-50%, -3rem)',
        fontSize: 'clamp(32px, 5vw, 48px)',
        fontWeight: 400,
        color: '#f5f5f7',
        letterSpacing: '-0.02em',
        margin: 0,
        textAlign: 'center',
        opacity: hasStarted ? 0 : 1,
        pointerEvents: hasStarted ? 'none' : 'auto',
        transition: 'opacity 0.4s ease',
        whiteSpace: 'nowrap'
      }}>
        How can AX help you today?
      </h1>

      <form onSubmit={handleSend} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: hasStarted ? 'rgba(20, 20, 20, 0.7)' : '#111111',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '16px',
        boxShadow: hasStarted ? '0 10px 30px rgba(0,0,0,0.5)' : '0 12px 40px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.5s ease'
      }}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e as any);
            }
          }}
          placeholder="Message AX Intelligence Core..."
          rows={hasStarted ? 1 : 3}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '15px',
            color: '#f5f5f7',
            width: '100%',
            padding: '4px',
            fontWeight: 300,
            backgroundColor: 'transparent',
            fontFamily: 'inherit',
            resize: 'none',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
            transition: 'all 0.5s ease'
          }}
        />

        {/* Tools Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px',
        }}>
          {/* Left Tools (Icons) */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

            {/* Attachment Icon */}
            <button type="button" style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#a1a1a6', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
            </button>



            {/* Orb Toggle Switch */}
            <button 
              type="button" 
              onClick={() => setIsPopupOpen(true)} 
              title="Activate Visualizer"
              style={{ 
                background: '#2c2c2e', 
                border: '1px solid rgba(255,255,255,0.05)',
                height: '24px',
                padding: '0 10px 0 26px', // Extra space on left for the thumb
                borderRadius: '16px',
                cursor: 'pointer', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '6px',
                transition: 'background 0.3s ease',
                fontSize: '11px',
                fontWeight: 600,
                color: '#8e8e93',
                letterSpacing: '0.02em',
                userSelect: 'none'
              }}
            >
              {/* The "Bolita" (Thumb) is a simple clean white circle */}
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                position: 'absolute',
                left: '1px',
                transition: 'transform 0.3s ease'
              }} />
              AX Voice
            </button>
          </div>

          {/* Right Tools */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Microphone Icon */}
            <button type="button" style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#a1a1a6', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>

            {/* Submit Button (Arrow Icon) */}
            <button type="submit" disabled={!inputValue.trim()} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: inputValue.trim() ? '#ffffff' : '#3a3a3c',
              borderRadius: '50%',
              color: inputValue.trim() ? '#111111' : '#8e8e93',
              cursor: inputValue.trim() ? 'pointer' : 'default',
              border: 'none',
              transition: 'all 0.3s ease'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translateX(-1px)' }}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </button>
          </div>
        </div>
      </form>
      
      {/* Subtext */}
      <div className="chat-subtext" style={{
        fontSize: '11px',
        color: '#888',
        marginTop: '1rem',
        opacity: hasStarted ? 1 : 0,
        transition: 'opacity 0.5s ease 0.3s',
        textAlign: 'center'
      }}>
        AX Glynne AI can make mistakes. Consider verifying important information.
      </div>
      
      <style>{`
        @media (max-width: 700px) {
          .chat-subtext {
            display: none !important;
          }
          .chat-input-wrapper.started {
            bottom: 1rem !important;
            width: calc(100% - 2rem) !important;
          }
        }
      `}</style>
    </div>
  );
}
