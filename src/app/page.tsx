'use client';

import SplashScreen from '@/components/SplashScreen';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import HeroSection from '@/components/HeroSection';
import LinPromptSection from '@/components/LinPromptSection';
import HomeAuditSection from '@/components/HomeAuditSection';
import ClientLogosSection from '@/components/ClientLogosSection';
import HomeTaskAuditSection from '@/components/HomeTaskAuditSection';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import VideoEcosystemSection from '@/components/VideoEcosystemSection';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <SplashScreen />
      <BackgroundWrapper>
        <HeroSection />
        <LinPromptSection />
        <div style={{
          width: '80vw',
          maxWidth: '80vw',
          margin: '2rem auto 6rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '40px',
          backgroundColor: 'transparent',
          overflow: 'hidden',
          padding: '2rem 0'
        }}>
          <HomeAuditSection />
          <HomeTaskAuditSection />
        </div>
        <ClientLogosSection />
        <WorkflowDiagram />
        <VideoEcosystemSection />
        <Footer />
      </BackgroundWrapper>
    </>
  );
}
