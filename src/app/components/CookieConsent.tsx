"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('glynne_cookie_consent');
    if (!consent) {
      // Small delay for aesthetic entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('glynne_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 99999,
      width: 'calc(100% - 40px)',
      maxWidth: '600px',
      animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '20px',
        padding: '20px 24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '50%', 
            background: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 600, color: '#111111' }}>
              We value your privacy
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#555555', lineHeight: 1.5 }}>
              GLYNNE uses cookies to enhance your browsing experience, analyze traffic, and ensure our AI infrastructure operates optimally. 
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          marginTop: '4px'
        }}>
          <Link 
            href="/cookie-policy"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#86868b',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '999px',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#111111'}
            onMouseOut={(e) => e.currentTarget.style.color = '#86868b'}
          >
            Cookie Policy
          </Link>
          
          <button 
            onClick={handleAccept}
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: '#111111',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Accept & Continue
          </button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}} />
    </div>
  );
}
