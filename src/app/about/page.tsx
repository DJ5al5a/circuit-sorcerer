'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerFast } from '@/lib/animations'
import { siteConfig } from '@/config/site'
import { skills, certifications } from '@/config/skills'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="h-24"></div>
      <main className="min-h-screen bg-void">
        <div className="container mx-auto px-4 py-16">
          <motion.h1
            className="mb-8 font-display text-5xl font-bold text-electric-cyan text-glow-cyan md:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            About
          </motion.h1>

          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Section */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30 text-center"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-electric-cyan via-circuit-green to-mystic-purple opacity-30 blur-xl rounded-full animate-glow-pulse" />
                  <div className="relative h-32 w-32 md:h-40 md:w-40">
                    <Image
                      src="/laptop_logo.jpeg"
                      alt="Circuit Sorcerer Logo"
                      fill
                      className="object-contain drop-shadow-[0_0_30px_rgba(0,217,255,0.5)]"
                    />
                  </div>
                </div>
              </div>
              <h2 className="font-display text-3xl font-bold text-electric-cyan mb-4">
                {siteConfig.author.title}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
                {siteConfig.author.bio}
              </p>
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

            {/* Skills */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-6 text-center">
                Arcane Abilities
              </h3>
              <p className="text-sm text-text-muted text-center uppercase tracking-wide mb-6">
                Mastery across {skills.length} mystical arts
              </p>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
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
                        className={`h-full bg-gradient-to-r transition-all duration-1000 ${
                          skill.category === 'languages' ? 'from-electric-cyan to-neon-blue' :
                          skill.category === 'frameworks' ? 'from-mystic-purple to-electric-cyan' :
                          skill.category === 'infrastructure' ? 'from-circuit-green to-electric-cyan' :
                          skill.category === 'security' ? 'from-energy-red to-crimson-spark' :
                          'from-mystic-purple to-arcane-gold'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-text-muted capitalize">
                      {skill.category.replace('-', ' ')}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-mystic-purple mb-6 text-center">
                Certifications & Quests
              </h3>
              <motion.div
                className="space-y-3"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.name}
                    className="wizard-card flex items-center justify-between p-4"
                    variants={fadeInUp}
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
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Extended Bio */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-4 text-center">
                The Journey
              </h3>
              <p className="text-text-secondary leading-relaxed text-center">
                {siteConfig.author.bioExtended}
              </p>
            </motion.div>

            {/* Training Grounds */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-6 text-center">
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

            {/* Video */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-mystic-purple mb-6 text-center">
                In Action
              </h3>
              <div className="wizard-card overflow-hidden">
                <video
                  className="w-full rounded-lg"
                  controls
                  preload="metadata"
                  poster="/circuitsorcerer.png"
                >
                  <source src="/grok-video-273983ef-4c07-45a9-81bc-deb06f55d93c.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
