'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TaskAuditSection from '@/components/TaskAuditSection';

export default function PcCardSolutions() {
  const router = useRouter();

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '4rem 1.5rem', position: 'relative', zIndex: 10, backgroundColor: 'transparent' }}>
      <style>{`
        .glass-card-hover {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease !important;
        }
        .glass-card-hover:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.05) !important;
          background-color: rgba(255, 255, 255, 0.8) !important;
        }
        @media (max-width: 700px) {
          .responsive-solutions-width {
            width: 92vw !important;
          }
          .responsive-card-borderless {
            padding: 24px !important;
          }
          .responsive-btn {
            padding: 12px 24px !important;
            font-size: 14px !important;
            width: 100% !important;
          }
          .mobile-stack {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .mobile-stack-reverse {
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 32px !important;
          }
          .mobile-img-wrapper {
            width: 100% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width mobile-stack" style={{ position: 'relative', zIndex: 10, width: '60vw', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px', padding: '0', backgroundColor: 'transparent', minHeight: '50vh' }}>
        <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
            Meet SERVEXcopilot. Our most radical project.
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
            A glimpse into the operational future. This organization has redefined its core processes, evolving into an intelligent ecosystem where AI takes control of workflows, autonomously solving its greatest challenges.
          </p>
        </div>
        <div className="mobile-img-wrapper" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'center' }}>
          <img src="/SERVEX/logo.png" alt="Servex Logo" style={{ width: '85%', maxWidth: '480px', objectFit: 'contain', filter: 'grayscale(100%) brightness(1.3) contrast(0.8) opacity(0.85) drop-shadow(0 24px 48px rgba(0,0,0,0.12))' }} />
        </div>
      </div>

      {/* Task Audit Section placed before the cards */}
      <div style={{ margin: '40px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="responsive-solutions-width" style={{ width: '60vw', maxWidth: 'none' }}>
          <TaskAuditSection />
        </div>
      </div>

      <div className="responsive-solutions-width" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60vw', maxWidth: 'none', margin: '40px auto 0' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 40px 0', letterSpacing: '-0.02em', textAlign: 'center' }}>
          Meet Servex
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          <div className="responsive-card-borderless glass-card-hover" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111' }}></div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, color: '#1d1d1f' }}>Who is Servex</h3>
            </div>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
              Servex US is a technology firm specialized in digitalization, 3D modeling, and electronic catalog management for the contract furniture industry. Its primary function is to transform the complex specifications of leading manufacturers—such as WB Manufacturing, LESRO, and EB—into highly optimized digital assets. As an official Development Partner of Configura, Servex builds and maintains advanced extensions for the CET Commercial Interiors platform, creating product libraries, parametric BIM models (Revit), and interactive configurators. This allows architects, designers, and distributors to specify projects and generate quotes with millimeter precision within the highest industry standard.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
              <button 
                className="responsive-btn"
                onClick={() => window.open('https://servex-us.com/', '_blank')}
                style={{
                  padding: '14px 28px',
                  borderRadius: '999px',
                  backgroundColor: '#111111',
                  color: '#ffffff',
                  border: '1px solid #111111',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                Explore SERVEX
              </button>
            </div>
          </div>

          <div className="responsive-card-borderless glass-card-hover" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111' }}></div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, color: '#1d1d1f' }}>Why They Sought GLYNNE</h3>
            </div>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
              Servex was not looking for a cosmetic update, but rather a total reengineering of its operational core. To sustain their position as a technological bridge to platforms like CET, they required a flawless infrastructure. They delegated the full technical responsibility to us due to our capacity to operate with the vision of a centralized engineering team, specialized in AI automation. The objective was clear: to conceive and execute a custom-built platform that would transform their data chaos into an autonomous, secure, and scalable ecosystem.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
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
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111111'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)' }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                Chat with AX
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Independent Card Inserted */}
      <div className="responsive-solutions-width mobile-stack-reverse" style={{ position: 'relative', zIndex: 10, width: '60vw', minHeight: '75vh', boxSizing: 'border-box', margin: '80px auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
        <div className="mobile-img-wrapper" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'center' }}>
          <img src="/SERVEX/mockup.png" alt="Servex Mockup" style={{ width: '85%', maxWidth: '480px', objectFit: 'contain', filter: 'grayscale(100%) drop-shadow(0 24px 48px rgba(0,0,0,0.12))' }} />
        </div>
        <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
            Visit the project's landing page
          </h1>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
            There you will find the most detailed information on how SERVEX wants to evolve into a technological ecosystem.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              className="responsive-btn"
              onClick={() => window.open('https://www.servexcopilot.com/', '_blank')}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: '#111111',
                color: '#ffffff',
                border: '1px solid #111111',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#333333'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#111111'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              Visit the project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
