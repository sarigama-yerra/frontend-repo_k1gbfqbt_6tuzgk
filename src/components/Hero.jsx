import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

// Cinematic text sequence replacing the old typewriter.
// Crossfades lines with soft zoom and glow; respects reduced motion.
export default function Hero() {
  const reduce = useReducedMotion();
  const serif = useMemo(() => ({ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif" }), []);
  const sans = useMemo(() => ({ fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }), []);

  const lines = [
    'Every sin leaves a trace.',
    'Seven temptations, seven trails — do you dare follow?',
    'Some desires demand to be worn, others to be consumed.',
  ];

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Parallax state (mouse-based)
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const raf = useRef(0);
  const rootRef = useRef(null);

  // Timing controls (in ms)
  const inDur = 900;
  const holdDur = 1200;
  const outDur = 700;

  useEffect(() => {
    if (reduce) {
      // Reduced motion: show last line briefly then complete reveal.
      setIndex(lines.length - 1);
      const id = setTimeout(() => setFinished(true), 300);
      return () => clearTimeout(id);
    }

    const totalForLine = inDur + holdDur + outDur;
    const id = setTimeout(() => {
      if (index < lines.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setFinished(true);
      }
    }, totalForLine);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduce]);

  // Small star/speck field for atmosphere
  const Specks = ({ offset = { x: 0, y: 0 } }) => {
    const count = 24;
    const arr = Array.from({ length: count });
    return (
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ transform: `translate3d(${(-offset.x * 8).toFixed(2)}px, ${(-offset.y * 8).toFixed(2)}px, 0)` }}
      >
        {arr.map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const size = 1 + Math.random() * 2;
          const delay = Math.random() * 4;
          const duration = 6 + Math.random() * 6;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                background: 'rgba(217,198,138,0.35)',
                filter: 'blur(0.5px)',
                mixBlendMode: 'screen',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: [0, 0.7, 0], y: -12 }}
              transition={{ delay, duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}
      </div>
    );
  };

  const lineVariants = {
    initial: { opacity: 0, filter: 'blur(8px)', y: 8, scale: 0.985 },
    enter: { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 },
    exit: { opacity: 0, filter: 'blur(10px)', y: -6, scale: 1.01 },
  };

  // Mouse parallax handler
  const onMouseMove = (e) => {
    if (reduce) return;
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2); // -1..1
    const dy = (e.clientY - cy) / (rect.height / 2); // -1..1
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setParallax({ x: dx, y: dy });
    });
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <section
      ref={rootRef}
      onMouseMove={onMouseMove}
      aria-label="ELANOR cinematic prelude"
      className="relative min-h-[100vh] w-full bg-black text-neutral-100 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 opacity-40" style={{ transform: `translate3d(${(-parallax.x * 4).toFixed(2)}px, ${(-parallax.y * 4).toFixed(2)}px, 0)` }}>
        <BackgroundMist />
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.7) 100%)'
        }} />
      </div>

      {/* Fixed ELANOR mark in the middle */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0.18, filter: 'blur(8px)', scale: 0.98 }}
          animate={finished ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative select-none"
          style={{ transform: `translate3d(${(parallax.x * 6).toFixed(2)}px, ${(parallax.y * 6).toFixed(2)}px, 0)` }}
        >
          {/* Core wordmark */}
          <span
            className="block text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none text-white"
            style={{ ...serif, letterSpacing: '-0.02em' }}
          >
            ELANOR
          </span>

          {/* Soft gold inner glow */}
          <span
            aria-hidden
            className="absolute inset-0 blur-2xl opacity-30"
            style={{
              background: 'radial-gradient(40% 30% at 50% 55%, rgba(217,198,138,0.25) 0%, rgba(217,198,138,0) 60%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Golden shine sweep on reveal (disabled for reduced motion) */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              initial={{ x: '-120%', opacity: 0 }}
              animate={finished ? { x: '140%', opacity: 0.85 } : {}}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-y-0 w-1/3"
              style={{
                background: 'linear-gradient(100deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.35) 45%, rgba(217,198,138,0) 100%)',
                mixBlendMode: 'screen',
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Foreground content wrapper */}
      <div className="relative z-10 h-screen">
        {/* Atmospheric specks */}
        {!reduce && <Specks offset={parallax} />}

        {/* Centered cinematic lines */}
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            {!finished && (
              reduce ? (
                <motion.div
                  key="rm-lines"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: outDur / 1000, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto text-center space-y-4 px-6"
                  style={{ transform: `translate3d(${(parallax.x * 2).toFixed(2)}px, ${(parallax.y * 2).toFixed(2)}px, 0)` }}
                >
                  {lines.map((line, i) => (
                    <div key={i} className="text-[1.25rem] sm:text-3xl md:text-4xl leading-relaxed text-[#E7E4DC]" style={serif}>
                      {line}
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={index}
                  variants={lineVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto text-center px-6"
                  style={{ transform: `translate3d(${(parallax.x * 2).toFixed(2)}px, ${(parallax.y * 2).toFixed(2)}px, 0)` }}
                >
                  {/* Single clean line (removed gold duplicate layer) */}
                  <div className="relative inline-block">
                    <span
                      className="block text-[1.35rem] sm:text-4xl md:text-5xl leading-relaxed text-[#E7E4DC]"
                      style={{ ...serif, textTransform: 'none' }}
                    >
                      {lines[index]}
                    </span>
                    {/* Optional neutral soft shadow for readability */}
                    <span className="absolute inset-0 -translate-x-[0.5px] translate-y-[0.5px] opacity-15 text-neutral-300" aria-hidden>
                      {lines[index]}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Top-left sigil for brand detail */}
        <div className="absolute top-8 left-6 sm:top-10 sm:left-10">
          <div className="w-12 h-12 rounded-full border border-neutral-700/60 bg-neutral-900/30 backdrop-blur-sm flex items-center justify-center" aria-label="ELANOR sigil">
            <span className="w-5 h-5 relative">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-neutral-500/70" />
              <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-neutral-500/70" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-neutral-500/70" />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade + baseline glint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" aria-hidden="true" />
    </section>
  );
}
