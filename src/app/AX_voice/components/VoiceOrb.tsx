'use client';
import React, { useEffect, useRef } from 'react';

type HoverStep = {
  id: number;
  j: number;
  i: number;
  mainOpacity: number;
  neighbors: { dj: number; di: number; opacity: number }[];
  createdAt: number;
};

interface VoiceOrbProps {
  orbState?: 'idle' | 'listening' | 'thinking' | 'speaking';
  theme?: 'light' | 'dark';
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export default function VoiceOrb({ orbState = 'idle', theme = 'dark', audioRef }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<HoverStep[]>([]);
  const stepIdRef = useRef(0);
  
  const orbStateRef = useRef(orbState);
  const speakingStartRef = useRef<number>(0);
  const themeRef = useRef(theme);

  // Mantener actualizados los refs sin reiniciar el render loop
  useEffect(() => {
    if (orbState === 'speaking' && orbStateRef.current !== 'speaking') {
      speakingStartRef.current = Date.now();
    }
    orbStateRef.current = orbState;
  }, [orbState]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrame = 0;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let audioConnected = false;
    let smoothedVolume = 0;
    const mountTime = Date.now();

    // Intentar conectar Web Audio API al audio de la IA (solo para salida de la IA)
    const tryConnectAudio = () => {
      if (audioConnected || !audioRef?.current) return;
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        audioContext = new AudioCtx();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.3; // Muy reactivo a transitorios de voz
        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audioConnected = true;
      } catch (err) {
        // Fallback natural con síntesis acústica de voz
      }
    };

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
      
      const currentOrbState = orbStateRef.current;
      const isSpeaking = currentOrbState === 'speaking';
      const isThinking = currentOrbState === 'thinking';
      const currentTheme = themeRef.current;
      const gridOpacity = isThinking ? 0.35 : 0.15;

      const now = Date.now();
      const time = (now - mountTime) / 1000;

      // Calcular volumen SOLO cuando la IA está hablando
      let rawVolume = 0;
      if (isSpeaking) {
        if (!audioConnected && audioRef?.current) {
          tryConnectAudio();
        }

        let realVol = 0;
        if (analyser) {
          try {
            if (audioContext && audioContext.state === 'suspended') {
              audioContext.resume();
            }
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            let count = 0;
            // Rango de frecuencias del habla
            for (let i = 1; i < Math.min(dataArray.length, 40); i++) {
              sum += dataArray[i];
              count++;
            }
            realVol = count > 0 ? (sum / count) : 0;
          } catch (e) {}
        }

        if (realVol > 8) {
          // Volumen real amplificado para máxima sensibilidad y energía
          rawVolume = Math.min(100, realVol * 2.3);
        } else {
          // Modulación acústica humana de alta sensibilidad (sílabas a 4-6Hz + acentos dinámicos)
          const t = (now - (speakingStartRef.current || now)) / 1000;
          const syllables = Math.abs(Math.sin(t * 12.5) * 0.6 + Math.cos(t * 7.2) * 0.4);
          const intonation = 0.5 + 0.5 * Math.sin(t * 2.8);
          const burst = Math.random() > 0.65 ? (Math.random() * 35) : 0;
          const speechCurve = (syllables * intonation);
          rawVolume = 30 + (speechCurve * 55) + burst;
        }
      } else if (isThinking) {
        // En thinking: suave respiración sinusoidal sin cuadros
        rawVolume = 8 + Math.sin(time * 3) * 6;
      } else {
        // En listening o idle: 0 absoluto para que no reaccione al usuario ni ruido
        rawVolume = 0;
      }

      // Suavizado rápido para que responda instantáneamente a los fonemas
      smoothedVolume = smoothedVolume * 0.72 + rawVolume * 0.28;
      
      const baseRadius = width * 0.28; 
      const radius = baseRadius;

      ctx.clearRect(0, 0, width, height);

      // Rotación idéntica a LiquidOrb en el Panel
      // X: -20° tilt, Y: giro continuo (0.2 rad/s) + 35° base, Z: PI/2 para vértices horizontales
      const rotationX = -20 * (Math.PI / 180);
      const rotationY = (35 * (Math.PI / 180)) + time * 0.2;
      const rotationZ = Math.PI / 2;

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

      // ANIMACIÓN MINIMALISTA, ELEGANTE Y SUBTIL DE CUADROS — CUANDO LA IA HABLA
      const threshold = 10;
      if (isSpeaking && smoothedVolume > threshold) {
        const normalizedVol = Math.min(1, (smoothedVolume - threshold) / 50); 
        
        // Ritmo suave y refinado de aparición (sin saturación acelerada)
        const spawnChance = 0.10 + (normalizedVol * 0.15);
        if (Math.random() < spawnChance) {
          // Seleccionar celdas aleatorias verdaderamente distribuidas sobre toda la esfera
          const randomJ = Math.floor(Math.random() * (numLatLines - 2)) + 1;
          const randomI = Math.floor(Math.random() * numLonLines);
          
          // Verificar la coordenada Z proyectada REAL en 3D (orientada al frente de la cámara)
          const phi_c = ((randomJ + 0.5) * Math.PI) / numLatLines - Math.PI / 2;
          const theta_c = ((randomI + 0.5) * Math.PI * 2) / numLonLines;
          const p2d = project(Math.cos(phi_c) * Math.cos(theta_c), Math.sin(phi_c), Math.cos(phi_c) * Math.sin(theta_c));

          if (p2d.z > -0.15) {
            // 0 o 1 vecino sutil para un aspecto limpio y geométrico
            const numNeighbors = Math.random() > 0.7 ? 1 : 0;
            const neighbors = [];
            if (numNeighbors > 0) {
              const possibleOffsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];
              const chosen = possibleOffsets[Math.floor(Math.random() * possibleOffsets.length)];
              neighbors.push({
                dj: chosen[0],
                di: chosen[1],
                opacity: 0.12 + (normalizedVol * 0.10)
              });
            }

            historyRef.current.unshift({
              id: stepIdRef.current++,
              j: randomJ,
              i: randomI,
              mainOpacity: 0.18 + (normalizedVol * 0.18),
              neighbors,
              createdAt: now
            });
          }
        }
        
        if (historyRef.current.length > 24) {
          historyRef.current = historyRef.current.slice(0, 24);
        }
      }

      // Desvanecimiento orgánico (850ms)
      if (!isSpeaking) {
        historyRef.current = historyRef.current.filter(step => now - step.createdAt < 250);
      } else {
        historyRef.current = historyRef.current.filter(step => now - step.createdAt < 850);
      }

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
        // Opacidad suave y sutil sobre la cuadrícula
        ctx.fillStyle = currentTheme === 'light' 
          ? `rgba(15, 23, 42, ${Math.min(0.45, opacity * 1.2)})` 
          : `rgba(240, 240, 255, ${Math.min(0.45, opacity * 1.1)})`;
        ctx.fill();
      };

      for (const step of historyRef.current) {
        const age = now - step.createdAt;
        const duration = isSpeaking ? 850 : 250;
        const progress = age / duration;
        if (progress >= 1) continue;
        
        // Transición suave sinusoidal (Fade In -> Fade Out armónico)
        const fade = Math.sin(progress * Math.PI);
        
        drawFilledCell(step.j, step.i, step.mainOpacity * fade);
        for (const n of step.neighbors) {
          drawFilledCell(step.j + n.dj, step.i + n.di, n.opacity * fade);
        }
      }

      ctx.strokeStyle = currentTheme === 'light' ? `rgba(0, 0, 0, 0.85)` : `rgba(255, 255, 255, ${gridOpacity})`;
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
          
          if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } 
          else { ctx.lineTo(p2d.x, p2d.y); }
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
          
          if (first) { ctx.moveTo(p2d.x, p2d.y); first = false; } 
          else { ctx.lineTo(p2d.x, p2d.y); }
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
  }, []); // Run continuously without interrupting on state updates

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
