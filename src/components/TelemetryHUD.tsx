import React, { useEffect, useState } from 'react';
import { PastelThemeId, TelemetryState } from '../types';
import { PASTEL_THEMES } from '../utils/themes';

interface TelemetryHUDProps {
  telemetry: TelemetryState;
  themeId?: PastelThemeId;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  telemetry,
  themeId = 'sky',
}) => {
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

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
        className={`fixed bottom-5 left-5 z-40 transition-all duration-300 transform ${
          visibleMessage
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-md pastel-corners">
          <div className="relative flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 animate-spin"
              style={{ color: theme.accent, animationDuration: '4s' }}
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 2" />
              <circle cx="8" cy="8" r="2" fill="currentColor" />
            </svg>
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: theme.accent }}
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[8.5px] font-mono tracking-[0.2em] uppercase font-bold"
              style={{ color: theme.accent }}
            >
              SHOMER SENSING
            </span>
            <span className="text-xs font-mono tracking-wide text-slate-800 font-semibold">
              {visibleMessage}
            </span>
          </div>
        </div>
      </div>

      {/* Persistent Bottom-Right Minimalist Telemetry Bar */}
      <aside
        id="telemetry-status-panel"
        aria-label="Real-time Sensing Telemetry"
        className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-3.5 px-3.5 py-1.5 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xl text-[10px] font-mono text-slate-600 shadow-sm pastel-corners"
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: telemetry.speed > 5 ? theme.accent : '#CBD5E1',
            }}
          />
          <span className="text-slate-800 font-medium">
            X:{telemetry.x.toString().padStart(4, '0')} Y:{telemetry.y.toString().padStart(4, '0')}
          </span>
        </div>

        <div className="h-3 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">VELOCITY:</span>
          <span className="tabular-nums font-bold" style={{ color: theme.accent }}>
            {telemetry.speed} px/s
          </span>
        </div>

        <div className="h-3 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">STRAIN:</span>
          <span className="text-slate-800 tabular-nums font-medium">
            {(telemetry.strainReading * 100).toFixed(2)} µε
          </span>
        </div>
      </aside>
    </>
  );
};
