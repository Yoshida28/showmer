import React, { useState, useEffect } from 'react';
import { sensingAudio } from '../utils/audio';

export const InvisibleIntelligenceSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [opticalWave, setOpticalWave] = useState<number[]>([]);

  // Simulation steps cycling through live telemetry
  const steps = [
    { label: 'CALIBRATING OPTICAL COHERENCE', status: 'STANDBY', value: '1550.0 nm', metric: '0.00 µε', sub: 'Baseline phase interferometry' },
    { label: 'DISTURBANCE DETECTED', status: 'ACTIVE', value: 'Δf = +14.2 Hz', metric: '0.08 µε', sub: 'Rayleigh backscatter shift' },
    { label: 'ANALYSING SPECTRAL DENSITY...', status: 'PROCESSING', value: 'FFT 512 pt', metric: '0.14 µε', sub: 'Acoustic waveform extraction' },
    { label: 'HUMAN BREACH IDENTIFIED', status: 'CONFIRMED', value: 'TRAJECTORY: 1.4 m/s', metric: '0.22 µε', sub: 'Neural signature verified' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Real-time canvas waveform generation
  useEffect(() => {
    const generateWave = () => {
      const points = [];
      const count = 36;
      for (let i = 0; i < count; i++) {
        const base = Math.sin(i * 0.35 + Date.now() * 0.004) * 14;
        const noise = (Math.random() - 0.5) * (activeStep > 0 ? 9 : 2);
        points.push(base + noise);
      }
      setOpticalWave(points);
    };

    const interval = setInterval(generateWave, 70);
    return () => clearInterval(interval);
  }, [activeStep]);

  const handleInteractiveTrigger = (index: number) => {
    setActiveStep(index);
    sensingAudio.playPing(1100 + index * 200, 0.18, 0.08);
  };

  return (
    <section
      id="intelligence"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 border-t border-white/[0.06] bg-[#010306] overflow-hidden"
    >
      {/* Background ambient radial laser aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-sky-950/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: System-status Visualization & Vertical Optical Channel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-[#040812]/95 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] corner-brackets">
            {/* Top Tactical Core Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] animate-pulse" />
                <span className="text-white font-bold">DAS OPTICAL CORE [01]</span>
              </div>
              <span className="text-sky-300 font-semibold px-2.5 py-0.5 rounded bg-sky-950/50 border border-sky-500/30">
                {steps[activeStep].status}
              </span>
            </div>

            {/* Vertical Sensing Line & Realtime Telemetry Grid */}
            <div className="my-6 grid grid-cols-12 gap-4 items-center">
              {/* Thin Vertical Optical Strand with nodes */}
              <div className="col-span-2 flex flex-col items-center justify-between h-56 py-2 relative">
                <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-400/50 to-transparent" />
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => handleInteractiveTrigger(idx)}
                    aria-label={`Select sensing phase: ${steps[idx].label}`}
                    className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      activeStep === idx
                        ? 'bg-sky-950 border border-sky-400 scale-110 shadow-[0_0_15px_#38bdf8]'
                        : 'bg-[#010306] border border-white/20 hover:border-sky-400/50'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold text-sky-300">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Real-time Oscillograph Waveform & Metrics */}
              <div className="col-span-10 flex flex-col gap-4">
                {/* Live SVG Oscillograph */}
                <div className="h-28 w-full bg-[#010306] border border-white/[0.08] rounded-xl p-3 flex flex-col justify-between overflow-hidden relative shadow-inner">
                  <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-400 tracking-widest uppercase">
                    <span>INTERFEROMETRIC PHASE SHIFT</span>
                    <span className="text-sky-400 font-semibold">250 kHz SAMPLE</span>
                  </div>
                  <svg className="w-full h-14 stroke-sky-400 fill-none" viewBox="0 0 100 40">
                    <polyline
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={opticalWave
                        .map((val, i) => `${(i / (opticalWave.length - 1)) * 100},${20 + val}`)
                        .join(' ')}
                    />
                  </svg>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>0.0 kHz</span>
                    <span>50.0 kHz</span>
                    <span>100.0 kHz</span>
                  </div>
                </div>

                {/* Status Telemetry readout */}
                <div className="space-y-1.5">
                  <div className="text-[9.5px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
                    CURRENT STATE:
                  </div>
                  <div className="text-sm font-mono text-white tracking-wider font-bold">
                    {steps[activeStep].label}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {steps[activeStep].sub}
                  </div>
                  <div className="flex items-center justify-between pt-2.5 text-[11px] font-mono text-slate-300 border-t border-white/[0.08]">
                    <span>PARAM: <span className="text-white font-semibold">{steps[activeStep].value}</span></span>
                    <span>STRAIN: <span className="text-sky-300 font-bold">{steps[activeStep].metric}</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini telemetry footer */}
            <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-slate-400 tracking-widest uppercase">
              <span>RAYLEIGH BACKSCATTER ANALYSIS</span>
              <span className="text-emerald-400 font-semibold">LATENCY &lt; 1.2ms</span>
            </div>
          </div>
        </div>

        {/* Right Side: Bold Editorial Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-sky-500/30 bg-sky-950/20 text-[10px] font-mono tracking-[0.25em] text-sky-300 uppercase font-semibold">
            <span>[ 01 // INVISIBLE INTELLIGENCE ]</span>
          </div>

          <h2
            id="intelligence-headline"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] uppercase"
          >
            THE MOST CRITICAL THREATS ARE OFTEN{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-200 to-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.2)]">
              INVISIBLE.
            </span>
          </h2>

          <p
            id="intelligence-supporting-copy"
            className="text-lg md:text-xl text-slate-300 font-normal tracking-wide leading-relaxed max-w-2xl"
          >
            SHOMER reveals what the human eye and traditional perimeter cameras miss. By transforming existing
            fiber-optic infrastructure into continuous virtual acoustic and seismic arrays, every ground intrusion,
            structural strain, or perimeter breach is resolved with sub-meter spatial accuracy.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] w-full">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#040812]/70 corner-brackets">
              <div className="text-2xl font-mono text-white tracking-tight font-bold">0.01 µε</div>
              <div className="text-[10px] font-mono text-slate-400 tracking-[0.25em] uppercase mt-1">
                STRAIN SENSITIVITY
              </div>
            </div>
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#040812]/70 corner-brackets">
              <div className="text-2xl font-mono text-sky-400 tracking-tight font-bold">100 KM+</div>
              <div className="text-[10px] font-mono text-slate-400 tracking-[0.25em] uppercase mt-1">
                SINGLE CORE RANGE
              </div>
            </div>
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#040812]/70 corner-brackets">
              <div className="text-2xl font-mono text-emerald-400 tracking-tight font-bold">&lt; 1.0 M</div>
              <div className="text-[10px] font-mono text-slate-400 tracking-[0.25em] uppercase mt-1">
                SPATIAL ACCURACY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
