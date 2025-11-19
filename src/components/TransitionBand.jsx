import React from 'react';
import BackgroundMist from './BackgroundMist';

// Static chapter divider (pre-animation state)
// Purpose: provide a calm, luxurious break between sections without scroll or motion effects.
export default function TransitionBand({ label = 'Chapter transition', height = 140, variant = 'cinematic' }) {
  return (
    <section
      aria-label={label}
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: `${height}vh` }}
    >
      {/* Background mist (subtle, static) */}
      <div className="absolute inset-0 opacity-50" aria-hidden>
        <BackgroundMist />
      </div>

      {/* Soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 80%)',
        }}
      />

      {/* Dim gold sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 40%, rgba(217,198,138,0.05) 0%, rgba(217,198,138,0) 70%)',
        }}
      />

      {/* Center gold line accent */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-px w-1/3"
        style={{
          transform: 'translate(-50%, -50%)',
          background:
            'linear-gradient(90deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
          boxShadow: '0 0 24px rgba(217,198,138,0.22), 0 0 64px rgba(217,198,138,0.1)'
        }}
      />

      {/* Top and bottom space to breathe */}
      <div className="relative" style={{ height: `calc(${height}vh * 0.2)` }} />
    </section>
  );
}
