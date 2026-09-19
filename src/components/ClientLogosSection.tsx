'use client';

import React, { useState } from 'react';

export default function ClientLogosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const logos = [
    { src: '/LogosClientes/logo.png', alt: 'SERVEX', height: 60 },
    { src: '/LogosClientes/CUN.svg', alt: 'CUN', height: 75 },
    { src: '/LogosClientes/Logo_el_sol.webp', alt: 'El Sol', height: 85 },
    { src: '/LogosClientes/nido.svg', alt: 'Nido Automation', height: 80 },
    { src: '/logos/GLYNNE.png', alt: 'GLYNNE', height: 60 },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % logos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);

  return (
    <section style={{ 
      width: '100%', 
      minHeight: '50vh',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        .client-logos-title {
          font-size: 12px;
          font-weight: 500;
          color: #8f8f96;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 4rem;
          text-align: center;
        }
        .desktop-logos {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          max-width: 1400px;
        }
        .mobile-carousel {
          display: none;
        }
        @media (max-width: 700px) {
          .desktop-logos {
            display: none !important;
          }
          .mobile-carousel {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
        }
      `}</style>

      <div className="client-logos-title">
        Deployed At
      </div>

      {/* Desktop Layout */}
      <div className="desktop-logos">
        {logos.map((logo, i) => (
          <div key={i} style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '20px 12px',
            background: 'rgba(250, 250, 252, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'default',
            width: '220px',
            height: '150px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)';
            const img = e.currentTarget.querySelector('img');
            if (img) img.style.filter = 'grayscale(0%) contrast(100%)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.02)';
            const img = e.currentTarget.querySelector('img');
            if (img) img.style.filter = 'grayscale(100%) opacity(0.7)';
          }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={logo.src} 
              alt={logo.alt} 
              style={{ maxHeight: (logo.height * 0.8) + 'px', maxWidth: '160px', objectFit: 'contain', filter: 'grayscale(100%) opacity(0.7)', transition: 'all 0.4s ease' }} 
            />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#333', textAlign: 'center', letterSpacing: '-0.01em' }}>
              {logo.alt}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Carousel Layout */}
      <div className="mobile-carousel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '340px' }}>
          <button onClick={prev} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          
          <div style={{ 
            height: '180px', 
            width: '240px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '20px',
            padding: '24px 16px',
            background: 'rgba(250, 250, 252, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              key={`img-${currentIndex}`}
              src={logos[currentIndex].src} 
              alt={logos[currentIndex].alt} 
              style={{ maxHeight: (logos[currentIndex].height * 0.8) + 'px', maxWidth: '160px', objectFit: 'contain', filter: 'grayscale(100%) opacity(0.8)', animation: 'fadeIn 0.3s ease' }} 
            />
            <span key={`text-${currentIndex}`} style={{ fontSize: '14px', fontWeight: 600, color: '#333', textAlign: 'center', letterSpacing: '-0.01em', animation: 'fadeIn 0.3s ease' }}>
              {logos[currentIndex].alt}
            </span>
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>

          <button onClick={next} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
          {logos.map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: i === currentIndex ? '#111111' : '#e5e5e5',
              transition: 'background-color 0.3s ease'
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
