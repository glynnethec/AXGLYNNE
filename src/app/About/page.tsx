'use client';

import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import AboutManifesto from './components/AboutManifesto';

export default function AboutPage() {
  return (
    <BackgroundWrapper>
      <div className="hasely-about" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
        <AboutManifesto />
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
