'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import EvolveCard from './components/EvolveCard';

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', color: '#111111' }}>
      <Header />
      <BackgroundWrapper>
      
      <div style={{ paddingTop: '160px' }}>
        <EvolveCard />
      </div>
      
      <main style={{ paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '5%', paddingRight: '5%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          {/* Left Column - Information */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', color: '#1d1d1f', textTransform: 'uppercase', marginBottom: '24px' }}>
              / get in touch /
            </div>
            
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
              We are always ready to help you and answer your questions
            </h1>
            
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, maxWidth: '400px', marginBottom: '60px' }}>
              Define your goals and identify areas where our software architecture and AI can add value to your business.
            </p>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Call Center</strong>
                <div style={{ color: '#86868b', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6 }}>
                  +57 314 253 4962 (Secretary)<br/>
                  +57 312 345 5328 (Management)
                </div>
              </div>
              
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Company Legal Info</strong>
                <div style={{ color: '#86868b', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6 }}>
                  GLYNNE S.A.S.<br/>
                  <a href="https://www.informacolombia.com/directorio-empresas/informacion-empresa/glynne-sas" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>View legal registration</a>
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Email</strong>
                <div style={{ color: '#86868b', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6 }}>
                  alexglynne7@gmail.com
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Social network</strong>
                <div style={{ display: 'flex', gap: '16px', color: '#111111' }}>
                  <a href="https://www.linkedin.com/in/alexander-quiroga-a992452b4/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div style={{ flex: '1 1 400px', backgroundColor: 'transparent', boxSizing: 'border-box', paddingTop: '16px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, color: '#111111', letterSpacing: '-0.02em', margin: '0 0 1rem 0' }}>Get in Touch</h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, marginBottom: '40px' }}>
              Leave us a message and our team will get back to you shortly to discuss your project.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Full name" 
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111' }} 
              />
              <input 
                type="email" 
                placeholder="Email" 
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111' }} 
              />
              <input 
                type="text" 
                placeholder="Subject" 
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111' }} 
              />
              <textarea 
                placeholder="Message" 
                rows={4}
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111', resize: 'none' }} 
              />
              
              <button 
                className="responsive-btn"
                type="submit"
                style={{
                  marginTop: '24px',
                  alignSelf: 'flex-start',
                  padding: '16px 32px',
                  borderRadius: '999px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s ease, transform 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                <span>›</span> Send a message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Map Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 120px auto', paddingLeft: '5%', paddingRight: '5%' }}>
        <MapWrapper />
      </div>

      <Footer />
      </BackgroundWrapper>
    </div>
  );
}

// Click-to-activate map wrapper to prevent scroll shadow
function MapWrapper() {
  const [isMapActive, setIsMapActive] = React.useState(false);
  
  return (
    <div 
      style={{ width: '100%', height: '400px', borderRadius: '32px', overflow: 'hidden', backgroundColor: '#ffffff', position: 'relative', border: '1px solid rgba(0,0,0,0.1)', cursor: isMapActive ? 'auto' : 'pointer' }}
      onClick={() => setIsMapActive(true)}
      onMouseLeave={() => setIsMapActive(false)}
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127244.52125633372!2d-74.1593673995648!3d4.648283717277637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoSwgQm9nb3RhLCBDb2xvbWJpYQ!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: 'grayscale(100%) brightness(1.15) contrast(1.1)', pointerEvents: isMapActive ? 'auto' : 'none' }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      />
      {!isMapActive && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
          {/* Invisible overlay just to catch the click */}
        </div>
      )}
    </div>
  );
}
