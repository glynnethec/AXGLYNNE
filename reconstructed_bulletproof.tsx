'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Storytelling Phase Refs
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  // Advanced Random Grid Hover State
  type HoverStep = {
    id: number;
    cx: number;
    cy: number;
    neighbors: { dx: number; dy: number; opacity: number }[];
  };
  const [history, setHistory] = useState<HoverStep[]>([]);
  const stepIdRef = useRef(0);
  const lastCellRef = useRef({ x: -1, y: -1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const cx = Math.floor(x / 96);
    const cy = Math.floor(y / 96);

    if (cx !== lastCellRef.current.x || cy !== lastCellRef.current.y) {
      lastCellRef.current = { x: cx, y: cy };
      
      const numNeighbors = Math.floor(Math.random() * 4) + 1; // 1 to 4 random neighbors
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({
          dx: shuffled[i][0],
          dy: shuffled[i][1],
          opacity: (Math.random() * 0.03) + 0.02 // Opacity between 0.02 and 0.05
        });
      }

      const newStep = {
        id: stepIdRef.current++,
        cx,
        cy,
        neighbors
      };

      setHistory(prev => [newStep, ...prev].slice(0, 8)); // Keep last 8 steps for fade out
    }
  };

  const handleMouseLeave = () => {
    setHistory([]);
    lastCellRef.current = { x: -1, y: -1 };
  };

  useEffect(() => {
    // Start fading out the splash after 2.5 seconds
    const fadeTimer = setTimeout(() => setFadeSplash(true), 2500);
    // Remove from DOM after 3.3 seconds (allows CSS transition to finish)
    const removeTimer = setTimeout(() => setShowSplash(false), 3300);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  // Vanta Background State
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(0);

  useEffect(() => {
    let effect: any;
    const initVanta = async () => {
      if (!vantaEffect && vantaRef.current) {
        try {
          const THREE = await import('three');
          (window as any).THREE = THREE;

          const VantaFog = (await import('vanta/dist/vanta.fog.min' as any)).default || require('vanta/dist/vanta.fog.min');

          effect = VantaFog({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xf5f5f7,
            midtoneColor: 0xe8e8ea,
            lowlightColor: 0xdddddf,
            baseColor: 0xffffff,
            blurFactor: 0.60,
            speed: 0.8,
            zoom: 0.7
          });
          setVantaEffect(effect);
        } catch (error) {
          console.error("Vanta initialization failed:", error);
        }
      }
    };
    initVanta();

    return () => {
      if (effect) effect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    // Initialize Lenis for buttery smooth momentum scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Fluid, natural momentum
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Render first frame as soon as it loads
    images[0].onload = render;
    window.addEventListener('resize', render);

    const ctx = gsap.context(() => {
      // 2. Set Initial Spatial States
      // Canvas element remains perfectly centered to avoid edge clipping
      gsap.set(canvasRef.current, { xPercent: -50, yPercent: -50, x: 0 });

      // ScrollTrigger timeline for canvas and text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%', // Reduced scroll distance for tighter control (3 viewports)
            <h2 className="subtitle stagger-item" style={{ marginLeft: 'auto', marginRight: 0 }}>
              Desglosando la complejidad.
            </h2>
            <p className="body-text stagger-item" style={{ marginLeft: 'auto', marginRight: 0 }}>
              No vendemos software tradicional. Construimos y retenemos el know-how técnico capa por capa para escalar tu industria.
            </p>
            <ul className="feature-list right-align stagger-item">
              <li>Modelos de Inteligencia Artificial</li>
              <li>Lógica y Procesamiento de Datos</li>
              <li>Integración de Sistemas a Medida</li>
            </ul>
          </div>
          
          <div ref={text3Ref} className="text-block centered" style={{ maxWidth: '650px' }}>
            <h1 className="title stagger-item">Automatización Crítica.</h1>
            <h2 className="subtitle stagger-item">Infraestructuras como SVX Copilot.</h2>
            <p className="body-text stagger-item" style={{ margin: '1rem auto 0' }}>
              Entregamos licencias de uso sobre arquitecturas escalables capaces de actualizar, validar y transformar catálogos industriales sin intervención manual.
            </p>
          </div>
        </div>
      </div>
      
      <section className="spacer">
        <h2>Continúa Explorando</h2>
        <p>El scroll suave te llevará hasta aquí.</p>
      </section>
    </main>
  );
}

            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', filter: 'blur(3px)',
            background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.6) 100%)',
            boxShadow: 'inset -12px -12px 25px rgba(70, 71, 117, 0.2), inset 8px 8px 15px rgba(255,255,255,0.9), 0 15px 25px rgba(70,71,117,0.05)',
            animation: 'float-bubble 10s ease-in-out infinite 3s'
          }} />
        </div>

        <h1>AXGLYNNE</h1>
        <img src="/logos/GLYNNE.svg" alt="GLYNNE Logo" className="intro-logo-ghost" />
      </section>

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />
      // FASE 03 (70 to 100)
      tl.to(phase3Ref.current, { opacity: 1, y: 0, duration: 15, ease: 'power3.out' }, 70);
    });

          <h1>AXGLYNNE</h1>
          <p className="hero-subtitle">Artificial Intelligence Systems Integration</p>
        </div>
      </section>

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />
        
        <div className="overlay-content">
          <div ref={text1Ref} className="text-block" style={{ width: '100%', maxWidth: '550px' }}>
            <img src="/logos/GLYNNE.svg" alt="GLYNNE" className="stagger-item" style={{ filter: 'brightness(0)', maxWidth: '90px', marginBottom: '1.2rem' }} />
            <h1 className="title stagger-item" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              Next-Gen Orchestration:<br />Servex Copilot & Command Engine.
            </h1>
            <p className="body-text stagger-item" style={{ marginLeft: 0, fontSize: '0.95rem' }}>
              Automate the complexity of Catalog Creator XML architectures. Our Servex Copilot delivers an ultra-sophisticated audit engine that synchronizes data pipelines directly into Configura’s ecosystem, replacing manual legacy workflows with intelligent PIM orchestration and automated XML schema validation.
            </p>
            <p className="body-text stagger-item" style={{ marginLeft: 0, fontSize: '0.95rem' }}>
              Eliminate manual XML editing. Deploy specialized pipelines for Catalog Creator data integrity.
            </p>
            <p className="body-text stagger-item" style={{ marginLeft: 0, fontSize: '0.95rem' }}>
              Advanced Audit Engine to validate, synchronize, and deploy high-fidelity CET Designer catalogs.
            </p>
            <h2 className="subtitle stagger-item" style={{ marginTop: '1.5rem', marginLeft: 0, fontWeight: 700, fontSize: '1.1rem' }}>
              Mission Critical<br />
              <span style={{ fontWeight: 300, fontSize: '0.85em' }}>Automated Infrastructure for Servex US Partners</span>
            </h2>
          </div>
          
    <main>
      {/* SPLASH SCREEN */}
      {showSplash && (
        <div className={`splash-screen ${fadeSplash ? 'splash-fade-out' : ''}`}>
          <div className="splash-logo" aria-label="GLYNNE Logo" />
        </div>
      )}

      {/* CONTINUOUS BACKGROUND WRAPPER */}
      <div 
        style={{ position: 'relative', width: '100%', backgroundColor: '#ffffff', overflow: 'hidden' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Interactive SVG Grid */}
        <svg 
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        >
          <defs>
            <pattern id="blackbox-grid" width="96" height="96" patternUnits="userSpaceOnUse">
              <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blackbox-grid)" />
          
          {history.map((step, index) => {
            const isCurrent = index === 0;
            return (
              <g key={step.id} style={{ animation: 'cellFadeIn 0.25s ease forwards' }}>
                {/* Random Neighbors */}
                {step.neighbors.map((n, i) => (
                  <rect 
                    key={i}
                    x={(step.cx + n.dx) * 96} 
                    y={(step.cy + n.dy) * 96} 
                    width="96" 
                    height="96" 
                    fill={`rgba(0,0,0,${isCurrent ? n.opacity : 0})`} 
                    style={{ transition: 'fill 0.6s ease' }} 
                  />
                ))}
                {/* Center Cell */}
                <rect 
                  x={step.cx * 96} 
                  y={step.cy * 96} 
                  width="96" 
                  height="96" 
                  fill={`rgba(0,0,0,${isCurrent ? 0.07 : 0})`} 
                  style={{ transition: 'fill 0.6s ease' }} 
                />
              </g>
            );
          })}
        </svg>

        {/* SECTION 1: HERO */}
        <section className="intro-hero" style={{ position: 'relative', backgroundColor: 'transparent' }}>
          <div className="hero-titles" style={{ zIndex: 1, pointerEvents: 'none' }}>
            <h1>AXGLYNNE</h1>
            <p className="hero-subtitle">Artificial Intelligence Systems Integration</p>
          </div>
        </section>

        {/* SECTION 2: AI PROMPT */}
        <section style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          backgroundColor: 'transparent', 
          position: 'relative', 
          zIndex: 10,
          padding: '0 1.5rem 12rem',
          marginTop: '-4vh' // Pull up closer to the title
        }}>
        {/* Main Content Wrapper */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: '1080px', 
          backgroundColor: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)',
                  x={step.cx * 96} 
                  y={step.cy * 96} 
                  width="96" 
                  height="96" 
                  fill={`rgba(0,0,0,${isCurrent ? 0.07 : 0})`} 
                  style={{ transition: 'fill 0.6s ease' }} 
                />
              </g>
            );
          })}
        </svg>

        {/* SECTION 1: HERO */}
        <section className="intro-hero" style={{ position: 'relative', backgroundColor: 'transparent' }}>
          <div className="hero-titles" style={{ zIndex: 1, pointerEvents: 'none' }}>
            <h1>AXGLYNNE</h1>
            <p className="hero-subtitle">Artificial Intelligence Systems Integration</p>
          </div>
        </section>

        {/* SECTION 2: AI PROMPT */}
        <section style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          backgroundColor: 'transparent', 
          position: 'relative', 
          zIndex: 10,
          padding: '0 1.5rem 12rem',
          marginTop: '-4vh' // Pull up closer to the title
        }}>
        {/* Main Content Wrapper (Vanta Fog Container) */}
        <div ref={vantaRef} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: '1080px', 
          backgroundColor: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)',
          borderRadius: '40px',
          padding: '4rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Inner Content Wrapper to ensure z-index over Vanta canvas */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {/* Minimalist Social Proof Pill */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: '#f5f5f7', 
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '32px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1d1d1f"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>4.98/5 Average</span>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#d2d2d7' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#86868b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>58,980+ Users</span>
          </div>

          {/* Clean Typography Header */}
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 300, 
            color: '#111111', 
            letterSpacing: '-0.01em',
            margin: '0 0 12px 0',
            textAlign: 'center'
                resize: 'none',
                lineHeight: 1.5,
                letterSpacing: '0.01em'
              }}
            />
            
            {/* Tools Row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '12px',
            }}>
              {/* Left Tools (Icons) */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Model Selector / Settings */}
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  padding: '6px 12px', backgroundColor: '#f5f5f7', 
                  borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.02em', textTransform: 'uppercase'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Lin Core
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                
                {/* Attachment Icon */}
                <button style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#86868b', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>

                {/* Microphone Icon */}
                <button style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#86868b', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
              </div>

              {/* Submit Button (Arrow Icon) */}
              <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '32px', 
                height: '32px', 
                backgroundColor: '#111111', 
                borderRadius: '50%', 
                color: '#ffffff',
                cursor: 'pointer',
                border: 'none',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </div>

          </div>
        </div>
        </section>
      </div>

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />

        <div className="overlay-content">

          {/* FASE 01 */}
          <div ref={phase1Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 800px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
              Do you see this black box?
          </div>

          </div>
        </div>
        </section>
      </div>

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />

        <div className="overlay-content">

          {/* FASE 01 */}
          <div ref={phase1Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 800px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
          <div ref={phase1Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 800px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
              Do you see this black box?
            </h2>
            <p className="body-text" style={{ fontSize: '1.1rem', color: '#1d1d1f', fontWeight: 500, marginTop: '0.75rem', letterSpacing: '-0.01em', overflowWrap: 'break-word' }}>
                muted 
                playsInline 
                onLoadedMetadata={() => ScrollTrigger.refresh()}
                style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: '300px' }}
              />
            </div>
          </div>
        </section>

      </div>

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />

        <div className="overlay-content">

          {/* FASE 01 */}
          <div ref={phase1Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 800px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
              Do you see this black box?
            </h2>
            <p className="body-text" style={{ fontSize: '1.1rem', color: '#1d1d1f', fontWeight: 500, marginTop: '0.75rem', letterSpacing: '-0.01em', overflowWrap: 'break-word' }}>
              We don’t start by building AI. We start by understanding your business.
            </p>
          </div>

          {/* FASE 02 */}
          <div ref={phase2Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 750px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
          </div>

          {/* FASE 03 */}
          <div ref={phase3Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 900px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
              It’s time to evolve your business.
            </h2>
          </div>

        </div>
      </div>

      <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '8rem 1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          
          {/* LEFT / SPHERE PLACEHOLDER */}
          <div style={{ flex: '1 1 400px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa', minHeight: '400px', padding: '2rem' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/ball.gif" 
                alt="Servex Copilot Orb"
                style={{ 
                  width: '100%', 
                  maxWidth: '420px', 
                  height: 'auto', 
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }} 
              />
            </div>
            
            {/* Slider label (aesthetic) */}
            <div style={{ position: 'absolute', bottom: '2rem', left: '2.5rem', right: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#86868b', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <span>Data</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e5ea' }} />
              <span>Models</span>
            </div>
          </div>

          {/* RIGHT / CONTENT */}
          <div style={{ flex: '1 1 400px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Header */}
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#86868b', fontWeight: 600 }}>
                  AI CORE
                </span>
                <h2 style={{ marginTop: '0.5rem', fontSize: '2.5rem', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  Servex Copilot
                </h2>
                <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#515154', lineHeight: 1.6, maxWidth: '420px', fontWeight: 400 }}>
                  Servex Copilot is the unified artificial intelligence that acts as the brain of the SERVEX ecosystem, coordinating data, processes, and automation from a single core.
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                <div>
                  <p style={{ color: '#86868b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Data Sync</p>
                  <p style={{ marginTop: '0.35rem', fontWeight: 600, color: '#1d1d1f', fontSize: '0.9rem' }}>Real-time</p>
                </div>
                <div>
                  <p style={{ color: '#86868b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Scope</p>
                  <p style={{ marginTop: '0.35rem', fontWeight: 600, color: '#1d1d1f', fontSize: '0.9rem' }}>End-to-End Ops</p>
                </div>
                <div>
                  <p style={{ color: '#86868b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Learning</p>
                  <p style={{ marginTop: '0.35rem', fontWeight: 600, color: '#1d1d1f', fontSize: '0.9rem' }}>Continuous</p>
                </div>
                <div>
                  <p style={{ color: '#86868b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Architecture</p>
                  <p style={{ marginTop: '0.35rem', fontWeight: 600, color: '#1d1d1f', fontSize: '0.9rem' }}>Centralized AI</p>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid #f5f5f7' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Status</p>
                  <p style={{ fontWeight: 600, color: '#1d1d1f', marginTop: '0.35rem', fontSize: '0.9rem' }}>Building</p>
                </div>
                <button style={{ padding: '0.75rem 1.75rem', borderRadius: '9999px', backgroundColor: '#1d1d1f', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', letterSpacing: '-0.01em' }}>
                  Access SVX
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


