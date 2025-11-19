import React from 'react';
import { motion } from 'framer-motion';

const ACCENTS = {
  wrath: '#8A2B2B',
  envy: '#2E5C39',
  pride: '#D9C68A',
  greed: '#A67C00',
  gluttony: '#B07C4A',
  lust: '#6E1F3F',
  sloth: '#9BB2C9',
};

const ENGLISH = {
  wrath: 'WRATH',
  envy: 'ENVY',
  pride: 'PRIDE',
  greed: 'GREED',
  gluttony: 'GLUTTONY',
  lust: 'LUST',
  sloth: 'SLOTH',
};

// Transliteration titles per user request
const sins = [
  { key: 'wrath', title: 'orgi', tagline: 'Vengeance burns eternal', trail: 'Ember, leather, iron' },
  { key: 'envy', title: 'pthonos', tagline: 'Consume their light', trail: 'Vetiver, galbanum, mineral' },
  { key: 'pride', title: 'yperifaneia', tagline: 'Bow to none', trail: 'Black leather, golden tobacco' },
  { key: 'greed', title: 'pleon', tagline: 'Never enough', trail: 'Molten amber, golden spice' },
  { key: 'gluttony', title: 'gastria', tagline: 'Consume without end', trail: 'Vanilla, rum, sugar' },
  { key: 'lust', title: 'epythymia', tagline: 'Smell the forbidden', trail: 'Dark wine, warm skin' },
  { key: 'sloth', title: 'akidia', tagline: 'Why bother?', trail: 'Pale musk, soft woods' },
];

function PerfumeCard({ sin, idx }) {
  const accent = ACCENTS[sin.key];
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: idx * 0.03 }}
      className="group relative overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
    >
      {/* Glow backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(80% 120% at 50% 0%, ${accent}22 0%, transparent 60%)`,
        }}
      />

      {/* Bottle silhouette */}
      <div className="relative z-[1] flex flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="text-xs tracking-[0.28em] text-neutral-400 uppercase">Eau de Sin • No. {String(idx + 1).padStart(2, '0')}</div>
          <div className="w-7 h-7 rounded-full" style={{ boxShadow: `inset 0 0 0 1px ${accent}55`, background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.2))' }} />
        </div>

        <h3 className="mt-4 text-2xl sm:text-3xl tracking-[0.16em]" style={{ fontFamily: 'var(--font-serif)' }}>
          {sin.title}
        </h3>
        <div className="mt-1">
          <span
            className="text-sm sm:text-base tracking-[0.25em] uppercase"
            style={{
              background: 'linear-gradient(90deg, #f6f6f6, #b9a36b 30%, #ffffff 55%, #b9a36b 75%, #e5e5e5)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 1px 1px rgba(0,0,0,0.25)'
            }}
          >
            {ENGLISH[sin.key]}
          </span>
        </div>
        <p className="mt-2 text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>
          “{sin.tagline}”
        </p>

        {/* Bottle + glass plate */}
        <div className="mt-6 relative flex items-end h-36">
          <motion.div
            whileHover={{ y: -4 }}
            className="relative mx-auto w-20 h-28"
          >
            <div className="absolute inset-0 rounded-md" style={{ background: `linear-gradient(180deg, ${accent}2a, rgba(0,0,0,0.2))`, boxShadow: `inset 0 0 0 1px ${accent}55, 0 10px 25px rgba(0,0,0,0.4)` }} />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-2 rounded-sm" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)' }} />
          </motion.div>
          <div className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm opacity-50" />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
          <div>
            <span className="text-neutral-500">Trail:</span>
            <span className="ml-2 text-neutral-200">{sin.trail}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative px-3 py-1.5 rounded-md border border-neutral-800/70 bg-neutral-900 hover:bg-neutral-800 transition-colors">
              Explore
              <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `0 0 0 1px ${accent}55` }} />
            </button>
            <button className="px-3 py-1.5 rounded-md border border-neutral-800/70 hover:bg-neutral-900 transition-colors">Add</button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Perfumes() {
  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/50 border-b border-neutral-900">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <div className="text-xs tracking-[0.3em] uppercase text-neutral-400">The Seven</div>
          <a href="/" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors">Back</a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        <div className="text-center">
          <div className="text-xs tracking-[0.3em] text-neutral-500 uppercase">Collection</div>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>All Seven Perfumes</h1>
          <p className="mt-3 text-neutral-400 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-serif)' }}>
            Concise, luminous summaries of each sin. Explore quickly, choose with instinct.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sins.map((sin, i) => (
            <PerfumeCard key={sin.key} sin={sin} idx={i} />
          ))}
        </div>
      </main>

      <footer className="border-t border-neutral-900 py-8 text-center text-neutral-500 text-sm">
        Sevenfold — crafted in small ritual batches
      </footer>
    </div>
  );
}
