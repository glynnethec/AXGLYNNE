'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function GsapCanvasSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

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
    gsap.ticker.lagSmoothing(0); // Prevents lag-induced jumps with Lenis

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 240;
    const currentFrame = (index: number) =>
      `/GSAPimg/frames/frame_${String(index + 1).padStart(4, '0')}.png`;

    const images: HTMLImageElement[] = [];
    const seq = { frame: 0, xOffset: 25, scaleMultiplier: 1.15 }; // Start shifted right and slightly larger

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };

    const render = () => {
      const img = images[Math.round(seq.frame)];
      if (!img || !img.complete || !canvas) return;

      const isMobile = window.innerWidth <= 768;

      let scale;
      let y;

      if (isMobile) {
        // Guarantee the image fits within 90% of width AND 45% of height (top half)
        const maxMobileWidth = canvas.width * 0.9;
        const maxMobileHeight = canvas.height * 0.45;
        const mobileScale = Math.min(maxMobileWidth / img.width, maxMobileHeight / img.height);

        scale = mobileScale * seq.scaleMultiplier;

        // Place the image exactly in the center of the top half (25% of viewport height)
        y = (canvas.height * 0.25) - (img.height / 2) * scale;
      } else {
        const baseScale = Math.min(canvas.width / img.width, canvas.height / img.height);
        scale = baseScale * 0.55 * seq.scaleMultiplier;
        y = (canvas.height / 2) - (img.height / 2) * scale;
      }

      const x = (canvas.width / 2) - (img.width / 2) * scale + (isMobile ? 0 : (canvas.width * (seq.xOffset / 100)));

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Initialize canvas size
    handleResize();

    // Render first frame as soon as it loads
    images[0].onload = render;
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      // 2. Set Initial Spatial States
      // Canvas element remains perfectly centered to avoid edge clipping
      gsap.set(canvasRef.current, { xPercent: -50, yPercent: -50, x: 0 });

      // ScrollTrigger timeline for canvas and text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=100%', // Shortened to end exactly after phase 2
          scrub: 1, // Fluid 1-second interpolation for maximum smoothness
          pin: true,
        },
        onUpdate: render
      });

      // 1. Canvas Animation (Frame scrubbing)
      tl.to(seq, {
        frame: 190, // Cut off the final 50 frames where it might center natively
        roundProps: 'frame',
        ease: 'none',
        duration: 90
      }, 0);

      // Canvas Position Shifting & Scaling (Continuous, ultra-slow cinematic pan)
      tl.to(seq, { xOffset: -25, scaleMultiplier: 1.0, duration: 90, ease: 'power1.inOut' }, 0); // Pan left & scale down, but do NOT return to center


      // Initial States
      gsap.set([phase2Ref.current], {
        opacity: 0,
        y: 40,
        position: 'absolute',
        top: '50%',
        yPercent: -50
      });
      // Phase 1 is visible from the very start
      gsap.set(phase1Ref.current, {
        opacity: 1,
        y: 0,
        position: 'absolute',
        top: '50%',
        yPercent: -50
      });

      // Spatial placement (Responsive)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        gsap.set(phase1Ref.current, { left: '10%', right: 'auto', xPercent: 0, textAlign: 'left', top: '50%', yPercent: -50, bottom: 'auto', padding: '3rem 4rem' });
        gsap.set(phase2Ref.current, { right: '10%', left: 'auto', xPercent: 0, textAlign: 'right', top: '50%', yPercent: -50, bottom: 'auto', padding: '3rem 4rem' });
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set([phase1Ref.current, phase2Ref.current], {
          left: '50%',
          right: 'auto',
          xPercent: -50,
          textAlign: 'center',
          top: '75%', // Center of the bottom half
          bottom: 'auto',
          yPercent: -50,
          padding: '1.5rem 1.5rem'
        });
      });

      // Ultra-smooth back-to-back fades without dead spots
      // FASE 01 (Visible initially, fades out at 25)
      tl.to(phase1Ref.current, { opacity: 0, y: -40, duration: 10, ease: 'power2.in' }, 25);

      // FASE 02 (35 to end)
      tl.to(phase2Ref.current, { opacity: 1, y: 0, duration: 10, ease: 'power2.out' }, 35);
    });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert(); // Automatically kills all ScrollTriggers and reverts DOM changes (pins) to avoid React 'removeChild' errors
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />

        <div className="overlay-content">
          <div ref={phase1Ref} style={{
            width: '100%',
            maxWidth: 'clamp(320px, 90vw, 800px)',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            padding: '3rem 4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}>
            <h2 className="title" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111111', margin: '0 0 12px 0', overflowWrap: 'break-word' }}>
              Do you see this black box?
            </h2>
            <p className="body-text" style={{ fontSize: '13px', color: '#8f8f96', fontWeight: 300, marginTop: '0', letterSpacing: '0.02em', overflowWrap: 'break-word', lineHeight: 1.6 }}>
              We don’t start by building AI. We start by understanding your business.
            </p>
          </div>

          <div ref={phase2Ref} style={{
            width: '100%',
            maxWidth: 'clamp(320px, 90vw, 750px)',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            padding: '3rem 4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}>
            <h2 className="title" style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111111', margin: 0, overflowWrap: 'break-word' }}>
              We design the architecture that connects your AI to your business.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
