'use client';

import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import MethodologyManifesto from './components/MethodologyManifesto';

export default function MethodologyPage() {
  return (
    <BackgroundWrapper>
      <div className="glynne-methodology" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
        <MethodologyManifesto />
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
