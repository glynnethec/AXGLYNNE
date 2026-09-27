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
import VideoEcosystemSection from '@/components/VideoEcosystemSection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <SplashScreen />
      <BackgroundWrapper>
        {/* 1. WHAT IS GLYNNE? */}
        <HeroSection />

        {/* 2. WHY DOES IT MATTER? */}
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          margin: '2rem auto 0',
          backgroundColor: 'transparent',
          padding: '2rem 0 0 0'
        }}>
          <LinPromptSection hideCard={true} />
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

          {/* Smoke/Fog Layer 1 */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '60vw',
            height: '120vh',
            background: 'radial-gradient(ellipse at center, rgba(245, 245, 248, 0.7) 0%, rgba(255, 255, 255, 0) 70%)',
            filter: 'blur(80px)',
            animation: 'smokeFloat1 20s infinite ease-in-out',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          {/* Smoke/Fog Layer 2 */}
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '70vw',
            height: '130vh',
            background: 'radial-gradient(ellipse at center, rgba(248, 248, 250, 0.6) 0%, rgba(255, 255, 255, 0) 70%)',
            filter: 'blur(90px)',
            animation: 'smokeFloat2 25s infinite ease-in-out reverse',
            zIndex: 0,
            pointerEvents: 'none'
          }} />

          {/* Text and Button on the left */}
          <div className="banner-text-container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <h2 className="banner-title" style={{
              fontSize: 'clamp(50px, 8vw, 120px)',
              fontWeight: 600,
              color: '#111111',
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
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  border: '1px solid #111111',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; }}
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
            opacity: 0.02,
            zIndex: 1,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src="/logos/GLYNNE.svg"
              alt=""
              style={{ height: '100%', objectFit: 'contain', maxWidth: '100vw' }}
            />
          </div>
        </div>

        <Footer />
      </BackgroundWrapper>
    </>
  );
}
