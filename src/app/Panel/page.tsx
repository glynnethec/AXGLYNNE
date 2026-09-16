'use client';

import React from 'react';
import Header from '@/app/components/Header';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function PanelPage() {
  return (
    <>
      <Header />
      <BackgroundWrapper>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 20px 60px 20px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#111', margin: '0 0 24px 0', letterSpacing: '-0.04em' }}>
            Control Panel
          </h1>
          <p style={{ color: '#86868b', maxWidth: '500px', fontSize: '18px', lineHeight: 1.6, fontWeight: 300 }}>
            Welcome to the centralized management ecosystem.
          </p>
        </div>
      </BackgroundWrapper>
    </>
  );
}
