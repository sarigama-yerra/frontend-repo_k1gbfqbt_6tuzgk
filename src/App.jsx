import React, { useEffect } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useAnimation, useInView } from 'framer-motion'
import BackgroundMist from './components/BackgroundMist'
import TypeSet from './components/TypeSet'
import GoldShimmer from './components/GoldShimmer'

function App() {
  // Animation controls for timeline percentages
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      // 0% Black void handled by initial opacity
      await controls.start({ opacity: 1, transition: { duration: 1.0, ease: 'easeOut', delay: 0.2 } }) // 5% sigil fade in
      await controls.start({ filter: 'none', transition: { duration: 0.8 } })
    }
    sequence()
  }, [controls])

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-neutral-800 selection:text-neutral-100">
      {/* Hero Cover with Spline */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* 0% Black void via bg-black */}

        {/* Mist background (35%) */}
        <BackgroundMist />

        {/* Spline Cover */}
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/EQgEIs2r5cMbWroZ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Vignette for luxury depth */}
        <div className="pointer-events-none absolute inset-0" style={{
          background:
            'radial-gradient(120% 80% at 50% 10%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%)'
        }} />

        {/* Content container */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 sm:px-8">
          {/* Sigil (5%) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease: 'easeOut' }}
            className="pt-16 sm:pt-20 flex justify-start"
          >
            <div className="w-14 h-14 rounded-full border border-neutral-700/60 bg-neutral-900/30 backdrop-blur-sm flex items-center justify-center" aria-label="ELANOR sigil">
              <div className="w-6 h-6 relative">
                <span className="absolute inset-x-0 top-0 h-[2px] bg-neutral-500/70" />
                <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-neutral-500/70" />
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-neutral-500/70" />
              </div>
            </div>
          </motion.div>

          {/* Text block */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/3 w-full max-w-3xl text-center">
            {/* 10% — HERO TEXT REVEALS */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.0, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <TypeSet>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-neutral-100 tracking-tight">
                  “Every sin has a scent.”
                </h1>
              </TypeSet>
            </motion.div>

            {/* 20% — SUBHEAD SLIDES IN */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl text-neutral-300/90 mb-10"
            >
              “Seven fragrances. One Codex.”
            </motion.p>

            {/* 45% — BODY COPY (lines fade individually) */}
            <div className="space-y-2 text-neutral-300/80 max-w-2xl mx-auto">
              {[
                '“A collection built on desire, danger, and the darker side of luxury.',
                'Each fragrance is a sin brought to life — crafted to tempt, provoke,',
                'and leave its mark on the skin.',
                '',
                'Scroll to enter the Codex.”'
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: line === '' ? 0 : 1 }}
                  transition={{ delay: 2.2 + i * 0.35, duration: 0.8 }}
                  className={`text-sm sm:text-base ${line === '' ? 'h-2' : ''}`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* 65% — CTA (ritual command, no button) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 1.2 }}
              className="mt-12"
            >
              <GoldShimmer>
                <span className="gold-shimmer uppercase tracking-[0.35em] text-[0.8rem] sm:text-sm text-[#D9C68A]/90">
                  ENTER THE CODEX
                </span>
              </GoldShimmer>
            </motion.div>
          </div>
        </div>

        {/* 100% — SECTION TRANSITION (dim) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 4.6, duration: 1.2 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"
        />
      </section>

      {/* Chapter One Placeholder (WRATH) to show smooth continuation; minimal for now */}
      <section className="relative min-h-[120vh] bg-black text-neutral-100">
        <div className="sticky top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-28">
          <div className="mb-6 text-xs tracking-[0.25em] text-neutral-500 uppercase">Chapter One</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4" style={{
            fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif"
          }}>WRATH</h2>
          <p className="text-neutral-400 max-w-2xl">A slow, deliberate descent begins. This section will unfold into the Codex. Continue scrolling.</p>
        </div>
      </section>
    </div>
  )
}

export default App
