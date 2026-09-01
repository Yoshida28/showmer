import React from 'react';
import { sensingAudio } from '../utils/audio';

export const BrandFinaleSection: React.FC = () => {
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
      className="relative min-h-screen py-32 px-6 md:px-12 bg-[#010306] border-t border-white/[0.06] flex flex-col justify-between items-center text-center select-none overflow-hidden"
    >
      {/* Background Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(10,22,34,0.4)_0%,rgba(1,3,6,1)_80%)] pointer-events-none" />

      {/* Top Subtle Coordinates */}
      <div className="relative z-10 w-full max-w-6xl flex justify-between items-center text-[10px] font-mono text-slate-400 tracking-[0.25em] uppercase font-medium">
        <span>LAT: 37.7749° N</span>
        <span className="text-sky-400/80">[ SHOMER GLOBAL INTELLIGENT SENSING ]</span>
        <span>LON: 122.4194° W</span>
      </div>

      {/* Centerpiece: Wordmark & Campaign Statements */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-4xl space-y-12">
        {/* Interactive Logo Wordmark with Center Expanding Pulse */}
        <div
          onClick={triggerLogoPulse}
          id="finale-shomer-monogram"
          className="group relative cursor-pointer py-4"
        >
          {/* Background expanding pulse ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-48 h-48 rounded-full border border-sky-400/20 animate-ping" style={{ animationDuration: '4s' }} />
            <span className="w-80 h-80 rounded-full border border-sky-500/10 animate-pulse" />
          </div>

          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-[0.2em] text-white uppercase transition-all duration-700 group-hover:text-sky-100 drop-shadow-[0_0_80px_rgba(56,189,248,0.3)]">
            SHOMER
          </h1>

          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-[1px] w-12 bg-sky-500/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="h-[1px] w-12 bg-sky-500/40" />
          </div>
        </div>

        {/* Campaign Lines */}
        <div className="space-y-4">
          <p
            id="finale-campaign-line"
            className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 uppercase"
          >
            BEFORE YOU SEE THE THREAT,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-sky-200 to-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.25)]">
              WE SENSE IT.
            </span>
          </p>

          <p
            id="finale-positioning"
            className="text-xs sm:text-sm font-mono tracking-[0.3em] text-sky-400 uppercase pt-2 font-bold"
          >
            SAFETY BEYOND BOUNDARIES
          </p>
        </div>

        {/* Coming Soon Indicator */}
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-xl border border-sky-400/40 bg-sky-950/30 text-xs font-mono tracking-[0.25em] text-sky-200 uppercase shadow-[0_0_20px_rgba(56,189,248,0.15)] corner-brackets font-semibold">
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span>COMING SOON</span>
        </div>
      </div>

      {/* Footer Minimalist Copyright & Telemetry info */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-400 border-t border-white/[0.06] pt-8 font-medium">
        <div>© {new Date().getFullYear()} SHOMER TECHNOLOGIES INC. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6">
          <span>OPTICAL REFLECTOMETRY DAS // DTS // DVS</span>
          <span className="hidden sm:inline text-sky-400/80">RESTRICTED SPECIFICATION</span>
        </div>
      </div>
    </footer>
  );
};
