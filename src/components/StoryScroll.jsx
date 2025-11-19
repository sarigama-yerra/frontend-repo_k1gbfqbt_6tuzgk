import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

const easeCinematic = [0.22, 1, 0.36, 1];

export default function StoryScroll() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const t3Ref = useRef(null);

  // Section scroll progress (0 at top, 1 at bottom of section)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });

  // Trigger points
  const t1In = useTransform(progress, [0.02, 0.12], [0, 1]); // 2% -> 12%
  const t2In = useTransform(progress, [0.15, 0.28], [0, 1]); // 15% -> 28%
  const t3In = useTransform(progress, [0.5, 0.64], [0, 1]); // 50% -> 64%

  // Background dim during line 3
  const dim = useTransform(t3In, [0, 1], [0, 0.03]);

  // Mist drift very subtle
  const mistOpacity = useTransform(progress, [0, 1], [0.02, 0.03]);
  const mistY = useTransform(progress, [0, 1], [10, -10]);

  // In-view fallbacks for users who jump
  const inView1 = useInView(t1Ref, { margin: '-20% 0px -70% 0px', amount: 0.2 });
  const inView2 = useInView(t2Ref, { margin: '-20% 0px -70% 0px', amount: 0.2 });
  const inView3 = useInView(t3Ref, { margin: '-20% 0px -70% 0px', amount: 0.2 });

  const serifStyle = { fontFamily: 'var(--font-serif)' };

  return (
    <section ref={sectionRef} aria-label="Story prelude" className="relative w-full min-h-[180vh] bg-black text-neutral-100 overflow-hidden">
      {/* Subtle mist background */}
      <motion.div className="absolute inset-0" style={{ opacity: mistOpacity }} aria-hidden>
        <motion.div style={{ y: mistY }} className="w-full h-full">
          <BackgroundMist />
        </motion.div>
      </motion.div>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Spacer to create luxurious breathing room before first line */}
        <div className="h-[35vh]" />

        {/* TEXT 1 */}
        <div ref={t1Ref} className="min-h-[30vh] grid place-items-center">
          <motion.p
            aria-label="Story line 1"
            style={{
              ...serifStyle,
              opacity: reduce ? 1 : t1In,
              y: reduce ? 0 : useTransform(t1In, [0, 1], [20, 0]),
            }}
            transition={{ duration: 0.9, ease: easeCinematic }}
            className="text-center leading-relaxed text-[#E7E4DC] text-[1.25rem] sm:text-3xl md:text-5xl"
          >
            “Desire has ruled us longer than history.”
          </motion.p>
        </div>

        {/* Spacer between lines */}
        <div className="h-[25vh]" />

        {/* TEXT 2 */}
        <div ref={t2Ref} className="min-h-[30vh] grid place-items-center">
          <motion.div
            aria-label="Story line 2"
            className="relative"
            style={{
              opacity: reduce ? 1 : t2In,
              filter: reduce ? 'none' : undefined,
            }}
            transition={{ duration: 1.0, ease: easeCinematic }}
          >
            {/* Smoke mask container */}
            <motion.p
              className="text-center leading-relaxed text-[#E7E4DC] text-[1.25rem] sm:text-3xl md:text-5xl"
              style={{
                ...serifStyle,
                WebkitMaskImage: reduce ? 'none' : 'radial-gradient(120% 120% at 50% 60%, #000 45%, transparent 80%)',
                maskImage: reduce ? 'none' : 'radial-gradient(120% 120% at 50% 60%, black 45%, transparent 80%)',
                WebkitMaskSize: '140% 140%',
                maskSize: '140% 140%',
                WebkitMaskPosition: reduce ? '50% 50%' : useTransform(t2In, [0, 1], ['50% 90%', '50% 50%']),
                maskPosition: reduce ? '50% 50%' : useTransform(t2In, [0, 1], ['50% 90%', '50% 50%']),
                filter: reduce ? 'none' : useTransform(t2In, [0, 1], ['blur(8px)', 'blur(0px)']),
              }}
              transition={{ duration: 1.0, ease: easeCinematic }}
            >
              “It pulls, corrupts, and crowns — all without a sound.”
            </motion.p>
            {!reduce && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  filter: useTransform(t2In, [0, 1], ['blur(10px)', 'blur(2px)']),
                  opacity: useTransform(t2In, [0, 1], [0.0, 0.15]),
                  background: 'radial-gradient(60% 50% at 50% 50%, rgba(217,198,138,0.12) 0%, rgba(217,198,138,0) 70%)',
                  mixBlendMode: 'screen',
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Spacer between lines */}
        <div className="h-[25vh]" />

        {/* TEXT 3 */}
        <div ref={t3Ref} className="min-h-[30vh] grid place-items-center relative">
          {/* Spotlight dim overlay */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: dim }}
              aria-hidden
            />
          )}
          <motion.p
            aria-label="Story line 3"
            style={{
              ...serifStyle,
              opacity: reduce ? 1 : t3In,
              scale: reduce ? 1 : useTransform(t3In, [0, 1], [0.995, 1.02]),
            }}
            transition={{ duration: 0.8, ease: easeCinematic }}
            className="relative text-center leading-relaxed text-[#E7E4DC] text-[1.25rem] sm:text-3xl md:text-5xl"
          >
            “Tell me… which sin calls your name?”
          </motion.p>
        </div>

        {/* End-of-section transition spacer */}
        <div className="h-[30vh]" />
      </div>

      {/* Fade-out and lift to next section when leaving */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: useTransform(progress, [0.8, 1], [1, 0]),
          backdropFilter: useTransform(progress, [0.8, 1], ['blur(1.5px)', 'blur(0px)']),
        }}
      />
    </section>
  );
}
