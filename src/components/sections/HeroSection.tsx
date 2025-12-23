'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Typing animation for title
  const titleWords = ['CIRCUIT', 'SORCERER']

  return (
    <section className="relative min-h-screen overflow-hidden bg-void">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Magic Circle Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(/background2.jpeg)',
            filter: 'brightness(0.7)'
          }}
        />

        {/* Circuit Grid Overlay */}
        <div className="absolute inset-0 bg-circuit-grid opacity-20" />

        {/* Mystic Radial Gradient */}
        <div className="absolute inset-0 bg-mystic-radial" />

        {/* Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/80" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-24 pb-16">
        {mounted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="group relative">
                <div className="absolute -inset-1 animate-glow-pulse rounded-2xl bg-gradient-to-r from-electric-cyan via-mystic-purple to-arcane-gold opacity-75 blur-lg" />
                <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-4 border-electric-cyan bg-shadow md:h-56 md:w-56">
                  <Image
                    src={siteConfig.author.avatar}
                    alt={siteConfig.author.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Title with Typing Effect */}
            <motion.div variants={fadeInUp} className="mb-6">
              <h1 className="font-display text-5xl font-bold md:text-7xl lg:text-8xl">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
                    className={
                      index === 0
                        ? 'block text-electric-cyan text-glow-cyan'
                        : 'block text-arcane-gold text-glow-gold'
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="mb-6 max-w-2xl text-xl text-text-secondary md:text-2xl"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mb-10 max-w-xl text-base text-text-muted md:text-lg"
            >
              {siteConfig.author.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/projects"
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-mystic-purple/20 to-electric-cyan/20 border border-electric-cyan/30 px-8 py-4 font-semibold text-electric-cyan backdrop-blur-sm transition-all hover:border-electric-cyan/50 hover:from-mystic-purple/30 hover:to-electric-cyan/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Explore My Infrastructure
                </span>
              </Link>

              <Link
                href="/about"
                className="group rounded-lg border border-arcane-gold/30 bg-gradient-to-r from-arcane-gold/10 to-mystic-purple/10 px-8 py-4 font-semibold text-arcane-gold backdrop-blur-sm transition-all hover:border-arcane-gold/50 hover:from-arcane-gold/20 hover:to-mystic-purple/20"
              >
                About Me
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
