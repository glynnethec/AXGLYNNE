'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { supabaseGoogle } from '@/lib/supabaseClient';
import { useTheme } from '@/lib/ThemeContext';
import './Login.css';

type HoverStep = {
  id: number;
  cx: number;
  cy: number;
  neighbors: { dx: number; dy: number; opacity: number }[];
};

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [history, setHistory] = useState<HoverStep[]>([]);
  const stepIdRef = useRef(0);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabaseGoogle.auth.getSession();
      if (data.session) {
        router.push('/Panel');
      }
    };
    checkSession();
  }, [router]);

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
        alert('Google authentication failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGoogleLogin();
  };

  // Auto animation for background perspective floor grid (Panel Style)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const cx = Math.floor(Math.random() * 20);
      const cy = Math.floor(Math.random() * 10);
      const numNeighbors = Math.floor(Math.random() * 4) + 1;
      const neighbors: { dx: number; dy: number; opacity: number }[] = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]
      ];
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({ dx: shuffled[i][0], dy: shuffled[i][1], opacity: (Math.random() * 0.06) + 0.03 });
      }
      setHistory(prev => [{ id: stepIdRef.current++, cx, cy, neighbors }, ...prev].slice(0, 8));
    }, 1400);

    return () => clearInterval(intervalId);
  }, []);

  // Generate dynamic halftone dot matrix
  const halftoneDots = useMemo(() => {
    const dots = [];
    const cols = 36;
    const rows = 46;
    const spacingX = 11;
    const spacingY = 11;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * spacingX + 8;
        const cy = r * spacingY + 8;

        const dx = cx - 200;
        const dy = cy - 230;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const wave1 = Math.sin(cx * 0.024 + cy * 0.03) * Math.cos(cx * 0.014 - cy * 0.02);
        let size = (Math.sin(dist * 0.02 + wave1 * 2) + 1.1) * 3.5;

        const contour = (c / cols) * 1.1 - (r / rows) * 0.75;
        if (contour < -0.3 || contour > 0.9) {
          size *= 0.2;
        }

        if (size > 0.5) {
          dots.push({ cx, cy, size: Math.min(7, Math.max(0.5, size)) });
        }
      }
    }
    return dots;
  }, []);

  return (
    <div className="panel-login-wrapper" data-theme={theme}>
      
      {/* Dynamic Background Perspective Grid Wrapper (Panel Style) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div className="md-bg-grid">
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            <defs>
              <pattern id="floor-grid-login" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke={isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.12)'} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floor-grid-login)" />
            {history.map((step, index) => {
              const isCurrent = index === 0;
              const cellColor = isDark ? '255, 255, 255' : '15, 23, 42';
              const opacityScale = isDark ? 1 : 4;
              return (
                <g key={step.id}>
                  {step.neighbors.map((n, i) => (
                    <rect key={i} x={(step.cx + n.dx) * 80} y={(step.cy + n.dy) * 80} width="80" height="80" 
                          fill={`rgba(${cellColor},${isCurrent ? n.opacity * opacityScale : 0})`} style={{ transition: 'fill 1s ease' }} />
                  ))}
                  <rect x={step.cx * 80} y={step.cy * 80} width="80" height="80" 
                        fill={`rgba(${cellColor},${isCurrent ? 0.08 * opacityScale : 0})`} style={{ transition: 'fill 1s ease' }} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>



      {/* MAIN CONTAINER (ASSEMBLY PANEL STYLE) */}
      <main className="panel-login-card">
        
        {/* LEFT COLUMN: TACTICAL FORM */}
        <div className="panel-card-left">
          
          <div className="card-top-section">
            <div className="panel-title-bar">
              <span className="bar-prefix">///</span>
              <span className="bar-label">SYSTEM_AUTH_BOOT_SEQ</span>
            </div>

            <h1 className="panel-login-heading">SIGN IN</h1>
            <p className="panel-login-desc">Access the GLYNNE neural network & enterprise AI workspace.</p>
          </div>

          {/* TERMINAL DIRECTIVE BLOCK */}
          <div className="panel-access-notice">
            <div className="access-notice-header">
              <span className="notice-icon">&gt;</span>
              <span className="notice-title">SYS_ACCESS_DIRECTIVE.LOG</span>
            </div>
            <div className="terminal-log-content">
              <p className="terminal-log-line">
                <span className="log-prefix">[SYS_INFO]</span> AUTHENTICATED USERS WILL GAIN INSTANT ACCESS TO:
              </p>
              <ul className="terminal-bullet-list">
                <li><span className="bullet">&gt;</span> GLYNNE_DEV_PANEL &amp; INFRASTRUCTURE DASHBOARD</li>
                <li><span className="bullet">&gt;</span> QLoRA_AI_MODEL_TRAINER &amp; FINE-TUNING STUDIO</li>
                <li><span className="bullet">&gt;</span> AX_VOICE &amp; REALTIME CHAT CONVERSATIONAL ENGINES</li>
                <li><span className="bullet">&gt;</span> AIR-GAPPED MODEL WEIGHTS LIBRARY &amp; VECTOR STORAGE</li>
              </ul>
            </div>
          </div>

          <button type="button" className="panel-btn-submit" onClick={handleGoogleLogin}>
            [ CONTINUE WITH GOOGLE &rarr; ]
          </button>

          {/* SYSTEM CONSOLE FOOTER */}
          <div className="panel-term-footer">
            <div className="term-line"><span className="prompt">{'>'}</span> SYSTEM_BOOT_SEQ: <span className="highlight-text">INITIALIZED</span></div>
            <div className="term-line"><span className="prompt">{'>'}</span> ENCRYPTION: AES-256 SECURED</div>
            <div className="term-line"><span className="prompt">{'>'}</span> STATUS: <span className="highlight-text">AWAITING_AUTHENTICATION</span><span className="cursor">_</span></div>
          </div>
        </div>

        {/* RIGHT COLUMN: HALFTONE ART */}
        <div className="panel-card-right">
          
          {/* Halftone SVG Canvas */}
          <svg className="panel-halftone-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
            <rect width="100%" height="100%" fill={isDark ? '#000000' : '#ffffff'} />
            {halftoneDots.map((dot, i) => (
              <rect
                key={i}
                x={dot.cx - dot.size / 2}
                y={dot.cy - dot.size / 2}
                width={dot.size}
                height={dot.size}
                fill={isDark ? '#ffffff' : '#000000'}
                opacity={isDark ? Math.min(0.9, 0.2 + (dot.size / 7) * 0.8) : Math.min(0.7, 0.15 + (dot.size / 7) * 0.6)}
                transform={`rotate(45 ${dot.cx} ${dot.cy})`}
              />
            ))}
          </svg>

        </div>

      </main>

    </div>
  );
}
