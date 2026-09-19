'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BentoCards from './BentoCards';
import OrbCardSection from './OrbCardSection';

interface LinPromptSectionProps {
  hideCard?: boolean;
  hideOrbCard?: boolean;
  customTitle?: string;
  customDescription?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
}

export default function LinPromptSection({
  hideCard = false,
  hideOrbCard = false,
  customTitle = "Govern AI across your enterprise",
  customDescription = "GLYNNE is the infrastructure layer that integrates artificial intelligence into enterprise systems safely and with total governance. AI shouldn't have unrestricted access. We provide the architecture of control, permissions, and traceability that filters every action—allowing AI to provide autonomous reasoning while you retain absolute security.",
  primaryButtonText = "Discover our architecture",
  primaryButtonUrl = "/About"
}: LinPromptSectionProps = {}) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/AX_chat?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };
  return (
    <section style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative',
      zIndex: 10,
      padding: hideCard ? '0' : '4rem 1.5rem 12rem',
      marginTop: '0'
    }}>
      {/* Main Content Wrapper */}
      <div className={hideCard ? "" : "responsive-home-card"} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: hideCard ? '100%' : '80vw',
        maxWidth: hideCard ? '100%' : '80vw',
        backgroundColor: 'transparent',
        border: hideCard ? 'none' : '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: hideCard ? '0' : '40px',
        padding: hideCard ? '0' : '4rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Inner Content Wrapper */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>


          {/* Minimalist Social Proof Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f5f5f7',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '32px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1d1d1f"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>4.98/5 Average</span>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#d2d2d7' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#86868b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>12 Enterprises Secured</span>
          </div>

          {/* Clean Typography Header */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: 300,
            color: '#111111',
            letterSpacing: '-0.01em',
            margin: '0 0 12px 0',
            textAlign: 'center'
          }}>
            Meet AX.
          </h2>
          <p style={{
            fontSize: '13px',
            color: '#8f8f96',
            fontWeight: 300,
            letterSpacing: '0.02em',
            margin: '0 0 40px 0',
            textAlign: 'center',
            maxWidth: '480px',
            lineHeight: 1.6
          }}>
            The GLYNNE AI engine operating under our strict infrastructure layer to show you how safe autonomy works.
          </p>

          {/* Groq-style AI Prompt Box */}
          <form onSubmit={handleSend} style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '680px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.06)',
            marginBottom: '0px',
          }}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Lin about us..."
              rows={3}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#1d1d1f',
                width: '100%',
                padding: '4px',
                fontWeight: 300,
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 1.5,
                letterSpacing: '0.01em'
              }}
            />

            {/* Tools Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px',
            }}>
              {/* Left Tools (Icons) */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Model Selector / Settings */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 12px', backgroundColor: '#f5f5f7',
                  borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.02em', textTransform: 'uppercase'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                  Lin Core
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>

                {/* Attachment Icon */}
                <button style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#86868b', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                </button>

                {/* Microphone Icon */}
                <button style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#86868b', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
              </div>

              {/* Submit Button (Arrow Icon) */}
              <button
                type="submit"
                disabled={!inputValue.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  backgroundColor: inputValue.trim() ? '#111111' : '#e5e5ea',
                  borderRadius: '50%',
                  color: inputValue.trim() ? '#ffffff' : '#a1a1a6',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </form>

          {/* Orb and Bento Grid Section */}
          {!hideOrbCard && <OrbCardSection />}

        </div>
      </div>
    </section>
  );
}
