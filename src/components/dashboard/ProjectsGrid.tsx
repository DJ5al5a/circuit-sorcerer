'use client'

import { ComponentGridIcon } from '@/components/icons/CircuitIcons'
import { getFeaturedProjects } from '@/config/projects'
import { FeaturedProjectCard } from './FeaturedProjectCard'
import Link from 'next/link'

export function ProjectsGrid() {
  const featuredProjects = getFeaturedProjects()

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <ComponentGridIcon size={32} className="text-primary" />
          <div>
            <span className="tech-label">PROJECTS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              Featured Work
            </h2>
          </div>
        </div>

        <Link
          href="/projects"
          className="text-primary hover:text-primary-hover font-mono text-sm transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.slice(0, 6).map((project) => (
          <FeaturedProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            technologies={project.tags}
            links={project.links}
            featured={project.featured}
          />
        ))}
      </div>
    </div>
  )
}
