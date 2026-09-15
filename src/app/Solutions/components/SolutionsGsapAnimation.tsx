'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function SolutionsGsapAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);

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
          end: '+=250%', // Extended for 4 phases
          scrub: 1, // Fluid 1-second interpolation for maximum smoothness
          pin: true,
        },
        onUpdate: render
      });

      // 1. Canvas Animation (Frame scrubbing)
      tl.to(seq, {
        frame: 190, 
        roundProps: 'frame',
        ease: 'none',
        duration: 200 // Extended duration for 4 phases
      }, 0);

      // Canvas Position Shifting & Scaling
      tl.to(seq, { xOffset: -25, scaleMultiplier: 1.0, duration: 200, ease: 'power1.inOut' }, 0); 

      // Initial States
      gsap.set([phase2Ref.current, phase3Ref.current, phase4Ref.current], {
        opacity: 0,
        y: 60,
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        filter: 'blur(20px)'
      });
      // Phase 1 is visible from the very start
      gsap.set(phase1Ref.current, {
        opacity: 1,
        y: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        filter: 'blur(0px)'
      });

      // Ultra-smooth crossfade transitions with blur
      // Fade out Phase 1
      tl.to(phase1Ref.current, { opacity: 0, y: -60, filter: 'blur(20px)', duration: 25, ease: 'power2.inOut' }, 15);
      // Fade in Phase 2
      tl.to(phase2Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 25, ease: 'power2.inOut' }, 25);

      // Fade out Phase 2
      tl.to(phase2Ref.current, { opacity: 0, y: -60, filter: 'blur(20px)', duration: 25, ease: 'power2.inOut' }, 65);
      // Fade in Phase 3
      tl.to(phase3Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 25, ease: 'power2.inOut' }, 75);

      // Fade out Phase 3
      tl.to(phase3Ref.current, { opacity: 0, y: -60, filter: 'blur(20px)', duration: 25, ease: 'power2.inOut' }, 115);
      // Fade in Phase 4
      tl.to(phase4Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 25, ease: 'power2.inOut' }, 125);
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
        <canvas ref={canvasRef} className="gsap-canvas" style={{ opacity: 0 }} />

        <div className="overlay-content">
          <div ref={phase1Ref} style={{
            width: '100%',
            maxWidth: 'clamp(320px, 90vw, 900px)',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            padding: '3rem 4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <h2 className="title" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111111', margin: 0, textAlign: 'center' }}>
              If the workflow is this dense for a single item...
            </h2>
          </div>

          <div ref={phase2Ref} style={{
            width: '100%',
            maxWidth: 'clamp(320px, 90vw, 900px)',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            padding: '3rem 4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <h2 className="title" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111111', margin: 0, textAlign: 'center' }}>
              What happens when the manufacturer demands updating hundreds of products simultaneously?
            </h2>
          </div>

          <div ref={phase3Ref} style={{
            width: '100%',
            maxWidth: 'clamp(320px, 90vw, 900px)',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            padding: '3rem 4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <h2 className="title" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111111', margin: 0, textAlign: 'center' }}>
              What if we don't know the client's changes?
            </h2>
          </div>

          <div ref={phase4Ref} style={{
            width: '100%',
            maxWidth: 'clamp(320px, 90vw, 900px)',
            pointerEvents: 'none',
            boxSizing: 'border-box',
            padding: '3rem 4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <h2 className="title" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111111', margin: 0, textAlign: 'center' }}>
              What if we don't know how to do anything?
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
