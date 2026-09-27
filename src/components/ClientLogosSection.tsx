'use client';

import React, { useState } from 'react';

export default function ClientLogosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const logos = [
    {
      name: 'SERVEX US',
      tag: 'Enterprise AI & BPO',
      src: '/LogosClientes/logo.png',
      alt: 'SERVEX US - Enterprise AI & Catalog Automation Client',
      height: 48
    },
    {
      name: 'CUN',
      tag: 'Higher Education',
      src: '/LogosClientes/CUN.svg',
      alt: 'Corporación Unificada Nacional CUN - Educational Institution',
      height: 56
    },
    {
      name: 'El Sol',
      tag: 'Enterprise Business',
      src: '/LogosClientes/Logo_el_sol.webp',
      alt: 'El Sol - Enterprise Business Client',
      height: 60
    },
    {
      name: 'Nido Automation',
      tag: 'Industrial Automation',
      src: '/LogosClientes/nido.svg',
      alt: 'Nido Automation - Industrial Automation Client',
      height: 54
    },
    {
      name: 'AXGLYNNE',
      tag: 'Core Infrastructure',
      src: '/logos/GLYNNE.png',
      alt: 'AXGLYNNE Enterprise AI Infrastructure Emblem',
      height: 48
    },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % logos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);

  return (
    <section style={{ 
      width: '100%', 
      minHeight: '40vh',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '4rem 1.5rem',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10
    }}>
      <style>{`
        .client-logos-title {
          font-size: 11px;
          font-weight: 600;
          color: #86868b;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .desktop-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 20px;
          max-width: 1200px;
          width: 100%;
        }
        .logo-card-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px 20px 18px 20px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          width: 210px;
          height: 160px;
          box-sizing: border-box;
        }
        .logo-card-item:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 16px 36px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.12);
        }
        .logo-card-item:hover img {
          filter: grayscale(0%) opacity(1) !important;
          transform: scale(1.05);
        }
        .mobile-carousel {
          display: none;
        }
        @media (max-width: 900px) {
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
        Proven in Production Environments
      </div>

      {/* Desktop Layout */}
      <div className="desktop-logos">
        {logos.map((logo, i) => (
          <div key={i} className="logo-card-item">
            {/* Logo Image */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={logo.src} 
                alt={logo.alt} 
                style={{ 
                  maxHeight: logo.height + 'px', 
                  maxWidth: '140px', 
                  objectFit: 'contain', 
                  filter: 'grayscale(100%) opacity(0.65)', 
                  transition: 'all 0.3s ease' 
                }} 
              />
            </div>

            {/* Structured Text & Badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#111111', letterSpacing: '-0.01em' }}>
                {logo.name}
              </span>
              <span style={{ 
                fontSize: '10px', 
                fontWeight: 500, 
                color: '#86868b', 
                textTransform: 'uppercase', 
                letterSpacing: '0.06em',
                backgroundColor: 'rgba(0,0,0,0.04)',
                padding: '3px 9px',
                borderRadius: '999px'
              }}>
                {logo.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel Layout */}
      <div className="mobile-carousel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '340px' }}>
          <button onClick={prev} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }} aria-label="Previous logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          
          <div style={{ 
            height: '170px', 
            width: '230px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '24px 16px 18px 16px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            boxSizing: 'border-box'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                key={`img-${currentIndex}`}
                src={logos[currentIndex].src} 
                alt={logos[currentIndex].alt} 
                style={{ maxHeight: logos[currentIndex].height + 'px', maxWidth: '140px', objectFit: 'contain', filter: 'grayscale(0%) opacity(1)', animation: 'fadeIn 0.3s ease' }} 
              />
            </div>
            
            <div key={`text-${currentIndex}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', animation: 'fadeIn 0.3s ease' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>
                {logos[currentIndex].name}
              </span>
              <span style={{ 
                fontSize: '10px', 
                fontWeight: 500, 
                color: '#86868b', 
                textTransform: 'uppercase', 
                letterSpacing: '0.06em',
                backgroundColor: 'rgba(0,0,0,0.04)',
                padding: '3px 9px',
                borderRadius: '999px'
              }}>
                {logos[currentIndex].tag}
              </span>
            </div>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>

          <button onClick={next} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }} aria-label="Next logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
          {logos.map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: i === currentIndex ? '#111111' : '#d2d2d7',
              transition: 'background-color 0.3s ease'
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
