'use client';

import { useRouter } from 'next/navigation';

export default function EvolveCard() {
  const router = useRouter();

  return (
    <section style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      padding: '0 1.5rem 4rem 1.5rem',
      textAlign: 'center'
    }}>
      {/* Bordered Container */}
      <div className="responsive-solutions-width responsive-card-borderless" style={{
        width: '70vw',
        maxWidth: '70vw',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '40px',
        padding: '6rem 2rem',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f5f5f7',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '2rem'
          }}>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Continuous Evolution</span>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: '#111111',
            letterSpacing: '-0.02em',
            margin: '0 0 1.5rem 0',
            lineHeight: 1.1
          }}>
            Evolve your enterprise with AI
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#86868b',
            fontWeight: 300,
            letterSpacing: '0.01em',
            lineHeight: 1.6,
            margin: 0
          }}>
            We transform the tasks and processes that drive your business into intelligent systems capable of learning, deciding, and acting. We integrate AI directly into your operations to automate complexity, empower your team, and turn every process into an opportunity for innovation.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button 
              className="responsive-btn"
              onClick={() => router.push('/Solutions')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: '#111111',
                color: '#ffffff',
                border: '1px solid #111111',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              Discover our current projects
            </button>
            
            <button 
              className="responsive-btn"
              onClick={() => router.push('/AX_chat')}
              style={{
              padding: '14px 28px',
              borderRadius: '999px',
              backgroundColor: 'transparent',
              color: '#111111',
              border: '1px solid rgba(0,0,0,0.2)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111111'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)' }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Chat with AX, our AI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
