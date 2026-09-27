import IntenseHeroGrid from './IntenseHeroGrid';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="intro-hero" style={{ position: 'relative', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IntenseHeroGrid />
      <div
        style={{
          zIndex: 1,
          position: 'relative',
          padding: '0 5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
          maxWidth: '1200px',
          width: '100%'
        }}
      >
        {/* Small Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 500, color: '#8f8f96', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <span style={{ fontSize: '16px' }}>⬡</span> GLYNNE CONTROL LAYER
        </div>

        {/* Big Headline */}
        <h1 style={{
          margin: 0,
          textAlign: 'center',
          fontSize: 'clamp(40px, 6.5vw, 64px)',
          fontWeight: 400,
          color: '#111111',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: '1100px'
        }}>
          Enterprise AI Control & Infrastructure Layer
        </h1>

        {/* Paragraph */}
        <p style={{
          margin: 0,
          textAlign: 'center',
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.6,
          color: '#86868b',
          fontWeight: 300,
          letterSpacing: '0.01em',
          maxWidth: '900px'
        }}>
          GLYNNE is the governance runtime that integrates artificial intelligence into enterprise systems safely. We provide the architecture of control, permissions, and traceability that filters every action—enabling autonomous reasoning while maintaining absolute security.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <Link href="/Methodology" style={{
            padding: '14px 28px',
            backgroundColor: '#111111',
            color: '#ffffff',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            border: '1px solid #111111',
            transition: 'all 0.2s ease'
          }}>
            Explore Methodology
          </Link>
          <Link href="/About" style={{
            padding: '14px 28px',
            backgroundColor: 'transparent',
            color: '#111111',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            border: '1px solid rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease'
          }}>
            Explore Architecture
          </Link>
        </div>
      </div>
    </section>
  );
}
