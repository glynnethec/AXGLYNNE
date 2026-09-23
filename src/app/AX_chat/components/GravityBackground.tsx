'use client';
import React, { useEffect, useRef } from 'react';

type HoverStep = {
  id: number;
  col: number;
  row: number;
  neighbors: { dc: number; dr: number; opacity: number }[];
  createdAt: number;
};

export default function GravityBackground({ children, theme = 'dark' }: { children: React.ReactNode, theme?: 'light' | 'dark' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const lastCellRef = useRef({ c: -1, r: -1 });
  const historyRef = useRef<HoverStep[]>([]);
  const stepIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // We don't need alpha since the background is solid white/black
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrame = 0;
    const cellSize = 96;
    const mountTime = Date.now();

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

      ctx.fillStyle = theme === 'light' ? '#f5f5f7' : '#0b0b0d';
      ctx.fillRect(0, 0, width, height);

      // --- Spacetime Warp Function ---
      // Calculates how much the coordinate (x,y) is pulled towards the center
      const warp = (x: number, y: number) => {
        const dx = cx - x;
        const dy = cy - y;
        const dist = Math.hypot(dx, dy);

        if (dist === 0) return { x, y };

        const maxPull = 120; // Maximum displacement in pixels
        const peakDist = 200; // The radius where the pull is strongest (just outside the 130px orb)

        // Poisson distribution curve for the pull force ensures it's smooth
        // 0 at the center, peaks at peakDist, then decays to 0 outwards.
        const pull = maxPull * (dist / peakDist) * Math.exp(1 - dist / peakDist);

        return {
          x: x + (dx / dist) * pull,
          y: y + (dy / dist) * pull
        };
      };

      // Grid dimensions (add margins so lines don't get pulled in from outside the screen)
      const cols = Math.ceil(width / cellSize) + 6;
      const rows = Math.ceil(height / cellSize) + 6;
      const startX = -3 * cellSize;
      const startY = -3 * cellSize;

      const getWarpedPoint = (c: number, r: number) => {
        return warp(startX + c * cellSize, startY + r * cellSize);
      };

      // --- Interactive Hover Logic ---
      const now = Date.now();

      if (mouseRef.current.active) {
        let minDist = Infinity;
        let closestC = -1;
        let closestR = -1;

        // Find the cell whose WARPED center is closest to the mouse
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const center = warp(startX + (c + 0.5) * cellSize, startY + (r + 0.5) * cellSize);
            const dist = Math.hypot(center.x - mouseRef.current.x, center.y - mouseRef.current.y);

            if (dist < minDist) {
              minDist = dist;
              closestC = c;
              closestR = r;
            }
          }
        }

        if (closestC !== -1 && (closestC !== lastCellRef.current.c || closestR !== lastCellRef.current.r)) {
          lastCellRef.current = { c: closestC, r: closestR };

          const numNeighbors = Math.floor(Math.random() * 4) + 1;
          const neighbors = [];
          const possibleOffsets = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
          ].sort(() => 0.5 - Math.random());

          for (let k = 0; k < numNeighbors; k++) {
            neighbors.push({
              dc: possibleOffsets[k][0],
              dr: possibleOffsets[k][1],
              opacity: (Math.random() * 0.01) + 0.005 // Extra light neighbors
            });
          }

          historyRef.current.unshift({
            id: stepIdRef.current++,
            col: closestC,
            row: closestR,
            neighbors,
            createdAt: now
          });
          if (historyRef.current.length > 20) historyRef.current.pop();
        }
      }

      historyRef.current = historyRef.current.filter(step => now - step.createdAt < 600);

      // Draw a filled warped grid cell for the hover effect
      const drawCell = (c: number, r: number, opacity: number) => {
        if (c < 0 || c >= cols || r < 0 || r >= rows) return;

        // Because spacetime is curved, the edges of the cell are curves!
        // We segment each edge to draw the curve smoothly.
        const res = 4;
        ctx.beginPath();

        // Top edge
        for (let i = 0; i <= res; i++) {
          const p = warp(startX + (c + i / res) * cellSize, startY + r * cellSize);
          if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        // Right edge
        for (let i = 0; i <= res; i++) {
          const p = warp(startX + (c + 1) * cellSize, startY + (r + i / res) * cellSize);
          ctx.lineTo(p.x, p.y);
        }
        // Bottom edge
        for (let i = 0; i <= res; i++) {
          const p = warp(startX + (c + 1 - i / res) * cellSize, startY + (r + 1) * cellSize);
          ctx.lineTo(p.x, p.y);
        }
        // Left edge
        for (let i = 0; i <= res; i++) {
          const p = warp(startX + c * cellSize, startY + (r + 1 - i / res) * cellSize);
          ctx.lineTo(p.x, p.y);
        }

        ctx.closePath();
        ctx.fillStyle = theme === 'light' ? `rgba(0,0,0,${opacity * 4})` : `rgba(255,255,255,${opacity})`;
        ctx.fill();
      };

      for (const step of historyRef.current) {
        const age = now - step.createdAt;
        const fade = 1 - (age / 600);
        drawCell(step.col, step.row, 0.025 * fade); // Extra light center cell
        for (const n of step.neighbors) {
          drawCell(step.col + n.dc, step.row + n.dr, n.opacity * fade);
        }
      }

      // --- Branching Out Animation Logic ---
      const elapsed = Date.now() - mountTime;
      // Start growing after 0.5s delay, grow for 2.5s
      const branchingProgress = Math.max(0, Math.min(1, (elapsed - 500) / 2500));
      const easeOutQuart = 1 - Math.pow(1 - branchingProgress, 4);
      const maxGrowDist = Math.hypot(width, height) * easeOutQuart;

      // --- Draw Warped Grid Lines ---
      ctx.strokeStyle = theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.04)'; // Grid lines
      ctx.lineWidth = 1;

      // Vertical lines
      for (let c = 0; c <= cols; c++) {
        // Organic random offset so lines grow at slightly different speeds
        const distLimit = maxGrowDist + Math.sin(c * 12.34) * 150;
        ctx.beginPath();
        let first = true;
        for (let r = 0; r <= rows * 4; r++) { // High resolution for smooth gravity curves
          const y = startY + (r / 4) * cellSize;
          const p = warp(startX + c * cellSize, y);
          const distToCenter = Math.hypot(p.x - cx, p.y - cy);

          if (distToCenter <= distLimit) {
            if (first) { ctx.moveTo(p.x, p.y); first = false; }
            else { ctx.lineTo(p.x, p.y); }
          } else {
            first = true; // Break path to look like growing branches
          }
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let r = 0; r <= rows; r++) {
        const distLimit = maxGrowDist + Math.sin(r * 43.21) * 150;
        ctx.beginPath();
        let first = true;
        for (let c = 0; c <= cols * 4; c++) {
          const x = startX + (c / 4) * cellSize;
          const p = warp(x, startY + r * cellSize);
          const distToCenter = Math.hypot(p.x - cx, p.y - cy);

          if (distToCenter <= distLimit) {
            if (first) { ctx.moveTo(p.x, p.y); first = false; }
            else { ctx.lineTo(p.x, p.y); }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // --- Fade out grid near the center sphere ---
      // 2.5 cells is about 240px. We want it fully hidden near the sphere (130px) and fading out.
      const clearRadius = 130 + (2.5 * cellSize);
      const gradient = ctx.createRadialGradient(cx, cy, 130, cx, cy, clearRadius);
      const bgColor = theme === 'light' ? '245, 245, 247' : '11, 11, 13';
      gradient.addColorStop(0, `rgba(${bgColor}, 1)`);
      gradient.addColorStop(0.3, `rgba(${bgColor}, 1)`);
      gradient.addColorStop(1, `rgba(${bgColor}, 0)`);

      ctx.fillStyle = gradient;
      // Use destination-out or just normal blending since background is white
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    lastCellRef.current = { c: -1, r: -1 };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: theme === 'light' ? '#f5f5f7' : '#0b0b0d', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      {children}
    </div>
  );
}
