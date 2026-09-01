import React, { useState } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';
import { sensingAudio } from '../utils/audio';

interface EmailCaptureSectionProps {
  themeId?: PastelThemeId;
}

export const EmailCaptureSection: React.FC<EmailCaptureSectionProps> = ({
  themeId = 'sky',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'signal_received' | 'connected'>('idle');
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('submitting');
    sensingAudio.playPing(1100, 0.1, 0.06);

    // Trigger full canvas pulse
    window.dispatchEvent(
      new CustomEvent('shomer:pulse', {
        detail: {
          x: window.innerWidth * 0.5,
          y: window.innerHeight * 0.7,
          maxRadius: 500,
          opacity: 0.9,
          speed: 4.5,
          type: 'escalate',
          count: 3,
          stagger: 150,
        },
      })
    );

    setTimeout(() => {
      setStatus('signal_received');
      sensingAudio.playPing(1350, 0.12, 0.08);

      setTimeout(() => {
        setStatus('connected');
        sensingAudio.playPulse(120, 0.4, 0.12);
      }, 1600);
    }, 1200);
  };

  return (
    <section
      id="signup"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-slate-200/80 select-none overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
        {/* Section Tag */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm"
          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
        >
          <span>06 // PRIORITY ACCESS</span>
        </div>

        {/* Section Headline */}
        <h2
          id="email-capture-heading"
          className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 uppercase"
        >
          BE THE FIRST{' '}
          <span style={{ color: theme.accent }}>
            TO SENSE IT.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto">
          When the global network activates, receive the first telemetry transmission. Join defense leaders, infrastructure architects, and sovereign operators.
        </p>

        {/* The Form / Interaction State */}
        <div className="pt-2 max-w-xl mx-auto">
          {status === 'idle' || status === 'submitting' ? (
            <form onSubmit={handleSubmit} className="relative group">
              <div
                className="relative flex items-center rounded-2xl border bg-white p-1.5 transition-all duration-300 shadow-md pastel-corners"
                style={{ borderColor: theme.accentLight }}
              >
                <input
                  type="email"
                  id="email-input-field"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER WORK EMAIL ADDRESS"
                  disabled={status === 'submitting'}
                  className="w-full bg-transparent px-5 py-3.5 sm:py-4 text-sm sm:text-base font-mono text-slate-900 placeholder-slate-400 focus:outline-none tracking-wide uppercase"
                />

                <button
                  type="submit"
                  id="email-submit-btn"
                  disabled={status === 'submitting'}
                  aria-label="Submit email for priority access"
                  className="px-6 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#FFFFFF',
                  }}
                >
                  {status === 'submitting' ? (
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                    </svg>
                  ) : (
                    <>
                      <span>TRANSMIT</span>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center px-4 mt-3 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" style={{ color: theme.accent }} viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span>256-BIT ENCRYPTION</span>
                </span>
                <span>ZERO-LATENCY TRANSMISSION</span>
              </div>
            </form>
          ) : (
            /* System Response State: SIGNAL RECEIVED -> CONNECTION ESTABLISHED */
            <div
              id="submission-status-card"
              className="relative p-8 rounded-2xl pastel-card shadow-lg space-y-4 animate-fade-in pastel-corners"
              style={{ borderColor: theme.accent }}
            >
              {/* Expanding Ripple Circles */}
              <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full border animate-ping"
                  style={{ borderColor: theme.accent }}
                />
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: theme.accent }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L2 4V8C2 11.5 4.5 14.5 8 15.5C11.5 14.5 14 11.5 14 8V4L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M5.5 8L7.5 10L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono tracking-[0.2em] uppercase font-bold" style={{ color: theme.accent }}>
                  {status === 'signal_received' ? 'STAGE 1 // ENCRYPTING TRANSMISSION' : 'CONFIRMED // ACCESS GRANTED'}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 uppercase tracking-tight">
                  {status === 'signal_received' ? 'SIGNAL RECEIVED.' : 'CONNECTION ESTABLISHED.'}
                </h3>
              </div>

              <p className="text-xs font-mono text-slate-500 max-w-sm mx-auto">
                {status === 'signal_received'
                  ? 'Analyzing subscriber metadata and generating secure optical token...'
                  : `Coordinates locked for ${email}. You will receive immediate deployment signals.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
