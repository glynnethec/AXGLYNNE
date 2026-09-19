'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LiquidOrb from '@/app/AX_chat/components/LiquidOrb';

export default function OrbCardSection() {
  const router = useRouter();

  return (
    <div className="orb-section-container" style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '40px',
      marginTop: '80px',
      padding: '40px 48px',
      border: 'none',
      borderRadius: '24px',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      boxSizing: 'border-box'
    }}>
      <style>{`
        .orb-text-container {
          text-align: left;
        }
        .orb-button-container {
          justify-content: flex-start;
        }
        @media (max-width: 700px) {
          .orb-section-container {
            padding: 40px 20px !important;
            justify-content: center !important;
          }
          .orb-text-container, .orb-wrapper-container {
            min-width: 100% !important;
            flex: 1 1 100% !important;
          }
          .orb-text-container {
            text-align: center !important;
          }
          .orb-button-container {
            justify-content: center !important;
          }
        }
      `}</style>
      <div className="orb-text-container" style={{ flex: '1.2', position: 'relative', zIndex: 11, minWidth: '300px' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
          Not everything is Chat!
        </h1>
        <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
          Grab a coffee. Your first step toward innovation begins by talking with AX, the AXGLYNNE artificial intelligence. Together, you will brainstorm your bottlenecks, and AX will map out how our infrastructure and team can transform those blockers into automated systems.
        </p>

        <div className="orb-button-container" style={{
          display: 'flex',
          gap: '16px',
          marginTop: '32px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => router.push('/AX_voice')}
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              backgroundColor: '#111111',
              color: '#ffffff',
              border: '1px solid #111111',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Start a voice call
          </button>
        </div>
      </div>
      <div className="orb-wrapper-container" style={{ flex: '0.8', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '300px' }}>
        <div style={{ width: '100%', maxWidth: '320px', aspectRatio: '1/1', position: 'relative' }}>
          <LiquidOrb wireframe={true} />
        </div>
      </div>
    </div>
  );
}
