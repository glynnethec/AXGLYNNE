'use client';
import React, { useEffect, useRef } from 'react';

type HoverStep = {
  id: number;
  j: number;
  i: number;
  neighbors: { dj: number; di: number; opacity: number }[];
  createdAt: number;
};

export default function LiquidOrb({ 
  orbState = 'idle',
  theme = 'light',
  customRotX = 0,
  customRotY = 0,
  customRotZ = 20
}: { 
  orbState?: 'idle' | 'thinking',
  theme?: 'light' | 'dark',
  customRotX?: number,
  customRotY?: number,
  customRotZ?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const historyRef = useRef<HoverStep[]>([]);
  const stepIdRef = useRef(0);
  
  // Ref for rotation to avoid restarting canvas loop
  const rotRef = useRef({ x: customRotX, y: customRotY, z: customRotZ });
  useEffect(() => {
    rotRef.current = { x: customRotX, y: customRotY, z: customRotZ };
  }, [customRotX, customRotY, customRotZ]);
  
  // Audio reactivity removed to avoid mic permissions

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrame = 0;
    let time = 0;
    let smoothedVolume = 0;
    const mountTime = Date.now();

    // Variables for smooth rotation interpolation
    let currentRotX = rotRef.current.x;
    let currentRotY = rotRef.current.y;
    let currentRotZ = rotRef.current.z;

    const numLatLines = 8;
    const numLonLines = 16;
    const resolution = 250;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = width * 0.40; 
      const radius = baseRadius; // Static size, no breathing animation

      ctx.clearRect(0, 0, width, height);

      const isThinking = orbState === 'thinking';
      const gridOpacity = isThinking ? 0.25 : 0.12;

      // Base sphere background
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = theme === 'dark' ? '#000000' : '#ffffff';
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
      ctx.stroke();

      // Smoothly interpolate towards the target rotation from the dashboard
      currentRotX += (rotRef.current.x - currentRotX) * 0.035;
      currentRotY += (rotRef.current.y - currentRotY) * 0.035;
      currentRotZ += (rotRef.current.z - currentRotZ) * 0.035;

      const rotationX = (currentRotX * Math.PI / 180);
      const rotationY = (currentRotY * Math.PI / 180) + ((Date.now() - mountTime) / 1000) * 0.2; // Interpolated target + Continuous spin
      const rotationZ = (currentRotZ * Math.PI / 180);

      const project = (x: number, y: number, z: number) => {
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        const cosZ = Math.cos(rotationZ);
        const sinZ = Math.sin(rotationZ);
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        const perspective = 4.0;
        const scale = perspective / (perspective + z2);

        return {
          x: cx + x3 * radius * scale,
          y: cy + y3 * radius * scale,
          z: z2,
          scale
        };
      };

      // --- Simulated Interaction Logic ---
      const now = Date.now();
      
      // Permanent random activity to animate cells without sound
      let rawVolume = 20 + Math.random() * 40;

      // Smooth the volume to prevent high-frequency flickering
      smoothedVolume = smoothedVolume * 0.85 + rawVolume * 0.15;

      // Threshold slightly higher to ignore ambient hum (static noise)
      const threshold = 10;
      
      if (smoothedVolume > threshold) {
        // Maxes out at a reasonable speaking volume
        const normalizedVol = Math.min(1, (smoothedVolume - threshold) / 50); // 0 to 1
        
        // Max spawn probability is 30% per frame (prevents visual clutter)
        if (Math.random() < (normalizedVol * 0.3)) {
          let randomJ = 0;
          let randomI = 0;
          let pz = -1;
          
          // Try a few times to find a cell facing the camera
          for(let tries = 0; tries < 5; tries++) {
             randomJ = Math.floor(Math.random() * numLatLines);
             randomI = Math.floor(Math.random() * numLonLines);
             const phi_c = ((randomJ + 0.5) * Math.PI) / numLatLines - Math.PI / 2;
             const theta_c = ((randomI + 0.5) * Math.PI * 2) / numLonLines;
             pz = Math.cos(phi_c) * Math.sin(theta_c);
             if (pz > -0.05) break;
          }

          if (pz > -0.05) {
            const numNeighbors = Math.floor(Math.random() * 3) + 1;
            const neighbors = [];
            const possibleOffsets = [
              [-1, 0], [1, 0], [0, -1], [0, 1],
              [-1, -1], [1, -1], [-1, 1], [1, 1]
            ].sort(() => 0.5 - Math.random());

            for (let k = 0; k < numNeighbors; k++) {
              neighbors.push({
                dj: possibleOffsets[k][0],
                di: possibleOffsets[k][1],
                // Opacity scales more dramatically with volume
                opacity: (Math.random() * 0.03) + 0.02 + (normalizedVol * 0.04)
              });
            }

            historyRef.current.unshift({
              id: stepIdRef.current++,
              j: randomJ,
              i: randomI,
              neighbors,
              createdAt: now
            });
          }
        }
        
        // Cap the number of active sound cells to prevent clutter
        if (historyRef.current.length > 30) {
           historyRef.current = historyRef.current.slice(0, 30);
        }
      }

      // Cleanup old steps (fade out duration: 600ms)
      historyRef.current = historyRef.current.filter(step => now - step.createdAt < 600);

      // Helper to draw a filled 3D cell
      const drawFilledCell = (j: number, i: number, opacity: number) => {
        const safeI = (i + numLonLines) % numLonLines;
        if (j < 0 || j >= numLatLines) return;

        const phi_start = (j * Math.PI) / numLatLines - Math.PI / 2;
        const phi_end = ((j + 1) * Math.PI) / numLatLines - Math.PI / 2;
        const theta_start = (safeI * Math.PI * 2) / numLonLines;
        const theta_end = ((safeI + 1) * Math.PI * 2) / numLonLines;
        
        const cellRes = 8; 
        
        ctx.beginPath();
        let first = true;
        
        // Top edge
        for (let k = 0; k <= cellRes; k++) {
          const th = theta_start + (theta_end - theta_start) * (k / cellRes);
          const p2d = project(Math.cos(phi_start) * Math.cos(th), Math.sin(phi_start), Math.cos(phi_start) * Math.sin(th));
          if (p2d.z < -0.15) return; 
          if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } else { ctx.lineTo(p2d.x, p2d.y); }
        }
        
        // Right edge
        for (let k = 0; k <= cellRes; k++) {
          const ph = phi_start + (phi_end - phi_start) * (k / cellRes);
          const p2d = project(Math.cos(ph) * Math.cos(theta_end), Math.sin(ph), Math.cos(ph) * Math.sin(theta_end));
          ctx.lineTo(p2d.x, p2d.y);
        }
        
        // Bottom edge
        for (let k = 0; k <= cellRes; k++) {
          const th = theta_end - (theta_end - theta_start) * (k / cellRes);
          const p2d = project(Math.cos(phi_end) * Math.cos(th), Math.sin(phi_end), Math.cos(phi_end) * Math.sin(th));
          ctx.lineTo(p2d.x, p2d.y);
        }
        
        // Left edge
        for (let k = 0; k <= cellRes; k++) {
          const ph = phi_end - (phi_end - phi_start) * (k / cellRes);
          const p2d = project(Math.cos(ph) * Math.cos(theta_start), Math.sin(ph), Math.cos(ph) * Math.sin(theta_start));
          ctx.lineTo(p2d.x, p2d.y);
        }
        
        ctx.closePath();
        ctx.fillStyle = theme === 'dark' ? `rgba(255, 255, 255, ${opacity * 1.5})` : `rgba(0, 0, 0, ${opacity * 1.5})`;
        ctx.fill();
      };

      // Draw active sound-reactive cells
      for (const step of historyRef.current) {
        const age = now - step.createdAt;
        const fade = 1 - (age / 600);
        
        drawFilledCell(step.j, step.i, 0.12 * fade);
        for (const n of step.neighbors) {
          drawFilledCell(step.j + n.dj, step.i + n.di, n.opacity * fade);
        }
      }

      // --- Draw Grid Lines ---
      ctx.strokeStyle = theme === 'dark' ? `rgba(255, 255, 255, ${gridOpacity})` : `rgba(0, 0, 0, ${gridOpacity})`;
      ctx.lineWidth = 1;  

      for (let i = 0; i < numLonLines; i++) {
        const theta = (i * Math.PI * 2) / numLonLines;
        
        ctx.beginPath();
        let first = true;
        for (let j = 0; j <= resolution; j++) {
          const phi = (j * Math.PI) / resolution - Math.PI / 2;
          const px = Math.cos(phi) * Math.cos(theta);
          const py = Math.sin(phi);
          const pz = Math.cos(phi) * Math.sin(theta);
          const p2d = project(px, py, pz);
          
          if (p2d.z > -0.15) {
             if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } 
             else { ctx.lineTo(p2d.x, p2d.y); }
          } else { first = true; }
        }
        ctx.stroke();
      }

      for (let j = 1; j < numLatLines; j++) {
        const phi = (j * Math.PI) / numLatLines - Math.PI / 2;
        
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= resolution; i++) {
          const theta = (i * Math.PI * 2) / resolution;
          const px = Math.cos(phi) * Math.cos(theta);
          const py = Math.sin(phi);
          const pz = Math.cos(phi) * Math.sin(theta);
          const p2d = project(px, py, pz);
          
          if (p2d.z > -0.15) {
             if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } 
             else { ctx.lineTo(p2d.x, p2d.y); }
          } else { first = true; }
        }
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, [orbState, theme]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block',
            outline: 'none'
          }} 
        />
      </div>
    </div>
  );
}
