import React, { useState } from 'react';
import { sensingAudio } from '../utils/audio';

export const EmailCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'signal_received' | 'connected'>('idle');

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
      className="relative py-32 px-6 md:px-12 bg-[#010306] border-t border-white/[0.06] select-none overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(14,116,144,0.12)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
        {/* Section Tag */}
        <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase font-semibold">
          [ 06 // PRIORITY ACCESS ]
        </span>

        {/* Section Headline */}
        <h2
          id="email-capture-heading"
          className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase"
        >
          BE THE FIRST{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-sky-200 to-white drop-shadow-[0_4px_20px_rgba(56,189,248,0.2)]">
            TO SENSE IT.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
          When the global network activates, receive the first telemetry transmission. Join defense leaders, infrastructure architects, and sovereign operators.
        </p>

        {/* The Form / Interaction State */}
        <div className="pt-4 max-w-xl mx-auto">
          {status === 'idle' || status === 'submitting' ? (
            <form onSubmit={handleSubmit} className="relative group">
              <div className="relative flex items-center rounded-2xl border border-white/[0.12] bg-[#040812]/95 focus-within:border-sky-400 focus-within:shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-all duration-300 overflow-hidden backdrop-blur-2xl corner-brackets">
                <input
                  type="email"
                  id="email-input-field"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER OFFICIAL WORK EMAIL"
                  disabled={status === 'submitting'}
                  className="w-full bg-transparent px-6 py-4 sm:py-5 text-sm sm:text-base font-mono text-white placeholder-slate-500 focus:outline-none tracking-wider uppercase"
                />

                <button
                  type="submit"
                  id="email-submit-btn"
                  disabled={status === 'submitting'}
                  aria-label="Submit email for priority access"
                  className="mr-2 px-5 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#010306] font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'submitting' ? (
                    <svg className="w-4 h-4 animate-spin text-[#010306]" viewBox="0 0 16 16" fill="none">
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
                  <svg className="w-3 h-3 text-sky-400" viewBox="0 0 16 16" fill="none">
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
              className="relative p-8 rounded-2xl border border-sky-400/60 bg-[#040812]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.25)] space-y-4 animate-fade-in corner-brackets"
            >
              {/* Expanding Ripple Circles */}
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-sky-400/40 animate-ping" />
                <span className="absolute w-24 h-24 rounded-full border border-sky-400/20 animate-pulse" />
                <div className="w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center text-[#010306] shadow-[0_0_20px_#38bdf8]">
                  <svg className="w-6 h-6" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L2 4V8C2 11.5 4.5 14.5 8 15.5C11.5 14.5 14 11.5 14 8V4L8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M5.5 8L7.5 10L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono tracking-[0.25em] text-sky-400 uppercase font-bold">
                  {status === 'signal_received' ? 'STAGE 1 // ENCRYPTING TRANSMISSION' : 'CONFIRMED // ACCESS GRANTED'}
                </div>
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                  {status === 'signal_received' ? 'SIGNAL RECEIVED.' : 'CONNECTION ESTABLISHED.'}
                </h3>
              </div>

              <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
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
