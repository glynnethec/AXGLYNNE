'use client';

import { useRouter } from 'next/navigation';

export default function SupportCard() {
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
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Help Center</span>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: '#111111',
            letterSpacing: '-0.02em',
            margin: '0 0 1.5rem 0',
            lineHeight: 1.1
          }}>
            How can we help you today?
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#86868b',
            fontWeight: 300,
            letterSpacing: '0.01em',
            lineHeight: 1.6,
            margin: 0
          }}>
            Our support team is dedicated to providing you with the best assistance possible. Find answers, troubleshoot problems, and learn how to get the most out of our AI platforms.
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
              onClick={() => router.push('/contact')}
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
              Contact Support
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
              Ask AX Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
