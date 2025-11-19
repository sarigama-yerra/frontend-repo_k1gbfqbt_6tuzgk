import React from 'react';

// Ultra-subtle animated mist using layered radial gradients
export default function BackgroundMist() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -inset-1 opacity-[0.06] mix-blend-screen animate-mist-slow" style={{
        background:
          'radial-gradient(60% 60% at 20% 30%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%), ' +
          'radial-gradient(50% 50% at 80% 70%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 70%)'
      }} />
      <div className="absolute -inset-1 opacity-[0.04] mix-blend-screen animate-mist-slower" style={{
        background:
          'radial-gradient(45% 45% at 50% 10%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%), ' +
          'radial-gradient(55% 55% at 30% 80%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 75%)'
      }} />
    </div>
  );
}
