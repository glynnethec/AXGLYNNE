'use client';

import React from 'react';

export default function ClientLogosSection() {
  const logos = [
    { src: '/LogosClientes/logo.png', alt: 'GLYNNE', height: 35 },
    { src: '/LogosClientes/CUN.svg', alt: 'CUN', height: 40 },
    { src: '/LogosClientes/nido.svg', alt: 'Nido Automation', height: 45 },
    { src: '/LogosClientes/Logo_el_sol.webp', alt: 'El Sol', height: 50 },
  ];

  return (
    <section style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '2rem 1.5rem 6rem 1.5rem',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4rem',
        maxWidth: '1200px'
      }}>
        {logos.map((logo, i) => (
          <div key={i} style={{ 
            opacity: 0.5,
            filter: 'grayscale(100%) contrast(200%)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.filter = 'grayscale(0%) contrast(100%)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '0.5';
            e.currentTarget.style.filter = 'grayscale(100%) contrast(200%)';
          }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={logo.src} 
              alt={logo.alt} 
              style={{ maxHeight: logo.height + 'px', maxWidth: '180px', objectFit: 'contain' }} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
