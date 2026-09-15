'use client';

import SplashScreen from '@/components/SplashScreen';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import HeroSection from '@/components/HeroSection';
import LinPromptSection from '@/components/LinPromptSection';
import HomeAuditSection from '@/components/HomeAuditSection';
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
        <HomeAuditSection />
        <WorkflowDiagram />
        <VideoEcosystemSection />
        <Footer />
      </BackgroundWrapper>
    </>
  );
}
