import React, { useEffect, useState } from 'react';
import { TelemetryState } from '../types';

interface TelemetryHUDProps {
  telemetry: TelemetryState;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ telemetry }) => {
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
  const [lastMessageTime, setLastMessageTime] = useState(0);

  useEffect(() => {
    // When movement or speed spikes, trigger an intelligent micro-system message
    const now = Date.now();
    if (telemetry.speed > 25 && now - lastMessageTime > 2400) {
      const messages = [
        'DISTURBANCE DETECTED',
        'ANALYSING FREQUENCY SIGNATURE...',
        'HUMAN MOVEMENT IDENTIFIED',
        'SPATIAL CONTINUUM DISRUPTION',
        'OPTICAL PHASE COHERENCE TRACKED',
        'VELOCITY VECTOR MONITORED',
      ];
      const selected = messages[Math.floor(Math.random() * messages.length)];
      setVisibleMessage(selected);
      setLastMessageTime(now);

      const timer = setTimeout(() => {
        setVisibleMessage(null);
      }, 2600);

      return () => clearTimeout(timer);
    }
  }, [telemetry.speed, lastMessageTime]);

  return (
    <>
      {/* Floating System Disturbance Alert Badge (Appears dynamically) */}
      <div
        id="telemetry-toast-hud"
        className={`fixed bottom-6 left-6 z-40 transition-all duration-500 transform ${
          visibleMessage
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-sky-500/40 bg-[#040812]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(56,189,248,0.2)] corner-brackets">
          <div className="relative flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" />
              <circle cx="8" cy="8" r="2" fill="currentColor" />
            </svg>
            <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8.5px] font-mono tracking-[0.25em] text-sky-400 uppercase font-bold">
              SHOMER SENSING SYSTEM
            </span>
            <span className="text-xs font-mono tracking-wider text-slate-100 font-semibold">
              {visibleMessage}
            </span>
          </div>
        </div>
      </div>

      {/* Persistent Bottom-Right Minimalist Telemetry Bar */}
      <aside
        id="telemetry-status-panel"
        aria-label="Real-time Sensing Telemetry"
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-4 px-4 py-2 rounded-xl border border-white/[0.08] bg-[#010306]/95 backdrop-blur-xl text-[10px] font-mono text-slate-400 shadow-2xl corner-brackets"
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              telemetry.speed > 5 ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-600'
            }`}
          />
          <span className="text-slate-200 font-medium">
            X:{telemetry.x.toString().padStart(4, '0')} Y:{telemetry.y.toString().padStart(4, '0')}
          </span>
        </div>

        <div className="h-3 w-[1px] bg-white/[0.08]" />

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">VELOCITY:</span>
          <span className="text-sky-400 tabular-nums font-bold">{telemetry.speed} px/s</span>
        </div>

        <div className="h-3 w-[1px] bg-white/[0.08]" />

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">STRAIN:</span>
          <span className="text-slate-200 tabular-nums font-medium">{(telemetry.strainReading * 100).toFixed(2)} µε</span>
        </div>
      </aside>
    </>
  );
};
