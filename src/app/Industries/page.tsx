'use client';

import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import B2BProcessManifesto from './components/B2BProcessManifesto';

export default function IndustriesPage() {
  return (
    <BackgroundWrapper>
      <div className="glynne-industries" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
        <B2BProcessManifesto />
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
