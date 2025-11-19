import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import BackgroundMist from './components/BackgroundMist'
import TypeSet from './components/TypeSet'
import GoldShimmer from './components/GoldShimmer'
import IntroArchive from './components/IntroArchive'
import SinsIndex from './components/SinsIndex'
import Hero from './components/Hero'
import StoryScroll from './components/StoryScroll'
import TransitionBand from './components/TransitionBand'

function App() {
  const archiveRef = useRef(null)

  const scrollToArchive = () => {
    const el = document.querySelector('#archive')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-neutral-800 selection:text-neutral-100">
      {/* I. HERO */}
      <Hero />

      {/* Transition: Hero → Story (more dramatic curtain wipe) */}
      <TransitionBand label="I → II" height={160} variant="curtain" />

      {/* II. PAGE 2 — Scroll-triggered story text */}
      <StoryScroll />

      {/* Transition: Story → Archive (iris reveal) */}
      <TransitionBand label="II → III" height={160} variant="iris" />

      {/* III. CHAPTER INDEX (Seven Sins) */}
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
