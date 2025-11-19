import React from 'react'
import Hero from './components/Hero'
import StoryScroll from './components/StoryScroll'
import SinsIndex from './components/SinsIndex'

function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-neutral-800 selection:text-neutral-100">
      {/* I. HERO */}
      <Hero />

      {/* II. INTRO PHRASES WITH SCROLL-REVEAL */}
      <StoryScroll />

      {/* III. SEVEN SINS GRID */}
      <SinsIndex />

      {/* Anchors (reserved) */}
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
