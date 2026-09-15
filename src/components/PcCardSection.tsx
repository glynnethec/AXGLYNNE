'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function PcCardSection() {
  const router = useRouter();

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '4rem 1.5rem', position: 'relative', zIndex: 10, backgroundColor: 'transparent' }}>
      <style>{`
        @media (max-width: 700px) {
          .mobile-pccard-container {
            width: 92vw !important;
            padding: 40px 24px !important;
            flex-direction: column !important;
            text-align: center !important;
          }
          .mobile-pccard-text {
            text-align: center !important;
          }
          .mobile-pccard-btn-container {
            justify-content: center !important;
          }
          .mobile-pccard-img-wrapper {
            width: 100% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
          }
          .mobile-pccard-btn {
            width: 100% !important;
          }
        }
      `}</style>
      <div className="mobile-pccard-container" style={{ position: 'relative', zIndex: 10, width: '70vw', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px', padding: '80px 60px', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '32px', backgroundColor: 'transparent', backdropFilter: 'blur(10px)' }}>
        <div className="mobile-pccard-text" style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
            The Origins of Glynne.
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
            Discover the foundations of our architecture and how we integrate artificial intelligence into enterprise operations.
          </p>
          
          <div className="mobile-pccard-btn-container" style={{
            display: 'flex',
            gap: '16px',
            marginTop: '32px',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}>
            <button 
              className="mobile-pccard-btn"
              onClick={() => router.push('/Solutions')}
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
              Discover our current projects
            </button>
            
            <button 
              className="mobile-pccard-btn"
              onClick={() => router.push('/AX_chat')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                color: '#111111',
                border: '1px solid rgba(0,0,0,0.2)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111111'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Chat with AX, our AI
            </button>
          </div>
        </div>
        <div className="mobile-pccard-img-wrapper" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'center' }}>
          <img src="/pc.png" alt="Glynne Architecture" style={{ width: '100%', maxWidth: '600px', objectFit: 'contain', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.12))' }} />
        </div>
      </div>
    </div>
  );
}
