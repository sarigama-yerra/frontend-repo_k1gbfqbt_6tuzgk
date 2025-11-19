import React from 'react';

export default function TypeSet({ children, className = '' }) {
  return (
    <div className={`tracking-[0.02em] ${className}`} style={{
      fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
    }}>
      {children}
    </div>
  );
}
