import React, { useState } from 'react';
import { sensingAudio } from '../utils/audio';

interface NavigationProps {
  onScrollToSignup: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onScrollToSignup }) => {
  const [isMuted, setIsMuted] = useState(sensingAudio.getIsMuted());

  const handleToggleAudio = () => {
    const muted = sensingAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      id="shomer-header"
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3.5 flex items-center justify-between border-b border-white/[0.07] bg-[#010306]/90 backdrop-blur-2xl transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.95)]"
    >
      {/* Brand Logo & Optical Interferometer Monogram */}
      <div className="flex items-center gap-5">
        <a
          href="#"
          id="nav-logo"
          className="group flex items-center gap-3 select-none"
        >
          {/* Custom Optical Sensor Reticle Glyph */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-sky-400/80 group-hover:text-sky-300 transition-colors" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <line x1="12" y1="0" x2="12" y2="4" stroke="currentColor" strokeWidth="1" />
              <line x1="12" y1="20" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <span className="font-display text-lg font-extrabold tracking-[0.28em] text-white group-hover:text-sky-200 transition-colors uppercase">
            SHOMER
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-2.5 pl-5 border-l border-white/[0.08] text-[10px] font-mono tracking-[0.22em] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-slate-300 font-semibold uppercase">SYSTEM COHERENCE: 99.98%</span>
          <span className="text-slate-700 font-bold">/</span>
          <span className="text-sky-400 font-medium">λ=1550nm DAS</span>
        </div>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
        <a
          href="#intelligence"
          id="nav-link-intelligence"
          className="hover:text-sky-300 transition-colors duration-200 flex items-center gap-1.5 group"
        >
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">[</span>
          <span>01 INTEL</span>
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">]</span>
        </a>
        <a
          href="#perception"
          id="nav-link-perception"
          className="hover:text-sky-300 transition-colors duration-200 flex items-center gap-1.5 group"
        >
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">[</span>
          <span>02 PERCEPTION</span>
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">]</span>
        </a>
        <a
          href="#simulation"
          id="nav-link-simulation"
          className="hover:text-sky-300 transition-colors duration-200 flex items-center gap-1.5 group"
        >
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">[</span>
          <span>03 SIMULATOR</span>
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">]</span>
        </a>
        <a
          href="#nervous-system"
          id="nav-link-nervous"
          className="hover:text-sky-300 transition-colors duration-200 flex items-center gap-1.5 group"
        >
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">[</span>
          <span>04 SYNAPSE</span>
          <span className="text-slate-600 group-hover:text-sky-500 font-bold">]</span>
        </a>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Sensory Sound Toggle with custom live audio waveform bars */}
        <button
          onClick={handleToggleAudio}
          id="audio-toggle-btn"
          aria-label={isMuted ? 'Enable sensory acoustic feedback' : 'Mute sensory audio'}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-[#040812]/90 hover:border-sky-500/50 hover:bg-sky-950/20 text-slate-400 hover:text-sky-300 transition-all duration-200 cursor-pointer shadow-sm"
        >
          {/* Custom SVG Audio Level Meter */}
          <div className="flex items-end gap-[2px] h-3 w-4">
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-600' : 'h-3 bg-sky-400 animate-pulse'
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-600' : 'h-2 bg-sky-400'
              }`}
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-600' : 'h-3.5 bg-sky-400 animate-pulse'
              }`}
              style={{ animationDelay: '0.3s' }}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-600' : 'h-1.5 bg-sky-400'
              }`}
            />
          </div>
          <span className="text-[9.5px] font-mono tracking-widest uppercase">
            {isMuted ? 'AUDIO: OFF' : 'AUDIO: LIVE'}
          </span>
        </button>

        {/* Priority Access Request Button */}
        <button
          onClick={onScrollToSignup}
          id="nav-coming-soon-btn"
          className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-sky-400/40 bg-sky-950/30 hover:bg-sky-900/50 hover:border-sky-400 text-[10px] font-mono tracking-[0.22em] uppercase text-sky-200 font-semibold transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.15)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span>REQUEST ACCESS</span>
        </button>
      </div>
    </header>
  );
};
