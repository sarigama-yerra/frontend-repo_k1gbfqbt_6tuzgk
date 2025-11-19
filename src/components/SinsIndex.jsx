import React from 'react';
import { motion } from 'framer-motion';

const sins = [
  { name: 'WRATH', tagline: 'Vengeance burns eternal.', greek: 'Orgí' },
  { name: 'ENVY', tagline: 'Consume their light.', greek: 'Phthónos' },
  { name: 'LUST', tagline: 'Smell the forbidden.', greek: 'Epithymía' },
  { name: 'PRIDE', tagline: 'Bow to none.', greek: 'yperia' },
  { name: 'GLUTTONY', tagline: 'Consume without end.', greek: 'Gasría (Gastría)' },
  { name: 'GREED', tagline: 'Never enough.', greek: 'Pleon' },
  { name: 'SLOTH', tagline: 'Why bother?', greek: 'Akindía (Acedia/Akedia)' },
];

export default function SinsIndex({ onSelect }) {
  return (
    <section id="archive" className="relative w-full bg-black text-neutral-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24 sm:py-28">
        <div className="mb-6 text-xs tracking-[0.25em] text-neutral-500 uppercase">II. Chapter Index</div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2" style={{
          fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
        }}>The Seven Sins</h3>
        <p className="text-neutral-400 mb-12 max-w-2xl">Each sin has its own voice. Its own hunger. Its own scent.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sins.map((s, i) => (
            <motion.button
              key={s.name}
              onClick={() => onSelect?.(s.name)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group text-left relative overflow-hidden rounded border border-neutral-800/70 bg-neutral-950/40 hover:bg-neutral-900/40 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700/60"
              aria-label={`${s.name} — ${s.tagline}`}
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                background: 'radial-gradient(60% 50% at 50% 0%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)'
              }} />
              <div className="p-6 sm:p-7">
                <div className="text-[0.7rem] tracking-[0.28em] uppercase text-neutral-500 mb-3">{s.name}</div>
                <div className="flex items-baseline justify-between gap-6">
                  <div>
                    <div className="text-lg sm:text-xl text-neutral-100 mb-1" style={{
                      fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
                    }}>{s.tagline}</div>
                    <div className="text-neutral-400 text-sm italic">{s.greek}</div>
                  </div>
                  <div className="text-[#D9C68A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-[0.25em] text-[0.7rem]">OPEN</div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
