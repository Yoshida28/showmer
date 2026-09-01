import React, { useState } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface MultipleEnvironmentsSectionProps {
  onScrollToSignup: () => void;
  themeId?: PastelThemeId;
}

export const MultipleEnvironmentsSection: React.FC<MultipleEnvironmentsSectionProps> = ({
  onScrollToSignup,
  themeId = 'sky',
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  const environments = [
    {
      id: 'perimeters',
      number: '01',
      title: 'PERIMETERS',
      category: 'BORDER & BASES',
      description: 'Zero blind-spot intrusion detection across boundary fence lines and unpopulated desert perimeters.',
      telemetry: 'STRAIN: 0.005 µε',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L2 4V8C2 11.5 4.5 14.5 8 15.5C11.5 14.5 14 11.5 14 8V4L8 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'railways',
      number: '02',
      title: 'RAILWAYS',
      category: 'HIGH-SPEED TRANSIT',
      description: 'Continuous monitoring of wheel-flat anomalies, track buckling, rockfalls and unauthorized crossing.',
      telemetry: 'VELOCITY: 350 KM/H',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" strokeWidth="1.3" />
          <line x1="13" y1="2" x2="13" y2="14" stroke="currentColor" strokeWidth="1.3" />
          <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.3" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.3" />
          <line x1="1" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
    {
      id: 'pipelines',
      number: '03',
      title: 'PIPELINES',
      category: 'ENERGY ARTERIES',
      description: 'Instant detection of manual hot-tapping, heavy machinery excavation, and ground slope destabilization.',
      telemetry: 'REACH: 100+ KM',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <ellipse cx="8" cy="4" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.3" />
          <line x1="2" y1="4" x2="2" y2="12" stroke="currentColor" strokeWidth="1.3" />
          <line x1="14" y1="4" x2="14" y2="12" stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx="8" cy="12" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
    {
      id: 'forests',
      number: '04',
      title: 'FORESTS',
      category: 'CONSERVATION',
      description: 'Acoustic sensing for illegal deforestation, chainsaws, vehicle entry, and early seismic thermal shifts.',
      telemetry: 'BAND: 0.1 - 50 kHz',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L3 8H6L4 12H12L10 8H13L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <line x1="8" y1="12" x2="8" y2="15" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
    {
      id: 'infrastructure',
      number: '05',
      title: 'STRUCTURES',
      category: 'CAMPUSES & VAULTS',
      description: 'Structural health monitoring of bridges, nuclear cooling arrays, dams, and sovereign data campuses.',
      telemetry: 'COHERENCE: 99.99%',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="5" cy="5.5" r="0.75" fill="currentColor" />
          <circle cx="5" cy="10.5" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const handleCardHover = (id: string) => {
    setHoveredCard(id);
    sensingAudio.playPing(1050, 0.08, 0.03);
  };

  return (
    <section
      id="environments"
      className="relative py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-slate-200/80 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          >
            <span>04 // OPERATIONAL SPECTRUM</span>
          </div>
          <h2
            id="environments-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase"
          >
            MULTIPLE ENVIRONMENTS.{' '}
            <span style={{ color: theme.accent }}>
              ONE INTELLIGENT SYSTEM.
            </span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            A single passive fiber-optic strand transforms linear infrastructure into an intelligent, self-aware acoustic sensing network.
          </p>
        </div>

        {/* 5 Clean Minimalist Environment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {environments.map((env) => {
            const isHovered = hoveredCard === env.id;

            return (
              <div
                key={env.id}
                onMouseEnter={() => handleCardHover(env.id)}
                onMouseLeave={() => setHoveredCard(null)}
                id={`env-card-${env.id}`}
                className={`group relative h-[420px] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden cursor-pointer pastel-card pastel-corners ${
                  isHovered ? '-translate-y-1.5 shadow-lg border-2' : ''
                }`}
                style={
                  isHovered
                    ? { borderColor: theme.accent, backgroundColor: theme.cardHover }
                    : undefined
                }
              >
                {/* Top Card Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold" style={{ color: theme.accent }}>
                    {env.number}
                  </span>
                  <div
                    className="w-8 h-8 rounded-xl border flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: isHovered ? theme.badgeBg : '#F8FAFC',
                      borderColor: isHovered ? theme.accent : '#E2E8F0',
                      color: isHovered ? theme.accent : '#64748B',
                    }}
                  >
                    {env.renderGlyph()}
                  </div>
                </div>

                {/* Center Abstract Wireframe Representation */}
                <div className="my-auto flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <span
                      className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                        isHovered ? 'scale-125' : ''
                      }`}
                      style={{ borderColor: theme.accentLight }}
                    />
                    <span
                      className={`absolute w-10 h-10 rounded-full border ${
                        isHovered ? 'animate-ping' : ''
                      }`}
                      style={{ borderColor: theme.accent, animationDuration: '3s' }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-wider text-slate-400 block uppercase font-medium">
                    {env.category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 uppercase">
                    {env.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-3">
                    {env.description}
                  </p>
                  <div
                    className="pt-2 border-t border-slate-100 text-[10px] font-mono font-semibold"
                    style={{ color: theme.accent }}
                  >
                    {env.telemetry}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onScrollToSignup}
            id="explore-capabilities-btn"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer font-semibold"
            style={{
              borderColor: theme.accent,
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
            }}
          >
            <span>REQUEST SYSTEM SPECIFICATION</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              style={{ color: theme.accent }}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
