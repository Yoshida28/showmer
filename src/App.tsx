import React, { useState, useCallback, useEffect } from 'react';
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
import { PastelThemeId, TelemetryState } from './types';
import { PASTEL_THEMES } from './utils/themes';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<PastelThemeId>('sky');
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

  const themeConfig = PASTEL_THEMES[activeTheme] || PASTEL_THEMES.sky;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

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
    <div
      className="relative min-h-screen text-slate-900 overflow-x-hidden font-sans transition-colors duration-500"
      style={{ backgroundColor: themeConfig.bgPrimary }}
    >
      {/* Dynamic Background Particle & Disturbance Sensing Canvas */}
      <SensingFieldCanvas onTelemetryUpdate={handleTelemetryUpdate} themeId={activeTheme} />

      {/* Global Minimalist Header Navigation with Theme Switcher */}
      <Navigation
        onScrollToSignup={() => scrollToSection('signup')}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
      />

      {/* Global Real-Time Telemetry HUD Overlay */}
      <TelemetryHUD telemetry={telemetry} themeId={activeTheme} />

      {/* Main Sections */}
      <main id="shomer-main-content" className="relative z-10">
        {/* SECTION 1: HERO */}
        <HeroSection
          onScrollToNext={() => scrollToSection('intelligence')}
          isMoving={telemetry.speed > 10}
          themeId={activeTheme}
        />

        {/* SECTION 2: INVISIBLE INTELLIGENCE */}
        <InvisibleIntelligenceSection themeId={activeTheme} />

        {/* SECTION 3: WHAT YOU SEE ISN'T EVERYTHING (Interactive Slider) */}
        <PerceptionComparisonSection themeId={activeTheme} />

        {/* SECTION 4: MAKE A DISTURBANCE (Interactive Simulator) */}
        <MakeDisturbanceSection themeId={activeTheme} />

        {/* SECTION 5: MULTIPLE ENVIRONMENTS (Clean Minimalist Cards) */}
        <MultipleEnvironmentsSection
          onScrollToSignup={() => scrollToSection('signup')}
          themeId={activeTheme}
        />

        {/* SECTION 6: THE NERVOUS SYSTEM (Interactive Fiber Mesh) */}
        <NervousSystemSection
          onScrollToSignup={() => scrollToSection('signup')}
          themeId={activeTheme}
        />

        {/* SECTION 7: SYSTEM ACTIVATION (Progress & Calibration) */}
        <SystemActivationSection themeId={activeTheme} />

        {/* SECTION 8: EMAIL CAPTURE (High Conversion Signal Transmission) */}
        <EmailCaptureSection themeId={activeTheme} />

        {/* SECTION 9: BRAND FINALE (Wordmark & Minimalist Statements) */}
        <BrandFinaleSection themeId={activeTheme} />
      </main>
    </div>
  );
}
