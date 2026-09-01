import React, { useState } from 'react';
import { sensingAudio } from '../utils/audio';

interface MultipleEnvironmentsSectionProps {
  onScrollToSignup: () => void;
}

export const MultipleEnvironmentsSection: React.FC<MultipleEnvironmentsSectionProps> = ({
  onScrollToSignup,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const environments = [
    {
      id: 'perimeters',
      number: '01',
      title: 'PERIMETERS',
      category: 'BORDER & MILITARY BASES',
      description: 'Zero blind-spot intrusion detection across boundary fence lines and unpopulated desert perimeters.',
      telemetry: 'STRAIN: 0.005 µε',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L2 4V8C2 11.5 4.5 14.5 8 15.5C11.5 14.5 14 11.5 14 8V4L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
      ),
      gradient: 'from-sky-950/40 via-[#040812] to-[#010306]',
    },
    {
      id: 'railways',
      number: '02',
      title: 'RAILWAYS',
      category: 'HIGH-SPEED CORRIDORS',
      description: 'Continuous monitoring of wheel-flat anomalies, track buckling, rockfalls and unauthorized track crossing.',
      telemetry: 'VELOCITY: 350 KM/H',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" strokeWidth="1.2" />
          <line x1="13" y1="2" x2="13" y2="14" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
      gradient: 'from-blue-950/40 via-[#040812] to-[#010306]',
    },
    {
      id: 'pipelines',
      number: '03',
      title: 'PIPELINES',
      category: 'ENERGY TRANSPORT',
      description: 'Instant detection of manual hot-tapping, heavy machinery excavation, and ground slope destabilization.',
      telemetry: 'REACH: 100+ KM',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <ellipse cx="8" cy="4" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="4" x2="2" y2="12" stroke="currentColor" strokeWidth="1.2" />
          <line x1="14" y1="4" x2="14" y2="12" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="8" cy="12" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
      gradient: 'from-sky-900/30 via-[#040812] to-[#010306]',
    },
    {
      id: 'forests',
      number: '04',
      title: 'FORESTS',
      category: 'CRITICAL ECOLOGY',
      description: 'Acoustic sensing for illegal deforestation, chainsaws, vehicle entry, and early seismic thermal shifts.',
      telemetry: 'BAND: 0.1 - 50 kHz',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L3 8H6L4 12H12L10 8H13L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <line x1="8" y1="12" x2="8" y2="15" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
      gradient: 'from-emerald-950/30 via-[#040812] to-[#010306]',
    },
    {
      id: 'infrastructure',
      number: '05',
      title: 'INFRASTRUCTURE',
      category: 'SOVEREIGN DATA VAULTS',
      description: 'Structural health monitoring of bridges, nuclear cooling arrays, dams, and sovereign data campuses.',
      telemetry: 'COHERENCE: 99.999%',
      renderGlyph: () => (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" />
          <circle cx="5" cy="5.5" r="0.75" fill="currentColor" />
          <circle cx="5" cy="10.5" r="0.75" fill="currentColor" />
        </svg>
      ),
      gradient: 'from-slate-900/50 via-[#040812] to-[#010306]',
    },
  ];

  const handleCardHover = (id: string) => {
    setHoveredCard(id);
    sensingAudio.playPing(1050, 0.08, 0.03);
  };

  return (
    <section
      id="environments"
      className="relative py-28 px-6 md:px-12 bg-[#010306] border-t border-white/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase font-semibold">
            [ 04 // OPERATIONAL SPECTRUM ]
          </span>
          <h2
            id="environments-heading"
            className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase"
          >
            MULTIPLE ENVIRONMENTS.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-sky-200 to-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.2)]">
              ONE INTELLIGENT SYSTEM.
            </span>
          </h2>
          <p className="max-w-xl text-sm text-slate-400 font-normal leading-relaxed">
            A single passive fiber-optic strand transforms linear infrastructure into an intelligent, self-aware acoustic sensing network.
          </p>
        </div>

        {/* 5 Tall Cinematic Environment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {environments.map((env) => {
            const isHovered = hoveredCard === env.id;

            return (
              <div
                key={env.id}
                onMouseEnter={() => handleCardHover(env.id)}
                onMouseLeave={() => setHoveredCard(null)}
                id={`env-card-${env.id}`}
                className={`group relative h-[470px] rounded-2xl border p-6 flex flex-col justify-between transition-all duration-500 overflow-hidden cursor-pointer backdrop-blur-2xl corner-brackets ${
                  isHovered
                    ? 'border-sky-400 -translate-y-2 bg-[#060e1c] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(56,189,248,0.2)]'
                    : 'border-white/[0.08] bg-[#040812]/95 hover:border-sky-500/50'
                }`}
              >
                {/* Background Cinematic Abstract Atmosphere */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${env.gradient} opacity-70 transition-opacity duration-500`}
                />

                {/* Sensing Network Grid Overlay on Hover */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <svg className="w-full h-full opacity-20" preserveAspectRatio="none">
                    <defs>
                      <pattern id={`grid-${env.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${env.id})`} />
                  </svg>

                  {/* Traveling Sensing Pulse Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_12px_#38bdf8] animate-[pulse_2s_infinite]" />
                </div>

                {/* Top Card Meta */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 font-bold">
                    {env.number}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors duration-300 ${
                      isHovered
                        ? 'border-sky-400 bg-sky-950/60 text-sky-300'
                        : 'border-white/[0.08] bg-[#010306]/80 text-slate-400'
                    }`}
                  >
                    {env.renderGlyph()}
                  </div>
                </div>

                {/* Center Abstract Wireframe Representation */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <span
                      className={`absolute inset-0 rounded-full border border-sky-500/20 transition-all duration-700 ${
                        isHovered ? 'scale-125 border-sky-400/50' : ''
                      }`}
                    />
                    <span
                      className={`absolute w-12 h-12 rounded-full border border-sky-500/30 ${
                        isHovered ? 'animate-ping' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    />
                    <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 space-y-2.5">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 block uppercase font-medium">
                    {env.category}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase group-hover:text-sky-200 transition-colors">
                    {env.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    {env.description}
                  </p>
                  <div className="pt-2 border-t border-white/[0.08] text-[9.5px] font-mono text-sky-300 font-semibold">
                    {env.telemetry}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Outlined Action Button */}
        <div className="flex justify-center pt-6">
          <button
            onClick={onScrollToSignup}
            id="explore-capabilities-btn"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/50 hover:border-sky-400 text-xs font-mono tracking-[0.22em] text-sky-200 uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.15)] cursor-pointer corner-brackets font-semibold"
          >
            <span>REQUEST SYSTEM SPECIFICATION</span>
            <svg className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
