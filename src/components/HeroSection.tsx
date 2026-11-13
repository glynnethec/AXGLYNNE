import IntenseHeroGrid from './IntenseHeroGrid';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
          <span style={{ fontSize: '16px' }}>⬡</span> AXGLYNNE (GLYNNE S.A.S.) · ENTERPRISE AI ENGINEERING & OPEN-WEIGHTS
        </div>

        {/* Big Headline */}
        <h1 style={{
          margin: 0,
          textAlign: 'center',
          fontSize: 'clamp(40px, 6.5vw, 64px)',
          fontWeight: 400,
          color: isDark ? '#ffffff' : '#111111',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: '1100px'
        }}>
          The bridge between advanced AI and your business operations
        </h1>

        {/* Paragraph */}
        <p style={{
          margin: 0,
          textAlign: 'center',
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.6,
          color: isDark ? '#a1a1aa' : '#86868b',
          fontWeight: 300,
          letterSpacing: '0.01em',
          maxWidth: '900px'
        }}>
          We build AI technology with a clear purpose: eliminating operational friction. We provide the open-weights models that power decisions, the fine-tuning and Sub-API tools your team interacts with, and the autonomous workflows that keep your business moving forward without relying on manual processes.
        </p>

        {/* Text Links */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/TrainModel" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: isDark ? '#ffffff' : '#111111',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s ease',
          }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Explore Fine-Tuning Studio <span style={{ fontSize: '15px' }}>→</span>
          </Link>

          <Link href="/ia_vailable" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: isDark ? '#a1a1aa' : '#666666',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s ease',
          }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = isDark ? '#ffffff' : '#111111'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = isDark ? '#a1a1aa' : '#666666'; }}
          >
            Explore AI Models & Benchmarks <span style={{ fontSize: '15px' }}>→</span>
          </Link>

          <Link href="/Servex_solution" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: isDark ? '#a1a1aa' : '#666666',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s ease',
          }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = isDark ? '#ffffff' : '#111111'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = isDark ? '#a1a1aa' : '#666666'; }}
          >
            Enterprise Case Study (SERVEX) <span style={{ fontSize: '15px' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
