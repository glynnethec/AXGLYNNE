'use client';

import SplashScreen from '@/components/SplashScreen';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import HeroSection from '@/components/HeroSection';
import LinPromptSection from '@/components/LinPromptSection';
import HomeAuditSection from '@/components/HomeAuditSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import HomeTaskAuditSection from '@/components/HomeTaskAuditSection';
import HomeSecondAuditSection from '@/components/HomeSecondAuditSection';
import HomeThirdAuditSection from '@/components/HomeThirdAuditSection';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import OrbCardSection from '@/components/OrbCardSection';
import VideoEcosystemSection from '@/components/VideoEcosystemSection';
import Footer from '@/app/components/Footer';
import { useTheme } from '@/lib/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <>
      <SplashScreen />
      <BackgroundWrapper>
        {/* 1. WHAT IS GLYNNE? */}
        <HeroSection />

        {/* 2. PROMPT INPUT SECTION (BLUEPRINT LIN PROMPT) */}
        <div style={{
          width: '100%',
          backgroundColor: 'transparent',
          padding: '0'
        }}>
          <LinPromptSection hideCard={true} hideOrbCard={true} lang="en" />
        </div>

        {/* 3. HOW DOES IT WORK? */}
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          margin: '4rem auto 0',
          backgroundColor: 'transparent',
          padding: '0'
        }}>
          <HomeAuditSection />
        </div>

        {/* 4. HOW IS AI CONTROLLED? */}
        <WorkflowDiagram />

        {/* ORB SECTION (VOICE CALL) */}
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          margin: '4rem auto',
          backgroundColor: 'transparent',
          padding: '0'
        }}>
          <OrbCardSection />
        </div>

        {/* 5. HOW IS THE SYSTEM BUILT? */}
        <VideoEcosystemSection />

        {/* 6. DOES IT WORK IN PRACTICE? */}
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          margin: '0 auto',
          backgroundColor: 'transparent',
          padding: '0'
        }}>
          <HomeTaskAuditSection />
        </div>

        {/* 7. WHO BUILDS IT? & PROVEN AT */}
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          margin: '0 auto',
          backgroundColor: 'transparent',
          padding: '0'
        }}>
          <HomeThirdAuditSection />
        </div>
        <ClientLogosSection />

        {/* 8. WHAT CAN I DO NEXT? */}
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          margin: '4rem auto 4rem',
          backgroundColor: 'transparent',
          padding: '0'
        }}>
          <HomeSecondAuditSection />
        </div>

        {/* Massive Impact Banner (Groq-style layout) */}
        <div className="banner-main-container" style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'transparent',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '0 10vw'
        }}>
          {/* Injecting Smoke Animation and Mobile Styles */}
          <style>{`
            @keyframes smokeFloat1 {
              0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
              33% { transform: translate(5vw, -5vh) scale(1.1) rotate(5deg); opacity: 0.8; }
              66% { transform: translate(-3vw, 4vh) scale(0.95) rotate(-2deg); opacity: 0.5; }
              100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.6; }
            }
            @keyframes smokeFloat2 {
              0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.4; }
              33% { transform: translate(-4vw, 6vh) scale(1.05) rotate(-3deg); opacity: 0.7; }
              66% { transform: translate(4vw, -3vh) scale(0.9) rotate(4deg); opacity: 0.5; }
              100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.4; }
            }
            @media (max-width: 700px) {
              .banner-main-container {
                height: 100vh !important;
              }
              .banner-text-container {
                align-items: center !important;
                width: 100% !important;
              }
              .banner-title {
                text-align: center !important;
                max-width: 100% !important;
              }
              .banner-button-container {
                justify-content: center !important;
                width: 100% !important;
              }
            }
          `}</style>

          {/* Text and Button on the left */}
          <div className="banner-text-container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <h2 className="banner-title" style={{
              fontSize: 'clamp(50px, 8vw, 120px)',
              fontWeight: 600,
              color: isDark ? '#ffffff' : '#111111',
              lineHeight: 1.0,
              margin: '0 0 60px 0',
              letterSpacing: '-0.03em',
              maxWidth: '70vw'
            }}>
              Deploy governed AI<br />in your enterprise.
            </h2>

            {/* Outline Button */}
            <div className="banner-button-container" style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => window.location.href = '/contact'}
                style={{
                  padding: '16px 32px',
                  borderRadius: '999px',
                  backgroundColor: isDark ? '#ffffff' : '#111111',
                  color: isDark ? '#000000' : '#ffffff',
                  border: isDark ? '1px solid #ffffff' : '1px solid #111111',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Discuss Your System
              </button>
            </div>
          </div>

          {/* Giant transparent SVG watermark on the right */}
          <div style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            height: 'calc(100% - 10px)',
            opacity: isDark ? 0.12 : 0.08,
            zIndex: 1,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src="/logos/GLYNNE.svg"
              alt="AXGLYNNE Enterprise AI Emblem"
              style={{
                height: '100%',
                objectFit: 'contain',
                maxWidth: '100vw',
                filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)'
              }}
            />
          </div>
        </div>

        <Footer />
      </BackgroundWrapper>
    </>
  );
}
