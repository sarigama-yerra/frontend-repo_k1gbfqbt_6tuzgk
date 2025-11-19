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

  // SAFETY: globally tame dark overlays to avoid full-black reports
  const MAX_VIGNETTE = 0.22; // was 0.35
  const MAX_DIM_CIN = 0.04;  // was 0.06
  const MAX_DIM_OTHER = 0.08; // was 0.12

  // Shared ambiance
  const vignette = useTransform(p, [0, 0.5, 1], [0, MAX_VIGNETTE, 0]);
  const mistY = useTransform(p, [0, 1], [20, -10]);
  const mistO = useTransform(p, [0, 1], [reduce ? 0 : 0.03, reduce ? 0 : 0.06]);
  const dim = useTransform(p, [0, 0.5, 1], [0, variant === 'cinematic' ? MAX_DIM_CIN : MAX_DIM_OTHER, 0]);

  // Gold sweep (cinematic default)
  const sweepX = useTransform(p, [0, 1], ['-15%', '115%']);
  const sweepGlow = useTransform(p, [0, 0.5, 1], [0.05, 0.18, 0.05]);

  // Curtain mechanics
  const leftCurtainX = useTransform(p, [0, 0.5, 1], ['-110%', '0%', '-110%']);
  const rightCurtainX = useTransform(p, [0, 0.5, 1], ['110%', '0%', '110%']);
  const edgeGlow = useTransform(p, [0, 0.5, 1], [0, 0.65, 0]);

  // Iris mechanics (clip radius in % of min dimension)
  const irisRadius = useTransform(p, [0, 0.5, 1], [120, 12, 120]);

  // Feature detection for risky effects
  const supports = {
    screen: typeof CSS !== 'undefined' && CSS.supports && CSS.supports('mix-blend-mode', 'screen'),
    mask: typeof CSS !== 'undefined' && CSS.supports && (
      CSS.supports('mask-image', 'radial-gradient(white, black)') ||
      CSS.supports('-webkit-mask-image', 'radial-gradient(white, black)')
    )
  };

  // Film-burn gold flare (temporarily disabled as a failsafe on PC reports of black screen)
  const ENABLE_FLARE = false;

  // Flare dynamics (kept for quick re-enable)
  const flareOpacity = useTransform(
    p,
    [0, 0.42, 0.5, 0.58, 1],
    [0, reduce ? 0.06 : 0.0, reduce ? 0.1 : 0.18, reduce ? 0.06 : 0.0, 0]
  );
  const flareScale = useTransform(p, [0, 0.5, 1], [1.02, 1.0, 1.02]);
  const flareRotate = useTransform(p, [0, 0.5, 1], [-1, 0, 1]);

  // Secondary horizontal lens streak synced with flare peak
  const streakOpacity = useTransform(p, [0, 0.46, 0.5, 0.54, 1], [0, 0.0, reduce ? 0.08 : 0.16, 0.0, 0]);
  const streakScaleX = useTransform(p, [0, 0.5, 1], [0.92, 1.0, 0.92]);

  return (
    <section
      ref={ref}
      aria-label={label}
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: `${height}vh` }}
    >
      {/* Mist layer */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity: mistO }} aria-hidden>
        <motion.div style={{ y: mistY }} className="w-full h-full">
          <BackgroundMist />
        </motion.div>
      </motion.div>

      {/* Base vignette + dim */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(120% 80% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 80%)',
          opacity: vignette,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: dim }}
      />

      {/* Variant layers */}
      {variant === 'cinematic' && !reduce && (
        <motion.div
          aria-hidden
          className="absolute top-1/2 h-px w-[30%] z-10"
          style={{
            left: sweepX,
            boxShadow: '0 0 24px rgba(217,198,138,0.22), 0 0 64px rgba(217,198,138,0.1)',
            background: 'linear-gradient(90deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
            opacity: sweepGlow,
          }}
        />
      )}

      {variant === 'curtain' && (
        <>
          {/* Panels */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[48%] bg-black/95 z-10"
            style={{ x: reduce ? 0 : leftCurtainX }}
          >
            {!reduce && (
              <motion.div
                className="absolute top-0 right-0 w-[2px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
                  boxShadow: '0 0 20px rgba(217,198,138,0.3)',
                  opacity: edgeGlow,
                }}
              />
            )}
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[48%] bg-black/95 z-10"
            style={{ x: reduce ? 0 : rightCurtainX }}
          >
            {!reduce && (
              <motion.div
                className="absolute top-0 left-0 w-[2px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.9) 50%, rgba(217,198,138,0) 100%)',
                  boxShadow: '0 0 20px rgba(217,198,138,0.3)',
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
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: 'radial-gradient(60% 60% at 50% 50%, rgba(217,198,138,0.06) 0%, rgba(0,0,0,0.35) 100%)',
              clipPath: reduce ? 'none' : irisRadius.to((r) => `circle(${r}% at 50% 50%)`),
            }}
          />
          {/* Subtle gold sweep synchronized near the tightest point */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute top-1/2 h-[2px] w-1/3 z-10"
              style={{
                left: useTransform(p, [0, 0.5, 1], ['-30%', '50%', '130%']),
                translateX: '-50%',
                background: 'linear-gradient(90deg, rgba(217,198,138,0) 0%, rgba(217,198,138,0.85) 50%, rgba(217,198,138,0) 100%)',
                boxShadow: '0 0 26px rgba(217,198,138,0.24)'
              }}
            />
          )}
        </>
      )}

      {/* Gold film-burn flare overlay – disabled for now (ENABLE_FLARE) */}
      {ENABLE_FLARE && supports.mask && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: flareOpacity,
            maskImage: 'radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0.85) 55%, rgba(255,255,255,0) 75%)',
            WebkitMaskImage: 'radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0.85) 55%, rgba(255,255,255,0) 75%)',
          }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              translateX: '-50%',
              translateY: '-50%',
              scale: flareScale,
              rotate: flareRotate,
              width: '72vmax',
              height: '72vmax',
              background:
                'radial-gradient(closest-side, rgba(217,198,138,0.22), rgba(217,198,138,0.1) 40%, rgba(217,198,138,0.05) 60%, rgba(217,198,138,0.0) 75%)',
              filter: 'blur(8px)',
              willChange: 'transform, filter, opacity',
              mixBlendMode: supports.screen ? 'screen' : 'normal',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              translateX: '-50%',
              translateY: '-50%',
              scale: flareScale,
              rotate: flareRotate,
              width: '90vmax',
              height: '90vmax',
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(217,198,138,0.0), rgba(217,198,138,0.1), rgba(217,198,138,0.0) 33%, rgba(217,198,138,0.06), rgba(217,198,138,0.0) 66%)',
              filter: 'blur(14px)',
              willChange: 'transform, filter, opacity',
              mixBlendMode: supports.screen ? 'screen' : 'normal',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[2px]"
            style={{
              translateX: '-50%',
              translateY: '-50%',
              width: '56%',
              opacity: streakOpacity,
              scaleX: streakScaleX,
              background: 'linear-gradient(90deg, rgba(217,198,138,0), rgba(217,198,138,0.7), rgba(217,198,138,0))',
              boxShadow: '0 0 24px rgba(217,198,138,0.28), 0 0 64px rgba(217,198,138,0.16)',
              willChange: 'transform, opacity',
              mixBlendMode: supports.screen ? 'screen' : 'normal',
            }}
          />
        </motion.div>
      )}

      {/* Soft grainish sheen (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light z-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 40%, rgba(217,198,138,0.05) 0%, rgba(217,198,138,0) 70%)',
        }}
      />

      {/* Spacer content to create breathing room */}
      <div className="relative z-20" style={{ height: `calc(${height}vh * 0.2)` }} />
    </section>
  );
}
