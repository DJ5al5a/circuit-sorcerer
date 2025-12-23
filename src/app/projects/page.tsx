'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ProjectCard } from '@/components/custom/ProjectCard'
import { projects, getProjectsByCategory, type ProjectCategory } from '@/config/projects'
import { staggerFast, fadeInUp } from '@/lib/animations'

const categories: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'services', label: 'Services' },
  { value: 'security', label: 'Security' },
  { value: 'automation', label: 'Automation' },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : getProjectsByCategory(selectedCategory)

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-void pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-circuit-grid py-20">
          <div className="absolute inset-0 bg-mystic-radial opacity-50" />

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center"
            >
              <h1 className="mb-4 font-display text-5xl font-bold text-electric-cyan text-glow-cyan md:text-7xl">
                My Projects
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-text-secondary">
                Explore my self-hosted infrastructure, automation tools, and security projects.
                Everything built with privacy, control, and learning in mind.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-electric-cyan/20 bg-shadow py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`rounded-full px-6 py-2 font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'border-2 border-arcane-gold bg-arcane-gold text-void shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                      : 'border border-electric-cyan/30 bg-abyss text-electric-cyan hover:border-electric-cyan hover-glow-cyan'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <p className="mt-6 text-center text-sm text-text-muted">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="bg-shadow py-16">
          <div className="container mx-auto px-4">
            <motion.div
              key={selectedCategory}
              initial="hidden"
              animate="visible"
              variants={staggerFast}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-xl text-text-secondary">
                  No projects found in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
