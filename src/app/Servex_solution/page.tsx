'use client';

import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import SolutionsManifesto from './components/SolutionsManifesto';

export default function SolutionsPage() {
  return (
    <BackgroundWrapper>
      <div className="hasely-solutions" style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
        <SolutionsManifesto />
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
