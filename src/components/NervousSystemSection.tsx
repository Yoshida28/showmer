import React, { useState } from 'react';
import { sensingAudio } from '../utils/audio';

interface NervousSystemSectionProps {
  onScrollToSignup: () => void;
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
}) => {
  const [activeNodeId, setActiveNodeId] = useState<string | null>('node-center');

  const nodes: SystemNode[] = [
    {
      id: 'node-center',
      name: 'SHOMER OPTICAL CORE ENGINE',
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
      name: 'SOVEREIGN DATA CAMPUS',
      category: 'SUB-SURFACE VIBRATION VAULT',
      x: 76,
      y: 70,
      connectedTo: ['node-center', 'node-railway'],
    },
    {
      id: 'node-subsea',
      name: 'INTERCONTINENTAL SUBSEA LINK',
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
      className="relative min-h-screen py-28 px-6 md:px-12 bg-[#010306] border-t border-white/[0.06] select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Background Subtle Cybernetic Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,24,44,0.3)_0%,rgba(1,3,6,0.98)_75%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        {/* Section Top Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase font-semibold">
            [ 05 // SYNAPSE ARCHITECTURE ]
          </span>
          <h2
            id="nervous-system-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.04]"
          >
            WHAT IF YOUR WORLD{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-sky-200 to-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.2)]">
              COULD FEEL?
            </span>
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal tracking-wide max-w-2xl leading-relaxed">
            SHOMER creates an invisible nervous system across your critical infrastructure. Laser pulses travel
            through glass fibers, interpreting physical disturbances with sub-millisecond fidelity.
          </p>
        </div>

        {/* The Interactive Nervous System Mesh Stage */}
        <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl border border-white/[0.08] bg-[#040812]/95 backdrop-blur-2xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] corner-brackets">
          {/* SVG Canvas for Interconnecting Glowing Fiber Synaptic Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="fiberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0e7490" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Connection Lines between nodes */}
            {nodes.map((node) =>
              node.connectedTo.map((targetId) => {
                const target = nodes.find((n) => n.id === targetId);
                if (!target) return null;
                const isConnectedToActive =
                  node.id === activeNodeId || target.id === activeNodeId;

                return (
                  <g key={`${node.id}-${target.id}`}>
                    {/* Base Faint Fiber Path */}
                    <line
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={isConnectedToActive ? '#38bdf8' : '#1e293b'}
                      strokeWidth={isConnectedToActive ? 1.8 : 0.8}
                      strokeOpacity={isConnectedToActive ? 0.85 : 0.25}
                      className="transition-all duration-500"
                    />

                    {/* Animated Light Pulses travelling on active lines */}
                    {isConnectedToActive && (
                      <circle r="3" fill="#ffffff">
                        <animate
                          attributeName="cx"
                          from={`${node.x}%`}
                          to={`${target.x}%`}
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          from={`${node.y}%`}
                          to={`${target.y}%`}
                          dur="2.4s"
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
                    className={`absolute rounded-full border transition-all duration-700 ${
                      isActive
                        ? isCenter
                          ? 'w-24 h-24 border-sky-400/60 animate-ping'
                          : 'w-16 h-16 border-sky-400/50 animate-ping'
                        : 'w-8 h-8 border-white/10'
                    }`}
                  />
                  <span
                    className={`absolute rounded-full border border-sky-400/40 ${
                      isActive ? 'w-12 h-12 animate-pulse' : 'w-6 h-6'
                    }`}
                  />

                  {/* Core Node Dot */}
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isCenter
                        ? 'w-4 h-4 bg-sky-300 shadow-[0_0_20px_#38bdf8]'
                        : isActive
                        ? 'w-3 h-3 bg-sky-400 shadow-[0_0_14px_#38bdf8]'
                        : 'w-2 h-2 bg-slate-600 group-hover:bg-sky-400'
                    }`}
                  />
                </div>

                {/* Node Text Label (Floating) */}
                <div
                  className={`mt-3 px-3 py-1 rounded-lg border text-center transition-all duration-300 whitespace-nowrap backdrop-blur-md shadow-lg ${
                    isActive
                      ? 'border-sky-500/60 bg-[#040812] text-sky-200 font-bold'
                      : 'border-white/[0.08] bg-[#010306]/80 text-slate-400 opacity-70 group-hover:opacity-100 group-hover:text-slate-200'
                  }`}
                >
                  <span className="text-[9px] font-mono tracking-widest uppercase block font-semibold">
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Active Synapse HUD Telemetry Card (Bottom Left inside stage) */}
          <div className="absolute bottom-6 left-6 z-30 max-w-sm p-5 rounded-2xl border border-sky-500/30 bg-[#010306]/95 backdrop-blur-xl shadow-2xl corner-brackets">
            <div className="flex items-center gap-2 text-[10px] font-mono text-sky-400 uppercase mb-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span>ACTIVE SYNAPSE NODE</span>
            </div>
            <h4 className="font-display text-base font-bold text-white tracking-tight uppercase">
              {activeNode.name}
            </h4>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              PROTOCOL: {activeNode.category}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.08] text-[10px] font-mono text-slate-400">
              <span>LATENCY: 0.12ms</span>
              <span>CHANNELS: 4096</span>
              <span className="text-emerald-400 font-semibold">SYNCED</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            ZERO SENSOR HARDWARE DEPLOYED ALONG PERIMETER • POWERED ENTIRELY BY PASSIVE FIBER
          </p>

          <button
            onClick={handleDiscoverClick}
            id="discover-system-btn"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-sky-400 bg-sky-950/40 hover:bg-sky-900/60 text-xs font-mono tracking-[0.22em] text-white uppercase transition-all duration-300 shadow-[0_0_30px_rgba(56,189,248,0.25)] cursor-pointer whitespace-nowrap corner-brackets font-semibold"
          >
            <span>DISCOVER THE ARCHITECTURE</span>
            <svg className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
