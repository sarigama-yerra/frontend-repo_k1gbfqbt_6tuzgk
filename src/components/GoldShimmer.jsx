import React from 'react';

// Subtle gold shimmer on hover
export default function GoldShimmer({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ textRendering: 'optimizeLegibility' }}
    >
      <span className="relative z-10 bg-clip-text text-transparent" style={{
        backgroundImage:
          'linear-gradient(100deg, rgba(221,198,130,0.7), rgba(161,137,82,0.9) 35%, rgba(221,198,130,0.7) 70%)',
        backgroundSize: '200% 100%',
        backgroundPosition: '120% 0%'
      }}>
        {children}
      </span>
      <span className="absolute inset-0 rounded-sm opacity-0 transition-opacity duration-500" style={{
        boxShadow: '0 0 0 0 rgba(221,198,130,0.25)'
      }} />
      <style>{`
        .gold-shimmer:hover span:first-child { 
          animation: shimmer-move 1.6s ease forwards; 
          text-shadow: 0 0 10px rgba(221,198,130,0.12), 0 0 20px rgba(221,198,130,0.06);
        }
        .gold-shimmer:hover { transform: translateY(-2px); }
        @keyframes shimmer-move {
          0% { background-position: 120% 0%; }
          100% { background-position: -20% 0%; }
        }
      `}</style>
    </div>
  );
}
