import React, { useState } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface NervousSystemSectionProps {
  onScrollToSignup: () => void;
  themeId?: PastelThemeId;
}

interface SystemNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  connectedTo: string[];
}

export const NervousSystemSection: React.FC<NervousSystemSectionProps> = ({
  onScrollToSignup,
  themeId = 'sky',
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>('node-center');
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  const nodes: SystemNode[] = [
    {
      id: 'node-center',
      name: 'OPTICAL CORE ENGINE',
      category: 'INTERFEROMETRIC INTERROGATOR',
      x: 50,
      y: 48,
      connectedTo: ['node-perimeter', 'node-railway', 'node-pipeline', 'node-facility', 'node-subsea'],
    },
    {
      id: 'node-perimeter',
      name: 'TACTICAL PERIMETER GRID',
      category: 'ACOUSTIC BOUNDARY ARRAY',
      x: 22,
      y: 28,
      connectedTo: ['node-center', 'node-facility'],
    },
    {
      id: 'node-railway',
      name: 'HIGH-SPEED RAIL MATRIX',
      category: 'DYNAMIC TRACK STRAIN',
      x: 78,
      y: 26,
      connectedTo: ['node-center', 'node-facility'],
    },
    {
      id: 'node-pipeline',
      name: 'TRANS-ENERGY PIPELINE',
      category: 'PASSIVE SEISMIC TRANSDUCTION',
      x: 24,
      y: 72,
      connectedTo: ['node-center', 'node-subsea'],
    },
    {
      id: 'node-facility',
      name: 'DATA CAMPUS VAULT',
      category: 'SUB-SURFACE VIBRATION VAULT',
      x: 76,
      y: 70,
      connectedTo: ['node-center', 'node-railway'],
    },
    {
      id: 'node-subsea',
      name: 'SUBSEA LINK',
      category: 'DEEP OCEAN TRANSLATION',
      x: 50,
      y: 84,
      connectedTo: ['node-center', 'node-pipeline'],
    },
  ];

  const handleNodeHover = (node: SystemNode) => {
    setActiveNodeId(node.id);
    sensingAudio.playPing(1250, 0.1, 0.04);
  };

  const handleDiscoverClick = () => {
    sensingAudio.playScan();
    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: {
          x: window.innerWidth * 0.5,
          y: window.innerHeight * 0.5,
          maxRadius: 600,
          opacity: 0.9,
          speed: 4.8,
          count: 4,
          stagger: 120,
          type: 'escalate',
        },
      })
    );
    onScrollToSignup();
  };

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  return (
    <section
      id="nervous-system"
      className="relative min-h-[90vh] py-20 sm:py-28 px-4 sm:px-8 md:px-12 border-t border-slate-200/80 select-none overflow-hidden flex flex-col justify-between"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12 sm:space-y-16">
        {/* Section Top Header */}
        <div className="max-w-3xl space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm"
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
          >
            <span>05 // SYNAPSE ARCHITECTURE</span>
          </div>
          <h2
            id="nervous-system-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 uppercase leading-[1.06]"
          >
            WHAT IF YOUR INFRASTRUCTURE{' '}
            <span style={{ color: theme.accent }}>
              COULD FEEL?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
            SHOMER creates an invisible nervous system across your infrastructure. Laser pulses travel
            through ordinary dark fibers, resolving subtle ground strains and acoustic signatures in real time.
          </p>
        </div>

        {/* The Interactive Nervous System Mesh Stage */}
        <div className="relative w-full h-[460px] sm:h-[540px] rounded-2xl pastel-card overflow-hidden shadow-lg pastel-corners">
          {/* SVG Canvas for Interconnecting Glowing Fiber Synaptic Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Connection Lines between nodes */}
            {nodes.map((node) =>
              node.connectedTo.map((targetId) => {
                const target = nodes.find((n) => n.id === targetId);
                if (!target) return null;
                const isConnectedToActive =
                  node.id === activeNodeId || target.id === activeNodeId;

                return (
                  <g key={`${node.id}-${target.id}`}>
                    {/* Base Fiber Path */}
                    <line
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isConnectedToActive ? theme.accent : '#CBD5E1'}
                      strokeWidth={isConnectedToActive ? 2 : 1}
                      strokeOpacity={isConnectedToActive ? 0.9 : 0.4}
                      className="transition-all duration-300"
                    />

                    {/* Animated Light Pulses travelling on active lines */}
                    {isConnectedToActive && (
                      <circle r="3.5" fill={theme.accent}>
                        <animate
                          attributeName="cx"
                          from={`${node.x}%`}
                          to={`${target.x}%`}
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          from={`${node.y}%`}
                          to={`${target.y}%`}
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })
            )}
          </svg>

          {/* Interactive Synaptic Nodes */}
          {nodes.map((node) => {
            const isActive = node.id === activeNodeId;
            const isCenter = node.id === 'node-center';

            return (
              <div
                key={node.id}
                onMouseEnter={() => handleNodeHover(node)}
                onClick={() => handleNodeHover(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  {/* Concentric rings */}
                  <span
                    className={`absolute rounded-full border transition-all duration-500 ${
                      isActive
                        ? isCenter
                          ? 'w-20 h-20 animate-ping'
                          : 'w-14 h-14 animate-ping'
                        : 'w-6 h-6 border-slate-200'
                    }`}
                    style={
                      isActive
                        ? { borderColor: theme.accent, animationDuration: '2.5s' }
                        : undefined
                    }
                  />
                  <span
                    className={`absolute rounded-full border ${
                      isActive ? 'w-10 h-10 animate-pulse' : 'w-5 h-5'
                    }`}
                    style={isActive ? { borderColor: theme.accent } : undefined}
                  />

                  {/* Core Node Dot */}
                  <div
                    className={`rounded-full transition-all duration-300 shadow-sm ${
                      isCenter
                        ? 'w-4 h-4'
                        : isActive
                        ? 'w-3 h-3'
                        : 'w-2.5 h-2.5 bg-slate-400 group-hover:scale-125'
                    }`}
                    style={
                      isActive || isCenter
                        ? { backgroundColor: theme.accent }
                        : undefined
                    }
                  />
                </div>

                {/* Node Text Label (Floating) */}
                <div
                  className={`mt-2.5 px-3 py-1 rounded-lg border text-center transition-all duration-300 whitespace-nowrap shadow-sm ${
                    isActive
                      ? 'border-2 font-bold'
                      : 'border-slate-200 bg-white/90 text-slate-500 opacity-80 group-hover:opacity-100'
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: theme.accent,
                          backgroundColor: theme.badgeBg,
                          color: theme.badgeText,
                        }
                      : undefined
                  }
                >
                  <span className="text-[9px] font-mono tracking-wider uppercase block">
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Active Synapse HUD Telemetry Card (Bottom Left inside stage) */}
          <div className="absolute bottom-5 left-5 z-30 max-w-xs sm:max-w-sm p-4 sm:p-5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-md">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase mb-1 font-semibold" style={{ color: theme.accent }}>
              <span className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: theme.accent }} />
              <span>ACTIVE SYNAPSE NODE</span>
            </div>
            <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 tracking-tight uppercase">
              {activeNode.name}
            </h4>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              PROTOCOL: {activeNode.category}
            </div>
            <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-100 text-[10px] font-mono text-slate-600">
              <span>LATENCY: 0.12ms</span>
              <span>CHANNELS: 4096</span>
              <span className="font-semibold text-emerald-600">SYNCED</span>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            ZERO SPECIALIZED SENSORS • POWERED ENTIRELY BY PASSIVE FIBER-OPTICS
          </p>

          <button
            onClick={handleDiscoverClick}
            id="discover-system-btn"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap font-semibold"
            style={{
              borderColor: theme.accent,
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
            }}
          >
            <span>DISCOVER THE ARCHITECTURE</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              style={{ color: theme.accent }}
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
