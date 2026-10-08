'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { useTheme } from '@/lib/ThemeContext';
import { FiAlertTriangle, FiArrowLeft, FiHardDrive, FiRefreshCw } from 'react-icons/fi';

export default function LibraryModelNotFound() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#ffffff' : '#111111';
  const subtextColor = isDark ? '#a1a1aa' : '#666666';
  const borderLineColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <>
      <Header />
      <BackgroundWrapper>
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '120px',
            boxSizing: 'border-box'
          }}
        >
          {/* 404 HERO CONTENT */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4rem 2rem',
              zIndex: 10
            }}
          >
            {/* Hexagonal Tactical Error Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: `1px solid ${borderLineColor}`,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                fontSize: '11px',
                fontFamily: "'SF Mono', Monaco, monospace",
                fontWeight: 600,
                color: subtextColor,
                marginBottom: '24px',
                letterSpacing: '0.08em'
              }}
            >
              <FiAlertTriangle style={{ fontSize: '13px', color: '#ff3b30' }} />
              <span>ERR_WEIGHT_NOT_FOUND // 404</span>
            </div>

            {/* Giant 404 Number with Metallic Gradient */}
            <h1
              style={{
                fontSize: 'clamp(64px, 12vw, 160px)',
                fontWeight: 600,
                lineHeight: 0.9,
                margin: '0 0 16px 0',
                letterSpacing: '-0.04em',
                background: isDark
                  ? 'linear-gradient(180deg, #ffffff 0%, #71717a 100%)'
                  : 'linear-gradient(180deg, #111111 0%, #71717a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              404
            </h1>

            {/* Sub-headline */}
            <h2
              style={{
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 500,
                color: textColor,
                margin: '0 0 16px 0',
                letterSpacing: '-0.02em'
              }}
            >
              Model Weight or Adapter File Not Found
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: subtextColor,
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '560px',
                margin: '0 0 36px 0'
              }}
            >
              The requested AI model weight file, GGUF quantization format, or LoRA adapter is not indexable in this repository directory. Check the catalog or return to the model library.
            </p>

            {/* Tactical Vector Blueprint Ring */}
            <div
              style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                marginBottom: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="90" stroke={borderLineColor} strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke={borderLineColor} strokeWidth="1" strokeDasharray="4 4" />
                <polygon points="100,20 170,140 30,140" stroke={borderLineColor} strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="4" fill={textColor} />
              </svg>
              <FiHardDrive style={{ position: 'absolute', fontSize: '28px', color: subtextColor }} />
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link
                href="/Librarymodel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: isDark ? '#ffffff' : '#111111',
                  color: isDark ? '#000000' : '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'opacity 0.2s ease'
                }}
              >
                <FiArrowLeft style={{ fontSize: '16px' }} />
                <span>Return to Model Library</span>
              </Link>

              <Link
                href="/TrainModel"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${borderLineColor}`,
                  color: textColor,
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <FiRefreshCw style={{ fontSize: '15px' }} />
                <span>Train Custom Weights</span>
              </Link>
            </div>
          </div>

          <Footer />
        </div>
      </BackgroundWrapper>
    </>
  );
}
