import React, { useState, useRef, useCallback } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface PerceptionComparisonSectionProps {
  themeId?: PastelThemeId;
}

export const PerceptionComparisonSection: React.FC<PerceptionComparisonSectionProps> = ({
  themeId = 'sky',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

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
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-slate-200/80 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm mb-3"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              <span>02 // PERCEPTION COMPARISON</span>
            </div>
            <h2
              id="perception-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase"
            >
              WHAT YOU SEE{' '}
              <span style={{ color: theme.accent }}>
                ISN&apos;T EVERYTHING.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            Drag the optical divider to reveal how SHOMER transforms opaque perimeters into a continuous, sub-millimeter acoustic sensing continuum.
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
          className="relative w-full h-[440px] sm:h-[520px] rounded-2xl overflow-hidden pastel-card cursor-ew-resize group shadow-lg pastel-corners"
        >
          {/* LAYER 1 (Underneath / Right side full canvas): "WHAT SHOMER SEES" */}
          <div className="absolute inset-0 bg-slate-900 overflow-hidden text-white">
            {/* Atmospheric Sensor Background */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(circle at 70% 50%, ${theme.accent} 0%, transparent 70%)`,
              }}
            />

            {/* Perimeter Facility Silhouette */}
            <div className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
                {/* Horizon & Ground */}
                <line x1="0" y1="460" x2="1000" y2="460" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                {/* Security Perimeter Fence Wire Lines */}
                <path d="M0,450 L1000,450" stroke={theme.accentLight} strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M0,420 L1000,420" stroke={theme.accentLight} strokeWidth="1" strokeOpacity="0.3" />
                <path d="M0,390 L1000,390" stroke={theme.accentLight} strokeWidth="1" strokeOpacity="0.3" />

                {/* Sensor Monitoring Tower */}
                <path d="M780,460 L800,280 L820,460" stroke={theme.accent} strokeWidth="1.5" strokeOpacity="0.7" fill="none" />
                <circle cx="800" cy="280" r="16" stroke={theme.accent} strokeWidth="1.5" strokeOpacity="0.9" fill="none" />
                <circle cx="800" cy="280" r="6" fill={theme.accent} />
              </svg>
            </div>

            {/* SENSING OVERLAYS: Intelligent Dynamic Vectors */}
            {/* 1. Vibration Waveforms Along Ground */}
            <div className="absolute bottom-[90px] left-0 right-0 h-24 overflow-hidden pointer-events-none">
              <div className="w-full h-full flex items-center justify-around opacity-80">
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: theme.accentLight,
                      height: `${Math.sin(i * 0.5) * 35 + 45}%`,
                      opacity: (i > 12 && i < 20) ? 0.95 : 0.25,
                      boxShadow: (i > 12 && i < 20) ? `0 0 12px ${theme.accent}` : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 2. Concentric Disturbance Radar Target (Sensing Point) */}
            <div className="absolute top-[52%] left-[64%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full border animate-ping"
                  style={{ borderColor: theme.accent, animationDuration: '2.5s', opacity: 0.4 }}
                />
                <span
                  className="absolute w-24 h-24 rounded-full border animate-pulse"
                  style={{ borderColor: theme.accent, opacity: 0.6 }}
                />
                <span
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>

              {/* Target Data Tag */}
              <div className="absolute left-28 top-0 bg-slate-900/95 border border-slate-700 p-3.5 rounded-xl text-[10px] font-mono tracking-wider text-slate-200 shadow-2xl backdrop-blur-xl whitespace-nowrap">
                <div className="font-bold flex items-center gap-1.5" style={{ color: theme.accentLight }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
                  <span>FOOTSTEP ACOUSTIC SIGNATURE</span>
                </div>
                <div className="text-slate-400 text-[9px] mt-1">KM 14.82 // MASS: ~78 KG // V: 1.4 m/s</div>
                <div className="flex items-center gap-1.5 mt-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  <span>CLASSIFIED: HUMAN INTRUSION</span>
                </div>
              </div>
            </div>

            {/* Right Side Header Label */}
            <div
              className="absolute top-5 right-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-lg border backdrop-blur-xl shadow-md"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', borderColor: theme.accentBorder }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: theme.accent }} />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold" style={{ color: theme.accentLight }}>
                WHAT SHOMER SENSES
              </span>
            </div>
          </div>

          {/* LAYER 2 (Clipped Left side): "WHAT YOU SEE" */}
          <div
            className="absolute inset-0 bg-slate-950 overflow-hidden border-r-2"
            style={{ width: `${sliderPosition}%`, borderColor: theme.accent }}
          >
            {/* Dark Minimalist Night Environment */}
            <div className="absolute inset-0 w-full h-full bg-slate-950">
              {/* Center status in dark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 py-2 rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md">
                  <span className="text-xs font-mono tracking-wider text-slate-400 uppercase font-medium">
                    NO VISIBLE ANOMALY (NAKED EYE)
                  </span>
                </div>
              </div>
            </div>

            {/* Left Side Header Label */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-slate-300 uppercase font-semibold">
                WHAT YOU SEE
              </span>
            </div>
          </div>

          {/* Slider Drag Handle / Dividing Line */}
          <div
            className="absolute top-0 bottom-0 z-30 flex items-center justify-center -translate-x-1/2 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Dividing Blade */}
            <div className="w-[2px] h-full" style={{ backgroundColor: theme.accent }} />

            {/* Circular Handle */}
            <div
              className="absolute w-9 h-9 rounded-full bg-white border-2 shadow-lg flex items-center justify-center"
              style={{ borderColor: theme.accent }}
            >
              <div className="flex items-center gap-1">
                <span className="block w-1 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
                <span className="block w-1 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Footnotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2 text-xs font-mono">
          <div className="pastel-card p-5 rounded-xl">
            <span className="font-bold block mb-1.5 tracking-[0.2em] uppercase" style={{ color: theme.accent }}>
              01 // CONTINUOUS DAS
            </span>
            <p className="text-slate-600 leading-relaxed font-normal">
              Captures acoustic signals at up to 100,000 optical pulses per second along regular dark fiber infrastructure.
            </p>
          </div>
          <div className="pastel-card p-5 rounded-xl">
            <span className="font-bold block mb-1.5 tracking-[0.2em] uppercase" style={{ color: theme.accent }}>
              02 // SUB-METER PINPOINT
            </span>
            <p className="text-slate-600 leading-relaxed font-normal">
              Pinpoints exact physical coordinates of footsteps, digging, climbing, or cutting within 1-meter precision.
            </p>
          </div>
          <div className="pastel-card p-5 rounded-xl">
            <span className="font-bold block mb-1.5 tracking-[0.2em] uppercase" style={{ color: theme.accent }}>
              03 // AI CLASSIFIER
            </span>
            <p className="text-slate-600 leading-relaxed font-normal">
              Distinguishes benign environmental ambient noise (wind, rain, wildlife) from intentional hostile breach vectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
