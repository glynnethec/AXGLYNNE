'use client';
import React, { useEffect, useRef } from 'react';

type HoverStep = {
  id: number;
  j: number;
  i: number;
  neighbors: { dj: number; di: number; opacity: number }[];
  createdAt: number;
};

export default function VoiceOrb({ orbState = 'idle' }: { orbState?: 'idle' | 'thinking' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<HoverStep[]>([]);
  const stepIdRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrame = 0;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let smoothedVolume = 0;
    const mountTime = Date.now();

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      } catch (err) {
        console.error('Audio initialization failed:', err);
      }
    };

    initAudio();

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
      
      const isThinking = orbState === 'thinking';
      const gridOpacity = isThinking ? 0.35 : 0.15;

      const now = Date.now();
      const time = (now - mountTime) / 1000;

      let rawVolume = 0;
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        rawVolume = sum / dataArray.length;
      } else if (isThinking) {
        rawVolume = 20 + Math.random() * 80; 
      } else {
        if (Math.random() > 0.95) {
          rawVolume = 15 + Math.random() * 20;
        }
      }

      smoothedVolume = smoothedVolume * 0.85 + rawVolume * 0.15;
      
      const baseRadius = width * 0.28; 
      const radius = baseRadius + (smoothedVolume * 0.3);

      ctx.clearRect(0, 0, width, height);

      const rotationX = 0.0;
      const rotationY = 0.0;
      const rotationZ = Math.PI / 2; // Horizontal vertices

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

      const threshold = 5;
      if (smoothedVolume > threshold) {
        const normalizedVol = Math.min(1, (smoothedVolume - threshold) / 50); 
        
        if (Math.random() < (normalizedVol * 0.4)) {
          let randomJ = 0;
          let randomI = 0;
          let pz = -1;
          
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
                opacity: (Math.random() * 0.15) + 0.05 + (normalizedVol * 0.2)
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
        
        if (historyRef.current.length > 40) {
           historyRef.current = historyRef.current.slice(0, 40);
        }
      }

      historyRef.current = historyRef.current.filter(step => now - step.createdAt < 800);

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
        
        for (let k = 0; k <= cellRes; k++) {
          const th = theta_start + (theta_end - theta_start) * (k / cellRes);
          const p2d = project(Math.cos(phi_start) * Math.cos(th), Math.sin(phi_start), Math.cos(phi_start) * Math.sin(th));
          if (p2d.z < -0.05) return; 
          if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } else { ctx.lineTo(p2d.x, p2d.y); }
        }
        for (let k = 0; k <= cellRes; k++) {
          const ph = phi_start + (phi_end - phi_start) * (k / cellRes);
          const p2d = project(Math.cos(ph) * Math.cos(theta_end), Math.sin(ph), Math.cos(ph) * Math.sin(theta_end));
          ctx.lineTo(p2d.x, p2d.y);
        }
        for (let k = 0; k <= cellRes; k++) {
          const th = theta_end - (theta_end - theta_start) * (k / cellRes);
          const p2d = project(Math.cos(phi_end) * Math.cos(th), Math.sin(phi_end), Math.cos(phi_end) * Math.sin(th));
          ctx.lineTo(p2d.x, p2d.y);
        }
        for (let k = 0; k <= cellRes; k++) {
          const ph = phi_end - (phi_end - phi_start) * (k / cellRes);
          const p2d = project(Math.cos(ph) * Math.cos(theta_start), Math.sin(ph), Math.cos(ph) * Math.sin(theta_start));
          ctx.lineTo(p2d.x, p2d.y);
        }
        
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      };

      for (const step of historyRef.current) {
        const age = now - step.createdAt;
        const fade = 1 - (age / 800);
        
        drawFilledCell(step.j, step.i, 0.4 * fade);
        for (const n of step.neighbors) {
          drawFilledCell(step.j + n.dj, step.i + n.di, n.opacity * fade);
        }
      }

      ctx.strokeStyle = `rgba(255, 255, 255, ${gridOpacity})`;
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
          
          if (p2d.z > -0.05) {
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
          
          if (p2d.z > -0.05) {
             if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } 
             else { ctx.lineTo(p2d.x, p2d.y); }
          } else { first = true; }
        }
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [orbState]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block',
            outline: 'none',
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.15))'
          }} 
        />
      </div>
    </div>
  );
}
