'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AutonomousAuditSection from '@/components/AutonomousAuditSection';
import SolutionsGsapAnimation from './SolutionsGsapAnimation';
import FlowDiagram from './FlowDiagram';

export default function ServexCaseStudy() {
  const router = useRouter();
  return (
    <section style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem 6rem', position: 'relative', zIndex: 10 }}>
      <style>{`
        .white-controls-video::-webkit-media-controls-enclosure {
          filter: invert(1) hue-rotate(180deg);
        }
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 700px) {
          .responsive-solutions-width {
            width: 92vw !important;
          }
          .responsive-card-borderless {
            border: 1px solid rgba(0,0,0,0.05) !important;
            padding: 24px !important;
          }
          .responsive-btn {
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
          .mobile-super-container {
            width: 96vw !important;
            margin-left: calc(-48vw + 50%) !important;
            padding: 40px 20px !important;
            gap: 40px !important;
            border-radius: 24px !important;
          }
          .mobile-text-center {
            text-align: center !important;
          }
        }
      `}</style>
      <div className="responsive-solutions-width" style={{ width: '60vw', maxWidth: 'none', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        

        {/* The Pain Section */}
        {/* The Pain Section */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 24px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>The Pain and Critical Need</h2>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.7, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
            Servex's main challenge lay in the complexity and friction of its daily operations with supplier data. <strong style={{ color: '#111', fontWeight: 500 }}>Extreme format fragmentation:</strong> Technical information, inventories, and price lists arrived scattered in heterogeneous and non-standardized formats (XML files, CSV spreadsheets, and unstructured static documents like PDF catalogs). <strong style={{ color: '#111', fontWeight: 500 }}>Manual bottlenecks:</strong> Processing, standardizing, and loading these catalogs depended on repetitive manual tasks. This caused delays in product availability, high operational costs, and a constant vulnerability to human error. <strong style={{ color: '#111', fontWeight: 500 }}>Lack of a centralized platform:</strong> The company lacked a unified, secure, and scalable environment capable of consolidating business rules, governing corporate access, and processing large-scale data.
          </p>
        </div>


        {/* The Solution Grid */}
        <div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', margin: '0 auto' }}>
            
            {/* Solution 1 (Outside Container) */}
            <div className="responsive-card-borderless" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '32px', backgroundColor: 'transparent' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', marginBottom: '8px' }}>01 / THE MANUAL BOTTLENECK VS. ETL AUTOMATION</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 16px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Replacing Weeks of Manual Work</h2>
              <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                To understand the scale of the problem, the following video captures the manual process Servex relied on. Updating a single item meant an advisor had to meticulously input and configure data, step by step, into CET Designer and Catalogue Creator. Multiplied by hundreds of updates sent by manufacturers at the same time, this granular and manual data entry took weeks to complete, severely limiting the company's scalability and generating a high margin of error.
              </p>
              <div style={{ margin: '24px auto 16px auto', width: '100%', maxWidth: '1100px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', backgroundColor: '#000' }}>
                <iframe 
                  src="https://www.youtube.com/embed/7aGhmudM21E?rel=0&modestbranding=1" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', aspectRatio: '16/9', display: 'block', border: 'none' }} 
                />
              </div>
            </div>

            <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative' }}>
              <SolutionsGsapAnimation />
            </div>

            {/* --- TECHNICAL PIPELINE SUPER CONTAINER --- */}
            <div className="mobile-super-container" style={{
              position: 'relative',
              width: '75vw',
              marginLeft: 'calc(-37.5vw + 50%)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(250,250,250,0.6) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '40px',
              padding: '80px 60px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.06), inset 0 2px 0 rgba(255,255,255,0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '60px',
              overflow: 'hidden'
            }}>
              {/* Optional ambient background glow */}
              <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
              
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '80px' }}>
                
                {/* Solution 2 */}
                <div style={{ backgroundColor: 'transparent' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', marginBottom: '8px' }}>02 / COGNITIVE ENGINE</div>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 16px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>A radical transformation in corporate data management</h2>
                  <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                    By automating the validation of thousands of references at once, we compressed a three-week process into a couple of minutes. In the backend, an intelligent pipeline compares catalogs, extracts information matrices, and packages modifications to inject them with exact precision into XML structures. The true revolution lies in its invisible operation: artificial intelligence does all the heavy lifting. The system generates its own audit schema and exposes a clear action plan, allowing massive catalogs to be updated flawlessly and without human intervention.
                  </p>
                  <div style={{ margin: '24px auto 16px auto', width: '100%', maxWidth: '1100px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', backgroundColor: '#000' }}>
                    <iframe 
                      src="https://www.youtube.com/embed/b_Z85hPBoTs?rel=0&modestbranding=1" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', aspectRatio: '16/9', display: 'block', border: 'none' }} 
                    />
                  </div>
                </div>

                {/* Autonomous Audit Console Section imported */}
                <div style={{ width: '100%' }}>
                  <AutonomousAuditSection />
                </div>

                {/* Modules Image Component */}
                <div style={{ backgroundColor: 'transparent' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', marginBottom: '8px' }}>MASSIVE SCALABILITY</div>
                  <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 16px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Total automation for every catalog and manufacturer</h2>
                  <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                    This cognitive ecosystem is not limited to a single task. The platform deploys this exact flow of intelligent auditing, extraction, and standardization simultaneously for each of the catalogs and systems, automating the corporate processes of every company on a massive scale without human intervention.
                  </p>
                  <div style={{ margin: '24px auto 16px auto', width: '100%', maxWidth: '1100px', boxShadow: 'none' }}>
                    <img 
                      src="/SERVEX/modulos.png" 
                      alt="Módulos de Servex" 
                      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} 
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* --- END TECHNICAL PIPELINE SUPER CONTAINER --- */}

            {/* Flow Diagram Component */}
            <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative' }}>
              <FlowDiagram />
            </div>

            {/* Solution 3 */}
            <div className="responsive-card-borderless" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '32px', backgroundColor: 'transparent' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', marginBottom: '8px' }}>03 / SERVEX_AI</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 16px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Centralized Enterprise Architecture</h2>
              <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: '0 0 12px 0' }}>
                To provide Servex with a robust environment, the SERVEX_AI platform was built using corporate-grade standards:
              </p>
              <ul style={{ paddingLeft: '16px', margin: 0, fontSize: 'clamp(13px, 1.4vw, 15px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong style={{ color: '#111', fontWeight: 500 }}>User Experience and Ecosystem Identity:</strong> GLYNNE designed an immersive and fluid interface that provides the platform with a unique and radical identity. The journey reflects user-centric design, integrating highly complex tools under a clean, hyper-modern, and highly intuitive visual experience, elevating Servex to another level.
                  <div style={{ margin: '24px auto 16px auto', width: '100%', maxWidth: '1100px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', backgroundColor: '#000' }}>
                    <iframe 
                      src="https://www.youtube.com/embed/WLz-rhYePYU?rel=0&modestbranding=1" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', aspectRatio: '16/9', display: 'block', border: 'none' }} 
                    />
                  </div>
                </li>
                <li><strong style={{ color: '#111', fontWeight: 500 }}>Absolute Governance and Centralization:</strong> Unification of all business rules and catalogs into a single corporate ecosystem. Information dispersion is completely eliminated, guaranteeing a single source of truth accessible in real time for all departments.</li>
                <li><strong style={{ color: '#111', fontWeight: 500 }}>Tailored Operational Control:</strong> Unlike generic solutions, this platform was modeled around Servex's exact DNA. This allows total operational flexibility, customized workflows, and a level of security and access specifically designed for their organizational chart.</li>
              </ul>
            </div>

            {/* Solution 4 */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '0.05em', marginBottom: '8px' }}>04 / DEPLOYMENT</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#111111', margin: '0 0 16px 0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>Cloud Infrastructure and Scalability</h2>
              <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', lineHeight: 1.6, fontWeight: 300, letterSpacing: '0.01em', margin: 0 }}>
                The platform features an automated continuous deployment cycle connected to the cloud (with Vercel) and routed through dedicated company domains (like servexcopilot.com). This configuration guarantees high availability, immediate deployments of new features without downtime, and elastic scaling capacity to absorb higher volumes of catalogs as Servex expands its supplier network.
              </p>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}
