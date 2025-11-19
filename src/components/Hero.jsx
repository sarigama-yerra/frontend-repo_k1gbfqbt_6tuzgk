import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

// Typewriter that sequentially types and deletes an array of sentences.
// Accessibility: announces updates politely and respects prefers-reduced-motion.
function Typewriter({
  sentences,
  typingSpeed = 42,
  deletingSpeed = 28,
  holdAfterType = 900,
  holdAfterDelete = 350,
  onComplete,
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'holding' | 'deleting'
  const [cursorOn, setCursorOn] = useState(true);
  const liveRef = useRef(null);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

  // Announce changes for screen readers
  useEffect(() => {
    if (liveRef.current) liveRef.current.textContent = display;
  }, [display]);

  useEffect(() => {
    if (!sentences?.length) return;
    const current = sentences[index];

    if (reduce) {
      // Reduced motion: just show each sentence briefly without type/delete effect
      setDisplay(current);
      const id = setTimeout(() => {
        if (index < sentences.length - 1) {
          setIndex((i) => i + 1);
        } else {
          onComplete?.();
        }
      }, 1200);
      return () => clearTimeout(id);
    }

    let id;
    if (phase === 'typing') {
      if (display.length < current.length) {
        id = setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        setPhase('holding');
        id = setTimeout(() => setPhase('deleting'), holdAfterType);
      }
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        id = setTimeout(() => {
          setDisplay(current.slice(0, display.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next sentence or finish
        if (index < sentences.length - 1) {
          id = setTimeout(() => {
            setIndex((i) => i + 1);
            setPhase('typing');
          }, holdAfterDelete);
        } else {
          onComplete?.();
        }
      }
    } else if (phase === 'holding') {
      // No op; waiting for timeout set when finishing typing
    }

    return () => clearTimeout(id);
  }, [display, phase, index, sentences, typingSpeed, deletingSpeed, holdAfterType, holdAfterDelete, onComplete, reduce]);

  // When index changes, reset display/phase for next sentence
  useEffect(() => {
    if (!sentences?.length) return;
    setDisplay('');
    setPhase('typing');
  }, [index, sentences]);

  return (
    <div className="relative w-full">
      {/* Screen reader live region */}
      <span ref={liveRef} className="sr-only" aria-live="polite" />

      <div className="mx-auto text-center">
        <span
          className="text-[1.25rem] sm:text-3xl md:text-4xl leading-relaxed text-[#E7E4DC]"
          style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif" }}
          aria-label={display}
        >
          {display}
        </span>
        <span
          aria-hidden="true"
          className="inline-block w-[1ch]"
          style={{
            color: '#D9C68A',
            opacity: cursorOn ? 1 : 0.2,
            transition: 'opacity 200ms linear',
          }}
        >
          |
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const serif = useMemo(() => ({ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif" }), []);

  const sentences = [
    'Every sin leaves a trace.',
    'Seven temptations, seven trails — do you dare follow?',
    'Some desires demand to be worn, others to be consumed.',
  ];

  const [finished, setFinished] = useState(false);

  return (
    <section aria-label="ELANOR cinematic typewriter introduction" className="relative min-h-[100vh] w-full bg-black text-neutral-100 overflow-hidden">
      {/* Background mist */}
      <div className="absolute inset-0 opacity-40">
        <BackgroundMist />
      </div>

      {/* Fixed ELANOR mark in the middle */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0.18, filter: 'blur(8px)', scale: 0.98 }}
          animate={finished ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative select-none"
        >
          <span
            className="block text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none text-white"
            style={{ ...serif, letterSpacing: '-0.02em' }}
          >
            ELANOR
          </span>

          {/* Golden shine sweep on reveal (disabled for reduced motion) */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              initial={{ x: '-120%', opacity: 0 }}
              animate={finished ? { x: '140%', opacity: 0.8 } : {}}
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
        {/* Center the typewriter exactly in the viewport */}
        <div className="absolute inset-0 grid place-items-center">
          <Typewriter
            sentences={sentences}
            onComplete={() => setFinished(true)}
            typingSpeed={40}
            deletingSpeed={26}
            holdAfterType={900}
            holdAfterDelete={350}
          />
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

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" aria-hidden="true" />
    </section>
  );
}
