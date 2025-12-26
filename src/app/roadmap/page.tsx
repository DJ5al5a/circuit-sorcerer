'use client'

import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { roadmapData } from '@/config/roadmap'
import { ComponentGridIcon, TimelineIcon } from '@/components/icons/CircuitIcons'
import { ExternalLink } from 'lucide-react'

export default function RoadmapPage() {
  return (
    <>
      <Navigation />
      <div className="h-24"></div>
      <main className="min-h-screen relative flex justify-center">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-30 -z-10"
          style={{
            backgroundImage: 'url(/sorcerer.jpeg)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="fixed inset-0 bg-background/80 -z-10" />

        <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* Page Header */}
          <div className="dashboard-card">
            <span className="tech-label">ROADMAP</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              My Journey & Goals
            </h1>
            <p className="text-text-secondary">
              Current projects, future goals, and skills I'm developing
            </p>
          </div>

          {/* Current Projects */}
          <div className="dashboard-card">
            <div className="flex items-center gap-4 mb-6">
              <ComponentGridIcon size={32} className="text-primary" />
              <div>
                <span className="tech-label">ACTIVE</span>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Current Projects
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmapData.currentProjects.map((project, index) => (
                <div
                  key={index}
                  className="dashboard-card bg-surface-elevated"
                >
                  <h3 className="font-bold text-accent mb-2">{project.title}</h3>
                  <p className="text-text-secondary text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Future Goals */}
          <div className="dashboard-card">
            <div className="flex items-center gap-4 mb-6">
              <TimelineIcon size={32} className="text-accent" />
              <div>
                <span className="tech-label">PLANNED</span>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                  Future Goals
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmapData.futureGoals.map((goal, index) => (
                <div
                  key={index}
                  className="dashboard-card bg-surface-elevated"
                >
                  <h3 className="font-bold text-accent mb-2">{goal.title}</h3>
                  <p className="text-text-secondary text-sm">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Progression */}
          <div className="dashboard-card">
            <span className="tech-label">LEARNING</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text-primary">
              Skills Progression
            </h2>

            <div className="space-y-4">
              {roadmapData.skillsProgression.map((skill, index) => (
                <div
                  key={index}
                  className="dashboard-card bg-surface-elevated"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-text-primary">{skill.skill}</h3>
                    <span className="text-sm text-accent font-mono">
                      {skill.from} → {skill.to}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TryHackMe */}
          <div className="dashboard-card">
            <span className="tech-label">TRAINING</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text-primary">
              TryHackMe Profile
            </h2>
            <div className="dashboard-card bg-surface-elevated">
              <a
                href={roadmapData.tryhackme.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary hover:text-primary-hover transition-colors"
              >
                <span className="font-mono font-semibold">@{roadmapData.tryhackme.username}</span>
                <ExternalLink size={16} />
              </a>
              <p className="text-text-secondary text-sm mt-2">
                Active learning platform for cybersecurity challenges and rooms.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
