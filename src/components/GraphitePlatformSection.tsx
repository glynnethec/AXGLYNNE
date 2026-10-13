'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function GraphitePlatformSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Fine-grained diamond lattice step
    const step = 17;

    const drawDiamond = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      strokeColor: string,
      fillColor?: string
    ) => {
      if (radius <= 0.2) return;
      context.beginPath();
      context.moveTo(cx, cy - radius);
      context.lineTo(cx + radius, cy);
      context.lineTo(cx, cy + radius);
      context.lineTo(cx - radius, cy);
      context.closePath();
      if (fillColor) {
        context.fillStyle = fillColor;
        context.fill();
      }
      if (strokeColor) {
        context.strokeStyle = strokeColor;
        context.lineWidth = 0.9;
        context.stroke();
      }
    };

    const render = () => {
      time += 0.008;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / step) + 4;
      const rows = Math.ceil(height / (step * 0.5)) + 4;

      // 2D Matrix of vertex data for autonomous organic wave animation
      const matrix: { x: number; y: number; val: number }[][] = [];

      for (let r = -2; r <= rows; r++) {
        matrix[r] = [];
        const isStagger = Math.abs(r) % 2 === 1;
        const y = r * (step * 0.5);

        for (let c = -2; c <= cols; c++) {
          const x = c * step + (isStagger ? step * 0.5 : 0);

          // Topographic wave harmonics running smoothly and autonomously
          const nx = x * 0.0028;
          const ny = y * 0.0032;

          const w1 = Math.sin(nx * 1.5 + ny * 1.3 + time * 0.45);
          const w2 = Math.cos(nx * 2.2 - ny * 1.8 - time * 0.35);
          const w3 = Math.sin(Math.hypot(x - width * 0.28, y - height * 0.38) * 0.0068 - time * 0.38);
          const w4 = Math.cos(Math.hypot(x - width * 0.72, y - height * 0.62) * 0.0058 + time * 0.32);

          const elevation = (w1 + w2 + w3 + w4) / 4;

          // Topographic contour harmonic (creates repeating nested rings & bands)
          const contour = Math.sin(elevation * Math.PI * 3.6);

          matrix[r][c] = { x, y, val: contour };
        }
      }

      // Pass 1: Draw 45-degree diagonal mesh grid lines
      for (let r = -1; r < rows; r++) {
        const isStagger = Math.abs(r) % 2 === 1;
        for (let c = -1; c < cols; c++) {
          const p = matrix[r]?.[c];
          if (!p) continue;

          const nextR = r + 1;
          const n1 = matrix[nextR]?.[isStagger ? c : c - 1];
          const n2 = matrix[nextR]?.[isStagger ? c + 1 : c];

          if (n1) {
            const avg = (p.val + n1.val) / 2;
            if (avg > -0.25) {
              const alpha = Math.min(Math.max((avg + 0.25) / 1.15, 0), 0.7);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(n1.x, n1.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
              ctx.lineWidth = alpha > 0.4 ? 0.85 : 0.55;
              ctx.stroke();
            }
          }

          if (n2) {
            const avg = (p.val + n2.val) / 2;
            if (avg > -0.25) {
              const alpha = Math.min(Math.max((avg + 0.25) / 1.15, 0), 0.7);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
              ctx.lineWidth = alpha > 0.4 ? 0.85 : 0.55;
              ctx.stroke();
            }
          }
        }
      }

      // Pass 2: Draw diamonds & concentric rings at vertices
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const p = matrix[r]?.[c];
          if (!p) continue;
          const val = p.val;

          if (val > 0.55) {
            // Bright crest: Concentric nested diamonds
            const intensity = Math.min((val - 0.55) / 0.45, 1);
            // Outer diamond ring
            drawDiamond(
              ctx,
              p.x,
              p.y,
              5.6,
              `rgba(255, 255, 255, ${0.75 + intensity * 0.25})`
            );
            // Inner diamond ring
            drawDiamond(
              ctx,
              p.x,
              p.y,
              2.5,
              `rgba(255, 255, 255, ${0.85 + intensity * 0.15})`,
              intensity > 0.75 ? `rgba(255, 255, 255, ${0.35 + intensity * 0.4})` : undefined
            );
          } else if (val > 0.15) {
            // Mid-tone contour: Single hollow diamond
            const intensity = (val - 0.15) / 0.4;
            drawDiamond(
              ctx,
              p.x,
              p.y,
              4.2,
              `rgba(255, 255, 255, ${0.35 + intensity * 0.4})`
            );
          } else if (val > -0.2) {
            // Lower slope: Small hollow diamond
            const intensity = (val + 0.2) / 0.35;
            drawDiamond(
              ctx,
              p.x,
              p.y,
              2.6,
              `rgba(255, 255, 255, ${0.15 + intensity * 0.25})`
            );
          } else if (val > -0.55) {
            // Trough: Small diamond point
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="graphite-platform"
      ref={containerRef}
      style={{
        width: '100vw',
        maxWidth: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        boxSizing: 'border-box',
        minHeight: '680px',
        height: 'clamp(620px, 80vh, 800px)',
        backgroundColor: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
      }}
    >
      {/* 45-degree Generative Diamond Lattice Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Center Black Cutout Box */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            backgroundColor: '#000000',
            width: '100%',
            maxWidth: '1040px',
            padding: 'clamp(52px, 6.5vw, 84px) clamp(24px, 5vw, 72px)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '0px'
          }}
        >
          {/* Main Headline */}
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 32px 0',
              maxWidth: '980px',
              fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif"
            }}
          >
            Create Your API to Integrate Our LLMs into Your Projects
          </h2>

          {/* White Action Button */}
          <Link
            href="/models_provider"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              color: '#000000',
              textDecoration: 'none',
              borderRadius: '4px',
              padding: '12px 28px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 12px rgba(255, 255, 255, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f4f4f5';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 22px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(255, 255, 255, 0.15)';
            }}
          >
            Create AI API
          </Link>
        </div>
      </div>
    </section>
  );
}
