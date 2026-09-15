'use client';

import React from 'react';
import GravityBackground from '../AX_chat/components/GravityBackground';
import VoiceOrb from './components/VoiceOrb';
import BackButton from '../AX_chat/components/BackButton';

export default function AXVoicePage() {
  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: '#000000' 
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
              animation: 'orbReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both',
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1/1'
            }}>
              <VoiceOrb />
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
