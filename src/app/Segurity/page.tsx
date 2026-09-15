'use client';

import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import SecurityHero from './components/SecurityHero';
import SecurityFilter from './components/SecurityFilter';
import SecurityArchitecture from './components/SecurityArchitecture';
import SecurityAccess from './components/SecurityAccess';
import SecurityTraceability from './components/SecurityTraceability';
import SecurityCards from './components/SecurityCards';
import SecurityClosing from './components/SecurityClosing';
import Footer from '@/app/components/Footer';

export default function SegurityPage() {
  return (
    <>
      <BackgroundWrapper>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 10
        }}>
          <SecurityHero />
          <SecurityFilter />
          <SecurityArchitecture />
          <SecurityAccess />
          <SecurityTraceability />
          <SecurityCards />
          <SecurityClosing />
          <Footer />
        </div>
      </BackgroundWrapper>
    </>
  );
}
