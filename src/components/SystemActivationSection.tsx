import React, { useState, useEffect, useRef } from 'react';

export const SystemActivationSection: React.FC = () => {
  const [percentage, setPercentage] = useState(64.2);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
      className="relative min-h-[85vh] py-32 px-6 md:px-12 bg-[#010306] border-t border-white/[0.06] flex flex-col justify-center items-center text-center select-none overflow-hidden"
    >
      {/* Background Topographic Wave Contours */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          {[...Array(9)].map((_, i) => (
            <path
              key={i}
              d={`M0,${200 + i * 50} Q300,${150 + i * 45 + Math.sin(i) * 30} 600,${200 + i * 50} T1200,${200 + i * 50}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeDasharray={i % 2 === 0 ? '6 4' : 'none'}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center space-y-10">
        {/* Sub-heading Tactical Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-950/20 text-[10px] font-mono tracking-[0.25em] text-sky-300 uppercase shadow-[0_0_20px_rgba(56,189,248,0.1)]">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>SYSTEM ACTIVATION IN PROGRESS</span>
        </div>

        {/* Massive Percentage Counter with Syne */}
        <div className="flex flex-col items-center">
          <div
            id="activation-percentage-display"
            className="font-display text-7xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tight text-white tabular-nums leading-none select-none drop-shadow-[0_0_60px_rgba(56,189,248,0.3)]"
          >
            {percentage.toFixed(1)}
            <span className="text-sky-400 text-5xl sm:text-7xl font-bold ml-1">%</span>
          </div>

          <span className="text-xs font-mono tracking-[0.3em] text-slate-400 uppercase mt-4 font-semibold">
            GLOBAL OPTICAL COGNITION LEVEL
          </span>
        </div>

        {/* Thin Premium Progress Bar with Traveling Light Point */}
        <div className="w-full max-w-2xl space-y-3 p-6 rounded-2xl border border-white/[0.08] bg-[#040812]/95 backdrop-blur-xl corner-brackets shadow-2xl">
          <div className="relative w-full h-[4px] bg-white/10 rounded-full overflow-hidden">
            {/* Active filled line */}
            <div
              className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-white transition-all duration-300"
              style={{ width: `${(percentage / 100) * 100}%` }}
            />

            {/* Traveling point of light */}
            <div
              className="absolute top-0 bottom-0 w-8 bg-white shadow-[0_0_16px_#ffffff] blur-[1px] animate-[pulse_1.5s_infinite]"
              style={{ left: `calc(${(percentage / 100) * 100}% - 16px)` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
            <span>INIT: BASELINE_CAL</span>
            <span className="text-emerald-400 font-semibold">CORE: ONLINE</span>
            <span>TARGET: 100.0% FULL DEPLOYMENT</span>
          </div>
        </div>

        {/* Supporting Copy */}
        <p className="max-w-xl text-base sm:text-lg text-slate-300 font-bold tracking-[0.15em] uppercase font-mono">
          CALIBRATING THE FUTURE OF INTELLIGENT SENSING.
        </p>
      </div>
    </section>
  );
};
