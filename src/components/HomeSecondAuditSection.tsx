'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const STATIC_CARDS = [
  { 
    id: 1, 
    title: "Terms of Service", 
    description: "Review the comprehensive legal framework governing the use of our autonomous infrastructure.",
    path: "https://axglynne.com/terms-of-service"
  },
  { 
    id: 2, 
    title: "Privacy Policy", 
    description: "Understand how we securely process, store, and govern data within the GLYNNE ecosystem.",
    path: "https://axglynne.com/privacy-policy"
  },
  { 
    id: 3, 
    title: "Access Your Secure Dashboard", 
    description: "Log in to monitor and control your dedicated enterprise AI nodes and configurations.",
    path: "https://axglynne.com/login"
  },
  {
    id: 4,
    title: "Discover Our Company Vision",
    description: "Learn about the mission, values, and the team driving our autonomous architecture forward.",
    path: "https://axglynne.com/About"
  }
];

function SecondAuditTaskCards() {
  const router = useRouter();

  return (
    <div className="cards-grid-container-two" style={{
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      width: '100%',
      gap: '16px'
    }}>
      {STATIC_CARDS.map((task) => (
        <button 
          key={task.id} 
          className="second-audit-card"
          onClick={() => window.location.href = task.path}
          style={{
            backgroundColor: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            fontFamily: 'monospace, ui-monospace, Menlo, Monaco',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
          }}
        >
          <div className="second-audit-card-title" style={{ fontSize: '15px', color: '#111111', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {task.title}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
          <div className="second-audit-card-desc" style={{ fontSize: '13px', color: '#666666', fontWeight: 400, lineHeight: 1.5 }}>
            {task.description}
          </div>
        </button>
      ))}
    </div>
  );
}



export default function HomeSecondAuditSection() {
  return (
    <section className="mobile-audit-section-two" style={{ width: '100%', minHeight: 'auto', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        @keyframes console-blink-two {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 700px) {
          .cards-grid-container-two {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .second-audit-card {
            padding: 16px !important;
            gap: 6px !important;
            border-radius: 14px !important;
          }
          .second-audit-card-title {
            font-size: 14px !important;
          }
          .second-audit-card-title svg {
            width: 14px !important;
            height: 14px !important;
          }
          .second-audit-card-desc {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .responsive-solutions-width-two {
            width: 92vw !important;
          }
          .mobile-stack-two {
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 0 !important;
          }
          .mobile-stack-two .docs-menu-container-two {
            margin: 32px auto 0 !important;
          }
          .mobile-audit-section-two {
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 80px !important;
            height: auto !important;
          }
          .mobile-console-wrapper-two {
            justify-content: flex-start !important;
            width: 100% !important;
            min-height: auto !important;
            padding-bottom: 20px !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width-two" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div className="mobile-stack-two" style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px', padding: '0', backgroundColor: 'transparent' }}>
          
          <div style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
              Inside Our Most Radical Project
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
              Witness the autonomous architecture that redefined an entire operational ecosystem. We engineered a fully independent AI system for Servex—capable of processing infinite data, making real-time cognitive decisions, and executing workflows without human intervention. 
            </p>
            

          </div>
          
          <div className="mobile-console-wrapper-two" style={{ flex: '1.5 1 250px', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <SecondAuditTaskCards />
          </div>

        </div>
      </div>
    </section>
  );
}
