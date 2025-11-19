import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ACCENTS = {
  wrath: '#8A2B2B', // deep red
  envy: '#5C7F5A', // muted green
  lust: '#D87AA6', // pinkish rose
  pride: '#D9C68A', // gold
  gluttony: '#B07C4A', // warm caramel
  greed: '#A08A2E', // dark yellow/gold
  sloth: '#7FA2D1', // muted blue
};

const sins = [
  {
    key: 'wrath',
    header: 'WRATH',
    greek: 'Orgí’',
    tagline: 'Vengeance burns eternal',
    description: '“Let anger drive your hand. Make them remember your fire.”',
    trail: 'Smoldering embers, scorched leather, acrid metal — the trail of rage that cannot be contained.',
    action: 'OPEN WRATH',
  },
  {
    key: 'envy',
    header: 'ENVY',
    greek: 'Phthónos',
    tagline: 'Consume their light',
    description: '“Watch, wait, and claim what they refuse to see slip away.”',
    trail: 'Bitter green vetiver, sharp galbanum, icy mineral — the cold, intoxicating trail of desire.',
    action: 'OPEN ENVY',
  },
  {
    key: 'lust',
    header: 'LUST',
    greek: 'Epithymía',
    tagline: 'Smell the forbidden',
    description: '“Draw them close. Make desire obey your command.”',
    trail: 'Warm skin, dark amber, soft spice — an irresistible trail that clings and tempts without mercy.',
    action: 'OPEN LUST',
  },
  {
    key: 'pride',
    header: 'PRIDE',
    greek: 'Ypería',
    tagline: 'Bow to none',
    description: '“Stand higher. Let them kneel in silent envy.”',
    trail: 'Black leather, smoky woods, golden tobacco — a commanding trail that marks your dominance.',
    action: 'OPEN PRIDE',
  },
  {
    key: 'gluttony',
    header: 'GLUTTONY',
    greek: 'Gastrimargía',
    tagline: 'Consume without end',
    description: '“Take more. Never pause. Let excess define you.”',
    trail: 'Rich vanilla, caramelized rum, spiced sugar — the indulgent trail that smothers and seduces.',
    action: 'OPEN GLUTTONY',
  },
  {
    key: 'greed',
    header: 'GREED',
    greek: 'Pleonexía',
    tagline: 'Never enough',
    description: '“Keep taking. They’ll never satisfy you. Neither will anyone else.”',
    trail: 'Molten amber, sweet resin, sharp golden spice — the trail of desire that can’t be quenched.',
    action: 'OPEN GREED',
  },
  {
    key: 'sloth',
    header: 'SLOTH',
    greek: 'Akidía’',
    tagline: 'Why bother?',
    description: '“Let the world scramble. You stay untouched, untouched and superior.”',
    trail: 'Faint musk, pale woods, warm shadows — the lazy, intoxicating trail of deliberate inaction.',
    action: 'OPEN SLOTH',
  },
];

// Motion variants
const cardVariants = {
  initial: { opacity: 0, y: 24, scaleY: 0.98, transformOrigin: 'top center' },
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

function AccentLayer({ sinKey }) {
  const color = ACCENTS[sinKey] || '#D9C68A';

  // Subtle, sin-specific ambiance
  switch (sinKey) {
    case 'wrath':
      // ember specks rising
      return (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{ width: 2, height: 2, backgroundColor: color, left: `${8 + (i * 8) % 90}%` }}
              initial={{ opacity: 0.08, y: 20 }}
              animate={{ opacity: [0.08, 0.25, 0.05], y: [-6, -18, -6] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      );
    case 'envy':
      // gentle mist drift
      return (
        <motion.div
          className="pointer-events-none absolute -inset-x-4 inset-y-4 rounded-[16px]"
          style={{ background: `radial-gradient(60% 80% at 50% 50%, ${color}20, transparent 70%)` }}
          animate={{ x: [-6, 6, -6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    case 'lust':
      // warm glow pulse (pinkish)
      return (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(120px 80px at 50% 80%, ${color}20, transparent 60%)` }}
          animate={{ opacity: [0.08, 0.24, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    case 'pride':
      // shimmering dust
      return (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{ width: 1.5, height: 1.5, backgroundColor: color, left: `${(i * 11) % 90}%`, top: `${(i * 7) % 80}%` }}
              initial={{ opacity: 0.05 }}
              animate={{ opacity: [0.05, 0.3, 0.05] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
          ))}
        </div>
      );
    case 'gluttony':
      // subtle liquid ripple
      return (
        <motion.div
          className="pointer-events-none absolute inset-x-4 bottom-6 h-10 rounded-full"
          style={{ background: `radial-gradient(60px 20px at 50% 50%, ${color}18, transparent 70%)`, filter: 'blur(6px)' }}
          animate={{ scaleX: [1, 1.06, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    case 'greed':
      // tiny sparkles / flecks
      return (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{
                width: 6,
                height: 6,
                left: `${(i * 12) % 90}%`,
                top: `${(i * 9) % 70}%`,
                background: `conic-gradient(from 0deg, ${color}55, transparent 50%, ${color}55)`
              }}
              initial={{ opacity: 0.08, rotate: 0 }}
              animate={{ opacity: [0.08, 0.28, 0.08], rotate: [0, 90, 0] }}
              transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
            />
          ))}
        </div>
      );
    case 'sloth':
      // extremely slow drift (bluish)
      return (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(70% 60% at 50% 10%, ${color}18, transparent 60%)` }}
          animate={{ y: [-4, 4, -4], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      );
    default:
      return null;
  }
}

export default function SinsIndex({ onSelect }) {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const snapTimer = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = Math.max(1, el.scrollWidth - el.clientWidth);
    setProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
  };

  const snapToCenter = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;

    let closest = { idx: 0, dist: Infinity };
    cardRefs.current.forEach((node, idx) => {
      if (!node) return;
      const r = node.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const dist = Math.abs(center - scrollerCenter);
      if (dist < closest.dist) closest = { idx, dist };
    });

    const target = cardRefs.current[closest.idx];
    if (target) target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  useEffect(() => {
    updateProgress();
    const el = scrollerRef.current;
    if (!el) return;
    const handleScroll = () => {
      updateProgress();
      if (snapTimer.current) clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => snapToCenter(), 140);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    const onResize = () => updateProgress();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

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
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(100%) contrast(1.05)'
      }} />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 sm:py-16 relative">
        <div className="mb-5 text-xs tracking-[0.25em] text-neutral-500 uppercase text-center">II. The Archive</div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-center" style={{
          fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
        }}>The Seven Sins</h3>
        <div className="mt-3 h-px w-20 bg-[#D9C68A]/15 mx-auto" aria-hidden="true" />

        {/* Horizontal rail */}
        <div className="relative mt-10">
          {/* slight drifting mist behind all cards */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(50% 60% at 20% 40%, rgba(217,198,138,0.05), transparent 60%), radial-gradient(40% 50% at 80% 50%, rgba(255,255,255,0.04), transparent 60%)' }}
            animate={{ x: [-8, 8, -8] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" aria-hidden="true" />

          <div
            ref={scrollerRef}
            onWheel={onWheel}
            role="list"
            aria-label="Seven sins index"
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-6 pb-6 -mx-6 px-6 sm:mx-0 sm:px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {sins.map((s, i) => {
              const accent = ACCENTS[s.key] || '#D9C68A';
              return (
                <motion.button
                  key={s.key}
                  role="listitem"
                  ref={(el) => (cardRefs.current[i] = el)}
                  onClick={() => onSelect?.(s.header)}
                  initial="initial"
                  whileInView="inView"
                  custom={i}
                  viewport={{ amount: 0.6, once: true }}
                  variants={cardVariants}
                  className="group relative text-left overflow-hidden rounded-[12px] border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700/60 snap-center shrink-0 hover:-translate-y-1"
                  style={{
                    borderColor: 'rgba(217,198,138,0.28)',
                    backgroundColor: 'rgba(10,10,10,0.9)',
                    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)), radial-gradient(60% 150% at 50% -40%, rgba(255,255,255,0.04), rgba(0,0,0,0))',
                    boxShadow: '0 0 0 1px rgba(217,198,138,0.18) inset',
                    width: '260px',
                    height: '460px',
                  }}
                  whileHover={{ boxShadow: '0 0 0 1px rgba(217,198,138,0.45), 0 0 22px rgba(217,198,138,0.16)' }}
                  aria-label={`${s.greek} — ${s.tagline}`}
                >
                  {/* texture */}
                  <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)'
                  }} />

                  {/* per-card ambient layer */}
                  <AccentLayer sinKey={s.key} />

                  {/* unroll on view (fade + vertical slide supported by cardVariants) */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent"
                    initial={{ translateY: '0%' }}
                    whileInView={{ translateY: '-100%' }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                  />

                  {/* Centered layout with fixed top block to align divider across all cards */}
                  <div className="relative p-6 sm:p-7 h-full flex flex-col items-center text-center">
                    {/* Fixed-height top block */}
                    <div className="w-full flex flex-col items-center" style={{ height: 240 }}>
                      {/* Titles */}
                      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.18} variants={textStagger}>
                        <div className="text-[0.72rem] tracking-[0.32em] uppercase text-neutral-500" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>{s.greek}</div>
                      </motion.div>
                      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.3} variants={textStagger}>
                        {/* Title with faint gild + color underline per sin */}
                        <motion.div
                          className="mt-1 text-[0.7rem] tracking-[0.28em] uppercase text-transparent bg-clip-text bg-[length:200%_100%]"
                          style={{
                            fontFamily: "'Mona Sans', ui-sans-serif, system-ui",
                            backgroundImage: `linear-gradient(90deg, rgba(235,227,204,0.9), ${accent}, rgba(235,227,204,0.9))`,
                            textShadow: '0 0 6px rgba(217,198,138,0.12)'
                          }}
                          animate={{ backgroundPositionX: ['0%', '100%', '0%'] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        >
                          {s.header}
                        </motion.div>
                        <div className="mt-1 h-px w-10 mx-auto" style={{ backgroundColor: accent, opacity: 0.6 }} />
                      </motion.div>

                      {/* Tagline */}
                      <motion.h4
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={0.44}
                        variants={textStagger}
                        className="mt-6 text-[1.05rem] sm:text-xl leading-snug"
                        style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif", color: '#E7E4DC' }}
                      >
                        “{s.tagline}”
                      </motion.h4>

                      {/* Description */}
                      <motion.p
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={0.58}
                        variants={textStagger}
                        className="mt-4 text-[0.9rem] leading-relaxed text-neutral-200/90 px-1"
                        style={{
                          fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif",
                          letterSpacing: '0.01em'
                        }}
                      >
                        {s.description}
                      </motion.p>

                      {/* Spacer to normalize divider position across varying copy lengths */}
                      <div className="mt-2 flex-1" />
                    </div>

                    {/* Divider at a fixed position across all cards */}
                    <div className="h-px w-14" style={{ backgroundColor: 'rgba(217,198,138,0.35)' }} aria-hidden="true" />

                    {/* Trail */}
                    <motion.p
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={0.7}
                      variants={textStagger}
                      className="mt-4 text-[0.86rem] leading-relaxed text-neutral-300"
                      style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}
                    >
                      <span className="text-neutral-400/80 mr-1">Trail:</span>
                      {s.trail}
                    </motion.p>

                    {/* Action */}
                    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={0.82} variants={textStagger} className="mt-auto w-full">
                      <div className="mt-6 flex items-center justify-center">
                        <span className="tracking-[0.28em] text-[0.72rem] text-[#D9C68A]/80 group-hover:text-[#E7D9A7] transition-colors" style={{ fontFamily: "'Mona Sans', ui-sans-serif, system-ui" }}>
                          {s.action}
                        </span>
                      </div>
                    </motion.div>

                    {/* subtle bottom accent */}
                    <div className="absolute inset-x-10 bottom-0 h-px bg-[#FFFFFF14]" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-[2px] w-full bg-[#FFFFFF14] rounded">
            <motion.div
              className="h-full bg-[#D9C68A]/70 rounded"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ type: 'tween', duration: 0.2 }}
            />
          </div>

          {/* Hint */}
          <div className="mt-3 flex items-center justify-center gap-3 text-[0.72rem] tracking-[0.28em] text-neutral-500/80 uppercase">
            <span>Scroll right</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
