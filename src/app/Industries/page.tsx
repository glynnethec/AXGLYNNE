'use client';

import React from 'react';
import Header from '@/app/components/Header';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import IndustriesHeroBanner from './components/IndustriesHeroBanner';
import B2BProcessManifesto from './components/B2BProcessManifesto';

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <BackgroundWrapper>
        <div className="glynne-industries" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
          {/* Editorial Hero Standalone Section */}
          <IndustriesHeroBanner />
          <B2BProcessManifesto />
          <Footer />
        </div>
      </BackgroundWrapper>
    </>
  );
}
