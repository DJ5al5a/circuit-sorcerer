'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { skills, certifications, getSkillsByCategory } from '@/config/skills'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Color mapping for skill categories
  const categoryColors: Record<string, string> = {
    languages: 'from-electric-cyan to-neon-blue',
    frameworks: 'from-mystic-purple to-electric-cyan',
    infrastructure: 'from-circuit-green to-electric-cyan',
    security: 'from-energy-red to-crimson-spark',
    devops: 'from-mystic-purple to-arcane-gold',
  }

  return (
    <section id="about" ref={ref} className="relative bg-shadow py-24 md:py-40 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        {/* Circuit Board Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: 'url(/background.jpeg)',
            filter: 'brightness(0.6)'
          }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/90 via-shadow/80 to-shadow/90" />
        <div className="absolute inset-0 bg-mystic-radial opacity-30" />

        {/* Floating Silhouette - Decorative Element */}
        <div
          className="absolute -bottom-20 -right-20 h-96 w-96 opacity-10 hidden lg:block"
          style={{
            backgroundImage: 'url(/silgouette.jpeg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            filter: 'brightness(0.8) contrast(1.2)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        {mounted && isInView && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Section Title */}
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="mb-6 font-display text-4xl font-bold text-electric-cyan md:text-5xl">
                The Wizard's Codex
              </h2>
              <div className="mx-auto h-1 w-24 bg-gradient-to-r from-electric-cyan via-arcane-gold to-circuit-green" />
            </motion.div>

            {/* Logo Section */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-electric-cyan via-circuit-green to-mystic-purple opacity-30 blur-xl rounded-full animate-glow-pulse" />
                <div className="relative h-48 w-48 md:h-56 md:w-56">
                  <Image
                    src="/laptop_logo.jpeg"
                    alt="Circuit Sorcerer Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp}>
              <div className="grid grid-cols-3 gap-4">
                <div className="wizard-card p-4 text-center">
                  <div className="mb-2 font-display text-3xl font-bold text-electric-cyan">
                    {siteConfig.author.stats.selfHostedServices}+
                  </div>
                  <div className="text-sm text-text-secondary">Self-Hosted Services</div>
                </div>
                <div className="wizard-card p-4 text-center">
                  <div className="mb-2 font-display text-3xl font-bold text-arcane-gold">
                    {siteConfig.author.stats.yearsExperience}+
                  </div>
                  <div className="text-sm text-text-secondary">Years Experience</div>
                </div>
                <div className="wizard-card p-4 text-center">
                  <div className="mb-2 font-display text-3xl font-bold text-circuit-green">
                    {siteConfig.author.stats.githubRepos}+
                  </div>
                  <div className="text-sm text-text-secondary">GitHub Repos</div>
                </div>
              </div>
            </motion.div>

            {/* Bio Section */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-2xl font-bold text-arcane-gold text-center">
                {siteConfig.author.title}
              </h3>
              <p className="leading-relaxed text-text-primary text-center">
                {siteConfig.author.bio}
              </p>
              <p className="leading-relaxed text-text-secondary text-center">
                {siteConfig.author.bioExtended}
              </p>
            </motion.div>

            {/* Unified Skills Section - All 19 Skills */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <h3 className="text-2xl font-bold text-electric-cyan text-center">
                Arcane Abilities
              </h3>
              <p className="text-sm text-text-muted text-center uppercase tracking-wide">
                Mastery across {skills.length} mystical arts
              </p>

              {/* All Skills with Progress Bars - Grouped by Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="wizard-card p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">{skill.name}</span>
                      <span className={`text-sm font-semibold ${
                        skill.category === 'languages' ? 'text-electric-cyan' :
                        skill.category === 'frameworks' ? 'text-mystic-purple' :
                        skill.category === 'infrastructure' ? 'text-circuit-green' :
                        skill.category === 'security' ? 'text-energy-red' :
                        'text-arcane-gold'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-void">
                      <div
                        className={`h-full bg-gradient-to-r ${categoryColors[skill.category] || 'from-electric-cyan to-mystic-purple'} transition-all duration-1000`}
                        style={{ width: isInView ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-text-muted capitalize">
                      {skill.category.replace('-', ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications & Quests */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-xl font-bold text-mystic-purple text-center">
                Certifications & Quests
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="wizard-card flex items-center justify-between p-4"
                  >
                    <div>
                      <div className="font-semibold text-text-primary">{cert.name}</div>
                      <div className="text-sm text-text-secondary">{cert.issuer}</div>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        cert.status === 'completed'
                          ? 'bg-circuit-green/20 text-circuit-green border border-circuit-green/30'
                          : cert.status === 'in-progress'
                            ? 'bg-arcane-gold/20 text-arcane-gold border border-arcane-gold/30'
                            : 'bg-mystic-purple/20 text-mystic-purple border border-mystic-purple/30'
                      }`}
                    >
                      {cert.status === 'completed'
                        ? '✓ Completed'
                        : cert.status === 'in-progress'
                          ? '⏳ In Progress'
                          : '📜 Quest'
                      }
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Training Grounds */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-xl font-bold text-electric-cyan text-center">
                Training Grounds
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={siteConfig.author.platforms.tryhackme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wizard-card group flex items-center gap-4 p-4 transition-transform hover:scale-105"
                >
                  <div className="text-3xl">🎯</div>
                  <div>
                    <div className="font-semibold text-arcane-gold">
                      TryHackMe
                    </div>
                    <div className="text-xs text-text-secondary">View Progress</div>
                  </div>
                </a>
                <a
                  href={siteConfig.author.platforms.hackthebox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wizard-card group flex items-center gap-4 p-4 transition-transform hover:scale-105"
                >
                  <div className="text-3xl">📦</div>
                  <div>
                    <div className="font-semibold text-circuit-green">
                      HackTheBox
                    </div>
                    <div className="text-xs text-text-secondary">View Profile</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
