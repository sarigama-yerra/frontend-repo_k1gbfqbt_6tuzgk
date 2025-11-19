import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

// Deliberate, premium ease
const easeCinematic = [0.2, 0.0, 0, 1];

export default function StoryScroll() {
  const reduce = useReducedMotion();

  // Outer section controls parallax + end transition
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.35 });

  // Parallax layers (mist slower than text)
  const mistY = useTransform(progress, [0, 1], [20, -20]); // ~40% perceived
  const shadowY = useTransform(progress, [0, 1], [30, -30]); // ~60% perceived
  const mistOpacity = useTransform(progress, [0, 1], [0.025, 0.04]);

  // Three micro-sections with independent reveal thresholds
  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const s3Ref = useRef(null);

  // For each sentence, map 8–12% scroll window to fade 0->1
  const s1 = useScroll({ target: s1Ref, offset: ['start 85%', 'start 73%'] }); // ~12%
  const s2 = useScroll({ target: s2Ref, offset: ['start 85%', 'start 73%'] });
  const s3 = useScroll({ target: s3Ref, offset: ['start 85%', 'start 73%'] });

  const s1In = useSpring(s1.scrollYProgress, { stiffness: 140, damping: 22, mass: 0.3 });
  const s2In = useSpring(s2.scrollYProgress, { stiffness: 140, damping: 22, mass: 0.3 });
  const s3In = useSpring(s3.scrollYProgress, { stiffness: 140, damping: 22, mass: 0.3 });

  // Background dim up to 5% during each transition
  const s1Dim = useTransform(s1In, [0, 1], [0, 0.05]);
  const s2Dim = useTransform(s2In, [0, 1], [0, 0.05]);
  const s3Dim = useTransform(s3In, [0, 1], [0, 0.05]);

  // Exit to next section (fade/tilt/darken)
  const exitDark = useTransform(progress, [0.92, 1], [0, 0.08]);
  const exitTilt = useTransform(progress, [0.92, 1], [0, -3]); // degrees (subtle perspective)
  const exitFade = useTransform(progress, [0.92, 1], [1, 0]);

  // Snap behavior: use CSS scroll-snap with proximity for softness
  // Each sentence block is full-viewport height micro-section
  const serif = { fontFamily: 'var(--font-serif)' };

  // Accessibility: if reduced motion, render static
  const reduceOpacity = (t) => (reduce ? 1 : t);
  const reduceY = (t, from = 20, to = 0) => (reduce ? 0 : useTransform(t, [0, 1], [from, to]));

  return (
    <section ref={sectionRef} aria-label="Story prelude" className="relative w-full bg-black text-[#E7E4DC] overflow-hidden">
      {/* Global mist (very subtle, slower than scroll) */}
      <motion.div className="absolute inset-0" style={{ opacity: mistOpacity }} aria-hidden>
        <motion.div style={{ y: mistY }} className="w-full h-full">
          <BackgroundMist />
        </motion.div>
      </motion.div>

      {/* Soft parallax shadow layer behind text */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: shadowY, opacity: 0.08 }} aria-hidden>
        <div className="w-full h-full" style={{
          background:
            'radial-gradient(60% 40% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%), ' +
            'radial-gradient(40% 60% at 20% 20%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)'
        }} />
      </motion.div>

      {/* Scrollable stack of micro-sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="h-[18vh] sm:h-[22vh]" />

        <div className="relative snap-y snap-proximity">
          {/* Sentence 1 */}
          <div ref={s1Ref} className="min-h-[85vh] grid place-items-center snap-center relative">
            {!reduce && (
              <motion.div aria-hidden className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: s1Dim }} />
            )}
            <motion.p
              style={{ ...serif, opacity: reduceOpacity(s1In), y: reduceY(s1In, 24, 0) }}
              transition={{ duration: 0.9, ease: easeCinematic }}
              className="text-center leading-relaxed text-[1.2rem] sm:text-3xl md:text-5xl"
            >
              “Desire has ruled us longer than history.”
            </motion.p>
          </div>

          {/* Spacer */}
          <div className="h-[16vh]" />

          {/* Sentence 2 */}
          <div ref={s2Ref} className="min-h-[85vh] grid place-items-center snap-center relative">
            {!reduce && (
              <motion.div aria-hidden className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: s2Dim }} />
            )}
            <motion.p
              style={{
                ...serif,
                opacity: reduceOpacity(s2In),
                y: reduceY(s2In, 26, 0),
                WebkitMaskImage: reduce ? 'none' : 'radial-gradient(120% 120% at 50% 60%, #000 45%, transparent 80%)',
                maskImage: reduce ? 'none' : 'radial-gradient(120% 120% at 50% 60%, black 45%, transparent 80%)',
                WebkitMaskSize: '140% 140%',
                maskSize: '140% 140%',
              }}
              transition={{ duration: 1.0, ease: easeCinematic }}
              className="text-center leading-relaxed text-[1.2rem] sm:text-3xl md:text-5xl"
            >
              “It pulls, corrupts, and crowns — all without a sound.”
            </motion.p>
          </div>

          {/* Spacer */}
          <div className="h-[16vh]" />

          {/* Sentence 3 */}
          <div ref={s3Ref} className="min-h-[85vh] grid place-items-center snap-center relative">
            {!reduce && (
              <motion.div aria-hidden className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: s3Dim }} />
            )}
            <motion.p
              style={{ ...serif, opacity: reduceOpacity(s3In), y: reduceY(s3In, 22, 0), scale: reduce ? 1 : useTransform(s3In, [0, 1], [0.995, 1.02]) }}
              transition={{ duration: 0.9, ease: easeCinematic }}
              className="text-center leading-relaxed text-[1.2rem] sm:text-3xl md:text-5xl"
            >
              “Tell me… which sin calls your name?”
            </motion.p>
          </div>
        </div>

        <div className="h-[24vh]" />
      </div>

      {/* Exit: fade out, subtle perspective tilt, darken background as we approach next section */}
      {!reduce && (
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: exitDark, backgroundColor: 'rgba(0,0,0,1)' }} aria-hidden />
      )}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: exitFade, transformOrigin: '50% 100% 0' }} aria-hidden>
        <motion.div style={{ rotateX: exitTilt }} className="w-full h-full" />
      </motion.div>
    </section>
  );
}
