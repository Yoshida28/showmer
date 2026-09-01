import React, { useState, useEffect } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface HeroSectionProps {
  themeId?: PastelThemeId;
  onScrollToNext: () => void;
  isMoving: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  themeId = 'sky',
  onScrollToNext,
  isMoving,
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const triggerHeroDisturbance = (e: React.MouseEvent) => {
    sensingAudio.playPulse(140, 0.35, 0.1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: {
          x,
          y,
          maxRadius: 360,
          opacity: 0.7,
          speed: 4.2,
          type: 'disturb',
          count: 3,
          stagger: 100,
        },
      })
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 pt-28 sm:pt-36 pb-12 sm:pb-16 text-center select-none overflow-hidden"
    >
      {/* Top Meta Telemetry Feed */}
      <div className="w-full max-w-5xl flex justify-between items-center text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">
        <span className="hidden sm:inline-flex items-center gap-1.5 font-medium">
          <span className="text-slate-400">[</span>
          <span>OPTICAL CONTINUUM DAS</span>
          <span className="text-slate-400">]</span>
        </span>
        <span
          className="mx-auto sm:mx-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-md"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: theme.accent }}
          />
          <span className="font-semibold text-slate-800">ACTIVE ACOUSTIC FIELD DETECTED</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-medium">
          <span className="text-slate-400">[</span>
          <span style={{ color: theme.accent }}>SUB-METER ACCURACY</span>
          <span className="text-slate-400">]</span>
        </span>
      </div>

      {/* Center Cinematic Minimalist Content */}
      <div className="my-auto max-w-4xl flex flex-col items-center z-10 px-2 sm:px-4 py-8">
        {/* Minimalist Sensing Status Pill */}
        <div
          onClick={triggerHeroDisturbance}
          id="hero-sensing-status-pill"
          className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200/90 bg-white/90 hover:bg-white hover:border-slate-300 backdrop-blur-md mb-6 sm:mb-8 transition-all duration-300 cursor-pointer shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: theme.accent }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2 shadow-sm"
              style={{ backgroundColor: theme.accent }}
            />
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-slate-700 uppercase font-medium">
            {isMoving ? 'DISTURBANCE LOCATED // CONTINUOUS PULSE' : 'DISTRIBUTED OPTICAL SENSING ACTIVE'}
          </span>
        </div>

        {/* Main Bold Monumental Campaign Headline */}
        <h1
          id="hero-main-headline"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.05] uppercase mb-6 sm:mb-8"
        >
          <span className="block text-slate-400 font-semibold tracking-normal">
            YOU CAN&apos;T SEE IT.
          </span>
          <span
            className="block text-slate-900 drop-shadow-sm"
          >
            BUT IT KNOWS YOU&apos;RE HERE.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p
          id="hero-supporting-text"
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 font-normal tracking-normal mb-8 sm:mb-10 leading-relaxed"
        >
          Intelligent distributed optical acoustic sensing. Transform standard fiber-optic cables into real-time continuous acoustic matrices with sub-meter spatial precision.
        </p>

        {/* Minimal Interactive Trigger Button & Crosshair */}
        <div
          onClick={triggerHeroDisturbance}
          id="hero-interactive-cue"
          className="group flex flex-col items-center gap-3 cursor-pointer py-1"
        >
          <div
            className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border border-slate-200 bg-white/95 group-hover:scale-105 transition-all duration-300 shadow-sm pastel-corners"
          >
            {/* Custom SVG Laser Reticle */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:rotate-45"
              style={{ color: theme.accent }}
              viewBox="0 0 32 32"
              fill="none"
            >
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
              <line x1="16" y1="2" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="16" y1="25" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="16" x2="7" y2="16" stroke="currentColor" strokeWidth="1.5" />
              <line x1="25" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <span className="text-[10px] font-mono tracking-[0.24em] text-slate-500 uppercase group-hover:text-slate-800 transition-colors font-medium">
            {isTouchDevice ? 'TAP TO INJECT SENSING WAVE' : 'CLICK OR MOVE CURSOR TO INJECT ACOUSTIC WAVE'}
          </span>
        </div>
      </div>

      {/* Bottom Minimal Scroll Trigger */}
      <button
        onClick={onScrollToNext}
        id="hero-scroll-down-cue"
        aria-label="Scroll to intelligence architecture"
        className="group flex items-center gap-2.5 text-slate-400 hover:text-slate-800 transition-colors duration-300 cursor-pointer pt-4"
      >
        <span className="text-[9px] font-mono tracking-[0.26em] uppercase font-medium">EXPLORE SYSTEM</span>
        <svg className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none">
          <path d="M8 2V13M8 13L3.5 8.5M8 13L12.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};
