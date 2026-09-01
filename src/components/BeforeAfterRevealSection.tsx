import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SlidersHorizontal, Eye, Shield, Activity, Radio, AlertCircle } from 'lucide-react';
import { sensingAudio } from '../utils/audio';

export const BeforeAfterRevealSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    sensingAudio.playPing(900, 0.1, 0.05);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section
      id="perception"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-28 border-t border-slate-900/80 bg-[#030609] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-[10px] font-mono tracking-[0.25em] text-cyan-300 uppercase mb-4">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>INTERACTIVE PERCEPTION SCAN</span>
          </div>

          <h2
            id="perception-headline"
            className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.08em] text-white leading-tight uppercase mb-4"
          >
            WHAT YOU SEE ISN&apos;T EVERYTHING.
          </h2>

          <p className="text-base sm:text-lg text-slate-400 font-light tracking-wide uppercase">
            Drag the slider to reveal the invisible intelligent sensing matrix.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          id="reveal-slider-stage"
          className="relative w-full h-[420px] sm:h-[520px] md:h-[580px] rounded-2xl border border-slate-800 bg-[#071018] overflow-hidden select-none cursor-ew-resize shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* ================= LAYER A: WHAT YOU SEE (Normal Darkness) ================= */}
          <div className="absolute inset-0 bg-[#071018] flex items-center justify-center overflow-hidden">
            {/* Dark Landscape Blueprint SVG */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Subtle mountain/terrain contour */}
              <path
                d="M0,450 Q300,420 600,440 T1200,430 L1200,600 L0,600 Z"
                fill="#050b11"
              />
              <path
                d="M0,480 Q400,460 800,475 T1200,470 L1200,600 L0,600 Z"
                fill="#030609"
              />

              {/* Perimeter Fence Line (Dark & subtle) */}
              <line x1="100" y1="460" x2="1100" y2="460" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
              {[150, 300, 450, 600, 750, 900, 1050].map((px) => (
                <line key={px} x1={px} y1="430" x2={px} y2="460" stroke="#334155" strokeWidth="2" />
              ))}

              {/* Remote facility tower silhouette */}
              <rect x="850" y="320" width="40" height="110" fill="#0c1520" />
              <polygon points="840,320 870,290 900,320" fill="#0c1520" />
              <rect x="868" y="300" width="4" height="4" fill="#64748b" opacity="0.4" />

              {/* Dark silent landscape elements */}
              <circle cx="380" cy="450" r="8" fill="#0f172a" />
              <circle cx="520" cy="455" r="12" fill="#0f172a" />
            </svg>

            {/* Top Label */}
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-slate-800 bg-[#030609]/90 text-slate-400 text-xs font-mono tracking-widest uppercase">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>WHAT YOU SEE — SILENT PERIMETER</span>
            </div>

            <div className="absolute bottom-6 left-6 text-slate-500 text-xs font-mono tracking-widest uppercase">
              STATUS: VISUALLY CLEAR / NO APPARENT ACTIVITY
            </div>
          </div>

          {/* ================= LAYER B: WHAT SHOMER SEES (Intelligent Sensing Layer) ================= */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
          >
            <div className="absolute inset-0 bg-[#050e18] flex items-center justify-center">
              {/* Intelligent Sensing Grid & Fiber Optical Overlay SVG */}
              <svg
                className="absolute inset-0 w-full h-full object-cover"
                viewBox="0 0 1200 600"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Dark terrain base */}
                <path
                  d="M0,450 Q300,420 600,440 T1200,430 L1200,600 L0,600 Z"
                  fill="#06121d"
                />

                {/* Intelligent Fiber-Optic Cable Line with dynamic laser pulses */}
                <line
                  x1="100"
                  y1="460"
                  x2="1100"
                  y2="460"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  className="filter drop-shadow-[0_0_10px_#38bdf8]"
                />

                {/* Subsurface Sensing Nodes along the fiber */}
                {[150, 300, 450, 600, 750, 900, 1050].map((px, idx) => (
                  <g key={px}>
                    <line x1={px} y1="420" x2={px} y2="460" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle cx={px} cy="460" r="4" fill="#38bdf8" className="animate-pulse" />
                    {/* Concentric vibration rings at active sensors */}
                    {idx === 2 || idx === 3 ? (
                      <>
                        <circle cx={px} cy="460" r="24" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.6" />
                        <circle cx={px} cy="460" r="48" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.3" />
                      </>
                    ) : null}
                  </g>
                ))}

                {/* DETECTED INTRUSION & MOVEMENT SIGNATURE (Target at x=480, y=430) */}
                <g className="animate-pulse">
                  {/* Acoustic Footstep Ripples */}
                  <ellipse cx="480" cy="450" rx="36" ry="14" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.5" />
                  <ellipse cx="480" cy="450" rx="70" ry="26" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

                  {/* Target Vector & Reticle */}
                  <line x1="480" y1="410" x2="480" y2="450" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="480" cy="410" r="6" fill="#030609" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="470" y1="410" x2="490" y2="410" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="480" y1="400" x2="480" y2="420" stroke="#38bdf8" strokeWidth="1" />

                  {/* Target telemetry label */}
                  <rect x="500" y="380" width="170" height="46" rx="4" fill="#071018" stroke="#38bdf8" strokeWidth="1" opacity="0.95" />
                  <text x="510" y="398" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                    TARGET: BIPEDAL INTRUSION
                  </text>
                  <text x="510" y="414" fill="#cbd5e1" fontSize="9" fontFamily="monospace" letterSpacing="0.5">
                    VEL: 1.6 m/s | STRAIN: 0.18 µε
                  </text>
                </g>

                {/* Environmental Micro-seismic contours */}
                <path
                  d="M150,470 Q300,490 450,475 T750,480 T1050,470"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.4"
                />

                {/* Facility sensor status marker */}
                <g transform="translate(850, 320)">
                  <rect width="40" height="110" fill="#0a1a2b" stroke="#38bdf8" strokeWidth="1" />
                  <circle cx="20" cy="15" r="4" fill="#22c55e" className="animate-ping" />
                  <text x="-40" y="-10" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                    NODE #89 — ONLINE
                  </text>
                </g>
              </svg>

              {/* Top Right Label */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-cyan-500/50 bg-cyan-950/80 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>WHAT SHOMER SEES — LIVE INTELLIGENT FIELD</span>
              </div>

              {/* Bottom Right Telemetry */}
              <div className="absolute bottom-6 right-6 flex items-center gap-4 text-cyan-400 text-xs font-mono tracking-widest uppercase bg-[#030609]/80 px-3 py-1.5 rounded border border-cyan-500/20">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  DAS SENSING: ACTIVE
                </span>
                <span>ACCURACY: 99.9%</span>
              </div>
            </div>
          </div>

          {/* ================= SLIDER DIVIDER LINE & HANDLE ================= */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-30 pointer-events-none shadow-[0_0_12px_#38bdf8]"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Circular Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-cyan-300 bg-[#030609] flex items-center justify-center shadow-[0_0_20px_#38bdf8]">
              <SlidersHorizontal className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* Quick Position Jump Buttons */}
        <div className="mt-8 flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-slate-400">
          <span>REVEAL LEVEL:</span>
          <button
            onClick={() => {
              setSliderPos(0);
              sensingAudio.playPing(800, 0.1, 0.05);
            }}
            className={`px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
              sliderPos === 0 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-slate-800 hover:border-slate-600'
            }`}
          >
            100% SENSING
          </button>
          <button
            onClick={() => {
              setSliderPos(50);
              sensingAudio.playPing(1000, 0.1, 0.05);
            }}
            className={`px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
              sliderPos === 50 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-slate-800 hover:border-slate-600'
            }`}
          >
            SPLIT (50%)
          </button>
          <button
            onClick={() => {
              setSliderPos(100);
              sensingAudio.playPing(1200, 0.1, 0.05);
            }}
            className={`px-3 py-1 rounded border transition-all duration-200 cursor-pointer ${
              sliderPos === 100 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-slate-800 hover:border-slate-600'
            }`}
          >
            OPTICAL BLIND
          </button>
        </div>
      </div>
    </section>
  );
};
