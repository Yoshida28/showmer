import React, { useState, useRef, useCallback } from 'react';
import { sensingAudio } from '../utils/audio';

export const PerceptionComparisonSection: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    sensingAudio.playPing(920, 0.1, 0.05);
    handleMove(e.clientX);
  };

  return (
    <section
      id="perception"
      className="relative py-28 px-6 md:px-12 bg-[#010306] border-t border-white/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase font-semibold">
              [ 02 // PERCEPTION COMPARISON ]
            </span>
            <h2
              id="perception-heading"
              className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase"
            >
              WHAT YOU SEE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-sky-200 to-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.2)]">
                ISN&apos;T EVERYTHING.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 font-normal leading-relaxed">
            Drag the optical divider to reveal how SHOMER transforms pitch-black perimeters into a continuous, sub-millimeter acoustic sensing continuum.
          </p>
        </div>

        {/* Interactive Before/After Stage */}
        <div
          ref={containerRef}
          id="perception-slider-stage"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleSliderClick}
          className="relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#02050c] cursor-ew-resize group shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] corner-brackets"
        >
          {/* LAYER 1 (Underneath / Right side full canvas): "WHAT SHOMER SEES" */}
          <div className="absolute inset-0 bg-[#020610] overflow-hidden">
            {/* Atmospheric Sensor Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,116,144,0.18)_0%,transparent_70%)]" />

            {/* Perimeter Facility Silhouette */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
                {/* Horizon & Ground */}
                <line x1="0" y1="460" x2="1000" y2="460" stroke="#0e7490" strokeWidth="1" strokeDasharray="4 4" />
                {/* Security Perimeter Fence Wire Lines */}
                <path d="M0,450 L1000,450" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.4" />
                <path d="M0,420 L1000,420" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.2" />
                <path d="M0,390 L1000,390" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.2" />

                {/* Sensor Monitoring Tower */}
                <path d="M780,460 L800,280 L820,460" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" fill="none" />
                <circle cx="800" cy="280" r="16" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
                <circle cx="800" cy="280" r="6" fill="#38bdf8" />
              </svg>
            </div>

            {/* SENSING OVERLAYS: Intelligent Dynamic Vectors */}
            {/* 1. Vibration Waveforms Along Ground */}
            <div className="absolute bottom-[100px] left-0 right-0 h-24 overflow-hidden pointer-events-none">
              <div className="w-full h-full flex items-center justify-around opacity-80">
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-sky-400 rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.sin(i * 0.5) * 35 + 45}%`,
                      opacity: (i > 12 && i < 20) ? 0.95 : 0.2,
                      boxShadow: (i > 12 && i < 20) ? '0 0 12px #38bdf8' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 2. Concentric Disturbance Radar Target (Sensing Point) */}
            <div className="absolute top-[52%] left-[64%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-sky-400/30 animate-ping" style={{ animationDuration: '2.5s' }} />
                <span className="absolute w-24 h-24 rounded-full border border-sky-400/60 animate-pulse" />
                <span className="w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_16px_#38bdf8]" />
              </div>

              {/* Target Data Tag */}
              <div className="absolute left-28 top-0 bg-[#010306]/95 border border-sky-500/40 p-3.5 rounded-xl text-[10px] font-mono tracking-widest text-slate-200 shadow-2xl backdrop-blur-xl whitespace-nowrap">
                <div className="text-sky-300 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span>FOOTSTEP ACOUSTIC SIGNATURE</span>
                </div>
                <div className="text-slate-400 text-[9px] mt-1">KM 14.82 // MASS: ~78 KG // V: 1.4 m/s</div>
                <div className="flex items-center gap-1.5 mt-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  <span>CLASSIFIED: HUMAN INTRUSION</span>
                </div>
              </div>
            </div>

            {/* 3. Secondary Environmental Strain Target */}
            <div className="absolute top-[38%] left-[30%] pointer-events-none hidden sm:block">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-sky-400/20" />
                <span className="w-2 h-2 rounded-full bg-sky-400/80" />
              </div>
              <div className="absolute left-10 top-0 bg-[#010306]/90 border border-white/[0.08] px-3 py-1.5 rounded-lg text-[9px] font-mono text-slate-300 whitespace-nowrap">
                FENCE TENSION: NORMAL (12.4 N)
              </div>
            </div>

            {/* Right Side Header Label */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-950/80 border border-sky-500/40 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-sky-200 uppercase font-bold">
                WHAT SHOMER SEES
              </span>
            </div>
          </div>

          {/* LAYER 2 (Clipped Left side): "WHAT YOU SEE" */}
          <div
            className="absolute inset-0 bg-[#010306] overflow-hidden border-r border-sky-400/80"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Dark Pitch Black Environment */}
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.4)_0%,rgba(1,3,6,0.98)_80%)]">
              {/* Silhouette of perimeter in pitch dark */}
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
                  <line x1="0" y1="460" x2="1000" y2="460" stroke="#334155" strokeWidth="1" />
                  <path d="M0,450 L1000,450" stroke="#1e293b" strokeWidth="1" />
                  <path d="M780,460 L800,280 L820,460" stroke="#1e293b" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Pitch black darkness overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010306] via-transparent to-[#010306]/70" />

              {/* Center status in dark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 py-2 rounded-xl border border-white/[0.08] bg-[#010306]/80 backdrop-blur-md">
                  <span className="text-xs font-mono tracking-widest text-slate-400 uppercase font-medium">
                    NO VISIBLE ANOMALY (NAKED EYE)
                  </span>
                </div>
              </div>
            </div>

            {/* Left Side Header Label */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#040812]/90 border border-white/[0.1] backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase font-semibold">
                WHAT YOU SEE
              </span>
            </div>
          </div>

          {/* Slider Drag Handle / Dividing Line */}
          <div
            className="absolute top-0 bottom-0 z-30 flex items-center justify-center -translate-x-1/2 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Glowing vertical blade */}
            <div className="w-[2px] h-full bg-sky-400 shadow-[0_0_15px_#38bdf8]" />

            {/* Circular Tactical Handle */}
            <div className="absolute w-10 h-10 rounded-xl bg-[#010306] border-2 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.9)] flex items-center justify-center text-sky-300">
              <div className="flex items-center gap-1">
                <span className="block w-1 h-3.5 bg-sky-400 rounded-full" />
                <span className="block w-1 h-3.5 bg-sky-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Footnotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono">
          <div className="p-6 rounded-xl border border-white/[0.08] bg-[#040812]/80 backdrop-blur-md corner-brackets">
            <span className="text-sky-400 font-bold block mb-2 tracking-[0.2em] uppercase">01 // CONTINUOUS DAS</span>
            <p className="text-slate-400 leading-relaxed font-normal">
              Captures acoustic signals at up to 100,000 optical pulses per second along regular dark fiber infrastructure.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-white/[0.08] bg-[#040812]/80 backdrop-blur-md corner-brackets">
            <span className="text-sky-400 font-bold block mb-2 tracking-[0.2em] uppercase">02 // SUB-METER PINPOINT</span>
            <p className="text-slate-400 leading-relaxed font-normal">
              Pinpoints exact physical coordinates of footsteps, digging, climbing, or cutting within 1-meter precision.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-white/[0.08] bg-[#040812]/80 backdrop-blur-md corner-brackets">
            <span className="text-sky-400 font-bold block mb-2 tracking-[0.2em] uppercase">03 // AI CLASSIFIER</span>
            <p className="text-slate-400 leading-relaxed font-normal">
              Distinguishes benign environmental ambient noise (wind, rain, wildlife) from intentional hostile breach vectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
