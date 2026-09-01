import React, { useEffect, useRef } from 'react';
import { DisturbancePulse } from '../types';

interface SensingFieldCanvasProps {
  onTelemetryUpdate?: (data: {
    x: number;
    y: number;
    speed: number;
    strain: number;
    frequency: number;
    isMoving: boolean;
  }) => void;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  energy: number;
}

export const SensingFieldCanvas: React.FC<SensingFieldCanvasProps> = ({ onTelemetryUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    prevX: -1000,
    prevY: -1000,
    speed: 0,
    isMoving: false,
    lastMoveTime: 0,
  });
  const pulsesRef = useRef<DisturbancePulse[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle grid generation
    const initParticles = () => {
      const particles: Particle[] = [];
      const spacing = window.innerWidth < 768 ? 44 : 36;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // slight subtle organic jitter
          const ox = i * spacing + (Math.sin(i * 0.5 + j * 0.8) * 4);
          const oy = j * spacing + (Math.cos(i * 0.7 + j * 0.4) * 4);
          particles.push({
            x: ox,
            y: oy,
            originX: ox,
            originY: oy,
            vx: 0,
            vy: 0,
            size: Math.random() < 0.08 ? 1.4 : 0.8,
            baseAlpha: Math.random() * 0.14 + 0.04,
            alpha: 0.06,
            pulsePhase: Math.random() * Math.PI * 2,
            energy: 0,
          });
        }
      }
      particlesRef.current = particles;
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse & Touch listeners
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - (mouseRef.current.lastMoveTime || now));
      const dx = e.clientX - mouseRef.current.prevX;
      const dy = e.clientY - mouseRef.current.prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const instantSpeed = (dist / dt) * 100; // pixels per decisecond

      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
      mouseRef.current.speed = mouseRef.current.speed * 0.7 + instantSpeed * 0.3;
      mouseRef.current.isMoving = true;
      mouseRef.current.lastMoveTime = now;

      // Spawn micro ripple if fast enough
      if (instantSpeed > 45 && Math.random() < 0.22) {
        pulsesRef.current.push({
          id: Math.random().toString(36),
          x: e.clientX,
          y: e.clientY,
          radius: 2,
          maxRadius: Math.min(180, 50 + instantSpeed * 0.8),
          opacity: 0.28,
          speed: 2.2,
          type: 'cursor',
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent);
      }
    };

    const handleClick = (e: MouseEvent) => {
      pulsesRef.current.push({
        id: Math.random().toString(36),
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 260,
        opacity: 0.65,
        speed: 4.5,
        type: 'disturb',
      });
    };

    // Custom event listener for external triggers
    const handleCustomPulse = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const px = detail.x !== undefined ? detail.x : width / 2;
      const py = detail.y !== undefined ? detail.y : height / 2;
      const count = detail.count || 1;
      const type = detail.type || 'disturb';

      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const jitterX = count > 1 ? (Math.random() - 0.5) * (detail.spread || 200) : 0;
          const jitterY = count > 1 ? (Math.random() - 0.5) * (detail.spread || 200) : 0;
          pulsesRef.current.push({
            id: Math.random().toString(36),
            x: px + jitterX,
            y: py + jitterY,
            radius: 2,
            maxRadius: detail.maxRadius || 340,
            opacity: detail.opacity || 0.6,
            speed: detail.speed || 3.8,
            type,
          });
        }, i * (detail.stagger || 120));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('shomer:pulse', handleCustomPulse as EventListener);

    // Animation Loop
    let lastTelemetryEmit = 0;
    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.18;
      m.y += (m.targetY - m.y) * 0.18;

      if (performance.now() - m.lastMoveTime > 280) {
        m.isMoving = false;
        m.speed *= 0.9;
      }

      // Telemetry update emit throttle
      const now = performance.now();
      if (now - lastTelemetryEmit > 120 && onTelemetryUpdate) {
        lastTelemetryEmit = now;
        const strain = Number((0.012 + (m.speed * 0.0008)).toFixed(4));
        const freq = Number((12.4 + (m.speed * 0.08) + Math.sin(time) * 0.4).toFixed(1));
        onTelemetryUpdate({
          x: Math.round(m.x > 0 ? m.x : width / 2),
          y: Math.round(m.y > 0 ? m.y : height / 2),
          speed: Math.round(m.speed),
          strain,
          frequency: freq,
          isMoving: m.isMoving,
        });
      }

      // Render pulses & waves
      const activePulses = pulsesRef.current;
      for (let i = activePulses.length - 1; i >= 0; i--) {
        const pulse = activePulses[i];
        pulse.radius += pulse.speed || 2.5;
        const progress = pulse.radius / pulse.maxRadius;
        pulse.opacity = Math.max(0, (1 - progress) * (pulse.type === 'escalate' ? 0.7 : 0.45));

        if (progress >= 1 || pulse.opacity <= 0.005) {
          activePulses.splice(i, 1);
          continue;
        }

        // Concentric ripples
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${pulse.opacity * 0.6})`;
        ctx.lineWidth = pulse.type === 'escalate' ? 1.5 : 1;
        ctx.stroke();

        // Secondary subtle inner ring
        if (pulse.radius > 20) {
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(125, 211, 252, ${pulse.opacity * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Render Particles & Dynamic Fiber Lines
      const particles = particlesRef.current;
      const pLen = particles.length;
      const mouseRadius = 140;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Interaction with mouse
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && m.x > 0) {
          const force = (1 - dist / mouseRadius) * (0.8 + m.speed * 0.02);
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 1.2;
          p.vy -= Math.sin(angle) * force * 1.2;
          p.energy = Math.min(1, p.energy + force * 0.4);
        }

        // Interaction with active disturbance pulses
        for (let j = 0; j < activePulses.length; j++) {
          const pulse = activePulses[j];
          const pdx = p.x - pulse.x;
          const pdy = p.y - pulse.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          const ringDist = Math.abs(pDist - pulse.radius);

          if (ringDist < 25) {
            const waveForce = (1 - ringDist / 25) * pulse.opacity * 1.8;
            p.energy = Math.min(1, p.energy + waveForce);
            const wAngle = Math.atan2(pdy, pdx);
            p.vx += Math.cos(wAngle) * waveForce * 0.5;
            p.vy += Math.sin(wAngle) * waveForce * 0.5;
          }
        }

        // Physics damping & spring back to origin
        p.vx += (p.originX - p.x) * 0.04;
        p.vy += (p.originY - p.y) * 0.04;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        // Energy decay
        p.energy *= 0.94;

        // Subtle ambient organic breathing
        const waveOffset = Math.sin(time * 1.2 + p.pulsePhase) * 0.02;
        const currentAlpha = Math.min(1, p.baseAlpha + waveOffset + p.energy * 0.7);

        // Draw particle node
        ctx.beginPath();
        const r = p.size + p.energy * 1.2;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        if (p.energy > 0.3) {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(186, 230, 253, ${currentAlpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Connect nearby energized particles with faint optical fiber lines
        if (p.energy > 0.15 && i % 2 === 0) {
          for (let k = i + 1; k < Math.min(i + 8, pLen); k++) {
            const p2 = particles[k];
            const connDx = p.x - p2.x;
            const connDy = p.y - p2.y;
            const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

            if (connDist < 55) {
              const lineAlpha = (1 - connDist / 55) * p.energy * 0.3;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('shomer:pulse', handleCustomPulse as EventListener);
    };
  }, [onTelemetryUpdate]);

  return (
    <canvas
      ref={canvasRef}
      id="shomer-sensing-field"
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
