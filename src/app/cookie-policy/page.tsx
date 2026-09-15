'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import LinPromptSection from '@/components/LinPromptSection';
import { 
  FiFileText, FiHelpCircle, FiLayers, FiSettings, 
  FiCloud, FiSliders, FiRefreshCw, FiMail 
} from 'react-icons/fi';

const SECTIONS = [
  { id: 'intro', title: 'Introduction', icon: <FiFileText /> },
  { id: 'que-son', title: '1. What are cookies?', icon: <FiHelpCircle /> },
  { id: 'tipos', title: '2. Types of cookies', icon: <FiLayers /> },
  { id: 'utilizacion', title: '3. What do we use cookies for?', icon: <FiSettings /> },
  { id: 'terceros', title: '4. Third-party cookies', icon: <FiCloud /> },
  { id: 'gestion', title: '5. Cookie management', icon: <FiSliders /> },
  { id: 'cambios', title: '6. Changes', icon: <FiRefreshCw /> },
  { id: 'contacto', title: '7. Contact', icon: <FiMail /> }
];

export default function CookiePolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .desktop-only-sidebar {
            display: none !important;
          }
        }
      `}</style>
      <Header />
      <BackgroundWrapper theme="light">
        <div style={{
          minHeight: '100vh',
          padding: '160px 40px 80px 40px',
          display: 'flex',
          position: 'relative',
          zIndex: 10,
          width: '100%'
        }}>
          {/* Main Layout Container */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'relative'
          }}>
            
            {/* Left Spacer - Reserves space for collapsed sidebar */}
            <div className="desktop-only-sidebar" style={{ flex: '0 0 64px', position: 'relative' }}>
              <div style={{ position: 'sticky', top: '120px' }}>
                
                {/* Floating Island Sidebar - Expands on hover */}
                <aside 
                  onMouseEnter={() => setIsSidebarOpen(true)}
                  onMouseLeave={() => setIsSidebarOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isSidebarOpen ? '280px' : '64px',
                    height: 'fit-content',
                    maxHeight: 'calc(100vh - 160px)',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '24px',
                    padding: isSidebarOpen ? '24px 16px' : '24px 0',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: isSidebarOpen ? '0 24px 80px rgba(0,0,0,0.1)' : '0 12px 40px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isSidebarOpen ? 'flex-start' : 'center',
                    gap: '6px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 100 // Ensure it overlaps the content
                  }}
                >
                  
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      title={!isSidebarOpen ? section.title : ''}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                        width: isSidebarOpen ? '100%' : '40px',
                        minHeight: '40px',
                        background: 'transparent',
                        border: 'none',
                        padding: isSidebarOpen ? '8px 12px' : '0',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: activeSection === section.id ? 500 : 300,
                        color: activeSection === section.id ? '#111' : '#86868b',
                        backgroundColor: activeSection === section.id ? 'rgba(0,0,0,0.04)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => {
                        if (activeSection !== section.id) e.currentTarget.style.color = '#111';
                        if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                      }}
                      onMouseOut={(e) => {
                        if (activeSection !== section.id) e.currentTarget.style.color = '#86868b';
                        if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '16px',
                        marginRight: isSidebarOpen ? '12px' : '0',
                        transition: 'margin 0.3s ease'
                      }}>
                        {section.icon}
                      </span>
                      
                      <span style={{ 
                        opacity: isSidebarOpen ? 1 : 0, 
                        width: isSidebarOpen ? 'auto' : 0, 
                        overflow: 'hidden', 
                        transition: 'opacity 0.2s ease, width 0.3s ease',
                        textAlign: 'left',
                        lineHeight: 1.4
                      }}>
                        {section.title}
                      </span>
                    </button>
                  ))}
                </aside>
              </div>
            </div>

            {/* Content Container (Perfectly Centered) */}
            <div style={{
              flex: '1',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '0 0 80px 0',
            }}>
              <LinPromptSection hideCard={true} hideOrbCard={true} />
              
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: '#111', margin: '120px 0 16px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Cookie Policy
              </h1>
              <p style={{ fontSize: '12px', color: '#86868b', marginBottom: '48px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Last updated: {currentDate}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#1d1d1f', fontSize: '15px', lineHeight: 1.7, fontWeight: 300, letterSpacing: '0.01em' }}>
                
                <section id="intro">
                  <p>This Policy explains how GLYNNE S.A.S. uses cookies and similar technologies on its websites and platforms.</p>
                </section>

                <section id="que-son">
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>1. What are cookies?</h2>
                  <p>Cookies are small files or technological mechanisms that allow storing or consulting certain information related to the browsing of a device.</p>
                  <p>They can be used to provide functionalities, improve security, remember preferences, and obtain statistical information.</p>
                </section>

                <section id="tipos">
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>2. Types of cookies</h2>
                  <p>Depending on the technologies used by GLYNNE, there may be:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Strictly necessary cookies:</strong> These are necessary for certain technical functions of the site or platform.</li>
                    <li><strong>Preference cookies:</strong> Allow remembering certain user configurations.</li>
                    <li><strong>Analytical cookies:</strong> Allow understanding how visitors use the site and detecting improvement opportunities.</li>
                    <li><strong>Third-party cookies:</strong> Can be installed by external services used by GLYNNE.</li>
                  </ul>
                </section>

                <section id="utilizacion">
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>3. What do we use cookies for?</h2>
                  <p>Cookies can be used to:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Maintain sessions.</li>
                    <li>Protect services.</li>
                    <li>Remember configurations.</li>
                    <li>Analyze traffic.</li>
                    <li>Detect errors.</li>
                    <li>Improve performance.</li>
                    <li>Understand general browsing behavior.</li>
                  </ul>
                </section>

                <section id="terceros">
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>4. Third-party cookies</h2>
                  <p>When GLYNNE uses external analytics, advertising, infrastructure, or integrated functionality tools, such providers may implement their own technologies.</p>
                  <p>The processing carried out by such third parties will be subject to their own policies.</p>
                </section>

                <section id="gestion">
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>5. Cookie management</h2>
                  <p>Depending on the browser used, the user can configure, block, or delete certain cookies.</p>
                  <p>Blocking necessary cookies may affect certain functionalities of the site.</p>
                </section>

                <section id="cambios">
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>6. Changes</h2>
                  <p>GLYNNE may update this Policy when the technologies used or the applicable legal obligations change.</p>
                </section>

                <section id="contacto" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>7. Contact</h2>
                  <p>For questions related to cookies:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Corporate Name:</strong> GLYNNE S.A.S.</li>
                    <li><strong>Tax ID (NIT):</strong> 901966512</li>
                    <li><strong>Email:</strong> alexglynne7@gmail.com</li>
                    <li><strong>Website:</strong> <a href="https://glynneai.com" style={{ color: '#111', textDecoration: 'underline' }}>https://glynneai.com</a></li>
                    <li><strong>Last Updated:</strong> {currentDate}</li>
                  </ul>
                </section>

              </div>
            </div>

            {/* Right Spacer (Matches left sidebar width to keep text perfectly centered on screen) */}
            <div className="desktop-only-sidebar" style={{ flex: '0 0 64px', display: 'block' }}></div>

          </div>
        </div>

        {/* Small Floating Cookie Banner */}
        {!cookiesAccepted && (
          <div style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            padding: '16px 24px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            zIndex: 1000
          }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#111', margin: 0, whiteSpace: 'nowrap' }}>
              Accept cookies?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setCookiesAccepted(true)}
                style={{
                  backgroundColor: '#111',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Accept
              </button>
              <Link href="/">
                <button style={{
                  backgroundColor: 'transparent',
                  color: '#111',
                  border: '1px solid rgba(0,0,0,0.1)',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Return to Home
                </button>
              </Link>
            </div>
          </div>
        )}

      </BackgroundWrapper>
    </>
  );
}
