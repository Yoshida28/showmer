import React, { useState, useRef, useEffect } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface SimulationWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
  speed: number;
  label?: string;
}

interface MakeDisturbanceSectionProps {
  themeId?: PastelThemeId;
}

export const MakeDisturbanceSection: React.FC<MakeDisturbanceSectionProps> = ({
  themeId = 'sky',
}) => {
  const [activeControl, setActiveControl] = useState<'move' | 'disturb' | 'escalate' | null>(null);
  const [systemState, setSystemState] = useState<string>('FIELD STABLE — COHERENCE 99.98%');
  const [escalationStep, setEscalationStep] = useState<number>(0);
  const [logEvents, setLogEvents] = useState<Array<{ id: string; time: string; msg: string; type: string }>>([
    { id: '1', time: '00:00:01', msg: 'Optical interferometer continuum normalized', type: 'info' },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesRef = useRef<SimulationWave[]>([]);
  const animRef = useRef<number | null>(null);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  // Canvas render loop for the simulation sandbox
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Clean off-white canvas bg
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lattice
      ctx.strokeStyle = theme.gridColor;
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw horizontal primary sensing cable
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Nodes on the cable
      for (let x = step; x < width; x += step * 2) {
        ctx.fillStyle = theme.accent;
        ctx.beginPath();
        ctx.arc(x, height / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render expanding disturbance waves
      const waves = wavesRef.current;
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.radius += w.speed;
        const progress = w.radius / w.maxRadius;
        w.opacity = Math.max(0, 1 - progress);

        if (progress >= 1) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = w.color.replace('OPACITY', (w.opacity * 0.8).toString());
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Secondary ring
        if (w.radius > 15) {
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = w.color.replace('OPACITY', (w.opacity * 0.35).toString());
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw disturbance origin point
        ctx.fillStyle = w.color.replace('OPACITY', (w.opacity * 0.9).toString());
        ctx.beginPath();
        ctx.arc(w.x, w.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        if (w.label) {
          ctx.fillStyle = '#0F172A';
          ctx.font = '10px "Space Grotesk", sans-serif';
          ctx.fillText(w.label, w.x + 8, w.y - 8);
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  const addLog = (msg: string, type = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogEvents((prev) => [{ id: Math.random().toString(), time, msg, type }, ...prev.slice(0, 3)]);
  };

  // CONTROL 1: MOVE
  const triggerMove = () => {
    setActiveControl('move');
    setSystemState('MOTION DETECTED // VECTOR LOCATED');
    sensingAudio.playPing(750, 0.2, 0.1);
    addLog('Acoustic footprint detected: 1.4 m/s (SECTOR 02)', 'move');

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 800;
    const h = canvas ? canvas.height : 360;

    wavesRef.current.push({
      x: w * 0.35,
      y: h * 0.5,
      radius: 4,
      maxRadius: 180,
      opacity: 0.9,
      color: theme.particleColor,
      speed: 3.2,
      label: 'MOTION: 0.12 µε',
    });

    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.5, maxRadius: 280, count: 1 },
      })
    );
  };

  // CONTROL 2: DISTURB
  const triggerDisturb = () => {
    setActiveControl('disturb');
    setSystemState('STRUCTURAL VIBRATION REGISTERED');
    sensingAudio.playPulse(120, 0.4, 0.15);
    addLog('High-amplitude vibration registered (44.8 Hz)', 'disturb');

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 800;
    const h = canvas ? canvas.height : 360;

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        wavesRef.current.push({
          x: w * 0.55 + (i - 1) * 30,
          y: h * 0.5,
          radius: 4,
          maxRadius: 260,
          opacity: 0.95,
          color: theme.particleColor,
          speed: 4.0,
          label: i === 0 ? 'VIBRATION: 44.8 Hz' : undefined,
        });
      }, i * 140);
    }

    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, maxRadius: 360, count: 2, stagger: 150 },
      })
    );
  };

  // CONTROL 3: ESCALATE
  const triggerEscalate = () => {
    setActiveControl('escalate');
    sensingAudio.playPulse(80, 0.6, 0.2);
    setEscalationStep(1);
    setSystemState('ANALYSING SPECTRAL PROFILE...');
    addLog('Multi-point perimeter anomaly detected', 'escalate');

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 800;
    const h = canvas ? canvas.height : 360;

    const points = [
      { x: w * 0.25, y: h * 0.45 },
      { x: w * 0.5, y: h * 0.55 },
      { x: w * 0.75, y: h * 0.48 },
    ];

    points.forEach((pt, idx) => {
      setTimeout(() => {
        wavesRef.current.push({
          x: pt.x,
          y: pt.y,
          radius: 2,
          maxRadius: 320,
          opacity: 1,
          color: theme.particleColor,
          speed: 4.5,
          label: `ANOMALY #${idx + 1}`,
        });
      }, idx * 180);
    });

    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, maxRadius: 500, count: 4, stagger: 120 },
      })
    );

    // Sequential cascade: ANALYSING -> LOCATING -> CLASSIFYING -> ALERTING
    setTimeout(() => {
      setEscalationStep(2);
      setSystemState('LOCATING // KM 14.82');
      sensingAudio.playPing(1100, 0.15, 0.08);
      addLog('Triangulating coordinates: SECTOR 04', 'escalate');
    }, 700);

    setTimeout(() => {
      setEscalationStep(3);
      setSystemState('CLASSIFYING // CRITICAL BREACH');
      sensingAudio.playPing(1300, 0.15, 0.08);
      addLog('Signature match: Intentional Human Intrusion', 'escalate');
    }, 1400);

    setTimeout(() => {
      setEscalationStep(4);
      setSystemState('ALERTING // COUNTERMEASURE DISPATCHED');
      sensingAudio.playPulse(220, 0.5, 0.18);
      addLog('AUTOMATED COUNTER-ALERT DISPATCHED', 'escalate');
    }, 2100);

    setTimeout(() => {
      setEscalationStep(5);
      setSystemState('DETECT. ANALYSE. LOCATE. ALERT.');
    }, 3000);
  };

  // Canvas click handler for custom disturbance
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    wavesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: 220,
      opacity: 0.9,
      color: theme.particleColor,
      speed: 3.5,
      label: `IMPULSE: ${Math.round(x)},${Math.round(y)}`,
    });

    sensingAudio.playPing(950, 0.15, 0.08);
    setSystemState('CUSTOM ACOUSTIC IMPULSE DETECTED');
    addLog(`User trigger at coordinates (${Math.round(x)}, ${Math.round(y)})`, 'custom');
  };

  return (
    <section
      id="simulation"
      className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-10 sm:mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm mb-4"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          >
            <span>03 // INTERACTIVE SIMULATION</span>
          </div>

          <h2
            id="simulation-headline"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight uppercase mb-4"
          >
            MAKE A DISTURBANCE.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Interact with the simulated field. Observe how the SHOMER optical continuum responds and isolates events in real time.
          </p>
        </div>

        {/* Interactive Simulation Console */}
        <div className="w-full pastel-card p-5 sm:p-8 rounded-2xl flex flex-col gap-6 pastel-corners">
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: theme.accent }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5 shadow-sm"
                  style={{ backgroundColor: theme.accent }}
                />
              </span>
              <span className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase font-semibold">SYSTEM TELEMETRY:</span>
              <span
                id="simulation-system-response"
                className="text-xs sm:text-sm font-mono tracking-wider font-bold uppercase px-3 py-1 rounded-md shadow-sm"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                {systemState}
              </span>
            </div>

            {/* Sequential Escalation Step Pipeline */}
            {activeControl === 'escalate' && (
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-slate-500">
                {['ANALYSING', 'LOCATING', 'CLASSIFYING', 'ALERTING'].map((st, i) => (
                  <span
                    key={st}
                    className={`px-2.5 py-0.5 rounded-md font-semibold transition-all duration-300 ${
                      escalationStep >= i + 1
                        ? 'shadow-sm font-bold'
                        : 'text-slate-400 bg-slate-50'
                    }`}
                    style={
                      escalationStep >= i + 1
                        ? { backgroundColor: theme.accent, color: '#FFFFFF' }
                        : undefined
                    }
                  >
                    {st}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive 2D Simulation Canvas */}
          <div className="relative w-full rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-inner">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              id="disturbance-sandbox-canvas"
              className="w-full h-[260px] sm:h-[320px] cursor-crosshair block"
              title="Click anywhere to generate a custom disturbance"
            />
            {/* Canvas Hint */}
            <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-600 tracking-[0.15em] uppercase bg-white/90 border border-slate-200 px-3 py-1 rounded-md backdrop-blur-md font-medium shadow-sm">
              CLICK CANVAS TO INJECT SEISMIC / ACOUSTIC IMPULSE
            </div>
          </div>

          {/* 3 Large Interactive Control Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* CONTROL 1: MOVE */}
            <button
              onClick={triggerMove}
              id="control-move-btn"
              className={`group p-5 sm:p-6 rounded-xl border text-left transition-all duration-300 cursor-pointer shadow-sm ${
                activeControl === 'move'
                  ? 'border-2 shadow-md'
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
              style={
                activeControl === 'move'
                  ? { borderColor: theme.accent, backgroundColor: theme.cardHover }
                  : undefined
              }
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: theme.badgeBg }}
                >
                  <svg className="w-5 h-5" style={{ color: theme.accent }} viewBox="0 0 24 24" fill="none">
                    <circle cx="6" cy="18" r="2.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.7" />
                    <circle cx="18" cy="6" r="2.5" fill="currentColor" opacity="0.4" />
                    <path d="M6 18L12 12L18 6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100 font-semibold">MODE 01</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase mb-1">
                MOVE
              </h3>
              <p className="text-xs text-slate-500 tracking-normal">
                Simulate footstep or vehicular ground motion
              </p>
            </button>

            {/* CONTROL 2: DISTURB */}
            <button
              onClick={triggerDisturb}
              id="control-disturb-btn"
              className={`group p-5 sm:p-6 rounded-xl border text-left transition-all duration-300 cursor-pointer shadow-sm ${
                activeControl === 'disturb'
                  ? 'border-2 shadow-md'
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
              style={
                activeControl === 'disturb'
                  ? { borderColor: theme.accent, backgroundColor: theme.cardHover }
                  : undefined
              }
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: theme.badgeBg }}
                >
                  <svg className="w-5 h-5" style={{ color: theme.accent }} viewBox="0 0 24 24" fill="none">
                    <path d="M2 12C4 8 6 16 8 12C10 4 12 20 14 12C16 8 18 16 20 12L22 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100 font-semibold">MODE 02</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase mb-1">
                DISTURB
              </h3>
              <p className="text-xs text-slate-500 tracking-normal">
                Inject structural vibrations & fence strain
              </p>
            </button>

            {/* CONTROL 3: ESCALATE */}
            <button
              onClick={triggerEscalate}
              id="control-escalate-btn"
              className={`group p-5 sm:p-6 rounded-xl border text-left transition-all duration-300 cursor-pointer shadow-sm ${
                activeControl === 'escalate'
                  ? 'border-2 shadow-md'
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
              style={
                activeControl === 'escalate'
                  ? { borderColor: theme.accent, backgroundColor: theme.cardHover }
                  : undefined
              }
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: theme.badgeBg }}
                >
                  <svg className="w-5 h-5" style={{ color: theme.accent }} viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="18" r="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100 font-semibold">MODE 03</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase mb-1">
                ESCALATE
              </h3>
              <p className="text-xs text-slate-500 tracking-normal">
                Multi-point perimeter intrusion classification
              </p>
            </button>
          </div>

          {/* Micro Telemetry Log Console */}
          <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 text-[11px] font-mono text-slate-600 space-y-1">
            {logEvents.map((log) => (
              <div key={log.id} className="flex items-center gap-2.5">
                <span className="text-slate-400">[{log.time}]</span>
                <span className="font-bold" style={{ color: theme.accent }}>»</span>
                <span className="text-slate-700 font-medium">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
