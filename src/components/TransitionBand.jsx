import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

// A cinematic, scroll-driven divider that lives between major pages/chapters.
// Variants:
// - cinematic (default): vignette + mist + gold sweep line
// - curtain: two black panels close, a gold edge glints, then they open again
// - iris: a circular mask tightens to near-black, then opens into next chapter
export default function TransitionBand({ label = 'Chapter transition', height = 140, variant = 'cinematic' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Local scroll progress for the band
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.25 });

  // Shared ambiance
  const vignette = useTransform(p, [0, 0.5, 1], [0, 0.35, 0]);
  const mistY = useTransform(p, [0, 1], [20, -10]);
  const mistO = useTransform(p, [0, 1], [reduce ? 0 : 0.03, reduce ? 0 : 0.06]);
  const dim = useTransform(p, [0, 0.5, 1], [0, variant === 'cinematic' ? 0.06 : 0.12, 0]);

  // Gold sweep (cinematic default)
  const sweepX = useTransform(p, [0, 1], ['-15%', '115%']);
  const sweepGlow = useTransform(p, [0, 0.5, 1], [0.05, 0.22, 0.05]);

  // Curtain mechanics
  const leftCurtainX = useTransform(p, [0, 0.5, 1], ['-110%', '0%', '-110%']);
  const rightCurtainX = useTransform(p, [0, 0.5, 1], ['110%', '0%', '110%']);
  const edgeGlow = useTransform(p, [0, 0.5, 1], [0, 0.8, 0]);

  // Iris mechanics (clip radius in % of min dimension)
  const irisRadius = useTransform(p, [0, 0.5, 1], [120, 8, 120]);

  // Film-burn gold flare (applies to all variants)
  // Note: Kept conservative to avoid Safari/iOS black-screen blend bugs.
  const flareOpacity = useTransform(p, [0, 0.42, 0.5, 0.58, 1], [0, reduce ? 0.08 : 0.0, reduce ? 0.14 : 0.38, reduce ? 0.08 : 0.0, 0]);
  const flareScale = useTransform(p, [0, 0.5, 1], [1.02, 1.0, 1.02]);
  const flareRotate = useTransform(p, [0, 0.5, 1], [-1, 0, 1]);
  const supportsScreen = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('mix-blend-mode', 'screen');

  // Secondary horizontal lens streak synced with flare peak
  const streakOpacity = useTransform(p, [0, 0.46, 0.5, 0.54, 1], [0, 0.0, reduce ? 0.12 : 0.32, 0.0, 0]);
  const streakScaleX = useTransform(p, [0, 0.5, 1], [0.92, 1.0, 0.92]);

  return (
    <section
      ref={ref}
      aria-label={label}
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: `${height}vh` }}
    >
      {/* Mist layer */}
      <motion.div className="absolute inset-0" style={{ opacity: mistO }} aria-hidden>
        <motion.div style={{ y: mistY }} className="w-full h-full">
          <BackgroundMist />
        </motion.div>
      </motion.div>

      {/* Base vignette + dim */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(120% 80% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 80%)',
          opacity: vignette,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: dim }}
      />

      {/* Variant layers */}
      {variant === 'cinematic' && !reduce && (
        <motion.div
          aria-hidden
          className="absolute top-1/2 h-px w-[30%]"
          style={{
            left: sweepX,
            boxShadow: '0 0 24px rgba(217,198,138,0.25), 0 0 64px rgba(217,198,138,0.12)',
            background: 'linear-gradient(90deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
            opacity: sweepGlow,
          }}
        />
      )}

      {variant === 'curtain' && (
        <>
          {/* Panels - always render for layout, but reduce motion removes animation intensity */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/2 bg-black"
            style={{ x: reduce ? 0 : leftCurtainX }}
          >
            {!reduce && (
              <motion.div
                className="absolute top-0 right-0 w-[2px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
                  boxShadow: '0 0 20px rgba(217,198,138,0.35)',
                  opacity: edgeGlow,
                }}
              />
            )}
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute inset-y-0 right-0 w-1/2 bg-black"
            style={{ x: reduce ? 0 : rightCurtainX }}
          >
            {!reduce && (
              <motion.div
                className="absolute top-0 left-0 w-[2px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
                  boxShadow: '0 0 20px rgba(217,198,138,0.35)',
                  opacity: edgeGlow,
                }}
              />
            )}
          </motion.div>
        </>
      )}

      {variant === 'iris' && (
        <>
          {/* Iris reveal uses clip-path on a gold-tinted overlay */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(60% 60% at 50% 50%, rgba(217,198,138,0.07) 0%, rgba(0,0,0,0.8) 100%)',
              clipPath: reduce ? 'none' : irisRadius.to((r) => `circle(${r}% at 50% 50%)`),
            }}
          />
          {/* Subtle gold sweep synchronized near the tightest point */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute top-1/2 h-[2px] w-1/3"
              style={{
                left: useTransform(p, [0, 0.5, 1], ['-30%', '50%', '130%']),
                translateX: '-50%',
                background: 'linear-gradient(90deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.85) 50%, rgba(217,198,138,0) 100%)',
                boxShadow: '0 0 26px rgba(217,198,138,0.28)'
              }}
            />
          )}
        </>
      )}

      {/* Gold film-burn flare overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: flareOpacity,
          // Keep flare bounded to avoid large-surface blending issues on some GPUs
          maskImage: 'radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 75%)',
          WebkitMaskImage: 'radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.85) 55%, rgba(0,0,0,0) 75%)',
        }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            scale: flareScale,
            rotate: flareRotate,
            width: '80vmax',
            height: '80vmax',
            background:
              'radial-gradient(closest-side, rgba(217,198,138,0.32), rgba(217,198,138,0.16) 40%, rgba(217,198,138,0.06) 60%, rgba(217,198,138,0.0) 75%)',
            filter: 'blur(8px)',
            willChange: 'transform, filter, opacity',
            mixBlendMode: supportsScreen ? 'screen' : 'normal',
          }}
        />
        {/* Subtle conic flare tint for depth */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            scale: flareScale,
            rotate: flareRotate,
            width: '100vmax',
            height: '100vmax',
            background:
              'conic-gradient(from 0deg at 50% 50%, rgba(217,198,138,0.0), rgba(217,198,138,0.12), rgba(217,198,138,0.0) 33%, rgba(217,198,138,0.08), rgba(217,198,138,0.0) 66%)',
            filter: 'blur(16px)',
            willChange: 'transform, filter, opacity',
            mixBlendMode: supportsScreen ? 'screen' : 'normal',
          }}
        />
        {/* Horizontal lens streak */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[2px]"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            width: '60%',
            opacity: streakOpacity,
            scaleX: streakScaleX,
            background: 'linear-gradient(90deg, rgba(217,198,138,0), rgba(217,198,138,0.8), rgba(217,198,138,0))',
            boxShadow: '0 0 30px rgba(217,198,138,0.35), 0 0 80px rgba(217,198,138,0.2)',
            willChange: 'transform, opacity',
            mixBlendMode: supportsScreen ? 'screen' : 'normal',
          }}
        />
      </motion.div>

      {/* Soft grainish sheen (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 40%, rgba(217,198,138,0.05) 0%, rgba(217,198,138,0) 70%)',
        }}
      />

      {/* Spacer content to create breathing room */}
      <div className="relative z-10" style={{ height: `calc(${height}vh * 0.2)` }} />
    </section>
  );
}
