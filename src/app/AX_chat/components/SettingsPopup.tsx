import React from 'react';
import LiquidOrb from './LiquidOrb';
import GravityBackground from './GravityBackground';

interface SettingsPopupProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (isOpen: boolean) => void;
}

export default function SettingsPopup({ isPopupOpen, setIsPopupOpen }: SettingsPopupProps) {
  const [isMinimized, setIsMinimized] = React.useState(false);

  React.useEffect(() => {
    if (isPopupOpen) {
      const audio = new Audio('/Tones/soundreality-notification-center-443093.mp3');
      audio.volume = 0.6; // Slightly softer so it's not jarring
      audio.play().catch(e => console.log('Audio play blocked:', e));
    } else {
      setIsMinimized(false);
    }
  }, [isPopupOpen]);

  if (!isPopupOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: isMinimized ? 'calc(100vh - 5rem)' : 0, 
        left: isMinimized ? '50%' : 0,
        right: isMinimized ? 'auto' : 0,
        bottom: isMinimized ? 'auto' : 0,
        width: isMinimized ? '180px' : '100vw',
        height: isMinimized ? '44px' : '100vh',
        transform: isMinimized ? 'translateX(-50%)' : 'none',
        borderRadius: isMinimized ? '22px' : '0px',
        overflow: 'hidden',
        zIndex: 1000,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        backgroundColor: isMinimized ? '#1c1c1e' : 'transparent',
        boxShadow: isMinimized ? '0 10px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.2)' : 'none',
        border: isMinimized ? '1px solid rgba(255,255,255,0.1)' : 'none',
        cursor: isMinimized ? 'pointer' : 'default',
        animation: isMinimized ? 'none' : 'bgFadeIn 0.3s ease'
      }}
      onClick={() => {
        if (isMinimized) setIsMinimized(false);
      }}
    >
      <style>{`
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
      `}</style>

      {/* Minimized Label */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        opacity: isMinimized ? 1 : 0,
        pointerEvents: isMinimized ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        zIndex: 20
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34c759' }} />
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#f5f5f7' }}>AX Voice Active</span>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: isMinimized ? 0 : 1,
        pointerEvents: isMinimized ? 'none' : 'auto',
        transition: 'opacity 0.4s ease',
        zIndex: 10
      }}>
        <GravityBackground>
          {/* Minimize Button (-) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            style={{
              position: 'absolute',
              top: '2.5rem',
              right: '5.5rem',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 1001,
              animation: 'bgFadeIn 0.8s ease',
              opacity: 0.6
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Minimize"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          {/* Premium Close Button (X) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsPopupOpen(false);
            }}
            style={{
              position: 'absolute',
              top: '2.5rem',
              right: '2.5rem',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 1001,
              animation: 'bgFadeIn 0.8s ease',
              opacity: 0.6
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Centered Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
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

            <div style={{
              animation: 'orbReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both'
            }}>
              <LiquidOrb />
            </div>
          </div>
        </GravityBackground>
      </div>
    </div>
  );
}
