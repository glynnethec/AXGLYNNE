'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GsapCanvasSection from '@/components/GsapCanvasSection';
import PcCardSection from '@/components/PcCardSection';

export default function AboutManifesto() {
  const router = useRouter();

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', color: '#111111' }}>
      <style>{`
        .glynne-section {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 120px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .glynne-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: '#1d1d1f';
          margin-bottom: 24px;
        }
        .glynne-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #111111;
          line-height: 1.1;
          margin: 0 0 40px 0;
        }
        .glynne-text {
          font-size: clamp(14px, 1.5vw, 16px);
          color: #86868b;
          font-weight: 300;
          line-height: 1.6;
          letter-spacing: 0.01em;
          max-width: 700px;
          margin: 0 auto 24px auto;
        }
        .glynne-arrow {
          font-size: 24px;
          color: #d2d2d7;
          margin: 60px 0;
          font-weight: 300;
        }
        .tech-monospace {
          font-family: monospace;
          font-size: 14px;
          color: #86868b;
          line-height: 2;
          max-width: 800px;
          margin: 40px auto;
          word-spacing: 4px;
        }
        .work-process {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          font-family: monospace;
          font-size: 14px;
          color: #111111;
          margin-top: 40px;
        }
        .work-process-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 600px;
          margin: 60px auto 0 auto;
          text-align: left;
        }
        .process-row {
          display: flex;
          gap: 24px;
        }
        .process-num {
          font-family: monospace;
          color: #86868b;
          font-size: 14px;
          padding-top: 4px;
        }
        .photo-placeholder {
          width: 100%;
          max-width: 600px;
          aspect-ratio: 16/9;
          background-color: #f5f5f7;
          border-radius: 24px;
          margin: 40px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #86868b;
          font-size: 14px;
          letter-spacing: 0.05em;
        }
        .portrait-placeholder {
          width: 240px;
          height: 320px;
          background-color: #f5f5f7;
          border-radius: 24px;
          margin: 0 auto 40px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #86868b;
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        @media (max-width: 768px) {
          .work-process { flex-direction: column; gap: 24px; }
          .work-process-item { flex-direction: column; gap: 24px; }
          .work-process-item span.arrow { transform: rotate(90deg); }
        }
        @media (max-width: 700px) {
          .glynne-section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .mobile-founder-container {
            width: 92vw !important;
            padding: 40px 24px !important;
            flex-direction: column !important;
            text-align: center !important;
          }
          .mobile-founder-text {
            text-align: center !important;
          }
          .mobile-founder-img-wrapper {
            width: 100% !important;
            max-width: 300px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>

      {/* 1. Header */}
      <section className="glynne-section" style={{ paddingTop: '160px', paddingBottom: '40px' }}>
        <div className="glynne-label">About Glynne</div>
        <h1 className="glynne-title" style={{ maxWidth: '800px', fontSize: 'clamp(40px, 6vw, 72px)' }}>
          Engineering intelligence<br />from Bogotá to the world.
        </h1>
        
        <div className="glynne-arrow">↓</div>
      </section>

      {/* PC Container matching Home page style */}
      <PcCardSection />

      <section className="glynne-section" style={{ paddingTop: '40px' }}>
        <div className="glynne-label">Who We Are</div>
        
        <p className="glynne-text">
          <strong style={{ color: '#111111', fontWeight: 400 }}>GLYNNE S.A.S.</strong> is a technology company founded in Bogotá, Colombia, dedicated to software architecture, artificial intelligence, and systems automation.
        </p>
        <p className="glynne-text">
          We build technology for companies that need to solve complex problems through software tailored specifically to their operations. Our work combines software engineering, systems architecture, artificial intelligence, and solution design to create robust, scalable platforms ready to evolve.
        </p>
        <p className="glynne-text">
          Although we were born in Colombia, our work is not limited by location. We work with companies and projects around the world, developing technological solutions that integrate across different industries, infrastructures, and operating models.
        </p>
      </section>

      <div className="glynne-arrow">↓</div>

      {/* 2. Cómo entendemos la tecnología */}
      <section className="glynne-section" style={{ paddingTop: '40px' }}>
        <div className="glynne-label">How We Think</div>
        <h2 className="glynne-title">
          Technology is not a layer.<br />It is an architecture.
        </h2>
        
        <p className="glynne-text">
          At Glynne, we believe that a good technological solution doesn't depend solely on an AI model, a framework, or a specific tool.
        </p>
        <p className="glynne-text" style={{ color: '#111111', fontWeight: 400, fontSize: '20px', margin: '16px auto 32px auto' }}>
          It depends on how all the pieces work together.
        </p>
        <p className="glynne-text">
          That's why our process starts by understanding the problem, the operation, and the technological context of each project. From there, we design the architecture, select the right technologies, and build each component striving for a balance between performance, scalability, security, maintainability, and evolution.
        </p>
        <p className="glynne-text">
          Artificial intelligence is a fundamental part of our engineering, but we don't treat it as a trend or an isolated element. We integrate it into real systems, connecting it with data, processes, applications, APIs, agents, and services.
        </p>
      </section>

      <div className="glynne-arrow">↓</div>

      {/* 3. Tecnología */}
      <section className="glynne-section" style={{ paddingTop: '40px' }}>
        <div className="glynne-label">Technology</div>
        <h2 className="glynne-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
          Built with the technologies<br/>shaping modern software.
        </h2>
        
        <p className="glynne-text">
          We work with a modern and constantly evolving technological ecosystem. Our stack combines frontend and backend development technologies, cloud infrastructure, databases, machine learning, language models, intelligent agents, automation, and distributed architectures.
        </p>
        
        <div className="tech-monospace">
          Next.js · React · Python · FastAPI · Node.js · AWS · GCP · Vercel · Render · Supabase · PostgreSQL · SQL · LangChain · LangGraph · OpenAI · Gemini · Groq · Scikit-learn · APIs · Microservices · AI Agents
        </div>

        <p className="glynne-text" style={{ marginTop: '24px' }}>
          More than accumulating technologies, we seek to understand them deeply and use them when they truly add value to the system.
        </p>
        
        <p className="glynne-text" style={{ color: '#111111', fontWeight: 400, fontSize: '20px', marginTop: '32px' }}>
          Tools change. Engineering remains.
        </p>
      </section>

      <div className="glynne-arrow">↓</div>

      {/* 4. Nuestra forma de trabajar */}
      <section className="glynne-section" style={{ paddingTop: '40px' }}>
        <div className="glynne-label">How We Work</div>
        
        <div className="work-process">
          <div className="work-process-item">
            <span>Understand</span>
            <span className="arrow" style={{ color: '#d2d2d7' }}>→</span>
          </div>
          <div className="work-process-item">
            <span>Investigate</span>
            <span className="arrow" style={{ color: '#d2d2d7' }}>→</span>
          </div>
          <div className="work-process-item">
            <span>Architect</span>
            <span className="arrow" style={{ color: '#d2d2d7' }}>→</span>
          </div>
          <div className="work-process-item">
            <span>Build</span>
            <span className="arrow" style={{ color: '#d2d2d7' }}>→</span>
          </div>
          <div className="work-process-item">
            <span>Evolve</span>
          </div>
        </div>

        <p className="glynne-text" style={{ marginTop: '60px' }}>
          Our process combines research, analysis, and engineering.
        </p>

        <div className="process-grid">
          {[
            { num: '01', title: 'Understand', desc: 'We study the context and understand how the system or business truly works.' },
            { num: '02', title: 'Investigate', desc: 'We analyze processes, information, constraints, and technological opportunities.' },
            { num: '03', title: 'Architect', desc: 'We design the architecture for software, data, artificial intelligence, and infrastructure.' },
            { num: '04', title: 'Build', desc: 'We develop, integrate, and test each component.' },
            { num: '05', title: 'Evolve', desc: 'We measure, optimize, and continue developing on top of the existing architecture.' }
          ].map(step => (
            <div key={step.num} className="process-row">
              <div className="process-num">{step.num}</div>
              <div>
                <strong style={{ color: '#111111', fontWeight: 400, display: 'block', marginBottom: '4px', fontSize: '16px' }}>{step.title}</strong>
                <span style={{ color: '#86868b', fontWeight: 300, fontSize: '16px' }}>{step.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="glynne-text" style={{ marginTop: '40px', color: '#111111' }}>
          This ensures that every project has a solid technical foundation and doesn't rely on improvised solutions.
        </p>
      </section>

      <div className="glynne-arrow">↓</div>

      {/* 5. Tecnología que evoluciona */}
      <section className="glynne-section" style={{ paddingTop: '40px' }}>
        <h2 className="glynne-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
          We believe the best systems<br/>are never finished.
        </h2>
        
        <p className="glynne-text">
          Technology changes constantly. New models, frameworks, architectures, and processing methods appear every day. That's why at Glynne, we maintain a culture of continuous research and learning.
        </p>
        <p className="glynne-text">
          We experiment with new technologies, evaluate their behavior, and seek to understand how they can be responsibly incorporated into real systems. Our goal is not always to use the newest thing.
        </p>
        <p className="glynne-text" style={{ color: '#111111', fontWeight: 400, fontSize: '20px', marginTop: '32px' }}>
          It's about building with what works best today<br/>and designing for what will be needed tomorrow.
        </p>
      </section>

      <div className="glynne-arrow">↓</div>

      {/* 5.5 Inserted GSAP Component */}
      <GsapCanvasSection />

      {/* 6. Desde Bogotá */}
      <section className="glynne-section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="glynne-label">From Bogotá</div>
        <h2 className="glynne-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
          Born in Colombia.<br/>Built for anywhere.
        </h2>
        
        <p className="glynne-text">
          Glynne was born in Bogotá, Colombia, within a technological ecosystem that has allowed us to build, research, and work with projects of various scales.
        </p>
        <p className="glynne-text">
          Our location defines our origin, but not our reach. We work remotely with companies and collaborators around the world, leveraging global technological infrastructure and development methodologies that allow us to build systems regardless of where the team or client is located.
        </p>

        <div style={{ marginTop: '60px', fontFamily: 'monospace', fontSize: '18px', color: '#111111', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <span>Bogotá, Colombia</span>
          <span style={{ color: '#d2d2d7' }}>↓</span>
          <span>THE WORLD</span>
        </div>
      </section>

      <div className="glynne-arrow">↓</div>

      {/* 7. El Fundador Container */}
      <div className="mobile-founder-container" style={{ position: 'relative', zIndex: 10, width: '70vw', boxSizing: 'border-box', margin: '0 auto 80px auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px', padding: '80px 60px', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '32px', backgroundColor: 'transparent', backdropFilter: 'blur(10px)' }}>
        
        {/* Left: Bio Text */}
        <div className="mobile-founder-text" style={{ flex: '1 1 300px', textAlign: 'left', position: 'relative', zIndex: 11 }}>
          <div className="glynne-label mobile-founder-text" style={{ marginBottom: '24px', textAlign: 'left', color: '#111111' }}>The Founder</div>
          
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, marginBottom: '24px' }}>
            <strong style={{ color: '#111111', fontWeight: 400 }}>Software architect, researcher, and developer</strong> specialized in artificial intelligence and automation systems.
          </p>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, marginBottom: '24px' }}>
            His work focuses on designing architectures capable of integrating software, data, and artificial intelligence to solve complex operational problems and transform processes into technological systems.
          </p>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, marginBottom: '24px' }}>
            From software development to researching new AI applications, his approach combines engineering, experimentation, and a vision oriented towards building technology that can grow alongside the organizations that use it.
          </p>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', color: '#86868b', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.6, margin: 0 }}>
            As founder and CEO of Glynne, he leads the technological direction of the company and participates directly in the design and development of its architectures and solutions.
          </p>
        </div>

        {/* Right: CEO Image with Logo Background and Gradient Name */}
        <div className="mobile-founder-img-wrapper" style={{ flex: '1.5 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            {/* Subtle Logo Background */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '110%', height: '110%', backgroundImage: 'url(/logos/GLYNNE.svg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.04, zIndex: 0 }} />
            
            <img 
              src="/AlexanderCEO.png" 
              alt="Alexander Quiroga - Founder & CEO" 
              style={{ width: '100%', display: 'block', filter: 'grayscale(100%) brightness(1.15) contrast(0.95)', position: 'relative', zIndex: 1 }} 
            />

            {/* Name Overlay acting as a masking frame */}
            <div style={{ position: 'absolute', bottom: '-25px', left: '-10%', right: '-10%', zIndex: 2, textAlign: 'center', background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 60%, #ffffff 90%, #ffffff 100%)', paddingTop: '40px', paddingBottom: '20px' }}>
              <h3 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: '#86868b', margin: '0', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                ALEXANDER QUIROGA
              </h3>
              <p style={{ fontSize: '13px', color: '#111111', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '8px 0 0 0' }}>
                Founder & CEO
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="glynne-arrow">↓</div>

      {/* 8. Cierre & Quote */}
      <section className="glynne-section" style={{ paddingTop: '40px', paddingBottom: '160px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: '#111111', fontStyle: 'italic', lineHeight: 1.4, maxWidth: '800px', margin: '0 auto 120px auto' }}>
          “Technology shouldn't limit what a company can do.<br/>It should expand what it is capable of imagining.”
        </h2>

        <div className="glynne-arrow" style={{ margin: '0 0 120px 0' }}>↓</div>

        <div className="glynne-label" style={{ fontSize: '16px', letterSpacing: '0.2em' }}>GLYNNE</div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, color: '#111111', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '24px 0 0 0' }}>
          Engineers. Researchers.<br/>Builders.
        </h1>
      </section>

    </div>
  );
}
