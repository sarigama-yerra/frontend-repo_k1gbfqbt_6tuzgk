import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

function ShimmerWord({ children, delay = 0, duration = 1.2, intensity = 0.12, color = '#D9C68A' }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span style={{ color: color, opacity: 0.9 }}>{children}</span>;
  }
  return (
    <motion.span
      aria-hidden="false"
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(217,198,138,0), ${color}, rgba(217,198,138,0))`,
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        textShadow: `0 0 12px rgba(217,198,138,${intensity}), 0 0 20px rgba(217,198,138,${intensity * 0.5})`,
      }}
      initial={{ backgroundPositionX: '120%' }}
      whileInView={{ backgroundPositionX: '-20%' }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

function Sentence({ children, delay = 0, threshold = 0.55, duration = 0.7 }) {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 0 } : { opacity: 0, y: 20 };
  const animate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };
  return (
    <motion.p
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: threshold }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className="text-[1.15rem] sm:text-2xl md:text-3xl leading-relaxed text-[#E7E4DC] text-center"
      style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif" }}
    >
      {children}
    </motion.p>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  // Background ELANOR parallax + reveal
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [0.18, 0.18, 0.2]);
  const revealBlur = useTransform(scrollYProgress, [0.85, 1], [24, 0]);
  const revealOpacity = useTransform(scrollYProgress, [0.85, 1], [0.18, 1]);
  const revealScale = useTransform(scrollYProgress, [0.85, 1], [0.95, 1]);

  const serif = useMemo(() => ({ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif" }), []);

  return (
    <section
      ref={sectionRef}
      aria-label="ELANOR cinematic introduction"
      className="relative min-h-[140vh] w-full bg-black text-neutral-100 overflow-hidden"
    >
      {/* Background mist */}
      <div className="absolute inset-0 opacity-40">
        <BackgroundMist />
      </div>

      {/* Background ELANOR word with parallax */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: reduce ? 0.2 : bgOpacity }}
      >
        <motion.div
          style={{
            scale: reduce ? 1 : bgScale,
            y: reduce ? 0 : bgY,
            filter: `blur(${reduce ? 20 : 24}px)`,
          }}
          className="select-none"
        >
          <div
            className="text-[16vw] sm:text-[14vw] md:text-[12vw] leading-none tracking-tight text-white/90"
            style={{ ...serif, letterSpacing: '-0.02em', opacity: 0.9 }}
          >
            ELANOR
          </div>
        </motion.div>
      </motion.div>

      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 pt-28 sm:pt-32">
        {/* Sigil / small mark */}
        <div className="flex justify-start">
          <div className="w-12 h-12 rounded-full border border-neutral-700/60 bg-neutral-900/30 backdrop-blur-sm flex items-center justify-center" aria-label="ELANOR sigil">
            <span className="w-5 h-5 relative">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-neutral-500/70" />
              <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-neutral-500/70" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-neutral-500/70" />
            </span>
          </div>
        </div>

        {/* Sentences */}
        <div className="mt-16 md:mt-24 space-y-8">
          {/* S1 */}
          <Sentence delay={0.0} threshold={0.55} duration={0.7}>
            Lean in; the air is already{' '}
            <ShimmerWord delay={0.4} duration={1.2} intensity={0.10}>choosing</ShimmerWord>
            .
          </Sentence>

          {/* S2 */}
          <Sentence delay={0.12} threshold={0.55} duration={0.7}>
            What you{' '}
            <ShimmerWord delay={0.2} duration={1.1} intensity={0.15}>covet</ShimmerWord>{' '}
            will{' '}
            <ShimmerWord delay={0.5} duration={1.1} intensity={0.12}>cling</ShimmerWord>
            —skin, silk, alibi.
          </Sentence>

          {/* S3 */}
          <Sentence delay={0.24} threshold={0.5} duration={0.7}>
            Name a{' '}
            <ShimmerWord delay={0.15} duration={0.9} intensity={0.12}>sin</ShimmerWord>
            ; we’ll give it a{' '}
            <span className="relative">
              <ShimmerWord delay={0.45} duration={1.2} intensity={0.12}>trail</ShimmerWord>
              <motion.span
                aria-hidden="true"
                className="absolute -inset-x-1 -bottom-1 h-px"
                style={{ background: 'linear-gradient(90deg, rgba(217,198,138,0), rgba(217,198,138,0.5), rgba(217,198,138,0))' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.6, duration: 1.5 }}
              />
            </span>
            .
          </Sentence>

          {/* S4 */}
          <Sentence delay={0.36} threshold={0.55} duration={0.8}>
            <ShimmerWord delay={0.2} duration={1.1} intensity={0.12}>Surrender</ShimmerWord>{' '}
            is a luxury you never return.
          </Sentence>
        </div>
      </div>

      {/* Foreground divider + gradient bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" aria-hidden="true" />

      {/* Finale brand reveal overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          style={{
            scale: reduce ? 1 : revealScale,
            filter: `blur(${reduce ? 0 : revealBlur.get()}px)`,
            opacity: reduce ? 1 : revealOpacity,
          }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div
            className="text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none text-white"
            style={{ ...serif, letterSpacing: '-0.02em' }}
          >
            ELANOR
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
