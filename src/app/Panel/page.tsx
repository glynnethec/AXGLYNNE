'use client';

import React from 'react';
import Header from '@/app/components/Header';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import AssemblyDashboard from './components/AssemblyDashboard';

export default function PanelPage() {
  return (
    <>
      <Header />
      <BackgroundWrapper theme="dark">
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 20px 60px 20px', /* padding for header */
          position: 'relative',
          zIndex: 10
        }}>
          <AssemblyDashboard />
        </div>
      </BackgroundWrapper>
    </>
  );
}
