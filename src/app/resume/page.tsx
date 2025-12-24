'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { resumeData } from '@/config/resume'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerFast } from '@/lib/animations'
import { Github, ExternalLink } from 'lucide-react'

export default function ResumePage() {
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
            Resume
          </motion.h1>

          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h2 className="font-display text-3xl font-bold text-electric-cyan mb-4">
                {resumeData.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary">
                <div>
                  <p className="mb-2"><span className="text-electric-cyan">Location:</span> {resumeData.contact.location}</p>
                  <p className="mb-2"><span className="text-electric-cyan">Email:</span> {resumeData.contact.email}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={resumeData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-electric-cyan hover:text-arcane-gold transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={resumeData.contact.tryhackme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-electric-cyan hover:text-arcane-gold transition-colors"
                  >
                    TryHackMe
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-4">Professional Summary</h3>
              <p className="text-text-secondary leading-relaxed">{resumeData.summary}</p>
            </motion.div>

            {/* Skills */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-6">Skills</h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                <div>
                  <h4 className="font-semibold text-arcane-gold mb-2">Programming/Scripting</h4>
                  <ul className="text-text-secondary space-y-1">
                    {resumeData.skills.programming.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-arcane-gold mb-2">Operating Systems</h4>
                  <ul className="text-text-secondary space-y-1">
                    {resumeData.skills.operatingSystems.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-arcane-gold mb-2">Cybersecurity Tools</h4>
                  <p className="text-text-secondary">{resumeData.skills.cybersecurity}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-arcane-gold mb-2">Infrastructure/Self-Hosting</h4>
                  <ul className="text-text-secondary space-y-1">
                    {resumeData.skills.infrastructure.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-arcane-gold mb-2">AI Integration</h4>
                  <p className="text-text-secondary">{resumeData.skills.aiIntegration}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-arcane-gold mb-2">Other</h4>
                  <ul className="text-text-secondary space-y-1">
                    {resumeData.skills.other.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* Projects */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-6">Projects</h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {resumeData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-void rounded-lg p-6 border border-electric-cyan/20 hover:border-electric-cyan/50 transition-colors"
                    variants={fadeInUp}
                  >
                    <h4 className="font-semibold text-arcane-gold mb-2">{project.title}</h4>
                    <p className="text-text-secondary text-sm">{project.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-6">Certifications & Learning Platforms</h3>
              <motion.div
                className="space-y-4"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {resumeData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-shadow rounded-lg p-4 border border-electric-cyan/20"
                    variants={fadeInUp}
                  >
                    <h4 className="font-semibold text-arcane-gold mb-1">{cert.platform}</h4>
                    <p className="text-text-secondary text-sm">{cert.details}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              className="bg-shadow rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-4">Work Experience</h3>
              <p className="text-text-secondary">{resumeData.workExperience}</p>
            </motion.div>

            {/* Education */}
            <motion.div
              className="bg-abyss rounded-lg p-8 border border-electric-cyan/30"
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-electric-cyan mb-4">Education</h3>
              <p className="text-text-secondary">{resumeData.education}</p>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
