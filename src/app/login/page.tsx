'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaDiscord, FaInstagram, FaSpotify, FaYoutube, FaTiktok, FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { supabaseGoogle } from '@/lib/supabaseClient';
import './Login.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabaseGoogle.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/Panel`,
        },
      });

      if (error) {
        console.error('Login error:', error.message);
        alert('Error al iniciar sesión con Google');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="login-wrapper" style={{ backgroundColor: 'transparent' }}>
        <div className="login-card">
        
        {/* LEFT SIDE: Vibrant Blue Fluid Background */}
        <div className="login-left">
          <div className="login-left-top">
            <p className="small-text">You can easily</p>
            <h1>Speed up your work with our Web App</h1>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, minHeight: '150px' }}>
            <Link href="/" style={{ display: 'inline-block', transition: 'transform 0.2s ease', position: 'relative', zIndex: 20 }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <img src="/logos/GLYNNE.svg" alt="GLYNNE Logo" style={{ width: '90px', display: 'block', opacity: 0.4 }} />
            </Link>
          </div>
          
          <div className="login-left-bottom">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000000' }}></div>
              <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>System Status: Online</span>
            </div>
            <p style={{ fontSize: '13px', color: '#86868b', margin: 0, maxWidth: '300px', lineHeight: 1.5 }}>
              Enterprise-grade infrastructure. Your data and analytics are processed with maximum security and privacy.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="login-right">
          <h2>Get Started Now</h2>
          <p className="login-subtitle" style={{ lineHeight: 1.6, maxWidth: '400px' }}>
            It is important to log in to access the analytics ecosystem and unlock all personalized features.
          </p>

          <div className="social-logins" style={{ marginTop: '2rem' }}>
            <button className="btn-social" onClick={handleGoogleLogin}>
              <FaGoogle size={18} color="#111111" /> Login with Google
            </button>
          </div>
          
        </div>

      </div>
    </div>
    </BackgroundWrapper>
  );
}
