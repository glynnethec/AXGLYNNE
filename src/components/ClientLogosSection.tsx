'use client';

import React, { useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export default function ClientLogosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const logos = [
    {
      name: 'SERVEX US',
      src: '/LogosClientes/logo.png',
      alt: 'SERVEX US - Enterprise AI & Catalog Automation Client',
      height: 48
    },
    {
      name: 'CUN',
      src: '/LogosClientes/CUN.svg',
      alt: 'Corporación Unificada Nacional CUN - Educational Institution',
      height: 56
    },
    {
      name: 'El Sol',
      src: '/LogosClientes/Logo_el_sol.webp',
      alt: 'El Sol - Enterprise Business Client',
      height: 60
    },
    {
      name: 'Nido Automation',
      src: '/LogosClientes/nido.svg',
      alt: 'Nido Automation - Industrial Automation Client',
      height: 54
    },
    {
      name: 'AXGLYNNE',
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
          color: ${isDark ? '#ffffff' : '#86868b'};
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
          background: ${isDark ? 'rgba(20, 20, 26, 0.75)' : 'rgba(255, 255, 255, 0.6)'};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: ${isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.06)'};
          border-radius: 20px;
          box-shadow: ${isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.02)'};
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          width: 210px;
          height: 140px;
          box-sizing: border-box;
        }
        .logo-card-item:hover {
          transform: translateY(-4px);
          background: ${isDark ? 'rgba(30, 30, 38, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          box-shadow: ${isDark ? '0 16px 36px rgba(0,0,0,0.6)' : '0 16px 36px rgba(0,0,0,0.06)'};
          border-color: ${isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.12)'};
        }
        .logo-card-item:hover img {
          filter: ${isDark ? 'brightness(0) invert(1) opacity(1)' : 'brightness(0) opacity(1)'} !important;
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
                  filter: isDark ? 'brightness(0) invert(1) opacity(0.75)' : 'grayscale(100%) brightness(0.2) opacity(0.7)', 
                  transition: 'all 0.3s ease' 
                }} 
              />
            </div>

            {/* Name Only */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.01em' }}>
                {logo.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel Layout */}
      <div className="mobile-carousel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '340px' }}>
          <button onClick={prev} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px' }} aria-label="Previous logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#ffffff" : "#666"} strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          
          <div style={{ 
            height: '140px', 
            width: '230px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '24px 16px 18px 16px',
            background: isDark ? 'rgba(20, 20, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
            borderRadius: '20px',
            boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.04)',
            boxSizing: 'border-box'
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                key={`img-${currentIndex}`}
                src={logos[currentIndex].src} 
                alt={logos[currentIndex].alt} 
                style={{ maxHeight: logos[currentIndex].height + 'px', maxWidth: '140px', objectFit: 'contain', filter: isDark ? 'brightness(0) invert(1) opacity(0.9)' : 'brightness(0) opacity(0.85)', animation: 'fadeIn 0.3s ease' }} 
              />
            </div>
            
            <div key={`text-${currentIndex}`} style={{ marginTop: '10px', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: isDark ? '#ffffff' : '#111', letterSpacing: '-0.01em' }}>
                {logos[currentIndex].name}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#ffffff" : "#666"} strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem' }}>
          {logos.map((_, i) => (
            <div key={i} style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: i === currentIndex ? (isDark ? '#ffffff' : '#111111') : (isDark ? 'rgba(255,255,255,0.2)' : '#d2d2d7'),
              transition: 'background-color 0.3s ease'
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
