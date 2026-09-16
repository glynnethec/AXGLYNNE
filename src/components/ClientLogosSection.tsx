'use client';

import React from 'react';

export default function ClientLogosSection() {
  const logos = [
    { src: '/LogosClientes/logo.png', alt: 'GLYNNE', height: 60 },
    { src: '/LogosClientes/CUN.svg', alt: 'CUN', height: 75 },
    { src: '/LogosClientes/nido.svg', alt: 'Nido Automation', height: 80 },
    { src: '/LogosClientes/Logo_el_sol.webp', alt: 'El Sol', height: 85 },
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
        gap: '6rem',
        maxWidth: '1200px'
      }}>
        {logos.map((logo, i) => (
          <div key={i} style={{ 
            opacity: 0.65,
            filter: 'grayscale(100%) contrast(150%)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'default'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.filter = 'grayscale(0%) contrast(100%)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '0.65';
            e.currentTarget.style.filter = 'grayscale(100%) contrast(150%)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={logo.src} 
              alt={logo.alt} 
              style={{ maxHeight: logo.height + 'px', maxWidth: '250px', objectFit: 'contain' }} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
