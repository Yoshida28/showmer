import React, { useState } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface NavigationProps {
  currentTheme: PastelThemeId;
  onSelectTheme: (theme: PastelThemeId) => void;
  onScrollToSignup: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTheme,
  onSelectTheme,
  onScrollToSignup,
}) => {
  const [isMuted, setIsMuted] = useState(sensingAudio.getIsMuted());
  const [showThemePicker, setShowThemePicker] = useState(false);

  const handleToggleAudio = () => {
    const muted = sensingAudio.toggleMute();
    setIsMuted(muted);
  };

  const themeList: PastelThemeId[] = ['sky', 'sage', 'lavender', 'rose', 'oat'];
  const activeThemeConfig = PASTEL_THEMES[currentTheme] || PASTEL_THEMES.sky;

  return (
    <header
      id="shomer-header"
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-3 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)]"
    >
      {/* Brand Logo & Optical Monogram */}
      <div className="flex items-center gap-4">
        <a
          href="#"
          id="nav-logo"
          className="group flex items-center gap-2.5 select-none"
        >
          {/* Custom Optical Sensor Reticle Glyph */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
              style={{ color: activeThemeConfig.accent }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <line x1="12" y1="0" x2="12" y2="4" stroke="currentColor" strokeWidth="1" />
              <line x1="12" y1="20" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1" />
              <line x1="20" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <span className="font-display text-base sm:text-lg font-bold tracking-[0.24em] text-slate-900 group-hover:text-slate-700 transition-colors uppercase">
            SHOMER
          </span>
        </a>

        <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200 text-[10px] font-mono tracking-[0.2em] text-slate-500">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: activeThemeConfig.accent }}
          />
          <span className="font-semibold text-slate-700">CONTINUUM ACTIVE</span>
          <span className="text-slate-400 font-bold">/</span>
          <span style={{ color: activeThemeConfig.accent }} className="font-medium">DAS 1550nm</span>
        </div>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] font-mono tracking-[0.2em] text-slate-600 uppercase">
        <a
          href="#intelligence"
          id="nav-link-intelligence"
          className="hover:text-slate-900 transition-colors duration-200"
        >
          <span>01 INTELLIGENCE</span>
        </a>
        <a
          href="#perception"
          id="nav-link-perception"
          className="hover:text-slate-900 transition-colors duration-200"
        >
          <span>02 PERCEPTION</span>
        </a>
        <a
          href="#simulation"
          id="nav-link-simulation"
          className="hover:text-slate-900 transition-colors duration-200"
        >
          <span>03 SIMULATOR</span>
        </a>
        <a
          href="#environments"
          id="nav-link-environments"
          className="hover:text-slate-900 transition-colors duration-200"
        >
          <span>04 MATRICES</span>
        </a>
      </nav>

      {/* Right Controls: Theme Selector + Audio + Access CTA */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Pastel Theme Selector Dropdown / Pill */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker((prev) => !prev)}
            id="theme-picker-btn"
            aria-label="Change Pastel Theme"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-700 text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shadow-inner border border-black/10"
              style={{ backgroundColor: activeThemeConfig.dotColor }}
            />
            <span className="hidden sm:inline font-medium uppercase">{activeThemeConfig.name}</span>
            <svg className="w-3 h-3 text-slate-400 ml-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Theme Dropdown Menu */}
          {showThemePicker && (
            <div
              className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setShowThemePicker(false)}
            >
              <div className="px-3 py-1 text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase border-b border-slate-100">
                PASTEL THEMES
              </div>
              {themeList.map((tId) => {
                const conf = PASTEL_THEMES[tId];
                const isSelected = currentTheme === tId;
                return (
                  <button
                    key={tId}
                    onClick={() => {
                      onSelectTheme(tId);
                      setShowThemePicker(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono tracking-wide text-left transition-colors cursor-pointer ${
                      isSelected ? 'bg-slate-50 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: conf.dotColor }}
                      />
                      <span>{conf.name}</span>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.accent }} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sensory Sound Toggle with Live Waveform Bars */}
        <button
          onClick={handleToggleAudio}
          id="audio-toggle-btn"
          aria-label={isMuted ? 'Enable sensory acoustic feedback' : 'Mute sensory audio'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white/90 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer shadow-sm"
        >
          {/* Custom SVG Audio Level Meter */}
          <div className="flex items-end gap-[2px] h-3 w-3.5">
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-300' : 'h-3 animate-pulse'
              }`}
              style={{ backgroundColor: isMuted ? undefined : activeThemeConfig.accent }}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-300' : 'h-2'
              }`}
              style={{
                backgroundColor: isMuted ? undefined : activeThemeConfig.accent,
                animationDelay: '0.15s',
              }}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isMuted ? 'h-1 bg-slate-300' : 'h-3.5 animate-pulse'
              }`}
              style={{
                backgroundColor: isMuted ? undefined : activeThemeConfig.accent,
                animationDelay: '0.3s',
              }}
            />
          </div>
          <span className="text-[9.5px] font-mono tracking-wider uppercase hidden sm:inline">
            {isMuted ? 'OFF' : 'AUDIO'}
          </span>
        </button>

        {/* Priority Access Request Button */}
        <button
          onClick={onScrollToSignup}
          id="nav-coming-soon-btn"
          className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
          style={{
            backgroundColor: activeThemeConfig.accent,
            color: '#FFFFFF',
          }}
        >
          <span>REQUEST ACCESS</span>
        </button>
      </div>
    </header>
  );
};
