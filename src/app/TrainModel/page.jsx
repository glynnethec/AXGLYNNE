'use client';

import React from 'react';
import Header from '@/app/components/Header';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import TrainModelBrandBlocks from '@/components/TrainModelBrandBlocks';
import TrainModelRadarBanner from '@/components/TrainModelRadarBanner';
import TrainModelHeroSection from '@/components/TrainModelHeroSection';
import TrainModelGridManifesto from '@/components/TrainModelGridManifesto';
import ThreeTierEcosystemSection from '@/components/ThreeTierEcosystemSection';
import Footer from '@/app/components/Footer';

export default function TrainModelPage() {
  return (
    <>
      <Header />
      <BackgroundWrapper>
        <style>{`
          .section-wrapper {
            width: 100%;
            height: 100vh;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }
          @media (max-width: 900px) {
            .section-wrapper {
              height: auto !important;
              min-height: auto !important;
            }
          }
        `}</style>
        <div style={{
          width: '100%',
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* 1.ª Sección: BrandBlocks Blueprint (Technical Blueprint) */}
          <div className="section-wrapper" style={{ paddingTop: '80px' }}>
            <TrainModelBrandBlocks />
          </div>

          {/* 2.ª Sección: Tactical Radar Banner */}
          <div className="section-wrapper">
            <TrainModelRadarBanner />
          </div>

          {/* 3.ª Sección: Grid Manifesto ("Para aprender, para ajustar...") */}
          <div className="section-wrapper">
            <TrainModelGridManifesto />
          </div>

          {/* 4.ª Sección: Hero Section ("Evolve ® la forma en que entrenas...") */}
          <div className="section-wrapper">
            <TrainModelHeroSection />
          </div>

          {/* 5.ª Sección: Three Tier Ecosystem (Fase 01, 02, 03) */}
          <div className="section-wrapper">
            <ThreeTierEcosystemSection />
          </div>
        </div>
        <Footer />
      </BackgroundWrapper>
    </>
  );
}
