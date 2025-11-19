import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sins = [
  {
    key: 'wrath',
    header: 'WRATH',
    greek: 'Orgí’',
    tagline: 'Vengeance burns eternal.',
    forWho: 'fight back, stand tall, and never soften.',
    smells: 'Smoke, metal, spice, and heat — like burning embers and rising adrenaline.',
    action: 'OPEN WRATH',
  },
  {
    key: 'envy',
    header: 'ENVY',
    greek: 'Phthónos',
    tagline: 'Consume their light.',
    forWho: 'watch, calculate, and take what others think they own.',
    smells: 'Cold green vetiver, bitter herbs, and sharp mineral notes — clean, cutting, and unsettling.',
    action: 'OPEN ENVY',
  },
  {
    key: 'lust',
    header: 'LUST',
    greek: 'Epithymía',
    tagline: 'Smell the forbidden.',
    forWho: 'pull people closer without effort.',
    smells: 'Warm skin, sweet spice, soft woods — intimate, addictive, impossible to ignore.',
    action: 'OPEN LUST',
  },
  {
    key: 'pride',
    header: 'PRIDE',
    greek: 'Ypería',
    tagline: 'Bow to none.',
    forWho: 'walk in with presence, not permission.',
    smells: 'Bold leather, smoke, and honeyed tobacco — powerful and commanding.',
    action: 'OPEN PRIDE',
  },
  {
    key: 'gluttony',
    header: 'GLUTTONY',
    greek: 'Gastrimargía',
    tagline: 'Consume without end.',
    forWho: 'want more, take more, and don’t apologize for it.',
    smells: 'Sugary heat, creamy vanilla, spiced rum — sweet, rich, and overflowing.',
    action: 'OPEN GLUTTONY',
  },
  {
    key: 'greed',
    header: 'GREED',
    greek: 'Pleonexía',
    tagline: 'Never enough.',
    forWho: 'chase the next win, the next high, the next reward.',
    smells: 'Warm amber, gold-like spice, and sticky sweet edges — lavish, sharp, and addictive.',
    action: 'OPEN GREED',
  },
  {
    key: 'sloth',
    header: 'SLOTH',
    greek: 'Akidía’',
    tagline: 'Why bother?',
    forWho: 'move only when they choose to, and never in a rush.',
    smells: 'Soft musk, quiet woods, faint warmth — calm, slow, and effortless.',
    action: 'OPEN SLOTH',
  },
];

// Per-sin color themes (quote-focused) based on your palette
const sinThemes = {
  pride: { quote: '#7B5CB8', secondary: '#D9C68A' }, // Royal purple & gold
  wrath: { quote: '#C43A3A', secondary: '#2B2B2B' }, // Fiery red & smoky charcoal
  sloth: { quote: '#9AA0A6', secondary: '#6B7C93' }, // Soft gray & muted blue
  greed: { quote: '#E6C15A', secondary: '#1B8A5A' }, // Lustrous gold & emerald green
  lust: { quote: '#E0527D', secondary: '#000000' }, // Deep pink/rose & black
  envy: { quote: '#2FA968', secondary: '#C5CED8' }, // Muted poison green & icy silver
  gluttony: { quote: '#C07A45', secondary: '#F2E9DA' }, // Warm caramel & creamy ivory
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scaleY: 0.98, transformOrigin: 'top center' },
  inView: (i) => ({
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      delay: 0.08 * i,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const textStagger = {
  hidden: { opacity: 0, y: 6 },
  show: (d) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function SinsIndex({ onSelect }) {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = Math.max(1, el.scrollWidth - el.clientWidth);
    setProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
  };

  useEffect(() => {
    updateProgress();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProgress, { passive: true });
    const onResize = () => updateProgress();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // vertical wheel -> horizontal scroll for convenience
  const onWheel = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
    <section id="archive" className="relative w-full bg-black text-neutral-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 sm:py-16">
        <div className="mb-5 text-xs tracking-[0.25em] text-neutral-500 uppercase">II. The Archive</div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl tracking-tight" style={{
          fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
        }}>The Seven Sins</h3>
        <div className="mt-3 h-px w-20 bg-[#D9C68A]/15" aria-hidden="true" />

        {/* Horizontal rail */}
        <div className="relative mt-10">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" aria-hidden="true" />

          <div
            ref={scrollerRef}
            onWheel={onWheel}
            role="list"
            aria-label="Seven sins index"
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory snap-always flex gap-6 pb-6 -mx-6 px-6 sm:mx-0 sm:px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {sins.map((s, i) => {
              const theme = sinThemes[s.key] || { quote: '#D9C68A', secondary: '#D9C68A' };
              return (
                <motion.button
                  key={s.key}
                  role="listitem"
                  onClick={() => onSelect?.(s.header)}
                  initial="initial"
                  whileInView="inView"
                  custom={i}
                  viewport={{ amount: 0.6, once: true }}
                  variants={cardVariants}
                  className="group relative text-left overflow-hidden rounded-[10px] border bg-neutral-950/40 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700/60 snap-start shrink-0"
                  style={{
                    borderColor: '#D9C68A33',
                    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)), radial-gradient(60% 150% at 50% -40%, rgba(255,255,255,0.04), rgba(0,0,0,0))',
                    width: '260px',
                    height: '460px',
                  }}
                  aria-label={`${s.greek} — ${s.tagline}`}
                >
                  {/* Aged black parchment texture */}
                  <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)'
                  }} />

                  {/* vertical unroll mask */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"
                    initial={{ translateY: '0%' }}
                    whileInView={{ translateY: '-100%' }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                  />

                  <div className="relative p-6 sm:p-7 flex flex-col h-full">
                    {/* Greek then English */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.2} variants={textStagger}>
                      <div className="text-[0.72rem] tracking-[0.32em] uppercase text-neutral-400 mb-2" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>{s.greek}</div>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.34} variants={textStagger}>
                      <div className="text-[0.68rem] tracking-[0.28em] uppercase text-neutral-500/90" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>{s.header}</div>
                    </motion.div>

                    {/* Tagline near the top */}
                    <motion.h4
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={0.48}
                      variants={textStagger}
                      className="mt-6 text-[1.1rem] sm:text-xl"
                      style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif", color: theme.quote, fontStyle: 'italic' }}
                    >
                      “{s.tagline}”
                    </motion.h4>

                    {/* Large intentional space between top and bottom content */}
                    <div className="flex-1" />

                    {/* Bottom content block with clear separation */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.62} variants={textStagger}>
                      {/* For those who ABOVE divider */}
                      <p className="text-[0.82rem] leading-relaxed text-neutral-300" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>
                        <span className="text-neutral-400/90">For those who:</span> {s.forWho}
                      </p>

                      {/* subtle divider to enhance separation */}
                      <div className="h-px w-full bg-[#D9C68A]/15 my-3" aria-hidden="true" />

                      {/* Replacement for 'How it smells' BELOW divider */}
                      <p className="text-[0.82rem] leading-relaxed text-neutral-400" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>
                        <span className="text-neutral-400/90">On the skin:</span> {s.smells}
                      </p>
                    </motion.div>

                    {/* Action */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.76} variants={textStagger}>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="tracking-[0.28em] text-[0.72rem] text-[#D9C68A]/80 group-hover:text-[#E7D9A7] transition-colors" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>
                          {s.action}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 text-[0.7rem] text-[#D9C68A]/70 tracking-[0.25em] transition-opacity" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>OPEN</span>
                      </div>
                    </motion.div>

                    {/* hover accent */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D9C68A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* hover lift + border brighten */}
                  <div className="absolute inset-0 rounded-[10px] ring-1 ring-transparent group-hover:ring-[#D9C68A]/30 transition duration-500" aria-hidden="true" />
                  <div className="absolute inset-0 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500" aria-hidden="true" />
                </motion.button>
              );
            })}
          </div>

          {/* Gold progress bar */}
          <div className="mt-4 h-[2px] w-full bg-[#D9C68A]/10 rounded">
            <motion.div
              className="h-full bg-[#D9C68A]/70 rounded"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ type: 'tween', duration: 0.2 }}
            />
          </div>

          {/* subtle scroll hint */}
          <div className="mt-3 flex items-center gap-3 text-[0.72rem] tracking-[0.28em] text-neutral-500/80 uppercase">
            <span>Scroll right</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
