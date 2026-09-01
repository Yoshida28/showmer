import React, { useState, useCallback } from 'react';
import { SensingFieldCanvas } from './components/SensingFieldCanvas';
import { Navigation } from './components/Navigation';
import { TelemetryHUD } from './components/TelemetryHUD';
import { HeroSection } from './components/HeroSection';
import { InvisibleIntelligenceSection } from './components/InvisibleIntelligenceSection';
import { PerceptionComparisonSection } from './components/PerceptionComparisonSection';
import { MakeDisturbanceSection } from './components/MakeDisturbanceSection';
import { MultipleEnvironmentsSection } from './components/MultipleEnvironmentsSection';
import { NervousSystemSection } from './components/NervousSystemSection';
import { SystemActivationSection } from './components/SystemActivationSection';
import { EmailCaptureSection } from './components/EmailCaptureSection';
import { BrandFinaleSection } from './components/BrandFinaleSection';
import { TelemetryState } from './types';

export default function App() {
  const [telemetry, setTelemetry] = useState<TelemetryState>({
    x: 0,
    y: 0,
    speed: 0,
    lastDisturbanceTime: Date.now(),
    activeStatus: 'OPTIMAL COHERENCE',
    statusLevel: 'normal',
    interactionCount: 0,
    strainReading: 0.014,
    frequency: 12.8,
  });

  const handleTelemetryUpdate = useCallback(
    (data: {
      x: number;
      y: number;
      speed: number;
      strain: number;
      frequency: number;
      isMoving: boolean;
    }) => {
      setTelemetry((prev) => ({
        ...prev,
        x: data.x,
        y: data.y,
        speed: data.speed,
        strainReading: data.strain,
        frequency: data.frequency,
        statusLevel: data.speed > 30 ? 'alert' : data.speed > 10 ? 'analyzing' : 'normal',
        activeStatus:
          data.speed > 30
            ? 'ACOUSTIC WAVEFORM DETECTED'
            : data.speed > 10
            ? 'SPECTRAL ANALYSIS ACTIVE'
            : 'CONTINUOUS SENSING PASSIVE',
      }));
    },
    []
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#010306] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden font-sans">
      {/* Dynamic Background Particle & Disturbance Sensing Canvas */}
      <SensingFieldCanvas onTelemetryUpdate={handleTelemetryUpdate} />

      {/* Global Minimalist Header Navigation */}
      <Navigation onScrollToSignup={() => scrollToSection('signup')} />

      {/* Global Real-Time Telemetry HUD Overlay */}
      <TelemetryHUD telemetry={telemetry} />

      {/* Main Sections */}
      <main id="shomer-main-content" className="relative z-10">
        {/* SECTION 1: HERO */}
        <HeroSection
          onScrollToNext={() => scrollToSection('intelligence')}
          isMoving={telemetry.speed > 10}
        />

        {/* SECTION 2: INVISIBLE INTELLIGENCE */}
        <InvisibleIntelligenceSection />

        {/* SECTION 3: WHAT YOU SEE ISN'T EVERYTHING (Interactive Slider) */}
        <PerceptionComparisonSection />

        {/* SECTION 4: MAKE A DISTURBANCE (Interactive Simulator) */}
        <MakeDisturbanceSection />

        {/* SECTION 5: MULTIPLE ENVIRONMENTS (5 Tall Cinematic Cards) */}
        <MultipleEnvironmentsSection
          onScrollToSignup={() => scrollToSection('signup')}
        />

        {/* SECTION 6: THE NERVOUS SYSTEM (Interactive Fiber Mesh) */}
        <NervousSystemSection
          onScrollToSignup={() => scrollToSection('signup')}
        />

        {/* SECTION 7: SYSTEM ACTIVATION (Progress & Calibration) */}
        <SystemActivationSection />

        {/* SECTION 8: EMAIL CAPTURE (High Conversion Signal Transmission) */}
        <EmailCaptureSection />

        {/* SECTION 9: BRAND FINALE (Wordmark & Cinematic Statements) */}
        <BrandFinaleSection />
      </main>
    </div>
  );
}
