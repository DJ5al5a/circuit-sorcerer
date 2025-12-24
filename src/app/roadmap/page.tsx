'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { roadmapData } from '@/config/roadmap'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerFast } from '@/lib/animations'
import { ExternalLink, TrendingUp } from 'lucide-react'

export default function RoadmapPage() {
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
            Roadmap
          </motion.h1>

          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Current Projects */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-3xl font-bold text-electric-cyan mb-6 flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                Current Projects
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {roadmapData.currentProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-shadow rounded-lg p-6 border border-electric-cyan/20 hover:border-electric-cyan/50 transition-colors"
                    variants={fadeInUp}
                  >
                    <h3 className="font-semibold text-arcane-gold mb-2">{project.title}</h3>
                    <p className="text-text-secondary text-sm">{project.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Future Goals */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-3xl font-bold text-electric-cyan mb-6 flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                Future Goals
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {roadmapData.futureGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    className="bg-abyss rounded-lg p-6 border border-arcane-gold/20 hover:border-arcane-gold/50 transition-colors"
                    variants={fadeInUp}
                  >
                    <h3 className="font-semibold text-arcane-gold mb-2">{goal.title}</h3>
                    <p className="text-text-secondary text-sm">{goal.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Skills Progression */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-3xl font-bold text-electric-cyan mb-6">Skills Progression</h2>
              <motion.div
                className="space-y-4"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {roadmapData.skillsProgression.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-shadow rounded-lg p-6 border border-electric-cyan/20"
                    variants={fadeInUp}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-arcane-gold">{skill.skill}</h3>
                      <span className="text-sm text-text-secondary">
                        {skill.from} → {skill.to}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">{skill.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* TryHackMe */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-3xl font-bold text-electric-cyan mb-6">TryHackMe Profile</h2>
              <div className="bg-abyss rounded-lg p-6 border border-electric-cyan/20">
                <a
                  href={roadmapData.tryhackme.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-electric-cyan hover:text-arcane-gold transition-colors"
                >
                  <span className="font-semibold">@{roadmapData.tryhackme.username}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <p className="text-text-secondary text-sm mt-2">
                  Active learning platform for cybersecurity challenges and rooms.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
