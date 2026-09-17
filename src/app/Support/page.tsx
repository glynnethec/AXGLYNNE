'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import SupportCard from './components/SupportCard';

export default function SupportPage() {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', color: '#111111' }}>
      <Header />
      <BackgroundWrapper>
      
      <div style={{ paddingTop: '160px' }}>
        <SupportCard />
      </div>
      
      <main style={{ paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '5%', paddingRight: '5%', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          {/* Left Column - Information */}
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', color: '#1d1d1f', textTransform: 'uppercase', marginBottom: '24px' }}>
              / support & help /
            </div>
            
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', letterSpacing: '-0.02em', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
              We are here to resolve your technical issues
            </h1>
            
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, maxWidth: '400px', marginBottom: '60px' }}>
              Access comprehensive support resources, track your tickets, and communicate directly with our specialized technical team.
            </p>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Technical Support</strong>
                <div style={{ color: '#86868b', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6 }}>
                  +57 314 253 4962 (Line 1)<br/>
                  +57 312 345 5328 (Line 2)
                </div>
              </div>
              
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Documentation</strong>
                <div style={{ color: '#86868b', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6 }}>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>View API Docs</a><br/>
                  <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Integration Guides</a>
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 500, marginBottom: '16px' }}>Support Email</strong>
                <div style={{ color: '#86868b', fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6 }}>
                  support@glynne.com
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div style={{ flex: '1 1 400px', backgroundColor: 'transparent', boxSizing: 'border-box', paddingTop: '16px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, color: '#111111', letterSpacing: '-0.02em', margin: '0 0 1rem 0' }}>Open a Ticket</h2>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, marginBottom: '40px' }}>
              Describe your issue below. Our support agents will respond as soon as possible.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Full name or Company ID" 
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111' }} 
              />
              <input 
                type="email" 
                placeholder="Account Email" 
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111' }} 
              />
              <select 
                style={{ width: '100%', padding: '16px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'transparent', fontSize: '15px', outline: 'none', color: '#111111', cursor: 'pointer', appearance: 'none' }}
              >
                <option value="" disabled selected>Select Issue Type</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing / Account</option>
                <option value="integration">API Integration</option>
                <option value="other">Other</option>
              </select>
              <textarea 
                placeholder="Describe the issue in detail" 
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
                <span>›</span> Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      </BackgroundWrapper>
    </div>
  );
}
