'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechLogos from './TechLogos';

export default function VideoEcosystemSection() {
  return (
    <section style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      padding: '0 1.5rem 12rem',
      marginTop: '2rem'
    }}>
      {/* Bordered Container */}
      <div className="responsive-solutions-width responsive-card-borderless" style={{
        width: '70vw',
        maxWidth: '70vw',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '40px',
        padding: '4rem 2rem',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* HIDDEN ON MOBILE */}
        <div className="desktop-only" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* TEXT ABOVE VIDEO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f5f5f7',
          borderRadius: '999px',
          padding: '6px 16px',
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Infrastructure Layer</span>
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: 300,
          color: '#111111',
          letterSpacing: '-0.01em',
          margin: '0 0 12px 0',
          textAlign: 'center'
        }}>
          The Control Ecosystem
        </h2>
        <p style={{
          fontSize: '13px',
          color: '#8f8f96',
          fontWeight: 300,
          letterSpacing: '0.02em',
          margin: '0 0 40px 0',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: 1.6
        }}>
          From secure API gateways to deterministic AI agents and traceable data architectures, we leverage enterprise-grade technologies to build the infrastructure that stands between your sensitive business systems and autonomous reasoning engines.
        </p>

        </div>

        {/* TECH LOGOS BELOW VIDEO */}
        <div style={{ width: '100%' }}>
          <TechLogos />
        </div>
      </div>
    </section>
  );
}
