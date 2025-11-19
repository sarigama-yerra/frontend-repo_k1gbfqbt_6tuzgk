import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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
  { key: 'wrath', title: 'ΟΡΓΗ', tagline: 'Vengeance burns eternal', trail: 'Ember, leather, iron' },
  { key: 'envy', title: 'ΦΘΟΝΟΣ', tagline: 'Consume their light', trail: 'Vetiver, galbanum, mineral' },
  { key: 'pride', title: 'ΥΠΕΡΗΦΑΝΕΙΑ', tagline: 'Bow to none', trail: 'Black leather, golden tobacco' },
  { key: 'greed', title: 'ΠΛΕΟΝΕΞΙΑ', tagline: 'Never enough', trail: 'Molten amber, golden spice' },
  { key: 'gluttony', title: 'ΛΑΙΜΑΡΓΙΑ', tagline: 'Consume without end', trail: 'Vanilla, rum, sugar' },
  { key: 'lust', title: 'ΛΑΓΝΕΙΑ', tagline: 'Smell the forbidden', trail: 'Dark wine, warm skin' },
  { key: 'sloth', title: 'ΑΚΗΔΙΑ', tagline: 'Why bother?', trail: 'Pale musk, soft woods' },
];

const ease = [0.2, 0.0, 0, 1];

function CodexCard({ sin, onInView }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, margin: '0px' });

  useEffect(() => {
    if (inView) onInView?.(sin.key);
  }, [inView, onInView, sin.key]);

  return (
    <section
      ref={ref}
      className="snap-start h-screen w-full relative overflow-hidden flex items-center justify-center"
      aria-label={sin.title}
    >
      {/* Faint background texture: vignette + subtle colored fog */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(80% 60% at 50% 40%, ${ACCENTS[sin.key]}14 0%, transparent 65%),` +
            `radial-gradient(60% 60% at 50% 100%, rgba(217,198,138,0.08), transparent 70%),` +
            `linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.9))`,
        }}
      />

      {/* Soft grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.9, ease }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Minimal sigil: a thin ring + accent dot */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8"
        >
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 0 1px rgba(217,198,138,0.22)` }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full" style={{ background: ACCENTS[sin.key] }} />
        </motion.div>

        {/* Sin name */}
        <motion.h3
          initial={{ letterSpacing: '0.4em', opacity: 0, y: 8 }}
          whileInView={{ letterSpacing: '0.2em', opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1.1, ease }}
          className="text-4xl sm:text-5xl md:text-6xl tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {sin.title}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1, ease, delay: 0.12 }}
          className="mt-4 text-base sm:text-lg text-neutral-300 max-w-xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          “{sin.tagline}”
        </motion.p>

        {/* Trail with subtle shimmer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-neutral-300/90 relative"
        >
          <span className="text-neutral-400/80 mr-1">Trail:</span>
          <span className="relative">
            {sin.trail}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#D9C68A33] to-transparent bg-[length:120%_100%] animate-[shimmer_4s_linear_infinite]" />
          </span>
        </motion.div>
      </motion.div>

      {/* Soft edge highlight per card */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.05, 0] }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.6, ease }}
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${ACCENTS[sin.key]}22 0%, transparent 70%)` }}
      />
    </section>
  );
}

export default function SinsCodex() {
  const [active, setActive] = useState(sins[0].key);
  const activeSin = sins.find(s => s.key === active) || sins[0];
  const containerRef = useRef(null);

  return (
    <section className="relative w-full bg-black text-neutral-100" aria-label="The Seven Sins Codex">
      {/* Scroll container with vertical snap */}
      <div
        ref={containerRef}
        className="h-[100svh] overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Intro spacer for nice handoff from previous section */}
        <div className="snap-start h-10 sm:h-16" aria-hidden />

        {sins.map((s) => (
          <CodexCard key={s.key} sin={s} onInView={setActive} />
        ))}

        {/* Final: Product details reveal */}
        <section className="snap-start min-h-screen w-full relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 60% at 50% 40%, rgba(217,198,138,0.06), transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,1))' }} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease }}
            className="relative z-10 px-6 w-full max-w-3xl"
          >
            <div className="text-xs tracking-[0.25em] text-neutral-500 uppercase text-center">III. The Opening</div>
            <h3 className="mt-3 text-center text-2xl sm:text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
              The Codex opens to {activeSin.title}
            </h3>
            <p className="mt-4 text-center text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>
              Step into the full composition for {activeSin.title.toLowerCase()}.
            </p>

            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease, delay: 0.08 }}
              className="mt-8 rounded-xl border bg-black/60 overflow-hidden"
              style={{ borderColor: 'rgba(217,198,138,0.24)', boxShadow: 'inset 0 0 0 1px rgba(217,198,138,0.12)' }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-lg tracking-[0.2em] text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, rgba(235,227,204,0.85), ${ACCENTS[activeSin.key]}, rgba(235,227,204,0.85))` }}>{activeSin.title}</div>
                  <div className="text-sm text-neutral-400">Trail: <span className="text-neutral-200">{activeSin.trail}</span></div>
                </div>
                <p className="mt-4 text-neutral-300" style={{ fontFamily: 'var(--font-serif)' }}>
                  “{activeSin.tagline}”
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral-300/90">
                  <div className="rounded-lg border border-neutral-800/60 p-4 bg-black/40">
                    <div className="text-neutral-500 text-xs tracking-widest uppercase">Top</div>
                    <div className="mt-2">Citrus smoke, mineral light</div>
                  </div>
                  <div className="rounded-lg border border-neutral-800/60 p-4 bg-black/40">
                    <div className="text-neutral-500 text-xs tracking-widest uppercase">Heart</div>
                    <div className="mt-2">Leathers, spices, resin</div>
                  </div>
                  <div className="rounded-lg border border-neutral-800/60 p-4 bg-black/40">
                    <div className="text-neutral-500 text-xs tracking-widest uppercase">Base</div>
                    <div className="mt-2">Woods, smoke, amber</div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 rounded-lg border border-neutral-800/60 bg-neutral-900 hover:bg-neutral-800 transition-colors">Explore {activeSin.title}</button>
                  <button className="px-6 py-3 rounded-lg border border-neutral-800/60 hover:bg-neutral-900 transition-colors">Add to Ritual</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <style>{`
        @keyframes shimmer { 0%{background-position: -60% 0} 100%{background-position: 180% 0} }
      `}</style>
    </section>
  );
}
