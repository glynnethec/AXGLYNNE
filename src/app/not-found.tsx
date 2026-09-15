'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function NotFound() {
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
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#111111',
            marginBottom: '24px'
          }}>
            Error 404
          </div>
          
          <h1 style={{
            fontSize: 'clamp(64px, 10vw, 160px)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            color: '#111111',
            lineHeight: 1,
            margin: '0 0 24px 0'
          }}>
            404.
          </h1>
          
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#86868b',
            fontWeight: 300,
            maxWidth: '500px',
            lineHeight: 1.6,
            marginBottom: '48px'
          }}>
            The architecture you are looking for does not exist on this server. It may have been moved or is still under construction.
          </p>

          <Link 
            href="/"
            style={{
              padding: '16px 32px',
              borderRadius: '999px',
              backgroundColor: '#111111',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Return to Core
          </Link>
        </div>
      </BackgroundWrapper>
    </>
  );
}
