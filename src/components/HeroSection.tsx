import React, { useState, useEffect } from 'react';
import { sensingAudio } from '../utils/audio';

interface HeroSectionProps {
  onScrollToNext: () => void;
  isMoving: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext, isMoving }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const triggerHeroDisturbance = (e: React.MouseEvent) => {
    sensingAudio.playPulse(140, 0.4, 0.12);
    setPulseCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: {
          x,
          y,
          maxRadius: 420,
          opacity: 0.85,
          speed: 4.8,
          type: 'disturb',
          count: 3,
          stagger: 110,
        },
      })
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center px-6 pt-32 pb-16 text-center select-none overflow-hidden"
    >
      {/* Top Meta Header Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center text-[10px] font-mono text-slate-400 tracking-[0.28em] uppercase">
        <span className="hidden sm:inline-flex items-center gap-2">
          <span className="text-slate-600 font-bold">[</span>
          <span className="text-slate-300">DAS OPTICAL CONTINUUM</span>
          <span className="text-slate-600 font-bold">]</span>
        </span>
        <span className="mx-auto sm:mx-0 inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/[0.08] bg-[#040914]/80 text-slate-300 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="font-semibold text-slate-200">ACTIVE FIELD DETECTED</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-2 text-slate-400">
          <span className="text-slate-600 font-bold">[</span>
          <span className="text-sky-400 font-medium">SUB-METER LOCALIZATION</span>
          <span className="text-slate-600 font-bold">]</span>
        </span>
      </div>

      {/* Center Cinematic Editorial Content */}
      <div className="my-auto max-w-5xl flex flex-col items-center z-10 px-4">
        {/* Tactical Sensing Status Pill */}
        <div
          onClick={triggerHeroDisturbance}
          id="hero-sensing-status-pill"
          className="group inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#040812]/90 hover:border-sky-400/50 hover:bg-sky-950/30 backdrop-blur-xl mb-8 transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase group-hover:text-sky-200 font-medium">
            {isMoving ? 'DISTURBANCE DETECTED // FIELD ACTIVE' : 'CONTINUOUS OPTICAL INTERFEROMETRY ACTIVE'}
          </span>
        </div>

        {/* Main Bold Monumental Campaign Headline */}
        <h1
          id="hero-main-headline"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tight text-white leading-[1.04] uppercase mb-8"
        >
          <span className="block text-slate-400 font-semibold tracking-normal">YOU CAN&apos;T SEE IT.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            BUT IT KNOWS YOU&apos;RE HERE.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p
          id="hero-supporting-text"
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 font-normal tracking-wide mb-12 leading-relaxed"
        >
          Intelligent distributed acoustic sensing. Turn standard fiber-optic infrastructure into continuous real-time seismic arrays with sub-meter spatial accuracy.
        </p>

        {/* Bespoke Interactive Trigger Button & Crosshair */}
        <div
          onClick={triggerHeroDisturbance}
          id="hero-interactive-cue"
          className="group flex flex-col items-center gap-4 cursor-pointer py-2"
        >
          <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl border border-white/[0.1] bg-[#040914] group-hover:border-sky-400 group-hover:bg-sky-950/40 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.9)] corner-brackets">
            {/* Custom SVG Laser Reticle */}
            <svg className="w-8 h-8 text-sky-400 group-hover:scale-110 group-hover:text-sky-300 transition-all duration-300" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
              <line x1="16" y1="2" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="16" y1="25" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="16" x2="7" y2="16" stroke="currentColor" strokeWidth="1.5" />
              <line x1="25" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="absolute inset-0 rounded-2xl border border-sky-400/20 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.28em] text-slate-400 uppercase group-hover:text-sky-300 transition-colors font-medium">
            {isTouchDevice ? 'TAP TO INJECT OPTICAL WAVE' : 'CLICK OR MOVE CURSOR TO INJECT ACOUSTIC WAVE'}
          </span>
        </div>
      </div>

      {/* Bottom Minimal Scroll Trigger */}
      <button
        onClick={onScrollToNext}
        id="hero-scroll-down-cue"
        aria-label="Scroll to intelligence architecture"
        className="group flex items-center gap-3 text-slate-500 hover:text-sky-400 transition-colors duration-300 cursor-pointer pt-6"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">EXPLORE SYSTEM</span>
        <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-y-1 transition-all duration-300" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V13M8 13L3.5 8.5M8 13L12.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};
