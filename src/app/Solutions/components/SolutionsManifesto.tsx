'use client';

import React from 'react';
import PcCardSolutions from './PcCardSolutions';
import ServexCaseStudy from './ServexCaseStudy';

export default function SolutionsManifesto() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent' }}>
      <PcCardSolutions />
      <ServexCaseStudy />
      
      {/* Motivational Closing Section */}
      <section style={{ width: '100%', paddingTop: '80px', paddingBottom: '160px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: '#111111', fontStyle: 'italic', lineHeight: 1.4, maxWidth: '900px', margin: '0 auto 120px auto', padding: '0 24px', letterSpacing: '-0.01em' }}>
          “We are constantly exploring new boundaries in artificial intelligence to push the limits of corporate innovation and absolute operational efficiency.”
        </h2>

        <div style={{ margin: '0 0 120px 0', fontSize: '24px', fontWeight: 300, color: '#111' }}>↓</div>

        <div style={{ fontSize: '11px', letterSpacing: '0.2em', fontWeight: 600, color: '#1d1d1f', textTransform: 'uppercase' }}>GLYNNE</div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, color: '#111111', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '24px 0 0 0', padding: '0 24px' }}>
          Redefining what is possible.<br/>One ecosystem at a time.
        </h1>
      </section>
    </div>
  );
}
