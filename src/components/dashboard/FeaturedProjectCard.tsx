'use client'

import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface FeaturedProjectProps {
  title: string
  description: string
  technologies: string[]
  links: {
    github?: string
    demo?: string
    live?: string
    docs?: string
  }
  featured?: boolean
}

export function FeaturedProjectCard({
  title,
  description,
  technologies,
  links,
}: FeaturedProjectProps) {
  return (
    <div className="dashboard-card bg-surface-elevated h-full flex flex-col">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="tech-label text-xs">FEATURED PROJECT</span>
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-primary transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={20} />
            </a>
          )}
          {(links.live || links.demo) && (
            <a
              href={links.live || links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-primary transition-colors"
              aria-label="Live project"
            >
              <ExternalLink size={20} />
            </a>
          )}
          {links.docs && (
            <a
              href={links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary hover:text-primary transition-colors"
              aria-label="Documentation or related site"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary mb-6 flex-grow leading-relaxed">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {technologies.map((tech) => (
          <span key={tech} className="tag text-xs">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
