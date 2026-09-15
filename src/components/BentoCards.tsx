'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BentoCards() {
  const router = useRouter();

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: '24px',
      padding: '40px 48px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
      textAlign: 'left',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ width: '100%' }}>
        <h3 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 24px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Automate. Integrate. Evolve.
        </h3>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <button 
            onClick={() => router.push('/About')}
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
            Explore Glynne
          </button>
          <button 
            onClick={() => router.push('/Solutions')}
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
            Build with us
          </button>
        </div>
      </div>
    </div>
  );
}
