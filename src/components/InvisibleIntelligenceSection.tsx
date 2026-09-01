import React, { useState, useEffect } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface InvisibleIntelligenceSectionProps {
  themeId?: PastelThemeId;
}

export const InvisibleIntelligenceSection: React.FC<InvisibleIntelligenceSectionProps> = ({
  themeId = 'sky',
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [opticalWave, setOpticalWave] = useState<number[]>([]);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

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
    }, 3200);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Real-time canvas waveform generation
  useEffect(() => {
    const generateWave = () => {
      const points = [];
      const count = 36;
      for (let i = 0; i < count; i++) {
        const base = Math.sin(i * 0.35 + Date.now() * 0.004) * 12;
        const noise = (Math.random() - 0.5) * (activeStep > 0 ? 8 : 2);
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
      className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Side: System-status Visualization & Vertical Optical Channel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="pastel-card p-6 sm:p-8 rounded-2xl pastel-corners">
            {/* Top Core Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse shadow-sm"
                  style={{ backgroundColor: theme.accent }}
                />
                <span className="text-slate-900 font-bold">DAS OPTICAL CORE [01]</span>
              </div>
              <span
                className="font-semibold px-2.5 py-0.5 rounded text-[9.5px]"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                {steps[activeStep].status}
              </span>
            </div>

            {/* Vertical Sensing Line & Realtime Telemetry Grid */}
            <div className="my-6 grid grid-cols-12 gap-4 items-center">
              {/* Thin Vertical Optical Strand with interactive nodes */}
              <div className="col-span-2 flex flex-col items-center justify-between h-56 py-2 relative">
                <div
                  className="absolute top-0 bottom-0 w-[1.5px]"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)`,
                  }}
                />
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => handleInteractiveTrigger(idx)}
                    aria-label={`Select sensing phase: ${steps[idx].label}`}
                    className={`relative z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm ${
                      activeStep === idx
                        ? 'border-2 scale-110 shadow-md font-bold'
                        : 'bg-white border border-slate-200 hover:border-slate-300'
                    }`}
                    style={{
                      borderColor: activeStep === idx ? theme.accent : undefined,
                      backgroundColor: activeStep === idx ? theme.badgeBg : '#FFFFFF',
                      color: activeStep === idx ? theme.accent : '#64748B',
                    }}
                  >
                    <span className="text-[10px] font-mono">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>

              {/* Real-time Oscillograph Waveform & Metrics */}
              <div className="col-span-10 flex flex-col gap-4">
                {/* Live SVG Oscillograph */}
                <div className="h-28 w-full bg-slate-50/80 border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between overflow-hidden relative shadow-inner">
                  <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-500 tracking-wider uppercase">
                    <span>INTERFEROMETRIC PHASE SHIFT</span>
                    <span style={{ color: theme.accent }} className="font-semibold">250 kHz SAMPLE</span>
                  </div>
                  <svg className="w-full h-14 fill-none" viewBox="0 0 100 40">
                    <polyline
                      stroke={theme.accent}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={opticalWave
                        .map((val, i) => `${(i / (opticalWave.length - 1)) * 100},${20 + val}`)
                        .join(' ')}
                    />
                  </svg>
                  <div className="flex justify-between text-[8px] font-mono text-slate-400">
                    <span>0.0 kHz</span>
                    <span>50.0 kHz</span>
                    <span>100.0 kHz</span>
                  </div>
                </div>

                {/* Status Telemetry readout */}
                <div className="space-y-1">
                  <div className="text-[9.5px] font-mono tracking-wider uppercase font-semibold" style={{ color: theme.accent }}>
                    CURRENT STATE:
                  </div>
                  <div className="text-sm font-mono text-slate-900 tracking-tight font-bold">
                    {steps[activeStep].label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {steps[activeStep].sub}
                  </div>
                  <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-600 border-t border-slate-100">
                    <span>PARAM: <span className="text-slate-900 font-semibold">{steps[activeStep].value}</span></span>
                    <span>STRAIN: <span className="font-bold" style={{ color: theme.accent }}>{steps[activeStep].metric}</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom mini telemetry footer */}
            <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-[9px] font-mono text-slate-500 tracking-wider uppercase">
              <span>RAYLEIGH BACKSCATTER ANALYSIS</span>
              <span className="font-semibold" style={{ color: theme.accent }}>LATENCY &lt; 1.2ms</span>
            </div>
          </div>
        </div>

        {/* Right Side: Bold Editorial Narrative */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          >
            <span>01 // INVISIBLE INTELLIGENCE</span>
          </div>

          <h2
            id="intelligence-headline"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] uppercase"
          >
            THE MOST CRITICAL THREATS ARE OFTEN{' '}
            <span style={{ color: theme.accent }}>
              INVISIBLE.
            </span>
          </h2>

          <p
            id="intelligence-supporting-copy"
            className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl"
          >
            SHOMER reveals what the human eye and traditional perimeter cameras miss. By transforming existing
            fiber-optic infrastructure into continuous virtual acoustic and seismic arrays, every ground intrusion,
            structural strain, or perimeter breach is resolved with sub-meter spatial accuracy.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 w-full">
            <div className="pastel-card p-4 sm:p-5 rounded-xl">
              <div className="text-2xl font-mono text-slate-900 tracking-tight font-bold">0.01 µε</div>
              <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase mt-1">
                STRAIN SENSITIVITY
              </div>
            </div>
            <div className="pastel-card p-4 sm:p-5 rounded-xl">
              <div className="text-2xl font-mono tracking-tight font-bold" style={{ color: theme.accent }}>100 KM+</div>
              <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase mt-1">
                SINGLE CORE RANGE
              </div>
            </div>
            <div className="pastel-card p-4 sm:p-5 rounded-xl col-span-2 sm:col-span-1">
              <div className="text-2xl font-mono text-slate-900 tracking-tight font-bold">&lt; 1.0 M</div>
              <div className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase mt-1">
                SPATIAL ACCURACY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
