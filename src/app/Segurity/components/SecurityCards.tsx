'use client';

import React from 'react';

export default function SecurityCards() {
  const cards = [
    {
      title: 'Data Isolation',
      desc: 'Strict separation between your proprietary enterprise data and the external reasoning models.'
    },
    {
      title: 'Least Privilege',
      desc: 'Each autonomous agent is granted only the absolute minimum permissions required to execute its specific task.'
    },
    {
      title: 'Controlled Execution',
      desc: 'Actions never execute directly. They must pass through defined tools and strict business rules.'
    },
    {
      title: 'Observability',
      desc: 'Every critical operation is logged, traced, and available for comprehensive security audits.'
    }
  ];

  return (
    <section style={{
      width: '100%',
      padding: '120px 20px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 400,
          color: '#111111',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 80px 0',
          maxWidth: '900px'
        }}>
          Security isn't added later. It's designed from the start.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          width: '100%'
        }}>
          {cards.map((card, index) => (
            <div key={index} style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              border: '1px solid rgba(0,0,0,0.05)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)'; }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111', margin: '0 0 16px 0' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: '#86868b', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
