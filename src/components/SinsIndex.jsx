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

// Greek titles for each sin
const sins = [
  { key: 'wrath', title: 'ΟΡΓΗ', desc: 'Vengeance burns eternal', feel: 'Ember, leather, iron' },
  { key: 'envy', title: 'ΦΘΟΝΟΣ', desc: 'Consume their light', feel: 'Vetiver, galbanum, mineral' },
  { key: 'pride', title: 'ΥΠΕΡΗΦΑΝΕΙΑ', desc: 'Bow to none', feel: 'Black leather, golden tobacco' },
  { key: 'greed', title: 'ΠΛΕΟΝΕΞΙΑ', desc: 'Never enough', feel: 'Molten amber, golden spice' },
  { key: 'gluttony', title: 'ΛΑΙΜΑΡΓΙΑ', desc: 'Consume without end', feel: 'Vanilla, rum, sugar' },
  { key: 'lust', title: 'ΛΑΓΝΕΙΑ', desc: 'Smell the forbidden', feel: 'Dark wine, warm skin' },
  { key: 'sloth', title: 'ΑΚΗΔΙΑ', desc: 'Why bother?', feel: 'Pale musk, soft woods' },
];

const ease = [0.2, 0.0, 0, 1];

export default function SinsIndex() {
  return (
    <section aria-label="The Seven Sins" className="relative w-full bg-black text-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: '3%' }}
        whileInView={{ opacity: 1, y: '0%' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease }}
        className="max-w-6xl mx-auto px-6 sm:px-8 py-20"
      >
        <div className="text-xs tracking-[0.25em] text-neutral-500 uppercase text-center">II. The Archive</div>
        <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl text-center" style={{ fontFamily: 'var(--font-serif)' }}>The Seven Sins</h3>

        {/* Mobile: horizontal scroller with vertical cards; Desktop: 3-column grid */}
        <div
          className="mt-12 -mx-6 px-6 flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-2
                     sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:snap-none sm:gap-8"
        >
          {sins.map((s, i) => (
            <motion.article
              key={s.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.9, ease, delay: (i % 3) * 0.06 }}
              className="group relative rounded-xl border bg-black/60 overflow-hidden shrink-0 w-[82%] sm:w-auto sm:shrink
                         snap-center"
              style={{ borderColor: 'rgba(217,198,138,0.24)', boxShadow: 'inset 0 0 0 1px rgba(217,198,138,0.12)' }}
            >
              {/* hover aura (extremely faint) */}
              <motion.div
                aria-hidden
                className="absolute -inset-0.5 rounded-[14px] blur-xl opacity-0 group-hover:opacity-80 transition-opacity"
                style={{ background: `radial-gradient(50% 50% at 50% 50%, ${ACCENTS[s.key]}0D, transparent 70%)` }}
              />

              <div className="relative p-6">
                {/* Title rise */}
                <motion.h4
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease, delay: 0.06 }}
                  className="tracking-[0.28em] text-[0.78rem] text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(90deg, rgba(235,227,204,0.85), ${ACCENTS[s.key]}, rgba(235,227,204,0.85))` }}
                >
                  {s.title}
                </motion.h4>

                {/* Description fade after title */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease, delay: 0.18 }}
                  className="mt-3 text-neutral-300"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  “{s.desc}”
                </motion.p>

                {/* Scent feel last + shimmer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease, delay: 0.3 }}
                  className="mt-4 text-sm relative"
                >
                  <span className="text-neutral-400/80 mr-1">Trail:</span>
                  <span className="relative text-neutral-200">
                    {s.feel}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#D9C68A33] to-transparent bg-[length:120%_100%] animate-[shimmer_4s_linear_infinite]" />
                  </span>
                </motion.div>
              </div>

              {/* subtle pulse on load (<5% opacity) */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0.0, 0.05, 0.0] }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.6, ease }}
                style={{ background: `radial-gradient(80% 60% at 50% 50%, ${ACCENTS[s.key]}14, transparent 70%)` }}
              />

              {/* hover scale + soft shadow */}
              <div className="absolute inset-0 rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.015]" />
              <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] group-hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.8)] transition-shadow" />
            </motion.article>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer { 0%{background-position: -60% 0} 100%{background-position: 180% 0} }
      `}</style>
    </section>
  );
}
