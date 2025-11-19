import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sins = [
  {
    key: 'wrath',
    header: 'WRATH',
    greek: 'Orgí’',
    tagline: 'Vengeance burns eternal.',
    description: '“Let anger drive your hand. Make them remember your fire.”',
    trail: 'Smoldering embers, scorched leather, acrid metal — the trail of rage that cannot be contained.',
    action: 'OPEN WRATH',
  },
  {
    key: 'envy',
    header: 'ENVY',
    greek: 'Phthónos',
    tagline: 'Consume their light.',
    description: '“Watch, wait, and claim what they refuse to see slip away.”',
    trail: 'Bitter green vetiver, sharp galbanum, icy mineral — the cold, intoxicating trail of desire.',
    action: 'OPEN ENVY',
  },
  {
    key: 'lust',
    header: 'LUST',
    greek: 'Epithymía',
    tagline: 'Smell the forbidden.',
    description: '“Draw them close. Make desire obey your command.”',
    trail: 'Warm skin, dark amber, soft spice — an irresistible trail that clings and tempts without mercy.',
    action: 'OPEN LUST',
  },
  {
    key: 'pride',
    header: 'PRIDE',
    greek: 'Ypería',
    tagline: 'Bow to none.',
    description: '“Stand higher. Let them kneel in silent envy.”',
    trail: 'Black leather, smoky woods, golden tobacco — a commanding trail that marks your dominance.',
    action: 'OPEN PRIDE',
  },
  {
    key: 'gluttony',
    header: 'GLUTTONY',
    greek: 'Gastrimargía',
    tagline: 'Consume without end.',
    description: '“Take more. Never pause. Let excess define you.”',
    trail: 'Rich vanilla, caramelized rum, spiced sugar — the indulgent trail that smothers and seduces.',
    action: 'OPEN GLUTTONY',
  },
  {
    key: 'greed',
    header: 'GREED',
    greek: 'Pleonexía',
    tagline: 'Never enough.',
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
        <div className="mb-5 text-xs tracking-[0.25em] text-neutral-500 uppercase text-center">II. The Archive</div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-center" style={{
          fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
        }}>The Seven Sins</h3>
        <div className="mt-3 h-px w-20 bg-[#D9C68A]/15 mx-auto" aria-hidden="true" />

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
                  className="group relative text-left overflow-hidden rounded-[12px] border bg-neutral-950/40 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700/60 snap-start shrink-0"
                  style={{
                    borderColor: '#FFFFFF12',
                    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)), radial-gradient(60% 150% at 50% -40%, rgba(255,255,255,0.04), rgba(0,0,0,0))',
                    width: '260px',
                    height: '460px',
                  }}
                  aria-label={`${s.greek} — ${s.tagline}`}
                >
                  {/* texture */}
                  <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM1MTI1ODN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)'
                  }} />

                  {/* unroll */}
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
                        {/* Gilded shimmer text effect for main header */}
                        <motion.div
                          className="mt-1 text-[0.7rem] tracking-[0.28em] uppercase text-transparent bg-clip-text bg-[length:200%_100%]"
                          style={{
                            fontFamily: "'Mona Sans', ui-sans-serif, system-ui",
                            backgroundImage: 'linear-gradient(90deg, rgba(235,227,204,0.9), #D9C68A, rgba(235,227,204,0.9))',
                            textShadow: '0 0 6px rgba(217,198,138,0.12)'
                          }}
                          animate={{ backgroundPositionX: ['0%', '100%', '0%'] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        >
                          {s.header}
                        </motion.div>
                      </motion.div>

                      {/* Tagline */}
                      <motion.h4
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        custom={0.44}
                        variants={textStagger}
                        className="mt-6 text-[1.05rem] sm:text-xl leading-snug"
                        style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif", color: '#E7E4DC', textShadow: '0 1px 0 rgba(255,255,255,0.03), 0 0 10px rgba(233,223,181,0.06)' }}
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
                    <div className="h-px w-14 bg-[#D9C68A]/20" aria-hidden="true" />

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
