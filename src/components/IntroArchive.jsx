import React from 'react';
import { motion } from 'framer-motion';
import BackgroundMist from './BackgroundMist';

export default function IntroArchive() {
  return (
    <section className="relative w-full bg-black text-neutral-100 overflow-hidden" aria-label="Introduction to the archive">
      {/* Dim the screen slightly as this section appears */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 bg-black"
        aria-hidden="true"
      />

      {/* Very faint drifting mist */}
      <div className="absolute inset-0 opacity-30">
        <BackgroundMist />
      </div>

      <div className="relative h-[65vh] flex items-center justify-center px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <p
            className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/95"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', Times, serif", fontWeight: 300 }}
          >
            Here begins the collection.<br />
            Seven scents. Seven temptations.<br />
            Scroll to uncover them one by one.
          </p>
          <div className="mx-auto mt-6 h-[1px] w-24 bg-[#D9C68A]/15" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
