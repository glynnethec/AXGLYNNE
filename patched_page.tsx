'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for texts and overlays
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 240;
    const currentFrame = (index: number) =>
      `/GSAPimg/frame_${String(index + 1).padStart(4, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const seq = { frame: 0 };

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[seq.frame];
      if (!img || !img.complete) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const scale = Math.max(canvas.width / img.width, canvas.height / img.width);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Render first frame as soon as it loads
    images[0].onload = render;
    window.addEventListener('resize', render);

    // ScrollTrigger timeline for canvas and text
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=400%', // 4 viewports of scrolling
        scrub: 1, // Fluid 1-second interpolation for maximum smoothness
        pin: true,
      }
    });

    // 1. Canvas Animation (Linear frame scrubbing for maximum smoothness)
    tl.to(seq, { 
      frame: frameCount - 1, 
      snap: 'frame', 
      ease: 'none', 
      onUpdate: render, 
      duration: 100 
    }, 0);

    // 2. Set Initial Text States (Text 1 is visible from the start)
    gsap.set(text1Ref.current, { xPercent: -50, yPercent: -50, left: '50%', top: '50%', opacity: 1, y: 0 });
    gsap.set([text2Ref.current, text3Ref.current], { xPercent: -50, yPercent: -50, left: '50%', top: '50%', opacity: 0, y: 40 });

    // 3. Text Transitions (Crossfades synchronized perfectly with the scroll)
    
    // Transition 1 (Progress 0 to 50): Text 1 leaves, Text 2 enters
    tl.to(text1Ref.current, { opacity: 0, y: -40, duration: 25, ease: 'power1.inOut' }, 0)
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 25, ease: 'power1.inOut' }, 25);

    // Transition 2 (Progress 50 to 100): Text 2 leaves, Text 3 enters
    tl.to(text2Ref.current, { opacity: 0, y: -40, duration: 25, ease: 'power1.inOut' }, 50)
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 25, ease: 'power1.inOut' }, 75);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', render);
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />
        
        <div className="overlay-content">
          <div ref={text1Ref} className="text-block centered">
            <img src="/logos/GLYNNE.svg" alt="GLYNNE" className="hero-logo" />
            <p className="subtitle" style={{ marginTop: '1.5rem', maxWidth: '700px' }}>
              AI Infrastructure for Business
            </p>
          </div>
          
          <div ref={text2Ref} className="text-block centered">
            <h1 className="title">Innovación.</h1>
            <p className="subtitle">Diseñado con precisión hasta el último tornillo.</p>
          </div>
          
          <div ref={text3Ref} className="text-block centered">
            <h1 className="title">El Futuro.</h1>
            <p className="subtitle">Tu infraestructura lista para la próxima generación.</p>
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