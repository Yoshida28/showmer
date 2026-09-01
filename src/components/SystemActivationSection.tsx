import React, { useState, useEffect, useRef } from 'react';
import { PastelThemeId } from '../types';
import { PASTEL_THEMES } from '../utils/themes';

interface SystemActivationSectionProps {
  themeId?: PastelThemeId;
}

export const SystemActivationSection: React.FC<SystemActivationSectionProps> = ({
  themeId = 'sky',
}) => {
  const [percentage, setPercentage] = useState(64.2);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const theme = PASTEL_THEMES[themeId] || PASTEL_THEMES.sky;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const target = 87.4;
    const duration = 2200;
    const startTime = performance.now();
    const startVal = 64.2;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Number((startVal + (target - startVal) * eased).toFixed(1));
      setPercentage(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="activation"
      className="relative min-h-[75vh] py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-slate-200/80 flex flex-col justify-center items-center text-center select-none overflow-hidden"
    >
      {/* Background Topographic Wave Contours */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          {[...Array(7)].map((_, i) => (
            <path
              key={i}
              d={`M0,${220 + i * 60} Q300,${180 + i * 50 + Math.sin(i) * 30} 600,${220 + i * 60} T1200,${220 + i * 60}`}
              fill="none"
              stroke={theme.accent}
              strokeWidth="0.75"
              strokeDasharray={i % 2 === 0 ? '6 6' : 'none'}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center space-y-8 sm:space-y-10">
        {/* Sub-heading Tactical Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-semibold shadow-sm"
          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: theme.accent }} />
          <span>SYSTEM ACTIVATION IN PROGRESS</span>
        </div>

        {/* Massive Percentage Counter */}
        <div className="flex flex-col items-center">
          <div
            id="activation-percentage-display"
            className="font-display text-7xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tight text-slate-900 tabular-nums leading-none select-none"
          >
            {percentage.toFixed(1)}
            <span className="text-4xl sm:text-6xl font-bold ml-1" style={{ color: theme.accent }}>%</span>
          </div>

          <span className="text-xs font-mono tracking-[0.25em] text-slate-500 uppercase mt-4 font-semibold">
            GLOBAL OPTICAL COGNITION LEVEL
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full max-w-xl space-y-3 p-5 sm:p-6 rounded-2xl pastel-card shadow-sm pastel-corners">
          <div className="relative w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
            {/* Active filled line */}
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(percentage / 100) * 100}%`,
                backgroundColor: theme.accent,
              }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1">
            <span>INIT: BASELINE_CAL</span>
            <span className="font-semibold text-emerald-600">CORE: ONLINE</span>
            <span>TARGET: 100.0% FULL DEPLOYMENT</span>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="max-w-md text-xs sm:text-sm text-slate-600 font-semibold tracking-[0.18em] uppercase font-mono">
          CALIBRATING THE FUTURE OF INTELLIGENT SENSING.
        </p>
      </div>
    </section>
  );
};
