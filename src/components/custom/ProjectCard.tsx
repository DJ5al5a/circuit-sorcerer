'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, ExternalLink, BookOpen } from 'lucide-react'
import type { Project } from '@/config/projects'
import { scaleIn } from '@/lib/animations'

interface ProjectCardProps {
  project: Project
}

const categoryEmojis: Record<string, string> = {
  infrastructure: '🏗️',
  services: '⚙️',
  security: '🛡️',
  automation: '🤖',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-lg border border-electric-cyan/30 bg-shadow transition-all hover:border-mystic-purple hover-glow-purple"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-abyss">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-cyber">
            <span className="text-6xl">{categoryEmojis[project.category] || '📦'}</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute right-4 top-4 rounded-full border border-arcane-gold/50 bg-arcane-gold/20 px-3 py-1 text-xs font-semibold text-arcane-gold backdrop-blur-sm">
            ⭐ Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 rounded-full border border-electric-cyan/50 bg-electric-cyan/20 px-3 py-1 text-xs font-semibold uppercase text-electric-cyan backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="mb-2 font-display text-xl font-bold text-text-primary transition-colors group-hover:text-arcane-gold group-hover:text-glow-gold">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-3 text-sm leading-relaxed text-text-secondary">{project.description}</p>

        {/* Problem Solved */}
        <div className="mb-4 rounded-lg border-l-2 border-circuit-green bg-abyss/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-circuit-green">
            Why I Built It
          </p>
          <p className="mt-1 text-sm text-text-secondary">{project.problem}</p>
        </div>

        {/* Tech Stack */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-electric-cyan/30 bg-abyss px-2 py-1 text-xs font-medium text-electric-cyan"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg border border-text-muted/30 bg-abyss px-3 py-2 text-sm font-medium text-text-secondary transition-all hover:border-electric-cyan hover:text-electric-cyan"
            >
              <Github className="h-4 w-4" />
              <span>Code</span>
            </a>
          )}
          {project.links.docs && (
            <a
              href={project.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg border border-text-muted/30 bg-abyss px-3 py-2 text-sm font-medium text-text-secondary transition-all hover:border-arcane-gold hover:text-arcane-gold"
            >
              <BookOpen className="h-4 w-4" />
              <span>Docs</span>
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg border border-text-muted/30 bg-abyss px-3 py-2 text-sm font-medium text-text-secondary transition-all hover:border-circuit-green hover:text-circuit-green"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-mystic-purple/10 to-transparent" />
      </div>
    </motion.div>
  )
}
