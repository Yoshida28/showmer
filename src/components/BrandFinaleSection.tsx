import React from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface BrandFinaleSectionProps {
  themeId?: PastelThemeId;
}

export const BrandFinaleSection: React.FC<BrandFinaleSectionProps> = ({
  themeId = 'sky',
}) => {
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  const triggerLogoPulse = (e: React.MouseEvent) => {
    sensingAudio.playPulse(100, 0.6, 0.15);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: {
          x,
          y,
          maxRadius: 550,
          opacity: 0.9,
          speed: 4.0,
          type: 'disturb',
          count: 3,
          stagger: 180,
        },
      })
    );
  };

  return (
    <footer
      id="brand-finale"
      className="relative min-h-[90vh] py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-slate-200/80 flex flex-col justify-between items-center text-center select-none overflow-hidden"
    >
      {/* Top Subtle Coordinates */}
      <div className="relative z-10 w-full max-w-6xl flex justify-between items-center text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase font-medium">
        <span>LAT: 37.7749° N</span>
        <span className="font-semibold" style={{ color: theme.accent }}>
          [ SHOMER INTELLIGENT SENSING ]
        </span>
        <span>LON: 122.4194° W</span>
      </div>

      {/* Centerpiece: Wordmark & Campaign Statements */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-4xl space-y-8 sm:space-y-12">
        {/* Interactive Logo Wordmark with Center Expanding Pulse */}
        <div
          onClick={triggerLogoPulse}
          id="finale-shomer-monogram"
          className="group relative cursor-pointer py-4"
        >
          {/* Background expanding pulse ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="w-48 h-48 rounded-full border animate-ping opacity-30"
              style={{ borderColor: theme.accent, animationDuration: '4s' }}
            />
            <span
              className="w-72 h-72 rounded-full border animate-pulse opacity-20"
              style={{ borderColor: theme.accent }}
            />
          </div>

          <h1
            className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-[0.18em] text-slate-900 uppercase transition-all duration-500 group-hover:scale-105"
            style={{ textShadow: `0 4px 30px ${theme.accentLight}50` }}
          >
            SHOMER
          </h1>

          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="h-[1px] w-12" style={{ backgroundColor: theme.accent }} />
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
            <span className="h-[1px] w-12" style={{ backgroundColor: theme.accent }} />
          </div>
        </div>

        {/* Campaign Lines */}
        <div className="space-y-3">
          <p
            id="finale-campaign-line"
            className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase"
          >
            BEFORE YOU SEE THE THREAT,
            <br />
            <span style={{ color: theme.accent }}>
              WE SENSE IT.
            </span>
          </p>

          <p
            id="finale-positioning"
            className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase pt-1 font-bold"
            style={{ color: theme.accent }}
          >
            SAFETY BEYOND BOUNDARIES
          </p>
        </div>

        {/* Coming Soon Indicator */}
        <div
          className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl border text-xs font-mono tracking-[0.2em] uppercase shadow-sm font-semibold"
          style={{
            borderColor: theme.accent,
            backgroundColor: theme.badgeBg,
            color: theme.badgeText,
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
          <span>COMING SOON // 2026</span>
        </div>
      </div>

      {/* Footer Minimalist Copyright & Telemetry info */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-500 border-t border-slate-200/80 pt-6 font-medium">
        <div>© {new Date().getFullYear()} SHOMER TECHNOLOGIES INC. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6">
          <span>OPTICAL REFLECTOMETRY DAS // DTS // DVS</span>
          <span className="hidden sm:inline font-semibold" style={{ color: theme.accent }}>RESTRICTED SPECIFICATION</span>
        </div>
      </div>
    </footer>
  );
};
