import React, { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import BackgroundMist from './components/BackgroundMist'
import TypeSet from './components/TypeSet'
import GoldShimmer from './components/GoldShimmer'
import IntroArchive from './components/IntroArchive'
import SinsIndex from './components/SinsIndex'

function App() {
  const archiveRef = useRef(null)

  const scrollToArchive = () => {
    const el = document.querySelector('#archive')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-neutral-800 selection:text-neutral-100">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Mist background (35%) */}
        <BackgroundMist />

        {/* Spline Cover */}
        <div className="absolute inset-0 will-change-transform">
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
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.0, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <TypeSet>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-neutral-100 tracking-tight">
                  “Every sin leaves a trace.”
                </h1>
              </TypeSet>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg md:text-xl text-neutral-300/90 mb-10"
            >
              A collection of seven fragrances shaped from desire, weakness, hunger, and the shadows we pretend not to carry.
            </motion.p>

            {/* Body copy as manuscript note */}
            <div className="space-y-2 text-neutral-300/80 max-w-2xl mx-auto">
              {[
                '“Perfume was always confession.',
                'A quiet truth pressed into the skin.',
                'Here, each scent is a sin—reborn, distilled, and bound in glass.”',
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 + i * 0.35, duration: 0.8 }}
                  className="text-sm sm:text-base"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* CTA (ritual command, no button) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6, duration: 1.2 }}
              className="mt-12"
            >
              <GoldShimmer>
                <span onClick={scrollToArchive} className="gold-shimmer uppercase tracking-[0.35em] text-[0.8rem] sm:text-sm text-[#D9C68A]/90">
                  ENTER THE ARCHIVE
                </span>
              </GoldShimmer>
            </motion.div>
          </div>
        </div>

        {/* Below-the-fold transition: dim + parchment line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 4.2, duration: 1.2 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" aria-hidden="true" />
      </section>

      {/* Intro transition to sins */}
      <IntroArchive />

      {/* II. CHAPTER INDEX (Sins overview) */}
      <SinsIndex onSelect={(name) => {
        const id = `chapter-${name.toLowerCase()}`
        const target = document.getElementById(id) || document.querySelector('#archive')
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }} />

      {/* Placeholders for chapters anchors */}
      <div id="chapter-wrath" className="sr-only" />
      <div id="chapter-envy" className="sr-only" />
      <div id="chapter-lust" className="sr-only" />
      <div id="chapter-pride" className="sr-only" />
      <div id="chapter-gluttony" className="sr-only" />
      <div id="chapter-greed" className="sr-only" />
      <div id="chapter-sloth" className="sr-only" />
    </div>
  )
}

export default App
