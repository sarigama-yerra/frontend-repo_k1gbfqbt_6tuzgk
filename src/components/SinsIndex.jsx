import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sins = [
  {
    key: 'wrath',
    header: 'WRATH',
    greek: 'ORGĒ (orgi)',
    tagline: '“Vengeance burns eternal.”',
    body: '“A scent carved from smoke, heat, and fury.\nBuilt for those who refuse to bow, soften, or step aside.”',
    action: 'OPEN WRATH',
  },
  {
    key: 'envy',
    header: 'ENVY',
    greek: 'PHTHONOS',
    tagline: '“Consume their light.”',
    body: '“Cold, green, and sharpened to a blade.\nA fragrance born from comparison, hunger, and the desire to take what isn’t yours.”',
    action: 'OPEN ENVY',
  },
  {
    key: 'lust',
    header: 'LUST',
    greek: 'EPYTHIMIA',
    tagline: '“Smell the forbidden.”',
    body: '“Warm skin, sweet breath, and shadows.\nIntimate, magnetic, meant to pull someone closer without a word.”',
    action: 'OPEN LUST',
  },
  {
    key: 'pride',
    header: 'PRIDE',
    greek: 'HYPEREPHANIA',
    tagline: '“Bow to none.”',
    body: '“Leather, smoke, and strength.\nA scent made to dominate a room simply by entering it.”',
    action: 'OPEN PRIDE',
  },
  {
    key: 'gluttony',
    header: 'GLUTTONY',
    greek: 'GASTRIA',
    tagline: '“Consume without end.”',
    body: '“Sugared heat, soft woods, and indulgence.\nA fragrance for the ones who always want more.”',
    action: 'OPEN GLUTTONY',
  },
  {
    key: 'greed',
    header: 'GREED',
    greek: 'PLEONEXIA',
    tagline: '“Never enough.”',
    body: '“Gold, spice, and desire stretched thin.\nBuilt for the ones who chase the next high, the next hit, the next win.”',
    action: 'OPEN GREED',
  },
  {
    key: 'sloth',
    header: 'SLOTH',
    greek: 'AKIDIA',
    tagline: '“Why bother?”',
    body: '“Soft woods, quiet musk, fading warmth.\nA scent for the ones who move only when the world forces them to.”',
    action: 'OPEN SLOTH',
  },
];

// Per-sin color themes (quote-focused) based on your palette
const sinThemes = {
  pride: { quote: '#7B5CB8', secondary: '#D9C68A' }, // Royal purple & gold
  wrath: { quote: '#C43A3A', secondary: '#2B2B2B' }, // Fiery red & smoky charcoal
  sloth: { quote: '#9AA0A6', secondary: '#6B7C93' }, // Soft gray & muted blue
  greed: { quote: '#E6C15A', secondary: '#1B8A5A' }, // Lustrous gold & emerald green
  lust: { quote: '#8A1C1C', secondary: '#000000' }, // Deep crimson & black
  envy: { quote: '#3BD16F', secondary: '#C5CED8' }, // Poison green & icy silver
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
                    height: '440px',
                  }}
                  aria-label={`${s.greek} — ${s.tagline.replace(/\u201C|\u201D/g, '')}`}
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
                    {/* Swapped: Greek first, then English header */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.2} variants={textStagger}>
                      <div className="text-[0.72rem] tracking-[0.32em] uppercase text-neutral-400 mb-2">{s.greek}</div>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.34} variants={textStagger}>
                      <div className="text-[0.68rem] tracking-[0.28em] uppercase text-neutral-500/90">{s.header}</div>
                    </motion.div>

                    {/* Title/tagline (serif) with per-sin color */}
                    <motion.h4
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={0.48}
                      variants={textStagger}
                      className="mt-6 text-[1.1rem] sm:text-xl"
                      style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif", color: theme.quote }}
                    >
                      {s.tagline}
                    </motion.h4>

                    {/* Body — standardized typography */}
                    <motion.p
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={0.62}
                      variants={textStagger}
                      className="mt-3 text-sm leading-relaxed text-neutral-400 whitespace-pre-line"
                    >
                      {s.body}
                    </motion.p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Action */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.76} variants={textStagger}>
                      <div className="flex items-center justify-between">
                        <span className="tracking-[0.28em] text-[0.72rem] text-[#D9C68A]/80 group-hover:text-[#E7D9A7] transition-colors">
                          {s.action}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 text-[0.7rem] text-[#D9C68A]/70 tracking-[0.25em] transition-opacity">OPEN</span>
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
